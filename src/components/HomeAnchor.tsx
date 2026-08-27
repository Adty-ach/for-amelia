import { Link, useLocation } from "react-router-dom";
import styles from "./HomeAnchor.module.css";

/**
 * Satu-satunya elemen navigasi persisten di seluruh website.
 * Bukan navbar — hanya sebuah "mark" kecil di sudut layar yang selalu
 * membawa user kembali ke "/". Di homepage sendiri, mark tetap tampil
 * tapi non-interaktif secara visual (user sudah berada di beranda).
 */
export function HomeAnchor() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Link
      to="/"
      className={`${styles.anchor} ${isHome ? styles.hidden : ""}`}
      aria-label="Kembali ke beranda FOR AMELIA"
      aria-current={isHome ? "page" : undefined}
      tabIndex={isHome ? -1 : 0}
    >
      <span className={styles.mark} aria-hidden="true">
        fa.
      </span>
      <span className={styles.label}>beranda</span>
    </Link>
  );
}
