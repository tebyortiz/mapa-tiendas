import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/** Reveal al scrollear: opacity 0→1, y 18→0, 640ms ease-out, stagger 70ms por índice. */
export function Reveal({ children, i = 0, fill }: { children: ReactNode; i?: number; fill?: boolean }) {
  const r = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !r.current) {
      setV(true)
      return
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setV(true)
        io.disconnect()
      }
    }, { threshold: 0.15 })
    io.observe(r.current)
    return () => io.disconnect()
  }, [])
  const d = `${i * 70}ms`
  return (
    <div
      ref={r}
      style={{
        width: fill ? '100%' : undefined, opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(18px)',
        transition: `opacity var(--dur-enter) var(--ease-out) ${d}, transform var(--dur-enter) var(--ease-out) ${d}`,
      }}
    >
      {children}
    </div>
  )
}
