# Handoff: Comprá Fácil — Landing + Mapa virtual

## Overview
Comprá Fácil is a directory of shops (tiendas), services (servicios) and local ventures (emprendimientos) in Tunuyán, Mendoza. It has two screens:
1. **Landing** (`ui_kits/landing/index.html`): hero, featured offers, virtual catalog, most requested, near you, "add your store", footer.
2. **Mapa virtual** (`ui_kits/map-app/index.html`): a dark map with type/category filters, a list of nearby places, markers, a detail card and current offers.

## About the design files
The files in this bundle are **design references built in HTML/React (Babel in the browser)**. They are prototypes that show the intended look and behavior. They are not production code to copy as-is.
- The task is to **recreate them in the target stack: React + Vite + TypeScript + Tailwind CSS + Framer Motion**, following that project's patterns.
- To see them live, open `ui_kits/landing/index.html` or `ui_kits/map-app/index.html` with any static server from this folder (for example `npx serve .`). They need `_ds_bundle.js`, `styles.css` and `assets/` in their relative paths.
- The source of each component is in `components/**.jsx` (readable React, inline styles). Its prop API is in `.d.ts` and its usage notes in `.prompt.md`.

## Fidelity
**High-fidelity.** Colors, type, spacing, glows, animations and copy are final. Recreate them pixel-perfect. Sample data (businesses, offers, products) is placeholder, and so are the photos (only 3 real photos are reused across items).

## Design tokens (source: `tokens/*.css`)
Move them to `tailwind.config` (theme.extend) and/or CSS variables in `index.css`. **Keep the CSS variable names**: components depend on them.

### Colors
- Base (dark only): black/ink-900 `#07070D`, ink-800 `#0D0D16`, ink-700 `#12121C` (surface), ink-600 `#1A1A27` (surface-raised), ink-500 `#242434`, ink-400 `#34344A`, white `#FFFFFF`, offwhite `#F2F1F7`, gray-300 `#C9C8D6`, gray-400 `#A9A8BC` (text-muted), gray-500 `#85849A` (text-subtle).
- Per business type:
  - Tienda: coral `#FF6F61` → amber `#FFC83D`.
  - Servicio: blue `#3D8BFF` → cyan `#2DD4F0`.
  - Emprendimiento: violet `#9B6BFF` → lilac `#C4A1FF`.
  - Gradients are `linear-gradient(135deg, a, b)`.
  - Soft backgrounds use `rgba(r,g,b,.14)`.
- **Brand gradient ("rainbow", used on buttons/chips for "Todas", "Buscar", Ofertas, city chip):** `linear-gradient(135deg, #FA6E4E 0%, #4FA9EE 50%, #A474F5 100%)` — coral → light blue → light violet. It is the main accent.
- Status: success `#5BE3A0`, danger `#FF5A6E`.
- Surfaces:
  - `--surface-glass: rgba(255,255,255,.20)` and `--surface-glass-dark: rgba(18,18,28,.72)`, both with `backdrop-filter: blur(16px)`.
  - `--border: rgba(255,255,255,.08)` and `--border-strong: rgba(255,255,255,.16)`.

### Type
- Display/neon: **Glowtone** (`assets/fonts/Glowtone-Regular.otf`, weight 400, letter-spacing .02em). Body/UI: **Manrope** 400–800 (Google Fonts).
- Scale:
  - wordmark `clamp(40px,9vw,96px)`
  - display `clamp(34px,6.4vw,64px)`
  - h1 `clamp(28px,4.8vw,44px)`
  - h2 24, h3 19, body-lg 18, body 16, sm 14, xs 12
- Line-height: tight 1.05, heading 1.2, body 1.55.
- Neon text shadow: `0 0 1px #fff, 0 0 6px rgba(255,255,255,.85), 0 0 16px var(--glow-color), 0 0 38px var(--glow-color)`. `--glow-color` is white .55 by default and switches to the type color under `[data-type]`.

### Spacing / radii
- Spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
- Layout: gutter `clamp(16px,2.4vw,32px)`, container max-width **1760px**, touch target min 44px.
- Radii: pill 999, xs 6, sm 10, card 14, panel 20, sheet 24.

