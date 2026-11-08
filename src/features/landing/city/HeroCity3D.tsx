import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { BusinessType } from '../../../data/types'
import { CITY_LAYERS, CITY_PIECES, GROUND_TILES, FOUNTAIN_POSITION, cellPosition, FEATURED, layerUrl, pieceLayer, piecePosition, glowColor } from './cityConfig'
import type { CityLayer, CityPiece, GroundKind, ProductImage } from './cityConfig'

// La ciudad viene en 3 .glb, uno por capa (calles, árboles, edificios): ver scripts/build-city-models.mjs.
// Se cargan con el GLTFLoader de three (sin drei: no hacen falta los decodificadores Draco/Meshopt que trae).
const LAYER_URLS = CITY_LAYERS.map(layerUrl)
useLoader.preload(GLTFLoader, LAYER_URLS)

// Solo en desarrollo, con ?city-capture: escena sin glows ni avatares y con el buffer conservado, para
// sacar la captura estática del hero (scripts/capture-city.mjs). En producción esto se elimina del bundle.
const CAPTURE = import.meta.env.DEV && new URLSearchParams(location.search).has('city-capture')

// Las piezas se montan por tandas, en el orden de las capas: así ninguna tarea del hilo principal se
// alarga (cada tanda es un commit corto de React) y el navegador sigue respondiendo mientras se arma.
const ORDERED_PIECES = [...CITY_PIECES].sort((a, b) => CITY_LAYERS.indexOf(pieceLayer(a.tipo)) - CITY_LAYERS.indexOf(pieceLayer(b.tipo)))
const BATCH = 16

type FeaturedEntry = { category: BusinessType; materials: THREE.MeshStandardMaterial[]; anchor: [number, number, number] }
type Registry = Map<string, FeaturedEntry>
type Layers = Record<CityLayer, THREE.Object3D>

/** Los 3 .glb de la ciudad, como capa → escena. Suspende hasta que están los tres. */
function useCityLayers(): Layers {
  const gltfs = useLoader(GLTFLoader, LAYER_URLS)
  return useMemo(() => ({ roads: gltfs[0].scene, nature: gltfs[1].scene, buildings: gltfs[2].scene }), [gltfs])
}

