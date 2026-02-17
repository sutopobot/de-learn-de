# Questions Roadmap - de-learn-de

## 📊 Current Status Overview

**Last Updated:** 2026-02-17

### Total Question Count: 280 ✅

| Category | Easy | Medium | Hard | Total | Target | Status |
|----------|------|--------|------|-------|--------|--------|
| **Listening** | 30 | 20 | 20 | 70 | 70 | ✅ Complete |
| **Reading** | 30 | 20 | 20 | 70 | 70 | ✅ Complete |
| **Writing** | 30 | 20 | 20 | 70 | 70 | ✅ Complete |
| **Speaking** | 30 | 20 | 20 | 70 | 70 | ✅ Complete |
| **TOTAL** | **120** | **80** | **80** | **280** | 280+ | ✅ Complete |

### Target Breakdown

| Difficulty | Target per Category | Current | Status |
|------------|---------------------|---------|--------|
| Easy | 25-30 | 30 | ✅ Exceeds target |
| Medium | 15-20 | 20 | ✅ Exceeds target |
| Hard | 15-20 | 20 | ✅ Exceeds target |

---

## 📁 File Structure

```
data/questions/
├── listening-easy.json    (30 questions)
├── listening-medium.json  (20 questions)
├── listening-hard.json    (20 questions)
├── reading-easy.json      (30 questions)
├── reading-medium.json    (20 questions)
├── reading-hard.json      (20 questions)
├── writing-easy.json      (30 questions)
├── writing-medium.json    (20 questions)
├── writing-hard.json      (20 questions)
├── speaking-easy.json     (30 questions)
├── speaking-medium.json   (20 questions)
└── speaking-hard.json     (20 questions)
```

---

## ✅ Topics Covered Checklist (Goethe A1 Curriculum)

### 1. Personal Information (Name, Age, Origin, Languages)
- [x] Listening: Introductions, names, origins
- [x] Reading: Forms asking for personal data
- [x] Writing: Verb conjugations (heißen, kommen, sein)
- [x] Speaking: Self-introduction phrases

### 2. Numbers 0-1000, Time, Dates
- [x] Listening: Prices, times, phone numbers
- [x] Reading: Schedules, opening hours
- [x] Writing: Number words, date formats
- [x] Speaking: Asking and telling time

### 3. Family & Relationships
- [x] Listening: Family member descriptions
- [x] Reading: Family announcements
- [x] Writing: Possessive articles (mein, dein)
- [x] Speaking: Talking about family

### 4. Daily Routines (Activities, Hobbies)
- [x] Listening: Describing daily activities
- [x] Reading: Hobby advertisements
- [x] Writing: Reflexive verbs, time expressions
- [x] Speaking: Asking about hobbies

### 5. Food & Drink (Ordering, Restaurants)
- [x] Listening: Restaurant orders, menu items
- [x] Reading: Menus, food advertisements
- [x] Writing: Food vocabulary, articles
- [x] Speaking: Ordering food and drinks

### 6. Shopping (Clothes, Prices, Quantities)
- [x] Listening: Price inquiries, sizes
- [x] Reading: Price tags, sales signs
- [x] Writing: Numbers, quantities
- [x] Speaking: Shopping dialogues

### 7. Housing (Rooms, Furniture, Directions)
- [x] Listening: Room descriptions, directions
- [x] Reading: Apartment ads, room signs
- [x] Writing: Prepositions (in, auf, unter)
- [x] Speaking: Asking about accommodations

### 8. Work & Professions
- [x] Listening: Job descriptions, workplace
- [x] Reading: Job advertisements
- [x] Writing: Professional vocabulary
- [x] Speaking: Talking about work

### 9. Weather & Seasons
- [x] Listening: Weather forecasts
- [x] Reading: Weather reports
- [x] Writing: Weather vocabulary
- [x] Speaking: Discussing weather

### 10. Body Parts & Health
- [x] Listening: Health complaints, doctor visits
- [x] Reading: Pharmacy signs, health tips
- [x] Writing: Health-related vocabulary
- [x] Speaking: Describing symptoms

