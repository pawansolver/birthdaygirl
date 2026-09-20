"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, Crown, RotateCcw, PartyPopper } from "lucide-react";
import { birthdayStoryData } from "@/data/birthdayStory";
import { triggerRomanticConfetti } from "@/components/ConfettiButton";

interface Chapter12FinaleProps {
  onReplay: () => void;
}

export default function Chapter12Finale({ onReplay }: Chapter12FinaleProps) {
  const [photoError, setPhotoError] = useState(false);
  const data = birthdayStoryData.chapter12;

  useEffect(() => {
    // Fire celebration confetti when reaching final chapter
    triggerRomanticConfetti({ particleCount: 90, origin: { x: 0.5, y: 0.6 } });
  }, []);

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      onReplay();
    }, 400);
  };

  return (
    <section id="chapter-12" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center select-none">
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
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FFF4F7] font-normal tracking-tight mt-3 mb-2">
          {data.title}
        </h2>
        <p className="font-serif text-base sm:text-xl text-[#C9B8C1] italic max-w-lg mx-auto">
          “{data.quoteLine1} <br className="hidden sm:inline" />
          {data.quoteLine2}”
        </p>
      </motion.div>

      {/* Her Best Photo - Full Cinematic Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="relative max-w-[320px] sm:max-w-[360px] aspect-[4/5] mx-auto rounded-[32px] p-3.5 bg-gradient-to-b from-[#2B102F] to-[#120716] border-2 border-[#F5D08A] shadow-[0_0_80px_rgba(244,114,182,0.4)] group mb-10"
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0A040E] border border-white/10 flex items-center justify-center">
          {!photoError ? (
            <Image
              src={data.photo}
              alt="Her Best Portrait"
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover object-center animate-slow-zoom"
              onError={() => setPhotoError(true)}
            />
          ) : (
            <div className="p-6 text-center">
              <Crown className="w-10 h-10 text-[#F5D08A] mx-auto mb-2" />
              <p className="font-serif text-base text-[#FFF7FB] italic">Her Best Photo</p>
              <code className="text-[10px] text-[#F5D08A]/70 font-mono mt-2">
                {data.photo}
              </code>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A040E]/80 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Emotional Birthday Reveal */}
      <div className="max-w-xl mx-auto space-y-6 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-2xl sm:text-3xl text-[#FFF4F7] font-light leading-relaxed"
        >
          “{data.question}”
        </motion.p>

        <div className="text-3xl text-[#F472B6] animate-pulse">❤️</div>

        <motion.h3
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl text-[#FFF4F7] font-medium tracking-tight"
        >
          <span className="text-cinema-gradient italic">{data.mainTitle}</span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-serif text-lg sm:text-2xl text-[#E8C982] italic leading-relaxed pt-3 border-t border-[#E879A8]/25"
        >
          “{data.closingWish}”
        </motion.p>
      </div>

      {/* Replay Button */}
      <div>
        <button
          type="button"
          onClick={handleReplay}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#E879A8]/40 hover:border-[#E8C982] text-xs font-mono tracking-widest uppercase text-[#C9B8C1] hover:text-[#FFF7FB] bg-[#120914]/85 hover:bg-[#5A1636]/40 transition-all duration-400 cursor-pointer shadow-lg"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#E8C982] group-hover:-rotate-90 transition-transform duration-500" />
          <span>Experience our story again</span>
        </button>
      </div>
    </section>
  );
}