### Glows (no gray shadows)
- `--glow-tienda`: `0 0 0 1px rgba(255,111,97,.55), 0 0 18px rgba(255,111,97,.45), 0 0 44px rgba(255,200,61,.22)`. Servicio and emprendimiento follow the same pattern with their own colors.
- `--glow-rainbow`: `0 0 18px rgba(164,116,245,.4), 0 0 30px rgba(79,169,238,.25), 0 0 44px rgba(250,110,78,.28)`.
- Focus ring: `0 0 0 2px bg, 0 0 0 4px #fff`.

### Motion
- Easing: out `cubic-bezier(.22,1,.36,1)`, in-out `cubic-bezier(.65,0,.35,1)`, spring `cubic-bezier(.34,1.56,.64,1)`.
- Durations: fast 140ms, base 220ms, slow 420ms, enter 640ms, drift 22s, stagger 70ms.
- Keyframes live in `tokens/effects.css`:
  - `cf-neon-on`: neon power-on flicker, 1.1s steps.
  - `cf-letter-flicker`: occasional flicker on single letters of the hero.
  - `cf-tube-on`: nav icon power-on.
  - `cf-float`: 3D images oscillating ±10px and ±2°, 6–8s.
  - `cf-drift`: background glows.
  - `cf-edge-glow`: pulse around the logo.
  - `cf-rise`: entrance of the detail card.
  - `cf-pulse`: user location dot.
- Use Framer Motion for scroll-in reveals (opacity 0→1, y 18→0, 640ms ease-out, 70ms stagger) and cf-rise. The flickers can stay as CSS keyframes.
- **Everything must respect `prefers-reduced-motion`** (turn animations off).

## Components (source in `components/`)
Recreate each one as a typed React + Tailwind component. Every "type" component takes `type: 'tienda'|'servicio'|'emprendimiento'|'todas'`.
- **Button** (`actions/Button.jsx`)
  - Variants:
    - `primary`: type gradient background, black text, glow on hover.
    - `secondary`: surface background with a 1px ring, white text.
    - `ghost`
    - `glass`
  - Sizes: sm 36, md 44, lg 52. Pill shape, Manrope 800, scale .97 on press.
- **IconButton**: round, sizes 40/44, glass or solid variant.
- **Badge** (chip)
  - 24px tall, pill, 12px 700.
  - Status variants: Abierto (green) and Cerrado (red), each with a glowing dot.
  - Other variants: `type` soft, `type` solid gradient.
  - The **"Ofertas"** chip is `type="todas" variant="solid"` with the `tag` icon.
- **CategoryChip**: 40px tall, pill, category icon. Selected state uses the type gradient and glow.
- **TypeSelector**
  - Segmented control Todas / Tiendas / Servicios / Emprendimientos.
  - `dense` mode (mobile < 600px): short labels, no icons, full width, "Emprend.".
- **SearchInput**: 48px tall, pill, search icon, optional glass variant.
- **BusinessCard** (list item in the map)
  - 64px branch photo on the left.
  - Branch name, then category · address.
  - A single row (nowrap) of chips: Abierto/Cerrado, distance, Ofertas.
- **BusinessSheet** (map detail card)
  - Branch photo on top (160px tall, fading into the surface).
  - Chips: type, open/closed, distance, Ofertas.
  - 48px chain avatar (logo or initials over the gradient), chain name (13px muted), then branch name (21px 800).
  - Category, description, address and hours.
  - Buttons: **"Visitar web"** (primary) and **"Cómo llegar"** (secondary white, opens Google Maps directions).
- **CatalogCard**: full-bleed photo, glass title with neon power-on when it enters the viewport, "VER MAPA" button, description below the image.
- **MapMarker**: type-colored pin with category icon, glow when selected.
- **NeonHeading**: Glowtone heading that plays `cf-neon-on` when it enters the viewport (IntersectionObserver, threshold .4).
- **GlowBackdrop**
  - Three blurred blobs (80px) using only coral `#FA6E4E`, sky `#4FA9EE` and violet `#A474F5`, in a different order per section.
  - They drift with `cf-drift`, plus a slight parallax **relative to the section**, not to the page scroll.
