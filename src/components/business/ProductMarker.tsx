import type { CSSProperties, MouseEvent } from 'react'
import { Icon } from '../ui/Icon'
import { TYPE } from '../ui/typeTheme'

export interface ProductMarkerProps {
  /** Foto del producto; si falta, se muestra un ícono de paquete */
  image?: string
  /** Cantidad de productos coincidentes en el local (se muestra "+N" si es > 1) */
  count?: number
  /** Nombre del local; se muestra como pill al seleccionar */
  label?: string
  selected?: boolean
  onClick?: (e: MouseEvent) => void
  style?: CSSProperties
}

// Los productos vienen siempre de tiendas (ttv / gesto): se usa el acento coral.
const t = TYPE.tienda

export function ProductMarker({ image, count = 1, label, selected, onClick, style }: ProductMarkerProps) {
  const s = selected ? 60 : 48
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: 'none', border: 'none', padding: 0, cursor: 'pointer', transform: selected ? 'translateY(-4px)' : 'none', transition: 'transform var(--dur-base) var(--ease-spring)', ...style }}
    >
      <span style={{ width: s, height: s, borderRadius: 999, padding: 3, background: t.g, boxShadow: selected ? t.glow : `0 0 12px rgba(${t.rgb},.55)`, transition: 'all var(--dur-base) var(--ease-spring)', boxSizing: 'border-box' }}>
        <span style={{ width: '100%', height: '100%', borderRadius: 999, overflow: 'hidden', background: 'var(--cf-black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {image ? (
            <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <Icon name="package" size={selected ? 24 : 20} color={t.a} />
          )}
        </span>
      </span>
      {count > 1 && (
        <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 20, height: 20, padding: '0 5px', borderRadius: 999, background: t.g, color: 'var(--cf-black)', font: '800 11px var(--font-body)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 2px var(--cf-black)' }}>
          +{count - 1}
        </span>
      )}
      <span style={{ width: 2, height: selected ? 10 : 7, background: t.a, marginTop: -1, boxShadow: `0 0 6px ${t.a}` }} />
      {selected && label && (
        <span style={{ position: 'absolute', top: '100%', marginTop: 4, padding: '4px 10px', borderRadius: 999, background: 'var(--surface-glass-dark)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: `inset 0 0 0 1px rgba(${t.rgb},.5)`, font: '800 12px var(--font-body)', color: '#fff', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      )}
    </button>
  )
}
