# FOR AMELIA

Personal interactive birthday experience — dibangun bertahap.

Dokumen sumber kebenaran untuk arah kreatif & teknis: `for-amelia-blueprint.md` (Tahap 1).

## Menjalankan project

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

Build production:

```bash
npm run build
npm run preview
```

## Status: Tahap 2 — Foundation

Sudah tersedia: design tokens, typography system, motion system, routing +
lazy loading, homepage (threshold -> title reveal -> 7 exploration objects),
home anchor (pengganti navbar), page transition system, music player
foundation (belum ada lagu asli), 7 section shell (placeholder), struktur
data kosong untuk chapter/photo/memory/timeline event/song.

Belum diimplementasikan (sengaja, menyusul di tahap berikutnya): isi novel
The Story, foto Gallery, isi I Remember, event Timeline nyata, lagu
Soundtrack nyata, Dream Mode penuh, isi & unlock system Birthday Letter.

## Menambahkan konten di kemudian hari

Semua konten personal hidup di `src/data/*.ts`, terpisah dari komponen UI:

- `chapters.ts` — chapter novel The Story
- `photos.ts` — foto Gallery (taruh file asli di `public/gallery/`)
- `memories.ts` — entri I Remember
- `timelineEvents.ts` — event Timeline
- `songs.ts` — lagu Soundtrack (taruh file audio legal di `public/audio/`)
- `siteConfig.ts` — teks global & `birthdayDate`

Menambah 1 entry ke array yang relevan sudah cukup — tidak perlu menyentuh komponen.
