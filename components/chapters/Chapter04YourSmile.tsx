"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Camera, Heart } from "lucide-react";
import { birthdayStoryData } from "@/data/birthdayStory";

export default function Chapter04YourSmile() {
  const [photoError, setPhotoError] = useState(false);
  const data = birthdayStoryData.chapter04;

  return (
    <section id="chapter-04" className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto select-none">
      {/* Chapter Marker */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8"
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

      {/* Full-screen Portrait with Slow Cinematic Zoom */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full max-h-[520px] aspect-[4/5] sm:aspect-[16/9] mx-auto rounded-[32px] overflow-hidden cinema-card flex items-end justify-center p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.85)] group"
      >
        {!photoError ? (
          <div className="absolute inset-0 z-0">
            <Image
              src={data.photo}
              alt="Her Beautiful Smile Portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 950px"
              className="object-cover object-center animate-slow-zoom"
              onError={() => setPhotoError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08050A] via-[#08050A]/40 to-transparent opacity-85" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#260E2E] to-[#08020A] flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-10 h-10 text-[#F5D08A] mx-auto mb-2" />
              <p className="font-serif text-lg text-[#FFF7FB] italic">Her Smile Portrait</p>
              <code className="text-xs text-[#F5D08A]/70 font-mono mt-2">
                {data.photo}
              </code>
            </div>
          </div>
        )}

        {/* Hidden compliment appears gradually */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative z-10 text-center max-w-lg mx-auto p-4 rounded-2xl bg-[#09020C]/80 backdrop-blur-xl border border-[#F472B6]/30 shadow-xl"
        >
          <div className="inline-flex items-center gap-1.5 text-xs text-[#F5D08A] font-mono tracking-widest uppercase mb-1">
            <Heart className="w-3.5 h-3.5 fill-[#F5D08A]" />
            <span>Unspoken Truth</span>
          </div>
          <p className="font-serif text-base sm:text-xl text-[#FFF7FB] italic leading-relaxed">
            “{data.compliment}”
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
