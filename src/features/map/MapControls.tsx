import { IconButton } from '../../components/ui/IconButton'

interface MapControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onLocate: () => void
}

export function MapControls({ onZoomIn, onZoomOut, onLocate }: MapControlsProps) {
  // Columna de abajo hacia arriba: "Mi ubicación", el indicador de ubicación (LocationStickyBar, que
  // informa su alto en --loc-lift) y, por encima, el zoom. 52px = botón de 44 + separación de 8.
  return (
    <>
      <div className="mp-ctrl" style={{ position: 'absolute', zIndex: 540, right: 12, bottom: 'calc(144px + 52px + var(--loc-lift, 0px))', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <IconButton icon="plus" label="Acercar" variant="glass" onClick={onZoomIn} />
        <IconButton icon="minus" label="Alejar" variant="glass" onClick={onZoomOut} />
      </div>
      <div className="mp-ctrl-locate" style={{ position: 'absolute', zIndex: 540, right: 12, bottom: 144 }}>
        <IconButton icon="locate-fixed" label="Mi ubicación" onClick={onLocate} />
      </div>
    </>
  )
}
