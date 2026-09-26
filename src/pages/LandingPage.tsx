import CatalogVirtual from '../components/landing/CatalogVirtual'
import FeaturedOffers from '../components/landing/FeaturedOffers'
import Hero from '../components/landing/Hero'
import MostRequested from '../components/landing/MostRequested'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0e0721]">
      <Hero />
      <CatalogVirtual />
      <FeaturedOffers />
      <MostRequested />
    </main>
  )
}
