import type { ReactNode } from 'react'
import { GlowBackdrop } from '../../components/brand/GlowBackdrop'
import { NeonHeading } from '../../components/brand/NeonHeading'
import { Wordmark } from '../../components/brand/Wordmark'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'

export function LandingJoin() {
  return (
    <section id="sumate" className="lp-sec" style={{ position: 'relative', overflow: 'hidden', padding: '72px var(--gutter)' }}>
      <GlowBackdrop palette="tienda" intensity={0.3} />
      <div className="lp-join" style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container)', margin: '0 auto', display: 'grid', gap: 28, alignItems: 'center', padding: 28, borderRadius: 'var(--radius-panel)', background: 'var(--surface)', boxShadow: 'inset 0 0 0 1px var(--border)' }}>
        <img src="/assets/illustrations/storefront-check.png" alt="" style={{ width: '100%', maxWidth: 280, justifySelf: 'center' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <NeonHeading as="h2" type="tienda" size="var(--fs-h1)">SUMÁ TU COMERCIO</NeonHeading>
          <p style={{ margin: 0, font: '500 16px/1.55 var(--font-body)', color: 'var(--text-muted)', maxWidth: 480 }}>
            Que te encuentren los vecinos que están a pocas cuadras. Cargás tu negocio una vez y aparecés en el mapa.
          </p>
          <div><Button type="tienda" size="lg" icon="store">Sumar mi comercio</Button></div>
        </div>
      </div>
    </section>
  )
}

interface FooterLink {
  label: string
  href: string
  soon?: boolean
}

const FOOTER_EXPLORE: FooterLink[] = [
  { label: 'Tiendas', href: '#tiendas' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Emprendimientos', href: '#emprendimientos' },
  { label: 'Ofertas', href: '#ofertas', soon: true },
  { label: 'Sumá tu comercio', href: '#sumate' },
]

const FOOTER_SUPPORT: FooterLink[] = [
  { label: 'Cómo funciona', href: '#hero' },
  { label: 'Preguntas frecuentes', href: '#', soon: true },
  { label: 'Términos y condiciones', href: '#', soon: true },
  { label: 'Política de privacidad', href: '#', soon: true },
]

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <p style={{ margin: '0 0 8px', font: '800 11px var(--font-body)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>{title}</p>
      {links.map((l) =>
        l.soon ? (
          <span key={l.label} title="Próximamente" style={{ padding: '6px 0', font: '500 14px var(--font-body)', color: 'var(--text-muted)', opacity: 0.5, cursor: 'default' }}>{l.label}</span>
        ) : (
          <a key={l.label} href={l.href} className="footer-link" style={{ padding: '6px 0', font: '500 14px var(--font-body)', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color var(--dur-base)' }}>{l.label}</a>
        ),
      )}
    </div>
  )
}

// lucide-react ya no incluye íconos de marca, así que van como SVG inline.
const BRAND_SVG: Record<string, ReactNode> = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14.5 8.5h2V5.5h-2.4C12 5.5 11 7 11 9v1.8H9v3h2V22h3v-8.2h2.3l.5-3H14v-1.5c0-.6.3-.8.9-.8Z" fill="currentColor" stroke="none" />,
  whatsapp: <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3Zm4.9 12.4c-.2.6-1.2 1.1-1.7 1.1-.4 0-1 .1-3.2-.9-2.3-1-3.7-3.4-3.8-3.6-.1-.2-.9-1.2-.9-2.3s.6-1.6.8-1.9c.2-.2.4-.3.6-.3h.4c.2 0 .4 0 .6.5l.7 1.7c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.1.2.6 1 1.4 1.7 1 .8 1.7 1 1.9 1.1.2.1.4.1.5-.1l.6-.8c.2-.2.3-.2.6-.1l1.6.8c.3.1.4.2.5.3.1.2.1.6-.1 1.2Z" fill="currentColor" stroke="none" />,
}

function SocialLink({ brand, label, href }: { brand: keyof typeof BRAND_SVG; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="footer-social"
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', color: 'var(--text-muted)', background: 'rgba(255,255,255,.04)', boxShadow: 'inset 0 0 0 1px var(--border-strong)', textDecoration: 'none', transition: 'color var(--dur-base), box-shadow var(--dur-base), transform var(--dur-fast) var(--ease-out)' }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {BRAND_SVG[brand]}
      </svg>
    </a>
  )
}

function ContactRow({ icon, children, href }: { icon: string; children: ReactNode; href?: string }) {
  const content = (
    <>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, flex: 'none', borderRadius: 9, background: 'rgba(255,255,255,.05)', boxShadow: 'inset 0 0 0 1px var(--border)' }}>
        <Icon name={icon} size={15} color="var(--cf-rb-sky)" />
      </span>
      <span style={{ font: '500 14px/1.4 var(--font-body)', color: 'var(--text-muted)' }}>{children}</span>
    </>
  )
  const style = { display: 'flex', alignItems: 'center', gap: 12, padding: '5px 0', textDecoration: 'none' } as const
  return href ? (
    <a href={href} className="footer-contact" style={style}>{content}</a>
  ) : (
    <div style={style}>{content}</div>
  )
}

export function LandingFooter() {
  return (
    <footer style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-sunken)', borderTop: '1px solid var(--border)' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: -140, left: '50%', transform: 'translateX(-50%)', width: 'min(900px, 120%)', height: 280, background: 'radial-gradient(60% 100% at 50% 0%, rgba(164,116,245,.16), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto', padding: '56px var(--gutter) 0' }}>
        <div className="lp-footer-grid" style={{ display: 'grid', gap: 36 }}>
          {/* Marca */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Wordmark size={20} />
            <p style={{ margin: 0, maxWidth: 320, font: '500 14px/1.6 var(--font-body)', color: 'var(--text-muted)' }}>
              El mapa de tu ciudad: encontrá tiendas, servicios y emprendimientos cerca tuyo y comprá fácil.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <SocialLink brand="instagram" label="Instagram" href="https://instagram.com" />
              <SocialLink brand="facebook" label="Facebook" href="https://facebook.com" />
              <SocialLink brand="whatsapp" label="WhatsApp" href="https://wa.me/5492610000000" />
            </div>
          </div>
          {/* Explorar */}
          <FooterColumn title="Explorá" links={FOOTER_EXPLORE} />
          {/* Soporte */}
          <FooterColumn title="Soporte" links={FOOTER_SUPPORT} />
          {/* Contacto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ margin: '0 0 8px', font: '800 11px var(--font-body)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>Contacto</p>
            <ContactRow icon="mail" href="mailto:hola@comprafacil.app">hola@comprafacil.app</ContactRow>
            <ContactRow icon="phone" href="tel:+5492610000000">+54 9 261 000-0000</ContactRow>
            <ContactRow icon="map-pin">Tunuyán, Mendoza — Argentina</ContactRow>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="lp-footer-bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginTop: 44, padding: '20px 0 28px', borderTop: '1px solid var(--border)' }}>
          <div style={{ font: '500 13px var(--font-body)', color: 'var(--text-subtle)' }}>
            © {new Date().getFullYear()} Comprá Fácil · Hecho en Tunuyán, Mendoza.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ font: '700 10px var(--font-body)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-subtle)', whiteSpace: 'nowrap' }}>Sitio creado por</span>
            <a href="https://clarusrock.com" target="_blank" rel="noopener noreferrer" aria-label="Clarus Rock" style={{ display: 'inline-flex' }}>
              <img src="/clarus-rock-white.svg" alt="Clarus Rock" className="footer-clarus" style={{ height: 30, width: 'auto', objectFit: 'contain', opacity: 0.75, transition: 'opacity var(--dur-base)' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
