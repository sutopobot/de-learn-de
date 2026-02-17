// Learning Content Data for de-learn-de
// This file contains all learning materials: vocabulary, phrases, gender nouns, pronunciation tips

// Types
export type Article = "der" | "die" | "das";

export interface GenderNoun {
  noun: string;
  article: Article;
  indonesian: string;
  memoryHook?: string;
  pronunciation?: string;
}

// ============================================
// GENDER NOUNS WITH MEMORY HOOKS
// ============================================
// Color coding: der=BLUE (masculine), die=RED (feminine), das=GREEN (neuter)

export const genderNouns: GenderNoun[] = [
  // DER (Masculine) - Blue
  {
    noun: "Vater",
    article: "der",
    indonesian: "Ayah",
    pronunciation: "FAH-ter",
    memoryHook: "Laki-laki → der (biru)",
  },
  {
    noun: "Bruder",
    article: "der",
    indonesian: "Saudara laki-laki",
    pronunciation: "BROO-der",
    memoryHook: "Laki-laki → der (biru)",
  },
  {
    noun: "Mann",
    article: "der",
    indonesian: "Pria/laki-laki",
    pronunciation: "mahn",
    memoryHook: "Laki-laki → der (biru)",
  },
  {
    noun: "Junge",
    article: "der",
    indonesian: "Anak laki-laki",
    pronunciation: "YOONG-eh",
    memoryHook: "Laki-laki → der (biru)",
  },
  {
    noun: "Hund",
    article: "der",
    indonesian: "Anjing",
    pronunciation: "hoont",
    memoryHook: "Der Hund - anjing jantan",
  },
  {
    noun: "Kaffee",
    article: "der",
    indonesian: "Kopi",
    pronunciation: "kah-FEH",
    memoryHook: "Der Kaffee - minuman favorit pria",
  },
  {
    noun: "Tisch",
    article: "der",
    indonesian: "Meja",
    pronunciation: "tish",
    memoryHook: "Der Tisch - meja (kayu keras, maskulin)",
  },
  {
    noun: "Stuhl",
    article: "der",
    indonesian: "Kursi",
    pronunciation: "shtool",
    memoryHook: "Der Stuhl - kursi (pasangan meja)",
  },
  {
    noun: "Tag",
    article: "der",
    indonesian: "Hari/siang",
    pronunciation: "tahk",
    memoryHook: "Der Tag - hari (maskulin, aktif)",
  },
  {
    noun: "Monat",
    article: "der",
    indonesian: "Bulan (waktu)",
    pronunciation: "MOH-naht",
    memoryHook: "Der Monat - bulan dalam kalender",
  },
  {
    noun: "Apfel",
    article: "der",
    indonesian: "Apel",
    pronunciation: "AH-pfel",
    memoryHook: "Der Apfel - buah (kebanyakan buah der)",
  },
  {
    noun: "Baum",
    article: "der",
    indonesian: "Pohon",
    pronunciation: "bowm",
    memoryHook: "Der Baum - pohon (tinggi, maskulin)",
  },

  // DIE (Feminine) - Red
  {
    noun: "Mutter",
    article: "die",
    indonesian: "Ibu",
    pronunciation: "MOO-ter",
    memoryHook: "Perempuan → die (merah)",
  },
  {
    noun: "Schwester",
    article: "die",
    indonesian: "Saudara perempuan",
    pronunciation: "SHVES-ter",
    memoryHook: "Perempuan → die (merah)",
  },
  {
    noun: "Frau",
    article: "die",
    indonesian: "Wanita/perempuan",
    pronunciation: "frow",
    memoryHook: "Perempuan → die (merah)",
  },
  {
    noun: "Tochter",
    article: "die",
    indonesian: "Anak perempuan",
    pronunciation: "TOKH-ter",
    memoryHook: "Perempuan → die (merah)",
  },
  {
    noun: "Katze",
    article: "die",
    indonesian: "Kucing",
    pronunciation: "KAHT-seh",
    memoryHook: "Die Katze - kucing betina",
  },
  {
    noun: "Milch",
    article: "die",
    indonesian: "Susu",
    pronunciation: "milkh",
    memoryHook: "Die Milch - susu (feminim, nutrisi)",
  },
  {
    noun: "Blume",
    article: "die",
    indonesian: "Bunga",
    pronunciation: "BLOO-meh",
    memoryHook: "Die Blume - bunga (cantik, feminim)",
  },
  {
    noun: "Stadt",
    article: "die",
    indonesian: "Kota",
    pronunciation: "shtaht",
    memoryHook: "Die Stadt - kota (indah, feminim)",
  },
  {
    noun: "Schule",
    article: "die",
    indonesian: "Sekolah",
    pronunciation: "SHOO-leh",
    memoryHook: "Die Schule - sekolah (e-akhiran = die)",
  },
  {
    noun: "Tür",
    article: "die",
    indonesian: "Pintu",
    pronunciation: "toor",
    memoryHook: "Die Tür - pintu (akses, feminim)",
  },
  {
    noun: "Zeitung",
    article: "die",
    indonesian: "Koran/surat kabar",
    pronunciation: "TSY-toong",
    memoryHook: "-ung akhiran = die (sangat umum!)",
  },
  {
    noun: "Wohnung",
    article: "die",
    indonesian: "Apartemen/rumah",
    pronunciation: "VOH-noong",
    memoryHook: "-ung akhiran = die (sangat umum!)",
  },

  // DAS (Neuter) - Green
  {
    noun: "Kind",
    article: "das",
    indonesian: "Anak",
    pronunciation: "kint",
    memoryHook: "Das Kind - anak (netral, belum dewasa)",
  },
  {
    noun: "Mädchen",
    article: "das",
    indonesian: "Anak perempuan",
    pronunciation: "MEHT-chen",
    memoryHook: "-chen akhiran = das (kecil/netral)",
  },
  {
    noun: "Brot",
    article: "das",
    indonesian: "Roti",
    pronunciation: "broht",
    memoryHook: "Das Brot - roti (makanan dasar, netral)",
  },
  {
    noun: "Wasser",
    article: "das",
    indonesian: "Air",
    pronunciation: "VAH-ser",
    memoryHook: "Das Wasser - air (netral, esensial)",
  },
  {
    noun: "Buch",
    article: "das",
    indonesian: "Buku",
    pronunciation: "bookh",
    memoryHook: "Das Buch - buku (objek, netral)",
  },
  {
    noun: "Haus",
    article: "das",
    indonesian: "Rumah",
    pronunciation: "hows",
    memoryHook: "Das Haus - rumah (tempat, netral)",
  },
  {
    noun: "Auto",
    article: "das",
    indonesian: "Mobil",
    pronunciation: "OW-toh",
    memoryHook: "Das Auto - mobil (objek, netral)",
  },
  {
    noun: "Fahrrad",
    article: "das",
    indonesian: "Sepeda",
    pronunciation: "FAH-raht",
    memoryHook: "Das Fahrrad - sepeda (objek, netral)",
  },
  {
    noun: "Handy",
    article: "das",
    indonesian: "HP/ponsel",
    pronunciation: "HEN-dee",
    memoryHook: "Das Handy - HP (objek kecil, netral)",
  },
  {
    noun: "Bier",
    article: "das",
    indonesian: "Bir",
    pronunciation: "beer",
    memoryHook: "Das Bier - bir (minuman, netral)",
  },
  {
    noun: "Frühstück",
    article: "das",
    indonesian: "Sarapan",
    pronunciation: "FROO-shtook",
    memoryHook: "Das Frühstück - sarapan (makanan, netral)",
  },
  {
    noun: "Abendessen",
    article: "das",
    indonesian: "Makan malam",
    pronunciation: "AH-bent-es-sen",
    memoryHook: "Das Abendessen - makan malam",
  },
];

