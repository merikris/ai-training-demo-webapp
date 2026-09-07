const defaultApi = {
  async post(path, body) {
    return {
      data: {
        id: body.reference,
        status: 'confirmed',
        submittedAt: new Date().toISOString(),
        path,
        itemCount: body.cart.items.length
      }
    };
  },

  async get(path) {
    return {
      data: {
        id: path.split('/').pop(),
        status: 'confirmed'
      }
    };
  }
};

function createOrderService(api = defaultApi) {
  function isPositiveQuantity(item) {
    return Number.isInteger(item.qty) && item.qty > 0;
  }

  function isPricedItem(item) {
    return Number.isInteger(item.priceCents) && item.priceCents >= 0;
  }

  function validateCart(cart) {
    const errors = [];

    if (!cart || typeof cart.userId !== 'string' || cart.userId.trim() === '') {
      errors.push('Cart requires a userId');
    }

    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
      errors.push('Cart requires at least one item');
      return errors;
    }

    cart.items.forEach((item, index) => {
      if (!item.productId) {
        errors.push(`Item ${index + 1} requires a productId`);
      }

      if (!isPositiveQuantity(item)) {
        errors.push(`Item ${index + 1} requires a positive quantity`);
      }

      if (!isPricedItem(item)) {
        errors.push(`Item ${index + 1} requires a valid price`);
      }
    });

    return errors;
  }

  function calculateCartTotal(cart) {
    return cart.items.reduce((sum, item) => sum + item.priceCents * item.qty, 0);
  }

  function normalizePaymentInfo(paymentInfo) {
    return {
      token: paymentInfo.token.trim(),
      billingPostalCode: paymentInfo.billingPostalCode.trim()
    };
  }

  function validatePaymentInfo(paymentInfo) {
    const errors = [];

    if (!paymentInfo || typeof paymentInfo.token !== 'string' || paymentInfo.token.trim() === '') {
      errors.push('Payment token is required');
    }

    if (
      !paymentInfo ||
      typeof paymentInfo.billingPostalCode !== 'string' ||
      paymentInfo.billingPostalCode.trim() === ''
    ) {
      errors.push('Billing postal code is required');
    }

    return errors;
  }

  function createOrderReference(userId, now = new Date()) {
    const compactDate = now.toISOString().slice(0, 10).replaceAll('-', '');
    const suffix = userId.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 6);
    return `ord_${compactDate}_${suffix}`;
  }

  function formatOrderSummary(cart) {
    const itemCount = cart.items.reduce((sum, item) => sum + item.qty, 0);
    const totalEuros = (calculateCartTotal(cart) / 100).toFixed(2);
    return `${itemCount} items, ${totalEuros} EUR`;
  }

  function assertOrderCanBeSubmitted(cart, paymentInfo) {
    const errors = [
      ...validateCart(cart),
      ...validatePaymentInfo(paymentInfo)
    ];

    if (errors.length > 0) {
      const error = new Error('Order is not ready to submit');
      error.details = errors;
      throw error;
    }
  }

  function buildOrderPayload(cart, paymentInfo) {
    assertOrderCanBeSubmitted(cart, paymentInfo);
    const normalizedPaymentInfo = normalizePaymentInfo(paymentInfo);

    return {
      reference: createOrderReference(cart.userId),
      cart: {
        userId: cart.userId.trim(),
        items: cart.items.map((item) => ({
          productId: item.productId,
          qty: item.qty,
          priceCents: item.priceCents
        })),
        totalCents: calculateCartTotal(cart)
      },
      paymentInfo: {
        token: normalizedPaymentInfo.token,
        billingPostalCode: normalizedPaymentInfo.billingPostalCode
      },
      summary: formatOrderSummary(cart)
    };
  }

  async function submitOrder(cart, paymentInfo) {
    const payload = buildOrderPayload(cart, paymentInfo);
    const response = await api.post('/orders', payload);
    const order = response.data;

    if (order.status === 'confirmed') {
      return { success: true, orderId: order.id };
    }

    return { success: false };
  }

  async function getOrderStatus(orderId) {
    const response = await api.get(`/orders/${orderId}`);
    return response.data.status;
  }

  return {
    isPositiveQuantity,
    isPricedItem,
    validateCart,
    calculateCartTotal,
    normalizePaymentInfo,
    validatePaymentInfo,
    createOrderReference,
    formatOrderSummary,
    assertOrderCanBeSubmitted,
    buildOrderPayload,
    submitOrder,
    getOrderStatus
  };
}

module.exports = { createOrderService };
