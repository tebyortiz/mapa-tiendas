export interface IconButtonProps {
  icon?: string;
  /** Required accessible label (Spanish) */
  label: string;
  variant?: 'surface'|'glass'|'ghost';
  size?: number;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;