// ============================================
// GENDER PATTERNS FOR LEARNING
// ============================================

export const genderPatterns = [
  {
    title: "Akhiran -ung",
    description: "Semua kata benda dengan akhiran -ung adalah feminim (die)",
    article: "die" as Article,
    examples: ["die Zeitung", "die Wohnung", "die Übung", "die Bedeutung"],
  },
  {
    title: "Akhiran -heit / -keit",
    description: "Akhiran -heit dan -keit selalu feminim (die)",
    article: "die" as Article,
    examples: ["die Gesundheit", "die Möglichkeit", "die Schwierigkeit"],
  },
  {
    title: "Akhiran -schaft",
    description: "Akhiran -schaft selalu feminim (die)",
    article: "die" as Article,
    examples: ["die Freundschaft", "die Mannschaft", "die Wirtschaft"],
  },
  {
    title: "Akhiran -chen",
    description: "Akhiran -chen (kecil/verkleinern) selalu netral (das)",
    article: "das" as Article,
    examples: ["das Mädchen", "das Brötchen", "das Männchen"],
  },
  {
    title: "Akhiran -lein",
    description: "Akhiran -lein juga bentuk kecil, selalu netral (das)",
    article: "das" as Article,
    examples: ["das Fräulein", "das Büchlein", "das Vöglein"],
  },
  {
    title: "Profesi Laki-laki",
    description: "Kebanyakan profesi laki-laki menggunakan der",
    article: "der" as Article,
    examples: ["der Lehrer", "der Arzt", "der Koch", "der Fahrer"],
  },
  {
    title: "Profesi Perempuan",
    description: "Profesi perempuan menggunakan die + -in akhiran",
    article: "die" as Article,
    examples: ["die Lehrerin", "die Ärztin", "die Köchin", "die Fahrerin"],
  },
];

