import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState, type ChangeEvent } from "react";
import { useMusicPlayer } from "../hooks/useMusicPlayer";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./MusicPlayer.module.css";

/**
 * Mini music player persistent. Diletakkan di RootLayout sehingga tampil
 * di seluruh section tanpa remount. Belum ada lagu asli — placeholder track
 * dari data/songs.ts dipakai untuk membangun interaksi player.
 *
 * `isCollapsed` SENGAJA local state (bukan di MusicPlayerContext): komponen
 * ini sendiri sudah persistent (dirender oleh RootLayout, di luar
 * <RouteTransition>, tidak pernah unmount saat pindah route) — jadi state
 * lokal di sini otomatis ikut bertahan lintas route tanpa perlu naik ke
 * context. Audio & currentTrack tetap sepenuhnya dikelola MusicPlayerContext
 * seperti sebelumnya, tidak disentuh sama sekali oleh fitur collapse ini.
 */
export function MusicPlayer() {
  const { currentTrack, isPlaying, progress, toggle, next, previous, seek, isOpen, setIsOpen } =
    useMusicPlayer();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!currentTrack) return null;

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    seek(Number(event.target.value) / 100);
  };

  const panelVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        hidden: { opacity: 0, scale: 0.9, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, scale: 0.92, y: 8, transition: { duration: 0.22, ease: [0.7, 0, 0.84, 0] } },
      };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isCollapsed ? (
        <motion.button
          key="collapsed"
          type="button"
          className={styles.collapsedTrigger}
          onClick={() => setIsCollapsed(false)}
          aria-label="Tampilkan pemutar musik"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <MusicNoteIcon />
        </motion.button>
      ) : (
        <motion.div
          key="expanded"
          className={styles.wrapper}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="region"
          aria-label="Music player"
        >
          <button
            type="button"
            className={styles.expandToggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Ringkas music player" : "Perluas music player"}
          >
            <MusicNoteIcon />
          </button>

          <div className={styles.trackInfo}>
            <span className={styles.trackTitle}>{currentTrack.title}</span>
            <span className={styles.trackArtist}>{currentTrack.artist}</span>
          </div>

          <div className={styles.controls}>
            {isOpen && (
              <button
                type="button"
                className={styles.controlButton}
                onClick={previous}
                aria-label="Lagu sebelumnya"
              >
                <PreviousIcon />
              </button>
            )}

            <button
              type="button"
              className={`${styles.controlButton} ${styles.playButton}`}
              onClick={toggle}
              aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            {isOpen && (
              <button
                type="button"
                className={styles.controlButton}
                onClick={next}
                aria-label="Lagu berikutnya"
              >
                <NextIcon />
              </button>
            )}
          </div>

          {isOpen && (
            <input
              type="range"
              className={styles.progressTrack}
              min={0}
              max={100}
              value={Math.round(progress * 100)}
              onChange={handleSeek}
              aria-label="Progres lagu"
            />
          )}

          <button
            type="button"
            className={styles.collapseButton}
            onClick={() => setIsCollapsed(true)}
            aria-label="Sembunyikan pemutar musik"
          >
            <CloseIcon />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============ Icon set kecil, inline SVG agar tidak menambah dependency ============ */

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M2 1.5v11l10-5.5-10-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <rect x="2" y="1.5" width="3.5" height="11" />
      <rect x="8.5" y="1.5" width="3.5" height="11" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M2 1.5v11l7-5.5-7-5.5z" />
      <rect x="10" y="1.5" width="2" height="11" />
    </svg>
  );
}

function PreviousIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5v11l-7-5.5 7-5.5z" />
      <rect x="2" y="1.5" width="2" height="11" />
    </svg>
  );
}

function MusicNoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M6 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7-1a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM6 8V2.5l7-1.4V7" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M2 2l10 10M12 2L2 12" strokeLinecap="round" />
    </svg>
  );
}