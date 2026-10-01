import { useCallback, useEffect, useState } from 'react'
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

/** Comercios cercanos para la landing: usa el caché y, si ya hay permiso concedido, consulta sin preguntar. */
export function useNearby() {
  const [nearby, setNearby] = useState<Nearby | null>(loadNearby)
  const [loading, setLoading] = useState(false)

  const locate = useCallback(async () => {
    setLoading(true)
    try {
      setNearby(await locateAndFetch())
    } catch (e) {
      console.error('[geo] error', e)
    } finally {
      setLoading(false)
    }
  }, [])

  // Al entrar a la landing se dispara la solicitud de ubicación: si el permiso ya
  // está concedido se consulta en silencio; si está en "prompt" se muestra el modal
  // nativo del navegador. Solo se omite cuando ya fue denegado (no se puede re-pedir).
  useEffect(() => {
    if (nearby) return
    const perms = navigator.permissions?.query({ name: 'geolocation' })
    if (!perms) return void locate()
    perms.then((p) => {
      if (p.state !== 'denied') void locate()
    }).catch(() => void locate())
  }, [nearby, locate])

  return { nearby, loading, locate }
}
