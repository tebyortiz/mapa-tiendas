interface AppHeaderProps {
  title?: string
  subtitle?: string
}

export default function AppHeader({
  title = 'MAPA VIRTUAL',
  subtitle = 'Encontrarás los comercios y emprededores cercanos a tu ubicación, y conocer más información de éstos.',
}: AppHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-3xl font-extrabold tracking-wide text-white md:text-4xl">
        {title}
      </h1>
      <p className="mt-2 max-w-xl text-sm text-white/70 md:text-base">{subtitle}</p>
    </div>
  )
}
