"use client";

import { useParams, useRouter } from "next/navigation";
import { useProgress } from "../../context/ProgressContext";
import { ChevronLeft, Headphones, BookText, PenTool, Mic, CheckCircle2, ChevronRight } from "lucide-react";

const SESSIONS = [
  { id: 'hoeren', title: 'Hören', label: 'Mendengar', icon: Headphones, color: 'bg-blue-500' },
  { id: 'lesen', title: 'Lesen', label: 'Membaca', icon: BookText, color: 'bg-green-500' },
  { id: 'schreiben', title: 'Schreiben', label: 'Menulis', icon: PenTool, color: 'bg-orange-500' },
  { id: 'sprechen', title: 'Sprechen', label: 'Berbicara', icon: Mic, color: 'bg-de-red' },
] as const;

type SessionId = 'hoeren' | 'lesen' | 'schreiben' | 'sprechen';

export default function DayPage() {
  const { id } = useParams();
  const router = useRouter();
  const dayNum = parseInt(id as string);
  const { progress, updateSession } = useProgress();
  
  const dayData = progress.days[dayNum] || { 
    unlocked: dayNum === 1, 
    completed: false, 
    sessions: { hoeren: false, lesen: false, schreiben: false, sprechen: false } 
  };

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

  const handleSessionToggle = (sessionId: SessionId) => {
    updateSession(dayNum, sessionId, !dayData.sessions[sessionId]);
  };

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
        <div className="bg-de-gold/10 border border-de-gold/20 p-6 rounded-3xl">
          <h2 className="text-lg font-bold text-de-black">4 Sesi Belajar</h2>
          <p className="text-sm text-gray-600 mt-1">Selesaikan semua sesi untuk melanjutkan ke hari berikutnya.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {SESSIONS.map((session) => {
            const isCompleted = dayData.sessions[session.id];
            const Icon = session.icon;

            return (
              <button
                key={session.id}
                onClick={() => handleSessionToggle(session.id)}
                className={`flex items-center p-5 rounded-2xl border-2 transition-all relative overflow-hidden group active:scale-[0.99] ${
                  isCompleted 
                    ? "bg-white border-green-500/30" 
                    : "bg-white border-de-gray hover:border-de-black/10"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${session.color} shadow-lg transition-transform group-hover:scale-110`}>
                  <Icon size={28} />
                </div>
                
                <div className="ml-5 text-left flex-1">
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-tighter leading-none">{session.title}</h3>
                  <p className="text-xl font-black text-de-black mt-1 leading-none">{session.label}</p>
                </div>

                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isCompleted ? "bg-green-500 text-white" : "bg-gray-100 text-gray-300"
                }`}>
                  <CheckCircle2 size={24} strokeWidth={3} />
                </div>
                
                {/* Visual completion bar indicator */}
                {isCompleted && (
                  <div className="absolute bottom-0 left-0 h-1.5 bg-green-500 transition-all" style={{ width: '100%' }}></div>
                )}
              </button>
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
