const products = [
  {id:1,name:'Sea Salt Crunch',type:'Chips',category:'chips',emoji:'🥔',price:1.60,original:2.00,stock:12,color:'#ffe1a8'},
  {id:2,name:'Nacho Cheese Chips',type:'Chips',category:'chips',emoji:'🔺',price:1.60,original:2.00,stock:7,color:'#ffb88c'},
  {id:3,name:'Hot Chili Twists',type:'Chips',category:'chips',emoji:'🌶️',price:1.80,original:2.25,stock:4,color:'#ff9584'},
  {id:4,name:'Sour Cream Rings',type:'Chips',category:'chips',emoji:'🧅',price:1.60,original:2.00,stock:16,color:'#dcefa5'},
  {id:5,name:'Cola Classic',type:'Cold drink',category:'drinks',emoji:'🥤',price:1.60,original:2.00,stock:18,color:'#efada2'},
  {id:6,name:'Lemon Sparkler',type:'Cold drink',category:'drinks',emoji:'🍋',price:1.60,original:2.00,stock:11,color:'#f7e88b'},
  {id:7,name:'Orange Fizz',type:'Cold drink',category:'drinks',emoji:'🍊',price:1.60,original:2.00,stock:3,color:'#ffc278'},
  {id:8,name:'Bottled Water',type:'Cold drink',category:'drinks',emoji:'💧',price:1.20,original:1.50,stock:22,color:'#bde4ed'},
  {id:9,name:'Chocolate Bar',type:'Sweet',category:'sweet',emoji:'🍫',price:1.50,stock:14,color:'#cfad90'},
  {id:10,name:'Gummy Mix',type:'Sweet',category:'sweet',emoji:'🐻',price:1.25,stock:9,color:'#f3b4c3'},
  {id:11,name:'Cookie Duo',type:'Sweet',category:'sweet',emoji:'🍪',price:1.50,stock:5,color:'#dfc08f'},
  {id:12,name:'Fruit Chews',type:'Sweet',category:'sweet',emoji:'🍬',price:1.00,stock:0,color:'#d7b6e9'},
  {id:13,name:'Apple Slices',type:'Fresh',category:'fresh',emoji:'🍎',price:1.25,stock:8,color:'#cde2a4'},
  {id:14,name:'Banana',type:'Fresh',category:'fresh',emoji:'🍌',price:0.75,stock:15,color:'#f5e47e'},
  {id:15,name:'Berry Yogurt',type:'Fresh',category:'fresh',emoji:'🫐',price:2.25,stock:6,color:'#c8bae8'},
  {id:16,name:'Cheese & Crackers',type:'Fresh',category:'fresh',emoji:'🧀',price:2.50,stock:3,color:'#f2d37d'},
  {id:17,name:'Pretzel Bites',type:'Savory',category:'fresh',emoji:'🥨',price:1.75,stock:10,color:'#ddb68d'},
  {id:18,name:'Popcorn Cup',type:'Savory',category:'chips',emoji:'🍿',price:1.20,original:1.50,stock:13,color:'#f3dd9c'},
  {id:19,name:'Mint Gum',type:'Sweet',category:'sweet',emoji:'🌿',price:0.75,stock:20,color:'#bce0ca'},
  {id:20,name:'Cereal Bar',type:'Fresh',category:'fresh',emoji:'🌾',price:1.25,stock:9,color:'#d9c59a'},
  {id:21,name:'Iced Tea',type:'Cold drink',category:'drinks',emoji:'🧋',price:1.80,original:2.25,stock:7,color:'#dab682'},
  {id:22,name:'Sports Drink',type:'Cold drink',category:'drinks',emoji:'⚡',price:2.00,original:2.50,stock:5,color:'#a9dbea'},
  {id:23,name:'Mini Donut Pack',type:'Sweet',category:'sweet',emoji:'🍩',price:1.75,stock:4,color:'#efb9ad'},
  {id:24,name:'Trail Mix',type:'Fresh',category:'fresh',emoji:'🥜',price:2.00,stock:0,color:'#d6b68e'}
];

const cart = new Map();
const grid = document.querySelector('#product-grid');
const money = value => `$${value.toFixed(2)}`;

