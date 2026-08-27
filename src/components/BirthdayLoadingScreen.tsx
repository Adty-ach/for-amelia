import { motion, type Variants } from "framer-motion";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./BirthdayLoadingScreen.module.css";

interface BirthdayLoadingScreenProps {
  /** Dipanggil sekali setelah sequence selesai — memberi tahu App untuk menampilkan homepage. */
  onComplete: () => void;
}

const EMOJIS = ["🎂", "✨", "🩷", "🌸"];

/**
 * Layar pembuka sebelum "FOR AMELIA" — birthday greeting singkat,
 * bukan loading spinner. Hanya dipasang sekali oleh <App> pada initial
 * visit (lihat useInitialLoading); tidak pernah muncul lagi saat pindah
 * route atau kembali ke homepage dalam sesi yang sama.
 *
 * Fase 6 ("dissolve ke homepage") sengaja TIDAK diimplementasikan sebagai
 * animasi internal — ditangani oleh <AnimatePresence> di App.tsx lewat
 * exit variant komponen ini, sehingga transisi terasa seperti satu
 * experience yang menyambung, bukan dua animasi terpisah.
 */
export function BirthdayLoadingScreen({ onComplete }: BirthdayLoadingScreenProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Total durasi sebelum dissolve dimulai: ~1.7s cinematic, ~0.65s reduced-motion.
  useEffect(() => {
    const holdDuration = prefersReducedMotion ? 650 : 1700;
    const timer = window.setTimeout(onComplete, holdDuration);
    return () => window.clearTimeout(timer);
  }, [onComplete, prefersReducedMotion]);

  const screenVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: prefersReducedMotion ? 0.2 : 0.4 } },
    exit: {
      opacity: 0,
      filter: prefersReducedMotion ? "none" : "blur(10px)",
      transition: { duration: prefersReducedMotion ? 0.25 : 0.5, ease: [0.7, 0, 0.84, 0] },
    },
  };

  const greetingVariants: Variants = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.25, delay: 0.1 } } }
    : {
        initial: { opacity: 0, filter: "blur(6px)", y: 10 },
        animate: {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
        },
      };

  const nameVariants: Variants = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.25, delay: 0.3 } } }
    : {
        initial: { opacity: 0, filter: "blur(8px)", scale: 0.96 },
        animate: {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 },
        },
      };

  const microcopyVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, delay: prefersReducedMotion ? 0.4 : 1.15 },
    },
  };

  const dotsContainerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { delay: prefersReducedMotion ? 0.5 : 1.4, staggerChildren: 0.15 },
    },
  };

  const dotVariants: Variants = prefersReducedMotion
    ? { initial: { opacity: 0.4 }, animate: { opacity: 0.4 } }
    : {
        initial: { opacity: 0.3 },
        animate: { opacity: [0.3, 1, 0.3], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } },
      };

  const emojiContainerVariants: Variants = {
    initial: {},
    animate: {
      transition: { staggerChildren: prefersReducedMotion ? 0.05 : 0.14, delayChildren: prefersReducedMotion ? 0.15 : 0.55 },
    },
  };

  /**
   * Entrance + floating loop digabung dalam SATU variant "animate" (bukan
   * prop `animate` terpisah), supaya tetap ikut orchestration
   * staggerChildren dari parent — memberi transition per-properti berbeda
   * agar opacity/scale hanya main sekali (entrance) sementara y berulang
   * pelan (floating), tanpa saling menimpa.
   */
  const makeEmojiVariants = (index: number): Variants =>
    prefersReducedMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 0.9, transition: { duration: 0.2 } } }
      : {
          initial: { opacity: 0, scale: 0.6, y: 6 },
          animate: {
            opacity: 0.9,
            scale: 1,
            y: [6, 0, -5, 0],
            transition: {
              opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 3.4 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            },
          },
        };

  return (
    <motion.div
      className={styles.screen}
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      role="status"
      aria-label="Membuka halaman ulang tahun untuk Amelia"
    >
      <div className={styles.glow} aria-hidden="true" />

      {/* Fase 3 — Emoji dekoratif, muncul satu per satu */}
      <motion.div variants={emojiContainerVariants} initial="initial" animate="animate" aria-hidden="true">
        {EMOJIS.map((emoji, index) => (
          <motion.span key={emoji} className={styles.emoji} variants={makeEmojiVariants(index)}>
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      <div className={styles.content}>
        {/* Fase 2 — "Happy Birthday" */}
        <motion.p className={styles.greeting} variants={greetingVariants} initial="initial" animate="animate">
          Happy Birthday
        </motion.p>

        {/* Fase 4 — "Amelia", focal point */}
        <motion.h1 className={styles.name} variants={nameVariants} initial="initial" animate="animate">
          Amelia
        </motion.h1>

        <motion.p className={styles.microcopy} variants={microcopyVariants} initial="initial" animate="animate">
          something made just for you
        </motion.p>

        {/* Fase 5 — indikator minimal, bukan spinner */}
        <motion.div
          className={styles.dots}
          variants={dotsContainerVariants}
          initial="initial"
          animate="animate"
          aria-hidden="true"
        >
          <motion.span className={styles.dot} variants={dotVariants} initial="initial" animate="animate" />
          <motion.span className={styles.dot} variants={dotVariants} initial="initial" animate="animate" />
          <motion.span className={styles.dot} variants={dotVariants} initial="initial" animate="animate" />
        </motion.div>
      </div>
    </motion.div>
  );
}
