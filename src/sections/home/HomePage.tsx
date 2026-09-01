import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { useEffect } from "react";
import { experiences } from "../../data/experiences";
import { siteConfig } from "../../data/siteConfig";
import { useHasFinePointer } from "../../hooks/usePointerType";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { ExplorationObject } from "./ExplorationObject";
import { HomeDecoration } from "./HomeDecoration";
import styles from "./HomePage.module.css";

/**
 * Pintu masuk utama ke dunia "FOR AMELIA".
 *
 * Opening sequence eksplisit, 6 fase, seluruhnya berbasis delay (bukan
 * scroll) sehingga selalu terputar otomatis begitu halaman dibuka:
 *
 *  1. Threshold   — layar charcoal, nyaris kosong (hanya HomeAnchor "fa.").
 *  2. Atmosphere  — rose glow & flood mulai meresap ke dalam hero.
 *  3. Title       — "FOR AMELIA" blur → fokus tajam, scale 1.04 → 1.
 *  4. Subtitle    — fade + sedikit bergerak naik.
 *  5. Transition  — background hero→exploration sudah menyatu lewat
 *                    heroFlood + gradient objectsSection (lihat CSS).
 *  6. Reveal      — 7 exploration objects muncul staggered.
 *
 * Saat prefers-reduced-motion aktif, urutan yang sama tetap dipertahankan
 * (opening tidak dihilangkan) tetapi disederhanakan: fade saja, tanpa
 * blur/scale, dan jauh lebih cepat.
 */
export default function HomePage() {
  const hasFinePointer = useHasFinePointer();
  const prefersReducedMotion = usePrefersReducedMotion();
  const enableParallax = hasFinePointer && !prefersReducedMotion;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 20 });

  // Jarak pergeseran sangat kecil (±6px) — ambient, bukan efek yang mencolok.
  const translateX = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  useEffect(() => {
    if (!enableParallax) return;

    const handleMouseMove = (event: MouseEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableParallax, pointerX, pointerY]);

  // ============ FASE TIMING (detik) ============
  // Cinematic: total sampai object terakhir muncul ≈ 2.3s — cukup terasa
  // sinematik tanpa membuat user menunggu lama.
  const phase = prefersReducedMotion
    ? { atmosphere: 0, title: 0.05, subtitle: 0.2, scrollCue: 0.3, objects: 0.35, stagger: 0.03 }
    : { atmosphere: 0.3, title: 0.55, subtitle: 1.05, scrollCue: 1.35, objects: 1.5, stagger: 0.09 };

  const atmosphereVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0.3 : 1.1, ease: [0.16, 1, 0.3, 1], delay: phase.atmosphere },
    },
  };

  const titleVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, delay: phase.title } },
      }
    : {
        hidden: { opacity: 0, filter: "blur(14px)", scale: 1.04 },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: phase.title },
        },
      };

  const subtitleVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, delay: phase.subtitle } },
      }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: phase.subtitle },
        },
      };

  const scrollCueVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: phase.scrollCue } },
  };

  const objectsContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: phase.stagger, delayChildren: phase.objects },
    },
  };

  return (
    <div className={styles.page}>
      <div className={styles.parallaxLayer}>
        {/* Fase 1 + 3 + 4: hero selalu render segera (threshold), lalu
            elemen di dalamnya muncul bertahap lewat variants masing-masing. */}
        <header className={styles.hero}>
          {/* Fase 2 — Atmosphere */}
          <motion.div
            className={styles.glow}
            variants={atmosphereVariants}
            initial="hidden"
            animate="visible"
            style={enableParallax ? { x: translateX, y: translateY } : undefined}
          />
          <motion.div className={styles.heroFlood} variants={atmosphereVariants} initial="hidden" animate="visible" />

          {/* Detail dekoratif halus — dirender sebelum title agar selalu
              berada di belakangnya secara stacking order (lihat
              HomeDecoration.tsx). Murni atmospheric, tidak mengganggu
              keterbacaan. */}
          <HomeDecoration variant="hero" />

          {/* Fase 3 — Title */}
          <motion.h1 className={styles.title} variants={titleVariants} initial="hidden" animate="visible">
            {siteConfig.title}
          </motion.h1>

          {/* Fase 4 — Subtitle */}
          <motion.p className={styles.subtitle} variants={subtitleVariants} initial="hidden" animate="visible">
            {siteConfig.subtitle}
          </motion.p>

          <motion.span
            className={styles.scrollCue}
            variants={scrollCueVariants}
            initial="hidden"
            animate="visible"
          >
            scroll to explore
          </motion.span>
        </header>

        {/* Fase 5 (background sudah menyatu lewat CSS) + Fase 6 (reveal) */}
        <section className={styles.objectsSection}>
          <div className={styles.atmosphere} aria-hidden="true" />
          <HomeDecoration variant="field" />
          <motion.nav
            className={styles.objects}
            aria-label="Pilihan pengalaman"
            variants={objectsContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {experiences.map((experience) => (
              <ExplorationObject key={experience.id} experience={experience} />
            ))}
          </motion.nav>
        </section>
      </div>
    </div>
  );
}
