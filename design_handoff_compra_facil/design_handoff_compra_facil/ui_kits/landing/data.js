window.CF_DATA={
businesses:[
{id:1,type:'tienda',chain:'Del Valle Supermercados',branch:'Súper Del Valle Centro',hasOffers:true,name:'Súper Del Valle',category:'supermercado',categoryLabel:'Supermercado',distance:'350 m',open:true,lat:-33.5762,lng:-69.0149,address:'Av. San Martín 1020',hours:'Todos los días · 8 a 22 h',description:'Almacén, verdulería y carnicería en un solo lugar.'},
{id:2,type:'servicio',name:'Taller Don Luis',category:'automotriz',categoryLabel:'Mecánica general',distance:'600 m',open:true,lat:-33.5731,lng:-69.0192,address:'Av. San Martín 820',hours:'Lun a Vie · 8 a 18 h',description:'Service, frenos y tren delantero. Atendemos con turno.',image:'../../assets/photos/servicios-mechanic.png'},
{id:3,type:'emprendimiento',name:'Dulce Taller',category:'otros',categoryLabel:'Pastelería',distance:'1,2 km',open:false,lat:-33.5809,lng:-69.0106,address:'Belgrano 455',hours:'Lun a Sáb · 9 a 20 h',description:'Tortas por encargo y mesa dulce para eventos.',image:'../../assets/photos/emprendimientos-cake.png'},
{id:4,type:'tienda',chain:'Punto Tech',branch:'Punto Tech Sarmiento',hasOffers:true,name:'Punto Tech',category:'electronica',categoryLabel:'Electrónica',distance:'450 m',open:true,lat:-33.5779,lng:-69.0171,address:'Sarmiento 210',hours:'Lun a Sáb · 9 a 13 y 17 a 21 h',description:'Celulares, accesorios y reparaciones al toque.',image:'../../assets/photos/tiendas-clerk.png'},
{id:5,type:'servicio',name:'Ferretería El Tornillo',category:'ferreteria',categoryLabel:'Ferretería',distance:'800 m',open:true,lat:-33.5745,lng:-69.0121,address:'Godoy Cruz 330',hours:'Lun a Sáb · 8 a 20 h',description:'Herramientas, bulonería y cortes a medida.'},
{id:6,type:'tienda',chain:'Patitas Pet Shop',branch:'Patitas Alem',hasOffers:true,name:'Patitas',category:'mascotas',categoryLabel:'Mascotas',distance:'900 m',open:true,lat:-33.5794,lng:-69.0211,address:'Alem 118',hours:'Lun a Sáb · 9 a 21 h',description:'Alimento balanceado, accesorios y peluquería.'},
{id:7,type:'tienda',chain:'Farmacias Central',branch:'Farmacia Central San Martín',hasOffers:false,name:'Farmacia Central',category:'farmacia',categoryLabel:'Farmacia',distance:'300 m',open:true,lat:-33.5771,lng:-69.0137,address:'San Martín 1105',hours:'24 h',description:'De turno esta semana.'},
{id:8,type:'emprendimiento',name:'Cocina de Marta',category:'restaurant',categoryLabel:'Viandas',distance:'1,5 km',open:true,lat:-33.5716,lng:-69.0098,address:'Las Heras 77',hours:'Lun a Vie · 11 a 15 h',description:'Viandas caseras con envío en el centro.'},
{id:9,type:'tienda',chain:'Moda Andina',branch:'Moda Andina Roca',hasOffers:false,name:'Moda Andina',category:'ropa',categoryLabel:'Ropa',distance:'700 m',open:false,lat:-33.5822,lng:-69.0165,address:'Roca 402',hours:'Lun a Sáb · 9 a 13 y 17 a 21 h',description:'Ropa urbana y de montaña.'},
{id:10,type:'emprendimiento',name:'Madera Viva',category:'hogar',categoryLabel:'Muebles',distance:'2 km',open:true,lat:-33.5700,lng:-69.0230,address:'Ruta 40 km 3',hours:'Lun a Sáb · 9 a 18 h',description:'Muebles a medida en madera maciza.'},
{id:11,type:'servicio',name:'GameZone',category:'entretenimiento',categoryLabel:'Entretenimiento',distance:'1 km',open:true,lat:-33.5752,lng:-69.0080,address:'Mitre 60',hours:'Todos los días · 15 a 00 h',description:'Consolas, PC gamer y torneos los viernes.'}
],
offers:[
{id:1,type:'tienda',chain:'Del Valle Supermercados',branch:'Súper Del Valle Centro',hasOffers:true,businessId:4,store:'Punto Tech',title:'Auriculares bluetooth a $23.999',description:'Precio especial pagando en efectivo o transferencia.'},
{id:2,type:'servicio',businessId:5,store:'Ferretería El Tornillo',title:'Feria de herramientas 15% off',description:'En productos seleccionados, hasta el 31 de octubre.'},
{id:3,type:'emprendimiento',businessId:10,store:'Madera Viva',title:'Muebles de interior 30% off',description:'Mesas y racks a medida, válido hasta fin de año.'},
{id:4,type:'tienda',chain:'Punto Tech',branch:'Punto Tech Sarmiento',hasOffers:true,businessId:1,store:'Súper Del Valle',title:'2x1 en panificados',description:'Todos los martes, hasta agotar stock.'},
{id:5,type:'servicio',businessId:2,store:'Taller Don Luis',title:'20% off en service completo',description:'Con turno previo durante septiembre.'},
{id:6,type:'emprendimiento',businessId:3,store:'Dulce Taller',title:'Mesa dulce para 20',description:'Encargando con 5 días de anticipación.'}
],
requested:[
{id:1,type:'emprendimiento',category:'restaurant',businessId:3,person:'Ana María Rossi',service:'Pastelería',description:'Tortas de cumpleaños personalizadas, tartas dulces, cupcakes, postres individuales, etc.'},
{id:2,type:'servicio',category:'electronica',businessId:4,person:'Juan Carlos Martínez',service:'Reparación de celulares',description:'Reparación de pantallas, cambios de placa, pin de carga, actualización de software, etc.'},
{id:3,type:'servicio',category:'automotriz',businessId:2,person:'Luis Fernández',service:'Mecánica general',description:'Service, frenos, tren delantero y diagnóstico computarizado.'},
{id:4,type:'emprendimiento',category:'hogar',businessId:10,person:'Martín Aguirre',service:'Muebles a medida',description:'Mesas, racks y placares en madera maciza, con diseño a pedido.'},
{id:5,type:'servicio',category:'ferreteria',businessId:5,person:'Silvia Gómez',service:'Electricista matriculada',description:'Instalaciones, tableros, reparaciones y certificados.'}
],
categories:[['supermercado','Supermercado'],['restaurant','Restaurant'],['ferreteria','Ferretería'],['ropa','Ropa'],['electronica','Electrónica'],['farmacia','Farmacia'],['automotriz','Automotriz'],['mascotas','Mascotas'],['hogar','Hogar y muebles'],['entretenimiento','Entretenimiento'],['otros','Otros']]
};