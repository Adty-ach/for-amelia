import { motion } from "framer-motion";
import { songs } from "../../data/songs";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import { blurRevealVariants, staggerContainer } from "../../utils/motion";
import { TrackRow } from "./TrackRow";
import styles from "./SoundtrackPage.module.css";

/**
 * /soundtrack — "Our Soundtrack". Liner notes + album archive, BUKAN
 * player kedua — semua state (currentTrack, isPlaying, dst.) datang dari
 * MusicPlayerContext global yang sama dipakai <MusicPlayer> persistent.
 * Halaman ini hanya tempat memilih & melihat lagu.
 */
export default function SoundtrackPage() {
  const { currentTrack, currentIndex, isPlaying, toggle, selectTrack } = useMusicPlayer();

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
          06 — Our Soundtrack
        </motion.span>
        <motion.h1 className={styles.title} variants={blurRevealVariants}>
          Our Soundtrack
        </motion.h1>
        <motion.p className={styles.subtitle} variants={blurRevealVariants}>
          Beberapa lagu yang terasa cocok untuk cerita ini.
        </motion.p>
      </motion.header>

      <div className={styles.layout}>
        <div className={styles.nowPlaying}>
          <span className={styles.nowPlayingEyebrow}>Now Playing</span>
          <span className={styles.cover}>
            {currentTrack?.cover ? (
              <img src={currentTrack.cover} alt="" className={styles.coverImage} />
            ) : (
              <span className={styles.coverPlaceholder} aria-hidden="true">
                <NoteIcon />
              </span>
            )}
          </span>
          <span className={styles.nowPlayingTitle}>{currentTrack?.title ?? "—"}</span>
          <span className={styles.nowPlayingArtist}>{currentTrack?.artist ?? ""}</span>
          {currentTrack?.note && <span className={styles.nowPlayingNote}>{currentTrack.note}</span>}
          <button
            type="button"
            className={styles.playToggle}
            onClick={toggle}
            aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>

        <motion.div
          className={styles.trackList}
          variants={staggerContainer(0.06, 0.3)}
          initial="hidden"
          animate="visible"
          role="list"
          aria-label="Daftar lagu"
        >
          {songs.map((song, index) => (
            <TrackRow
              key={song.id}
              song={song}
              index={index}
              isActive={index === currentIndex}
              isPlaying={isPlaying}
              onSelect={() => selectTrack(index)}
              onToggle={toggle}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M2 1.5v11l10-5.5-10-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <rect x="2" y="1.5" width="3.5" height="11" />
      <rect x="8.5" y="1.5" width="3.5" height="11" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
