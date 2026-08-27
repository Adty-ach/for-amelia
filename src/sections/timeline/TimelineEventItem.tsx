import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { TimelineEvent } from "../../data/timelineEvents";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import styles from "./TimelineEventItem.module.css";

interface TimelineEventItemProps {
  event: TimelineEvent;
  sequence: number;
}

/**
 * Satu "page marker" di story path. Reveal terjadi saat scroll lewat
 * `whileInView` (bawaan Framer Motion, tanpa IntersectionObserver
 * manual). Klik men-toggle inline expansion untuk description +
 * related chapter — bukan modal, sesuai arahan "jangan modal besar
 * jika tidak diperlukan".
 */
export function TimelineEventItem({ event, sequence }: TimelineEventItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const hasDetail = Boolean(event.description || event.relatedChapter);

  const revealVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      };

  const markerVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.4 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
      };

  return (
    <motion.div
      className={styles.item}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.span
        className={styles.marker}
        data-accent={event.accent ?? "rose"}
        variants={markerVariants}
        aria-hidden="true"
      />

      <motion.div className={styles.content} variants={revealVariants}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => hasDetail && setExpanded((value) => !value)}
          aria-expanded={hasDetail ? expanded : undefined}
          disabled={!hasDetail}
        >
          <span className={styles.metaRow}>
            <span className={styles.sequence}>{String(sequence).padStart(2, "0")}</span>
            {event.date && <span className={styles.date}>{event.date}</span>}
          </span>
          <span className={styles.label}>{event.label}</span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && hasDetail && (
            <motion.div
              className={styles.expandBody}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {event.description && <p className={styles.description}>{event.description}</p>}
              {event.relatedChapter && (
                <Link to="/story" className={styles.chapterLink}>
                  Read in The Story <span aria-hidden="true">→</span>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
