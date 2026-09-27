/**
 * Pill button. Primary = gradient fill with dark ink text (AA on every accent).
 * @startingPoint section="Actions" subtitle="Pill CTA — rainbow or type-themed gradient" viewport="700x260"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary'|'secondary'|'ghost'|'glass';
  /** Business type theme; 'todas' = rainbow (neutral) */
  type?: 'todas'|'tienda'|'servicio'|'emprendimiento';
  size?: 'sm'|'md'|'lg';
  /** Lucide icon name before label */
  icon?: string;
  iconRight?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;