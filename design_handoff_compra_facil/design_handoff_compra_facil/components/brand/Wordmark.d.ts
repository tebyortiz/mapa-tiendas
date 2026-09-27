export interface WordmarkProps {
  /** Font size of the wordmark in px */
  size?: number;
  /** Show the rainbow basket mark */
  withMark?: boolean;
  stacked?: boolean;
  /** Path to basket-mark.png relative to the consuming page */
  markSrc?: string;
  style?: React.CSSProperties;
}
export declare function Wordmark(props: WordmarkProps): JSX.Element;