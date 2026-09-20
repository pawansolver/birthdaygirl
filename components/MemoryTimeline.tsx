"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Chapter from "./Chapter";
import { birthdayData } from "@/data/birthday";

export default function MemoryTimeline() {
  const { chapter2, fullscreenMoment } = birthdayData;
  const [fullscreenError, setFullscreenError] = useState(false);

  return (
    <section id="chapter-2" className="relative py-14 sm:py-16 px-4 sm:px-8 lg:px-16 max-w-5xl mx-auto select-none">
      <Chapter
        number={chapter2.number}
        title={chapter2.heading}
        subtitle={chapter2.subheading}
      />

      {/* Vertical Minimal Timeline - Compact */}
      <div className="relative my-14 max-w-2xl mx-auto">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[#5A1636]/20 via-[#E879A8]/30 to-[#5A1636]/20" />

        <div className="space-y-10 sm:space-y-12">
          {chapter2.memories.map((memory, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className={`relative flex items-center ${
                  isEven ? "sm:flex-row-reverse" : "sm:flex-row"
                } pl-10 sm:pl-0`}
              >
                {/* Milestone Node */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#08050A] border-2 border-[#E879A8] shadow-[0_0_10px_rgba(232,121,168,0.6)] z-10" />

                {/* Content Card */}
                <div className="w-full sm:w-[46%]">
                  <div className="cinema-card cinema-card-hover rounded-2xl p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#E8C982]">
                        {memory.date}
                      </span>
                      {memory.tag && (
                        <span className="text-[10px] text-[#FBCFE8] bg-[#5A1636]/40 px-2 py-0.5 rounded-full border border-[#E879A8]/20">
                          {memory.tag}
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-lg sm:text-xl text-[#FFF4F7] font-normal mb-1">
                      {memory.title}
                    </h4>

                    <p className="text-xs text-[#C9B8C1] font-light leading-relaxed">
                      {memory.description}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block w-[46%]" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FULLSCREEN MEMORIES MOMENT */}
      <div className="relative my-20 w-full rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[16/9] max-h-[500px] cinema-card flex items-center justify-center text-center p-6 select-none shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        {!fullscreenError ? (
          <div className="absolute inset-0 z-0">
            <Image
              src={fullscreenMoment.image}
              alt="Fullscreen Emotional Moment"
              fill
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover object-center animate-slow-zoom"
              onError={() => setFullscreenError(true)}
            />
            <div className="absolute inset-0 bg-[#08050A]/70 backdrop-blur-[1px]" />
            <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#180C1D] to-[#08050A]" />
        )}

        <div className="relative z-10 max-w-lg mx-auto space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-base sm:text-xl md:text-2xl text-[#C9B8C1] font-light leading-relaxed"
          >
            {fullscreenMoment.line1}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-serif text-xl sm:text-2xl md:text-3xl text-[#FFF4F7] italic font-normal tracking-wide"
          >
            {fullscreenMoment.line2}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
