import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./TurningPointPage.module.css";

interface TurningPointPageProps {
  message: { from: "adit" | "amelia"; text: string };
  narrativeAfter: string[];
}

/**
 * "Kupanggil kakak atau nama aja?" — momen kecil tapi penting.
 * Bubble muncul sendirian di ruang yang lebih kosong, jeda, lalu narasi
 * menyusul baris demi baris. Tidak ada efek besar — momentumnya justru
 * datang dari kesunyian di sekitarnya.
 */
export function TurningPointPage({ message, narrativeAfter }: TurningPointPageProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const bubbleVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3, delay: 0.1 } } }
    : {
        hidden: { opacity: 0, scale: 0.94, y: 8 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 },
        },
      };

  const makeLineVariants = (delay: number): Variants =>
    prefersReducedMotion
      ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3, delay: delay * 0.25 } } }
      : {
          hidden: { opacity: 0, y: 8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay } },
        };

  return (
    <div className={styles.page}>
      <motion.div className={styles.bubble} variants={bubbleVariants} initial="hidden" animate="visible">
        {message.text}
      </motion.div>

      {narrativeAfter.map((line, index) => (
        <motion.p
          key={line}
          className={styles.narrativeLine}
          variants={makeLineVariants(prefersReducedMotion ? index + 1 : 1.5 + index * 0.8)}
          initial="hidden"
          animate="visible"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
