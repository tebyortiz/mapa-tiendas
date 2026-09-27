import React from 'react';
const K='var(--cf-rb-coral)',S='var(--cf-rb-sky)',V='var(--cf-rb-violet)';
const P={rainbow:[V,S,K],tienda:[K,S,V],servicio:[S,V,K],emprendimiento:[V,K,S]};
export function GlowBackdrop({palette='rainbow',intensity=.42,parallax=true,style}){
  const ref=React.useRef(null);const [y,setY]=React.useState(0);
  React.useEffect(()=>{if(!parallax)return;const rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(rm)return;
    let sc=ref.current&&ref.current.closest('[data-scroll]')||window;const f=()=>{const r=ref.current&&ref.current.getBoundingClientRect();if(r)setY(Math.max(-600,Math.min(600,-r.top)))};f();sc.addEventListener('scroll',f,{passive:true});return()=>sc.removeEventListener('scroll',f)},[parallax]);
  const c=P[palette]||P.rainbow;
  const b=(i,x,t,w,sp,dl)=>({position:'absolute',left:x,top:t,width:w,height:w,borderRadius:'50%',background:c[i],filter:'blur(var(--blur-blob))',opacity:intensity,transform:'translate3d(0,'+(-y*sp)+'px,0)',willChange:'transform'});
  const inner=(d)=>({width:'100%',height:'100%',borderRadius:'50%',background:'inherit',animation:'cf-drift var(--dur-drift) var(--ease-in-out) '+d+'s infinite'});
  return <div ref={ref} aria-hidden="true" style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none',zIndex:0,...style}}>
    <div style={b(0,'-10%','-8%','46vmax',.15)}><div style={inner(0)}/></div>
    <div style={b(1,'45%','20%','40vmax',.28)}><div style={inner(-7)}/></div>
    <div style={b(2,'70%','-12%','36vmax',.08)}><div style={inner(-13)}/></div>
  </div>;
}