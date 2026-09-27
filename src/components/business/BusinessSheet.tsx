import type { CSSProperties } from 'react'
import type { BusinessType, DeliveryMode } from '../../data/types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { IconButton } from '../ui/IconButton'
import { TYPE } from '../ui/typeTheme'

const LBL: Record<BusinessType, string> = { tienda: 'Tienda', servicio: 'Servicio', emprendimiento: 'Emprendimiento' }

export interface BusinessSheetProps {
  type?: BusinessType
  name: string
  chain?: string
  branch?: string
  chainImage?: string
  hasOffers?: boolean
  category?: string
  categoryLabel?: string
  image?: string
  description?: string
  address?: string
  hours?: string
  delivery?: DeliveryMode[]
  distance?: string
  open?: boolean
  onClose?: () => void
  onWeb?: () => void
  onDirections?: () => void
  style?: CSSProperties
}

export function BusinessSheet({ type = 'tienda', name, chain, branch, chainImage, category, categoryLabel, image, description, address, hours, delivery, distance, open, hasOffers, onClose, onWeb, onDirections, style }: BusinessSheetProps) {
  const t = TYPE[type] ?? TYPE.tienda
  const ch = chain || name
  const br = branch || name
  const ini = ch.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
  return (
    <div
      role="dialog"
      aria-label={br}
      style={{ position: 'relative', width: '100%', maxWidth: 420, borderRadius: 'var(--radius-sheet)', overflow: 'hidden', background: 'var(--surface)', boxShadow: `inset 0 0 0 1px rgba(${t.rgb},.45), 0 0 40px rgba(${t.rgb},.18)`, fontFamily: 'var(--font-body)', flex: 'none', ...style }}
    >
      <div style={{ height: 160, position: 'relative', background: image ? `url(${image}) center 30%/cover` : t.soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!image && <Icon category={category} size={48} color={t.a} />}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(18,18,28,0) 45%,var(--surface) 100%)' }} />
      </div>
      {onClose && <IconButton icon="x" label="Cerrar" variant="glass" size={40} onClick={onClose} style={{ position: 'absolute', top: 12, right: 12 }} />}
      <div style={{ padding: '4px 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Badge type={type} variant="solid">{LBL[type]}</Badge>
          {open != null && <Badge status={open ? 'abierto' : 'cerrado'}>{open ? 'Abierto' : 'Cerrado'}</Badge>}
          {distance && <Badge icon="map-pin">{distance}</Badge>}
          {hasOffers && <Badge type="todas" variant="solid" icon="badge-percent">Ofertas</Badge>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, flex: 'none', borderRadius: 999, background: chainImage ? `url(${chainImage}) center/contain no-repeat, #fff` : t.g, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '800 16px var(--font-body)', color: 'var(--text-on-accent)', boxShadow: `0 0 0 2px var(--surface), 0 0 0 3px rgba(${t.rgb},.7)` }}>
            {!chainImage && ini}
          </div>
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ font: '700 13px var(--font-body)', color: 'var(--text-muted)' }}>{ch}</div>
            <div style={{ font: '800 21px/1.2 var(--font-body)', color: '#fff' }}>{br}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 13px var(--font-body)', color: t.b }}>
          <Icon category={category} size={16} />
          {categoryLabel}
        </div>
        {description && <div style={{ font: '400 13px/1.5 var(--font-body)', color: 'var(--text-muted)' }}>{description}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          {address && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', font: '500 13px var(--font-body)', color: 'var(--text-body)' }}>
              <Icon name="map-pin" size={16} color="var(--text-muted)" />
              {address}
            </div>
          )}
          {hours && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', font: '500 13px var(--font-body)', color: 'var(--text-body)' }}>
              <Icon name="clock" size={16} color="var(--text-muted)" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {hours.split('\n').map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </div>
            </div>
          )}
          {delivery && delivery.length > 0 && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', font: '500 13px var(--font-body)', color: 'var(--text-body)' }}>
              <Icon name="shopping-bag" size={16} color="var(--text-muted)" />
              Entrega:
              {delivery.map((d) => (
                <Badge key={d} type={type}>{d === 'mostrador' ? 'En mostrador' : 'Con delivery'}</Badge>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {onWeb && <Button type={type} icon="globe" onClick={onWeb} style={{ flex: 1 }}>Visitar web</Button>}
          <Button variant="secondary" type={type} icon="navigation" onClick={onDirections} style={onWeb ? undefined : { flex: 1 }}>Cómo llegar</Button>
        </div>
      </div>
    </div>
  )
}
