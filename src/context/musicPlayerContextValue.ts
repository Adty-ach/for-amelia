import { createContext } from "react";
import type { Song } from "../data/songs";

export interface MusicPlayerContextValue {
  /** Playlist yang tersedia. */
  playlist: Song[];
  currentTrack: Song | null;
  currentIndex: number;
  isPlaying: boolean;
  /** 0–1 (fraksi durasi yang sudah dilalui). */
  progress: number;
  /** 0–1 */
  volume: number;
  /** Apakah panel player sedang diperluas (expanded) atau ringkas (mini). */
  isOpen: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  /** Pilih track tertentu dari daftar lagu (dipakai halaman Soundtrack) — langsung auto-play. */
  selectTrack: (index: number) => void;
  seek: (fraction: number) => void;
  setVolume: (level: number) => void;
  setIsOpen: (open: boolean) => void;
}

export const MusicPlayerContext = createContext<MusicPlayerContextValue | null>(null);
