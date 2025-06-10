const products = [
  {
    id: 1,
    name: 'Luna Intense',
    desc: 'Perfume feminino floral frutado, ideal para noites especiais.',
    price: 239.90,
    img: 'https://imgnatura.vtexassets.com/arquivos/ids/166588-800-auto?v=637861212992130000'
  },
  {
    id: 2,
    name: 'Essencial Feminino',
    desc: 'Notas de jasmim, violeta e pitanga. Sofisticação em cada gota.',
    price: 199.90,
    img: 'https://imgnatura.vtexassets.com/arquivos/ids/167179-800-auto?v=637867110224200000'
  },
  {
    id: 3,
    name: 'Kaiak Feminino',
    desc: 'Aroma fresco, vibrante, cítrico e floral.',
    price: 179.90,
    img: 'https://imgnatura.vtexassets.com/arquivos/ids/167077-800-auto?v=637864265960130000'
  },
  {
    id: 4,
    name: 'Ilía Deo Parfum',
    desc: 'Frutas vermelhas, musk e baunilha suave.',
    price: 209.90,
    img: 'https://imgnatura.vtexassets.com/arquivos/ids/165673-800-auto?v=637852999823500000'
  },
  {
    id: 5,
    name: 'Kriska Drama',
    desc: 'Doce, marcante, com baunilha e notas intensas.',
    price: 149.90,
    img: 'https://imgnatura.vtexassets.com/arquivos/ids/164813-800-auto?v=637834253530370000'
  }
];

let cart = [];

const container = document.getElementById('products-container');
const countSpans = document.querySelectorAll('#cart-count');
const totalSpan = document.getElementById('cart-total');
const clearBtn = document.getElementById('clear-cart');
const cartItemsDiv = document.getElementById('cart-items');

function renderProducts() {
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h2>${p.name}</h2>
      <p>${p.desc}</p>
      <div class="price">R$ ${p.price.toFixed(2)}</div>
      <button data-id="${p.id}">Adicionar ao carrinho</button>
    `;
    container.appendChild(div);
  });
}

function updateCartDisplay() {
  let total = 0;
  let items = 0;

  cart.forEach(item => {
    items += item.qty;
    total += item.qty * item.price;
  });

  countSpans.forEach(span => span.textContent = items);
  totalSpan.textContent = total.toFixed(2);
  renderCartItems();
}

function renderCartItems() {
  cartItemsDiv.innerHTML = '';

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
    return;
  }

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name}</span> - 
      <span>Qtd: ${item.qty}</span> - 
      <span>R$ ${(item.price * item.qty).toFixed(2)}</span>
    `;
    cartItemsDiv.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }

  updateCartDisplay();
}

function clearCart() {
  cart = [];
  updateCartDisplay();
}

container.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    addToCart(parseInt(e.target.dataset.id));
  }
});

clearBtn.addEventListener('click', clearCart);

renderProducts();
updateCartDisplay();
