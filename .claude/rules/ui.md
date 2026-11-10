---
paths:
  - "src/components/ui/**"
  - "src/components/brand/**"
  - "src/index.css"
  - "public/fonts/**"
---

# Sistema de diseño

- Los tokens (colores, tipografías, sombras) son variables CSS en `src/index.css` (Tailwind 4). Usar los tokens, no colores sueltos.
- Referencia visual: `design_handoff_compra_facil/design_handoff_compra_facil/README.md`. Es solo referencia y no forma parte del build.
- Las animaciones usan solo `opacity` y `transform`. No animar `filter` ni `text-shadow`, porque bajan el PageSpeed.
- Las fuentes de `public/fonts/` están recortadas a Latin-1 más signos. Un carácter fuera de ese rango no se va a ver con la fuente de marca.
- `features/` y `components/` solo renderizan lo que reciben. El estado compartido vive en `src/lib/`.
- Todo se prueba en desktop y en mobile.
