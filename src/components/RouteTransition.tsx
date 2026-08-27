import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { pageTransitionVariants, reducedPageTransitionVariants } from "../utils/motion";

/**
 * Membungkus seluruh <Routes> agar setiap perpindahan section
 * (Home → Story, Gallery → Timeline, dst.) memakai satu sistem
 * transisi yang sama: fade + slight blur + subtle scale.
 *
 * Menggunakan useOutlet (bukan children biasa) supaya AnimatePresence
 * bisa mendeteksi keluar-masuknya elemen route berdasarkan `key`.
 */
export function RouteTransition() {
  const location = useLocation();
  const outlet = useOutlet();
  const prefersReducedMotion = usePrefersReducedMotion();

  const variants = prefersReducedMotion ? reducedPageTransitionVariants : pageTransitionVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ minHeight: "100dvh" }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
}
