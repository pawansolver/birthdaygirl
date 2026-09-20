"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import CinematicPhoto from "./CinematicPhoto";
import { useLanguage } from "@/context/LanguageContext";

interface HeroPhotoRevealProps {
  onContinue: () => void;
  isShrunk?: boolean;
}

export default function HeroPhotoReveal({
  onContinue,
  isShrunk = false,
}: HeroPhotoRevealProps) {
  const [textStep, setTextStep] = useState<number>(0);
  const { story, t } = useLanguage();
  const { hero } = story;

  useEffect(() => {
    // Sequential text reveal
    const t1 = setTimeout(() => setTextStep(1), 1000); // "There was a time before you..."
    const t2 = setTimeout(() => setTextStep(2), 2600); // "...and then there was you."
    const t3 = setTimeout(() => setTextStep(3), 4200); // Tagline & Continue Button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative w-full h-[100dvh] min-h-[520px] flex flex-col items-center justify-center overflow-hidden bg-[#050308]">
      {/* Subtle Light Leak overlay */}
      <div className="absolute inset-0 light-leak z-10 pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-8">
        {/* Hero Photo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: 1,
            scale: isShrunk ? 0.35 : 1,
            y: isShrunk ? -30 : 0,
          }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`relative transition-all duration-1000 ${
            isShrunk
              ? "w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] rounded-full overflow-hidden border-2 border-[#D6B36A]/50 shadow-[0_0_50px_rgba(214,179,106,0.3)] z-20 animate-wedding-halo"
              : "w-[94vw] md:w-[68vw] max-w-[900px] h-[46vh] sm:h-[58vh] md:h-[68vh] max-h-[700px] rounded-2xl md:rounded-3xl overflow-hidden border border-[#D6B36A]/30 shadow-[0_30px_90px_rgba(5,3,8,0.95)] z-10 animate-wedding-halo"
          }`}
        >
          <CinematicPhoto
            src={hero.image}
            alt="Our Story Hero"
            priority={true}
            desktopObjectPosition={hero.desktopObjectPosition}
            mobileObjectPosition={hero.mobileObjectPosition}
            fitMode={isShrunk ? "cover" : "contain"}
            className="w-full h-full"
          />

          {/* Dark gradient at bottom of photo to ensure maximum readability if text is positioned over photo */}
          {!isShrunk && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#050308]/95 via-[#050308]/40 to-transparent pointer-events-none" />
          )}
        </motion.div>

        {/* Text and Actions Overlay (Only visible when not shrunk) */}
        <AnimatePresence>
          {!isShrunk && (
            <div className="absolute inset-0 flex flex-col items-center justify-between py-4 sm:py-8 md:py-12 px-3 sm:px-4 z-20 pointer-events-none">
              {/* Top Tagline */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="bg-[#0C0710]/95 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-[#D6B36A]/45 shadow-lg"
              >
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#E6CA7E] font-semibold">
                  {hero.tagline}
                </span>
              </motion.div>

              {/* Center / Bottom Dedicated High-Contrast Luxury Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="bg-[#0C0710]/95 border border-[#D6B36A]/40 backdrop-blur-xl px-4 sm:px-10 py-3.5 sm:py-6 rounded-2xl sm:rounded-3xl shadow-[0_20px_70px_rgba(5,3,8,0.98)] max-w-[92vw] sm:max-w-xl mx-auto flex flex-col items-center text-center my-auto"
              >
                <h1 className="font-heading text-xl sm:text-3xl md:text-4xl text-white font-medium tracking-[0.06em] sm:tracking-[0.08em] uppercase mb-1 sm:mb-2 drop-shadow-md">
                  {hero.title}
                </h1>

                <AnimatePresence mode="wait">
                  {textStep === 1 && (
                    <motion.p
                      key="step-1"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.8 }}
                      className="font-editorial text-base sm:text-2xl md:text-3xl text-white italic font-normal drop-shadow-sm"
                    >
                      &ldquo;{hero.revealFirst}&rdquo;
                    </motion.p>
                  )}

                  {textStep >= 2 && (
                    <motion.p
                      key="step-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="font-editorial text-base sm:text-2xl md:text-3xl text-[#FFD7E5] italic font-normal drop-shadow-sm"
                    >
                      &ldquo;{hero.revealSecond}&rdquo;
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Bottom Continue Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="pointer-events-auto pb-1 sm:pb-0"
              >
                <button
                  onClick={onContinue}
                  className="group flex flex-col items-center gap-1 sm:gap-1.5 text-white hover:text-[#D6B36A] transition-colors duration-300 cursor-pointer"
                >
                  <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold">
                    {t("continue")}
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D6B36A]/50 flex items-center justify-center group-hover:border-[#D6B36A] group-hover:shadow-[0_0_15px_rgba(214,179,106,0.4)] transition-all">
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D6B36A] animate-bounce" />
                  </div>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

