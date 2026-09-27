export interface CategoryChipProps {
  label: string;
  /** Category key → Lucide icon via the confirmed mapping */
  category?: string;
  /** Explicit Lucide icon name (overrides category) */
  icon?: string;
  /** Theme of the active business-type view */
  type?: 'todas'|'tienda'|'servicio'|'emprendimiento';
  selected?: boolean;
  count?: number;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function CategoryChip(props: CategoryChipProps): JSX.Element;