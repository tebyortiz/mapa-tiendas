import type { BusinessType, Deal } from '../../data/types'
import { Badge } from '../ui/Badge'
import { Icon } from '../ui/Icon'

export function OfferRow({ d, type, category }: { d: Deal; type: BusinessType; category: string }) {
  const rgb = { tienda: '255,111,97', servicio: '61,139,255', emprendimiento: '155,107,255' }[type]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 10, borderRadius: 'var(--radius-card)', background: 'rgba(18,18,28,.94)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: `inset 0 0 0 1px rgba(${rgb},.35)`, flex: 'none' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 96, height: 64, flex: 'none', borderRadius: 12, background: d.image ? `url(${d.image}) center/cover` : `var(--${type}-soft)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px rgba(${rgb},.4)` }}>
          {!d.image && <Icon category={category} size={26} color={`var(--${type})`} />}
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ font: '800 14px/1.25 var(--font-body)', color: '#fff' }}>{d.name}</div>
          <div style={{ font: '500 12px/1.4 var(--font-body)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.description}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, font: '700 11px var(--font-body)', color: `var(--${type}-2)` }}>
            <Icon name="calendar-clock" size={13} />
            Vigente hasta {d.until}
          </div>
        </div>
      </div>
      {d.products.length > 0 && (
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {d.products.slice(0, 5).map((p, i) => (
            <div key={i} title={p.name} style={{ position: 'relative', width: 60, height: 60, flex: 'none', borderRadius: 12, background: p.image ? `url(${p.image}) center/cover` : 'rgba(255,255,255,.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 0 1px var(--border-strong)' }}>
              {!p.image && <Icon category={category} size={20} color="var(--text-subtle)" />}
              <Badge type="todas" variant="solid" style={{ position: 'absolute', left: 4, bottom: 4, height: 18, padding: '0 6px', fontSize: 10, fontWeight: 800 }}>{p.discount}</Badge>
            </div>
          ))}
          <div style={{ width: 60, height: 60, flex: 'none', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, marginLeft: 'auto', boxSizing: 'border-box', background: `rgba(${rgb},.14)`, boxShadow: `inset 0 0 0 1px rgba(${rgb},.5)`, font: '800 10px/1.1 var(--font-body)', color: '#fff', textAlign: 'center' }}>
            <span style={{ lineHeight: 1 }}>Ver Oferta</span>
            <Icon name="arrow-right" size={14} style={{ display: 'block' }} />
          </div>
        </div>
      )}
    </div>
  )
}
