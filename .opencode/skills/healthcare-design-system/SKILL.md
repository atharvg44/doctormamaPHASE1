---
name: Healthcare Design System
description: Visual foundation for the elderly-first healthcare app — colour tokens, typography scale, spacing, radius, elevation and iconography. Use whenever creating or styling any screen, component or theme file.
---

# Healthcare Design System

One source of truth for every visual value. No screen may invent its own colour,
font size, radius or shadow. If a value is needed and missing, add it here first,
then use it.

## Non-negotiables

- Calm, warm, reassuring. Never clinical-cold, never playful, never alarming.
- Red is reserved for emergency only. Never use red for delete, error toast or
  emphasis. Errors use amber + text.
- Never encode meaning in colour alone. Always pair with a label or icon.
- Minimum body text 18sp. Minimum anything 16sp.
- Soft shadows only — one elevation level in the whole app.

## Colour tokens

Light theme (default). Store these as a typed `theme.ts` object, not literals.

| Token | Hex | Contrast on surface | Use |
|---|---|---|---|
| `bg` | `#F7F5F0` | — | App background, warm paper |
| `surface` | `#FFFFFF` | — | Cards, sheets, inputs |
| `surfaceSunken` | `#EFECE4` | — | Grouped sections, skeletons |
| `primary` | `#0B615B` | 7.3:1 with white text | Primary buttons, active tab, links |
| `primaryPressed` | `#084A45` | — | Pressed state |
| `primaryTint` | `#E3F2EF` | — | Selected chip, info card |
| `textPrimary` | `#14201F` | 15.3:1 on bg | Headings, body |
| `textSecondary` | `#42504E` | 7.7:1 on bg | Supporting text |
| `textMuted` | `#5C6B69` | 5.1:1 on bg | Captions only, never body |
| `border` | `#DCE3E1` | — | Card and input borders |
| `emergency` | `#991D16` | 8.3:1 with white text | SOS card and SOS button only |
| `emergencyTint` | `#FDECEA` | — | SOS supporting surface |
| `warning` | `#744500` | 8.1:1 on white | Errors, cautions, offline |
| `warningTint` | `#FDF1DC` | — | Warning banners |
| `success` | `#26592B` | 8.3:1 on white | Confirmed, booked |
| `successTint` | `#E7F3E8` | — | Success banners |

Every pair above is verified at ≥7:1 for text, the elderly-accessibility floor.
The brand teal was deepened from `#0E6E68` to `#0B615B` because white-on-brand
was 6.1:1 — one step under the rule.

Dark theme: `bg #121615`, `surface #1B2120`, `surfaceSunken #232B2A`,
`textPrimary #F2F5F4`, `textSecondary #B9C4C2`, `border #33403E`,
`primary #5FBDB3`, `primaryPressed #7FD0C7`, `primaryTint #1E3533`,
`emergency #F2938B`, `emergencyTint #3A1F1D`.

Dark theme is a stretch goal. Ship light only if time is short, but keep the
tokens so it is a swap, not a rewrite.

## Typography scale

Family: `NotoSansDevanagari` for all text (see `marathi-devanagari-ui`).
Weight: 400 body, 600 labels and headings, 700 for the single screen title.

| Style | Size / line-height | Weight | Use |
|---|---|---|---|
| `display` | 32 / 52 | 700 | SOS title, big confirmation |
| `h1` | 28 / 45 | 700 | Screen title |
| `h2` | 24 / 38 | 600 | Section heading |
| `h3` | 20 / 32 | 600 | Card title |
| `body` | 18 / 29 | 400 | Default body |
| `bodyStrong` | 18 / 29 | 600 | Emphasised inline |
| `label` | 18 / 29 | 600 | Buttons, tabs, chips |
| `caption` | 16 / 26 | 400 | Timestamps, helper text |

Line height is always **1.6×** the size. That is the floor for Devanagari
matras above and below the baseline (`marathi-devanagari-ui`) and the top of
the elderly-accessibility 1.5–1.6 band. Never go tighter.

Never go below 16. Never use `letterSpacing` on Devanagari. Never uppercase.

## Spacing

Base unit 4. Only these steps: `4, 8, 12, 16, 20, 24, 32, 40, 48`.

- Screen horizontal gutter: **20**
- Card inner padding: **20**
- Gap between cards: **12**
- Gap between sections: **32**
- Gap between label and field: **8**

## Radius

| Token | Value | Use |
|---|---|---|
| `radiusCard` | 16 | Cards, list items |
| `radiusInput` | 12 | Text inputs, chips |
| `radiusSheet` | 24 | Bottom sheets (top corners) |
| `radiusPill` | 999 | Buttons, tags |

## Elevation

Exactly one level. `shadowColor #0E2A26`, `shadowOpacity 0.08`,
`shadowRadius 8`, `shadowOffset {0, 2}`, `elevation 2`.
Emergency card may use `0.16` opacity. Nothing else gets a heavier shadow.

## Iconography

- Stroke 2px at 24px, proportional above.
- Always paired with a visible text label. Icon-only is forbidden.
- Rounded line caps, geometric, no skeuomorphism, no thin 1px icons.
- Minimum rendered icon size 28px; 32px inside cards.

## Motion

- 180–220ms, `ease-out` entering, `ease-in` leaving.
- Press feedback: scale to `0.98`, no colour flash.
- No bouncing, no parallax, no auto-playing carousels.
- Respect `AccessibilityInfo.isReduceMotionEnabled()` — replace motion with a
  120ms opacity fade.

## Reference implementation

```ts
export const theme = {
  color: {
    bg: '#F7F5F0',
    surface: '#FFFFFF',
    surfaceSunken: '#EFECE4',
    primary: '#0E6E68',
    primaryPressed: '#0A544F',
    primaryTint: '#E3F2EF',
    textPrimary: '#14201F',
    textSecondary: '#4A5A58',
    textMuted: '#6B7A78',
    border: '#DCE3E1',
    emergency: '#B3261E',
    emergencyTint: '#FDECEA',
    warning: '#8A5300',
    warningTint: '#FDF1DC',
    success: '#2E6B33',
    successTint: '#E7F3E8',
  },
  space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, section: 32, huge: 40 },
  radius: { card: 16, input: 12, sheet: 24, pill: 999 },
  type: {
    display: { fontSize: 32, lineHeight: 40, fontWeight: '700' },
    h1: { fontSize: 28, lineHeight: 38, fontWeight: '700' },
    h2: { fontSize: 24, lineHeight: 34, fontWeight: '600' },
    h3: { fontSize: 20, lineHeight: 30, fontWeight: '600' },
    body: { fontSize: 18, lineHeight: 28, fontWeight: '400' },
    label: { fontSize: 18, lineHeight: 24, fontWeight: '600' },
    caption: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  },
} as const;
```

## Checklist before finishing a screen

- [ ] Every colour comes from `theme.color`
- [ ] Every size comes from the type scale
- [ ] Spacing values are on the 4pt scale
- [ ] One shadow level maximum
- [ ] No same-colour text and background below 7:1
- [ ] Red appears zero times unless this is the emergency flow
