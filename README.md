# AI Training Demo Webapp

Small synthetic e-commerce app for AI-assisted software quality training. The app uses fake products, fake users, and fake orders only.

## Local Setup

Most Session 2 exercises only need the GitHub web UI, so participants do not need to clone the repository unless they want to run the app or tests locally.

```bash
npm install
npm start
```

Open `http://localhost:3000`.

Run the full test suite:

```bash
npm test
```

Run only the stable tests:

```bash
npm run test:stable
```

## Demo Scenarios

| Folder | Session 2 use |
| --- | --- |
| `demo-scenarios/order-service-bug/` | ChatGPT diagnosis and bug-report exercise |
| `demo-scenarios/flaky-checkout-test/` | Parallel assistant debugging exercise |
| `demo-scenarios/api-spec/` | Claude Project test-case generation exercise (option B) |
| `demo-scenarios/claude-project-testplan/` | Claude Project exercise fallback document (option A) |

## Notes For Reuse

This repository is intentionally generic and not client-branded. Do not add real client data, production credentials, or private training material.

The file `.github/copilot-instructions.md` is intentionally not included because participants create it during one exercise.

## Reproducing The Order Bug (Trainer Note)

In the running app, submit an order for `Limited Stock Headphones`, or POST an order containing product id `backorder-01` to `/api/orders`.
