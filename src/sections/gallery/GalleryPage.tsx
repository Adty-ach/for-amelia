import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { photos } from "../../data/photos";
import { blurRevealVariants, staggerContainer } from "../../utils/motion";
import { GalleryLightbox } from "./GalleryLightbox";
import { PhotoCard } from "./PhotoCard";
import styles from "./GalleryPage.module.css";

/**
 * /gallery — "Little Things". Intro singkat, lalu grid editorial
 * 6-kolom (desktop) dengan bobot visual per foto dihitung otomatis dari
 * posisinya (lihat photoTier.ts) — komponen ini tidak perlu diubah saat
 * foto baru ditambahkan ke data/photos.ts.
 */
export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const goNext = () => setLightboxIndex((i) => (i === null ? null : Math.min(i + 1, photos.length - 1)));
  const goPrevious = () => setLightboxIndex((i) => (i === null ? null : Math.max(i - 1, 0)));
  const close = () => setLightboxIndex(null);

  return (
    <div className={styles.page}>
      <motion.header
        className={styles.intro}
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.introWash} aria-hidden="true" />
        <motion.span className={styles.eyebrow} variants={blurRevealVariants}>
          02 — Gallery
        </motion.span>
        <motion.h1 className={styles.title} variants={blurRevealVariants}>
          Little Things
        </motion.h1>
        <motion.p className={styles.subtitle} variants={blurRevealVariants}>
          little moments
        </motion.p>
      </motion.header>

      {photos.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden="true">
            ◇
          </span>
          <p className={styles.emptyText}>Some pages are still waiting for their photographs.</p>
        </div>
      ) : (
        <motion.div className={styles.grid} variants={staggerContainer(0.06, 0.3)} initial="hidden" animate="visible">
          {photos.map((photo, index) => (
            <PhotoCard key={photo.id} photo={photo} index={index} onOpen={() => setLightboxIndex(index)} />
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox photos={photos} index={lightboxIndex} onClose={close} onNext={goNext} onPrevious={goPrevious} />
        )}
      </AnimatePresence>
    </div>
  );
}
