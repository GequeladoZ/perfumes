const products = [
  {
    id: 1,
    name: 'Luna Intense',
    desc: 'Perfume feminino floral frutado, ideal para noites especiais.',
    price: 239.90,
    img: 'https://via.placeholder.com/240x280?text=Luna+Intense'
  },
  {
    id: 2,
    name: 'Essencial Feminino',
    desc: 'Notas de jasmim, violeta e pitanga. Sofisticação em cada gota.',
    price: 199.90,
    img: 'https://via.placeholder.com/240x280?text=Essencial+Feminino'
  },
  {
    id: 3,
    name: 'Kaiak Feminino',
    desc: 'Aroma fresco, vibrante, cítrico e floral.',
    price: 179.90,
    img: 'https://via.placeholder.com/240x280?text=Kaiak+Feminino'
  },
  {
    id: 4,
    name: 'Ilía Deo Parfum',
    desc: 'Frutas vermelhas, musk e baunilha suave.',
    price: 209.90,
    img: 'https://via.placeholder.com/240x280?text=Ilía+Deo+Parfum'
  },
  {
    id: 5,
    name: 'Kriska Drama',
    desc: 'Doce, marcante, com baunilha e notas intensas.',
    price: 149.90,
    img: 'https://via.placeholder.com/240x280?text=Kriska+Drama'
  }
];

let cart = [];

const container = document.getElementById('products-container');
const countSpan = document.getElementById('cart-count');
const totalSpan = document.getElementById('cart-total');
const clearBtn = document.getElementById('clear-cart');
const cartItemsDiv = document.getElementById('cart-items');

function renderProducts() {
  container.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
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
    total += item.price * item.qty;
  });

  countSpan.textContent = items;
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
      <span>${item.name}</span>
      <span>Qtd: ${item.qty}</span>
      <span>R$ ${(item.price * item.qty).toFixed(2)}</span>
    `;
    cartItemsDiv.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const itemInCart = cart.find(item => item.id === id);
  if (itemInCart) {
    itemInCart.qty++;
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
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
  }
});

clearBtn.addEventListener('click', clearCart);

renderProducts();
updateCartDisplay();
