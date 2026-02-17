"use client";

import { useState } from "react";
import { 
  Lightbulb, 
  BookOpen, 
  Heart, 
  Volume2, 
  Target,
  Clock,
  Star,
  ChevronRight,
  Search
} from "lucide-react";

// Vocabulary data
const vocabularyData = [
  {
    category: "Greetings",
    words: [
      { german: "Hallo", indonesian: "Halo" },
      { german: "Guten Morgen", indonesian: "Selamat pagi" },
      { german: "Guten Tag", indonesian: "Selamat siang" },
      { german: "Guten Abend", indonesian: "Selamat malam" },
      { german: "Auf Wiedersehen", indonesian: "Sampai jumpa" },
      { german: "Tschüss", indonesian: "Dadah" },
      { german: "Danke", indonesian: "Terima kasih" },
      { german: "Bitte", indonesian: "Kembali/silakan" },
    ]
  },
  {
    category: "Numbers",
    words: [
      { german: "Eins", indonesian: "Satu" },
      { german: "Zwei", indonesian: "Dua" },
      { german: "Drei", indonesian: "Tiga" },
      { german: "Vier", indonesian: "Empat" },
      { german: "Fünf", indonesian: "Lima" },
      { german: "Sechs", indonesian: "Enam" },
      { german: "Sieben", indonesian: "Tujuh" },
      { german: "Acht", indonesian: "Delapan" },
      { german: "Neun", indonesian: "Sembilan" },
      { german: "Zehn", indonesian: "Sepuluh" },
    ]
  },
  {
    category: "Colors",
    words: [
      { german: "Rot", indonesian: "Merah" },
      { german: "Blau", indonesian: "Biru" },
      { german: "Grün", indonesian: "Hijau" },
      { german: "Gelb", indonesian: "Kuning" },
      { german: "Schwarz", indonesian: "Hitam" },
      { german: "Weiß", indonesian: "Putih" },
      { german: "Braun", indonesian: "Coklat" },
      { german: "Orange", indonesian: "Oranye" },
    ]
  },
  {
    category: "Family",
    words: [
      { german: "Mutter", indonesian: "Ibu" },
      { german: "Vater", indonesian: "Ayah" },
      { german: "Schwester", indonesian: "Kakak/adik perempuan" },
      { german: "Bruder", indonesian: "Kakak/adik laki-laki" },
      { german: "Großmutter", indonesian: "Nenek" },
      { german: "Großvater", indonesian: "Kakek" },
      { german: "Familie", indonesian: "Keluarga" },
    ]
  },
  {
    category: "Food & Drinks",
    words: [
      { german: "Wasser", indonesian: "Air" },
      { german: "Brot", indonesian: "Roti" },
      { german: "Kaffee", indonesian: "Kopi" },
      { german: "Tee", indonesian: "Teh" },
      { german: "Milch", indonesian: "Susu" },
      { german: "Apfel", indonesian: "Apel" },
      { german: "Essen", indonesian: "Makan" },
      { german: "Trinken", indonesian: "Minum" },
    ]
  },
  {
    category: "Time",
    words: [
      { german: "Heute", indonesian: "Hari ini" },
      { german: "Morgen", indonesian: "Besok/pagi" },
      { german: "Gestern", indonesian: "Kemarin" },
      { german: "Uhr", indonesian: "Jam" },
      { german: "Minute", indonesian: "Menit" },
      { german: "Woche", indonesian: "Minggu" },
      { german: "Monat", indonesian: "Bulan" },
      { german: "Jahr", indonesian: "Tahun" },
    ]
  }
];

