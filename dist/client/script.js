const products = [
  {id:1,name:'Doritos Cool Ranch',type:'Chips',category:'chips',image:'doritos.png',price:1.60,stock:12,color:'#e7eef3'},
  {id:2,name:"Cheetos Flamin’ Hot Crunchy",type:'Chips',category:'chips',image:'hot_cheeto.png',price:1.80,stock:7,color:'#fff0de'},
  {id:3,name:'KitKat',type:'Chocolate',category:'sweet',image:'kitkat.png',price:1.50,stock:14,color:'#f8e7e5'},
  {id:4,name:'Reese’s Peanut Butter Cups',type:'Chocolate',category:'sweet',image:'reeses.png',price:1.50,stock:9,color:'#fff0de'},
  {id:5,name:'Skittles Original',type:'Candy',category:'sweet',image:'skittles.png',price:1.25,stock:10,color:'#f8e7e5'},
  {id:6,name:'Sour Patch Kids',type:'Candy',category:'sweet',image:'sour_patch_kids.png',price:1.25,stock:8,color:'#edf3dc'},
  {id:7,name:'Takis Fuego',type:'Chips',category:'chips',image:'takis.png',price:1.80,stock:6,color:'#eee7f6'},
  {id:8,name:'Trolli Sour Brite Crawlers',type:'Candy',category:'sweet',image:'trolli.png',price:1.25,stock:9,color:'#e7eef3'}
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
      <div class="product-visual"><img class="product-photo" src="images/snacks/${product.image}" alt="${product.name}" loading="lazy" decoding="async"></div>
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
