"use client";

import { useParams, useRouter } from "next/navigation";
import { useProgress } from "../../context/ProgressContext";
import { ChevronLeft, Headphones, BookOpen, CheckCircle2, ChevronRight, Heart } from "lucide-react";
import HeartsIndicator from "../../../components/HeartsIndicator";
import { useState } from "react";

const SESSIONS = [
  { 
    id: 'hoeren' as const, 
    title: 'Hören', 
    label: 'Mendengar', 
    description: 'Dengarkan audio dan pilih jawaban yang tepat',
    icon: Headphones, 
    color: 'bg-blue-500' 
  },
  { 
    id: 'lesen' as const, 
    title: 'Lesen', 
    label: 'Membaca', 
    description: 'Baca teks dan pilih jawaban yang tepat',
    icon: BookOpen, 
    color: 'bg-green-500' 
  },
];

export default function DayPage() {
  const { id } = useParams();
  const router = useRouter();
  const dayNum = parseInt(id as string);
  const { 
    progress, 
    getHearts, 
    canUseTomorrowHearts, 
    consumeTomorrowHearts 
  } = useProgress();
  
  const [showTomorrowConfirm, setShowTomorrowConfirm] = useState(false);
  
  const dayData = progress.days[dayNum] || { 
    unlocked: dayNum === 1, 
    completed: false, 
    sessions: { 
      hoeren: { completed: false, attempts: 0, lastAttemptAt: null },
      lesen: { completed: false, attempts: 0, lastAttemptAt: null }
    },
    hearts: 3,
    heartsResetAt: new Date().toISOString(),
    tomorrowHeartsUsed: false
  };

  const hearts = getHearts(dayNum);
  const canUseTomorrow = canUseTomorrowHearts(dayNum);

  if (!dayData.unlocked && dayNum !== 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h1 className="text-2xl font-bold text-de-black">Hari Ini Terkunci</h1>
        <p className="text-gray-500 mt-2">Selesaikan hari sebelumnya untuk membuka materi ini.</p>
        <button 
          onClick={() => router.push('/')}
          className="mt-6 bg-de-black text-white px-6 py-3 rounded-xl font-bold"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const handleStartQuiz = (sessionId: 'hoeren' | 'lesen') => {
    if (hearts > 0) {
      router.push(`/day/${dayNum}/quiz?category=${sessionId}`);
    }
  };

  const onConfirmUseTomorrowHearts = () => {
    if (consumeTomorrowHearts(dayNum)) {
      setShowTomorrowConfirm(false);
    }
  };

  // Both sessions are always available (no locking between sessions)
  // Only day-level locking applies

  return (
    <div className="min-h-screen bg-de-gray flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => router.push('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="ml-2 flex-1 text-center pr-10">
          <h1 className="text-sm font-black uppercase tracking-widest text-gray-400">Pelajaran</h1>
          <p className="text-xl font-black text-de-black leading-tight">Hari Ke-{dayNum}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 flex-1">
        {/* Hearts Indicator */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nyawa Tersisa</p>
            <p className="text-sm text-gray-600 mt-1">
              {hearts > 0 
                ? `${hearts} nyawa tersisa hari ini`
                : 'Nyawa habis! Gunakan nyawa besok atau coba lagi besok.'
              }
            </p>
          </div>
          <HeartsIndicator hearts={hearts} maxHearts={5} size="lg" />
        </div>

        {/* Info Card */}
        <div className="bg-de-gold/10 border border-de-gold/20 p-6 rounded-3xl">
          <h2 className="text-lg font-bold text-de-black">2 Sesi Quiz</h2>
          <p className="text-sm text-gray-600 mt-1">
            Selesaikan kedua sesi untuk melanjutkan. Tiap sesi: 5 soal, minimal 4 benar untuk lulus.
          </p>
        </div>

        {/* Hearts Empty - Use Tomorrow's Hearts */}
        {hearts === 0 && canUseTomorrow && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h3 className="font-bold text-red-800">Nyawa Habis!</h3>
            </div>
            <p className="text-sm text-red-700 mb-4">
              Anda kehabisan nyawa hari ini. Anda bisa menggunakan nyawa hari besok untuk melanjutkan.
            </p>
            <button
              onClick={() => setShowTomorrowConfirm(true)}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
            >
              Gunakan ❤️ Besok
            </button>
          </div>
        )}

        {/* Tomorrow Confirm Modal */}
        {showTomorrowConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-de-black mb-2">Gunakan Nyawa Besok?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Anda akan menggunakan 5 nyawa dari hari besok. Besok Anda akan mulai dengan 0 nyawa. Lanjutkan?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowTomorrowConfirm(false)}
                  className="flex-1 py-3 rounded-xl font-bold border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={onConfirmUseTomorrowHearts}
                  className="flex-1 py-3 rounded-xl font-bold bg-de-red text-white hover:bg-red-600"
                >
                  Ya, Lanjutkan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sessions */}
        <div className="grid grid-cols-1 gap-4">
          {SESSIONS.map((session) => {
            const isCompleted = dayData.sessions[session.id].completed;
            const canStart = hearts > 0;
            const Icon = session.icon;

            return (
              <div
                key={session.id}
                className={`flex items-center p-5 rounded-2xl border-2 transition-all relative overflow-hidden group ${
                  isCompleted 
                    ? "bg-white border-green-500/30" 
                    : canStart
                      ? "bg-white border-de-gray hover:border-de-red/30 cursor-pointer"
                      : "bg-gray-50 border-gray-200 opacity-60"
                }`}
                onClick={() => canStart && handleStartQuiz(session.id)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${session.color} shadow-lg transition-transform group-hover:scale-110`}>
                  <Icon size={28} />
                </div>
                
                <div className="ml-5 text-left flex-1">
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-tighter leading-none">{session.title}</h3>
                  <p className="text-xl font-black text-de-black mt-1 leading-none">{session.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{session.description}</p>
                  {dayData.sessions[session.id].attempts > 0 && !isCompleted && (
                    <p className="text-xs text-orange-500 mt-1">
                      Percobaan ke-{dayData.sessions[session.id].attempts + 1}
                    </p>
                  )}
                </div>

                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isCompleted ? "bg-green-500 text-white" : "bg-gray-100 text-gray-300"
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 size={24} strokeWidth={3} />
                  ) : hearts === 0 ? (
                    <Heart size={20} className="text-red-300" />
                  ) : (
                    <ChevronRight size={24} />
                  )}
                </div>
                
                {/* Visual completion bar indicator */}
                {isCompleted && (
                  <div className="absolute bottom-0 left-0 h-1.5 bg-green-500 transition-all" style={{ width: '100%' }}></div>
                )}
              </div>
            );
          })}
        </div>

        {dayData.completed && (
          <div className="bg-de-black text-white p-6 rounded-3xl text-center shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 bg-de-gold rounded-full flex items-center justify-center mx-auto mb-4 text-de-black animate-bounce">
              <CheckCircle2 size={32} strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-black">Luar Biasa!</h2>
            <p className="text-de-gold/80 font-bold">Hari {dayNum} telah diselesaikan.</p>
            
            <button 
              onClick={() => router.push(`/day/${dayNum + 1}`)}
              className="mt-6 w-full bg-white text-de-black py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-de-gold transition-colors"
            >
              Lanjut ke Hari Berikutnya <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
