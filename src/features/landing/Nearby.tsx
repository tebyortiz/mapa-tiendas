import { NeonHeading } from '../../components/brand/NeonHeading'
import { Reveal } from '../../components/brand/Reveal'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { ImageSlot } from '../../components/ui/ImageSlot'
import { useHScroll } from '../../components/ui/useHScroll'
import { useHover } from '../../components/ui/useHover'
import { BUSINESSES } from '../../data/businesses'
import type { Business } from '../../data/types'
import { useNearby } from '../../lib/nearbyStore'
import type { OpenMap } from './shared'

function NearbyStoreCard({ b, onClick }: { b: Business; onClick: () => void }) {
  const { h, bind } = useHover()
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      {...bind}
      style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', boxSizing: 'border-box', padding: 12, borderRadius: 'var(--radius-panel)', cursor: 'pointer', background: h ? 'var(--surface-raised)' : 'var(--surface)', boxShadow: h ? 'var(--glow-tienda)' : 'inset 0 0 0 1px var(--border)', transition: 'background var(--dur-base), box-shadow var(--dur-slow) var(--ease-out)' }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', borderRadius: 'var(--radius-card)', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(255,111,97,.45)' }}>
        <ImageSlot src={b.image} placeholder="Foto de la sucursal" style={{ position: 'absolute', inset: 0 }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 4px 4px', minWidth: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          {b.chainImage ? (
            <div style={{ width: 36, height: 36, flex: 'none', borderRadius: '50%', background: `url(${b.chainImage}) center/contain no-repeat, #fff`, boxShadow: '0 0 0 2px var(--surface), 0 0 0 3px rgba(255,111,97,.7)' }} />
          ) : (
            <ImageSlot shape="circle" placeholder="Logo" style={{ width: 36, height: 36, flex: 'none', borderRadius: '50%', boxShadow: '0 0 0 2px var(--surface), 0 0 0 3px rgba(255,111,97,.7)' }} />
          )}
          <span style={{ font: '700 13px var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.chain || b.name}</span>
        </div>
        <div style={{ font: '800 19px/1.2 var(--font-body)', color: '#fff' }}>{b.branch || b.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 14px var(--font-body)', color: 'var(--tienda-2)' }}>
          <Icon category={b.category} size={16} />
          {b.categoryLabel}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '500 13px var(--font-body)', color: 'var(--text-muted)', minWidth: 0 }}>
          <Icon name="map-pin" size={14} />
          <span className="nearby-addr" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.address}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 8 }}>
          <Badge status={b.open ? 'abierto' : 'cerrado'}>{b.open ? 'Abierto' : 'Cerrado'}</Badge>
          <Badge icon="map-pin">{b.distance}</Badge>
          {b.hasOffers && <Badge type="todas" variant="solid" icon="badge-percent">Ofertas</Badge>}
        </div>
        {b.delivery && b.delivery.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {b.delivery.map((d) => (
              <Badge key={d} type="tienda" icon={d === 'mostrador' ? 'store' : 'package'}>
                {d === 'mostrador' ? 'En mostrador' : 'Con delivery'}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function LandingNearby({ onOpenMap, geo }: { onOpenMap: OpenMap; geo: ReturnType<typeof useNearby> }) {
  const trackRef = useHScroll<HTMLDivElement>()
  const list = (geo.nearby?.businesses ?? BUSINESSES).filter((b) => b.type === 'tienda')
  return (
    <section id="cerca" className="lp-sec" style={{ position: 'relative', overflow: 'hidden', padding: '56px 0 72px', background: 'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.01))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(40% 55% at 8% 100%,rgba(250,110,78,.2),transparent 70%),radial-gradient(38% 50% at 92% 95%,rgba(164,116,245,.22),transparent 70%),radial-gradient(45% 40% at 55% 0%,rgba(79,169,238,.14),transparent 70%)' }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--gutter)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <NeonHeading as="h2" type="tienda">CERCA TUYO</NeonHeading>
        <Button variant="ghost" size="sm" iconRight="arrow-right" onClick={() => onOpenMap('tienda')} style={{ transform: 'translateY(-5px)' }}>Ver todo en el mapa</Button>
      </div>
      <div ref={trackRef} className="nearby-track" style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 16, overflowX: 'auto', overflowY: 'hidden', padding: '24px var(--gutter) 20px', scrollSnapType: 'x mandatory', scrollPaddingLeft: 'var(--gutter)', scrollbarWidth: 'none', maxWidth: 'var(--container)', margin: '0 auto' }}>
        {list.map((b, i) => (
          <div key={b.id} style={{ flex: '0 0 min(84vw,380px)', scrollSnapAlign: 'start', display: 'flex' }}>
            <Reveal i={i} fill><NearbyStoreCard b={b} onClick={() => onOpenMap(b.type, b.id)} /></Reveal>
          </div>
        ))}
      </div>
    </section>
  )
}
