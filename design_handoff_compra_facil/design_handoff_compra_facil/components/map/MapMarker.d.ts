export interface MapMarkerProps {
  type?: 'tienda'|'servicio'|'emprendimiento';
  /** Category key → Lucide icon */
  category?: string;
  selected?: boolean;
  /** Business name; shown as a pill label when selected */
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function MapMarker(props: MapMarkerProps): JSX.Element;