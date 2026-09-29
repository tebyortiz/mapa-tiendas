import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'
import type { BusinessType } from '../../../data/types'
import { CITY_PIECES, GROUND_TILES, FOUNTAIN_POSITION, cellPosition, FEATURED, pieceUrl, piecePosition, glowColor } from './cityConfig'
import type { CityPiece, ProductImage } from './cityConfig'

// Todas las piezas únicas se precargan una sola vez
for (const tipo of new Set(CITY_PIECES.map((p) => p.tipo))) useGLTF.preload(pieceUrl(tipo))

type FeaturedEntry = { category: BusinessType; materials: THREE.MeshStandardMaterial[]; anchor: [number, number, number] }
type Registry = Map<string, FeaturedEntry>

function Piece({ piece, registry }: { piece: CityPiece; registry: Registry }) {
  const { scene } = useGLTF(pieceUrl(piece.tipo))
  const category = FEATURED[piece.id]
  const position = piecePosition(piece)
  const scale = piece.escala ?? 1

  const { object, materials, height } = useMemo(() => {
    // clone(true) comparte geometría y material con el original de Kenney
    const object = scene.clone(true)
    const materials: THREE.MeshStandardMaterial[] = []
    if (category) {
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
    }
    return { object, materials, height: new THREE.Box3().setFromObject(object).max.y }
  }, [scene, category])

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

/** Enciende un edificio destacado a la vez (mazo barajado) y muestra el avatar de producto sincronizado. */
function Orchestrator({ registry, images, avatarLayer }: { registry: Registry; images: ProductImage[]; avatarLayer: RefObject<HTMLDivElement> }) {
  const [active, setActive] = useState<Active | null>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const avatarEl = useRef<HTMLDivElement | null>(null)
  const avatarDone = useRef(false)
  // <Html> monta su contenido de forma asíncrona: el avatar se engancha al timeline cuando su ref existe
  const attachAvatar = () => {
    const tl = tlRef.current
    const el = avatarEl.current
    if (!tl || !el || avatarDone.current) return
    avatarDone.current = true
    // el círculo arranca opaco y sube sin parar: cuanto más sube, más se desvanece
    gsap.set(el, { y: 0, opacity: 1 })
    tl.to(el, { y: -110, duration: 1.6, ease: 'power1.out' }, 0).to(el, { opacity: 0, duration: 1.6, ease: 'none' }, 0)
  }
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
    let timer: gsap.core.Tween | null = null
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
      while (ci < cats.length - 1 && r >= weights[ci]) (r -= weights[ci]), ci++
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
      timer = gsap.delayedCall(rand(1.8, 3.2), draw)
    }
    onDone.current = () => {
      setActive(null)
      schedule()
    }
    schedule()
    return () => {
      timer?.kill()
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
    }

    const tl = gsap.timeline({ onComplete: () => onDone.current() })
    // encendido tipo neón: parpadeos que suben → hold → parpadeo y apagado (1.6s en total)
    const steps: [number, number, number][] = [
      [0.9, 0.08, 0], [0.15, 0.07, 0.08], [1.7, 0.08, 0.15], [0.5, 0.07, 0.23], [2.2, 0.15, 0.3],
      [1.2, 0.1, 1.0], [2.2, 0.08, 1.1], [0.3, 0.12, 1.18], [0, 0.3, 1.3],
    ]
    for (const [i, duration, at] of steps) tl.to(glow, { i, duration, ease: 'none', onUpdate: apply }, at)
    avatarDone.current = false
    tlRef.current = tl
    attachAvatar()
    return () => {
      tl.kill()
      tlRef.current = null
      glow.i = 0
      apply()
    }
  }, [active, registry])

  return (
    <>
      <pointLight ref={lightRef} intensity={0} distance={5} decay={1.5} />
      {active?.img && (
    <group position={active.anchor}>
      <Html key={active.key} portal={avatarLayer} transform={false} center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
        <div
          ref={(el) => {
            avatarEl.current = el
            attachAvatar()
          }}
          style={{ opacity: 0, width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', background: 'transparent' }}
        >
          <img src={active.img} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </Html>
    </group>
      )}
    </>
  )
}

/** Inclina levemente la ciudad hacia el cursor (desktop) o la oscila con un seno (mobile / sin mouse). */
function Parallax({ pointer, children }: { pointer: RefObject<{ x: number; y: number }>; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const mode = useMemo(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return 'none'
    return matchMedia('(pointer: fine)').matches ? 'mouse' : 'auto'
  }, [])
  useFrame(({ clock }, dt) => {
    const g = group.current
    if (!g || mode === 'none') return
    const t = clock.elapsedTime
    const tx = mode === 'mouse' ? pointer.current.x : Math.sin(t * 0.3) * 0.5
    const ty = mode === 'mouse' ? pointer.current.y : Math.sin(t * 0.22 + 1) * 0.5
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, tx * 0.14, 3, dt) // ~±4°
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, ty * 0.06, 3, dt) // ~±1.7°
  })
  return <group ref={group}>{children}</group>
}

const TILE_COLORS = { grass: '#46b57a', lot: '#59607a', plaza: '#8b90a8' } as const

/** Base del pueblo: una baldosa por celda no vacía (césped, lote o plaza), con el borde irregular del plano. */
function Ground() {
  const geo = useMemo(() => new THREE.BoxGeometry(1, 0.1, 1), [])
  const mats = useMemo(
    () => ({
      grass: new THREE.MeshStandardMaterial({ color: TILE_COLORS.grass }),
      lot: new THREE.MeshStandardMaterial({ color: TILE_COLORS.lot }),
      plaza: new THREE.MeshStandardMaterial({ color: TILE_COLORS.plaza }),
    }),
    [],
  )
  return (
    <>
      {GROUND_TILES.map((t) => {
        const [x, , z] = cellPosition(t.fila, t.columna)
        return <mesh key={`${t.fila}-${t.columna}`} geometry={geo} material={mats[t.kind]} position={[x, -0.05, z]} />
      })}
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
    camera.zoom = Math.min(size.width / (maxX - minX + 0.6), size.height / (maxY - minY + 1.4))
    // centra el pueblo en el canvas moviendo cámara y objetivo en su plano
    const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0)
    const up = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1)
    const shift = right.multiplyScalar((minX + maxX) / 2).add(up.multiplyScalar((minY + maxY) / 2 + 0.2))
    camera.position.copy(CAM_POS).add(shift)
    camera.lookAt(CAM_TARGET.clone().add(shift))
    camera.updateProjectionMatrix()
    /* eslint-enable react-hooks/immutability */
  }, [camera, size])
  return null
}

export default function HeroCity3D({ images, pointer, avatarLayer }: { images: ProductImage[]; pointer: RefObject<{ x: number; y: number }>; avatarLayer: RefObject<HTMLDivElement> }) {
  const [registry] = useState<Registry>(() => new Map())
  return (
    <Canvas flat orthographic dpr={[1, 1.75]} camera={{ position: [10, 8.5, 10], zoom: 60, near: 0.1, far: 100 }} gl={{ alpha: true, antialias: true }}>
      <CameraRig />
      <ambientLight color="#f0ecff" intensity={1.35} />
      <directionalLight color="#fff1e0" intensity={2.1} position={[5, 9, 6]} />
      <Parallax pointer={pointer}>
        <Ground />
        <Fountain />
        {CITY_PIECES.map((p) => (
          <Piece key={p.id} piece={p} registry={registry} />
        ))}
        <Orchestrator registry={registry} images={images} avatarLayer={avatarLayer} />
      </Parallax>
    </Canvas>
  )
}
