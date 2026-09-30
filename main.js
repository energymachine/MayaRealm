/* MayaRealm — wires scenes to canvases and runs the page UI
   Classic script (no build step). Load order is set in index.html. */
'use strict';
/* ---------- links: paste your real URLs here ----------
   Any element with data-link="steam" | "youtube" | "press" picks up the URL below.
   While a URL is empty, clicking shows a short "coming soon" message instead. */
const LINKS={
  steam:'',    // e.g. https://store.steampowered.com/app/XXXXXXX/BoltFall/
  youtube:'',  // e.g. https://www.youtube.com/@MayaRealm
  press:''     // e.g. mailto:press@yourdomain.com
};
document.querySelectorAll('[data-link]').forEach(a=>{const u=LINKS[a.dataset.link];if(!u)return;a.href=u;a.removeAttribute('data-toast');if(/^https?:/.test(u)){a.target='_blank';a.rel='noopener'}});

/* ---------- wire scenes ---------- */
if(typeof heroScene==='function'){ // scene files are only loaded on the home page
scene($('#hero-cv'),heroScene());
scene($('#bf-cv'),arenaScene('bg'));
scene($('#w1'),arenaScene('card'));
scene($('#w2'),sealedScene());
scene($('#w3'),buildScene());
scene($('#uni-cv'),universeScene());
scene($('#core-cv'),coreScene());
document.querySelectorAll('[data-realm]').forEach(c=>scene(c,REALMS[+c.dataset.realm]()));
scene($('#tr-cv'),arenaScene('card'));
scene($('#ds-cv'),arenaScene('card'));
}
if(!RM&&scenes.length)requestAnimationFrame(loop);

/* ---------- UI ---------- */
const tocLinks=[...document.querySelectorAll('.toc a')];
if(tocLinks.length){const tio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)tocLinks.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-30% 0px -60% 0px'});document.querySelectorAll('.legal section[id]').forEach(s=>tio.observe(s))}
const nav=$('#nav'),burger=$('#burger');
const onScroll=()=>nav.classList.toggle('scrolled',scrollY>40);onScroll();addEventListener('scroll',onScroll,{passive:true});
burger.addEventListener('click',()=>{const o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu')});
document.querySelectorAll('.mnav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');burger.setAttribute('aria-expanded','false')}));

const links=[...document.querySelectorAll('.nav-links a')];
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});
['boltfall','worlds','universe','studio','craft','realms'].forEach(id=>{const el=document.getElementById(id);el&&sio.observe(el)});

const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rio.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv,.stats-panel').forEach(el=>rio.observe(el));

const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);if(RM)return;const el=e.target,to=+el.dataset.count,pad=+(el.dataset.pad||0),t0=performance.now(),d=1700,f=n=>String(Math.round(n)).padStart(pad,'0');
  (function tick(t){const k=Math.min(1,(t-t0)/d);el.textContent=f(to*(1-Math.pow(1-k,4)));if(k<1)requestAnimationFrame(tick)})(t0)}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

const toastEl=$('#toast');let th;
function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(th);th=setTimeout(()=>toastEl.classList.remove('show'),2800)}
document.querySelectorAll('[data-toast]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();toast(b.dataset.toast)}));

const dlg=$('#dlg');
if(dlg){
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();const k=b.dataset.open;dlg.querySelectorAll('[data-pane]').forEach(p=>p.hidden=p.dataset.pane!==k);dlg.setAttribute('aria-label',k==='trailer'?'BoltFall trailer':'About BoltFall');if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','')}));
$('#dlg-x').addEventListener('click',()=>dlg.close());
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});

}
document.querySelectorAll('.cap').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')}));

const track=$('#track');
if(track){
const cards=[...track.children],counter=$('#counter'),prog=$('#prog');
const step=()=>cards[0].getBoundingClientRect().width+20;
$('#prev').addEventListener('click',()=>track.scrollBy({left:-step(),behavior:RM?'auto':'smooth'}));
$('#next').addEventListener('click',()=>track.scrollBy({left:step(),behavior:RM?'auto':'smooth'}));
const upd=()=>{const max=track.scrollWidth-track.clientWidth,p=max>0?track.scrollLeft/max:0;prog.style.setProperty('--p',(100/cards.length+p*(100-100/cards.length))+'%');const i=max>0&&track.scrollLeft>=max-4?cards.length:Math.min(cards.length,Math.round(track.scrollLeft/step())+1);counter.innerHTML='<b>'+String(i).padStart(2,'0')+'</b> / '+String(cards.length).padStart(2,'0')};
track.addEventListener('scroll',upd,{passive:true});upd();
let down=false,sx=0,sl=0;
track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;down=true;sx=e.clientX;sl=track.scrollLeft});
track.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-sx;if(Math.abs(dx)>5&&!track.classList.contains('drag')){track.classList.add('drag');try{track.setPointerCapture(e.pointerId)}catch(_){}}if(track.classList.contains('drag'))track.scrollLeft=sl-dx});
const end=()=>{down=false;track.classList.remove('drag')};track.addEventListener('pointerup',end);track.addEventListener('pointercancel',end);track.addEventListener('pointerleave',()=>{if(!track.classList.contains('drag'))down=false});
cards.forEach(c=>{c.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||down)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty('--ry',(x*8).toFixed(2)+'deg');c.style.setProperty('--rx',(-y*8).toFixed(2)+'deg')});c.addEventListener('pointerleave',()=>{c.style.setProperty('--ry','0deg');c.style.setProperty('--rx','0deg')})});

}

try{const c=document.createElement('canvas');c.width=c.height=140;const g=c.getContext('2d'),d=g.createImageData(140,140);for(let i=0;i<d.data.length;i+=4){const v=Math.random()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}g.putImageData(d,0,0);$('#grain').style.backgroundImage=`url(${c.toDataURL()})`}catch(_){}
