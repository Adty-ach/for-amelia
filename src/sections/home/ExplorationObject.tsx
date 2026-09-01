import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Experience } from "../../data/experiences";
import { slideUpVariants } from "../../utils/motion";
import { ExplorationIcon } from "./ExplorationIcon";
import styles from "./ExplorationObject.module.css";

interface ExplorationObjectProps {
  experience: Experience;
}

/**
 * Satu "objek" yang dapat dijelajahi di homepage — bukan tombol navbar.
 * Diberi nomor urut (bukan sekadar dekorasi: menandakan posisi/order
 * dari 7 pengalaman), tagline personal singkat, dan satu detail mark
 * kecil (svg) yang mengisyaratkan isi tujuan — murni dekoratif.
 */
export function ExplorationObject({ experience }: ExplorationObjectProps) {
  return (
    <motion.div variants={slideUpVariants} className={styles.object}>
      <Link to={experience.path} className={styles.link}>
        <span className={styles.meta}>
          <span className={styles.number}>{String(experience.order).padStart(2, "0")}</span>
          <span className={styles.icon} aria-hidden="true">
            <ExplorationIcon id={experience.id} />
          </span>
        </span>
        <span className={styles.title}>{experience.title}</span>
        <span className={styles.tagline}>{experience.tagline}</span>
      </Link>
    </motion.div>
  );
}
