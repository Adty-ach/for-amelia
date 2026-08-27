import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./DreamBackground.module.css";

/** Posisi bintang tetap (bukan random tiap render) — jumlahnya sengaja sedikit. */
const STAR_POSITIONS = [
  { top: "12%", left: "18%", delay: 0 },
  { top: "22%", left: "72%", delay: 0.8 },
  { top: "38%", left: "45%", delay: 1.6 },
  { top: "58%", left: "12%", delay: 0.4 },
  { top: "68%", left: "82%", delay: 1.2 },
  { top: "80%", left: "38%", delay: 2 },
];

/**
 * Background berlapis Dream Mode: charcoal dalam sebagai dasar, glow
 * biru + pink besar (blurred, bukan mesh gradient), beberapa bintang
 * kecil, dan grain sangat halus. Semua CSS/DOM — tidak ada particle
 * engine atau canvas.
 */
export function DreamBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={styles.background} aria-hidden="true">
      <motion.div
        className={styles.glowBlue}
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 20, 0], y: [0, 14, 0], transition: { duration: 22, repeat: Infinity, ease: "easeInOut" } }
        }
      />
      <motion.div
        className={styles.glowPink}
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, -18, 0], y: [0, -12, 0], transition: { duration: 26, repeat: Infinity, ease: "easeInOut" } }
        }
      />
      <div className={styles.glowLavender} />

      {STAR_POSITIONS.map((star, index) => (
        <span
          key={index}
          className={styles.star}
          style={{ top: star.top, left: star.left, animationDelay: `${star.delay}s` }}
        />
      ))}

      <div className={styles.grain} />
    </div>
  );
}
