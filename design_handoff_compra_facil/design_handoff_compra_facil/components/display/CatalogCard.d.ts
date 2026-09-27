/**
 * Tall full-bleed photo card: neon type title on a 20% glass plate + gradient "VER MAPA" pill over the photo; description sits below the image. One per business type.
 * @startingPoint section="Landing" subtitle="Photo + glass catalog card" viewport="700x420"
 */
export interface CatalogCardProps {
  type?: 'tienda'|'servicio'|'emprendimiento';
  title: string;
  /** Shown below the image, never over it */
  description?: string;
  /** Neon-lit photo URL */
  image: string;
  cta?: string;
  height?: number;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function CatalogCard(props: CatalogCardProps): JSX.Element;