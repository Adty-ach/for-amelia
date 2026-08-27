export type PhotoTier = "feature" | "medium" | "small";

/**
 * Menentukan bobot visual sebuah foto dari posisinya di array — bukan
 * dari field data terpisah. Foto pertama dan setiap foto ke-6 jadi
 * "feature" (anchor besar), pola ke-3 jadi "medium", sisanya "small".
 * Ini membuat hierarki visual (1–2 foto besar + pendukung) muncul
 * otomatis untuk berapa pun jumlah foto, tanpa perlu dikurasi manual
 * tiap kali menambah foto baru.
 */
export function getPhotoTier(index: number): PhotoTier {
  if (index % 5 === 0) return "feature";
  if (index % 3 === 0) return "medium";
  return "small";
}
