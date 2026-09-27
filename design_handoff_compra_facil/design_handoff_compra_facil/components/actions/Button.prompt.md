Pill-shaped action button; use primary for the one main action per view ("Abrir Mapa"), secondary/ghost for the rest, glass over photos.
```jsx
<Button size="lg" iconRight="map">Abrir Mapa</Button>
<Button type="servicio" icon="phone">Llamar</Button>
<Button variant="secondary" icon="navigation">Cómo llegar</Button>
```
- `type` picks the gradient: todas (rainbow) · tienda (coral→amber) · servicio (blue→cyan) · emprendimiento (violet→lilac).
- Primary text is always dark ink (#07070D) — white on these gradients fails AA.
- Hover = accent glow, press = scale .97. Never soft grey shadows.
- Copy: direct and local ("Explorar", "Ver cerca tuyo"), never "Get Started" / "Learn More".