import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import type { Song } from "../../data/songs";
import { slideUpVariants } from "../../utils/motion";
import styles from "./TrackRow.module.css";

interface TrackRowProps {
  song: Song;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  onSelect: () => void;
  onToggle: () => void;
}

/**
 * Satu baris di track list. Klik cover/judul memilih track ini di
 * MusicPlayerContext (langsung play). Tombol play kecil di kanan
 * melakukan hal sama, atau toggle play/pause kalau track ini yang
 * sedang aktif.
 */
export function TrackRow({ song, index, isActive, isPlaying, onSelect, onToggle }: TrackRowProps) {
  const handleButtonClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (isActive) {
      onToggle();
    } else {
      onSelect();
    }
  };

  return (
    <motion.button
      type="button"
      className={styles.row}
      data-active={isActive}
      variants={slideUpVariants}
      onClick={onSelect}
      aria-label={`Putar ${song.title} — ${song.artist}`}
    >
      <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>

      <span className={styles.cover}>
        {song.cover ? (
          <img src={song.cover} alt="" className={styles.coverImage} />
        ) : (
          <span className={styles.coverPlaceholder} aria-hidden="true">
            <NoteIcon />
          </span>
        )}
      </span>

      <span className={styles.info}>
        <span className={styles.trackTitle}>{song.title}</span>
        <span className={styles.trackArtist}>{song.artist}</span>
        {song.note && <span className={styles.note}>{song.note}</span>}
      </span>

      <span
        role="button"
        tabIndex={-1}
        className={styles.playButton}
        onClick={handleButtonClick}
        aria-hidden="true"
      >
        {isActive && isPlaying ? <PauseIcon /> : <PlayIcon />}
      </span>
    </motion.button>
  );
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M2 1.5v11l10-5.5-10-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <rect x="2" y="1.5" width="3.5" height="11" />
      <rect x="8.5" y="1.5" width="3.5" height="11" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7-1a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM6 8V2.5l7-1.4V7"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
