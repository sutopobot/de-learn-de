# Changelog

All notable changes to the de-learn-de project.

---

## [1.1.0] - 2026-02-17

### ✨ Added

#### Quiz System v2
- **3 Quiz Modes:** Learn (5 questions), Practice (10 questions), Test (15 questions)
- **Sequential Flow:** Question-by-question navigation with progress indicator
- **Immediate Feedback:** Shows correct answer + explanation after each question (Learn/Practice modes)
- **Timer System:** Countdown with visual warnings (<5 min yellow, <1 min red)
- **Results Summary:** Score, percentage, pass/fail status (60% = Goethe pass)
- **Mode Selector:** Pre-quiz selection UI

#### Learning Section Enhancements
- **TTS Integration:** Text-to-speech for all German words/phrases
- **Slow Mode:** Turtle🐢/Rabbit🐇 speed toggle for beginners
- **Gender/Artikel Section:**
  - Color coding: der=🔵BLUE, die=🔴RED, das=🟢GREEN
  - 36 nouns with memory hooks
  - Interactive gender quiz (10 questions)
  - Gender patterns/rules (-ung=die, -chen=das, etc.)
- **40 Common Phrases:** Daily expressions with situations & pronunciation
- **15 Pronunciation Tips:** With audio examples
- **Tab Navigation:** 5 sections (Tips, Kosakata, Der/Die/Das, Frasa, Pengucapan)
- **Progress Tracking:** "Mark as learned" functionality

#### Question Bank Expansion
- **280 Questions** (expanded from 80)
- **Split JSON Structure:** By category + difficulty for lazy loading
- **13 Goethe A1 Topics:** Personal info, numbers, family, routines, food, shopping, housing, work, weather, body/health, transport, city/directions, appointments

### ♻️ Changed

- **Quiz Flow:** From batch submit to sequential per-question
- **Data Loading:** Implemented lazy loading for question JSON files
- **Learning Page:** Redesigned with tab-based navigation
- **UI/UX:** Improved visual feedback and gamification

### 🔧 Technical

- Added new components: `QuizContainerV2`, `ModeSelector`, `Timer`, `QuestionCard`, `QuizResults`
- Added learning components: `TTSLearningButton`, `GenderNounCard`
- Refactored data layer for split JSON structure
- Updated build system for better performance

---

## [1.0.0] - 2026-02-10

### 🎉 Initial Release

- 14-day gamified curriculum
- Basic quiz system (batch-based)
- 80 questions (20 per category)
- Hearts-based lives system
- Streak tracking
- Basic learning content
- Next.js 16 + TypeScript + Tailwind CSS

---

## Future Roadmap

### Planned for v1.2.0
- [ ] Writing section with text input
- [ ] Speaking section with audio recording
- [ ] Progress analytics dashboard
- [ ] Spaced repetition system
- [ ] More question types (fill-in-blank, matching)

### Planned for v2.0.0
- [ ] User accounts & cloud sync
- [ ] Social features (leaderboards)
- [ ] AI-powered tutoring
- [ ] Goethe A2 level content

---

**Note:** This changelog follows [Keep a Changelog](https://keepachangelog.com/) format.
