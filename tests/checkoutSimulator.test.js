const { createCheckoutSimulator, sleep } = require('../src/services/CheckoutSimulator');

describe('CheckoutSimulator', () => {
  test('sleep resolves after the requested delay', async () => {
    jest.useFakeTimers();
    const promise = sleep(50);
    jest.advanceTimersByTime(50);
    await expect(promise).resolves.toBeUndefined();
    jest.useRealTimers();
  });

  test('addToCart, goToCheckout, and clickConfirmOrder render confirmation', async () => {
    const page = createCheckoutSimulator({ baseRenderDelayMs: 1, jitterMs: 1 });

    await page.addToCart({ id: 'keyboard-01', name: 'Compact Keyboard' });
    await page.goToCheckout();
    await page.clickConfirmOrder();
    await sleep(5);

    await expect(page.textContent('.order-confirmation')).resolves.toContain('Tellimus kinnitatud');
  });

  test('textContent returns an empty string for unknown selectors', async () => {
    const page = createCheckoutSimulator();
    await expect(page.textContent('.unknown')).resolves.toBe('');
  });
});
