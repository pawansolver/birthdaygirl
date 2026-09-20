"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, Sparkles, Camera } from "lucide-react";
import { birthdayStoryData } from "@/data/birthdayStory";

export default function Chapter09PauseTime() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [photoError, setPhotoError] = useState<Record<number, boolean>>({});
  const data = birthdayStoryData.chapter09;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % data.photos.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, data.photos.length]);

  return (
    <section id="chapter-09" className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center select-none">
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

      {/* Fullscreen Cinematic Memory Slideshow Box */}
      <div className="relative w-full max-h-[480px] aspect-[4/5] sm:aspect-[16/9] mx-auto rounded-3xl overflow-hidden cinema-card shadow-[0_20px_70px_rgba(0,0,0,0.85)] p-4 flex items-end justify-between">
        <AnimatePresence mode="wait">
          {!photoError[currentIdx] ? (
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={data.photos[currentIdx]}
                alt="Paused Memory"
                fill
                sizes="(max-width: 1024px) 100vw, 950px"
                className="object-cover object-center"
                onError={() =>
                  setPhotoError((prev) => ({ ...prev, [currentIdx]: true }))
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08050A] via-[#08050A]/30 to-transparent opacity-85" />
            </motion.div>
          ) : (
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1F0E2E] to-[#08020A] flex items-center justify-center">
              <Camera className="w-8 h-8 text-[#F5D08A]" />
            </div>
          )}
        </AnimatePresence>

        {/* Caption bottom-left */}
        <div className="relative z-10 text-left p-3 rounded-xl bg-[#08020A]/70 backdrop-blur-md border border-white/10 max-w-xs">
          <p className="font-serif text-xs sm:text-sm text-[#FFF7FB] italic">
            {data.caption}
          </p>
          <span className="text-[10px] font-mono text-[#F5D08A] uppercase">
            Memory 0{currentIdx + 1} of 0{data.photos.length}
          </span>
        </div>

        {/* Pause / Play Interaction Button */}
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#08020A]/85 backdrop-blur-md border border-[#F5D08A]/50 text-xs font-mono text-[#FFF7FB] hover:border-[#F5D08A] cursor-pointer shadow-lg"
        >
          {isPaused ? <Play className="w-3 h-3 text-[#F5D08A]" /> : <Pause className="w-3 h-3 text-[#F5D08A]" />}
          <span>{isPaused ? "Resume Time" : "Pause This Moment"}</span>
        </button>
      </div>
    </section>
  );
}
