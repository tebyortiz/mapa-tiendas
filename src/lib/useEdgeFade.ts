import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

interface Options {
  /** Eje de scroll: 'y' (vertical) o 'x' (horizontal) */
  axis?: 'x' | 'y'
  /** Grosor del difuminado al inicio (arriba / izquierda), en px. 0 lo desactiva. */
  start?: number
  /** Grosor del difuminado al final (abajo / derecha), en px. 0 lo desactiva. */
  end?: number
}

/**
 * Difuminado de borde como pista de scroll: aplica un mask-image que desvanece el
 * contenido en los extremos donde todavía queda algo para deslizar. El fade aparece
 * solo cuando hay overflow real en ese extremo (al llegar al final se oculta), así
 * no tapa el último elemento ni su glow. Usa un callback ref para reatachar los
 * listeners cuando el nodo se monta/desmonta (p. ej. el sheet que aparece al seleccionar).
 *
 * Todas las mediciones se encauzan por requestAnimationFrame (una por frame): así una
 * ráfaga de eventos de scroll/resize/render durante la animación de altura del panel no
 * puede provocar una cadena síncrona de setState dentro del commit de React (lo que
 * disparaba "Maximum update depth exceeded" y tumbaba la pantalla a negro).
 */
export function useEdgeFade<T extends HTMLElement = HTMLDivElement>({ axis = 'y', start = 24, end = 24 }: Options = {}) {
  const [edges, setEdges] = useState({ start: false, end: false })
  const elRef = useRef<T | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const rafRef = useRef<number | null>(null)

  const measure = useCallback(() => {
    const el = elRef.current
    if (!el) return
    const pos = axis === 'y' ? el.scrollTop : el.scrollLeft
    const size = axis === 'y' ? el.scrollHeight : el.scrollWidth
    const view = axis === 'y' ? el.clientHeight : el.clientWidth
    const s = start > 0 && pos > 1
    const e = end > 0 && pos + view < size - 1
    setEdges((p) => (p.start === s && p.end === e ? p : { start: s, end: e }))
  }, [axis, start, end])

  // Coalesce: a lo sumo una medición por frame, y fuera de la fase de commit de React,
  // para que el ciclo medir → setState → render nunca sea una recursión síncrona.
  const schedule = useCallback(() => {
    if (rafRef.current != null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      measure()
    })
  }, [measure])

  const ref = useCallback((node: T | null) => {
    cleanupRef.current?.()
    cleanupRef.current = null
    elRef.current = node
    if (!node) return
    const ro = new ResizeObserver(schedule)
    ro.observe(node)
    node.addEventListener('scroll', schedule, { passive: true })
    cleanupRef.current = () => {
      ro.disconnect()
      node.removeEventListener('scroll', schedule)
    }
    schedule()
  }, [schedule])

  // Re-mide tras cada render (p. ej. cuando cambia el listado filtrado o el alto del panel),
  // pero diferido a rAF: nunca de forma síncrona dentro del commit.
  useLayoutEffect(() => {
    schedule()
  })

  // Al desmontar, cancela cualquier medición pendiente.
  useEffect(() => () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    cleanupRef.current?.()
  }, [])

  const dir = axis === 'y' ? 'to bottom' : 'to right'
  const a = edges.start ? `transparent 0, #000 ${start}px` : '#000 0'
  const b = edges.end ? `#000 calc(100% - ${end}px), transparent 100%` : '#000 100%'
  const mask = `linear-gradient(${dir}, ${a}, ${b})`
  const style: CSSProperties = edges.start || edges.end ? { WebkitMaskImage: mask, maskImage: mask } : {}

  return { ref, style }
}
