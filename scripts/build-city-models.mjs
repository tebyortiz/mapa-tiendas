// Agrupa los .glb sueltos de Kenney que usa la ciudad del hero en 3 archivos, uno por capa
// (calles + faroles, árboles, edificios), con texturas y materiales deduplicados.
//
// Antes se pedían ~30 archivos y cada uno traía su propia copia de la textura de colores: el navegador
// la subía ~30 veces a la GPU. Ahora son 3 pedidos y una textura por kit.
//
// Uso: node scripts/build-city-models.mjs   (volver a correrlo si cambia el plano en cityConfig.ts)
import { mkdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Document, NodeIO } from '@gltf-transform/core'
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'
import { dedup, mergeDocuments, prune, quantize, unpartition, weld } from '@gltf-transform/functions'
import { CITY_PIECES, CITY_LAYERS, pieceLayer, piecePack } from '../src/features/landing/city/cityConfig.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'assets-src', 'kenney')
const OUT = join(root, 'public', 'models', 'city')
mkdirSync(OUT, { recursive: true })

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS)
const tipos = [...new Set(CITY_PIECES.map((p) => p.tipo))].sort()

for (const layer of CITY_LAYERS) {
  const doc = new Document()
  doc.createBuffer()
  const scene = doc.createScene(layer)
  for (const tipo of tipos.filter((t) => pieceLayer(t) === layer)) {
    const src = await io.read(join(SRC, `kenney-city-${piecePack(tipo)}`, 'GLB format', `${tipo}.glb`))
    const map = mergeDocuments(doc, src)
    // cada pieza queda como un nodo "piece_<tipo>" colgando de la escena única de la capa (prefijo propio
    // para no chocar con los nombres internos de los nodos de Kenney, que suelen repetir el tipo)
    const wrapper = doc.createNode(`piece_${tipo}`)
    for (const s of src.getRoot().listScenes()) {
      const merged = map.get(s)
      for (const child of merged.listChildren()) wrapper.addChild(child)
      merged.dispose()
    }
    scene.addChild(wrapper)
  }
  doc.getRoot().setDefaultScene(scene)
  // weld une vértices repetidos; quantize guarda posiciones/normales/UV en enteros (KHR_mesh_quantization,
  // que three.js lee de forma nativa): menos bytes para bajar y menos memoria en la GPU
  await doc.transform(unpartition(), dedup(), weld(), quantize(), prune())
  const file = join(OUT, `${layer}.glb`)
  await io.write(file, doc)
  const r = doc.getRoot()
  const kb = (statSync(file).size / 1024).toFixed(1)
  console.log(`${layer}.glb  ${kb} KB  piezas=${scene.listChildren().length} texturas=${r.listTextures().length} materiales=${r.listMaterials().length}`)
}