function Piece({ piece, layers, registry }: { piece: CityPiece; layers: Layers; registry: Registry }) {
  const category = FEATURED[piece.id]
  const position = piecePosition(piece)
  const scale = piece.escala ?? 1

  const { object, materials, height } = useMemo(() => {
    const source = layers[pieceLayer(piece.tipo)].getObjectByName(`piece_${piece.tipo}`)
    // clone(true) comparte geometría y material (uno por kit) con el original
    const object = source ? source.clone(true) : new THREE.Group()
    const materials: THREE.MeshStandardMaterial[] = []
    if (!category) return { object, materials, height: 0 }
    // solo los destacados clonan material, para animar emissive sin afectar al resto
    object.traverse((o) => {
      const m = o as THREE.Mesh
      if (!m.isMesh) return
      const mat = (m.material as THREE.MeshStandardMaterial).clone()
      mat.emissiveIntensity = 0
      mat.emissiveMap = mat.map // el glow conserva el detalle (ventanas) en vez de teñir todo plano
      m.material = mat
      materials.push(mat)
    })
    return { object, materials, height: new THREE.Box3().setFromObject(object).max.y }
  }, [layers, piece.tipo, category])

  useLayoutEffect(() => {
    if (!category) return
    registry.set(piece.id, { category, materials, anchor: [position[0], height * scale + 0.1, position[2]] })
    return () => {
      registry.delete(piece.id)
      materials.forEach((m) => m.dispose())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, materials, height, scale, piece.id, registry])

  return <primitive object={object} position={position} rotation={[0, (piece.rotacion * Math.PI) / 2, 0]} scale={scale} />
}

const rand = (a: number, b: number) => a + Math.random() * (b - a)

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Active = { key: number; id: string; category: BusinessType; img?: string; anchor: [number, number, number] }

// Encendido tipo neón del edificio: [intensidad, duración, inicio] en segundos, lineal entre pasos.
// Parpadeos que suben → hold → parpadeo y apagado (1.6 s en total).
const GLOW_STEPS: [number, number, number][] = [
  [0.9, 0.08, 0], [0.15, 0.07, 0.08], [1.7, 0.08, 0.15], [0.5, 0.07, 0.23], [2.2, 0.15, 0.3],
  [1.2, 0.1, 1.0], [2.2, 0.08, 1.1], [0.3, 0.12, 1.18], [0, 0.3, 1.3],
]
const GLOW_END = Math.max(...GLOW_STEPS.map(([, d, at]) => at + d))
function glowAt(t: number): number {
  let from = 0
  let value = 0
  for (const [to, dur, at] of GLOW_STEPS) {
    if (t < at) break
    value = from + (to - from) * Math.min(1, (t - at) / dur)
    from = to
  }
  return value
}
// Avatar: sube 120px en 2.5 s desacelerando (cuadrática) y se mantiene opaco casi todo el trayecto;
// recién al llegar arriba se desvanece rápido (cúbica, 0.45 s desde 2.05 s)
const AVATAR_RISE = 2.5
const AVATAR_FADE_AT = 2.05
const AVATAR_FADE = 0.45
const easeOutQuad = (p: number) => 1 - (1 - p) * (1 - p)
const easeInCubic = (p: number) => p * p * p
const clamp01 = (p: number) => Math.min(1, Math.max(0, p))

/** Crea el avatar (círculo con la foto del producto) dentro de la capa de avatares, fuera del canvas. */
function createAvatar(src: string) {
  const wrap = document.createElement('div')
  // oculto hasta que el primer cuadro lo ubica sobre su edificio (ver place)
  wrap.style.cssText = 'position:absolute;left:0;top:0;z-index:10;pointer-events:none;will-change:transform;visibility:hidden'
  const circle = document.createElement('div')
  circle.style.cssText = 'width:44px;height:44px;border-radius:50%;overflow:hidden;opacity:0;will-change:transform,opacity'
  const img = document.createElement('img')
  img.src = src
  img.alt = ''
  img.draggable = false
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block'
  circle.appendChild(img)
  wrap.appendChild(circle)
  return { wrap, circle }
}

const _v = new THREE.Vector3()

/** Enciende un edificio destacado a la vez (mazo barajado) y muestra el avatar de producto sincronizado. */
function Orchestrator({ registry, images, avatarLayer, lightRef }: { registry: Registry; images: ProductImage[]; avatarLayer: RefObject<HTMLDivElement>; lightRef: RefObject<THREE.PointLight | null> }) {
  const [active, setActive] = useState<Active | null>(null)
  // frameloop="demand": cada paso del glow pide su propio cuadro
  const invalidate = useThree((s) => s.invalidate)
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  // punto 3D sobre el edificio (dentro del grupo del parallax) y el avatar que lo sigue en pantalla
  const anchorRef = useRef<THREE.Group>(null)
  const avatarRef = useRef<HTMLDivElement | null>(null)
  // proyecta el ancla a la pantalla y centra el avatar ahí (la capa de avatares mide lo mismo que el canvas)
  const place = useCallback(() => {
    const g = anchorRef.current
    const el = avatarRef.current
    if (!g || !el) return
    g.getWorldPosition(_v).project(camera)
    el.style.transform = `translate3d(${((_v.x + 1) / 2) * size.width}px, ${((1 - _v.y) / 2) * size.height}px, 0) translate(-50%, -50%)`
    el.style.visibility = 'visible'
  }, [camera, size])
  // cada cuadro (glow o parallax) reubica el avatar
  useFrame(place)
  const last = useRef<string>('')
  const count = useRef(0)
  const imagesRef = useRef(images)
  // un mazo barajado por categoría: no se repite una imagen hasta agotar su pool
  const imageDecks = useRef<Record<string, string[]>>({})
  const lastImg = useRef<string>('')
  const onDone = useRef<() => void>(() => {})
  useEffect(() => {
    imagesRef.current = images
  }, [images])

  useEffect(() => {
    let timer = 0
    // saca la siguiente imagen de la categoría sin repetir hasta agotar el mazo
    const nextImage = (category: BusinessType): string | undefined => {
      const decks = imageDecks.current
      if (!decks[category]?.length) {
        decks[category] = shuffle(imagesRef.current.filter((i) => i.category === category).map((i) => i.src))
        // que la primera del mazo nuevo no sea la última mostrada
        if (decks[category].length > 1 && decks[category][decks[category].length - 1] === lastImg.current) decks[category].reverse()
      }
      const src = decks[category]?.pop()
      if (src) lastImg.current = src
      return src
    }
    const draw = () => {
      if (!registry.size) return schedule() // los destacados todavía no montaron
      // agrupa los edificios destacados por categoría
      const byCat = new Map<BusinessType, string[]>()
      for (const [id, e] of registry) byCat.set(e.category, [...(byCat.get(e.category) ?? []), id])
      // elige categoría ponderada por cantidad de imágenes (tienda » servicio/emprendimiento)
      const cats = [...byCat.keys()]
      const weights = cats.map((c) => imagesRef.current.filter((i) => i.category === c).length || 1)
      let r = Math.random() * weights.reduce((a, b) => a + b, 0)
      let ci = 0
      while (ci < cats.length - 1 && r >= weights[ci]) {
        r -= weights[ci]
        ci++
      }
      const category = cats[ci]
      // elige edificio de esa categoría evitando repetir el anterior
      let cands = byCat.get(category)!
      if (cands.length > 1) cands = cands.filter((id) => id !== last.current)
      const id = cands[Math.floor(Math.random() * cands.length)]
      const entry = registry.get(id)
      if (!entry) return draw()
      last.current = id
      setActive({ key: ++count.current, id, category, img: nextImage(category), anchor: entry.anchor })
    }
    const schedule = () => {
      timer = window.setTimeout(draw, rand(1800, 3200))
    }
    onDone.current = () => {
      setActive(null)
      schedule()
    }
    schedule()
    return () => {
      clearTimeout(timer)
    }
  }, [registry])

  useEffect(() => {
    if (!active) return
    const entry = registry.get(active.id)
    if (!entry) return
    const color = glowColor(active.category)
    entry.materials.forEach((m) => m.emissive.set(color))
    const glow = { i: 0 }
    const light = lightRef.current
    if (light) {
      light.color.set(color)
      light.position.set(entry.anchor[0], entry.anchor[1] * 0.6, entry.anchor[2])
    }
    const apply = () => {
      entry.materials.forEach((m) => (m.emissiveIntensity = glow.i))
      if (light) light.intensity = glow.i * 2.5
      invalidate()
    }

    const avatar = active.img ? createAvatar(active.img) : null
    if (avatar) {
      // lo posiciona el useFrame(place) del cuadro que pide apply()
      avatarLayer.current?.appendChild(avatar.wrap)
      avatarRef.current = avatar.wrap
    }
    // con avatar la secuencia dura lo que su subida; sin avatar, lo que el glow
    const end = avatar ? AVATAR_RISE : GLOW_END
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = (now - start) / 1000
      glow.i = t < GLOW_END ? glowAt(t) : 0
      apply()
      if (avatar) {
        const y = -120 * easeOutQuad(clamp01(t / AVATAR_RISE))
        const opacity = 1 - easeInCubic(clamp01((t - AVATAR_FADE_AT) / AVATAR_FADE))
        avatar.circle.style.transform = `translateY(${y.toFixed(1)}px)`
        avatar.circle.style.opacity = opacity.toFixed(3)
      }
      if (t < end) raf = requestAnimationFrame(tick)
      else onDone.current()
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      avatar?.wrap.remove()
      if (avatarRef.current === avatar?.wrap) avatarRef.current = null
      glow.i = 0
      apply()
    }
  }, [active, registry, invalidate, lightRef, avatarLayer])

  // ancla invisible sobre el edificio encendido: hereda la inclinación del parallax, así el avatar la acompaña
  return active ? <group key={active.key} ref={anchorRef} position={active.anchor} /> : null
}

