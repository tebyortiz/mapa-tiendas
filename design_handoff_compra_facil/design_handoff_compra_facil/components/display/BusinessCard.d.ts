export interface BusinessCardProps {
  type?: 'tienda'|'servicio'|'emprendimiento';
  name: string;
  category?: string;
  categoryLabel?: string;
  distance?: string;
  open?: boolean;
  address?: string;
  /** Foto de la sucursal */
  image?: string;
  /** Muestra el chip "Ofertas" */
  hasOffers?: boolean;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function BusinessCard(props: BusinessCardProps): JSX.Element;