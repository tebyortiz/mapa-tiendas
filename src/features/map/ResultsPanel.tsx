import { BusinessCard } from '../../components/business/BusinessCard'
import { Icon } from '../../components/ui/Icon'
import type { Business, TypeKey } from '../../data/types'

interface ResultsPanelProps {
  items: Business[]
  selectedId: number | null
  onSelect: (id: number) => void
  expanded: boolean
  setExpanded: (v: boolean) => void
  type: TypeKey
  desk: boolean
}

const LBL: Record<TypeKey, string> = { todas: 'lugares', tienda: 'tiendas', servicio: 'servicios', emprendimiento: 'emprendimientos' }

export function ResultsPanel({ items, selectedId, onSelect, expanded, setExpanded, type, desk }: ResultsPanelProps) {
  const chev = desk ? (expanded ? 'chevron-up' : 'chevron-down') : expanded ? 'chevron-down' : 'chevron-up'
  return (
    <div
      className="mp-panel"
      data-open={expanded ? 'true' : 'false'}
      style={{ position: 'absolute', zIndex: 550, left: 0, right: 0, bottom: 0, height: expanded ? '62%' : 128, background: 'rgba(12,12,20,.9)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: 'var(--radius-sheet) var(--radius-sheet) 0 0', boxShadow: 'inset 0 1px 0 var(--border-strong)', transition: 'height var(--dur-slow) var(--ease-out)', display: 'flex', flexDirection: 'column' }}
    >
      <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '10px 16px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', flex: 'none' }}>
        <span className="mp-grip" style={{ width: 40, height: 4, borderRadius: 9, background: 'var(--cf-ink-400)' }} />
        <span style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', font: '800 16px var(--font-body)' }}>
          <span>{items.length} {LBL[type]} cerca tuyo</span>
          <Icon name={chev} size={20} color="var(--text-muted)" />
        </span>
      </button>
      <div className="mp-list" style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', padding: '10px 14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((b) => (
          <BusinessCard key={b.id} type={b.type} name={b.branch || b.name} category={b.category} categoryLabel={b.categoryLabel} distance={b.distance} open={b.open} address={b.address} image={b.image} hasOffers={b.hasOffers} selected={b.id === selectedId} onClick={() => onSelect(b.id)} style={{ flex: 'none' }} />
        ))}
        {items.length === 0 && (
          <div style={{ padding: '24px 8px', textAlign: 'center', font: '500 14px var(--font-body)', color: 'var(--text-muted)' }}>No encontramos nada con ese filtro. Probá con otra categoría.</div>
        )}
      </div>
    </div>
  )
}
