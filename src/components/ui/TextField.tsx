import { useState } from 'react'
import type { CSSProperties } from 'react'

export interface TextFieldProps {
  label?: string
  hint?: string
  error?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  type?: string
  placeholder?: string
  id?: string
  style?: CSSProperties
}

export function TextField({ label, hint, error, value, defaultValue, onChange, type = 'text', placeholder, id, style }: TextFieldProps) {
  const [f, setF] = useState(false)
  const fid = id ?? `tf-${(label ?? '').replace(/\W+/g, '-').toLowerCase()}`
  const ring = error ? 'var(--cf-danger)' : f ? 'rgba(255,255,255,.6)' : 'var(--border-strong)'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <label htmlFor={fid} style={{ font: '700 13px var(--font-body)', color: 'var(--text-strong)' }}>{label}</label>}
      <input
        id={fid}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onFocus={() => setF(true)}
        onBlur={() => setF(false)}
        onChange={(e) => onChange?.(e.target.value)}
        style={{ height: 48, padding: '0 16px', borderRadius: 'var(--radius-sm)', border: 'none', outline: 'none', background: 'var(--surface)', boxShadow: `inset 0 0 0 1px ${ring}`, color: 'var(--text-strong)', fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500, transition: 'box-shadow var(--dur-base)' }}
      />
      {(error || hint) && <div style={{ font: '500 13px var(--font-body)', color: error ? 'var(--cf-danger)' : 'var(--text-muted)' }}>{error ?? hint}</div>}
    </div>
  )
}
