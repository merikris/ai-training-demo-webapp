const products = [
  { id: 'backorder-01', name: 'Limited Stock Headphones', priceCents: 7990 },
  { id: 'keyboard-01', name: 'Compact Keyboard', priceCents: 4990 },
  { id: 'mouse-02', name: 'Wireless Mouse', priceCents: 2990 },
  { id: 'stand-03', name: 'Laptop Stand', priceCents: 3990 }
];

function createMemoryDb(seedProducts = products) {
  async function all(sql, params) {
    if (sql.includes('order by name')) {
      return [...seedProducts].sort((a, b) => a.name.localeCompare(b.name));
    }
    return [];
  }

  async function get(sql, params) {
    if (sql.includes('where id = ?')) {
      return seedProducts.find((product) => product.id === params[0]) || null;
    }
    return null;
  }

  return { all, get };
}

function createProductRepository(db = createMemoryDb()) {
  async function listProductCatalog() {
    return db.all(
      'select id, name, price_cents as priceCents from products order by name',
      []
    );
  }

  async function findProductById(productId) {
    return db.get(
      'select id, name, price_cents as priceCents from products where id = ?',
      [productId]
    );
  }

  return {
    listProductCatalog,
    findProductById
  };
}

module.exports = { createMemoryDb, createProductRepository };
