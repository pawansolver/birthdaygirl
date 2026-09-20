"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { birthdayStoryData } from "@/data/birthdayStory";

export default function Chapter07WhyYou() {
  const [activeReason, setActiveReason] = useState<number | null>(1);
  const data = birthdayStoryData.chapter07;

  return (
    <section id="chapter-07" className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto select-none">
      {/* Chapter Marker */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#E8C982] bg-[#5A1636]/40 px-3 py-1 rounded-full border border-[#E879A8]/30">
          Chapter {data.number}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF7FB] font-normal tracking-tight mt-3 mb-2">
          {data.title}
        </h2>
        <p className="font-serif text-base sm:text-xl text-[#C9B8C1] italic max-w-lg mx-auto">
          “{data.quoteLine1} <br className="hidden sm:inline" />
          {data.quoteLine2}”
        </p>
      </motion.div>

      {/* Interactive Numbered Why You Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {data.reasons.map((reason) => {
          const isActive = activeReason === reason.id;

          return (
            <button
              key={reason.id}
              type="button"
              onClick={() => setActiveReason(reason.id)}
              className={`p-3 sm:p-4 rounded-2xl border transition-all duration-300 text-center cursor-pointer ${
                isActive
                  ? "bg-[#7A1F4B] border-[#F5D08A] shadow-[0_0_20px_rgba(245,208,138,0.35)] scale-105"
                  : "bg-[#140817]/90 border-white/10 hover:border-[#F472B6]/40 hover:bg-[#1C0D21]"
              }`}
            >
              <span className="text-xs font-mono tracking-widest text-[#F5D08A] block mb-1">
                REASON
              </span>
              <span className="font-serif text-xl sm:text-2xl text-[#FFF7FB] font-medium">
                {reason.number}
              </span>
            </button>
          );
        })}
      </div>

      {/* Revealed Reason Card Box */}
      <div className="max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {data.reasons.map((reason) => {
            if (reason.id !== activeReason) return null;

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#25102C] to-[#120716] border border-[#F472B6]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center relative"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A1F4B]/40 text-xs font-mono text-[#F5D08A] mb-3 border border-[#F472B6]/20">
                  <Heart className="w-3 h-3 text-[#F472B6] fill-[#F472B6]" />
                  <span>Reason {reason.number} of 05</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#FFF7FB] font-medium mb-3">
                  {reason.title}
                </h3>

                <p className="text-sm sm:text-base text-[#D8C7D3] font-light leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
