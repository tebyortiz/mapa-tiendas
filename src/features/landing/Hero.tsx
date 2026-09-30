import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { FormEvent, PointerEvent } from 'react'
import { GlowBackdrop } from '../../components/brand/GlowBackdrop'
import { Button } from '../../components/ui/Button'
import { SearchInput, SEARCH_SUGGESTIONS } from '../../components/ui/SearchInput'
import { LocationRow } from './shared'
import type { ProductImage } from './city/cityConfig'

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

const HeroCity3D = lazy(() => import('./city/HeroCity3D'))

// Avatares de producto por categoría: naranja=tienda, azul claro=servicio, violeta=emprendimiento
const photo = (n: string) => `/assets/photos/${n}`
const PRODUCT_IMAGES: ProductImage[] = [
  // tiendas: tiendasmap01..25 (06 es .png, el resto .jpg)
  ...Array.from({ length: 25 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return { src: photo(`tiendasmap${n}.${n === '06' ? 'png' : 'jpg'}`), category: 'tienda' as const }
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
        {/* mientras carga el chunk 3D (three + drei) el área queda transparente sobre el GlowBackdrop,
            sin captura de por medio: la escena real aparece directamente */}
        <Suspense fallback={null}>
          <HeroCity3D images={PRODUCT_IMAGES} pointer={pointer} avatarLayer={avatarLayer} />
        </Suspense>
      </div>
      {/* fuera de la máscara de .hero-city: los avatares pueden subir más allá de la escena */}
      <div ref={avatarLayer} className="hero-avatars" aria-hidden="true" />
    </div>
  )
}

export function LandingHero({ onOpenMap, onSearch, city }: { onOpenMap: () => void; onSearch?: (q: string) => void; city?: string }) {
  const [q, setQ] = useState('')
  // Ancho real del contenido de la marca (canasta + "COMPRÁ FÁCIL"); en desktop se usa como
  // max-width del texto y del buscador para que ocupen exactamente lo mismo que el logo.
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
      <GlowBackdrop palette="rainbow" intensity={0.38} />
      <div className="lp-hero" style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, minHeight: 'min(760px,calc(100vh - 140px))', ['--hero-brand-w' as string]: brandW ? `${brandW}px` : undefined }}>
        <div className="hero-head">
        <div ref={brandRef} className="hero-brand" style={{ order: 1, display: 'flex', alignItems: 'flex-end', gap: 'clamp(12px,2vw,20px)', marginTop: 'clamp(8px,5vw,64px)' }}>
          <div className="hero-basket" style={{ flex: 'none' }}>
            <img src="/assets/logo/basket-mark.png" alt="" className="hero-basket-img" style={{ display: 'block', height: 'clamp(110px,19vw,240px)', width: 'auto', marginBottom: 'clamp(10px,2vw,26px)' }} />
          </div>
          <h1 className="cf-neon cf-neon-on" aria-label="Comprá Fácil" style={{ margin: 0, fontSize: 'clamp(44px,7vw,100px)', lineHeight: 0.95, whiteSpace: 'nowrap' }}>
            <FlickerWord text="COMPRÁ" seed={0} />
            <br />
            <FlickerWord text="FÁCIL" seed={6} />
          </h1>
        </div>

        <div className="hero-explore" style={{ order: 2, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ font: '800 clamp(18px,2.4vw,26px)/1.2 var(--font-body)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#fff', textShadow: 'var(--neon-text-soft)' }}>EXPLORÁ TU CIUDAD</div>
        </div>

        <div className="hero-location" style={{ order: 3 }}>
          <LocationRow city={city ?? 'Tunuyán'} />
        </div>
        </div>

        <HeroCity />

        <p className="hero-desc" style={{ order: 5, margin: 0, maxWidth: 500, font: '500 var(--fs-body-lg)/1.5 var(--font-body)', color: 'var(--text-body)', textWrap: 'pretty' }}>
          Tiendas, servicios y emprendimientos de tu cuadra y alrededores, todos en un mapa. Encontrá lo que necesitás, cerca tuyo.
        </p>

        <form className="hero-search" onSubmit={submit} style={{ order: 6, display: 'flex', gap: 8, alignItems: 'center', width: '100%', maxWidth: 560 }}>
          <SearchInput value={q} onChange={setQ} placeholder="¿Qué buscás cerca tuyo?" suggestions={SEARCH_SUGGESTIONS} style={{ flex: 1, minWidth: 0 }} />
          <Button htmlType="submit" icon="search" style={{ height: 48, flex: 'none', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)' }}>Buscar</Button>
        </form>
      </div>
    </section>
  )
}
