import { motion } from "motion/react";
import { useState, useRef } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

// Decorative arch SVG on each door panel
function DoorDecor({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 400"
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Arch top */}
      <path d="M100 20 Q180 20 180 100 L180 380 L20 380 L20 100 Q20 20 100 20Z"
        fill="none" stroke="#d4af37" strokeWidth="3" />
      {/* Inner arch */}
      <path d="M100 45 Q160 45 160 110 L160 360 L40 360 L40 110 Q40 45 100 45Z"
        fill="none" stroke="#d4af37" strokeWidth="1.5" />
      {/* Center diamond */}
      <polygon points="100,160 120,190 100,220 80,190"
        fill="none" stroke="#d4af37" strokeWidth="2" />
      {/* Vertical center line */}
      <line x1="100" y1="230" x2="100" y2="340" stroke="#d4af37" strokeWidth="1.5" />
      {/* Horizontal bars */}
      <line x1="55" y1="270" x2="145" y2="270" stroke="#d4af37" strokeWidth="1.5" />
      <line x1="55" y1="310" x2="145" y2="310" stroke="#d4af37" strokeWidth="1.5" />
      {/* Corner rosettes */}
      <circle cx="60" cy="130" r="12" fill="none" stroke="#d4af37" strokeWidth="1.5" />
      <circle cx="60" cy="130" r="6"  fill="none" stroke="#d4af37" strokeWidth="1" />
      <circle cx="140" cy="130" r="12" fill="none" stroke="#d4af37" strokeWidth="1.5" />
      <circle cx="140" cy="130" r="6"  fill="none" stroke="#d4af37" strokeWidth="1" />
      {/* Door knob */}
      <circle cx="155" cy="200" r="8" fill="#d4af37" opacity="0.6" />
      <circle cx="155" cy="200" r="4" fill="#d4af37" opacity="0.9" />
    </svg>
  );
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [isOpening, setIsOpening] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play song — store on window so it survives component unmount
    const audio = new Audio('/song.mp3');
    audio.volume = 0.7;
    audio.loop = true;
    audio.play().catch(() => {/* autoplay blocked — user gesture should allow it */});
    (window as Window & { __bgAudio?: HTMLAudioElement }).__bgAudio = audio;

    setTimeout(onComplete, 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0a2e1f 0%, #0f4a32 50%, #0a2e1f 100%)",
      }}
    >
      {/* Background stars */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-300 rounded-full"
          style={{
            left: `${(i * 37 + 5) % 100}%`,
            top: `${(i * 53 + 8) % 100}%`,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* ── LEFT DOOR ── */}
      <motion.div
        className="absolute left-0 top-0 w-1/2 h-full z-20"
        style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
        animate={isOpening ? { rotateY: -110 } : { rotateY: 0 }}
        transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Door face */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0f6b4a 0%, #1a5c3a 40%, #0d4a2e 100%)",
            borderRight: "4px solid #d4af37",
            boxShadow: "inset -8px 0 20px rgba(0,0,0,0.4)",
          }}
        >
          <DoorDecor />
          {/* Gold border trim */}
          <div className="absolute inset-2 border border-amber-400/20 pointer-events-none" />
          <div className="absolute inset-4 border border-amber-400/10 pointer-events-none" />
        </div>
        {/* Door edge (3D side) */}
        <div
          className="absolute top-0 right-0 h-full w-6"
          style={{
            background: "linear-gradient(to right, #0a3d22, #062a17)",
            transform: "rotateY(90deg) translateZ(-3px)",
            transformOrigin: "right center",
          }}
        />
      </motion.div>

      {/* ── RIGHT DOOR ── */}
      <motion.div
        className="absolute right-0 top-0 w-1/2 h-full z-20"
        style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
        animate={isOpening ? { rotateY: 110 } : { rotateY: 0 }}
        transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Door face */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(225deg, #0f6b4a 0%, #1a5c3a 40%, #0d4a2e 100%)",
            borderLeft: "4px solid #d4af37",
            boxShadow: "inset 8px 0 20px rgba(0,0,0,0.4)",
          }}
        >
          <DoorDecor flip />
          <div className="absolute inset-2 border border-amber-400/20 pointer-events-none" />
          <div className="absolute inset-4 border border-amber-400/10 pointer-events-none" />
        </div>
        {/* Door edge */}
        <div
          className="absolute top-0 left-0 h-full w-6"
          style={{
            background: "linear-gradient(to left, #0a3d22, #062a17)",
            transform: "rotateY(-90deg) translateZ(-3px)",
            transformOrigin: "left center",
          }}
        />
      </motion.div>

      {/* ── CENTER SEAM & GOLD LOCK ── */}
      {!isOpening && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {/* Gold vertical seam line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-screen bg-amber-400/40 pointer-events-none" />
        </motion.div>
      )}

      {/* ── CENTER CONTENT (shown before opening) ── */}
      {!isOpening && (
        <motion.div
          className="relative z-30 flex flex-col items-center gap-6 px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Crescent + star */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 60 60" className="w-16 h-16 text-amber-300" fill="currentColor">
              <path d="M30 6 C18 6 8 16 8 30 C8 44 18 54 30 54 C22 48 17 39 17 30 C17 21 22 12 30 6Z" />
              <polygon points="46,8 48,14 54,14 49,18 51,24 46,20 41,24 43,18 38,14 44,14" />
            </svg>
          </motion.div>

          {/* Arabic */}
          <motion.p
            className="text-amber-300 text-xl md:text-2xl font-semibold"
            style={{ textShadow: "0 0 20px rgba(212,175,55,0.6)" }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
          </motion.p>

          <p className="text-white/70 text-sm italic">You are cordially invited</p>

          {/* Open button */}
          <motion.div className="relative mt-2">
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-amber-400 blur-xl"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.button
              onClick={handleOpen}
              className="relative px-10 py-4 rounded-full text-white font-semibold text-lg shadow-2xl tracking-wide"
              style={{
                background: "linear-gradient(135deg, #d4af37, #f0c040, #d4af37)",
                border: "2px solid rgba(255,255,255,0.3)",
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              🚪 Open the Doors
            </motion.button>
          </motion.div>

          <p className="text-white/40 text-xs mt-1 italic">Tap to enter</p>
        </motion.div>
      )}

      {/* ── LIGHT BURST when doors open ── */}
      {isOpening && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,175,55,0.35) 0%, transparent 70%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
      )}
    </div>
  );
}
