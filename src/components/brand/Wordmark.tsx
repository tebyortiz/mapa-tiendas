import type { CSSProperties } from 'react'
import { BASKET_SRCSET } from '../ui/srcSet'

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
  /** Texto alternativo al wordmark (p. ej. "MAPA VIRTUAL" en el navbar del mapa) */
  text?: string
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

const DEFAULT_MARK = '/assets/logo/basket-mark.webp'

export function Wordmark({ size = 32, withMark = true, stacked, markSrc = DEFAULT_MARK, style, markStyle, animated, text }: WordmarkProps) {
  const markH = size * (stacked ? 2.1 : 1.35)
  // con la canasta por defecto se ofrecen versiones reducidas; el ancho mostrado es alto × 1.125 (el navbar
  // puede forzar ~42px de alto por CSS, de ahí el mínimo)
  const responsive = markSrc === DEFAULT_MARK
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3, ...style }} aria-label={text ?? 'Comprá Fácil'}>
      {withMark && (
        <img
          src={markSrc}
          srcSet={responsive ? BASKET_SRCSET : undefined}
          sizes={responsive ? `${Math.ceil(Math.max(markH, 42) * 1.125)}px` : undefined}
          alt=""
          width={450}
          height={400}
          decoding="async"
          style={{ height: markH, width: 'auto', ...markStyle }}
        />
      )}
      <span className={animated ? 'cf-neon cf-neon-on' : 'cf-neon'} style={{ fontSize: size, lineHeight: 1, whiteSpace: stacked ? 'normal' : 'nowrap' }}>
        {text ? (
          text
        ) : animated ? (
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
