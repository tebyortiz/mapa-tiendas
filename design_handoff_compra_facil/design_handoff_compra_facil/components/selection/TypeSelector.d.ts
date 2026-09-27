export interface TypeOption { value: 'todas'|'tienda'|'servicio'|'emprendimiento'; label: string; icon: string; }
/**
 * Segmented switch between the three business-type views + "Todas".
 * @startingPoint section="Map" subtitle="Business-type segmented selector" viewport="700x200"
 */
export interface TypeSelectorProps {
  value?: 'todas'|'tienda'|'servicio'|'emprendimiento';
  onChange?: (value: string) => void;
  options?: TypeOption[];
  /** Mobile: only the active segment shows its label */
  compact?: boolean;
  /** Mobile: labels cortos, sin íconos, ocupa todo el ancho */
  dense?: boolean;
  style?: React.CSSProperties;
}
export declare function TypeSelector(props: TypeSelectorProps): JSX.Element;