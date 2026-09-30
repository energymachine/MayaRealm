/* MayaRealm — hero scene: the floating realm
   Classic script (no build step). Load order is set in index.html. */
'use strict';
/* ---------- hero: floating realm ---------- */
function renderIsland(R,seed){
  const r=mulberry(seed),W=R*3,H=R*3.7,ox=W/2,top=R*1.5;const[c,g]=offscreen(W,H);
  const tipX=ox+R*.14,depth=R*2.05,N=26,L=[],Rt=[];
  for(let i=0;i<=N;i++){const tt=i/N,mid=ox+(tipX-ox)*tt,wd=R*Math.pow(1-tt,.8),j=()=>(r()-.5)*R*.09*(1-tt*.5);
    L.push([mid-wd+j(),top+tt*depth+(r()-.5)*R*.05]);Rt.push([mid+wd+j(),top+tt*depth+(r()-.5)*R*.05])}
  L[0]=[ox-R,top];Rt[0]=[ox+R,top];L[N]=[tipX,top+depth];Rt[N]=[tipX,top+depth];
  const rock=new Path2D();rock.moveTo(L[0][0],L[0][1]);L.forEach(p=>rock.lineTo(p[0],p[1]));for(let i=N;i>=0;i--)rock.lineTo(Rt[i][0],Rt[i][1]);rock.closePath();
  let gr=g.createLinearGradient(0,top,0,top+depth);gr.addColorStop(0,'#251843');gr.addColorStop(.25,'#130c20');gr.addColorStop(1,'#050408');g.fillStyle=gr;g.fill(rock);
  g.save();g.clip(rock);
  gr=g.createLinearGradient(ox-R,0,ox+R,0);gr.addColorStop(0,'rgba(0,0,0,.55)');gr.addColorStop(.6,'rgba(0,0,0,0)');gr.addColorStop(1,rgba(C.v,.14));g.fillStyle=gr;g.fillRect(0,0,W,H);
  for(let k=0;k<7;k++){const y=top+R*(.18+k*.24);g.beginPath();for(let x=ox-R;x<=ox+R;x+=R*.08){const yy=y+(r()-.5)*R*.05;x===ox-R?g.moveTo(x,yy):g.lineTo(x,yy)}g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=2;g.stroke();g.strokeStyle=rgba(C.v,.07);g.lineWidth=1;g.stroke()}
  g.globalCompositeOperation='lighter';
  for(let k=0;k<6;k++){let x=ox+(r()-.5)*R*1.2,y=top+R*.1;g.beginPath();g.moveTo(x,y);for(let s=0;s<9;s++){x+=(r()-.5)*R*.16;y+=R*.12+r()*R*.06;g.lineTo(x,y)}g.strokeStyle=rgba(k%2?C.m:C.v,.3);g.lineWidth=1;g.stroke()}
  g.restore();
  const rim=new Path2D();rim.moveTo(Rt[0][0],Rt[0][1]);Rt.forEach(p=>rim.lineTo(p[0],p[1]));
  gr=g.createLinearGradient(0,top,0,top+depth);gr.addColorStop(0,rgba(C.v,.85));gr.addColorStop(1,rgba(C.m,0));g.strokeStyle=gr;g.lineWidth=1.4;g.stroke(rim);
  const rimL=new Path2D();rimL.moveTo(L[0][0],L[0][1]);L.forEach(p=>rimL.lineTo(p[0],p[1]));g.strokeStyle=rgba(C.b,.14);g.lineWidth=1;g.stroke(rimL);
  g.beginPath();g.ellipse(ox,top,R,R*.15,0,0,TAU);g.fillStyle='#1a1129';g.fill();
  g.beginPath();g.ellipse(ox,top,R,R*.15,0,0,Math.PI);g.strokeStyle=rgba(C.m,.35);g.stroke();
  const B=[];for(let i=0;i<30;i++){const xo=r()*2-1,z=r()*2-1,hf=Math.pow(1-Math.abs(xo),1.7);B.push({x:ox+xo*R*.8,z,y:top+z*R*.1,h:R*(.08+hf*.72*(.4+r()*.6)),w:R*(.028+r()*.05),sp:r()})}
  B.push({x:ox+R*.03,z:.01,y:top,h:R*1.22,w:R*.06,sp:1,main:true});B.sort((a,b)=>a.z-b.z);
  for(const b of B){const{x,y,h,w}=b;g.beginPath();g.moveTo(x-w/2,y);g.lineTo(x-w*.32,y-h);if(b.main||b.sp>.6)g.lineTo(x,y-h-w*(b.main?3:1.4));g.lineTo(x+w*.32,y-h);g.lineTo(x+w/2,y);g.closePath();
    const bg=g.createLinearGradient(0,y-h,0,y);bg.addColorStop(0,'#1e1535');bg.addColorStop(1,'#08060d');g.fillStyle=bg;g.fill();
    g.beginPath();g.moveTo(x+w/2,y);g.lineTo(x+w*.32,y-h);g.strokeStyle=rgba(C.v,.6);g.lineWidth=1;g.stroke();
    g.globalCompositeOperation='lighter';
    const n=Math.floor(h/(R*.035));for(let k=0;k<n;k++){if(r()<.4){const wy=y-h*.05-r()*h*.85,wx=x+(r()-.5)*w*.45;g.fillStyle=[rgba(C.b,.9),rgba(C.m,.8),rgba(C.w,.7)][Math.floor(r()*3)];g.fillRect(wx,wy,Math.max(1,w*.12),Math.max(1,R*.008))}}
    if(b.main){for(const k of[.35,.62,.8]){g.beginPath();g.ellipse(x,y-h*k,w*1.8*(1-k*.5),w*.35,0,0,TAU);g.strokeStyle=rgba(C.v,.55);g.stroke()}
      const tx=x,ty=y-h-w*3,tg=g.createRadialGradient(tx,ty,0,tx,ty,R*.18);tg.addColorStop(0,rgba(C.w,.95));tg.addColorStop(.2,rgba(C.m,.5));tg.addColorStop(1,rgba(C.m,0));g.fillStyle=tg;g.fillRect(tx-R*.2,ty-R*.2,R*.4,R*.4)}
    g.globalCompositeOperation='source-over'}
  g.globalCompositeOperation='lighter';gr=g.createRadialGradient(ox,top,0,ox,top,R);gr.addColorStop(0,rgba(C.v,.16));gr.addColorStop(1,rgba(C.v,0));g.fillStyle=gr;g.fillRect(ox-R,top-R*.3,2*R,R*.6);
  return{c,w:W,h:H,ox,oy:top,tipX,tipY:top+depth};
}
function renderPlanet(r){
  const s=r*2.5,C0=s/2;const[c,g]=offscreen(s,s,1);
  let gr=g.createRadialGradient(C0,C0,r*.95,C0,C0,r*1.22);gr.addColorStop(0,rgba(C.v,.16));gr.addColorStop(1,rgba(C.v,0));g.fillStyle=gr;g.fillRect(0,0,s,s);
  g.beginPath();g.arc(C0,C0,r,0,TAU);gr=g.createRadialGradient(C0+r*.55,C0+r*.6,0,C0,C0,r*1.05);gr.addColorStop(0,'#1c1233');gr.addColorStop(.45,'#0b0714');gr.addColorStop(1,'#040306');g.fillStyle=gr;g.fill();
  g.save();g.clip();
  for(let i=0;i<14;i++){const y=C0-r+(i+.5)*(2*r/14);g.beginPath();g.ellipse(C0,y,r*1.2,r*.03+i%3*r*.01,-.18,0,TAU);g.strokeStyle=rgba(i%2?C.v:C.b,.035);g.lineWidth=r*.02;g.stroke()}
  g.globalCompositeOperation='lighter';g.beginPath();g.arc(C0,C0,r*.995,0,TAU);
  gr=g.createLinearGradient(C0-r*.7,C0-r*.7,C0+r*.7,C0+r*.7);gr.addColorStop(0,rgba(C.b,0));gr.addColorStop(.62,rgba(C.b,0));gr.addColorStop(.85,rgba(C.b,.45));gr.addColorStop(1,rgba(C.m,.7));
  g.strokeStyle=gr;g.lineWidth=r*.012;g.stroke();g.lineWidth=r*.05;g.globalAlpha=.25;g.stroke();g.restore();
  return{c,s};
}
function portal(ctx,x,y,r,T){
  ctx.save();ctx.globalCompositeOperation='lighter';
  const g=ctx.createRadialGradient(x,y,r*.1,x,y,r);g.addColorStop(0,rgba(C.m,.02));g.addColorStop(.75,rgba(C.v,.16));g.addColorStop(1,rgba(C.m,0));ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();
  for(const[k,lw,a,c]of[[1,1.4,.85,C.m],[1,5,.18,C.v],[1.03,14,.06,C.v]]){ctx.strokeStyle=rgba(c,a);ctx.lineWidth=lw;ctx.beginPath();ctx.arc(x,y,r*k,0,TAU);ctx.stroke()}
  ctx.lineWidth=1;
  for(let i=0;i<4;i++){const s=T*(.18+i*.07)*(i%2?-1:1)+i*1.7;ctx.strokeStyle=rgba(i%2?C.b:C.v,.5-i*.08);ctx.beginPath();ctx.arc(x,y,r*(1.12+i*.08),s,s+.5+i*.35);ctx.stroke()}
  ctx.strokeStyle=rgba(C.w,.22);ctx.beginPath();for(let i=0;i<48;i++){const a=i/48*TAU+T*.05,r1=r*1.07,r2=r*(i%4?1.09:1.12);ctx.moveTo(x+Math.cos(a)*r1,y+Math.sin(a)*r1);ctx.lineTo(x+Math.cos(a)*r2,y+Math.sin(a)*r2)}ctx.stroke();
  dotGlow(ctx,C.w,x,y,r*.35,.5+.2*Math.sin(T*1.3));dotGlow(ctx,C.m,x,y,r*1.1,.35);
  ctx.restore();
}
function heroScene(){
  const st={mx:0,my:0,last:0};
  const mote=(r,w,h,any)=>({x:r()*w,y:any?r()*h:h+10,vy:.008+r()*.03,r:.6+r()*1.8,a:.25+r()*.6,ph:r()*TAU,c:[C.v,C.m,C.b,C.w,C.w][Math.floor(r()*5)]});
  function drawShards(ctx,cx,cy,bob,T,front){
    for(const s of st.shards){const a=s.a+T*s.sp,sn=Math.sin(a);if((sn>0)!==front)continue;
      const x=cx+Math.cos(a)*s.rx,y=cy-st.R*.15+sn*s.rx*.26+s.dy+bob*.7,k=.7+.4*(sn+1)/2;
      ctx.save();ctx.translate(x,y);ctx.rotate(s.rot+T*s.vr);ctx.scale(k,k);ctx.globalAlpha=front?1:.7;
      ctx.beginPath();s.pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();
      ctx.fillStyle='#0d0a15';ctx.fill();ctx.strokeStyle=rgba(C.v,.55);ctx.lineWidth=1;ctx.stroke();
      ctx.beginPath();ctx.moveTo(s.pts[0][0],s.pts[0][1]);ctx.lineTo(s.pts[1][0],s.pts[1][1]);ctx.strokeStyle=rgba(C.b,.55);ctx.stroke();
      ctx.restore()}
    ctx.globalAlpha=1;
  }
  return{
    init(w,h){const r=mulberry(20);st.r=r;const small=w<820;st.small=small;
      st.R=small?Math.min(w*.3,h*.19):Math.min(w*.16,h*.22);st.cx=small?w*.5:w*.7;st.cy=h*(small?.1:.17)+1.75*st.R;
      st.stars=Array.from({length:Math.min(520,Math.floor(w*h/2600))},()=>({x:r()*w,y:r()*h,r:r()**3*1.5+.3,d:r(),tw:r()*TAU,sp:.4+r()*1.2}));
      st.motes=Array.from({length:small?46:96},()=>mote(r,w,h,true));st.mote=mote;
      st.island=renderIsland(st.R,11);st.pr=Math.max(w,h)*(small?.55:.4);st.planet=renderPlanet(st.pr);
      st.shards=Array.from({length:18},()=>{const n=4+Math.floor(r()*3),sz=st.R*(.035+r()*.09),pts=[];for(let i=0;i<n;i++){const a=i/n*TAU+r()*.6,d=sz*(.55+r()*.6);pts.push([Math.cos(a)*d,Math.sin(a)*d])}return{a:r()*TAU,rx:st.R*(1.25+r()*.95),dy:(r()-.5)*st.R*.5,sp:.04+r()*.07,rot:r()*TAU,vr:(r()-.5)*.4,pts}});
    },
    draw(ctx,w,h,t){
      const dt=Math.min(64,t-(st.last||t));st.last=t;const T=t/1000;
      st.mx+=(P.x-st.mx)*.025;st.my+=(P.y-st.my)*.025;
      const R=st.R,cx=st.cx-st.mx*14,cy=st.cy-st.my*8,bob=Math.sin(T*.45)*R*.035;
      ctx.fillStyle='#050505';ctx.fillRect(0,0,w,h);
      haze(ctx,w*.25,h*.9,Math.max(w,h)*.55,'#160D24',.9);
      haze(ctx,cx,cy-R*.4,R*4.4,C.v,.13);haze(ctx,cx+R*1.7,cy-R*1.3,R*2.6,C.m,.06);haze(ctx,w*.3,h*.2,w*.4,C.b,.03);
      ctx.fillStyle=C.w;for(const s of st.stars){ctx.globalAlpha=(.2+.8*(.5+.5*Math.sin(T*s.sp+s.tw)))*(.25+.75*s.d);ctx.fillRect(s.x-st.mx*s.d*18,s.y-st.my*s.d*10,s.r,s.r)}ctx.globalAlpha=1;
      const pl=st.planet;ctx.drawImage(pl.c,(st.small?w*.05:w*.12)-st.mx*5-pl.s/2,-st.pr*(st.small?.62:.38)-st.my*3-pl.s/2,pl.s,pl.s);
      const px=cx,py=cy-R*1.12+bob;
      haze(ctx,px,py,R*1.8,C.v,.35);haze(ctx,px,py,R*.9,C.m,.22);portal(ctx,px,py,R*.6,T);
      drawShards(ctx,cx,cy,bob,T,false);
      const I=st.island;ctx.drawImage(I.c,cx-I.ox,cy-I.oy+bob,I.w,I.h);
      ctx.globalCompositeOperation='lighter';
      const bx=cx-I.ox+I.tipX,by=cy-I.oy+I.tipY+bob;const bg=ctx.createLinearGradient(0,by,0,h);bg.addColorStop(0,rgba(C.v,.35));bg.addColorStop(1,rgba(C.v,0));ctx.fillStyle=bg;ctx.fillRect(bx-R*.012,by,R*.024,Math.max(0,h-by));
      dotGlow(ctx,C.m,bx,by,R*.25,.6+.3*Math.sin(T*2));
      ctx.globalCompositeOperation='source-over';
      drawShards(ctx,cx,cy,bob,T,true);
      haze(ctx,cx,cy+R*.95,R*1.6,'#160D24',.55,2.2,1);
      for(let i=0;i<3;i++)haze(ctx,w*.5+Math.sin(T*.04+i*2.1)*w*.2,h*(.78+i*.09),w*.3,'#2a1846',.18,3,1);
      ctx.globalCompositeOperation='lighter';
      for(const m of st.motes){m.y-=m.vy*dt*(1+m.r*.3);m.x+=Math.sin(T*.6+m.ph)*.12;if(m.y<-12)Object.assign(m,mote(st.r,w,h,false));dotGlow(ctx,m.c,m.x,m.y,m.r*7,m.a*(.6+.4*Math.sin(T*1.5+m.ph)))}
      ctx.globalCompositeOperation='source-over';
    }
  };
}

