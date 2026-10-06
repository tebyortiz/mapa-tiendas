import type { Business, CategoryKey, Deal, BusinessType } from './types'
import { isOpen } from '../lib/hours'

const PHOTOS: Record<BusinessType, string> = {
  tienda: '/assets/photos/carr-tienda01.jpg',
  servicio: '/assets/photos/carr-servicios01.jpg',
  emprendimiento: '/assets/photos/carr-emprend01.jpg',
}

type Raw = Omit<Business, 'deals' | 'hasOffers' | 'search' | 'image' | 'chain' | 'branch'> &
  Partial<Pick<Business, 'chain' | 'branch' | 'image'>>

const M = '/assets/mock'

const RAW: Raw[] = [
  { id: 1, type: 'tienda', chain: 'Del Valle Supermercados', branch: 'Súper Del Valle Centro', name: 'Súper Del Valle', category: 'supermercado', categoryLabel: 'Supermercado', distance: '350 m', open: true, delivery: ['mostrador', 'delivery'], lat: -33.5762, lng: -69.0149, address: 'Av. San Martín 1020', hours: 'Todos los días · 8 a 22 h', description: 'Almacén, verdulería y carnicería en un solo lugar.' },
  { id: 4, type: 'tienda', chain: 'Punto Tech', branch: 'Punto Tech Sarmiento', name: 'Punto Tech', category: 'electronica', categoryLabel: 'Electrónica', distance: '450 m', open: true, delivery: ['mostrador', 'delivery'], lat: -33.5779, lng: -69.0171, address: 'Sarmiento 210', hours: 'Lun a Sáb · 9 a 13 y 17 a 21 h', description: 'Celulares, accesorios y reparaciones al toque.', image: '/assets/photos/carr-tienda02.jpg' },
  { id: 6, type: 'tienda', chain: 'Patitas Pet Shop', branch: 'Patitas Alem', name: 'Patitas', category: 'mascotas', categoryLabel: 'Mascotas', distance: '900 m', open: true, delivery: ['mostrador', 'delivery'], lat: -33.5794, lng: -69.0211, address: 'Alem 118', hours: 'Lun a Sáb · 9 a 21 h', description: 'Alimento balanceado, accesorios y peluquería.' },
  { id: 7, type: 'tienda', chain: 'Farmacias Central', branch: 'Farmacia Central San Martín', name: 'Farmacia Central', category: 'farmacia', categoryLabel: 'Farmacia', distance: '300 m', open: true, delivery: ['mostrador'], lat: -33.5771, lng: -69.0137, address: 'San Martín 1105', hours: '24 h', description: 'De turno esta semana.' },
  { id: 9, type: 'tienda', chain: 'Moda Andina', branch: 'Moda Andina Roca', name: 'Moda Andina', category: 'ropa', categoryLabel: 'Ropa', distance: '700 m', open: false, delivery: ['mostrador'], lat: -33.5822, lng: -69.0165, address: 'Roca 402', hours: 'Lun a Sáb · 9 a 13 y 17 a 21 h', description: 'Ropa urbana y de montaña.' },
]

