/**
 * timelineEvents.ts — Timeline ("How We Got Here")
 * ---------------------------------
 * Setiap event kronologis adalah satu entry. `order` menentukan urutan
 * tampil — BUKAN `date` (tanggal belum semuanya pasti, jadi urutan tetap
 * mengikuti perkembangan hubungan yang sebenarnya, bukan angka tanggal).
 *
 * PENTING: tidak ada tanggal yang dikarang di sini. Event yang belum
 * punya tanggal pasti membiarkan `date` undefined — UI otomatis
 * menyembunyikannya sampai kamu mengisi sendiri, contoh format:
 * "05 Agustus 2026".
 *
 * `relatedChapter` hanya diisi untuk event yang sudah benar-benar punya
 * chapter tertulis di The Story (Prolog, Bab I–III). Event dari Bab IV/V
 * (masih placeholder di chapters.ts) sengaja TIDAK diberi relatedChapter
 * dulu, supaya tidak menunjuk ke bagian cerita yang belum bisa dibaca.
 */

export type TimelineAccent = "rose" | "blue" | "cream";

export interface TimelineEvent {
  id: string;
  order: number;
  label: string;
  date?: string;
  description?: string;
  relatedChapter?: string;
  accent?: TimelineAccent;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "instagram-mutual",
    order: 1,
    label: "Instagram Mutual",
    date: "12 Juli 2026",
    description: "Awalnya hanya sebuah nama di linimasa — mutual, seperti ratusan mutual lainnya.",
    accent: "cream",
  },
  {
    id: "story-rekomendasi-novel",
    order: 2,
    label: "Story Rekomendasi Novel",
    date: "30 Juli 2026",
    description: "Amelia meminta rekomendasi novel lewat Instagram Story — interaksi pertama yang membuka percakapan.",
    relatedChapter: "Bab I — Mutual",
    accent: "rose",
  },
  {
    id: "saling-rekomendasi-buku",
    order: 3,
    label: "Saling Rekomendasi Buku",
    date: "1 Agustus 2026",
    description: "Kami saling memberi rekomendasi buku — salah satu judulnya kemudian menjadi bagian dari cerita ini.",
    relatedChapter: "Bab I — Mutual",
    accent: "blue",
  },
  {
    id: "laut-bercerita",
    order: 4,
    label: "Laut Bercerita",
    date: "1 Agustus 2026",
    description: "Sebuah judul buku yang direkomendasikan Amelia, yang kemudian menjadi bagian dari cerita kami.",
    relatedChapter: "Bab II — Laut Bercerita",
    accent: "rose",
  },
  {
    id: "story-kuesioner",
    order: 5,
    label: "Story Kuesioner",
    date: "2 Agustus 2026",
    description: "Amelia membuat Story tentang kuesioner untuk penelitian kakaknya — permintaan tolong yang sederhana.",
    relatedChapter: "Bab I — Mutual",
    accent: "cream",
  },
  {
    id: "kupanggil-kakak-atau-nama",
    order: 6,
    label: "\u201CKupanggil kakak atau nama aja?\u201D",
    date: "2 Agustus 2026",
    description: "Pertanyaan kecil yang ternyata menjadi salah satu titik perubahan.",
    relatedChapter: "Bab I — Mutual",
    accent: "rose",
  },
  {
    id: "percakapan-berkembang",
    order: 7,
    label: "Percakapan Mulai Berkembang",
    date: "4 Agustus 2026 ++",
    description: "Satu pertanyaan melahirkan pertanyaan lain — obrolan kami mulai punya alasan untuk terus berlanjut.",
    relatedChapter: "Bab I — Mutual",
    accent: "blue",
  },
  {
    id: "pindah-whatsapp",
    order: 8,
    label: "Pindah ke WhatsApp",
    date: "7 Agustus 2026",
    description: "Ruang percakapan menjadi lebih personal.",
    relatedChapter: "Bab III — WhatsApp dan Panggilan Favorit",
    accent: "blue",
  },
  {
    id: "inside-joke-princess",
    order: 9,
    label: "Inside Joke Princess",
    date: "9 Agustus 2026",
    description: "Sebuah panggilan iseng yang kemudian hidup sendiri dalam percakapan kami.",
    relatedChapter: "Bab III — WhatsApp dan Panggilan Favorit",
    accent: "rose",
  },
  {
    id: "mimpi-multiplayer-mode",
    order: 10,
    label: "Percakapan tentang Mimpi / Multiplayer Mode",
    date: "10 Agustus 2026",
    description: "Dari cerita tentang mimpi, kami mengembangkan sebuah ide random: multiplayer mode di dalam mimpi.",
    relatedChapter: "Bab III — WhatsApp dan Panggilan Favorit",
    accent: "blue",
  },
  {
    id: "tempat-bercerita",
    order: 11,
    label: "Adit Mulai Menjadi Tempat Bercerita",
    date: "11 Agustus 2026 ++",
    description: "Amelia mulai membawa cerita yang lebih personal — bukan hanya obrolan ringan.",
    accent: "rose",
  },
  {
    id: "perkenalan-papa",
    order: 12,
    label: "Amelia Memperkenalkan Adit kepada Papa",
    date: "16 Agustus 2026",
    description: "Sebuah momen yang menunjukkan bahwa cerita ini sudah sampai ke lingkungan keluarga Amelia.",
    accent: "rose",
  },
  {
    id: "a-story-about-me",
    order: 13,
    label: "A Story About Me",
    date: "23 Agustus 2026",
    description: "Hari ketika aku tahu Amelia sedang menulis novel tentangku — dan ceritaku harus berakhir bahagia.",
    accent: "rose",
  },
  {
    id: "a-conversation-about-our-future",
    order: 14,
    label: "A Conversation About Our Future",
    date: "24 Agustus 2026",
    description: "Tentang masa depan dan kepercayaan — bahwa kami bisa menjadi rumah satu sama lain.",
    accent: "blue",
  },
  {
    id: "the-journey-to-a-new-chapter",
    order: 15,
    label: "The Journey to a New Chapter",
    date: "28 Agustus 2026",
    description: "Perjalanan menuju kehidupan baru, dengan seseorang yang tetap ingin tahu aku sudah sampai dengan selamat.",
    accent: "cream",
  },
  {
    id: "a-different-world-the-same-little-things",
    order: 16,
    label: "A Different World, the Same Little Things",
    date: "2 September 2026",
    description: "Dunia kampus yang baru, tapi sapaan pagi dan candaan random tetap sama.",
    accent: "rose",
  },
  {
    id: "learning-to-keep-in-touch",
    order: 17,
    label: "Learning to Keep in Touch",
    date: "16 September 2026",
    description: "Sepakat bahwa yang penting tetap saling memberi kabar, tanpa harus selalu tersedia.",
    accent: "blue",
  },
  {
    id: "the-things-we-don-t-want-to-repeat",
    order: 18,
    label: "The Things We Don't Want to Repeat",
    date: "28 September 2026",
    description: "Dari pengalaman masa lalunya, aku mengerti mengapa komunikasi begitu penting baginya.",
    accent: "cream",
  },
  {
    id: "a-little-story-from-my-day",
    order: 19,
    label: "A Little Story from My Day",
    date: "20 September 2026",
    description: "Sebuah ajakan ke gereja yang kuceritakan kepada Amelia — dan dia menanggapinya dengan antusias.",
    accent: "rose",
  },
  {
    id: "the-answer-hidden-in-a-message",
    order: 20,
    label: "The Answer Hidden in a Message",
    date: "10 Oktober 2026",
    description: "Pesan penuh huruf acak yang menyembunyikan tebakan Amelia — rasa penasaran dan malu dalam satu obrolan.",
    accent: "blue",
  },
  {
    id: "cheering-for-her-next-chapter",
    order: 21,
    label: "Cheering for Her Next Chapter",
    date: "20 Oktober 2026",
    description: "Amelia sedang memikirkan masa depannya, dan aku ikut senang serta bangga atas langkahnya.",
    accent: "cream",
  },
  {
    id: "the-first-one-in-her-little-corner",
    order: 22,
    label: "The First One in Her Little Corner ",
    date: "25 Oktober 2026",
    description: "Hari ketika aku jadi orang pertama yang bergabung dengan saluran WhatsApp Amelia, Cerita Akuu.",
    accent: "rose",
  },
];