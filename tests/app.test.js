const request = require('supertest');
const { createApp } = require('../src/app');

describe('createApp', () => {
  test('GET /api/products returns the catalog', async () => {
    const app = createApp({
      productRepository: {
        listProductCatalog: jest.fn().mockResolvedValue([
          {
            id: 'summer-01',
            name: 'Ilus suveõhtu',
            priceCents: 4990,
            priceLabel: '3 päikeselaiku',
            description: 'Soe valgus',
            image: '/assets/summer-evening.png'
          }
        ])
      }
    });

    await request(app)
      .get('/api/products')
      .expect(200)
      .expect({
        products: [
          {
            id: 'summer-01',
            name: 'Ilus suveõhtu',
            priceCents: 4990,
            priceLabel: '3 päikeselaiku',
            description: 'Soe valgus',
            image: '/assets/summer-evening.png'
          }
        ]
      });
  });

  test('GET /api/products/:id returns one product', async () => {
    const app = createApp({
      productRepository: {
        findProductById: jest.fn().mockResolvedValue({
          id: 'mouse-02',
          name: 'Rahulik hommik',
          priceCents: 2990,
          priceLabel: '1 soe kohv + 2 vaikset minutit',
          description: 'Väike vaikusevaru',
          image: '/assets/peaceful-morning.png'
        })
      }
    });

    await request(app)
      .get('/api/products/mouse-02')
      .expect(200)
      .expect({
        product: {
          id: 'mouse-02',
          name: 'Rahulik hommik',
          priceCents: 2990,
          priceLabel: '1 soe kohv + 2 vaikset minutit',
          description: 'Väike vaikusevaru',
          image: '/assets/peaceful-morning.png'
        }
      });
  });

  test('GET /api/products/:id returns 404 when missing', async () => {
    const app = createApp({
      productRepository: {
        findProductById: jest.fn().mockResolvedValue(null)
      }
    });

    await request(app)
      .get('/api/products/missing')
      .expect(404)
      .expect({ error: 'Product not found' });
  });

  test('POST /api/orders returns a confirmed order', async () => {
    const app = createApp({
      orderService: {
        submitOrder: jest.fn().mockResolvedValue({
          success: true,
          orderId: 'ord_123'
        })
      }
    });

    await request(app)
      .post('/api/orders')
      .send({ cart: { items: [] }, paymentInfo: { token: 'tok_synthetic' } })
      .expect(200)
      .expect({ orderId: 'ord_123', status: 'confirmed' });
  });

  test('POST /api/orders returns 400 when confirmation fails', async () => {
    const app = createApp({
      orderService: {
        submitOrder: jest.fn().mockResolvedValue({ success: false })
      }
    });

    await request(app)
      .post('/api/orders')
      .send({ cart: { items: [] }, paymentInfo: { token: 'tok_synthetic' } })
      .expect(400)
      .expect({ error: 'Order could not be confirmed' });
  });

  test('POST /api/orders returns the generic error for limited stock orders', async () => {
    const app = createApp();

    await request(app)
      .post('/api/orders')
      .send({
        cart: {
          userId: 'demo-user',
          items: [{ productId: 'backorder-01', qty: 1, priceCents: 7990 }]
        },
        paymentInfo: {
          token: 'tok_synthetic',
          billingPostalCode: '10115'
        }
      })
      .expect(500)
      .expect({ error: 'Unexpected demo shop error' });
  });
});
