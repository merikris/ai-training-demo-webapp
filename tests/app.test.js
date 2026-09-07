const request = require('supertest');
const { createApp } = require('../src/app');

describe('createApp', () => {
  test('GET /api/products returns the catalog', async () => {
    const app = createApp({
      productRepository: {
        listProductCatalog: jest.fn().mockResolvedValue([
          { id: 'keyboard-01', name: 'Compact Keyboard', priceCents: 4990 }
        ])
      }
    });

    await request(app)
      .get('/api/products')
      .expect(200)
      .expect({
        products: [{ id: 'keyboard-01', name: 'Compact Keyboard', priceCents: 4990 }]
      });
  });

  test('GET /api/products/:id returns one product', async () => {
    const app = createApp({
      productRepository: {
        findProductById: jest.fn().mockResolvedValue({
          id: 'mouse-02',
          name: 'Wireless Mouse',
          priceCents: 2990
        })
      }
    });

    await request(app)
      .get('/api/products/mouse-02')
      .expect(200)
      .expect({
        product: { id: 'mouse-02', name: 'Wireless Mouse', priceCents: 2990 }
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
