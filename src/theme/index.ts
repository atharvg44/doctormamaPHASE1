/**
 * Doctor Mama — design tokens.
 * The household almanac: aged paper, warm ink, one almanac red.
 * Every colour, size and space in the app comes from here.
 * See DESIGN.md and the Home direction contract.
 */

export const color = {
  /** Aged paper. The whole app sits on this. */
  paper: '#F1E7D3',
  /** The dock and tab ground: one shade deeper, like the cover stock. */
  paperDeep: '#E8DBC0',
  /** Sheets and raised blocks. */
  paperRaised: '#F8F2E5',
  /** Warm black ink — body, rules, filled buttons. 14:1 on paper. */
  ink: '#1A1409',
  /** 9.7:1 on paper. Secondary prose. */
  inkSoft: '#3A3223',
  /** Hairlines and dotted guides at low opacity. */
  rule: 'rgba(26,20,9,0.42)',
  /** 4.9:1 on paper — placeholder text that must not read as typed copy. */
  placeholder: '#6E6149',
  /** The 3dp almanac rule under the masthead. */
  ruleStrong: '#1A1409',
  /** Almanac red as a fill. White on it is 7.4:1. */
  red: '#A3231A',
  /** Almanac red as ink. 7.2:1 on paper. Section marks, stamps, links. */
  redInk: '#8E2411',
  redTint: '#EFD8CC',
  plateInk: '#23180E',
  /** 8.0:1 on paper. */
  success: '#2C4A32',
  successTint: '#E4EBDC',
  /** 7.9:1 on paper. */
  warning: '#5E3C08',
  warningTint: '#F0E2C6',

  /* Semantic aliases kept for the rest of the app. */
  bg: '#F1E7D3',
  surface: '#F8F2E5',
  surfaceSunken: '#E8DBC0',
  textPrimary: '#1A1409',
  textSecondary: '#3A3223',
  textMuted: '#3A3223',
  border: 'rgba(26,20,9,0.42)',
  primary: '#1A1409',
  primaryPressed: '#2E2517',
  primaryTint: '#EADBBE',
  emergency: '#A3231A',
  emergencyTint: '#EFD8CC',
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  section: 32,
  huge: 40,
} as const;

/** The world is ruled, not rounded. Sheets get 3dp so they read as paper. */
export const radius = {
  card: 0,
  input: 0,
  sheet: 3,
  pill: 2,
} as const;

export const font = {
  /** Serif Devanagari: names, values, headings, prose. */
  serif: 'NotoSerifDevanagari_400Regular',
  serifMedium: 'NotoSerifDevanagari_500Medium',
  serifStrong: 'NotoSerifDevanagari_600SemiBold',
  serifBold: 'NotoSerifDevanagari_700Bold',
  /** Sans Devanagari: field labels, small tracked caps, controls. */
  regular: 'NotoSansDevanagari_400Regular',
  medium: 'NotoSansDevanagari_500Medium',
  semibold: 'NotoSansDevanagari_600SemiBold',
  bold: 'NotoSansDevanagari_700Bold',
  display: 'NotoSerifDevanagari_700Bold',
  displayMedium: 'NotoSerifDevanagari_600SemiBold',
} as const;

/**
 * Line heights are size × 1.6 — the floor for Devanagari matras (above and
 * below the baseline) and inside the elderly-accessibility 1.5–1.6 band.
 */
export const type = {
  display: { fontFamily: font.serifBold, fontSize: 40, lineHeight: 58 },
  h1: { fontFamily: font.serifStrong, fontSize: 30, lineHeight: 46 },
  h2: { fontFamily: font.serifStrong, fontSize: 24, lineHeight: 38 },
  h3: { fontFamily: font.serifStrong, fontSize: 20, lineHeight: 32 },
  body: { fontFamily: font.serif, fontSize: 18, lineHeight: 29 },
  bodyStrong: { fontFamily: font.serifStrong, fontSize: 18, lineHeight: 29 },
  label: { fontFamily: font.semibold, fontSize: 17, lineHeight: 27 },
  caption: { fontFamily: font.regular, fontSize: 16, lineHeight: 25 },
  /** A printed field name: "पुढील भेट", "अंतर". Never above a heading. */
  fieldLabel: {
    fontFamily: font.semibold,
    fontSize: 12.5,
    lineHeight: 18,
    letterSpacing: 1.1,
  },
  numeric: {
    fontFamily: font.serifStrong,
    fontSize: 19,
    lineHeight: 27,
    fontVariant: ['tabular-nums'] as const,
  },
} as const;

/** Paper has no glow. The one floating sheet keeps a soft printed shadow. */
export const shadow = {
  shadowColor: '#2A2016',
  shadowOpacity: 0.16,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 10 },
  elevation: 8,
} as const;

/** Layout constants, not spacing. */
export const layout = {
  gutter: 20,
  control: 56,
  primaryControl: 64,
  cardMinHeight: 104,
  tabBarHeight: 72,
} as const;

/**
 * Motion scale, adapted from transitions.dev motion tokens.
 * Durations in ms. Translate the intent, not the CSS.
 */
export const motion = {
  duration: {
    stagger: 40,
    micro: 80,
    quick: 150,
    fast: 250,
    medium: 350,
    slow: 400,
    verySlow: 500,
    /** Sheet and panel enter. The app's ceiling — DESIGN caps motion at 220ms. */
    panel: 220,
  },
  easing: {
    smoothOut: [0.22, 1, 0.36, 1],
    inOut: [0.42, 0, 0.58, 1],
    out: [0, 0, 0.58, 1],
  },
  distance: { micro: 4, small: 6, base: 8, medium: 12, large: 30 },
  /** Press and enter scales. No bounce — this audience reads motion as alarm. */
  scale: { press: 0.98, enter: 0.96 },
} as const;

export const theme = { color, space, radius, font, type, shadow, layout, motion } as const;
