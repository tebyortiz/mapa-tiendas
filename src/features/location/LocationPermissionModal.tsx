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
    { icon: 'store', text: 'Sucursales y emprendedores cercanos' },
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
        {/* Halo/glow que emana de los bordes: mismo gradiente del borde, fluyendo en sync (cf-glow-slide ≡ cf-border-slide) */}
        {/* El halo se recorta con máscara para que solo se vea por fuera: el interior del modal es vidrio translúcido */}
        <span
          aria-hidden="true"
          className="cf-ring-mask"
          style={{ position: 'absolute', inset: -80, padding: 80, borderRadius: 118, zIndex: 0 }}
        >
          <span style={{ position: 'absolute', inset: 77, borderRadius: 42, background: 'linear-gradient(90deg, var(--cf-rb-coral), var(--cf-rb-sky), var(--cf-rb-violet), var(--cf-rb-coral))', backgroundSize: '200% 100%', filter: 'blur(26px)', opacity: 0.8, animation: 'cf-glow-slide 5s linear infinite' }} />
        </span>
        {/* Borde arcoíris animado: anillo enmascarado (no un fondo border-box) para no teñir el vidrio */}
        <span
          aria-hidden="true"
          className="cf-ring-mask"
          style={{ position: 'absolute', inset: 0, padding: 2.5, borderRadius: 38, zIndex: 2, background: 'linear-gradient(90deg, var(--cf-rb-coral), var(--cf-rb-sky), var(--cf-rb-violet), var(--cf-rb-coral))', backgroundSize: '200% 100%', animation: 'cf-glow-slide 5s linear infinite' }}
        />
        <button
          type="button"
          onClick={() => closeLocationModal()}
          disabled={loading}
          aria-label="Cerrar"
          style={{ position: 'absolute', top: 22, right: 22, zIndex: 3, width: 36, height: 36, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 999, cursor: loading ? 'default' : 'pointer', background: 'rgba(255,255,255,.08)', boxShadow: 'inset 0 0 0 1px var(--border-strong)', opacity: loading ? 0.5 : 1 }}
        >
          <Icon name="x" size={18} color="#fff" />
        </button>
        <div
        style={{ position: 'relative', zIndex: 1, width: '100%', maxHeight: 'calc(100dvh - 32px)', overflowY: 'auto', scrollbarWidth: 'none', boxSizing: 'border-box', padding: 'clamp(24px,5vw,34px)', borderRadius: 38, background: 'rgba(18,18,28,.4)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '2.5px solid transparent', boxShadow: '0 24px 70px rgba(0,0,0,.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}
      >
        {/* Insignia: anillo arcoíris con núcleo negro (mismo estilo que el botón del asistente) */}
        <span style={{ width: 72, height: 72, flex: 'none', padding: 3, borderRadius: 999, background: 'var(--rainbow-grad)', boxShadow: 'var(--glow-rainbow), 0 10px 26px rgba(0,0,0,.45)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: '100%', height: '100%', borderRadius: 999, background: 'var(--cf-black)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Ícono con encendido/parpadeo de neón, como el "COMPRÁ FÁCIL" del hero */}
            <span className="loc-neon-icon" style={{ display: 'inline-flex' }}>
              <Icon name="map-pin-search" size={32} color="#fff" />
            </span>
          </span>
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 id="loc-modal-title" style={{ margin: 0, font: '800 clamp(20px,3.6vw,26px)/1.2 var(--font-body)', letterSpacing: '.1em', textTransform: 'uppercase', color: '#fff', textShadow: 'var(--neon-text-soft)' }}>
            Descubrí tu cuadra
          </h2>
          <p style={{ margin: 0, font: '400 13px/1.5 var(--font-body)', color: 'var(--text-muted)' }}>
            Vas a poder visualizar al instante todo cerca tuyo:
          </p>
        </div>

        {/* Beneficios: solo ícono + texto, sin contenedor */}
        <ul style={{ listStyle: 'none', margin: '8px 0', padding: 0, width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {benefits.map((b) => (
            <li key={b.icon} style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
              <span style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 10, background: 'var(--rainbow-grad)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.25)' }}>
                <Icon name={b.icon} size={18} color="#fff" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,.35))' }} />
              </span>
              <span style={{ font: '600 13.5px/1.4 var(--font-body)', color: 'var(--text-body)' }}>{b.text}</span>
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
    </div>,
    document.body,
  )
}
