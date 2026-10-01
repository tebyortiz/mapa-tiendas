import { useEffect, useRef, useState } from 'react'
import { CategoryChip } from '../../components/ui/CategoryChip'
import { useHScroll } from '../../components/ui/useHScroll'
import { TypeSelector } from '../../components/ui/TypeSelector'
import { CATEGORIES, CATEGORIES_BY_TYPE } from '../../data/businesses'
import type { CategoryKey, TypeKey } from '../../data/types'

interface MapTopBarProps {
  /** Categorías que tienen sucursales en el área; se muestran primero */
  present: Set<CategoryKey>
  type: TypeKey
  setType: (t: TypeKey) => void
  cat: CategoryKey | 'todas'
  setCat: (c: CategoryKey | 'todas') => void
  picked: boolean
  onPick: () => void
}

export function MapTopBar({ present, type, setType, cat, setCat, picked, onPick }: MapTopBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [dense, setDense] = useState(() => window.innerWidth < 600)
  const [wide, setWide] = useState(() => window.innerWidth >= 900)
  useEffect(() => {
    const f = () => {
      setDense(window.innerWidth < 600)
      setWide(window.innerWidth >= 900)
    }
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [])
  // Expone la altura del top bar como --mp-top para posicionar paneles.
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const ro = new ResizeObserver(() => document.documentElement.style.setProperty('--mp-top', `${el.offsetHeight}px`))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const scrollRef = useHScroll<HTMLDivElement>(wide && picked)
  const chips = (
    <>
      <CategoryChip label="Todas" icon="layout-grid" type={type} selected={cat === 'todas'} onClick={() => setCat('todas')} />
      {[...(type === 'todas' ? CATEGORIES : CATEGORIES_BY_TYPE[type])]
        .sort(([a], [b]) => Number(present.has(b)) - Number(present.has(a)))
        .map(([k, l]) => (
        <CategoryChip key={k} label={l} category={k} type={type} selected={cat === k} onClick={() => setCat(k)} />
      ))}
    </>
  )
  return (
    <div ref={ref} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 500, padding: 'var(--mp-pad,24px) 12px 0', display: 'flex', flexDirection: 'column', gap: 'var(--mp-gap,14px)', background: 'linear-gradient(180deg,rgba(7,7,13,.94) 0%,rgba(7,7,13,.7) 75%,rgba(7,7,13,0) 100%)' }}>
      {/* El título "Mapa Virtual" y el back viven ahora en el navbar; acá arranca directo con los filtros. */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'nowrap', minWidth: 0 }}>
        <span style={{ flex: 'none', font: '800 12px var(--font-body)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Filtros</span>
        <TypeSelector value={picked ? type : null} onChange={(t) => { setType(t); setCat('todas'); onPick() }} dense={dense} style={dense ? { flex: 1 } : undefined} />
        {wide && picked && (
          <div ref={scrollRef} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0, overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none', padding: '32px 24px', margin: '-32px -8px' }}>
            <div style={{ display: 'flex', gap: 8 }}>{chips}</div>
          </div>
        )}
      </div>
      {!wide && picked ? (
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', overflowY: 'hidden', padding: '32px 24px 36px', margin: '-24px -12px -20px', scrollbarWidth: 'none' }}>
          {chips}
        </div>
      ) : (
        <div style={{ height: 4 }} />
      )}
    </div>
  )
}
