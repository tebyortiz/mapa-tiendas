const SUGGEST=[['Pantalón','shirt'],['Zapatillas','footprints'],['Celulares','smartphone'],['Auriculares','headphones'],['Pizza','pizza'],['Herramientas','hammer'],['Alimento para perros','bone'],['Muebles','sofa'],['Tortas','cake']];
function SuggestChip({label,icon,on,onClick}){
  const {Icon}=window.ComprFCilDesignSystem_3bc5cd;const [h,setH]=React.useState(false);
  return <button type="button" onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} aria-pressed={on} style={{display:'inline-flex',alignItems:'center',gap:8,height:40,padding:'0 14px 0 4px',flex:'none',border:'none',cursor:'pointer',borderRadius:999,font:'700 13px var(--font-body)',whiteSpace:'nowrap',color:'#fff',background:on?'var(--rainbow-grad)':(h?'rgba(255,255,255,.14)':'var(--surface-glass-dark)'),backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',boxShadow:on?'var(--glow-rainbow)':'inset 0 0 0 1px '+(h?'rgba(255,255,255,.35)':'var(--border-strong)'),transition:'background var(--dur-base), box-shadow var(--dur-base)'}}>
    <span style={{width:32,height:32,borderRadius:999,flex:'none',display:'flex',alignItems:'center',justifyContent:'center',background:on?'rgba(7,7,13,.35)':'var(--rainbow-grad)',boxShadow:'0 0 10px rgba(164,116,245,.35)'}}><Icon name={icon} size={16} color="#fff"/></span>{label}
  </button>;
}
function MapTopBar({type,setType,cat,setCat,query,setQuery,picked,onPick}){
  const {SearchInput,TypeSelector,CategoryChip,Button}=window.ComprFCilDesignSystem_3bc5cd;
  const cats=window.CF_DATA.categories;const ref=React.useRef(null);const [dense,setDense]=React.useState(window.innerWidth<600);React.useEffect(()=>{const f=()=>setDense(window.innerWidth<600);window.addEventListener('resize',f);return()=>window.removeEventListener('resize',f)},[]);const [draft,setDraft]=React.useState(query);
  React.useEffect(()=>{const ro=new ResizeObserver(()=>document.documentElement.style.setProperty('--mp-top',ref.current.offsetHeight+'px'));ro.observe(ref.current);return()=>ro.disconnect()},[]);
  const submit=e=>{e.preventDefault();setQuery(draft)};
  return <div ref={ref} style={{position:'absolute',top:0,left:0,right:0,zIndex:500,padding:'var(--mp-pad,24px) 12px 0',display:'flex',flexDirection:'column',gap:'var(--mp-gap,14px)',background:'linear-gradient(180deg,rgba(7,7,13,.94) 0%,rgba(7,7,13,.7) 75%,rgba(7,7,13,0) 100%)'}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
      <a href="../landing/index.html" aria-label="Inicio" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none',flex:'none'}}><img className="mp-logo" src="../../assets/logo/basket-mark.png" alt="" style={{height:48,display:'block'}}/><span className="mp-title" style={{fontFamily:'var(--font-display)',fontSize:'clamp(34px,4vw,48px)',lineHeight:1,letterSpacing:'var(--ls-display)',color:'#fff',textShadow:'var(--neon-text-soft)',whiteSpace:'nowrap'}}>MAPA VIRTUAL</span></a>
      <div style={{display:'flex',flexDirection:'column',gap:10,flex:'1 1 340px',maxWidth:640,minWidth:0}}>
        <form onSubmit={submit} style={{display:'flex',gap:8,alignItems:'center'}}><SearchInput glass value={draft} onChange={v=>{setDraft(v);if(!v)setQuery('')}} placeholder="Buscar cerca tuyo…" style={{flex:1,minWidth:0}}/><Button type="todas" icon="search" style={{height:48,flex:'none',color:'#fff'}}>Buscar</Button></form>
        <div style={{display:'flex',gap:8,overflowX:'auto',overflowY:'hidden',scrollbarWidth:'none',padding:'4px 2px',margin:'-4px -2px'}}>{SUGGEST.map(([l,ic])=><SuggestChip key={l} label={l} icon={ic} on={query===l} onClick={()=>{setDraft(l);setQuery(query===l?'':l)}}/>)}</div>
      </div>
    </div>
    <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'nowrap',minWidth:0}}><span style={{flex:'none',font:'800 12px var(--font-body)',letterSpacing:'.08em',textTransform:'uppercase',color:'var(--text-muted)'}}>Filtros</span><TypeSelector value={picked?type:null} onChange={t=>{setType(t);setCat('todas');onPick()}} dense={dense} style={dense?{flex:1}:undefined}/></div>
    {picked?<div style={{display:'flex',gap:8,overflowX:'auto',overflowY:'hidden',padding:'14px 24px 22px',margin:'-12px -12px -8px',scrollbarWidth:'none'}}>
      <CategoryChip label="Todas" icon="layout-grid" type={type} selected={cat==='todas'} onClick={()=>setCat('todas')}/>
      {cats.map(([k,l])=><CategoryChip key={k} label={l} category={k} type={type} selected={cat===k} onClick={()=>setCat(k)}/>)}
    </div>:<div style={{height:4}}></div>}
  </div>;
}
function ResultsPanel({items,selectedId,onSelect,expanded,setExpanded,type,desk}){
  const {BusinessCard,Icon}=window.ComprFCilDesignSystem_3bc5cd;
  const lbl={todas:'lugares',tienda:'tiendas',servicio:'servicios',emprendimiento:'emprendimientos'}[type];
  const chev=desk?(expanded?'chevron-up':'chevron-down'):(expanded?'chevron-down':'chevron-up');
  return <div className="mp-panel" data-open={expanded?'true':'false'} style={{position:'absolute',zIndex:550,left:0,right:0,bottom:0,height:expanded?'62%':128,background:'rgba(12,12,20,.9)',backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',borderRadius:'var(--radius-sheet) var(--radius-sheet) 0 0',boxShadow:'inset 0 1px 0 var(--border-strong)',transition:'height var(--dur-slow) var(--ease-out)',display:'flex',flexDirection:'column'}}>
    <button onClick={()=>setExpanded(!expanded)} aria-expanded={expanded} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10,padding:'10px 16px 12px',background:'none',border:'none',cursor:'pointer',color:'#fff',flex:'none'}}>
      <span className="mp-grip" style={{width:40,height:4,borderRadius:9,background:'var(--cf-ink-400)'}}></span>
      <span style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',font:'800 16px var(--font-body)'}}><span>{items.length} {lbl} cerca tuyo</span><Icon name={chev} size={20} color="var(--text-muted)"/></span>
    </button>
    <div className="mp-list" style={{flex:1,minHeight:0,overflowY:'auto',overflowX:'hidden',padding:'10px 14px 16px',display:'flex',flexDirection:'column',gap:10}}>
      {items.map(b=><BusinessCard key={b.id} {...b} name={b.branch||b.name} selected={b.id===selectedId} onClick={()=>onSelect(b.id)} style={{flex:'none'}}/>)}
      {items.length===0&&<div style={{padding:'24px 8px',textAlign:'center',font:'500 14px var(--font-body)',color:'var(--text-muted)'}}>No encontramos nada con ese filtro. Probá con otra categoría.</div>}
    </div>
  </div>;
}
function OfferRow({d,type,category}){
  const {Icon,Badge}=window.ComprFCilDesignSystem_3bc5cd;
  const rgb={tienda:'255,111,97',servicio:'61,139,255',emprendimiento:'155,107,255'}[type];
  return <div style={{display:'flex',flexDirection:'column',gap:10,padding:10,borderRadius:'var(--radius-card)',background:'rgba(18,18,28,.94)',backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',boxShadow:'inset 0 0 0 1px rgba('+rgb+',.35)',flex:'none'}}>
    <div style={{display:'flex',gap:12,alignItems:'center'}}>
      <div style={{width:96,height:64,flex:'none',borderRadius:12,background:d.image?'url('+d.image+') center/cover':'var(--'+type+'-soft)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'inset 0 0 0 1px rgba('+rgb+',.4)'}}>{!d.image&&<Icon category={category} size={26} color={'var(--'+type+')'}/>}</div>
      <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',gap:3}}>
        <div style={{font:'800 14px/1.25 var(--font-body)',color:'#fff'}}>{d.name}</div>
        <div style={{font:'500 12px/1.4 var(--font-body)',color:'var(--text-muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{d.description}</div>
        <div style={{display:'flex',alignItems:'center',gap:5,font:'700 11px var(--font-body)',color:'var(--'+type+'-2)'}}><Icon name="calendar-clock" size={13}/>Vigente hasta {d.until}</div>
      </div>
    </div>
    {d.products&&d.products.length>0&&<div style={{display:'flex',gap:8,overflowX:'auto',scrollbarWidth:'none'}}>{d.products.map((p,i)=><div key={i} title={p.name} style={{position:'relative',width:60,height:60,flex:'none',borderRadius:12,background:p.image?'url('+p.image+') center/cover':'rgba(255,255,255,.05)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'inset 0 0 0 1px var(--border-strong)'}}>{!p.image&&<Icon category={category} size={20} color="var(--text-subtle)"/>}<Badge type="todas" variant="solid" style={{position:'absolute',left:4,bottom:4,height:18,padding:'0 6px',fontSize:10,fontWeight:800}}>{p.discount}</Badge></div>)}</div>}
  </div>;
}
function OffersStrip({b}){
  if(!b.deals||!b.deals.length)return null;
  return <div style={{width:'100%',maxWidth:420,display:'flex',flexDirection:'column',gap:8,flex:'none'}}>
    <div style={{font:'800 12px var(--font-body)',letterSpacing:'.1em',textTransform:'uppercase',color:'#fff',textShadow:'var(--neon-text-soft)'}}>Ofertas vigentes</div>
    {b.deals.slice(0,3).map((d,i)=><OfferRow key={i} d={d} type={b.type} category={b.category}/>)}
  </div>;
}
function MapControls({onLocate}){
  const {IconButton}=window.ComprFCilDesignSystem_3bc5cd;
  return <div className="mp-ctrl" style={{position:'absolute',zIndex:540,right:12,bottom:144,display:'flex',flexDirection:'column',gap:8}}>
    <IconButton icon="plus" label="Acercar" variant="glass" onClick={()=>window.__cfMap.zoomIn()}/>
    <IconButton icon="minus" label="Alejar" variant="glass" onClick={()=>window.__cfMap.zoomOut()}/>
    <IconButton icon="locate-fixed" label="Mi ubicación" onClick={onLocate}/>
  </div>;
}
Object.assign(window,{MapTopBar,ResultsPanel,MapControls,OffersStrip});