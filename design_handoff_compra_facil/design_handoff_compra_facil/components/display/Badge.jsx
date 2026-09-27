import React from 'react';
import { Icon } from '../icons/Icon.jsx';
const TYPE={tienda:{a:'var(--tienda)',b:'var(--tienda-2)',g:'var(--tienda-grad)',soft:'var(--tienda-soft)',glow:'var(--glow-tienda)',rgb:'255,111,97'},servicio:{a:'var(--servicio)',b:'var(--servicio-2)',g:'var(--servicio-grad)',soft:'var(--servicio-soft)',glow:'var(--glow-servicio)',rgb:'61,139,255'},emprendimiento:{a:'var(--emprendimiento)',b:'var(--emprendimiento-2)',g:'var(--emprendimiento-grad)',soft:'var(--emprendimiento-soft)',glow:'var(--glow-emprendimiento)',rgb:'155,107,255'},todas:{a:'#FFFFFF',b:'#FFFFFF',g:'var(--rainbow-grad)',soft:'rgba(255,255,255,.08)',glow:'var(--glow-rainbow)',rgb:'255,255,255'}};
export function Badge({children,type,status,icon,variant='soft',style}){
  let fg='var(--text-strong)',bg='rgba(255,255,255,.08)',ring='var(--border-strong)';
  if(status==='abierto'){fg='var(--cf-success)';bg='rgba(91,227,160,.12)';ring='rgba(91,227,160,.4)'}
  else if(status==='cerrado'){fg='var(--cf-danger)';bg='rgba(255,90,110,.12)';ring='rgba(255,90,110,.4)'}
  else if(type&&TYPE[type]){const t=TYPE[type];if(variant==='solid'){fg='var(--text-on-accent)';bg=t.g;ring='transparent'}else{fg=type==='todas'?'#fff':t.b;bg=t.soft;ring='rgba('+t.rgb+',.45)'}}
  return <span style={{display:'inline-flex',alignItems:'center',gap:5,height:24,padding:'0 10px',borderRadius:'var(--radius-pill)',font:'700 12px var(--font-body)',letterSpacing:'.02em',color:fg,background:bg,boxShadow:'inset 0 0 0 1px '+ring,whiteSpace:'nowrap',...style}}>
    {status&&!icon&&<span style={{width:6,height:6,borderRadius:9,background:'currentColor',boxShadow:'0 0 6px currentColor'}}/>}
    {icon&&<Icon name={icon} size={13}/>}{children}
  </span>;
}