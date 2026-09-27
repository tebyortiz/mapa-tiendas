import type { BusinessType } from '../../../data/types'

export type CityPiece = {
  id: string
  /** nombre del .glb sin extensión (building-a, road-straight, tree-large...) */
  tipo: string
  fila: number
  columna: number
  /** cuartos de vuelta sobre Y (0..3) */
  rotacion: number
  escala?: number
  /** desplazamiento dentro de la celda, en unidades */
  offset?: [number, number]
}

export type GroundKind = 'grass' | 'lot' | 'plaza'
export type GroundTile = { fila: number; columna: number; kind: GroundKind }

export const CELL = 1

// Plano del pueblo, generado (21×13). . = vacío (borde irregular) · r = calle · g = césped · T = césped con árboles
// B = edificio · F = fuente (plaza rodeada por la calle)
const W = 21
const H = 13
const FC = 10 // columna de la fuente
const FR = 6 // fila de la fuente
const STREET_ROWS = [2, 6, 10]
const STREET_COLS = [4, 10, 16]

const noise = (f: number, c: number, n = 0) => Math.abs(Math.sin(f * 12.9898 + c * 78.233 + n * 37.719) * 43758.5453) % 1
const norm = (f: number, c: number) => Math.hypot((c - FC) / 10.4, (f - FR) / 6.5) // 0 en la fuente, ~1 en el borde

const MAP: string[] = Array.from({ length: H }, (_, f) =>
  Array.from({ length: W }, (_, c) => {
    if (norm(f, c) + (noise(f, c, 5) - 0.5) * 0.28 > 1) return '.' // borde irregular
    if (f === FR && c === FC) return 'F'
    if (Math.abs(f - FR) <= 1 && Math.abs(c - FC) <= 1) return 'r' // anillo alrededor de la fuente
    if (STREET_ROWS.includes(f) || STREET_COLS.includes(c)) return 'r'
    const h = noise(f, c, 20)
    const d = norm(f, c)
    if (h < 0.05 + 0.3 * d * d) return h < 0.03 + 0.18 * d * d ? 'T' : 'g'
    return 'B'
  }).join(''),
)
export const ROWS = MAP.length
export const COLS = MAP[0].length

const DIRS: [number, number][] = [[0, 1], [-1, 0], [0, -1], [1, 0]] // E, N, W, S  (fila, columna) — cada +90° en Y avanza un índice
const at = (f: number, c: number) => MAP[f]?.[c] ?? '.'
const isRoad = (f: number, c: number) => at(f, c) === 'r'

// Casas del kit Suburban (~1.3 de ancho a escala 1, se achican) y comercios bajos del kit Commercial
const HOUSES = 'abcdefghijklmnopqrstu'.split('').map((l) => `building-type-${l}`)
// Comercios de 2-3 pisos (mayoría), algunos de 4 y muy pocos altos; se omiten los más anchos que una celda
const SHOPS = ['c', 'c', 'c', 'a', 'b', 'd', 'h', 'a', 'c', 'd', 'f', 'g'].map((l) => `building-${l}`)
const TALL_SHOPS = ['building-l', 'building-m']

const pieces: CityPiece[] = []
const ground: GroundTile[] = []
const hash = (f: number, c: number, n = 0) => Math.abs(Math.sin(f * 12.9898 + c * 78.233 + n * 37.719) * 43758.5453) % 1

