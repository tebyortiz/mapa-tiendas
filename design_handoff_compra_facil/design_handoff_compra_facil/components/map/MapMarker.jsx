import React from 'react';
import { Icon } from '../icons/Icon.jsx';
const TYPE={tienda:{a:'var(--tienda)',b:'var(--tienda-2)',g:'var(--tienda-grad)',soft:'var(--tienda-soft)',glow:'var(--glow-tienda)',rgb:'255,111,97'},servicio:{a:'var(--servicio)',b:'var(--servicio-2)',g:'var(--servicio-grad)',soft:'var(--servicio-soft)',glow:'var(--glow-servicio)',rgb:'61,139,255'},emprendimiento:{a:'var(--emprendimiento)',b:'var(--emprendimiento-2)',g:'var(--emprendimiento-grad)',soft:'var(--emprendimiento-soft)',glow:'var(--glow-emprendimiento)',rgb:'155,107,255'},todas:{a:'#FFFFFF',b:'#FFFFFF',g:'var(--rainbow-grad)',soft:'rgba(255,255,255,.08)',glow:'var(--glow-rainbow)',rgb:'255,255,255'}};
export function MapMarker({type='tienda',category,selected,label,onClick,style}){
  const t=TYPE[type]||TYPE.tienda;const s=selected?52:40;
  return <button aria-label={label} onClick={onClick} style={{position:'relative',display:'inline-flex',flexDirection:'column',alignItems:'center',background:'none',border:'none',padding:0,cursor:'pointer',transform:selected?'translateY(-4px)':'none',transition:'transform var(--dur-base) var(--ease-spring)',...style}}>
    <span style={{width:s,height:s,borderRadius:999,padding:selected?3:2,background:t.g,boxShadow:selected?t.glow:'0 0 12px rgba('+t.rgb+',.55)',transition:'all var(--dur-base) var(--ease-spring)',boxSizing:'border-box'}}>
      <span style={{width:'100%',height:'100%',borderRadius:999,background:selected?'transparent':'var(--cf-black)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon category={category} size={selected?24:18} color={selected?'var(--cf-black)':t.a}/></span>
    </span>
    <span style={{width:2,height:selected?10:7,background:t.a,marginTop:-1,boxShadow:'0 0 6px '+t.a}}/>
    {selected&&label&&<span style={{position:'absolute',top:'100%',marginTop:4,padding:'4px 10px',borderRadius:999,background:'var(--surface-glass-dark)',backdropFilter:'blur(12px)',boxShadow:'inset 0 0 0 1px rgba('+t.rgb+',.5)',font:'800 12px var(--font-body)',color:'#fff',whiteSpace:'nowrap'}}>{label}</span>}
  </button>;
}