/** Servicios y emprendimientos de ejemplo en Tunuyán (mientras el backend no los devuelva). Fotos: Pexels; avatares: randomuser.me. */
const RAW_LOCAL: Raw[] = [
  // Servicios
  { id: 2, type: 'servicio', name: 'Taller Don Luis', category: 'mecanica', categoryLabel: 'Mecánica', distance: '600 m', open: true, lat: -33.5731, lng: -69.0192, address: 'Av. San Martín 820', hours: 'Lun a Vie · 8 a 18 h', description: 'Service, frenos y tren delantero. Atendemos con turno.', image: `${M}/mecanica.jpg`, chainImage: `${M}/avatar1.jpg` },
  { id: 14, type: 'servicio', name: 'Plomería Ríos', category: 'plomeria', categoryLabel: 'Plomería', distance: '950 m', open: true, lat: -33.5788, lng: -69.0224, address: 'Alberdi 540', hours: 'Lun a Sáb · 8 a 19 h', description: 'Destapes, pérdidas, instalaciones de agua y gas. Urgencias.', image: `${M}/plomeria.jpg`, chainImage: `${M}/avatar2.jpg` },
  { id: 11, type: 'servicio', name: 'Barbería Los Hermanos', category: 'barberia', categoryLabel: 'Barbería', distance: '1 km', open: true, lat: -33.5752, lng: -69.008, address: 'Mitre 60', hours: 'Mar a Sáb · 10 a 21 h', description: 'Cortes clásicos, degradé y perfilado de barba. Con turno online.', image: `${M}/barberia.jpg`, chainImage: `${M}/avatar3.jpg` },
  { id: 5, type: 'servicio', name: 'Electricidad Gómez', category: 'electricidad', categoryLabel: 'Electricidad', distance: '800 m', open: true, lat: -33.5745, lng: -69.0121, address: 'Godoy Cruz 330', hours: 'Lun a Sáb · 8 a 20 h', description: 'Electricista matriculada: instalaciones, tableros y certificados.', image: `${M}/electricidad.jpg`, chainImage: `${M}/avatar4.jpg` },
  { id: 15, type: 'servicio', name: 'Cerrajería Rápida', category: 'cerrajeria', categoryLabel: 'Cerrajería', distance: '480 m', open: true, lat: -33.5748, lng: -69.0176, address: 'San Martín 640', hours: '24 h', description: 'Aperturas, copias de llaves y cambio de cerraduras.', image: `${M}/cerrajeria.jpg`, chainImage: `${M}/avatar5.jpg` },
  // Emprendimientos
  { id: 3, type: 'emprendimiento', name: 'Dulce Taller', category: 'pasteleria', categoryLabel: 'Pastelería', distance: '1,2 km', open: false, lat: -33.5809, lng: -69.0106, address: 'Belgrano 455', hours: 'Lun a Sáb · 9 a 20 h', description: 'Tortas por encargo y mesa dulce para eventos.', image: `${M}/pasteleria.jpg`, chainImage: `${M}/avatar6.jpg` },
  { id: 8, type: 'emprendimiento', name: 'Cocina de Marta', category: 'comida', categoryLabel: 'Comida casera', distance: '1,5 km', open: true, lat: -33.5716, lng: -69.0098, address: 'Las Heras 77', hours: 'Lun a Vie · 11 a 15 h', description: 'Viandas caseras y empanadas con envío en el centro.', image: `${M}/comida.jpg`, chainImage: `${M}/avatar7.jpg` },
  { id: 10, type: 'emprendimiento', name: 'Madera Viva', category: 'artesanias', categoryLabel: 'Artesanías', distance: '2 km', open: true, lat: -33.57, lng: -69.023, address: 'Ruta 40 km 3', hours: 'Lun a Sáb · 9 a 18 h', description: 'Muebles y objetos a medida en madera maciza.', image: `${M}/artesanias.jpg`, chainImage: `${M}/avatar8.jpg` },
  { id: 12, type: 'emprendimiento', name: 'Recuerdos del Valle', category: 'souvenirs', categoryLabel: 'Souvenirs', distance: '650 m', open: true, lat: -33.5772, lng: -69.0128, address: 'Belgrano 120', hours: 'Todos los días · 10 a 20 h', description: 'Souvenirs, vinos en miniatura y regalos empresariales.', image: `${M}/souvenirs.jpg`, chainImage: `${M}/avatar9.jpg` },
  { id: 13, type: 'emprendimiento', name: 'Catering Sabores', category: 'catering', categoryLabel: 'Catering', distance: '1,1 km', open: true, lat: -33.5795, lng: -69.0187, address: 'Sarmiento 890', hours: 'Lun a Sáb · 9 a 19 h', description: 'Catering para cumpleaños, casamientos y eventos de empresa.', image: `${M}/catering.jpg`, chainImage: `${M}/avatar10.jpg` },
]

