import { useState } from "react";
import styles from "./FloatingBits.module.css";

interface Bit {
  id: number;
  glyph: string;
  /** posisi horizontal (%), vertikal (%) */
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

// Posisi dibuat tetap (bukan random saat render) supaya layout stabil
// dan tidak "melompat" tiap kali halaman dirender ulang.
const bits: Bit[] = [
  { id: 1, glyph: "🍓", left: 6, top: 8, size: 1.5, duration: 7, delay: 0 },
  { id: 2, glyph: "♡", left: 90, top: 14, size: 1.7, duration: 8.5, delay: 1.2 },
  { id: 3, glyph: "♡", left: 12, top: 38, size: 1.3, duration: 9, delay: 0.6 },
  { id: 4, glyph: "🍓", left: 93, top: 46, size: 1.4, duration: 7.5, delay: 2 },
  { id: 5, glyph: "♡", left: 5, top: 66, size: 1.6, duration: 8, delay: 1.6 },
  { id: 6, glyph: "🍓", left: 88, top: 78, size: 1.5, duration: 9.5, delay: 0.3 },
  { id: 7, glyph: "♡", left: 48, top: 92, size: 1.2, duration: 8.2, delay: 2.4 },
];

/**
 * Hati & stroberi kecil yang melayang pelan di latar. Bisa diketuk:
 * "pop" sebentar lalu kembali. Murni dekoratif — disembunyikan dari
 * screen reader dan tidak bisa difokus keyboard. Berada di belakang
 * konten (z-index 0), jadi tidak pernah menutupi link.
 */
export function FloatingBits() {
  const [popped, setPopped] = useState<number[]>([]);

  const handlePop = (id: number) => {
    setPopped((current) => (current.includes(id) ? current : [...current, id]));
    window.setTimeout(() => {
      setPopped((current) => current.filter((item) => item !== id));
    }, 900);
  };

  return (
    <div className={styles.layer} aria-hidden="true">
      {bits.map((bit) => (
        <span
          key={bit.id}
          className={`${styles.bit} ${popped.includes(bit.id) ? styles.popped : ""}`}
          style={{
            left: `${bit.left}%`,
            top: `${bit.top}%`,
            fontSize: `${bit.size}rem`,
            animationDuration: `${bit.duration}s`,
            animationDelay: `${bit.delay}s`,
          }}
          onPointerDown={() => handlePop(bit.id)}
        >
          {bit.glyph}
        </span>
      ))}
    </div>
  );
}
