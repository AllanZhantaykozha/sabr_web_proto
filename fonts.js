/* Шрифты и тема сайта (подключается в <head> обеих страниц).
   Шрифты: Быстро сравнить варианты: добавьте к адресу ?font=A, ?font=B, ?font=C, ?font=D или ?font=O (исходный).
   Выбор запоминается в localStorage и действует на обеих страницах. По умолчанию — B. */
(function(){
  const F={
    B:{q:'Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@400;500;600',serif:"'Playfair Display'",mark:"'Playfair Display'",sans:"'Inter'"},
    A:{q:'Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700',serif:"'Cormorant Garamond'",mark:"'Cormorant Garamond'",sans:"'Manrope'",css:'h1,h2,.nm,.p-b h2{font-weight:500}'},
    C:{q:'Unbounded:wght@400;500;600&family=Golos+Text:wght@400;500;600',serif:"'Unbounded'",mark:"'Unbounded'",sans:"'Golos Text'",css:'h1{font-size:clamp(30px,7.2vw,58px);letter-spacing:-.03em}.mark,.sp-mark,.spm{letter-spacing:.12em}'},
    D:{q:'Prata&family=Montserrat:wght@400;500;600',serif:"'Prata'",mark:"'Prata'",sans:"'Montserrat'"},
    O:{q:'Noto+Serif+Display:ital,wght@0,400;0,500;1,400&family=Old+Standard+TT:wght@400;700&family=Onest:wght@400;500;600',serif:"'Noto Serif Display'",mark:"'Old Standard TT'",sans:"'Onest'"}
  };
  let k=null;
  try{k=new URLSearchParams(location.search).get('font');if(k&&F[k])localStorage.setItem('sabr.font',k);else k=localStorage.getItem('sabr.font')}catch(e){}
  if(!F[k])k='B';
  const f=F[k],h=document.head;
  h.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family='+f.q+'&display=swap">'
    +'<style>html:root{--serif:'+f.serif+',Georgia,serif;--mark:'+f.mark+',"Times New Roman",serif;--sans:'+f.sans+',system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}'+(f.css||'')+'</style>');
})();

/* Тема: светлая по умолчанию, выбор запоминается. */
(function(){
  const root=document.documentElement;
  function apply(t){
    root.dataset.theme=t;
    let m=document.querySelector('meta[name=theme-color]');
    if(!m){m=document.createElement('meta');m.name='theme-color';document.head.appendChild(m)}
    m.content=t==='dark'?'#000828':'#f3f5fc';
  }
  let t='light';
  try{t=localStorage.getItem('sabr.theme')==='dark'?'dark':'light'}catch(e){}
  apply(t);
  const css=document.createElement('style');
  css.textContent='::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}'
    +'::view-transition-old(root){z-index:1}::view-transition-new(root){z-index:2}'
    +'html.tt *,html.tt *::before,html.tt *::after{transition:background-color .5s ease,color .5s ease,border-color .5s ease,fill .5s ease,stroke .5s ease,box-shadow .5s ease!important}';
  document.head.appendChild(css);
  window.sabrTheme=function(n,ev){
    const save=()=>{try{localStorage.setItem('sabr.theme',n)}catch(e){}};
    const calm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(calm){apply(n);save();return}
    /* плавный круговой «разлив» новой темы от кнопки; запасной вариант — мягкая смена цветов */
    if(document.startViewTransition){
      const r=ev&&ev.currentTarget?ev.currentTarget.getBoundingClientRect():null;
      const x=r?r.left+r.width/2:innerWidth-40,y=r?r.top+r.height/2:40;
      const rad=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
      const t=document.startViewTransition(()=>apply(n));
      t.ready.then(()=>root.animate({clipPath:['circle(0px at '+x+'px '+y+'px)','circle('+rad+'px at '+x+'px '+y+'px)']},{duration:750,easing:'cubic-bezier(.65,0,.25,1)',pseudoElement:'::view-transition-new(root)'})).catch(()=>{});
      save();return}
    root.classList.add('tt');apply(n);save();setTimeout(()=>root.classList.remove('tt'),600);
  };
})();
