import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { catalogOptions } from '../../data/catalog'

export default function CatalogVirtual() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#2b3fd6] via-[#6d2fc9] to-[#c53fb0] px-6 py-16 md:px-16">
      <img
        src="/mapas-tienda02.png"
        alt=""
        className="pointer-events-none absolute -top-6 right-6 w-40 opacity-90 md:w-52"
      />

      <div className="mx-auto max-w-7xl">
        <h2 className="font-display max-w-2xl text-4xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.35)] md:text-5xl">
          CATÁLOGO VIRTUAL
        </h2>
        <p className="mt-3 max-w-xl text-white/90">
          Selecciona la opción que deseas y explora los comercios y emprendedores cercanos a tu
          ubicación en el mapa.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {catalogOptions.map((option, i) => (
            <motion.button
              key={option.type}
              type="button"
              onClick={() => navigate(`/mapa/${option.type}`)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] text-left shadow-xl"
            >
              <img
                src={option.image}
                alt={option.singular}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 pb-6">
                <span className="font-display rounded-full bg-white/25 px-6 py-2 text-center text-lg font-extrabold uppercase tracking-wide text-white backdrop-blur-sm">
                  {option.label}
                </span>
                <span className="pill-gradient rounded-full px-6 py-2 text-xs font-bold tracking-wide text-white shadow-lg">
                  {option.cta}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
