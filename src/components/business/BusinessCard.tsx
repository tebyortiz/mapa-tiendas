import type { CSSProperties, MouseEvent } from 'react'
import type { BusinessType } from '../../data/types'
import { Badge } from '../ui/Badge'
import { Icon } from '../ui/Icon'
import { TYPE } from '../ui/typeTheme'
import { useHover } from '../ui/useHover'

export interface BusinessCardProps {
  type?: BusinessType
  name: string
  category?: string
  categoryLabel?: string
  distance?: string
  open?: boolean
  address?: string
  /** Foto de la sucursal */
  image?: string
  hasOffers?: boolean
  selected?: boolean
  onClick?: (e: MouseEvent) => void
  style?: CSSProperties
}

export function BusinessCard({ type = 'tienda', name, category, categoryLabel, distance, open, address, image, hasOffers, selected, onClick, style }: BusinessCardProps) {
  const { h, bind } = useHover()
  const t = TYPE[type] ?? TYPE.tienda
  return (
    <button
      type="button"
      onClick={onClick}
      {...bind}
      style={{ display: 'flex', gap: 10, alignItems: 'center', width: '100%', padding: 10, border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: 'var(--radius-card)', background: h || selected ? 'var(--surface-raised)' : 'var(--surface)', boxShadow: selected ? t.glow : 'inset 0 0 0 1px var(--border)', transition: 'background var(--dur-base), box-shadow var(--dur-base)', ...style }}
    >
      <div style={{ width: 64, height: 64, flex: 'none', borderRadius: 'var(--radius-sm)', background: image ? `url(${image}) center/cover` : t.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px rgba(${t.rgb},.5)` }}>
        {!image && <Icon category={category} size={26} color={t.a} />}
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ font: '800 16px/1.25 var(--font-body)', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0, overflow: 'hidden', whiteSpace: 'nowrap', font: '600 13px var(--font-body)', color: 'var(--text-muted)' }}>
          <Icon category={category} size={14} color={t.a} />
          {categoryLabel}
          {address && <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>· {address}</span>}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 2, flexWrap: 'nowrap', minWidth: 0 }}>
          {open != null && <Badge status={open ? 'abierto' : 'cerrado'}>{open ? 'Abierto' : 'Cerrado'}</Badge>}
          {distance && <Badge icon="map-pin">{distance}</Badge>}
          {hasOffers && <Badge type="todas" variant="solid" icon="badge-percent">Ofertas</Badge>}
        </div>
      </div>
      <Icon name="chevron-right" size={18} color="var(--text-subtle)" />
    </button>
  )
}
