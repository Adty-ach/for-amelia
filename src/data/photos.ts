/**
 * photos.ts — Gallery ("Little Things")
 * ---------------------------------
 * Setiap foto adalah satu entry di sini. TIDAK ADA stock photo — sampai
 * foto asli dimasukkan, entry di bawah tampil sebagai placeholder frame
 * (dirender oleh <PhotoCard>/<GalleryLightbox>, bukan file gambar).
 *
 * CARA MENAMBAH FOTO ASLI (tanpa menyentuh komponen Gallery):
 *   1. Taruh file foto di /public/images/gallery/nama-file.jpg
 *   2. Isi field `src` entry terkait: "/images/gallery/nama-file.jpg"
 *   3. Sesuaikan `orientation` dengan proporsi foto aslinya
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
}

export const photos: Photo[] = [
  { id: "placeholder-1", src: "", alt: "Placeholder foto — menunggu diisi.", orientation: "portrait-tall", placeholderTone: "rose" },
  { id: "placeholder-2", src: "", alt: "Placeholder foto — menunggu diisi.", orientation: "landscape", placeholderTone: "blush" },
  { id: "placeholder-3", src: "", alt: "Placeholder foto — menunggu diisi.", orientation: "square", placeholderTone: "blue" },
  { id: "placeholder-4", src: "", alt: "Placeholder foto — menunggu diisi.", orientation: "portrait", placeholderTone: "cream" },
  { id: "placeholder-5", src: "", alt: "Placeholder foto — menunggu diisi.", orientation: "landscape", placeholderTone: "charcoal" },
  { id: "placeholder-6", src: "", alt: "Placeholder foto — menunggu diisi.", orientation: "square", placeholderTone: "rose" },
  { id: "placeholder-7", src: "", alt: "Placeholder foto — menunggu diisi.", orientation: "portrait-tall", placeholderTone: "blush" },
];
