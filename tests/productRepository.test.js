const { createMemoryDb, createProductRepository } = require('../src/db/ProductRepository');

describe('ProductRepository', () => {
  test('default catalog includes the limited stock product', async () => {
    const repository = createProductRepository();
    await expect(repository.findProductById('backorder-01')).resolves.toEqual({
      id: 'backorder-01',
      name: 'Viimane talvevalgus',
      priceCents: 7990,
      priceLabel: 'üks haruldane hingetõmme',
      description: 'Väga piiratud kogus. Müüja väidab, et seda tuleb hoida kahe käega.',
      image: '/assets/winter-light.png'
    });
  });

  test('createMemoryDb returns products ordered by name', async () => {
    const db = createMemoryDb([
      { id: 'b', name: 'Beta', priceCents: 200 },
      { id: 'a', name: 'Alpha', priceCents: 100 }
    ]);

    await expect(db.all('select * from products order by name', [])).resolves.toEqual([
      { id: 'a', name: 'Alpha', priceCents: 100 },
      { id: 'b', name: 'Beta', priceCents: 200 }
    ]);
  });

  test('createMemoryDb returns one matching product by parameter', async () => {
    const db = createMemoryDb([{ id: 'a', name: 'Alpha', priceCents: 100 }]);
    await expect(db.get('select * from products where id = ?', ['a'])).resolves.toEqual({
      id: 'a',
      name: 'Alpha',
      priceCents: 100
    });
  });

  test('listProductCatalog uses a parameter array with the catalog query', async () => {
    const db = {
      all: jest.fn().mockResolvedValue([])
    };
    const repository = createProductRepository(db);

    await repository.listProductCatalog();

    expect(db.all).toHaveBeenCalledWith(
      'select id, name, price_cents as priceCents, price_label as priceLabel, description, image from products order by name',
      []
    );
  });

  test('findProductById uses a parameterized query', async () => {
    const db = {
      get: jest.fn().mockResolvedValue({ id: 'keyboard-01' })
    };
    const repository = createProductRepository(db);

    await expect(repository.findProductById('keyboard-01')).resolves.toEqual({
      id: 'keyboard-01'
    });
    expect(db.get).toHaveBeenCalledWith(
      'select id, name, price_cents as priceCents, price_label as priceLabel, description, image from products where id = ?',
      ['keyboard-01']
    );
  });
});
