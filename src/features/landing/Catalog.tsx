import { GlowBackdrop } from '../../components/brand/GlowBackdrop'
import { NeonHeading } from '../../components/brand/NeonHeading'
import { Reveal } from '../../components/brand/Reveal'
import { CatalogCard } from '../../components/business/CatalogCard'
import type { BusinessType } from '../../data/types'
import type { OpenMap } from './shared'

const CARDS: [BusinessType, string, string, string][] = [
  ['tienda', 'TIENDAS', 'Supermercados, ropa, electrónica y todo lo del día a día.', 'tiendas-clerk'],
  ['servicio', 'SERVICIOS', 'Mecánicos, ferreterías, técnicos y más, a pocas cuadras.', 'servicios-mechanic'],
  ['emprendimiento', 'EMPRENDIMIENTOS', 'Lo que hacen tus vecinos: comida, diseño, oficios.', 'emprendimientos-cake'],
]

export function LandingCatalog({ onOpenMap }: { onOpenMap: OpenMap }) {
  return (
    <section id="explorar" className="lp-sec" style={{ position: 'relative', overflow: 'hidden', padding: '72px var(--gutter)' }}>
      <GlowBackdrop palette="emprendimiento" intensity={0.22} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div className="catalog-headwrap" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div className="catalog-head" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px,2vw,20px)' }}>
            <div className="catalog-art" aria-hidden="true" style={{ flex: 'none', width: 'clamp(64px,7vw,104px)', pointerEvents: 'none' }}>
              <img src="/assets/illustrations/map-catalog-3d.png" alt="" style={{ display: 'block', width: '100%', height: 'auto', filter: 'drop-shadow(0 12px 14px rgba(0,0,0,.5)) drop-shadow(0 0 22px rgba(79,169,238,.35)) drop-shadow(0 0 36px rgba(250,110,78,.2))' }} />
            </div>
            <NeonHeading as="h2" style={{ lineHeight: 0.95 }}>CATÁLOGO VIRTUAL</NeonHeading>
          </div>
          <p style={{ margin: 0, font: '500 16px/1.35 var(--font-body)', color: 'var(--text-muted)', maxWidth: 560, textWrap: 'pretty' }}>
            Selecciona la opción que desees y explora los comercios y emprendedores cercanos a tu ubicación en el mapa.
          </p>
        </div>
        <div className="lp-cards" style={{ display: 'grid', gap: 16 }}>
          {CARDS.map(([t, ti, d, p], i) => (
            <Reveal key={t} i={i}>
              <div id={ti.toLowerCase()}>
                <CatalogCard type={t} title={ti} description={d} image={`/assets/photos/${p}.png`} cta="VER MAPA" height={420} onClick={() => onOpenMap(t)} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