// ============================================
// COMMON PHRASES FOR DAILY USE
// ============================================

export interface Phrase {
  german: string;
  indonesian: string;
  pronunciation: string;
  situation: string;
}

export const phrases: Phrase[] = [
  // GREETINGS
  {
    german: "Guten Morgen!",
    indonesian: "Selamat pagi!",
    pronunciation: "GOO-ten MOR-gen",
    situation: "Pagi hari (sebelum jam 10)",
  },
  {
    german: "Guten Tag!",
    indonesian: "Selamat siang!",
    pronunciation: "GOO-ten tahk",
    situation: "Siang hari (jam 10-18)",
  },
  {
    german: "Guten Abend!",
    indonesian: "Selamat malam!",
    pronunciation: "GOO-ten AH-bent",
    situation: "Malam hari (setelah jam 18)",
  },
  {
    german: "Hallo! Wie geht's?",
    indonesian: "Halo! Apa kabar?",
    pronunciation: "HAH-loh vee gayts",
    situation: "Santai dengan teman",
  },
  {
    german: "Auf Wiedersehen!",
    indonesian: "Sampai jumpa!",
    pronunciation: "owf VEE-der-zayn",
    situation: "Formal, saat berpisah",
  },
  {
    german: "Tschüss!",
    indonesian: "Dadah!",
    pronunciation: "choos",
    situation: "Santai, dengan teman",
  },
  {
    german: "Bis später!",
    indonesian: "Sampai nanti!",
    pronunciation: "bis SHPAY-ter",
    situation: "Mau ketemu lagi nanti",
  },
  {
    german: "Bis morgen!",
    indonesian: "Sampai besok!",
    pronunciation: "bis MOR-gen",
    situation: "Mau ketemu besok",
  },

  // POLITE EXPRESSIONS
  {
    german: "Danke schön!",
    indonesian: "Terima kasih banyak!",
    pronunciation: "DAHN-keh shurn",
    situation: "Berterima kasih (formal)",
  },
  {
    german: "Danke! / Vielen Dank!",
    indonesian: "Terima kasih! / Terima kasih banyak!",
    pronunciation: "DAHN-keh / FEE-len dahnk",
    situation: "Berterima kasih",
  },
  {
    german: "Bitte schön!",
    indonesian: "Sama-sama!",
    pronunciation: "BIT-teh shurn",
    situation: "Menjawab terima kasih",
  },
  {
    german: "Entschuldigung!",
    indonesian: "Permisi! / Maaf!",
    pronunciation: "ent-SHOOL-dee-goong",
    situation: "Minta maaf/permisi",
  },
  {
    german: "Es tut mir leid.",
    indonesian: "Saya minta maaf.",
    pronunciation: "es toot meer LYT",
    situation: "Minta maaf lebih formal",
  },
  {
    german: "Kein Problem!",
    indonesian: "Tidak masalah!",
    pronunciation: "kyn proh-BLAYM",
    situation: "Menanggapi permintaan maaf",
  },

  // INTRODUCTIONS
  {
    german: "Wie heißen Sie?",
    indonesian: "Siapa nama Anda? (formal)",
    pronunciation: "vee HY-sen zee",
    situation: "Menanyakan nama (formal)",
  },
  {
    german: "Wie heißt du?",
    indonesian: "Siapa nama kamu? (santai)",
    pronunciation: "vee hyest doo",
    situation: "Menanyakan nama (santai)",
  },
  {
    german: "Ich heiße...",
    indonesian: "Nama saya...",
    pronunciation: "ikh HY-seh",
    situation: "Memperkenalkan diri",
  },
  {
    german: "Ich komme aus Indonesien.",
    indonesian: "Saya dari Indonesia.",
    pronunciation: "ikh KOM-eh ows in-doh-neh-ZHEEN",
    situation: "Mengatakan asal negara",
  },
  {
    german: "Freut mich, Sie kennenzulernen.",
    indonesian: "Senang bertemu Anda.",
    pronunciation: "froyt mikh zee KEN-en-tsoo-lair-nen",
    situation: "Pertemuan pertama (formal)",
  },

  // USEFUL QUESTIONS
  {
    german: "Sprechen Sie Englisch?",
    indonesian: "Apakah Anda berbicara bahasa Inggris?",
    pronunciation: "SHPREH-khen zee ENG-lish",
    situation: "Minta bantuan bahasa",
  },
  {
    german: "Ich verstehe nicht.",
    indonesian: "Saya tidak mengerti.",
    pronunciation: "ikh fair-SHTEH-eh nikht",
    situation: "Tidak mengerti",
  },
  {
    german: "Können Sie das wiederholen?",
    indonesian: "Bisa tolong diulang?",
    pronunciation: "KURN-en zee dahs VEE-der-hoh-len",
    situation: "Minta mengulang",
  },
  {
    german: "Wie sagt man... auf Deutsch?",
    indonesian: "Bagaimana mengatakan... dalam bahasa Jerman?",
    pronunciation: "vee zahkt mahn... owf doytsh",
    situation: "Menanyakan kata",
  },
  {
    german: "Wo ist...?",
    indonesian: "Di mana...?",
    pronunciation: "voh ist",
    situation: "Menanyakan lokasi",
  },
  {
    german: "Wie viel kostet das?",
    indonesian: "Berapa harganya?",
    pronunciation: "vee feel KOS-tet dahs",
    situation: "Menanyakan harga",
  },
  {
    german: "Ich möchte...",
    indonesian: "Saya ingin...",
    pronunciation: "ikh MURKH-teh",
    situation: "Mengungkapkan keinginan",
  },
  {
    german: "Haben Sie...?",
    indonesian: "Apakah Anda punya...?",
    pronunciation: "HAH-ben zee",
    situation: "Menanyakan ketersediaan",
  },

  // RESTAURANT/CAFE
  {
    german: "Die Speisekarte, bitte.",
    indonesian: "Menu, please.",
    pronunciation: "dee SHPY-zeh-kar-teh BIT-teh",
    situation: "Minta menu",
  },
  {
    german: "Ich hätte gerne...",
    indonesian: "Saya ingin pesan...",
    pronunciation: "ikh HET-teh GAIR-neh",
    situation: "Memesan makanan",
  },
  {
    german: "Zum Mitnehmen, bitte.",
    indonesian: "Untuk dibawa pulang.",
    pronunciation: "tsoom MIT-nay-men",
    situation: "Take away",
  },
  {
    german: "Ich bin Vegetarier/in.",
    indonesian: "Saya vegetarian.",
    pronunciation: "ikh bin veh-geh-tah-REER / -REEN",
    situation: "Diet restrictions",
  },
  {
    german: "Die Rechnung, bitte.",
    indonesian: "Tagihannya, please.",
    pronunciation: "dee REKH-noong BIT-teh",
    situation: "Minta bill/tagihan",
  },

  // EMERGENCIES
  {
    german: "Hilfe!",
    indonesian: "Tolong!",
    pronunciation: "HIL-feh",
    situation: "Darurat",
  },
  {
    german: "Ich brauche einen Arzt.",
    indonesian: "Saya butuh dokter.",
    pronunciation: "ikh BROW-kheh EY-nen AR-tsht",
    situation: "Butuh dokter",
  },
  {
    german: "Wo ist das Krankenhaus?",
    indonesian: "Di mana rumah sakit?",
    pronunciation: "voh ist dahs KRAHN-ken-hows",
    situation: "Cari rumah sakit",
  },
  {
    german: "Rufen Sie die Polizei!",
    indonesian: "Panggil polisi!",
    pronunciation: "ROO-fen zee dee poh-li-TSY",
    situation: "Butuh polisi",
  },
];

