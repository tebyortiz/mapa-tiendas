import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import type { BusinessType } from '../../data/types'
import { TYPE } from '../ui/typeTheme'
import { useHover } from '../ui/useHover'

export interface CatalogCardProps {
  type?: BusinessType
  title: string
  /** Se muestra debajo de la imagen, nunca encima */
  description?: string
  /** Una o varias imágenes de fondo; con varias se rota en carrusel con crossfade */
  image: string | string[]
  height?: number
  /** Muestra la cinta inclinada "PRÓXIMAMENTE" (secciones aún no disponibles) */
  comingSoon?: boolean
  /** Desfase inicial del carrusel, para escalonar el cambio entre cards */
  startDelay?: number
  onClick?: (e: MouseEvent) => void
  style?: CSSProperties
}

/** Milisegundos que permanece cada imagen antes de pasar a la siguiente */
const SLIDE_MS = 3500

export function CatalogCard({ type = 'tienda', title, description, image, onClick, height = 560, comingSoon = false, startDelay = 0, style }: CatalogCardProps) {
  const { h, bind } = useHover()
  const t = TYPE[type]
  const nr = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)

  const slides = Array.isArray(image) ? image : [image]
  const [idx, setIdx] = useState(0)

  // Rotación automática del carrusel. El startDelay escalona el inicio de cada
  // card para que no cambien todas a la vez (primero tiendas, última emprendimientos).
  useEffect(() => {
    if (slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      setIdx((i) => (i + 1) % slides.length)
      interval = window.setInterval(() => setIdx((i) => (i + 1) % slides.length), SLIDE_MS)
    }, SLIDE_MS + startDelay)
    return () => {
      window.clearTimeout(timeout)
      if (interval) window.clearInterval(interval)
    }
  }, [slides.length, startDelay])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.IntersectionObserver || !nr.current) {
      setOn(true)
      return
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true)
        io.disconnect()
      }
    }, { threshold: 0.5 })
    io.observe(nr.current)
    return () => io.disconnect()
  }, [])

  return (
    <div {...bind} style={{ display: 'flex', flexDirection: 'column', gap: 16, ...style }}>
      <div onClick={onClick} style={{ position: 'relative', height: `var(--catalog-card-h, ${height}px)`, borderRadius: 'var(--radius-sheet)', overflow: 'hidden', cursor: 'pointer', background: 'var(--surface)', boxShadow: h ? t.glow : 'inset 0 0 0 1px var(--border)', transition: 'box-shadow var(--dur-slow) var(--ease-out)' }}>
        {slides.map((src, i) => (
          <div
            key={src + i}
            className={`catalog-slide${i === idx ? ' is-active' : ''}`}
            style={{ position: 'absolute', inset: 0, background: `url(${src}) center/cover`, transform: h ? 'scale(1.04)' : 'scale(1)', transition: 'opacity var(--dur-enter) var(--ease-in-out), transform var(--dur-enter) var(--ease-out)' }}
          />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(7,7,13,0) 50%,rgba(7,7,13,.6) 100%)' }} />
        {comingSoon && (
          <div className="catalog-ribbon" aria-hidden="true">
            <div className="catalog-ribbon-track">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i}>Próximamente ✦</span>
              ))}
            </div>
          </div>
        )}
        <div className="catalog-card-cap" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 4, padding: '18px 16px', display: 'flex', justifyContent: 'center', background: 'var(--surface-glass)', backdropFilter: 'blur(var(--blur-glass))', WebkitBackdropFilter: 'blur(var(--blur-glass))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18)' }}>
          <div
            ref={nr}
            className={`catalog-card-title cf-neon${on ? ' cf-neon-on' : ''}`}
            data-type={type}
            style={{ opacity: on ? 1 : 0.12, maxWidth: '100%', fontSize: 'clamp(22px,2.4vw,34px)', lineHeight: 1.05, textAlign: 'center', overflowWrap: 'anywhere' }}
          >
            {title}
          </div>
        </div>
      </div>
      {description && (
        <p style={{ margin: 0, padding: '0 4px', display: 'flex', gap: 10, alignItems: 'flex-start', font: '500 15px/1.5 var(--font-body)', color: 'var(--text-muted)' }}>
          <span style={{ width: 8, height: 8, marginTop: 7, flex: 'none', borderRadius: 9, background: t.a, boxShadow: `0 0 8px ${t.a}` }} />
          {description}
        </p>
      )}
    </div>
  )
}
