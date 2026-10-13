import type { CategoryKey, BusinessType } from './types'

export const CATEGORIES_BY_TYPE: Record<BusinessType, [CategoryKey, string][]> = {
  tienda: [
    ['supermercado', 'Supermercado'],
    ['restaurant', 'Restaurant'],
    ['ferreteria', 'Ferretería'],
    ['ropa', 'Ropa'],
    ['electronica', 'Electrónica'],
    ['farmacia', 'Farmacia'],
    ['mascotas', 'Mascotas'],
    ['hogar', 'Hogar y muebles'],
    ['automotriz', 'Automotriz'],
    ['entretenimiento', 'Entretenimiento'],
    ['despensa', 'Despensa'],
    ['kiosco', 'Kiosco'],
    ['minimarket', 'Minimarket'],
    ['verduleria', 'Verdulería'],
    ['carniceria', 'Carnicería'],
    ['panaderia', 'Panadería'],
    ['otros', 'Otros'],
  ],
  servicio: [
    ['mecanica', 'Mecánica'],
    ['plomeria', 'Plomería'],
    ['barberia', 'Barbería'],
    ['electricidad', 'Electricidad'],
    ['cerrajeria', 'Cerrajería'],
  ],
  emprendimiento: [
    ['comida', 'Comida'],
    ['pasteleria', 'Pastelería'],
    ['souvenirs', 'Souvenirs'],
    ['catering', 'Catering'],
    ['artesanias', 'Artesanías'],
  ],
}

export const CATEGORIES: [CategoryKey, string][] = Object.values(CATEGORIES_BY_TYPE).flat()

export const SUGGESTIONS: [string, string][] = [
  ['Pantalón', 'shirt'],
  ['Zapatillas', 'footprints'],
  ['Celulares', 'smartphone'],
  ['Auriculares', 'headphones'],
  ['Pizza', 'pizza'],
  ['Herramientas', 'hammer'],
  ['Alimento para perros', 'bone'],
  ['Muebles', 'sofa'],
  ['Tortas', 'cake'],
]

const SYNONYMS: Record<string, string[]> = {
  pantalón: ['pantal', 'ropa'],
  zapatillas: ['zapat', 'ropa'],
  celulares: ['celu', 'electr'],
  auriculares: ['auric', 'audio'],
  pizza: ['pizza', 'prepizza', 'vianda'],
  herramientas: ['herramient', 'taladro', 'ferret'],
  'alimento para perros': ['alimento', 'perro'],
  muebles: ['mueble', 'mesa', 'rack'],
  tortas: ['torta', 'pastel'],
}

export const synonyms = (q: string): string[] => {
  const k = q.toLowerCase()
  return SYNONYMS[k] ?? [k]
}
