Pill filter chip for a category (Supermercado, Ferretería…); lives in the horizontally-scrolling rail above the map.
```jsx
<CategoryChip label="Ferretería" category="ferreteria" type="servicio" selected/>
<CategoryChip label="Mascotas" category="mascotas" type="tienda" count={12}/>
```
- Unselected: surface fill, icon tinted with the view's accent. Selected: type gradient fill + dark ink + glow.
- Visual height 40px; keep 4px vertical padding in the rail so the hit area reaches 44px.