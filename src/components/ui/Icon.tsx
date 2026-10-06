import type { CSSProperties, ComponentType } from 'react'
import {
  Apple, Beef, Candy, Croissant, Package, ShoppingBasket,
  ArrowRight, BadgePercent, Bot, Bone, BriefcaseMedical, CalendarClock, Cake, CarFront, ChevronDown, ChevronLeft,
  ChevronRight, ChevronUp, Clock, ConciergeBell, Dog, Droplets, Footprints, Gamepad2, Gift, Globe, Hammer,
  HandPlatter, Headphones, KeyRound, LayoutGrid, ListSortDescending, LocateFixed, LogIn, Mail, Map, MapPin, MapPinned, MessageCircle, Minus,
  Navigation, Palette, Phone, Pizza, Plus, Scissors, Search, Shirt, ShoppingBag, Signpost, Smartphone, Sofa, Sparkles, Store,
  Tag, UserPlus, UserRound, UtensilsCrossed, Wrench, X, Zap,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { CategoryKey } from '../../data/types'

const ICONS: Record<string, ComponentType<LucideProps>> = {
  apple: Apple,
  beef: Beef,
  candy: Candy,
  croissant: Croissant,
  package: Package,
  'shopping-basket': ShoppingBasket,
  'arrow-right': ArrowRight,
  'badge-percent': BadgePercent,
  bot: Bot,
  bone: Bone,
  'briefcase-medical': BriefcaseMedical,
  'calendar-clock': CalendarClock,
  cake: Cake,
  'car-front': CarFront,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  clock: Clock,
  'concierge-bell': ConciergeBell,
  droplets: Droplets,
  mail: Mail,
  phone: Phone,
  gift: Gift,
  'key-round': KeyRound,
  palette: Palette,
  scissors: Scissors,
  'utensils-crossed': UtensilsCrossed,
  zap: Zap,
  dog: Dog,
  footprints: Footprints,
  'gamepad-2': Gamepad2,
  globe: Globe,
  hammer: Hammer,
  'hand-platter': HandPlatter,
  headphones: Headphones,
  'layout-grid': LayoutGrid,
  'list-sort-descending': ListSortDescending,
  'log-in': LogIn,
  'user-plus': UserPlus,
  'user-round': UserRound,
  'locate-fixed': LocateFixed,
  map: Map,
  'map-pin': MapPin,
  'map-pinned': MapPinned,
  'message-circle': MessageCircle,
  minus: Minus,
  navigation: Navigation,
  pizza: Pizza,
  plus: Plus,
  search: Search,
  shirt: Shirt,
  'shopping-bag': ShoppingBag,
  signpost: Signpost,
  smartphone: Smartphone,
  sofa: Sofa,
  sparkles: Sparkles,
  store: Store,
  tag: Tag,
  wrench: Wrench,
  x: X,
}

const CATEGORY_ICONS: Record<CategoryKey, string> = {
  supermercado: 'store',
  restaurant: 'hand-platter',
  ferreteria: 'wrench',
  ropa: 'shirt',
  electronica: 'headphones',
  farmacia: 'briefcase-medical',
  mecanica: 'car-front',
  plomeria: 'droplets',
  barberia: 'scissors',
  electricidad: 'zap',
  cerrajeria: 'key-round',
  comida: 'utensils-crossed',
  pasteleria: 'cake',
  souvenirs: 'gift',
  catering: 'concierge-bell',
  artesanias: 'palette',
  mascotas: 'dog',
  hogar: 'sofa',
  entretenimiento: 'gamepad-2',
  automotriz: 'car-front',
  despensa: 'package',
  kiosco: 'candy',
  minimarket: 'shopping-basket',
  verduleria: 'apple',
  carniceria: 'beef',
  panaderia: 'croissant',
  otros: 'store',
}

export interface IconProps {
  /** Nombre Lucide (kebab-case), p. ej. "map-pin" */
  name?: string
  /** Clave de categoría; pisa a `name` con el mapeo confirmado */
  category?: CategoryKey | string
  size?: number
  color?: string
  label?: string
  style?: CSSProperties
}

export function Icon({ name = 'store', category, size = 20, color = 'currentColor', label, style }: IconProps) {
  const n = category ? (CATEGORY_ICONS[category as CategoryKey] ?? 'store') : name
  const Cmp = ICONS[n] ?? Store
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ display: 'inline-flex', flex: 'none', width: size, height: size, color, ...style }}
    >
      <Cmp size={size} strokeWidth={2} style={{ display: 'block' }} />
    </span>
  )
}
