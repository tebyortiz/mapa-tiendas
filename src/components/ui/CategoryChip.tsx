import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import type { TypeKey } from '../../data/types'
import { Icon } from './Icon'
import { TYPE } from './typeTheme'
import { useHover } from './useHover'

export interface CategoryChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'type'> {
  label: string
  category?: string
  /** Nombre Lucide explícito (pisa a category) */
  icon?: string
  type?: TypeKey
  selected?: boolean
  count?: number
  style?: CSSProperties
}

export function CategoryChip({ label, category, icon, type = 'todas', selected, count, onClick, style, ...rest }: CategoryChipProps) {
  const { h, bind } = useHover()
  const t = TYPE[type] ?? TYPE.todas
  return (
    <button
      type="button"
      aria-pressed={!!selected}
      onClick={onClick}
      {...bind}
      {...rest}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, minHeight: 40, padding: '0 16px 0 12px',
        borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flex: 'none',
        fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14,
        background: selected ? t.g : h ? 'var(--surface-raised)' : 'var(--surface)',
        color: selected ? (type === 'todas' ? '#fff' : 'var(--text-on-accent)') : 'var(--text-strong)',
        textShadow: selected && type === 'todas' ? '0 1px 2px rgba(0,0,0,.35)' : undefined,
        boxShadow: selected ? t.glow : `inset 0 0 0 1px ${h ? `rgba(${t.rgb},.6)` : 'var(--border-strong)'}`,
        transition: 'background var(--dur-base), box-shadow var(--dur-base)', ...style,
      }}
    >
      <Icon name={icon} category={icon ? undefined : category} size={18} color={selected ? (type === 'todas' ? '#fff' : 'var(--cf-black)') : type === 'todas' ? 'currentColor' : t.a} />
      {label}
      {count != null && <span style={{ fontWeight: 600, fontSize: 12, opacity: 0.7 }}>{count}</span>}
    </button>
  )
}
