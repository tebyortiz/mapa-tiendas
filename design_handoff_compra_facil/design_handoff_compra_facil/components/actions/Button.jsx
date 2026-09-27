import React from 'react';
import { Icon } from '../icons/Icon.jsx';
const TYPE={tienda:{a:'var(--tienda)',b:'var(--tienda-2)',g:'var(--tienda-grad)',soft:'var(--tienda-soft)',glow:'var(--glow-tienda)',rgb:'255,111,97'},servicio:{a:'var(--servicio)',b:'var(--servicio-2)',g:'var(--servicio-grad)',soft:'var(--servicio-soft)',glow:'var(--glow-servicio)',rgb:'61,139,255'},emprendimiento:{a:'var(--emprendimiento)',b:'var(--emprendimiento-2)',g:'var(--emprendimiento-grad)',soft:'var(--emprendimiento-soft)',glow:'var(--glow-emprendimiento)',rgb:'155,107,255'},todas:{a:'#FFFFFF',b:'#FFFFFF',g:'var(--rainbow-grad)',soft:'rgba(255,255,255,.08)',glow:'var(--glow-rainbow)',rgb:'255,255,255'}};
const SZ={sm:{h:36,px:16,fs:14,ic:16},md:{h:44,px:22,fs:15,ic:18},lg:{h:52,px:28,fs:16,ic:20}};
export function Button({children,variant='primary',type='todas',size='md',icon,iconRight,disabled,fullWidth,onClick,style,...rest}){
  const [h,setH]=React.useState(false);const [p,setP]=React.useState(false);
  const t=TYPE[type]||TYPE.todas;const s=SZ[size]||SZ.md;
  const base={display:'inline-flex',alignItems:'center',justifyContent:'center',gap:8,height:s.h,minHeight:44,padding:'0 '+s.px+'px',borderRadius:'var(--radius-pill)',fontFamily:'var(--font-body)',fontWeight:800,fontSize:s.fs,letterSpacing:'.01em',cursor:disabled?'not-allowed':'pointer',border:'none',width:fullWidth?'100%':undefined,transition:'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base)',transform:p&&!disabled?'scale(.97)':'none',opacity:disabled?.4:1,whiteSpace:'nowrap'};
  const v={
    primary:{background:t.g,color:'var(--text-on-accent)',boxShadow:h&&!disabled?t.glow:'none'},
    secondary:{background:h&&!disabled?'var(--surface-raised)':'var(--surface)',color:'var(--text-strong)',boxShadow:'inset 0 0 0 1px '+(h&&!disabled?'rgba('+t.rgb+',.7)':'var(--border-strong)')},
    ghost:{background:h&&!disabled?'rgba(255,255,255,.08)':'transparent',color:'var(--text-strong)'},
    glass:{background:h&&!disabled?'rgba(255,255,255,.28)':'var(--surface-glass)',color:'#fff',backdropFilter:'blur(var(--blur-glass))',WebkitBackdropFilter:'blur(var(--blur-glass))',boxShadow:'inset 0 0 0 1px rgba(255,255,255,.25)'}
  }[variant];
  return <button disabled={disabled} onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>{setH(false);setP(false)}} onMouseDown={()=>setP(true)} onMouseUp={()=>setP(false)} {...rest} style={{...base,...v,...style}}>
    {icon&&<Icon name={icon} size={s.ic}/>}{children}{iconRight&&<Icon name={iconRight} size={s.ic}/>}
  </button>;
}