import type { Business, CategoryKey, Deal, DeliveryMode } from '../data/types'
import { CATEGORIES } from '../data/businesses'
import { isOpenApi } from './hours'

// La API solo acepta POST con body JSON y no envía cabeceras CORS: en dev se
// atiende con el proxy de vite.config.ts y en producción con el rewrite de vercel.json.
const NEARBY_URL = '/api/geo/nearby'

export const DEFAULT_RADIUS = 1500

export interface ApiOfferProduct {
  productId: string
  name: string
  image?: string
  price: number
  discount: number
  finalPrice: number
}

export interface ApiOffer {
  offerId: string
  name: string
  description: string
  type: string
  image?: string
  startDate: string
  endDate: string
  maxDiscount: number
  products: ApiOfferProduct[]
  total: number
  totalFinal: number
  savings: number
}

/** Sucursal de "gesto" (tiene profile) o de "ttv" (tiene image/hours). */
export interface ApiResult {
  source: 'gesto' | 'ttv' | string
  sourceId?: string
  _id?: string
  name: string
  storeName?: string
  address: { raw?: string; localAddress?: string; reference?: string; city?: string; state?: string }
  image?: string
  status: boolean
  hours?: { weekday?: string; saturday?: string }
  /** ttv: 'ambos' | 'retiro' | 'delivery' */
  orderDelivery?: string
  profile?: { description?: string; logo?: string; chainType?: string; hasDelivery?: boolean; storeUrl?: string }
  /** URL de la tienda online (ttv: tu-tienda-virtual.com/..., gesto: app.gesto.lat/tienda/...) */
  storeUrl?: string
  adminId?: string
  location: { type: 'Point'; coordinates: [number, number] } // [lng, lat]
  distance: number // metros
  offers: ApiOffer[]
}

export async function fetchNearby(latitude: number, longitude: number, radius = DEFAULT_RADIUS): Promise<ApiResult[]> {
  const res = await fetch(NEARBY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ latitude, longitude, radius }),
  })
  if (!res.ok) throw new Error(`Error ${res.status} al consultar comercios cercanos`)
  const data = (await res.json()) as { results: ApiResult[] }
  console.log('[geo/nearby] respuesta:', data)
  return data.results ?? []
}

/** Los ids de la API arrancan alto para no chocar con los del mockup. */
export const API_ID_BASE = 10001

export const fmtDistance = (m: number) => (m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1).replace('.', ',')} km`)
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', timeZone: 'UTC' })

const toDeal = (o: ApiOffer): Deal => ({
  name: o.name,
  description: o.description,
  until: fmtDate(o.endDate),
  image: o.image,
  products: o.products.map((p) => ({ name: p.name, discount: `-${p.discount}%`, image: p.image })),
})

const FALLBACK_PHOTO = '/assets/photos/tiendas-clerk.png'

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

/** profile.chainType llega en inglés (ttv y gesto); se acepta también en español. */
const CHAIN_TYPES: [RegExp, CategoryKey][] = [
  [/supermarket|supermercado/, 'supermercado'],
  [/minimarket|minimercado/, 'minimarket'],
  [/restaurant/, 'restaurant'],
  [/hardware|ferreteria/, 'ferreteria'],
  [/cloth|apparel|fashion|ropa/, 'ropa'],
  [/electronic|electronica/, 'electronica'],
  [/pharmacy|farmacia/, 'farmacia'],
  [/automotive|automotriz|auto/, 'automotriz'],
  [/pet|mascota/, 'mascotas'],
  [/home|furniture|hogar|mueble/, 'hogar'],
  [/entertainment|entretenimiento/, 'entretenimiento'],
  [/grocery|despensa/, 'despensa'],
  [/kiosk|kiosco/, 'kiosco'],
  [/greengrocer|vegetable|produce|verduleria/, 'verduleria'],
  [/butcher|carniceria/, 'carniceria'],
  [/bakery|panaderia/, 'panaderia'],
]

const toCategory = (chainType?: string): CategoryKey => {
  const t = chainType ? normalize(chainType) : ''
  return CHAIN_TYPES.find(([re]) => re.test(t))?.[1] ?? 'otros'
}

/** ttv informa orderDelivery; gesto informa profile.hasDelivery (con delivery además de retiro). */
const toDelivery = (r: ApiResult): DeliveryMode[] | undefined => {
  if (r.orderDelivery) {
    if (r.orderDelivery === 'ambos') return ['mostrador', 'delivery']
    if (r.orderDelivery === 'retiro') return ['mostrador']
    if (r.orderDelivery === 'delivery') return ['delivery']
  }
  if (typeof r.profile?.hasDelivery === 'boolean') return r.profile.hasDelivery ? ['mostrador', 'delivery'] : ['mostrador']
  return undefined
}

export function toBusiness(r: ApiResult, i: number): Business {
  const [lng, lat] = r.location.coordinates
  const deals = (r.offers ?? []).map(toDeal)
  const a = r.address
  const address = [a.raw ?? a.localAddress, a.city].filter(Boolean).join(', ')
  const hours = [r.hours?.weekday && `Lun a Vie · ${r.hours.weekday}`, r.hours?.saturday && `Sáb · ${r.hours.saturday}`].filter(Boolean).join('\n')
  const description = r.profile?.description ?? ''
  const category = toCategory(r.profile?.chainType)
  const categoryLabel = CATEGORIES.find(([k]) => k === category)?.[1] ?? 'Tienda'
  return {
    id: API_ID_BASE + i,
    type: 'tienda',
    chain: r.name,
    branch: r.storeName ?? r.name,
    name: r.storeName ?? r.name,
    chainImage: r.profile?.logo || undefined,
    // gesto trae una sola imagen (el logo), que sirve también de foto de la sucursal
    image: r.image || r.profile?.logo || FALLBACK_PHOTO,
    category,
    categoryLabel,
    distance: fmtDistance(r.distance),
    open: isOpenApi(r.hours) ?? r.status,
    lat,
    lng,
    address,
    hours,
    delivery: toDelivery(r),
    web: r.storeUrl || r.profile?.storeUrl || undefined,
    description,
    deals,
    hasOffers: deals.length > 0,
    search: [r.name, r.storeName, categoryLabel, r.profile?.chainType, a.raw, a.localAddress, a.city, description, ...deals.flatMap((d) => [d.name, ...d.products.map((p) => p.name)])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  }
}

/** Pide la ubicación al navegador. */
export const getPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('Tu navegador no soporta geolocalización'))
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 })
  })

/** Distancia en metros entre dos coordenadas (haversine). */
export function metersBetween(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const r = (d: number) => (d * Math.PI) / 180
  const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2
  return 2 * 6371000 * Math.asin(Math.sqrt(h))
}
