import type { CSSProperties } from 'react'
import type { TypeKey } from '../../data/types'
import { Icon } from './Icon'
import { TYPE } from './typeTheme'

export interface TypeOption {
  value: TypeKey
  label: string
  icon: string
  short?: string
}

const DEF: TypeOption[] = [
  { value: 'todas', label: 'Todas', icon: 'layout-grid' },
  { value: 'tienda', label: 'Tiendas', icon: 'shopping-bag' },
  { value: 'servicio', label: 'Servicios', icon: 'wrench' },
  { value: 'emprendimiento', label: 'Emprendimientos', short: 'Emprend.', icon: 'sparkles' },
]

export interface TypeSelectorProps {
  value?: TypeKey | null
  onChange?: (value: TypeKey) => void
  options?: TypeOption[]
  /** Mobile: solo el segmento activo muestra su etiqueta */
  compact?: boolean
  /** Mobile: labels cortos, sin íconos, ocupa todo el ancho */
  dense?: boolean
  style?: CSSProperties
}

export function TypeSelector({ value = 'todas', onChange, options = DEF, compact, dense, style }: TypeSelectorProps) {
  return (
    <div
      role="tablist"
      style={{
        display: 'flex', gap: 4, padding: 4, borderRadius: 'var(--radius-pill)', background: 'var(--surface-sunken)',
        boxShadow: 'inset 0 0 0 1px var(--border)', width: dense ? '100%' : 'max-content', maxWidth: '100%', minWidth: 0,
        boxSizing: 'border-box', overflowX: 'auto', scrollbarWidth: 'none', ...style,
      }}
    >
      {options.map((o) => {
        const on = o.value === value
        const t = TYPE[o.value] ?? TYPE.todas
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange?.(o.value)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: dense ? 36 : 40,
              minHeight: dense ? 36 : 40, padding: dense ? '0 8px' : compact ? '0 12px' : '0 16px', flex: dense ? '1 1 auto' : 'none',
              minWidth: 0, borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: dense ? 12 : 14,
              background: on ? t.g : 'transparent', color: on ? (o.value === 'todas' ? '#fff' : 'var(--text-on-accent)') : 'var(--text-muted)',
              textShadow: on && o.value === 'todas' ? '0 1px 2px rgba(0,0,0,.35)' : undefined,
              boxShadow: on ? t.glow : 'none', transition: 'all var(--dur-base) var(--ease-out)',
            }}
          >
            {!dense && <Icon name={o.icon} size={16} color={on ? (o.value === 'todas' ? '#fff' : 'var(--cf-black)') : o.value === 'todas' ? 'currentColor' : t.a} />}
            {dense ? (o.short ?? o.label) : !compact || on ? o.label : null}
          </button>
        )
      })}
    </div>
  )
}
