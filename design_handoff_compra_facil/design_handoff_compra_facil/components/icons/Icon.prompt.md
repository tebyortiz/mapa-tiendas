Lucide icon (via lucide-static CDN, masked so it takes currentColor); use for every UI and category icon.
```jsx
<Icon name="map-pin" size={20}/>
<Icon category="ferreteria" color="var(--servicio)"/>
```
- `category` uses the confirmed mapping (supermercado→store, restaurant→hand-platter, ferreteria→wrench, ropa→shirt, electronica→headphones, farmacia→briefcase-medical, automotriz→car-front, mascotas→dog, hogar→sofa, entretenimiento→gamepad-2, otros→store).
- Never substitute emoji or hand-drawn SVG.