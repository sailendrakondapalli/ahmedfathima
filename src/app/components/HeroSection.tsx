import { motion } from "motion/react";

// Crescent moon SVG shape
function CrescentMoon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
      <path d="M20 4 C10 4 4 11 4 20 C4 29 10 36 20 36 C14 32 11 26 11 20 C11 14 14 8 20 4Z" />
    </svg>
  );
}

// 8-pointed Islamic star
function IslamicStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
      <polygon points="20,2 23,14 35,14 25,21 28,33 20,26 12,33 15,21 5,14 17,14" />
    </svg>
  );
}

// Floating crescent with glow
function FloatingCrescent({
  style,
  duration,
  delay,
  size,
}: {
  style: React.CSSProperties;
  duration: number;
  delay: number;
  size: string;
}) {
  return (
    <motion.div
      className={`absolute text-amber-300/40 ${size}`}
      style={style}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <CrescentMoon className="w-full h-full" />
    </motion.div>
  );
}

// Twinkling star
function TwinklingStar({
  style,
  duration,
  delay,
  size,
}: {
  style: React.CSSProperties;
  duration: number;
  delay: number;
  size: string;
}) {
  return (
    <motion.div
      className={`absolute text-amber-200/50 ${size}`}
      style={style}
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.4, 1, 0.4],
        rotate: [0, 45, 0],
      }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <IslamicStar className="w-full h-full" />
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20"
      style={{
        backgroundImage: "url(/watching.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Geometric arabesque pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 40px,
            rgba(212,175,55,0.4) 40px, rgba(212,175,55,0.4) 41px
          ), repeating-linear-gradient(
            90deg, transparent, transparent 40px,
            rgba(212,175,55,0.4) 40px, rgba(212,175,55,0.4) 41px
          )`,
        }}
      />

      {/* ── Floating Crescents ── */}
      <FloatingCrescent style={{ top: "8%",  left: "6%"  }} duration={6} delay={0}   size="w-16 h-16" />
      <FloatingCrescent style={{ top: "12%", right: "8%" }} duration={7} delay={1.5} size="w-12 h-12" />
      <FloatingCrescent style={{ top: "55%", left: "3%"  }} duration={8} delay={0.8} size="w-10 h-10" />
      <FloatingCrescent style={{ bottom: "15%", right: "5%" }} duration={6.5} delay={2} size="w-14 h-14" />
      <FloatingCrescent style={{ bottom: "30%", left: "10%" }} duration={9} delay={3} size="w-8 h-8" />
      <FloatingCrescent style={{ top: "35%", right: "3%" }} duration={7.5} delay={0.5} size="w-9 h-9" />

      {/* ── Twinkling Stars ── */}
      {[
        { top: "5%",  left: "20%",  dur: 2.5, del: 0   },
        { top: "10%", left: "50%",  dur: 3,   del: 0.7 },
        { top: "5%",  right: "25%", dur: 2,   del: 1.2 },
        { top: "25%", left: "8%",   dur: 3.5, del: 0.3 },
        { top: "20%", right: "15%", dur: 2.8, del: 1.8 },
        { top: "45%", left: "15%",  dur: 3.2, del: 0.9 },
        { top: "40%", right: "12%", dur: 2.3, del: 2.1 },
        { bottom: "25%", left: "20%", dur: 3, del: 1.5 },
        { bottom: "20%", right: "20%", dur: 2.6, del: 0.4 },
        { bottom: "10%", left: "45%", dur: 3.8, del: 2.5 },
        { top: "70%", right: "30%", dur: 2.2, del: 1.1 },
        { top: "15%", left: "35%",  dur: 4,   del: 0.6 },
      ].map((s, i) => (
        <TwinklingStar
          key={i}
          style={{ top: s.top, bottom: s.bottom, left: s.left, right: s.right } as React.CSSProperties}
          duration={s.dur}
          delay={s.del}
          size="w-4 h-4"
        />
      ))}

      {/* ── Large decorative crescent top-right ── */}
      <motion.div
        className="absolute -top-8 -right-8 text-emerald-800/30 w-64 h-64"
        animate={{ rotate: [0, 5, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <CrescentMoon className="w-full h-full" />
      </motion.div>

      {/* ── Rotating geometric ring top-left ── */}
      <motion.div
        className="absolute top-8 left-8 w-28 h-28 border-2 border-amber-400/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-3 border border-amber-400/15 rounded-full" />
        <div className="absolute inset-6 border border-amber-400/10 rounded-full" />
      </motion.div>

      {/* ── Rotating geometric ring bottom-right ── */}
      <motion.div
        className="absolute bottom-8 right-8 w-36 h-36 border-2 border-emerald-400/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-3 border border-emerald-400/15 rounded-full" />
      </motion.div>

      {/* ── Main content ── */}
      <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">

        {/* Top ornament */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-400/70" />
          <IslamicStar className="w-5 h-5 text-amber-400" />
          <CrescentMoon className="w-6 h-6 text-amber-300" />
          <IslamicStar className="w-5 h-5 text-amber-400" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-400/70" />
        </motion.div>

       

        {/* Bismillah */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-2"
        >
          <p className="text-2xl md:text-3xl text-amber-300 font-semibold drop-shadow-[0_2px_8px_rgba(212,175,55,0.6)]">
            بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
          </p>
          <p className="text-sm md:text-base text-white/70 italic tracking-wide">
            In the name of Allah, the Most Beneficent and Most Merciful
          </p>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-3xl md:text-5xl text-white font-serif drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              Dr. N. Imthiyaz Ahmed
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.35 }}
              className="text-base md:text-lg text-amber-300 font-medium tracking-widest drop-shadow-[0_1px_6px_rgba(212,175,55,0.7)]"
            >
              M.B.B.S., <span style={{ textDecoration: "overline" }}>D.A.</span>
              
            </motion.p>
          </div>

          {/* Divider with crescent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-amber-400/60" />
            <CrescentMoon className="w-7 h-7 text-amber-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-amber-400/60" />
          </motion.div>

          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-3xl md:text-5xl text-white font-serif drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              Dr. S. Rasool Fathima
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.75 }}
              className="text-base md:text-lg text-amber-300 font-medium tracking-widest drop-shadow-[0_1px_6px_rgba(212,175,55,0.7)]"
            >
              M.B.B.S., M.D.
            </motion.p>
          </div>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex items-center justify-center gap-3 pt-4"
        >
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-amber-400/60" />
          <IslamicStar className="w-4 h-4 text-amber-400/80" />
          <IslamicStar className="w-5 h-5 text-amber-300" />
          <IslamicStar className="w-4 h-4 text-amber-400/80" />
          <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-amber-400/60" />
        </motion.div>

        {/* Wedding date hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-white/60 text-sm tracking-[0.2em] uppercase"
        >
          2nd July 2026 · Nikkah Ceremony
        </motion.p>
      </div>
    </section>
  );
}