### 11. Transport & Travel
- [x] Listening: Train announcements, directions
- [x] Reading: Timetables, travel signs
- [x] Writing: Transport vocabulary
- [x] Speaking: Asking for directions

### 12. City & Directions
- [x] Listening: Location descriptions
- [x] Reading: City maps, signs
- [x] Writing: Directional prepositions
- [x] Speaking: Giving and asking directions

### 13. Appointments & Calendar
- [x] Listening: Making appointments
- [x] Reading: Calendar entries, schedules
- [x] Writing: Days, months, dates
- [x] Speaking: Scheduling meetings

---

## 🎯 Next Expansion Priorities

### Phase 2 Expansion (Target: 400+ questions)

#### High Priority (Goethe A1+ bridging to A2)
1. **Listening**
   - [ ] Add 10 medium questions with longer dialogues
   - [ ] Add 10 hard questions with multiple speakers
   - [ ] Focus: Phone conversations, announcements

2. **Reading**
   - [ ] Add 10 medium questions with short emails
   - [ ] Add 10 hard questions with simple forms
   - [ ] Focus: Official letters, instructions

3. **Writing**
   - [ ] Add 10 medium questions on sentence building
   - [ ] Add 10 hard questions on paragraph completion
   - [ ] Focus: Formal/informal register

4. **Speaking**
   - [ ] Add 10 medium questions on situation responses
   - [ ] Add 10 hard questions on extended dialogues
   - [ ] Focus: Phone conversations, complaints

#### Medium Priority
- [ ] Add image-based listening questions
- [ ] Add fill-in-the-blank writing questions
- [ ] Add role-play scenario speaking questions
- [ ] Add multiple-text comparison reading questions

#### Low Priority (Nice to Have)
- [ ] Add cultural context questions
- [ ] Add regional dialect exposure (light)
- [ ] Add idiomatic expressions
- [ ] Add joke/humor comprehension questions

---

## 📝 Question Format Specification

Each question follows this JSON schema:

```json
{
  "id": number,
  "category": "listening" | "reading" | "writing" | "speaking",
  "difficulty": "easy" | "medium" | "hard",
  "question": string,
  "options": string[4],
  "correctAnswer": string,
  "explanation": string
}
```

### ID Numbering Convention
- **Listening:** 1xx (easy), 2xx (medium), 3xx (hard)
- **Reading:** 4xx (easy), 5xx (medium), 6xx (hard)
- **Writing:** 7xx (easy), 8xx (medium), 9xx (hard)
- **Speaking:** 10xx (easy), 11xx (medium), 12xx (hard)

---

## 🔧 Technical Implementation

### Lazy Loading
The application now uses dynamic imports for question loading:

```typescript
// Load specific category and difficulty
const questions = await loadQuestions('listening', 'easy');

// Load all questions for a category
const allListening = await loadQuestionsByCategory('listening');

// Load all questions
const allQuestions = await loadAllQuestions();

// Get statistics
const counts = await getQuestionCounts();
```

### Caching
- Questions are cached after first load
- Cache key: `${category}-${difficulty}`
- Reduces network requests for repeated quizzes

---

## 📈 Usage Statistics (To be tracked)

- Most played category: _TBD_
- Most difficult category (by pass rate): _TBD_
- Average completion time per difficulty: _TBD_
- Questions with highest error rate: _TBD_

---

## 🔄 Maintenance Notes

### Regular Tasks
- [ ] Review questions with high error rates monthly
- [ ] Add seasonal/timely questions (holidays, events)
- [ ] Check for duplicate questions across categories
- [ ] Verify translations and explanations

### Quality Assurance
- [ ] All questions reviewed by native speaker
- [ ] Audio files for listening questions (future)
- [ ] Images for visual support (future)

---

## 🚀 Future Enhancements

1. **Adaptive Difficulty**: Adjust difficulty based on user performance
2. **Spaced Repetition**: Track missed questions for review
3. **Topic Filtering**: Allow users to practice specific topics
4. **Progress Tracking**: Show mastered vs. learning topics
5. **Community Questions**: Allow user-submitted questions (moderated)

---

*This roadmap is a living document. Update as the question bank grows and curriculum requirements change.*