type ParallaxMode = 'none' | 'mouse' | 'auto'

/** Inclina levemente la ciudad hacia el cursor (desktop) o la oscila con un seno (mobile / sin mouse).
 *  Con frameloop="demand" solo se dibuja cuando hace falta: en 'mouse', al mover el puntero y hasta que la
 *  inclinación se asienta; en 'auto', con un ticker propio a ~30 fps (la oscilación es lenta, no se nota). */
function Parallax({ pointer, mode, children }: { pointer: RefObject<{ x: number; y: number }>; mode: ParallaxMode; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    if (mode === 'mouse') {
      const onMove = () => invalidate()
      window.addEventListener('pointermove', onMove, { passive: true })
      return () => window.removeEventListener('pointermove', onMove)
    }
    if (mode !== 'auto') return
    let raf = 0
    let last = 0
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      if (t - last >= 1000 / 30 - 2) {
        last = t
        invalidate()
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [mode, invalidate])
  useFrame(({ clock }, delta) => {
    const g = group.current
    if (!g || mode === 'none') return
    // tras un rato sin dibujar, delta llega enorme: se acota para que la inclinación no salte
    const dt = Math.min(delta, 1 / 30)
    const t = clock.elapsedTime
    const tx = (mode === 'mouse' ? pointer.current.x : Math.sin(t * 0.3) * 0.5) * 0.14 // ~±4°
    const ty = (mode === 'mouse' ? pointer.current.y : Math.sin(t * 0.22 + 1) * 0.5) * 0.06 // ~±1.7°
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, tx, 3, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, ty, 3, dt)
    // en 'mouse' se siguen pidiendo cuadros hasta alcanzar la inclinación objetivo
    if (mode === 'mouse' && (Math.abs(g.rotation.y - tx) > 1e-4 || Math.abs(g.rotation.x - ty) > 1e-4)) invalidate()
  })
  return <group ref={group}>{children}</group>
}

