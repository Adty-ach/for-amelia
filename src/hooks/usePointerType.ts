import { useEffect, useState } from "react";

const QUERY = "(pointer: fine)";

/**
 * true  → primary input punya cursor presisi (mouse/trackpad) → boleh pakai hover/parallax
 * false → primary input adalah touch/kasar → gunakan versi statis/tap
 */
export function useHasFinePointer(): boolean {
  const [hasFinePointer, setHasFinePointer] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    const handleChange = (event: MediaQueryListEvent) => setHasFinePointer(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return hasFinePointer;
}
