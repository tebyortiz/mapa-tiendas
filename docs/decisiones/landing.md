# Landing

## Ciudad 3D del hero
Decidido el 07/11/2026.

- Primero se ve una captura de la ciudad. La escena 3D la reemplaza con un fundido **solo si el dispositivo tiene GPU real**. Sin GPU, queda la captura.
- Se eligió esto antes que una animación de "construcción por capas" (no pueden convivir).
- No se usa una pantalla de carga a pantalla completa (empeora la carga percibida).

## Performance sin perder lo visual
- La landing ya está optimizada para PageSpeed. Futuras mejoras de performance no sacrifican la ciudad 3D, las letras neón, los glows ni la aurora, salvo que sea imprescindible y Teby lo apruebe.
- Los cambios de performance se hacen por fases, avisando qué cambia y con OK antes de pasar a la siguiente.
