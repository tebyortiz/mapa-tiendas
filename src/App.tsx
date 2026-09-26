import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

// mapbox-gl pesa ~500 kB gzip: se difiere para no incluirlo en la landing.
const MapPage = lazy(() => import('./pages/MapPage'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/mapa/:tipo"
        element={
          <Suspense fallback={<div className="min-h-screen bg-[#0e0721]" />}>
            <MapPage />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