- **Wordmark**, **Toast**, **TextField**, **Switch**: see their `.jsx` files.
- **Icon**: Lucide (`lucide-react` in the new stack). The category → icon map is in `icons/Icon.jsx` (`CATEGORY_ICONS`).

## Screen 1 — Landing (`ui_kits/landing/`)
Mobile-first. Below 760px, each section has `min-height: calc(100svh - 56px)`, content aligned to the top, and about 28px top padding. Horizontal breakpoints are 760 / 900 / 960 / 1180 / 1280.

1. **Navbar** (`Nav.jsx`)
   - Sticky glass bar (`rgba(7,7,13,.72)` with blur 16), 76px tall on desktop and **56px on mobile**.
   - Wordmark with the basket on the left.
   - 4 neon links (Tiendas, Servicios, Emprendimientos, Ofertas), each with its type-colored icon, a halo underneath and an underline. They play `cf-tube-on` on load (staggered) and on hover. Labels show from 1180px up.
   - "abrir mapa" button from 640px up. It is hidden on the map page.
2. **Hero** (`Hero.jsx`)
   - Basket logo (`assets/logo/basket-mark.png`, height `clamp(110px,19vw,240px)`, `cf-float` plus `cf-edge-glow`) with neon **COMPRÁ / FÁCIL** at `clamp(44px,7vw,100px)`, aligned to the bottom of the basket. Centered below 960px.
   - "EXPLORÁ TU CIUDAD" with a round white/20 icon (2.5px border, white glow, white icon).
   - Paragraph, then a column: search input plus a "Buscar" button (gradient) on its right, then a full-width secondary "abrir mapa".
   - Kenney city preview (`assets/scenes/kenney-city-preview.png`) with a radial mask and a gentle mouse-follow tilt on desktop.
   - Desktop uses a 2-column grid (1.1fr 1fr).
3. **Ofertas destacadas de tu zona** (`Sections.jsx › LandingOffers`)
   - Title in 2 lines: "OFERTAS DESTACADAS / DE TU ZONA".
   - Subtitle "Te presentamos las ofertas vigentes en:".
   - LocationRow: a round white/20 pin plus a 44px rainbow-gradient chip showing the city.
   - 3D cart (`cart-offers-3d.png`, floating):
     - Desktop: to the right of the header, vertically centered, `clamp(150px,13vw,220px)`.
     - Mobile: 50vw, cut off by the top-right edge, allowed to sit behind the text.
   - Carousel with scroll-snap: 86% columns on mobile, 2 at ≥760px, 3 at ≥1280px, plus arrows.
   - Offer card: 2.15:1 image, then store avatar and type avatar with the store name, title in the type's second color, description and a "más info" button. The last card is "DESCUBRÍ MÁS OFERTAS EN TU ZONA".
4. **Catálogo virtual** (`Catalog.jsx`)
   - Row: 3D map (`map-catalog-3d.png`, floating) and "CATÁLOGO VIRTUAL", aligned to the bottom of the image.
   - Description below (6px gap, line-height 1.35).
   - 3 CatalogCards (TIENDAS / SERVICIOS / EMPRENDIMIENTOS), **420px tall**, in 1 column on mobile and 3 at ≥760px.
5. **Más solicitados**
   - 3D "+" (`plus-requested-3d.png`, opacity .85, floating) behind the header, bleeding off the left edge and clear of the city chip.
   - Title "MÁS SOLICITADOS" with a "ver todos →" link.
   - Subtitle "Servicios y emprendimientos más demandados en:", then LocationRow.
   - Carousel of cards: 1.7:1 photo with a glass chip (person avatar, type avatar, name), then service, description and a "conectar" button.
6. **Cerca tuyo**
   - Distinct background: a slightly lighter layer, a top hairline and 3 radial glows (coral bottom-left, violet bottom-right, sky top-center).
   - Header "CERCA TUYO" plus "Ver todo en el mapa →", vertically aligned.
   - Horizontal carousel of cards `min(84vw,380px)`. Each card:
     - 16:10 photo on top.
     - 36px chain avatar with the chain name (uppercase).
     - Branch name (19px 800), category (tienda-2 color), address.
     - Chips: Abierto/Cerrado, distance, Ofertas (gradient).
7. **Sumá tu comercio**: a panel with the illustration, heading, copy and a "Sumar mi comercio" button.
8. **Footer**: wordmark and "Hecho en Tunuyán, Mendoza.".

