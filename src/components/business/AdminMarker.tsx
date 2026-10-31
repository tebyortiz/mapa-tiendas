import type { CSSProperties, MouseEvent } from 'react'
import { Icon } from '../ui/Icon'

export interface AdminMarkerProps {
  /** Nombre del negocio; se muestra como pill al seleccionar */
  label?: string
  selected?: boolean
  onClick?: (e: MouseEvent) => void
  style?: CSSProperties
}

/** Pin de un negocio sin tiendas (kind "admin"): mismo círculo con ícono de local que las
 *  tiendas, pero en blanco en lugar del acento coral. */
export function AdminMarker({ label, selected, onClick, style }: AdminMarkerProps) {
  const s = selected ? 52 : 40
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: 'none', border: 'none', padding: 0, cursor: 'pointer', transform: selected ? 'translateY(-4px)' : 'none', transition: 'transform var(--dur-base) var(--ease-spring)', ...style }}
    >
      <span style={{ width: s, height: s, borderRadius: 999, padding: selected ? 3 : 2, background: '#fff', boxShadow: selected ? '0 0 0 3px rgba(255,255,255,.25), 0 0 22px rgba(255,255,255,.55)' : '0 0 12px rgba(255,255,255,.55)', transition: 'all var(--dur-base) var(--ease-spring)', boxSizing: 'border-box' }}>
        <span style={{ width: '100%', height: '100%', borderRadius: 999, background: selected ? 'transparent' : 'var(--cf-black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="store" size={selected ? 24 : 18} color={selected ? 'var(--cf-black)' : '#fff'} />
        </span>
      </span>
      <span style={{ width: 2, height: selected ? 10 : 7, background: '#fff', marginTop: -1, boxShadow: '0 0 6px rgba(255,255,255,.8)' }} />
      {selected && label && (
        <span style={{ position: 'absolute', top: '100%', marginTop: 4, padding: '4px 10px', borderRadius: 999, background: 'var(--surface-glass-dark)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.5)', font: '800 12px var(--font-body)', color: '#fff', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      )}
    </button>
  )
}
