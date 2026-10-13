import { useEffect, useState } from 'react'

/** Hora actual (ms) que se actualiza cada minuto: re-evalúa lo que depende del reloj, como las ofertas vigentes. */
export function useMinute() {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000)
    return () => clearInterval(id)
  }, [])
  return now
}
