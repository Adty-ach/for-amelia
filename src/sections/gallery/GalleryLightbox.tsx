import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "../../data/photos";
import { useSwipeNavigation } from "../../hooks/useSwipeNavigation";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { fadeVariants } from "../../utils/motion";
import styles from "./GalleryLightbox.module.css";

interface GalleryLightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * Reusable fullscreen image viewer. Dipasang oleh <GalleryPage> saat
 * sebuah foto diklik. Mendukung close (Escape/klik backdrop/tombol),
 * previous/next (klik/panah kiri-kanan/swipe mobile), dan mengembalikan
 * fokus ke elemen yang membuka lightbox saat ditutup.
 *
 * PENTING: dirender lewat createPortal ke document.body, BUKAN di
 * tempat komponen ini dipanggil. <RouteTransition> membungkus seluruh
 * konten halaman dengan motion.div yang punya `filter`/`transform` —
 * itu membuat ancestor tersebut jadi containing block baru untuk semua
 * descendant `position: fixed`, sehingga "fixed" tidak lagi relatif ke
 * viewport sungguhan. Portal membebaskan lightbox dari wrapper itu,
 * sekaligus mencegah browser auto-scroll aneh saat close button di-fokus.
 */
export function GalleryLightbox({ photos, index, onClose, onNext, onPrevious }: GalleryLightboxProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const photo = photos[index];

  useEffect(() => {
    triggerElementRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus({ preventScroll: true });

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      triggerElementRef.current?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") onNext();
      else if (event.key === "ArrowLeft") onPrevious();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  const swipeHandlers = useSwipeNavigation({ onSwipeLeft: onNext, onSwipeRight: onPrevious });

  if (!photo) return null;

  return createPortal(
    <motion.div
      className={styles.overlay}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onTouchStart={swipeHandlers.onTouchStart}
      onTouchEnd={swipeHandlers.onTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption ? `Foto: ${photo.caption}` : "Pratinjau foto"}
    >
      <button type="button" ref={closeButtonRef} className={styles.closeButton} onClick={onClose} aria-label="Tutup">
        <CloseIcon />
      </button>

      <button
        type="button"
        className={`${styles.navButton} ${styles.navPrevious}`}
        onClick={onPrevious}
        disabled={index === 0}
        aria-label="Foto sebelumnya"
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        className={`${styles.navButton} ${styles.navNext}`}
        onClick={onNext}
        disabled={index === photos.length - 1}
        aria-label="Foto berikutnya"
      >
        <ArrowIcon direction="right" />
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={photo.id}
          className={styles.stage}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.3 }}
        >
          <div className={styles.imageWrap}>
            {photo.src ? (
              <img src={photo.src} alt={photo.alt} className={styles.image} />
            ) : (
              <div
                className={styles.placeholder}
                data-tone={photo.placeholderTone ?? "rose"}
                data-orientation={photo.orientation}
              >
                <PhotoFrameIcon className={styles.placeholderIcon} />
              </div>
            )}
          </div>

          <div className={styles.meta}>
            {photo.date && <span className={styles.metaDate}>{photo.date}</span>}
            <span className={styles.metaCaption} data-fallback={!photo.caption}>
              {photo.caption ?? "Catatan untuk momen ini menyusul."}
            </span>
          </div>

          <span className={styles.counter} aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>,
    document.body,
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M3 3l12 12M15 3L3 15" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left" ? "M11 3L5 9l6 6" : "M7 3l6 6-6 6";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhotoFrameIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
      <circle cx="9" cy="11" r="2.4" />
      <path d="M14.5 13.5l2.3-2.3a1 1 0 0 1 1.4 0l3.3 3.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
