import { useSyncExternalStore } from 'react'
import type { Business, Offer } from '../data/types'
import { fetchNearby, getPosition, toBusiness } from './geoApi'
import type { ApiResult } from './geoApi'
import { reverseGeocode } from './mapbox'

export interface Nearby {
  pos: { lat: number; lng: number }
  businesses: Business[]
  /** Ciudad detectada según los comercios cercanos */
  city?: string
}

/** Ciudad más frecuente entre los resultados, sin prefijos tipo "Distrito Ciudad de". Prefiere la grafía con tilde. */
const cityOf = (results: ApiResult[]): string | undefined => {
  const plain = (c: string) => c.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  const groups = new Map<string, string[]>()
  for (const r of results) {
    const c = r.address.city?.replace(/^Distrito\s+(Ciudad\s+)?de\s+/i, '').trim()
    if (c) groups.set(plain(c), [...(groups.get(plain(c)) ?? []), c])
  }
  const best = [...groups.values()].sort((x, y) => y.length - x.length)[0]
  return best?.find((c) => c.normalize('NFD') !== c) ?? best?.[0]
}

const KEY = 'nearby-v6'

export const loadNearby = (): Nearby | null => {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Nearby) : null
  } catch {
    return null
  }
}

export const saveNearby = (n: Nearby) => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(n))
  } catch {
    /* sin storage: solo se pierde el caché */
  }
}

/** Pide ubicación + comercios cercanos y deja el resultado en caché compartido (landing y mapa). */
export async function locateAndFetch(): Promise<Nearby> {
  const { latitude, longitude } = (await getPosition()).coords
  console.log('[geo] ubicación del usuario:', { latitude, longitude })
  // La ciudad real sale del reverse-geocoding de Mapbox (según lat/lng); si falla,
  // se usa la ciudad más frecuente entre los comercios cercanos como respaldo.
  const [results, geoCity] = await Promise.all([fetchNearby(latitude, longitude), reverseGeocode(latitude, longitude)])
  const n: Nearby = { pos: { lat: latitude, lng: longitude }, businesses: results.map(toBusiness), city: geoCity ?? cityOf(results) }
  saveNearby(n)
  return n
}

/** Aplana las ofertas de las sucursales cercanas para la landing. */
export const offersOf = (businesses: Business[]): Offer[] =>
  businesses.flatMap((b) =>
    b.deals.map((d) => ({ type: b.type, businessId: b.id, store: b.name, storeImage: b.image, title: d.name, description: d.description, image: d.image, until: d.until })),
  ).map((o, i) => ({ ...o, id: i + 1 }))

// ───────── Store global de ubicación (compartido por landing y mapa) ─────────
//
// Una sola fuente de verdad para: la ubicación/comercios detectados, el estado de
// carga/error y si el modal de permisos está abierto. Así la barra sticky, el modal,
// las secciones de la landing y el mapa se mantienen sincronizados sin pasar props.

export interface LocationStore {
  nearby: Nearby | null
  loading: boolean
  error: string | null
  /** Modal de permisos de ubicación visible */
  modalOpen: boolean
}

export type Geo = Pick<LocationStore, 'nearby' | 'loading'>

let store: LocationStore = { nearby: loadNearby(), loading: false, error: null, modalOpen: false }
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())
const set = (patch: Partial<LocationStore>) => {
  store = { ...store, ...patch }
  emit()
}

/** Acción pendiente a ejecutar cuando se obtiene la ubicación desde el modal (p. ej. una búsqueda). */
let pending: ((n: Nearby) => void) | null = null
/** Promesa en curso: evita disparar dos geolocalizaciones simultáneas. */
let inflight: Promise<Nearby | null> | null = null

const errorMessage = (e: unknown) =>
  e instanceof GeolocationPositionError || (e && typeof e === 'object' && 'code' in e)
    ? 'No pudimos obtener tu ubicación. Revisá los permisos del navegador y volvé a intentar.'
    : 'No pudimos cargar los comercios cercanos. Probá de nuevo en un momento.'

/** Pide ubicación + comercios y actualiza el store. Devuelve el resultado o null si falló. */
export function locateShared(): Promise<Nearby | null> {
  if (inflight) return inflight
  set({ loading: true, error: null })
  inflight = locateAndFetch()
    .then((n) => {
      set({ nearby: n, loading: false, error: null })
      return n
    })
    .catch((e) => {
      console.error('[geo] error', e)
      set({ loading: false, error: errorMessage(e) })
      return null
    })
    .finally(() => {
      inflight = null
    })
  return inflight
}

/** Abre el modal de permisos; `onLocated` se ejecuta una vez que se obtiene la ubicación. */
export function openLocationModal(onLocated?: (n: Nearby) => void) {
  pending = onLocated ?? null
  set({ modalOpen: true, error: null })
}

export function closeLocationModal() {
  pending = null
  set({ modalOpen: false })
}

/** "Explorar mi cuadra": pide la ubicación desde el modal y, si sale bien, cierra y ejecuta la acción pendiente. */
export async function allowLocationFromModal() {
  const n = await locateShared()
  if (n) {
    const cb = pending
    pending = null
    set({ modalOpen: false })
    cb?.(n)
  }
}

/**
 * Geolocaliza en silencio SOLO si el permiso ya está concedido (sin mostrar prompt).
 * Si el navegador no expone la Permissions API o el permiso no está concedido, no hace
 * nada: la ubicación se pedirá con un gesto explícito del usuario (modal), que es lo que
 * exige Safari en mobile para abrir el prompt de forma confiable.
 */
export async function autoLocateIfGranted() {
  if (store.nearby) return
  try {
    const perm = await navigator.permissions?.query({ name: 'geolocation' })
    if (perm && perm.state === 'granted') await locateShared()
  } catch {
    /* sin Permissions API: se espera el gesto del usuario */
  }
}

/** Lectura sincrónica de la ubicación actual del store (fuera de React). */
export const getNearby = () => store.nearby

const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => void listeners.delete(cb)
}
const getSnapshot = () => store

/** Suscribe un componente al store global de ubicación. */
export function useLocationStore(): LocationStore {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
