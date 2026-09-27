export interface ToastProps {
  children?: React.ReactNode;
  icon?: string;
  tone?: 'neutral'|'success'|'danger';
  action?: string;
  onAction?: () => void;
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;