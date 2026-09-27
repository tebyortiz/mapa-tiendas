/**
 * Business detail modal / bottom sheet, fully themed by business type.
 * @startingPoint section="Map" subtitle="Business detail sheet themed by type" viewport="700x620"
 */
export interface BusinessSheetProps {
  type?: 'tienda'|'servicio'|'emprendimiento';
  name: string;
  /** Nombre de la cadena (arriba, junto al avatar) */
  chain?: string;
  /** Nombre de la sucursal (título) */
  branch?: string;
  /** Logo/imagen de la cadena para el avatar */
  chainImage?: string;
  hasOffers?: boolean;
  category?: string;
  categoryLabel?: string;
  /** Foto de la sucursal */
  image?: string;
  description?: string;
  address?: string;
  hours?: string;
  distance?: string;
  open?: boolean;
  onClose?: () => void;
  onWeb?: () => void;
  onDirections?: () => void;
  style?: React.CSSProperties;
}
export declare function BusinessSheet(props: BusinessSheetProps): JSX.Element;