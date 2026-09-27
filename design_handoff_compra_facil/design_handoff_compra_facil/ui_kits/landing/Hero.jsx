const FLICKER={1:[9.5,2.1],4:[13,5.4],7:[11,8.2],9:[15.5,3.3]};
function FlickerWord({text,seed}){
  return <span aria-hidden="true">{text.split('').map((ch,j)=>{const f=FLICKER[seed+j];return <span key={j} className={f?'hero-letter':undefined} style={f?{animationDuration:f[0]+'s',animationDelay:f[1]+'s'}:undefined}>{ch}</span>})}</span>;
}
function HeroCity(){
  const ref=React.useRef(null);const [t,setT]=React.useState({x:0,y:0});
  React.useEffect(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;const fine=matchMedia('(pointer: fine)').matches;if(rm||!fine)return;
    const f=e=>{const r=ref.current.getBoundingClientRect();setT({x:((e.clientX-r.left)/r.width-.5),y:((e.clientY-r.top)/r.height-.5)})};window.addEventListener('mousemove',f);return()=>window.removeEventListener('mousemove',f)},[]);
  const fade='radial-gradient(ellipse 72% 68% at 50% 50%,#000 55%,transparent 100%)';
  return <div ref={ref} aria-label="Escena 3D de la ciudad" role="img" style={{position:'relative',width:'100%',maxWidth:720,justifySelf:'center',alignSelf:'center',aspectRatio:'916 / 452',perspective:1200}}>
    <div style={{position:'absolute',inset:0,transform:'rotateX('+(-t.y*6)+'deg) rotateY('+(t.x*8)+'deg) translate3d('+(t.x*-12)+'px,'+(t.y*-8)+'px,0)',transition:'transform 600ms var(--ease-out)',WebkitMaskImage:fade,maskImage:fade}}>
      <img src="../../assets/scenes/kenney-city-preview.png" alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.62) saturate(1.15) contrast(1.08)'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(155,107,255,.38),rgba(61,139,255,.28) 50%,rgba(255,111,97,.26))',mixBlendMode:'color'}}/>
      <div style={{position:'absolute',inset:0,background:'rgba(7,7,13,.28)'}}/>
    </div>
  </div>;
}
function LandingHero({onOpenMap}){
  const {Button,SearchInput,GlowBackdrop,Icon}=window.ComprFCilDesignSystem_3bc5cd;
  return <section id="hero" className="lp-sec" style={{position:'relative',overflow:'hidden',padding:'32px var(--gutter) 48px'}}>
    <GlowBackdrop palette="rainbow" intensity={.38}/>
    <div className="lp-hero" style={{position:'relative',zIndex:1,maxWidth:'var(--container)',margin:'0 auto',display:'grid',gap:32,alignItems:'stretch',minHeight:'min(760px,calc(100vh - 140px))'}}>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',gap:40}}>
        <div className="hero-brand" style={{display:'flex',alignItems:'flex-end',gap:'clamp(12px,2vw,20px)',marginTop:'clamp(8px,5vw,64px)'}}>
          <div className="hero-basket" style={{flex:'none'}}><img src="../../assets/logo/basket-mark.png" alt="" className="hero-basket-img" style={{display:'block',height:'clamp(110px,19vw,240px)',width:'auto'}}/></div>
          <h1 className="cf-neon cf-neon-on" aria-label="Comprá Fácil" style={{margin:0,fontSize:'clamp(44px,7vw,100px)',lineHeight:.95,whiteSpace:'nowrap'}}><FlickerWord text="COMPRÁ" seed={0}/><br/><FlickerWord text="FÁCIL" seed={6}/></h1>
        </div>
        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:44,height:44,flex:'none',borderRadius:999,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,.2)',boxShadow:'inset 0 0 0 2.5px rgba(255,255,255,.6), 0 0 14px rgba(255,255,255,.35), 0 0 32px rgba(255,255,255,.18)'}}><Icon name="map-pinned" size={20} color="#fff" style={{filter:'drop-shadow(0 0 2px rgba(255,255,255,.9)) drop-shadow(0 0 6px rgba(255,255,255,.6))'}}/></div>
          <div style={{font:'800 clamp(18px,2.4vw,26px)/1.2 var(--font-body)',letterSpacing:'.12em',textTransform:'uppercase',color:'#fff',textShadow:'var(--neon-text-soft)'}}>EXPLORÁ TU CIUDAD</div>
        </div>
        <p style={{margin:'16px 0 0',maxWidth:500,font:'500 var(--fs-body-lg)/1.5 var(--font-body)',color:'var(--text-body)',textWrap:'pretty'}}>Tiendas, servicios y emprendimientos de tu ciudad en un mapa. Encontrá lo que necesitás, cerca tuyo.</p>
        <div style={{marginTop:20,display:'flex',flexDirection:'column',gap:12,width:'100%',maxWidth:560}}>
          <form onSubmit={e=>{e.preventDefault();onOpenMap()}} style={{display:'flex',gap:8,alignItems:'center'}}><SearchInput placeholder="¿Qué buscás cerca tuyo?" style={{flex:1,minWidth:0}}/><Button icon="search" style={{height:48,flex:'none',color:'#fff'}}>Buscar</Button></form>
          <Button variant="secondary" iconRight="map" fullWidth onClick={onOpenMap} style={{height:48}}>abrir mapa</Button>
        </div>
        </div>
      </div>
      <HeroCity/>

    </div>
  </section>;
}
window.LandingHero=LandingHero;