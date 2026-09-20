"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Smile, Gift, Calendar, Stars } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-3.5 h-3.5 text-[#F5D08A]" />,
  Smile: <Smile className="w-3.5 h-3.5 text-[#F472B6]" />,
  Heart: <Heart className="w-3.5 h-3.5 text-[#F472B6] fill-[#F472B6]/40" />,
  Gift: <Gift className="w-3.5 h-3.5 text-[#F5D08A]" />,
};

const stickers = [
  "Chapter 01 · The Spark ✨",
  "Chapter 02 · That Smile 💕",
  "Chapter 03 · Golden Times 🌅",
  "Chapter 04 · Today & Always 🎂",
];

export default function MemoriesTimeline() {
  const { memories, memoriesSectionTitle, memoriesSectionSubtitle } = birthdayConfig;

  return (
    <section
      id="memories-timeline"
      aria-label="Memories Timeline"
      className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto select-none"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-radial from-[#7A1F4B]/15 via-[#F472B6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Section Header - Compact */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#7A1F4B]/40 via-[#9E205D]/30 to-[#7A1F4B]/40 border border-[#F472B6]/40 text-[#FBCFE8] text-xs font-medium mb-3 backdrop-blur-md shadow-[0_0_15px_rgba(244,114,182,0.2)]">
          <Calendar className="w-3 h-3 text-[#F5D08A]" />
          <span>Our Story · Milestone by Milestone</span>
          <Stars className="w-3 h-3 text-[#F5D08A]" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFF7FB] tracking-tight font-normal mb-2">
          {memoriesSectionTitle}
        </h2>
        <p className="text-[#D8C7D3] text-xs sm:text-sm font-light">
          {memoriesSectionSubtitle}
        </p>
      </div>

      {/* Timeline Container - Compact */}
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#7A1F4B]/30 via-[#F472B6]/60 to-[#F5D08A]/40 shadow-[0_0_10px_rgba(244,114,182,0.4)]" />

        <div className="space-y-8 sm:space-y-10">
          {memories.map((memory, index) => {
            const isEven = index % 2 === 0;
            const sticker = stickers[index % stickers.length];

            return (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center md:justify-between ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                } pl-10 md:pl-0`}
              >
                {/* Milestone Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#7A1F4B] to-[#1E0E25] border-2 border-[#F5D08A] flex items-center justify-center shadow-[0_0_15px_rgba(245,208,138,0.5)] z-10">
                  {memory.icon && iconMap[memory.icon] ? (
                    iconMap[memory.icon]
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#F5D08A]" />
                  )}
                </div>

                {/* Scrapbook Memory Card */}
                <div className="w-full md:w-[46%]">
                  <div className="relative rounded-2xl bg-gradient-to-b from-[#1F0E25] to-[#120716] p-4 sm:p-5 border border-[#F472B6]/25 hover:border-[#F5D08A]/60 shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(244,114,182,0.25)] transition-all duration-300 group hover:-translate-y-1">
                    {/* Tape Accent */}
                    <div className="absolute -top-2 left-6 w-12 h-3 rounded-sm bg-[#F5D08A]/40 border border-[#F5D08A]/60 backdrop-blur-md" />

                    <div className="flex items-center justify-between gap-2 mb-2 mt-0.5">
                      <span className="text-[11px] font-mono text-[#F5D08A] tracking-wider uppercase font-semibold">
                        {memory.date}
                      </span>
                      <span className="text-[10px] font-medium text-[#FBCFE8] bg-[#7A1F4B]/50 px-2.5 py-0.5 rounded-full border border-[#F472B6]/30">
                        {memory.tag || sticker}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl text-[#FFF7FB] font-normal mb-1.5 leading-snug">
                      {memory.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#D8C7D3] font-light leading-relaxed">
                      {memory.description}
                    </p>
                  </div>
                </div>

                <div className="hidden md:block w-[46%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
