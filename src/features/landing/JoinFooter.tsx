import { GlowBackdrop } from '../../components/brand/GlowBackdrop'
import { NeonHeading } from '../../components/brand/NeonHeading'
import { Wordmark } from '../../components/brand/Wordmark'
import { Button } from '../../components/ui/Button'

export function LandingJoin() {
  return (
    <section className="lp-sec" style={{ position: 'relative', overflow: 'hidden', padding: '72px var(--gutter)' }}>
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

export function LandingFooter() {
  return (
    <footer style={{ padding: '32px var(--gutter) 48px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <Wordmark size={16} />
        <div style={{ font: '500 13px var(--font-body)', color: 'var(--text-subtle)' }}>Hecho en Tunuyán, Mendoza.</div>
      </div>
    </footer>
  )
}
