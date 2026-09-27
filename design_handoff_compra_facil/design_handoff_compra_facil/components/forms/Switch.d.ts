export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  type?: 'todas'|'tienda'|'servicio'|'emprendimiento';
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;