import type { CSSProperties, ReactNode } from 'react'
import type { TypeKey } from '../../data/types'
import { Icon } from './Icon'
import { TYPE } from './typeTheme'

export interface BadgeProps {
  children?: ReactNode
  type?: TypeKey
  status?: 'abierto' | 'cerrado'
  icon?: string
  variant?: 'soft' | 'solid'
  style?: CSSProperties
}

export function Badge({ children, type, status, icon, variant = 'soft', style }: BadgeProps) {
  let fg = 'var(--text-strong)'
  let bg = 'rgba(255,255,255,.08)'
  let ring = 'var(--border-strong)'
  if (status === 'abierto') {
    fg = 'var(--cf-success)'; bg = 'rgba(91,227,160,.12)'; ring = 'rgba(91,227,160,.4)'
  } else if (status === 'cerrado') {
    fg = 'var(--cf-danger)'; bg = 'rgba(255,90,110,.12)'; ring = 'rgba(255,90,110,.4)'
  } else if (type && TYPE[type]) {
    const t = TYPE[type]
    if (variant === 'solid') {
      fg = type === 'todas' ? '#fff' : 'var(--text-on-accent)'; bg = t.g; ring = 'transparent'
    } else {
      fg = type === 'todas' ? '#fff' : t.b; bg = t.soft; ring = `rgba(${t.rgb},.45)`
    }
  }
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5, height: 24, padding: '0 10px', borderRadius: 'var(--radius-pill)',
        font: '700 12px var(--font-body)', letterSpacing: '.02em', color: fg, background: bg,
        boxShadow: `inset 0 0 0 1px ${ring}`, whiteSpace: 'nowrap',
        textShadow: type === 'todas' && variant === 'solid' ? '0 1px 2px rgba(0,0,0,.35)' : undefined, ...style,
      }}
    >
      {status && !icon && <span style={{ width: 6, height: 6, borderRadius: 9, background: 'currentColor', boxShadow: '0 0 6px currentColor' }} />}
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  )
}
