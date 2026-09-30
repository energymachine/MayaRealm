/* MayaRealm — BoltFall arena scene
   Classic script (no build step). Load order is set in index.html. */
'use strict';
/* ---------- BoltFall arena ---------- */
function arenaScene(mode){
  const st={};
  return{
    init(w,h){const r=mulberry(mode==='bg'?3:5);st.r=r;const small=w<980;
      if(mode==='bg'){st.cx=small?w*.5:w*.6;st.cy=small?Math.min(h*.22,w*.75):h*.42;st.RX=small?w*.44:Math.min(w*.3,h*.55)}
      else{st.cx=w*.5;st.cy=h*.44;st.RX=Math.min(w*.4,h*.9)}
      st.RY=st.RX*.36;st.m=[];st.bl=[];st.next=0;st.nb=performance.now()+1200;st.bolt=null;st.trail=[];st.last=0;
      st.stars=Array.from({length:120},()=>({x:r()*w,y:r()*h*.6,s:r()*1.2+.3,a:r()*.6}));
      st.pil=Array.from({length:10},(_,i)=>({a:i/10*TAU+.3,h:.14+r()*.1}));
    },
    draw(ctx,w,h,t){
      const dt=Math.min(64,t-(st.last||t));st.last=t;const T=t/1000;const{cx,cy,RX,RY,r}=st;
      let flash=st.bolt?Math.max(0,1-(t-st.bolt.t0)/420):0;if(flash&&((t-st.bolt.t0)%120)>60)flash*=.55;
      ctx.fillStyle='#050505';ctx.fillRect(0,0,w,h);
      let g=ctx.createLinearGradient(0,0,0,cy);g.addColorStop(0,'#0d0818');g.addColorStop(1,'#050505');ctx.fillStyle=g;ctx.fillRect(0,0,w,cy);
      ctx.fillStyle=C.w;for(const s of st.stars){ctx.globalAlpha=s.a*(.6+.4*Math.sin(T+s.x));ctx.fillRect(s.x,s.y,s.s,s.s)}ctx.globalAlpha=1;
      for(let i=0;i<5;i++){const x=((w*(.1+i*.22)+T*8*(i%2?1:-1))%(w*1.3)+w*1.3)%(w*1.3)-w*.15;haze(ctx,x,h*(.1+(i%3)*.06),w*.22,'#1c1133',.6+flash*.3,2.2,.6)}
      if(flash)haze(ctx,st.bolt.x0,0,w*.5,C.b,.2*flash,1.6,1);
      haze(ctx,cx,cy,RX*1.4,C.v,.17,1,.55);
      const wallH=RY*.32;
      ctx.beginPath();ctx.ellipse(cx,cy,RX,RY,0,0,Math.PI);ctx.lineTo(cx-RX,cy+wallH);ctx.ellipse(cx,cy+wallH,RX,RY,0,Math.PI,0,true);ctx.closePath();
      g=ctx.createLinearGradient(0,cy,0,cy+RY+wallH);g.addColorStop(0,'#150e24');g.addColorStop(1,'#060409');ctx.fillStyle=g;ctx.fill();
      ctx.strokeStyle=rgba(C.v,.35);ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(cx,cy+wallH,RX,RY,0,0,Math.PI);ctx.stroke();
      haze(ctx,cx,cy+RY+wallH,RX*.8,C.m,.09,1.6,.4);
      ctx.beginPath();ctx.ellipse(cx,cy,RX,RY,0,0,TAU);g=ctx.createRadialGradient(cx,cy,0,cx,cy,RX);g.addColorStop(0,'#160f24');g.addColorStop(1,'#08060c');ctx.fillStyle=g;ctx.fill();
      for(let i=1;i<=5;i++){ctx.beginPath();ctx.ellipse(cx,cy,RX*i/5,RY*i/5,0,0,TAU);ctx.strokeStyle=rgba(C.b,i===5?.3:.07+flash*.12);ctx.stroke()}
      ctx.beginPath();for(let i=0;i<24;i++){const a=i/24*TAU;ctx.moveTo(cx+Math.cos(a)*RX*.2,cy+Math.sin(a)*RY*.2);ctx.lineTo(cx+Math.cos(a)*RX,cy+Math.sin(a)*RY)}ctx.strokeStyle=rgba(C.b,.05);ctx.stroke();
      ctx.globalCompositeOperation='lighter';ctx.beginPath();ctx.ellipse(cx,cy,RX,RY,0,0,TAU);ctx.strokeStyle=rgba(C.v,.18);ctx.lineWidth=8;ctx.stroke();ctx.lineWidth=1;ctx.globalCompositeOperation='source-over';
      const S=(u,v,z=0)=>[cx+u*RX,cy+v*RY-z*RX*.55];
      const pillar=p=>{const[x,y]=S(Math.cos(p.a)*1.06,Math.sin(p.a)*1.06),ph=RX*p.h,pw=Math.max(2,RX*.022);ctx.fillStyle='#0b0812';ctx.fillRect(x-pw/2,y-ph,pw,ph);ctx.fillStyle=rgba(C.v,.55);ctx.fillRect(x+pw/2-1,y-ph,1,ph);ctx.globalCompositeOperation='lighter';dotGlow(ctx,C.b,x,y-ph,RX*.08,.55+.35*Math.sin(T*2+p.a*3));ctx.globalCompositeOperation='source-over'};
      st.pil.forEach(p=>{if(Math.sin(p.a)<0)pillar(p)});
      const pu=.4*Math.sin(T*1.05)+.14*Math.sin(T*2.6+1),pv=.36*Math.cos(T*.85)+.12*Math.sin(T*2.2);
      if(t>st.next){st.next=t+320+r()*480;const a=r()*TAU,cl=v=>Math.max(-.85,Math.min(.85,v));const tu=cl(pu+(r()-.5)*.7),tv=cl(pv+(r()-.5)*.7),u=Math.cos(a)*1.8,v=Math.sin(a)*1.8;st.m.push({u,v,tu,tv,z0:.8+r()*.7,d0:Math.hypot(tu-u,tv-v),sp:.00075*(1+r()*.6),tr:[]});if(st.m.length>18)st.m.shift()}
      ctx.globalCompositeOperation='lighter';
      for(const m of st.m){const[x,y]=S(m.tu,m.tv),d=Math.hypot(m.tu-m.u,m.tv-m.v)/m.d0,pr=.5+.5*Math.sin(T*14),k=.6+d*.6;ctx.beginPath();ctx.ellipse(x,y,RX*.055*k,RY*.055*k,0,0,TAU);ctx.strokeStyle=rgba(C.m,(.25+.35*pr)*(1-d*.5));ctx.lineWidth=1.2;ctx.stroke()}
      st.bl=st.bl.filter(b=>{const a=(t-b.t0)/700;if(a>1)return false;const[x,y]=S(b.u,b.v);ctx.beginPath();ctx.ellipse(x,y,RX*(.03+.18*a),RY*(.03+.18*a),0,0,TAU);ctx.strokeStyle=rgba(b.c,(1-a)*.8);ctx.lineWidth=2*(1-a)+.5;ctx.stroke();dotGlow(ctx,b.c,x,y,RX*.35*(1-a*.6),(1-a)*.8);dotGlow(ctx,C.w,x,y,RX*.08,1-a);return true});
      const[sx,sy]=S(pu,pv);st.trail.push([sx,sy]);if(st.trail.length>22)st.trail.shift();
      ctx.lineCap='round';for(let i=1;i<st.trail.length;i++){const f=i/st.trail.length;ctx.beginPath();ctx.moveTo(st.trail[i-1][0],st.trail[i-1][1]);ctx.lineTo(st.trail[i][0],st.trail[i][1]);ctx.strokeStyle=rgba(C.b,f*.5);ctx.lineWidth=RX*.012*f+.3;ctx.stroke()}
      ctx.globalCompositeOperation='source-over';
      ctx.fillStyle='rgba(0,0,0,.55)';ctx.beginPath();ctx.ellipse(sx,sy,RX*.025,RY*.025,0,0,TAU);ctx.fill();
      const ph=RX*.075,pw=RX*.026;ctx.globalCompositeOperation='lighter';dotGlow(ctx,C.b,sx,sy-ph*.55,RX*.22,.55);ctx.globalCompositeOperation='source-over';
      ctx.fillStyle='#e9f7ff';ctx.beginPath();rr(ctx,sx-pw/2,sy-ph,pw,ph,pw/2);ctx.fill();ctx.fillStyle=C.m;ctx.fillRect(sx-pw*.3,sy-ph*.82,pw*.6,Math.max(1,ph*.07));
      ctx.globalCompositeOperation='lighter';
      st.m=st.m.filter(m=>{const dx=m.tu-m.u,dv=m.tv-m.v,d=Math.hypot(dx,dv),step=m.sp*dt;if(d<=step||d<.01){st.bl.push({u:m.tu,v:m.tv,t0:t,c:C.m});return false}
        m.u+=dx/d*step;m.v+=dv/d*step;const k=d/m.d0,z=m.z0*k+Math.sin(Math.PI*(1-k))*.25,[x,y]=S(m.u,m.v,z);m.tr.push([x,y]);if(m.tr.length>18)m.tr.shift();
        for(let i=1;i<m.tr.length;i++){const f=i/m.tr.length;ctx.beginPath();ctx.moveTo(m.tr[i-1][0],m.tr[i-1][1]);ctx.lineTo(m.tr[i][0],m.tr[i][1]);ctx.strokeStyle=rgba(i>m.tr.length-4?C.m:C.v,f*.7);ctx.lineWidth=RX*.01*f+.5;ctx.stroke()}
        dotGlow(ctx,C.m,x,y,RX*.13,.9);dotGlow(ctx,C.w,x,y,RX*.035,1);return true});
      if(t>st.nb){const bu=(r()-.5)*1.4*.7,bv=(r()-.5)*1.2*.7,[ex,ey]=S(bu,bv),x0=ex+(r()-.5)*RX*.6,pts=[[x0,-10]],n=12;for(let i=1;i<=n;i++){const f=i/n;pts.push([x0+(ex-x0)*f+(i<n?(r()-.5)*RX*.12:0),-10+(ey+10)*f])}st.bolt={t0:t,pts,x0};st.nb=t+2400+r()*3200;st.bl.push({u:bu,v:bv,t0:t,c:C.b})}
      if(st.bolt&&flash>0){for(const[lw,a,c]of[[RX*.04,.12,C.b],[3,.6,C.b],[1.2,1,C.w]]){ctx.beginPath();st.bolt.pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.strokeStyle=rgba(c,a*flash);ctx.lineWidth=lw;ctx.stroke()}}
      ctx.globalCompositeOperation='source-over';ctx.lineWidth=1;
      st.pil.forEach(p=>{if(Math.sin(p.a)>=0)pillar(p)});
      if(flash){ctx.fillStyle=rgba(C.b,.05*flash);ctx.fillRect(0,0,w,h)}
    }
  };
}

