import { useState } from 'react'
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import type { TypeKey } from '../../data/types'
import { Icon } from './Icon'
import { TYPE } from './typeTheme'

const SZ = { sm: { h: 36, px: 16, fs: 14, ic: 16 }, md: { h: 44, px: 22, fs: 15, ic: 18 }, lg: { h: 52, px: 28, fs: 16, ic: 20 } }

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children?: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass'
  /** Tema por tipo de negocio; 'todas' = rainbow */
  type?: TypeKey
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  iconRight?: string
  fullWidth?: boolean
  /** type nativo del <button> */
  htmlType?: 'button' | 'submit' | 'reset'
}

export function Button({ children, variant = 'primary', type = 'todas', size = 'md', icon, iconRight, disabled, fullWidth, onClick, style, htmlType = 'button', ...rest }: ButtonProps) {
  const [h, setH] = useState(false)
  const [p, setP] = useState(false)
  const t = TYPE[type] ?? TYPE.todas
  const s = SZ[size] ?? SZ.md
  const hv = h && !disabled
  const base: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: s.h, minHeight: 44,
    padding: `0 ${s.px}px`, borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-body)', fontWeight: 800,
    fontSize: s.fs, letterSpacing: '.01em', cursor: disabled ? 'not-allowed' : 'pointer', border: 'none',
    width: fullWidth ? '100%' : undefined,
    transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base)',
    transform: p && !disabled ? 'scale(.97)' : 'none', opacity: disabled ? 0.4 : 1, whiteSpace: 'nowrap',
  }
  const v: Record<string, CSSProperties> = {
    primary: { background: t.g, color: 'var(--text-on-accent)', boxShadow: hv ? t.glow : 'none' },
    secondary: { background: hv ? 'var(--surface-raised)' : 'var(--surface)', color: 'var(--text-strong)', boxShadow: `inset 0 0 0 1px ${hv ? `rgba(${t.rgb},.7)` : 'var(--border-strong)'}` },
    ghost: { background: hv ? 'rgba(255,255,255,.08)' : 'transparent', color: 'var(--text-strong)' },
    glass: { background: hv ? 'rgba(255,255,255,.28)' : 'var(--surface-glass)', color: '#fff', backdropFilter: 'blur(var(--blur-glass))', WebkitBackdropFilter: 'blur(var(--blur-glass))', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.25)' },
  }
  return (
    <button
      type={htmlType}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => { setH(false); setP(false) }}
      onMouseDown={() => setP(true)}
      onMouseUp={() => setP(false)}
      {...rest}
      style={{ ...base, ...v[variant], ...style }}
    >
      {icon && <Icon name={icon} size={s.ic} />}
      {children}
      {iconRight && <Icon name={iconRight} size={s.ic} />}
    </button>
  )
}
