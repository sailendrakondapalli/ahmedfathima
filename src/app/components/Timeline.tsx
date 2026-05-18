import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Calendar, Clock, MapPin, RotateCcw } from "lucide-react";

// Back-face content per event
const backContent = [
  {
    arabic: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    translation:
      "May Allah bless you both, shower His blessings upon you, and unite you in goodness.",
    note: "This is the dua the Prophet ﷺ used to recite for newlyweds.",
    emoji: "🌙",
    dresscode: null,
    gift: null,
  },
  {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا",
    translation:
      "And of His signs is that He created for you from yourselves mates — Quran 30:21",
    note: "Dress Code: Formal & Elegant ✨",
    emoji: "💛",
    dresscode: "Formal & Elegant",
    gift: "Your presence is our greatest gift 🎁",
  },
];

interface FlipCardProps {
  event: {
    title: string;
    date: string;
    hijriDate?: string;
    time: string;
    venue: string;
    venueDetails?: string;
    address: string;
    mapUrl: string;
    side: string;
  };
  back: (typeof backContent)[0];
  index: number;
  isInView: boolean;
}

function FlipCard({ event, back, index, isInView }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: event.side === "right" ? 50 : -50 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: event.side === "right" ? 50 : -50 }
      }
      transition={{ duration: 0.8, delay: 1.2 + index * 0.3 }}
      className={event.side === "left" ? "text-right mb-8" : "mt-0"}
      style={{ perspective: "1200px" }}
    >
      {/* Flip hint */}
      <p className="text-xs text-[var(--islamic-gold)] mb-2 text-center italic opacity-70">
        {flipped ? "Tap to flip back" : "✨ Tap card to reveal a surprise"}
      </p>

      {/* Card wrapper — fixed height so both faces fill it */}
      <div
        className="relative cursor-pointer h-[340px] sm:h-[360px]"
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => setFlipped((f) => !f)}
      >
        {/* Animated inner */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ── FRONT ── */}
          <div
            className="absolute inset-0 bg-white rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-[var(--islamic-gold)]/30 hover:shadow-2xl hover:shadow-pink-200 transition-shadow duration-300 overflow-hidden"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <h3 className="text-base sm:text-xl text-[var(--islamic-green)] mb-3 font-semibold">
              {event.title}
            </h3>

            <div className="space-y-3 text-left">
              <div className="flex items-start gap-2">
                <Calendar className="w-5 h-5 text-[var(--islamic-gold)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">Date</p>
                  <p className="text-sm sm:text-base text-[var(--islamic-green)] font-medium">{event.date}</p>
                  {event.hijriDate && (
                    <p className="text-xs text-[var(--islamic-gold)] mt-0.5">{event.hijriDate}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[var(--islamic-gold)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm sm:text-base text-[var(--islamic-green)] font-medium">{event.venue}</p>
                  {event.venueDetails && (
                    <p className="text-xs text-[var(--muted-foreground)]">{event.venueDetails}</p>
                  )}
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-snug">{event.address}</p>
                </div>
              </div>

              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="block w-full py-2 px-4 bg-gradient-to-r from-[var(--islamic-green)] to-[var(--islamic-green)]/90 text-white text-center text-xs rounded-lg hover:shadow-lg hover:shadow-pink-300/50 transition-all duration-300"
              >
                Open in Google Maps
              </a>
            </div>

            {/* Flip indicator */}
            <div className="absolute top-3 right-3 text-[var(--islamic-gold)]/50">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>

          {/* ── BACK ── */}
          <div
            className="absolute inset-0 rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col items-center justify-center text-center gap-3"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, #0f6b4a 0%, #1a3a2e 50%, #0f6b4a 100%)",
              border: "2px solid #d4af37",
            }}
          >
            {/* Gold corner ornaments */}
            <div className="absolute top-3 left-3 text-amber-400 text-lg">✦</div>
            <div className="absolute top-3 right-3 text-amber-400 text-lg">✦</div>
            <div className="absolute bottom-3 left-3 text-amber-400 text-lg">✦</div>
            <div className="absolute bottom-3 right-3 text-amber-400 text-lg">✦</div>

            <div className="text-3xl">{back.emoji}</div>

            {/* Arabic dua */}
            <p
              className="text-amber-300 text-base sm:text-lg font-semibold leading-relaxed"
              dir="rtl"
              style={{ textShadow: "0 0 12px rgba(212,175,55,0.6)" }}
            >
              {back.arabic}
            </p>

            {/* Divider */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 h-[1px] bg-amber-400/40" />
              <span className="text-amber-400 text-xs">☽</span>
              <div className="flex-1 h-[1px] bg-amber-400/40" />
            </div>

            {/* Translation */}
            <p className="text-white/90 text-sm sm:text-base italic leading-relaxed">
              "{back.translation}"
            </p>

            {/* Note / dress code / gift */}
            {back.note && (
              <p className="text-amber-200/80 text-xs sm:text-sm mt-1 px-2">
                {back.note}
              </p>
            )}
            {back.gift && (
              <p className="text-amber-300 text-xs sm:text-sm font-medium">
                {back.gift}
              </p>
            )}

            {/* Flip back hint */}
            <div className="absolute top-3 right-3 text-amber-400/50">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const events = [
    {
      title: "Nikkah Ceremony",
      date: "Thursday, 2nd July 2026",
      hijriDate: "Hijiri 1448, Muharam 16th",
      time: "10:45 AM to 11:45 AM",
      venue: "Shiraz Hall",
      venueDetails: "Next to Albert Theatre",
      address: "14, Whannels Road, Egmore, Chennai - 600008",
      mapUrl: "https://maps.google.com/?q=Shiraz+Hall+14+Whannels+Road+Egmore+Chennai",
      side: "right",
      image: "/nikkha.jpg",
    },
    {
      title: "Reception",
      date: "Sunday, 5th July 2026",
      time: "12:00 PM onwards",
      venue: "Rasi Mahal",
      address: "Karur Bypass Road, Near Kalaignar Arivalayam, Trichy-2",
      mapUrl: "https://maps.google.com/?q=Rasi+Mahal+Karur+Bypass+Road+Kalaignar+Arivalayam+Trichy",
      side: "left",
      image: "/reception.jpg",
    },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen bg-gradient-to-b from-[var(--islamic-beige)] to-white px-4 py-20 relative overflow-hidden"
    >
      {/* Clouds — open on enter, close on exit */}
      {[
        { pos: "left-0 top-20",     dx: -450, w: "w-[500px] h-[300px]", delay: 0   },
        { pos: "right-0 top-32",    dx:  450, w: "w-[500px] h-[300px]", delay: 0   },
        { pos: "left-0 top-[40%]",  dx: -400, w: "w-[450px] h-[250px]", delay: 0.2 },
        { pos: "right-0 top-[45%]", dx:  400, w: "w-[450px] h-[250px]", delay: 0.2 },
        { pos: "left-0 bottom-32",  dx: -450, w: "w-[500px] h-[300px]", delay: 0.3 },
        { pos: "right-0 bottom-20", dx:  450, w: "w-[500px] h-[300px]", delay: 0.3 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.pos} ${c.w} pointer-events-none z-0`}
          initial={{ x: 0, opacity: 1 }}
          animate={isInView ? { x: c.dx, opacity: 0 } : { x: 0, opacity: 1 }}
          transition={{ duration: 1.8, delay: c.delay, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <ellipse cx="50"  cy="60" rx="50" ry="40" fill="#87CEEB" opacity="0.8"  />
            <ellipse cx="90"  cy="50" rx="60" ry="45" fill="#B0E0E6" opacity="0.9"  />
            <ellipse cx="130" cy="60" rx="50" ry="40" fill="#87CEEB" opacity="0.8"  />
            <ellipse cx="100" cy="70" rx="70" ry="30" fill="#ADD8E6" opacity="0.95" />
          </svg>
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-20"
        >
          <h2 className="text-4xl md:text-5xl text-[var(--islamic-green)]">Event Timeline</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-[2px] bg-[var(--islamic-gold)]" />
            <svg className="w-6 h-6 text-[var(--islamic-gold)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
            </svg>
            <div className="w-24 h-[2px] bg-[var(--islamic-gold)]" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--islamic-gold)] via-[var(--islamic-green)] to-[var(--islamic-gold)] -translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-32 relative">
            {events.map((event, index) => (
              <div key={index} className="relative">
                {/* Center dot */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--islamic-gold)] rounded-full border-4 border-white shadow-lg z-20"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.3 }}
                />

                <div className={`grid grid-cols-2 gap-4 sm:gap-8 ${event.side === "right" ? "items-start" : "items-end"}`}>
                  {/* Time card (left side) — image on top, time below */}
                  <motion.div
                    initial={{ opacity: 0, x: event.side === "left" ? 50 : -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: event.side === "left" ? 50 : -50 }}
                    transition={{ duration: 0.8, delay: 1.2 + index * 0.3 }}
                    className={event.side === "right" ? "text-right mt-0" : "order-2 mb-8"}
                  >
                    <div className="bg-white rounded-2xl shadow-xl border-2 border-[var(--islamic-gold)]/30 hover:shadow-2xl hover:shadow-pink-200 transition-all duration-300 h-[340px] sm:h-[360px] overflow-hidden flex flex-col">
                      {/* Image — top 65% */}
                      <div className="relative flex-1 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover object-top"
                        />
                        {/* subtle gold gradient at bottom of image */}
                        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
                      </div>
                      {/* Time info — bottom strip */}
                      <div className="px-4 py-3 flex items-center gap-3 border-t border-[var(--islamic-gold)]/20">
                        <Clock className="w-5 h-5 text-[var(--islamic-gold)] flex-shrink-0" />
                        <div className="text-left">
                          <p className="text-xs text-[var(--muted-foreground)]">Time</p>
                          <p className="text-sm sm:text-base text-[var(--islamic-green)] font-semibold">{event.time}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Flip card (right side) */}
                  <FlipCard
                    event={event}
                    back={backContent[index]}
                    index={index}
                    isInView={isInView}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
