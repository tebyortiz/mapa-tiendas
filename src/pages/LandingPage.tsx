import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopAssistant, SHOP_ASSISTANT_ENABLED } from '../components/assistant/ShopAssistant'
import { autoLocateIfGranted, openLocationModal, useLocationStore } from '../lib/nearbyStore'
import { LandingCatalog } from '../features/landing/Catalog'
import { LandingHero } from '../features/landing/Hero'
import { LandingJoin, LandingFooter } from '../features/landing/JoinFooter'
import { LandingNav } from '../features/landing/Nav'
import { LandingNearby } from '../features/landing/Nearby'
import { LandingMostRequested } from '../features/landing/MostRequested'
import { LandingOffers } from '../features/landing/Offers'
import { LocationPermissionModal } from '../features/location/LocationPermissionModal'
import { LocationStickyBar } from '../features/location/LocationStickyBar'
import type { OpenMap } from '../features/landing/shared'

export default function LandingPage() {
  const navigate = useNavigate()
  const { nearby, loading } = useLocationStore()
  const geo = { nearby, loading }

  // Al cargar la landing: si el permiso ya está concedido se geolocaliza en silencio.
  // Si no, no se fuerza ningún prompt: la barra sticky invita a detectar la ubicación.
  useEffect(() => {
    void autoLocateIfGranted()
  }, [])

  const open: OpenMap = (type, id) => navigate(`/mapa${type ? `?type=${type}${id ? `&id=${id}` : ''}` : ''}`)

  // Buscar un producto desde el hero: necesita ubicación. Si ya la tenemos, vamos directo al
  // mapa con la búsqueda; si no, abrimos el modal y, al detectarla, navegamos con la consulta.
  const search = (q: string) => {
    const query = q.trim()
    if (!query) return
    const go = () => navigate(`/mapa?q=${encodeURIComponent(query)}`)
    if (nearby) go()
    else openLocationModal(() => go())
  }

  return (
    <div style={{ paddingBottom: 'calc(32px + env(safe-area-inset-bottom, 0px))' }}>
      <LandingNav onOpenMap={() => open()} search={{ query: '', onSearch: (q) => q && search(q) }} />
      <LandingHero onOpenMap={() => open()} onSearch={search} />
      <LandingOffers onOpenMap={open} geo={geo} />
      <LandingCatalog onOpenMap={open} />
      <LandingMostRequested onOpenMap={open} geo={geo} />
      <LandingNearby onOpenMap={open} geo={geo} />
      <LandingJoin />
      <LandingFooter />
      {SHOP_ASSISTANT_ENABLED && <ShopAssistant />}
      <LocationStickyBar />
      <LocationPermissionModal />
    </div>
  )
}
