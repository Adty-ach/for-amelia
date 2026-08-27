import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { memories } from "../../data/memories";
import { blurRevealVariants, staggerContainer } from "../../utils/motion";
import { MemoryDetail } from "./MemoryDetail";
import { MemoryNote } from "./MemoryNote";
import styles from "./IRememberPage.module.css";

/**
 * /remember — "I Remember". Digital memory desk: catatan-catatan kecil
 * dengan bobot visual & rotasi dihitung otomatis dari posisi (lihat
 * memoryTier.ts), bukan grid kartu seragam. Klik/tap membuka detail
 * view (halaman jurnal kecil) lewat <MemoryDetail>.
 */
export default function IRememberPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedMemory = memories.find((memory) => memory.id === selectedId) ?? null;

  return (
    <div className={styles.page}>
      <motion.header
        className={styles.intro}
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.introWash} aria-hidden="true" />
        <motion.span className={styles.eyebrow} variants={blurRevealVariants}>
          05 — I Remember
        </motion.span>
        <motion.h1 className={styles.title} variants={blurRevealVariants}>
          I Remember
        </motion.h1>
        <motion.p className={styles.subtitle} variants={blurRevealVariants}>
          Hal-hal kecil yang entah kenapa masih kuingat.
        </motion.p>
      </motion.header>

      <motion.div className={styles.desk} variants={staggerContainer(0.06, 0.3)} initial="hidden" animate="visible">
        {memories.map((memory, index) => (
          <MemoryNote key={memory.id} memory={memory} index={index} onOpen={() => setSelectedId(memory.id)} />
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedMemory && <MemoryDetail memory={selectedMemory} onClose={() => setSelectedId(null)} />}
      </AnimatePresence>
    </div>
  );
}
