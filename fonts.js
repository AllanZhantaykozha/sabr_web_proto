/* Шрифты сайта. Быстро сравнить варианты: добавьте к адресу ?font=A, ?font=B, ?font=C, ?font=D или ?font=O (исходный).
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
