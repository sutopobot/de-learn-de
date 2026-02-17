"use client";

import { useState } from "react";
import { BookOpen, Target, Trophy, Clock, CheckCircle } from "lucide-react";

export type QuizMode = "learn" | "practice" | "test";

interface QuizModeConfig {
  id: QuizMode;
  name: string;
  description: string;
  questionCount: number;
  hasTimer: boolean;
  timerMinutes?: number;
  immediateFeedback: boolean;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

const modes: QuizModeConfig[] = [
  {
    id: "learn",
    name: "Learn Mode",
    description: "Pelajari dengan santai",
    questionCount: 5,
    hasTimer: false,
    immediateFeedback: true,
    icon: <BookOpen className="w-8 h-8" />,
    color: "bg-blue-500",
    features: [
      "5 soal per sesi",
      "Tanpa timer",
      "Feedback langsung",
      "Penjelasan detail",
    ],
  },
  {
    id: "practice",
    name: "Practice Mode",
    description: "Latihan dengan timer opsional",
    questionCount: 10,
    hasTimer: true,
    timerMinutes: 30,
    immediateFeedback: true,
    icon: <Target className="w-8 h-8" />,
    color: "bg-green-500",
    features: [
      "10 soal per sesi",
      "Timer 30 menit (opsional)",
      "Feedback langsung",
      "Latihan intensif",
    ],
  },
  {
    id: "test",
    name: "Test Mode",
    description: "Simulasi ujian Goethe",
    questionCount: 15,
    hasTimer: true,
    timerMinutes: 25,
    immediateFeedback: false,
    icon: <Trophy className="w-8 h-8" />,
    color: "bg-de-red",
    features: [
      "15 soal per sesi",
      "Timer ketat (20/25 menit)",
      "Feedback di akhir",
      "Simulasi nyata",
    ],
  },
];

interface ModeSelectorProps {
  category: "hoeren" | "lesen";
  onSelectMode: (mode: QuizMode, enableTimer: boolean) => void;
  onBack: () => void;
}

export default function ModeSelector({
  category,
  onSelectMode,
  onBack,
}: ModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<QuizMode | null>(null);
  const [enableTimer, setEnableTimer] = useState(true);

  const handleStart = () => {
    if (selectedMode) {
      onSelectMode(selectedMode, enableTimer);
    }
  };

  const selectedModeConfig = modes.find((m) => m.id === selectedMode);

  return (
    <div className="min-h-screen bg-de-gray flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center border-b border-gray-100 sticky top-0 z-10">
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
        <div className="ml-2 flex-1 text-center pr-10">
          <h1 className="text-sm font-black uppercase tracking-widest text-gray-400">
            Pilih Mode
          </h1>
          <p className="text-xl font-black text-de-black leading-tight">
            {category === "hoeren" ? "🔊 Hören" : "📖 Lesen"}
          </p>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto space-y-4">
          <p className="text-center text-gray-600 mb-6">
            Pilih mode quiz yang sesuai dengan tujuan belajarmu
          </p>

          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                selectedMode === mode.id
                  ? `border-${mode.color.replace("bg-", "")} bg-white shadow-lg`
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${mode.color} text-white p-3 rounded-xl shrink-0`}
                >
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-lg text-de-black">
                      {mode.name}
                    </h3>
                    {selectedMode === mode.id && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {mode.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mode.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}

          {/* Timer Option (for Practice Mode) */}
          {selectedMode === "practice" && (
            <div className="bg-white p-4 rounded-xl border-2 border-gray-200 mt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableTimer}
                  onChange={(e) => setEnableTimer(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-de-red focus:ring-de-red"
                />
                <div className="flex-1">
                  <span className="font-bold text-de-black flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Aktifkan Timer
                  </span>
                  <p className="text-xs text-gray-500">
                    30 menit untuk menyelesaikan quiz
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Start Button */}
      <div className="bg-white p-4 border-t border-gray-100">
        <button
          onClick={handleStart}
          disabled={!selectedMode}
          className="w-full max-w-md mx-auto block bg-de-red text-white py-4 rounded-xl font-black text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
        >
          {selectedModeConfig
            ? `Mulai ${selectedModeConfig.name}`
            : "Pilih Mode Quiz"}
        </button>
      </div>
    </div>
  );
}
