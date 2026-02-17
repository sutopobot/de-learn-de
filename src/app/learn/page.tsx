"use client";

import { useState, useEffect } from "react";
import { 
  Lightbulb, 
  BookOpen, 
  Heart, 
  Volume2, 
  Target,
  Clock,
  Star,
  ChevronRight,
  Search,
  Trophy,
  MessageCircle,
  Mic2,
  GraduationCap,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import TTSLearningButton from "@/components/TTSLearningButton";
import { 
  GenderNounCard, 
  GenderQuizCard, 
  GenderPatternCard 
} from "@/components/GenderNounCard";
import { 
  vocabularyData, 
  phrases, 
  pronunciationTips, 
  genderNouns, 
  genderPatterns,
  learningTips,
  Article,
  GenderNoun,
} from "@/data/learning-content";

type TabType = "tips" | "vocabulary" | "gender" | "phrases" | "pronunciation";

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<TabType>("tips");
  const [selectedCategory, setSelectedCategory] = useState<string>(vocabularyData[0].category);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Gender quiz state
  const [quizNouns, setQuizNouns] = useState<GenderNoun[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<Article | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  
  // Learned items state
  const [learnedNouns, setLearnedNouns] = useState<Set<string>>(new Set());
  const [learnedPhrases, setLearnedPhrases] = useState<Set<number>>(new Set());
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
  
  // Gender filter
  const [genderFilter, setGenderFilter] = useState<Article | "all">("all");

  // Load learned items from localStorage
  useEffect(() => {
    const savedLearnedNouns = localStorage.getItem("de-learn-learned-nouns");
    const savedLearnedPhrases = localStorage.getItem("de-learn-learned-phrases");
    const savedLearnedWords = localStorage.getItem("de-learn-learned-words");
    
    if (savedLearnedNouns) setLearnedNouns(new Set(JSON.parse(savedLearnedNouns)));
    if (savedLearnedPhrases) setLearnedPhrases(new Set(JSON.parse(savedLearnedPhrases)));
    if (savedLearnedWords) setLearnedWords(new Set(JSON.parse(savedLearnedWords)));
  }, []);

  // Save learned items to localStorage
  useEffect(() => {
    localStorage.setItem("de-learn-learned-nouns", JSON.stringify([...learnedNouns]));
  }, [learnedNouns]);

  useEffect(() => {
    localStorage.setItem("de-learn-learned-phrases", JSON.stringify([...learnedPhrases]));
  }, [learnedPhrases]);

  useEffect(() => {
    localStorage.setItem("de-learn-learned-words", JSON.stringify([...learnedWords]));
  }, [learnedWords]);

  // Initialize quiz nouns
  useEffect(() => {
    if (activeTab === "gender" && quizNouns.length === 0) {
      startNewQuiz();
    }
  }, [activeTab]);

  const startNewQuiz = () => {
    const shuffled = [...genderNouns].sort(() => Math.random() - 0.5);
    setQuizNouns(shuffled.slice(0, 10));
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setShowQuizResult(false);
    setSelectedAnswer(null);
    setAnsweredQuestions(new Set());
  };

  const handleQuizAnswer = (article: Article) => {
    if (answeredQuestions.has(currentQuizIndex)) return;
    
    setSelectedAnswer(article);
    setAnsweredQuestions(new Set([...answeredQuestions, currentQuizIndex]));
    
    if (article === quizNouns[currentQuizIndex].article) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuizIndex < quizNouns.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowQuizResult(true);
    }
  };

  const toggleLearnedNoun = (noun: string) => {
    const newLearned = new Set(learnedNouns);
    if (newLearned.has(noun)) {
      newLearned.delete(noun);
    } else {
      newLearned.add(noun);
    }
    setLearnedNouns(newLearned);
  };

  const toggleLearnedPhrase = (index: number) => {
    const newLearned = new Set(learnedPhrases);
    if (newLearned.has(index)) {
      newLearned.delete(index);
    } else {
      newLearned.add(index);
    }
    setLearnedPhrases(newLearned);
  };

  const toggleLearnedWord = (word: string) => {
    const newLearned = new Set(learnedWords);
    if (newLearned.has(word)) {
      newLearned.delete(word);
    } else {
      newLearned.add(word);
    }
    setLearnedWords(newLearned);
  };

  const filteredVocabulary = vocabularyData.find(cat => cat.category === selectedCategory)?.words.filter(
    word => 
      word.german.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.indonesian.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredGenderNouns = genderNouns.filter(noun => 
    genderFilter === "all" || noun.article === genderFilter
  );

  const totalLearnedItems = learnedNouns.size + learnedPhrases.size + learnedWords.size;
  const totalItems = genderNouns.length + phrases.length + vocabularyData.reduce((acc, cat) => acc + cat.words.length, 0);
  const progressPercentage = Math.round((totalLearnedItems / totalItems) * 100);

  const tabs = [
    { id: "tips" as TabType, label: "Tips", icon: Lightbulb },
    { id: "vocabulary" as TabType, label: "Kosakata", icon: BookOpen },
    { id: "gender" as TabType, label: "Der/Die/Das", icon: GraduationCap },
    { id: "phrases" as TabType, label: "Frasa", icon: MessageCircle },
    { id: "pronunciation" as TabType, label: "Pengucapan", icon: Mic2 },
  ];

  return (
    <div className="min-h-screen bg-de-gray pb-24">
      {/* Header */}
      <div className="bg-de-black text-white p-6 pb-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-black mb-2">Materi Belajar 📚</h1>
          <p className="text-gray-300">Tips, kosakata, dan grammar untuk belajar</p>
          
          {/* Progress Bar */}
          <div className="mt-6 bg-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Progress Belajar</span>
              <span className="text-sm font-bold text-de-gold">{progressPercentage}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-de-gold transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {totalLearnedItems} dari {totalItems} item dipelajari
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 -mt-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl p-1.5 shadow-lg mb-6 flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-de-red text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tips Section */}
        {activeTab === "tips" && (
          <div className="space-y-4">
            <div className="bg-de-gold/10 border border-de-gold/20 p-4 rounded-2xl mb-4">
              <h3 className="font-bold text-de-black flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-de-gold" />
                Selamat Datang di Materi Belajar!
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Jelajahi berbagai materi pembelajaran Jerman. Jangan lupa untuk 
                menandai item yang sudah dipelajari dengan tombol 🏆!
              </p>
            </div>
            
            {learningTips.map((tip, index) => (
              <div
                key={index}
                className={`${tip.color} border rounded-2xl p-5 transition-transform active:scale-[0.98]`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center shrink-0 text-2xl">
                    {tip.icon}
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
                  {cat.icon} {cat.category}
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
                {filteredVocabulary.map((word, index) => {
                  const wordKey = `${selectedCategory}-${word.german}`;
                  const isLearned = learnedWords.has(wordKey);
                  
                  return (
                    <div
                      key={index}
                      className={`p-4 transition-colors ${isLearned ? 'bg-yellow-50/50' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <p className="font-bold text-de-black text-lg">{word.german}</p>
                            <TTSLearningButton 
                              text={word.german} 
                              size="sm"
                              pronunciation={word.pronunciation}
                              showPronunciation={true}
                            />
                          </div>
                          <p className="text-sm text-gray-500">{word.indonesian}</p>
                        </div>
                        <button
                          onClick={() => toggleLearnedWord(wordKey)}
                          className={`p-2 rounded-xl transition-all ${
                            isLearned 
                              ? "bg-yellow-100 text-yellow-600" 
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          }`}
                        >
                          <Trophy className={`w-5 h-5 ${isLearned ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {filteredVocabulary.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada kata yang cocok dengan pencarian</p>
              </div>
            )}
          </div>
        )}

        {/* Gender Section */}
        {activeTab === "gender" && (
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-gradient-to-r from-blue-50 via-red-50 to-green-50 rounded-2xl p-5 border border-gray-200">
              <h3 className="font-bold text-de-black mb-2">🎨 Der / Die / Das</h3>
              <p className="text-sm text-gray-600">
                Warna membantu mengingat: <span className="text-blue-600 font-bold">der = BIRU</span>, 
                <span className="text-red-600 font-bold">die = MERAH</span>, 
                <span className="text-green-600 font-bold">das = HIJAU</span>.
                Setiap kata benda selalu ditampilkan dengan artikelnya!
              </p>
            </div>

            {/* Quiz Section */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-de-black flex items-center gap-2">
                  <Target className="w-5 h-5 text-de-red" />
                  Quiz Gender
                </h3>
                <button
                  onClick={startNewQuiz}
                  className="text-sm text-de-red flex items-center gap-1 hover:underline"
                >
                  <RotateCcw className="w-4 h-4" />
                  Baru
                </button>
              </div>

              {quizNouns.length > 0 && !showQuizResult && (
                <>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>Soal {currentQuizIndex + 1} dari {quizNouns.length}</span>
                      <span>Score: {quizScore}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-de-red transition-all"
                        style={{ width: `${((currentQuizIndex + 1) / quizNouns.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <GenderQuizCard
                    noun={quizNouns[currentQuizIndex]}
                    onAnswer={handleQuizAnswer}
                    showResult={answeredQuestions.has(currentQuizIndex)}
                    selectedAnswer={selectedAnswer || undefined}
                  />

                  {answeredQuestions.has(currentQuizIndex) && (
                    <button
                      onClick={nextQuestion}
                      className="w-full mt-4 bg-de-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                      {currentQuizIndex < quizNouns.length - 1 ? "Soal Berikutnya" : "Lihat Hasil"}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </>
              )}

              {showQuizResult && (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-de-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-de-black" />
                  </div>
                  <h4 className="text-2xl font-black text-de-black">Quiz Selesai! 🎉</h4>
                  <p className="text-gray-600 mt-2">
                    Anda menjawab benar <span className="font-bold text-de-black">{quizScore}</span> dari <span className="font-bold">{quizNouns.length}</span> soal
                  </p>
                  <div className="mt-4 inline-block px-4 py-2 bg-gray-100 rounded-xl">
                    <span className={`font-bold ${quizScore >= 7 ? 'text-green-600' : quizScore >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {quizScore >= 8 ? '🌟 Sempurna!' : quizScore >= 6 ? '👍 Bagus!' : '💪 Terus Berlatih!'}
                    </span>
                  </div>
                  <button
                    onClick={startNewQuiz}
                    className="w-full mt-6 bg-de-red text-white py-3 rounded-xl font-bold"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
            </div>

            {/* Patterns Section */}
            <div>
              <h3 className="font-bold text-de-black mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-de-gold" />
                Pola Artikel
              </h3>
              <div className="grid gap-3">
                {genderPatterns.slice(0, 4).map((pattern, index) => (
                  <GenderPatternCard key={index} pattern={pattern} />
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="flex gap-2">
              {[
                { id: "all", label: "Semua", color: "bg-gray-100 text-gray-700" },
                { id: "der", label: "der (Biru)", color: "bg-blue-100 text-blue-700" },
                { id: "die", label: "die (Merah)", color: "bg-red-100 text-red-700" },
                { id: "das", label: "das (Hijau)", color: "bg-green-100 text-green-700" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setGenderFilter(filter.id as Article | "all")}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    genderFilter === filter.id
                      ? filter.color + " ring-2 ring-offset-1 ring-gray-300"
                      : "bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Gender Nouns List */}
            <div className="space-y-3">
              <h3 className="font-bold text-de-black">Daftar Kata Benda</h3>
              {filteredGenderNouns.map((noun, index) => (
                <GenderNounCard
                  key={index}
                  noun={noun}
                  showArticle={true}
                  onMarkLearned={toggleLearnedNoun}
                  isLearned={learnedNouns.has(noun.noun)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Phrases Section */}
        {activeTab === "phrases" && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="font-bold text-blue-800 mb-2">💬 Frasa Sehari-hari</h3>
              <p className="text-sm text-blue-700">
                Pelajari frasa-frasa yang sering digunakan dalam percakapan sehari-hari. 
                Klik tombol 🔊 untuk mendengarkan pengucapannya!
              </p>
            </div>

            {phrases.map((phrase, index) => {
              const isLearned = learnedPhrases.has(index);
              return (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${
                    isLearned ? 'border-yellow-400 bg-yellow-50/30' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                          {phrase.situation}
                        </span>
                        {isLearned && <Trophy className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                      
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-de-black">{phrase.german}</h4>
                        <TTSLearningButton 
                          text={phrase.german}
                          size="sm"
                          showPronunciation={false}
                        />
                      </div>
                      
                      <p className="text-gray-500 text-sm font-mono mb-1">
                        /{phrase.pronunciation}/
                      </p>
                      <p className="text-gray-600">{phrase.indonesian}</p>
                    </div>
                    
                    <button
                      onClick={() => toggleLearnedPhrase(index)}
                      className={`ml-3 p-2 rounded-xl transition-all ${
                        isLearned
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      <Trophy className={`w-5 h-5 ${isLearned ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pronunciation Section */}
        {activeTab === "pronunciation" && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h3 className="font-bold text-green-800 mb-2">🎙️ Tips Pengucapan</h3>
              <p className="text-sm text-green-700">
                Bahasa Jerman memiliki beberapa bunyi yang unik. Pelajari tips berikut 
                untuk menguasai pengucapan yang benar!
              </p>
            </div>

            {pronunciationTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-de-gold/20 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-black text-de-black">{tip.letter}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dibaca seperti:</p>
                    <p className="font-bold text-de-black">{tip.sound}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{tip.explanation}</p>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-2">Contoh:</p>
                  <div className="space-y-2">
                    {tip.examples.map((example, exIndex) => (
                      <div key={exIndex} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-de-black">{example.german}</span>
                          <TTSLearningButton text={example.german} size="sm" />
                        </div>
                        <span className="text-sm text-gray-500">{example.indonesian}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
