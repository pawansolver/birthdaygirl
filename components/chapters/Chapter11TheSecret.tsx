"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Unlock, Sparkles } from "lucide-react";
import { birthdayStoryData } from "@/data/birthdayStory";

export default function Chapter11TheSecret() {
  const [step, setStep] = useState<"initial" | "heartbeat" | "opened">("initial");
  const data = birthdayStoryData.chapter11;

  const handleOpenSecret = () => {
    setStep("heartbeat");

    setTimeout(() => {
      setStep("opened");
    }, 2200);
  };

  return (
    <section id="chapter-11" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center select-none">
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

      {/* Secret Card Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#040006] border border-[#F472B6]/25 shadow-[0_20px_70px_rgba(0,0,0,0.95)] min-h-[280px] flex flex-col items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === "initial" && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#5A1636]/40 border border-[#F5D08A]/50 flex items-center justify-center mb-5 shadow-lg">
                <Lock className="w-6 h-6 text-[#F5D08A]" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#FFF7FB] mb-6 font-normal">
                {data.confirmPrompt}
              </h3>
              <button
                type="button"
                onClick={handleOpenSecret}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7A1F4B] to-[#9E205D] border border-[#F5D08A]/60 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#FFF7FB] hover:border-[#FFF7FB] shadow-[0_0_25px_rgba(244,114,182,0.4)] cursor-pointer transition-all"
              >
                <span>YES, OPEN IT ❤️</span>
              </button>
            </motion.div>
          )}

          {step === "heartbeat" && (
            <motion.div
              key="heartbeat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.35, 1, 1.45, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: "easeInOut",
                }}
                className="w-16 h-16 rounded-full bg-[#7A1F4B] border-2 border-[#F472B6] flex items-center justify-center shadow-[0_0_35px_rgba(244,114,182,0.8)] mb-4"
              >
                <Heart className="w-8 h-8 text-[#FFF7FB] fill-[#FFF7FB]" />
              </motion.div>
              <p className="text-xs font-mono tracking-widest uppercase text-[#F5D08A] animate-pulse">
                Listening to my heartbeat...
              </p>
            </motion.div>
          )}

          {step === "opened" && (
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left space-y-4 max-w-lg"
            >
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#F472B6]/20">
                <Unlock className="w-4 h-4 text-[#F5D08A]" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#F5D08A]">
                  Confidential · For Your Eyes Only
                </span>
              </div>

              {data.secretContent.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="font-serif text-sm sm:text-base md:text-lg text-[#FBCFE8] italic leading-relaxed sm:leading-loose"
                >
                  “{paragraph}”
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
