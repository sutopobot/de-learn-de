"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useProgress } from "../context/ProgressContext";
import ModeSelector, { QuizMode } from "../../components/ModeSelector";
import QuizContainerV2 from "../../components/QuizContainerV2";
import { AlertCircle } from "lucide-react";

export default function QuizPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as "hoeren" | "lesen" | null;
  const dayParam = searchParams.get("day");
  const day = dayParam ? parseInt(dayParam) : 1;

  const { getHearts, attemptQuiz, consumeHeartForHint } = useProgress();

  const [selectedMode, setSelectedMode] = useState<QuizMode | null>(null);
  const [enableTimer, setEnableTimer] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);

  // Validate category
  if (!category || (category !== "hoeren" && category !== "lesen")) {
    return (
      <div className="min-h-screen bg-de-gray flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-de-black mb-2">Kategori Tidak Valid</h1>
          <p className="text-gray-600 mb-6">
            Silakan pilih kategori quiz yang valid (Hören atau Lesen).
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-de-red text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const hearts = getHearts(day);

  // Check if user has hearts
  if (hearts <= 0 && !quizStarted) {
    return (
      <div className="min-h-screen bg-de-gray flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-md">
          <div className="text-6xl mb-4">💔</div>
          <h1 className="text-2xl font-black text-de-black mb-2">Nyawa Habis!</h1>
          <p className="text-gray-600 mb-6">
            Nyawamu sudah habis untuk hari ini. Tunggu reset besok atau gunakan
            nyawa dari hari berikutnya.
          </p>
          <button
            onClick={() => router.push(`/day/${day}`)}
            className="bg-de-red text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
          >
            Kembali ke Day Page
          </button>
        </div>
      </div>
    );
  }

  const handleSelectMode = (mode: QuizMode, timerEnabled: boolean) => {
    setSelectedMode(mode);
    setEnableTimer(timerEnabled);
    setQuizStarted(true);
  };

  const handleQuizComplete = (
    score: number,
    total: number,
    passed: boolean
  ) => {
    // Save progress
    attemptQuiz(day, category, passed);
  };

  const handleRetry = () => {
    // Reset quiz state to show mode selector again
    setQuizStarted(false);
    setSelectedMode(null);
  };

  const handleBack = () => {
    router.push(`/day/${day}`);
  };

  // Show mode selector if quiz hasn't started
  if (!quizStarted) {
    return (
      <ModeSelector
        category={category}
        onSelectMode={handleSelectMode}
        onBack={handleBack}
      />
    );
  }

  // Show quiz container
  return (
    <QuizContainerV2
      day={day}
      category={category}
      mode={selectedMode!}
      enableTimer={enableTimer}
      hearts={hearts}
      onConsumeHeartForHint={() => consumeHeartForHint(day)}
      onComplete={handleQuizComplete}
      onRetry={handleRetry}
      onBack={handleBack}
    />
  );
}
