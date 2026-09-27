export interface GlowBackdropProps {
  /** Blob colors: rainbow (neutral) or a single business type */
  palette?: 'rainbow'|'tienda'|'servicio'|'emprendimiento';
  /** Blob opacity 0–1 */
  intensity?: number;
  /** Layered scroll parallax (disabled under reduced motion) */
  parallax?: boolean;
  style?: React.CSSProperties;
}
export declare function GlowBackdrop(props: GlowBackdropProps): JSX.Element;