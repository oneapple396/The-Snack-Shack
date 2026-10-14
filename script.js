const products = [
  {id:1,name:'Doritos Cool Ranch',type:'Chips',category:'chips',image:'doritos.png',price:1.60,stock:12,color:'#e7eef3'},
  {id:2,name:"Cheetos Flamin’ Hot Crunchy",type:'Chips',category:'chips',image:'hot_cheeto.png',price:1.80,stock:7,color:'#fff0de'},
  {id:3,name:'KitKat',type:'Chocolate',category:'sweet',image:'kitkat.png',price:1.50,stock:14,color:'#f8e7e5'},
  {id:4,name:'Reese’s Peanut Butter Cups',type:'Chocolate',category:'sweet',image:'reeses.png',price:1.50,stock:9,color:'#fff0de'},
  {id:5,name:'Skittles Original',type:'Candy',category:'sweet',image:'skittles.png',price:1.25,stock:10,color:'#f8e7e5'},
  {id:6,name:'Sour Patch Kids',type:'Candy',category:'sweet',image:'sour_patch_kids.png',price:1.25,stock:8,color:'#edf3dc'},
  {id:7,name:'Takis Fuego',type:'Chips',category:'chips',image:'takis.png',price:1.80,stock:6,color:'#eee7f6'},
  {id:8,name:'Trolli Sour Brite Crawlers',type:'Candy',category:'sweet',image:'trolli.png',price:1.25,stock:9,color:'#e7eef3'},
  {id:9,name:'Sea Salt Crunch',type:'Chips',category:'chips',icon:'bakery_dining',price:1.60,stock:12,color:'#ffe1a8'},
  {id:10,name:'Nacho Cheese Chips',type:'Chips',category:'chips',icon:'bakery_dining',price:1.60,stock:7,color:'#ffb88c'},
  {id:11,name:'Hot Chili Twists',type:'Chips',category:'chips',icon:'local_fire_department',price:1.80,stock:4,color:'#ff9584'},
  {id:12,name:'Sour Cream Rings',type:'Chips',category:'chips',icon:'bakery_dining',price:1.60,stock:16,color:'#dcefa5'},
  {id:13,name:'Cola Classic',type:'Cold drink',category:'drinks',icon:'local_drink',price:1.60,stock:18,color:'#efada2'},
  {id:14,name:'Lemon Sparkler',type:'Cold drink',category:'drinks',icon:'local_drink',price:1.60,stock:11,color:'#f7e88b'},
  {id:15,name:'Orange Fizz',type:'Cold drink',category:'drinks',icon:'local_drink',price:1.60,stock:3,color:'#ffc278'},
  {id:16,name:'Bottled Water',type:'Cold drink',category:'drinks',icon:'water_drop',price:1.20,stock:22,color:'#bde4ed'},
  {id:17,name:'Chocolate Bar',type:'Sweet',category:'sweet',icon:'cookie',price:1.50,stock:14,color:'#cfad90'},
  {id:18,name:'Gummy Mix',type:'Sweet',category:'sweet',icon:'cookie',price:1.25,stock:9,color:'#f3b4c3'},
  {id:19,name:'Cookie Duo',type:'Sweet',category:'sweet',icon:'cookie',price:1.50,stock:5,color:'#dfc08f'},
  {id:20,name:'Fruit Chews',type:'Sweet',category:'sweet',icon:'cookie',price:1.00,stock:0,color:'#d7b6e9'},
  {id:21,name:'Apple Slices',type:'Fresh',category:'fresh',icon:'nutrition',price:1.25,stock:8,color:'#cde2a4'},
  {id:22,name:'Banana',type:'Fresh',category:'fresh',icon:'nutrition',price:0.75,stock:15,color:'#f5e47e'},
  {id:23,name:'Berry Yogurt',type:'Fresh',category:'fresh',icon:'icecream',price:2.25,stock:6,color:'#c8bae8'},
  {id:24,name:'Cheese & Crackers',type:'Fresh',category:'fresh',icon:'lunch_dining',price:2.50,stock:3,color:'#f2d37d'},
  {id:25,name:'Pretzel Bites',type:'Savory',category:'fresh',icon:'bakery_dining',price:1.75,stock:10,color:'#ddb68d'},
  {id:26,name:'Popcorn Cup',type:'Savory',category:'chips',icon:'local_dining',price:1.20,stock:13,color:'#f3dd9c'},
  {id:27,name:'Mint Gum',type:'Sweet',category:'sweet',icon:'eco',price:0.75,stock:20,color:'#bce0ca'},
  {id:28,name:'Cereal Bar',type:'Fresh',category:'fresh',icon:'grain',price:1.25,stock:9,color:'#d9c59a'},
  {id:29,name:'Iced Tea',type:'Cold drink',category:'drinks',icon:'emoji_food_beverage',price:1.80,stock:7,color:'#dab682'},
  {id:30,name:'Sports Drink',type:'Cold drink',category:'drinks',icon:'local_drink',price:2.00,stock:5,color:'#a9dbea'},
  {id:31,name:'Mini Donut Pack',type:'Sweet',category:'sweet',icon:'bakery_dining',price:1.75,stock:4,color:'#efb9ad'},
  {id:32,name:'Trail Mix',type:'Fresh',category:'fresh',icon:'grain',price:2.00,stock:0,color:'#d6b68e'}
];

