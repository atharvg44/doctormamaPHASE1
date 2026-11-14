---
name: UI Quality Gates
description: The definition of done and pre-delivery checklist for every screen. Run this before reporting any UI work as complete.
---

# UI Quality Gates

No screen is "done" because it renders. It is done when every gate below
passes. Run this list explicitly and report the result as a checklist.

## 1. Reachability

- [ ] Primary action is in the bottom action dock
- [ ] Primary button ≥ 64dp tall, full width minus 20dp gutters
- [ ] Nothing critical in the top-right corner
- [ ] Bottom padding = `insets.bottom + 12` minimum
- [ ] Max 4 bottom tabs, icon + visible label

## 2. Touch and size

- [ ] Every target ≥ 56×56dp
- [ ] ≥ 12dp between adjacent targets
- [ ] Whole cards are the target, no nested links
- [ ] No gesture-only action
- [ ] Press feedback on every target

## 3. Readability

- [ ] Body 18sp, line height ≥ 1.5
- [ ] Body contrast ≥ 7:1
- [ ] Renders at `fontScale: 2.0` without clipping
- [ ] Devanagari line height ≥ 1.6, no `letterSpacing`, no uppercase
- [ ] No text baked into images

## 4. States

Every list, form and async surface must have all five:

- [ ] Default
- [ ] Loading (skeletons at real height, not a spinner on white)
- [ ] Empty (sentence + one action)
- [ ] Error (what happened + retry)
- [ ] Offline (cached data + visible banner)

Every button:

- [ ] Default / pressed / disabled / loading

## 5. Language

- [ ] Marathi is the default copy
- [ ] All strings externalised into the locale files
- [ ] Medical terms paired with a plain-language gloss
- [ ] Buttons labelled with verbs
- [ ] Numbers, dates, distances formatted consistently
- [ ] Every string tested at +30% length

## 6. Accessibility

- [ ] Every `Pressable` has `accessibilityRole` + Marathi `accessibilityLabel`
- [ ] Decorative images hidden from the screen reader
- [ ] Focus order matches visual order
- [ ] Reduced motion honoured
- [ ] No colour-only meaning
- [ ] Announcements for step changes and errors

## 7. Consistency

- [ ] All colours from `theme.color`
- [ ] All type from the type scale
- [ ] All spacing on the 4pt scale
- [ ] One shadow level
- [ ] Red used only in the emergency flow
- [ ] Same component used for the same job everywhere

## 8. Safety and tone

- [ ] No diagnosis language
- [ ] Disclaimer present on any recommendation screen
- [ ] SOS reachable from this screen (unless it is the SOS flow itself)
- [ ] No dead end: every error has a way out
- [ ] No dark patterns, no forced sign-up, no hidden costs

## Report format

When finishing screens, output exactly this:

```
Screen: <name>
Gates passed: 8/8
Deviations: <none | list with reason>
Files: <paths>
```

Do not claim completion without a filled report.
