import { useState } from 'react'

/** Estado hover controlado por props de mouse, como en los componentes del handoff. */
export function useHover() {
  const [h, setH] = useState(false)
  return { h, bind: { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) } }
}
