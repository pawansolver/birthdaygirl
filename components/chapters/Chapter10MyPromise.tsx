"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { birthdayStoryData } from "@/data/birthdayStory";

export default function Chapter10MyPromise() {
  const [currentSentence, setCurrentSentence] = useState(0);
  const data = birthdayStoryData.chapter10;

  const nextSentence = () => {
    if (currentSentence < data.sentences.length) {
      setCurrentSentence(currentSentence + 1);
    }
  };

  return (
    <section id="chapter-10" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center select-none">
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

      {/* Deep Black Cinematic Screen - One sentence at a time */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#050108] border border-[#F472B6]/25 shadow-[0_20px_60px_rgba(0,0,0,0.95)] min-h-[260px] flex flex-col items-center justify-center">
        <div className="space-y-4 max-w-lg mx-auto mb-8">
          {data.sentences.map((sentence, idx) => {
            if (idx > currentSentence) return null;

            return (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-base sm:text-xl text-[#FFF4F7] italic leading-relaxed"
              >
                “{sentence}”
              </motion.p>
            );
          })}

          {/* Final Promise */}
          {currentSentence >= data.sentences.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="pt-6 border-t border-[#F5D08A]/30 mt-6"
            >
              <Heart className="w-6 h-6 text-[#F472B6] fill-[#F472B6] mx-auto mb-3 animate-pulse" />
              <p className="font-serif text-lg sm:text-2xl text-[#F5D08A] font-medium leading-relaxed">
                “{data.finalPromise}”
              </p>
            </motion.div>
          )}
        </div>

        {/* Interaction Button to reveal next sentence */}
        {currentSentence < data.sentences.length && (
          <button
            type="button"
            onClick={nextSentence}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#7A1F4B]/40 hover:bg-[#7A1F4B]/70 border border-[#F472B6]/40 text-xs font-mono tracking-wider uppercase text-[#FBCFE8] cursor-pointer transition-colors shadow-md"
          >
            <span>Reveal my next promise</span>
            <span>→</span>
          </button>
        )}
      </div>
    </section>
  );
}
