---
name: Doctor Mama
description: An elderly-first, Marathi-first care app for Pune, printed like the household almanac and the family medical book.
colors:
  paper: "#F1E7D3"
  paper-deep: "#E8DBC0"
  paper-raised: "#F8F2E5"
  ink: "#1A1409"
  ink-soft: "#3A3223"
  rule: "rgba(26, 20, 9, 0.42)"
  almanac-red: "#A3231A"
  almanac-red-ink: "#8E2411"
  red-tint: "#EFD8CC"
  plate-ink: "#23180E"
  placeholder: "#6E6149"
  success: "#2C4A32"
  warning: "#5E3C08"
typography:
  display:
    fontFamily: "Noto Serif Devanagari, Georgia, serif"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: "58px"
  headline:
    fontFamily: "Noto Serif Devanagari, Georgia, serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: "46px"
  title:
    fontFamily: "Noto Serif Devanagari, Georgia, serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "38px"
  body:
    fontFamily: "Noto Serif Devanagari, Georgia, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "29px"
  label:
    fontFamily: "Noto Sans Devanagari, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: "27px"
  field-label:
    fontFamily: "Noto Sans Devanagari, sans-serif"
    fontSize: "12.5px"
    fontWeight: 600
    lineHeight: "18px"
    letterSpacing: "1.1px"
  value:
    fontFamily: "Noto Serif Devanagari, Georgia, serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: "27px"
    fontFeature: "tabular-nums"
rounded:
  sheet: "3px"
  pill: "2px"
  rule: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  xxl: "24px"
  section: "32px"
  huge: "40px"
  gutter: "20px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.rule}"
    height: "64px"
    padding: "0 20px"
  button-secondary:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.rule}"
    height: "56px"
    padding: "0 20px"
  button-emergency:
    backgroundColor: "{colors.almanac-red}"
    textColor: "#FFFFFF"
    rounded: "{rounded.rule}"
    height: "64px"
  input:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.rule}"
    height: "64px"
    padding: "8px 16px"
  chip:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.rule}"
    height: "56px"
    padding: "8px 20px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.rule}"
  card:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.rule}"
    padding: "16px"
---

## Overview

Doctor Mama is an older Marathi speaker's page, not an app dashboard. The world is the two
printed objects every Pune household kept: the **दिनदर्शिका** (almanac) that hung by the door,
and the **वैद्यकीय पुस्तक** (medical book) on the shelf. Their order — a dated masthead, a 3dp
ink rule, numbered entries, a red-ink stamp, one line-drawn figure plate with its caption — is
the whole visual system. Warmth comes from the paper and the drawing; order comes from the rules.

Everything is ink on aged paper: no grey UI chrome, no cards floating on a background, no
colour-coding except the one almanac red. Type is a Devanagari serif for anything read, and a
Devanagari sans for the small tracked field labels that name things. The app is at 390×844 in
the web preview and the same layout on a phone.

This file is the durable visual record for Phase 1. PRODUCT.md owns product truth; the Home
surface brief (`.impeccable/surfaces/src-app-index-tsx.md`) owns the Home contract.

## Colors

