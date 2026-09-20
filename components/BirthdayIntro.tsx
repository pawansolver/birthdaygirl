"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift, Crown, Stars } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { triggerRomanticConfetti } from "./ConfettiButton";

interface BirthdayIntroProps {
  onOpen: () => void;
  isOpened: boolean;
}

export default function BirthdayIntro({ onOpen, isOpened }: BirthdayIntroProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOpenSurprise = () => {
    setIsTransitioning(true);

    // Fire romantic celebration burst
    triggerRomanticConfetti({
      particleCount: 80,
      origin: { x: 0.5, y: 0.55 },
    });

    setTimeout(() => {
      onOpen();
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          key="birthday-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(12px)",
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09030C] px-6 text-center select-none overflow-hidden"
        >
          {/* Ambient magical background lights */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial from-[#7A1F4B]/35 via-[#F472B6]/15 to-transparent rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-[#F5D08A]/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
            {/* Top Cute Badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7A1F4B]/50 via-[#9E205D]/40 to-[#7A1F4B]/50 border border-[#F472B6]/40 text-[#FBCFE8] text-xs font-medium mb-8 backdrop-blur-xl shadow-[0_0_25px_rgba(244,114,182,0.3)]"
            >
              <Crown className="w-3.5 h-3.5 text-[#F5D08A]" />
              <span>Special Birthday Delivery 💌</span>
              <Sparkles className="w-3.5 h-3.5 text-[#F5D08A]" />
            </motion.div>

            {/* Glowing Heart Locket */}
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
              className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-[#7A1F4B] via-[#94235B] to-[#3B0C23] border-2 border-[#F5D08A]/60 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(244,114,182,0.4)]"
            >
              <Heart className="w-12 h-12 text-[#F5D08A] animate-pulse fill-[#F5D08A]/30" />
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-3xl border border-[#F472B6] animate-ping opacity-30" />
            </motion.div>

            {/* Line 1 */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg sm:text-xl text-[#FBCFE8] font-light tracking-wide mb-3 font-serif italic"
            >
              {birthdayConfig.intro.line1}
            </motion.p>

            {/* Line 2 */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-serif text-3xl sm:text-5xl text-[#FFF7FB] font-normal tracking-tight mb-10 leading-snug"
            >
              {birthdayConfig.intro.line2}
            </motion.h1>

            {/* Action Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="button"
                onClick={handleOpenSurprise}
                disabled={isTransitioning}
                className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#7A1F4B] via-[#A22864] to-[#F472B6] text-[#FFF7FB] text-base font-medium shadow-[0_0_35px_rgba(244,114,182,0.5)] border-2 border-[#F5D08A]/60 hover:border-[#FFF7FB] hover:shadow-[0_0_50px_rgba(244,114,182,0.7)] transition-all duration-300 cursor-pointer disabled:opacity-75"
              >
                <span>{birthdayConfig.intro.buttonText}</span>
                <Sparkles className="w-5 h-5 text-[#F5D08A] transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </motion.div>

            {/* Gentle romantic note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12 text-xs text-[#D8C7D3] tracking-widest uppercase font-light"
            >
              Made with endless love · Just for you
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
