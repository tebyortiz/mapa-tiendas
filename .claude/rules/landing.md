---
paths:
  - "src/pages/LandingPage.tsx"
  - "src/features/landing/**"
  - "scripts/**"
  - "public/models/**"
  - "assets-src/**"
  - "index.html"
---

# Landing

Detalle completo: `README.md`, sección "Flujo de información → 2. Landing". Decisiones: `docs/decisiones/landing.md`.

- Las secciones que dependen de la ubicación muestran `LocationGate` mientras no hay posición. Nunca datos de una ciudad por defecto.
- La landing navega al mapa por URL: `/mapa?type=tienda&id=…` (ficha seleccionada) y `/mapa?q=…` (búsqueda).
- Ciudad del hero (`src/features/landing/city/`): `HeroCity3D` se carga con `lazy()` y solo si `gpu.ts` detecta GPU real (prueba en un Web Worker con OffscreenCanvas). Sin GPU no se descarga three.js.
- Los modelos (`public/models/city/*.glb`) se generan desde `assets-src/kenney`. Si cambia `cityConfig.ts`, las luces o la cámara: `npm run city:models` y después `npm run city:capture` (con `npm run dev` corriendo). **No regenerar sin avisar a Teby.**
- La landing ya está optimizada para PageSpeed. Cualquier cambio que pueda bajar el puntaje o tocar lo visual (3D, neón, glows) se avisa antes.
