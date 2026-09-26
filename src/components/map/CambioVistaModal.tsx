import { AnimatePresence, motion } from 'framer-motion'
import { Repeat } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { CatalogType } from '../../data/types'

const OPTIONS: { type: CatalogType; label: string; image: string }[] = [
  { type: 'servicios', label: 'SERVICIOS', image: '/image-servicio.png' },
  { type: 'emprendimientos', label: 'EMPRENDI-\nMIENTOS', image: '/image-emprendimiento.png' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function CambioVistaModal({ open, onClose }: Props) {
  const navigate = useNavigate()

  return (
    <AnimatePresence>
      {open && (
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
            className="w-full max-w-2xl rounded-[2rem] bg-gradient-to-br from-[#4c5df8] to-[#c53fb0] p-8 shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-display text-2xl font-extrabold uppercase text-white">
                Cambio de vista
              </h3>
              <Repeat className="text-white" size={22} />
            </div>
            <p className="mt-2 max-w-md text-sm font-semibold text-white/90">
              Por favor, selecciona la opción que deseas ver en el mapa:
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {OPTIONS.map((option) => (
                <div
                  key={option.type}
                  className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl"
                >
                  <img
                    src={option.image}
                    alt={option.label}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 pb-5">
                    <span className="whitespace-pre-line rounded-full bg-white/25 px-5 py-2 text-center font-display text-base font-extrabold uppercase text-white backdrop-blur-sm">
                      {option.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        navigate(`/mapa/${option.type}`)
                      }}
                      className="pill-gradient rounded-full px-6 py-2 text-xs font-bold text-white shadow-lg"
                    >
                      SELECCIONAR
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-white px-6 py-2 text-xs font-bold text-[#8b2fce] shadow-md"
              >
                VOLVER
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
