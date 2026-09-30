import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { Icon } from './Icon'

/** Sugerencias que se "tipean" en el placeholder animado del buscador. */
export const SEARCH_SUGGESTIONS = [
  'Pantalón jean',
  'Auricular Inalámbrico',
  'Mecánico',
  'Zapatillas',
  'Desodorante',
  'Comida casera',
  'Sommier',
  'Crema Facial',
  'Plomero',
  'Alimento balanceado',
  'Bebidas',
  'Torta de cumpleaños',
]

export interface SearchInputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onClear?: () => void
  placeholder?: string
  /** Vidrio oscuro translúcido para flotar sobre el mapa */
  glass?: boolean
  /** Si se pasa, el placeholder alterna entre la pregunta (placeholder) y estas búsquedas, tipeándose y borrándose. */
  suggestions?: string[]
  style?: CSSProperties
}

export function SearchInput({ value, defaultValue, onChange, placeholder = 'Buscar comercios, servicios…', onClear, glass, suggestions, style }: SearchInputProps) {
  const [f, setF] = useState(false)
  const [v, setV] = useState(defaultValue ?? '')
  const val = value ?? v

  // Placeholder animado: se muestra la pregunta (placeholder), luego se tipean y borran unas pocas
  // búsquedas, vuelve la pregunta, otras pocas, y así en bucle. Se pausa con foco o texto.
  const phrases = useMemo(() => {
    if (!suggestions?.length) return null
    const GROUP = 3 // cuántas búsquedas se muestran antes de volver a la pregunta
    const out: string[] = []
    for (let i = 0; i < suggestions.length; i += GROUP) {
      out.push(placeholder, ...suggestions.slice(i, i + GROUP))
    }
    return out
  }, [placeholder, suggestions])
  const [typed, setTyped] = useState(placeholder)
  const animate = !!phrases && !f && !val
  useEffect(() => {
    if (!phrases) return
    if (!animate) {
      setTyped(placeholder)
      return
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(placeholder)
      return
    }
    let cancelled = false
    let timer = 0
    let pi = 0 // índice de frase
    let ci = 0 // índice de carácter
    let deleting = false
    const tick = () => {
      if (cancelled) return
      const full = phrases[pi]
      const isQuestion = full === placeholder
      if (!deleting) {
        ci++
        setTyped(full.slice(0, ci))
        if (ci >= full.length) {
          deleting = true
          // la pregunta se sostiene más tiempo que las búsquedas
          timer = window.setTimeout(tick, isQuestion ? 2600 : 1400)
          return
        }
        timer = window.setTimeout(tick, 55 + Math.random() * 45)
      } else {
        ci--
        setTyped(full.slice(0, ci))
        if (ci <= 0) {
          deleting = false
          pi = (pi + 1) % phrases.length
          timer = window.setTimeout(tick, 380)
          return
        }
        timer = window.setTimeout(tick, 28 + Math.random() * 22)
      }
    }
    timer = window.setTimeout(tick, 700)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [phrases, animate, placeholder])

  return (
    <label
      style={{
        display: 'flex', alignItems: 'center', gap: 4, height: 48, padding: '0 6px 0 16px', borderRadius: 'var(--radius-pill)',
        background: glass ? 'var(--surface-glass-dark)' : 'var(--surface)',
        backdropFilter: glass ? 'blur(16px)' : undefined, WebkitBackdropFilter: glass ? 'blur(16px)' : undefined,
        boxShadow: val ? 'inset 0 0 0 1px rgba(255,255,255,.9), 0 0 10px rgba(255,255,255,.45), 0 0 26px rgba(255,255,255,.22)' : f ? 'inset 0 0 0 1px rgba(255,255,255,.6), 0 0 14px rgba(255,255,255,.14)' : 'inset 0 0 0 1px var(--border-strong)',
        transition: 'box-shadow var(--dur-base)', ...style,
      }}
    >
      <Icon name="search" size={18} color="var(--text-muted)" />
      <input
        value={val}
        placeholder={animate ? typed : placeholder}
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
