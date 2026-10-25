/**
 * songs.ts — Our Soundtrack
 * ---------------------------------
 * PENTING: jangan memasukkan file lagu berhak cipta secara otomatis.
 * Taruh file audio yang kamu peroleh secara legal di /public/audio/,
 * lalu pastikan nama filenya cocok dengan `src` di bawah (atau ubah
 * `src`-nya). Isi juga `title`/`artist`/`cover`/`note` sesuai lagu asli
 * — semua bisa diedit di sini tanpa menyentuh komponen SoundtrackPage.
 *
 * Daftar lagu favorit Amelia. `note` boleh ditambah per lagu kapan saja
 * (kalau kosong, tidak ditampilkan).
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
  { id: "song-01", title: "Purple", artist: "Olivia Rodrigo", src: "/audio/purple-olivia.mp3" },
  { id: "song-02", title: "Drop Dead", artist: "Olivia Rodrigo", src: "/audio/dropdead-olivia.mp3" },
  { id: "song-03", title: "About You", artist: "The 1975", src: "/audio/aboutyou-1975.mp3" },
  { id: "song-04", title: "XXL", artist: "LANY", src: "/audio/xxl-lany.mp3" },
  { id: "song-05", title: "Daylight", artist: "Taylor Swift", src: "/audio/daylight-taylor.mp3" },
  { id: "song-06", title: "Mata Ke Hati", artist: "Hivi!", src: "/audio/matakehati-hivi.mp3" },
  { id: "song-07", title: "Pelangi", artist: "Hivi!", src: "/audio/pelangi-hivi.mp3" },
];
