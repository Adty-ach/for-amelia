/**
 * memories.ts — I Remember
 * ---------------------------------
 * Detail-detail kecil tentang Amelia yang diingat Adit. Setiap entry
 * adalah satu "catatan" di memory desk.
 *
 * PENTING: belum semua memory final dimasukkan. Placeholder di bawah
 * SENGAJA memakai wording generik ("akan diisi nanti") — tidak ada satu
 * pun detail yang dikarang tentang Amelia. Saat memory asli siap, ganti
 * `title`/`note` (dan isi field opsional lain) tanpa menyentuh komponen.
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
  { id: "memory-01", title: "Detail kecil #1", note: "Detail kecil ini akan diisi nanti.", category: "little-things", accent: "rose" },
  { id: "memory-02", title: "Detail kecil #2", note: "Detail kecil ini akan diisi nanti.", category: "books", accent: "blue" },
  { id: "memory-03", title: "Detail kecil #3", note: "Detail kecil ini akan diisi nanti.", category: "jokes", accent: "cream" },
  { id: "memory-04", title: "Detail kecil #4", note: "Detail kecil ini akan diisi nanti.", category: "school", accent: "rose" },
  { id: "memory-05", title: "Detail kecil #5", note: "Detail kecil ini akan diisi nanti.", category: "dreams", accent: "blue" },
  { id: "memory-06", title: "Detail kecil #6", note: "Detail kecil ini akan diisi nanti.", category: "inside-jokes", accent: "rose" },
  { id: "memory-07", title: "Detail kecil #7", note: "Detail kecil ini akan diisi nanti.", category: "little-things", accent: "cream" },
];
