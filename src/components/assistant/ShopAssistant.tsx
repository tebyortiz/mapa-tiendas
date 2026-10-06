import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { runProductSearch } from '../../lib/productSearch'
import { Icon } from '../ui/Icon'
import { IconButton } from '../ui/IconButton'
import { SearchInput, SEARCH_SUGGESTIONS } from '../ui/SearchInput'

/**
 * Asistente de compra (robot flotante) temporalmente oculto a pedido: se mantiene TODA la
 * lógica y el componente intactos; basta con poner esto en `true` para reactivarlo en
 * landing y mapa. El buscador de productos del hero/navbar usa el mismo endpoint, así que
 * la función de buscar productos sigue disponible aunque el robot no se muestre.
 */
export const SHOP_ASSISTANT_ENABLED: boolean = false

type Phase = 'idle' | 'loading' | 'empty' | 'error'

/** Avatar del asistente: canasta neón (rainbow) con cara de robot. */
function RobotAvatar({ size = 40 }: { size?: number }) {
  return (
    <span style={{ width: size, height: size, flex: 'none', borderRadius: 999, background: 'var(--rainbow-grad)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.3)' }}>
      <Icon name="bot" size={Math.round(size * 0.55)} color="#fff" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))' }} />
    </span>
  )
}

function Spinner({ size = 18 }: { size?: number }) {
  return (
    <span aria-hidden="true" style={{ width: size, height: size, flex: 'none', borderRadius: 999, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', display: 'inline-block', animation: 'cf-spin .7s linear infinite' }} />
  )
}

interface ShopAssistantProps {
  /** Centro de la búsqueda: en el mapa es el punto explorado; en la landing se omite (usa GPS/caché). */
  center?: { lat: number; lng: number }
}

export function ShopAssistant({ center }: ShopAssistantProps = {}) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [q, setQ] = useState('')
  const [err, setErr] = useState('')
  const inputRef = useRef<HTMLDivElement | null>(null)
  const canSearch = q.trim().length >= 2 && phase !== 'loading'

  // Cerrar con Escape mientras está abierto
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const run = async (e?: FormEvent) => {
    e?.preventDefault()
    const query = q.trim()
    if (query.length < 2 || phase === 'loading') return
    setErr('')
    setPhase('loading')

    const status = await runProductSearch(query, center)
    if (status === 'ok') {
      setOpen(false)
      setPhase('idle')
      navigate('/mapa')
    } else if (status === 'empty') {
      setPhase('empty')
    } else if (status === 'need-location') {
      setErr('Necesito tu ubicación para buscar productos cerca tuyo. Activá los permisos y probá otra vez.')
      setPhase('error')
    } else {
      setErr('Hubo un problema al buscar. Probá de nuevo en un momento.')
      setPhase('error')
    }
  }

  const speech =
    phase === 'loading'
      ? `Buscando “${q.trim()}” cerca tuyo…`
      : phase === 'empty'
        ? `No encontré “${q.trim()}” cerca tuyo. Probá con otro nombre o con menos palabras.`
        : phase === 'error'
          ? err
          : '¡Hola! Decime qué producto buscás y te muestro en el mapa dónde conseguirlo cerca tuyo.'

  return (
    <div className="shop-dock" style={{ position: 'fixed', zIndex: 850 }}>
      {open && (
        <>
          {/* Capa para cerrar al tocar fuera */}
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: -1 }} />
          <div
            ref={inputRef}
            className="shop-pop"
            role="dialog"
            aria-label="Asistente de compra"
            style={{
              position: 'absolute', right: 0, bottom: 'calc(100% + 12px)', width: 'min(360px, calc(100vw - 32px))',
              padding: 16, borderRadius: 'var(--radius-panel)', boxSizing: 'border-box',
              // Vidrio oscuro (bg black translúcido) con desenfoque, legible sobre mapa y landing
              background: 'rgba(10,10,16,.62)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.14), 0 18px 50px rgba(0,0,0,.5)',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <RobotAvatar />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ font: '800 15px var(--font-body)', color: '#fff' }}>Asistente de compra</div>
                <div style={{ font: '600 12px var(--font-body)', color: 'var(--text-muted)' }}>Productos de tiendas cercanas</div>
              </div>
              <IconButton icon="x" label="Cerrar" variant="ghost" size={36} onClick={() => setOpen(false)} />
            </div>

            {/* Globo de diálogo del robot */}
            <div
              role={phase === 'error' || phase === 'empty' ? 'alert' : undefined}
              style={{ font: '500 13px/1.45 var(--font-body)', color: phase === 'error' ? 'var(--cf-danger)' : 'var(--text-body)', background: 'rgba(255,255,255,.06)', borderRadius: 12, padding: '10px 12px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              {phase === 'loading' && <Spinner size={16} />}
              <span>{speech}</span>
            </div>

            <form onSubmit={run} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SearchInput
                glass
                value={q}
                onChange={(v) => { setQ(v); if (phase !== 'loading') setPhase('idle') }}
                placeholder="¿Qué producto buscás?"
                suggestions={SEARCH_SUGGESTIONS}
              />
              <button
                type="submit"
                disabled={!canSearch}
                style={{
                  height: 48, border: 'none', borderRadius: 'var(--radius-pill)', cursor: canSearch ? 'pointer' : 'not-allowed',
                  background: 'var(--rainbow-grad)', opacity: canSearch ? 1 : 0.5, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)',
                  font: '800 15px var(--font-body)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.25)', transition: 'opacity var(--dur-base)',
                }}
              >
                {phase === 'loading' ? <Spinner /> : <Icon name="search" size={18} color="#fff" />}
                {phase === 'loading' ? 'Buscando…' : 'Buscar'}
              </button>
            </form>
          </div>
        </>
      )}

      {/* Botón flotante del asistente */}
      <button
        type="button"
        className="shop-fab"
        aria-label={open ? 'Cerrar asistente de compra' : 'Abrir asistente de compra'}
        aria-expanded={open}
        title="Asistente de compra"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 60, height: 60, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 3,
          background: 'var(--rainbow-grad)', boxShadow: 'var(--glow-rainbow), 0 10px 26px rgba(0,0,0,.45)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto',
        }}
      >
        <span style={{ width: '100%', height: '100%', borderRadius: 999, background: 'var(--cf-black)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={open ? 'x' : 'bot'} size={28} color="#fff" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,.5))' }} />
        </span>
      </button>
    </div>
  )
}
