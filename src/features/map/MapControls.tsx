import { IconButton } from '../../components/ui/IconButton'

interface MapControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onLocate: () => void
}

export function MapControls({ onZoomIn, onZoomOut, onLocate }: MapControlsProps) {
  return (
    <div className="mp-ctrl" style={{ position: 'absolute', zIndex: 540, right: 12, bottom: 144, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <IconButton icon="plus" label="Acercar" variant="glass" onClick={onZoomIn} />
      <IconButton icon="minus" label="Alejar" variant="glass" onClick={onZoomOut} />
      <IconButton icon="locate-fixed" label="Mi ubicación" onClick={onLocate} />
    </div>
  )
}