### Primary
- **Ink** (#1A1409): all body text, headings, rules, filled buttons. 14.9:1 on paper.
- **Ink Soft** (#3A3223): secondary prose, helper lines, captions. 10.3:1 on paper.
- **Rule** (`rgba(26,20,9,0.42)`): hairlines inside a block — the second-order division that
  keeps a table readable without another black line.

### Secondary
- **Almanac Red** (#A3231A): the fill of SOS and of nothing else; white on it is 7.5:1.
- **Almanac Red Ink** (#8E2411): red as text and as the stamp outline — section marks, the
  "तुमचे डॉक्टर" label, the date line's accents, links. 7.1:1 on paper.
- **Red Tint** (#EFD8CC): the only tinted fill, for the "today" stamp and the closed-state pill.

### Neutral
- **Paper** (#F1E7D3): the ground of every screen.
- **Paper Deep** (#E8DBC0): the dock band and the avatar disc.
- **Paper Raised** (#F8F2E5): sheets, fields, block fills — one shade above the page, not white.
- **Plate Ink** (#23180E): the figure plates' strokes, a touch warmer than body ink.
- **Placeholder** (#6E6149): placeholder text only, 4.9:1 so it can never be mistaken for typed copy.
- **Success** (#2C4A32) and **Warning** (#5E3C08): text and 1.5dp outlines only, never fills
  larger than a pill.

**The One Red Rule.** Red means *help is happening now*: SOS, the emergency call, the stamp on
today's visit. It never decorates a heading, a selected control, or an icon.

## Typography

**Display and body:** Noto Serif Devanagari (400 / 500 / 600 / 700).
**Labels and controls:** Noto Sans Devanagari (400 / 500 / 600 / 700).
**Character:** a printed-page pairing — the serif carries the calm of a book, the sans does the
clerking: field names, tracked small labels, button words.

Line height is always size × 1.6. That is the Devanagari matra floor, and it is also inside the
elderly-accessibility 1.5–1.6 band; nothing overrides it to tighten a layout.

### Hierarchy
- **Display** (700, 40/58): the date numeral in the masthead — the one moment allowed to be huge.
- **Headline** (600, 30/46): the question a screen is asking ("काय त्रास होतोय?").
- **Title** (600, 24/38): section titles, the doctor's name, hospital names.
- **Body** (400, 18/29): all prose. Never smaller than 18 on a shipping screen.
- **Label** (600 sans, 17/27): control words — buttons, chips, tabs.
- **Field label** (600 sans, 12.5/18, tracking 1.1): the printed names of things — "अंतर",
  "पुढील भेट", "आकृती 1". Always below or beside a value, never above a heading.

Numbers are Latin (14, 4:30, 2.4 किमी) in serif, `tabular-nums` where they sit in a column.

## Layout

One column, 20dp gutters, no max width. The page reads top to bottom in a fixed order: masthead
with the 3dp rule → the date block → the thing the screen is for → the register of what you can
do → the dock. Blocks are separated by a rule and 16–32dp of air, never by a gap alone.

The dock is pinned: 64dp primary action on the wide side, SOS on a 34% side, on a Paper Deep
band closed by a 2dp ink rule, with the safe-area inset under it. It is the only place a primary
action lives. On the SOS flow the dock is replaced by a bottom cancel button.

Every tap target is ≥56dp; primary buttons are 64dp; the whole card is the target, not a
sub-element. Nothing important lives in the top-right corner.

## Elevation & Depth

There are no shadows. Depth is drawn: a 3dp ink rule above, a hairline below, a Paper Raised
fill against Paper, and an offset stamp. The single exception is the bottom sheet, which floats
over a warm ink scrim because it must be read as a separate physical sheet.

### Shadow Vocabulary
- **Sheet only** (`0 10px 18px rgba(42,32,22,0.16)`): the bottom sheet, and nothing else.

**The Drawn Rule.** If a block needs to separate from the page, draw a rule or change the paper
shade. Never add a drop shadow, a glow, or a gradient.

## Shapes

Square. Cards, fields, buttons, chips, pills and sheets are 0dp radius; the bottom sheet is 3dp
so it reads as paper with a cut edge. Circles survive in exactly three places: the avatar disc,
the SOS ring, and the microphone disc — the three things that are objects rather than pages.

Borders are 1.5dp ink for containers, 1dp for internal hairlines, 3dp for the masthead rule.
Red rules exist only inside the stamp. Nothing has a coloured left or right border.

## Components

### Buttons
- **Shape:** square (0dp), 64dp primary / 56dp standard, full width by default.
- **Primary:** ink fill, paper text — the dock action.
- **Secondary:** Paper Raised fill, 1.5dp ink outline, ink text.
- **Ghost:** no fill, ink underlined text; the word is the affordance.
- **Emergency:** Almanac Red fill, white text, 64dp — the 108 call.
- **Danger:** paper fill with a red 1.5dp outline and red-ink text — a destructive or urgent
  secondary action.
- **States:** pressed shifts the fill one step (ink → #33291A, raised → paper deep) with a 0.98
  scale; disabled is Paper Deep with a rule outline and ink-soft text; loading keeps the fill and
  swaps the label for a spinner in the button's own text colour.

### Chips
- **Style:** Paper Raised, 1.5dp ink outline, ink label, 56dp minimum, wrapping to two lines.
- **State:** selected fills solid ink with paper text. No check mark, no tint.

### Cards / Containers
- **Corner Style:** square.
- **Background:** Paper Raised.
- **Shadow Strategy:** none — see Elevation.
- **Border:** 1.5dp ink; internal divisions 1dp rule.
- **Internal Padding:** 16dp, 12dp between text lines.

### Inputs / Fields
- **Style:** Paper Raised, 1.5dp ink outline, 64dp (fields) or 140dp (notes), 20sp serif entry text.
- **Focus:** the fill returns to Paper and a 3dp ink rule sits across the top edge. The browser's
  own focus ring and orange outline are suppressed for text entry; the caret is ink.
- **Error:** Warning outline on a Warning Tint fill, with an alert icon and a sentence that names
  the fix. Disabled fields keep the rule and drop to Ink Soft.
- **Voice:** every field carries the "बोलून सांगा" row underneath — a 38dp outlined disc, ink mic,
  underlined words. Typing is never required.

### Navigation
- **Top:** a masthead, not a bar: wordmark left, patient name right, 3dp rule, then the dated
  block. Interior screens use a 56dp "मागे" text button with a chevron and an underline — no
  bare icon, no top-right action.
- **Bottom:** the action dock. The three-tab bar (मदत · डॉक्टर · माझे) arrives with the doctor
  directory and the records pass; a tab with no screen behind it would be a dead end.

### Masthead (signature)
The date is the page's ornament: the day numeral at 68sp in serif, the month at 20sp and
"शनिवार · 2026" at 12.5sp tracked beside it, all closed by a hairline, then the greeting line.
It is the first thing drawn on Home and the marker that this is today's page.

### Doctor block (signature)
A ruled block, not a card: the label "तुमचे डॉक्टर" in red ink, the name at 21sp, the speciality
and area, a red stamp turned −1.5° carrying today's time, and three labelled cells — अंतर,
दवाखाना, भाषा — divided by hairlines.

### Figure plate (signature)
One line drawing (chest and heart, help, hospital) on the paper with "आकृती 1" and its caption
beneath. 92–104dp wide, 1.1–1.25dp ink strokes, no fill, no tint. It is the only illustration on
a screen and it never carries information that is not also written.

## Do's and Don'ts

### Do:
- **Do** set every line height at size × 1.6 and every body size at 18 or above.
- **Do** draw a rule, change the paper shade, or add a stamp when something needs emphasis.
- **Do** keep the number register two columns, each cell ≥56dp, the number in red ink.
- **Do** put the primary action in the dock and the SOS in the same 34% slot on every screen.
- **Do** write numbers in Latin digits and use commas, never middots.
- **Do** verify text colour at ≥7:1 on its own ground before shipping a screen.

### Don't:
- **Don't** use red for selection, validation, decoration or a heading — only for help happening now.
- **Don't** add a shadow, glow, gradient, blur or glass surface. The sheet's shadow is the ceiling.
- **Don't** round a corner, except the 3dp sheet and the three circular objects.
- **Don't** put a small tracked label above a heading; the heading carries its own weight.
- **Don't** use a coloured left or right border above 1dp, or nest a card inside a card.
- **Don't** use an icon without a word, or a placeholder as a label.
- **Don't** let a tap target fall below 56dp or move a primary action to the top of the screen.

## Phase 1 coverage

Built in this world: Home (मदत), SOS countdown / sending / ready, the hospital list, the voice
sheet's six states, and the dev gallery that renders every component in every state. Still to
come in the same world: language choice and onboarding, the symptom flow (body map, symptoms,
severity, result), the doctor directory and detail, booking and appointments, profile, reports,
family, and doctor mode with referrals.
