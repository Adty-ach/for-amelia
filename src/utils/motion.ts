/**
 * Motion System — FOR AMELIA
 * ---------------------------------
 * Sumber kebenaran untuk semua durasi, easing, dan variant animasi.
 * Nilai di sini harus tetap selaras dengan token motion di styles/tokens.css.
 *
 * Prinsip:
 * - fast   (~0.2s)  → micro-interaction (hover, tap feedback)
 * - normal (~0.4s)  → transisi antar elemen/section, reveal umum
 * - slow   (~0.75s) → momen naratif (threshold, title reveal)
 */

import type { Transition, Variants } from "framer-motion";

export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.75,
} as const;

export const EASE = {
  standard: [0.4, 0, 0.2, 1] as const,
  outSoft: [0.16, 1, 0.3, 1] as const,
  inSoft: [0.7, 0, 0.84, 0] as const,
};

export const transition = {
  fast: { duration: DURATION.fast, ease: EASE.standard } satisfies Transition,
  normal: { duration: DURATION.normal, ease: EASE.outSoft } satisfies Transition,
  slow: { duration: DURATION.slow, ease: EASE.outSoft } satisfies Transition,
};

/** Fade sederhana — dipakai untuk elemen yang tidak butuh gerak spasial. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.normal },
  exit: { opacity: 0, transition: transition.fast },
};

/** Fade + slide naik tipis — dipakai untuk reveal teks/konten naratif. */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transition.normal },
  exit: { opacity: 0, y: -8, transition: transition.fast },
};

/** Blur-to-focus reveal — dipakai untuk momen sinematik (threshold, judul). */
export const blurRevealVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { ...transition.slow },
  },
  exit: {
    opacity: 0,
    filter: "blur(8px)",
    transition: transition.normal,
  },
};

/** Scale reveal halus — dipakai untuk objek/kartu interaktif. */
export const scaleRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition.normal },
  exit: { opacity: 0, scale: 0.98, transition: transition.fast },
};

/** Page transition — dipakai RouteTransition untuk perpindahan antar section. */
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, scale: 0.985, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: DURATION.normal, ease: EASE.outSoft },
  },
  exit: {
    opacity: 0,
    scale: 1.01,
    filter: "blur(6px)",
    transition: { duration: DURATION.fast, ease: EASE.inSoft },
  },
};

/** Helper untuk staggered reveal (dipakai homepage exploration objects). */
export function staggerContainer(staggerDelay = 0.08, initialDelay = 0.2): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };
}

/** Variant "reduced" — dipakai saat prefers-reduced-motion aktif. Hanya fade, tanpa transform besar. */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast } },
  exit: { opacity: 0, transition: { duration: DURATION.fast } },
};

/**
 * Versi reduced-motion untuk page transition, memakai key yang sama
 * (initial/animate/exit) dengan pageTransitionVariants agar bisa saling
 * menggantikan tanpa mengubah prop di RouteTransition.
 */
export const reducedPageTransitionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DURATION.fast } },
  exit: { opacity: 0, transition: { duration: DURATION.fast } },
};
