import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./Envelope.module.css";

interface EnvelopeProps {
  isOpening: boolean;
}

/**
 * Ilustrasi amplop murni CSS (bukan asset gambar) — flap berputar
 * membuka (rotateX) dan surat sedikit muncul dari baliknya saat
 * `isOpening` true. Dipakai LetterPage sebelum transisi ke isi surat.
 */
export function Envelope({ isOpening }: EnvelopeProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={styles.scene}>
      <div className={styles.envelope}>
        <motion.div
          className={styles.letterPeek}
          initial={{ y: 0 }}
          animate={isOpening ? { y: prefersReducedMotion ? -6 : -26 } : { y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className={styles.body} />
        <motion.div
          className={styles.flap}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpening ? -170 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.seal} aria-hidden="true">
            fa.
          </span>
        </motion.div>
      </div>
    </div>
  );
}