const cart = new Map();
const grid = document.querySelector('#product-grid');
const money = value => `$${value.toFixed(2)}`;

function renderProducts(filter = 'all') {
  grid.innerHTML = products.map(product => {
    const quantity = cart.get(product.id) || 0;
    const remaining = product.stock - quantity;
    const visible = filter === 'all' || product.category === filter;
    const stockText = remaining === 0 ? 'This item is sold out.' : remaining === 1 ? '1 item remains in stock.' : `${remaining} items remain in stock.`;
    return `<article class="product-card" data-category="${product.category}" ${visible ? '' : 'hidden'} style="--product-bg:${product.color}">
      <div class="product-visual">${product.image ? `<img class="product-photo" src="images/snacks/${product.image}" alt="${product.name}" loading="lazy" decoding="async">` : `<span class="material-symbols-outlined product-icon" aria-hidden="true">${product.icon}</span>`}</div>
      <div class="product-info"><span class="product-type">${product.type}</span><h3>${product.name}</h3>
        <div class="price-row"><strong class="price">${money(product.price)}</strong></div>
        <p class="stock ${remaining === 0 ? 'out' : remaining <= 4 ? 'low' : ''}">${stockText}</p>
        <div class="stock-bar"><span style="--stock:${Math.round(remaining / product.stock * 100) || 0}%"></span></div>
        <button type="button" data-add="${product.id}" ${remaining === 0 ? 'disabled' : ''}>${remaining === 0 ? 'Unavailable' : quantity ? 'Add another' : 'Add to bag'}</button>
      </div></article>`;
  }).join('');
}

function renderCart() {
  const cartItems = document.querySelector('#cart-items');
  const entries = [...cart.entries()];
  let count = 0, total = 0;
  cartItems.innerHTML = entries.map(([id, quantity]) => {
    const product = products.find(item => item.id === id);
    count += quantity; total += product.price * quantity;
    return `<div class="cart-item"><div><strong>${product.name}</strong><p>${money(product.price)} each</p></div>
      <div class="qty-control"><button type="button" data-change="${id}" data-delta="-1" aria-label="Remove one ${product.name}">−</button><span>${quantity}</span><button type="button" data-change="${id}" data-delta="1" aria-label="Add one ${product.name}" ${quantity >= product.stock ? 'disabled' : ''}>+</button></div>
      <button class="remove" type="button" data-remove="${id}">Remove</button></div>`;
  }).join('');
  document.querySelector('#empty-cart').hidden = count > 0;
  document.querySelector('#header-count').textContent = count;
  document.querySelector('#item-count').textContent = count;
  document.querySelector('#total-price').textContent = money(total);
  document.querySelector('#checkout').disabled = count === 0;
  document.querySelector('#dialog-total').textContent = money(total);
}

function activeFilter() { return document.querySelector('.filter.active')?.dataset.filter || 'all'; }
function updateAll() { renderProducts(activeFilter()); renderCart(); }
function showToast(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800); }

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-add]'); if (!button) return;
  const id = Number(button.dataset.add), product = products.find(item => item.id === id), quantity = cart.get(id) || 0;
  if (quantity < product.stock) { cart.set(id, quantity + 1); updateAll(); showToast(`${product.name} has been added to your order.`); }
});

document.querySelector('#cart-items').addEventListener('click', event => {
  const change = event.target.closest('[data-change]'), remove = event.target.closest('[data-remove]');
  if (change) { const id = Number(change.dataset.change), next = (cart.get(id) || 0) + Number(change.dataset.delta), product = products.find(item => item.id === id); if (next <= 0) cart.delete(id); else if (next <= product.stock) cart.set(id, next); updateAll(); }
  if (remove) { cart.delete(Number(remove.dataset.remove)); updateAll(); }
});

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-pressed','false'); });
  button.classList.add('active'); button.setAttribute('aria-pressed','true'); renderProducts(button.dataset.filter);
}));

const dialog = document.querySelector('#confirmation-dialog');
document.querySelector('#checkout').addEventListener('click', () => {
  document.querySelector('#order-number').textContent = `SS-${Math.floor(100 + Math.random() * 900)}`;
  dialog.showModal();
  cart.clear(); updateAll();
});
document.querySelectorAll('.dialog-close,.dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

renderProducts(); renderCart();
