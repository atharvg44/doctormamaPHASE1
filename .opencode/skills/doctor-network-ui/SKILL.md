---
name: Doctor Network UI
description: Doctor cards, search and filters, availability, trust signals, and the doctor-to-doctor referral screens. Use for the doctor directory, booking, and referral flows.
---

# Doctor Network UI

Two audiences share the same visual system: patients choosing a doctor, and
doctors referring to another doctor. Patients need trust and simplicity.
Doctors need density and speed. Never mix them in one screen — use separate
modes with a clear mode label.

## Doctor card (patient)

Full width, minimum **120dp**, 20dp padding, whole card tappable.

```
┌─────────────────────────────────────────┐
│ [photo 72]  डॉ. सुनील पाटील        ✓    │
│             हृदयरोग तज्ज्ञ               │
│             MBBS, MD (Cardiology)        │
│             2.4 किमी • आज 4:30 उपलब्ध   │
│             मराठी, हिंदी, इंग्रजी        │
│             ₹500 फी           [ > ]      │
└─────────────────────────────────────────┘
```

- Photo 72dp round, `surfaceSunken` placeholder with initials if missing.
- Verified badge: 24px `success` check + `accessibilityLabel="सत्यापित डॉक्टर"`.
  Never a bare icon — keep the label in the card text too.
- Availability is the highest-value line: `आज 4:30 उपलब्ध` or `उद्या`.
  If unavailable: `आज उपलब्ध नाही` + still allow `कॉल करा`.
- Languages spoken are always shown — Marathi first when available.
- Fee with `₹`. If variable: `₹300 पासून`.

## Filters

- One 64dp filter bar pinned above the list, not a modal maze.
- 3 filters max: `अंतर`, `आज उपलब्ध`, `भाषा`.
- Filter chips 56dp, `primaryTint` when active, with a 24px check.
- Active filter summary in words under the bar: `3 किमी आत • आज उपलब्ध • मराठी`
- A visible `साफ करा` reset, 56dp.
- Default sort: nearest available. State it: `सर्वात जवळचे आधी`.

## Doctor detail

- Header: photo 96dp, name `h1`, specialty `h3`, qualifications `body`.
- Availability as a **vertical list of 64dp slot buttons**, not a calendar
  grid. Max 6 slots then "आणखी वेळा".
- Fixed 64dp dock: `अपॉइंटमेंट बुक करा` + secondary `कॉल करा`.
- Trust block: hospital affiliation, years of experience, registration number
  in small text. No star ratings if there are fewer than 20 reviews.

## Referral flow (doctor → doctor)

Separate mode, entered from Profile → `डॉक्टर मोड`. Add a persistent
`डॉक्टर` pill in the header so the mode is never ambiguous.

```
रुग्ण निवडा → तज्ज्ञ शोधा → नोंदी जोडा → पाठवा → स्थिती
```

1. **Select patient** — 88dp rows, search on top, no typing required if the
   list is short.
2. **Find specialist** — same card system but denser: 96dp rows, no photos,
   specialty + distance + next slot inline.
3. **Attach notes** — optional 20sp multiline field + up to 3 attachments
   (56dp each). Voice dictation for notes.
4. **Send** — review card with `पाठवा` as the 64dp dock action.
5. **Status timeline** — vertical, 5 states: `पाठवले`, `पाहिले`, `स्वीकारले`,
   `वेळ ठरली`, `पूर्ण`. Each 64dp row with a coloured dot + timestamp.

## States (required for every list)

| State | Design |
|---|---|
| Loading | 3 skeleton cards at the real card height |
| Empty | Illustration + one sentence + one action (`अंतर वाढवा`) |
| Error | `डॉक्टरांची माहिती मिळाली नाही` + 64dp `पुन्हा प्रयत्न` |
| Offline | Cached list with a `जुनी माहिती` banner + call buttons still active |
| Too many | Show 5, then `आणखी पहा` |

## Trust rules

- Never show a doctor without a qualification line.
- Never show a fee without a currency and a "from" qualifier if variable.
- Never claim "best" or "top". Use distance and availability only.
- Registration number visible on the detail screen. It is the main trust signal
  for a new, unbranded network.

## Checklist

- [ ] Card ≥ 120dp, whole card tappable, one chevron
- [ ] Availability, distance, languages and fee all visible on the card
- [ ] Max 3 filters with a text summary of what is active
- [ ] All five list states designed
- [ ] Referral flow has a clear mode label and a 5-step timeline
- [ ] No unverifiable superlatives
