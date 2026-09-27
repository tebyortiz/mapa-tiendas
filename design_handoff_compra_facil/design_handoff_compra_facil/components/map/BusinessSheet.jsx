import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { Badge } from '../display/Badge.jsx';
import { Button } from '../actions/Button.jsx';
import { IconButton } from '../actions/IconButton.jsx';
const TYPE={tienda:{a:'var(--tienda)',b:'var(--tienda-2)',g:'var(--tienda-grad)',soft:'var(--tienda-soft)',glow:'var(--glow-tienda)',rgb:'255,111,97'},servicio:{a:'var(--servicio)',b:'var(--servicio-2)',g:'var(--servicio-grad)',soft:'var(--servicio-soft)',glow:'var(--glow-servicio)',rgb:'61,139,255'},emprendimiento:{a:'var(--emprendimiento)',b:'var(--emprendimiento-2)',g:'var(--emprendimiento-grad)',soft:'var(--emprendimiento-soft)',glow:'var(--glow-emprendimiento)',rgb:'155,107,255'},todas:{a:'#FFFFFF',b:'#FFFFFF',g:'var(--rainbow-grad)',soft:'rgba(255,255,255,.08)',glow:'var(--glow-rainbow)',rgb:'255,255,255'}};
const LBL={tienda:'Tienda',servicio:'Servicio',emprendimiento:'Emprendimiento'};
export function BusinessSheet({type='tienda',name,chain,branch,chainImage,category,categoryLabel,image,description,address,hours,distance,open,hasOffers,onClose,onWeb,onDirections,style}){
  const t=TYPE[type]||TYPE.tienda;const ch=chain||name;const br=branch||name;
  const ini=(ch||'').split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
  return <div role="dialog" aria-label={br} style={{position:'relative',width:'100%',maxWidth:420,borderRadius:'var(--radius-sheet)',overflow:'hidden',background:'var(--surface)',boxShadow:'inset 0 0 0 1px rgba('+t.rgb+',.45), 0 0 40px rgba('+t.rgb+',.18)',fontFamily:'var(--font-body)',flex:'none',...style}}>
    <div style={{height:160,position:'relative',background:image?'url('+image+') center 30%/cover':t.soft,display:'flex',alignItems:'center',justifyContent:'center'}}>{!image&&<Icon category={category} size={48} color={t.a}/>}<div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(18,18,28,0) 45%,var(--surface) 100%)'}}></div></div>
    {onClose&&<IconButton icon="x" label="Cerrar" variant="glass" size={40} onClick={onClose} style={{position:'absolute',top:12,right:12}}/>}
    <div style={{padding:'4px 20px 20px',display:'flex',flexDirection:'column',gap:12}}>
      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}><Badge type={type} variant="solid">{LBL[type]}</Badge>{open!=null&&<Badge status={open?'abierto':'cerrado'}>{open?'Abierto':'Cerrado'}</Badge>}{distance&&<Badge icon="map-pin">{distance}</Badge>}{hasOffers&&<Badge type="todas" variant="solid" icon="tag">Ofertas</Badge>}</div>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:48,height:48,flex:'none',borderRadius:999,background:chainImage?'url('+chainImage+') center/cover':t.g,display:'flex',alignItems:'center',justifyContent:'center',font:'800 16px var(--font-body)',color:'var(--text-on-accent)',boxShadow:'0 0 0 2px var(--surface), 0 0 0 3px rgba('+t.rgb+',.7)'}}>{!chainImage&&ini}</div>
        <div style={{minWidth:0,display:'flex',flexDirection:'column',gap:2}}><div style={{font:'700 13px var(--font-body)',color:'var(--text-muted)'}}>{ch}</div><div style={{font:'800 21px/1.2 var(--font-body)',color:'#fff'}}>{br}</div></div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:6,font:'600 14px var(--font-body)',color:t.b}}><Icon category={category} size={16}/>{categoryLabel}</div>
      {description&&<div style={{font:'400 15px/1.55 var(--font-body)',color:'var(--text-muted)'}}>{description}</div>}
      <div style={{display:'flex',flexDirection:'column',gap:8,padding:'12px 0',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        {address&&<div style={{display:'flex',gap:10,alignItems:'center',font:'500 14px var(--font-body)',color:'var(--text-body)'}}><Icon name="map-pin" size={16} color="var(--text-muted)"/>{address}</div>}
        {hours&&<div style={{display:'flex',gap:10,alignItems:'center',font:'500 14px var(--font-body)',color:'var(--text-body)'}}><Icon name="clock" size={16} color="var(--text-muted)"/>{hours}</div>}
      </div>
      <div style={{display:'flex',gap:8}}><Button type={type} icon="globe" onClick={onWeb} style={{flex:1}}>Visitar web</Button><Button variant="secondary" type={type} icon="navigation" onClick={onDirections}>Cómo llegar</Button></div>
    </div>
  </div>;
}
