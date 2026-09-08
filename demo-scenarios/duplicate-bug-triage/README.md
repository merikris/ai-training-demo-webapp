# Duplicate Bug Triage

Fallback material for groups without a real ASA bug report to bring. Browser-only —
no repo checkout needed, just read the three reports below.

## The Three Reports

These came in separately, from three different testers, over the same week. Are they
the same bug?

1. "Profile picture upload fails when the file is larger than 2MB, no error message is
   shown."
2. "User's uploaded picture doesn't appear on the profile, even though the system
   showed OK."
3. "Profile picture disappeared after a page refresh, even though the upload seemed to
   work."

## Exercise

1. Give all three reports to ChatGPT, Copilot Chat, and Claude — one tool per group
   member.
2. Ask each tool: are these the same underlying bug? If so, what's the likely
   root cause?
3. Compare the three answers.
4. Write one merged bug report with a single root-cause hypothesis.

## Prompt Starter

```text
Here are three bug reports filed separately by different testers this week:
1. "Profile picture upload fails when the file is larger than 2MB, no error message is shown."
2. "User's uploaded picture doesn't appear on the profile, even though the system showed OK."
3. "Profile picture disappeared after a page refresh, even though the upload seemed to work."

Are these the same underlying bug? If so, propose a single root-cause hypothesis and
explain what evidence would confirm it.
```

## Trainer Note

Root-cause hypothesis worth steering toward if a group gets stuck: a premature
"success" state — the UI confirms the upload before the server has actually finished
validating and saving the file, so a slow or oversized upload can look successful in
the UI and then fail (silently, or after a refresh) once the server catches up. Don't
give this away up front — it's the "wow" moment when a group spots it themselves.
