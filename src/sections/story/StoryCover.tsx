import { motion, type Variants } from "framer-motion";
import { storyMeta } from "../../data/storyMeta";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./StoryCover.module.css";

interface StoryCoverProps {
  onOpen: () => void;
}

/**
 * Cover novel — pintu masuk /story. Editorial, bukan kartu ucapan ulang
 * tahun. "Buka cerita" memicu transisi (ditangani StoryPage) menuju
 * Prologue.
 */
export function StoryCover({ onOpen }: StoryCoverProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0.04 : 0.12, delayChildren: 0.15 },
    },
  };

  const item: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <div className={styles.cover}>
      <div className={styles.glow} aria-hidden="true" />
      <motion.div className={styles.frame} variants={container} initial="hidden" animate="visible">
        <motion.span className={styles.eyebrow} variants={item}>
          {storyMeta.volume}
        </motion.span>
        <motion.h1 className={styles.title} variants={item}>
          {storyMeta.titleLines.map((line) => (
            <span key={line} className={styles.titleLine}>
              {line}
            </span>
          ))}
        </motion.h1>
        <motion.div className={styles.rule} variants={item} aria-hidden="true" />
        <motion.p className={styles.dedication} variants={item}>
          {storyMeta.dedication}
        </motion.p>
        <motion.button type="button" className={styles.openButton} variants={item} onClick={onOpen}>
          {storyMeta.openLabel}
          <span className={styles.openButtonIcon} aria-hidden="true">
            →
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
