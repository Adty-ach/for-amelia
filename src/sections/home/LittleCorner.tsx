import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform, type Variants } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { littleCorner } from "../../data/littleCorner";
import { memories, type Memory } from "../../data/memories";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./LittleCorner.module.css";

const MS_PER_DAY = 86_400_000;

/** Selisih hari kalender dari tanggal mulai sampai hari ini (minimal 0). */
function daysSince(isoDate: string): number {
  const start = new Date(`${isoDate}T00:00:00`);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((today.getTime() - start.getTime()) / MS_PER_DAY));
}

function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Bagian interaktif di bawah daftar section: penghitung hari + "ambil
 * satu kenangan" yang menarik satu catatan acak dari memories.ts (data
 * yang sama dengan halaman I Remember — tidak ada teks baru yang dikarang).
 */
export function LittleCorner() {
  return (
    <section className={styles.corner} aria-label="A little corner">
      <span className={styles.eyebrow}>{littleCorner.eyebrow}</span>
      <div className={styles.grid}>
        <DayCounter />
        <MemoryDraw />
      </div>
    </section>
  );
}

function DayCounter() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const days = useMemo(() => daysSince(littleCorner.counterStartDate), []);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => Math.round(value));

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      count.set(days);
      return;
    }
    const controls = animate(count, days, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, prefersReducedMotion, days, count]);

  return (
    <div ref={ref} className={styles.card}>
      <p className={styles.counterRow}>
        <motion.span className={styles.counterNumber} aria-label={`${days}`}>
          {rounded}
        </motion.span>
      </p>
      <p className={styles.counterLabel}>{littleCorner.counterLabel}</p>
      <p className={styles.counterSince}>sejak {formatDate(littleCorner.counterStartDate)}</p>
    </div>
  );
}

function MemoryDraw() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [current, setCurrent] = useState<Memory | null>(null);

  const draw = () => {
    if (memories.length === 0) return;
    const pool = memories.length > 1 ? memories.filter((memory) => memory.id !== current?.id) : memories;
    setCurrent(pool[Math.floor(Math.random() * pool.length)]);
  };

  const cardVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, y: 10, rotate: -1.5 },
        visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
      };

  return (
    <div className={styles.card}>
      <span className={styles.drawEyebrow}>{littleCorner.drawEyebrow}</span>

      <div className={styles.drawBody} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {current ? (
            <motion.div key={current.id} variants={cardVariants} initial="hidden" animate="visible" exit="exit">
              <h3 className={styles.drawTitle}>{current.title}</h3>
              <p className={styles.drawNote}>{current.note.split("\n\n")[0]}</p>
            </motion.div>
          ) : (
            <motion.p key="prompt" className={styles.drawPrompt} variants={cardVariants} initial="hidden" animate="visible" exit="exit">
              {littleCorner.drawPrompt}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.drawActions}>
        <button type="button" className={styles.drawButton} onClick={draw}>
          {current ? littleCorner.drawButtonNext : littleCorner.drawButtonFirst}
        </button>
        <Link to="/remember" className={styles.seeAll}>
          {littleCorner.drawSeeAll} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
