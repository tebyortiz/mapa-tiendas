import React from 'react';
const CDN='https://unpkg.com/lucide-static@0.469.0/icons/';
const cache={},pending={};
function load(n){if(cache[n]!=null)return Promise.resolve(cache[n]);if(!pending[n])pending[n]=fetch(CDN+n+'.svg').then(r=>r.ok?r.text():'').then(t=>{t=t.replace(/<!--[\s\S]*?-->/g,'').replace(/<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'').trim();cache[n]=t;return t}).catch(()=>{cache[n]='';return ''});return pending[n];}
export const CATEGORY_ICONS={supermercado:'store',restaurant:'hand-platter',ferreteria:'wrench',ropa:'shirt',electronica:'headphones',farmacia:'briefcase-medical',automotriz:'car-front',mascotas:'dog',hogar:'sofa',entretenimiento:'gamepad-2',otros:'store'};
export function Icon({name='store',category,size=20,color='currentColor',label,style,...rest}){
  const n=category?(CATEGORY_ICONS[category]||'store'):name;
  const [body,setBody]=React.useState(cache[n]||'');
  React.useEffect(()=>{let on=true;if(cache[n]!=null)setBody(cache[n]);else load(n).then(t=>{if(on)setBody(t)});return()=>{on=false}},[n]);
  return <span role={label?'img':undefined} aria-label={label} aria-hidden={label?undefined:true} {...rest} style={{display:'inline-flex',flex:'none',width:size,height:size,color,...style}}><svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'block'}} dangerouslySetInnerHTML={{__html:body}}/></span>;
}
