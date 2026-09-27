export interface BadgeProps {
  children?: React.ReactNode;
  type?: 'todas'|'tienda'|'servicio'|'emprendimiento';
  status?: 'abierto'|'cerrado';
  icon?: string;
  variant?: 'soft'|'solid';
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;