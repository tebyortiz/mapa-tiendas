import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { BusinessType } from '../../data/types'

export interface NeonHeadingProps {
  children?: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'div'
  /** Tiñe el halo con el acento de un tipo de negocio */
  type?: BusinessType
  size?: string | number
  /** Encendido neón la primera vez que entra en vista (omitido con reduced-motion) */
  flicker?: boolean
  style?: CSSProperties
}

const SIZES = { h1: 'var(--fs-display)', h2: 'var(--fs-h1)', h3: '28px', div: 'var(--fs-h1)' }

export function NeonHeading({ children, as: T = 'h2', type, size, flicker = true, style }: NeonHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const [on, setOn] = useState(() => !flicker || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    if (on || !ref.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true)
        io.disconnect()
      }
    }, { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [on])
  return (
    <T
      ref={ref}
      data-type={type}
      className={`cf-neon${flicker && on ? ' cf-neon-on' : ''}`}
      style={{ margin: 0, fontSize: size ?? SIZES[T], lineHeight: 1.05, opacity: on ? 1 : 0.12, textWrap: 'balance', ...style }}
    >
      {children}
    </T>
  )
}
