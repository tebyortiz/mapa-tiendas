// El token se lee desde .env.local (VITE_MAPBOX_TOKEN), que no se sube a git.
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string

export const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v11'

// Centro de Tunuyán, Mendoza
export const MAP_CENTER = { lat: -33.5765, lng: -69.0155 }

/**
 * Reverse-geocoding: dado un lat/lng, devuelve el nombre de la localidad/ciudad real
 * usando la Geocoding API de Mapbox (respuesta GeoJSON). Prefiere la unidad más
 * específica disponible (locality → place). Devuelve undefined si falla o no hay token.
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string | undefined> {
  if (!MAPBOX_TOKEN) return undefined
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&language=es&types=locality,place&limit=1`
    const res = await fetch(url)
    if (!res.ok) return undefined
    const data = (await res.json()) as { features?: { text?: string; place_name?: string }[] }
    return data.features?.[0]?.text ?? undefined
  } catch {
    return undefined
  }
}
