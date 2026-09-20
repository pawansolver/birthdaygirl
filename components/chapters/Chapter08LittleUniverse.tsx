"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Moon } from "lucide-react";
import { birthdayStoryData, StarMemory } from "@/data/birthdayStory";

export default function Chapter08LittleUniverse() {
  const [selectedStar, setSelectedStar] = useState<StarMemory | null>(null);
  const data = birthdayStoryData.chapter08;

  return (
    <section id="chapter-08" className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center select-none">
      {/* Chapter Marker */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-8"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#E8C982] bg-[#5A1636]/40 px-3 py-1 rounded-full border border-[#E879A8]/30">
          Chapter {data.number}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF4F7] font-normal tracking-tight mt-3 mb-2">
          {data.title}
        </h2>
        <p className="font-serif text-base sm:text-xl text-[#C9B8C1] italic max-w-lg mx-auto">
          “{data.quoteLine1} <br className="hidden sm:inline" />
          {data.quoteLine2}”
        </p>
      </motion.div>

      {/* Interactive Constellation / Starfield Canvas Box */}
      <div className="relative w-full max-h-[420px] aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0B0412] via-[#05010A] to-[#020005] border border-[#F472B6]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 mb-6">
        {/* Background ambient stars */}
        <div className="absolute inset-0 bg-[radial-gradient(#FFF4F7_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

        {/* Constellation Connecting SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#F5D08A]/30 stroke-[1] stroke-dasharray-[3,3]">
          <line x1="20%" y1="35%" x2="45%" y2="22%" />
          <line x1="45%" y1="22%" x2="75%" y2="40%" />
          <line x1="45%" y1="22%" x2="35%" y2="68%" />
          <line x1="35%" y1="68%" x2="65%" y2="75%" />
        </svg>

        {/* Interactive Glowing Stars */}
        {data.stars.map((star) => {
          const isSelected = selectedStar?.id === star.id;

          return (
            <button
              key={star.id}
              type="button"
              onClick={() => setSelectedStar(isSelected ? null : star)}
              style={{ left: `${star.cx}%`, top: `${star.cy}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer p-3 z-10"
              aria-label={`Star memory: ${star.name}`}
            >
              {/* Star Core & Glow */}
              <div
                className={`relative w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? "bg-[#F5D08A] shadow-[0_0_25px_rgba(245,208,138,1)] scale-125"
                    : "bg-[#FFF4F7] shadow-[0_0_12px_rgba(244,114,182,0.8)] group-hover:scale-125"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#7A1F4B]" />
              </div>

              {/* Star Label Tooltip */}
              <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-[#E8C982] whitespace-nowrap bg-[#08020A]/85 px-2 py-0.5 rounded border border-white/10 opacity-80 group-hover:opacity-100">
                {star.name}
              </span>
            </button>
          );
        })}

        {/* Bottom Helper text */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-[#D8C7D3]/60 uppercase">
          Click the glowing stars to explore our memories ✨
        </div>
      </div>

      {/* Star Memory Popup Box */}
      <div className="max-w-lg mx-auto min-h-[90px]">
        <AnimatePresence mode="wait">
          {selectedStar ? (
            <motion.div
              key={selectedStar.id}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl bg-gradient-to-r from-[#5A1636]/60 via-[#7A1F4B]/50 to-[#5A1636]/60 border border-[#F5D08A]/40 backdrop-blur-xl shadow-lg"
            >
              <h3 className="font-serif text-lg text-[#FFF7FB] mb-1 font-medium">
                {selectedStar.title}
              </h3>
              <p className="font-serif text-sm text-[#FBCFE8] italic leading-relaxed">
                “{selectedStar.memory}”
              </p>
            </motion.div>
          ) : (
            <div className="p-4 text-xs font-serif text-[#C9B8C1]/60 italic">
              Each star in our constellation holds a quiet memory.
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
