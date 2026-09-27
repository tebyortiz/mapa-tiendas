import React from 'react';
import { Button } from '../actions/Button.jsx';
const TYPE={tienda:{a:'var(--tienda)',glow:'var(--glow-tienda)',rgb:'255,111,97'},servicio:{a:'var(--servicio)',glow:'var(--glow-servicio)',rgb:'61,139,255'},emprendimiento:{a:'var(--emprendimiento)',glow:'var(--glow-emprendimiento)',rgb:'155,107,255'}};
export function CatalogCard({type='tienda',title,description,image,cta='VER MAPA',onClick,height=560,style}){
  const [h,setH]=React.useState(false);const t=TYPE[type]||TYPE.tienda;const nr=React.useRef(null);const [on,setOn]=React.useState(false);
  React.useEffect(()=>{const rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(rm||!window.IntersectionObserver){setOn(true);return}const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);io.disconnect()}},{threshold:.5});io.observe(nr.current);return()=>io.disconnect()},[]);
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{display:'flex',flexDirection:'column',gap:16,...style}}>
    <div onClick={onClick} style={{position:'relative',height,borderRadius:'var(--radius-sheet)',overflow:'hidden',cursor:'pointer',background:'var(--surface)',boxShadow:h?t.glow:'inset 0 0 0 1px var(--border)',transition:'box-shadow var(--dur-slow) var(--ease-out)'}}>
      <div style={{position:'absolute',inset:0,background:'url('+image+') center/cover',transform:h?'scale(1.04)':'scale(1)',transition:'transform var(--dur-enter) var(--ease-out)'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(7,7,13,0) 50%,rgba(7,7,13,.6) 100%)'}}/>
      <div style={{position:'absolute',left:16,right:16,bottom:22,display:'flex',flexDirection:'column',alignItems:'center',gap:14}}>
        <div ref={nr} className={'cf-neon'+(on?' cf-neon-on':'')} data-type={type} style={{opacity:on?1:.12,maxWidth:'100%',padding:'8px 18px',borderRadius:'var(--radius-panel)',background:'var(--surface-glass)',backdropFilter:'blur(var(--blur-glass))',WebkitBackdropFilter:'blur(var(--blur-glass))',boxShadow:'inset 0 0 0 1px rgba(255,255,255,.25)',fontSize:'clamp(22px,2.4vw,34px)',lineHeight:1.05,textAlign:'center',overflowWrap:'anywhere'}}>{title}</div>
        <Button type={type} icon="map" onClick={e=>{e.stopPropagation();onClick&&onClick(e)}} style={{minWidth:180,letterSpacing:'.06em'}}>{cta}</Button>
      </div>
    </div>
    {description&&<p style={{margin:0,padding:'0 4px',display:'flex',gap:10,alignItems:'flex-start',font:'500 15px/1.5 var(--font-body)',color:'var(--text-muted)'}}><span style={{width:8,height:8,marginTop:7,flex:'none',borderRadius:9,background:t.a,boxShadow:'0 0 8px '+t.a}}/>{description}</p>}
  </div>;
}