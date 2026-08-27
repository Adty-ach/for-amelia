import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dreamContent } from "../../data/dream";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { DreamBackground } from "./DreamBackground";
import { MultiplayerInteraction } from "./MultiplayerInteraction";
import styles from "./DreamModePage.module.css";

/** Fallback murni jaga-jaga -- exit selalu muncul selambat-lambatnya ini,
 * bahkan kalau user tidak menyentuh interaksi apa pun. */
const EXIT_FALLBACK_MS = 14000;
const FLOATING_WORD_INTERVAL_MS = 4600;

/**
 * /dream — Dream Mode. Interpretasi visual/interaktif dari inside joke
 * "multiplayer mode di dalam mimpi". Entry screen -> Dream Environment
 * (background berlapis + 3 interaksi) -> exit yang selalu bisa dicapai.
 *
 * Catatan: <HomeAnchor> global (mark "fa." di pojok) tetap tampil di
 * halaman ini seperti section lain, jadi selalu ada jalan keluar bahkan
 * sebelum exit prompt khusus ini muncul.
 */
export default function DreamModePage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hasEntered, setHasEntered] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [touchRevealed, setTouchRevealed] = useState(false);
  const [pinched, setPinched] = useState(false);
  const [pinchRevealed, setPinchRevealed] = useState(false);
  const [showExit, setShowExit] = useState(false);

  // Fase 6/7 -- kata mengambang, muncul-hilang bergantian, bukan teks banyak.
  useEffect(() => {
    if (!hasEntered) return;
    const timer = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % dreamContent.floatingWords.length);
    }, FLOATING_WORD_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [hasEntered]);

  // Jaring pengaman -- exit selalu muncul walau user tidak menyentuh apa pun.
  useEffect(() => {
    if (!hasEntered) return;
    const timer = window.setTimeout(() => setShowExit(true), EXIT_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [hasEntered]);

  const handlePinch = () => {
    if (pinchRevealed) return;
    setPinched(true);
    setPinchRevealed(true);
    window.setTimeout(() => setPinched(false), 600);
  };

  return (
    <div className={styles.page}>
      <DreamBackground />

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="entry"
            className={styles.entry}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: prefersReducedMotion ? 0.3 : 0.8 } }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <motion.div
              className={styles.entryContent}
              initial={{ opacity: 0, y: 10, filter: prefersReducedMotion ? "none" : "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: prefersReducedMotion ? 0.3 : 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className={styles.entryTitle}>{dreamContent.entry.title}</h1>
              <p className={styles.entryTagline}>{dreamContent.entry.tagline}</p>
              <button type="button" className={styles.enterButton} onClick={() => setHasEntered(true)}>
                {dreamContent.entry.enterLabel}
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="environment"
            className={styles.environment}
            data-pinched={pinched}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: prefersReducedMotion ? 0.3 : 0.8 } }}
          >
            <div className={styles.floatingWords} aria-hidden="true">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className={styles.floatingWord}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                  animate={{ opacity: 0.35, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                  {dreamContent.floatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Interaction 1 */}
            <div className={styles.interaction}>
              <button
                type="button"
                className={styles.interactionOrb}
                onClick={() => setTouchRevealed(true)}
                aria-label={dreamContent.touch.reveal}
              />
              <span className={styles.interactionReveal}>{touchRevealed ? dreamContent.touch.reveal : ""}</span>
            </div>

            {/* Interaction 2 */}
            <div className={styles.interaction}>
              <button type="button" className={styles.interactionPrompt} onClick={handlePinch}>
                {dreamContent.pinch.prompt}
              </button>
              <span className={styles.interactionReveal}>{pinchRevealed ? dreamContent.pinch.reveal : ""}</span>
            </div>

            {/* Interaction 3 — payoff utama */}
            <MultiplayerInteraction onMerge={() => setShowExit(true)} />

            <AnimatePresence>
              {showExit && (
                <motion.div
                  className={styles.exit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={styles.exitLinks}>
                    <button
                      type="button"
                      className={`${styles.exitLink} ${styles.exitLinkPrimary}`}
                      onClick={() => setHasEntered(false)}
                    >
                      {dreamContent.exit.wake}
                    </button>
                    <Link to="/" className={styles.exitLink}>
                      {dreamContent.exit.back}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
