"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import GateDoors from "./GateDoors";

interface CinematicGateProps {
  onOpenGate: () => void;
}

export default function CinematicGate({ onOpenGate }: CinematicGateProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Trigger romantic background music immediately on user gesture
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("start-birthday-music"));
    }

    // Call onOpenGate to transition state
    setTimeout(() => {
      onOpenGate();
    }, 1200);
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#050308] select-none">
      {/* Split Doors */}
      <GateDoors isOpen={isOpening} />

      {/* Center Content displayed on top before opening */}
      <motion.div
        animate={{
          opacity: isOpening ? 0 : 1,
          scale: isOpening ? 0.95 : 1,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative z-30 max-w-lg mx-auto px-4 sm:px-6 text-center flex flex-col items-center"
      >
        {/* Subtle decorative emblem */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D6B36A]/30 flex items-center justify-center mb-4 sm:mb-6 bg-[#0C0710]/80 shadow-[0_0_20px_rgba(214,179,106,0.15)]"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D6B36A]" />
        </motion.div>

        {/* Title - responsive tracking and sizing */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.15em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFF7FA] font-light tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase mb-3 sm:mb-4"
        >
          FOR ANNI ❤️
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="font-editorial text-lg sm:text-xl md:text-2xl text-[#E8B4C8] mb-8 sm:mb-10 italic max-w-md px-2"
        >
          &ldquo;A birthday surprise made with love, just for you...&rdquo;
        </motion.p>

        {/* Open Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center"
        >
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="group relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-[#D6B36A]/40 bg-[#0C0710]/90 text-[#FFF7FA] hover:text-[#D6B36A] hover:border-[#D6B36A] transition-all duration-500 shadow-[0_0_25px_rgba(214,179,106,0.15)] hover:shadow-[0_0_40px_rgba(214,179,106,0.3)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium transition-colors">
              OPEN YOUR SURPRISE
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#D6B36A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          <span className="mt-2.5 sm:mt-3 text-[10px] sm:text-[11px] text-[#BBAEB6]/60 tracking-[0.2em] uppercase font-light">
            Tap to begin
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
