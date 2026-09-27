const NAV_LINKS=[{id:'tiendas',label:'Tiendas',icon:'shopping-bag',c:'var(--tienda)',c2:'var(--tienda-2)',rgb:'255,111,97'},{id:'servicios',label:'Servicios',icon:'wrench',c:'var(--servicio)',c2:'var(--servicio-2)',rgb:'61,139,255'},{id:'emprendimientos',label:'Emprendimientos',icon:'sparkles',c:'var(--emprendimiento)',c2:'var(--emprendimiento-2)',rgb:'155,107,255'},{id:'ofertas',label:'Ofertas',icon:'badge-percent',c:'#FFFFFF',c2:'#FFFFFF',rgb:'255,255,255',grad:'var(--rainbow-grad)'}];
function NeonNavLink({l,i,base=''}){
  const {Icon}=window.ComprFCilDesignSystem_3bc5cd;
  const [on,setOn]=React.useState(false);const [k,setK]=React.useState(0);
  const enter=()=>{setOn(true);setK(x=>x+1)};
  return <a href={base+'#'+l.id} aria-label={l.label} title={l.label} onMouseEnter={enter} onFocus={enter} onMouseLeave={()=>setOn(false)} onBlur={()=>setOn(false)} style={{position:'relative',display:'inline-flex',alignItems:'center',gap:8,height:44,padding:'0 14px',borderRadius:999,textDecoration:'none',font:'700 14px var(--font-body)',color:on?'#fff':'var(--text-body)',transition:'color var(--dur-base)'}}>
    <span aria-hidden="true" style={{position:'absolute',left:'12%',right:'12%',bottom:-2,height:18,borderRadius:'50%',background:'radial-gradient(closest-side,rgba('+l.rgb+','+(on?.75:.28)+'),transparent)',filter:'blur(6px)',transition:'background var(--dur-slow) var(--ease-out)',pointerEvents:'none'}}/>
    <span key={'i'+k} className={on?'nav-tube-on':'nav-idle'} style={{display:'inline-flex',animationDelay:on?'0ms':(i*260+400)+'ms',filter:on?'drop-shadow(0 0 4px '+l.c+') drop-shadow(0 0 10px '+l.c+')':'none',transition:'filter var(--dur-base)'}}><Icon name={l.icon} size={18} color={on?l.c2:l.c}/></span>
    <span className="nav-lbl-wrap" style={{position:'relative'}}><span className="nav-lbl">{l.label}</span>
      <span key={'l'+k} aria-hidden="true" className={on?'nav-tube-on':'nav-idle'} style={{position:'absolute',left:0,right:0,bottom:-7,height:2,borderRadius:2,background:l.grad||('linear-gradient(90deg,'+l.c+','+l.c2+')'),opacity:on?1:.45,boxShadow:on?'0 0 6px '+l.c+', 0 0 14px '+l.c+', 0 0 26px rgba('+l.rgb+',.6)':'0 0 4px rgba('+l.rgb+',.4)',animationDelay:on?'0ms':(i*260+400)+'ms',transition:'opacity var(--dur-base), box-shadow var(--dur-base)'}}/>
    </span>
  </a>;
}
function LandingNav({onOpenMap,base='',sticky=true,cta=true}){
  const {Wordmark,Button}=window.ComprFCilDesignSystem_3bc5cd;
  return <header className="lp-nav" style={{position:sticky?'sticky':'relative',top:0,zIndex:sticky?20:800,flex:'none',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,minHeight:76,padding:'14px var(--gutter)',background:'rgba(7,7,13,.72)',backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',borderBottom:'1px solid var(--border)'}}>
    <a href={base+'#hero'} className="nav-brand" style={{display:'flex',textDecoration:'none'}}><Wordmark size={18} markSrc="../../assets/logo/basket-mark.png"/></a>
    <nav className="lp-links" style={{display:'flex',gap:6}}>{NAV_LINKS.map((l,i)=><NeonNavLink key={l.id} l={l} i={i} base={base}/>)}</nav>
    {cta&&<div className="nav-cta"><Button size="sm" iconRight="map" onClick={onOpenMap} style={{color:'#fff'}}>abrir mapa</Button></div>}
  </header>;
}
window.LandingNav=LandingNav;