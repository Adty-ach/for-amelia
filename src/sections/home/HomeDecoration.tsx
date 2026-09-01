import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useHasFinePointer } from "../../hooks/usePointerType";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./HomeDecoration.module.css";

interface HomeDecorationProps {
  variant: "hero" | "field";
}

/**
 * Sentuhan dekoratif yang sangat halus untuk homepage.
 *
 * Bukan hiasan ulang tahun — hanya beberapa "detail kecil yang sengaja
 * ditaruh": dua sparkle tipis + satu garis editorial di hero, dan
 * sepasang titik + satu motif bunga garis (line-art) yang nyaris tak
 * terlihat di area exploration.
 *
 * Murni visual: aria-hidden, tidak pernah masuk tab order, tidak
 * pernah menutupi teks (di-render sebelum title/nav di DOM sehingga
 * selalu berada di belakangnya secara stacking order). Gerakannya
 * dijaga sangat kecil (1–3px, opacity saja) dan sepenuhnya berhenti
 * saat prefers-reduced-motion aktif; efek mengikuti cursor hanya
 * berjalan saat perangkat punya pointer presisi (desktop).
 */
export function HomeDecoration({ variant }: HomeDecorationProps) {
  const hasFinePointer = useHasFinePointer();
  const prefersReducedMotion = usePrefersReducedMotion();
  const enableCursor = hasFinePointer && !prefersReducedMotion;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 45, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 45, damping: 20 });

  // Amplitudo sangat kecil — ambient, bukan efek yang mencolok.
  const shiftX = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const shiftY = useTransform(springY, [-0.5, 0.5], [-3, 3]);
  const shiftXSoft = useTransform(springX, [-0.5, 0.5], [-1.5, 1.5]);
  const shiftYSoft = useTransform(springY, [-0.5, 0.5], [-1.5, 1.5]);

  useEffect(() => {
    if (!enableCursor) return;

    const handleMouseMove = (event: MouseEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableCursor, pointerX, pointerY]);

  /** Kedipan opacity halus; diam (nilai statis) saat reduced-motion aktif. */
  const twinkle = (duration: number, delay: number) =>
    prefersReducedMotion
      ? { opacity: 0.5 }
      : {
          opacity: [0.3, 0.6, 0.3],
          transition: { duration, delay, repeat: Infinity, ease: "easeInOut" as const },
        };

  if (variant === "hero") {
    return (
      <div className={styles.hero} aria-hidden="true">
        {/* Fase 3/4 companion — tiny floating detail di sekitar title */}
        <motion.svg
          className={styles.heroSparkleA}
          viewBox="0 0 24 24"
          initial={{ opacity: 0 }}
          animate={twinkle(4.5, 0.3)}
          style={enableCursor ? { x: shiftX, y: shiftY } : undefined}
        >
          <path
            d="M12 2 L13.1 10.9 L22 12 L13.1 13.1 L12 22 L10.9 13.1 L2 12 L10.9 10.9 Z"
            fill="var(--color-pink-soft)"
          />
        </motion.svg>

        <motion.svg
          className={styles.heroSparkleB}
          viewBox="0 0 24 24"
          initial={{ opacity: 0 }}
          animate={twinkle(5.5, 1.4)}
          style={enableCursor ? { x: shiftXSoft, y: shiftYSoft } : undefined}
        >
          <path
            d="M12 4 L12.7 11.3 L20 12 L12.7 12.7 L12 20 L11.3 12.7 L4 12 L11.3 11.3 Z"
            fill="var(--color-warm-white)"
          />
        </motion.svg>

        {/* Garis editorial tipis di atas title */}
        <motion.span
          className={styles.heroLine}
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: 0.5, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    );
  }

  return (
    <div className={styles.field} aria-hidden="true">
      <motion.span className={styles.fieldDotA} initial={{ opacity: 0 }} animate={twinkle(4, 0.4)} />
      <motion.span className={styles.fieldDotB} initial={{ opacity: 0 }} animate={twinkle(4.8, 1.2)} />

      <motion.span
        className={styles.fieldRule}
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={{ opacity: 0.35, scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Motif bunga garis (line-art) — empat "petal" dari satu ellipse yang diputar */}
      <motion.svg
        className={styles.fieldPetal}
        viewBox="0 0 40 40"
        initial={{ opacity: 0 }}
        animate={{ opacity: prefersReducedMotion ? 0.4 : [0.22, 0.42, 0.22] }}
        transition={
          prefersReducedMotion ? { duration: 0.8 } : { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }
        style={enableCursor ? { x: shiftXSoft, y: shiftYSoft } : undefined}
      >
        <g fill="none" stroke="var(--color-pink-deep)" strokeWidth="1">
          <ellipse cx="20" cy="10" rx="3.2" ry="7.5" />
          <ellipse cx="20" cy="10" rx="3.2" ry="7.5" transform="rotate(45 20 20)" />
          <ellipse cx="20" cy="10" rx="3.2" ry="7.5" transform="rotate(90 20 20)" />
          <ellipse cx="20" cy="10" rx="3.2" ry="7.5" transform="rotate(135 20 20)" />
          <circle cx="20" cy="20" r="1.4" fill="var(--color-pink-deep)" stroke="none" />
        </g>
      </motion.svg>
    </div>
  );
}