// Tips data
const tipsData = [
  {
    icon: Heart,
    title: "Cerdas Menggunakan Hearts",
    description: "Anda memiliki 5 nyawa per hari. Setiap kali gagal quiz (>2 jawaban salah), Anda kehilangan 1 nyawa. Tips: Pelajari soal dengan baik sebelum menjawab, gunakan fitur audio untuk listening berulang kali.",
    color: "bg-red-50 border-red-200"
  },
  {
    icon: Volume2,
    title: "Strategi Listening (Hören)",
    description: "Untuk sesi listening: 1) Dengarkan audio dengan fokus penuh, 2) Jika perlu, putar ulang audio, 3) Perhatikan kata kunci dalam pertanyaan, 4) Jangan terburu-buru menjawab.",
    color: "bg-blue-50 border-blue-200"
  },
  {
    icon: BookOpen,
    title: "Strategi Reading (Lesen)",
    description: "Untuk sesi reading: 1) Baca teks dengan teliti, 2) Identifikasi kata kunci, 3) Bandingkan dengan opsi jawaban, 4) Perhatikan artikel (der, die, das) dan struktur kalimat.",
    color: "bg-green-50 border-green-200"
  },
  {
    icon: Target,
    title: "Tingkat Kesulitan",
    description: "Days 1-4: Easy (soal dasar), Days 5-8: Medium (soal menengah), Days 9-14: Hard (soal lebih kompleks). Persiapkan diri dengan belajar vocabulary dari hari-hari sebelumnya.",
    color: "bg-yellow-50 border-yellow-200"
  },
  {
    icon: Star,
    title: "Pass Threshold",
    description: "Anda perlu minimal 4/5 jawaban benar (80%) untuk lulus. Jika gagal, Anda bisa retry dengan soal yang diacak ulang (jika masih punya nyawa). Jangan menyerah!",
    color: "bg-purple-50 border-purple-200"
  },
  {
    icon: Clock,
    title: "Konsistensi adalah Kunci",
    description: "Selesaikan quiz setiap hari untuk menjaga streak. Streak membantu membangun kebiasaan belajar yang konsisten. Ingat: Progress tersimpan otomatis!",
    color: "bg-orange-50 border-orange-200"
  }
];

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<"tips" | "vocabulary">("tips");
  const [selectedCategory, setSelectedCategory] = useState<string>(vocabularyData[0].category);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVocabulary = vocabularyData.find(cat => cat.category === selectedCategory)?.words.filter(
    word => 
      word.german.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.indonesian.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-de-gray pb-20">
      {/* Header */}
      <div className="bg-de-black text-white p-6 pb-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-black mb-2">Materi Belajar 📚</h1>
          <p className="text-gray-300">Tips dan kosakata untuk membantu belajar</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 -mt-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl p-1.5 shadow-lg mb-6 flex">
          <button
            onClick={() => setActiveTab("tips")}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === "tips"
                ? "bg-de-red text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            Tips Belajar
          </button>
          <button
            onClick={() => setActiveTab("vocabulary")}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === "vocabulary"
                ? "bg-de-red text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Kosakata
          </button>
        </div>

        {/* Tips Section */}
        {activeTab === "tips" && (
          <div className="space-y-4">
            {tipsData.map((tip, index) => (
              <div
                key={index}
                className={`${tip.color} border rounded-2xl p-5 transition-transform active:scale-[0.98]`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center shrink-0">
                    <tip.icon className="w-6 h-6 text-de-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-de-black mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vocabulary Section */}
        {activeTab === "vocabulary" && (
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari kosakata..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-de-red focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Category Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {vocabularyData.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => setSelectedCategory(cat.category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.category
                      ? "bg-de-black text-white"
                      : "bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Vocabulary List */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 bg-de-gold/10 border-b border-de-gold/20">
                <h3 className="font-bold text-de-black">{selectedCategory}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  {filteredVocabulary.length} kata
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredVocabulary.map((word, index) => (
                  <div
                    key={index}
                    className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-bold text-de-black text-lg">{word.german}</p>
                      <p className="text-sm text-gray-500">{word.indonesian}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            {filteredVocabulary.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada kata yang cocok dengan pencarian</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
