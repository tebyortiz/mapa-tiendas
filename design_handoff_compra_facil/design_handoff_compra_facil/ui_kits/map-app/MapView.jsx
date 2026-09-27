function MapView({items,selectedId,onSelect,center=[-33.5765,-69.0155]}){
  const {MapMarker}=window.ComprFCilDesignSystem_3bc5cd;
  const el=React.useRef(null);const map=React.useRef(null);const [,tick]=React.useState(0);
  React.useEffect(()=>{
    const m=L.map(el.current,{zoomControl:false,attributionControl:true}).setView(center,15);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',{attribution:'Tiles © Esri',maxZoom:16}).addTo(m);
    const f=()=>tick(t=>t+1);m.on('move zoom resize',f);map.current=m;window.__cfMap=m;setTimeout(()=>{m.invalidateSize();f()},50);return()=>m.remove();
  },[]);
  React.useEffect(()=>{const s=items.find(i=>i.id===selectedId);if(s&&map.current)map.current.panTo([s.lat-0.0015,s.lng],{animate:true})},[selectedId]);
  const pts=map.current?items.map(b=>({b,p:map.current.latLngToContainerPoint([b.lat,b.lng])})):[];
  return <div style={{position:'absolute',inset:0}}>
    <div ref={el} style={{position:'absolute',inset:0,background:'#0b0b12'}}/>
    <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:400}}>
      {pts.map(({b,p})=>{const s=b.id===selectedId;return <div key={b.id} style={{position:'absolute',left:p.x,top:p.y,transform:'translate(-50%,-100%)',pointerEvents:'auto',zIndex:s?2:1}}><MapMarker type={b.type} category={b.category} selected={s} label={b.name} onClick={()=>onSelect(b.id)}/></div>})}
      <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}><div style={{width:16,height:16,borderRadius:99,background:'#fff',boxShadow:'0 0 0 4px rgba(255,255,255,.2), 0 0 18px rgba(255,255,255,.7)',animation:'cf-pulse 2.4s infinite'}}/></div>
    </div>
  </div>;
}
window.MapView=MapView;