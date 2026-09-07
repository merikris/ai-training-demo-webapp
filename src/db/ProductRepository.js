const products = [
  {
    id: 'summer-01',
    name: 'Ilus suveõhtu',
    priceCents: 4990,
    priceLabel: '3 päikeselaiku',
    description: 'Soe valgus, pikad varjud ja tunne, et homme võib oodata.',
    image: '/assets/summer-evening.png'
  },
  {
    id: 'morning-02',
    name: 'Rahulik hommik',
    priceCents: 2990,
    priceLabel: '1 soe kohv + 2 vaikset minutit',
    description: 'Väike vaikusevaru enne seda, kui maailm liiga valjuks läheb.',
    image: '/assets/peaceful-morning.png'
  },
  {
    id: 'winter-03',
    name: 'Lumine talv',
    priceCents: 3990,
    priceLabel: '7 lumehelvest',
    description: 'Krõbe õhk, pehme valgus ja täiesti põhjendamatu optimism.',
    image: '/assets/snowy-winter.png'
  },
  {
    id: 'backorder-01',
    name: 'Viimane talvevalgus',
    priceCents: 7990,
    priceLabel: 'üks haruldane hingetõmme',
    description: 'Väga piiratud kogus. Müüja väidab, et seda tuleb hoida kahe käega.',
    image: '/assets/winter-light.png'
  }
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
      'select id, name, price_cents as priceCents, price_label as priceLabel, description, image from products order by name',
      []
    );
  }

  async function findProductById(productId) {
    return db.get(
      'select id, name, price_cents as priceCents, price_label as priceLabel, description, image from products where id = ?',
      [productId]
    );
  }

  return {
    listProductCatalog,
    findProductById
  };
}

module.exports = { createMemoryDb, createProductRepository };
