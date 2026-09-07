const cart = new Map();
let catalog = [];

async function loadProducts() {
  const response = await fetch('/api/products');
  const data = await response.json();
  catalog = data.products;
  const products = document.querySelector('#products');

  products.innerHTML = catalog
    .map((product) => {
      const euros = (product.priceCents / 100).toFixed(2);
      const description = product.description ? `<p class="description">${product.description}</p>` : '';
      return `
        <article class="product">
          <img src="${product.image}" alt="" class="product-image">
          <div class="product-copy">
            <h2>${product.name}</h2>
            ${description}
            <p class="price">${product.priceLabel || `${euros} EUR`}</p>
          </div>
          <button type="button" data-add-product="${product.id}">Lisa korvi</button>
        </article>
      `;
    })
    .join('');

  products.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-add-product]');
    if (!button) {
      return;
    }

    addToCart(button.dataset.addProduct);
  });

  document.querySelector('#cart-items').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-cart-action]');
    if (!button) {
      return;
    }

    updateCartItem(button.dataset.productId, button.dataset.cartAction);
  });

  document.querySelector('#checkout-button').addEventListener('click', submitOrder);
  renderCart();
}

function addToCart(productId) {
  const product = catalog.find((item) => item.id === productId);
  const existing = cart.get(productId);
  cart.set(productId, {
    product,
    qty: existing ? existing.qty + 1 : 1
  });
  document.querySelector('#order-status').textContent = `${product.name} ootab nüüd korvis.`;
  renderCart();
}

function updateCartItem(productId, action) {
  const entry = cart.get(productId);
  if (!entry) {
    return;
  }

  if (action === 'increase') {
    entry.qty += 1;
  }

  if (action === 'decrease') {
    entry.qty -= 1;
  }

  if (action === 'remove' || entry.qty < 1) {
    cart.delete(productId);
  }

  renderCart();
}

function renderCart() {
  const cartItems = document.querySelector('#cart-items');
  const checkoutButton = document.querySelector('#checkout-button');
  const entries = Array.from(cart.values());
  const itemCount = entries.reduce((sum, entry) => sum + entry.qty, 0);

  document.querySelector('#cart-count').textContent = `${itemCount} ${itemCount === 1 ? 'asi' : 'asja'}`;
  document.querySelector('#cart-total').textContent = `Kokku: ${formatCartTotal(entries)}`;
  checkoutButton.disabled = entries.length === 0;

  if (entries.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Korv on tühi. Õnn vaatab riiulilt vastu.</p>';
    return;
  }

  cartItems.innerHTML = entries
    .map(({ product, qty }) => `
      <article class="cart-item">
        <img src="${product.image}" alt="" class="cart-thumb">
        <div>
          <h3>${product.name}</h3>
          <p>${product.priceLabel}</p>
          <div class="qty-controls" aria-label="${product.name} kogus">
            <button type="button" data-cart-action="decrease" data-product-id="${product.id}" aria-label="Vähenda kogust">−</button>
            <span>${qty}</span>
            <button type="button" data-cart-action="increase" data-product-id="${product.id}" aria-label="Suurenda kogust">+</button>
            <button type="button" class="remove-button" data-cart-action="remove" data-product-id="${product.id}">Eemalda</button>
          </div>
        </div>
      </article>
    `)
    .join('');
}

function formatCartTotal(entries) {
  if (entries.length === 0) {
    return '0 tunnet';
  }

  return entries
    .map(({ product, qty }) => `${qty} × ${product.priceLabel}`)
    .join(' + ');
}

async function submitOrder() {
  const entries = Array.from(cart.values());
  const status = document.querySelector('#order-status');

  if (entries.length === 0) {
    status.textContent = 'Korv on veel tühi.';
    return;
  }

  status.textContent = 'Pakime õnne paberisse...';

  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cart: {
        userId: 'demo-user',
        items: entries.map(({ product, qty }) => ({
          productId: product.id,
          qty,
          priceCents: product.priceCents
        }))
      },
      paymentInfo: {
        token: 'tok_synthetic',
        billingPostalCode: '10115'
      }
    })
  });
  const result = await response.json();

  if (!response.ok) {
    status.textContent = result.error;
    return;
  }

  cart.clear();
  renderCart();
  status.textContent = `Tellimus kinnitatud: ${result.orderId}`;
}

loadProducts();
