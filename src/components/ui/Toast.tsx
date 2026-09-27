import type { CSSProperties, ReactNode } from 'react'
import { Icon } from './Icon'

export interface ToastProps {
  children?: ReactNode
  icon?: string
  tone?: 'neutral' | 'success' | 'danger'
  action?: string
  onAction?: () => void
  style?: CSSProperties
}

export function Toast({ children, icon = 'map-pin', tone = 'neutral', action, onAction, style }: ToastProps) {
  const c = { neutral: '#fff', success: 'var(--cf-success)', danger: 'var(--cf-danger)' }[tone]
  return (
    <div
      role="status"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 48, padding: '8px 8px 8px 16px', borderRadius: 'var(--radius-pill)',
        background: 'var(--surface-glass-dark)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        boxShadow: 'inset 0 0 0 1px var(--border-strong)', font: '600 14px var(--font-body)', color: '#fff', ...style,
      }}
    >
      <Icon name={icon} size={18} color={c} />
      <span style={{ flex: 1 }}>{children}</span>
      {action ? (
        <button type="button" onClick={onAction} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: 'none', background: 'rgba(255,255,255,.1)', color: '#fff', font: '800 13px var(--font-body)', cursor: 'pointer' }}>
          {action}
        </button>
      ) : (
        <span style={{ width: 8 }} />
      )}
    </div>
  )
}
