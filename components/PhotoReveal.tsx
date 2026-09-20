"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Chapter from "./Chapter";
import { birthdayData } from "@/data/birthday";

export default function PhotoReveal() {
  const { chapter1 } = birthdayData;
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="chapter-1" className="relative py-14 sm:py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto select-none">
      <Chapter number={chapter1.number} title={chapter1.title} />

      {/* Editorial Narrative - Compact */}
      <div className="max-w-xl mx-auto text-center mb-12 sm:mb-14">
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
          className="font-serif text-3xl sm:text-4xl text-[#FFF4F7] font-normal tracking-tight mb-4"
        >
          {chapter1.heading}
        </motion.h3>

        <div className="space-y-1.5">
          {chapter1.description.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="font-serif text-base sm:text-xl text-[#C9B8C1] font-light italic leading-relaxed"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      {/* 3 Photo Cards - Compact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {chapter1.photos.map((photo, idx) => {
          const isFailed = failedImages[photo.id];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group relative rounded-2xl overflow-hidden cinema-card cinema-card-hover aspect-[3/4] flex flex-col justify-end p-5 sm:p-6"
            >
              {!isFailed ? (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={() => handleImageError(photo.id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08050A] via-[#08050A]/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300" />
                </div>
              ) : (
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#180C1D] to-[#08050A] flex flex-col items-center justify-center p-5 text-center">
                  <div className="w-10 h-10 rounded-full border border-[#E879A8]/30 flex items-center justify-center mb-2">
                    <span className="text-[#E8C982] font-mono text-xs">0{idx + 1}</span>
                  </div>
                  <code className="text-[10px] text-[#E8C982]/60 font-mono">
                    {photo.src}
                  </code>
                </div>
              )}

              <div className="relative z-10">
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#E8C982] mb-1 block">
                  Moment 0{idx + 1}
                </span>
                <h4 className="font-serif text-base sm:text-lg text-[#FFF4F7] font-normal leading-snug mb-0.5">
                  {photo.caption}
                </h4>
                {photo.subcaption && (
                  <p className="text-xs text-[#C9B8C1] font-light leading-relaxed">
                    {photo.subcaption}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
