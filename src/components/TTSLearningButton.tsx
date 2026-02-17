"use client";

import { useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX, Loader2, Turtle, Rabbit } from "lucide-react";

interface TTSLearningButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  pronunciation?: string;
  showPronunciation?: boolean;
}

export default function TTSLearningButton({
  text,
  size = "md",
  showLabel = false,
  pronunciation,
  showPronunciation = false,
}: TTSLearningButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSlowMode, setIsSlowMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setIsSupported(false);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        const updatedVoices = window.speechSynthesis.getVoices();
        if (updatedVoices.length === 0) {
          setIsSupported(false);
        }
      };
    }
  }, []);

  const getGermanVoice = useCallback(() => {
    if (typeof window === "undefined") return null;
    
    const voices = window.speechSynthesis.getVoices();
    
    const germanVoice = voices.find(
      (v) =>
        v.lang.startsWith("de") ||
        v.name.includes("German") ||
        v.name.includes("Deutsch")
    );

    return germanVoice || null;
  }, []);

  const speak = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setHasError(true);
      return;
    }

    window.speechSynthesis.cancel();
    setIsLoading(true);
    setHasError(false);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    // Slow mode: 0.6 (beginner), Normal: 0.85
    utterance.rate = isSlowMode ? 0.6 : 0.85;
    utterance.pitch = 1;

    const voice = getGermanVoice();
    if (voice) {
      utterance.voice = voice;
    } else {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (event) => {
      console.error("TTS Error:", event);
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
    };

    window.speechSynthesis.speak(utterance);
  }, [text, getGermanVoice, isSlowMode]);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, []);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  if (!isSupported) {
    return (
      <div className="flex items-center gap-1 text-yellow-600">
        <VolumeX className={iconSizes[size]} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={isPlaying ? stop : speak}
          disabled={isLoading}
          className={`${sizeClasses[size]} rounded-xl flex items-center justify-center transition-all active:scale-95 ${
            isPlaying
              ? "bg-de-red text-white animate-pulse"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isSlowMode ? "Mode Lambat (Slow)" : "Mode Normal"}
        >
          {isLoading ? (
            <Loader2 className={`${iconSizes[size]} animate-spin`} />
          ) : isPlaying ? (
            <VolumeX className={iconSizes[size]} />
          ) : (
            <Volume2 className={iconSizes[size]} />
          )}
        </button>

        {/* Speed Toggle */}
        <button
          onClick={() => setIsSlowMode(!isSlowMode)}
          className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
            isSlowMode
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          title={isSlowMode ? "Switch to Normal Speed" : "Switch to Slow Mode"}
        >
          {isSlowMode ? (
            <span className="flex items-center gap-1">
              <Turtle className="w-3 h-3" />
              Lambat
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Rabbit className="w-3 h-3" />
              Normal
            </span>
          )}
        </button>

        {showLabel && (
          <span className="text-sm text-gray-600">
            {isPlaying ? "Memutar..." : "Dengarkan"}
          </span>
        )}
      </div>

      {/* Pronunciation Guide */}
      {showPronunciation && pronunciation && (
        <div className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-lg inline-flex items-center gap-1">
          <span className="text-gray-400">/</span>
          {pronunciation}
          <span className="text-gray-400">/</span>
        </div>
      )}

      {hasError && (
        <p className="text-xs text-red-500">
          Audio gagal dimuat
        </p>
      )}
    </div>
  );
}
