import { GlowBackdrop } from '../../components/brand/GlowBackdrop'
import { TypeAvatar } from '../../components/business/TypeAvatar'
import { Button } from '../../components/ui/Button'
import { ImageSlot } from '../../components/ui/ImageSlot'
import { SoonBadge } from '../../components/ui/SoonBadge'
import { useHover } from '../../components/ui/useHover'
import { REQUESTED } from '../../data/offers'
import type { Requested } from '../../data/types'
import { useNearby } from '../../lib/nearbyStore'
import { OFFER_C } from './offerColors'
import { SectionHead, SlideCarousel } from './shared'
import type { OpenMap } from './shared'

function RequestedCard({ r }: { r: Requested }) {
  const { h, bind } = useHover()
  return (
    <article {...bind} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Círculo + nombre de quien lo ofrece: ahora va arriba de la imagen */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 2px' }}>
        <ImageSlot shape="circle" placeholder="Foto" style={{ width: 44, height: 44, flex: 'none', boxShadow: 'inset 0 0 0 1px var(--border-strong)', borderRadius: '50%' }} />
        <span style={{ font: '800 15px/1.2 var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{r.person}</span>
      </div>
      <div style={{ position: 'relative', aspectRatio: '1.7 / 1', borderRadius: 'var(--radius-panel)', overflow: 'hidden', background: 'var(--surface)', boxShadow: h ? `var(--glow-${r.type})` : 'inset 0 0 0 1px var(--border)', transition: 'box-shadow var(--dur-slow) var(--ease-out)' }}>
        <ImageSlot placeholder="Foto del servicio o emprendimiento" style={{ position: 'absolute', inset: 0 }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, padding: '0 2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <TypeAvatar type={r.type} category={r.category} size={44} />
          <h3 style={{ margin: 0, font: '800 clamp(18px,1.8vw,24px)/1.2 var(--font-body)', textTransform: 'uppercase', color: OFFER_C[r.type] }}>{r.service}</h3>
        </div>
        <p style={{ margin: '2px 0 0', minHeight: '3em', font: '400 14px/1.5 var(--font-body)', color: 'var(--text-muted)' }}>{r.description}</p>
        <div style={{ marginTop: 10 }}><Button type={r.type} size="sm" icon="message-circle" disabled title="Próximamente">conectar</Button></div>
      </div>
    </article>
  )
}

export function LandingMostRequested({ geo }: { onOpenMap: OpenMap; geo: ReturnType<typeof useNearby> }) {
  return (
    <section id="mas-solicitados" className="lp-sec" style={{ position: 'relative', overflow: 'hidden', padding: '56px 0' }}>
      <GlowBackdrop palette="servicio" intensity={0.3} />
      <div className="requested-art" aria-hidden="true" style={{ position: 'absolute', zIndex: 0, top: 4, left: 'calc(-1 * clamp(64px,6vw,120px))', width: 'clamp(150px,15vw,260px)', pointerEvents: 'none' }}>
        <img src="/assets/illustrations/plus-requested-3d.png" alt="" style={{ display: 'block', width: '100%', height: 'auto', opacity: 0.85, transform: 'perspective(900px) rotateY(18deg) rotate(-8deg)', filter: 'drop-shadow(0 20px 24px rgba(0,0,0,.55)) drop-shadow(0 0 34px rgba(164,116,245,.4)) drop-shadow(0 0 60px rgba(79,169,238,.25))' }} />
      </div>
      <div className="requested-body" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto' }}>
          <SectionHead className="requested-head" title="MÁS SOLICITADOS" subtitle="Servicios y emprendimientos más demandados en:" city={geo.nearby?.city ?? 'Tunuyán'} badge={<SoonBadge />} />
        </div>
        <div style={{ opacity: 0.72 }}>
          <SlideCarousel items={REQUESTED} render={(r) => <RequestedCard r={r} />} />
        </div>
      </div>
    </section>
  )
}
