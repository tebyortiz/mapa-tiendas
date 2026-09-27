import { useEffect } from 'react'
import type { RefObject } from 'react'
import Map, { Marker } from 'react-map-gl/mapbox'
import type { MapRef } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapMarker } from '../../components/business/MapMarker'
import type { Business } from '../../data/types'
import { MAP_CENTER, MAPBOX_STYLE, MAPBOX_TOKEN } from '../../lib/mapbox'

interface MapViewProps {
  items: Business[]
  selectedId: number | null
  onSelect: (id: number) => void
  mapRef: RefObject<MapRef | null>
  userPos?: { lat: number; lng: number }
}

export function MapView({ items, selectedId, onSelect, mapRef, userPos = MAP_CENTER }: MapViewProps) {
  useEffect(() => {
    const s = items.find((i) => i.id === selectedId)
    if (s) mapRef.current?.easeTo({ center: [s.lng, s.lat - 0.0015], duration: 500 })
  }, [selectedId, items, mapRef])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={MAPBOX_STYLE}
        initialViewState={{ latitude: userPos.lat, longitude: userPos.lng, zoom: 15 }}
        style={{ position: 'absolute', inset: 0 }}
        attributionControl
      >
        {items.map((b) => {
          const s = b.id === selectedId
          return (
            <Marker key={b.id} latitude={b.lat} longitude={b.lng} anchor="bottom" style={{ zIndex: s ? 2 : 1 }}>
              <MapMarker type={b.type} category={b.category} selected={s} label={b.name} onClick={() => onSelect(b.id)} />
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
