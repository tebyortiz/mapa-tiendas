import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { requested } from '../../data/requested'
import LocationBadge from '../ui/LocationBadge'

export default function MostRequested() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#2b1f6b] via-[#4c2fc9] to-[#6d2fc9] px-6 py-16 md:px-16">
      <img
        src="/mapas-tienda04.png"
        alt=""
        className="pointer-events-none absolute -left-4 top-6 w-24 opacity-80 md:w-32"
      />

      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] md:text-5xl">
            MÁS SOLICITADOS
          </h2>
          <button
            type="button"
            className="hidden items-center gap-1 text-sm font-semibold text-white/90 hover:text-white md:flex"
          >
            ver todos <ChevronRight size={18} />
          </button>
        </div>
        <p className="mt-2 text-white/80">Los servicios o emprendimientos más demandados en:</p>

        <div className="mt-4">
          <LocationBadge />
        </div>

        <div className="relative mt-8">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg"
          >
            <ChevronLeft size={20} className="text-[#6d2fc9]" />
          </button>

          <div
            ref={scrollerRef}
            className="scrollbar-none flex gap-6 overflow-x-auto scroll-smooth pb-2"
          >
            {requested.map((item) => (
              <article
                key={item.id}
                className="relative w-[320px] flex-none overflow-hidden rounded-2xl bg-[#170c33] shadow-xl"
              >
                <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full bg-black/50 py-1 pl-1 pr-3 backdrop-blur-sm">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#4c5df8] to-[#ec4899] text-[10px] font-bold text-white">
                    {item.personAvatar}
                  </span>
                  <span className="text-xs font-bold text-white">{item.personName}</span>
                </div>

                <div className="h-40 w-full bg-gradient-to-br from-[#3d2a63] to-[#170c33]" />

                <div className="p-4">
                  <h3 className="font-display text-lg font-extrabold uppercase text-white">
                    {item.category}
                  </h3>
                  <p className="mt-1 text-xs text-white/70">{item.description}</p>
                  <button
                    type="button"
                    className="pill-gradient mt-3 rounded-full px-5 py-2 text-xs font-bold text-white shadow-md"
                  >
                    CONECTAR
                  </button>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full bg-white shadow-lg"
          >
            <ChevronRight size={20} className="text-[#6d2fc9]" />
          </button>
        </div>
      </div>
    </section>
  )
}
