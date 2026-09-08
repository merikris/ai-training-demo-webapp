# OrderService Bug Diagnosis

Browser-only version for participants without an IDE.

## Starting Points

- Repo: `https://github.com/merikris/ai-training-demo-webapp`
- Hosted app: `https://ai-training-demo-webapp-production.up.railway.app/`
- File to inspect: `OrderService.js`

## Exercise

1. Open the hosted app.
2. Add products to the cart and submit orders until one product returns `Unexpected demo shop error`.
3. Open `OrderService.js` in GitHub.
4. Use GitHub Copilot Chat in the browser, ChatGPT, or Claude to diagnose the symptom.
5. Write a short bug report with:
   - observed behavior
   - expected behavior
   - suspected file/function
   - likely cause
   - one useful regression test idea

## Prompt Starter

```text
The hosted demo shop returns "Unexpected demo shop error" when one product is submitted.
Review OrderService.js, especially submitOrder around line 153. What is the likely root cause,
what extra evidence would you look for, and how would you write a clear bug report?
```
