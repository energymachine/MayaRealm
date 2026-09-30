/* MayaRealm — universe scene + about "realm core" scene
   Classic script (no build step). Load order is set in index.html. */
'use strict';
/* ---------- Universe: linked realms ---------- */
function universeScene(){
  const st={};
  return{
    init(w,h){const r=mulberry(4),sm=w<980;
      st.nodes=sm?[{x:.5,y:.5,r:.42,c:C.v,main:1},{x:.14,y:.12,r:.08,c:C.b},{x:.86,y:.1,r:.1,c:C.m},{x:.1,y:.9,r:.1,c:C.m},{x:.88,y:.88,r:.08,c:C.b},{x:.5,y:.04,r:.05,c:C.v},{x:.52,y:.97,r:.05,c:C.v}]
        :[{x:.5,y:.5,r:.34,c:C.v,main:1},{x:.2,y:.2,r:.07,c:C.b},{x:.8,y:.18,r:.085,c:C.m},{x:.2,y:.8,r:.09,c:C.m},{x:.82,y:.8,r:.065,c:C.b},{x:.36,y:.93,r:.045,c:C.v},{x:.64,y:.07,r:.05,c:C.v}];
      st.links=[[0,1],[0,2],[0,3],[0,4],[1,3],[2,4],[3,5],[5,4],[1,6],[6,2]];
      st.frag=Array.from({length:34},()=>({x:r()*w,y:r()*h,s:3+r()*7,a:r()*TAU,v:(r()-.5)*.6,dy:.08+r()*.18,c:[C.v,C.m,C.b][Math.floor(r()*3)]}));
      st.dust=Array.from({length:170},()=>({x:r()*w,y:r()*h,a:r()*.6,s:r()*1.3+.3}))},
    draw(ctx,w,h,t){const T=t/1000;ctx.fillStyle='#050505';ctx.fillRect(0,0,w,h);haze(ctx,w*.5,h*.5,Math.max(w,h)*.5,'#160D24',1);haze(ctx,w*.5,h*.5,Math.min(w,h)*.55,C.v,.1);
      ctx.fillStyle=C.w;for(const d of st.dust){ctx.globalAlpha=d.a*(.5+.5*Math.sin(T+d.x));ctx.fillRect(d.x,d.y,d.s,d.s)}ctx.globalAlpha=1;
      const m=Math.min(w,h),N=st.nodes.map(n=>({x:n.x*w+Math.sin(T*.3+n.x*9)*6,y:n.y*h+Math.cos(T*.25+n.y*7)*6,r:n.r*m,c:n.c,main:n.main}));
      ctx.globalCompositeOperation='lighter';ctx.lineWidth=1;
      st.links.forEach(([a,b],i)=>{let A=N[a],B=N[b];let ax=A.x,ay=A.y;if(A.main){const dx=B.x-A.x,dy=B.y-A.y,d=Math.hypot(dx,dy);ax+=dx/d*A.r;ay+=dy/d*A.r}
        const mx=(ax+B.x)/2+(ay-B.y)*.18,my=(ay+B.y)/2+(B.x-ax)*.18;ctx.beginPath();ctx.moveTo(ax,ay);ctx.quadraticCurveTo(mx,my,B.x,B.y);ctx.strokeStyle=rgba(C.v,.2);ctx.stroke();
        const p=(T*.12+i*.37)%1,q=1-p,px=q*q*ax+2*q*p*mx+p*p*B.x,py=q*q*ay+2*q*p*my+p*p*B.y;dotGlow(ctx,i%2?C.m:C.b,px,py,20,.9);dotGlow(ctx,C.w,px,py,5,1)});
      for(const n of N){ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,TAU);ctx.strokeStyle=rgba(n.c,n.main?.22:.6);ctx.stroke();const s=T*(n.main?.05:.4);ctx.beginPath();ctx.arc(n.x,n.y,n.r*1.15,s,s+(n.main?2.2:1.4));ctx.strokeStyle=rgba(C.w,n.main?.16:.38);ctx.stroke();
        if(!n.main){const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);g.addColorStop(0,rgba(n.c,.35));g.addColorStop(.6,rgba(n.c,.08));g.addColorStop(1,rgba(n.c,0));ctx.fillStyle=g;ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,TAU);ctx.fill();dotGlow(ctx,C.w,n.x,n.y,n.r*.5,.5)}
        else{ctx.setLineDash([2,10]);ctx.beginPath();ctx.arc(n.x,n.y,n.r*1.3,-s,-s+TAU);ctx.strokeStyle=rgba(C.b,.16);ctx.stroke();ctx.setLineDash([])}}
      for(const f of st.frag){f.y-=f.dy;if(f.y<-10)f.y=h+10;ctx.save();ctx.translate(f.x,f.y);ctx.rotate(f.a+T*f.v);ctx.beginPath();ctx.moveTo(0,-f.s);ctx.lineTo(f.s*.8,f.s*.55);ctx.lineTo(-f.s*.7,f.s*.4);ctx.closePath();ctx.strokeStyle=rgba(f.c,.5);ctx.stroke();ctx.restore()}
      ctx.globalCompositeOperation='source-over'}
  };
}

