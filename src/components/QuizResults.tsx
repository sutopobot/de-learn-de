"use client";

import { CheckCircle2, XCircle, RotateCcw, Home, BookOpen } from "lucide-react";
import { Question } from "../data/questions";

interface QuizResultsProps {
  score: number;
  total: number;
  passed: boolean;
  questions: Question[];
  userAnswers: (number | null)[];
  mode: "learn" | "practice" | "test";
  timeSpent?: number; // in seconds
  onRetry: () => void;
  onBack: () => void;
  onReview?: () => void;
}

export default function QuizResults({
  score,
  total,
  passed,
  questions,
  userAnswers,
  mode,
  timeSpent,
  onRetry,
  onBack,
  onReview,
}: QuizResultsProps) {
  const percentage = Math.round((score / total) * 100);
  const passThreshold = 60; // Goethe standard

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Get wrong answers for review
  const wrongAnswers = questions
    .map((q, idx) => ({
      question: q,
      userAnswer: userAnswers[idx],
      correctAnswer: q.options.findIndex((opt) => opt === q.correctAnswer),
      questionNum: idx + 1,
    }))
    .filter(
      (item) =>
        item.userAnswer === null ||
        item.question.options[item.userAnswer] !== item.question.correctAnswer
    );

  const getModeLabel = () => {
    switch (mode) {
      case "learn":
        return "Learn Mode";
      case "practice":
        return "Practice Mode";
      case "test":
        return "Test Mode";
    }
  };

  const getFeedbackMessage = () => {
    if (percentage >= 90) return "Hervorragend! 🌟";
    if (percentage >= 80) return "Sehr gut! 👏";
    if (percentage >= 60) return "Gut gemacht! 👍";
    return "Terus berlatih! 💪";
  };

  return (
    <div className="min-h-screen bg-de-gray flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-center border-b border-gray-100 sticky top-0 z-10">
        <div className="text-center">
          <h1 className="text-sm font-black uppercase tracking-widest text-gray-400">
            Hasil Quiz
          </h1>
          <p className="text-xl font-black text-de-black leading-tight">
            {getModeLabel()}
          </p>
        </div>
      </div>

      {/* Result Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-6">
          {/* Score Card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
            {/* Icon */}
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                passed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {passed ? (
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              ) : (
                <XCircle className="w-12 h-12 text-red-600" />
              )}
            </div>

            {/* Status */}
            <h2
              className={`text-3xl font-black mb-2 ${
                passed ? "text-green-600" : "text-red-600"
              }`}
            >
              {passed ? "🎉 LULUS!" : "😔 BELUM LULUS"}
            </h2>

            <p className="text-lg text-gray-600 mb-6">{getFeedbackMessage()}</p>

            {/* Score Display */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-5xl font-black text-de-black">{score}</span>
                <span className="text-2xl text-gray-400">/{total}</span>
              </div>
              <div className="text-3xl font-black text-de-red mb-1">
                {percentage}%
              </div>
              <p className="text-sm text-gray-500">
                Minimal {passThreshold}% untuk lulus
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-xs text-green-600 font-bold mb-1">Benar</p>
                <p className="text-2xl font-black text-green-700">{score}</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-xs text-red-600 font-bold mb-1">Salah</p>
                <p className="text-2xl font-black text-red-700">{total - score}</p>
              </div>
            </div>

            {timeSpent && (
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <span>⏱️ Waktu:</span>
                <span className="font-bold">{formatTime(timeSpent)}</span>
              </div>
            )}
          </div>

          {/* Wrong Answers Review */}
          {wrongAnswers.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-black text-lg text-de-black mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-de-red" />
                Review Jawaban Salah
              </h3>
              <div className="space-y-4">
                {wrongAnswers.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <p className="font-bold text-sm text-gray-800 mb-2">
                      {item.questionNum}. {item.question.question}
                    </p>
                    <div className="space-y-1 text-sm">
                      <p className="text-red-600">
                        ❌ Jawabanmu: {" "}
                        {item.userAnswer !== null
                          ? item.question.options[item.userAnswer]
                          : "Tidak dijawab"}
                      </p>
                      <p className="text-green-600">
                        ✅ Benar: {item.question.correctAnswer}
                      </p>
                      <p className="text-gray-500 text-xs mt-2 bg-gray-50 p-2 rounded">
                        💡 {item.question.explanation}
                      </p>
                    </div>
                  </div>
                ))}
                {wrongAnswers.length > 3 && (
                  <p className="text-center text-sm text-gray-500">
                    ...dan {wrongAnswers.length - 3} soal lainnya
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onRetry}
              className="w-full bg-de-red text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
            >
              <RotateCcw size={20} />
              Coba Lagi
            </button>

            <button
              onClick={onBack}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
            >
              <Home size={18} />
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
