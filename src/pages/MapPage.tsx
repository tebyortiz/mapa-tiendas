import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { MapRef } from 'react-map-gl/mapbox'
import { BusinessSheet } from '../components/business/BusinessSheet'
import { Toast } from '../components/ui/Toast'
import { BUSINESSES, LOCAL_BUSINESSES, synonyms } from '../data/businesses'
import type { Business, CategoryKey, TypeKey } from '../data/types'
import { LandingNav } from '../features/landing/Nav'
import { MapView } from '../features/map/MapView'
import { MAP_CENTER } from '../lib/mapbox'
import { fetchNearby, fmtDistance, metersBetween, toBusiness } from '../lib/geoApi'
import { loadNearby, locateAndFetch } from '../lib/nearbyStore'
import type { Nearby } from '../lib/nearbyStore'
import { LocationModal } from '../features/map/LocationModal'
import { MapControls } from '../features/map/MapControls'
import { MapTopBar } from '../features/map/MapTopBar'
import { OffersStrip } from '../features/map/OffersStrip'
import { ResultsPanel } from '../features/map/ResultsPanel'

const TYPES: TypeKey[] = ['tienda', 'servicio', 'emprendimiento']
const mq = window.matchMedia('(min-width:900px)')

export default function MapPage() {
  const [params] = useSearchParams()
  const qType = params.get('type') as TypeKey | null
  const qId = params.get('id')
  const [type, setType] = useState<TypeKey>(qType && TYPES.includes(qType) ? qType : 'todas')
  const [picked, setPicked] = useState(!!qType && TYPES.includes(qType))
  const [cat, setCat] = useState<CategoryKey | 'todas'>('todas')
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [sel, setSel] = useState<number | null>(qId ? +qId : null)
  const [desk, setDesk] = useState(mq.matches)
  const [exp, setExp] = useState(mq.matches)
  const [toast, setToast] = useState<string | null>(null)
  const mapRef = useRef<MapRef | null>(null)
  const cached = useState(loadNearby)[0]
  const [askLoc, setAskLoc] = useState(!cached)
  const [locLoading, setLocLoading] = useState(false)
  const [locError, setLocError] = useState<string | null>(null)
  const [apiBiz, setApiBiz] = useState<Business[] | null>(cached?.businesses ?? null)
  const [userPos, setUserPos] = useState<{ lat: number; lng: number }>(cached?.pos ?? MAP_CENTER)
  // Modo Tunuyán: se ve el mapa desde el centro de la ciudad; al apagarlo se vuelve a la ubicación detectada por el navegador
  const [tunuyan, setTunuyan] = useState(false)
  const [tunuyanLoading, setTunuyanLoading] = useState(false)
  const realNearby = useRef<Nearby | null>(cached)

  const flash = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2600)
  }

  // Con datos del backend (solo tiendas) se suman los servicios y emprendimientos de ejemplo, con la distancia desde el usuario.
  const businesses = useMemo(
    () => (apiBiz ? [...apiBiz, ...LOCAL_BUSINESSES.map((b) => ({ ...b, distance: fmtDistance(metersBetween(userPos, b)) }))] : BUSINESSES),
    [apiBiz, userPos],
  )

  const allowLocation = async () => {
    setLocLoading(true)
    setLocError(null)
    try {
      const n = await locateAndFetch()
      realNearby.current = n
      setTunuyan(false)
      setApiBiz(n.businesses)
      setUserPos(n.pos)
      setSel(null)
      mapRef.current?.flyTo({ center: [n.pos.lng, n.pos.lat], zoom: 15 })
      setAskLoc(false)
    } catch (e) {
      console.error('[geo] error', e)
      setLocError(e instanceof GeolocationPositionError ? 'No pudimos obtener tu ubicación. Revisá los permisos del navegador.' : 'No pudimos cargar los comercios cercanos. Probá de nuevo.')
    } finally {
      setLocLoading(false)
    }
  }

  useEffect(() => {
    const f = () => {
      setDesk(mq.matches)
      setExp(mq.matches)
    }
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])

  const items = businesses.filter(
    (b) => (type === 'todas' || b.type === type) && (cat === 'todas' || b.category === cat) && (!query || synonyms(query).some((w) => b.search.includes(w))),
  )
  // Categorías con sucursales cercanas dentro del tipo elegido: sus chips van primero
  const present = useMemo(() => new Set(businesses.filter((b) => type === 'todas' || b.type === type).map((b) => b.category)), [businesses, type])
  const s = businesses.find((b) => b.id === sel)
  const pick = (id: number) => {
    setSel(id)
    if (!desk) setExp(false)
  }
  const toggleTunuyan = async () => {
    setTunuyanLoading(true)
    try {
      if (!tunuyan) {
        const results = await fetchNearby(MAP_CENTER.lat, MAP_CENTER.lng)
        console.log('[tunuyan] comercios recibidos:', results.length)
        setApiBiz(results.map(toBusiness))
        setUserPos(MAP_CENTER)
        setTunuyan(true)
        // Los comercios del backend son de tipo "tienda": si había un filtro activo quedarían ocultos, así que se resetea para mostrarlos.
        setType('todas')
        setCat('todas')
        setPicked(false)
        flash('Viendo Tunuyán')
      } else {
        const n = realNearby.current ?? (await locateAndFetch())
        realNearby.current = n
        setApiBiz(n.businesses)
        setUserPos(n.pos)
        setTunuyan(false)
        flash('Volviste a tu ubicación')
      }
      setSel(null)
      const c = !tunuyan ? MAP_CENTER : (realNearby.current?.pos ?? MAP_CENTER)
      mapRef.current?.flyTo({ center: [c.lng, c.lat], zoom: 15 })
    } catch (e) {
      console.error('[geo] error', e)
      flash(tunuyan ? 'No pudimos obtener tu ubicación' : 'No pudimos cargar Tunuyán')
    } finally {
      setTunuyanLoading(false)
    }
  }
  const locate = () => {
    mapRef.current?.flyTo({ center: [userPos.lng, userPos.lat], zoom: 15 })
    setToast('Te encontramos')
    setTimeout(() => setToast(null), 2600)
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <LandingNav base="/" sticky={false} cta={false} search={{ query, onSearch: setQuery }} />
      <div data-type={type === 'todas' ? undefined : type} style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <MapView items={items} selectedId={sel} onSelect={pick} mapRef={mapRef} userPos={userPos} />
        <MapTopBar present={present} type={type} setType={setType} cat={cat} setCat={setCat} picked={picked} onPick={() => setPicked(true)} />
        <MapControls onZoomIn={() => mapRef.current?.zoomIn()} onZoomOut={() => mapRef.current?.zoomOut()} onLocate={locate} tunuyan={tunuyan} tunuyanLoading={tunuyanLoading} onToggleTunuyan={toggleTunuyan} />
        <ResultsPanel items={items} selectedId={sel} onSelect={pick} expanded={exp} setExpanded={setExp} type={type} desk={desk} />
        {toast && (
          <div style={{ position: 'absolute', zIndex: 700, left: 0, right: 0, top: 'calc(var(--mp-top,240px) + 8px)', display: 'flex', justifyContent: 'center' }}>
            <Toast icon="locate-fixed" tone="success">{toast}</Toast>
          </div>
        )}
        {askLoc && <LocationModal loading={locLoading} error={locError} onAllow={allowLocation} onSkip={() => setAskLoc(false)} />}
        {s && (
          <div key={s.id} className="mp-sheet" style={{ position: 'absolute', zIndex: 650, left: 8, right: 8, bottom: 8, maxHeight: '78%', overflowY: 'auto', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, animation: 'cf-rise var(--dur-slow) var(--ease-out)' }}>
            <BusinessSheet
              type={s.type} name={s.name} chain={s.chain} branch={s.branch} chainImage={s.chainImage} category={s.category}
              categoryLabel={s.categoryLabel} image={s.image} description={s.description} address={s.address} hours={s.hours} delivery={s.delivery}
              distance={s.distance} open={s.open} hasOffers={s.hasOffers}
              onClose={() => setSel(null)}
              onDirections={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`, '_blank')}
              onWeb={s.web ? () => window.open(s.web, '_blank', 'noopener,noreferrer') : undefined}
            />
            <OffersStrip b={s} />
          </div>
        )}
      </div>
    </div>
  )
}
