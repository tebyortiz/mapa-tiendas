import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { TypeKey } from '../../data/types'

const K = 'var(--cf-rb-coral)'
const S = 'var(--cf-rb-sky)'
const V = 'var(--cf-rb-violet)'
const P: Record<TypeKey, string[]> = { todas: [V, S, K], tienda: [K, S, V], servicio: [S, V, K], emprendimiento: [V, K, S] }

export interface GlowBackdropProps {
  /** Colores de los blobs: rainbow (neutro, 'todas') o un tipo de negocio */
  palette?: 'rainbow' | 'tienda' | 'servicio' | 'emprendimiento'
  intensity?: number
  /** Parallax por capas relativo a la sección (desactivado con reduced-motion) */
  parallax?: boolean
  style?: CSSProperties
}

export function GlowBackdrop({ palette = 'rainbow', intensity = 0.42, parallax = true, style }: GlowBackdropProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [y, setY] = useState(0)
  useEffect(() => {
    if (!parallax) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const f = () => {
      const r = ref.current?.getBoundingClientRect()
      if (r) setY(Math.max(-600, Math.min(600, -r.top)))
    }
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [parallax])
  const c = P[palette === 'rainbow' ? 'todas' : palette]
  const b = (i: number, x: string, t: string, w: string, sp: number): CSSProperties => ({
    position: 'absolute', left: x, top: t, width: w, height: w, borderRadius: '50%', background: c[i],
    filter: 'blur(var(--blur-blob))', opacity: intensity, transform: `translate3d(0,${-y * sp}px,0)`, willChange: 'transform',
  })
  const inner = (d: number): CSSProperties => ({
    width: '100%', height: '100%', borderRadius: '50%', background: 'inherit',
    animation: `cf-drift var(--dur-drift) var(--ease-in-out) ${d}s infinite`,
  })
  return (
    <div ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, ...style }}>
      <div style={b(0, '-10%', '-8%', '46vmax', 0.15)}><div style={inner(0)} /></div>
      <div style={b(1, '45%', '20%', '40vmax', 0.28)}><div style={inner(-7)} /></div>
      <div style={b(2, '70%', '-12%', '36vmax', 0.08)}><div style={inner(-13)} /></div>
    </div>
  )
}