// ============================================
// PRONUNCIATION TIPS
// ============================================

export interface PronunciationTip {
  letter: string;
  sound: string;
  explanation: string;
  examples: { german: string; indonesian: string }[];
}

export const pronunciationTips: PronunciationTip[] = [
  {
    letter: "ch (setelah i, e, ä, ö, ü)",
    sound: "kh (lembut, seperti menghirup)",
    explanation: "Setelah huruf vokal depan (i, e, ä, ö, ü), 'ch' dibaca seperti suara h lembut dari tenggorokan.",
    examples: [
      { german: "ich", indonesian: "saya" },
      { german: "nicht", indonesian: "tidak" },
      { german: "Mädchen", indonesian: "anak perempuan" },
      { german: "echt", indonesian: "asli" },
    ],
  },
  {
    letter: "ch (setelah a, o, u, au)",
    sound: "kh (keras, seperti menggargaris)",
    explanation: "Setelah huruf vokal belakang (a, o, u, au), 'ch' dibaca lebih keras.",
    examples: [
      { german: "Buch", indonesian: "buku" },
      { german: "auch", indonesian: "juga" },
      { german: "machen", indonesian: "membuat" },
      { german: "noch", indonesian: "masih" },
    ],
  },
  {
    letter: "ß (Eszett)",
    sound: "s (panjang)",
    explanation: "ß dibaca seperti 's' panjang. Hanya muncul setelah vokal panjang.",
    examples: [
      { german: "Straße", indonesian: "jalan" },
      { german: "groß", indonesian: "besar" },
      { german: "weiß", indonesian: "putih" },
      { german: "Fuß", indonesian: "kaki" },
    ],
  },
  {
    letter: "w",
    sound: "v",
    explanation: "Huruf 'w' dalam bahasa Jerman selalu dibaca seperti 'v'.",
    examples: [
      { german: "Wasser", indonesian: "air" },
      { german: "wie", indonesian: "bagaimana" },
      { german: "wo", indonesian: "di mana" },
      { german: "Hallo", indonesian: "halo" },
    ],
  },
  {
    letter: "v",
    sound: "f",
    explanation: "Huruf 'v' dalam bahasa Jerman biasanya dibaca seperti 'f'.",
    examples: [
      { german: "Vater", indonesian: "ayah" },
      { german: "vier", indonesian: "empat" },
      { german: "voll", indonesian: "penuh" },
    ],
  },
  {
    letter: "z",
    sound: "ts",
    explanation: "Huruf 'z' selalu dibaca seperti 'ts'.",
    examples: [
      { german: "Zeit", indonesian: "waktu" },
      { german: "zu", indonesian: "ke" },
      { german: "zwei", indonesian: "dua" },
      { german: "Zeitung", indonesian: "koran" },
    ],
  },
  {
    letter: "j",
    sound: "y",
    explanation: "Huruf 'j' selalu dibaca seperti 'y' dalam 'yes'.",
    examples: [
      { german: "ja", indonesian: "ya" },
      { german: "Jahr", indonesian: "tahun" },
      { german: "jetzt", indonesian: "sekarang" },
      { german: "junge", indonesian: "muda/anak laki-laki" },
    ],
  },
  {
    letter: "eu / äu",
    sound: "oi",
    explanation: "Kombinasi 'eu' dan 'äu' dibaca seperti 'oi'.",
    examples: [
      { german: "Deutschland", indonesian: "Jerman" },
      { german: "neu", indonesian: "baru" },
      { german: "Häuser", indonesian: "rumah-rumah" },
      { german: "Fräulein", indonesian: "nona" },
    ],
  },
  {
    letter: "au",
    sound: "ow (seperti 'owl')",
    explanation: "Kombinasi 'au' dibaca seperti 'ow' dalam bahasa Inggris.",
    examples: [
      { german: "Haus", indonesian: "rumah" },
      { german: "auf", indonesian: "di atas" },
      { german: "Auto", indonesian: "mobil" },
      { german: "August", indonesian: "Agustus" },
    ],
  },
  {
    letter: "ie",
    sound: "ee (panjang)",
    explanation: "Kombinasi 'ie' selalu dibaca panjang seperti 'ee'.",
    examples: [
      { german: "sie", indonesian: "dia/mereka" },
      { german: "Sie", indonesian: "Anda" },
      { german: "Wien", indonesian: "Wina" },
      { german: "Liebe", indonesian: "cinta" },
    ],
  },
  {
    letter: "sch",
    sound: "sh",
    explanation: "Kombinasi 'sch' selalu dibaca seperti 'sh'.",
    examples: [
      { german: "Schule", indonesian: "sekolah" },
      { german: "Deutsch", indonesian: "bahasa Jerman" },
      { german: "Fisch", indonesian: "ikan" },
      { german: "Tisch", indonesian: "meja" },
    ],
  },
  {
    letter: "st / sp (di awal kata)",
    sound: "sht / shp",
    explanation: "Di awal kata, 'st' dan 'sp' dibaca 'sht' dan 'shp'.",
    examples: [
      { german: "Stadt", indonesian: "kota" },
      { german: "Straße", indonesian: "jalan" },
      { german: "Sprache", indonesian: "bahasa" },
      { german: "sprechen", indonesian: "berbicara" },
    ],
  },
  {
    letter: "ü",
    sound: "u dengan bibir rounding ( seperti u dalam 'buku' tapi bibir ditekuk)",
    explanation: "Bunyikan 'i' tapi dengan posisi bibir seperti mau bilang 'u'.",
    examples: [
      { german: "über", indonesian: "di atas" },
      { german: "fünf", indonesian: "lima" },
      { german: "Tür", indonesian: "pintu" },
      { german: "früh", indonesian: "pagi" },
    ],
  },
  {
    letter: "ö",
    sound: "o dengan mulut menyempit",
    explanation: "Bunyikan 'e' tapi dengan posisi bibir seperti mau bilang 'o'.",
    examples: [
      { german: "schön", indonesian: "cantik" },
      { german: "können", indonesian: "bisa" },
      { german: "fröhlich", indonesian: "gembira" },
      { german: "Öl", indonesian: "minyak" },
    ],
  },
  {
    letter: "ä",
    sound: "e (seperti 'bed')",
    explanation: "Ä dibaca seperti 'e' dalam bahasa Inggris 'bed'.",
    examples: [
      { german: "Mädchen", indonesian: "anak perempuan" },
      { german: "ähnlich", indonesian: "mirip" },
      { german: "spät", indonesian: "terlambat" },
      { german: "Bär", indonesian: "beruang" },
    ],
  },
];

