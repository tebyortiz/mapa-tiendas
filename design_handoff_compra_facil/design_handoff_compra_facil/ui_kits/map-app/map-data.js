(()=>{
const P={tienda:'../../assets/photos/tiendas-clerk.png',servicio:'../../assets/photos/servicios-mechanic.png',emprendimiento:'../../assets/photos/emprendimientos-cake.png'};
const D={
1:[{name:'Martes de panificados',description:'2x1 en pan, facturas y prepizzas.',until:'30 de septiembre',products:[{name:'Pan francés',discount:'2x1'},{name:'Facturas',discount:'2x1'},{name:'Prepizzas',discount:'2x1'}]},{name:'Almacén',description:'Llevando 2 unidades del mismo producto.',until:'15 de octubre',products:[{name:'Aceite 1,5 L',discount:'-25%'},{name:'Yerba 1 kg',discount:'-20%'},{name:'Fideos',discount:'-15%'},{name:'Arroz',discount:'-15%'}]},{name:'Verdulería',description:'Frutas de estación, precio por kilo.',until:'5 de octubre',products:[{name:'Manzanas',discount:'-15%'},{name:'Naranjas',discount:'-10%'}]}],
2:[{name:'Service completo',description:'Aceite, filtros y revisión general con turno.',until:'30 de septiembre',products:[{name:'Cambio de aceite',discount:'-20%'},{name:'Filtros',discount:'-20%'}]}],
3:[{name:'Mesa dulce para eventos',description:'Encargando con 5 días de anticipación.',until:'31 de octubre',products:[{name:'Mesa para 20',discount:'-10%'},{name:'Cupcakes x12',discount:'-15%'}]},{name:'Tortas de cumpleaños',description:'Diseño personalizado de 2 kg.',until:'20 de octubre',products:[{name:'Torta temática',discount:'-15%'}]}],
4:[{name:'Semana del audio',description:'Pagando en efectivo o transferencia.',until:'6 de octubre',products:[{name:'Auriculares BT',discount:'-30%'},{name:'Parlante',discount:'-25%'},{name:'Earbuds',discount:'-20%'}]},{name:'Protegé tu celu',description:'Funda + vidrio templado en combo.',until:'15 de octubre',products:[{name:'Funda',discount:'-20%'},{name:'Vidrio templado',discount:'-20%'}]},{name:'Carga rápida',description:'Cable USB-C incluido.',until:'31 de octubre',products:[{name:'Cargador 25 W',discount:'-15%'},{name:'Power bank',discount:'-10%'}]}],
5:[{name:'Feria de herramientas',description:'Productos seleccionados.',until:'31 de octubre',products:[{name:'Taladro',discount:'-15%'},{name:'Amoladora',discount:'-15%'},{name:'Juego de llaves',discount:'-10%'}]},{name:'Bulonería por kilo',description:'Comprando más de 2 kg.',until:'15 de octubre',products:[{name:'Tornillos',discount:'-10%'},{name:'Tarugos',discount:'-10%'}]}],
6:[{name:'Alimento balanceado',description:'Bolsas de 15 kg, marcas seleccionadas.',until:'10 de octubre',products:[{name:'Perro adulto',discount:'-20%'},{name:'Cachorro',discount:'-15%'},{name:'Gato',discount:'-15%'}]},{name:'Peluquería',description:'Baño y corte de lunes a miércoles.',until:'31 de octubre',products:[{name:'Baño',discount:'-15%'},{name:'Corte',discount:'-15%'}]}],
10:[{name:'Muebles de interior',description:'Mesas y racks a medida.',until:'31 de diciembre',products:[{name:'Mesa comedor',discount:'-30%'},{name:'Rack TV',discount:'-30%'},{name:'Estantería',discount:'-20%'}]}]
};
const street=a=>(a||'').replace(/[0-9].*$/,'').replace(/^(Av\.|Ruta)\s*/,'').trim();
window.CF_DATA.businesses.forEach(b=>{
  b.image=b.image||P[b.type];
  b.chain=b.chain||b.name;
  b.branch=b.branch||(b.name+' '+street(b.address));
  b.deals=D[b.id]||[];
  b.hasOffers=b.deals.length>0;
  b.search=[b.name,b.branch,b.chain,b.categoryLabel,b.description,...b.deals.flatMap(x=>[x.name,...(x.products||[]).map(p=>p.name)])].join(' ').toLowerCase();
});
})();
