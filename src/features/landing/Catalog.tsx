import { GlowBackdrop } from '../../components/brand/GlowBackdrop'
import { NeonHeading } from '../../components/brand/NeonHeading'
import { Reveal } from '../../components/brand/Reveal'
import { CatalogCard } from '../../components/business/CatalogCard'
import type { BusinessType } from '../../data/types'
import type { OpenMap } from './shared'

interface CardDef {
  type: BusinessType
  title: string
  description: string
  /** Prefijo de las 3 imágenes del carrusel: `${slug}01..03.jpg` */
  slug: string
  comingSoon?: boolean
}

const CARDS: CardDef[] = [
  { type: 'tienda', title: 'TIENDAS', description: 'Supermercados, ropa, electrónica y todo lo del día a día.', slug: 'carr-tienda' },
  { type: 'servicio', title: 'SERVICIOS', description: 'Mecánicos, ferreterías, técnicos y más, a pocas cuadras.', slug: 'carr-servicios', comingSoon: true },
  { type: 'emprendimiento', title: 'EMPRENDIMIENTOS', description: 'Lo que hacen tus vecinos: comida, diseño, oficios.', slug: 'carr-emprend', comingSoon: true },
]

const slides = (slug: string) => [1, 2, 3].map((n) => `/assets/photos/${slug}0${n}.jpg`)

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
          {CARDS.map((c, i) => (
            <Reveal key={c.type} i={i}>
              <div id={c.title.toLowerCase()}>
                <CatalogCard type={c.type} title={c.title} description={c.description} image={slides(c.slug)} comingSoon={c.comingSoon} startDelay={i * 900} height={420} onClick={() => onOpenMap(c.type)} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
