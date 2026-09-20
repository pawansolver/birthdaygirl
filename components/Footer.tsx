"use client";

import React from "react";
import { motion } from "framer-motion";
import { RotateCcw, Heart, Sparkles, Crown } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

interface FooterProps {
  onReplay: () => void;
}

export default function Footer({ onReplay }: FooterProps) {
  const { finalMessage, girlName } = birthdayConfig;

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      onReplay();
    }, 400);
  };

  return (
    <footer
      aria-label="Footer"
      className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 text-center overflow-hidden border-t border-[#F472B6]/15 select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-t from-[#7A1F4B]/20 via-[#F472B6]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Crown & Heart Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#7A1F4B] to-[#3B0C23] border border-[#F5D08A] flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(244,114,182,0.35)]"
        >
          <Heart className="w-6 h-6 text-[#F5D08A] fill-[#F5D08A] animate-pulse" />
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
            <Crown className="w-4 h-4 text-[#F5D08A]" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FFF7FB] font-normal tracking-tight mb-4 leading-tight"
        >
          Happy Birthday, <br />
          <span className="text-gradient-rose font-medium italic">{girlName}</span> ❤️
        </motion.h2>

        {/* Subline */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-sm sm:text-lg text-[#D8C7D3] font-light leading-relaxed whitespace-pre-line mb-8 max-w-md"
        >
          {finalMessage.subline}
        </motion.div>

        {/* Replay Button */}
        <motion.button
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleReplay}
          className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#1E0E25] via-[#2B102F] to-[#1E0E25] hover:bg-[#3B1238] text-[#FBCFE8] hover:text-[#FFF7FB] text-xs sm:text-sm font-medium border border-[#F5D08A]/50 hover:border-[#F5D08A] shadow-[0_0_20px_rgba(122,31,75,0.3)] transition-all duration-300 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#F5D08A] group-hover:-rotate-90 transition-transform duration-500" />
          <span>{finalMessage.replayButton}</span>
          <Sparkles className="w-3 h-3 text-[#F5D08A]" />
        </motion.button>

        {/* Closing Note */}
        <div className="mt-10 text-[11px] text-[#D8C7D3]/40 tracking-widest uppercase">
          Crafted with endless love · Forever & Always
        </div>
      </div>
    </footer>
  );
}
