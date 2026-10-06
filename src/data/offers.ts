import type { Offer, Requested } from './types'

export const OFFERS: Offer[] = [
  { id: 1, type: 'tienda', businessId: 4, store: 'Punto Tech', title: 'Auriculares bluetooth a $23.999', description: 'Precio especial pagando en efectivo o transferencia.' },
  { id: 2, type: 'servicio', businessId: 5, store: 'Electricidad Gómez', title: 'Instalaciones eléctricas 15% off', description: 'Presupuesto sin cargo, hasta el 31 de octubre.' },
  { id: 3, type: 'emprendimiento', businessId: 10, store: 'Madera Viva', title: 'Muebles de interior 30% off', description: 'Mesas y racks a medida, válido hasta fin de año.' },
  { id: 4, type: 'tienda', businessId: 1, store: 'Súper Del Valle', title: '2x1 en panificados', description: 'Todos los martes, hasta agotar stock.' },
  { id: 5, type: 'servicio', businessId: 2, store: 'Taller Don Luis', title: '20% off en service completo', description: 'Con turno previo durante septiembre.' },
  { id: 6, type: 'emprendimiento', businessId: 3, store: 'Dulce Taller', title: 'Mesa dulce para 20', description: 'Encargando con 5 días de anticipación.' },
]

export const REQUESTED: Requested[] = [
  { id: 1, type: 'emprendimiento', category: 'pasteleria', businessId: 3, person: 'Ana María Rossi', service: 'Pastelería', description: 'Tortas de cumpleaños personalizadas, tartas dulces, cupcakes, postres individuales, etc.', image: '/assets/photos/demo-pasteleria.jpg', avatar: '/assets/mock/avatar6.jpg' },
  { id: 2, type: 'servicio', category: 'electronica', businessId: 4, person: 'Juan Carlos Martínez', service: 'Reparación de celulares', description: 'Reparación de pantallas, cambios de placa, pin de carga, actualización de software, etc.', image: '/assets/photos/demo-reparacion-celulares.jpg', avatar: '/assets/mock/avatar1.jpg' },
  { id: 3, type: 'servicio', category: 'mecanica', businessId: 2, person: 'Luis Fernández', service: 'Mecánica general', description: 'Service, frenos, tren delantero y diagnóstico computarizado.', image: '/assets/photos/demo-mecanica.jpg', avatar: '/assets/mock/avatar3.jpg' },
  { id: 4, type: 'emprendimiento', category: 'artesanias', businessId: 10, person: 'Martín Aguirre', service: 'Muebles a medida', description: 'Mesas, racks y placares en madera maciza, con diseño a pedido.', image: '/assets/photos/demo-muebles.jpg', avatar: '/assets/mock/avatar7.jpg' },
  { id: 5, type: 'servicio', category: 'electricidad', businessId: 5, person: 'Silvia Gómez', service: 'Electricista matriculada', description: 'Instalaciones, tableros, reparaciones y certificados.', image: '/assets/photos/demo-electricista.jpg', avatar: '/assets/mock/avatar5.jpg' },
]
