import { useEffect, useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { openLocationModal, useLocationStore } from '../../lib/nearbyStore'

const mq = window.matchMedia('(min-width:900px)')

interface LocationStickyBarProps {
  /** 'landing': abajo a la derecha (junto al buscador del hero). 'map': abajo a la derecha, debajo de la columna de controles (+, −, centrar). */
  variant?: 'landing' | 'map'
}

/**
 * Indicador de ubicación persistente, compartido por la landing y el mapa.
 * - Con ubicación (desktop y mobile): círculo flotante (mismo estilo que el launcher del asistente). Al
 *   tocarlo crece hacia la izquierda y muestra: marcador + ("Estás en", solo desktop) + chip de la ciudad
 *   + botón actualizar + botón cerrar. En el mapa va debajo de la columna de controles (+, −, centrar).
 * - Sin ubicación, desktop: pill punteada ámbar con aviso + botón "Detectar".
 * - Sin ubicación, mobile: círculo "incompleto" (aro punteado ámbar + pulso + aviso) que abre el modal.
 *
 * "Actualizar" / "Detectar" reabren el modal para recalcular lat/lng/radio: la
 * ubicación queda persistida, así que si el usuario se movió puede actualizarla desde acá.
 */
export function LocationStickyBar({ variant = 'landing' }: LocationStickyBarProps) {
  const { nearby, loading } = useLocationStore()
  const city = nearby?.city
  const [desk, setDesk] = useState(mq.matches)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const f = () => setDesk(mq.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])

  const onMap = variant === 'map'
  // En el mapa el indicador ocupa el último lugar de la columna de controles: expone su alto (+ separación)
  // como --loc-lift para que .mp-ctrl suba y le deje el lugar.
  useEffect(() => {
    if (!onMap) return
    const h = desk && !city ? 68 : 44
    document.documentElement.style.setProperty('--loc-lift', `${h + 12}px`)
    return () => { document.documentElement.style.removeProperty('--loc-lift') }
  }, [onMap, desk, city])

  // Chip con el nombre de la ciudad detectada (gradiente de marca).
  const cityChip = (
    <span style={{ display: 'inline-flex', alignItems: 'center', boxSizing: 'border-box', height: desk ? 44 : 32, padding: desk ? '0 18px' : '0 14px', borderRadius: 999, background: 'var(--rainbow-grad)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.25)', font: '800 14px var(--font-body)', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      {city}
    </span>
  )

  const estasEn = (
    <span style={{ font: '600 12px/1 var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap' }}>
      Estás en
    </span>
  )

  // ─────────────────────────── Desktop sin ubicación: pill punteada con aviso ───────────────────────────
  if (desk && !city) {
    // Botón "Detectar" (sin ubicación): abre el modal de permisos. Mismo ícono que el modal.
    const detectBtn = (
      <button
        type="button"
        onClick={() => openLocationModal()}
        disabled={loading}
        aria-label="Detectar mi ubicación"
        style={{ position: 'relative', flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 44, padding: '0 18px', border: 'none', borderRadius: 999, cursor: loading ? 'default' : 'pointer', background: 'var(--rainbow-grad)', opacity: loading ? 0.85 : 1, boxShadow: 'var(--glow-rainbow), inset 0 0 0 1px rgba(255,255,255,.28)', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)', font: '800 14px var(--font-body)', whiteSpace: 'nowrap' }}
      >
        {loading ? (
          <span aria-hidden="true" style={{ width: 16, height: 16, flex: 'none', borderRadius: 999, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', display: 'inline-block', animation: 'cf-spin .7s linear infinite' }} />
        ) : (
          <Icon name="map-pin-search" size={18} color="#fff" />
        )}
        <span>{loading ? 'Detectando…' : 'Detectar'}</span>
      </button>
    )

    return (
      <div className={`loc-sticky ${onMap ? 'loc-sticky-map' : 'loc-sticky-desk'}`}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 12, boxSizing: 'border-box', padding: '10px 10px 10px 16px', borderRadius: 'var(--radius-pill, 999px)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', background: 'var(--surface-glass-dark)', border: '2px dashed rgba(255,200,61,.85)', boxShadow: '0 10px 30px rgba(0,0,0,.45)', animation: 'cf-rise var(--dur-slow) var(--ease-out)', position: 'relative', overflow: 'hidden' }}
        >
          {/* Halo de luz ámbar que barre la pill de izquierda a derecha */}
          <span aria-hidden="true" className="loc-sweep" />
          <Icon name="map-pin-off" size={26} color="var(--cf-amber)" style={{ flex: 'none', position: 'relative' }} />
          <div style={{ position: 'relative', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ font: '800 14px/1.2 var(--font-body)', color: 'var(--cf-amber)', whiteSpace: 'nowrap' }}>Ubicación no detectada</span>
            <span style={{ font: '600 12.5px/1.3 var(--font-body)', color: 'var(--cf-amber)', whiteSpace: 'nowrap' }}>Por favor indicá tu ubicación</span>
          </div>
          {detectBtn}
        </div>
      </div>
    )
  }

  // ─────────────────────────── Mobile sin ubicación ───────────────────────────
  // Sin ciudad: círculo "incompleto" (aro punteado ámbar + pulso + aviso). Tocarlo abre el modal.
  if (!city) {
    const d = onMap ? 44 : 56
    return (
      <div className={`loc-sticky ${onMap ? 'loc-sticky-map' : 'loc-sticky-mob'}`}>
        <button
          type="button"
          onClick={() => openLocationModal()}
          disabled={loading}
          aria-label="Detectar mi ubicación"
          style={{ position: 'relative', width: d, height: d, flex: 'none', padding: 0, border: 'none', background: 'transparent', cursor: loading ? 'default' : 'pointer', display: 'inline-grid', placeItems: 'center' }}
        >
          <span aria-hidden="true" style={{ gridArea: '1 / 1', width: d, height: d, borderRadius: 999, background: 'radial-gradient(closest-side, rgba(255,200,61,0) 60%, rgba(255,200,61,.5) 76%, rgba(255,200,61,0) 100%)', animation: 'cf-ping 1.9s var(--ease-out) infinite' }} />
          <span style={{ gridArea: '1 / 1', width: d, height: d, boxSizing: 'border-box', borderRadius: 999, background: 'var(--surface-glass-dark)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '2px dashed rgba(255,200,61,.85)', boxShadow: '0 10px 26px rgba(0,0,0,.45)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {loading ? (
              <span aria-hidden="true" style={{ width: 20, height: 20, borderRadius: 999, border: '2px solid rgba(255,200,61,.4)', borderTopColor: 'var(--cf-amber)', display: 'inline-block', animation: 'cf-spin .7s linear infinite' }} />
            ) : (
              <Icon name="map-pin-search" size={onMap ? 21 : 25} color="var(--cf-amber)" style={{ opacity: 0.9 }} />
            )}
          </span>
          {!loading && (
            <span aria-hidden="true" style={{ gridArea: '1 / 1', alignSelf: 'start', justifySelf: 'end', transform: 'translate(2px,-2px)', width: 16, height: 16, borderRadius: 999, background: 'var(--cf-amber)', border: '2px solid var(--cf-black)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '900 11px/1 var(--font-body)', color: 'var(--cf-black)' }}>!</span>
          )}
        </button>
      </div>
    )
  }

  // ─────────────────────────── Con ubicación (desktop y mobile) ───────────────────────────
  // Círculo (colapsado) que se expande hacia la izquierda en una pill.
  const stickyClass = onMap ? 'loc-sticky-map' : desk ? 'loc-sticky-desk' : 'loc-sticky-mob'
  const compact = desk || onMap
  const circle = compact ? 44 : 56
  return (
    <>
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: onMap ? 539 : 899 }} />
      )}
      <div className={`loc-sticky ${stickyClass}`}>
        <div
          className="loc-mob-pill"
          data-open={open ? 'true' : 'false'}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: open ? 10 : 0, padding: open ? '7px 7px 7px 16px' : 0, margin: open ? '-8.5px -8.5px -8.5px 0' : 0, borderRadius: 'var(--radius-pill, 999px)', backdropFilter: open ? 'blur(16px)' : 'none', WebkitBackdropFilter: open ? 'blur(16px)' : 'none', background: open ? 'var(--surface-glass-dark) padding-box, var(--rainbow-grad) border-box' : 'transparent', border: open ? '1.5px solid transparent' : 'none', boxShadow: open ? 'var(--glow-rainbow), 0 10px 30px rgba(0,0,0,.45)' : 'none', transition: 'gap .3s var(--ease-out), padding .3s var(--ease-out), margin .3s var(--ease-out)' }}
        >
          {/* El margen negativo (= padding + borde) hace que la pill crezca hacia afuera: el círculo no se mueve al abrir. */}
          {/* Cuerpo que crece hacia la izquierda: marcador + ("Estás en") + chip de ciudad + botón actualizar */}
          <div className="loc-body">
            <Icon name="map-pin" size={24} color="#fff" style={{ flex: 'none', filter: 'drop-shadow(0 0 3px rgba(255,255,255,.9)) drop-shadow(0 0 9px rgba(255,255,255,.55))' }} />
            {desk && estasEn}
            {cityChip}
            <button
              type="button"
              onClick={() => openLocationModal()}
              disabled={loading}
              aria-label="Actualizar mi ubicación"
              style={{ flex: 'none', gap: 7, width: desk ? undefined : 40, height: desk ? 44 : 40, padding: desk ? '0 16px' : 0, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)', font: '800 13px var(--font-body)', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 999, cursor: loading ? 'default' : 'pointer', background: 'var(--rainbow-grad)', opacity: loading ? 0.85 : 1, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.28)' }}
            >
              {loading ? (
                <span aria-hidden="true" style={{ width: 16, height: 16, borderRadius: 999, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', display: 'inline-block', animation: 'cf-spin .7s linear infinite' }} />
              ) : (
                <Icon name="refresh-cw" size={18} color="#fff" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,.35))' }} />
              )}
              {desk && 'Actualizar'}
            </button>
          </div>

          {/* Botón circular (extremo derecho): colapsado = launcher (marker); abierto = cerrar.
              Mismo estilo que el launcher del asistente: aro arcoíris + núcleo negro. */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Cerrar ubicación' : 'Ver mi ubicación'}
            aria-expanded={open}
            style={{ position: 'relative', flex: 'none', width: circle, height: circle, padding: 3, border: 'none', borderRadius: 999, cursor: 'pointer', background: 'transparent', boxShadow: 'var(--glow-rainbow), 0 10px 26px rgba(0,0,0,.45)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Aro arcoíris enmascarado: así el núcleo puede ser vidrio translúcido sin teñirse */}
            <span aria-hidden="true" className="cf-ring-mask" style={{ position: 'absolute', inset: 0, padding: 3, borderRadius: 999, background: 'var(--rainbow-grad)' }} />
            <span style={{ width: '100%', height: '100%', borderRadius: 999, background: 'var(--surface-glass-dark)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={open ? 'x' : 'map-pin'} size={compact ? 22 : 26} color="#fff" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,.9)) drop-shadow(0 0 11px rgba(255,255,255,.55))' }} />
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
