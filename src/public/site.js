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
          <button type="button">Add to cart</button>
        </article>
      `;
    })
    .join('');
}

loadProducts();