const DEALS: Record<number, Deal[]> = {
  1: [
    { name: 'Martes de panificados', description: '2x1 en pan, facturas y prepizzas.', until: '30 de septiembre', products: [{ name: 'Pan francés', discount: '2x1' }, { name: 'Facturas', discount: '2x1' }, { name: 'Prepizzas', discount: '2x1' }] },
    { name: 'Almacén', description: 'Llevando 2 unidades del mismo producto.', until: '15 de octubre', products: [{ name: 'Aceite 1,5 L', discount: '-25%' }, { name: 'Yerba 1 kg', discount: '-20%' }, { name: 'Fideos', discount: '-15%' }, { name: 'Arroz', discount: '-15%' }] },
    { name: 'Verdulería', description: 'Frutas de estación, precio por kilo.', until: '5 de octubre', products: [{ name: 'Manzanas', discount: '-15%' }, { name: 'Naranjas', discount: '-10%' }] },
  ],
  2: [{ name: 'Service completo', description: 'Aceite, filtros y revisión general con turno.', until: '30 de septiembre', products: [{ name: 'Cambio de aceite', discount: '-20%' }, { name: 'Filtros', discount: '-20%' }] }],
  3: [
    { name: 'Mesa dulce para eventos', description: 'Encargando con 5 días de anticipación.', until: '31 de octubre', products: [{ name: 'Mesa para 20', discount: '-10%' }, { name: 'Cupcakes x12', discount: '-15%' }] },
    { name: 'Tortas de cumpleaños', description: 'Diseño personalizado de 2 kg.', until: '20 de octubre', products: [{ name: 'Torta temática', discount: '-15%' }] },
  ],
  4: [
    { name: 'Semana del audio', description: 'Pagando en efectivo o transferencia.', until: '6 de octubre', products: [{ name: 'Auriculares BT', discount: '-30%' }, { name: 'Parlante', discount: '-25%' }, { name: 'Earbuds', discount: '-20%' }] },
    { name: 'Protegé tu celu', description: 'Funda + vidrio templado en combo.', until: '15 de octubre', products: [{ name: 'Funda', discount: '-20%' }, { name: 'Vidrio templado', discount: '-20%' }] },
    { name: 'Carga rápida', description: 'Cable USB-C incluido.', until: '31 de octubre', products: [{ name: 'Cargador 25 W', discount: '-15%' }, { name: 'Power bank', discount: '-10%' }] },
  ],
  5: [
    { name: 'Instalaciones eléctricas', description: 'Presupuesto sin cargo y 15% off en mano de obra.', until: '31 de octubre', products: [{ name: 'Tablero', discount: '-15%' }, { name: 'Cableado', discount: '-15%' }, { name: 'Certificado', discount: '-10%' }] },
  ],
  11: [{ name: 'Corte + barba', description: 'Combo de martes a jueves.', until: '15 de octubre', products: [{ name: 'Corte + barba', discount: '-20%' }] }],
  12: [{ name: 'Regalos empresariales', description: 'Pedidos desde 10 unidades.', until: '31 de octubre', products: [{ name: 'Vino en miniatura', discount: '-15%' }, { name: 'Caja regalo', discount: '-10%' }] }],
  13: [{ name: 'Menú para eventos', description: 'Reservando con 10 días de anticipación.', until: '30 de noviembre', products: [{ name: 'Menú x20', discount: '-10%' }, { name: 'Mesa de dulces', discount: '-15%' }] }],
  14: [{ name: 'Revisión de instalación', description: 'Diagnóstico de pérdidas incluido.', until: '15 de octubre', products: [{ name: 'Diagnóstico', discount: '-30%' }] }],
  6: [
    { name: 'Alimento balanceado', description: 'Bolsas de 15 kg, marcas seleccionadas.', until: '10 de octubre', products: [{ name: 'Perro adulto', discount: '-20%' }, { name: 'Cachorro', discount: '-15%' }, { name: 'Gato', discount: '-15%' }] },
    { name: 'Peluquería', description: 'Baño y corte de lunes a miércoles.', until: '31 de octubre', products: [{ name: 'Baño', discount: '-15%' }, { name: 'Corte', discount: '-15%' }] },
  ],
  10: [{ name: 'Muebles de interior', description: 'Mesas y racks a medida.', until: '31 de diciembre', products: [{ name: 'Mesa comedor', discount: '-30%' }, { name: 'Rack TV', discount: '-30%' }, { name: 'Estantería', discount: '-20%' }] }],
}

const street = (a: string) => a.replace(/[0-9].*$/, '').replace(/^(Av\.|Ruta)\s*/, '').trim()

const build = (b: Raw): Business => {
  const chain = b.chain ?? b.name
  const branch = b.branch ?? `${b.name} ${street(b.address)}`
  const deals = DEALS[b.id] ?? []
  return {
    ...b,
    open: isOpen(b.hours) ?? b.open,
    image: b.image ?? PHOTOS[b.type],
    chain,
    branch,
    deals,
    hasOffers: deals.length > 0,
    search: [b.name, branch, chain, b.categoryLabel, b.description, ...deals.flatMap((d) => [d.name, ...d.products.map((p) => p.name)])]
      .join(' ')
      .toLowerCase(),
  }
}

/** Todo el mockup (tiendas + servicios + emprendimientos). */
export const BUSINESSES: Business[] = [...RAW, ...RAW_LOCAL].map(build)

/** Servicios y emprendimientos de ejemplo, para sumarlos a lo que llega del backend. */
export const LOCAL_BUSINESSES: Business[] = RAW_LOCAL.map(build)

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