/* ---------- About: realm core ---------- */
function coreScene(){
  const st={mx:0};
  const p=(1+Math.sqrt(5))/2;
  st.V=[[-1,p,0],[1,p,0],[-1,-p,0],[1,-p,0],[0,-1,p],[0,1,p],[0,-1,-p],[0,1,-p],[p,0,-1],[p,0,1],[-p,0,-1],[-p,0,1]].map(v=>{const l=Math.hypot(...v);return v.map(c=>c/l)});
  st.E=[];for(let i=0;i<12;i++)for(let j=i+1;j<12;j++){const V=st.V;if(Math.hypot(V[i][0]-V[j][0],V[i][1]-V[j][1],V[i][2]-V[j][2])<1.1)st.E.push([i,j])}
  return{
    draw(ctx,w,h,t){const T=t/1000;st.mx+=(P.x-st.mx)*.03;ctx.fillStyle='#08070c';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2,S=Math.min(w,h)*.24;
      haze(ctx,cx,cy,S*2.6,C.v,.18);haze(ctx,cx,cy,S*.9,C.m,.14);
      const ay=T*.22+st.mx*.6,ax=.5+Math.sin(T*.17)*.25,cay=Math.cos(ay),say=Math.sin(ay),cax=Math.cos(ax),sax=Math.sin(ax);
      const proj=(x,y,z,s)=>{const X=x*cay+z*say;let Z=-x*say+z*cay;const Y=y*cax-Z*sax;Z=y*sax+Z*cax;const f=3.2/(3.2+Z);return[cx+X*s*f,cy+Y*s*f,Z]};
      ctx.globalCompositeOperation='lighter';
      [[0,C.b,1.75],[1.1,C.m,1.95],[2.2,C.v,2.15]].forEach(([tilt,c,rad],ri)=>{const ct=Math.cos(tilt),stl=Math.sin(tilt);for(let i=0;i<90;i++){const a=i/90*TAU+T*(.15+ri*.05)*(ri%2?-1:1),x=Math.cos(a)*rad,y=Math.sin(a)*rad*.2,z=Math.sin(a)*rad;const[px,py,pz]=proj(x*ct-y*stl,x*stl+y*ct,z,S*.9);ctx.fillStyle=rgba(c,Math.max(.06,.15+.55*(1-(pz+2.2)/4.4)));const sz=i%9===0?2.4:1.2;ctx.fillRect(px-sz/2,py-sz/2,sz,sz)}});
      const P2=st.V.map(v=>proj(v[0]*1.2,v[1]*1.2,v[2]*1.2,S));ctx.lineWidth=1;
      for(const[i,j]of st.E){const A=P2[i],B=P2[j],z=(A[2]+B[2])/2;ctx.strokeStyle=rgba(z<0?C.b:C.v,.12+.5*(1-(z+1.2)/2.4));ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.stroke()}
      const P3=st.V.map(v=>proj(-v[0]*.55,v[2]*.55,v[1]*.55,S));ctx.strokeStyle=rgba(C.m,.2);for(const[i,j]of st.E){ctx.beginPath();ctx.moveTo(P3[i][0],P3[i][1]);ctx.lineTo(P3[j][0],P3[j][1]);ctx.stroke()}
      P2.forEach(q=>dotGlow(ctx,C.w,q[0],q[1],10+(1-(q[2]+1.2)/2.4)*10,.7));
      dotGlow(ctx,C.m,cx,cy,S*.8,.35+.1*Math.sin(T*1.4));dotGlow(ctx,C.w,cx,cy,S*.18,.7);
      ctx.globalCompositeOperation='source-over'}
  };
}

