import { ChevronLeft, ChevronRight, ShoppingCart, Tag } from 'lucide-react'
import { useRef } from 'react'
import { offers } from '../../data/offers'
import LocationBadge from '../ui/LocationBadge'

export default function FeaturedOffers() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-[#0e0721] px-6 py-16 md:px-16">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#4c5df8] opacity-25 blur-3xl" />
      <img
        src="/mapas-tienda03.png"
        alt=""
        className="pointer-events-none absolute right-6 top-2 w-40 opacity-90 md:w-52"
      />

      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-4xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] md:text-5xl">
          OFERTAS DESTACADAS
        </h2>
        <p className="mt-2 text-white/80">Te presentamos las ofertas vigentes en:</p>

        <div className="mt-4">
          <LocationBadge />
        </div>

        <div className="relative mt-8">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Anterior"
            className="pill-gradient absolute left-0 top-1/2 z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-lg"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>

          <div
            ref={scrollerRef}
            className="scrollbar-none flex gap-6 overflow-x-auto scroll-smooth pb-2"
          >
            {offers.map((offer) => (
              <article key={offer.id} className="w-[300px] flex-none">
                <div
                  className={`relative flex h-44 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-4 ${offer.accent}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold text-[#170c33]">
                      TU LOGO AQUÍ
                    </span>
                    {offer.badge && (
                      <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-extrabold text-[#170c33] shadow">
                        {offer.badge}
                      </span>
                    )}
                  </div>
                  <Tag className="self-center text-white/70" size={36} />
                  <p className="font-display text-sm font-bold leading-tight text-white">
                    {offer.title}
                  </p>
                </div>

                <p className="mt-3 text-xs font-bold tracking-wide text-white/60">
                  {offer.storeLabel}
                </p>
                <h3 className="brand-gradient-text mt-1 font-display text-lg font-extrabold uppercase leading-tight">
                  {offer.title}
                </h3>
                <button
                  type="button"
                  className="pill-gradient mt-3 rounded-full px-5 py-2 text-xs font-bold text-white shadow-md"
                >
                  VER PRODUCTOS
                </button>
              </article>
            ))}

            <article className="flex w-[300px] flex-none flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-[#d6249f] to-[#8b2fce] p-6 text-center shadow-xl">
              <ShoppingCart size={36} className="text-white" />
              <p className="font-display text-lg font-extrabold uppercase leading-tight text-white">
                Descubrí más ofertas
                <br />
                en tu zona
              </p>
              <button
                type="button"
                className="rounded-full bg-white px-6 py-2 text-xs font-bold text-[#8b2fce] shadow-md"
              >
                VER OFERTAS
              </button>
            </article>
          </div>

          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Siguiente"
            className="pill-gradient absolute right-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full shadow-lg"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}
