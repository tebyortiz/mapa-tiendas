import { lazy, Suspense, useRef, useState } from 'react'
import type { FormEvent, PointerEvent } from 'react'
import { GlowBackdrop } from '../../components/brand/GlowBackdrop'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { SearchInput } from '../../components/ui/SearchInput'
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

// TEMPORAL: fotos gratuitas de internet (picsum.photos) para los avatares; se reemplazan por las definitivas
const stock = (kw: string, n: number) => `https://picsum.photos/seed/${kw}${n}/120`
const PRODUCT_IMAGES: ProductImage[] = [
  ...['clothes', 'shoes', 'coffee', 'bread'].map((k, i) => ({ src: stock(k, i + 1), category: 'tienda' as const })),
  ...['tools', 'haircut', 'plumbing', 'car'].map((k, i) => ({ src: stock(k, i + 11), category: 'servicio' as const })),
  ...['cake', 'handmade', 'pottery', 'jam'].map((k, i) => ({ src: stock(k, i + 21), category: 'emprendimiento' as const })),
]

function HeroCity() {
  const pointer = useRef({ x: 0, y: 0 })
  const fade = 'radial-gradient(ellipse 72% 68% at 50% 50%,#000 78%,transparent 100%)'
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    pointer.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }
  }
  return (
    <div
      className="hero-city"
      aria-label="Escena 3D de la ciudad"
      role="img"
      onPointerMove={onMove}
      onPointerLeave={() => (pointer.current = { x: 0, y: 0 })}
      style={{ position: 'relative', width: '100%', justifySelf: 'center', alignSelf: 'center', WebkitMaskImage: fade, maskImage: fade }}
    >
      {/* mientras carga el chunk 3D (three + drei) se ve la captura estática */}
      <Suspense fallback={<img src="/assets/scenes/kenney-city-preview.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.62) saturate(1.15) contrast(1.08)' }} />}>
        <HeroCity3D images={PRODUCT_IMAGES} pointer={pointer} />
      </Suspense>
    </div>
  )
}

export function LandingHero({ onOpenMap, onSearch, city }: { onOpenMap: () => void; onSearch?: (q: string) => void; city?: string }) {
  const [q, setQ] = useState('')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (q.trim() && onSearch) onSearch(q.trim())
    else onOpenMap()
  }
  return (
    <section id="hero" className="lp-sec" style={{ position: 'relative', overflow: 'hidden', padding: '32px var(--gutter) 48px' }}>
      <GlowBackdrop palette="rainbow" intensity={0.38} />
      <div className="lp-hero" style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gap: 32, alignItems: 'stretch', minHeight: 'min(760px,calc(100vh - 140px))' }}>
        <div className="hero-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="hero-brand" style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(12px,2vw,20px)', marginTop: 'clamp(8px,5vw,64px)' }}>
            <div className="hero-basket" style={{ flex: 'none' }}>
              <img src="/assets/logo/basket-mark.png" alt="" className="hero-basket-img" style={{ display: 'block', height: 'clamp(110px,19vw,240px)', width: 'auto' }} />
            </div>
            <h1 className="cf-neon cf-neon-on" aria-label="Comprá Fácil" style={{ margin: 0, fontSize: 'clamp(44px,7vw,100px)', lineHeight: 0.95, whiteSpace: 'nowrap' }}>
              <FlickerWord text="COMPRÁ" seed={0} />
              <br />
              <FlickerWord text="FÁCIL" seed={6} />
            </h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="hero-explore-ic" style={{ width: 44, height: 44, flex: 'none', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,.2)', boxShadow: 'inset 0 0 0 2.5px rgba(255,255,255,.6), 0 0 14px rgba(255,255,255,.35), 0 0 32px rgba(255,255,255,.18)' }}>
                <Icon name="map-pinned" size={20} color="#fff" style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,.9)) drop-shadow(0 0 6px rgba(255,255,255,.6))' }} />
              </div>
              <div style={{ font: '800 clamp(18px,2.4vw,26px)/1.2 var(--font-body)', letterSpacing: '.12em', textTransform: 'uppercase', color: '#fff', textShadow: 'var(--neon-text-soft)' }}>EXPLORÁ TU CIUDAD</div>
            </div>
            <p className="hero-desc" style={{ margin: '16px 0 0', maxWidth: 500, font: '500 var(--fs-body-lg)/1.5 var(--font-body)', color: 'var(--text-body)', textWrap: 'pretty' }}>
              Tiendas, servicios y emprendimientos de tu ciudad en un mapa. Encontrá lo que necesitás, cerca tuyo.
            </p>
          </div>
          </div>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 560 }}>
              <form onSubmit={submit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <SearchInput value={q} onChange={setQ} placeholder="¿Qué buscás cerca tuyo?" style={{ flex: 1, minWidth: 0 }} />
                <Button htmlType="submit" icon="search" style={{ height: 48, flex: 'none', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)' }}>Buscar</Button>
              </form>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <LocationRow city={city ?? 'Tunuyán'} />
                <Button variant="secondary" iconRight="map" onClick={onOpenMap} style={{ height: 48, flex: '1 1 140px' }}>abrir mapa</Button>
              </div>
            </div>
        </div>
        <HeroCity />
      </div>
    </section>
  )
}
