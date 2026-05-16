import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

export function EventDetails() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const events = [
    {
      title: "Nikkah Ceremony",
      date: "Thursday, 2nd July 2026",
      hijriDate: "Hijiri 1448, Muharam 16th",
      time: "10:45 AM to 11:45 AM",
      venue: "Shiraj Hall",
      venueDetails: "Next to Albert Theatre",
      address: "4, Whannels Road, Egmore, Chennai - 600008",
      mapUrl: "https://maps.google.com/?q=Shiraj+Hall+Whannels+Road+Egmore+Chennai",
      gradient: "from-[var(--islamic-green)] to-[var(--islamic-green)]/80",
    },
    {
      title: "Reception",
      date: "Sunday, 5th July 2026",
      time: "12:00 PM onwards",
      venue: "Rasi Mahal",
      address: "Karur Bypass Road, Near Kalaingar Arivalayam, Trichy-2",
      mapUrl: "https://maps.google.com/?q=Rasi+Mahal+Karur+Bypass+Road+Trichy",
      gradient: "from-[var(--islamic-gold)] to-[var(--islamic-gold)]/80",
    },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen bg-gradient-to-b from-[var(--islamic-beige)] to-white px-4 py-20 relative overflow-hidden"
    >
      {/* Top Left Cloud */}
      <motion.div
        className="absolute left-0 top-20 w-80 h-80 pointer-events-none"
        initial={{ x: 0, opacity: 0.8 }}
        animate={isInView ? { x: -350, opacity: 0 } : { x: 0, opacity: 0.8 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <ellipse cx="50" cy="60" rx="50" ry="40" fill="#d4af37" opacity="0.15" />
          <ellipse cx="90" cy="50" rx="60" ry="45" fill="#d4af37" opacity="0.2" />
          <ellipse cx="130" cy="60" rx="50" ry="40" fill="#d4af37" opacity="0.15" />
          <ellipse cx="100" cy="70" rx="70" ry="30" fill="#d4af37" opacity="0.25" />
        </svg>
      </motion.div>

      {/* Top Right Cloud */}
      <motion.div
        className="absolute right-0 top-32 w-80 h-80 pointer-events-none"
        initial={{ x: 0, opacity: 0.8 }}
        animate={isInView ? { x: 350, opacity: 0 } : { x: 0, opacity: 0.8 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <ellipse cx="50" cy="60" rx="50" ry="40" fill="#0f6b4a" opacity="0.15" />
          <ellipse cx="90" cy="50" rx="60" ry="45" fill="#0f6b4a" opacity="0.2" />
          <ellipse cx="130" cy="60" rx="50" ry="40" fill="#0f6b4a" opacity="0.15" />
          <ellipse cx="100" cy="70" rx="70" ry="30" fill="#0f6b4a" opacity="0.25" />
        </svg>
      </motion.div>

      {/* Bottom Left Cloud */}
      <motion.div
        className="absolute left-0 bottom-32 w-96 h-96 pointer-events-none"
        initial={{ x: 0, opacity: 0.8 }}
        animate={isInView ? { x: -400, opacity: 0 } : { x: 0, opacity: 0.8 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <ellipse cx="50" cy="60" rx="50" ry="40" fill="#f4e4c1" opacity="0.6" />
          <ellipse cx="90" cy="50" rx="60" ry="45" fill="#f4e4c1" opacity="0.7" />
          <ellipse cx="130" cy="60" rx="50" ry="40" fill="#f4e4c1" opacity="0.6" />
          <ellipse cx="100" cy="70" rx="70" ry="30" fill="#f4e4c1" opacity="0.8" />
        </svg>
      </motion.div>

      {/* Bottom Right Cloud */}
      <motion.div
        className="absolute right-0 bottom-20 w-96 h-96 pointer-events-none"
        initial={{ x: 0, opacity: 0.8 }}
        animate={isInView ? { x: 400, opacity: 0 } : { x: 0, opacity: 0.8 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <ellipse cx="50" cy="60" rx="50" ry="40" fill="#f4e4c1" opacity="0.6" />
          <ellipse cx="90" cy="50" rx="60" ry="45" fill="#f4e4c1" opacity="0.7" />
          <ellipse cx="130" cy="60" rx="50" ry="40" fill="#f4e4c1" opacity="0.6" />
          <ellipse cx="100" cy="70" rx="70" ry="30" fill="#f4e4c1" opacity="0.8" />
        </svg>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl text-[var(--islamic-green)]">
            Event Details
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-[2px] bg-[var(--islamic-gold)]" />
            <svg className="w-6 h-6 text-[var(--islamic-gold)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
            </svg>
            <div className="w-24 h-[2px] bg-[var(--islamic-gold)]" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateY: -15 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1, rotateY: 0 }
                  : { opacity: 0, y: 50, scale: 0.9, rotateY: -15 }
              }
              transition={{ duration: 0.8, delay: 0.5 + index * 0.3 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[var(--islamic-gold)]/30 hover:shadow-2xl hover:shadow-[var(--islamic-gold)]/20 transition-all duration-300">
                <div
                  className={`bg-gradient-to-r ${event.gradient} p-6 text-center`}
                >
                  <h3 className="text-2xl md:text-3xl text-white">
                    {event.title}
                  </h3>
                </div>

                <div className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-[var(--islamic-gold)] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-lg text-[var(--islamic-green)]">
                        {event.date}
                      </p>
                      {event.hijriDate && (
                        <p className="text-sm text-[var(--muted-foreground)] mt-1">
                          {event.hijriDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-[var(--islamic-gold)] mt-1 flex-shrink-0" />
                    <p className="text-lg text-[var(--islamic-green)]">
                      {event.time}
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[var(--islamic-gold)] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-lg text-[var(--islamic-green)]">
                        {event.venue}
                      </p>
                      {event.venueDetails && (
                        <p className="text-sm text-[var(--muted-foreground)] mt-1">
                          {event.venueDetails}
                        </p>
                      )}
                      <p className="text-base text-[var(--muted-foreground)] mt-2">
                        {event.address}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 px-6 bg-gradient-to-r from-[var(--islamic-green)] to-[var(--islamic-green)]/90 text-white text-center rounded-lg hover:shadow-lg hover:shadow-[var(--islamic-gold)]/30 transition-all duration-300"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add to Calendar Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <button className="px-8 py-4 bg-[var(--islamic-gold)] text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-[var(--islamic-gold)]/40 transition-all duration-300">
            <span className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              Add to Calendar
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
