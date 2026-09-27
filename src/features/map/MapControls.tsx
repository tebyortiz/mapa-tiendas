import { IconButton } from '../../components/ui/IconButton'

interface MapControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onLocate: () => void
  /** Modo Tunuyán: el mapa se ve como si el usuario estuviera en el centro de la ciudad */
  tunuyan: boolean
  tunuyanLoading?: boolean
  onToggleTunuyan: () => void
}

export function MapControls({ onZoomIn, onZoomOut, onLocate, tunuyan, tunuyanLoading, onToggleTunuyan }: MapControlsProps) {
  return (
    <div className="mp-ctrl" style={{ position: 'absolute', zIndex: 540, right: 12, bottom: 144, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <IconButton icon="plus" label="Acercar" variant="glass" onClick={onZoomIn} />
      <IconButton icon="minus" label="Alejar" variant="glass" onClick={onZoomOut} />
      <IconButton icon="locate-fixed" label="Mi ubicación" onClick={onLocate} />
      <button
        type="button"
        aria-label="Ver Tunuyán"
        aria-pressed={tunuyan}
        title={tunuyan ? 'Volver a mi ubicación' : 'Ver como si estuvieras en Tunuyán'}
        disabled={tunuyanLoading}
        onClick={onToggleTunuyan}
        style={{
          width: 44, height: 44, minWidth: 44, minHeight: 44, borderRadius: 'var(--radius-pill)', border: 'none', cursor: tunuyanLoading ? 'wait' : 'pointer',
          font: '800 18px var(--font-body)', color: tunuyan ? 'var(--cf-black)' : '#fff', background: tunuyan ? '#fff' : 'var(--surface)',
          boxShadow: 'inset 0 0 0 1px var(--border-strong)', opacity: tunuyanLoading ? 0.6 : 1, transition: 'background var(--dur-base)',
        }}
      >
        T
      </button>
    </div>
  )
}
