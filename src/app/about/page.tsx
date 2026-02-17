"use client";

import { Heart, Code2, BookOpen, ExternalLink, Sparkles, Coffee } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-de-gray pb-20">
      {/* Header */}
      <div className="bg-de-black text-white p-6 pb-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-black mb-3">de-learn-de 🇩🇪</h1>
          <p className="text-de-gold text-lg font-medium italic">
            &ldquo;Dek, ayo belajar Bahasa Jerman!&rdquo;
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 -mt-6">
        {/* Attribution Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-de-red/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-de-red" />
            </div>
            <h2 className="text-lg font-bold text-de-black">Tentang Aplikasi Ini</h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            Dibuat dengan penuh cinta oleh{" "}
            <Link 
              href="https://ardha.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-de-red font-semibold hover:underline inline-flex items-center gap-1"
            >
              Ardha
              <ExternalLink className="w-3 h-3" />
            </Link>{" "}
            untuk membantu banyak orang belajar Bahasa Jerman dari nol 💕
          </p>
        </div>

        {/* Why This Was Made */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-de-gold/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-de-gold" />
            </div>
            <h2 className="text-lg font-bold text-de-black">Kenapa Dibuat?</h2>
          </div>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              <strong>de-learn-de</strong> adalah platform belajar Bahasa Jerman level A1 yang dirancang khusus untuk pemula Indonesia.
            </p>
            
            <p>
              Nama ini berasal dari:
            </p>
            
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-de-red font-bold">de</span>
                <span>= panggilan sayang (dek/dik)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-de-red font-bold">learn</span>
                <span>= belajar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-de-red font-bold">de</span>
                <span>= Deutschland (Jerman)</span>
              </li>
            </ul>
            
            <p className="text-de-gold font-medium italic text-center mt-4 p-4 bg-de-gold/10 rounded-xl">
              &ldquo;de-learn-de&rdquo; = Belajar Bahasa Jerman dengan penuh kasih sayang
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-lg font-bold text-de-black">Fitur Unggulan</h2>
          </div>
          
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Kurikulum 14 Hari level A1 dengan kuis interaktif</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>3 Mode Belajar: Learn, Practice, dan Test (simulasi ujian)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>280+ soal sesuai standar Goethe A1</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Text-to-Speech dengan mode lambat untuk pemula</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Trainer Der/Die/Das (warna biru/merah/hijau)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>40 frasa umum & 15 tips pengucapan</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Sistem Hearts (3 nyawa per hari)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Desain mobile-first, belajar di mana saja</span>
            </li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-gray-700" />
            </div>
            <h2 className="text-lg font-bold text-de-black">Dibuat Dengan</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <p className="font-bold text-de-black">Next.js 16</p>
              <p className="text-xs text-gray-500">React Framework</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <p className="font-bold text-de-black">TypeScript</p>
              <p className="text-xs text-gray-500">Type Safety</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <p className="font-bold text-de-black">Tailwind CSS 4</p>
              <p className="text-xs text-gray-500">Styling</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <p className="font-bold text-de-red">Cinta 💕</p>
              <p className="text-xs text-gray-500">Untuk semua pembelajar</p>
            </div>
          </div>
        </div>

        {/* Donation Section */}
        <div className="bg-gradient-to-br from-de-red/5 to-de-gold/5 rounded-3xl p-6 shadow-lg mb-6 border-2 border-de-red/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-de-red/10 flex items-center justify-center">
              <Coffee className="w-5 h-5 text-de-red" />
            </div>
            <h2 className="text-lg font-bold text-de-black">Dukung Kami ☕</h2>
          </div>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Aplikasi ini <strong>100% gratis</strong> dan akan selalu gratis. Tidak ada iklan, tidak ada langganan.
            </p>
            
            <p>
              Kalau kamu merasa terbantu dan mau dukung pengembangan aplikasi ini, bisa traktir kopi melalui:
            </p>
            
            <a 
              href="https://saweria.co/ardhaxyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-[#FA6743] to-[#F5A623] text-white font-bold py-4 px-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              ☕ Traktir Kopi via Saweria
            </a>
            
            <p className="text-sm text-center text-gray-500">
              Dukunganmu akan membantu:
            </p>
            
            <ul className="text-sm text-gray-500 space-y-1 ml-4">
              <li>• Biaya server & domain</li>
              <li>• Pengembangan fitur baru</li>
              <li>• Penambahan soal & konten</li>
              <li>• Makan siang developer 😄</li>
            </ul>
            
            <p className="text-center text-sm font-medium text-de-red">
              Terima kasih banyak! 🙏
            </p>
          </div>
        </div>

        {/* Version */}
        <div className="text-center text-gray-400 text-sm pb-6">
          <p>Version 1.1.0</p>
          <p className="mt-1">Dibuat dengan ❤️ di München</p>
          <p className="mt-1">Untuk semua yang punya mimpi ke Jerman 🇩🇪</p>
        </div>
      </div>
    </div>
  );
}
