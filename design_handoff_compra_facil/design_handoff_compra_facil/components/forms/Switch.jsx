import React from 'react';
const TYPE={tienda:{a:'var(--tienda)',b:'var(--tienda-2)',g:'var(--tienda-grad)',soft:'var(--tienda-soft)',glow:'var(--glow-tienda)',rgb:'255,111,97'},servicio:{a:'var(--servicio)',b:'var(--servicio-2)',g:'var(--servicio-grad)',soft:'var(--servicio-soft)',glow:'var(--glow-servicio)',rgb:'61,139,255'},emprendimiento:{a:'var(--emprendimiento)',b:'var(--emprendimiento-2)',g:'var(--emprendimiento-grad)',soft:'var(--emprendimiento-soft)',glow:'var(--glow-emprendimiento)',rgb:'155,107,255'},todas:{a:'#FFFFFF',b:'#FFFFFF',g:'var(--rainbow-grad)',soft:'rgba(255,255,255,.08)',glow:'var(--glow-rainbow)',rgb:'255,255,255'}};
export function Switch({checked,defaultChecked,onChange,label,type='todas',disabled,style}){
  const [c,setC]=React.useState(!!defaultChecked);const on=checked!=null?checked:c;const t=TYPE[type]||TYPE.todas;
  return <label style={{display:'inline-flex',alignItems:'center',gap:12,minHeight:44,cursor:disabled?'not-allowed':'pointer',opacity:disabled?.4:1,font:'600 15px var(--font-body)',color:'var(--text-strong)',...style}}>
    <button role="switch" aria-checked={on} disabled={disabled} onClick={()=>{setC(!on);onChange&&onChange(!on)}} style={{position:'relative',width:48,height:28,borderRadius:999,border:'none',padding:0,cursor:'inherit',background:on?t.g:'var(--cf-ink-500)',boxShadow:on?t.glow:'inset 0 0 0 1px var(--border-strong)',transition:'background var(--dur-base)'}}>
      <span style={{position:'absolute',top:3,left:on?23:3,width:22,height:22,borderRadius:999,background:on?'var(--cf-black)':'#fff',transition:'left var(--dur-base) var(--ease-spring)'}}/>
    </button>{label}
  </label>;
}