---
name: Emergency SOS UX
description: Panic-safe one-tap emergency flow — persistent SOS entry, accidental-trigger protection, location, nearest hospital list and offline fallback. Use for the SOS screen and anything reachable during an emergency.
---

# Emergency SOS UX

This is the screen that justifies the product. It must work with one thumb, in
under five seconds, by a frightened user, possibly on a bad connection.

## Hard rules

- **No login, no onboarding, no permission wall** on the emergency path. If
  the user is signed out, SOS still opens.
- SOS is reachable from **every screen** via the persistent action dock.
- No ads, no upsells, no "rate the app", no multi-step forms.
- Every screen in this flow has exactly one obvious next action.
- Never show a dead end. If something fails, offer a phone call.

## Entry point

Persistent in the bottom action dock on Home and Consult:

```
┌──────────────────────────────────┐
│  [  डॉक्टरांशी बोला  ]  [ SOS ]  │
└──────────────────────────────────┘
```

- SOS occupies **40%** of the dock width, minimum 64dp tall, `emergency` fill,
  white 20sp `SOS` label **plus** the Marathi label `मदत` underneath or beside.
- It is never the only control on a screen it might be tapped by accident on.
- Global SOS is always the right-most bottom element.

## Trigger protection

Two acceptable patterns. Pick one and stay consistent:

**A. Hold (recommended for the big card)**
- Press and hold the SOS card for **1.5s**.
- A ring fills clockwise; haptics tick at 0.5s and 1.0s.
- Release early cancels with `रद्द झाले`.

**B. Tap + cancellable countdown**
- Single tap starts a **5s** countdown: huge 64sp numerals, `रद्द करा` as a
  56dp outline button beneath.
- Cancel is available for the entire countdown.
- Never a confirm dialog with Yes/No — too slow and easy to misread.

Do **not** use a bare single tap with no undo, and do **not** require typing
anything to confirm.

## After trigger

Sequence, each step a big card, auto-advance with an explicit visible state:

1. `तुमचं स्थान शोधत आहोत…` — spinner, max 6s.
2. Nearest hospitals list (see below).
3. Simultaneously show `108 वर कॉल करा` as a 64dp emergency button — always
   present, regardless of network or partner availability.

## Nearest hospital list

Each card ≥ 120dp:

- Hospital name (`h3`)
- `2.4 किमी • अंदाजे 8 मिनिटे`
- Two 56dp actions: `कॉल करा` (primary) and `दिशा` (outline, opens Maps)
- Emergency-capable indicator when known: `24×7 आपत्कालीन`

Order by distance. Show the sort rule: `सर्वात जवळचे आधी`.
Loading: 3 skeleton cards, never a blank screen.
Empty: `जवळ कोणतेही रुग्णालय सापडले नाही` + `108 वर कॉल करा` + retry.

## Location permission

- Prime in plain Marathi before the OS prompt:
  > **तुमचं स्थान का हवं?**
  > जवळचं रुग्णालय शोधण्यासाठी. आम्ही स्थान साठवत नाही.
- If denied: ask for a PIN code or area name as a 6-digit input, and still
  offer 108. Never block.

## Offline and degraded mode

| Condition | Behaviour |
|---|---|
| No network | Show saved emergency contacts + `108 वर कॉल करा` + last known location text |
| GPS off | Use the last known location, label it `जुनी माहिती` |
| API down | Skip straight to 108 and saved contacts |
| Slow (> 3s) | Show "जोडत आहोत…" with the call button already visible |

Cache the last three hospitals and the user's emergency contact locally so the
list is never empty.

## Visual treatment

- The SOS card is the only place `emergency` red is allowed as a surface.
- White text on `emergency` at 20sp/700. Contrast verified.
- One gentle breathing opacity cycle (1.2s, 0.92 → 1.0) on the SOS button only,
  disabled under reduced motion.
- Everything else stays calm and neutral. No sirens, no flashing, no alarms.

## Checklist

- [ ] Reachable in one tap from every screen
- [ ] Hold or cancellable countdown, with visible cancel
- [ ] 108 call button always visible
- [ ] Location primed in plain Marathi, with a PIN-code fallback
- [ ] Works with no network using cached data
- [ ] No login wall, no dead ends, no upsells
- [ ] Sorted by distance with the rule stated in words
