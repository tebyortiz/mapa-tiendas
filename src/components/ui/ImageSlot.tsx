import type { CSSProperties } from 'react'

export interface ImageSlotProps {
  /** Foto (opcional). Sin `src` muestra el placeholder punteado del handoff. */
  src?: string
  placeholder?: string
  shape?: 'rect' | 'rounded' | 'circle' | 'pill'
  style?: CSSProperties
}

const RADIUS = { rect: 0, rounded: 12, circle: '50%', pill: 999 }

/** Reemplazo de <image-slot> del handoff: marco con anillo punteado, ícono y leyenda. */
export function ImageSlot({ src, placeholder = 'Drop an image', shape = 'rect', style }: ImageSlotProps) {
  const small = typeof style?.width === 'number' && style.width <= 48
  return (
    <div
      style={{
        display: 'block', position: 'relative', width: '100%', height: '100%', aspectRatio: '3 / 2', overflow: 'hidden',
        borderRadius: RADIUS[shape], font: '13px/1.3 system-ui,-apple-system,sans-serif', color: 'inherit', ...style,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'rgba(127,127,127,.08)', borderRadius: 'inherit' }}>
        {src && <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
      {!src && (
        <>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, textAlign: 'center', padding: 12, boxSizing: 'border-box', userSelect: 'none' }}>
            {!small && <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45 }} aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
            </svg>}
            <div style={{ maxWidth: '90%', fontWeight: 500, letterSpacing: '.01em', opacity: 0.75 }}>{placeholder}</div>
          </div>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', border: '1.5px dashed currentColor', opacity: 0.35, borderRadius: 'inherit' }} />
        </>
      )}
    </div>
  )
}
