import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Wordmark } from '../../components/brand/Wordmark'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { IconButton } from '../../components/ui/IconButton'
import { SearchInput } from '../../components/ui/SearchInput'

interface NavLinkDef {
  id: string
  label: string
  icon: string
  c: string
  c2: string
  rgb: string
  grad?: string
}

const NAV_LINKS: NavLinkDef[] = [
  { id: 'tiendas', label: 'Tiendas', icon: 'shopping-bag', c: 'var(--tienda)', c2: 'var(--tienda-2)', rgb: '255,111,97' },
  { id: 'servicios', label: 'Servicios', icon: 'wrench', c: 'var(--servicio)', c2: 'var(--servicio-2)', rgb: '61,139,255' },
  { id: 'emprendimientos', label: 'Emprendimientos', icon: 'sparkles', c: 'var(--emprendimiento)', c2: 'var(--emprendimiento-2)', rgb: '155,107,255' },
  { id: 'ofertas', label: 'Ofertas', icon: 'badge-percent', c: '#FFFFFF', c2: '#FFFFFF', rgb: '255,255,255', grad: 'var(--rainbow-grad)' },
]

function NeonNavLink({ l, i, base }: { l: NavLinkDef; i: number; base: string }) {
  const [on, setOn] = useState(false)
  const [k, setK] = useState(0)
  const enter = () => {
    setOn(true)
    setK((x) => x + 1)
  }
  const style = {
    position: 'relative' as const, display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 14px', borderRadius: 999,
    textDecoration: 'none', font: '700 14px var(--font-body)', color: on ? '#fff' : 'var(--text-body)', transition: 'color var(--dur-base)',
  }
  const inner = (
    <>
      <span aria-hidden="true" style={{ position: 'absolute', left: '12%', right: '12%', bottom: -2, height: 18, borderRadius: '50%', background: `radial-gradient(closest-side,rgba(${l.rgb},${on ? 0.75 : 0.28}),transparent)`, filter: 'blur(6px)', transition: 'background var(--dur-slow) var(--ease-out)', pointerEvents: 'none' }} />
      <span key={`i${k}`} className={on ? 'nav-tube-on' : 'nav-idle'} style={{ display: 'inline-flex', animationDelay: on ? '0ms' : `${i * 260 + 400}ms`, filter: on ? `drop-shadow(0 0 4px ${l.c}) drop-shadow(0 0 10px ${l.c})` : 'none', transition: 'filter var(--dur-base)' }}>
        <Icon name={l.icon} size={18} color={on ? l.c2 : l.c} />
      </span>
      <span className="nav-lbl-wrap" style={{ position: 'relative' }}>
        <span className="nav-lbl">{l.label}</span>
        <span key={`l${k}`} aria-hidden="true" className={on ? 'nav-tube-on' : 'nav-idle'} style={{ position: 'absolute', left: 0, right: 0, bottom: -7, height: 2, borderRadius: 2, background: l.grad ?? `linear-gradient(90deg,${l.c},${l.c2})`, opacity: on ? 1 : 0.45, boxShadow: on ? `0 0 6px ${l.c}, 0 0 14px ${l.c}, 0 0 26px rgba(${l.rgb},.6)` : `0 0 4px rgba(${l.rgb},.4)`, animationDelay: on ? '0ms' : `${i * 260 + 400}ms`, transition: 'opacity var(--dur-base), box-shadow var(--dur-base)' }} />
      </span>
    </>
  )
  const common = {
    'aria-label': l.label,
    title: l.label,
    className: `nav-link-${l.id}`,
    onMouseEnter: enter,
    onFocus: enter,
    onMouseLeave: () => setOn(false),
    onBlur: () => setOn(false),
    style,
  }
  // En la landing (base '') es un ancla de la misma página; desde el mapa navega a "/#id".
  return base ? (
    <Link to={`${base}#${l.id}`} {...common}>{inner}</Link>
  ) : (
    <a href={`#${l.id}`} {...common}>{inner}</a>
  )
}

/** Buscador del navbar (solo desktop): confirma con Enter o con el botón. */
function NavSearch({ query, onSearch }: { query: string; onSearch: (q: string) => void }) {
  const [draft, setDraft] = useState(query)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(draft)
  }
  return (
    <form className="nav-search" onSubmit={submit} style={{ gap: 8, alignItems: 'center' }}>
      <SearchInput glass value={draft} onChange={(v) => { setDraft(v); if (!v) onSearch('') }} placeholder="Buscar cerca tuyo…" style={{ flex: 1, minWidth: 0 }} />
      <Button htmlType="submit" type="todas" icon="search" style={{ height: 48, flex: 'none', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)' }}>Buscar</Button>
    </form>
  )
}

