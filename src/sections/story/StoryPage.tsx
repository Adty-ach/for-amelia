import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { StoryCover } from "./StoryCover";
import { StoryReader } from "./StoryReader";
import styles from "./StoryPage.module.css";

/**
 * Entry point /story. Mengatur perpindahan Cover -> Reader lewat
 * AnimatePresence (fade + scale ringan, bukan hard cut), sesuai konsep
 * "open book interaction". Reading engine sepenuhnya ada di <StoryReader>.
 */
export default function StoryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const variants: Variants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        initial: { opacity: 0, scale: 1.02, filter: "blur(8px)" },
        animate: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
        exit: {
          opacity: 0,
          scale: 0.98,
          filter: "blur(8px)",
          transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] },
        },
      };

  return (
    <div className={styles.wrapper}>
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.div key="reader" variants={variants} initial="initial" animate="animate" exit="exit">
            <StoryReader />
          </motion.div>
        ) : (
          <motion.div key="cover" variants={variants} initial="initial" animate="animate" exit="exit">
            <StoryCover onOpen={() => setIsOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
