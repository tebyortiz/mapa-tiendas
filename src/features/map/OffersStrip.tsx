import { OfferRow } from '../../components/business/OfferRow'
import { Icon } from '../../components/ui/Icon'
import type { Business } from '../../data/types'

export function OffersStrip({ b }: { b: Business }) {
  if (!b.deals.length) return null
  return (
    <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 8, flex: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '800 12px var(--font-body)', letterSpacing: '.1em', textTransform: 'uppercase', color: '#fff', textShadow: 'var(--neon-text-soft)' }}>
        <Icon name="badge-percent" size={14} color="#fff" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,.6)) drop-shadow(0 0 10px rgba(255,255,255,.35))' }} />
        Ofertas vigentes
      </div>
      {b.deals.slice(0, 3).map((d, i) => (
        <OfferRow key={i} d={d} type={b.type} category={b.category} url={b.web} />
      ))}
    </div>
  )
}
