# Õnnepood

Small synthetic e-commerce app for AI-assisted software quality training. The app sells fake abstract products, uses fake users, and creates fake orders only.

## Local Setup

Most Session 2 exercises only need the GitHub web UI, so participants do not need to clone the repository unless they want to run the app or tests locally.

**Live app (verified):** [ai-training-demo-webapp-production.up.railway.app](https://ai-training-demo-webapp-production.up.railway.app/)
is a working deployment — no install, no clone, just open it in a browser. Use this
for any exercise that just needs the running shop (e.g. the ChatGPT bug-discovery
exercise). It does not give you a terminal, so it can't run the test suite — for
that you still need a local checkout (below).

**Zero-install, in-browser terminal (unverified — test before relying on it live):**
try opening `https://stackblitz.com/github/merikris/ai-training-demo-webapp` in a
browser. If it boots, you get a terminal without installing Node locally. This was
not confirmed working before the first delivery of Session 2 — verify it yourself
ahead of time, and fall back to the local setup below if it doesn't load.

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

In the running app, submit an order for `Saan teleporteeruda igasse WC-sse, kus olen kunagi käinud`, or POST an order containing product id `backorder-01` to `/api/orders`.
