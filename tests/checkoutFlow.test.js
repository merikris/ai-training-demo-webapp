const { createCheckoutSimulator, sleep } = require('../src/services/CheckoutSimulator');

test('checkout_flow completes successfully', async () => {
  const product = { id: 'keyboard-01', name: 'Compact Keyboard', priceCents: 4990 };
  const page = createCheckoutSimulator();

  await page.addToCart(product);
  await page.goToCheckout();
  await page.clickConfirmOrder();
  await sleep(300);
  const confirmation = await page.textContent('.order-confirmation');
  expect(confirmation).toContain('Tellimus kinnitatud');
});
