export type MemoryTier = "feature" | "medium" | "small";

/**
 * Sama prinsipnya dengan photoTier.ts di Gallery: bobot visual dihitung
 * dari posisi di array, bukan field data terpisah, supaya menambah
 * memory baru tidak perlu mikirin ukuran.
 */
export function getMemoryTier(index: number): MemoryTier {
  if (index % 5 === 0) return "feature";
  if (index % 3 === 0) return "medium";
  return "small";
}
