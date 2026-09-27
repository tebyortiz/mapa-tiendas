Map pin: black disc with a type-gradient border and the category icon; selected = filled gradient, larger, glowing, with name label. Render inside a Mapbox custom marker element.
```jsx
<MapMarker type="tienda" category="supermercado"/>
<MapMarker type="servicio" category="automotriz" selected label="Taller Don Luis"/>
```
- Border color alone must identify the type — never mix colors on one marker.