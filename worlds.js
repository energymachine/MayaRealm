/* MayaRealm — game card scenes: GAME 02 (sealed) and GAME 03 (in development)
   Classic script (no build step). Load order is set in index.html. */
'use strict';
/* ---------- Game 02: sealed ---------- */
function sealedScene(){
  const st={};
  return{
    init(w,h){const r=mulberry(9);st.mono=Array.from({length:9},(_,i)=>({x:(i+.5)/9+(r()-.5)*.06,h:.1+r()*.3*(1-Math.abs(i-4)/6),w:.025+r()*.03}));st.m=Array.from({length:40},()=>({x:r()*w,y:r()*h,v:.1+r()*.25,r:r()*1.5+.5}))},
    draw(ctx,w,h,t){const T=t/1000,hz=h*.72;let g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0e0616');g.addColorStop(.7,'#070409');g.addColorStop(1,'#050505');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
      const gx=w*.5,gy=h*.36,R=Math.min(w,h)*.24;
      haze(ctx,gx,gy,R*3,C.m,.13);haze(ctx,gx,gy,R*1.3,C.v,.2);
      ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(gx,gy);ctx.lineWidth=1;
      ctx.strokeStyle=rgba(C.m,.45);ctx.beginPath();ctx.arc(0,0,R,0,TAU);ctx.stroke();
      ctx.strokeStyle=rgba(C.m,.18);ctx.beginPath();ctx.arc(0,0,R*.78,0,TAU);ctx.stroke();
      ctx.save();ctx.rotate(T*.08);ctx.beginPath();for(let i=0;i<72;i++){const a=i/72*TAU,l=i%6===0?.12:.05;ctx.moveTo(Math.cos(a)*R*1.04,Math.sin(a)*R*1.04);ctx.lineTo(Math.cos(a)*R*(1.04+l),Math.sin(a)*R*(1.04+l))}ctx.strokeStyle=rgba(C.w,.3);ctx.stroke();ctx.restore();
      for(let i=0;i<3;i++){const s=-T*(.2+i*.1)+i*2;ctx.beginPath();ctx.arc(0,0,R*(.88+i*.035),s,s+1.1);ctx.strokeStyle=rgba(i===1?C.v:C.m,.6);ctx.lineWidth=1.5;ctx.stroke()}
      ctx.lineWidth=1;const open=.12+.88*Math.pow(Math.abs(Math.sin(T*.35)),3),ew=R*.55,eh=R*.28*open;
      ctx.beginPath();ctx.moveTo(-ew,0);ctx.quadraticCurveTo(0,-eh*2,ew,0);ctx.quadraticCurveTo(0,eh*2,-ew,0);ctx.closePath();ctx.fillStyle=rgba(C.m,.1);ctx.fill();ctx.strokeStyle=rgba(C.m,.8);ctx.stroke();
      ctx.fillStyle=rgba(C.w,.9);ctx.fillRect(-R*.012,-eh*.9,R*.024,eh*1.8);dotGlow(ctx,C.m,0,0,R*.9*open+R*.2,.5);
      ctx.restore();
      for(const m of st.mono){const x=m.x*w,mh=m.h*h,mw=m.w*w;ctx.beginPath();ctx.moveTo(x-mw/2,hz);ctx.lineTo(x-mw*.38,hz-mh);ctx.lineTo(x+mw*.38,hz-mh);ctx.lineTo(x+mw/2,hz);ctx.closePath();ctx.fillStyle='#07050b';ctx.fill();ctx.strokeStyle=rgba(C.m,.3);ctx.beginPath();ctx.moveTo(x-mw/2,hz);ctx.lineTo(x-mw*.38,hz-mh);ctx.stroke()}
      g=ctx.createLinearGradient(0,hz,0,h);g.addColorStop(0,'#0b0710');g.addColorStop(1,'#050505');ctx.fillStyle=g;ctx.fillRect(0,hz,w,h-hz);
      ctx.strokeStyle=rgba(C.m,.35);ctx.beginPath();ctx.moveTo(0,hz);ctx.lineTo(w,hz);ctx.stroke();
      for(let i=0;i<3;i++)haze(ctx,w*.5+Math.sin(T*.1+i*2)*w*.3,hz+i*h*.04,w*.35,C.m,.06,2.5,.5);
      ctx.globalCompositeOperation='lighter';for(const p of st.m){p.y-=p.v;if(p.y<0)p.y=h;dotGlow(ctx,C.m,p.x,p.y,p.r*6,.4)}ctx.globalCompositeOperation='source-over';
    }
  };
}

