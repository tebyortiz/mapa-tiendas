import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent, PointerEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { ErrorBoundary } from '../../components/ui/ErrorBoundary'
import { Icon } from '../../components/ui/Icon'
import { SearchInput } from '../../components/ui/SearchInput'
import { SEARCH_SUGGESTIONS } from '../../components/ui/searchSuggestions'
import type { ProductImage } from './city/cityConfig'
import { hasHardwareWebGL } from './city/gpu'
import { BASKET_SRCSET } from '../../components/ui/srcSet'

// la canasta del hero mide clamp(110px,16vw,200px) de alto → ancho × 1.125
const HERO_BASKET_SIZES = 'clamp(124px, 18vw, 225px)'

// [duración, delay] de las letras que parpadean, por posición (seed + índice)
const FLICKER: Record<number, [number, number]> = { 1: [9.5, 2.1], 4: [13, 5.4], 7: [11, 8.2], 9: [15.5, 3.3] }

function FlickerWord({ text, seed }: { text: string; seed: number }) {
  return (
    <span aria-hidden="true">
      {text.split('').map((ch, j) => {
        const f = FLICKER[seed + j]
        return (
          <span key={j} className={f ? 'hero-letter' : undefined} style={f ? { animationDuration: `${f[0]}s`, animationDelay: `${f[1]}s` } : undefined}>
            {ch}
          </span>
        )
      })}
    </span>
  )
}

// Íconos junto a "EXPLORÁ TU CIUDAD" (mismos que el navbar): [ícono, color, rótulo, duración y delay del parpadeo]
const EXPLORE_ICONS: [string, string, string, number, number][] = [
  ['shopping-bag', 'var(--tienda)', 'Tiendas', 7.5, 1.6],
  ['wrench', 'var(--servicio)', 'Servicios', 9, 3.1],
  ['sparkles', 'var(--emprendimiento)', 'Emprendimientos', 6.5, 4.4],
  ['badge-percent', '#fff', 'Ofertas', 8.2, 2.3],
]

const HeroCity3D = lazy(() => import('./city/HeroCity3D'))

// Captura estática de la ciudad (WebP con transparencia, generada por scripts/capture-city.mjs).
// width/height = proporción de la caja que encuadra la cámara (1.546): con object-fit: contain coincide con la
// escena 3D. sizes estima el ancho de la imagen ya encajada, que en todos los casos limita el alto de la escena:
// mobile ≈ 0.945 × ancho de la escena (170vw / 122vw); desktop = alto de la escena × 1.546, con alto =
// min(96% del hero, 900px) y hero ≈ 100vh − 160px.
const CITY_POSTER = {
  base: '/assets/scenes/city',
  widths: [960, 1280, 1600, 2160],
  width: 1600,
  height: 1035,
  sizes: '(max-width: 759px) 162vw, (max-width: 959px) 116vw, min(150vw, 1391px, calc((100vh - 160px) * 1.484))',
}

// Avatares de producto por categoría: naranja=tienda, azul claro=servicio, violeta=emprendimiento
const photo = (n: string) => `/assets/photos/${n}`
const PRODUCT_IMAGES: ProductImage[] = [
  // tiendas: tiendasmap01..25 (06 es .webp, el resto .jpg)
  ...Array.from({ length: 25 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return { src: photo(`tiendasmap${n}.${n === '06' ? 'webp' : 'jpg'}`), category: 'tienda' as const }
  }),
  // servicios: serviciosmap01..06
  ...Array.from({ length: 6 }, (_, i) => ({ src: photo(`serviciosmap${String(i + 1).padStart(2, '0')}.jpg`), category: 'servicio' as const })),
  // emprendimientos: emprendimientosmap01..04
  ...Array.from({ length: 4 }, (_, i) => ({ src: photo(`emprendimientosmap${String(i + 1).padStart(2, '0')}.jpg`), category: 'emprendimiento' as const })),
]

