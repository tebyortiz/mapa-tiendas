import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { openLocationModal, useLocationStore } from '../../lib/nearbyStore'

/**
 * Estado vacío para las secciones de la landing cuando todavía no se detectó la ubicación.
 * Reemplaza el contenido de muestra: invita a compartir la ubicación para traer datos reales
 * del backend (nada de datos por defecto de una ciudad fija).
 */
export function LocationGate({ noun }: { noun: string }) {
  const { loading } = useLocationStore()
  return (
    <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '8px var(--gutter) 0' }}>
      <div
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', padding: 'clamp(28px,5vw,44px) 24px', borderRadius: 'var(--radius-panel)', background: 'var(--surface-glass-dark)', boxShadow: 'inset 0 0 0 1px var(--border-strong)' }}
      >
        <span style={{ display: 'grid', placeItems: 'center', width: 60, height: 60 }}>
          <span aria-hidden="true" style={{ gridArea: '1 / 1', width: 60, height: 60, borderRadius: 999, background: 'var(--rainbow-grad)', opacity: 0.2, filter: 'blur(2px)' }} />
          <Icon name="map-pin" size={34} color="#fff" style={{ gridArea: '1 / 1', placeSelf: 'center', filter: 'drop-shadow(0 0 3px rgba(255,255,255,.95)) drop-shadow(0 0 10px rgba(255,255,255,.6))' }} />
        </span>
        <h3 style={{ margin: 0, font: '800 clamp(18px,2.4vw,22px)/1.2 var(--font-body)', color: '#fff' }}>Indicá tu ubicación</h3>
        <p style={{ margin: 0, maxWidth: 420, font: '500 15px/1.55 var(--font-body)', color: 'var(--text-muted)' }}>
          Compartí tu ubicación para ver {noun} cerca tuyo, con datos reales de tu zona.
        </p>
        <Button icon="map-pin-search" onClick={() => openLocationModal()} disabled={loading} style={{ color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)' }}>
          {loading ? 'Detectando…' : 'Detectar ubicación'}
        </Button>
      </div>
    </div>
  )
}
