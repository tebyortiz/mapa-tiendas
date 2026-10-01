import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { NeonHeading } from '../../components/brand/NeonHeading'
import { Reveal } from '../../components/brand/Reveal'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { IconButton } from '../../components/ui/IconButton'
import type { BusinessType } from '../../data/types'

export type OpenMap = (type?: BusinessType, id?: number) => void

export function LocationRow({ city = 'Tunuyán' }: { city?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Icon name="map-pin" size={30} color="#fff" style={{ flex: 'none', filter: 'drop-shadow(0 0 3px rgba(255,255,255,.95)) drop-shadow(0 0 8px rgba(255,255,255,.85)) drop-shadow(0 0 18px rgba(255,255,255,.5))' }} />
      <span style={{ display: 'inline-flex', alignItems: 'center', height: 44, padding: '0 18px', borderRadius: 999, background: 'var(--rainbow-grad)', boxShadow: 'var(--glow-rainbow)', font: '800 15px var(--font-body)', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)' }}>{city}</span>
    </div>
  )
}

export function SectionHead({ title, subtitle, type, city, action, onAction, className }: { title: ReactNode; subtitle: string; type?: BusinessType; city?: string; action?: string; onAction?: () => void; className?: string }) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--gutter)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <NeonHeading as="h2" type={type}>{title}</NeonHeading>
        {action && <Button variant="ghost" size="sm" iconRight="arrow-right" onClick={onAction} style={{ transform: 'translateY(-5px)' }}>{action}</Button>}
      </div>
      <p style={{ margin: 0, font: '500 16px/1.55 var(--font-body)', color: 'var(--text-muted)', maxWidth: 560 }}>{subtitle}</p>
      {city && <div style={{ marginTop: 4 }}><LocationRow city={city} /></div>}
    </div>
  )
}

/** Carrusel scroll-snap con flechas (columnas por breakpoint en .offer-track). */
export function SlideCarousel<T extends { id: number }>({ items, render, tail }: { items: T[]; render: (item: T) => ReactNode; tail?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ l: true, r: false })
  const upd = useCallback(() => {
    const e = ref.current
    if (!e) return
    setEdge({ l: e.scrollLeft < 8, r: e.scrollLeft + e.clientWidth >= e.scrollWidth - 8 })
  }, [])
  useEffect(() => {
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [upd])
  const go = (d: number) => {
    const e = ref.current
    e?.scrollBy({ left: d * e.clientWidth * 0.9, behavior: 'smooth' })
  }
  const arrow = (side: 'left' | 'right'): CSSProperties => ({ position: 'absolute', top: 'calc((100% - 150px) / 2)', [side]: 'max(4px, calc(var(--gutter) - 22px))', zIndex: 3 })
  return (
    <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto' }}>
      <div ref={ref} onScroll={upd} className="offer-track" style={{ display: 'grid', gridAutoFlow: 'column', gap: 'clamp(16px,2vw,28px)', overflowX: 'auto', overflowY: 'hidden', padding: '28px var(--gutter) 16px', scrollSnapType: 'x mandatory', scrollPaddingLeft: 'var(--gutter)', scrollbarWidth: 'none' }}>
        {items.map((o, i) => (
          <div key={o.id} style={{ scrollSnapAlign: 'start' }}><Reveal i={i}>{render(o)}</Reveal></div>
        ))}
        {tail && <div style={{ scrollSnapAlign: 'start' }}><Reveal i={items.length}>{tail}</Reveal></div>}
      </div>
      {!edge.l && <IconButton icon="chevron-left" label="Anteriores" onClick={() => go(-1)} style={arrow('left')} />}
      {!edge.r && <IconButton icon="chevron-right" label="Siguientes" onClick={() => go(1)} style={arrow('right')} />}
    </div>
  )
}
