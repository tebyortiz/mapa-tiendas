# Mapa

## Negocios sin plan vigente (`kind: "admin"`)
Decidido con Michel Ortiz (backend), 30–31/10/2026.

- Un pin `admin` corresponde a un negocio que no creó tiendas o que no tiene el plan pago vigente (alta nueva, suspendido o vencido). Si tiene tiendas, llega un pin `admin` por tienda.
- Mostrar todos los datos (horarios, ofertas, web) es un beneficio del plan de Gesto / TTV. Por eso el pin `admin` va **simple**: pin blanco con ícono de local y ficha con foto, nombre, dirección y distancia. **Sin** horarios, ofertas, "Cerrado" ni botón "Ver tienda".
- En "Cerca tuyo" de la landing **sí** se muestran, con card simple: foto, fila del logo reservada vacía, nombre de la sucursal, rubro "Otros", dirección y distancia. Cada fila se alinea con la misma fila de las cards con plan.
- Una tienda con `status: false` es una sucursal de TTV apagada a mano y se muestra como "Cerrado".
