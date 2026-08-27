import { motion } from "framer-motion";
import type { ChangeEvent } from "react";
import { useMusicPlayer } from "../hooks/useMusicPlayer";
import { fadeVariants } from "../utils/motion";
import styles from "./MusicPlayer.module.css";

/**
 * Mini music player persistent. Diletakkan di RootLayout sehingga tampil
 * di seluruh section tanpa remount. Belum ada lagu asli — placeholder track
 * dari data/songs.ts dipakai untuk membangun interaksi player.
 */
export function MusicPlayer() {
  const { currentTrack, isPlaying, progress, toggle, next, previous, seek, isOpen, setIsOpen } =
    useMusicPlayer();

  if (!currentTrack) return null;

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    seek(Number(event.target.value) / 100);
  };

  return (
    <motion.div
      className={styles.wrapper}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
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
    </motion.div>
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
