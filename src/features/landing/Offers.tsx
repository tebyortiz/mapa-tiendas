import { GlowBackdrop } from '../../components/brand/GlowBackdrop'
import { TypeAvatar } from '../../components/business/TypeAvatar'
import { Button } from '../../components/ui/Button'
import { ImageSlot } from '../../components/ui/ImageSlot'
import { useHover } from '../../components/ui/useHover'
import { BUSINESSES } from '../../data/businesses'
import { OFFERS } from '../../data/offers'
import type { Business, Offer } from '../../data/types'
import { offersOf, useNearby } from '../../lib/nearbyStore'
import { OFFER_C } from './offerColors'
import { SectionHead, SlideCarousel } from './shared'
import type { OpenMap } from './shared'

function OfferCard({ o, businesses, onMore }: { o: Offer; businesses: Business[]; onMore: () => void }) {
  const { h, bind } = useHover()
  const biz = businesses.find((b) => b.id === o.businessId)
  return (
    <article {...bind} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ position: 'relative', aspectRatio: '2.15 / 1', borderRadius: 'var(--radius-panel)', overflow: 'hidden', background: 'var(--surface)', boxShadow: h ? `var(--glow-${o.type})` : 'inset 0 0 0 1px var(--border)', transition: 'box-shadow var(--dur-slow) var(--ease-out)' }}>
        <ImageSlot src={o.image} placeholder="Imagen de la oferta" style={{ position: 'absolute', inset: 0 }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, padding: '0 2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <ImageSlot src={o.storeImage} shape="circle" placeholder="Foto" style={{ width: 44, height: 44, flex: 'none', boxShadow: 'inset 0 0 0 1px var(--border-strong)', borderRadius: '50%' }} />
          <span style={{ font: '800 15px/1.2 var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{o.store}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <TypeAvatar type={o.type} category={biz?.category} size={44} />
          <h3 style={{ margin: 0, font: '800 clamp(18px,1.8vw,24px)/1.2 var(--font-body)', textTransform: 'uppercase', color: OFFER_C[o.type] }}>{o.title}</h3>
        </div>
        <p style={{ margin: '2px 0 0', minHeight: '3em', font: '400 14px/1.5 var(--font-body)', color: 'var(--text-muted)' }}>{o.description}</p>
        {o.until && <p style={{ margin: 0, font: '700 13px var(--font-body)', color: 'var(--text-strong)' }}>Hasta el {o.until}</p>}
        <div style={{ marginTop: 10 }}><Button type={o.type} size="sm" iconRight="arrow-right" onClick={onMore}>más info</Button></div>
      </div>
    </article>
  )
}

function OfferMore({ onOpenMap }: { onOpenMap: OpenMap }) {
  return (
    <div style={{ position: 'relative', boxSizing: 'border-box', aspectRatio: '2.15 / 1', borderRadius: 'var(--radius-panel)', overflow: 'hidden', background: 'var(--surface)', boxShadow: 'inset 0 0 0 1px var(--border-strong)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 20, textAlign: 'center' }}>
      <GlowBackdrop palette="rainbow" intensity={0.35} parallax={false} />
      <div className="cf-neon cf-neon-on" style={{ position: 'relative', fontSize: 'clamp(20px,2.2vw,30px)', lineHeight: 1.15 }}>
        DESCUBRÍ MÁS OFERTAS<br />EN TU ZONA
      </div>
      <Button iconRight="arrow-right" onClick={() => onOpenMap()} style={{ position: 'relative', color: '#fff' }}>ver ofertas</Button>
    </div>
  )
}

export function LandingOffers({ onOpenMap, geo }: { onOpenMap: OpenMap; geo: ReturnType<typeof useNearby> }) {
  const { nearby, loading, locate } = geo
  const businesses = nearby?.businesses ?? BUSINESSES
  const apiOffers = nearby ? offersOf(nearby.businesses) : []
  const offers = nearby ? apiOffers : OFFERS
  return (
    <section id="ofertas" className="lp-sec" style={{ position: 'relative', overflow: 'hidden', padding: '64px 0' }}>
      <GlowBackdrop palette="tienda" intensity={0.3} />
      <div className="offers-body" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto' }}>
          <SectionHead className="offers-head" title={<>OFERTAS DESTACADAS<br />DE TU ZONA</>} subtitle="Te presentamos las ofertas vigentes en: " city={nearby?.city ?? 'Tunuyán'} />
          {!nearby && (
            <div style={{ maxWidth: 'var(--container)', margin: '12px auto 0', padding: '0 var(--gutter)' }}>
              <Button size="sm" icon="locate-fixed" variant="secondary" onClick={() => void locate()} disabled={loading}>{loading ? 'Buscando…' : 'Usar mi ubicación'}</Button>
            </div>
          )}
          <div className="offers-art" aria-hidden="true" style={{ position: 'absolute', top: '50%', right: 'var(--gutter)', width: 'clamp(150px,13vw,220px)', pointerEvents: 'none' }}>
            <img src="/assets/illustrations/cart-offers-3d.png" alt="" style={{ display: 'block', width: '100%', height: 'auto', transform: 'perspective(900px) rotateY(-14deg) rotateX(4deg)', filter: 'drop-shadow(0 20px 22px rgba(0,0,0,.55)) drop-shadow(0 0 30px rgba(164,116,245,.35)) drop-shadow(0 0 50px rgba(79,169,238,.2))' }} />
          </div>
        </div>
        <SlideCarousel items={offers} render={(o) => <OfferCard o={o} businesses={businesses} onMore={() => onOpenMap(o.type, o.businessId)} />} tail={<OfferMore onOpenMap={onOpenMap} />} />
      </div>
    </section>
  )
}
