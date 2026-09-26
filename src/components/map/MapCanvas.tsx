import { Cake, MapPin as MapPinIcon, Scissors, Smartphone, Sparkles, Store, Wrench } from 'lucide-react'
import { Map, Marker, NavigationControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { TUNUYAN_CENTER } from '../../data/pins'
import type { MapPin } from '../../data/types'
import { MAPBOX_STYLE, MAPBOX_TOKEN } from '../../lib/mapbox'

const ICONS = {
  store: Store,
  wrench: Wrench,
  sparkles: Sparkles,
  scissors: Scissors,
  cake: Cake,
  smartphone: Smartphone,
}

interface Props {
  pins: MapPin[]
  onSelectPin: (pin: MapPin) => void
}

export default function MapCanvas({ pins, onSelectPin }: Props) {
  return (
    <div className="h-[520px] w-full overflow-hidden rounded-3xl shadow-2xl">
      <Map
        initialViewState={{
          latitude: TUNUYAN_CENTER.lat,
          longitude: TUNUYAN_CENTER.lng,
          zoom: 13.5,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAPBOX_STYLE}
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false}
      >
        <NavigationControl position="top-right" />

        <Marker longitude={TUNUYAN_CENTER.lng} latitude={TUNUYAN_CENTER.lat} anchor="bottom">
          <MapPinIcon size={38} className="text-[#ef233c] drop-shadow-lg" fill="#ef233c" />
        </Marker>

        {pins.map((pin) => {
          const Icon = ICONS[pin.icon]
          return (
            <Marker key={pin.id} longitude={pin.lng} latitude={pin.lat} anchor="bottom">
              <button
                type="button"
                onClick={() => onSelectPin(pin)}
                className="flex flex-col items-center gap-1 transition-transform hover:-translate-y-1"
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${pin.gradient} border-2 border-white shadow-lg`}
                >
                  <Icon size={22} className="text-white" />
                </span>
                <span className="max-w-[90px] truncate rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#170c33] shadow">
                  {pin.name}
                </span>
              </button>
            </Marker>
          )
        })}
      </Map>
    </div>
  )
}
