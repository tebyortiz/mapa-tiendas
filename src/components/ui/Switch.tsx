import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { TypeKey } from '../../data/types'
import { TYPE } from './typeTheme'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  type?: TypeKey
  disabled?: boolean
  style?: CSSProperties
}

export function Switch({ checked, defaultChecked, onChange, label, type = 'todas', disabled, style }: SwitchProps) {
  const [c, setC] = useState(!!defaultChecked)
  const on = checked ?? c
  const t = TYPE[type] ?? TYPE.todas
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 12, minHeight: 44, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, font: '600 15px var(--font-body)', color: 'var(--text-strong)', ...style }}>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        onClick={() => { setC(!on); onChange?.(!on) }}
        style={{ position: 'relative', width: 48, height: 28, borderRadius: 999, border: 'none', padding: 0, cursor: 'inherit', background: on ? t.g : 'var(--cf-ink-500)', boxShadow: on ? t.glow : 'inset 0 0 0 1px var(--border-strong)', transition: 'background var(--dur-base)' }}
      >
        <span style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 22, height: 22, borderRadius: 999, background: on ? 'var(--cf-black)' : '#fff', transition: 'left var(--dur-base) var(--ease-spring)' }} />
      </button>
      {label}
    </label>
  )
}
