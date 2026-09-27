import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Icon } from './Icon'

export interface SearchInputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onClear?: () => void
  placeholder?: string
  /** Vidrio oscuro translúcido para flotar sobre el mapa */
  glass?: boolean
  style?: CSSProperties
}

export function SearchInput({ value, defaultValue, onChange, placeholder = 'Buscar comercios, servicios…', onClear, glass, style }: SearchInputProps) {
  const [f, setF] = useState(false)
  const [v, setV] = useState(defaultValue ?? '')
  const val = value ?? v
  return (
    <label
      style={{
        display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 6px 0 16px', borderRadius: 'var(--radius-pill)',
        background: glass ? 'var(--surface-glass-dark)' : 'var(--surface)',
        backdropFilter: glass ? 'blur(16px)' : undefined, WebkitBackdropFilter: glass ? 'blur(16px)' : undefined,
        boxShadow: val ? 'inset 0 0 0 1px rgba(255,255,255,.9), 0 0 10px rgba(255,255,255,.45), 0 0 26px rgba(255,255,255,.22)' : f ? 'inset 0 0 0 1px rgba(255,255,255,.6), 0 0 14px rgba(255,255,255,.14)' : 'inset 0 0 0 1px var(--border-strong)',
        transition: 'box-shadow var(--dur-base)', ...style,
      }}
    >
      <Icon name="search" size={18} color="var(--text-muted)" />
      <input
        value={val}
        placeholder={placeholder}
        onFocus={() => setF(true)}
        onBlur={() => setF(false)}
        onChange={(e) => { setV(e.target.value); onChange?.(e.target.value) }}
        style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', boxShadow: 'none', color: 'var(--text-strong)', fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500 }}
      />
      {val ? (
        <button
          type="button"
          aria-label="Borrar búsqueda"
          onClick={(e) => { e.preventDefault(); setV(''); onClear?.(); onChange?.('') }}
          style={{ width: 36, height: 36, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
        >
          <Icon name="x" size={16} />
        </button>
      ) : (
        <span style={{ width: 6 }} />
      )}
    </label>
  )
}
