"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Camera } from "lucide-react";
import { birthdayStoryData } from "@/data/birthdayStory";

export default function Chapter02FirstFeeling() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const data = birthdayStoryData.chapter02;

  return (
    <section id="chapter-02" className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center select-none">
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

      {/* Meaningful Memory Card with Tap to Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        onClick={() => setIsRevealed(true)}
        className="group relative max-w-[310px] sm:max-w-[340px] aspect-[4/5] mx-auto rounded-[28px] p-3.5 bg-gradient-to-b from-[#1F0E2E] to-[#0A0312] border border-[#F472B6]/30 hover:border-[#F5D08A]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer transition-all duration-400 hover:-translate-y-2 mb-6"
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0A040E] border border-white/10 flex items-center justify-center">
          {!photoError ? (
            <Image
              src={data.photo}
              alt="First Feeling Memory"
              fill
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-106"
              onError={() => setPhotoError(true)}
            />
          ) : (
            <div className="p-6 text-center flex flex-col items-center justify-center h-full bg-gradient-to-b from-[#1F0E2E] to-[#08020A]">
              <Camera className="w-8 h-8 text-[#F5D08A] mb-2" />
              <p className="font-serif text-base text-[#FFF7FB] italic">Meaningful Memory</p>
              <code className="text-[10px] text-[#F5D08A]/70 font-mono mt-2">
                {data.photo}
              </code>
            </div>
          )}

          {/* Prompt overlay before tap */}
          {!isRevealed && (
            <div className="absolute inset-0 bg-[#08050A]/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center group-hover:bg-[#08050A]/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#7A1F4B]/60 border border-[#F472B6]/50 flex items-center justify-center mb-3 animate-pulse">
                <Heart className="w-6 h-6 text-[#F5D08A] fill-[#F5D08A]" />
              </div>
              <p className="text-xs font-mono tracking-wider uppercase text-[#FFF7FB]">
                {data.promptText}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Revealed Secret Message */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#7A1F4B]/50 via-[#9E205D]/40 to-[#7A1F4B]/50 border border-[#F5D08A]/40 backdrop-blur-xl shadow-[0_0_30px_rgba(244,114,182,0.3)]"
          >
            <Heart className="w-4 h-4 text-[#F472B6] fill-[#F472B6] shrink-0" />
            <p className="font-serif text-sm sm:text-base text-[#FFF4F7] italic">
              “{data.revealedMessage}”
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
