"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Camera } from "lucide-react";
import { birthdayStoryData } from "@/data/birthdayStory";

export default function Chapter01Beginning() {
  const [showHidden, setShowHidden] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const data = birthdayStoryData.chapter01;

  useEffect(() => {
    // Hidden message appears after 3 sec
    const timer = setTimeout(() => {
      setShowHidden(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="chapter-01" className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center select-none">
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

      {/* Her photo slowly appears */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[310px] sm:max-w-[340px] aspect-[4/5] mx-auto rounded-[28px] p-3.5 bg-gradient-to-b from-[#2B102F] to-[#120716] border border-[#F5D08A]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group mb-6"
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0A040E] border border-white/10 flex items-center justify-center">
          {!photoError ? (
            <Image
              src={data.photo}
              alt="Her Beginning Portrait"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover object-center animate-slow-zoom"
              onError={() => setPhotoError(true)}
            />
          ) : (
            <div className="p-6 text-center flex flex-col items-center justify-center h-full bg-gradient-to-b from-[#260E2E] to-[#0D0210]">
              <Camera className="w-8 h-8 text-[#F5D08A] mb-2" />
              <p className="font-serif text-base text-[#FFF7FB] italic">Her Photo</p>
              <code className="text-[10px] text-[#F5D08A]/70 font-mono mt-2">
                {data.photo}
              </code>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A040E]/80 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Hidden message appears after 3 sec */}
      <AnimatePresence>
        {showHidden && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#5A1636]/50 via-[#7A1F4B]/40 to-[#5A1636]/50 border border-[#F5D08A]/40 backdrop-blur-xl shadow-[0_0_30px_rgba(232,201,130,0.25)]"
          >
            <Sparkles className="w-4 h-4 text-[#E8C982] shrink-0" />
            <p className="font-serif text-sm sm:text-base text-[#FFF4F7] italic">
              “{data.hiddenMessage}”
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
