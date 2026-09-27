Segmented control that switches the map/catalog between Todas · Tiendas · Servicios · Emprendimientos; the active segment takes that type's gradient.
```jsx
<TypeSelector value={view} onChange={setView}/>
<TypeSelector value="servicio" compact/>
```
- Switching type should also re-theme the page: set `data-type` on a wrapper so chips, markers and glows follow.
- Never show two type colors as active at once.