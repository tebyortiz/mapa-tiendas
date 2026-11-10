# Ubicación y comercios cercanos

## Origen de los comercios
- El backend (`POST /api/geo/nearby`, lo mantiene Michel Ortiz) unifica dos plataformas: `source: "ttv"` (Tu Tienda Virtual) y `source: "gesto"`. Las dos se muestran como **tiendas**.
- Servicios y emprendimientos llegarán con otros valores de `source`. Hasta entonces, sus filtros quedan vacíos y se marcan como "próximamente".

## Rubro del comercio
- El rubro sale de `profile.chainType`, que llega en inglés (ej. `electronics`, `supermarket`).
- Un `chainType` sin equivalente se muestra como **"Otros"**.
- Rubros de ttv: supermercado, restaurante, ferretería, ropa, electrónica, farmacia, automotriz, mascotas, hogar y muebles, entretenimiento, otro. Gesto suma: despensa, kiosco, minimarket, verdulería, carnicería, panadería.
