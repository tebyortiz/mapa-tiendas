---
paths:
  - "src/lib/productSearch.ts"
  - "src/components/assistant/**"
  - "src/components/ui/SearchInput.tsx"
  - "src/components/ui/searchSuggestions.ts"
  - "src/features/map/ProductResultSheet.tsx"
  - "src/components/business/ProductMarker.tsx"
---

# Búsqueda de productos

Detalle completo: `README.md`, sección "Flujo de información → 4. Búsqueda de productos". Decisiones: `docs/decisiones/busqueda.md`.

- Todos los buscadores usan `runProductSearch(query, center?)` de `src/lib/productSearch.ts`. No crear otra llamada a `/api/geo/search`.
- La API **no recorta** por `radius` (solo marca `withinRadius`): el recorte por distancia se hace en el cliente.
- Las filas se agrupan por local con `groupByStore` (clave `pinId`): un `ProductHit` por tienda.
- Estados devueltos: `ok`, `empty`, `need-location` y `error`. Cada buscador los traduce a su UI.
- Persistencia: `KEY` en `productSearch.ts` (sessionStorage), con la misma vigencia que la ubicación.
- El asistente está oculto con `SHOP_ASSISTANT_ENABLED` en `src/components/assistant/ShopAssistant.tsx`.
