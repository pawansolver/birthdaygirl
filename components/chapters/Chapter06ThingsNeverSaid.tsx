"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart, Sparkles } from "lucide-react";
import { birthdayStoryData } from "@/data/birthdayStory";

export default function Chapter06ThingsNeverSaid() {
  const [isOpen, setIsOpen] = useState(false);
  const data = birthdayStoryData.chapter06;

  return (
    <section id="chapter-06" className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center select-none">
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
        <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF7FB] font-normal tracking-tight mt-3 mb-2">
          {data.title}
        </h2>
        <p className="font-serif text-base sm:text-xl text-[#C9B8C1] italic max-w-lg mx-auto">
          “{data.quoteLine1} <br className="hidden sm:inline" />
          {data.quoteLine2}”
        </p>
      </motion.div>

      {/* Interactive Envelope / Letter Container */}
      <div className="relative flex justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED ENVELOPE */
            <motion.div
              key="closed-letter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsOpen(true)}
              className="w-full max-w-md p-8 sm:p-10 rounded-[28px] bg-gradient-to-b from-[#1F0E25] to-[#120716] border border-[#F472B6]/30 hover:border-[#F5D08A]/60 shadow-[0_20px_60px_rgba(0,0,0,0.85)] cursor-pointer group transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="w-16 h-16 rounded-full bg-[#7A1F4B]/50 border-2 border-[#F5D08A] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(244,114,182,0.4)]">
                <Mail className="w-7 h-7 text-[#F5D08A]" />
              </div>
              <h3 className="font-serif text-xl text-[#FFF7FB] mb-2 font-normal">
                An Unopened Letter
              </h3>
              <p className="text-xs text-[#D8C7D3]/80 font-light mb-6">
                Written late at night, kept safe just for you.
              </p>
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#7A1F4B]/40 text-xs font-mono tracking-wider uppercase text-[#FBCFE8] border border-[#F472B6]/30 group-hover:bg-[#7A1F4B]/70 transition-colors">
                <span>Click to open letter</span>
                <span>→</span>
              </span>
            </motion.div>
          ) : (
            /* REVEALED HANDWRITTEN LETTER */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl p-6 sm:p-10 rounded-[28px] bg-gradient-to-b from-[#2B102F] via-[#1A0A20] to-[#100414] border border-[#F5D08A]/40 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-left relative"
            >
              {/* Wax Seal at Top */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#7A1F4B] to-[#3B0C23] border-2 border-[#F5D08A] flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-[#F5D08A] fill-[#F5D08A]" />
              </div>

              {/* Salutation */}
              <div className="mb-5 mt-2">
                <p className="font-script text-2xl sm:text-3xl text-[#FBCFE8] mb-1">
                  {data.salutation}
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#F472B6] to-transparent rounded-full" />
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-[#D8C7D3] font-light leading-relaxed sm:leading-loose">
                {data.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Closing */}
              <div className="mt-8 pt-4 border-t border-[#F472B6]/20 text-right">
                <p className="font-script text-xl text-[#FBCFE8] mb-0.5">
                  {data.closing}
                </p>
                <p className="font-serif text-base sm:text-lg text-[#FFF7FB] font-medium">
                  {data.signature}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
