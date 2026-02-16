# de-learn-de 🇩🇪

Ine Maria's German A1 course dashboard. A 14-day interactive course that's mobile-first and gamified.

## 🎯 What is de-learn-de?

- **de** = affectionate address (dee/kik)
- **learn** = to learn
- **de** = Deutschland (Germany)

> "de-learn-de" = Learn German with someone you love

---

## ✨ Features

- **14-Day A1 Curriculum** - Daily sessions: Hören (Listening), Lesen (Reading), Schreiben (Writing), Sprechen (Speaking)
- **Progress Locked** - Must finish all 4 sessions today before tomorrow unlocks
- **Streak Counter** - Tracks consecutive learning days
- **80 A1 Questions** - Question bank randomly generates new quizzes
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
3. **Complete 4 Sessions** - Hören, Lesen, Schreiben, Sprechen
4. **Auto-Progress** - Once all green, tomorrow automatically unlocks
5. **Continue Now** - No need to refresh or send messages

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

## 📊 Progress System

Progress is saved to browser with key `german-progress`:

```json
{
  "days": {
    "1": { "unlocked": true, "completed": false, "sessions": { ... } },
    "2": { "unlocked": false, "completed": false, "sessions": { ... } }
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
│   │   ├── page.tsx          # Main dashboard
│   │   ├── context/
│   │   │   └── ProgressContext.tsx  # Progress logic
│   │   ├── day/
│   │   │   └── [id]/page.tsx       # Daily material
│   │   ├── components/
│   │   │   └── BottomNav.tsx       # Bottom nav
│   │   └── globals.css        # Theme colors
│   └── data/
│       └── questions.json     # Bank soal 80 pertanyaan
├── Dockerfile                # Container config
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

**Made with 💕 for Ine Maria**

14-day German A1 course that's easy and fun! 🇩🇪
