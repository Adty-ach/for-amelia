import { useContext } from "react";
import { MusicPlayerContext } from "../context/musicPlayerContextValue";

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer harus dipakai di dalam <MusicPlayerProvider>.");
  }
  return context;
}
