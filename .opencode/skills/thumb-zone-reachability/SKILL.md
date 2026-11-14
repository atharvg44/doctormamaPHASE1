---
name: Thumb Zone & Big Card Layout
description: Layout rules for one-handed use by elderly users — bottom action docks, thumb-reach zones, oversized cards, full-width targets and safe areas. Use for every screen layout and list.
---

# Thumb Zone & Big Card Layout

Users hold the phone one-handed, often while sitting, lying down, or in distress.
Everything frequent or urgent lives in the **bottom third** of the screen. The
top is for reading. This is the single most important layout rule in the app.

## Screen anatomy

Every screen has three bands:

```
┌──────────────────────────────┐
│  HEADER — read only          │  optional back, title. No primary action.
├──────────────────────────────┤
│                              │
│  CONTENT — scrolls           │  cards, lists, forms
│                              │
├──────────────────────────────┤
│  ACTION DOCK — pinned        │  primary CTA + SOS, always here
│  [   मदत हवी आहे   ] [SOS]   │
└──────────────────────────────┘
```

- **Header**: max 2 items (back + title). Never put "Save", "Next" or "Call" in
  the top-right corner — it is the hardest place to reach.
- **Content**: the only scrolling region.
- **Action dock**: pinned above the home indicator, respects
  `SafeAreaInsets.bottom`. Primary button **full width, 64dp tall**, 20dp side
  margins, 12dp above the safe area.

## Reachability numbers (React Native)

- Primary CTA bottom edge sits **24–40dp above the safe-area bottom**.
- Never place a primary action higher than **60% of screen height**.
- Highest comfortable tap centre: `screenHeight × 0.85` from the top for a
  6.1" phone held in the right hand — assume the user cannot reach above
  `screenHeight × 0.55` without regripping.
- Left/right 20dp gutters only. Never place targets within 16dp of the left or
  right edge — edge taps are awkward and error-prone with tremor.
- Bottom navigation: 4 tabs max, **72dp + safe area** tall, icon 28px, label
  16sp, active state = `primary` colour + filled icon + 3dp top indicator.

## Oversized cards

- Full width minus 20dp gutters. Never a grid of small tiles.
- Minimum height **104dp**; recommended **120–136dp** for any card that is a
  primary choice (doctor, symptom, hospital).
- Inner padding **20dp**. Gap between cards **12dp**.
- Card content order: leading icon or avatar (56–72dp) → title (`h3`, 20sp/600)
  → 1–2 lines of supporting text (`body`, 18sp) → optional status pill.
- One clear affordance: a 32px chevron on the trailing edge, vertically centred.
- The **entire card** is the press target. No internal links.
- If a card needs two actions, put them below the text as two 56dp buttons side
  by side (or stacked on narrow screens), each ≥ 45% width.
- Selected state: 2dp `primary` border + `primaryTint` background. Not a shadow.

## Lists

- Vertical only. **No horizontal scrolling for essential content.**
- No carousels for anything the user must decide on. A carousel hides options.
- Show max 5 items, then an explicit 64dp "आणखी पहा" button.
- Each row ≥ 88dp tall with 12dp separation.
- Sorting default: nearest and soonest available. Show the sort rule in words.

## Bottom sheets over modals

- Prefer a bottom sheet (top radius 24, drag handle, 64dp header row) over a
  centred modal — it is reachable and dismissible with a big button.
- Sheet close button: 56dp labelled "बंद करा", not a bare ✕.
- Max sheet height 85% of screen; always leave the handle visible.

## Gestures

- Swipe-to-dismiss on sheets is a bonus, never the only way to close.
- No pull-to-refresh as the only refresh path — add a visible "पुन्हा प्रयत्न"
  button in the error state.
- No swipe between tabs. Tabs are tapped.

## Safe areas

- `useSafeAreaInsets()` in every screen.
- Minimum bottom padding: `insets.bottom + 12`.
- Action docks use `paddingBottom: insets.bottom + 16`.
- Never render under the notch or home indicator.

## Checklist

- [ ] Primary action lives in the bottom action dock
- [ ] Primary button is 64dp tall and full width
- [ ] No actionable item in the top-right corner
- [ ] Cards are full-width, ≥ 104dp tall, whole-card tappable
- [ ] No horizontal scroll, no carousel for decisions
- [ ] Bottom padding respects the safe area
- [ ] Max 4 bottom tabs with icon + label
