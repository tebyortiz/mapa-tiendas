import { GlowBackdrop } from '../../components/brand/GlowBackdrop'
import { TypeAvatar } from '../../components/business/TypeAvatar'
import { Button } from '../../components/ui/Button'
import { ImageSlot } from '../../components/ui/ImageSlot'
import { useHover } from '../../components/ui/useHover'
import { REQUESTED } from '../../data/offers'
import type { Requested } from '../../data/types'
import { OFFER_C } from './offerColors'
import { SectionHead, SlideCarousel } from './shared'
import type { OpenMap } from './shared'

function RequestedCard({ r, onConnect }: { r: Requested; onConnect: () => void }) {
  const { h, bind } = useHover()
  return (
    <article {...bind} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ position: 'relative', aspectRatio: '1.7 / 1', borderRadius: 'var(--radius-panel)', overflow: 'hidden', background: 'var(--surface)', boxShadow: h ? `var(--glow-${r.type})` : 'inset 0 0 0 1px var(--border)', transition: 'box-shadow var(--dur-slow) var(--ease-out)' }}>
        <ImageSlot placeholder="Foto del servicio o emprendimiento" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', pointerEvents: 'none' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, maxWidth: '100%', padding: '4px 14px 4px 4px', borderRadius: 999, background: 'var(--surface-glass-dark)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: 'inset 0 0 0 1px var(--border-strong)', pointerEvents: 'auto' }}>
            <ImageSlot shape="circle" placeholder="Foto" style={{ width: 40, height: 40, flex: 'none', borderRadius: '50%' }} />
            <TypeAvatar type={r.type} category={r.category} size={32} />
            <span style={{ font: '800 14px/1.2 var(--font-body)', letterSpacing: '.04em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.person}</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, padding: '0 2px' }}>
        <h3 style={{ margin: 0, font: '800 clamp(18px,1.8vw,24px)/1.2 var(--font-body)', textTransform: 'uppercase', color: OFFER_C[r.type] }}>{r.service}</h3>
        <p style={{ margin: '2px 0 0', font: '400 14px/1.5 var(--font-body)', color: 'var(--text-muted)' }}>{r.description}</p>
        <div style={{ marginTop: 10 }}><Button type={r.type} size="sm" icon="message-circle" onClick={onConnect}>conectar</Button></div>
      </div>
    </article>
  )
}

export function LandingMostRequested({ onOpenMap }: { onOpenMap: OpenMap }) {
  return (
    <section className="lp-sec" style={{ position: 'relative', overflow: 'hidden', padding: '56px 0' }}>
      <GlowBackdrop palette="servicio" intensity={0.3} />
      <div className="requested-art" aria-hidden="true" style={{ position: 'absolute', zIndex: 0, top: 4, left: 'calc(-1 * clamp(64px,6vw,120px))', width: 'clamp(150px,15vw,260px)', pointerEvents: 'none' }}>
        <img src="/assets/illustrations/plus-requested-3d.png" alt="" style={{ display: 'block', width: '100%', height: 'auto', opacity: 0.85, transform: 'perspective(900px) rotateY(18deg) rotate(-8deg)', filter: 'drop-shadow(0 20px 24px rgba(0,0,0,.55)) drop-shadow(0 0 34px rgba(164,116,245,.4)) drop-shadow(0 0 60px rgba(79,169,238,.25))' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionHead title="MÁS SOLICITADOS" subtitle="Servicios y emprendimientos más demandados en:" city="Tunuyán" action="ver todos" onAction={() => onOpenMap('servicio')} />
        <SlideCarousel items={REQUESTED} render={(r) => <RequestedCard r={r} onConnect={() => onOpenMap(r.type, r.businessId)} />} />
      </div>
    </section>
  )
}
