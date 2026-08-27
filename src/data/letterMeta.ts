/**
 * letterMeta.ts — Birthday Letter
 * ---------------------------------
 * Copy shell untuk /letter. Status buka/tutup ditentukan oleh
 * `siteConfig.birthdayDate` (lihat data/siteConfig.ts) — kalau tanggal
 * itu belum tiba, surat tetap terkunci apa pun yang terjadi di sini.
 *
 * PENTING: `placeholderBody` SENGAJA bukan ucapan ulang tahun asli.
 * Isi surat final ditulis belakangan, mendekati hari-H — bukan sekarang.
 */

export const letterMeta = {
  lockedMessage: "Surat ini belum waktunya dibuka.",
  openLabel: "Open the Letter",
  salutation: "Untuk Amelia",
  placeholderBody: "Ucapan ulang tahun akan ditulis di sini, mendekati hari-H.",
  signature: "— Adit",
};
