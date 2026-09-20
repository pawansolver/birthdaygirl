"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Sparkles, Star, PartyPopper, Cake, Flame } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { triggerRomanticConfetti } from "./ConfettiButton";

export default function BirthdaySurprise() {
  const [isOpened, setIsOpened] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const { surprise, girlName } = birthdayConfig;

  const handleOpenGift = () => {
    setIsOpened(true);

    // Multi-burst celebration confetti
    triggerRomanticConfetti({ particleCount: 110, origin: { x: 0.5, y: 0.5 } });
    setTimeout(() => {
      triggerRomanticConfetti({ particleCount: 70, origin: { x: 0.3, y: 0.6 } });
      triggerRomanticConfetti({ particleCount: 70, origin: { x: 0.7, y: 0.6 } });
    }, 400);
  };

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    triggerRomanticConfetti({ particleCount: 80, origin: { x: 0.5, y: 0.6 } });
  };

  return (
    <section
      id="birthday-surprise"
      aria-label="Birthday Surprise"
      className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto overflow-hidden text-center select-none"
    >
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#7A1F4B]/25 via-[#F472B6]/15 to-[#F5D08A]/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          /* INITIAL CLOSED STATE */
          <motion.div
            key="surprise-closed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Surprise Teaser Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7A1F4B]/40 via-[#9E205D]/30 to-[#7A1F4B]/40 border border-[#F472B6]/40 text-[#FBCFE8] text-xs font-medium mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(244,114,182,0.2)]">
              <Gift className="w-3.5 h-3.5 text-[#F5D08A]" />
              <span className="tracking-wide">One Final Birthday Surprise 🎁</span>
              <Sparkles className="w-3.5 h-3.5 text-[#F5D08A]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFF7FB] font-normal mb-6 leading-tight">
              {surprise.previewText}
            </h2>

            {/* Glowing 3D Gift Box Representation - Compact */}
            <motion.div
              whileHover={{ scale: 1.06, rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.4 }}
              onClick={handleOpenGift}
              className="relative w-36 h-36 sm:w-42 sm:h-42 rounded-[30px] bg-gradient-to-br from-[#9E205D] via-[#7A1F4B] to-[#3B0C23] border-2 border-[#F5D08A] flex flex-col items-center justify-center cursor-pointer shadow-[0_0_45px_rgba(244,114,182,0.4)] group mb-8"
            >
              {/* Golden Ribbon Cross Over Box */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 bg-gradient-to-r from-[#F5D08A]/70 via-[#FFF7FB] to-[#F5D08A]/70 border-y border-[#F5D08A] opacity-80" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 bg-gradient-to-b from-[#F5D08A]/70 via-[#FFF7FB] to-[#F5D08A]/70 border-x border-[#F5D08A] opacity-80" />

              {/* Gift Bow on Top */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#F5D08A] to-[#D97706] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/40">
                <Gift className="w-8 h-8 text-[#7A1F4B] drop-shadow-sm" />
              </div>

              {/* Swinging Gift Tag */}
              <div className="absolute -bottom-2.5 right-4 bg-[#08020A] px-2.5 py-0.5 rounded-full border border-[#F5D08A]/60 text-[9px] font-mono text-[#F5D08A] shadow-md">
                For: {girlName} ❤️
              </div>

              {/* Outer pulsing halo */}
              <div className="absolute inset-0 rounded-[30px] border border-[#F472B6] animate-ping opacity-25" />
            </motion.div>

            {/* Open Button */}
            <button
              type="button"
              onClick={handleOpenGift}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7A1F4B] via-[#A22864] to-[#F472B6] text-[#FFF7FB] text-sm sm:text-base font-medium shadow-[0_0_30px_rgba(244,114,182,0.4)] border border-[#F5D08A]/60 hover:border-[#FFF7FB] hover:shadow-[0_0_40px_rgba(244,114,182,0.7)] transition-all duration-300 cursor-pointer"
            >
              <span>{surprise.openButtonText}</span>
              <Sparkles className="w-4 h-4 text-[#F5D08A] group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </motion.div>
        ) : (
          /* REVEALED CELEBRATION POPUP - Compact */
          <motion.div
            key="surprise-opened"
            initial={{ opacity: 0, scale: 0.88, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            className="relative z-10 rounded-[30px] p-6 sm:p-10 md:p-12 bg-gradient-to-b from-[#2A102F] via-[#1A081E] to-[#100314] border border-[#F5D08A] shadow-[0_20px_70px_rgba(244,114,182,0.4)]"
          >
            {/* Crown Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring" }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7A1F4B] to-[#F5D08A]/40 border border-[#F5D08A] flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(245,208,138,0.4)]"
            >
              <Heart className="w-8 h-8 text-[#F472B6] fill-[#F472B6]" />
            </motion.div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFF7FB] font-normal mb-6">
              {surprise.openedTitle}
            </h2>

            {/* Blessing Lines */}
            <div className="space-y-3 text-base sm:text-lg md:text-xl text-[#FBCFE8] font-light leading-relaxed max-w-lg mx-auto mb-6">
              {surprise.openedMessage.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>

            {/* Special Wish Highlight Quote */}
            <div className="pt-5 border-t border-[#F472B6]/25 max-w-md mx-auto mb-6">
              <p className="font-serif text-lg sm:text-2xl text-[#F5D08A] font-normal italic leading-relaxed">
                “{surprise.specialWish}”
              </p>
            </div>

            {/* Birthday Cake & Candles - Compact */}
            <div className="p-4 rounded-2xl bg-[#09020C]/80 border border-[#F472B6]/30 max-w-sm mx-auto mb-6 shadow-inner">
              <div className="flex items-center justify-center gap-2 mb-2.5">
                <Cake className="w-5 h-5 text-[#F5D08A]" />
                <span className="font-serif text-sm text-[#FFF7FB]">
                  {candlesBlown ? "✨ Wish Made!" : "Make a Birthday Wish"}
                </span>
                <Flame className={`w-4 h-4 text-[#F5D08A] ${candlesBlown ? "opacity-30" : "animate-bounce"}`} />
              </div>

              {!candlesBlown ? (
                <button
                  type="button"
                  onClick={handleBlowCandles}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#7A1F4B] to-[#9E205D] text-xs font-medium text-[#FFF7FB] border border-[#F5D08A]/50 hover:border-[#F5D08A] shadow-md cursor-pointer transition-all duration-300"
                >
                  🎂 Blow Out The Candles ✨
                </button>
              ) : (
                <p className="text-xs text-[#F5D08A] font-light">
                  May all your birthday wishes come true, beautiful! ❤️
                </p>
              )}
            </div>

            {/* Celebration again button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  triggerRomanticConfetti({ particleCount: 80 });
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-[#FFF7FB] bg-[#7A1F4B]/50 hover:bg-[#7A1F4B]/80 border border-[#F472B6]/40 hover:border-[#F472B6] transition-all duration-300 cursor-pointer shadow-md"
              >
                <PartyPopper className="w-3.5 h-3.5 text-[#F5D08A]" />
                <span>Celebrate Again ✨</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
