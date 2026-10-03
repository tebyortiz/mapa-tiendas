import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { MapRef } from 'react-map-gl/mapbox'
import { BusinessSheet } from '../components/business/BusinessSheet'
import { ShopAssistant } from '../components/assistant/ShopAssistant'
import { Icon } from '../components/ui/Icon'
import { IconButton } from '../components/ui/IconButton'
import { Toast } from '../components/ui/Toast'
import { BUSINESSES, LOCAL_BUSINESSES } from '../data/businesses'
import type { Business, CategoryKey, TypeKey } from '../data/types'
import { LandingNav } from '../features/landing/Nav'
import { MapView } from '../features/map/MapView'
import { MAP_CENTER } from '../lib/mapbox'
import { DEFAULT_RADIUS, fetchNearby, fmtDistance, metersBetween, toBusiness } from '../lib/geoApi'
import { loadNearby, locateAndFetch } from '../lib/nearbyStore'
import { useEdgeFade } from '../lib/useEdgeFade'
import { LocationModal } from '../features/map/LocationModal'
import { MapControls } from '../features/map/MapControls'
import { MapTopBar } from '../features/map/MapTopBar'
import { OffersStrip } from '../features/map/OffersStrip'
import { ProductResultSheet } from '../features/map/ProductResultSheet'
import { ResultsPanel } from '../features/map/ResultsPanel'
import { clearProductSearch, runProductSearch, useProductSearch } from '../lib/productSearch'

const TYPES: TypeKey[] = ['tienda', 'servicio', 'emprendimiento']
const mq = window.matchMedia('(min-width:900px)')

