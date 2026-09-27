import type { BusinessType, CategoryKey } from '../../data/types'
import { Icon } from '../ui/Icon'

export function TypeAvatar({ type, category, size = 36 }: { type: BusinessType; category?: CategoryKey | string; size?: number }) {
  const grad = `var(--${type}-grad)`
  const acc = `var(--${type})`
  return (
    <span style={{ width: size, height: size, flex: 'none', borderRadius: 999, padding: 2, background: grad, boxSizing: 'border-box', boxShadow: `0 0 12px ${acc}` }}>
      <span style={{ width: '100%', height: '100%', borderRadius: 999, background: 'var(--cf-black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon category={category} size={Math.round(size * 0.44)} color={acc} />
      </span>
    </span>
  )
}
