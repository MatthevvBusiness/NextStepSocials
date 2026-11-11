const menu = {
 coffee:[['Honey Lavender Latte','Espresso, steamed milk, local honey & a hint of lavender','$6.25'],['Brown Sugar Shaken Espresso','Double espresso, brown sugar, oat milk & cinnamon','$5.75'],['Classic Cappuccino','Rich espresso with silky microfoam','$4.75'],['Maple Cold Brew','Slow-steeped coffee with a touch of maple','$5.50'],['Vanilla Bean Latte','Espresso, real vanilla & your choice of milk','$5.75'],['Daily Drip','Freshly brewed, always comforting','$3.50']],
 tea:[['London Fog','Earl Grey, vanilla & steamed milk','$5.25'],['Iced Matcha Latte','Ceremonial-style matcha & your choice of milk','$5.75'],['Chai Latte','Warming spices and creamy steamed milk','$5.25'],['Golden Milk','Turmeric, ginger, cinnamon & oat milk','$5.50'],['Hot Chocolate','Rich chocolate with a cloud of whipped cream','$4.75'],['Loose-Leaf Tea','Ask about today’s rotating selection','$3.75']],
 bites:[['Butter Croissant','Flaky, golden & baked fresh','$4.25'],['Blueberry Muffin','A soft crumb and plenty of berries','$4.50'],['Avocado Toast','Sourdough, smashed avocado & chili flakes','$9.50'],['Breakfast Sandwich','Egg, cheddar & your choice of bacon or greens','$8.75'],['Cinnamon Roll','Warm cinnamon swirl with vanilla glaze','$5.25'],['Seasonal Cookie','A sweet little something for the road','$3.50']]
};
const list=document.getElementById('menu-items');
function renderMenu(category){list.innerHTML=menu[category].map(([name,description,price])=>`<article class="menu-item"><div><h3>${name}</h3><p>${description}</p></div><strong>${price}</strong></article>`).join('');}
renderMenu('coffee');
document.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});button.classList.add('active');button.setAttribute('aria-selected','true');renderMenu(button.dataset.category);}));
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
toggle.addEventListener('click',()=>{let open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}));
const revealElements=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.body.classList.add('animations-ready');
revealElements.forEach((el,i)=>{
  if(el.classList.contains('story-visual'))el.classList.add('from-left');
  if(el.classList.contains('story-copy'))el.classList.add('from-right');
  if(el.classList.contains('gallery-card'))el.style.setProperty('--reveal-delay',`${[0,110,220][[...el.parentElement.children].indexOf(el)]||0}ms`);
});
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){
  revealElements.forEach(el=>el.classList.add('visible'));
}else{
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}})
  },{threshold:.12,rootMargin:'0px 0px -25px 0px'});
  revealElements.forEach(el=>observer.observe(el));
}
document.getElementById('contact-form').addEventListener('submit',e=>{e.preventDefault();document.getElementById('form-status').textContent='Demo preview only: Your message was not sent or stored. A live business website would connect this form to an inbox.';});
