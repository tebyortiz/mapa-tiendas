function Reveal({children,i=0,fill}){
  const r=React.useRef(null);const [v,setV]=React.useState(false);
  React.useEffect(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(rm){setV(true);return}const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);io.disconnect()}},{threshold:.15});io.observe(r.current);return()=>io.disconnect()},[]);
  return <div ref={r} style={{width:fill?'100%':undefined,opacity:v?1:0,transform:v?'none':'translateY(18px)',transition:'opacity var(--dur-enter) var(--ease-out) '+(i*70)+'ms, transform var(--dur-enter) var(--ease-out) '+(i*70)+'ms'}}>{children}</div>;
}
function LandingCatalog({onOpenMap}){
  const {CatalogCard,NeonHeading,GlowBackdrop}=window.ComprFCilDesignSystem_3bc5cd;
  const cards=[['tienda','TIENDAS','Supermercados, ropa, electrónica y todo lo del día a día.','tiendas-clerk'],['servicio','SERVICIOS','Mecánicos, ferreterías, técnicos y más, a pocas cuadras.','servicios-mechanic'],['emprendimiento','EMPRENDIMIENTOS','Lo que hacen tus vecinos: comida, diseño, oficios.','emprendimientos-cake']];
  return <section id="explorar" className="lp-sec" style={{position:'relative',overflow:'hidden',padding:'72px var(--gutter)'}}>
    <GlowBackdrop palette="emprendimiento" intensity={.22}/>
    <div style={{position:'relative',zIndex:1,maxWidth:'var(--container)',margin:'0 auto',display:'flex',flexDirection:'column',gap:32}}>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        <div style={{display:'flex',alignItems:'flex-end',gap:'clamp(12px,2vw,20px)'}}><div className="catalog-art" aria-hidden="true" style={{flex:'none',width:'clamp(64px,7vw,104px)',pointerEvents:'none'}}><img src="../../assets/illustrations/map-catalog-3d.png" alt="" style={{display:'block',width:'100%',height:'auto',filter:'drop-shadow(0 12px 14px rgba(0,0,0,.5)) drop-shadow(0 0 22px rgba(79,169,238,.35)) drop-shadow(0 0 36px rgba(250,110,78,.2))'}}/></div><NeonHeading as="h2" style={{lineHeight:.95}}>CATÁLOGO VIRTUAL</NeonHeading></div>
        <p style={{margin:0,font:'500 16px/1.35 var(--font-body)',color:'var(--text-muted)',maxWidth:560,textWrap:'pretty'}}>Selecciona la opción que desees y explora los comercios y emprendedores cercanos a tu ubicación en el mapa.</p>
      </div>
      <div className="lp-cards" style={{display:'grid',gap:16}}>{cards.map(([t,ti,d,p],i)=><Reveal key={t} i={i}><div id={ti.toLowerCase()}><CatalogCard type={t} title={ti} description={d} image={'../../assets/photos/'+p+'.png'} cta="VER MAPA" height={420} onClick={()=>onOpenMap(t)}/></div></Reveal>)}</div>
    </div>
  </section>;
}
function NearbyStoreCard({b,onClick}){
  const {Icon,Badge}=window.ComprFCilDesignSystem_3bc5cd;
  const [h,setH]=React.useState(false);
  return <div role="button" tabIndex={0} onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{display:'flex',flexDirection:'column',gap:14,height:'100%',boxSizing:'border-box',padding:12,borderRadius:'var(--radius-panel)',cursor:'pointer',background:h?'var(--surface-raised)':'var(--surface)',boxShadow:h?'var(--glow-tienda)':'inset 0 0 0 1px var(--border)',transition:'background var(--dur-base), box-shadow var(--dur-slow) var(--ease-out)'}}>
    <div style={{position:'relative',width:'100%',aspectRatio:'16 / 10',borderRadius:'var(--radius-card)',overflow:'hidden',boxShadow:'inset 0 0 0 1px rgba(255,111,97,.45)'}}>
      <image-slot id={'nearby-store-'+b.id} shape="rect" placeholder="Foto de la sucursal" style={{position:'absolute',inset:0}}></image-slot>
    </div>
    <div style={{display:'flex',flexDirection:'column',gap:6,padding:'0 4px 4px',minWidth:0,flex:1}}>
      <div style={{display:'flex',alignItems:'center',gap:10,minWidth:0}}>
        <image-slot id={'chain-avatar-'+b.id} shape="circle" placeholder="Logo" style={{width:36,height:36,flex:'none',borderRadius:'50%',boxShadow:'0 0 0 2px var(--surface), 0 0 0 3px rgba(255,111,97,.7)'}}></image-slot>
        <span style={{font:'700 13px var(--font-body)',letterSpacing:'.06em',textTransform:'uppercase',color:'var(--text-body)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{b.chain||b.name}</span>
      </div>
      <div style={{font:'800 19px/1.2 var(--font-body)',color:'#fff'}}>{b.branch||b.name}</div>
      <div style={{display:'flex',alignItems:'center',gap:6,font:'600 14px var(--font-body)',color:'var(--tienda-2)'}}><Icon category={b.category} size={16}/>{b.categoryLabel}</div>
      <div style={{display:'flex',alignItems:'center',gap:6,font:'500 13px var(--font-body)',color:'var(--text-muted)',minWidth:0}}><Icon name="map-pin" size={14}/><span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{b.address}</span></div>
      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:'auto',paddingTop:8}}>
        <Badge status={b.open?'abierto':'cerrado'}>{b.open?'Abierto':'Cerrado'}</Badge>
        <Badge icon="map-pin">{b.distance}</Badge>
        {b.hasOffers&&<Badge type="todas" variant="solid" icon="tag">Ofertas</Badge>}
      </div>
    </div>
  </div>;
}
function LandingNearby({onOpenMap}){
  const {NeonHeading,Button}=window.ComprFCilDesignSystem_3bc5cd;
  const list=window.CF_DATA.businesses.filter(b=>b.type==='tienda');
  return <section className="lp-sec" style={{position:'relative',overflow:'hidden',padding:'56px 0 72px',background:'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.01))',boxShadow:'inset 0 1px 0 rgba(255,255,255,.06)'}}>
    <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',background:'radial-gradient(40% 55% at 8% 100%,rgba(250,110,78,.2),transparent 70%),radial-gradient(38% 50% at 92% 95%,rgba(164,116,245,.22),transparent 70%),radial-gradient(45% 40% at 55% 0%,rgba(79,169,238,.14),transparent 70%)'}}></div>
    <div style={{position:'relative',zIndex:1,maxWidth:'var(--container)',margin:'0 auto',padding:'0 var(--gutter)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,flexWrap:'wrap'}}><NeonHeading as="h2" type="tienda">CERCA TUYO</NeonHeading><Button variant="ghost" size="sm" iconRight="arrow-right" onClick={()=>onOpenMap('tienda')}>Ver todo en el mapa</Button></div>
    <div className="nearby-track" style={{position:'relative',zIndex:1,display:'flex',gap:16,overflowX:'auto',overflowY:'hidden',padding:'24px var(--gutter) 20px',scrollSnapType:'x mandatory',scrollPaddingLeft:'var(--gutter)',scrollbarWidth:'none',maxWidth:'var(--container)',margin:'0 auto'}}>{list.map((b,i)=><div key={b.id} style={{flex:'0 0 min(84vw,380px)',scrollSnapAlign:'start',display:'flex'}}><Reveal i={i} fill><NearbyStoreCard b={b} onClick={()=>onOpenMap(b.type,b.id)}/></Reveal></div>)}</div>
  </section>;
}
function LandingJoin(){
  const {NeonHeading,Button,GlowBackdrop}=window.ComprFCilDesignSystem_3bc5cd;
  return <section className="lp-sec" style={{position:'relative',overflow:'hidden',padding:'72px var(--gutter)'}}>
    <GlowBackdrop palette="tienda" intensity={.3}/>
    <div className="lp-join" style={{position:'relative',zIndex:1,maxWidth:'var(--container)',margin:'0 auto',display:'grid',gap:28,alignItems:'center',padding:28,borderRadius:'var(--radius-panel)',background:'var(--surface)',boxShadow:'inset 0 0 0 1px var(--border)'}}>
      <img src="../../assets/illustrations/storefront-check.png" alt="" style={{width:'100%',maxWidth:280,justifySelf:'center'}}/>
      <div style={{display:'flex',flexDirection:'column',gap:14}}><NeonHeading as="h2" type="tienda" size="var(--fs-h1)">SUMÁ TU COMERCIO</NeonHeading><p style={{margin:0,font:'500 16px/1.55 var(--font-body)',color:'var(--text-muted)',maxWidth:480}}>Que te encuentren los vecinos que están a pocas cuadras. Cargás tu negocio una vez y aparecés en el mapa.</p><div><Button type="tienda" size="lg" icon="store">Sumar mi comercio</Button></div></div>
    </div>
  </section>;
}
function LandingFooter(){
  const {Wordmark}=window.ComprFCilDesignSystem_3bc5cd;
  return <footer style={{padding:'32px var(--gutter) 48px',borderTop:'1px solid var(--border)'}}><div style={{maxWidth:'var(--container)',margin:'0 auto',display:'flex',justifyContent:'space-between',gap:16,flexWrap:'wrap',alignItems:'center'}}><Wordmark size={16} markSrc="../../assets/logo/basket-mark.png"/><div style={{font:'500 13px var(--font-body)',color:'var(--text-subtle)'}}>Hecho en Tunuyán, Mendoza.</div></div></footer>;
}
Object.assign(window,{LandingCatalog,LandingNearby,LandingJoin,LandingFooter,Reveal});