export interface NeonHeadingProps {
  children?: React.ReactNode;
  as?: 'h1'|'h2'|'h3'|'div';
  /** Tints the halo with a business-type accent */
  type?: 'tienda'|'servicio'|'emprendimiento';
  size?: string|number;
  /** Neon power-on flicker the first time it enters view (skipped under reduced motion) */
  flicker?: boolean;
  style?: React.CSSProperties;
}
export declare function NeonHeading(props: NeonHeadingProps): JSX.Element;