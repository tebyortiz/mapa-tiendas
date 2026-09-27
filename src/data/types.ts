export type BusinessType = 'tienda' | 'servicio' | 'emprendimiento'
export type TypeKey = BusinessType | 'todas'

export type CategoryKey =
  | 'supermercado'
  | 'restaurant'
  | 'ferreteria'
  | 'ropa'
  | 'electronica'
  | 'farmacia'
  | 'mascotas'
  | 'hogar'
  | 'entretenimiento'
  | 'automotriz'
  | 'despensa'
  | 'kiosco'
  | 'minimarket'
  | 'verduleria'
  | 'carniceria'
  | 'panaderia'
  | 'mecanica'
  | 'plomeria'
  | 'barberia'
  | 'electricidad'
  | 'cerrajeria'
  | 'comida'
  | 'pasteleria'
  | 'souvenirs'
  | 'catering'
  | 'artesanias'
  | 'otros'

export interface Product {
  name: string
  discount: string
  image?: string
}

export interface Deal {
  name: string
  description: string
  until: string
  image?: string
  products: Product[]
}

/** Cómo se entrega la compra: retiro en la sucursal o con envío */
export type DeliveryMode = 'mostrador' | 'delivery'

export interface Business {
  id: number
  type: BusinessType
  chain: string
  branch: string
  name: string
  chainImage?: string
  image: string
  category: CategoryKey
  categoryLabel: string
  distance: string
  open: boolean
  lat: number
  lng: number
  address: string
  hours: string
  /** Solo cuando la API informa la modalidad de entrega */
  delivery?: DeliveryMode[]
  description: string
  web?: string
  deals: Deal[]
  hasOffers: boolean
  /** Texto en minúsculas para la búsqueda (negocio, cadena, sucursal, categoría, ofertas, productos) */
  search: string
}

export interface Offer {
  id: number
  type: BusinessType
  businessId: number
  store: string
  title: string
  description: string
  /** Solo en ofertas que vienen de la API */
  image?: string
  storeImage?: string
  until?: string
}

export interface Requested {
  id: number
  type: BusinessType
  category: CategoryKey
  businessId: number
  person: string
  service: string
  description: string
}
