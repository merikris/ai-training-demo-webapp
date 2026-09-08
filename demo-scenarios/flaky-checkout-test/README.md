# Flaky Checkout Test Diagnosis

Browser-only version for participants without an IDE.

## Starting Points

- Repo: `https://github.com/merikris/ai-training-demo-webapp`
- File to inspect: `checkoutFlow.test.js`

## Exercise

1. Open `checkoutFlow.test.js` in GitHub.
2. Ask ChatGPT, Copilot Chat, and/or Claude what could make the test fail intermittently.
3. Compare the answers and decide which one gives the clearest debugging plan.
4. Write a short diagnosis with:
   - likely cause
   - why the failure is intermittent
   - what evidence would confirm it
   - what kind of fix would make the test stable

## Prompt Starter

```text
This checkout_flow test fails intermittently, roughly one run out of five, with no useful
error beyond a failed assertion. Review the test and explain the likely cause. Suggest a
debugging approach and a more reliable testing pattern.
```