// ============================================
// VOCABULARY DATA (ENHANCED)
// ============================================

export interface VocabularyWord {
  german: string;
  indonesian: string;
  pronunciation?: string;
}

export interface VocabularyCategory {
  category: string;
  icon: string;
  words: VocabularyWord[];
}

export const vocabularyData: VocabularyCategory[] = [
  {
    category: "Greetings",
    icon: "👋",
    words: [
      { german: "Hallo", indonesian: "Halo", pronunciation: "HAH-loh" },
      { german: "Guten Morgen", indonesian: "Selamat pagi", pronunciation: "GOO-ten MOR-gen" },
      { german: "Guten Tag", indonesian: "Selamat siang", pronunciation: "GOO-ten tahk" },
      { german: "Guten Abend", indonesian: "Selamat malam", pronunciation: "GOO-ten AH-bent" },
      { german: "Auf Wiedersehen", indonesian: "Sampai jumpa", pronunciation: "owf VEE-der-zayn" },
      { german: "Tschüss", indonesian: "Dadah", pronunciation: "choos" },
      { german: "Danke", indonesian: "Terima kasih", pronunciation: "DAHN-keh" },
      { german: "Bitte", indonesian: "Kembali/silakan", pronunciation: "BIT-teh" },
    ]
  },
  {
    category: "Numbers",
    icon: "🔢",
    words: [
      { german: "Eins", indonesian: "Satu", pronunciation: "eyens" },
      { german: "Zwei", indonesian: "Dua", pronunciation: "tsvy" },
      { german: "Drei", indonesian: "Tiga", pronunciation: "dry" },
      { german: "Vier", indonesian: "Empat", pronunciation: "feer" },
      { german: "Fünf", indonesian: "Lima", pronunciation: "foonf" },
      { german: "Sechs", indonesian: "Enam", pronunciation: "zekhs" },
      { german: "Sieben", indonesian: "Tujuh", pronunciation: "ZEE-ben" },
      { german: "Acht", indonesian: "Delapan", pronunciation: "ahkht" },
      { german: "Neun", indonesian: "Sembilan", pronunciation: "noyn" },
      { german: "Zehn", indonesian: "Sepuluh", pronunciation: "tsayn" },
    ]
  },
  {
    category: "Colors",
    icon: "🎨",
    words: [
      { german: "Rot", indonesian: "Merah", pronunciation: "roht" },
      { german: "Blau", indonesian: "Biru", pronunciation: "blow" },
      { german: "Grün", indonesian: "Hijau", pronunciation: "groon" },
      { german: "Gelb", indonesian: "Kuning", pronunciation: "gelp" },
      { german: "Schwarz", indonesian: "Hitam", pronunciation: "shvahrts" },
      { german: "Weiß", indonesian: "Putih", pronunciation: "veys" },
      { german: "Braun", indonesian: "Coklat", pronunciation: "brown" },
      { german: "Orange", indonesian: "Oranye", pronunciation: "oh-RAHN-zheh" },
    ]
  },
  {
    category: "Family",
    icon: "👨‍👩‍👧‍👦",
    words: [
      { german: "Mutter", indonesian: "Ibu", pronunciation: "MOO-ter" },
      { german: "Vater", indonesian: "Ayah", pronunciation: "FAH-ter" },
      { german: "Schwester", indonesian: "Kakak/adik perempuan", pronunciation: "SHVES-ter" },
      { german: "Bruder", indonesian: "Kakak/adik laki-laki", pronunciation: "BROO-der" },
      { german: "Großmutter", indonesian: "Nenek", pronunciation: "GROHS-moo-ter" },
      { german: "Großvater", indonesian: "Kakek", pronunciation: "GROHS-fah-ter" },
      { german: "Familie", indonesian: "Keluarga", pronunciation: "fah-MEE-lee-eh" },
    ]
  },
  {
    category: "Food & Drinks",
    icon: "🍽️",
    words: [
      { german: "Wasser", indonesian: "Air", pronunciation: "VAH-ser" },
      { german: "Brot", indonesian: "Roti", pronunciation: "broht" },
      { german: "Kaffee", indonesian: "Kopi", pronunciation: "kah-FEH" },
      { german: "Tee", indonesian: "Teh", pronunciation: "teh" },
      { german: "Milch", indonesian: "Susu", pronunciation: "milkh" },
      { german: "Apfel", indonesian: "Apel", pronunciation: "AH-pfel" },
      { german: "Essen", indonesian: "Makan", pronunciation: "ES-sen" },
      { german: "Trinken", indonesian: "Minum", pronunciation: "TRINK-en" },
    ]
  },
  {
    category: "Time",
    icon: "🕐",
    words: [
      { german: "Heute", indonesian: "Hari ini", pronunciation: "HOY-teh" },
      { german: "Morgen", indonesian: "Besok/pagi", pronunciation: "MOR-gen" },
      { german: "Gestern", indonesian: "Kemarin", pronunciation: "GES-tern" },
      { german: "Uhr", indonesian: "Jam", pronunciation: "oor" },
      { german: "Minute", indonesian: "Menit", pronunciation: "mee-NOO-teh" },
      { german: "Woche", indonesian: "Minggu", pronunciation: "VOKH-eh" },
      { german: "Monat", indonesian: "Bulan", pronunciation: "MOH-naht" },
      { german: "Jahr", indonesian: "Tahun", pronunciation: "yahr" },
    ]
  },
  {
    category: "Weather",
    icon: "☀️",
    words: [
      { german: "Sonne", indonesian: "Matahari", pronunciation: "ZON-neh" },
      { german: "Regen", indonesian: "Hujan", pronunciation: "RAY-gen" },
      { german: "Schnee", indonesian: "Salju", pronunciation: "shnay" },
      { german: "Wind", indonesian: "Angin", pronunciation: "vint" },
      { german: "Wolke", indonesian: "Awan", pronunciation: "VOL-keh" },
      { german: "Kalt", indonesian: "Dingin", pronunciation: "kahlt" },
      { german: "Warm", indonesian: "Hangat", pronunciation: "varm" },
      { german: "Heiß", indonesian: "Panas", pronunciation: "heys" },
    ]
  },
  {
    category: "Transport",
    icon: "🚆",
    words: [
      { german: "Bus", indonesian: "Bus", pronunciation: "boos" },
      { german: "Zug", indonesian: "Kereta", pronunciation: "tsoog" },
      { german: "Auto", indonesian: "Mobil", pronunciation: "OW-toh" },
      { german: "Fahrrad", indonesian: "Sepeda", pronunciation: "FAH-raht" },
      { german: "U-Bahn", indonesian: "Kereta bawah tanah", pronunciation: "OO-bahn" },
      { german: "Flugzeug", indonesian: "Pesawat", pronunciation: "FLOOK-tsoyg" },
      { german: "Taxi", indonesian: "Taksi", pronunciation: "TAK-see" },
    ]
  },
];

