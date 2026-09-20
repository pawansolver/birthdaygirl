"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { birthdayData } from "@/data/birthday";

export default function CinematicHero() {
  const [imageError, setImageError] = useState(false);
  const { hero, girlName } = birthdayData;

  return (
    <section
      id="hero"
      aria-label="Cinematic Hero"
      className="relative min-h-[88vh] sm:min-h-[92vh] w-full flex items-end justify-start px-6 sm:px-12 lg:px-20 pb-16 pt-28 overflow-hidden select-none"
    >
      {/* Background Image: HER PHOTO SLOWLY REVEALED */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!imageError ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full animate-slow-zoom"
          >
            <Image
              src={hero.image}
              alt={`${girlName}'s Portrait`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              onError={() => setImageError(true)}
            />
          </motion.div>
        ) : (
          /* Graceful dark placeholder */
          <div className="w-full h-full bg-gradient-to-b from-[#120914] via-[#08050A] to-[#08050A] flex items-center justify-center">
            <div className="text-center p-8">
              <p className="font-serif text-3xl text-[#FFF4F7]/40 mb-2">{girlName}</p>
              <code className="text-xs text-[#E8C982]/60 font-mono">
                {hero.image}
              </code>
            </div>
          </div>
        )}

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08050A] via-[#08050A]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08050A]/90 via-[#08050A]/40 to-transparent" />
        <div className="absolute inset-0 bg-[#5A1636]/10 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Hero Editorial Text Overlay */}
      <div className="relative z-10 max-w-2xl">
        {/* Prologue Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A1636]/40 border border-[#E879A8]/30 backdrop-blur-md mb-5"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E8C982]" />
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#E8C982]">
            {hero.tagline}
          </span>
        </motion.div>

        {/* Narrative Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-[#C9B8C1] font-light leading-relaxed whitespace-pre-line mb-4"
        >
          {hero.overlayText}
        </motion.p>

        {/* → “This is the story of us…” */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.9 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FFF4F7] font-normal tracking-tight mb-3"
        >
          <span className="text-cinema-gradient italic">{hero.storyTitle}</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-xs sm:text-sm text-[#C9B8C1]/80 tracking-widest uppercase font-light"
        >
          {hero.subText}
        </motion.p>
      </div>

      {/* Downward Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute right-6 sm:right-14 bottom-10 flex flex-col items-center gap-2 select-none"
      >
        <span className="text-[9px] font-mono tracking-widest uppercase text-[#C9B8C1]">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#E879A8] to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
