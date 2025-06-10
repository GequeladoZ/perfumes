// Definição dos produtos
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

// Função para renderizar os produtos na página
function renderProducts() {
  const container = document.getElementById('products-container');
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.desc}</p>
      <div class="price">R$ ${product.price.toFixed(2)}</div>
      <button data-id="${product.id}">Adicionar ao carrinho</button>
    `;
    container.appendChild(div);
  });
}

// Função para atualizar o carrinho
function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  document.getElementById('cart-count').textContent = cartCount;
  document.getElementById('cart-total').textContent = cartTotal;
}

// Função para adicionar um produto ao carrinho
function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === id);
  const existingProduct = cart.find(p => p.id === id);

  if (existingProduct) {
    existingProduct.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Função para limpar o carrinho
function clearCart() {
  localStorage.removeItem('cart');
  updateCartDisplay();
}

// Evento de clique nos botões de adicionar ao carrinho
document.getElementById('products-container').addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    addToCart(parseInt(e.target.dataset.id));
  }
});

// Evento de clique no botão de limpar carrinho
document.getElementById('clear-cart').addEventListener('click', clearCart);

// Inicialização
renderProducts();
updateCartDisplay();
