"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Eye, ZoomIn } from "lucide-react";
import MemoryBubble from "./MemoryBubble";
import CinematicPhoto from "./CinematicPhoto";
import PhotoLightbox from "./PhotoLightbox";
import { StoryMemory } from "@/data/loveStory";
import { useLanguage } from "@/context/LanguageContext";

interface MemoryUniverseProps {
  onContinue: () => void;
}

export default function MemoryUniverse({ onContinue }: MemoryUniverseProps) {
  const [activeMemory, setActiveMemory] = useState<StoryMemory | null>(null);
  const [lightboxMemory, setLightboxMemory] = useState<StoryMemory | null>(null);
  const { story, t, language } = useLanguage();
  const { memories, hero } = story;

  // Symmetrical Left & Right positions so Top Heading and Bottom Continue Button NEVER overlap!
  // Left side: 01 (Top-Left), 02 (Mid-Left), 03 (Bottom-Left)
  // Right side: 04 (Top-Right), 05 (Mid-Right), 06 (Bottom-Right)
  const desktopPositions = [
    "top-[15%] left-[8%] md:left-[14%]",              // 01: Top-Left
    "top-[50%] -translate-y-1/2 left-[4%] md:left-[8%]", // 02: Mid-Left
    "bottom-[15%] left-[8%] md:left-[14%]",           // 03: Bottom-Left
    "top-[15%] right-[8%] md:right-[14%]",            // 04: Top-Right
    "top-[50%] -translate-y-1/2 right-[4%] md:right-[8%]",// 05: Mid-Right
    "bottom-[15%] right-[8%] md:right-[14%]",         // 06: Bottom-Right
  ];

  // Mobile positions (3 on left, 3 on right)
  const mobilePositions = [
    "top-[14%] left-[2%]",
    "top-[50%] -translate-y-1/2 left-[1%]",
    "bottom-[14%] left-[2%]",
    "top-[14%] right-[2%]",
    "top-[50%] -translate-y-1/2 right-[1%]",
    "bottom-[14%] right-[2%]",
  ];

  return (
    <div className="relative w-full h-[100dvh] min-h-[560px] flex flex-col items-center justify-center overflow-hidden bg-[#050308] select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#160A13]/40 via-[#050308]/90 to-[#050308] pointer-events-none" />

      {/* Top Heading - Protected in its own centered luxury pill */}
      <div className="absolute top-4 sm:top-6 md:top-8 text-center px-3 sm:px-4 z-30 pointer-events-none max-w-xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-[#0C0710]/90 border border-[#D6B36A]/35 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full shadow-[0_4px_25px_rgba(5,3,8,0.9)] inline-block max-w-[92vw]"
        >
          <p className="font-editorial text-xs sm:text-base md:text-xl text-white italic font-normal">
            {t("sixMomentsHeading")}
          </p>
        </motion.div>
        <div className="mt-1.5">
          <span className="text-[9px] sm:text-xs font-sans uppercase tracking-[0.2em] text-[#E6CA7E] font-semibold">
            {t("tapMomentToOpen")}
          </span>
        </div>
      </div>

      {/* Center Shrunken Hero Photo */}
      <div className="relative z-10 w-20 h-20 sm:w-28 sm:h-28 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#D6B36A]/60 shadow-[0_0_50px_rgba(214,179,106,0.35)] flex items-center justify-center animate-wedding-halo">
        <CinematicPhoto
          src={hero.image}
          alt="Center Hero"
          desktopObjectPosition={hero.desktopObjectPosition}
          mobileObjectPosition={hero.mobileObjectPosition}
          fitMode="cover"
          className="w-full h-full"
        />
      </div>

      {/* 6 Memory Bubbles (3 Left, 3 Right) */}
      <div className="absolute inset-0 max-w-5xl mx-auto pointer-events-auto">
        {memories.slice(0, 6).map((mem, idx) => (
          <div key={mem.id}>
            {/* Desktop Node */}
            <div className="hidden md:block">
              <MemoryBubble
                memory={mem}
                index={idx}
                onClick={() => setActiveMemory(mem)}
                positionClass={desktopPositions[idx]}
              />
            </div>
            {/* Mobile Node */}
            <div className="block md:hidden">
              <MemoryBubble
                memory={mem}
                index={idx}
                onClick={() => setActiveMemory(mem)}
                positionClass={mobilePositions[idx]}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Continue Button - 100% clear space without any bubble collision */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 z-30 pointer-events-auto"
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


      {/* Fullscreen Memory Modal when bubble is clicked */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMemory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#050308]/90 backdrop-blur-xl cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[92dvh] overflow-y-auto bg-[#0C0710] border border-[#D6B36A]/30 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_25px_80px_rgba(5,3,8,0.95)] flex flex-col items-center text-center cursor-default"
            >
              {/* Close Button - elevated z-50, touch-friendly, high contrast */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMemory(null);
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  setActiveMemory(null);
                }}
                aria-label="Close memory modal"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#160A13]/95 border-2 border-[#D6B36A]/60 flex items-center justify-center text-white hover:text-[#D6B36A] hover:border-[#D6B36A] shadow-[0_0_20px_rgba(5,3,8,0.95)] transition-all cursor-pointer touch-manipulation active:scale-95"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Memory Image with prominent Tap to View button */}
              <div
                onClick={() => setLightboxMemory(activeMemory)}
                className="group relative w-full h-56 sm:h-84 md:h-96 rounded-xl overflow-hidden mb-5 sm:mb-6 border border-[#D6B36A]/40 shadow-inner cursor-pointer"
              >
                <CinematicPhoto
                  src={activeMemory.image}
                  alt={activeMemory.title}
                  desktopObjectPosition={activeMemory.desktopObjectPosition}
                  mobileObjectPosition={activeMemory.mobileObjectPosition}
                  fitMode="contain"
                  className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Tap to View Button */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxMemory(activeMemory);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#0C0710]/95 border border-[#D6B36A] text-white hover:text-[#D6B36A] flex items-center gap-1.5 shadow-[0_0_20px_rgba(214,179,106,0.35)] transition-all cursor-pointer hover:scale-105 active:scale-95 touch-manipulation"
                  >
                    <Eye className="w-3 h-3 text-[#D6B36A] animate-pulse" />
                    <span className="text-[9px] sm:text-xs font-sans uppercase tracking-[0.2em] font-semibold text-white whitespace-nowrap">
                      {t("tapToViewFull")}
                    </span>
                  </button>
                </div>
              </div>

              {/* Memory Details */}
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] text-[#E6CA7E] uppercase mb-1.5 sm:mb-2 font-semibold">
                {language === "hi" ? `याद 0${activeMemory.id}` : `MEMORY 0${activeMemory.id}`}
              </span>
              <h3 className="font-heading text-xl sm:text-3xl text-white font-medium mb-2 sm:mb-3">
                {activeMemory.title}
              </h3>
              <p className="font-editorial text-base sm:text-xl text-[#FFD7E5] max-w-lg mb-5 sm:mb-6 italic font-normal px-2">
                &ldquo;{activeMemory.message}&rdquo;
              </p>

              {/* Close Button at bottom */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMemory(null);
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  setActiveMemory(null);
                }}
                className="px-6 py-2.5 rounded-full border border-[#D6B36A] bg-[#160A13] text-xs font-sans uppercase tracking-[0.2em] text-white hover:text-[#D6B36A] hover:border-[#D6B36A] transition-all cursor-pointer font-semibold shadow-sm touch-manipulation active:scale-95"
              >
                {t("closeMemory")}
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox from Memory Universe */}
      {lightboxMemory && (
        <PhotoLightbox
          isOpen={!!lightboxMemory}
          onClose={() => setLightboxMemory(null)}
          imageSrc={lightboxMemory.image}
          caption={lightboxMemory.message}
          desktopObjectPosition={lightboxMemory.desktopObjectPosition}
          mobileObjectPosition={lightboxMemory.mobileObjectPosition}
        />
      )}
    </div>
  );
}
