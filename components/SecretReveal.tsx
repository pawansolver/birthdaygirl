"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Heart, Eye, ZoomIn } from "lucide-react";
import CinematicPhoto from "./CinematicPhoto";
import PhotoLightbox from "./PhotoLightbox";
import { useLanguage } from "@/context/LanguageContext";

export default function SecretReveal() {
  const { story, t, language } = useLanguage();
  const { ch11 } = story.chapters;
  const [isOpen, setIsOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleOpenSecret = () => {
    setIsPulsing(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsPulsing(false);
    }, 1200);
  };



  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center text-center">
      {/* Screen pulse heartbeat effect when opening */}
      <AnimatePresence>
        {isPulsing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.4, 0.1, 0.5, 0],
              scale: [1, 1.05, 1, 1.08, 1],
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#160A13] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {!isOpen ? (
        /* Suspense Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full bg-[#0C0710] border border-[#D6B36A]/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-[0_20px_70px_rgba(5,3,8,0.95)] flex flex-col items-center"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#160A13] border border-[#D6B36A]/40 flex items-center justify-center mb-3 sm:mb-4 shadow-[0_0_20px_rgba(214,179,106,0.2)]">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#D6B36A]" />
          </div>

          <p className="font-editorial text-lg sm:text-2xl text-white italic mb-2 sm:mb-2.5 font-normal px-2">
            &ldquo;{ch11.warningText}&rdquo;
          </p>

          <p className="font-sans text-[11px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#E6CA7E] mb-5 sm:mb-6 font-semibold">
            {ch11.confirmQuestion}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleOpenSecret}
              disabled={isPulsing}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-[#D6B36A] bg-[#160A13] text-white hover:text-[#D6B36A] text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold transition-all shadow-[0_0_30px_rgba(214,179,106,0.25)] hover:shadow-[0_0_45px_rgba(214,179,106,0.4)] cursor-pointer disabled:opacity-50"
            >
              {language === "hi" ? "वादा देखें ✦" : "OPEN IT"}
            </button>
            <button
              onClick={() => {}}
              className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#E8B4C8] hover:text-white transition-colors py-1.5 sm:py-2 px-3 sm:px-4 cursor-pointer font-medium"
            >
              {language === "hi" ? "थोड़ी देर बाद" : "Maybe later"}
            </button>
          </div>
        </motion.div>
      ) : (
        /* Revealed Private Message & Photo */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-[#0C0710] border border-[#D6B36A]/40 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 shadow-[0_25px_80px_rgba(214,179,106,0.2)] flex flex-col items-center"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#160A13] border border-[#D6B36A]/50 flex items-center justify-center mb-3 sm:mb-4">
            <Unlock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D6B36A]" />
          </div>

          {/* Secret Image with Prominent Tap to View Button */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="group relative w-full h-48 sm:h-64 md:h-72 rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 sm:mb-4 border border-[#D6B36A]/40 shadow-[0_15px_35px_rgba(5,3,8,0.9)] cursor-pointer"
          >
            <CinematicPhoto
              src={ch11.secretImage}
              alt="Secret Memory"
              desktopObjectPosition={ch11.desktopObjectPosition}
              mobileObjectPosition={ch11.mobileObjectPosition}
              fitMode="contain"
              className="w-full h-full group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient for button contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050308]/85 via-transparent to-transparent pointer-events-none" />

            {/* Tap to View Floating Button */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(true);
                }}
                className="px-4 py-1.5 rounded-full bg-[#0C0710]/95 border border-[#D6B36A] text-white hover:text-[#D6B36A] flex items-center gap-1.5 shadow-[0_0_20px_rgba(214,179,106,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95 touch-manipulation"
              >
                <Eye className="w-3.5 h-3.5 text-[#D6B36A] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-semibold text-white whitespace-nowrap">
                  {t("tapToViewFull")}
                </span>
              </button>
            </div>

            {/* Corner Zoom Icon */}
            <div className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-[#160A13]/90 border border-[#D6B36A]/50 flex items-center justify-center text-[#D6B36A] shadow-md">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>

          {/* Secret Message Lines - bright, crisp white */}
          <div className="space-y-1.5 sm:space-y-2 mb-3.5 sm:mb-4 max-w-lg px-2">
            {ch11.secretMessage.map((line, idx) => (
              <p
                key={idx}
                className="font-editorial text-base sm:text-xl md:text-2xl text-white italic leading-snug font-normal"
              >
                &ldquo;{line}&rdquo;
              </p>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[#FFD7E5]">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current animate-pulse text-[#FFD7E5]" />
            <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-[#FFD7E5]">
              {language === "hi" ? "सिर्फ तुम्हारे लिए" : "Just for you"}
            </span>
          </div>
        </motion.div>
      )}

      {/* Fullscreen Photo Lightbox */}
      <PhotoLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageSrc={ch11.secretImage}
        caption="A private promise kept just for you..."
        desktopObjectPosition={ch11.desktopObjectPosition}
        mobileObjectPosition={ch11.mobileObjectPosition}
      />
    </div>
  );
}

