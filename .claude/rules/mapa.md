---
paths:
  - "src/pages/MapPage.tsx"
  - "src/features/map/**"
  - "src/components/business/**"
---

# Mapa

Detalle completo: `README.md`, sección "Flujo de información → 3. Mapa". Decisiones: `docs/decisiones/mapa.md`.

- `MapPage` se carga con `lazy()` (`src/App.tsx`) para que `mapbox-gl` no pese en la landing. No importar nada de mapbox desde la landing.
- Sin ubicación real no se monta `MapView`: se muestra `LocationGate` y se abre el modal. No hay centro por defecto.
- Hay tres posiciones distintas, no mezclarlas: `userPos` (GPS), `searchCenter` (centro del último `/nearby`) y `mapCenter` (vista actual).
- Dos modos: comercios (normal) y producto (cuando el store de búsqueda tiene resultados). En modo producto se ocultan los filtros, el panel y la ficha normal.
- Los pines `kind === 'admin'` usan `AdminMarker` y `AdminSheet`. No muestran horarios, ofertas, "Cerrado" ni la web.
- Mapbox necesita `VITE_MAPBOX_TOKEN`. Sin token el mapa no carga y la ciudad se deduce de los comercios.
