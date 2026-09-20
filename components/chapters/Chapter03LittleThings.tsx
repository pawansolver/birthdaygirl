"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Heart, MessageCircle, Sparkles, Flower2 } from "lucide-react";
import { birthdayStoryData, FloatingMemory } from "@/data/birthdayStory";

const iconMap: Record<string, React.ReactNode> = {
  Smile: <Smile className="w-4 h-4 text-[#F472B6]" />,
  Heart: <Heart className="w-4 h-4 text-[#F472B6] fill-[#F472B6]/40" />,
  MessageCircle: <MessageCircle className="w-4 h-4 text-[#F5D08A]" />,
  Sparkles: <Sparkles className="w-4 h-4 text-[#F5D08A]" />,
  Flower2: <Flower2 className="w-4 h-4 text-[#FBCFE8]" />,
};

export default function Chapter03LittleThings() {
  const [activeMemory, setActiveMemory] = useState<number | null>(null);
  const data = birthdayStoryData.chapter03;

  const toggleMemory = (id: number) => {
    setActiveMemory(activeMemory === id ? null : id);
  };

  return (
    <section id="chapter-03" className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto select-none">
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
        <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF4F7] font-normal tracking-tight mt-3 mb-2">
          {data.title}
        </h2>
        <p className="font-serif text-base sm:text-xl text-[#C9B8C1] italic max-w-lg mx-auto">
          “{data.quoteLine1} <br className="hidden sm:inline" />
          {data.quoteLine2}”
        </p>
      </motion.div>

      {/* 5 Floating Memory Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {data.memories.map((mem, idx) => {
          const isOpened = activeMemory === mem.id;

          return (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onClick={() => toggleMemory(mem.id)}
              className={`relative rounded-2xl p-4 sm:p-5 border transition-all duration-400 cursor-pointer ${
                isOpened
                  ? "bg-gradient-to-b from-[#3A1435] to-[#1E0921] border-[#F5D08A] shadow-[0_15px_35px_rgba(244,114,182,0.35)] scale-[1.02]"
                  : "bg-gradient-to-b from-[#1E0E25]/90 to-[#120716]/90 border-[#F472B6]/20 hover:border-[#F5D08A]/50 hover:bg-[#25102C]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-[#7A1F4B]/40 border border-[#F472B6]/30 flex items-center justify-center">
                  {iconMap[mem.icon] || <Sparkles className="w-4 h-4 text-[#F5D08A]" />}
                </div>
                <span className="text-[9px] font-mono tracking-widest text-[#F5D08A] uppercase">
                  Memory 0{mem.id}
                </span>
              </div>

              <h3 className="font-serif text-base sm:text-lg text-[#FFF7FB] font-medium mb-1">
                {mem.title}
              </h3>
              <p className="text-xs text-[#D8C7D3]/80 font-light mb-3">
                {mem.shortNote}
              </p>

              {/* Hidden love message reveal */}
              <AnimatePresence>
                {isOpened && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-3 border-t border-[#F472B6]/25"
                  >
                    <p className="font-serif text-xs sm:text-sm text-[#FBCFE8] italic leading-relaxed">
                      “{mem.hiddenMessage}”
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isOpened && (
                <div className="text-right">
                  <span className="text-[10px] text-[#F5D08A] font-mono tracking-wider">
                    Tap to open 💌
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
