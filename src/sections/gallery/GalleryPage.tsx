import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { collectionLabels, photos, type Photo, type PhotoCollection } from "../../data/photos";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { blurRevealVariants, staggerContainer } from "../../utils/motion";
import { GalleryLightbox } from "./GalleryLightbox";
import { PhotoCard } from "./PhotoCard";
import styles from "./GalleryPage.module.css";

type GridVariant = "default" | "tight" | "archive" | "cinematic";

interface CollectionMeta {
  id: PhotoCollection;
  order: string;
  tagline: string;
  gridVariant: GridVariant;
}

/**
 * 4 koleksi tetap album ini. Urutan & tagline adalah copy struktural
 * (bukan data yang berubah-ubah) — makanya hidup di sini, bukan di
 * photos.ts. Menambah FOTO baru tetap cukup lewat photos.ts saja.
 */
const collectionsMeta: CollectionMeta[] = [
  { id: "her", order: "01", tagline: "moments of you", gridVariant: "default" },
  { id: "little-things", order: "02", tagline: "things that remind me of you", gridVariant: "tight" },
  { id: "our-chapters", order: "03", tagline: "pieces of how we got here", gridVariant: "archive" },
  { id: "through-my-camera", order: "04", tagline: "what I saw, and thought of you", gridVariant: "cinematic" },
];

interface PhotoWithIndex {
  photo: Photo;
  /** Index di array `photos` GLOBAL — dipakai lightbox supaya prev/next jalan lintas koleksi. */
  globalIndex: number;
}

function gridClassForVariant(variant: GridVariant): string {
  switch (variant) {
    case "tight":
      return `${styles.grid} ${styles.gridTight}`;
    case "archive":
      return `${styles.grid} ${styles.gridArchive}`;
    case "cinematic":
      return styles.gridCinematic;
    default:
      return styles.grid;
  }
}

/**
 * /gallery — "A Little Album for Amelia". Satu album berkelanjutan berisi
 * 4 koleksi (Her, Little Things, Our Chapters, Through My Camera), bukan
 * 4 halaman terpisah. Collection index di intro men-scroll ke section
 * terkait — storytelling lewat satu alur, bukan filter/tab dashboard.
 *
 * Lightbox tetap pakai index GLOBAL di array `photos` (bukan index per
 * koleksi), jadi previous/next di lightbox jalan melintasi seluruh album
 * sesuai urutan data — konsisten dengan "satu album", bukan galeri
 * ter-filter per kategori.
 */
export default function GalleryPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photosByCollection = useMemo(() => {
    const map = new Map<PhotoCollection, PhotoWithIndex[]>();
    photos.forEach((photo, globalIndex) => {
      const list = map.get(photo.collection) ?? [];
      list.push({ photo, globalIndex });
      map.set(photo.collection, list);
    });
    return map;
  }, []);

  const goNext = () => setLightboxIndex((i) => (i === null ? null : Math.min(i + 1, photos.length - 1)));
  const goPrevious = () => setLightboxIndex((i) => (i === null ? null : Math.max(i - 1, 0)));
  const close = () => setLightboxIndex(null);

  const scrollToCollection = (id: PhotoCollection) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

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
          A Little Album for Amelia
        </motion.h1>
        <motion.p className={styles.subtitle} variants={blurRevealVariants}>
          Some things just remind me of you.
        </motion.p>

        <motion.nav className={styles.collectionIndex} variants={blurRevealVariants} aria-label="Koleksi dalam album">
          {collectionsMeta.map((meta) => (
            <button
              key={meta.id}
              type="button"
              className={styles.collectionIndexItem}
              onClick={() => scrollToCollection(meta.id)}
            >
              <span className={styles.collectionIndexNumber}>{meta.order}</span>
              <span className={styles.collectionIndexLabel}>{collectionLabels[meta.id]}</span>
            </button>
          ))}
        </motion.nav>
      </motion.header>

      {collectionsMeta.map((meta) => {
        const items = photosByCollection.get(meta.id) ?? [];

        return (
          <section key={meta.id} id={meta.id} className={styles.collection}>
            <div className={styles.collectionHeader}>
              <span className={styles.collectionEyebrow}>{meta.order}</span>
              <h2 className={styles.collectionTitle}>{collectionLabels[meta.id]}</h2>
              <p className={styles.collectionTagline}>{meta.tagline}</p>
            </div>

            {items.length === 0 ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon} aria-hidden="true">
                  ◇
                </span>
                <p className={styles.emptyText}>Some pages are still waiting for their photographs.</p>
              </div>
            ) : (
              <motion.div
                className={gridClassForVariant(meta.gridVariant)}
                variants={staggerContainer(0.06, 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {items.map(({ photo, globalIndex }) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    index={globalIndex}
                    framed={meta.id === "our-chapters"}
                    onOpen={() => setLightboxIndex(globalIndex)}
                  />
                ))}
              </motion.div>
            )}
          </section>
        );
      })}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox photos={photos} index={lightboxIndex} onClose={close} onNext={goNext} onPrevious={goPrevious} />
        )}
      </AnimatePresence>
    </div>
  );
}