function HeroCity() {
  const pointer = useRef({ x: 0, y: 0 })
  const avatarLayer = useRef<HTMLDivElement>(null!)
  const wrapRef = useRef<HTMLDivElement>(null)
  // De entrada se ve la captura estática de la ciudad (liviana, aparece al instante). La escena 3D (three +
  // 3 .glb) se monta recién cuando la página terminó de cargar y el navegador está libre, y solo si el equipo
  // tiene GPU: sin ella, cada cuadro lo dibujaría la CPU y la página se trabaría, así que queda la captura.
  // Cuando la escena está lista aparece con un fundido sobre la captura, que coincide con ella.
  const [mount3D, setMount3D] = useState(false)
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])
  // la captura se oculta cuando terminó el fundido de la escena (0.9 s); se oculta de golpe (visibility),
  // sin animar: una transición de opacity de duración 0 no la puede resolver la GPU
  const [posterHidden, setPosterHidden] = useState(false)
  useEffect(() => {
    if (!ready) return
    const t = window.setTimeout(() => setPosterHidden(true), 950)
    return () => clearTimeout(t)
  }, [ready])
  useEffect(() => {
    let cancelled = false
    let idle = 0
    let timer = 0
    const run = () => {
      if (cancelled) return
      hasHardwareWebGL().then((ok) => {
        if (ok && !cancelled) setMount3D(true)
      })
    }
    const start = () => {
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(run, { timeout: 1500 })
      else timer = window.setTimeout(run, 200)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', start)
      if (idle) cancelIdleCallback(idle)
      clearTimeout(timer)
    }
  }, [])
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    pointer.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }
  }
  // Parallax de scroll en mobile: la escena se desplaza suavemente según su paso por el viewport
  // (en desktop y con reduced-motion no se aplica; ahí ya está el parallax por puntero de la escena 3D)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const mqMobile = matchMedia('(max-width: 959px)')
    const mqReduce = matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    const update = () => {
      raf = 0
      if (!mqMobile.matches || mqReduce.matches) {
        el.style.removeProperty('--parallax-y')
        return
      }
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // progreso del centro del elemento cruzando el viewport (~ -0.5 abajo .. +0.5 arriba)
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh
      el.style.setProperty('--parallax-y', `${(progress * 44).toFixed(1)}px`)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div className="hero-city-wrap" ref={wrapRef}>
      <div
        className="hero-city"
        aria-label="Escena 3D de la ciudad"
        role="img"
        onPointerMove={onMove}
        onPointerLeave={() => (pointer.current = { x: 0, y: 0 })}
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        {/* captura de la escena (scripts/capture-city.mjs): mismo encuadre que el 3D gracias a object-fit: contain.
            Se oculta recién cuando terminó el fundido de la escena, para que no se vea un "bache" en el medio */}
        <img
          className="hero-city-poster"
          src={`${CITY_POSTER.base}-${CITY_POSTER.widths[1]}.webp`}
          srcSet={CITY_POSTER.widths.map((w) => `${CITY_POSTER.base}-${w}.webp ${w}w`).join(', ')}
          sizes={CITY_POSTER.sizes}
          width={CITY_POSTER.width}
          height={CITY_POSTER.height}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          draggable={false}
          style={{ visibility: posterHidden ? 'hidden' : undefined }}
        />
        {/* will-change: la capa de la escena va en su propia capa de la GPU y el fundido no repinta la página */}
        <div style={{ position: 'absolute', inset: 0, opacity: ready ? 1 : 0, transition: 'opacity .9s var(--ease-out)', willChange: 'opacity' }}>
          {mount3D && (
            <ErrorBoundary fallback={null}>
              <Suspense fallback={null}>
                <HeroCity3D images={PRODUCT_IMAGES} pointer={pointer} avatarLayer={avatarLayer} onReady={onReady} />
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
      </div>
      {/* fuera de la máscara de .hero-city: los avatares pueden subir más allá de la escena */}
      <div ref={avatarLayer} className="hero-avatars" aria-hidden="true" />
    </div>
  )
}

export function LandingHero({ onOpenMap, onSearch }: { onOpenMap: () => void; onSearch?: (q: string) => void }) {
  const [q, setQ] = useState('')
  // Ancho real de la fila de marca (canasta + "COMPRÁ FÁCIL"); en desktop se usa como ancho del
  // buscador y de la descripción, para que ocupen exactamente lo mismo que el logo.
  const brandRef = useRef<HTMLDivElement>(null)
  const [brandW, setBrandW] = useState<number>()
  useEffect(() => {
    const el = brandRef.current
    if (!el) return
    const measure = () => {
      const basket = el.querySelector<HTMLElement>('.hero-basket-img')
      const h1 = el.querySelector<HTMLElement>('h1')
      if (!basket || !h1) return
      const w = h1.getBoundingClientRect().right - basket.getBoundingClientRect().left
      if (w > 0) setBrandW(Math.round(w))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const img = el.querySelector<HTMLImageElement>('.hero-basket-img')
    if (img && !img.complete) img.addEventListener('load', measure)
    return () => {
      ro.disconnect()
      if (img) img.removeEventListener('load', measure)
    }
  }, [])
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (q.trim() && onSearch) onSearch(q.trim())
    else onOpenMap()
  }
  return (
    <section id="hero" className="lp-sec" style={{ position: 'relative', padding: '32px var(--gutter) 48px' }}>
      {/* Aurora viva: blobs arcoíris que derivan, respiran y rotan (reemplaza los glows estáticos) */}
      <div className="hero-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="lp-hero" style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, minHeight: 'min(760px,calc(100vh - 140px))', ['--hero-brand-w' as string]: brandW ? `${brandW}px` : undefined }}>
        <div className="hero-head">
          {/* Grilla de marca: canasta + "COMPRÁ FÁCIL" arriba; debajo "EXPLORÁ TU CIUDAD" + íconos neón
              (al costado en desktop, en una fila del mismo ancho debajo en mobile). La disposición la controla el CSS. */}
          <div ref={brandRef} className="hero-brand">
            <div className="hero-basket">
              {/* onda expansiva de glow sincronizada con el destello del basket */}
              <span className="hero-basket-wave" aria-hidden="true" />
              {/* copia de la canasta con el halo blanco fijo, detrás de la original: el destello se anima
                  solo con opacity (lo dibuja la GPU), en vez de animar filter cuadro a cuadro */}
              {/* mismo srcSet/sizes en las dos: el navegador baja una sola imagen. Ancho = alto × 1.125 */}
              <img src="/assets/logo/basket-mark.webp" srcSet={BASKET_SRCSET} sizes={HERO_BASKET_SIZES} alt="" aria-hidden="true" width={450} height={400} className="hero-basket-glow" />
              <img src="/assets/logo/basket-mark.webp" srcSet={BASKET_SRCSET} sizes={HERO_BASKET_SIZES} alt="" width={450} height={400} fetchPriority="high" className="hero-basket-img" style={{ display: 'block', height: 'clamp(110px,16vw,200px)', width: 'auto' }} />
            </div>
            <h1 className="cf-neon cf-neon-on hero-neon" aria-label="Comprá Fácil" style={{ margin: 0, fontSize: 'clamp(44px,6vw,86px)', lineHeight: 0.95, whiteSpace: 'nowrap' }}>
              <FlickerWord text="COMPRÁ" seed={0} />
              <br />
              <FlickerWord text="FÁCIL" seed={6} />
              {/* destello blanco del neón: capa superpuesta con el resplandor fijo que se enciende con opacity */}
              <span className="hero-neon-flash" aria-hidden="true">
                COMPRÁ
                <br />
                FÁCIL
              </span>
            </h1>
            <div className="hero-explore">
              <div style={{ font: '800 clamp(18px,2.4vw,26px)/1.2 var(--font-body)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#fff', textShadow: 'var(--neon-text-soft)', whiteSpace: 'nowrap' }}>EXPLORÁ TU CIUDAD</div>
              <div className="hero-explore-icons">
                {EXPLORE_ICONS.map(([icon, c, label, dur, delay], i) => (
                  // capa de afuera: encendido del tubo; capa de adentro: resplandor + parpadeo periódico
                  <span key={icon} className="hero-explore-icon" style={{ ['--c' as string]: c, animationDuration: '0.9s', animationDelay: `${i * 220 + 500}ms` }}>
                    <span className="hero-explore-icon-glow" style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}>
                      <Icon name={icon} size={26} color={c} label={label} />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <HeroCity />

        {/* Consola: buscador arriba (protagonista sobre el mapa) y descripción debajo */}
        <div className="hero-cta">
          <form className="hero-search" onSubmit={submit} style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
            <SearchInput rainbow flowingBorder value={q} onChange={setQ} placeholder="¿Qué buscás cerca tuyo?" suggestions={SEARCH_SUGGESTIONS} style={{ flex: 1, minWidth: 0 }} />
            <Button htmlType="submit" icon="search" aria-label="Buscar" className="hero-search-btn"style={{ height: 48, flex: 'none', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)' }}><span className="hero-search-btn-label">Buscar</span></Button>
          </form>

          <p className="hero-desc" style={{ margin: 0, font: '700 var(--fs-body-lg)/1.5 var(--font-body)', color: 'var(--text-body)', textWrap: 'pretty' }}>
            Tiendas, servicios y emprendimientos de tu cuadra y alrededores, todos en un mapa. Encontrá lo que necesitás, cerca tuyo.
          </p>
        </div>
      </div>
    </section>
  )
}
