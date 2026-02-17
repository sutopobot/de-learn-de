"use client";

import { useState } from "react";
import { Check, X, HelpCircle, Trophy, RotateCcw } from "lucide-react";
import TTSLearningButton from "./TTSLearningButton";

export type Article = "der" | "die" | "das";

export interface GenderNoun {
  noun: string;
  article: Article;
  indonesian: string;
  memoryHook?: string;
  pronunciation?: string;
}

interface GenderNounCardProps {
  noun: GenderNoun;
  showArticle?: boolean;
  onMarkLearned?: (noun: string) => void;
  isLearned?: boolean;
}

const articleColors: Record<Article, string> = {
  der: "bg-blue-500",
  die: "bg-red-500",
  das: "bg-green-500",
};

const articleBgColors: Record<Article, string> = {
  der: "bg-blue-50 border-blue-200",
  die: "bg-red-50 border-red-200",
  das: "bg-green-50 border-green-200",
};

const articleTextColors: Record<Article, string> = {
  der: "text-blue-700",
  die: "text-red-700",
  das: "text-green-700",
};

export function GenderNounCard({
  noun,
  showArticle = true,
  onMarkLearned,
  isLearned = false,
}: GenderNounCardProps) {
  return (
    <div
      className={`rounded-2xl border-2 p-5 transition-all ${
        showArticle ? articleBgColors[noun.article] : "bg-white border-gray-200"
      } ${isLearned ? "ring-2 ring-yellow-400" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Article Badge */}
          {showArticle && (
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-white font-black text-sm ${articleColors[noun.article]}`}
              >
                {noun.article}
              </span>
              {isLearned && (
                <span className="text-yellow-500" title="Sudah dipelajari">
                  <Trophy className="w-5 h-5 fill-current" />
                </span>
              )}
            </div>
          )}

          {/* Noun */}
          <div className="flex items-center gap-3">
            <h3 className={`text-2xl font-black ${showArticle ? articleTextColors[noun.article] : "text-gray-800"}`}>
              {showArticle ? `${noun.article} ${noun.noun}` : noun.noun}
            </h3>
            <TTSLearningButton
              text={`${noun.article} ${noun.noun}`}
              size="sm"
              pronunciation={noun.pronunciation}
              showPronunciation={false}
            />
          </div>

          {/* Indonesian Translation */}
          <p className="text-gray-600 mt-1">{noun.indonesian}</p>

          {/* Pronunciation */}
          {noun.pronunciation && (
            <p className="text-sm text-gray-400 mt-1 font-mono">
              /{noun.pronunciation}/
            </p>
          )}

          {/* Memory Hook */}
          {noun.memoryHook && showArticle && (
            <div className="mt-3 flex items-start gap-2 text-sm">
              <HelpCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <p className="text-gray-600 italic">{noun.memoryHook}</p>
            </div>
          )}
        </div>

        {/* Mark as Learned Button */}
        {onMarkLearned && (
          <button
            onClick={() => onMarkLearned(noun.noun)}
            className={`ml-3 p-2 rounded-xl transition-all ${
              isLearned
                ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
            title={isLearned ? "Tandai belum dipelajari" : "Tandai sudah dipelajari"}
          >
            <Trophy className={`w-5 h-5 ${isLearned ? "fill-current" : ""}`} />
          </button>
        )}
      </div>
    </div>
  );
}

// Gender Quiz Card Component
interface GenderQuizCardProps {
  noun: GenderNoun;
  onAnswer: (article: Article) => void;
  showResult?: boolean;
  selectedAnswer?: Article | null;
}

export function GenderQuizCard({
  noun,
  onAnswer,
  showResult = false,
  selectedAnswer,
}: GenderQuizCardProps) {
  const articles: Article[] = ["der", "die", "das"];

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500 mb-2">Pilih artikel yang benar:</p>
        <div className="flex items-center justify-center gap-3">
          <h3 className="text-3xl font-black text-gray-800">{noun.noun}</h3>
          <TTSLearningButton text={noun.noun} size="md" />
        </div>
        <p className="text-gray-600 mt-2">({noun.indonesian})</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {articles.map((article) => {
          const isSelected = selectedAnswer === article;
          const isCorrect = article === noun.article;
          const showCorrect = showResult && isCorrect;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <button
              key={article}
              onClick={() => !showResult && onAnswer(article)}
              disabled={showResult}
              className={`py-4 px-6 rounded-xl font-black text-lg transition-all active:scale-95 ${
                showCorrect
                  ? "bg-green-500 text-white ring-4 ring-green-200"
                  : showWrong
                  ? "bg-red-500 text-white"
                  : isSelected
                  ? `${articleColors[article]} text-white`
                  : `${articleBgColors[article]} ${articleTextColors[article]} hover:opacity-80`
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {showCorrect && <Check className="w-5 h-5" />}
                {showWrong && <X className="w-5 h-5" />}
                {article}
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-4 text-center">
          {selectedAnswer === noun.article ? (
            <p className="text-green-600 font-bold">✓ Benar! {noun.memoryHook && `(${noun.memoryHook})`}</p>
          ) : (
            <p className="text-red-600">
              ✗ Jawaban yang benar: <span className="font-bold">{noun.article}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Pattern Card Component
interface GenderPatternProps {
  pattern: {
    title: string;
    description: string;
    article: Article;
    examples: string[];
  };
}

export function GenderPatternCard({ pattern }: GenderPatternProps) {
  return (
    <div className={`rounded-2xl border-2 p-5 ${articleBgColors[pattern.article]}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-3 py-1 rounded-full text-white font-bold text-sm ${articleColors[pattern.article]}`}>
          {pattern.article}
        </span>
        <h4 className="font-bold text-gray-800">{pattern.title}</h4>
      </div>
      <p className="text-gray-600 text-sm mb-3">{pattern.description}</p>
      <div className="flex flex-wrap gap-2">
        {pattern.examples.map((example, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-white/70 rounded-lg text-sm font-medium text-gray-700"
          >
            {example}
          </span>
        ))}
      </div>
    </div>
  );
}
