"use client";

import { Suspense } from "react";
import QuizPageClient from "./QuizPageClient";

export default function QuizPage() {
  return (
    <Suspense fallback={<QuizLoading />}>
      <QuizPageClient />
    </Suspense>
  );
}

function QuizLoading() {
  return (
    <div className="min-h-screen bg-de-gray flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-de-red mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat quiz...</p>
      </div>
    </div>
  );
}
