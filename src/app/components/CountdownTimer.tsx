import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";

type TimeUnitKey = 'days' | 'hours' | 'minutes' | 'seconds';

interface ScratchCardProps {
  value: number;
  label: string;
  unit: TimeUnitKey;
  isInView: boolean;
}

function ScratchCard({ value, label, isInView }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Draw the grey scratch overlay onto the canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Rich deep green → teal → emerald gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0,    '#0f4a32');
    grad.addColorStop(0.35, '#0e7a55');
    grad.addColorStop(0.65, '#0f9b6a');
    grad.addColorStop(1,    '#0f4a32');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gold shimmer diagonal stripes
    ctx.strokeStyle = 'rgba(212,175,55,0.25)';
    ctx.lineWidth = 5;
    for (let i = -canvas.height; i < canvas.width + canvas.height; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + canvas.height, canvas.height);
      ctx.stroke();
    }

    // Subtle radial glow in center
    const radial = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.6
    );
    radial.addColorStop(0, 'rgba(212,175,55,0.18)');
    radial.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // "Scratch Here" text in gold
    ctx.fillStyle = 'rgba(255,215,80,0.95)';
    ctx.font = `bold ${Math.floor(canvas.width * 0.13)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch', canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = `bold ${Math.floor(canvas.width * 0.11)}px sans-serif`;
    ctx.fillText(label.toUpperCase(), canvas.width / 2, canvas.height / 2 + 16);
  }, [label]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Check how much has been scratched
  const checkRevealThreshold = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }
    const ratio = transparent / (pixels.length / 4);
    if (ratio > 0.45) {
      // Clear the whole canvas to fully reveal
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setRevealed(true);
    }
  }, [revealed]);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const t = e.touches[0];
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
    }
    return { x: ((e as React.MouseEvent).clientX - rect.left) * scaleX, y: ((e as React.MouseEvent).clientY - rect.top) * scaleY };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 38;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 19, 0, Math.PI * 2);
      ctx.fill();
    }
    lastPos.current = { x, y };
    checkRevealThreshold();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setScratching(true);
    lastPos.current = null;
    scratch(...Object.values(getPos(e, canvas)) as [number, number]);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!scratching) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    scratch(...Object.values(getPos(e, canvas)) as [number, number]);
  };
  const onMouseUp = () => { setScratching(false); lastPos.current = null; };

  const onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    setScratching(true);
    lastPos.current = null;
    scratch(...Object.values(getPos(e, canvas)) as [number, number]);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!scratching) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    scratch(...Object.values(getPos(e, canvas)) as [number, number]);
  };
  const onTouchEnd = () => { setScratching(false); lastPos.current = null; };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <div className="relative w-28 h-32 sm:w-32 sm:h-36 md:w-40 md:h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-[var(--islamic-gold)]">
        {/* Gold revealed layer — always underneath */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--islamic-gold)] to-amber-600 flex flex-col items-center justify-center">
          <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tabular-nums">
            {value.toString().padStart(2, '0')}
          </span>
          <span className="text-xs sm:text-sm md:text-base text-white/90 mt-2 uppercase tracking-wider">
            {label}
          </span>
        </div>

        {/* Scratch canvas overlay */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            width={160}
            height={176}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
        )}
      </div>
    </motion.div>
  );
}

export function CountdownTimer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const weddingDate = new Date("2026-07-02T10:45:00").getTime();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const now = Date.now();
      const distance = weddingDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--islamic-beige)] to-white px-4 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-[var(--islamic-green)] font-serif">
            Counting Down to Our Special Day
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-[2px] bg-[var(--islamic-gold)]" />
            <svg className="w-6 h-6 text-[var(--islamic-gold)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
            </svg>
            <div className="w-24 h-[2px] bg-[var(--islamic-gold)]" />
          </div>
          <p className="text-lg text-[var(--muted-foreground)] italic">
            Scratch each card to reveal the countdown
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <ScratchCard value={timeLeft.days}    label="Days"    unit="days"    isInView={isInView} />
          <ScratchCard value={timeLeft.hours}   label="Hours"   unit="hours"   isInView={isInView} />
          <ScratchCard value={timeLeft.minutes} label="Minutes" unit="minutes" isInView={isInView} />
          <ScratchCard value={timeLeft.seconds} label="Seconds" unit="seconds" isInView={isInView} />
        </div>

        {/* Instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center text-sm text-[var(--muted-foreground)] mt-12 italic"
        >
          Use your finger or mouse to scratch and reveal the time ✨
        </motion.p>
      </div>
    </section>
  );
}
