/* MayaRealm — concept art gallery scenes (characters & worlds)
   Classic script (no build step). Load order is set in index.html. */
'use strict';
/* ---------- Concept art: characters & worlds ---------- */
function drawFigure(ctx,x,b,s,o,T){
  const A=o.accent,br=1+Math.sin(T*1.2)*.006,sway=Math.sin(T*.8)*s*.012;
  ctx.save();ctx.translate(x,b);ctx.scale(1,br);ctx.translate(-x,-b);
  const body=new Path2D();body.moveTo(x-s*.05,b-s*.8);body.quadraticCurveTo(x-s*.17,b-s*.79,x-s*.2,b-s*.7);body.quadraticCurveTo(x-s*.24,b-s*.35,x-s*.28-sway,b-s*.02);body.quadraticCurveTo(x-s*.14,b+s*.015,x-s*.02,b-s*.01+sway*.5);body.quadraticCurveTo(x+s*.12,b+s*.02,x+s*.26-sway,b-s*.01);body.quadraticCurveTo(x+s*.23,b-s*.38,x+s*.2,b-s*.7);body.quadraticCurveTo(x+s*.17,b-s*.79,x+s*.05,b-s*.8);body.closePath();
  ctx.fillStyle='#07060b';ctx.fill(body);
  const hr=s*.062,hy=b-s*.88,head=new Path2D();
  if(o.hood){head.moveTo(x-s*.1,b-s*.76);head.quadraticCurveTo(x-s*.115,b-s*.95,x+s*.005,b-s*1);head.quadraticCurveTo(x+s*.11,b-s*.96,x+s*.1,b-s*.76);head.closePath()}else rr(head,x-hr,hy-hr*1.15,hr*2,hr*2.35,hr*.8);
  ctx.fill(head);
  const pads=[];if(o.pauldrons){for(const d of[-1,1]){const p=new Path2D();p.ellipse(x+d*s*.17,b-s*.72,s*.075,s*.036,d*.35,0,TAU);pads.push(p);ctx.fill(p)}}
  ctx.globalCompositeOperation='lighter';ctx.strokeStyle=rgba(A,.6);ctx.lineWidth=1.2;ctx.stroke(body);ctx.stroke(head);pads.forEach(p=>ctx.stroke(p));
  ctx.strokeStyle=rgba(A,.13);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x-s*.04,b-s*.7);ctx.quadraticCurveTo(x-s*.08,b-s*.35,x-s*.12,b-s*.02);ctx.moveTo(x+s*.05,b-s*.68);ctx.quadraticCurveTo(x+s*.08,b-s*.3,x+s*.1,b-s*.02);ctx.stroke();
  if(o.hood){const ey=b-s*.875;dotGlow(ctx,A,x-s*.022,ey,s*.05,.9);dotGlow(ctx,A,x+s*.022,ey,s*.05,.9);ctx.fillStyle=C.w;ctx.fillRect(x-s*.028,ey-.8,s*.012,1.6);ctx.fillRect(x+s*.016,ey-.8,s*.012,1.6)}
  else{const vy=hy-hr*.1;ctx.fillStyle=rgba(A,.95);ctx.fillRect(x-hr*.8,vy,hr*1.6,Math.max(1.5,hr*.18));dotGlow(ctx,A,x,vy,hr*3,.6)}
  if(o.core){dotGlow(ctx,A,x,b-s*.6,s*.12,.85+.15*Math.sin(T*2));dotGlow(ctx,C.w,x,b-s*.6,s*.03,1)}
  if(o.weapon==='staff'){ctx.strokeStyle=rgba(C.w,.5);ctx.lineWidth=Math.max(1,s*.008);ctx.beginPath();ctx.moveTo(x+s*.25,b+s*.01);ctx.lineTo(x+s*.31,b-s*1.02);ctx.stroke();const tx=x+s*.31,ty=b-s*1.05;dotGlow(ctx,A,tx,ty,s*.2,.9);dotGlow(ctx,C.w,tx,ty,s*.04,1);ctx.lineWidth=1;ctx.beginPath();ctx.arc(tx,ty,s*.035,T,T+4);ctx.strokeStyle=rgba(A,.8);ctx.stroke()}
  if(o.weapon==='blade'){ctx.lineCap='round';ctx.strokeStyle=rgba(A,.9);ctx.lineWidth=Math.max(1.5,s*.01);ctx.beginPath();ctx.moveTo(x-s*.21,b-s*.42);ctx.lineTo(x-s*.46,b-s*.06);ctx.stroke();ctx.strokeStyle=rgba(C.w,.9);ctx.lineWidth=1;ctx.stroke();dotGlow(ctx,A,x-s*.34,b-s*.24,s*.35,.35)}
  ctx.globalCompositeOperation='source-over';ctx.restore();
}
function charScene(o){
  const st={};
  return{
    init(w,h){const r=mulberry(o.seed);st.p=Array.from({length:26},()=>({x:r()*w,y:r()*h,v:.1+r()*.35,s:.5+r()*1.5,ph:r()*TAU}))},
    draw(ctx,w,h,t){const T=t/1000,A=o.accent;let g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,o.top);g.addColorStop(1,'#050505');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
      const s=h*.58,x=w*.5,base=h*.8;
      haze(ctx,x,base-s*.55,w*.75,A,.22);
      ctx.globalCompositeOperation='lighter';
      for(let i=0;i<5;i++){const o2=(i-2),sw=Math.sin(T*.2+i)*w*.02;ctx.beginPath();ctx.moveTo(x+o2*w*.04,-10);ctx.lineTo(x+o2*w*.24-w*.06+sw,h);ctx.lineTo(x+o2*w*.24+w*.06+sw,h);ctx.closePath();ctx.fillStyle=rgba(A,.03);ctx.fill()}
      const hy=base-s*.88;ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,hy,s*.2,0,TAU);ctx.strokeStyle=rgba(A,.35);ctx.stroke();ctx.setLineDash([2,6]);ctx.beginPath();ctx.arc(x,hy,s*.26,T*.2,T*.2+TAU);ctx.strokeStyle=rgba(C.w,.2);ctx.stroke();ctx.setLineDash([]);
      haze(ctx,x,base,w*.42,A,.35,1,.18);
      ctx.globalCompositeOperation='source-over';
      drawFigure(ctx,x,base,s,o,T);
      ctx.globalCompositeOperation='lighter';for(const p of st.p){p.y-=p.v;if(p.y<0)p.y=h;dotGlow(ctx,A,p.x+Math.sin(T+p.ph)*4,p.y,p.s*6,.45)}ctx.globalCompositeOperation='source-over';
      haze(ctx,x,h,w*.8,'#050505',.9,1,.35)}
  };
}
function landScene(o){
  const st={};
  const ridge=(x,sd,amp,base)=>base+(Math.sin(x*.011+sd)*.5+Math.sin(x*.027+sd*2)*.3+Math.sin(x*.063+sd*3)*.2)*amp;
  return{
    init(w,h){const r=mulberry(o.seed);st.deb=Array.from({length:18},()=>({x:r()*w,y:r()*h*.6,s:2+r()*6,a:r()*TAU,v:(r()-.5)*.5,f:.3+r()*.7}));st.cr=Array.from({length:9},()=>({x:r(),h:.08+r()*.22,w:.02+r()*.04,l:r()<.5,o:r()}))},
    draw(ctx,w,h,t){const T=t/1000,A=o.accent;let g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,o.top);g.addColorStop(.65,'#07060b');g.addColorStop(1,'#050505');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
      ctx.globalCompositeOperation='lighter';
      if(o.kind==='spire'){dotGlow(ctx,C.v,w*.26,h*.2,w*.55,.5);dotGlow(ctx,C.w,w*.26,h*.2,w*.06,.9);dotGlow(ctx,C.m,w*.78,h*.13,w*.38,.4);dotGlow(ctx,C.w,w*.78,h*.13,w*.035,.8)}
      if(o.kind==='crystal'){for(let i=0;i<3;i++){ctx.beginPath();for(let x=0;x<=w;x+=8){const y=h*(.16+i*.07)+Math.sin(x*.012+T*.3+i)*h*.04;x?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.strokeStyle=rgba(i===1?C.b:C.m,.16);ctx.lineWidth=h*.03;ctx.stroke()}ctx.lineWidth=1}
      ctx.globalCompositeOperation='source-over';
      if(o.kind==='tide'){const mx=w*.62,my=h*.3,mr=w*.28;haze(ctx,mx,my,mr*1.9,C.b,.1);ctx.beginPath();ctx.arc(mx,my,mr,0,TAU);g=ctx.createRadialGradient(mx-mr*.3,my-mr*.3,0,mx,my,mr);g.addColorStop(0,'#2a3140');g.addColorStop(1,'#0c0f16');ctx.fillStyle=g;ctx.fill();ctx.strokeStyle=rgba(C.b,.3);ctx.stroke()}
      [['#130d1e',.5,h*.05],['#0b0812',.62,h*.07],['#070509',.74,h*.05]].forEach(([c,bf,amp],i)=>{ctx.beginPath();ctx.moveTo(0,h);for(let x=0;x<=w+6;x+=6)ctx.lineTo(x,ridge(x,o.seed+i*3,amp,h*bf));ctx.lineTo(w,h);ctx.closePath();ctx.fillStyle=c;ctx.fill();if(i===0){ctx.beginPath();for(let x=0;x<=w+6;x+=6)ctx.lineTo(x,ridge(x,o.seed,amp,h*bf));ctx.strokeStyle=rgba(A,.28);ctx.stroke()}});
      if(o.kind==='spire'){const x=w*.5,b=h*.66,H=h*.6,W=w*.07;ctx.beginPath();ctx.moveTo(x-W,b);ctx.lineTo(x-W*.25,b-H);ctx.lineTo(x+W*.25,b-H);ctx.lineTo(x+W,b);ctx.closePath();ctx.fillStyle='#0a0710';ctx.fill();ctx.strokeStyle=rgba(A,.55);ctx.beginPath();ctx.moveTo(x+W,b);ctx.lineTo(x+W*.25,b-H);ctx.stroke();
        const ry=b-H*.72+Math.sin(T*.6)*3;ctx.globalCompositeOperation='lighter';ctx.beginPath();ctx.ellipse(x,ry,W*.7,W*.22,0,0,TAU);ctx.strokeStyle=rgba(A,.9);ctx.lineWidth=1.6;ctx.stroke();ctx.lineWidth=1;dotGlow(ctx,A,x,ry,W*4,.5);dotGlow(ctx,C.w,x,b-H,W*1.2,.7);ctx.globalCompositeOperation='source-over'}
      if(o.kind==='tide'){const sea=h*.7;for(const c of st.cr){const x=c.x*w,hh=c.h*h;ctx.fillStyle='#0a0c12';ctx.fillRect(x-c.w*w/2,sea-hh,c.w*w,hh);if(c.l){ctx.fillStyle=rgba(C.b,.6);ctx.fillRect(x-1,sea-hh*.7,2,2)}}
        g=ctx.createLinearGradient(0,sea,0,h);g.addColorStop(0,'#1b1f28');g.addColorStop(1,'#07080b');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,h);for(let x=0;x<=w+6;x+=6)ctx.lineTo(x,sea+Math.sin(x*.03+T*.8)*3+Math.sin(x*.011-T*.5)*4);ctx.lineTo(w,h);ctx.closePath();ctx.fill();
        ctx.strokeStyle=rgba(C.w,.1);for(let k=1;k<7;k++){ctx.beginPath();const y=sea+k*(h-sea)/7;for(let x=0;x<=w+8;x+=8)ctx.lineTo(x,y+Math.sin(x*.04+T*(1+k*.2)+k)*2);ctx.stroke()}}
      if(o.kind==='crystal'){ctx.globalCompositeOperation='lighter';for(const c of st.cr){const x=c.x*w,b=h*(.78+c.o*.12),hh=c.h*h*1.3,ww=c.w*w;ctx.beginPath();ctx.moveTo(x-ww/2,b);ctx.lineTo(x+(c.l?ww*.3:-ww*.3),b-hh);ctx.lineTo(x+ww/2,b);ctx.closePath();g=ctx.createLinearGradient(0,b-hh,0,b);g.addColorStop(0,rgba(A,.7));g.addColorStop(1,rgba(A,.05));ctx.fillStyle=g;ctx.fill();dotGlow(ctx,A,x,b-hh*.4,ww*5,.25+.15*Math.sin(T*1.5+x))}ctx.globalCompositeOperation='source-over'}
      ctx.globalCompositeOperation='lighter';for(const d of st.deb){ctx.save();ctx.translate(d.x+Math.sin(T*.3+d.a)*6,d.y+Math.cos(T*.4+d.a)*5);ctx.rotate(d.a+T*d.v);ctx.beginPath();ctx.moveTo(0,-d.s);ctx.lineTo(d.s*.7,d.s*.5);ctx.lineTo(-d.s*.6,d.s*.4);ctx.closePath();ctx.strokeStyle=rgba(A,.35*d.f);ctx.stroke();ctx.restore()}ctx.globalCompositeOperation='source-over';
      haze(ctx,w*.5,h*.92,w*.9,'#050505',.85,1,.4)}
  };
}
const REALMS=[
  ()=>charScene({seed:31,accent:C.b,top:'#08121d',weapon:'blade'}),
  ()=>landScene({seed:12,accent:C.v,top:'#140b24',kind:'spire'}),
  ()=>charScene({seed:47,accent:C.m,top:'#17091c',hood:true,weapon:'staff',pauldrons:true}),
  ()=>landScene({seed:5,accent:C.b,top:'#0b1119',kind:'tide'}),
  ()=>charScene({seed:63,accent:C.v,top:'#110a1e',hood:true,core:true}),
  ()=>landScene({seed:23,accent:C.m,top:'#10081a',kind:'crystal'})
];

