# Mapa interactivo — UI kit
The core product: a mobile-first map of Tunuyán with business-type views.

- `MapView.jsx` — map + React-rendered `MapMarker` overlay (positions via `latLngToContainerPoint`). **Stand-in:** Leaflet + CARTO dark tiles; production uses Mapbox GL with a custom dark style.
- `MapChrome.jsx` — `MapTopBar` (basket mark, glass SearchInput, TypeSelector, CategoryChip rail), `ResultsPanel` (bottom sheet on mobile / left panel ≥900px), `MapControls`.
- `index.html` — state: type, category, query, selected business. Switching type sets `data-type` on the root so the whole UI re-themes. Tapping a marker or row opens `BusinessSheet`. Locate button fires a `Toast`.

Accepts `?type=tienda|servicio|emprendimiento&id=N` from the landing.

**Source note:** built from the brand brief; no production screens were provided.