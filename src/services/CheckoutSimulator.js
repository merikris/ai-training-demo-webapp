function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function createCheckoutSimulator(options = {}) {
  const confirmationText = options.confirmationText || 'Tellimus kinnitatud';
  const baseRenderDelayMs = options.baseRenderDelayMs || 180;
  const jitterMs = options.jitterMs || 150;
  const state = {
    cart: [],
    route: '/',
    confirmation: ''
  };

  async function addToCart(product) {
    state.cart.push(product);
  }

  async function goToCheckout() {
    state.route = '/checkout';
  }

  async function clickConfirmOrder() {
    const renderDelay = baseRenderDelayMs + Math.floor(Math.random() * jitterMs);
    sleep(renderDelay).then(() => {
      state.confirmation = confirmationText;
    });
  }

  async function textContent(selector) {
    if (selector === '.order-confirmation') {
      return state.confirmation;
    }
    return '';
  }

  return {
    addToCart,
    goToCheckout,
    clickConfirmOrder,
    textContent
  };
}

module.exports = { createCheckoutSimulator, sleep };
