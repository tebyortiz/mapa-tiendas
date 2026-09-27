Tengo en la raíz del repo la carpeta `design_handoff_compra_facil/` con el diseño final de Comprá Fácil: prototipos HTML de alta fidelidad, tokens, componentes, assets y un README.md con todas las especificaciones.

Objetivo: reemplazar por completo la capa visual del proyecto actual (React + Vite) por este diseño, tal cual está en el handoff. Stack: React + Vite + TypeScript + Tailwind CSS + Framer Motion + lucide-react + react-leaflet.

Reglas:
1. Leé primero `design_handoff_compra_facil/README.md` completo y abrí los prototipos (`ui_kits/landing/index.html` y `ui_kits/map-app/index.html`, con `npx serve design_handoff_compra_facil`) para ver el resultado esperado. El código de cada componente está en `components/**.jsx`, su API en `.d.ts` y sus notas en `.prompt.md`.
2. Los HTML son referencia, no código a copiar. Recreá todo con componentes TSX + Tailwind, con fidelidad pixel-perfect: colores, tipografías, espaciados, radios, glows, animaciones y textos exactos.
3. Eliminá los estilos, temas, componentes visuales y CSS viejos que ya no se usen. Conservá la lógica que exista (rutas, llamadas a API, estado, auth) y conectala a los nuevos componentes. Si algo de la lógica vieja no encaja, preguntame antes de borrarlo.
4. Tokens: pasá `tokens/*.css` a variables CSS en `src/index.css` (mismos nombres) y exponelas en `tailwind.config` (colors, fontFamily, borderRadius, boxShadow para los glows, keyframes y animation). Copiá `assets/` a `src/assets` o `public/`. Cargá Glowtone con @font-face y Manrope desde Google Fonts.
5. Estructura sugerida:
   - `src/components/ui/`: Button, IconButton, Badge, CategoryChip, TypeSelector, SearchInput, Icon, Toast, TextField, Switch.
   - `src/components/brand/`: NeonHeading, GlowBackdrop, Wordmark.
   - `src/components/business/`: BusinessCard, BusinessSheet, CatalogCard, MapMarker, OfferRow.
   - `src/features/landing/`: Nav, Hero, Offers, Catalog, MostRequested, Nearby, Join, Footer.
   - `src/features/map/`: MapPage, MapTopBar, ResultsPanel, OffersStrip, MapControls.
   - Rutas: `/` para la landing y `/mapa` para el mapa, con query `?type=&id=`.
6. Animaciones: Framer Motion para los reveals al scrollear y la entrada de la card de detalle. Las keyframes CSS (cf-neon-on, cf-letter-flicker, cf-tube-on, cf-float, cf-drift, cf-edge-glow, cf-pulse) van en Tailwind. Todo tiene que respetar `prefers-reduced-motion`.
7. Mobile first. Respetá los breakpoints y los comportamientos mobile del README: secciones de 100svh − 56px, navbar de 56px, TypeSelector en modo `dense` con "Emprend.", hero en columna, carrito cortado arriba a la derecha, etc.
8. Tipá los datos (Business, Deal, Product) según el modelo del README. Poné los datos de ejemplo en `src/data/` hasta conectar la API real.
9. Trabajá por etapas y mostrame el avance: (a) tokens, fuentes y Tailwind; (b) componentes base; (c) landing; (d) mapa; (e) limpieza del código viejo. Al terminar cada etapa, compará visualmente con el prototipo HTML y corregí las diferencias.

Antes de empezar, hacé un resumen de la estructura actual del repo y de lo que vas a borrar, cambiar y conservar. Esperá mi confirmación.
