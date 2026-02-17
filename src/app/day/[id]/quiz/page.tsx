"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useProgress } from "../../../context/ProgressContext";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw, Home } from "lucide-react";
import QuizCard from "../../../../components/QuizCard";
import HeartsIndicator from "../../../../components/HeartsIndicator";
import { initializeQuiz, updateAnswer, nextQuestion, previousQuestion, isQuizComplete, getAnsweredCount, finalizeQuiz, formatElapsedTime, getElapsedTime, QuizSession, QuizResult } from "../../../../lib/quiz";

export default function QuizPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dayNum = parseInt(id as string);
  const category = searchParams.get("category") as "hoeren" | "lesen" | null;
  
  const { attemptQuiz, getHearts, progress, consumeHeartForHint } = useProgress();
  
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional mount flag
    setMounted(true);
  }, []);

  // Initialize quiz on mount
  useEffect(() => {
    if (!mounted) return;

    if (!category || (category !== "hoeren" && category !== "lesen")) {
      router.push(`/day/${dayNum}`);
      return;
    }

    const hearts = getHearts(dayNum);
    if (hearts <= 0) {
      router.push(`/day/${dayNum}`);
      return;
    }

    try {
      const session = initializeQuiz(dayNum, category);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Initialization on mount is intentional
      setQuizSession(session);
    } catch (error) {
      console.error("Failed to initialize quiz:", error);
      router.push(`/day/${dayNum}`);
    }
  }, [mounted, category, dayNum, router, getHearts]);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (!quizSession) return;
    
    setQuizSession(prev => {
      if (!prev) return null;
      return updateAnswer(prev, prev.currentIndex, answerIndex);
    });
  }, [quizSession]);

  const handleNext = useCallback(() => {
    if (!quizSession) return;
    setQuizSession(prev => {
      if (!prev) return null;
      return nextQuestion(prev);
    });
  }, [quizSession]);

  const handlePrevious = useCallback(() => {
    if (!quizSession) return;
    setQuizSession(prev => {
      if (!prev) return null;
      return previousQuestion(prev);
    });
  }, [quizSession]);

  const handleSubmit = useCallback(() => {
    if (!quizSession || !isQuizComplete(quizSession)) return;
    
    const result = finalizeQuiz(quizSession);
    setQuizResult(result);
    setShowResult(true);
    
    // Save progress
    attemptQuiz(dayNum, category as "hoeren" | "lesen", result.passed);
  }, [quizSession, dayNum, category, attemptQuiz]);

  const handleRetry = useCallback(() => {
    const hearts = getHearts(dayNum);
    if (hearts > 0) {
      // Re-initialize with new random questions
      const session = initializeQuiz(dayNum, category as "hoeren" | "lesen");
      setQuizSession(session);
      setQuizResult(null);
      setShowResult(false);
    }
  }, [dayNum, category, getHearts]);

  const handleGoBack = useCallback(() => {
    router.push(`/day/${dayNum}`);
  }, [router, dayNum]);

  if (!mounted || !quizSession) {
    return (
      <div className="min-h-screen bg-de-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-de-red mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quizSession.questions[quizSession.currentIndex];
  const answeredCount = getAnsweredCount(quizSession);
  const completed = isQuizComplete(quizSession);

  // Result View
  if (showResult && quizResult) {
    const passed = quizResult.passed;
    
    // Check if both sessions are completed after this one
    const dayData = progress.days[dayNum];
    const otherSessionCompleted = category === "hoeren" 
      ? dayData?.sessions.lesen.completed 
      : dayData?.sessions.hoeren.completed;
    const allSessionsCompleted = passed && otherSessionCompleted;
    const hasOtherSessionIncomplete = passed && !otherSessionCompleted;

    return (
      <div className="min-h-screen bg-de-gray flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 flex items-center border-b border-gray-100 sticky top-0 z-10">
          <button onClick={handleGoBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div className="ml-2 flex-1 text-center pr-10">
            <h1 className="text-sm font-black uppercase tracking-widest text-gray-400">Hasil Quiz</h1>
            <p className="text-xl font-black text-de-black leading-tight">
              {category === "hoeren" ? "Hören" : "Lesen"}
            </p>
          </div>
        </div>

        {/* Result Content */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center">
          <div className={`w-full max-w-md ${passed ? "bg-white" : "bg-white"} rounded-3xl p-8 shadow-lg text-center`}>
            {/* Icon */}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              passed ? "bg-green-100" : "bg-red-100"
            }`}>
              {passed ? (
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600" />
              )}
            </div>

            {/* Score */}
            <h2 className={`text-3xl font-black mb-2 ${passed ? "text-green-600" : "text-red-600"}`}>
              {passed ? "🎉 BERHASIL!" : "😔 BELUM BERHASIL"}
            </h2>
            
            <div className="text-5xl font-black text-de-black mb-2">
              {quizResult.correct}/{quizResult.total}
            </div>
            
            <div className="text-lg text-gray-600 mb-6">
              {quizResult.percentage}% Benar
            </div>

            {/* Feedback */}
            <div className={`p-4 rounded-xl mb-6 ${passed ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
              {passed ? (
                <p className="font-medium">
                  {hasOtherSessionIncomplete 
                    ? "Selamat! Sesi ini selesai. Kerjakan sesi lainnya untuk melanjutkan."
                    : "Selamat! Semua sesi hari ini selesai!"
                  }
                </p>
              ) : (
                <>
                  <p className="font-medium mb-2">
                    Anda perlu minimal 4/5 benar (80%) untuk lulus.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span>❤️ -1 (Nyawa terpakai)</span>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {passed ? (
                hasOtherSessionIncomplete ? (
                  // If passed but other session not done yet, go back to day page
                  <button
                    onClick={() => router.push(`/day/${dayNum}`)}
                    className="w-full bg-de-black text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                  >
                    Kembali ke Day Page
                    <ChevronRight size={20} />
                  </button>
                ) : allSessionsCompleted ? (
                  // If all sessions done, go to home
                  <button
                    onClick={() => router.push('/')}
                    className="w-full bg-green-500 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                  >
                    Hari Selesai! 🎉
                    <ChevronRight size={20} />
                  </button>
                ) : null
              ) : (
                <>
                  <button
                    onClick={handleRetry}
                    className="w-full bg-de-red text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                  >
                    <RotateCcw size={20} />
                    Coba Lagi
                  </button>
                  <p className="text-xs text-gray-500">
                    Soal akan diacak ulang dengan difficulty yang sama
                  </p>
                </>
              )}
              
              <button
                onClick={handleGoBack}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <Home size={18} />
                Kembali ke Day Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz View
  return (
    <div className="min-h-screen bg-de-gray flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button onClick={handleGoBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex-1 mx-4">
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-bold text-gray-400">
              {category === "hoeren" ? "🔊 Hören" : "📖 Lesen"}
            </span>
            <HeartsIndicator hearts={getHearts(dayNum)} size="sm" />
          </div>
        </div>

        <div className="w-10" /> {/* Spacer for balance */}
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-400">
            Progress: {answeredCount}/5
          </span>
          <span className="text-xs font-medium text-gray-400">
            {formatElapsedTime(getElapsedTime(quizSession))}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-de-red transition-all duration-300"
            style={{ width: `${((quizSession.currentIndex + 1) / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Quiz Content */}
      <div className="flex-1 p-6">
        <QuizCard
          question={currentQuestion}
          questionNumber={quizSession.currentIndex + 1}
          totalQuestions={5}
          selectedAnswer={quizSession.answers[quizSession.currentIndex]}
          onSelectAnswer={handleAnswerSelect}
          showResult={false}
          onConsumeHeartForHint={() => consumeHeartForHint(dayNum)}
          canConsumeHeart={getHearts(dayNum) > 0}
        />
      </div>

      {/* Navigation */}
      <div className="bg-white p-4 border-t border-gray-100">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={handlePrevious}
            disabled={quizSession.currentIndex === 0}
            className="flex items-center gap-1 px-4 py-3 rounded-xl font-bold text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} />
            Sebelumnya
          </button>

          {/* Question Dots */}
          <div className="flex items-center gap-1.5">
            {quizSession.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setQuizSession(prev => prev ? { ...prev, currentIndex: index } : null)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === quizSession.currentIndex
                    ? "bg-de-red w-6"
                    : quizSession.answers[index] !== null
                      ? "bg-green-400"
                      : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {quizSession.currentIndex < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-3 rounded-xl font-bold text-de-black hover:bg-gray-100 transition-colors"
            >
              Selanjutnya
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!completed}
              className="flex items-center gap-1 px-6 py-3 rounded-xl font-bold bg-de-red text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
            >
              Submit
              <CheckCircle2 size={20} />
            </button>
          )}
        </div>

        {!completed && quizSession.currentIndex === 4 && (
          <p className="text-center text-xs text-gray-500 mt-2">
            Jawab semua soal untuk submit
          </p>
        )}
      </div>
    </div>
  );
}
