import { useEffect, useRef } from 'react'

/**
 * Scroll horizontal con la rueda y arrastrando con el mouse (en touch ya funciona nativo).
 * Suspende el scroll-snap mientras se mueve y lo restablece al terminar, para que no pelee con el desplazamiento.
 */
export function useHScroll<T extends HTMLElement>(active = true) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!active || !el) return
    const snap = el.style.scrollSnapType
    let timer: ReturnType<typeof setTimeout> | undefined
    const freeSnap = () => {
      clearTimeout(timer)
      el.style.scrollSnapType = 'none'
    }
    const restoreSnap = (ms = 0) => {
      clearTimeout(timer)
      timer = setTimeout(() => { el.style.scrollSnapType = snap }, ms)
    }
    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return
      e.preventDefault()
      freeSnap()
      el.scrollLeft += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      restoreSnap(150)
    }
    let startX = 0
    let startLeft = 0
    let dragging = false
    let moved = false
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      dragging = true
      moved = false
      startX = e.clientX
      startLeft = el.scrollLeft
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > 5 && !moved) {
        moved = true
        freeSnap()
      }
      if (moved) el.scrollLeft = startLeft - dx
    }
    const onUp = () => {
      if (dragging && moved) restoreSnap()
      dragging = false
    }
    // Si hubo arrastre, no dispara el clic sobre el elemento soltado
    const onClick = (e: MouseEvent) => {
      if (moved) { e.stopPropagation(); e.preventDefault(); moved = false }
    }
    const noDrag = (e: Event) => e.preventDefault()
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('dragstart', noDrag)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('click', onClick, true)
    return () => {
      clearTimeout(timer)
      el.style.scrollSnapType = snap
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('dragstart', noDrag)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('click', onClick, true)
    }
  }, [active])
  return ref
}
