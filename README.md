Doctor Mama (डॉक्टर मामा) — Phase 1

A bilingual (Marathi & English), voice-first mobile healthcare interface built with React Native and Expo. Doctor Mama is purpose-designed for older adults (aged 60–75) living in Maharashtra, ensuring immediate access to care without typing, complex search funnels, or login walls.

🌟 Key Features
🆘 One-Tap Emergency (SOS): Reach emergency services (108), quick emergency contacts, and the nearest hospitals instantly from any screen.
🎙️ Voice-First Symptom Capture: Describe symptoms naturally via voice in Marathi or English, with structured chip-based fallbacks (no typing required).
♿ Senior-Friendly Design System:
High-contrast typography (Baloo 2 & Noto Sans / Serif Devanagari)
Large touch targets (≥56dp / 64dp primary buttons)
Bottom "thumb-zone" layout for comfortable one-handed use
Warm, respectful, non-clinical tone
🌐 Full Bilingual Support: Seamless toggle between Marathi (मराठी) and English.
🏥 Doctor & Hospital Directory: Synthetic local clinic slots, illustrated physician cards, and specialty routing.
📱 Responsive Mobile Preview: Built-in web frame previewing the native 390×844 viewport.
🛠️ Tech Stack
Framework: Expo
 (SDK 58) with React Native
Navigation: Expo Router
 (File-based routing)
Typography: Google Fonts (@expo-google-fonts/baloo-2, @expo-google-fonts/noto-sans-devanagari, @expo-google-fonts/noto-serif-devanagari)
Speech & Audio: expo-speech
Sensory & Feedback: expo-haptics
Icons & Graphics: react-native-svg
Language/Tooling: TypeScript, Bun / npm
🚀 Getting Started
Prerequisites

Ensure you have installed:

Node.js
 (v18+ recommended)
npm
 or Bun
Expo Go
 app on your iOS or Android device (optional, for running on a physical phone)
Installation

Clone the repository:

bash
git clone https://github.com/atharvg44/doctormamaPHASE1.git
cd doctormamaPHASE1

Install dependencies:

bash
npm install
Running the App

Start the Expo development server:

bash
npm start
# or
npx expo start
Run Options:

Web Browser (Recommended for quick preview): Press w in the terminal, or run:

bash
npm run web

This will open http://localhost:8081 in your browser with the mobile preview frame.

On a Physical Mobile Device (iOS / Android):

Install Expo Go from the App Store or Google Play Store.
Scan the QR code displayed in your terminal using your phone camera (iOS) or Expo Go app (Android).
Ensure your phone and computer are on the same Wi-Fi network.

iOS Simulator (macOS only): Press i in the terminal after starting, or run:

bash
npm run ios

Android Emulator: Press a in the terminal after starting, or run:

bash
npm run android
📁 Project Structure
text
├── .agents/               # Design systems, skills, motion presets & tokens
├── .opencode/             # Agent skills (symptom triage, Devanagari UI, voice UX)
├── assets/                # App icons, splash screens, and images
├── src/
│   ├── app/               # Expo Router screens (_layout.tsx, index.tsx, sos.tsx, etc.)
│   ├── components/        # Reusable UI components, header, dock, and domain cards
│   ├── data/              # Mock data for symptoms, doctors, hospitals, referrals
│   ├── hooks/             # Custom React hooks (reduced motion, etc.)
│   ├── i18n/              # Marathi (mr) and English (en) translations & context
│   └── theme/             # Design tokens (colors, spacing, typography)
├── AGENTS.md              # Engineering rules and conventions
├── DESIGN.md              # Design system & aesthetic specifications
├── PRODUCT.md             # Product requirements and user persona
└── package.json           # Dependencies and scripts
🧪 Linting & Typecheck

Check types and code style before committing:

bash
npx tsc --noEmit           # Typecheck
npx expo lint              # ESLint
📄 License

This project is licensed under the MIT License.
