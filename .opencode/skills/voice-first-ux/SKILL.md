---
name: Voice First UX
description: Interaction design for voice input and text-to-speech — mic states, permission priming, transcript confirmation, noisy/offline failures and typed-free fallbacks. Use for symptom capture and any conversational flow.
---

# Voice First UX

Voice is the primary input for symptom capture. The user may be in pain, may
not type comfortably, and may not read quickly. The rule: **voice is never the
only path, and typing is never required.**

## States

Implement all six. A missing state is a broken flow.

| State | Visual | Copy (mr) |
|---|---|---|
| `idle` | 96dp circle, mic icon, soft shadow | `बोलून सांगा` |
| `permission` | Card with one action | `आवाज ऐकण्याची परवानगी द्या` |
| `listening` | 96dp circle, 2 concentric pulsing rings, live timer | `बोला… ऐकत आहे` |
| `processing` | Circle with spinner, input locked | `समजून घेत आहे…` |
| `confirm` | Editable transcript in a large card | `हे बरोबर आहे का?` |
| `result` | Recommendation card + TTS replay | `तुमच्यासाठी सुचवले` |

## Mic button

- **96dp** diameter, centred, `primary` fill, white 40px icon.
- Glow ring on press: 8dp `primaryTint` halo, not a shadow.
- Listening: two rings scaling 1.0 → 1.25 at 1.4s, opacity 0.4 → 0. Never
  strobe. Respect reduced motion — replace rings with a static "ऐकत आहे" bar.
- Stop affordance: a clearly labelled 56dp `थांबा` button appears below the
  mic while listening. Do not rely on tapping the mic again.
- Haptic on start and on stop.

## Permission priming

Never fire the OS prompt cold. First show a card:

> **आवाज ऐकण्याची परवानगी द्या**
> तुम्ही बोलून सांगू शकता. आम्ही फक्त तुमचे लक्षण समजून घ्यायला ऐकतो.
> [ परवानगी द्या ]  [ नंतर ]

If denied permanently, show how to enable it in Settings **and** keep the typed
path fully available. Never block the flow on mic permission.

## Transcript confirmation

- Always show what was heard. Never act silently on raw audio.
- Large editable text area (20sp), with `पुन्हा बोला` and `बदला` buttons.
- Highlight low-confidence words in `warningTint` with a tap-to-replace sheet.
- Confirm button is the pinned 64dp dock action: `होय, पुढे जा`.

## Text-to-speech

- Every result card has a 56dp `ऐका` button that reads the recommendation.
- Use `expo-speech` with `language: 'mr-IN'`. If unavailable, fall back to
  `hi-IN`, then to on-screen text only, and hide the button rather than speak
  in the wrong language.
- One clear 56dp `थांबवा` control while speaking.
- Never autoplay audio on screen entry. Voice is opt-in per utterance.

## Failure handling

| Situation | Behaviour |
|---|---|
| Silence > 4s | `काही ऐकू आलं नाही. पुन्हा बोला किंवा लिहा.` |
| Noisy / low confidence | Show transcript, ask to confirm or retype |
| No internet | Offer 3–5 tappable symptom chips + "लिहा" fallback |
| Mic unavailable | Hide mic, show chips + text field. Do not show a dead button. |
| Long input | Accept, summarise back in 2 lines, confirm |

## Typed-free fallbacks (always present)

- **Body map**: tap a body region → symptom chips (`छाती`, `डोकं`, `पोट`, `पाय`).
- **Chips**: 5 max per row, 56dp tall, 20sp label, wrap to 2 rows.
- **Scroll list**: symptoms with a one-line plain-Marathi explanation.
- **Call instead**: `डॉक्टरांशी बोला` as a 64dp dock action at every step.

## Conversation rules

- One question at a time.
- Never repeat a question the user already answered.
- Always echo back understanding before moving on.
- Never say "कृपया वैध इनपुट द्या". Say what you need in plain words.

## Checklist

- [ ] All six states implemented
- [ ] Mic is 96dp with a labelled stop control
- [ ] Permission primed before the OS prompt
- [ ] Transcript always shown and editable
- [ ] TTS is opt-in with a stop control and a language fallback
- [ ] Chips + typed fallback exist offline
- [ ] No step requires typing
