/** srcSet de una imagen WebP con versiones reducidas `${base}-${ancho}.webp` además del original `${base}.webp`
 *  (que es la más grande, de `fullWidth` px). El navegador elige la justa según `sizes` y la densidad de pantalla. */
export const srcSet = (base: string, widths: number[], fullWidth: number) =>
  [...widths.map((w) => `${base}-${w}.webp ${w}w`), `${base}.webp ${fullWidth}w`].join(', ')

/** Canasta del logo (450×400) */
export const BASKET_SRCSET = srcSet('/assets/logo/basket-mark', [128, 256], 450)
