import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'

interface LocationModalProps {
  loading: boolean
  error: string | null
  onAllow: () => void
  onSkip: () => void
}

export function LocationModal({ loading, error, onAllow, onSkip }: LocationModalProps) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="loc-title" style={{ position: 'absolute', inset: 0, zIndex: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: 28, borderRadius: 'var(--radius-xl, 24px)', background: 'var(--surface-glass-dark)', boxShadow: 'inset 0 0 0 1px var(--border-strong)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', animation: 'cf-rise var(--dur-slow) var(--ease-out)' }}>
        <Icon name="map-pin" size={40} color="#fff" />
        <h2 id="loc-title" style={{ margin: 0, font: '800 22px var(--font-display, var(--font-body))', color: '#fff' }}>Necesitamos tu ubicación</h2>
        <p style={{ margin: 0, font: '400 15px/1.5 var(--font-body)', color: 'var(--text-muted)' }}>
          La plataforma usa tu ubicación para mostrarte tiendas, servicios y emprendimientos cercanos (en un radio de 1500 m) y sus ofertas.
        </p>
        {error && <p role="alert" style={{ margin: 0, font: '600 14px var(--font-body)', color: 'var(--cf-danger)' }}>{error}</p>}
        <Button fullWidth icon="locate-fixed" onClick={onAllow} disabled={loading}>{loading ? 'Buscando cerca tuyo…' : error ? 'Reintentar' : 'Permitir ubicación'}</Button>
        <Button fullWidth variant="ghost" onClick={onSkip} disabled={loading}>Ahora no</Button>
      </div>
    </div>
  )
}
