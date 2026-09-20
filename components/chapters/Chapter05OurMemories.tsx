"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Sparkles, Camera } from "lucide-react";
import { birthdayStoryData } from "@/data/birthdayStory";

export default function Chapter05OurMemories() {
  const [activeFrame, setActiveFrame] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const data = birthdayStoryData.chapter05;

  const handleImageError = (id: number) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="chapter-05" className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto select-none">
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

      {/* Cinematic Filmstrip Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.filmFrames.map((frame, idx) => {
          const isFailed = failedImages[frame.id];
          const isRevealed = activeFrame === frame.id;

          return (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setActiveFrame(isRevealed ? null : frame.id)}
              className="group relative rounded-2xl bg-[#09020C] border-2 border-[#1E0E25] hover:border-[#F5D08A]/60 shadow-[0_15px_40px_rgba(0,0,0,0.85)] p-2.5 cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* 35mm Film Sprockets Top */}
              <div className="flex justify-between items-center px-2 py-1 mb-1.5 border-b border-white/10">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-1.5 rounded-xs bg-white/20" />
                  <span className="w-2.5 h-1.5 rounded-xs bg-white/20" />
                  <span className="w-2.5 h-1.5 rounded-xs bg-white/20" />
                </div>
                <span className="text-[9px] font-mono text-[#F5D08A]/70 uppercase">
                  EXP 0{frame.id}
                </span>
              </div>

              {/* Photo Area */}
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#120716] border border-white/5 flex items-center justify-center">
                {!isFailed ? (
                  <Image
                    src={frame.photo}
                    alt={frame.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, 250px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    onError={() => handleImageError(frame.id)}
                  />
                ) : (
                  <div className="p-4 text-center">
                    <Camera className="w-6 h-6 text-[#F5D08A] mx-auto mb-1" />
                    <code className="text-[9px] text-[#F5D08A]/70 font-mono">
                      {frame.photo}
                    </code>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09020C]/80 via-transparent to-transparent" />
              </div>

              {/* 35mm Film Sprockets Bottom */}
              <div className="flex justify-between items-center px-2 py-1 mt-1.5 border-t border-white/10">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-1.5 rounded-xs bg-white/20" />
                  <span className="w-2.5 h-1.5 rounded-xs bg-white/20" />
                  <span className="w-2.5 h-1.5 rounded-xs bg-white/20" />
                </div>
                <span className="text-[9px] font-mono text-[#E879A8]/70">
                  {frame.date}
                </span>
              </div>

              {/* Caption & Secret message */}
              <div className="pt-2 px-1">
                <p className="font-serif text-xs sm:text-sm text-[#FFF7FB] font-medium truncate">
                  {frame.caption}
                </p>

                <AnimatePresence>
                  {isRevealed ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[11px] text-[#FBCFE8] font-serif italic mt-1.5 pt-1.5 border-t border-white/10 leading-relaxed"
                    >
                      “{frame.secretMessage}”
                    </motion.p>
                  ) : (
                    <p className="text-[10px] text-[#F5D08A] font-mono mt-1">
                      Tap for secret note →
                    </p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
