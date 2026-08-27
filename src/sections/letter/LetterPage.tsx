import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { letterMeta } from "../../data/letterMeta";
import { siteConfig } from "../../data/siteConfig";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { Envelope } from "./Envelope";
import styles from "./LetterPage.module.css";

/** true kalau siteConfig.birthdayDate sudah diisi DAN tanggal itu sudah tiba/lewat. */
function isBirthdayReached(birthdayDate: string | null): boolean {
  if (!birthdayDate) return false;
  const today = new Date();
  const target = new Date(`${birthdayDate}T00:00:00`);
  return today >= target;
}

/**
 * /letter — Birthday Letter.
 *
 * Alur: amplop terkunci ("Surat ini belum waktunya dibuka.") sampai
 * siteConfig.birthdayDate tiba -> tombol "Open the Letter" muncul ->
 * amplop membuka -> surat muncul.
 *
 * Untuk menguji alur buka sebelum hari-H sungguhan: ubah sementara
 * `birthdayDate` di src/data/siteConfig.ts ke tanggal lampau, lalu
 * kembalikan lagi setelah selesai menguji.
 */
export default function LetterPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isUnlocked = useMemo(() => isBirthdayReached(siteConfig.birthdayDate), []);
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);
    window.setTimeout(() => setIsOpened(true), prefersReducedMotion ? 350 : 950);
  };

  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="envelope"
            className={styles.stage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <span className={styles.eyebrow}>07 — Birthday Letter</span>
            <Envelope isOpening={isOpening} />

            {isUnlocked ? (
              <button type="button" className={styles.openButton} onClick={handleOpen} disabled={isOpening}>
                {letterMeta.openLabel}
              </button>
            ) : (
              <p className={styles.lockedMessage}>{letterMeta.lockedMessage}</p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className={styles.letter}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className={styles.salutation}>{letterMeta.salutation}</h1>
            <p className={styles.letterBody}>{letterMeta.placeholderBody}</p>
            <p className={styles.signature}>{letterMeta.signature}</p>
            <Link to="/" className={styles.backLink}>
              Kembali ke beranda
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
