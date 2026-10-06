import { useNavigate } from 'react-router-dom'
import { ShopAssistant, SHOP_ASSISTANT_ENABLED } from '../components/assistant/ShopAssistant'
import { useNearby } from '../lib/nearbyStore'
import { LandingCatalog } from '../features/landing/Catalog'
import { LandingHero } from '../features/landing/Hero'
import { LandingJoin, LandingFooter } from '../features/landing/JoinFooter'
import { LandingNav } from '../features/landing/Nav'
import { LandingNearby } from '../features/landing/Nearby'
import { LandingMostRequested } from '../features/landing/MostRequested'
import { LandingOffers } from '../features/landing/Offers'
import type { OpenMap } from '../features/landing/shared'

export default function LandingPage() {
  const navigate = useNavigate()
  const geo = useNearby()
  const open: OpenMap = (type, id) => navigate(`/mapa${type ? `?type=${type}${id ? `&id=${id}` : ''}` : ''}`)
  const search = (q: string) => navigate(`/mapa?q=${encodeURIComponent(q)}`)
  return (
    <div>
      <LandingNav onOpenMap={() => open()} search={{ query: '', onSearch: (q) => q && search(q) }} />
      <LandingHero onOpenMap={() => open()} onSearch={search} city={geo.nearby?.city} />
      <LandingOffers onOpenMap={open} geo={geo} />
      <LandingCatalog onOpenMap={open} />
      <LandingMostRequested onOpenMap={open} geo={geo} />
      <LandingNearby onOpenMap={open} geo={geo} />
      <LandingJoin />
      <LandingFooter />
      {SHOP_ASSISTANT_ENABLED && <ShopAssistant />}
    </div>
  )
}
