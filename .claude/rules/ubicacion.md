---
paths:
  - "src/lib/nearbyStore.ts"
  - "src/lib/geoApi.ts"
  - "src/lib/mapbox.ts"
  - "src/lib/hours.ts"
  - "src/data/**"
  - "src/features/location/**"
---

# Ubicación y comercios cercanos

Detalle completo: `README.md`, secciones "Flujo de información → 1. Ubicación y comercios cercanos" y "Normalización". Decisiones: `docs/decisiones/ubicacion.md`.

- `src/lib/nearbyStore.ts` es la única fuente de verdad de la ubicación. Es un store con `useSyncExternalStore`, sin Context ni Redux.
- Vigencia de la caché: `CACHE_TTL` en `nearbyStore.ts`. Si cambia la forma de lo guardado, se sube la versión de `KEY` (no se migra).
- Permiso de geolocalización: solo `autoLocateIfGranted()` en silencio, o con un gesto (`openLocationModal`, barra sticky, `LocationGate`). `locateShared()` deduplica pedidos en curso.
- `toBusiness` en `src/lib/geoApi.ts` es el único lugar que conoce las formas de ttv y gesto. La UI solo ve `Business` (`src/data/types.ts`).
- `location.coordinates` llega como `[lng, lat]`.
- Pines `kind: "admin"` → `adminToBusiness`.
- Rubro nuevo: agregarlo en `CategoryKey` (`src/data/types.ts`), en `CHAIN_TYPES` (`src/lib/geoApi.ts`), en las listas de `src/data/businesses.ts` y en `CATEGORY_ICONS` (`src/components/ui/Icon.tsx`). Los rubros de ttv copian valor, etiqueta e ícono de `chainTypeOptions` del panel (`admin-dashboard-ttv`, pantalla editar-tienda). Un rubro que cae inesperadamente en "Otros" se diagnostica mirando el `chainType` real en el `console.log` de `[geo/nearby]`.
- `type` se fija en `'tienda'` para todo. Cuando el backend mande servicios o emprendimientos, habrá que derivarlo de `source`.
