export interface TextFieldProps {
  label?: string;
  hint?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
  id?: string;
  style?: React.CSSProperties;
}
export declare function TextField(props: TextFieldProps): JSX.Element;