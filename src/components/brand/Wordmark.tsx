import type { CSSProperties } from 'react'

export interface WordmarkProps {
  /** Tamaño de fuente del wordmark en px */
  size?: number
  withMark?: boolean
  stacked?: boolean
  markSrc?: string
  style?: CSSProperties
}

export function Wordmark({ size = 32, withMark = true, stacked, markSrc = '/assets/logo/basket-mark.png', style }: WordmarkProps) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3, ...style }} aria-label="Comprá Fácil">
      {withMark && <img src={markSrc} alt="" style={{ height: size * (stacked ? 2.1 : 1.35), width: 'auto' }} />}
      <span className="cf-neon" style={{ fontSize: size, lineHeight: 1, whiteSpace: stacked ? 'normal' : 'nowrap' }}>
        {stacked ? <>COMPRÁ<br />FÁCIL</> : 'COMPRÁ FÁCIL'}
      </span>
    </div>
  )
}
