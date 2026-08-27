import { useRef, type TouchEvent } from "react";

interface SwipeNavigationOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  /** Jarak minimum (px) sebelum dianggap swipe, bukan tap/scroll biasa. */
  threshold?: number;
}

/**
 * Hook swipe horizontal berbasis touch event native (bukan drag Framer
 * Motion) supaya tidak berebut gesture dengan scroll vertikal halaman.
 * Swipe hanya terpicu jika pergeseran horizontal jelas lebih dominan
 * daripada vertikal.
 *
 * Pemakaian: sebar `onTouchStart`/`onTouchEnd` hasilnya ke elemen target.
 */
export function useSwipeNavigation({ onSwipeLeft, onSwipeRight, threshold = 48 }: SwipeNavigationOptions) {
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    startRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent) => {
    const start = startRef.current;
    startRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < threshold) return;
    if (Math.abs(deltaX) < Math.abs(deltaY)) return; // gerakan vertikal dominan -> biarkan scroll

    if (deltaX < 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  };

  return { onTouchStart, onTouchEnd };
}
