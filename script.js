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
    img: 'https://via.placeholder.com/240x280?text=Ilia+Deo+Parfum'
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

function renderProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = '';
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

  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      addToCart(id);
    });
  });
}

function updateCartDisplay() {
  const countSpan = document.getElementById('cart-count');
  const totalSpan = document.getElementById('cart-total');
  let total = 0;
  let items = 0;
  cart.forEach(item => {
    items += item.qty;
    total += item.qty * item.price;
  });
  countSpan.textContent = items;
  totalSpan.textContent = total.toFixed(2);
}

function addToCart(id) {
  const prod = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name: prod.name, price: prod.price, qty: 1 });
  }
  updateCartDisplay();
}

function clearCart() {
  cart = [];
  updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartDisplay();
  const clearBtn = document.getElementById('clear-cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearCart);
  }
});
