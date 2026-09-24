const cart = [];
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartDrawer = document.getElementById('cartDrawer');
const drawerShade = document.getElementById('drawerShade');
const preorderModal = document.getElementById('preorderModal');

function euro(v){ return new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(v); }
function addToCart(name, price){ cart.push({name,price}); renderCart(); openCart(); }
function removeFromCart(index){ cart.splice(index,1); renderCart(); }
function renderCart(){
  cartCount.textContent = cart.length;
  if(!cart.length){ cartItems.innerHTML='<p class="empty-cart">Dein Warenkorb ist leer.</p>'; }
  else { cartItems.innerHTML = cart.map((item,i)=>`<div class="cart-item"><div class="cart-thumb"></div><div><h4>${item.name}</h4><p>${euro(item.price)}</p></div><button class="cart-remove" onclick="removeFromCart(${i})">Entfernen</button></div>`).join(''); }
  cartTotal.textContent = euro(cart.reduce((s,i)=>s+i.price,0));
}
function openCart(){ cartDrawer.classList.add('open'); drawerShade.classList.add('open'); cartDrawer.setAttribute('aria-hidden','false'); }
function closeCart(){ cartDrawer.classList.remove('open'); drawerShade.classList.remove('open'); cartDrawer.setAttribute('aria-hidden','true'); }
function openPreorder(){ preorderModal.classList.add('open'); preorderModal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closePreorder(){ preorderModal.classList.remove('open'); preorderModal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
function submitPreorder(e){
  e.preventDefault();
  const payload = {name:document.getElementById('name').value,email:document.getElementById('email').value,wood:document.getElementById('wood').value,length:document.getElementById('length').value,weight:document.getElementById('weight').value,finish:document.getElementById('finish').value,notes:document.getElementById('notes').value};
  console.log('Rheinholz preorder demo',payload);
  document.getElementById('preorderSuccess').style.display='block';
  e.target.reset();
}
renderCart();
