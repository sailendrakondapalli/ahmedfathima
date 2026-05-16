import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <p className="text-sm text-[var(--islamic-gold)]">Scroll to explore</p>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-[var(--islamic-gold)]" />
      </motion.div>
    </motion.div>
  );
}
