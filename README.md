# Õnnepood

Small synthetic e-commerce app for AI-assisted software quality training. The app sells fake abstract products, uses fake users, and creates fake orders only.

## Local Setup

Most Session 2 exercises only need the GitHub web UI, so participants do not need to clone the repository unless they want to run the app or tests locally.

**Live app (verified):** [ai-training-demo-webapp-production.up.railway.app](https://ai-training-demo-webapp-production.up.railway.app/)
is a working deployment — no install, no clone, just open it in a browser. Use this
for any exercise that just needs the running shop (e.g. the ChatGPT bug-discovery
exercise). It does not give you a terminal, so it can't run the test suite — for
that you still need a local checkout (below).

No-IDE browser flow:

1. Open the repo in GitHub: `https://github.com/merikris/ai-training-demo-webapp`
2. Open the running demo app: `https://ai-training-demo-webapp-production.up.railway.app/`
3. Use the relevant folder under `demo-scenarios/` as the exercise starting point.
4. Use GitHub Copilot Chat in the GitHub web UI, ChatGPT, or Claude with the copied file/spec content.

**Zero-install, in-browser terminal (unverified — test before relying on it live):**
try opening `https://stackblitz.com/github/merikris/ai-training-demo-webapp` in a
browser. If it boots, you get a terminal without installing Node locally. This was
not confirmed working before the first delivery of Session 2 — verify it yourself
ahead of time, and fall back to the local setup below if it doesn't load.

Local setup is only needed for participants who want to run the app or tests themselves:

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
| `demo-scenarios/duplicate-bug-triage/` | 3-tool group exercise fallback, track A (no code needed) |
| `demo-scenarios/test-summary-notes/` | Optional bonus scenario — not part of the main 2-track exercise, kept for reuse |
| `demo-scenarios/session-3-fallback-pakk/` | Session 3 fallback material (Gemini Notebook / Atlassian AI / Projects exercises) — spec, test plan, bug report, API description, sample Jira tickets |

## Browser-Only Exercise Path

Use this path when participants do not have VS Code, local Node.js, or an IDE available.

### OrderService Bug Diagnosis

1. Open the hosted app: `https://ai-training-demo-webapp-production.up.railway.app/`
2. Add a few products to the cart and submit a normal order.
3. Try edge-case products until the app returns `Unexpected demo shop error`.
4. Open `demo-scenarios/order-service-bug/OrderService.js` in GitHub.
5. Ask Copilot Chat in GitHub, ChatGPT, or Claude to diagnose this symptom:

```text
The hosted demo shop returns "Unexpected demo shop error" when one product is submitted.
Review OrderService.js, especially submitOrder around line 153. What is the likely root cause,
what extra evidence would you look for, and how would you write a clear bug report?
```

### Flaky Checkout Test Diagnosis

1. Open `demo-scenarios/flaky-checkout-test/checkoutFlow.test.js` in GitHub.
2. Ask two assistants in parallel what could make this test fail intermittently.
3. Compare whether they notice the fixed wait and suggest a condition-based wait instead.

### API Test-Case Generation

1. Open `demo-scenarios/api-spec/orders-spec.md` in GitHub.
2. Copy the spec into Claude Project, ChatGPT, or Copilot Chat.
3. Ask for positive, negative, boundary, and missing-field test cases for `POST /api/orders`.

### Duplicate Bug Triage (3-tool group exercise, track A — no code needed)

1. Open `demo-scenarios/duplicate-bug-triage/README.md` in GitHub for the three raw
   bug reports.
2. One group member per tool (ChatGPT, Copilot Chat, Claude) — ask each whether the
   three reports describe the same bug and why.
3. Merge into one report with a single root-cause hypothesis.

### Flaky Test Diagnosis (3-tool group exercise, track C — needs code reading)

1. Open `demo-scenarios/flaky-checkout-test/checkoutFlow.test.js` in GitHub.
2. One group member per tool (ChatGPT, Copilot Chat, Claude) — ask each to diagnose
   why the test fails intermittently.
3. Compare: which answer would actually be usable without much editing?

*(Test Summary Writing, `demo-scenarios/test-summary-notes/`, was a third option here
but was dropped — it overlapped too much with track A in difficulty and didn't add a
distinct skill level. The file is kept in case it's useful elsewhere.)*

## Notes For Reuse

This repository is intentionally generic and not client-branded. Do not add real client data, production credentials, or private training material.

The file `.github/copilot-instructions.md` is intentionally not included because participants create it during one exercise.

## Reproducing The Order Bug (Trainer Note)

In the running app, submit an order for `Saan teleporteeruda igasse WC-sse, kus olen kunagi käinud`, or POST an order containing product id `backorder-01` to `/api/orders`.
