import { motion } from 'framer-motion'
import LocationBadge from '../ui/LocationBadge'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_#3b1f6b_0%,_#170c33_55%,_#0e0721_100%)] px-6 pb-20 pt-10 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 md:flex-row">
        <div className="flex-1">
          <img src="/logo-ttv2.png" alt="Tu Tienda Virtual" className="h-12 w-auto" />

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display mt-6 text-5xl font-extrabold leading-[1.05] text-white drop-shadow-[0_0_25px_rgba(147,51,234,0.55)] md:text-6xl"
          >
            COMPRÁ
            <br />
            FÁCIL
          </motion.h1>

          <p className="mt-3 font-display text-xl font-bold text-[#ec4899] md:text-2xl">
            EXPLORA TU CIUDAD
          </p>

          <div className="mt-6">
            <LocationBadge />
          </div>

          <div className="mt-8 grid gap-6 text-sm text-white/85 md:grid-cols-2 md:text-base">
            <p>
              ¡ <span className="font-semibold text-[#c084fc]">Bienvenido a Compr&aacute; F&aacute;cil</span> !
              <br />
              Nuestra plataforma te permite explorar los{' '}
              <span className="font-semibold text-[#c084fc]">Comercios</span> y{' '}
              <span className="font-semibold text-[#c084fc]">Emprendedores</span> cercanos a tu{' '}
              <span className="font-semibold text-[#c084fc]">ubicación</span>, ver ofertas en tu zona y
              conectar con emprendedores
            </p>
            <p>
              Podrás comprar en <span className="font-semibold text-[#c084fc]">tiendas virtuales</span>{' '}
              de comercios cercanos, o <span className="font-semibold text-[#c084fc]">conectar</span> con
              emprendedores.
              <br />
              Además podrás descubrir ofertas, ver reseñas de servicios, etc.
              <br />
              <span className="font-semibold text-[#c084fc]">
                ¡Encontrar ofertas locales nunca fue tan sencillo!
              </span>
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex-1"
        >
          <img src="/mapas-tienda01.png" alt="" className="mx-auto w-full max-w-lg drop-shadow-2xl" />
        </motion.div>
      </div>
    </section>
  )
}