/** Con todas las piezas .glb ya montadas, compila los shaders en segundo plano (compileAsync) antes del
 *  primer cuadro —en vez de compilarlos de golpe dentro de él— y recién entonces dibuja y avisa para el fade-in. */
function ReadySignal({ compiled, onCompiled, onReady }: { compiled: boolean; onCompiled: () => void; onReady: () => void }) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const camera = useThree((s) => s.camera)
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    let alive = true
    gl.compileAsync(scene, camera)
      .catch(() => {})
      .then(() => alive && onCompiled())
    return () => {
      alive = false
    }
  }, [gl, scene, camera, onCompiled])
  useEffect(() => {
    if (!compiled) return
    invalidate()
    const raf = requestAnimationFrame(() => requestAnimationFrame(onReady))
    return () => cancelAnimationFrame(raf)
  }, [compiled, invalidate, onReady])
  return null
}

const TILE_COLORS = { grass: '#46b57a', lot: '#59607a', plaza: '#8b90a8', road: '#8b90a8' } as const

/** Base del pueblo: una baldosa por celda no vacía (césped, lote, plaza o asfalto), con el borde irregular del plano.
 *  La baldosa de asfalto va un poco más abajo, justo debajo de la pieza de calle, para rellenar las esquinas
 *  transparentes de las curvas sin superponerse con la superficie de la calle.
 *  Un InstancedMesh por tipo de suelo: 4 objetos (y 4 dibujados por cuadro) en vez de ~125. */
function Ground() {
  const meshes = useMemo(() => {
    const geo = new THREE.BoxGeometry(1, 0.1, 1)
    const m = new THREE.Matrix4()
    return (Object.keys(TILE_COLORS) as GroundKind[]).map((kind) => {
      const tiles = GROUND_TILES.filter((t) => t.kind === kind)
      const mesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: TILE_COLORS[kind] }), tiles.length)
      tiles.forEach((t, i) => {
        const [x, , z] = cellPosition(t.fila, t.columna)
        mesh.setMatrixAt(i, m.makeTranslation(x, kind === 'road' ? -0.07 : -0.05, z))
      })
      mesh.computeBoundingSphere()
      return mesh
    })
  }, [])
  return (
    <>
      {meshes.map((mesh) => (
        <primitive key={mesh.uuid} object={mesh} />
      ))}
    </>
  )
}

