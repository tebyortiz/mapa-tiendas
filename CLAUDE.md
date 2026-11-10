# Comprá Fácil — Mapa de tiendas

Estado al 09/11/2026, commit `4741228` (base `main`).

Directorio web de comercios cercanos a la ubicación real del comprador, con mapa y buscador de productos. No es un e-commerce: no vende ni cobra, sino que deriva a la tienda del comercio en Tu Tienda Virtual (ttv) o Gesto.

- **Cliente que paga**: dueños de comercios, clientes de ClarusRock suscriptos a ttv y/o Gesto. **Usuario final**: el comprador que busca tiendas y productos cerca suyo, en desktop y mobile.
- **Equipo**: Teby Ortiz es el encargado de este front y lo implementa con Claude Code. Las decisiones se toman en una llamada semanal del equipo de ClarusRock.

El detalle técnico (flujo de datos, contratos de la API, normalización, estructura) está en `README.md`. Este archivo no lo repite.

## Comandos

```bash
npm run dev           # desarrollo (proxy de /api/geo en vite.config.ts)
npm run lint          # eslint
npm run build         # tsc -b && vite build
npm run city:models   # regenera los .glb de la ciudad del hero
npm run city:capture  # regenera la captura del hero (con npm run dev corriendo)
```

Todavía no hay tests. Hace falta `.env.local` con `VITE_MAPBOX_TOKEN`.

## Entornos

- **Local**: `npm run dev`. `/api/geo/*` se reenvía al backend por el proxy de Vite.
- **Producción**: Vercel, dominio `comprafacil.ar`. `/api/geo/*` se reenvía por el rewrite de `vercel.json`.
- **Backend**: `https://geo-e-commerce.vercel.app`, en otro repo, mantenido por Michel Ortiz.
- Rama de trabajo: `main` más ramas por tarea mergeadas por PR. `develop` todavía no existe.

## Reglas de dominio

Filtran toda propuesta. Si un pedido choca con una, se avisa antes de avanzar.

- **No hay ciudad ni comercios por defecto.** Sólo se muestra lo que devuelve el backend para la ubicación real. Porque mostrar comercios de otra zona engaña al comprador.
- **El permiso de ubicación nunca se fuerza al cargar.** Se pide con un gesto del usuario o se usa en silencio si ya estaba concedido. Porque Safari mobile sólo abre el prompt de forma confiable con un gesto.
- **La UI no sabe si un comercio viene de ttv o de Gesto.** Consume sólo `Business` (`src/data/types.ts`) y las diferencias se resuelven en `toBusiness` (`src/lib/geoApi.ts`). Porque así un cambio de plataforma o de formato no toca la UI.
- **La ubicación guardada vence a los 30 minutos.** Porque en mobile las pestañas quedan abiertas días.
- **El asistente de compra es un buscador de productos, no un chatbot**, hasta que exista el chatbot real.
- **Los contratos del backend los define Michel Ortiz.** El front no inventa campos ni asume datos que la API no manda; si falta algo, se le pide a él.

## Reglas técnicas no negociables

- **Git**: Claude Code no ejecuta git, ni siquiera de sólo lectura (bloqueado en `.claude/settings.json`). Teby hace add, commit y push. Si hace falta el estado del repo, se le pide que lo pegue.
- **`docs/decisiones/`**: Claude Code no lo edita (bloqueado). Las decisiones de producto no se escriben en este archivo.
- El front nunca llama directo al backend: siempre a `/api/geo/...` del propio origen, porque el backend no manda CORS.
- `src/lib/` habla con el exterior y guarda el estado compartido, `src/pages/` decide qué mostrar, y `src/features/` y `src/components/` sólo renderizan.
- No tocar `dist/`, no versionar `.env.local` y no regenerar la ciudad 3D sin avisar.
- No inventar archivos, funciones ni endpoints. Un conteo o un "no se usa en otro lado" se verifica leyendo el código, no con un grep ni con lo que diga un `.md`.
- Paneles (Vercel, Mapbox, DNS de `comprafacil.ar`): los cambios los hace Teby a mano. Claude Code sólo dice qué cambiar.

## Cómo se trabaja

- **Una tarea por conversación**, en modo plan: explorar, proponer y recién implementar con el OK. Si la tarea crece, se corta y lo que sobra queda anotado como pendiente.
- **Tiene decisión pendiente** si contradice o extiende `docs/decisiones/`, crea una regla nueva o cambia lo que ve el usuario final, y no fue hablado en la llamada semanal. En ese caso se frena, se proponen opciones con sus pros y contras, y decide Teby (o lo lleva a la llamada).
- **El resumen final** cuenta sólo lo que se hizo, sin agregar datos que nadie dio.
- **Verificación**: `npm run lint` y `npm run build` sin errores, y que funcione en desktop y en mobile. Lo visual se da por terminado sólo con captura o con la confirmación de Teby.
- **Al cerrar la tarea**:
  1. Chequeo de este archivo. Si cambió algo estructural, se actualizan la regla del dominio y el índice, con la fecha y el commit. Si no, se dice "esta tarea no toca el contexto".
  2. Si se cerró una decisión de producto, se pasa el texto para `docs/decisiones/<dominio>.md` con el punto de inserción, y Teby lo pega.
  3. Comandos git en bloques separados: `git add` archivo por archivo (nunca `git add .`), `git status` y `git commit` en español con Conventional Commits. Primero el commit de código y después el `docs:`. Sin co-autoría ni firmas de Claude. El push lo hace Teby.
- **Idioma**: UI, commits, documentación y respuestas en español rioplatense. El código, en inglés.

## Decisiones abiertas

- El backend sólo devuelve tiendas. Servicios y emprendimientos están pendientes (`type` hoy fijo en `'tienda'`).
- Chatbot real del asistente: pendiente. Hoy el asistente es un buscador y está oculto.
- Rama `develop`: pendiente.
- Tests: todavía no hay.
- `fetchNearby` y `searchProducts` dejan un `console.log` con la respuesta cruda (para depurar).

## Índice

| Archivo | Qué cubre |
| --- | --- |
| `README.md` | Documentación técnica completa para personas |
| `.claude/rules/ubicacion.md` | Store de ubicación, geolocalización, normalización ttv/gesto, rubros |
| `.claude/rules/mapa.md` | MapPage, modos, posiciones, pines y fichas |
| `.claude/rules/busqueda.md` | Búsqueda de productos y asistente |
| `.claude/rules/landing.md` | Secciones de la landing y ciudad 3D del hero |
| `.claude/rules/ui.md` | Sistema de diseño, tokens, animaciones y fuentes |
| `docs/decisiones/README.md` | Índice de decisiones de producto cerradas |
