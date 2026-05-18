import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { MapPin } from "lucide-react";

export function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const venues = [
    {
      name: "Nikkah Ceremony",
      address: "Shiraz Hall, 14, Whannels Road, Egmore, Chennai - 600008",
      mapUrl: "https://maps.google.com/?q=Shiraz+Hall+14+Whannels+Road+Egmore+Chennai",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8267!2d80.2577!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjciTiA4MMKwMTUnMjcuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
    },
    {
      name: "Reception",
      address: "Rasi Mahal, Karur Bypass Road, Near Kalaingar Arivalayam, Trichy-2",
      mapUrl: "https://maps.google.com/?q=Rasi+Mahal+Karur+Bypass+Road+Trichy",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5!2d78.6869!3d10.7905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ3JzI1LjgiTiA3OMKwNDEnMTIuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
    }
  ];

  return (
    <section
      ref={ref}
      className="bg-gradient-to-b from-white to-[var(--islamic-beige)] px-4 py-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-[var(--islamic-green)]">
            Venue Locations
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-[2px] bg-[var(--islamic-gold)]" />
            <MapPin className="w-6 h-6 text-[var(--islamic-gold)]" />
            <div className="w-24 h-[2px] bg-[var(--islamic-gold)]" />
          </div>
        </motion.div>

        {/* Maps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {venues.map((venue, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[var(--islamic-gold)]/30"
            >
              {/* Venue Info */}
              <div className="p-6 bg-gradient-to-r from-[var(--islamic-green)] to-[var(--islamic-green)]/90">
                <h3 className="text-2xl text-white font-semibold mb-2">
                  {venue.name}
                </h3>
                <p className="text-white/90 text-sm flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                  {venue.address}
                </p>
              </div>

              {/* Map Embed */}
              <div className="relative w-full h-80">
                <iframe
                  src={venue.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map for ${venue.name}`}
                />
              </div>

              {/* Open in Maps Button */}
              <div className="p-4">
                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-6 bg-[var(--islamic-gold)] text-white text-center rounded-lg hover:shadow-lg hover:shadow-pink-300/50 transition-all duration-300"
                >
                  Open in Google Maps
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
