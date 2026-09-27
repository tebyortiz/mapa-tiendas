export interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  /** Translucent dark glass for floating over the map */
  glass?: boolean;
  style?: React.CSSProperties;
}
export declare function SearchInput(props: SearchInputProps): JSX.Element;