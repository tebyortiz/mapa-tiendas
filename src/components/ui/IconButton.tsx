import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import { Icon } from './Icon'
import { useHover } from './useHover'

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  icon?: string
  /** Etiqueta accesible obligatoria (español) */
  label: string
  variant?: 'surface' | 'glass' | 'ghost'
  size?: number
  active?: boolean
  style?: CSSProperties
}

export function IconButton({ icon = 'x', label, variant = 'surface', size = 44, active, onClick, style, ...rest }: IconButtonProps) {
  const { h, bind } = useHover()
  const bg = {
    surface: h ? 'var(--surface-raised)' : 'var(--surface)',
    glass: h ? 'rgba(255,255,255,.28)' : 'var(--surface-glass)',
    ghost: h ? 'rgba(255,255,255,.08)' : 'transparent',
  }[variant]
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      {...bind}
      {...rest}
      style={{
        width: size, height: size, minWidth: 44, minHeight: 44, borderRadius: 'var(--radius-pill)', border: 'none',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff',
        background: active ? '#fff' : bg,
        boxShadow: variant === 'ghost' ? 'none' : 'inset 0 0 0 1px var(--border-strong)',
        backdropFilter: variant === 'glass' ? 'blur(16px)' : undefined,
        WebkitBackdropFilter: variant === 'glass' ? 'blur(16px)' : undefined,
        transition: 'background var(--dur-base)', ...style,
      }}
    >
      <Icon name={icon} size={Math.round(size * 0.44)} color={active ? 'var(--cf-black)' : 'currentColor'} />
    </button>
  )
}
