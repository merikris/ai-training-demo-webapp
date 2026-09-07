const express = require('express');
const path = require('path');
const { createOrderService } = require('./services/OrderService');
const { createProductRepository } = require('./db/ProductRepository');

function createApp(options = {}) {
  const app = express();
  const productRepository = options.productRepository || createProductRepository();
  const orderService = options.orderService || createOrderService();

  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/api/products', async (req, res, next) => {
    try {
      const products = await productRepository.listProductCatalog();
      res.json({ products });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/products/:id', async (req, res, next) => {
    try {
      const product = await productRepository.findProductById(req.params.id);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json({ product });
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/orders', async (req, res, next) => {
    try {
      const result = await orderService.submitOrder(req.body.cart, req.body.paymentInfo);
      if (!result.success) {
        res.status(400).json({ error: 'Order could not be confirmed' });
        return;
      }
      res.json({ orderId: result.orderId, status: 'confirmed' });
    } catch (error) {
      next(error);
    }
  });

  app.use((error, req, res, next) => {
    if (res.headersSent) {
      next(error);
      return;
    }
    res.status(500).json({ error: 'Unexpected demo shop error' });
  });

  return app;
}

module.exports = { createApp };
