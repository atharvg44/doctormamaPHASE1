# Home · Doctor Mama

Scope: the Home route (`src/app/index.tsx`) and the visual world it sets for every other screen.
Visitor mode: operate.

## Audience and job

An older Marathi speaker, alone at home, uncomfortable or frightened. They open the app to
start help: speak a complaint, see their own doctor, or reach a hospital or 108. The page must
answer "what do I do right now" before it explains anything.

## Action

Primary: tap the voice dock (or pick a numbered complaint line). Secondary: SOS, always present,
never gated. Tertiary: hospitals, own doctor.

## Proof and content

Synthetic Pune data only: one patient (माधुरी कुलकर्णी), one doctor (डॉ. सुनील पाटील,
हृदयरोग तज्ज्ञ, कोथरूड, 2.4 किमी, today 4:30), five hospitals, the 108 number. No ratings,
prices, outcomes or credentials may be invented. No diagnosis language.

## Constraints

18sp body, 7:1 text contrast, 56dp targets, 64dp primary button, primary actions in the bottom
dock, SOS on every screen, no typing required, Marathi first with an English toggle, iOS
conventions for navigation and controls.

## Chosen direction

The household almanac fused with the family medical book: today's dated page, read like a
register, with one line-drawn figure plate. Memorable moment: the monumental date at the top and
the red stamp on whatever is happening today.

## Direction contract

THESIS: Home is today's page in the household almanac-medical book — a dated, ruled page you
read, with one figure plate — not a stack of rounded cards on a grey ground under a floating
header.

OWN-WORLD: aged paper #F1E7D3 with a faint five-pixel fibre dot; warm ink #1A1409; almanac red
#A32E14 used for the date rule, the stamp, SOS and section marks; rules at 45% ink; Noto Serif
Devanagari for names, values and headings, Noto Sans Devanagari for labels and small tracked
caps; one line-drawn plate with a figure caption; ghost buttons that fill with ink when pressed.

STORY: the reader understands "this is today's page, in my language, from a clinic that knows
me", believes the doctor and the hospital are one tap away, and speaks or picks a numbered line
without typing.

FIRST VIEWPORT: 44dp status; masthead row with the wordmark left and the patient name right; a
3dp ink rule; the date line — day numeral at 74sp, month, weekday and year stacked beside it,
closed by a hairline; greeting; the complaint heading at 31sp with its sub-line; four numbered
complaint rows in a ruled two-column register, each 56dp, each number spoken; the doctor block
with a red stamp, three labelled cells and a hairline; the hospital row; then the dock — ink
voice button at 64dp beside a red SOS at 34% — and the native tab bar.

FORM: second of the seven grounded directions, fused with the third (the illustrated medical
book supplies the plate); code-led; seed:61f2553a8b369135.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

Dark mode is token-ready only. The plate set exists for Home, SOS, the symptom flow, the doctor
directory and doctor mode; more plates are authored as screens need them.