function renderProducts(filter = 'all') {
  grid.innerHTML = products.map(product => {
    const quantity = cart.get(product.id) || 0;
    const remaining = product.stock - quantity;
    const isSale = Boolean(product.original);
    const visible = filter === 'all' || product.category === filter || (filter === 'sale' && isSale);
    const stockText = remaining === 0 ? 'Sold out' : remaining <= 4 ? `Only ${remaining} left!` : `${remaining} in stock`;
    return `<article class="product-card" data-category="${product.category}" ${visible ? '' : 'hidden'} style="--product-bg:${product.color}">
      <div class="product-visual">${isSale ? '<span class="sale-badge">20% OFF</span>' : ''}<span class="product-emoji" aria-hidden="true">${product.emoji}</span></div>
      <div class="product-info"><span class="product-type">${product.type}</span><h3>${product.name}</h3>
        <div class="price-row"><strong class="price">${money(product.price)}</strong>${isSale ? `<span class="old-price">${money(product.original)}</span>` : ''}</div>
        <p class="stock ${remaining === 0 ? 'out' : remaining <= 4 ? 'low' : ''}">${stockText}</p>
        <div class="stock-bar"><span style="--stock:${Math.round(remaining / product.stock * 100) || 0}%"></span></div>
        <button type="button" data-add="${product.id}" ${remaining === 0 ? 'disabled' : ''}>${remaining === 0 ? 'Unavailable' : quantity ? 'Add another' : 'Add to bag'}</button>
      </div></article>`;
  }).join('');
}

function renderCart() {
  const cartItems = document.querySelector('#cart-items');
  const entries = [...cart.entries()];
  let count = 0, total = 0, savings = 0;
  cartItems.innerHTML = entries.map(([id, quantity]) => {
    const product = products.find(item => item.id === id);
    count += quantity; total += product.price * quantity;
    if (product.original) savings += (product.original - product.price) * quantity;
    return `<div class="cart-item"><div><strong>${product.name}</strong><p>${money(product.price)} each</p></div>
      <div class="qty-control"><button type="button" data-change="${id}" data-delta="-1" aria-label="Remove one ${product.name}">−</button><span>${quantity}</span><button type="button" data-change="${id}" data-delta="1" aria-label="Add one ${product.name}" ${quantity >= product.stock ? 'disabled' : ''}>+</button></div>
      <button class="remove" type="button" data-remove="${id}">Remove</button></div>`;
  }).join('');
  document.querySelector('#empty-cart').hidden = count > 0;
  document.querySelector('#header-count').textContent = count;
  document.querySelector('#item-count').textContent = count;
  document.querySelector('#total-price').textContent = money(total);
  document.querySelector('#checkout').disabled = count === 0;
  const savingsRow = document.querySelector('.savings-row');
  savingsRow.hidden = savings === 0;
  document.querySelector('#savings').textContent = `−${money(savings)}`;
  document.querySelector('#dialog-total').textContent = money(total);
}

function activeFilter() { return document.querySelector('.filter.active')?.dataset.filter || 'all'; }
function updateAll() { renderProducts(activeFilter()); renderCart(); }
function showToast(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800); }

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-add]'); if (!button) return;
  const id = Number(button.dataset.add), product = products.find(item => item.id === id), quantity = cart.get(id) || 0;
  if (quantity < product.stock) { cart.set(id, quantity + 1); updateAll(); showToast(`${product.name} added to your bag`); }
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

document.querySelector('[data-filter-link]').addEventListener('click', () => {
  const saleButton = document.querySelector('[data-filter="sale"]'); document.querySelectorAll('.filter').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-pressed','false'); }); saleButton.classList.add('active'); saleButton.setAttribute('aria-pressed','true'); renderProducts('sale');
});

const dialog = document.querySelector('#confirmation-dialog');
document.querySelector('#checkout').addEventListener('click', () => {
  document.querySelector('#order-number').textContent = `SS-${Math.floor(100 + Math.random() * 900)}`;
  dialog.showModal();
  cart.clear(); updateAll();
});
document.querySelectorAll('.dialog-close,.dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

renderProducts(); renderCart();
