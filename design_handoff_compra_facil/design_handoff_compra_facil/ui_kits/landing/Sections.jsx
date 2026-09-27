function LocationRow({city='Tunuyán'}){
  const {Icon}=window.ComprFCilDesignSystem_3bc5cd;
  return <div style={{display:'flex',alignItems:'center',gap:10}}>
    <div style={{width:44,height:44,flex:'none',borderRadius:999,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,.2)',boxShadow:'inset 0 0 0 2.5px rgba(255,255,255,.6), 0 0 14px rgba(255,255,255,.35), 0 0 32px rgba(255,255,255,.18)'}}><Icon name="map-pin" size={20} color="#fff" style={{filter:'drop-shadow(0 0 2px rgba(255,255,255,.9)) drop-shadow(0 0 6px rgba(255,255,255,.6))'}}/></div>
    <span style={{display:'inline-flex',alignItems:'center',height:44,padding:'0 18px',borderRadius:999,background:'var(--rainbow-grad)',boxShadow:'var(--glow-rainbow)',font:'800 15px var(--font-body)',color:'#fff',textShadow:'0 1px 2px rgba(0,0,0,.35)'}}>{city}</span>
  </div>;
}
function SectionHead({title,subtitle,type,city,action,onAction,className}){
  const {NeonHeading,Button}=window.ComprFCilDesignSystem_3bc5cd;
  return <div className={className} style={{display:'flex',flexDirection:'column',gap:12,maxWidth:'var(--container)',margin:'0 auto',padding:'0 var(--gutter)'}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,flexWrap:'wrap'}}><NeonHeading as="h2" type={type}>{title}</NeonHeading>{action&&<Button variant="ghost" size="sm" iconRight="arrow-right" onClick={onAction}>{action}</Button>}</div>
    <p style={{margin:0,font:'500 16px/1.55 var(--font-body)',color:'var(--text-muted)',maxWidth:560}}>{subtitle}</p>
    {city&&<div style={{marginTop:4}}><LocationRow city={city}/></div>}
  </div>;
}
const OFFER_C={tienda:'var(--tienda-2)',servicio:'var(--servicio-2)',emprendimiento:'var(--emprendimiento-2)'};
function OfferCard({o,onMore}){
  const {Button,Icon}=window.ComprFCilDesignSystem_3bc5cd;
  const [h,setH]=React.useState(false);
  const biz=window.CF_DATA.businesses.find(b=>b.id===o.businessId)||{};
  const grad={tienda:'var(--tienda-grad)',servicio:'var(--servicio-grad)',emprendimiento:'var(--emprendimiento-grad)'}[o.type];
  const acc={tienda:'var(--tienda)',servicio:'var(--servicio)',emprendimiento:'var(--emprendimiento)'}[o.type];
  return <article onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{display:'flex',flexDirection:'column',gap:14}}>
    <div style={{position:'relative',aspectRatio:'2.15 / 1',borderRadius:'var(--radius-panel)',overflow:'hidden',background:'var(--surface)',boxShadow:h?'var(--glow-'+o.type+')':'inset 0 0 0 1px var(--border)',transition:'box-shadow var(--dur-slow) var(--ease-out)'}}>
      <image-slot id={'offer-'+o.id} shape="rect" placeholder="Imagen de la oferta" style={{position:'absolute',inset:0}}></image-slot>
    </div>
    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:4,padding:'0 2px'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
        <image-slot id={'store-avatar-'+o.businessId} shape="circle" placeholder="Foto" style={{width:44,height:44,flex:'none',boxShadow:'inset 0 0 0 1px var(--border-strong)',borderRadius:'50%'}}></image-slot>
        <TypeAvatar type={o.type} category={biz.category}/>
        <span style={{font:'800 15px/1.2 var(--font-body)',letterSpacing:'.06em',textTransform:'uppercase',color:'var(--text-strong)'}}>{o.store}</span>
      </div>
      <h3 style={{margin:0,font:'800 clamp(18px,1.8vw,24px)/1.2 var(--font-body)',textTransform:'uppercase',color:OFFER_C[o.type]}}>{o.title}</h3>
      <p style={{margin:'2px 0 0',font:'400 14px/1.5 var(--font-body)',color:'var(--text-muted)'}}>{o.description}</p>
      <div style={{marginTop:10}}><Button type={o.type} size="sm" iconRight="arrow-right" onClick={onMore}>más info</Button></div>
    </div>
  </article>;
}
function OfferMore({onOpenMap}){
  const {Button,GlowBackdrop}=window.ComprFCilDesignSystem_3bc5cd;
  return <div style={{position:'relative',aspectRatio:'2.15 / 1',borderRadius:'var(--radius-panel)',overflow:'hidden',background:'var(--surface)',boxShadow:'inset 0 0 0 1px var(--border-strong)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,padding:20,textAlign:'center'}}>
    <GlowBackdrop palette="rainbow" intensity={.35} parallax={false}/>
    <div className="cf-neon cf-neon-on" style={{position:'relative',fontSize:'clamp(20px,2.2vw,30px)',lineHeight:1.15}}>DESCUBRÍ MÁS OFERTAS<br/>EN TU ZONA</div>
    <Button iconRight="arrow-right" onClick={()=>onOpenMap()} style={{position:'relative',color:'#fff'}}>ver ofertas</Button>
  </div>;
}
function OfferCarousel({offers,onOpenMap}){
  return <SlideCarousel items={offers} render={o=><OfferCard o={o} onMore={()=>onOpenMap(o.type,o.businessId)}/>} tail={<OfferMore onOpenMap={onOpenMap}/>}/>;
}
function SlideCarousel({items,render,tail}){
  const {IconButton}=window.ComprFCilDesignSystem_3bc5cd;
  const ref=React.useRef(null);const [edge,setEdge]=React.useState({l:true,r:false});
  const upd=()=>{const e=ref.current;if(!e)return;setEdge({l:e.scrollLeft<8,r:e.scrollLeft+e.clientWidth>=e.scrollWidth-8})};
  React.useEffect(()=>{upd();window.addEventListener('resize',upd);return()=>window.removeEventListener('resize',upd)},[]);
  const go=d=>{const e=ref.current;e.scrollBy({left:d*e.clientWidth*0.9,behavior:'smooth'})};
  const arrow=(side)=>({position:'absolute',top:'calc((100% - 150px) / 2)',[side]:'max(4px, calc(var(--gutter) - 22px))',zIndex:3});
  return <div style={{position:'relative',maxWidth:'var(--container)',margin:'0 auto'}}>
    <div ref={ref} onScroll={upd} className="offer-track" style={{display:'grid',gridAutoFlow:'column',gap:'clamp(16px,2vw,28px)',overflowX:'auto',overflowY:'hidden',padding:'28px var(--gutter) 16px',scrollSnapType:'x mandatory',scrollPaddingLeft:'var(--gutter)',scrollbarWidth:'none'}}>
      {items.map((o,i)=><div key={o.id} style={{scrollSnapAlign:'start'}}><Reveal i={i}>{render(o)}</Reveal></div>)}
      {tail&&<div style={{scrollSnapAlign:'start'}}><Reveal i={items.length}>{tail}</Reveal></div>}
    </div>
    {!edge.l&&<IconButton icon="chevron-left" label="Anteriores" onClick={()=>go(-1)} style={arrow('left')}/>}
    {!edge.r&&<IconButton icon="chevron-right" label="Siguientes" onClick={()=>go(1)} style={arrow('right')}/>}
  </div>;
}
function Carousel({children}){
  return <div style={{maxWidth:'var(--container)',margin:'0 auto'}}><div style={{display:'flex',gap:12,overflowX:'auto',overflowY:'hidden',padding:'24px var(--gutter) 16px',scrollSnapType:'x mandatory',scrollbarWidth:'thin'}}>{children}</div></div>;
}
function LandingOffers({onOpenMap}){
  const offers=window.CF_DATA.offers;
  return <section id="ofertas" className="lp-sec" style={{position:'relative',overflow:'hidden',padding:'64px 0'}}>
    <GlowBackdropLite palette="tienda"/>
    <div style={{position:'relative',zIndex:1}}>
      <div style={{position:'relative',maxWidth:'var(--container)',margin:'0 auto'}}>
        <SectionHead className="offers-head" title={<>OFERTAS DESTACADAS<br/>DE TU ZONA</>} subtitle="Te presentamos las ofertas vigentes en: " city="Tunuyán"/>
        <div className="offers-art" aria-hidden="true" style={{position:'absolute',top:'50%',right:'var(--gutter)',width:'clamp(150px,13vw,220px)',pointerEvents:'none'}}><img src="../../assets/illustrations/cart-offers-3d.png" alt="" style={{display:'block',width:'100%',height:'auto',transform:'perspective(900px) rotateY(-14deg) rotateX(4deg)',filter:'drop-shadow(0 20px 22px rgba(0,0,0,.55)) drop-shadow(0 0 30px rgba(164,116,245,.35)) drop-shadow(0 0 50px rgba(79,169,238,.2))'}}/></div>
      </div>
      <OfferCarousel offers={offers} onOpenMap={onOpenMap}/>
    </div>
  </section>;
}
function TypeAvatar({type,category,size=36}){
  const {Icon}=window.ComprFCilDesignSystem_3bc5cd;
  const grad={tienda:'var(--tienda-grad)',servicio:'var(--servicio-grad)',emprendimiento:'var(--emprendimiento-grad)'}[type];
  const acc={tienda:'var(--tienda)',servicio:'var(--servicio)',emprendimiento:'var(--emprendimiento)'}[type];
  return <span style={{width:size,height:size,flex:'none',borderRadius:999,padding:2,background:grad,boxSizing:'border-box',boxShadow:'0 0 12px '+acc}}><span style={{width:'100%',height:'100%',borderRadius:999,background:'var(--cf-black)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon category={category} size={Math.round(size*.44)} color={acc}/></span></span>;
}
function RequestedCard({r,onConnect}){
  const {Button}=window.ComprFCilDesignSystem_3bc5cd;
  const [h,setH]=React.useState(false);
  return <article onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{display:'flex',flexDirection:'column',gap:14}}>
    <div style={{position:'relative',aspectRatio:'1.7 / 1',borderRadius:'var(--radius-panel)',overflow:'hidden',background:'var(--surface)',boxShadow:h?'var(--glow-'+r.type+')':'inset 0 0 0 1px var(--border)',transition:'box-shadow var(--dur-slow) var(--ease-out)'}}>
      <image-slot id={'requested-'+r.id} shape="rect" placeholder="Foto del servicio o emprendimiento" style={{position:'absolute',inset:0}}></image-slot>
      <div style={{position:'absolute',top:12,left:12,right:12,display:'flex',pointerEvents:'none'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,maxWidth:'100%',padding:'4px 14px 4px 4px',borderRadius:999,background:'var(--surface-glass-dark)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',boxShadow:'inset 0 0 0 1px var(--border-strong)',pointerEvents:'auto'}}>
          <image-slot id={'person-avatar-'+r.id} shape="circle" placeholder="Foto" style={{width:40,height:40,flex:'none',borderRadius:'50%'}}></image-slot>
          <TypeAvatar type={r.type} category={r.category} size={32}/>
          <span style={{font:'800 14px/1.2 var(--font-body)',letterSpacing:'.04em',textTransform:'uppercase',color:'#fff',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{r.person}</span>
        </div>
      </div>
    </div>
    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:4,padding:'0 2px'}}>
      <h3 style={{margin:0,font:'800 clamp(18px,1.8vw,24px)/1.2 var(--font-body)',textTransform:'uppercase',color:OFFER_C[r.type]}}>{r.service}</h3>
      <p style={{margin:'2px 0 0',font:'400 14px/1.5 var(--font-body)',color:'var(--text-muted)'}}>{r.description}</p>
      <div style={{marginTop:10}}><Button type={r.type} size="sm" icon="message-circle" onClick={onConnect}>conectar</Button></div>
    </div>
  </article>;
}
function LandingMostRequested({onOpenMap}){
  const list=window.CF_DATA.requested;
  return <section className="lp-sec" style={{position:'relative',overflow:'hidden',padding:'56px 0'}}>
    <GlowBackdropLite palette="servicio"/>
    <div className="requested-art" aria-hidden="true" style={{position:'absolute',zIndex:0,top:4,left:'calc(-1 * clamp(64px,6vw,120px))',width:'clamp(150px,15vw,260px)',pointerEvents:'none'}}><img src="../../assets/illustrations/plus-requested-3d.png" alt="" style={{display:'block',width:'100%',height:'auto',opacity:.85,transform:'perspective(900px) rotateY(18deg) rotate(-8deg)',filter:'drop-shadow(0 20px 24px rgba(0,0,0,.55)) drop-shadow(0 0 34px rgba(164,116,245,.4)) drop-shadow(0 0 60px rgba(79,169,238,.25))'}}/></div>
    <div style={{position:'relative',zIndex:1}}>
      <SectionHead title="MÁS SOLICITADOS" subtitle="Servicios y emprendimientos más demandados en:" city="Tunuyán" action="ver todos" onAction={()=>onOpenMap('servicio')}/>
      <SlideCarousel items={list} render={r=><RequestedCard r={r} onConnect={()=>onOpenMap(r.type,r.businessId)}/>}/>
    </div>
  </section>;
}
function GlowBackdropLite({palette}){const {GlowBackdrop}=window.ComprFCilDesignSystem_3bc5cd;return <GlowBackdrop palette={palette} intensity={.3}/>;}
Object.assign(window,{LocationRow,SectionHead,OfferCard,LandingOffers,LandingMostRequested});