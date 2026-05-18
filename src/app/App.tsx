import { useState, useEffect, useCallback } from "react";
import { IntroAnimation } from "./components/IntroAnimation";
import { HeroSection } from "./components/HeroSection";
import { CountdownTimer } from "./components/CountdownTimer";
import { DigitalEnvelope } from "./components/DigitalEnvelope";
import { Timeline } from "./components/Timeline";
import { MapSection } from "./components/MapSection";
import { Footer } from "./components/Footer";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { ParallaxSection } from "./components/ParallaxSection";
import { Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Build a Google Calendar URL
function googleCalUrl(title: string, start: string, end: string, location: string, details: string) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    location,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Build and download an .ics file for both events
function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nikkah Invitation//EN",
    // Event 1 — Nikkah
    "BEGIN:VEVENT",
    "UID:nikkah-2026@invitation",
    "DTSTAMP:20260101T000000Z",
    "DTSTART:20260702T051500Z",  // 10:45 AM IST = 05:15 UTC
    "DTEND:20260702T061500Z",    // 11:45 AM IST = 06:15 UTC
    "SUMMARY:Nikkah Ceremony – Dr. Imthiyaz Ahmed & Dr. Rasool Fathima",
    "LOCATION:Shiraj Hall\\, 4 Whannels Road\\, Egmore\\, Chennai - 600008",
    "DESCRIPTION:Nikkah Ceremony. Next to Albert Theatre.",
    "END:VEVENT",
    // Event 2 — Reception
    "BEGIN:VEVENT",
    "UID:reception-2026@invitation",
    "DTSTAMP:20260101T000000Z",
    "DTSTART:20260705T063000Z",  // 12:00 PM IST = 06:30 UTC
    "DTEND:20260705T143000Z",    // 8:00 PM IST = 14:30 UTC
    "SUMMARY:Reception – Dr. Imthiyaz Ahmed & Dr. Rasool Fathima",
    "LOCATION:Rasi Mahal\\, Karur Bypass Road\\, Near Kalaingar Arivalayam\\, Trichy-2",
    "DESCRIPTION:Reception ceremony. 12:00 PM onwards.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "nikkah-invitation.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [showCalMenu, setShowCalMenu] = useState(false);
  const [muted, setMuted] = useState(false);

  const toggleMute = useCallback(() => {
    const audio = (window as Window & { __bgAudio?: HTMLAudioElement }).__bgAudio;
    if (audio) {
      audio.muted = !audio.muted;
      setMuted(audio.muted);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShowScrollIndicator(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nikkahGoogle = googleCalUrl(
    "Nikkah Ceremony – Dr. Imthiyaz Ahmed & Dr. Rasool Fathima",
    "20260702T104500",
    "20260702T114500",
    "Shiraj Hall, 4 Whannels Road, Egmore, Chennai - 600008",
    "Nikkah Ceremony. Next to Albert Theatre."
  );

  const receptionGoogle = googleCalUrl(
    "Reception – Dr. Imthiyaz Ahmed & Dr. Rasool Fathima",
    "20260705T120000",
    "20260705T200000",
    "Rasi Mahal, Karur Bypass Road, Near Kalaingar Arivalayam, Trichy-2",
    "Reception ceremony. 12:00 PM onwards."
  );

  return (
    <div className="min-h-screen bg-[var(--islamic-cream)]">
      {!showInvitation && (
        <IntroAnimation onComplete={() => setShowInvitation(true)} />
      )}

      {showInvitation && (
        <div className="w-full">
          <HeroSection />
          {showScrollIndicator && <ScrollIndicator />}
          <ParallaxSection imagePath="/holdinghands.jpeg" height="40vh" />
          <CountdownTimer />
          <DigitalEnvelope />
          <ParallaxSection imagePath="/promis.jpeg" height="40vh" backgroundSize="contain" />
          <Timeline />
          <ParallaxSection imagePath="/namaz.jpeg" height="40vh" />
          <MapSection />
          <Footer />

          {/* Music mute toggle — bottom left */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            onClick={toggleMute}
            className="fixed bottom-8 left-8 z-50 w-12 h-12 bg-[var(--islamic-green)] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title={muted ? "Unmute music" : "Mute music"}
          >
            {muted ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l1.73 1.73L21 18.46 5.54 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </motion.button>
          <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
            {/* Dropdown menu */}
            <AnimatePresence>
              {showCalMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl shadow-2xl border border-[var(--islamic-gold)]/30 overflow-hidden w-64"
                >
                  <div className="px-4 py-3 bg-[var(--islamic-green)] text-white text-sm font-semibold">
                    Add to Calendar
                  </div>
                  {/* Nikkah */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-[var(--muted-foreground)] mb-1 font-medium uppercase tracking-wide">Nikkah · 2 Jul 2026</p>
                    <a href={nikkahGoogle} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[var(--islamic-green)] hover:text-[var(--islamic-gold)] transition-colors py-1">
                      <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" />
                      Google Calendar
                    </a>
                  </div>
                  {/* Reception */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-[var(--muted-foreground)] mb-1 font-medium uppercase tracking-wide">Reception · 5 Jul 2026</p>
                    <a href={receptionGoogle} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[var(--islamic-green)] hover:text-[var(--islamic-gold)] transition-colors py-1">
                      <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" />
                      Google Calendar
                    </a>
                  </div>
                  {/* ICS download */}
                  <div className="px-4 py-2">
                    <p className="text-xs text-[var(--muted-foreground)] mb-1 font-medium uppercase tracking-wide">Both Events</p>
                    <button onClick={downloadIcs}
                      className="flex items-center gap-2 text-sm text-[var(--islamic-green)] hover:text-[var(--islamic-gold)] transition-colors py-1 w-full text-left">
                      <Calendar className="w-4 h-4" />
                      Apple / Outlook (.ics)
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              onClick={() => setShowCalMenu((v) => !v)}
              className="px-6 py-4 bg-[var(--islamic-gold)] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-3"
            >
              {showCalMenu ? <X className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
              <span className="hidden sm:inline">{showCalMenu ? "Close" : "Add to Calendar"}</span>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}