/** Monta las piezas de a tandas (calles → árboles → edificios). Cada tanda es un commit corto y entre una y
 *  otra el navegador queda libre; al terminar avisa con onBuilt. */
function City({ registry, onBuilt }: { registry: Registry; onBuilt: () => void }) {
  const layers = useCityLayers()
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (count >= ORDERED_PIECES.length) {
      onBuilt()
      return
    }
    // setTimeout (y no rAF): con frameloop="never" no hay cuadros, y así la siguiente tanda va en otra tarea
    const t = setTimeout(() => setCount((c) => Math.min(c + BATCH, ORDERED_PIECES.length)), 0)
    return () => clearTimeout(t)
  }, [count, onBuilt])
  return (
    <>
      {ORDERED_PIECES.slice(0, count).map((p) => (
        <Piece key={p.id} piece={p} layers={layers} registry={registry} />
      ))}
    </>
  )
}

/** Fuente procedural (el kit no trae una): pileta de piedra, agua y surtidor central. */
function Fountain() {
  const [x, , z] = FOUNTAIN_POSITION
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.42, 0.45, 0.14, 24]} />
        <meshStandardMaterial color="#c9ccdb" />
      </mesh>
      <mesh position={[0, 0.135, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.03, 24]} />
        <meshStandardMaterial color="#4cc9f0" emissive="#2dd4f0" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0, 0.27, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.26, 12]} />
        <meshStandardMaterial color="#c9ccdb" />
      </mesh>
      <mesh position={[0, 0.44, 0]}>
        <sphereGeometry args={[0.09, 16, 12]} />
        <meshStandardMaterial color="#8be9ff" emissive="#2dd4f0" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

const CAM_POS = new THREE.Vector3(10, 8.5, 10)
const CAM_TARGET = new THREE.Vector3(0, 0.3, 0)

/** Encuadra la cámara al pueblo real: proyecta todas las piezas y ajusta zoom y centro para llenar el canvas. */
function CameraRig() {
  const camera = useThree((s) => s.camera) as THREE.OrthographicCamera
  const size = useThree((s) => s.size)
  const invalidate = useThree((s) => s.invalidate)
  useLayoutEffect(() => {
    /* eslint-disable react-hooks/immutability */
    camera.position.copy(CAM_POS)
    camera.lookAt(CAM_TARGET)
    camera.updateMatrixWorld()
    const v = new THREE.Vector3()
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    for (const p of CITY_PIECES) {
      const [x, , z] = piecePosition(p)
      for (const [dx, dy, dz] of [[-0.5, 0, -0.5], [0.5, 0, -0.5], [-0.5, 0, 0.5], [0.5, 0, 0.5], [0, 1.2, 0]]) {
        v.set(x + dx, dy, z + dz).applyMatrix4(camera.matrixWorldInverse)
        minX = Math.min(minX, v.x); maxX = Math.max(maxX, v.x)
        minY = Math.min(minY, v.y); maxY = Math.max(maxY, v.y)
      }
    }
    // el pueblo (con un margen) ocupa una caja de fitW × fitH unidades, centrada en el canvas: la captura
    // estática del hero se saca con esa misma proporción para coincidir con la escena (object-fit: contain)
    const fitW = maxX - minX + 0.6
    const fitH = maxY - minY + 1.4
    if (CAPTURE) Object.assign(window, { __cityFit: [fitW, fitH] })
    camera.zoom = Math.min(size.width / fitW, size.height / fitH)
    // centra el pueblo en el canvas moviendo cámara y objetivo en su plano
    const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0)
    const up = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1)
    const shift = right.multiplyScalar((minX + maxX) / 2).add(up.multiplyScalar((minY + maxY) / 2 + 0.2))
    camera.position.copy(CAM_POS).add(shift)
    camera.lookAt(CAM_TARGET.clone().add(shift))
    camera.updateProjectionMatrix()
    /* eslint-enable react-hooks/immutability */
    invalidate()
  }, [camera, size, invalidate])
  return null
}

