Absolutely-positioned layer of blurred, slowly drifting color blobs placed behind a section's content (parent needs position:relative). Color matches the section.
```jsx
<section style={{position:'relative'}}><GlowBackdrop palette="servicio"/><div style={{position:'relative',zIndex:1}}>…</div></section>
```
- Keep intensity ≤ .5 so body text stays AA. Drift + parallax stop under prefers-reduced-motion.