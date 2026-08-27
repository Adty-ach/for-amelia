import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { songs } from "../data/songs";
import { MusicPlayerContext, type MusicPlayerContextValue } from "./musicPlayerContextValue";

interface MusicPlayerProviderProps {
  children: ReactNode;
}

/**
 * Menyediakan state music player di level root aplikasi.
 * Karena provider ini membungkus seluruh <Routes>, elemen <audio> di dalamnya
 * tidak ikut unmount saat user berpindah antar section — musik tetap berjalan mulus.
 */
export function MusicPlayerProvider({ children }: MusicPlayerProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isOpen, setIsOpen] = useState(false);
  // true = "begitu <audio> selesai commit src baru, langsung play()".
  // Ref (bukan state) karena flag ini murni dikonsumsi di dalam effect,
  // tidak pernah dibaca saat render -- tidak perlu memicu render tambahan.
  const pendingAutoPlayRef = useRef(false);

  const currentTrack = songs[currentIndex] ?? null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration > 0) {
        setProgress(audio.currentTime / audio.duration);
      }
    };
    const handleEnded = () => setIsPlaying(false);
    // Placeholder path (mis. /audio/song-01.mp3) bisa saja belum ada filenya
    // -- jangan biarkan UI terus bilang "playing" kalau sumbernya gagal dimuat.
    const handleError = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  // Jalan setelah <audio src> commit ke track yang baru (lihat pendingAutoPlayRef).
  useEffect(() => {
    if (!pendingAutoPlayRef.current) return;
    pendingAutoPlayRef.current = false;
    const audio = audioRef.current;
    if (!audio || !currentTrack?.src) return;
    audio.play().catch(() => {
      /* file placeholder belum ada / autoplay ditolak -- abaikan dengan tenang */
    });
  }, [currentIndex, currentTrack]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.src) {
      setIsPlaying(true);
      return;
    }
    audio.play().catch(() => {
      /* autoplay bisa ditolak browser -- abaikan dengan tenang */
    });
    setIsPlaying(true);
  }, [currentTrack]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  /** Pindah track. Kalau sedang playing, lanjut auto-play track barunya. */
  const goToIndex = useCallback(
    (targetIndex: number) => {
      setCurrentIndex(targetIndex);
      setProgress(0);
      if (isPlaying) {
        pendingAutoPlayRef.current = true;
      }
    },
    [isPlaying],
  );

  const next = useCallback(() => {
    goToIndex((currentIndex + 1) % Math.max(songs.length, 1));
  }, [currentIndex, goToIndex]);

  const previous = useCallback(() => {
    goToIndex((currentIndex - 1 + songs.length) % Math.max(songs.length, 1));
  }, [currentIndex, goToIndex]);

  /** Dipakai halaman Soundtrack: user memilih track tertentu dari daftar lagu. */
  const selectTrack = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= songs.length) return;
    setCurrentIndex(targetIndex);
    setProgress(0);
    setIsPlaying(true);
    pendingAutoPlayRef.current = true;
  }, []);

  const seek = useCallback((fraction: number) => {
    const audio = audioRef.current;
    const clamped = Math.min(Math.max(fraction, 0), 1);
    setProgress(clamped);
    if (audio && audio.duration > 0) {
      audio.currentTime = clamped * audio.duration;
    }
  }, []);

  const setVolume = useCallback((level: number) => {
    setVolumeState(Math.min(Math.max(level, 0), 1));
  }, []);

  const value = useMemo<MusicPlayerContextValue>(
    () => ({
      playlist: songs,
      currentTrack,
      currentIndex,
      isPlaying,
      progress,
      volume,
      isOpen,
      play,
      pause,
      toggle,
      next,
      previous,
      selectTrack,
      seek,
      setVolume,
      setIsOpen,
    }),
    [
      currentTrack,
      currentIndex,
      isPlaying,
      progress,
      volume,
      isOpen,
      play,
      pause,
      toggle,
      next,
      previous,
      selectTrack,
      seek,
      setVolume,
    ],
  );

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      {/* Elemen audio tunggal di root — hidup sepanjang siklus aplikasi. */}
      <audio ref={audioRef} src={currentTrack?.src || undefined} preload="none" />
    </MusicPlayerContext.Provider>
  );
}