type HeroCity3DProps = {
  images: ProductImage[]
  pointer: RefObject<{ x: number; y: number }>
  avatarLayer: RefObject<HTMLDivElement>
  onReady: () => void
}

export default function HeroCity3D({ images, pointer, avatarLayer, onReady }: HeroCity3DProps) {
  const [registry] = useState<Registry>(() => new Map())
  // Este componente solo se monta si el equipo tiene GPU (ver gpu.ts); sin ella el hero queda con la captura.
  // La luz del glow existe siempre (en 0 hasta que un edificio se enciende): si se agregara después de
  // precompilar, three tendría que recompilar todos los shaders de golpe en el primer cuadro.
  const lightRef = useRef<THREE.PointLight>(null)
  const [built, setBuilt] = useState(false)
  const onBuilt = useCallback(() => setBuilt(true), [])
  const [compiled, setCompiled] = useState(false)
  const onCompiled = useCallback(() => setCompiled(true), [])
  const mode = useMemo<ParallaxMode>(() => {
    if (CAPTURE || matchMedia('(prefers-reduced-motion: reduce)').matches) return 'none'
    return matchMedia('(pointer: fine)').matches ? 'mouse' : 'auto'
  }, [])
  const coarse = matchMedia('(pointer: coarse)').matches
  // No se dibuja nada mientras la escena está fuera de pantalla o la pestaña está oculta
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const wrap = avatarLayer.current?.parentElement
    let onScreen = true
    const apply = () => setVisible(onScreen && !document.hidden)
    const io = wrap ? new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; apply() }) : null
    if (wrap) io?.observe(wrap)
    document.addEventListener('visibilitychange', apply)
    return () => {
      io?.disconnect()
      document.removeEventListener('visibilitychange', apply)
    }
  }, [avatarLayer])
  // En mobile el contenedor (aspect-ratio + will-change) a veces monta con tamaño 0 y R3F no vuelve
  // a medir hasta el primer scroll/resize, dejando la escena en blanco. Forzamos la remedición al montar
  // y cada vez que el contenedor de la escena cambia de tamaño.
  useEffect(() => {
    const kick = () => window.dispatchEvent(new Event('resize'))
    const raf1 = requestAnimationFrame(() => requestAnimationFrame(kick))
    const t = setTimeout(kick, 300)
    const wrap = avatarLayer.current?.parentElement
    const ro = wrap ? new ResizeObserver(() => requestAnimationFrame(kick)) : null
    if (wrap) ro?.observe(wrap)
    return () => {
      cancelAnimationFrame(raf1)
      clearTimeout(t)
      ro?.disconnect()
    }
  }, [avatarLayer])
  return (
    <Canvas
      flat
      orthographic
      frameloop={visible && compiled ? 'demand' : 'never'}
      dpr={[1, coarse ? 1.5 : 1.75]}
      camera={{ position: [10, 8.5, 10], zoom: 60, near: 0.1, far: 100 }}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: CAPTURE }}
      onCreated={({ gl }) => {
        // en producción no se consulta el estado de compilación de cada shader (esa consulta bloquea el hilo
        // principal hasta que la GPU termina de compilar); en desarrollo se mantiene para ver errores
        gl.debug.checkShaderErrors = import.meta.env.DEV
      }}
    >
      <CameraRig />
      <ambientLight color="#f0ecff" intensity={1.35} />
      <directionalLight color="#fff1e0" intensity={2.1} position={[5, 9, 6]} />
      <Parallax pointer={pointer} mode={visible ? mode : 'none'}>
        <Ground />
        <Fountain />
        <City registry={registry} onBuilt={onBuilt} />
        <pointLight ref={lightRef} intensity={0} distance={5} decay={1.5} />
        {built && !CAPTURE && <Orchestrator registry={registry} images={images} avatarLayer={avatarLayer} lightRef={lightRef} />}
      </Parallax>
      {built && <ReadySignal compiled={compiled} onCompiled={onCompiled} onReady={onReady} />}
    </Canvas>
  )
}
