import type { CSSProperties } from 'react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { IconButton } from '../ui/IconButton'
import { TYPE } from '../ui/typeTheme'

export interface AdminSheetProps {
  name: string
  image?: string
  address?: string
  distance?: string
  onClose?: () => void
  onDirections?: () => void
  style?: CSSProperties
}

const t = TYPE.tienda

/**
 * Ficha de un negocio sin tiendas (kind "admin"): solo foto del frente, nombre y dirección.
 * No muestra horarios, ofertas ni "Abierto/Cerrado" (esos datos todavía no existen) ni el
 * botón a la tienda online: el negocio aún no la armó.
 */
export function AdminSheet({ name, image, address, distance, onClose, onDirections, style }: AdminSheetProps) {
  return (
    <div
      role="dialog"
      aria-label={name}
      style={{ position: 'relative', width: '100%', maxWidth: 420, borderRadius: 'var(--radius-sheet)', overflow: 'hidden', background: 'var(--surface)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.3), 0 0 40px rgba(255,255,255,.1)', fontFamily: 'var(--font-body)', flex: 'none', ...style }}
    >
      {/* Altura acotada: es una foto del frente (a veces chica), no conviene mostrarla a pantalla completa */}
      <div style={{ height: 160, position: 'relative', background: image ? `url(${image}) center/cover` : t.soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!image && <Icon name="store" size={48} color={t.a} />}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(18,18,28,0) 45%,var(--surface) 100%)' }} />
      </div>
      {onClose && <IconButton icon="x" label="Cerrar" variant="glass" size={40} onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(18,18,28,.72)', color: '#fff', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.22)' }} />}
      <div style={{ padding: '4px 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Una sola fila: ícono de local en blanco, nombre y, al extremo derecho, la distancia */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 40, height: 40, flex: 'none', borderRadius: 999, padding: 2, background: '#fff', boxSizing: 'border-box', boxShadow: '0 0 12px rgba(255,255,255,.35)' }}>
            <span style={{ width: '100%', height: '100%', borderRadius: 999, background: 'var(--cf-black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="store" size={18} color="#fff" />
            </span>
          </span>
          <div style={{ flex: 1, minWidth: 0, font: '800 21px/1.2 var(--font-body)', color: '#fff', overflowWrap: 'anywhere' }}>{name}</div>
          {distance && <Badge icon="map-pin" style={{ flex: 'none' }}>{distance}</Badge>}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 0 4px', borderTop: '1px solid var(--border)', font: '500 13px var(--font-body)', color: address ? 'var(--text-body)' : 'var(--text-muted)' }}>
          <Icon name="map-pin" size={16} color="var(--text-muted)" />
          {address || 'Dirección no informada · ubicación marcada en el mapa'}
        </div>
        <Button variant="secondary" type="tienda" icon="navigation" onClick={onDirections} style={{ flex: 1 }}>Cómo llegar</Button>
      </div>
    </div>
  )
}