/** Sidebar del menú en mobile: logo, buscador, enlaces y cuenta. */
function NavDrawer({ base, search, onClose }: { base: string; search?: LandingNavProps['search']; onClose: () => void }) {
  const [draft, setDraft] = useState(search?.query ?? '')
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])
  const submit = (e: FormEvent) => {
    e.preventDefault()
    search?.onSearch(draft)
    onClose()
  }
  const linkStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 52, padding: '0 16px', borderRadius: 14, textDecoration: 'none', font: '700 16px var(--font-body)', color: 'var(--text-strong)', background: 'rgba(255,255,255,.04)' } as const
  const fixedSpacer = <div aria-hidden="true" style={{ flex: 'none', height: 24 }} />
  const introText = { margin: 0, font: '600 14px var(--font-body)', lineHeight: 1.4, color: 'var(--text-muted)' } as const
  return createPortal(
    <div className="nav-drawer-root" style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
      <div className="nav-drawer-scrim" onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }} />
      <aside role="dialog" aria-modal="true" aria-label="Menú" className="nav-drawer" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 'min(320px, 86vw)', display: 'flex', flexDirection: 'column', padding: 20, boxSizing: 'border-box', overflowY: 'auto', background: 'var(--bg)', borderRight: '1px solid var(--border-strong)', boxShadow: '0 0 40px rgba(164,116,245,.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16 }}>
          <Wordmark size={20} animated markStyle={{ transform: 'translateY(-6px)' }} />
          <IconButton icon="x" label="Cerrar menú" onClick={onClose} />
        </div>
        {search && (
          <>
            {fixedSpacer}
            <p style={introText}>¿Qué se te antoja hoy? Buscá y encontrá lo que necesitás, cerca tuyo.</p>
            <form onSubmit={submit} style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
              <SearchInput glass value={draft} onChange={(v) => { setDraft(v); if (!v) search.onSearch('') }} placeholder="Buscar cerca tuyo…" style={{ flex: 1, minWidth: 0 }} />
              <Button htmlType="submit" type="todas" icon="search" aria-label="Buscar" style={{ width: 48, padding: 0, flex: 'none', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)' }} />
            </form>
            {fixedSpacer}
          </>
        )}
        {!search && fixedSpacer}
        <p style={introText}>Explorá por categoría y descubrí qué hay cerca tuyo.</p>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
          {NAV_LINKS.map((l, i) => {
            const inner = (
              <>
                <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span className="nav-idle" style={{ display: 'inline-flex', animationDelay: `${i * 150}ms`, filter: `drop-shadow(0 0 5px ${l.c})` }}>
                    <Icon name={l.icon} size={22} color={l.c} />
                  </span>
                  {l.label}
                </span>
                <Icon name="chevron-right" size={18} color="rgba(255,255,255,.35)" />
              </>
            )
            return base ? (
              <Link key={l.id} to={`${base}#${l.id}`} onClick={onClose} style={linkStyle}>{inner}</Link>
            ) : (
              <a key={l.id} href={`#${l.id}`} onClick={onClose} style={linkStyle}>{inner}</a>
            )
          })}
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 16, font: '800 12px var(--font-body)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            <Icon name="user-round" size={16} /> Mi cuenta
          </div>
          <Button icon="log-in" fullWidth style={{ color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)' }}>Ingresar</Button>
          <Button variant="secondary" icon="user-plus" fullWidth>Crear cuenta</Button>
        </div>
      </aside>
    </div>,
    document.body,
  )
}

export interface LandingNavProps {
  onOpenMap?: () => void
  /** Prefijo de las anclas cuando el nav se usa fuera de la landing (p. ej. "/") */
  base?: string
  sticky?: boolean
  cta?: boolean
  /** Muestra el buscador en el navbar (solo desktop) */
  search?: { query: string; onSearch: (q: string) => void }
}

export function LandingNav({ onOpenMap, base = '', sticky = true, cta = true, search }: LandingNavProps) {
  const brand = <Wordmark size={18} />
  const [menu, setMenu] = useState(false)
  return (
    <header
      className="lp-nav-outer"
      style={{ position: sticky ? 'sticky' : 'relative', top: 0, zIndex: sticky ? 20 : 800, flex: 'none' }}
    >
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'rgba(7,7,13,.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)' }}
      />
      <div className="lp-nav" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, minHeight: 76, padding: '14px var(--gutter)' }}>
        <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button type="button" className="nav-burger" aria-label="Abrir menú" onClick={() => setMenu(true)} style={{ width: 44, height: 44, flex: 'none', alignItems: 'center', justifyContent: 'center', padding: 0, border: 'none', cursor: 'pointer', background: 'transparent' }}>
            <Icon name="list-sort-descending" size={30} color="#fff" style={{ filter: 'drop-shadow(0 0 3px #fff) drop-shadow(0 0 9px rgba(255,255,255,.8)) drop-shadow(0 0 18px rgba(255,255,255,.45))' }} />
          </button>
          {base ? (
            <Link to={`${base}#hero`} className="nav-brand" style={{ display: 'flex', textDecoration: 'none' }}>{brand}</Link>
          ) : (
            <a href="#hero" className="nav-brand" style={{ display: 'flex', textDecoration: 'none' }}>{brand}</a>
          )}
        </div>
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <nav className="lp-links" style={{ display: 'flex', gap: 6 }}>
            {NAV_LINKS.map((l, i) => <NeonNavLink key={l.id} l={l} i={i} base={base} />)}
          </nav>
          {search && !cta && <NavSearch query={search.query} onSearch={search.onSearch} />}
          {cta && (
            <button
              type="button"
              className="nav-cta"
              aria-label="Abrir mapa"
              title="Abrir mapa"
              onClick={onOpenMap}
              style={{ height: 44, flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 18px', border: 'none', borderRadius: 'var(--radius-pill)', cursor: 'pointer', background: 'var(--rainbow-grad)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.25)', font: '800 14px var(--font-body)', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)', whiteSpace: 'nowrap' }}
            >
              <Icon name="map" size={18} color="#fff" />
              <span className="nav-cta-label-desktop">abrir mapa</span>
              <span className="nav-cta-label-mobile">mapa</span>
            </button>
          )}
        </div>
      </div>
      {menu && <NavDrawer base={base} search={search} onClose={() => setMenu(false)} />}
    </header>
  )
}
