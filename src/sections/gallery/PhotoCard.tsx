import { motion } from "framer-motion";
import { useState } from "react";
import type { Photo } from "../../data/photos";
import { slideUpVariants } from "../../utils/motion";
import { getPhotoTier } from "./photoTier";
import styles from "./PhotoCard.module.css";

interface PhotoCardProps {
  photo: Photo;
  index: number;
  onOpen: () => void;
  /** Treatment "archive" — frame lebih tegas, dipakai khusus Our Chapters. */
  framed?: boolean;
}

const tierClass = {
  feature: styles.tierFeature,
  medium: styles.tierMedium,
  small: styles.tierSmall,
};

/**
 * Satu kartu di grid Gallery. Merender <img> jika `photo.src` terisi,
 * atau placeholder bingkai foto jika belum — keduanya memakai
 * aspect-ratio fotografis asli sesuai `photo.orientation` (bukan
 * proporsi kotak yang dipaksakan), dan tetap bisa dibuka ke lightbox.
 */
export function PhotoCard({ photo, index, onOpen, framed = false }: PhotoCardProps) {
  const [loaded, setLoaded] = useState(false);
  const hasImage = Boolean(photo.src);
  const hasMetadata = Boolean(photo.caption || photo.date);
  const tier = getPhotoTier(index);

  return (
    <motion.button
      type="button"
      className={`${styles.card} ${tierClass[tier]} ${framed ? styles.framed : ""}`}
      variants={slideUpVariants}
      onClick={onOpen}
      aria-label={photo.caption ? `Buka foto: ${photo.caption}` : "Buka foto"}
    >
      <div className={`${styles.frame} ${styles[`orientation-${photo.orientation}`]}`}>
        {hasImage ? (
          <img
            src={photo.src}
            alt={photo.alt}
            className={styles.image}
            data-loaded={loaded}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <div className={styles.placeholder} data-tone={photo.placeholderTone ?? "rose"}>
            <PhotoFrameIcon className={styles.placeholderIcon} />
          </div>
        )}

        <div className={styles.overlay}>
          {hasMetadata ? (
            <>
              {photo.date && <span className={styles.overlayDate}>{photo.date}</span>}
              {photo.caption && <span className={styles.overlayCaption}>{photo.caption}</span>}
            </>
          ) : (
            <span className={styles.overlayCaption}>catatan menyusul</span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

function PhotoFrameIcon({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
      <circle cx="9" cy="11" r="2.4" />
      <path d="M14.5 13.5l2.3-2.3a1 1 0 0 1 1.4 0l3.3 3.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}