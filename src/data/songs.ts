/**
 * songs.ts — Our Soundtrack
 * ---------------------------------
 * PENTING: jangan memasukkan file lagu berhak cipta secara otomatis.
 * Taruh file audio yang kamu peroleh secara legal di /public/audio/,
 * lalu pastikan nama filenya cocok dengan `src` di bawah (atau ubah
 * `src`-nya). Isi juga `title`/`artist`/`cover`/`note` sesuai lagu asli
 * — semua bisa diedit di sini tanpa menyentuh komponen SoundtrackPage.
 *
 * Track di bawah ini PLACEHOLDER murni — belum ada audio nyata, dan
 * belum ada lagu yang benar-benar dipilih (title/artist generik,
 * bukan karangan).
 */

export interface Song {
  id: string;
  title: string;
  artist: string;
  /** Path ke file audio di /public/audio/. File belum tentu ada sampai kamu menambahkannya. */
  src: string;
  cover?: string;
  note?: string;
}

export const songs: Song[] = [
  {
    id: "song-01",
    title: "Untitled Track",
    artist: "Menyusul",
    src: "/audio/song-01.mp3",
    note: "Catatan untuk lagu ini akan ditulis nanti.",
  },
  {
    id: "song-02",
    title: "Untitled Track",
    artist: "Menyusul",
    src: "/audio/song-02.mp3",
    note: "Catatan untuk lagu ini akan ditulis nanti.",
  },
  {
    id: "song-03",
    title: "Untitled Track",
    artist: "Menyusul",
    src: "/audio/song-03.mp3",
    note: "Catatan untuk lagu ini akan ditulis nanti.",
  },
];
