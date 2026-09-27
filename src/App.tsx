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
        path="/mapa"
        element={
          <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg)' }} />}>
            <MapPage />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
