# de-learn-de 🇩🇪

Ine Maria's German A1 course dashboard. A 14-day interactive course that's mobile-first and gamified.

## 🎯 What is de-learn-de?

- **de** = affectionate address (dek/dik)
- **learn** = to learn
- **de** = Deutschland (Germany)

> "de-learn-de" = Learn German with someone you love

---

## ✨ Features

- **14-Day A1 Curriculum** - Daily quiz sessions: Hören (Listening) & Lesen (Reading)
- **Interactive Quiz System** - 5 questions per session, one-by-one navigation, instant feedback
- **Hearts System** - 3 lives per day, lose 1 on failure, can use tomorrow's hearts
- **Text-to-Speech** - German audio for listening exercises using browser TTS
- **Progressive Difficulty** - Easy (Days 1-4) → Medium (Days 5-8) → Hard (Days 9-14)
- **Progress Locked** - Must finish Hören before Lesen unlocks, complete both for next day
- **Streak Counter** - Tracks consecutive learning days
- **80 A1 Questions** - Question bank with random selection and replacement
- **Mobile-First Design** - Optimized for Ine's phone
- **Progress Saved** - Automatically saved to browser (won't lose progress on refresh)

---

## 🚀 Deploy to Vercel

### Method 1: Via Dashboard (Simplest)

1. Go to [vercel.com](https://vercel.com) and login
2. Click **"Add New..."** → **"Project"**
3. Select the `de-learn-de` repository from GitHub
4. Click **"Deploy"**

Vercel will automatically:
- Build the Next.js project
- Deploy to production
- Give you a link (e.g., `https://de-learn-de.vercel.app`)

### Method 2: Via CLI

```bash
npm i -g vercel
vercel
```

---

## 📱 14-Day Curriculum

### Phase 1: Basics (Days 1-5)
- Day 1: Alphabet, Greetings
- Day 2: Numbers 1-20
- Day 3: Personal Pronouns, Present Tense
- Day 4: Colors & Family
- Day 5: Modal Verbs

### Phase 2: Daily Life (Days 6-10)
- Day 6: Food & Drinks
- Day 7: Time & Daily Schedule
- Day 8: Shopping & Money
- Day 9: Directions & Places
- Day 10: Weather & Seasons

### Phase 3: Practice (Days 11-14)
- Day 11: Past Tense Basics
- Day 12-14: Mock Tests

---

## 🎯 How to Use

1. **Open the link** - Ine opens the website on her phone
2. **Pick Day 1** - Always unlocked
3. **Check Hearts** - You have 5 ❤️ per day
4. **Start Hören** - Click to begin listening quiz (5 questions, TTS audio)
5. **Answer Questions** - One-by-one navigation, choose from 4 options
6. **Submit** - After answering all 5 questions
7. **Results** - Need ≥4 correct (80%) to pass:
   - **Pass**: Proceed to Lesen session
   - **Fail**: Lose 1 ❤️, retry with new random questions (if ❤️ > 0)
8. **Out of Hearts?** - Use "Gunakan ❤️ Besok" to borrow from tomorrow
9. **Complete Lesen** - Same process for reading quiz
10. **Auto-Progress** - Complete both sessions to unlock tomorrow

### Quiz Rules
- **Threshold**: Minimum 4/5 correct answers (80%) to pass
- **Random Questions**: Different questions each attempt (with replacement)
- **Difficulty Progression**:
  - Days 1-4: Easy
  - Days 5-8: Medium
  - Days 9-14: Hard

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16.1.6 | React framework |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Local Storage | Progress persistence |
| Playwright | Testing & screenshots |

---

## 🎮 Quiz System

### Sessions
- **Hören (Listening)**: 5 questions with Text-to-Speech audio
- **Lesen (Reading)**: 5 text-based questions

### Hearts System
- Start each day with **5 ❤️**
- Lose **1 ❤️** when failing a quiz (>2 wrong answers)
- Lose **1 ❤️** to reveal text in listening questions (optional)
- **❤️ = 0**: Cannot attempt more quizzes today
- **Borrow Hearts**: Use "Gunakan ❤️ Besok" to borrow from tomorrow (tomorrow starts with 0 ❤️)
- **Daily Reset**: Hearts reset to 5 at midnight

### Question Bank
- **Total**: 80 questions
  - Listening: 20 questions (10 easy, 5 medium, 5 hard)
  - Reading: 20 questions (10 easy, 5 medium, 5 hard)
  - Writing: 20 questions (not used in quiz)
  - Speaking: 20 questions (not used in quiz)
- **Selection**: Random with replacement (questions can repeat)

### Text-to-Speech (TTS)
- Uses browser's Web Speech API
- Language: German (de-DE)
- Requires browser support (Chrome/Edge recommended)
- Fallback: Shows error message if TTS unavailable

## 📊 Progress System

Progress is saved to browser with key `german-progress`:

```json
{
  "days": {
    "1": {
      "unlocked": true,
      "completed": false,
      "sessions": {
        "hoeren": { "completed": false, "attempts": 0, "lastAttemptAt": null },
        "lesen": { "completed": false, "attempts": 0, "lastAttemptAt": null }
      },
      "hearts": 3,
      "heartsResetAt": "2026-02-16T00:00:00Z",
      "tomorrowHeartsUsed": false
    }
  },
  "streak": 5,
  "lastCompletedDate": "2026-02-16"
}
```

---

## 📝 Customization

### Edit Theme Colors

Open `src/app/globals.css`:

```css
@theme {
  --color-de-black: #2a2a2a;
  --color-de-red: #d94e4e;
  --color-de-gold: #f2c94c;
}
```

### Edit Questions

Open `data/questions.json` - add/remove questions there.

---

## 🧪 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📱 Mobile Features

- Bottom navigation bar
- Touch-friendly buttons (larger than 44x44px)
- Single column layout
- Optimized for 375px width (iPhone 12 mini)

---

## 📦 Project Structure

```
de-learn-de/
├── src/
│   ├── app/
│   │   ├── page.tsx                # Main dashboard
│   │   ├── layout.tsx              # Root layout
│   │   ├── context/
│   │   │   └── ProgressContext.tsx # Progress & hearts logic
│   │   ├── day/
│   │   │   └── [id]/
│   │   │       ├── page.tsx        # Daily sessions (Hören/Lesen)
│   │   │       └── quiz/
│   │   │           └── page.tsx    # Quiz interface
│   │   ├── components/
│   │   │   ├── BottomNav.tsx       # Bottom navigation
│   │   │   ├── HeartsIndicator.tsx # Hearts display
│   │   │   ├── QuizCard.tsx        # Question card
│   │   │   └── TTSAudio.tsx        # Text-to-speech button
│   │   └── globals.css             # Theme colors
│   ├── components/                 # Shared components
│   ├── data/
│   │   ├── questions.json          # Question bank (80 questions)
│   │   └── questions.ts            # Types & quiz utilities
│   └── lib/
│       └── quiz.ts                 # Quiz logic functions
├── Dockerfile                      # Container config
├── package.json
└── README.md
```

---

## 🐳 Docker

```bash
docker build -t de-learn-de .
docker run -p 3000:3000 de-learn-de
```

---

## 📄 License

MIT License - Free to use

---

## 📝 TODO / Future Development

- [ ] **Expand Question Bank**: Add 50+ questions per category per difficulty level
- [ ] **Audio Files**: Replace TTS with high-quality static audio files
- [ ] **No Replacement**: Track question history to avoid repetition
- [ ] **Animations**: Add sound effects and smooth animations for quiz interactions
- [ ] **Timer**: Add time limit per question or per session
- [ ] **Hint System**: Add hints for difficult questions (costs 0.5 ❤️)
- [ ] **Leaderboard**: Compare progress with other learners
- [ ] **Offline Mode**: PWA support for learning without internet
- [ ] **Dark Mode**: German flag inspired dark theme
- [ ] **Export Progress**: Download progress as PDF/certificate

---

**Made with 💕 for Ine Maria**

14-day German A1 course that's easy and fun! 🇩🇪
