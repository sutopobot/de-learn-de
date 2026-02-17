/** @format */

// Quiz utility functions

import {
  Question,
  getRandomQuestions,
  getDifficultyForDay,
  calculateResult,
  QuizResult,
} from "../data/questions";

export interface QuizSession {
  questions: Question[];
  answers: (number | null)[];
  currentIndex: number;
  startTime: number;
  category: "hoeren" | "lesen";
}

// Initialize a new quiz session
export async function initializeQuiz(
  day: number,
  category: "hoeren" | "lesen"
): Promise<QuizSession> {
  const difficulty = getDifficultyForDay(day);
  // Map session IDs to question categories
  const questionCategory = category === "hoeren" ? "listening" : "reading";
  const questions = await getRandomQuestions(questionCategory, difficulty, 5);

  return {
    questions,
    answers: new Array(5).fill(null),
    currentIndex: 0,
    startTime: Date.now(),
    category,
  };
}

// Update answer for current question
export function updateAnswer(
  session: QuizSession,
  questionIndex: number,
  answerIndex: number
): QuizSession {
  const newAnswers = [...session.answers];
  newAnswers[questionIndex] = answerIndex;

  return {
    ...session,
    answers: newAnswers,
  };
}

// Navigate to next question
export function nextQuestion(session: QuizSession): QuizSession {
  if (session.currentIndex < session.questions.length - 1) {
    return {
      ...session,
      currentIndex: session.currentIndex + 1,
    };
  }
  return session;
}

// Navigate to previous question
export function previousQuestion(session: QuizSession): QuizSession {
  if (session.currentIndex > 0) {
    return {
      ...session,
      currentIndex: session.currentIndex - 1,
    };
  }
  return session;
}

// Check if all questions are answered
export function isQuizComplete(session: QuizSession): boolean {
  return session.answers.every((answer) => answer !== null);
}

// Get number of answered questions
export function getAnsweredCount(session: QuizSession): number {
  return session.answers.filter((answer) => answer !== null).length;
}

// Calculate and return final result
export function finalizeQuiz(session: QuizSession): QuizResult {
  return calculateResult(session.questions, session.answers);
}

// Get elapsed time in seconds
export function getElapsedTime(session: QuizSession): number {
  return Math.floor((Date.now() - session.startTime) / 1000);
}

// Format elapsed time as MM:SS
export function formatElapsedTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

// Check if user can use tomorrow's hearts
export function canUseTomorrowHearts(
  currentDay: number,
  totalDays: number = 14
): boolean {
  return currentDay < totalDays;
}

// Export other functions from questions.ts
export {
  getRandomQuestions,
  getDifficultyForDay,
  calculateResult,
  getQuestionsByCategoryAndDifficulty,
} from "../data/questions";
export type { Question, QuizResult } from "../data/questions";
