export type CatalogType = 'tiendas' | 'servicios' | 'emprendimientos'

export interface CatalogOption {
  type: CatalogType
  label: string
  singular: string
  image: string
  cta: string
}

export interface OfferCard {
  id: string
  storeLabel: string
  title: string
  image: string
  badge?: string
  accent: string
}

export interface RequestedCard {
  id: string
  personName: string
  personAvatar: string
  category: string
  description: string
  image: string
}

export interface MapPin {
  id: string
  name: string
  address: string
  whatsapp: string
  lat: number
  lng: number
  icon: 'store' | 'wrench' | 'sparkles' | 'scissors' | 'cake' | 'smartphone'
  gradient: string
  hasOnlineStore: boolean
  deliveryPickup: boolean
  deliveryShipping: boolean
  hasOffers: boolean
}
