/** @format */

export interface Question {
  id: number;
  category: "listening" | "reading" | "writing" | "speaking";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// Lazy loading cache
const questionCache: Map<string, Question[]> = new Map();

// Dynamic import function for questions
export async function loadQuestions(
  category: "listening" | "reading" | "writing" | "speaking",
  difficulty: "easy" | "medium" | "hard"
): Promise<Question[]> {
  const cacheKey = `${category}-${difficulty}`;
  
  // Return cached questions if available
  if (questionCache.has(cacheKey)) {
    return questionCache.get(cacheKey)!;
  }

  try {
    // Dynamic import based on category and difficulty
    const module = await import(`../../data/questions/${category}-${difficulty}.json`);
    const questions: Question[] = module.default || module;
    
    // Cache the loaded questions
    questionCache.set(cacheKey, questions);
    
    return questions;
  } catch (error) {
    console.error(`Failed to load questions for ${category}-${difficulty}:`, error);
    return [];
  }
}

// Load all questions for a category
export async function loadQuestionsByCategory(
  category: "listening" | "reading" | "writing" | "speaking"
): Promise<Question[]> {
  const difficulties: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"];
  
  const allQuestions = await Promise.all(
    difficulties.map(difficulty => loadQuestions(category, difficulty))
  );
  
  return allQuestions.flat();
}

// Load all questions (for initial load or full refresh)
export async function loadAllQuestions(): Promise<Question[]> {
  const categories: ("listening" | "reading" | "writing" | "speaking")[] = 
    ["listening", "reading", "writing", "speaking"];
  
  const allQuestions = await Promise.all(
    categories.map(category => loadQuestionsByCategory(category))
  );
  
  return allQuestions.flat();
}

// Get questions by category and difficulty (sync version - requires pre-loading)
export function getQuestionsByCategoryAndDifficulty(
  category: "listening" | "reading" | "writing" | "speaking",
  difficulty: "easy" | "medium" | "hard"
): Question[] {
  const cacheKey = `${category}-${difficulty}`;
  return questionCache.get(cacheKey) || [];
}

// Get random questions with replacement
export async function getRandomQuestions(
  category: "listening" | "reading" | "writing" | "speaking",
  difficulty: "easy" | "medium" | "hard",
  count: number = 5
): Promise<Question[]> {
  const pool = await loadQuestions(category, difficulty);

  if (pool.length === 0) {
    console.warn(
      `No questions found for ${category} + ${difficulty}, using all available`
    );
    // Fallback to all questions of that category
    const fallbackPool = await loadQuestionsByCategory(category);
    if (fallbackPool.length === 0) {
      throw new Error(`No questions available for category: ${category}`);
    }

    const selected = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * fallbackPool.length);
      selected.push(fallbackPool[randomIndex]);
    }
    return selected;
  }

  const selected = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    selected.push(pool[randomIndex]);
  }
  return selected;
}

// Get difficulty based on day number
export function getDifficultyForDay(
  day: number
): "easy" | "medium" | "hard" {
  if (day >= 1 && day <= 4) return "easy";
  if (day >= 5 && day <= 8) return "medium";
  return "hard";
}

// Calculate quiz result
export interface QuizResult {
  correct: number;
  total: number;
  passed: boolean;
  percentage: number;
}

export function calculateResult(
  questions: Question[],
  answers: (number | null)[]
): QuizResult {
  let correct = 0;

  questions.forEach((question, index) => {
    const answerIndex = answers[index];
    if (answerIndex !== null) {
      const selectedOption = question.options[answerIndex];
      if (selectedOption === question.correctAnswer) {
        correct++;
      }
    }
  });

  const total = questions.length;
  const percentage = Math.round((correct / total) * 100);
  const passed = correct >= 4; // Need at least 4/5 to pass (80%)

  return {
    correct,
    total,
    passed,
    percentage,
  };
}

// Check if user can attempt quiz (has hearts)
export function canAttemptQuiz(hearts: number): boolean {
  return hearts > 0;
}

// Get heart emoji display
export function getHeartsDisplay(
  hearts: number,
  maxHearts: number = 3
): string {
  const filled = "❤️".repeat(hearts);
  const empty = "💔".repeat(maxHearts - hearts);
  return filled + empty;
}

// Statistics functions
export async function getQuestionCounts(): Promise<{
  listening: { easy: number; medium: number; hard: number; total: number };
  reading: { easy: number; medium: number; hard: number; total: number };
  writing: { easy: number; medium: number; hard: number; total: number };
  speaking: { easy: number; medium: number; hard: number; total: number };
  total: number;
}> {
  const categories: ("listening" | "reading" | "writing" | "speaking")[] = 
    ["listening", "reading", "writing", "speaking"];
  const difficulties: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"];
  
  const counts = {
    listening: { easy: 0, medium: 0, hard: 0, total: 0 },
    reading: { easy: 0, medium: 0, hard: 0, total: 0 },
    writing: { easy: 0, medium: 0, hard: 0, total: 0 },
    speaking: { easy: 0, medium: 0, hard: 0, total: 0 },
    total: 0
  };

  for (const category of categories) {
    for (const difficulty of difficulties) {
      const questions = await loadQuestions(category, difficulty);
      counts[category][difficulty] = questions.length;
      counts[category].total += questions.length;
      counts.total += questions.length;
    }
  }

  return counts;
}
