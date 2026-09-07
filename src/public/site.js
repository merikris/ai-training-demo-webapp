async function loadProducts() {
  const response = await fetch('/api/products');
  const data = await response.json();
  const products = document.querySelector('#products');

  products.innerHTML = data.products
    .map((product) => {
      const euros = (product.priceCents / 100).toFixed(2);
      return `
        <article class="product">
          <h2>${product.name}</h2>
          <p>${euros} EUR</p>
          <button type="button" data-product-id="${product.id}">Submit order</button>
        </article>
      `;
    })
    .join('');

  products.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-product-id]');
    if (!button) {
      return;
    }

    const product = data.products.find((item) => item.id === button.dataset.productId);
    await submitOrder(product);
  });
}

async function submitOrder(product) {
  const status = document.querySelector('#order-status');
  status.textContent = 'Submitting order...';

  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cart: {
        userId: 'demo-user',
        items: [
          {
            productId: product.id,
            qty: 1,
            priceCents: product.priceCents
          }
        ]
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

  status.textContent = `Order confirmed: ${result.orderId}`;
}

loadProducts();
