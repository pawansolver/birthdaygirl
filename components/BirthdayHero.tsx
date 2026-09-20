"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Star,
  Crown,
  Camera,
  PartyPopper,
} from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import ConfettiButton from "./ConfettiButton";

export default function BirthdayHero() {
  const [imageError, setImageError] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const featuredPhoto = birthdayConfig.photos[0]?.src || "/images/girl-photo-1.jpg";

  const handleWish = () => {
    setWishMade(true);
    setTimeout(() => {
      setWishMade(false);
    }, 4500);
  };

  return (
    <section
      id="birthday-hero"
      aria-label="Birthday Hero"
      className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-[#7A1F4B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#F472B6]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* LEFT COLUMN: Message & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Birthday Girl Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#7A1F4B]/50 via-[#9E205D]/40 to-[#7A1F4B]/50 border border-[#F472B6]/40 text-[#FBCFE8] text-xs font-medium mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(244,114,182,0.25)]">
              <Crown className="w-3.5 h-3.5 text-[#F5D08A]" />
              <span className="tracking-wide">Today's Birthday Queen 👑</span>
              <Sparkles className="w-3 h-3 text-[#F5D08A]" />
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FFF7FB] font-normal tracking-tight leading-[1.12] mb-4">
              Happy Birthday, <br />
              <span className="text-gradient-rose font-medium italic">
                {birthdayConfig.nickname || birthdayConfig.girlName}
              </span>{" "}
              <span className="inline-block text-[#F472B6] animate-pulse">❤️</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#D8C7D3] text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-lg mb-6">
              {birthdayConfig.heroSubtitle}
            </p>

            {/* CTA Buttons & Interactive Wish */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <ConfettiButton
                onClick={handleWish}
                ariaLabel="Make a Birthday Wish"
                className="group w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#7A1F4B] via-[#94235B] to-[#F472B6] text-[#FFF7FB] text-sm font-medium shadow-[0_0_25px_rgba(244,114,182,0.35)] border border-[#F5D08A]/60 hover:border-[#FFF7FB] hover:shadow-[0_0_35px_rgba(244,114,182,0.6)]"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F5D08A] group-hover:rotate-45 transition-transform duration-300" />
                  <span>{birthdayConfig.heroWishButton}</span>
                  <PartyPopper className="w-3.5 h-3.5 text-[#F5D08A]" />
                </span>
              </ConfettiButton>

              <a
                href="#photo-gallery"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs sm:text-sm font-light text-[#D8C7D3] hover:text-[#FFF7FB] border border-[#F472B6]/20 hover:border-[#F472B6]/50 bg-[#120716]/60 backdrop-blur-md transition-all duration-300"
              >
                <span>View Memories Album</span>
                <span className="text-xs">↓</span>
              </a>
            </div>

            {/* Wish confirmation toast */}
            {wishMade && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3.5 inline-flex items-center gap-2 text-xs sm:text-sm text-[#F5D08A] font-medium tracking-wide bg-[#7A1F4B]/60 px-4 py-2 rounded-full border border-[#F5D08A]/50 shadow-[0_0_20px_rgba(245,208,138,0.25)] backdrop-blur-xl"
              >
                <Star className="w-3.5 h-3.5 fill-[#F5D08A]" />
                <span>✨ Your wish was sent to the stars! May all your dreams come true! ❤️</span>
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT COLUMN: Featured Birthday Photo Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative w-full max-w-[290px] sm:max-w-[320px] aspect-[4/5] rounded-[28px] p-3 sm:p-3.5 bg-gradient-to-b from-[#2B102F] to-[#120716] border border-[#F5D08A]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              {/* Cute Washi Tape at Top */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 rounded-sm bg-gradient-to-r from-[#F5D08A]/80 via-[#FFF7FB] to-[#F5D08A]/80 border border-[#F5D08A] shadow-md z-30 flex items-center justify-center">
                <span className="w-8 h-px bg-[#7A1F4B]/50" />
              </div>

              {/* Floating Sticker 1: Top-Right */}
              <div className="absolute -top-2 -right-2 z-30 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#7A1F4B] to-[#BE185D] text-[#FFF7FB] text-[10px] font-medium shadow-md border border-[#F472B6]/40 flex items-center gap-1 transform rotate-6 group-hover:rotate-0 transition-transform">
                <Sparkles className="w-3 h-3 text-[#F5D08A]" />
                <span>100% Gorgeous ✨</span>
              </div>

              {/* Floating Sticker 2: Bottom-Left */}
              <div className="absolute -bottom-2 -left-2 z-30 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#4A154B] to-[#7A1F4B] text-[#FFF7FB] text-[10px] font-medium shadow-md border border-[#F472B6]/40 flex items-center gap-1 transform -rotate-6 group-hover:rotate-0 transition-transform">
                <Heart className="w-3 h-3 text-[#F472B6] fill-[#F472B6]" />
                <span>My Favorite View 💖</span>
              </div>

              {/* Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0A040E] border border-white/10 flex items-center justify-center">
                {!imageError ? (
                  <Image
                    src={featuredPhoto}
                    alt={`${birthdayConfig.girlName}'s Birthday Portrait`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  /* Magical Birthday Fallback */
                  <div className="p-6 text-center flex flex-col items-center justify-center h-full bg-gradient-to-b from-[#260E2E] via-[#16061B] to-[#0D0210]">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7A1F4B] to-[#3B0C23] border border-[#F472B6]/40 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(244,114,182,0.35)]">
                      <Camera className="w-7 h-7 text-[#F5D08A]" />
                    </div>
                    <p className="font-serif text-lg text-[#FFF7FB] mb-1 italic">
                      {birthdayConfig.girlName}
                    </p>
                    <p className="text-[11px] text-[#D8C7D3]/70 font-light mb-3">
                      Add her portrait to:
                    </p>
                    <code className="text-[10px] bg-[#08020A] px-2.5 py-1 rounded border border-[#F472B6]/30 text-[#F5D08A] font-mono">
                      /public/images/girl-photo-1.jpg
                    </code>
                  </div>
                )}

                {/* Floating romantic bottom bar */}
                <div className="absolute bottom-3 inset-x-3 p-2 rounded-xl bg-[#09030C]/85 backdrop-blur-xl border border-white/15 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F5D08A] animate-ping" />
                    <span className="text-[11px] font-medium text-[#FFF7FB] tracking-wide">
                      Our Favorite Smile
                    </span>
                  </div>
                  <Heart className="w-3.5 h-3.5 text-[#F472B6] fill-[#F472B6]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