/* ---------- Game 03: under construction ---------- */
function buildScene(){
  return{
    draw(ctx,w,h,t){const T=t/1000,hz=h*.62;let g=ctx.createLinearGradient(0,0,0,hz);g.addColorStop(0,'#03060b');g.addColorStop(1,'#0a1422');ctx.fillStyle=g;ctx.fillRect(0,0,w,hz);g=ctx.createLinearGradient(0,hz,0,h);g.addColorStop(0,'#07101b');g.addColorStop(1,'#050505');ctx.fillStyle=g;ctx.fillRect(0,hz,w,h-hz);
      haze(ctx,w*.5,hz,w*.55,C.b,.2,1.4,.6);
      const cx=w*.5,cy=hz,R=Math.min(w*.36,h*.5),th=R*.13,prog=.55+.25*Math.sin(T*.25),a0=Math.PI,a1=Math.PI+prog*Math.PI;
      ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,R,a0,a1);ctx.arc(cx,cy,R-th,a1,a0,true);ctx.closePath();g=ctx.createLinearGradient(cx-R,0,cx+R,0);g.addColorStop(0,'#0a1220');g.addColorStop(1,'#12203a');ctx.fillStyle=g;ctx.fill();ctx.strokeStyle=rgba(C.b,.5);ctx.stroke();
      ctx.beginPath();for(let a=a0;a<a1;a+=Math.PI/24){ctx.moveTo(cx+Math.cos(a)*(R-th),cy+Math.sin(a)*(R-th));ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R)}ctx.strokeStyle='rgba(0,0,0,.5)';ctx.stroke();
      ctx.setLineDash([3,5]);ctx.strokeStyle=rgba(C.b,.45);ctx.beginPath();ctx.arc(cx,cy,R,a1,TAU);ctx.stroke();ctx.beginPath();ctx.arc(cx,cy,R-th,a1,TAU);ctx.stroke();ctx.setLineDash([]);
      ctx.beginPath();for(let a=Math.ceil(a1/(Math.PI/24))*(Math.PI/24);a<=TAU+.001;a+=Math.PI/24){ctx.moveTo(cx+Math.cos(a)*(R-th),cy+Math.sin(a)*(R-th));ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R)}ctx.strokeStyle=rgba(C.b,.25);ctx.stroke();
      ctx.globalCompositeOperation='lighter';const ex=Math.cos(a1),ey=Math.sin(a1);ctx.beginPath();ctx.moveTo(cx+ex*(R-th),cy+ey*(R-th));ctx.lineTo(cx+ex*R,cy+ey*R);ctx.strokeStyle=rgba(C.w,.9);ctx.lineWidth=2;ctx.stroke();ctx.lineWidth=1;
      const hx=cx+ex*(R-th/2),hy=cy+ey*(R-th/2);dotGlow(ctx,C.b,hx,hy,th*4,.8);
      for(let i=0;i<6;i++){const f=(T*1.3+i/6)%1;dotGlow(ctx,C.b,hx+Math.cos(i*1.7)*f*th*3,hy+f*th*4,6,(1-f)*.8)}
      ctx.globalCompositeOperation='source-over';
      ctx.strokeStyle=rgba(C.b,.4);ctx.beginPath();ctx.moveTo(0,hz);ctx.lineTo(w,hz);ctx.stroke();
      ctx.strokeStyle=rgba(C.b,.07);ctx.beginPath();for(let i=-12;i<=12;i++){ctx.moveTo(cx+i*w*.02,hz);ctx.lineTo(cx+i*w*.18,h)}for(let k=1;k<9;k++){const y=hz+(h-hz)*Math.pow(k/9,1.8);ctx.moveTo(0,y);ctx.lineTo(w,y)}ctx.stroke();
      ctx.globalCompositeOperation='lighter';for(let y=hz+3;y<h;y+=4){const f=(y-hz)/(h-hz),ww=R*2*(1-f*.5)*(.6+.4*Math.sin(y*.3+T*2));ctx.fillStyle=rgba(C.b,.08*(1-f));ctx.fillRect(cx-ww/2+Math.sin(y*.1+T)*6,y,ww,1)}ctx.globalCompositeOperation='source-over';
    }
  };
}

