---
name: Elderly Accessibility
description: Mandatory accessibility rules for users aged 60+ — text size, touch targets, contrast, cognitive load, forms, errors and screen reader support. Use for every screen, component and interaction.
---

# Elderly Accessibility

The primary user is 65+, may have low vision, tremors, reduced dexterity, low
digital literacy, and may be in pain or frightened. Every rule here is a
requirement, not a preference. If a design conflicts with this file, this file
wins.

## Text and vision

- Body text **18sp**, never below 16sp. Captions 16sp.
- Line height **1.5–1.6×** the font size.
- Contrast: body text **7:1**, large text and icons **4.5:1** minimum.
- No long paragraphs. Maximum 2 lines per paragraph, 40 characters per line.
- No grey-on-grey. `textMuted` is for timestamps only.
- Never rely on font weight alone to convey meaning.
- Support system font scaling up to **200%** without clipping, truncation or
  overlapping. Test at `fontScale: 2.0`.
- Never disable font scaling with `allowFontScaling={false}`, except for the two
  glyphs inside the SOS countdown circle.

## Touch targets

- Minimum **56×56dp**, preferred **64dp** for primary actions.
- Minimum **12dp** of empty space between any two targets.
- The whole card is tappable — never a 20dp "View details" link inside it.
- No nested tappable areas inside a tappable card. If a card needs two actions,
  put them in a dedicated row of two 56dp buttons below the text.
- No gesture-only actions: no swipe to delete, no long-press to reveal, no
  drag to reorder.
- Every icon button carries a visible text label beneath or beside it.
- Press feedback on every target: scale 0.98 + `Pressable` opacity, and a light
  haptic on selection (`Haptics.selectionAsync()`), never on typing.

## Cognitive load

- **One primary action per screen.** Secondary actions are outline style and
  visually quieter.
- Maximum **5 items** in a visible list before "आणखी पहा" (see more).
- No more than **2 levels** of navigation depth from home to any task.
- No timed anything. No countdown to dismiss, no auto-advance carousel, no
  session expiry that loses work.
- Show progress explicitly: "पायरी 2 / 4" for multi-step flows.
- Never ask for information the app already has.
- Prefer recognition over recall: show the options, don't ask the user to
  remember a name or number.

## Forms

- One question per screen where possible.
- Label above the field, always visible. No placeholder-as-label.
- Input height **64dp**, font 20sp, border 2dp.
- `keyboardType` and `autoComplete` set correctly; large keyboard-friendly
  layouts.
- Optional fields marked "(ऐच्छिक)" in words, not an asterisk.
- Voice input offered on every free-text field.
- Validation is inline, non-blocking, and says what to do — never just "invalid".

## Errors and recovery

- Error text: what happened + what to do next, in one short sentence.
- Errors appear next to the field **and** are announced to screen readers
  (`AccessibilityInfo.announceForAccessibility`).
- Never clear a form on error. Never lose typed input.
- Destructive actions need an explicit confirm with the action named in the
  button ("हटवा" / "रद्द करा"), not "OK / Cancel".
- Every error state includes a visible way out: retry, go back, or call.

## Screen reader and focus

- Every `Pressable` has `accessibilityRole`, `accessibilityLabel` in Marathi,
  and `accessibilityHint` describing the result.
- Announce screen changes for multi-step flows.
- Logical reading order matches visual order.
- Decorative images: `accessibilityElementsHidden` / `importantForAccessibility="no"`.
- Do not trap focus; back always works.

## Motion and sensory

- Respect reduced motion. Replace movement with a 120ms fade.
- No flashing, no strobing, no rapid colour changes (seizure risk).
- No sound-only feedback. Every audio cue has a visual twin.
- Keep the screen calm during emergency flows — no red pulsing beyond one
  gentle 1.2s opacity cycle, and never on more than one element.

## Definition of done

- [ ] Readable at `fontScale: 2.0` with no clipping
- [ ] Every target ≥ 56dp with ≥ 12dp separation
- [ ] Every target has a Marathi accessibility label
- [ ] Contrast checked at 7:1 for body text
- [ ] One primary action visible
- [ ] Errors say what to do next
- [ ] Works fully with VoiceOver / TalkBack
- [ ] No gesture-only interaction
