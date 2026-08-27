import { motion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Memory } from "../../data/memories";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { fadeVariants } from "../../utils/motion";
import styles from "./MemoryDetail.module.css";

interface MemoryDetailProps {
  memory: Memory;
  onClose: () => void;
}

/**
 * Detail view satu memory — "halaman kecil dari jurnal". Dirender lewat
 * createPortal ke document.body (pelajaran dari GalleryLightbox):
 * <RouteTransition> membungkus konten halaman dengan motion.div yang
 * punya `filter`, dan itu membuat descendant `position: fixed` jadi
 * relatif ke wrapper itu, bukan ke viewport sungguhan.
 */
export function MemoryDetail({ memory, onClose }: MemoryDetailProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

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
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const cardVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, scale: 0.96, y: 8 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.97, y: 6 },
      };

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
      role="dialog"
      aria-modal="true"
      aria-label={`Memory: ${memory.title}`}
    >
      <motion.div
        className={styles.card}
        data-accent={memory.accent ?? "rose"}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: prefersReducedMotion ? 0.15 : 0.35 }}
      >
        <button type="button" ref={closeButtonRef} className={styles.closeButton} onClick={onClose} aria-label="Tutup">
          <CloseIcon />
        </button>

        <span className={styles.eyebrow}>I Remember</span>
        <span className={styles.accentLine} aria-hidden="true" />
        <h2 className={styles.title}>{memory.title}</h2>
        <p className={styles.note}>{memory.note}</p>

        {(memory.date || memory.relatedChapter) && (
          <div className={styles.footer}>
            {memory.date && <span className={styles.date}>{memory.date}</span>}
            {memory.relatedChapter && <span className={styles.relatedChapter}>{memory.relatedChapter}</span>}
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M3 3l12 12M15 3L3 15" strokeLinecap="round" />
    </svg>
  );
}
