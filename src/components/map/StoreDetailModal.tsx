import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Cake, MapPin, MessageCircle, Scissors, Smartphone, Sparkles, Store, Wrench, X } from 'lucide-react'
import type { CatalogType, MapPin as MapPinData } from '../../data/types'

const ICONS = { store: Store, wrench: Wrench, sparkles: Sparkles, scissors: Scissors, cake: Cake, smartphone: Smartphone }

const LABELS: Record<CatalogType, { noun: string; datos: string }> = {
  tiendas: { noun: 'TIENDA', datos: 'DATOS DE LA TIENDA' },
  servicios: { noun: 'SERVICIO', datos: 'DATOS DEL SERVICIO' },
  emprendimientos: { noun: 'EMPRENDIMIENTO', datos: 'DATOS DEL EMPRENDIMIENTO' },
}

interface Props {
  pin: MapPinData | null
  type: CatalogType
  onClose: () => void
}

export default function StoreDetailModal({ pin, type, onClose }: Props) {
  const labels = LABELS[type]
  const Icon = pin ? ICONS[pin.icon] : Store

  return (
    <AnimatePresence>
      {pin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3">
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${pin.gradient} shadow`}
              >
                <Icon size={26} className="text-white" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  {labels.noun}
                </p>
                <h3 className="font-display text-lg font-extrabold uppercase text-[#170c33]">
                  {pin.name}
                </h3>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-[#8b2fce]" /> {pin.address}
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle size={16} className="text-[#25d366]" /> {pin.whatsapp}
              </p>
            </div>

            <div className="mt-5 space-y-3 rounded-2xl bg-gray-50 p-4">
              <p className="font-display text-sm font-extrabold uppercase text-[#8b2fce]">
                {labels.datos}
              </p>

              <div className="flex items-center justify-between text-xs font-semibold text-[#170c33]">
                <span>¿POSEE {labels.noun} ONLINE?</span>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold text-white ${
                    pin.hasOnlineStore ? 'pill-gradient' : 'bg-gray-400'
                  }`}
                >
                  {pin.hasOnlineStore ? 'SI' : 'NO'}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#170c33]">
                <span>¿TIPO DE ENTREGA?</span>
                <span className="flex flex-wrap gap-1.5">
                  {pin.deliveryPickup && (
                    <span className="pill-gradient rounded-full px-3 py-1 text-[10px] font-bold text-white">
                      RETIRO EN SUCURSAL
                    </span>
                  )}
                  {pin.deliveryShipping && (
                    <span className="pill-gradient rounded-full px-3 py-1 text-[10px] font-bold text-white">
                      ENVÍOS
                    </span>
                  )}
                  {!pin.deliveryPickup && !pin.deliveryShipping && (
                    <span className="rounded-full bg-gray-400 px-3 py-1 text-[10px] font-bold text-white">
                      NO DISPONIBLE
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-[#170c33]">
                <span>¿TIENE OFERTAS VIGENTES?</span>
                <span className="flex items-center gap-1.5">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold text-white ${
                      pin.hasOffers ? 'pill-gradient' : 'bg-gray-400'
                    }`}
                  >
                    {pin.hasOffers ? 'SI' : 'NO'}
                  </span>
                  {pin.hasOffers && (
                    <span className="flex items-center gap-1 rounded-full bg-[#170c33] px-3 py-1 text-[10px] font-bold text-white">
                      DESCUBRIR <ArrowRight size={12} />
                    </span>
                  )}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="brand-gradient mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold uppercase text-white shadow-lg"
            >
              <Store size={18} /> Visitar {labels.noun.toLowerCase()} de {pin.name}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
