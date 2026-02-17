# de-learn-de 🇩🇪

Ine Maria's German A1 course dashboard. A 14-day interactive course that's mobile-first and gamified.

## 🎯 What is de-learn-de?

- **de** = affectionate address (dek/dik)
- **learn** = to learn
- **de** = Deutschland (Germany)

> "de-learn-de" = Learn German with someone you love

---

## ✨ Features

### 🆕 NEW in v1.1.0
- **Quiz System v2** - 3 modes: Learn (5Q), Practice (10Q), Test (15Q)
- **Sequential Quiz Flow** - Question-by-question with immediate feedback
- **Timer System** - Exam simulation with countdown warnings
- **280 Questions** - Expanded from 80, covering 13 Goethe A1 topics
- **Learning Section** - TTS, Gender/Artikel trainer, 40 phrases, pronunciation tips
- **Color-Coded Gender** - Blue (der), Red (die), Green (das)
- **Progress Tracking** - "Mark as learned" functionality

### Core Features
- **14-Day A1 Curriculum** - Daily quiz sessions: Hören (Listening) & Lesen (Reading)
- **3 Quiz Modes** - Learn (no pressure), Practice (timed option), Test (exam simulation)
- **Hearts System** - 3 lives per day, lose 1 on failure
- **Text-to-Speech** - German audio with slow mode for beginners
- **Progressive Difficulty** - Easy → Medium → Hard
- **Streak Counter** - Tracks consecutive learning days
- **Mobile-First Design** - Optimized for phones
- **Progress Saved** - localStorage persistence

---

## 📚 Documentation

- **[CHANGELOG.md](CHANGELOG.md)** - Version history & what's new
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical documentation & code structure
- **[USER_GUIDE.md](USER_GUIDE.md)** - How to use the app effectively
- **[TEST_REPORT.md](TEST_REPORT.md)** - Build status & testing results

---

## 🎓 Quiz Modes Explained

### Learn Mode 💡 (5 Questions)
- **Best for:** First-time learning
- **Timer:** None - take your time
- **Feedback:** Immediate with explanation
- **Hearts:** Not used

### Practice Mode 📝 (10 Questions)
- **Best for:** Reinforcing knowledge
- **Timer:** Optional 30-minute limit
- **Feedback:** Immediate with explanation
- **Hearts:** 3 lives

### Test Mode 🧪 (15 Questions)
- **Best for:** Exam simulation
- **Timer:** Strict 25-minute limit
- **Feedback:** At the end only
- **Pass/Fail:** 60% to pass (like real Goethe exam)

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

### Learning Path

1. **Open `/learn`** - Explore vocabulary, gender trainer, phrases
2. **Practice with Learn Mode** - No pressure, learn at your pace
3. **Test with Practice Mode** - Build confidence with 10 questions
4. **Simulate with Test Mode** - Real exam experience (15 questions, 25 min)
5. **Track Progress** - Build streaks, master gender articles

### Daily Quiz Flow

1. **Check Hearts** - You have 3 ❤️ per day
2. **Choose Quiz Mode** - Learn, Practice, or Test
3. **Select Category** - Hören (Listening) or Lesen (Reading)
4. **Answer Questions** - Sequential flow with feedback
5. **Review Results** - See score, explanations, pass/fail status

### Learning Section Features

- **🔊 Text-to-Speech** - Click to hear German pronunciation
- **🐢 Slow Mode** - Toggle for beginners
- **🎨 Gender Colors** - Blue (der), Red (die), Green (das)
- **📊 Progress Tracking** - Mark items as learned

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16.1.6 | React framework |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| shadcn/ui | UI components |
| Local Storage | Progress persistence |
| Web Speech API | Text-to-Speech |
| Playwright | E2E testing |

---

## 🎮 Quiz System

### Sessions
- **Hören (Listening)**: 70 questions across 3 difficulties
- **Lesen (Reading)**: 70 questions across 3 difficulties
- **Schreiben (Writing)**: 70 questions (v2)
- **Sprechen (Speaking)**: 70 questions (v2)

### Hearts System
- Start each day with **3 ❤️**
- Lose **1 ❤️** when failing a quiz (>2 wrong answers in Practice/Test mode)
- **❤️ = 0**: Cannot attempt more quizzes today
- **Daily Reset**: Hearts reset to 3 at midnight
- **Learn Mode**: Does not use hearts (safe practice!)

### Question Bank
- **Total**: 280 questions (expanded from 80)
- **Split by Category + Difficulty**:
  - Easy: 30 questions per category
  - Medium: 20 questions per category
  - Hard: 20 questions per category
- **13 Goethe A1 Topics** covered
- **Lazy Loading**: Questions loaded on-demand by category

### Text-to-Speech (TTS)
- Uses browser's Web Speech API
- Language: German (de-DE)
- **Slow Mode**: Turtle 🐢 / Rabbit 🐇 toggle
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
├── data/
│   └── questions/              # Split JSON files (280 questions)
├── src/
│   ├── app/
│   │   ├── page.tsx            # Main dashboard
│   │   ├── learn/
│   │   │   └── page.tsx        # Learning section (TTS, Gender, Phrases)
│   │   └── quiz/
│   │       ├── page.tsx        # Quiz v2 entry
│   │       └── QuizPageClient.tsx
│   ├── components/
│   │   ├── QuizContainerV2.tsx # Quiz v2 logic
│   │   ├── ModeSelector.tsx    # Learn/Practice/Test selector
│   │   ├── Timer.tsx           # Countdown timer
│   │   ├── QuestionCard.tsx    # Sequential question card
│   │   ├── QuizResults.tsx     # Results summary
│   │   ├── TTSLearningButton.tsx # TTS for learning
│   │   └── GenderNounCard.tsx  # Gender trainer
│   └── data/
│       ├── questions.ts        # Lazy loading logic
│       └── learning-content.ts # Learning materials
├── e2e/                        # Playwright tests
├── CHANGELOG.md                # Version history
├── ARCHITECTURE.md             # Technical docs
├── USER_GUIDE.md               # User documentation
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

### ✅ Completed in v1.1.0
- [x] **Expand Question Bank**: 280 questions (was 80)
- [x] **Timer System**: Added to Test mode
- [x] **Sequential Quiz**: Question-by-question with feedback
- [x] **Learning Section**: TTS, Gender trainer, Phrases
- [x] **Quiz Modes**: Learn, Practice, Test

### 🚧 Planned for v1.2.0
- [ ] **Audio Files**: Replace TTS with high-quality static audio
- [ ] **No Replacement**: Track question history to avoid repetition
- [ ] **Writing Section**: Text input with AI grading
- [ ] **Speaking Section**: Audio recording with feedback
- [ ] **Animations**: Sound effects and smooth transitions
- [ ] **Hint System**: Hints for difficult questions

### 💡 Future Ideas
- [ ] **Leaderboard**: Compare progress with others
- [ ] **Offline Mode**: PWA support
- [ ] **Dark Mode**: German flag inspired theme
- [ ] **Export Progress**: PDF/certificate
- [ ] **Goethe A2**: Next level content

---

**Made with 💕 for Ine Maria**

14-day German A1 course that's easy and fun! 🇩🇪
