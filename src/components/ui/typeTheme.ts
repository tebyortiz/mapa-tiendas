import type { TypeKey } from '../../data/types'

export interface TypeTheme {
  a: string
  b: string
  g: string
  soft: string
  glow: string
  rgb: string
}

export const TYPE: Record<TypeKey, TypeTheme> = {
  tienda: { a: 'var(--tienda)', b: 'var(--tienda-2)', g: 'var(--tienda-grad)', soft: 'var(--tienda-soft)', glow: 'var(--glow-tienda)', rgb: '255,111,97' },
  servicio: { a: 'var(--servicio)', b: 'var(--servicio-2)', g: 'var(--servicio-grad)', soft: 'var(--servicio-soft)', glow: 'var(--glow-servicio)', rgb: '61,139,255' },
  emprendimiento: { a: 'var(--emprendimiento)', b: 'var(--emprendimiento-2)', g: 'var(--emprendimiento-grad)', soft: 'var(--emprendimiento-soft)', glow: 'var(--glow-emprendimiento)', rgb: '155,107,255' },
  todas: { a: '#FFFFFF', b: '#FFFFFF', g: 'var(--rainbow-grad)', soft: 'rgba(255,255,255,.08)', glow: 'var(--glow-rainbow)', rgb: '255,255,255' },
}
