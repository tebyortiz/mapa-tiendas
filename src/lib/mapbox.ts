// El token se lee desde .env.local (VITE_MAPBOX_TOKEN), que no se sube a git.
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string

export const MAPBOX_STYLE = 'mapbox://styles/mapbox/streets-v11'
