# Architecture Documentation

**Project:** de-learn-de  
**Version:** 1.1.0  
**Last Updated:** 2026-02-17

---

## 📁 Directory Structure

```
projects/de-learn-de/
├── data/
│   ├── questions/              # Split JSON question files
│   │   ├── listening-easy.json
│   │   ├── listening-medium.json
│   │   ├── listening-hard.json
│   │   ├── reading-easy.json
│   │   ├── reading-medium.json
│   │   ├── reading-hard.json
│   │   ├── writing-easy.json
│   │   ├── writing-medium.json
│   │   ├── writing-hard.json
│   │   ├── speaking-easy.json
│   │   ├── speaking-medium.json
│   │   └── speaking-hard.json
│   └── questions.json.backup   # Original 80 questions
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Homepage
│   │   ├── about/
│   │   ├── day/
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── quiz/
│   │   ├── learn/
│   │   │   └── page.tsx        # Learning section
│   │   └── quiz/               # Quiz v2 entry
│   │       ├── page.tsx
│   │       └── QuizPageClient.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── QuizContainerV2.tsx # Main quiz logic (v2)
│   │   ├── ModeSelector.tsx    # Quiz mode selection
│   │   ├── Timer.tsx           # Countdown timer
│   │   ├── QuestionCard.tsx    # Single question display
│   │   ├── QuizResults.tsx     # Results summary
│   │   ├── TTSLearningButton.tsx # TTS for learning
│   │   └── GenderNounCard.tsx  # Gender learning cards
│   ├── data/
│   │   ├── course-data.ts      # 14-day curriculum
│   │   ├── learning-content.ts # Learning materials
│   │   └── questions.ts        # Question loading logic
│   ├── hooks/
│   │   └── useProgress.ts      # Progress tracking
│   └── lib/
│       ├── utils.ts
│       └── quiz.ts             # Quiz utilities
├── public/
│   └── images/
├── e2e/                        # Playwright tests (optional)
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 🧩 Component Architecture

### Quiz System v2

```
QuizPageClient (Entry)
    ├── ModeSelector (if no mode selected)
    └── QuizContainerV2 (Main container)
            ├── Timer (conditional)
            ├── QuestionCard (current question)
            │       ├── Question text
            │       ├── Options (A,B,C,D)
            │       └── Submit → Feedback
            └── QuizResults (when finished)
                    ├── Score/Percentage
                    ├── Pass/Fail status
                    └── Wrong answer review
```

### Learning Section

```
LearnPage
    ├── Tab Navigation (5 tabs)
    │       ├── Tips 💡
    │       ├── Kosakata 📖
    │       ├── Der/Die/Das 🎓
    │       ├── Frasa 💬
    │       └── Pengucapan 🎙️
    ├── TTSLearningButton (in each section)
    └── GenderNounCard (in Der/Die/Das tab)
            ├── Color-coded noun cards
            └── Gender quiz
```

---

## 📊 Data Flow

### Question Loading (Lazy)

```
User selects quiz
    ↓
loadQuestions(category, difficulty)
    ↓
Dynamic import: data/questions/{category}-{difficulty}.json
    ↓
Cache in memory
    ↓
Return questions array
```

### Progress Tracking

```
User completes question
    ↓
Update localStorage
    ↓
Sync to React state
    ↓
Update UI (progress bars, streak, hearts)
```

---

## 🔧 Key Technologies

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.1.6 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Library | shadcn/ui |
| Icons | Lucide React |
| State | React hooks + localStorage |
| TTS | Web Speech API |
| Testing | Playwright (optional) |

---

## 🎯 State Management

### Local Storage Keys

| Key | Purpose |
|-----|---------|
| `de-learn-de-progress` | Day unlock status |
| `de-learn-de-hearts` | Hearts count |
| `de-learn-hearts-date` | Last hearts reset date |
| `de-learn-streak` | Current streak |
| `de-learn-streak-date` | Last streak update |
| `de-learn-last-visit` | Last visit timestamp |
| `learned-items` | Marked as learned items |

---

## 🚀 Performance Optimizations

1. **Lazy Loading:** Questions loaded on-demand by category/difficulty
2. **Static Generation:** Homepage and learn page pre-rendered
3. **Image Optimization:** Next.js Image component
4. **Code Splitting:** Dynamic imports for heavy components
5. **Caching:** Question data cached in memory after first load

---

## 📝 Adding New Questions

1. Add questions to appropriate JSON file:
   ```json
   {
     "id": 101,
     "category": "listening",
     "difficulty": "easy",
     "question": "...",
     "options": ["A", "B", "C", "D"],
     "correctAnswer": "B",
     "explanation": "..."
   }
   ```

2. Ensure ID is unique across all files
3. Restart dev server to reload

---

## 🔒 Security Notes

- No user authentication (local progress only)
- No sensitive data stored
- localStorage data is client-side only
- No API keys exposed in frontend

---

For more details, see:
- `README.md` - Project overview
- `CHANGELOG.md` - Version history
- `USER_GUIDE.md` - User documentation
