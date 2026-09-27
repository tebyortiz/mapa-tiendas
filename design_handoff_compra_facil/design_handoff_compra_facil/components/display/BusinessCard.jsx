import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Badge } from './Badge.jsx';
const TYPE={tienda:{a:'var(--tienda)',b:'var(--tienda-2)',g:'var(--tienda-grad)',soft:'var(--tienda-soft)',glow:'var(--glow-tienda)',rgb:'255,111,97'},servicio:{a:'var(--servicio)',b:'var(--servicio-2)',g:'var(--servicio-grad)',soft:'var(--servicio-soft)',glow:'var(--glow-servicio)',rgb:'61,139,255'},emprendimiento:{a:'var(--emprendimiento)',b:'var(--emprendimiento-2)',g:'var(--emprendimiento-grad)',soft:'var(--emprendimiento-soft)',glow:'var(--glow-emprendimiento)',rgb:'155,107,255'},todas:{a:'#FFFFFF',b:'#FFFFFF',g:'var(--rainbow-grad)',soft:'rgba(255,255,255,.08)',glow:'var(--glow-rainbow)',rgb:'255,255,255'}};
export function BusinessCard({type='tienda',name,category,categoryLabel,distance,open,address,image,hasOffers,selected,onClick,style}){
  const [h,setH]=React.useState(false);const t=TYPE[type]||TYPE.tienda;
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{display:'flex',gap:10,alignItems:'center',width:'100%',padding:10,border:'none',cursor:'pointer',textAlign:'left',borderRadius:'var(--radius-card)',background:h||selected?'var(--surface-raised)':'var(--surface)',boxShadow:selected?t.glow:'inset 0 0 0 1px var(--border)',transition:'background var(--dur-base), box-shadow var(--dur-base)',...style}}>
    <div style={{width:64,height:64,flex:'none',borderRadius:'var(--radius-sm)',background:image?'url('+image+') center/cover':t.soft,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'inset 0 0 0 1px rgba('+t.rgb+',.5)'}}>{!image&&<Icon category={category} size={26} color={t.a}/>}</div>
    <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',gap:4}}>
      <div style={{font:'800 16px/1.25 var(--font-body)',color:'#fff',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{name}</div>
      <div style={{display:'flex',alignItems:'center',gap:6,minWidth:0,overflow:'hidden',whiteSpace:'nowrap',font:'600 13px var(--font-body)',color:'var(--text-muted)'}}><Icon category={category} size={14} color={t.a}/>{categoryLabel}{address&&<span style={{minWidth:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>· {address}</span>}</div>
      <div style={{display:'flex',gap:6,marginTop:2,flexWrap:'nowrap',minWidth:0}}>{open!=null&&<Badge status={open?'abierto':'cerrado'}>{open?'Abierto':'Cerrado'}</Badge>}{distance&&<Badge icon="map-pin">{distance}</Badge>}{hasOffers&&<Badge type="todas" variant="solid" icon="tag">Ofertas</Badge>}</div>
    </div>
    <Icon name="chevron-right" size={18} color="var(--text-subtle)"/>
  </button>;
}
