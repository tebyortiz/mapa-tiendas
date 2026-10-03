import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { IconButton } from '../../components/ui/IconButton'
import { TYPE } from '../../components/ui/typeTheme'
import { fmtDistance } from '../../lib/geoApi'
import { fmtPrice, sourceLabel, type ProductHit, type SearchProduct } from '../../lib/productSearch'

const t = TYPE.tienda

function ProductRow({ p }: { p: SearchProduct }) {
  const hasDisc = p.discount > 0
  const perKg = p.saleMode === 'WEIGHT'
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ width: 54, height: 54, flex: 'none', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: p.image ? '#fff' : t.soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {p.image ? <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <Icon name="package" size={22} color={t.a} />}
      </div>
      <div style={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ font: '700 14px/1.25 var(--font-body)', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
        {(p.brand || p.category || p.section) && (
          <div style={{ font: '500 12px var(--font-body)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {[p.brand, p.category || p.section].filter(Boolean).join(' · ')}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ font: '800 15px var(--font-body)', color: t.b }}>{fmtPrice(p.finalPrice)}{perKg ? ' /kg' : ''}</span>
          {hasDisc && <span style={{ font: '500 12px var(--font-body)', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>{fmtPrice(p.price)}</span>}
          {hasDisc && <Badge type="todas" variant="solid" icon="badge-percent">-{p.discount}%</Badge>}
          {!p.inStock && <Badge status="cerrado">Sin stock</Badge>}
        </div>
      </div>
    </div>
  )
}

export interface ProductResultSheetProps {
  hit: ProductHit
  onClose: () => void
}

export function ProductResultSheet({ hit, onClose }: ProductResultSheetProps) {
  const b = hit.store
  const name = b.storeName || b.name
  const cover = hit.image
  const addr = [b.address?.raw, b.address?.city].filter(Boolean).join(', ')
  const web = b.storeUrl
  return (
    <div
      className="prs-root"
      role="dialog"
      aria-label={name}
      style={{ position: 'relative', width: '100%', maxWidth: 420, borderRadius: 'var(--radius-sheet)', overflow: 'hidden', background: 'var(--surface)', boxShadow: `inset 0 0 0 1px rgba(${t.rgb},.45), 0 0 40px rgba(${t.rgb},.18)`, fontFamily: 'var(--font-body)', flex: 'none', boxSizing: 'border-box' }}
    >
      <IconButton icon="x" label="Cerrar" variant="glass" size={40} onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, background: 'rgba(18,18,28,.72)', color: '#fff', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.22)' }} />

      {/* Header: en mobile queda fijo mientras la lista scrollea */}
      <div className="prs-head">
        <div style={{ height: 150, position: 'relative', background: cover ? `url(${cover}) center/cover` : t.soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!cover && <Icon name="package" size={48} color={t.a} />}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(18,18,28,0) 40%,var(--surface) 100%)' }} />
        </div>
        <div style={{ padding: '4px 20px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Badge type="tienda" variant="solid">{sourceLabel(hit.source)}</Badge>
            <Badge icon="map-pin">{fmtDistance(hit.distance)}</Badge>
            {hit.withinRadius && <Badge status="abierto">En tu zona</Badge>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, flex: 'none', borderRadius: 999, background: b.logo ? `url(${b.logo}) center/contain no-repeat, #fff` : t.g, boxShadow: `0 0 0 2px var(--surface), 0 0 0 3px rgba(${t.rgb},.7)` }} />
            <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ font: '700 13px var(--font-body)', color: 'var(--text-muted)' }}>Tienda</div>
              <div style={{ font: '800 21px/1.2 var(--font-body)', color: '#fff' }}>{name}</div>
            </div>
          </div>
          {addr && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', font: '500 13px var(--font-body)', color: 'var(--text-body)' }}>
              <Icon name="map-pin" size={16} color="var(--text-muted)" />
              {addr}
            </div>
          )}
          <div style={{ font: '800 13px var(--font-body)', letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            {hit.products.length === 1 ? '1 producto encontrado' : `${hit.products.length} productos encontrados`}
          </div>
        </div>
      </div>

      {/* Lista de productos: el área scrolleable en mobile (debajo de la línea del header) */}
      <div className="prs-scroll" style={{ padding: '0 20px' }}>
        {hit.products.map((p) => (
          <ProductRow key={p.productId} p={p} />
        ))}
      </div>

      {/* Footer: acciones, fijas abajo en mobile */}
      <div className="prs-foot" style={{ padding: '12px 20px 20px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {web && <Button type="tienda" icon="store" onClick={() => window.open(web, '_blank', 'noopener,noreferrer')} style={{ flex: 1 }}>Ver tienda</Button>}
        <Button variant="secondary" type="tienda" icon="navigation" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${hit.lat},${hit.lng}`, '_blank')} style={web ? undefined : { flex: 1 }}>Cómo llegar</Button>
      </div>
    </div>
  )
}
