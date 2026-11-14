---
name: Marathi & Devanagari UI
description: Marathi-first typography, font loading, text expansion, numerals, medical terminology and i18n structure for Devanagari script. Use on every screen and every string.
---

# Marathi & Devanagari UI

Marathi is the launch language for Pune and Maharashtra. English is a
secondary toggle, not the default. Every string is Marathi-first, externalised,
and tested at its longest.

## Fonts (Expo)

```ts
import { useFonts } from 'expo-font';
const [loaded] = useFonts({
  NotoSansDevanagari: require('../../assets/fonts/NotoSansDevanagari-Regular.ttf'),
  'NotoSansDevanagari-SemiBold': require('../../assets/fonts/NotoSansDevanagari-SemiBold.ttf'),
  'NotoSansDevanagari-Bold': require('../../assets/fonts/NotoSansDevanagari-Bold.ttf'),
});
```

- Body and UI: **Noto Sans Devanagari** (excellent Android coverage, clean at
  small sizes).
- Optional warmer alternative for headings: **Baloo 2** or **Mukta**.
  Never mix more than two families.
- Never ship without `expo-font` preloading — a flash of tofu boxes is a
  trust-killer for an elderly user.
- Fallback chain on Android: `system-ui` handles Devanagari, so the app must
  still render correctly if a font fails to load.

## Layout rules for Devanagari

- Line height **1.6–1.8×**. Matras above and below the baseline get clipped at
  tighter values — this is the most common Devanagari bug.
- **No `letterSpacing`.** Negative or positive tracking breaks conjuncts
  (ज्ञ, क्ष, त्र).
- **No `textTransform: 'uppercase'`.** Devanagari has no case.
- Add **2–4dp horizontal padding** inside any text container so the first and
  last glyphs are not shaved.
- Never fix a button or chip width to fit English. Allow **+30% expansion**.
  Use `flexShrink` and multiline, or `numberOfLines={2}` with centered text.
- Never render text inside an image. All copy is live text.
- Test every screen at `fontScale: 2.0` with Marathi strings — Devanagari grows
  taller than Latin at the same scale.

## Numerals, dates, money

Pick one convention and apply it everywhere:

- **Recommended:** Latin digits for phone numbers, prices, distances and times
  (`₹500`, `2.4 किमी`, `10:30`). Devanagari digits are harder to scan for many
  users and break dialler/link parsing.
- Marathi words around the number: `₹500 फी`, `2.4 किमी अंतर`.
- Dates: `14 नोव्हेंबर 2026`. Relative times preferred: `आज`, `उद्या`,
  `2 तासांत`.
- Durations: `10 मिनिटे`, `1 तास`.
- Weekdays: सोम, मंगळ, बुध, गुरु, शुक्र, शनि, रवि.

## Medical terminology

Users may not know English medical words, and may not know the Marathi ones
either. Always show both:

- `हृदय (Heart)` on first use, `हृदय` afterwards.
- Symptom chips use plain language first: `छातीत दुखतंय`, not `एन्जाइना`.
- Never show an abbreviation without expansion: `ECG (हृदयाचा तक्ता)`.
- When a term is explained, explain it in a sentence a 12-year-old would get:
  "हृदय म्हणजे शरीरात रक्त पंप करणारा अवयव."

## Voice and tone (Marathi)

- Short sentences. One idea each. 6–10 words.
- Respectful neutral form (आपण), not आपण/तू mixing.
- Avoid Sanskritised formal Marathi that reads like a government form.
- Buttons are verbs: `पुढे जा`, `डॉक्टरांना भेटा`, `कॉल करा`, `रद्द करा`.
- Reassure without overpromising: `आम्ही जवळचे डॉक्टर शोधत आहोत`, not
  `तुम्ही सुरक्षित आहात`.

## i18n structure

```ts
// locales/mr.ts
export const mr = {
  home: {
    sos: 'मदत हवी आहे',
    talkToDoctor: 'डॉक्टरांशी बोला',
    nearby: 'जवळचे डॉक्टर',
  },
} as const;
```

- No inline Marathi or English strings inside components. Everything through
  the translation object, even during prototyping.
- Keys in English, values in Marathi.
- Add an English file with identical keys from day one so the toggle is a
  swap, not a refactor.
- Language switcher lives in **Profile → भाषा**, not on every screen.
- Persist the choice with `expo-secure-store` or `AsyncStorage`.

## Checklist

- [ ] Fonts preloaded; no tofu flash
- [ ] Line height ≥ 1.6 everywhere
- [ ] No `letterSpacing`, no uppercase
- [ ] Every button survives a +30% longer string
- [ ] Medical terms paired with a plain-language explanation
- [ ] All strings externalised
- [ ] Renders at `fontScale: 2.0` without clipping
