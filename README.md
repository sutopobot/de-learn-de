# 🇩🇪 de-learn-de - Deutsch-Meister A1 Course Dashboard

Dashboard pembelajaran bahasa Jerman level A1 dengan kurikulum 14 hari, mobile-first design, dan sistem progress tracking otomatis.

> **de-learn-de**: "de" = sapaan akrab (dek/dik) + "learn" = belajar + "de" = Deutschland (Jerman)

---

## ✨ Fitur Utama

### 📱 Mobile-First Design
- Tampilan responsif khusus untuk smartphone
- Bottom navigation bar (Beranda, Belajar, Profil)
- Touch-friendly buttons dengan ukuran besar
- Single column layout dengan optimal spacing

### 📊 Progress System
- **Daily Locking**: Harus menyelesaikan semua 4 sesi hari ini untuk membuka hari besok
- **Streak Counter**: Meningkat setiap hari beruntun belajar
- **Local Storage**: Progress tersimpan otomatis di browser (tidak hilang saat refresh)
- **Auto-Unlock**: Langsung terbuka setelah hari selesai

### 🎯 4 Sesi Harian (A1 Standard)
1. **Hören (Listening)**: Audio player + pertanyaan pilihan ganda
2. **Lesen (Reading)**: Bacaan teks pendek + tipe jawab benar/salah
3. **Schreiben (Writing)**: Mengisi form atau menyusun kalimat
4. **Sprechen (Speaking)**: Interactive prompts dengan feedback

### 🎲 Random Question Engine
- Bank soal 80 pertanyaan (20 per kategori)
- Soal diacak setiap sesi
- Soal sering muncul lagi di hari berikutnya
- Struktur JSON dengan `id`, `category`, `difficulty`, `question`, `options`, `correctAnswer`, `explanation`

### 🎨 German Theme
- Warna aksen Jerman (Hitam #2a2a2a, Merah #d94e4e, Emas #f2c94c)
- Modern dan minimalis
- Background clean dengan soft shadows

---

## 🚀 Quick Start

### Development
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

### Deployment to Vercel

#### Option 1: Via Dashboard (Recommended)
1. Buka [Vercel.com](https://vercel.com) dan login
2. Klik **"Add New..."** → **"Project"**
3. Pilih repository `de-learn-de` dari GitHub
4. Klik **"Deploy"** - Vercel akan otomatis build & deploy

#### Option 2: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

Vercel akan otomatis:
- Mendeteksi framework Next.js
- Setup environment variables (jika ada)
- Build & deploy ke production
- Dapatkan public URL (contoh: `https://de-learn-de.vercel.app`)

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.6 | React framework dengan App Router |
| **TypeScript** | - | Type safety & better DX |
| **Tailwind CSS** | 4.0 | Utility-first CSS framework |
| **Lucide React** | - | Icon library |
| **Playwright** | 1.58.2 | E2E testing & screenshot capture |
| **Local Storage** | Browser API | Progress persistence |

---

## 📁 Project Structure

```
de-learn-de/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Dashboard utama (Home)
│   │   ├── layout.tsx        # Root layout dengan ProgressProvider
│   │   ├── globals.css       # Global styles & theme colors
│   │   ├── components/
│   │   │   └── BottomNav.tsx # Bottom navigation bar
│   │   ├── context/
│   │   │   └── ProgressContext.tsx # Progress logic & LocalStorage
│   │   ├── day/
│   │   │   └── [id]/         # Dynamic day routes (/[id]/page.tsx)
│   │   │       └── page.tsx  # Materi harian (4 sesi)
│   │   ├── learn/
│   │   │   └── page.tsx      # Halaman belajar
│   │   └── profile/
│   │       └── page.tsx      # Halaman profil
│   ├── data/
│   │   └── questions.json    # Bank soal 80 pertanyaan A1
│   └── types/                # TypeScript types (optional)
├── public/                   # Static assets (images, icons)
├── Dockerfile                # Container configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```

---

## 🎯 Curriculum (14 Hari)

### Fase 1: Dasar (Hari 1-5)
- Hari 1: Alphabets, Begrüßung (Greetings)
- Hari 2: Numbers 1-20
- Hari 3: Personal Pronouns, Present Tense
- Hari 4: Colors & Family
- Hari 5: Modal Verbs

### Fase 2: Kehidupan Sehari-hari (Hari 6-10)
- Hari 6: Food & Drinks
- Hari 7: Time & Daily Schedule
- Hari 8: Shopping & Money
- Hari 9: Directions & Places
- Hari 10: Weather & Seasons

### Fase 3: Pemantapan (Hari 11-14)
- Hari 11: Past Tense Basics
- Hari 12: Mock Test (Listening)
- Hari 13: Mock Test (Reading & Writing)
- Hari 14: Final Mock Test

---

## 🔧 Customization

### Menambah/Mengurangi Soal

Edit `src/data/questions.json`:
```json
{
  "id": 1,
  "category": "hoeren",
  "difficulty": "easy",
  "question": "Apa jawaban yang benar?",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "A",
  "explanation": "Jawaban A adalah yang paling logis..."
}
```

### Mengubah Theme Colors

Edit `src/app/globals.css`:
```css
@theme {
  --color-de-black: #2a2a2a;
  --color-de-red: #d94e4e;
  --color-de-gold: #f2c94c;
}
```

### Menambah Fitur Baru

Tambahkan component baru di `src/app/components/` dan import di halaman yang sesuai.

---

## 📊 Progress Data Structure

Progress disimpan di browser `localStorage` dengan key `german-progress`:

```json
{
  "days": {
    "1": {
      "unlocked": true,
      "completed": false,
      "sessions": {
        "hoeren": false,
        "lesen": false,
        "schreiben": false,
        "sprechen": false
      }
    },
    "2": {
      "unlocked": false,
      "completed": false,
      "sessions": { ... }
    }
  },
  "streak": 5,
  "lastCompletedDate": "2026-02-16"
}
```

---

## 🧪 Testing

### Build Test
```bash
npm run build
```
Expected: ✅ Compiled successfully with 0 errors

### Local Preview
```bash
npm start
```
Expected: ✓ Ready in ~500ms at http://localhost:3000

### Playwright Screenshot
```bash
node take-screenshot.js
```
Expected: Creates `screenshot.png` (iPhone 12 viewport)

---

## 🐳 Docker Deployment

Build Docker image:
```bash
docker build -t de-learn-de .
```

Run container:
```bash
docker run -p 3000:3000 de-learn-de
```

---

## 📝 Data Source

Bank soal saat ini berisi **80 pertanyaan A1** (20 per kategori). Soal diambil dari standar tes Goethe-Zertifikat A1 dan Telc Deutsch A1:

- **Listening**: Audio scenarios (simulated)
- **Reading**: Short texts & emails
- **Writing**: Form filling & sentence ordering
- **Speaking**: Short questions & responses

---

## 🔐 Environment Variables (Optional)

```env
NEXT_PUBLIC_API_URL=  # For future API integration
```

---

## 📱 Mobile Responsiveness

- **Minimum width**: 320px
- **Optimal width**: 375px (iPhone SE/12 mini)
- **Recommended width**: 414px (iPhone 12/13 Pro Max)
- **Landscape mode**: Optimized for portrait-first layout

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

## 🙏 Credits

- Built for **Ine Maria** - 14-day German A1 course
- Framework: **Next.js 16.1.6**
- Language: **Bahasa Indonesia & Jerman**

---

**Made with 💕 for Ine's German learning journey**

