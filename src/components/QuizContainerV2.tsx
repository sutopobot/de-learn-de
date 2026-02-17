"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { Question, getRandomQuestions, getDifficultyForDay } from "../data/questions";
import QuestionCard from "./QuestionCard";
import Timer from "./Timer";
import HeartsIndicator from "./HeartsIndicator";
import QuizResults from "./QuizResults";

export type QuizMode = "learn" | "practice" | "test";

interface QuizConfig {
  questionCount: number;
  hasTimer: boolean;
  timerMinutes: number;
  immediateFeedback: boolean;
}

const modeConfigs: Record<QuizMode, QuizConfig> = {
  learn: {
    questionCount: 5,
    hasTimer: false,
    timerMinutes: 0,
    immediateFeedback: true,
  },
  practice: {
    questionCount: 10,
    hasTimer: true,
    timerMinutes: 30,
    immediateFeedback: true,
  },
  test: {
    questionCount: 15,
    hasTimer: true,
    timerMinutes: 25,
    immediateFeedback: false,
  },
};

interface QuizContainerV2Props {
  day: number;
  category: "hoeren" | "lesen";
  mode: QuizMode;
  enableTimer: boolean;
  hearts: number;
  onConsumeHeartForHint: () => boolean;
  onComplete: (score: number, total: number, passed: boolean) => void;
  onRetry: () => void;
  onBack: () => void;
}

export default function QuizContainerV2({
  day,
  category,
  mode,
  enableTimer,
  hearts,
  onConsumeHeartForHint,
  onComplete,
  onRetry,
  onBack,
}: QuizContainerV2Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const config = modeConfigs[mode];
  const timerEnabled = config.hasTimer && enableTimer;

  // Initialize quiz
  useEffect(() => {
    const initQuiz = async () => {
      try {
        const difficulty = getDifficultyForDay(day);
        const questionCategory = category === "hoeren" ? "listening" : "reading";
        const loadedQuestions = await getRandomQuestions(
          questionCategory,
          difficulty,
          config.questionCount
        );
        setQuestions(loadedQuestions);
        setAnswers(new Array(config.questionCount).fill(null));
        setStartTime(Date.now());
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load questions:", error);
      }
    };

    initQuiz();
  }, [day, category, config.questionCount]);

  // Track elapsed time
  useEffect(() => {
    if (!startTime || isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isComplete]);

  const handleAnswerSelect = useCallback(
    (answerIndex: number) => {
      if (showFeedback) return; // Prevent changing answer during feedback

      const newAnswers = [...answers];
      newAnswers[currentIndex] = answerIndex;
      setAnswers(newAnswers);

      // For immediate feedback modes, show result right away
      if (config.immediateFeedback) {
        const currentQuestion = questions[currentIndex];
        const selectedOption = currentQuestion.options[answerIndex];
        const correct = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setShowFeedback(true);
      }
    },
    [answers, currentIndex, questions, config.immediateFeedback, showFeedback]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      // Quiz complete
      finishQuiz();
    }
  }, [currentIndex, questions.length]);

  const finishQuiz = useCallback(() => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      const answerIndex = answers[index];
      if (answerIndex !== null) {
        const selectedOption = question.options[answerIndex];
        if (selectedOption === question.correctAnswer) {
          correctCount++;
        }
      }
    });

    const total = questions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const passed = percentage >= 60; // Goethe standard: 60%

    setScore(correctCount);
    setIsComplete(true);
    onComplete(correctCount, total, passed);
  }, [questions, answers, onComplete]);

  const handleTimeUp = useCallback(() => {
    // Auto-submit when time runs out
    finishQuiz();
  }, [finishQuiz]);

  const handleSubmitTest = useCallback(() => {
    finishQuiz();
  }, [finishQuiz]);

  // Show results when complete
  if (isComplete) {
    return (
      <QuizResults
        score={score}
        total={questions.length}
        passed={score / questions.length >= 0.6}
        questions={questions}
        userAnswers={answers}
        mode={mode}
        timeSpent={elapsedTime}
        onRetry={onRetry}
        onBack={onBack}
      />
    );
  }

  if (isLoading || questions.length === 0) {
    return (
      <div className="min-h-screen bg-de-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-de-red mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isAnswered = answers[currentIndex] !== null;
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-de-gray flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex-1 mx-4">
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-bold text-gray-400">
              {category === "hoeren" ? "🔊 Hören" : "📖 Lesen"}
            </span>
            <HeartsIndicator hearts={hearts} size="sm" />
          </div>
        </div>

        <div className="w-10" />
      </div>

      {/* Timer (if enabled) */}
      {timerEnabled && (
        <div className="bg-white px-4 pb-2">
          <Timer
            initialMinutes={config.timerMinutes}
            onTimeUp={handleTimeUp}
            isPaused={showFeedback && config.immediateFeedback}
          />
        </div>
      )}

      {/* Progress Bar */}
      <div className="bg-white px-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-400">
            Progress: {currentIndex + 1}/{questions.length}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {Math.round(((currentIndex + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-de-red transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 p-6">
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={answers[currentIndex]}
          onSelectAnswer={handleAnswerSelect}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
          correctAnswer={currentQuestion.correctAnswer}
          explanation={currentQuestion.explanation}
          onConsumeHeartForHint={onConsumeHeartForHint}
          canConsumeHeart={hearts > 0}
          mode={mode}
        />
      </div>

      {/* Navigation Footer */}
      <div className="bg-white p-4 border-t border-gray-100">
        <div className="max-w-md mx-auto">
          {config.immediateFeedback ? (
            // Learn/Practice Mode: Show Next button after feedback
            showFeedback ? (
              <button
                onClick={handleNext}
                className="w-full bg-de-red text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
              >
                {isLastQuestion ? (
                  <>
                    <CheckCircle2 size={20} />
                    Selesai
                  </>
                ) : (
                  <>
                    Soal Berikutnya
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            ) : (
              <div className="text-center text-gray-400 text-sm">
                Pilih jawaban untuk melihat feedback
              </div>
            )
          ) : (
            // Test Mode: Show Submit button on last question
            <div className="space-y-3">
              {isLastQuestion ? (
                <button
                  onClick={handleSubmitTest}
                  disabled={!isAnswered}
                  className="w-full bg-de-red text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 size={20} />
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="w-full bg-de-black text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Soal Berikutnya
                  <ChevronRight size={20} />
                </button>
              )}
              <p className="text-center text-xs text-gray-500">
                {isAnswered
                  ? "Jawaban tersimpan"
                  : "Jawab soal ini untuk melanjutkan"}
              </p>
            </div>
          )}

          {/* Question Navigation Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!showFeedback || config.immediateFeedback) {
                    setCurrentIndex(index);
                    setShowFeedback(false);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-de-red w-6"
                    : answers[index] !== null
                    ? "bg-green-400"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
