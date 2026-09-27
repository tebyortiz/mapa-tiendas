import { useState } from 'react'
import { Icon } from './Icon'

export function SuggestChip({ label, icon, on, onClick }: { label: string; icon: string; on: boolean; onClick: () => void }) {
  const [h, setH] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      aria-pressed={on}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px 0 4px', flex: 'none', border: 'none', cursor: 'pointer', borderRadius: 999, font: '700 13px var(--font-body)', whiteSpace: 'nowrap', color: '#fff', background: on ? 'var(--rainbow-grad)' : h ? 'rgba(255,255,255,.14)' : 'var(--surface-glass-dark)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: on ? 'var(--glow-rainbow)' : `inset 0 0 0 1px ${h ? 'rgba(255,255,255,.35)' : 'var(--border-strong)'}`, transition: 'background var(--dur-base), box-shadow var(--dur-base)' }}
    >
      <span style={{ width: 32, height: 32, borderRadius: 999, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: on ? 'rgba(7,7,13,.35)' : 'var(--rainbow-grad)', boxShadow: '0 0 10px rgba(164,116,245,.35)' }}>
        <Icon name={icon} size={16} color="#fff" />
      </span>
      {label}
    </button>
  )
}

/** Fila deslizable de chips de sugerencias (productos); el glow queda sin recortar. */
export function SuggestChips({ items, value, onChange, style }: { items: [string, string][]; value?: string; onChange: (label: string) => void; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none', padding: '16px 8px', margin: '-16px -8px', minWidth: 0, ...style }}>
      {items.map(([l, ic]) => (
        <SuggestChip key={l} label={l} icon={ic} on={value === l} onClick={() => onChange(l)} />
      ))}
    </div>
  )
}
