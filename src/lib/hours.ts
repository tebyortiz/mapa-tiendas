// Cálculo de "abierto ahora" a partir del texto de horarios (API y mockups).
// Vive aparte para que lo usen geoApi y businesses sin ciclos de import.

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const DAY_IDX: Record<string, number> = { dom: 0, lun: 1, mar: 2, mie: 3, jue: 4, vie: 5, sab: 6 }

/** Días (0=dom … 6=sáb) cubiertos por un texto: "Lun a Vie", "Mar a Sáb", "Todos los días", "Sáb". */
const daysCovered = (dayText: string): Set<number> => {
  const d = normalize(dayText)
  const set = new Set<number>()
  if (/todos los dias|todos|diario/.test(d)) {
    for (let i = 0; i < 7; i++) set.add(i)
    return set
  }
  const range = d.match(/(dom|lun|mar|mie|jue|vie|sab)\s*a\s*(dom|lun|mar|mie|jue|vie|sab)/)
  if (range) {
    for (let i = DAY_IDX[range[1]]; ; i = (i + 1) % 7) {
      set.add(i)
      if (i === DAY_IDX[range[2]]) break
    }
    return set
  }
  d.match(/dom|lun|mar|mie|jue|vie|sab/g)?.forEach((s) => set.add(DAY_IDX[s]))
  return set
}

/** Rangos horarios en minutos. Acepta API ("10:00-12:00,18:00-22:00") y mockups ("8 a 22", "9 a 13 y 17 a 21"). */
const parseRanges = (s: string): [number, number][] => {
  const ranges: [number, number][] = []
  const re = /(\d{1,2})(?::(\d{2}))?\s*(?:a|-|–|—)\s*(\d{1,2})(?::(\d{2}))?/g
  let m: RegExpExecArray | null
  while ((m = re.exec(s))) {
    const start = +m[1] * 60 + (m[2] ? +m[2] : 0)
    let end = +m[3] * 60 + (m[4] ? +m[4] : 0)
    if (end === 0) end = 24 * 60
    ranges.push([start, end])
  }
  return ranges
}

/**
 * Para el API: horarios por objeto { weekday (Lun–Vie), saturday (Sáb) } en formato
 * "HH:MM-HH:MM,HH:MM-HH:MM" (ttv y gesto). Domingo o día sin horario → cerrado.
 */
export const isOpenApi = (hours?: { weekday?: string; saturday?: string }, now = new Date()): boolean | undefined => {
  if (!hours || (!hours.weekday && !hours.saturday)) return undefined
  const day = now.getDay() // 0 domingo … 6 sábado
  const sched = day === 6 ? hours.saturday : day === 0 ? '' : hours.weekday
  if (!sched) return false // la tienda tiene horarios, pero no para hoy
  if (/24\s*h/i.test(sched)) return true
  const ranges = parseRanges(sched)
  if (!ranges.length) return undefined
  const mins = now.getHours() * 60 + now.getMinutes()
  return ranges.some(([a, b]) => (b > a ? mins >= a && mins < b : mins >= a || mins < b))
}

/**
 * ¿Está abierto ahora según el texto de horarios? Entiende día + rango horario
 * ("Lun a Vie · 8 a 22 h", "24 h", "Todos los días · 9 a 13 y 17 a 21 h", varias líneas).
 * Devuelve undefined solo si no puede interpretar nada (para no decidir por las dudas).
 */
export const isOpen = (hoursText?: string, now = new Date()): boolean | undefined => {
  if (!hoursText) return undefined
  const day = now.getDay()
  const mins = now.getHours() * 60 + now.getMinutes()
  let parsed = false
  for (const line of hoursText.split('\n').map((l) => l.trim()).filter(Boolean)) {
    const i = line.indexOf('·')
    const dayText = i >= 0 ? line.slice(0, i) : ''
    const timeText = i >= 0 ? line.slice(i + 1) : line
    const days = dayText ? daysCovered(dayText) : new Set([0, 1, 2, 3, 4, 5, 6])
    if (days.size) parsed = true
    if (!days.has(day)) continue
    if (/24\s*h/i.test(timeText)) return true
    if (parseRanges(timeText).some(([a, b]) => (b > a ? mins >= a && mins < b : mins >= a || mins < b))) return true
  }
  return parsed ? false : undefined
}
