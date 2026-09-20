"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Chapter from "./Chapter";
import { birthdayData } from "@/data/birthday";
import { triggerRomanticConfetti } from "./ConfettiButton";

interface InteractiveSurpriseProps {
  onSurpriseRevealed: () => void;
  isRevealed: boolean;
}

export default function InteractiveSurprise({
  onSurpriseRevealed,
  isRevealed,
}: InteractiveSurpriseProps) {
  const [animationStep, setAnimationStep] = useState<
    "idle" | "blackout" | "heart" | "expand" | "done"
  >("idle");
  const { chapter4 } = birthdayData;

  const handleOpenSurprise = () => {
    setAnimationStep("blackout");

    setTimeout(() => {
      setAnimationStep("heart");
    }, 600);

    setTimeout(() => {
      setAnimationStep("expand");
      triggerRomanticConfetti({
        particleCount: 110,
        origin: { x: 0.5, y: 0.5 },
      });
    }, 1700);

    setTimeout(() => {
      setAnimationStep("done");
      onSurpriseRevealed();
    }, 2600);
  };

  return (
    <section id="chapter-4" className="relative py-16 sm:py-20 px-4 sm:px-8 lg:px-16 max-w-3xl mx-auto text-center select-none">
      <Chapter number={chapter4.number} title={chapter4.title} />

      <div className="max-w-md mx-auto mb-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-2xl sm:text-3xl text-[#FFF4F7] font-normal leading-relaxed whitespace-pre-line mb-3"
        >
          {chapter4.line1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs sm:text-sm text-[#C9B8C1] font-light italic"
        >
          {chapter4.line2}
        </motion.p>
      </div>

      <div className="relative min-h-[100px] flex items-center justify-center">
        {animationStep === "idle" && !isRevealed && (
          <motion.button
            type="button"
            onClick={handleOpenSurprise}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-9 py-3.5 rounded-full border border-[#E8C982]/60 bg-gradient-to-r from-[#5A1636] via-[#120914] to-[#5A1636] text-xs sm:text-sm font-medium tracking-widest uppercase text-[#FFF4F7] shadow-[0_0_30px_rgba(232,201,130,0.3)] hover:shadow-[0_0_45px_rgba(232,201,130,0.5)] transition-all duration-400 cursor-pointer"
          >
            <span>{chapter4.buttonText}</span>
            <span className="text-[#E8C982] transition-transform duration-300 group-hover:scale-125">
              ✨
            </span>
          </motion.button>
        )}

        <AnimatePresence>
          {animationStep !== "idle" && animationStep !== "done" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#08050A] select-none"
            >
              {animationStep === "heart" && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="w-14 h-14 text-[#E879A8] drop-shadow-[0_0_30px_rgba(232,121,168,0.9)] animate-pulse">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </motion.div>
              )}

              {animationStep === "expand" && (
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 18, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="w-14 h-14 text-[#E8C982] drop-shadow-[0_0_60px_rgba(232,201,130,1)]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
