export interface IconProps {
  /** Lucide icon name (kebab-case), e.g. "map-pin" */
  name?: string;
  /** Category key; overrides name with the confirmed mapping */
  category?: 'supermercado'|'restaurant'|'ferreteria'|'ropa'|'electronica'|'farmacia'|'automotriz'|'mascotas'|'hogar'|'entretenimiento'|'otros';
  size?: number;
  color?: string;
  /** Accessible label; omit for decorative icons */
  label?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;