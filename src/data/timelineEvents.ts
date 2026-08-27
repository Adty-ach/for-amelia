/**
 * timelineEvents.ts — Timeline ("How We Got Here")
 * ---------------------------------
 * Setiap event kronologis adalah satu entry. `order` menentukan urutan
 * tampil. PENTING: tidak ada tanggal yang dikarang di sini — event yang
 * belum punya tanggal pasti cukup mengandalkan urutan/label, `date`
 * dibiarkan kosong (undefined) sampai tanggal aslinya diberikan.
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
    id: "event-mutual",
    order: 1,
    label: "Instagram Mutual",
    description: "Amelia hanya satu dari sekian nama yang muncul di linimasa — mutual, seperti ratusan mutual lainnya.",
    accent: "cream",
  },
  {
    id: "event-story-recommendation",
    order: 2,
    label: "Sebuah Story",
    description: "Amelia meminta rekomendasi novel lewat Instagram Story. Kali ini, aku membalasnya.",
    relatedChapter: "Chapter I — Sebuah Story",
    accent: "rose",
  },
  {
    id: "event-laut-bercerita",
    order: 3,
    label: "Laut Bercerita",
    description: "Amelia gantian memberi rekomendasi novel. Aku benar-benar membacanya, sedikit demi sedikit.",
    relatedChapter: "Chapter II — Laut Bercerita",
    accent: "rose",
  },
  {
    id: "event-kuesioner",
    order: 4,
    label: "Sebuah Kuesioner",
    description: "Story lain muncul — kuesioner untuk penelitian kakaknya. Aku mengisinya tanpa pikir panjang.",
    relatedChapter: "Chapter III — Sebuah Kuesioner",
    accent: "blue",
  },
  {
    id: "event-turning-point",
    order: 5,
    label: "\u201cKupanggil kakak atau nama aja?\u201d",
    description: "Pertanyaan kecil yang mengubah nada semuanya.",
    relatedChapter: "Chapter III — Sebuah Kuesioner",
    accent: "rose",
  },
  {
    id: "event-whatsapp",
    order: 6,
    label: "Dari Instagram ke WhatsApp",
    description: "Percakapan pindah ruang. Bagian berikutnya dari cerita ini menyusul.",
    accent: "blue",
  },
];
