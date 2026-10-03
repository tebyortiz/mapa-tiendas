import { useSyncExternalStore } from 'react'
import { DEFAULT_RADIUS, getPosition } from './geoApi'
import { loadNearby } from './nearbyStore'

// Mismo proxy que /api/geo/nearby (vite.config.ts en dev, rewrite de vercel.json en prod).
const SEARCH_URL = '/api/geo/search'

/** Negocio que ofrece un producto. Misma forma para ttv y gesto. coordinates es [lng, lat]. */
export interface SearchBusiness {
  sourceId: string
  adminId?: string
  name: string
  storeName?: string
  logo?: string
  chainType?: string
  address?: { raw?: string; reference?: string; city?: string; state?: string }
  whatsapp?: string
  storeStyle?: { color1?: string; color2?: string; iconColor?: string }
  storeUrl?: string
  status?: boolean
  location: { type: 'Point'; coordinates: [number, number] }
}

/** Una fila por producto y por local que lo tiene. */
export interface SearchProduct {
  source: 'ttv' | 'gesto' | string
  pinId: string
  productId: string
  name: string
  image?: string
  brand?: string
  category?: string
  subCategory?: string
  section?: string
  saleMode?: 'UNIT' | 'WEIGHT' | string
  price: number
  discount: number
  finalPrice: number
  stock: number
  inStock: boolean
  matchedBy?: string[]
  score?: number
  business: SearchBusiness
  distance: number
  withinRadius: boolean
}

export type MatchMode = 'exact' | 'fuzzy' | 'partial' | 'none' | string

export interface SearchResponse {
  query: string
  matchMode: MatchMode
  total: number
  products: SearchProduct[]
  pins?: unknown[]
}

export interface SearchOpts {
  /** Máximo de elementos en products. Default API 60, máximo 200. */
  limit?: number
  /** Máximo de productos por local. Default API 10, máximo 50. */
  perStore?: number
}

/**
 * Busca productos de Tu Tienda Virtual y Gesto cerca de una ubicación.
 * q debe tener al menos 2 caracteres. radius no recorta resultados: define withinRadius.
 */
export async function searchProducts(latitude: number, longitude: number, radius: number, q: string, opts: SearchOpts = {}): Promise<SearchResponse> {
  const body: Record<string, unknown> = { latitude, longitude, radius, q }
  if (opts.limit) body.limit = opts.limit
  if (opts.perStore) body.perStore = opts.perStore
  const res = await fetch(SEARCH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const info = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(info?.error ?? `Error ${res.status} al buscar productos`)
  }
  const data = (await res.json()) as SearchResponse
  console.log('[geo/search] respuesta:', data)
  return data
}

/** Local con sus productos coincidentes, para pintar un pin por tienda en el mapa. */
export interface ProductHit {
  pinId: string
  store: SearchBusiness
  lat: number
  lng: number
  distance: number
  withinRadius: boolean
  source: string
  /** Productos coincidentes en este local, en el orden que llegó (score desc). */
  products: SearchProduct[]
  /** Imagen del mejor producto con foto; sirve de rótulo del pin. */
  image?: string
}

/** Agrupa las filas de productos por local, preservando el orden (más cercano primero). */
export function groupByStore(products: SearchProduct[]): ProductHit[] {
  const map = new Map<string, ProductHit>()
  for (const p of products) {
    let hit = map.get(p.pinId)
    if (!hit) {
      const [lng, lat] = p.business.location.coordinates
      hit = { pinId: p.pinId, store: p.business, lat, lng, distance: p.distance, withinRadius: p.withinRadius, source: p.source, products: [] }
      map.set(p.pinId, hit)
    }
    hit.products.push(p)
    if (!hit.image && p.image) hit.image = p.image
  }
  return [...map.values()]
}

export const sourceLabel = (source: string) => (source === 'gesto' ? 'Gesto' : source === 'ttv' ? 'Tu Tienda Virtual' : source)

/** Precio en pesos argentinos, sin decimales (ej. $1.500). */
export const fmtPrice = (n: number) => '$' + Math.round(n).toLocaleString('es-AR')

// ───────── Store compartido (vive entre la landing y el mapa) ─────────

export interface ProductSearchState {
  query: string
  matchMode: MatchMode
  total: number
  hits: ProductHit[]
  userPos: { lat: number; lng: number }
  radius: number
  /** Marca de tiempo: cambia en cada búsqueda nueva para re-centrar el mapa. */
  at: number
}

const KEY = 'product-search-v1'

const loadState = (): ProductSearchState | null => {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ProductSearchState) : null
  } catch {
    return null
  }
}

let state: ProductSearchState | null = loadState()
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export function setProductSearch(next: ProductSearchState) {
  state = next
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* sin storage: solo se pierde al recargar */
  }
  emit()
}

export function clearProductSearch() {
  state = null
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* no-op */
  }
  emit()
}

const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => void listeners.delete(cb)
}
const getSnapshot = () => state

/** Suscribe un componente al resultado de búsqueda de productos vigente (o null). */
export function useProductSearch() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

// ───────── Búsqueda reutilizable (asistente, hero, navbar, drawer) ─────────

/**
 * Resultado de una búsqueda de productos iniciada por cualquiera de los buscadores.
 * - `ok`: se encontraron productos; el store ya quedó actualizado (el mapa pasa a modo producto).
 * - `empty`: la consulta es válida pero no hubo coincidencias cerca.
 * - `need-location`: no se pudo obtener la ubicación del usuario.
 * - `error`: falló la red o la consulta es demasiado corta.
 */
export type SearchStatus = 'ok' | 'empty' | 'need-location' | 'error'

/**
 * Ejecuta la misma búsqueda de productos del asistente de compra y, si hay resultados,
 * actualiza el store compartido para que el mapa los pinte. La usan todos los buscadores
 * (asistente, hero, navbar del mapa y drawer de mobile) para comportarse igual.
 *
 * Si se pasa `center` (p. ej. el punto explorado en el mapa) la búsqueda se hace ahí; si no,
 * reutiliza la ubicación cacheada de "cercanos" y, si no hay, la pide al navegador.
 */
export async function runProductSearch(query: string, center?: { lat: number; lng: number }): Promise<SearchStatus> {
  const q = query.trim()
  if (q.length < 2) return 'error'

  // 1) Ubicación: el centro explorado si se indicó; si no, la caché de "cercanos" o el permiso del navegador.
  let pos: { lat: number; lng: number }
  if (center) {
    pos = center
  } else {
    try {
      const cached = loadNearby()
      pos = cached?.pos ?? (await getPosition().then((p) => ({ lat: p.coords.latitude, lng: p.coords.longitude })))
    } catch {
      return 'need-location'
    }
  }

  // 2) Búsqueda de productos. La API no recorta por distancia (radius solo define withinRadius),
  // así que filtramos en el cliente para que solo se muestren tiendas dentro del radio.
  try {
    const res = await searchProducts(pos.lat, pos.lng, DEFAULT_RADIUS, q)
    const near = res.products.filter((p) => p.distance <= DEFAULT_RADIUS)
    if (!near.length || res.matchMode === 'none') return 'empty'
    setProductSearch({
      query: res.query || q,
      matchMode: res.matchMode,
      total: near.length,
      hits: groupByStore(near),
      userPos: pos,
      radius: DEFAULT_RADIUS,
      at: Date.now(),
    })
    return 'ok'
  } catch {
    return 'error'
  }
}
