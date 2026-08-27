import { AnimatePresence, animate as animateMotionValue, motion, useMotionValue, type PanInfo } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { dreamContent } from "../../data/dream";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./MultiplayerInteraction.module.css";

interface MultiplayerInteractionProps {
  onMerge?: () => void;
}

/**
 * Interaction 3 — payoff utama Dream Mode. Dua titik cahaya (pink =
 * Amelia, biru = Adit) di ujung sebuah "track". Titik pink bisa di-drag
 * (desktop/mobile) ATAU cukup ditekan (tap/klik/keyboard) sebagai
 * alternatif yang lebih sederhana — keduanya memicu hal yang sama,
 * supaya interaksi ini tidak bergantung sepenuhnya pada drag yang
 * presisi.
 */
export function MultiplayerInteraction({ onMerge }: MultiplayerInteractionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [merged, setMerged] = useState(false);
  const [requiredOffset, setRequiredOffset] = useState(0);
  const pinkX = useMotionValue(0);
  const pinkRef = useRef<HTMLButtonElement>(null);
  const blueRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Ukur jarak sesungguhnya antara dua titik sekali saat mount —
  // dipakai sebagai target, baik untuk drag maupun animasi tap-fallback.
  useEffect(() => {
    const pinkRect = pinkRef.current?.getBoundingClientRect();
    const blueRect = blueRef.current?.getBoundingClientRect();
    if (pinkRect && blueRect) {
      const distance = blueRect.left + blueRect.width / 2 - (pinkRect.left + pinkRect.width / 2);
      setRequiredOffset(distance);
    }
  }, []);

  const triggerMerge = () => {
    if (merged || requiredOffset === 0) return;
    setMerged(true);
    if (prefersReducedMotion) {
      pinkX.set(requiredOffset);
    } else {
      animateMotionValue(pinkX, requiredOffset, { type: "spring", stiffness: 260, damping: 22 });
    }
    onMerge?.();
  };

  const handleDrag = (_event: PointerEvent, info: PanInfo) => {
    if (merged || requiredOffset === 0) return;
    if (info.offset.x >= requiredOffset * 0.8) {
      triggerMerge();
    }
  };

  return (
    <div className={styles.wrapper}>
      {!merged && (
        <>
          <span className={styles.hint}>{dreamContent.multiplayer.hint}</span>
          <span className={styles.instruction}>{dreamContent.multiplayer.instruction}</span>
        </>
      )}

      <div className={styles.track} ref={trackRef}>
        <AnimatePresence>
          {merged && (
            <motion.div
              className={styles.glowBurst}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 0.6], scale: [0.6, 1.5, 1.3] }}
              transition={{ duration: prefersReducedMotion ? 0.3 : 0.9, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        <button
          type="button"
          ref={blueRef}
          className={`${styles.dot} ${styles.blueDot}`}
          onClick={triggerMerge}
          aria-label={`Titik ${dreamContent.multiplayer.blueLabel} — tekan untuk mendekatkan kedua cahaya`}
        >
          <span className={styles.dotLabel} aria-hidden="true">
            {dreamContent.multiplayer.blueLabel}
          </span>
        </button>

        <motion.button
          type="button"
          ref={pinkRef}
          className={`${styles.dot} ${styles.pinkDot}`}
          style={{ x: pinkX }}
          drag={!merged && !prefersReducedMotion ? "x" : false}
          dragConstraints={trackRef}
          dragElastic={0.15}
          onDrag={handleDrag}
          onClick={triggerMerge}
          animate={merged && !prefersReducedMotion ? { x: [null, requiredOffset - 3, requiredOffset + 3, requiredOffset] } : undefined}
          transition={merged ? { duration: 0.3 } : undefined}
          aria-label={`Titik ${dreamContent.multiplayer.pinkLabel} — seret ke titik ${dreamContent.multiplayer.blueLabel}, atau tekan untuk mendekatkan otomatis`}
        >
          <span className={styles.dotLabel} aria-hidden="true">
            {dreamContent.multiplayer.pinkLabel}
          </span>
        </motion.button>
      </div>

      <div className={styles.revealGroup}>
        <AnimatePresence>
          {merged && (
            <>
              <motion.span
                key="primary"
                className={styles.revealPrimary}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0.1 : 0.5 }}
              >
                {dreamContent.multiplayer.revealPrimary}
              </motion.span>
              <motion.span
                key="secondary"
                className={styles.revealSecondary}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0.3 : 1.3 }}
              >
                {dreamContent.multiplayer.revealSecondary}
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
