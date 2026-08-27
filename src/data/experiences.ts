/**
 * experiences.ts
 * ---------------------------------
 * Definisi 7 "objek eksplorasi" di homepage. Data struktural (bukan konten
 * personal), dipisahkan dari komponen agar urutan/label mudah disesuaikan
 * tanpa menyentuh HomePage.tsx.
 */

export interface Experience {
  id: string;
  order: number;
  title: string;
  tagline: string;
  path: string;
}

export const experiences: Experience[] = [
  { id: "story", order: 1, title: "The Story", tagline: "our story, one page at a time", path: "/story" },
  { id: "gallery", order: 2, title: "Gallery", tagline: "little moments", path: "/gallery" },
  { id: "i-remember", order: 3, title: "I Remember", tagline: "things I still remember", path: "/remember" },
  { id: "timeline", order: 4, title: "Timeline", tagline: "how we got here", path: "/timeline" },
  { id: "soundtrack", order: 5, title: "Our Soundtrack", tagline: "songs for this little story", path: "/soundtrack" },
  { id: "dream-mode", order: 6, title: "Dream Mode", tagline: "for the conversations that made no sense", path: "/dream" },
  { id: "letter", order: 7, title: "Birthday Letter", tagline: "a letter for you", path: "/letter" },
];
