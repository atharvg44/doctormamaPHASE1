---
name: Symptom Triage UI
description: Symptom capture and specialist routing screens — body map, symptom chips, severity, plain-language term explanations and result cards. Use for the "describe your problem" flow.
---

# Symptom Triage UI

The app routes, it does not diagnose. The UI must always make that boundary
obvious, and must never leave the user more anxious than when they arrived.

## Flow

```
Home → "तुम्हाला काय त्रास होतोय?" 
     → body region (tap)
     → symptom chips (tap or voice)
     → severity + duration (2 large sliders/segments)
     → result: likely specialty + 3 doctors nearby
     → book / call / talk to doctor
```

Maximum 4 steps. Progress shown as `पायरी 2 / 4` with 4 filled segments.

## Step 1 — Body region

- Full-width **body map** illustration, 60% of screen height, front view only.
- Tappable regions ≥ 96×96dp, each with a Marathi label underneath:
  `डोकं`, `छाती`, `पोट`, `पाठ`, `हात`, `पाय`.
- Selected region: `primary` 2dp outline + `primaryTint` fill + a check badge.
- A 64dp `कळत नाही` (not sure) option always visible below the map — it leads
  straight to the symptom list.

## Step 2 — Symptoms

- Chips: min 56dp tall, 20sp, wrap to 2 rows, 12dp gaps.
- 5 max before "आणखी पहा".
- Every chip has a one-line plain-Marathi gloss when tapped:
  `छातीत दुखतंय — छातीत जडपणा किंवा दाब जाणवणे`
- Voice button sits above the chips: `बोलून सांगा`.
- Free-text field is always available, never required.

## Step 3 — Severity and duration

- Severity: 3 large segmented buttons, not a slider — `सौम्य`, `मध्यम`, `तीव्र`,
  each 64dp, full width, stacked on narrow screens.
- Duration: segmented control `आज`, `2–3 दिवस`, `आठवडा`, `जास्त`.
- No numeric pain scales (0–10). Elderly users interpret them inconsistently.

## Step 4 — Result card

Layout, top to bottom:

1. Reassurance line, never a diagnosis: `या लक्षणांसाठी हृदयरोग तज्ज्ञ भेटणे योग्य राहील.`
2. Specialty chip: `हृदयरोग तज्ज्ञ (Cardiologist)`
3. Three doctor cards, 120dp minimum, with `सर्वात जवळचे आधी` stated
4. Two dock actions: `डॉक्टरांशी बोला` (primary) and `कॉल करा` (outline)
5. TTS `ऐका` button on the card header.

## Disclaimer (mandatory, non-dismissible)

A calm `surfaceSunken` card at the bottom of the result:

> **ही वैद्यकीय सल्ला नाही.**
> हे फक्त योग्य तज्ज्ञ शोधण्यासाठी आहे. त्रास जास्त असल्यास 108 वर कॉल करा.

Never phrase it as a legal wall of text. Never hide it in a footnote.

## Never do

- Never say "तुम्हाला X आहे" / "you have X".
- Never show a probability percentage to the user.
- Never rank by anything other than distance and availability.
- Never require symptoms before showing SOS or a call option.
- Never ask for a phone number to show results.

## Checklist

- [ ] Max 4 steps, progress visible
- [ ] Body regions ≥ 96dp with Marathi labels
- [ ] "कळत नाही" escape hatch on every step
- [ ] Chips + voice + typed all available
- [ ] Result names a specialty, never a disease
- [ ] Disclaimer always visible on results
- [ ] SOS and call reachable throughout
