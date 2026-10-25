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
    description: "Awalnya hanya sebuah nama di linimasa — mutual, seperti ratusan mutual lainnya.",
    accent: "cream",
  },
  {
    id: "story-rekomendasi-novel",
    order: 2,
    label: "Story Rekomendasi Novel",
    description: "Amelia meminta rekomendasi novel lewat Instagram Story — interaksi pertama yang membuka percakapan.",
    relatedChapter: "Bab I — Mutual",
    accent: "rose",
  },
  {
    id: "saling-rekomendasi-buku",
    order: 3,
    label: "Saling Rekomendasi Buku",
    description: "Kami saling memberi rekomendasi buku — salah satu judulnya kemudian menjadi bagian dari cerita ini.",
    relatedChapter: "Bab I — Mutual",
    accent: "blue",
  },
  {
    id: "laut-bercerita",
    order: 4,
    label: "Laut Bercerita",
    description: "Sebuah judul buku yang direkomendasikan Amelia, yang kemudian menjadi bagian dari cerita kami.",
    relatedChapter: "Bab II — Laut Bercerita",
    accent: "rose",
  },
  {
    id: "story-kuesioner",
    order: 5,
    label: "Story Kuesioner",
    description: "Amelia membuat Story tentang kuesioner untuk penelitian kakaknya — permintaan tolong yang sederhana.",
    relatedChapter: "Bab I — Mutual",
    accent: "cream",
  },
  {
    id: "kupanggil-kakak-atau-nama",
    order: 6,
    label: "\u201CKupanggil kakak atau nama aja?\u201D",
    description: "Pertanyaan kecil yang ternyata menjadi salah satu titik perubahan.",
    relatedChapter: "Bab I — Mutual",
    accent: "rose",
  },
  {
    id: "percakapan-berkembang",
    order: 7,
    label: "Percakapan Mulai Berkembang",
    description: "Satu pertanyaan melahirkan pertanyaan lain — obrolan kami mulai punya alasan untuk terus berlanjut.",
    relatedChapter: "Bab I — Mutual",
    accent: "blue",
  },
  {
    id: "pindah-whatsapp",
    order: 8,
    label: "Pindah ke WhatsApp",
    description: "Ruang percakapan menjadi lebih personal.",
    relatedChapter: "Bab III — WhatsApp dan Panggilan Favorit",
    accent: "blue",
  },
  {
    id: "inside-joke-princess",
    order: 9,
    label: "Inside Joke Princess",
    description: "Sebuah panggilan iseng yang kemudian hidup sendiri dalam percakapan kami.",
    relatedChapter: "Bab III — WhatsApp dan Panggilan Favorit",
    accent: "rose",
  },
  {
    id: "mimpi-multiplayer-mode",
    order: 10,
    label: "Percakapan tentang Mimpi / Multiplayer Mode",
    description: "Dari cerita tentang mimpi, kami mengembangkan sebuah ide random: multiplayer mode di dalam mimpi.",
    relatedChapter: "Bab III — WhatsApp dan Panggilan Favorit",
    accent: "blue",
  },
  {
    id: "tempat-bercerita",
    order: 11,
    label: "Adit Mulai Menjadi Tempat Bercerita",
    description: "Amelia mulai membawa cerita yang lebih personal — bukan hanya obrolan ringan.",
    accent: "rose",
  },
  {
    id: "perkenalan-papa",
    order: 12,
    label: "Amelia Memperkenalkan Adit kepada Papa",
    description: "Sebuah momen yang menunjukkan bahwa cerita ini sudah sampai ke lingkungan keluarga Amelia.",
    accent: "rose",
  },
];
