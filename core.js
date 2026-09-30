/* MayaRealm — shared helpers + canvas scene manager
   Classic script (no build step). Load order is set in index.html. */
'use strict';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const DPR=Math.min(2,window.devicePixelRatio||1);
const C={v:'#7C3AED',m:'#D946EF',b:'#38BDF8',w:'#F5F5F5'};
const TAU=Math.PI*2;
const $=s=>document.querySelector(s);
document.documentElement.classList.add('js');

function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function rgba(hex,a){const n=parseInt(hex.slice(1),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`}
const sprites={};
function glow(hex){if(sprites[hex])return sprites[hex];const s=64,c=document.createElement('canvas');c.width=c.height=s;const g=c.getContext('2d');const gr=g.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);gr.addColorStop(0,rgba(hex,1));gr.addColorStop(.18,rgba(hex,.5));gr.addColorStop(.5,rgba(hex,.1));gr.addColorStop(1,rgba(hex,0));g.fillStyle=gr;g.fillRect(0,0,s,s);return sprites[hex]=c}
function dotGlow(ctx,hex,x,y,size,a){if(a<=0||size<=0)return;ctx.globalAlpha=Math.min(1,a);ctx.drawImage(glow(hex),x-size/2,y-size/2,size,size);ctx.globalAlpha=1}
function haze(ctx,x,y,r,hex,a,sx=1,sy=1){if(r<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(sx,sy);const g=ctx.createRadialGradient(0,0,0,0,0,r);g.addColorStop(0,rgba(hex,a));g.addColorStop(1,rgba(hex,0));ctx.fillStyle=g;ctx.fillRect(-r,-r,2*r,2*r);ctx.restore()}
function rr(p,x,y,w,h,r){p.moveTo(x+r,y);p.arcTo(x+w,y,x+w,y+h,r);p.arcTo(x+w,y+h,x,y+h,r);p.arcTo(x,y+h,x,y,r);p.arcTo(x,y,x+w,y,r);p.closePath()}
function offscreen(w,h,sc=DPR){const c=document.createElement('canvas');c.width=Math.ceil(w*sc);c.height=Math.ceil(h*sc);const g=c.getContext('2d');g.scale(sc,sc);return[c,g]}

const P={x:0,y:0};
addEventListener('pointermove',e=>{P.x=e.clientX/innerWidth*2-1;P.y=e.clientY/innerHeight*2-1},{passive:true});

/* ---------- scene manager ---------- */
const scenes=[],byEl=new Map();
function paint(s,t){if(!s.w)return;const c=s.ctx;c.setTransform(DPR,0,0,DPR,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';try{s.api.draw(c,s.w,s.h,t)}catch(err){console.error(err)}}
function size(s){const r=s.el.getBoundingClientRect();const w=Math.round(r.width),h=Math.round(r.height);if(!w||!h)return;if(w===s.w&&h===s.h)return;s.w=w;s.h=h;s.el.width=Math.round(w*DPR);s.el.height=Math.round(h*DPR);s.api.init&&s.api.init(w,h);paint(s,RM?9000:performance.now())}
const io=new IntersectionObserver(es=>es.forEach(e=>{const s=byEl.get(e.target);if(s){s.vis=e.isIntersecting;if(s.vis){size(s);if(RM)paint(s,9000)}}}),{rootMargin:'150px'});
const ro=new ResizeObserver(es=>es.forEach(e=>{const s=byEl.get(e.target);s&&size(s)}));
function scene(el,api){if(!el)return;const s={el,ctx:el.getContext('2d'),w:0,h:0,vis:false,api};scenes.push(s);byEl.set(el,s);ro.observe(el);io.observe(el);return s}
let hidden=false;document.addEventListener('visibilitychange',()=>hidden=document.hidden);
function loop(t){if(!hidden)for(const s of scenes)if(s.vis)paint(s,t);requestAnimationFrame(loop)}

