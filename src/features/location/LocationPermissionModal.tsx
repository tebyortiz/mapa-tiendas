import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '../../components/ui/Icon'
import { allowLocationFromModal, closeLocationModal, useLocationStore } from '../../lib/nearbyStore'

/**
 * Modal de permisos de ubicación, compartido por la landing y el mapa. Lee su estado del
 * store global (`modalOpen`, `loading`, `error`) y dispara la geolocalización desde el gesto
 * del usuario al tocar "Explorar mi cuadra" (clave para que el prompt aparezca en mobile).
 */
export function LocationPermissionModal() {
  const { modalOpen, loading, error } = useLocationStore()

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !loading && closeLocationModal()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [modalOpen, loading])

  if (!modalOpen) return null

  const benefits = [
    { icon: 'store', text: 'Sucursales y emprendedores' },
    { icon: 'badge-percent', text: 'Productos y ofertas vigentes' },
    { icon: 'shopping-bag', text: 'Comprá, luego retirás o te llega' },
    { icon: 'navigation', text: 'Cómo llegar y a qué distancia estás' },
  ]

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="loc-modal-title"
      onClick={() => !loading && closeLocationModal()}
      style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(5,5,10,.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: 440, animation: 'cf-rise var(--dur-slow) var(--ease-out)' }}
      >
        {/* Halo/glow que emana de los bordes: mismo gradiente del borde, fluyendo en sync (misma franja .cf-flow-strip) */}
        {/* El halo se recorta con máscara para que solo se vea por fuera: el interior del modal es vidrio translúcido */}
        <span
          aria-hidden="true"
          className="cf-ring-mask"
          style={{ position: 'absolute', inset: -80, padding: 80, borderRadius: 118, zIndex: 0 }}
        >
          {/* 3 px por fuera del modal: radio 38 + 3 = 41, concéntrico con el borde */}
          <span style={{ position: 'absolute', inset: 77, borderRadius: 41, overflow: 'hidden', filter: 'blur(26px)', opacity: 0.8 }}>
            <span className="cf-flow-strip cf-flow-strip--slow" />
          </span>
        </span>
        {/* Borde arcoíris animado: anillo enmascarado (no un fondo border-box) para no teñir el vidrio.
            Grosor entero (3 px): con 2,5 px el medio píxel se suavizaba en las curvas y las esquinas se veían más finas. */}
        <span
          aria-hidden="true"
          className="cf-ring-mask"
          style={{ position: 'absolute', inset: 0, padding: 3, borderRadius: 38, zIndex: 2, overflow: 'hidden' }}
        >
          <span className="cf-flow-strip cf-flow-strip--slow" />
        </span>
        <button
          type="button"
          onClick={() => closeLocationModal()}
          disabled={loading}
          aria-label="Cerrar"
          style={{ position: 'absolute', top: 18, right: 18, zIndex: 3, width: 36, height: 36, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 999, cursor: loading ? 'default' : 'pointer', background: 'rgba(7,7,13,.6)', boxShadow: 'inset 0 0 0 1px var(--border-strong)', opacity: loading ? 0.5 : 1 }}
        >
          <Icon name="x" size={18} color="#fff" />
        </button>
        <div
        style={{ position: 'relative', zIndex: 1, width: '100%', maxHeight: 'calc(100dvh - 32px)', overflowY: 'auto', scrollbarWidth: 'none', boxSizing: 'border-box', borderRadius: 38, background: 'rgba(18,18,28,.4)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '3px solid transparent', boxShadow: '0 24px 70px rgba(0,0,0,.6)', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header: la ciudad Kenney del hero (misma captura y mismos anchos que precarga index.html, así en la
            landing sale de la caché) con la insignia del marcador centrada sobre la plaza de la fuente. */}
        <div style={{ position: 'relative', flex: 'none', height: 'clamp(136px,36vw,164px)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* La máscara funde la ciudad con el vidrio del modal hacia abajo (sin corte recto) */}
          <span aria-hidden="true" className="loc-hero-bg">
            <img
              src="/assets/scenes/city-960.webp"
              srcSet={[960, 1280, 1600, 2160].map((w) => `/assets/scenes/city-${w}.webp ${w}w`).join(', ')}
              sizes="(max-width: 480px) 200vw, 880px"
              alt=""
              decoding="async"
              className="loc-hero-city"
            />
            {/* Oscurece la ciudad alrededor de la insignia para que resalte */}
            <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 75% at 50% 50%, rgba(7,7,13,.05) 0%, rgba(7,7,13,.5) 100%), linear-gradient(180deg, rgba(7,7,13,.3) 0%, rgba(7,7,13,0) 40%)' }} />
          </span>
          {/* Pulso de "estás acá" alrededor de la insignia */}
          <span aria-hidden="true" className="loc-ping" />
          <span aria-hidden="true" className="loc-ping" style={{ animationDelay: '1.2s' }} />
          {/* Insignia: anillo arcoíris con núcleo negro (mismo estilo que el botón del asistente) */}
          <span style={{ position: 'relative', width: 72, height: 72, flex: 'none', padding: 3, borderRadius: 999, background: 'var(--rainbow-grad)', boxShadow: 'var(--glow-rainbow), 0 10px 26px rgba(0,0,0,.55)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: '100%', height: '100%', borderRadius: 999, background: 'var(--cf-black)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Ícono con encendido/parpadeo de neón, como el "COMPRÁ FÁCIL" del hero */}
              <span className="loc-neon-icon" style={{ display: 'inline-flex' }}>
                <Icon name="map-pin-search" size={32} color="#fff" />
              </span>
            </span>
          </span>
        </div>

        <div style={{ boxSizing: 'border-box', padding: '4px clamp(20px,5vw,30px) clamp(20px,5vw,28px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 id="loc-modal-title" style={{ margin: 0, font: '800 clamp(20px,3.6vw,26px)/1.2 var(--font-body)', letterSpacing: '.1em', textTransform: 'uppercase', color: '#fff', textShadow: 'var(--neon-text-soft)' }}>
            Descubrí tu cuadra
          </h2>
          <p style={{ margin: 0, font: '400 13px/1.5 var(--font-body)', color: 'var(--text-muted)' }}>
            Vas a poder visualizar al instante todo cerca tuyo:
          </p>
        </div>

        {/* Beneficios: grilla 2×2 de tarjetas de vidrio neutro, ícono a la izquierda y texto a la derecha
            (el gradiente queda reservado para el CTA). minmax(0,1fr): columnas iguales aunque una palabra larga empuje. */}
        <ul style={{ listStyle: 'none', margin: '4px 0', padding: 0, width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'clamp(8px,2vw,10px)' }}>
          {benefits.map((b) => (
            <li key={b.icon} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,2vw,10px)', padding: '12px clamp(8px,2vw,10px)', borderRadius: 16, textAlign: 'left', background: 'rgba(255,255,255,.04)' }}>
              <span style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 10, background: 'rgba(255,255,255,.07)', boxShadow: 'inset 0 0 0 1px var(--border-strong)' }}>
                <Icon name={b.icon} size={16} color="var(--text-body)" />
              </span>
              <span style={{ minWidth: 0, font: '600 clamp(12.5px,3.2vw,13px)/1.35 var(--font-body)', color: 'var(--text-body)' }}>{b.text}</span>
            </li>
          ))}
        </ul>

        <p style={{ margin: 0, font: '700 14px/1.5 var(--font-body)', color: 'var(--text-body)' }}>
          Animate a explorar productos, sucursales, ofertas y mucho más.
        </p>

        {error && (
          <p role="alert" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8, font: '600 13.5px/1.4 var(--font-body)', color: 'var(--cf-danger)' }}>
            <Icon name="message-warning" size={18} color="var(--cf-danger)" />
            {error}
          </p>
        )}

        {/* CTA principal: gradiente coral → azul → violeta */}
        <button
          type="button"
          onClick={() => void allowLocationFromModal()}
          disabled={loading}
          style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 52, padding: '0 22px', border: 'none', borderRadius: 'var(--radius-pill)', cursor: loading ? 'default' : 'pointer', background: 'var(--rainbow-grad)', opacity: loading ? 0.85 : 1, boxShadow: 'var(--glow-rainbow), inset 0 0 0 1px rgba(255,255,255,.3)', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)', font: '800 16px var(--font-body)' }}
        >
          {loading ? (
            <>
              <span aria-hidden="true" style={{ width: 18, height: 18, flex: 'none', borderRadius: 999, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', display: 'inline-block', animation: 'cf-spin .7s linear infinite' }} />
              Detectando tu ubicación…
            </>
          ) : (
            <>
              <Icon name="map-pin-search" size={20} color="#fff" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,.95)) drop-shadow(0 0 10px rgba(255,255,255,.55))' }} />
              {error ? 'Reintentar' : 'Explorar mi cuadra'}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => closeLocationModal()}
          disabled={loading}
          style={{ background: 'transparent', border: 'none', cursor: loading ? 'default' : 'pointer', font: '700 14px var(--font-body)', color: 'var(--text-muted)', padding: 4 }}
        >
          Ahora no
        </button>
        </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
