import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { slideUpVariants, staggerContainer } from "../utils/motion";
import styles from "./SectionShell.module.css";

export type SectionBackground = "cream" | "blush" | "warm-white" | "charcoal";

interface SectionShellProps {
  eyebrow: string;
  title: string;
  tagline: string;
  background: SectionBackground;
  /** Label status placeholder, misal "Sedang disiapkan". */
  status?: string;
  children?: ReactNode;
}

/**
 * Kerangka visual yang dipakai oleh semua 7 experience routes pada tahap
 * foundation ini. Memastikan setiap section terasa seperti "ruang berbeda
 * dalam dunia yang sama" — identitas visual konsisten, isi konten menyusul.
 */
export function SectionShell({
  eyebrow,
  title,
  tagline,
  background,
  status = "Sedang disiapkan",
  children,
}: SectionShellProps) {
  return (
    <motion.section
      className={styles.shell}
      data-bg={background}
      variants={staggerContainer()}
      initial="hidden"
      animate="visible"
    >
      <motion.span className={styles.eyebrow} variants={slideUpVariants}>
        {eyebrow}
      </motion.span>
      <motion.h1 className={styles.title} variants={slideUpVariants}>
        {title}
      </motion.h1>
      <motion.p className={styles.tagline} variants={slideUpVariants}>
        {tagline}
      </motion.p>
      {children}
      <motion.span className={styles.status} variants={slideUpVariants}>
        {status}
      </motion.span>
    </motion.section>
  );
}
