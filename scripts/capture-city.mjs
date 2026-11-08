// Saca la captura estática de la ciudad 3D del hero (WebP con transparencia, en varios anchos).
//
// La captura es lo primero que se ve en el hero y lo único en equipos sin GPU; cuando la escena 3D está
// lista la reemplaza con un fundido. Para que coincidan, se renderiza la escena real en un canvas con la
// misma proporción que la caja que encuadra la cámara (window.__cityFit, solo en desarrollo con
// ?city-capture): así la imagen con object-fit: contain cae exactamente donde cae la escena.
//
// Uso (con `npm run dev` corriendo):  node scripts/capture-city.mjs [http://localhost:5173]
// Requiere Chrome instalado (CHROME_PATH para otra ruta) y un equipo con GPU.
// Volver a correrlo si cambia la ciudad (cityConfig.ts, modelos, luces o cámara).
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const url = (process.argv[2] ?? 'http://localhost:5173') + '/?city-capture'
const WIDTHS = [960, 1280, 1600, 2160]
// 0.65: a simple vista no se distingue de 0.8 (estilo low-poly, colores planos) y pesa ~20% menos
const QUALITY = Number(process.env.QUALITY ?? 0.65)
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(root, 'public', 'assets', 'scenes')
mkdirSync(OUT, { recursive: true })

const executablePath =
  process.env.CHROME_PATH ??
  ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find((p) => existsSync(p))

const browser = await chromium.launch({ executablePath, headless: true })
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 })
await page.goto(url)
const [fitW, fitH] = await page.waitForFunction(() => window.__cityFit, null, { timeout: 60000 }).then((h) => h.jsonValue())
const W = Math.max(...WIDTHS)
const H = Math.round((W * fitH) / fitW)
console.log(`proporción ${fitW.toFixed(3)} × ${fitH.toFixed(3)} → ${W}×${H}`)

// el canvas pasa a medir exactamente W×H (sin máscaras, recortes ni parallax de scroll)
await page.setViewportSize({ width: W + 40, height: H + 40 })
await page.addStyleTag({
  content: `
    .hero-city-wrap { position: fixed !important; left: 0 !important; top: 0 !important; right: auto !important; bottom: auto !important;
      margin: 0 !important; width: ${W}px !important; height: ${H}px !important; clip-path: none !important; transform: none !important; z-index: 9999; }
    .hero-city { -webkit-mask-image: none !important; mask-image: none !important; aspect-ratio: auto !important; width: 100% !important; height: 100% !important; }
  `,
})
// lista = el canvas ya mide W×H y la escena terminó su fundido (la captura de base se oculta al final);
// se espera un poco más para que el último cuadro tras el redimensionado esté dibujado
await page.waitForFunction(
  ({ W, H }) => {
    const c = document.querySelector('.hero-city canvas')
    const poster = document.querySelector('.hero-city-poster')
    return c && c.width === W && c.height === H && (!poster || getComputedStyle(poster).visibility === 'hidden')
  },
  { W, H },
  { timeout: 60000 },
)
await page.waitForTimeout(2500)

const result = await page.evaluate(
  async ({ widths, quality }) => {
    const src = document.querySelector('.hero-city canvas')
    const out = { size: [src.width, src.height], files: {} }
    for (const w of widths) {
      const h = Math.round((w * src.height) / src.width)
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(src, 0, 0, w, h)
      out.files[w] = { h, webp: c.toDataURL('image/webp', quality) }
    }
    out.png = src.toDataURL('image/png')
    return out
  },
  { widths: WIDTHS, quality: QUALITY },
)
console.log(`canvas ${result.size.join('×')}`)
for (const [w, { h, webp }] of Object.entries(result.files)) {
  const buf = Buffer.from(webp.split(',')[1], 'base64')
  writeFileSync(join(OUT, `city-${w}.webp`), buf)
  console.log(`city-${w}.webp  ${w}×${h}  ${(buf.length / 1024).toFixed(1)} KB`)
}
if (process.env.CAPTURE_PNG) writeFileSync(process.env.CAPTURE_PNG, Buffer.from(result.png.split(',')[1], 'base64'))
await browser.close()