## Screen 2 — Mapa virtual (`ui_kits/map-app/`)
Full height. The same navbar sits on top (without the CTA). The map area below uses `flex:1`.

- **Top bar** (absolute over the map, gradient from `rgba(7,7,13,.94)` to transparent)
  - Row 1: basket (48px, 32px on mobile) with "MAPA VIRTUAL" in Glowtone (`clamp(34px,4vw,48px)`, 28px on mobile). On the right, a max-640px column with:
    - the search input plus a "Buscar" button (gradient), which applies the filter on submit;
    - below it, a horizontal row of **suggestion chips**, each with a rainbow avatar and icon: Pantalón, Zapatillas, Celulares, Auriculares, Pizza, Herramientas, Alimento para perros, Muebles, Tortas. Tapping one filters; tapping it again clears the filter.
  - Row 2: "FILTROS" label plus the TypeSelector, on a single row.
  - Row 3: category chips, **shown only after a type has been picked**. Padding is enough for the glow not to get clipped.
  - The top bar height is measured with ResizeObserver and exposed as `--mp-top` to position the panels.
- **Nearby places list**
  - Desktop (≥900px): left, `top: --mp-top`, `width: min(480px,44vw)`. It collapses and expands from its header ("N tiendas/servicios/lugares cerca tuyo" with a chevron).
  - Mobile: bottom sheet, 128px collapsed and 62% expanded.
  - Its padding keeps hover and selected glows from getting clipped.
- **Map**
  - Leaflet with Esri World Dark Gray Base tiles (no key).
  - Markers are placed with `latLngToContainerPoint`.
  - Zoom and "my location" controls on the right.
  - White pulsing dot for the user's location.
- **Detail and offers** (on click in the list or on a marker)
  - Desktop: bottom right, `right: 72px`, `width: min(420px, calc(100% - min(480px,44vw) - 100px))`, scrolling within the space below the top bar. Mobile: bottom.
  - From top to bottom:
    1. **"OFERTAS VIGENTES"**: up to 3 rectangular cards, in a column, as wide as the sheet. Each card has:
       - a 96×64 image, name, description and "Vigente hasta {fecha}";
       - below, a row of 60×60 product tiles with the discount chip in the bottom-left corner.
    2. **BusinessSheet**.

## State (map)
- `type`: todas | tienda | servicio | emprendimiento.
- `picked`: whether a type was chosen; controls whether categories show.
- `cat`, `query`, `sel`: selected id.
- `expanded`: list open or closed.
- `desk`: matchMedia ≥900px.
- Filtering matches type + category + text. The text search covers business, chain, branch, category, description, offer names and product names, with simple synonyms for the suggestion chips.
- URL `?type=&id=` opens a specific type or business (the landing deep-links here).

## Data model (see `ui_kits/landing/data.js` + `ui_kits/map-app/map-data.js`)
- `Business`: `{ id, type, chain, branch, chainImage?, image, category, categoryLabel, distance, open, lat, lng, address, hours, description, web?, deals: Deal[] (máx 3) }`
- `Deal`: `{ name, description, until, image?, products: { name, discount, image? }[] }`
- `hasOffers = deals.length > 0`

## Assets
- `assets/logo/basket-mark.png`: current basket logo (coral / light blue / light violet).
- `assets/fonts/Glowtone-Regular.otf`: display font. Its license is "personal use"; **check the license before shipping to production**.
- `assets/illustrations/`: 3D PNGs with transparency (cart, map, "+", storefront).
- `assets/photos/`: 3 placeholder photos. `assets/scenes/kenney-city-preview.png` is a static preview of the Kenney City Kit (Commercial) scene, planned to become a real 3D scene.
- Icons: Lucide.

## Files
- `styles.css` + `tokens/*.css`: all tokens and keyframes.
- `components/**`: components (`.jsx` source, `.d.ts` API, `.prompt.md` notes).
- `ui_kits/landing/*`: landing (Nav, Hero, Sections, Catalog, data).
- `ui_kits/map-app/*`: map (MapView, MapChrome, map-data, index).
- `_ds_bundle.js`: compiled bundle, only used to open the prototypes.
