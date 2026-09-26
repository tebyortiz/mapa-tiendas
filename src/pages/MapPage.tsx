import { Repeat } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import AppHeader from '../components/layout/AppHeader'
import CambioVistaModal from '../components/map/CambioVistaModal'
import MapCanvas from '../components/map/MapCanvas'
import StoreDetailModal from '../components/map/StoreDetailModal'
import LocationBadge from '../components/ui/LocationBadge'
import { pinsByType } from '../data/pins'
import type { CatalogType, MapPin } from '../data/types'

const VALID_TYPES: CatalogType[] = ['tiendas', 'servicios', 'emprendimientos']

const VIEW_LABEL: Record<CatalogType, string> = {
  tiendas: 'TIENDAS',
  servicios: 'SERVICIOS',
  emprendimientos: 'EMPRENDIMIENTOS',
}

export default function MapPage() {
  const { tipo } = useParams<{ tipo: string }>()
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null)
  const [switchOpen, setSwitchOpen] = useState(false)

  if (!tipo || !VALID_TYPES.includes(tipo as CatalogType)) {
    return <Navigate to="/mapa/tiendas" replace />
  }

  const type = tipo as CatalogType
  const pins = pinsByType[type]

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#3b1f6b_0%,_#170c33_45%,_#0e0721_100%)] px-6 py-10 md:px-16">
      <div className="mx-auto max-w-5xl">
        <AppHeader />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <span>ESTÁS VIENDO:</span>
            <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#170c33] shadow">
              {VIEW_LABEL[type]}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSwitchOpen(true)}
            className="pill-gradient flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold text-white shadow-lg"
          >
            CAMBIAR <Repeat size={14} />
          </button>
        </div>

        <div className="mt-4">
          <LocationBadge />
        </div>

        <div className="mt-6">
          <MapCanvas pins={pins} onSelectPin={setSelectedPin} />
        </div>
      </div>

      <StoreDetailModal pin={selectedPin} type={type} onClose={() => setSelectedPin(null)} />
      <CambioVistaModal open={switchOpen} onClose={() => setSwitchOpen(false)} />
    </main>
  )
}
