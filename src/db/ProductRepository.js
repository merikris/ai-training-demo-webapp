const products = [
  {
    id: 'summer-01',
    name: 'Suveõhtu ilma sääskedeta',
    priceCents: 4990,
    priceLabel: '3 päikeselaiku + üks vaba terrassilaud',
    description: 'Soe valgus, pikad varjud ja grill, mis läheb esimese tikuga põlema.',
    image: '/assets/summer-evening.png'
  },
  {
    id: 'morning-02',
    name: 'Hommik, kus Teams ei avane ise',
    priceCents: 2990,
    priceLabel: '1 soe kohv + 14 lugemata kirja vähem',
    description: 'Vaikne algus, kus kalender korraks teeskleb, et ta on sinu sõber.',
    image: '/assets/peaceful-morning.png'
  },
  {
    id: 'winter-03',
    name: 'Lumi, mis ei muutu lörtsiks',
    priceCents: 3990,
    priceLabel: '7 lumehelvest + kuivad sokid',
    description: 'Krõbe õhk, ilus tänav ja saapad, mis ei anna poolel teel alla.',
    image: '/assets/snowy-winter.png'
  },
  {
    id: 'backorder-01',
    name: 'Viimane talvevalgus enne 16:00',
    priceCents: 7990,
    priceLabel: 'üks haruldane hingetõmme + töökorras laadija',
    description: 'Väga piiratud kogus. Müüja soovitab seda mitte demo ajal maha pillata.',
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
