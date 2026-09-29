import type { CSSProperties } from 'react'

export interface WordmarkProps {
  /** Tamaño de fuente del wordmark en px */
  size?: number
  withMark?: boolean
  stacked?: boolean
  markSrc?: string
  style?: CSSProperties
  markStyle?: CSSProperties
  /** Prende el parpadeo neón (encendido + letras que titilan), como en el hero */
  animated?: boolean
}

// [duración, delay] de las letras que parpadean, igual que en el hero
const FLICKER_COMPRA: Record<number, [number, number]> = { 1: [9.5, 2.1], 4: [13, 5.4] }
const FLICKER_FACIL: Record<number, [number, number]> = { 1: [11, 8.2], 3: [15.5, 3.3] }

function FlickerWord({ text, table }: { text: string; table: Record<number, [number, number]> }) {
  return (
    <>
      {text.split('').map((ch, j) => {
        const f = table[j]
        return (
          <span key={j} className={f ? 'hero-letter' : undefined} style={f ? { animationDuration: `${f[0]}s`, animationDelay: `${f[1]}s` } : undefined}>
            {ch}
          </span>
        )
      })}
    </>
  )
}

export function Wordmark({ size = 32, withMark = true, stacked, markSrc = '/assets/logo/basket-mark.png', style, markStyle, animated }: WordmarkProps) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3, ...style }} aria-label="Comprá Fácil">
      {withMark && <img src={markSrc} alt="" style={{ height: size * (stacked ? 2.1 : 1.35), width: 'auto', ...markStyle }} />}
      <span className={animated ? 'cf-neon cf-neon-on' : 'cf-neon'} style={{ fontSize: size, lineHeight: 1, whiteSpace: stacked ? 'normal' : 'nowrap' }}>
        {animated ? (
          stacked ? (
            <>
              <FlickerWord text="COMPRÁ" table={FLICKER_COMPRA} />
              <br />
              <FlickerWord text="FÁCIL" table={FLICKER_FACIL} />
            </>
          ) : (
            <>
              <FlickerWord text="COMPRÁ" table={FLICKER_COMPRA} /> <FlickerWord text="FÁCIL" table={FLICKER_FACIL} />
            </>
          )
        ) : stacked ? (
          <>COMPRÁ<br />FÁCIL</>
        ) : (
          'COMPRÁ FÁCIL'
        )}
      </span>
    </div>
  )
}
