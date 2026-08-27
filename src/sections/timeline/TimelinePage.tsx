import { motion } from "framer-motion";
import { timelineEvents } from "../../data/timelineEvents";
import { blurRevealVariants, staggerContainer } from "../../utils/motion";
import { TimelineEventItem } from "./TimelineEventItem";
import styles from "./TimelinePage.module.css";

/**
 * /timeline — "How We Got Here". Vertical story path: garis tipis +
 * event marker, zig-zag ringan di desktop, satu jalur vertikal di
 * mobile. Event dibaca dari timelineEvents.ts secara dinamis — urutan
 * ditentukan oleh `order` di data, bukan hardcode di komponen.
 */
export default function TimelinePage() {
  const sortedEvents = [...timelineEvents].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.page}>
      <motion.header
        className={styles.intro}
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.introWash} aria-hidden="true" />
        <motion.span className={styles.eyebrow} variants={blurRevealVariants}>
          04 — Timeline
        </motion.span>
        <motion.h1 className={styles.title} variants={blurRevealVariants}>
          How We Got Here
        </motion.h1>
        <motion.p className={styles.subtitle} variants={blurRevealVariants}>
          Hal-hal yang membawa kita sampai di sini.
        </motion.p>
      </motion.header>

      <div className={styles.path}>
        <div className={styles.line} aria-hidden="true" />
        {sortedEvents.map((event, index) => (
          <TimelineEventItem key={event.id} event={event} sequence={index + 1} />
        ))}
      </div>
    </div>
  );
}
