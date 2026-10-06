import type { CSSProperties } from 'react'

/** Píldora "Próximamente" para marcar funciones aún no disponibles. */
export function SoonBadge({ label = 'Próximamente', size = 'md', className, style }: { label?: string; size?: 'sm' | 'md'; className?: string; style?: CSSProperties }) {
  const sm = size === 'sm'
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: sm ? 5 : 7, flex: 'none',
        height: sm ? 20 : 24, padding: sm ? '0 8px' : '0 11px', borderRadius: 999,
        font: `800 ${sm ? 9 : 10}px/1 var(--font-body)`, letterSpacing: '.1em', textTransform: 'uppercase',
        color: 'var(--text-muted)', background: 'rgba(255,255,255,.05)',
        boxShadow: 'inset 0 0 0 1px var(--border-strong)', whiteSpace: 'nowrap', ...style,
      }}
    >
      <span aria-hidden="true" style={{ width: sm ? 5 : 6, height: sm ? 5 : 6, borderRadius: '50%', background: 'var(--cf-amber)', boxShadow: '0 0 6px var(--cf-amber)' }} />
      {label}
    </span>
  )
}