export default function MapPage() {
  const [params] = useSearchParams()
  const qType = params.get('type') as TypeKey | null
  const qId = params.get('id')
  // Término de búsqueda de productos que puede venir en la URL (desde el hero o el drawer de la landing).
  const initialQ = params.get('q') ?? ''
  const [type, setType] = useState<TypeKey>(qType && TYPES.includes(qType) ? qType : 'todas')
  const [picked, setPicked] = useState(!!qType && TYPES.includes(qType))
  const [cat, setCat] = useState<CategoryKey | 'todas'>('todas')
  // Buscador de productos (asistente + hero + navbar + drawer): término actual y fase de la última búsqueda.
  const [term, setTerm] = useState(initialQ)
  const [searchPhase, setSearchPhase] = useState<'idle' | 'loading' | 'empty' | 'need-location' | 'error'>('idle')
  const [sel, setSel] = useState<number | null>(qId ? +qId : null)
  const [desk, setDesk] = useState(mq.matches)
  const [exp, setExp] = useState(mq.matches)
  const [toast, setToast] = useState<string | null>(null)
  const mapRef = useRef<MapRef | null>(null)
  const cached = useState(loadNearby)[0]
  // Si todavía no hay ubicación, al entrar al mapa se muestra el modal que pide el permiso.
  // Excepción: si llegamos con una búsqueda de producto en la URL, la ubicación la pide esa búsqueda
  // (así no se superponen el modal y el prompt del navegador).
  const [askLoc, setAskLoc] = useState(!cached && initialQ.trim().length < 2)
  const [locLoading, setLocLoading] = useState(false)
  const [locError, setLocError] = useState<string | null>(null)
  const [apiBiz, setApiBiz] = useState<Business[] | null>(cached?.businesses ?? null)
  const [userPos, setUserPos] = useState<{ lat: number; lng: number }>(cached?.pos ?? MAP_CENTER)
  // Centro del último POST (donde se obtuvieron las sucursales) y centro actual del mapa.
  // Cuando el mapa se aleja del centro de búsqueda hacia el borde del radio, se ofrece "Explorar aquí".
  const [searchCenter, setSearchCenter] = useState<{ lat: number; lng: number }>(cached?.pos ?? MAP_CENTER)
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(cached?.pos ?? MAP_CENTER)
  const [exploring, setExploring] = useState(false)
  // Resultados del asistente de compra: cuando hay, el mapa pasa a "modo producto"
  const ps = useProductSearch()
  const productMode = !!ps && ps.hits.length > 0
  const [selPin, setSelPin] = useState<string | null>(null)
  const selHit = productMode ? ps.hits.find((h) => h.pinId === selPin) ?? null : null

  // Con datos del backend (solo tiendas) se suman los servicios y emprendimientos de ejemplo.
  // Se filtran a los que caen dentro del radio del centro de búsqueda actual (y su distancia es
  // relativa a ese centro), así al explorar otra zona no quedan pegados los del área anterior.
  const businesses = useMemo(() => {
    if (!apiBiz) return BUSINESSES
    const locals = LOCAL_BUSINESSES
      .map((b) => ({ b, d: metersBetween(searchCenter, b) }))
      .filter(({ d }) => d <= DEFAULT_RADIUS)
      .map(({ b, d }) => ({ ...b, distance: fmtDistance(d) }))
    return [...apiBiz, ...locals]
  }, [apiBiz, searchCenter])

  const allowLocation = async () => {
    setLocLoading(true)
    setLocError(null)
    try {
      const n = await locateAndFetch()
      setApiBiz(n.businesses)
      setUserPos(n.pos)
      setSearchCenter(n.pos)
      setMapCenter(n.pos)
      setSel(null)
      mapRef.current?.flyTo({ center: [n.pos.lng, n.pos.lat], zoom: 15 })
      setAskLoc(false)
    } catch (e) {
      console.error('[geo] error', e)
      setLocError(e instanceof GeolocationPositionError ? 'No pudimos obtener tu ubicación. Revisá los permisos del navegador.' : 'No pudimos cargar los comercios cercanos. Probá de nuevo.')
      setAskLoc(true)
    } finally {
      setLocLoading(false)
    }
  }

  // Revalidación en segundo plano: vuelve a hacer el POST para traer sucursales recién
  // creadas, sin bloquear la UI ni volver a pedir permiso. Solo corre si la ubicación ya
  // está concedida, así nunca reaparece el prompt del navegador.
  const refresh = useCallback(async () => {
    const perm = await navigator.permissions?.query({ name: 'geolocation' }).catch(() => null)
    if (perm && perm.state !== 'granted') return
    try {
      const n = await locateAndFetch()
      setApiBiz(n.businesses)
      setUserPos(n.pos)
      // La revalidación en segundo plano solo re-centra la búsqueda si el usuario no se fue
      // a explorar otra zona (si está explorando, mantenemos sus resultados).
      setSearchCenter((prev) => (metersBetween(prev, n.pos) < 50 ? n.pos : prev))
    } catch (e) {
      console.error('[geo] refresh error', e)
    }
  }, [])

  // "Explorar aquí": repite el POST al backend con el centro actual del mapa y el radio por
  // defecto (5000 m), y reemplaza las sucursales por las de esa nueva zona. No toca la
  // ubicación GPS del usuario (marcador pulsante y botón "Mi ubicación").
  const exploreHere = useCallback(async () => {
    const c = mapRef.current?.getCenter()
    const center = c ? { lat: c.lat, lng: c.lng } : mapCenter
    setExploring(true)
    try {
      const results = await fetchNearby(center.lat, center.lng)
      setApiBiz(results.map(toBusiness))
      setSearchCenter(center)
      setMapCenter(center)
      setSel(null)
    } catch (e) {
      console.error('[geo] explore error', e)
      setToast('No pudimos cargar esta zona. Probá de nuevo.')
      setTimeout(() => setToast(null), 2600)
    } finally {
      setExploring(false)
    }
  }, [mapCenter])

  // El botón aparece cuando el mapa se aleja del centro de búsqueda lo suficiente como para
  // asomar el borde del círculo (≈60% del radio), estando en modo normal y con ubicación lista.
  const canExplore = !productMode && !askLoc && !!apiBiz && searchPhase === 'idle' && metersBetween(searchCenter, mapCenter) > DEFAULT_RADIUS * 0.6

  // Búsqueda de productos desde cualquier buscador del mapa (navbar y drawer de mobile). Usa el
  // mismo endpoint que el asistente de compra: si hay resultados, el store hace que el mapa pase a
  // "modo producto"; si no, se limpia lo anterior y se muestra el aviso correspondiente.
  const runSearch = useCallback(async (raw: string) => {
    const q = raw.trim()
    setTerm(q)
    setSelPin(null)
    if (q.length < 2) {
      setSearchPhase('idle')
      clearProductSearch()
      return
    }
    setSearchPhase('loading')
    const status = await runProductSearch(q, searchCenter)
    if (status === 'ok') {
      setSearchPhase('idle')
    } else {
      clearProductSearch()
      setSearchPhase(status)
    }
  }, [searchCenter])

  // Al entrar al mapa con una búsqueda en la URL (desde el hero o el drawer de la landing), se
  // ejecuta la búsqueda de productos una sola vez.
  useEffect(() => {
    if (initialQ.trim().length >= 2) void runSearch(initialQ)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const f = () => {
      setDesk(mq.matches)
      setExp(mq.matches)
    }
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])

  // Al entrar al mapa: si ya había datos cacheados se muestran al instante y se revalidan
  // en segundo plano para reflejar lo nuevo; si todavía no hay ubicación, el modal pide el permiso.
  useEffect(() => {
    if (cached) void refresh()
  }, [cached, refresh])

  // Al volver a la pestaña del mapa se revalida: así aparecen las sucursales que el usuario
  // haya creado en otra pestaña (dashboards de gesto / tu tienda virtual) mientras estaba fuera.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') void refresh()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [refresh])

  // Al llegar un resultado nuevo del asistente se encuadra el mapa sobre las tiendas que
  // tienen el producto (espera a que el mapa esté montado). No toca estado de React: la
  // ficha abierta se descarta sola si su pin no está entre los nuevos resultados (selHit).
  useEffect(() => {
    if (!productMode) return
    let raf = 0
    const fit = () => {
      const map = mapRef.current
      if (!map) {
        raf = requestAnimationFrame(fit)
        return
      }
      const { hits } = ps
      if (hits.length === 1) {
        map.flyTo({ center: [hits[0].lng, hits[0].lat], zoom: 16, duration: 800 })
        return
      }
      const lngs = hits.map((h) => h.lng)
      const lats = hits.map((h) => h.lat)
      try {
        map.fitBounds([[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]], { padding: { top: 150, bottom: 120, left: 60, right: 60 }, maxZoom: 16, duration: 800 })
      } catch {
        map.flyTo({ center: [ps.userPos.lng, ps.userPos.lat], zoom: 15 })
      }
    }
    fit()
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productMode, ps?.at])

  const items = businesses.filter(
    (b) => (type === 'todas' || b.type === type) && (cat === 'todas' || b.category === cat),
  )
  // Categorías con sucursales cercanas dentro del tipo elegido: sus chips van primero
  const present = useMemo(() => new Set(businesses.filter((b) => type === 'todas' || b.type === type).map((b) => b.category)), [businesses, type])
  const s = businesses.find((b) => b.id === sel)
  // Difuminado dentro del sheet: arriba de la card y abajo de las ofertas, como pista de scroll.
  const sheetFade = useEdgeFade<HTMLDivElement>({ axis: 'y', start: 14, end: 24 })
  // Difuminado del resultado de producto (en desktop la card entera scrollea).
  const psFade = useEdgeFade<HTMLDivElement>({ axis: 'y', start: 18, end: 24 })
  const pick = (id: number) => {
    setSel(id)
    if (!desk) setExp(false)
  }
  const locate = () => {
    const p = productMode ? ps.userPos : userPos
    mapRef.current?.flyTo({ center: [p.lng, p.lat], zoom: 15 })
    setToast('Te encontramos')
    setTimeout(() => setToast(null), 2600)
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <LandingNav base="/" sticky={false} cta={false} search={{ query: term, onSearch: runSearch }} />
      <div data-type={type === 'todas' ? undefined : type} style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <MapView
          items={productMode ? [] : items}
          selectedId={sel}
          onSelect={pick}
          mapRef={mapRef}
          userPos={productMode ? ps.userPos : userPos}
          productHits={productMode ? ps.hits : undefined}
          selectedPinId={selPin}
          onSelectPin={setSelPin}
          searchCenter={productMode ? undefined : searchCenter}
          searchRadius={DEFAULT_RADIUS}
          onMoveEnd={setMapCenter}
        />
        {!productMode && searchPhase === 'idle' && <MapTopBar present={present} type={type} setType={setType} cat={cat} setCat={setCat} picked={picked} onPick={() => setPicked(true)} />}
        <MapControls onZoomIn={() => mapRef.current?.zoomIn()} onZoomOut={() => mapRef.current?.zoomOut()} onLocate={locate} />
        {(canExplore || exploring) && (
          // Retícula fija en el centro de la vista: marca el punto exacto que será el centro del
          // nuevo radio al presionar "Explorar aquí" (el centro del mapa coincide con mapCenter).
          <div aria-hidden="true" style={{ position: 'absolute', zIndex: exp && !productMode ? 540 : 555, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', display: 'grid', placeItems: 'center', animation: 'cf-rise var(--dur-slow) var(--ease-out)' }}>
            {/* sonar: anillo arcoíris que se expande en bucle */}
            <span style={{ gridArea: '1 / 1', width: 46, height: 46, borderRadius: 999, background: 'radial-gradient(closest-side, rgba(79,169,238,.0) 58%, rgba(164,116,245,.55) 72%, rgba(250,110,78,.0) 100%)', animation: 'cf-ping 1.9s var(--ease-out) infinite' }} />
            {/* anillo con borde degradado + glow de marca */}
            <span style={{ gridArea: '1 / 1', width: 46, height: 46, borderRadius: 999, border: '2.5px solid transparent', boxSizing: 'border-box', background: 'linear-gradient(rgba(10,10,16,.3), rgba(10,10,16,.3)) padding-box, var(--rainbow-grad) border-box', boxShadow: 'var(--glow-rainbow), inset 0 0 10px rgba(0,0,0,.45)' }} />
            {/* pin central: mismo ícono (map-pin con glow) que acompaña a la ciudad detectada en el hero */}
            <Icon name="map-pin" size={22} color="#fff" style={{ gridArea: '1 / 1', placeSelf: 'center', filter: 'drop-shadow(0 0 3px rgba(255,255,255,.95)) drop-shadow(0 0 8px rgba(255,255,255,.85)) drop-shadow(0 0 18px rgba(255,255,255,.5))' }} />
          </div>
        )}
        {(canExplore || exploring) && (
          <div style={{ position: 'absolute', zIndex: exp && !productMode ? 540 : 560, left: 0, right: 0, top: 'calc(var(--mp-top,240px) + 8px)', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
            <button
              type="button"
              onClick={exploreHere}
              disabled={exploring}
              aria-label="Buscar comercios en esta zona del mapa"
              style={{ pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, minWidth: 164, padding: '11px 18px', borderRadius: 'var(--radius-pill)', border: 'none', cursor: exploring ? 'default' : 'pointer', background: 'var(--rainbow-grad)', opacity: exploring ? 0.9 : 1, boxShadow: 'var(--glow-rainbow), inset 0 0 0 1px rgba(255,255,255,.3), 0 6px 20px rgba(0,0,0,.4)', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)', font: '800 13px/1 var(--font-body)', animation: 'cf-rise var(--dur-slow) var(--ease-out)' }}
            >
              {exploring ? (
                <span aria-hidden="true" style={{ width: 16, height: 16, flex: 'none', boxSizing: 'border-box', borderRadius: 999, border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff', display: 'inline-block', animation: 'cf-spin .7s linear infinite' }} />
              ) : (
                <Icon name="search" size={16} color="#fff" style={{ flex: 'none' }} />
              )}
              {exploring ? 'Buscando…' : 'Explorar aquí'}
            </button>
          </div>
        )}
        {!productMode && <ResultsPanel items={items} selectedId={sel} onSelect={pick} expanded={exp} setExpanded={setExp} type={type} desk={desk} />}
        {(searchPhase !== 'idle' || productMode) && (() => {
          const warn = searchPhase === 'need-location' || searchPhase === 'error'
          const empty = searchPhase === 'empty'
          const ok = searchPhase !== 'loading' && !warn && !empty && !!ps
          // Borde degradado (técnica padding-box/border-box) + glow según estado; vidrio de base en todos.
          const glassFill = 'linear-gradient(var(--surface-glass-dark), var(--surface-glass-dark))'
          const edge = ok ? 'var(--rainbow-grad)' : empty ? 'var(--tienda-grad)' : warn ? 'linear-gradient(135deg, var(--cf-danger), #ff9a5a)' : null
          const glow = ok ? 'var(--glow-rainbow)' : empty ? '0 0 22px rgba(255,200,61,.3)' : warn ? '0 0 22px rgba(255,90,110,.38)' : null
          const toneStyle = edge
            ? { background: `${glassFill} padding-box, ${edge} border-box`, border: '1.5px solid transparent', boxShadow: glow as string }
            : { background: 'var(--surface-glass-dark)', boxShadow: 'inset 0 0 0 1px var(--border-strong)' }
          const badge = { width: 30, height: 30, flex: 'none', borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } as const
          return (
          <div className="mp-search-banner" style={{ position: 'absolute', zIndex: 560, left: 8, right: 8, top: 8, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
            <div
              role={warn || empty ? 'alert' : undefined}
              style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 10, maxWidth: 560, width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-pill)', boxSizing: 'border-box', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', ...toneStyle }}
            >
              {searchPhase === 'loading' ? (
                <>
                  <span aria-hidden="true" style={{ width: 18, height: 18, flex: 'none', borderRadius: 999, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', display: 'inline-block', animation: 'cf-spin .7s linear infinite' }} />
                  <div style={{ minWidth: 0, flex: 1, font: '600 13px/1.3 var(--font-body)', color: 'var(--text-body)' }}>
                    Buscando “{term}” cerca tuyo…
                  </div>
                </>
              ) : empty || warn ? (
                <>
                  <span style={{ ...badge, background: empty ? 'rgba(255,200,61,.16)' : 'rgba(255,90,110,.16)', boxShadow: `inset 0 0 0 1px ${empty ? 'rgba(255,200,61,.5)' : 'rgba(255,90,110,.5)'}` }}>
                    <Icon name={searchPhase === 'need-location' ? 'map-pin' : empty ? 'search' : 'zap'} size={17} color={empty ? 'var(--cf-amber)' : 'var(--cf-danger)'} />
                  </span>
                  <div style={{ minWidth: 0, flex: 1, font: '600 13px/1.3 var(--font-body)', color: 'var(--text-body)' }}>
                    {empty
                      ? <>No encontré <b style={{ color: '#fff' }}>“{term}”</b> cerca tuyo. Probá con otro nombre.</>
                      : searchPhase === 'need-location'
                        ? 'Necesito tu ubicación para buscar productos cerca tuyo. Activá los permisos y probá otra vez.'
                        : 'Hubo un problema al buscar. Probá de nuevo en un momento.'}
                  </div>
                  <IconButton icon="x" label="Cerrar aviso de búsqueda" variant="ghost" size={36} onClick={() => setSearchPhase('idle')} />
                </>
              ) : ps ? (
                <>
                  <span style={{ ...badge, background: 'var(--rainbow-grad)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.3)' }}>
                    <Icon name="store" size={17} color="#fff" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,.35))' }} />
                  </span>
                  <div style={{ minWidth: 0, flex: 1, font: '600 13px/1.3 var(--font-body)', color: 'var(--text-body)' }}>
                    <b style={{ color: 'var(--cf-amber)', fontWeight: 800 }}>{ps.hits.length}</b> {ps.hits.length === 1 ? 'tienda' : 'tiendas'} con <b style={{ color: '#fff' }}>“{ps.query}”</b> cerca tuyo
                  </div>
                  <IconButton icon="x" label="Cerrar resultados de búsqueda" variant="ghost" size={36} onClick={() => { setSelPin(null); clearProductSearch() }} />
                </>
              ) : null}
            </div>
          </div>
          )
        })()}
        {toast && (
          <div style={{ position: 'absolute', zIndex: 700, left: 0, right: 0, top: 'calc(var(--mp-top,240px) + 8px)', display: 'flex', justifyContent: 'center' }}>
            <Toast icon="locate-fixed" tone="success">{toast}</Toast>
          </div>
        )}
        {askLoc && !productMode && <LocationModal loading={locLoading} error={locError} onAllow={allowLocation} onSkip={() => setAskLoc(false)} />}
        {selHit && (
          <div ref={psFade.ref} className="mp-sheet mp-sheet-product" style={{ position: 'absolute', zIndex: 650, left: 8, right: 8, bottom: 8, maxHeight: '82%', overflowY: 'auto', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'cf-rise var(--dur-slow) var(--ease-out)', ...psFade.style }}>
            <ProductResultSheet hit={selHit} onClose={() => setSelPin(null)} />
          </div>
        )}
        {!productMode && s && (
          <div key={s.id} ref={sheetFade.ref} className="mp-sheet" style={{ position: 'absolute', zIndex: 650, left: 8, right: 8, bottom: 8, maxHeight: '78%', overflowY: 'auto', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, animation: 'cf-rise var(--dur-slow) var(--ease-out)', ...sheetFade.style }}>
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
        <ShopAssistant center={searchCenter} />
      </div>
    </div>
  )
}
