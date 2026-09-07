const { createOrderService } = require('../src/services/OrderService');

describe('OrderService', () => {
  const cart = {
    userId: 'user-123',
    items: [
      { productId: 'keyboard-01', qty: 2, priceCents: 4990 },
      { productId: 'mouse-02', qty: 1, priceCents: 2990 }
    ]
  };

  const paymentInfo = {
    token: ' tok_synthetic ',
    billingPostalCode: ' 10115 '
  };

  test('isPositiveQuantity accepts only positive integer quantities', () => {
    const service = createOrderService();
    expect(service.isPositiveQuantity({ qty: 1 })).toBe(true);
    expect(service.isPositiveQuantity({ qty: 0 })).toBe(false);
  });

  test('isPricedItem accepts non-negative integer prices', () => {
    const service = createOrderService();
    expect(service.isPricedItem({ priceCents: 0 })).toBe(true);
    expect(service.isPricedItem({ priceCents: -1 })).toBe(false);
  });

  test('validateCart returns no errors for a complete cart', () => {
    const service = createOrderService();
    expect(service.validateCart(cart)).toEqual([]);
  });

  test('validateCart reports missing items', () => {
    const service = createOrderService();
    expect(service.validateCart({ userId: 'user-123', items: [] })).toEqual([
      'Cart requires at least one item'
    ]);
  });

  test('calculateCartTotal totals quantity-adjusted item prices', () => {
    const service = createOrderService();
    expect(service.calculateCartTotal(cart)).toBe(12970);
  });

  test('normalizePaymentInfo trims display-safe fields', () => {
    const service = createOrderService();
    expect(service.normalizePaymentInfo(paymentInfo)).toEqual({
      token: 'tok_synthetic',
      billingPostalCode: '10115'
    });
  });

  test('validatePaymentInfo returns no errors for a usable token and postal code', () => {
    const service = createOrderService();
    expect(service.validatePaymentInfo(paymentInfo)).toEqual([]);
  });

  test('validatePaymentInfo reports missing payment fields', () => {
    const service = createOrderService();
    expect(service.validatePaymentInfo({ token: '', billingPostalCode: '' })).toEqual([
      'Payment token is required',
      'Billing postal code is required'
    ]);
  });

  test('createOrderReference uses the user id and date', () => {
    const service = createOrderService();
    expect(service.createOrderReference('User-123', new Date('2026-09-07T08:00:00Z'))).toBe(
      'ord_20260907_user12'
    );
  });

  test('formatOrderSummary includes item count and total', () => {
    const service = createOrderService();
    expect(service.formatOrderSummary(cart)).toBe('3 items, 129.70 EUR');
  });

  test('assertOrderCanBeSubmitted throws when validation fails', () => {
    const service = createOrderService();
    expect(() => service.assertOrderCanBeSubmitted({ userId: '', items: [] }, paymentInfo)).toThrow(
      'Order is not ready to submit'
    );
  });

  test('buildOrderPayload keeps the expected order shape', () => {
    const service = createOrderService();
    expect(service.buildOrderPayload(cart, paymentInfo)).toEqual({
      reference: expect.stringMatching(/^ord_\d{8}_user12$/),
      cart: {
        userId: 'user-123',
        items: [
          { productId: 'keyboard-01', qty: 2, priceCents: 4990 },
          { productId: 'mouse-02', qty: 1, priceCents: 2990 }
        ],
        totalCents: 12970
      },
      paymentInfo: {
        token: 'tok_synthetic',
        billingPostalCode: '10115'
      },
      summary: '3 items, 129.70 EUR'
    });
  });

  test('submitOrder returns the confirmed order id', async () => {
    const api = {
      post: jest.fn().mockResolvedValue({
        data: { id: 'ord_123', status: 'confirmed' }
      })
    };
    const service = createOrderService(api);

    await expect(service.submitOrder(cart, paymentInfo)).resolves.toEqual({
      success: true,
      orderId: 'ord_123'
    });
  });

  test('submitOrder returns false when the order is declined', async () => {
    const api = {
      post: jest.fn().mockResolvedValue({
        data: { id: 'ord_124', status: 'declined' }
      })
    };
    const service = createOrderService(api);

    await expect(service.submitOrder(cart, paymentInfo)).resolves.toEqual({
      success: false
    });
  });

  test('submitOrder uses the default demo API for normal orders', async () => {
    const service = createOrderService();
    const result = await service.submitOrder(cart, paymentInfo);
    expect(result).toEqual({
      success: true,
      orderId: expect.stringMatching(/^ord_\d{8}_user12$/)
    });
  });

  test('getOrderStatus returns the current status', async () => {
    const api = {
      get: jest.fn().mockResolvedValue({
        data: { id: 'ord_123', status: 'confirmed' }
      })
    };
    const service = createOrderService(api);

    await expect(service.getOrderStatus('ord_123')).resolves.toBe('confirmed');
  });

  test('getOrderStatus uses the default demo API', async () => {
    const service = createOrderService();
    await expect(service.getOrderStatus('ord_123')).resolves.toBe('confirmed');
  });
});
