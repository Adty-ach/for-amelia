/**
 * photos.ts — Gallery ("A Little Album for Amelia")
 * ---------------------------------
 * Setiap foto adalah satu entry di sini. TIDAK ADA stock photo — sampai
 * foto asli dimasukkan, entry di bawah tampil sebagai placeholder frame
 * (dirender oleh <PhotoCard>/<GalleryLightbox>, bukan file gambar).
 *
 * Album ini punya 4 koleksi tetap (lihat `PhotoCollection`). Setiap foto
 * WAJIB masuk salah satu koleksi lewat field `collection` — itulah yang
 * dipakai <GalleryPage> untuk mengelompokkan tampilan jadi 4 bagian
 * dalam satu album, bukan 4 halaman terpisah.
 *
 * CARA MENAMBAH FOTO ASLI (tanpa menyentuh komponen Gallery):
 *   1. Taruh file foto di /public/images/gallery/nama-file.jpg
 *   2. Isi field `src` entry terkait: "/images/gallery/nama-file.jpg"
 *   3. Sesuaikan `orientation` dengan proporsi foto aslinya
 *   4. Pastikan `collection` sudah benar
 *
 * Selama `src` masih kosong, entry otomatis tampil sebagai placeholder
 * memakai `placeholderTone`, dengan aspect-ratio yang tetap sesuai
 * `orientation` — jadi begitu foto asli dimasukkan, layout tidak
 * "lompat" drastis.
 *
 * Ukuran tampilan (feature/medium/small) DIHITUNG OTOMATIS dari posisi
 * foto di array ini — bukan field terpisah — supaya menambah foto baru
 * tidak pernah mengharuskan kamu memikirkan "ukuran apa yang pas".
 */

export type PhotoOrientation = "portrait-tall" | "portrait" | "landscape" | "square";
export type PlaceholderTone = "rose" | "blush" | "blue" | "cream" | "charcoal";

export type PhotoCollection = "her" | "little-things" | "our-chapters" | "through-my-camera";

export const collectionLabels: Record<PhotoCollection, string> = {
  her: "Princess",
  "little-things": "Little Things",
  "our-chapters": "Our Chapters",
  "through-my-camera": "Through My Camera",
};

export interface Photo {
  id: string;
  /** Path ke file di /public/images/gallery/. Kosongkan untuk placeholder. */
  src: string;
  date?: string;
  caption?: string;
  /** Wajib diisi bermakna — dipakai juga untuk placeholder (menjelaskan bahwa ini placeholder). */
  alt: string;
  /** portrait-tall = 4:5, portrait = 3:4, landscape = 3:2, square = 1:1 */
  orientation: PhotoOrientation;
  /** Hanya dipakai saat src kosong. */
  placeholderTone?: PlaceholderTone;
  collection: PhotoCollection;
}

export const photos: Photo[] = [
  // ===== 01 — HER =====
  { id: "her-1", src: "", alt: "Placeholder foto Amelia — menunggu diisi.", orientation: "portrait-tall", placeholderTone: "rose", collection: "her" },
  { id: "her-2", src: "", alt: "Placeholder foto Amelia — menunggu diisi.", orientation: "portrait", placeholderTone: "blush", collection: "her" },
  { id: "her-3", src: "", alt: "Placeholder foto Amelia — menunggu diisi.", orientation: "portrait-tall", placeholderTone: "cream", collection: "her" },

  // ===== 02 — LITTLE THINGS =====
  { id: "little-things-1", src: "", alt: "Placeholder visual — menunggu diisi.", orientation: "square", placeholderTone: "rose", collection: "little-things" },
  { id: "little-things-2", src: "", alt: "Placeholder visual — menunggu diisi.", orientation: "landscape", placeholderTone: "blush", collection: "little-things" },
  { id: "little-things-3", src: "", alt: "Placeholder visual — menunggu diisi.", orientation: "square", placeholderTone: "blue", collection: "little-things" },
  { id: "little-things-4", src: "", alt: "Placeholder visual — menunggu diisi.", orientation: "square", placeholderTone: "cream", collection: "little-things" },

  // ===== 03 — OUR CHAPTERS =====
  { id: "our-chapters-1", src: "", alt: "Placeholder momen cerita — menunggu diisi.", orientation: "landscape", placeholderTone: "charcoal", collection: "our-chapters" },
  { id: "our-chapters-2", src: "", alt: "Placeholder momen cerita — menunggu diisi.", orientation: "landscape", placeholderTone: "rose", collection: "our-chapters" },
  { id: "our-chapters-3", src: "", alt: "Placeholder momen cerita — menunggu diisi.", orientation: "square", placeholderTone: "blush", collection: "our-chapters" },

  // ===== 04 — THROUGH MY CAMERA =====
  { id: "camera-1", src: "", alt: "Placeholder foto kamera Adit — menunggu diisi.", orientation: "landscape", placeholderTone: "charcoal", collection: "through-my-camera" },
  { id: "camera-2", src: "", alt: "Placeholder foto kamera Adit — menunggu diisi.", orientation: "landscape", placeholderTone: "blue", collection: "through-my-camera" },
  { id: "camera-3", src: "", alt: "Placeholder foto kamera Adit — menunggu diisi.", orientation: "square", placeholderTone: "cream", collection: "through-my-camera" },
];