for (let fila = 0; fila < ROWS; fila++) {
  for (let columna = 0; columna < COLS; columna++) {
    const ch = at(fila, columna)
    const id = (k: string) => `${k}-${fila}-${columna}`
    if (ch === '.') continue

    if (ch === 'r') {
      // autotile: elige pieza y rotación según los vecinos que también son calle
      const open = DIRS.map(([df, dc]) => isRoad(fila + df, columna + dc))
      const idx = open.flatMap((o, i) => (o ? [i] : []))
      let tipo = 'road-straight'
      let rot = 0
      if (idx.length === 4) tipo = 'road-crossroad'
      else if (idx.length === 3) {
        tipo = 'road-intersection' // T base: abierta E,W,S (le falta N = índice 1)
        rot = (open.indexOf(false) - 1 + 4) % 4
      } else if (idx.length === 2 && idx[1] - idx[0] === 2) {
        rot = idx[0] % 2 // recta: E-W = 0, N-S = 1
      } else if (idx.length === 2) {
        tipo = 'road-bend' // base: abierta W,S (índices 2,3)
        const first = idx[0] === 0 && idx[1] === 3 ? 3 : idx[0]
        rot = (first - 2 + 4) % 4
      } else {
        tipo = 'road-end' // base: abierta E
        rot = idx[0] ?? 0
      }
      pieces.push({ id: id('r'), tipo, fila, columna, rotacion: rot })
      // faroles alternados sobre las calles rectas (el brazo apunta hacia la calle)
      if (tipo === 'road-straight' && (fila + columna) % 2 === 0) {
        const horizontal = rot === 0
        pieces.push({ id: id('l'), tipo: 'light-square', fila, columna, rotacion: horizontal ? 0 : 1, offset: horizontal ? [0, 0.42] : [0.42, 0] })
      }
      continue
    }

    if (ch === 'F') {
      ground.push({ fila, columna, kind: 'plaza' })
      continue
    }

    if (ch === 'g' || ch === 'T') {
      ground.push({ fila, columna, kind: 'grass' })
      const n = ch === 'T' ? 3 : hash(fila, columna) > 0.6 ? 1 : 0
      for (let i = 0; i < n; i++) {
        const ox = (hash(fila, columna, i + 1) - 0.5) * 0.6
        const oz = (hash(fila, columna, i + 7) - 0.5) * 0.6
        pieces.push({
          id: id(`t${i}`),
          tipo: hash(fila, columna, i + 3) > 0.5 ? 'tree-large' : 'tree-small',
          fila, columna, rotacion: 0, escala: 1.15, offset: [ox, oz],
        })
      }
      continue
    }

    // B: edificio orientado hacia la calle vecina; casas en las afueras, comercios cerca de la plaza
    ground.push({ fila, columna, kind: 'lot' })
    const facing = DIRS.findIndex(([df, dc]) => isRoad(fila + df, columna + dc))
    const rot = facing < 0 ? 0 : (facing - 3 + 4) % 4 // el frente de Kenney mira a +Z (sur, índice 3)
    const nearCenter = norm(fila, columna) < 0.55
    const pick = Math.floor(hash(fila, columna, 9) * 100)
    pieces.push(
      nearCenter
        ? { id: id('b'), tipo: hash(fila, columna, 11) < 0.05 ? TALL_SHOPS[pick % 2] : SHOPS[pick % SHOPS.length], fila, columna, rotacion: rot, escala: 0.72 }
        : { id: id('b'), tipo: HOUSES[pick % HOUSES.length], fila, columna, rotacion: rot, escala: 0.62 },
    )
  }
}
export const CITY_PIECES: CityPiece[] = pieces
export const GROUND_TILES: GroundTile[] = ground
export const FOUNTAIN_POSITION = (() => {
  for (let f = 0; f < ROWS; f++) for (let c = 0; c < COLS; c++) if (at(f, c) === 'F') return cellPosition(f, c)
  return [0, 0, 0] as [number, number, number]
})()

/** 9 edificios fijos (mismos siempre), 3 por categoría: repartidos por ángulo alrededor de la fuente, alternando categorías */
export const FEATURED: Record<string, BusinessType> = (() => {
  const cats: BusinessType[] = ['tienda', 'servicio', 'emprendimiento']
  const cands = pieces
    .filter((p) => p.id.startsWith('b-') && norm(p.fila, p.columna) > 0.3 && norm(p.fila, p.columna) < 0.8)
    .sort((a, b) => Math.atan2(a.fila - FR, a.columna - FC) - Math.atan2(b.fila - FR, b.columna - FC))
  const out: Record<string, BusinessType> = {}
  for (let i = 0; i < 9; i++) out[cands[Math.floor((i * cands.length) / 9)].id] = cats[i % 3]
  return out
})()

const pack = (tipo: string) =>
  tipo.startsWith('road-') || tipo.startsWith('light-') ? 'roads' : tipo.startsWith('building-type-') || tipo.startsWith('tree-') || tipo === 'planter' ? 'suburban' : 'commercial'

export const pieceUrl = (tipo: string) => encodeURI(`/models/kenney-city-${pack(tipo)}/GLB format/${tipo}.glb`)

export function cellPosition(fila: number, columna: number): [number, number, number] {
  return [(columna - (COLS - 1) / 2) * CELL, 0, (fila - (ROWS - 1) / 2) * CELL]
}

export const piecePosition = (p: CityPiece): [number, number, number] => {
  const [x, y, z] = cellPosition(p.fila, p.columna)
  return [x + (p.offset?.[0] ?? 0), y, z + (p.offset?.[1] ?? 0)]
}

/** Colores del sistema de diseño (index.css): tienda=coral, servicio=cyan (azul claro), emprendimiento=lilac */
const GLOW_VARS: Record<BusinessType, [string, string]> = {
  tienda: ['--cf-coral', '#ff6f61'],
  servicio: ['--cf-cyan', '#2dd4f0'],
  emprendimiento: ['--cf-lilac', '#c4a1ff'],
}

export const glowColor = (t: BusinessType): string => {
  const [name, fallback] = GLOW_VARS[t]
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

export type ProductImage = { src: string; category: BusinessType }
