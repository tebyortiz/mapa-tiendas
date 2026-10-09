import { useMemo } from 'react'
import type { RefObject } from 'react'
import Map, { Layer, Marker, Source } from 'react-map-gl/mapbox'
import type { MapRef } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapMarker } from '../../components/business/MapMarker'
import { ProductMarker } from '../../components/business/ProductMarker'
import type { Business } from '../../data/types'
import type { ProductHit } from '../../lib/productSearch'
import { circlePolygon } from '../../lib/geoApi'
import { FALLBACK_CENTER, MAPBOX_STYLE, MAPBOX_TOKEN } from '../../lib/mapbox'

interface MapViewProps {
  items: Business[]
  selectedId: number | null
  onSelect: (id: number) => void
  mapRef: RefObject<MapRef | null>
  userPos?: { lat: number; lng: number }
  /** Resultados del asistente de compra: un pin por tienda con la imagen del producto */
  productHits?: ProductHit[]
  selectedPinId?: string | null
  onSelectPin?: (pinId: string) => void
  /** Centro y radio (m) del último POST: dibuja el área de búsqueda como un círculo. */
  searchCenter?: { lat: number; lng: number }
  searchRadius?: number
  /** Avisa el centro del mapa cuando el usuario termina de moverlo, para ofrecer "Explorar aquí". */
  onMoveEnd?: (center: { lat: number; lng: number }) => void
}

export function MapView({ items, selectedId, onSelect, mapRef, userPos = FALLBACK_CENTER, productHits, selectedPinId, onSelectPin, searchCenter, searchRadius = 5000, onMoveEnd }: MapViewProps) {
  // Solo se recalcula el polígono cuando cambia el centro o el radio de la búsqueda.
  const area = useMemo(() => (searchCenter ? circlePolygon(searchCenter, searchRadius) : null), [searchCenter, searchRadius])
  // No se recentra el mapa al seleccionar un comercio: la vista queda donde está y el usuario puede
  // seguir arrastrando/explorando con la ficha abierta. (Antes un easeTo movía el marker hacia arriba
  // y, al re-dispararse en cada render, "pegaba" la vista al marker seleccionado.)

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={MAPBOX_STYLE}
        initialViewState={{ latitude: userPos.lat, longitude: userPos.lng, zoom: 15 }}
        style={{ position: 'absolute', inset: 0 }}
        attributionControl
        onMoveEnd={onMoveEnd ? (e) => onMoveEnd({ lat: e.viewState.latitude, lng: e.viewState.longitude }) : undefined}
      >
        {area && (
          <Source id="search-area" type="geojson" data={area}>
            <Layer id="search-area-fill" type="fill" paint={{ 'fill-color': '#ffffff', 'fill-opacity': 0.04 }} />
            <Layer id="search-area-line" type="line" paint={{ 'line-color': '#ffffff', 'line-width': 1.5, 'line-opacity': 0.35, 'line-dasharray': [2, 2] }} />
          </Source>
        )}
        {items.map((b) => {
          const s = b.id === selectedId
          return (
            <Marker key={b.id} latitude={b.lat} longitude={b.lng} anchor="bottom" style={{ zIndex: s ? 2 : 1 }}>
              <MapMarker type={b.type} category={b.category} selected={s} label={b.name} onClick={() => onSelect(b.id)} />
            </Marker>
          )
        })}
        {productHits?.map((h) => {
          const s = h.pinId === selectedPinId
          return (
            <Marker key={h.pinId} latitude={h.lat} longitude={h.lng} anchor="bottom" style={{ zIndex: s ? 3 : 2 }}>
              <ProductMarker image={h.image} count={h.products.length} label={h.store.storeName || h.store.name} selected={s} onClick={() => onSelectPin?.(h.pinId)} />
            </Marker>
          )
        })}
        <Marker latitude={userPos.lat} longitude={userPos.lng} anchor="center">
          <div style={{ width: 16, height: 16, borderRadius: 99, background: '#fff', boxShadow: '0 0 0 4px rgba(255,255,255,.2), 0 0 18px rgba(255,255,255,.7)', animation: 'cf-pulse 2.4s infinite' }} />
        </Marker>
      </Map>
    </div>
  )
}