// ============================================
// LEARNING TIPS
// ============================================

export const learningTips = [
  {
    icon: "💡",
    title: "Cerdas Menggunakan Hearts",
    description: "Anda memiliki 5 nyawa per hari. Setiap kali gagal quiz (>2 jawaban salah), Anda kehilangan 1 nyawa. Tips: Pelajari soal dengan baik sebelum menjawab, gunakan fitur audio untuk listening berulang kali.",
    color: "bg-red-50 border-red-200",
  },
  {
    icon: "🔊",
    title: "Strategi Listening (Hören)",
    description: "Untuk sesi listening: 1) Dengarkan audio dengan fokus penuh, 2) Jika perlu, putar ulang audio, 3) Perhatikan kata kunci dalam pertanyaan, 4) Jangan terburu-buru menjawab.",
    color: "bg-blue-50 border-blue-200",
  },
  {
    icon: "📖",
    title: "Strategi Reading (Lesen)",
    description: "Untuk sesi reading: 1) Baca teks dengan teliti, 2) Identifikasi kata kunci, 3) Bandingkan dengan opsi jawaban, 4) Perhatikan artikel (der, die, das) dan struktur kalimat.",
    color: "bg-green-50 border-green-200",
  },
  {
    icon: "🎯",
    title: "Tingkat Kesulitan",
    description: "Days 1-4: Easy (soal dasar), Days 5-8: Medium (soal menengah), Days 9-14: Hard (soal lebih kompleks). Persiapkan diri dengan belajar vocabulary dari hari-hari sebelumnya.",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    icon: "⭐",
    title: "Pass Threshold",
    description: "Anda perlu minimal 4/5 jawaban benar (80%) untuk lulus. Jika gagal, Anda bisa retry dengan soal yang diacak ulang (jika masih punya nyawa). Jangan menyerah!",
    color: "bg-purple-50 border-purple-200",
  },
  {
    icon: "⏰",
    title: "Konsistensi adalah Kunci",
    description: "Selesaikan quiz setiap hari untuk menjaga streak. Streak membantu membangun kebiasaan belajar yang konsisten. Ingat: Progress tersimpan otomatis!",
    color: "bg-orange-50 border-orange-200",
  },
  {
    icon: "🎨",
    title: "Warna Artikel (der/die/das)",
    description: "Gunakan warna untuk mengingat artikel: BIRU = der (maskulin), MERAH = die (feminim), HIJAU = das (netral). Warna membantu memori visual!",
    color: "bg-pink-50 border-pink-200",
  },
  {
    icon: "🧠",
    title: "Memory Hooks",
    description: "Setiap kata benda memiliki 'memory hook' - petunjuk kecil untuk membantu mengingat artikelnya. Contoh: -ung akhiran selalu die (die Zeitung, die Wohnung).",
    color: "bg-indigo-50 border-indigo-200",
  },
];
