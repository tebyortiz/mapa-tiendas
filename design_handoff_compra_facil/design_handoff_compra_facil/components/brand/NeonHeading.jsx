import React from 'react';
export function NeonHeading({children,as='h2',type,size,flicker=true,style,...rest}){
  const ref=React.useRef(null);const [on,setOn]=React.useState(!flicker);
  React.useEffect(()=>{if(!flicker||!ref.current)return;const rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(rm){setOn(true);return}
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);io.disconnect()}},{threshold:.4});io.observe(ref.current);return()=>io.disconnect()},[flicker]);
  const T=as;const fs=size||({h1:'var(--fs-display)',h2:'var(--fs-h1)',h3:'28px'}[as]||'var(--fs-h1)');
  return <T ref={ref} data-type={type} className={'cf-neon'+(flicker&&on?' cf-neon-on':'')} {...rest} style={{margin:0,fontSize:fs,lineHeight:1.05,opacity:on?1:0.12,textWrap:'balance',...style}}>{children}</T>;
}