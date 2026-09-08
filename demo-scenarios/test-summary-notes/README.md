# Test Summary Writing

Fallback material for groups without their own raw testing notes to bring.
Browser-only — no repo checkout needed, just read the notes below.

## Raw Notes

These are the actual scribbled notes from a 15-minute manual test session on the
login flow. They need to become a clear comment on the ticket.

> Tested login flow for 15 min. Correct password - ok. Wrong password - error shown,
> but text is in English even though UI is in Estonian. 5x wrong password - account
> not locked, no rate limiting. Chrome + Firefox, same results.

## Exercise

1. Give the raw notes above to ChatGPT, Copilot Chat, and Claude — one tool per group
   member.
2. Ask each tool to turn the notes into a clear test-summary comment for the ticket.
3. Compare the three summaries: which one clearly separates the cosmetic bug
   (wrong-language error text) from the security finding (no rate limiting / no
   lockout after repeated failed attempts)?
4. Agree on one final summary as a group.

## Prompt Starter

```text
Turn these raw manual-testing notes into a clear summary comment for a bug ticket.
Separate cosmetic issues from anything security-relevant, and flag severity for each:

"Tested login flow for 15 min. Correct password - ok. Wrong password - error shown,
but text is in English even though UI is in Estonian. 5x wrong password - account not
locked, no rate limiting. Chrome + Firefox, same results."
```

## Trainer Note

The point of this scenario: a weak summary lists both findings as one flat list. A
good summary clearly separates the cosmetic bug (English error text on an Estonian
UI — low severity) from the security-relevant finding (no account lockout / no rate
limiting after repeated failed logins — this one should get escalated, not buried
next to a translation typo).
