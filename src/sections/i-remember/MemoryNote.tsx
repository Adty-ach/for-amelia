import { motion } from "framer-motion";
import type { Memory } from "../../data/memories";
import { slideUpVariants } from "../../utils/motion";
import { getMemoryTier } from "./memoryTier";
import styles from "./MemoryNote.module.css";

interface MemoryNoteProps {
  memory: Memory;
  index: number;
  onOpen: () => void;
}

const tierClass = {
  feature: styles.tierFeature,
  medium: styles.tierMedium,
  small: styles.tierSmall,
};

/**
 * Satu catatan di "memory desk". Ukuran (tier) dan rotasi dihitung dari
 * posisi, bukan field data — menambah memory baru ke memories.ts otomatis
 * dapat komposisi yang wajar tanpa menyentuh komponen ini.
 */
export function MemoryNote({ memory, index, onOpen }: MemoryNoteProps) {
  const tier = getMemoryTier(index);

  return (
    <motion.button
      type="button"
      className={`${styles.note} ${tierClass[tier]}`}
      data-accent={memory.accent ?? "rose"}
      variants={slideUpVariants}
      onClick={onOpen}
      aria-label={`Buka memory: ${memory.title}`}
    >
      <span className={styles.accentLine} aria-hidden="true" />
      <span className={styles.title}>{memory.title}</span>
      <span className={styles.snippet}>{memory.note}</span>
      <span className={styles.footer}>
        {memory.category && <span className={styles.category}>{memory.category.replace("-", " ")}</span>}
        {memory.date && <span className={styles.date}>{memory.date}</span>}
      </span>
    </motion.button>
  );
}
