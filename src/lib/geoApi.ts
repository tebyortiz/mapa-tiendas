import type { Feature, Polygon } from 'geojson'
import type { Business, CategoryKey, Deal, DeliveryMode } from '../data/types'
import { CATEGORIES } from '../data/businesses'
import { isOpenApi } from './hours'

// La API solo acepta POST con body JSON y no envía cabeceras CORS: en dev se
// atiende con el proxy de vite.config.ts y en producción con el rewrite de vercel.json.
const NEARBY_URL = '/api/geo/nearby'

/** Radio de búsqueda por defecto, en metros (cercanos y búsqueda de productos). */
export const DEFAULT_RADIUS = 5000

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
  /** 'store': una tienda. 'admin': un negocio sin tiendas todavía (storeName, hours y offers vacíos). */
  kind?: 'store' | 'admin'
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
const AR_TZ = 'America/Argentina/Buenos_Aires'
const DAY = 24 * 60 * 60 * 1000
const AR_OFFSET = 3 * 60 * 60 * 1000 // Argentina es UTC-3 todo el año
const fmtDate = (ms: number) => new Date(ms).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', timeZone: AR_TZ })

/**
 * Instante en que vence una oferta. Las ofertas valen hasta el último día inclusive (23:59 de Argentina),
 * pero cada origen lo informa distinto: ttv manda solo el día ("2026-10-14T00:00:00.000Z") y gesto el
 * instante exacto ("2026-11-01T02:59:59.000Z" = 31/10 23:59:59 en Argentina).
 */
const offerEnd = (iso: string): number | undefined => {
  const t = new Date(iso).getTime()
  if (Number.isNaN(t)) return undefined
  return t % DAY === 0 ? t + DAY + AR_OFFSET : t
}

const toDeal = (o: ApiOffer): Deal => {
  const endsAt = offerEnd(o.endDate)
  return {
    name: o.name,
    description: o.description,
    // Un segundo antes del vencimiento cae siempre dentro del último día vigente en Argentina.
    until: endsAt ? fmtDate(endsAt - 1000) : '',
    endsAt,
    image: o.image,
    products: o.products.map((p) => ({ name: p.name, discount: `-${p.discount}%`, image: p.image })),
  }
}

/** Quita las ofertas ya vencidas. Se aplica al mostrar (no solo al cargar) porque los datos quedan en caché. */
export const liveBusinesses = (list: Business[], now = Date.now()): Business[] =>
  list.map((b) => {
    const deals = b.deals.filter((d) => !d.endsAt || d.endsAt > now)
    return deals.length === b.deals.length ? b : { ...b, deals, hasOffers: deals.length > 0 }
  })

const FALLBACK_PHOTO = '/assets/photos/carr-tienda01.jpg'

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

/** Texto de reemplazo para negocios dados de alta sin nombre (en el panel solo la ubicación es obligatoria). */
export const ADMIN_FALLBACK_NAME = 'Comercio de la zona'

/** Negocio sin tiendas: solo nombre, dirección y foto del frente. Sin foto no se usa la de stock,
 *  para no mostrar un frente que no es el suyo; la ficha y el pin muestran un ícono. */
function adminToBusiness(r: ApiResult, i: number): Business {
  const [lng, lat] = r.location.coordinates
  const name = r.name?.trim() || ADMIN_FALLBACK_NAME
  const address = [r.address?.raw ?? r.address?.localAddress, r.address?.city].filter(Boolean).join(', ')
  const category = toCategory(r.profile?.chainType)
  return {
    id: API_ID_BASE + i,
    type: 'tienda',
    kind: 'admin',
    chain: name,
    branch: name,
    name,
    image: r.profile?.logo || r.image || '',
    category,
    categoryLabel: CATEGORIES.find(([k]) => k === category)?.[1] ?? 'Comercio',
    distance: fmtDistance(r.distance),
    open: r.status,
    lat,
    lng,
    address,
    hours: '',
    description: '',
    deals: [],
    hasOffers: false,
    search: [r.name, address].filter(Boolean).join(' ').toLowerCase(),
  }
}

export function toBusiness(r: ApiResult, i: number): Business {
  if (r.kind === 'admin') return adminToBusiness(r, i)
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
    kind: 'store',
    chain: r.name,
    // storeName puede venir vacío (""): en ese caso el título cae en el nombre del negocio
    branch: r.storeName || r.name,
    name: r.storeName || r.name,
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

/** Pide la ubicación al navegador. maximumAge acepta un fix reciente (clave en mobile, donde
 *  el GPS puede tardar) y timeout da margen suficiente antes de fallar. */
export const getPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('Tu navegador no soporta geolocalización'))
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 })
  })

/** Distancia en metros entre dos coordenadas (haversine). */
export function metersBetween(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const r = (d: number) => (d * Math.PI) / 180
  const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2
  return 2 * 6371000 * Math.asin(Math.sqrt(h))
}

/**
 * Desplazamiento en píxeles para los pines que, al zoom actual, quedan a menos de `minPx` entre sí
 * (p. ej. dos negocios a 16 m): se agrupan y se reparten en un círculo alrededor del primero, así
 * todos se pueden tocar. Al acercar el zoom se separan solos y el desplazamiento desaparece.
 */
export function spreadPins(items: { id: number; lat: number; lng: number }[], zoom: number, minPx = 30): Map<number, [number, number]> {
  const metersPerPx = (lat: number) => (156543.03392 * Math.cos((lat * Math.PI) / 180)) / 2 ** zoom
  const groups: { lat: number; lng: number; ids: number[] }[] = []
  for (const it of items) {
    const g = groups.find((g) => metersBetween(g, it) / metersPerPx(it.lat) < minPx)
    if (g) g.ids.push(it.id)
    else groups.push({ lat: it.lat, lng: it.lng, ids: [it.id] })
  }
  const out = new Map<number, [number, number]>()
  for (const { ids } of groups) {
    if (ids.length < 2) continue
    // Radio suficiente para que entre pines vecinos del círculo queden al menos minPx.
    const r = Math.max(minPx * 0.6, (minPx * ids.length) / (2 * Math.PI))
    ids.forEach((id, i) => {
      // Arranca a la izquierda: un par queda lado a lado (los pines son más altos que anchos).
      const a = Math.PI + (2 * Math.PI * i) / ids.length
      out.set(id, [Math.round(r * Math.cos(a)), Math.round(r * Math.sin(a))])
    })
  }
  return out
}

/** Polígono (GeoJSON) que aproxima un círculo de radio en metros, para dibujar el área de búsqueda. */
export function circlePolygon(center: { lat: number; lng: number }, radiusMeters: number, points = 72): Feature<Polygon> {
  const dLat = radiusMeters / 111320 // metros por grado de latitud
  const dLng = radiusMeters / (111320 * Math.cos((center.lat * Math.PI) / 180))
  const ring: [number, number][] = []
  for (let i = 0; i <= points; i++) {
    const t = (i / points) * 2 * Math.PI
    ring.push([center.lng + dLng * Math.cos(t), center.lat + dLat * Math.sin(t)])
  }
  return { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties: {} }
}
