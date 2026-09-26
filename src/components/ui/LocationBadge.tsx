import { MapPin } from 'lucide-react'

export default function LocationBadge({ city = 'TUNUYÁN' }: { city?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#ec4899] shadow-md">
        <MapPin size={18} fill="currentColor" />
      </span>
      <span className="pill-gradient rounded-full px-4 py-1.5 text-xs font-bold tracking-wide text-white shadow-md">
        {city}
      </span>
    </div>
  )
}
