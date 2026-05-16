import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

export function DigitalEnvelope() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isOpen, setIsOpen] = useState(false);

  const invitationText = "With hearts full of gratitude to Allah ﷻ, we — Dr. N. Imthiyaz Ahmed and Dr. S. Rasool Fathima — joyfully invite you to witness and bless the sacred union of our Nikkah. Your presence, prayers, and warm wishes are the greatest gift you could offer us on this blessed day.";
  const quranVerse = "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts. Verily, in that are signs for those who reflect.";

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[var(--islamic-beige)] px-4 py-20"
    >
      <div className="max-w-3xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-[var(--islamic-green)] font-serif">
            Invitation from the Couple
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-[2px] bg-[var(--islamic-gold)]" />
            <svg className="w-6 h-6 text-[var(--islamic-gold)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
            </svg>
            <div className="w-24 h-[2px] bg-[var(--islamic-gold)]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Scroll Container */}
          <div
            className="relative w-full cursor-pointer"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onClick={() => setIsOpen((v) => !v)}
          >
            <div className="relative mx-auto" style={{ maxWidth: "600px" }}>
              {/* Top Wooden Rod */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-6 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-full shadow-lg z-30"
                animate={{ y: isOpen ? -20 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="absolute inset-0 opacity-30 rounded-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }} />
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-gradient-to-b from-amber-900 to-amber-800 rounded-full shadow-md" />
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-gradient-to-b from-amber-900 to-amber-800 rounded-full shadow-md" />
              </motion.div>

              {/* Scroll Paper */}
              <motion.div
                className="relative shadow-2xl mx-4 overflow-hidden"
                style={{
                  borderRadius: "0 0 8px 8px",
                  backgroundImage: 'url(/letterriting.jpeg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundBlendMode: 'multiply',
                  backgroundColor: '#FFF8E7',
                }}
                initial={{ height: "80px" }}
                animate={{ height: isOpen ? "780px" : "80px" }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="absolute inset-0 bg-white/60" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,69,19,0.1) 2px, rgba(139,69,19,0.1) 4px)' }} />
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[var(--islamic-gold)] to-transparent opacity-30" />
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[var(--islamic-gold)] to-transparent opacity-30" />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-start p-8 md:p-12 text-center overflow-hidden">
                  {/* Star icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isOpen ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mb-4"
                  >
                    <svg className="w-12 h-12 text-[var(--islamic-gold)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
                    </svg>
                  </motion.div>

                  {/* Gold line */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isOpen ? { width: "80px" } : { width: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="h-[2px] bg-[var(--islamic-gold)] mb-6"
                  />

                  {/* Main content */}
                  <div className="space-y-6 max-w-lg w-full">
                    {/* Invitation text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="text-base md:text-lg text-[var(--islamic-green)] leading-relaxed font-serif"
                    >
                      {isOpen && <TypewriterText text={invitationText} delay={0.5} speed={40} />}
                    </motion.p>

                    {/* Nikkah title */}
                    <motion.h2
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 2.5, duration: 0.6 }}
                      className="text-5xl md:text-7xl text-[var(--islamic-gold)] font-serif"
                    >
                      Nikkah
                    </motion.h2>

                    {/* Divider */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isOpen ? { width: "100px" } : { width: 0 }}
                      transition={{ delay: 3, duration: 0.5 }}
                      className="h-[1px] bg-[var(--islamic-gold)] mx-auto"
                    />

                    {/* Quran verse */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 3.5, duration: 0.3 }}
                      className="space-y-2"
                    >
                      <p className="text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed italic font-serif">
                        {isOpen && <TypewriterText text={`"${quranVerse}"`} delay={3.5} speed={30} />}
                      </p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 7, duration: 0.5 }}
                        className="text-xs md:text-sm text-[var(--islamic-gold)] font-medium"
                      >
                        — Quran 30:21
                      </motion.p>
                    </motion.div>

                    {/* Closing signature */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: 7.5, duration: 0.6 }}
                      className="space-y-1 pt-2"
                    >
                      <p className="text-sm text-[var(--muted-foreground)] italic">With love & duas,</p>
                      <p className="text-base md:text-lg text-[var(--islamic-green)] font-serif font-semibold">Dr. N. Imthiyaz Ahmed</p>
                      <p className="text-[var(--islamic-gold)] text-sm">&</p>
                      <p className="text-base md:text-lg text-[var(--islamic-green)] font-serif font-semibold">Dr. S. Rasool Fathima</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-2 italic">2nd July 2026 · Chennai</p>
                    </motion.div>

                    {/* Footer ornament */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isOpen ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 8, duration: 0.4 }}
                      className="flex items-center justify-center gap-4 pt-2"
                    >
                      <div className="w-16 h-[1px] bg-[var(--islamic-gold)]" />
                      <svg className="w-5 h-5 text-[var(--islamic-gold)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
                      </svg>
                      <div className="w-16 h-[1px] bg-[var(--islamic-gold)]" />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom shadow when closed */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-900/20 to-transparent pointer-events-none"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Bottom Wooden Rod */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-full h-6 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-full shadow-lg z-20"
                animate={{ bottom: isOpen ? -20 : 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="absolute inset-0 opacity-30 rounded-full" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }} />
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-gradient-to-b from-amber-900 to-amber-800 rounded-full shadow-md" />
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-gradient-to-b from-amber-900 to-amber-800 rounded-full shadow-md" />
              </motion.div>

              {/* Wax seal (when closed) */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
                animate={isInView && !isOpen ? { scale: 1, rotate: 360 } : { scale: 0, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="w-16 h-16 rounded-full bg-[var(--islamic-green)] shadow-xl flex items-center justify-center border-4 border-[var(--islamic-gold)]">
                  <svg className="w-8 h-8 text-[var(--islamic-gold)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* Hint text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView && !isOpen ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.5 }}
              className="text-center text-sm text-[var(--muted-foreground)] mt-12 italic"
            >
              <span className="hidden md:inline">Hover over the scroll to unroll</span>
              <span className="md:hidden">Tap the scroll to unroll</span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TypewriterText({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      setDisplayedText("");
    };
  }, [text, delay, speed]);

  return <>{displayedText}{displayedText.length < text.length && <span className="animate-pulse">|</span>}</>;
}
