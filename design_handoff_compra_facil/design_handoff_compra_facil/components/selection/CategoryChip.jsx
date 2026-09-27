import React from 'react';
import { Icon } from '../icons/Icon.jsx';
const TYPE={tienda:{a:'var(--tienda)',b:'var(--tienda-2)',g:'var(--tienda-grad)',soft:'var(--tienda-soft)',glow:'var(--glow-tienda)',rgb:'255,111,97'},servicio:{a:'var(--servicio)',b:'var(--servicio-2)',g:'var(--servicio-grad)',soft:'var(--servicio-soft)',glow:'var(--glow-servicio)',rgb:'61,139,255'},emprendimiento:{a:'var(--emprendimiento)',b:'var(--emprendimiento-2)',g:'var(--emprendimiento-grad)',soft:'var(--emprendimiento-soft)',glow:'var(--glow-emprendimiento)',rgb:'155,107,255'},todas:{a:'#FFFFFF',b:'#FFFFFF',g:'var(--rainbow-grad)',soft:'rgba(255,255,255,.08)',glow:'var(--glow-rainbow)',rgb:'255,255,255'}};
export function CategoryChip({label,category,icon,type='todas',selected,count,onClick,style,...rest}){
  const [h,setH]=React.useState(false);const t=TYPE[type]||TYPE.todas;
  return <button aria-pressed={!!selected} onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} {...rest} style={{display:'inline-flex',alignItems:'center',gap:8,height:40,minHeight:40,padding:'0 16px 0 12px',borderRadius:'var(--radius-pill)',border:'none',cursor:'pointer',whiteSpace:'nowrap',flex:'none',fontFamily:'var(--font-body)',fontWeight:700,fontSize:14,
    background:selected?t.g:(h?'var(--surface-raised)':'var(--surface)'),color:selected?'var(--text-on-accent)':'var(--text-strong)',
    boxShadow:selected?t.glow:'inset 0 0 0 1px '+(h?'rgba('+t.rgb+',.6)':'var(--border-strong)'),transition:'background var(--dur-base), box-shadow var(--dur-base)',...style}}>
    <Icon name={icon} category={icon?undefined:category} size={18} color={selected?'var(--cf-black)':(type==='todas'?'currentColor':t.a)}/>
    {label}{count!=null&&<span style={{fontWeight:600,fontSize:12,opacity:.7}}>{count}</span>}
  </button>;
}