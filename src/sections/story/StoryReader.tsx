import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { chapters, type StoryPage as StoryPageData } from "../../data/chapters";
import { useSwipeNavigation } from "../../hooks/useSwipeNavigation";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { ChapterTitleScreen, StoryPageContent } from "./StoryPageContent";
import { TurningPointPage } from "./TurningPointPage";
import styles from "./StoryReader.module.css";

type FlatEntry =
  | { kind: "chapter-title"; key: string; eyebrow: string; title: string; subtitle?: string }
  | { kind: "page"; key: string; chapterLabel: string; page: StoryPageData };

/** Angka romawi kecil (1–10 cukup untuk kebutuhan jumlah chapter di sini). */
function toRoman(num: number): string {
  const map: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let n = num;
  let result = "";
  for (const [value, symbol] of map) {
    while (n >= value) {
      result += symbol;
      n -= value;
    }
  }
  return result;
}

/**
 * Reading engine The Story. Meratakan seluruh chapter "available" menjadi
 * satu urutan page linear (mirip buku sungguhan: tiap chapter dibuka
 * dengan halaman judulnya sendiri), lalu mengelola navigasi + transisi.
 *
 * Chapter "placeholder" tidak ikut diratakan — begitu user mencapai akhir
 * konten yang tersedia, ditampilkan layar "coming soon" yang mendaftar
 * judul chapter tersebut, bukan halaman kosong.
 */
export function StoryReader() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);

  const flatEntries = useMemo<FlatEntry[]>(() => {
    const available = [...chapters].filter((c) => c.status === "available").sort((a, b) => a.order - b.order);
    const entries: FlatEntry[] = [];

    for (const chapter of available) {
      const eyebrow = chapter.order === 0 ? "Prolog" : `Bab ${toRoman(chapter.order)}`;
      entries.push({
        kind: "chapter-title",
        key: `${chapter.id}-title`,
        eyebrow,
        title: chapter.title,
        subtitle: chapter.subtitle,
      });
      for (const page of chapter.pages) {
        entries.push({ kind: "page", key: page.id, chapterLabel: eyebrow, page });
      }
    }
    return entries;
  }, []);

  const placeholderChapters = useMemo(
    () => [...chapters].filter((c) => c.status === "placeholder").sort((a, b) => a.order - b.order),
    [],
  );

  const total = flatEntries.length;
  const isAtEnd = index >= total;
  const currentEntry = isAtEnd ? null : flatEntries[index];

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((current) => Math.min(current + 1, total));
  }, [total]);

  const goPrevious = useCallback(() => {
    setDirection(-1);
    setIndex((current) => Math.max(current - 1, 0));
  }, []);

  // Navigasi keyboard — panah kiri/kanan, tersedia di seluruh reader.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      else if (event.key === "ArrowLeft") goPrevious();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious]);

  const swipeHandlers = useSwipeNavigation({ onSwipeLeft: goNext, onSwipeRight: goPrevious });

  // Scroll restoration: mulai dari atas setiap pindah page/chapter, supaya
  // reader tidak "terjebak" di posisi scroll halaman sebelumnya.
  useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [index]);

  const chapterLabel = isAtEnd
    ? "Bersambung"
    : currentEntry!.kind === "chapter-title"
      ? currentEntry!.eyebrow
      : currentEntry!.chapterLabel;

  const isChapterTitle = currentEntry?.kind === "chapter-title";
  const isTurningPoint = currentEntry?.kind === "page" && currentEntry.page.type === "turning-point";
  const transitionDuration = prefersReducedMotion ? 0.2 : isChapterTitle ? 0.65 : 0.4;

  const pageVariants: Variants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 20 : -20, filter: "blur(6px)" }),
        center: { opacity: 1, x: 0, filter: "blur(0px)" },
        exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -20 : 20, filter: "blur(6px)" }),
      };

  return (
    <div className={styles.reader} data-quiet={isTurningPoint}>
      <header className={styles.header}>
        <span className={styles.chapterLabel}>{chapterLabel}</span>
      </header>

      <div
        ref={viewportRef}
        className={styles.viewport}
        onTouchStart={swipeHandlers.onTouchStart}
        onTouchEnd={swipeHandlers.onTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={isAtEnd || !currentEntry ? "coming-soon" : currentEntry.key}
            className={styles.animatedPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: transitionDuration, ease: [0.16, 1, 0.3, 1] }}
          >
            {isAtEnd || !currentEntry ? (
              <div className={styles.comingSoon}>
                <span className={styles.comingSoonEyebrow}>Bersambung</span>
                <p className={styles.comingSoonNote}>
                  Cerita ini akan terus bertambah — sedikit demi sedikit, sampai hari itu tiba.
                </p>
                <div className={styles.comingSoonList}>
                  {placeholderChapters.map((chapter) => (
                    <span key={chapter.id} className={styles.comingSoonItem}>
                      Bab {toRoman(chapter.order)} · {chapter.title}
                    </span>
                  ))}
                </div>
              </div>
            ) : currentEntry.kind === "chapter-title" ? (
              <ChapterTitleScreen
                eyebrow={currentEntry.eyebrow}
                title={currentEntry.title}
                subtitle={currentEntry.subtitle}
              />
            ) : currentEntry.page.type === "turning-point" ? (
              <TurningPointPage message={currentEntry.page.message} narrativeAfter={currentEntry.page.narrativeAfter} />
            ) : (
              <StoryPageContent page={currentEntry.page} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <nav className={styles.navBar} aria-label="Navigasi halaman The Story">
        <button
          type="button"
          className={styles.navButton}
          onClick={goPrevious}
          disabled={index === 0}
          aria-label="Halaman sebelumnya"
        >
          <span aria-hidden="true">←</span> Prev
        </button>
        <span className={styles.pageIndicator} aria-live="polite">
          {isAtEnd ? "Bersambung" : `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
        </span>
        <button
          type="button"
          className={styles.navButton}
          onClick={goNext}
          disabled={isAtEnd}
          aria-label="Halaman berikutnya"
        >
          Next <span aria-hidden="true">→</span>
        </button>
      </nav>
    </div>
  );
}
