"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData } from "@/data/birthday";

interface StoryIntroProps {
  isOpened: boolean;
  onBegin: () => void;
}

export default function StoryIntro({ isOpened, onBegin }: StoryIntroProps) {
  const [phase, setPhase] = useState(0);
  const { intro } = birthdayData;

  useEffect(() => {
    if (isOpened) return;

    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 4200);
    const t3 = setTimeout(() => setPhase(3), 6400);
    const t4 = setTimeout(() => setPhase(4), 8600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpened]);

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          key="story-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08050A] px-6 text-center select-none overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#5A1636]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto min-h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.p
                  key="p0"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="font-serif text-xl sm:text-2xl text-[#C9B8C1] font-light tracking-wide italic"
                >
                  {intro.phase1}
                </motion.p>
              )}

              {phase === 1 && (
                <motion.p
                  key="p1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="font-serif text-xl sm:text-2xl text-[#C9B8C1] font-light tracking-wide italic"
                >
                  {intro.phase2}
                </motion.p>
              )}

              {phase === 2 && (
                <motion.p
                  key="p2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="font-serif text-2xl sm:text-3xl text-[#FFF4F7] font-normal tracking-wide"
                >
                  {intro.phase3}
                </motion.p>
              )}

              {phase === 3 && (
                <motion.p
                  key="p3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="font-serif text-2xl sm:text-3xl text-[#E879A8] font-light tracking-wider"
                >
                  {intro.phase4}
                </motion.p>
              )}

              {phase === 4 && (
                <motion.div
                  key="p4"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <h1 className="font-serif text-2xl sm:text-4xl text-[#FFF4F7] font-normal tracking-tight leading-relaxed whitespace-pre-line mb-8">
                    {intro.phase5}
                  </h1>

                  <button
                    type="button"
                    onClick={onBegin}
                    className="group relative inline-flex items-center justify-center px-9 py-3.5 rounded-full border border-[#E879A8]/40 hover:border-[#E8C982] bg-[#120914]/80 hover:bg-[#5A1636]/40 text-xs sm:text-sm font-medium tracking-widest uppercase text-[#FFF4F7] transition-all duration-400 shadow-[0_0_25px_rgba(232,121,168,0.2)] hover:shadow-[0_0_35px_rgba(232,201,130,0.3)] cursor-pointer"
                  >
                    <span>{intro.buttonText}</span>
                    <span className="ml-3 text-xs text-[#E8C982] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {phase < 4 && (
            <button
              type="button"
              onClick={() => setPhase(4)}
              className="absolute bottom-8 text-[11px] font-mono tracking-widest uppercase text-[#C9B8C1]/40 hover:text-[#C9B8C1] transition-colors duration-300 cursor-pointer"
            >
              Skip intro
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
