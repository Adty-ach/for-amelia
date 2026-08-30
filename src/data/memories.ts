/**
 * memories.ts — I Remember
 * ---------------------------------
 * Detail-detail kecil tentang Amelia yang diingat Adit. Setiap entry
 * adalah satu "catatan" di memory desk.
 *
 * Semua isi di bawah ini ditelusuri langsung dari canon percakapan yang
 * sudah diberikan — bukan tebakan, bukan fakta baru. Memory tentang
 * "Papa" dan "Hilmi" ditulis hati-hati: hanya fakta yang memang
 * diberikan (dekat dengan Papa, sudah pernah diceritakan, sudah
 * diperkenalkan / pernah dibandingkan dengan karakter Hilmi) — tidak ada
 * kesimpulan tambahan soal status hubungan atau restu keluarga.
 *
 * Ukuran tampilan (feature/medium/small) dihitung otomatis dari posisi
 * di array ini — sama seperti Gallery — supaya menambah memory baru
 * tidak pernah mengharuskan mikirin "ukuran apa yang pas".
 */

export type MemoryCategory =
  | "books"
  | "jokes"
  | "dreams"
  | "school"
  | "little-things"
  | "inside-jokes";

export type MemoryAccent = "rose" | "blue" | "cream";

export interface Memory {
  id: string;
  title: string;
  note: string;
  date?: string;
  category?: MemoryCategory;
  accent?: MemoryAccent;
  /** Label bebas, misal "Chapter II — Laut Bercerita". Bukan link, hanya konteks. */
  relatedChapter?: string;
}

export const memories: Memory[] = [
  {
    id: "memory-pink",
    title: "Pink",
    note: "Salah satu warna yang sekarang otomatis membuatku mengingatmu.",
    category: "little-things",
    accent: "rose",
  },
  {
    id: "memory-strawberry",
    title: "Strawberry",
    note: "Satu detail kecil yang sebenarnya sederhana. Tapi tetap saja masuk ke daftar hal yang kuingat tentangmu.",
    category: "little-things",
    accent: "rose",
  },
  {
    id: "memory-novel",
    title: "Novel",
    note: "Buku bukan sekadar bacaan buatmu — sering jadi cara memulai obrolan panjang.",
    category: "books",
    accent: "cream",
  },
  {
    id: "memory-laut-bercerita",
    title: "Laut Bercerita",
    note: "Judul yang kamu rekomendasikan, dan ternyata ikut menjadi bagian dari cerita kita.",
    category: "books",
    accent: "rose",
    relatedChapter: "Bab II — Laut Bercerita",
  },
  {
    id: "memory-harry-potter",
    title: "Harry Potter",
    note: "Salah satu semesta cerita favoritmu — belum sempat kubahas panjang, tapi sudah kucatat.",
    category: "books",
    accent: "blue",
  },
  {
    id: "memory-hidden-love",
    title: "Hidden Love",
    note: "C-drama favoritmu. Aku belum nonton, tapi aku tahu judulnya karena kamu yang cerita.",
    category: "little-things",
    accent: "rose",
  },
  {
    id: "memory-papa",
    title: "Papa",
    note: "Salah satu hal yang cukup membekas: tahu bahwa kamu sudah pernah cerita tentangku ke Papa, dan akhirnya aku diperkenalkan.",
    category: "little-things",
    accent: "rose",
  },
  {
    id: "memory-hilmi",
    title: "Hilmi",
    note: "Salah satu perbandingan paling random yang pernah muncul dalam percakapan kita — katanya aku mirip Hilmi.",
    category: "inside-jokes",
    accent: "blue",
  },
  {
    id: "memory-psikologi",
    title: "Psikologi",
    note: "Salah satu topik yang sering muncul di obrolan kita — kamu tertarik ke sana.",
    category: "school",
    accent: "blue",
  },
  {
    id: "memory-fisika",
    title: "Fisika",
    note: "Katanya kamu tertarik fisika. Kita sempat bercanda soal saling mengajari — walau belum benar-benar jadi kegiatan rutin.",
    category: "school",
    accent: "blue",
  },
  {
    id: "memory-tka",
    title: "TKA",
    note: "Salah satu hal yang lagi kamu persiapkan — bagian dari kesibukanmu belakangan ini.",
    category: "school",
    accent: "cream",
  },
  {
    id: "memory-mimpi",
    title: "Mimpi",
    note: "Kamu pernah cerita soal mimpi — termasuk kebiasaan mencubit tangan sendiri untuk cek apakah sudah benar-benar bangun.",
    category: "dreams",
    accent: "blue",
  },
  {
    id: "memory-princess",
    title: "Princess",
    note: "Panggilan iseng yang entah kenapa malah menempel dan jadi kebiasaan.",
    category: "inside-jokes",
    accent: "rose",
  },
  {
    id: "memory-multiplayer-mode",
    title: "Multiplayer Mode",
    note: "Ide random soal mimpi yang bisa dimasuki berdua. Salah satu inside joke favoritku.",
    category: "inside-jokes",
    accent: "blue",
    relatedChapter: "Bab III — WhatsApp dan Panggilan Favorit",
  },
  {
    id: "memory-topik-baru",
    title: "Topik Baru",
    note: "Kamu punya cara sendiri membuat satu topik berkembang jadi lima topik lain.",
    category: "little-things",
    accent: "cream",
  },
  {
    id: "memory-gaya-chat",
    title: "Gaya Chat",
    note: "Kata-kata dipanjangkan, satu pesan jadi beberapa bubble, dan selalu ada pertanyaan balik. Aku jadi hafal polanya.",
    category: "little-things",
    accent: "cream",
  },
  {
    id: "memory-nyaman-ngobrol",
    title: "Nyaman Ngobrol",
    note: "Kamu pernah bilang nyaman ngobrol denganku. Kalimat sederhana yang kubiarkan tetap sesederhana itu.",
    category: "little-things",
    accent: "rose",
  },
  {
    id: "memory-diingat",
    title: "Diingat",
    note: "Kamu bilang senang karena hal-hal kecil yang pernah kamu ceritakan ternyata masih kuingat. Aku juga senang dengar itu.",
    category: "little-things",
    accent: "rose",
  },
];
