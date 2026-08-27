/**
 * dream.ts — Dream Mode
 * ---------------------------------
 * Semua copy Dream Mode dikumpulkan di sini, terpisah dari komponen.
 * Isinya hanya interpretasi dari canon yang sudah diberikan:
 * - Amelia pernah bermimpi dikejar sesuatu.
 * - Amelia pernah mengalami mimpi di dalam mimpi, sempat bingung apakah
 *   sudah benar-benar bangun, dan mencubit tangannya sendiri untuk cek.
 * - Bercanda soal "multiplayer mode" di dalam mimpi, dan janji bertemu
 *   di dalam mimpi sebelum tidur.
 *
 * Tidak ada dialog atau kejadian lain yang ditambahkan di luar itu.
 */

export const dreamContent = {
  entry: {
    title: "Dream Mode",
    tagline: "Kalau mimpi punya multiplayer mode...",
    enterLabel: "Masuk",
  },

  floatingWords: ["bangun?", "ini mimpi?"],

  touch: {
    prompt: "sentuh",
    reveal: "Masih di mimpi?",
  },

  pinch: {
    prompt: "Cubit tangan sendiri.",
    reveal: "belum bangun.",
  },

  multiplayer: {
    hint: "multiplayer mode?",
    instruction: "dekatkan dua cahaya ini",
    revealPrimary: "koneksi tersambung.",
    revealSecondary: "ternyata bisa.",
    pinkLabel: "Amelia",
    blueLabel: "Adit",
  },

  exit: {
    wake: "Bangun",
    back: "Kembali ke beranda",
  },
} as const;
