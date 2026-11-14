# Product

<!-- impeccable:product-schema 1 -->

## Platform

ios

<!-- Phase 1 ships one React Native UI, previewed at 390×844. Android runs the same layout; no per-OS divergence is designed yet. -->

## Users

Primary: a person aged roughly 60–75 living in Pune, most often alone at home, opening the app while uncomfortable, worried or in pain. They may be holding the phone one-handed, may not be wearing spectacles, may be scared, and may not read English comfortably. They want to reach help or the right doctor in seconds without typing.

Secondary: an adult son or daughter helping a parent with an appointment or a report, sometimes from another city.

## Product Purpose

Doctor Mama gets an older Marathi speaker from "something is wrong" to the right help: one tap to emergency services and the nearest hospital, or a spoken symptom description that routes them to the right specialist, or their own doctor's next slot. Success is measured in seconds-to-help and in how little the person has to read, type or decide.

## Positioning

The only local-care app built around the frightened elder rather than the appointment funnel: talk instead of type, help instead of search, and one giant SOS that never asks you to log in.

## Operating Context

- Used at home, in a clinic waiting room, or in an emergency, on an average mid-range phone, sometimes on a weak connection.
- The user may be in pain, may have shaky hands, may be hard of hearing, and may not know medical vocabulary.
- A caregiver may be nearby and take over the phone mid-task.
- Phase 1 is UI only: no backend, no real telephony, no real practitioner data, no authentication. All data is local mock data.

## Capabilities and Constraints

- Marathi is the default language; English is a toggle. All UI copy exists in both.
- One-tap SOS with a short cancel window, nearest hospitals and the 108 emergency number.
- Voice symptom capture with a typed-free fallback (chips). No flow may require typing.
- Doctor directory, doctor detail, booking, appointments, reports, family/caregiver, and a doctor→doctor referral mode.
- Constraints: no login in Phase 1; no diagnosis language anywhere; disclaimer on every recommendation screen; no photographs of doctors (illustrated avatars and initials only); mock data only.
- Accessibility floor is part of the product, not a polish step: 18sp minimum body text, ≥7:1 text contrast, 56dp minimum touch targets, 64dp primary buttons, primary actions in the bottom thumb zone, SOS reachable from every screen, no dead ends.
- Technical: React Native + Expo (SDK 58), Expo Router, previewed in Expo Web inside a 390×844 frame. No Xcode/Android SDK on the build machine.

## Brand Commitments

- Name: **Doctor Mama**.
- Voice: plain, warm, respectful Marathi — a trusted neighbour who happens to be a doctor, never a startup. No hype, no gamification, no emoji.
- Personality: calm, domestic, competent, protective.
- The product must never look like a health-tech dashboard, and must never feel like a government form.
- Numbers use Latin digits; separators are commas, never middots.

## Evidence on Hand

- Brand name and product brief only. No logo, no photography, no practitioner data, no testimonials, no press, no real phone numbers.
- All hospitals, doctors, slots and reports are synthetic and must stay labelled as placeholder data. Nothing may be invented as a real claim (prices, ratings, outcomes, credentials).

## Product Principles

1. Help beats search: the emergency path is always one tap and never gated.
2. Speak, don't type: every input has a voice or chip path with equal weight.
3. One decision per screen: the next action is obvious, large, and in the thumb zone.
4. Legibility is safety: huge type, hard contrast, short sentences, no icon-only meaning.
5. Warmth over polish theatre: the interface should feel like a person who knows you, not a product demo.

## Accessibility & Inclusion

Older adults with reduced vision, hearing, dexterity and working memory; low digital confidence; possible distress. Requirements: 18sp+ body, 7:1 contrast, 56/64dp targets, no reliance on colour alone, screen-reader labels in Marathi, motion that never strobes and respects Reduce Motion, no time-limited reading, and copy at roughly a 6th-grade reading level in Marathi.
