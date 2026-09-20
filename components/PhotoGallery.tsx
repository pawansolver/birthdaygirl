"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Camera,
  Maximize2,
  Crown,
  Smile,
  Stars,
  Flower2,
} from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

// Cute stickers for birthday scrapbook aesthetic
const stickers = [
  { text: "Birthday Queen 👑", icon: <Crown className="w-3 h-3 text-[#F5D08A]" />, bg: "from-[#7A1F4B] to-[#9E205D]" },
  { text: "Pure Magic ✨", icon: <Sparkles className="w-3 h-3 text-[#F5D08A]" />, bg: "from-[#4A154B] to-[#7A1F4B]" },
  { text: "That Smile! 💕", icon: <Smile className="w-3 h-3 text-[#F472B6]" />, bg: "from-[#9E205D] to-[#E11D48]" },
  { text: "My Favorite View 🌸", icon: <Flower2 className="w-3 h-3 text-[#FBCFE8]" />, bg: "from-[#5B1238] to-[#881337]" },
  { text: "Golden Hour 💫", icon: <Stars className="w-3 h-3 text-[#F5D08A]" />, bg: "from-[#854D0E] to-[#A16207]" },
  { text: "Forever & Always 💖", icon: <Heart className="w-3 h-3 text-[#F472B6] fill-[#F472B6]" />, bg: "from-[#7A1F4B] to-[#BE185D]" },
];

const cardGradients = [
  "from-[#2B102F]/90 via-[#180A1C]/95 to-[#0F0512]",
  "from-[#1F0E2E]/90 via-[#13071F]/95 to-[#0A0312]",
  "from-[#331124]/90 via-[#1D0815]/95 to-[#0F040B]",
  "from-[#241029]/90 via-[#140817]/95 to-[#0B030D]",
  "from-[#351C10]/90 via-[#1C0D08]/95 to-[#0D0503]",
  "from-[#310E26]/90 via-[#1C0715]/95 to-[#0E030B]",
];

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [likedPhotos, setLikedPhotos] = useState<Record<number, boolean>>({});
  const [heartBursts, setHeartBursts] = useState<{ id: number; key: number }[]>([]);

  const photos = birthdayConfig.photos;

  const handleImageError = (id: number) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const newLiked = !likedPhotos[id];
    setLikedPhotos((prev) => ({ ...prev, [id]: newLiked }));

    if (newLiked) {
      setHeartBursts((prev) => [...prev, { id, key: Date.now() }]);
    }
  };

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! + 1) % photos.length);
  }, [selectedPhotoIndex, photos.length]);

  const prevPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! - 1 + photos.length) % photos.length);
  }, [selectedPhotoIndex, photos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, nextPhoto, prevPhoto]);

  const tilts = [
    "-rotate-[1deg] hover:rotate-0",
    "rotate-[1deg] hover:rotate-0",
    "-rotate-[1.5deg] hover:rotate-0",
    "rotate-[1.5deg] hover:rotate-0",
    "-rotate-[1deg] hover:rotate-0",
    "rotate-[1deg] hover:rotate-0",
  ];

  return (
    <section
      id="photo-gallery"
      aria-label="Photo Gallery"
      className="relative py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto select-none"
    >
      {/* Dynamic Background Glow Rings */}
      <div className="absolute top-10 left-1/3 w-[400px] h-[400px] bg-radial from-[#7A1F4B]/20 via-[#F472B6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-[400px] h-[400px] bg-radial from-[#F5D08A]/10 via-[#7A1F4B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Section Header - Compact */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7A1F4B]/40 via-[#9E205D]/30 to-[#7A1F4B]/40 border border-[#F472B6]/40 text-[#FBCFE8] text-xs font-medium mb-3 backdrop-blur-xl shadow-[0_0_20px_rgba(244,114,182,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F5D08A]" />
          <span className="tracking-wide">A Little Collection of You</span>
          <Sparkles className="w-3.5 h-3.5 text-[#F5D08A]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFF7FB] tracking-tight font-normal mb-2 leading-tight"
        >
          Moments That Make{" "}
          <span className="text-gradient-rose italic font-medium">My World</span>{" "}
          Stop
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-[#D8C7D3] text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed"
        >
          Every smile, laugh, and quiet moment captured forever in my heart.
        </motion.p>
      </div>

      {/* Compact Polaroid Gallery Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {photos.map((photo, index) => {
          const isFailed = failedImages[photo.id];
          const isLiked = likedPhotos[photo.id];
          const sticker = stickers[index % stickers.length];
          const gradient = cardGradients[index % cardGradients.length];
          const tiltClass = tilts[index % tilts.length];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onClick={() => openLightbox(index)}
              className={`group relative rounded-[22px] bg-gradient-to-b ${gradient} p-3 sm:p-3.5 border border-[#F472B6]/25 hover:border-[#F5D08A]/70 shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_rgba(244,114,182,0.3)] transition-all duration-400 ease-out cursor-pointer transform ${tiltClass} hover:-translate-y-2 hover:scale-[1.01]`}
            >
              {/* Decorative Washi Tape */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 rounded-sm bg-gradient-to-r from-[#F5D08A]/70 via-[#FFF7FB]/80 to-[#F5D08A]/70 border border-[#F5D08A] shadow-md backdrop-blur-md z-30 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="w-6 h-px bg-[#7A1F4B]/40" />
              </div>

              {/* Cute Scrapbook Sticker Badge */}
              <div
                className={`absolute -top-2 -right-1.5 z-30 px-2.5 py-0.5 rounded-full bg-gradient-to-r ${sticker.bg} text-[#FFF7FB] text-[10px] font-medium tracking-wide shadow-md border border-white/20 flex items-center gap-1 transform rotate-3 group-hover:rotate-0 transition-transform`}
              >
                {sticker.icon}
                <span>{sticker.text}</span>
              </div>

              {/* Photo Viewport Frame */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#0A040E] border border-white/10 shadow-inner flex items-center justify-center">
                {!isFailed ? (
                  <>
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                      onError={() => handleImageError(photo.id)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A040E]/80 via-transparent to-transparent opacity-40 group-hover:opacity-15 transition-opacity duration-300" />
                  </>
                ) : (
                  /* Compact Placeholder */
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-[#260E2E] via-[#16061B] to-[#0D0210] overflow-hidden">
                    <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#7A1F4B] to-[#3B0C23] border border-[#F472B6]/40 flex items-center justify-center mb-2.5 shadow-[0_0_15px_rgba(244,114,182,0.35)] group-hover:scale-105 transition-transform duration-300">
                      <Camera className="w-6 h-6 text-[#F5D08A]" />
                    </div>

                    <span className="relative z-10 text-[10px] font-mono tracking-widest text-[#F5D08A] uppercase mb-1 font-semibold">
                      Photo 0{photo.id}
                    </span>

                    <p className="relative z-10 font-serif text-base text-[#FFF7FB] mb-1 italic">
                      “{photo.title}”
                    </p>

                    <p className="relative z-10 text-[11px] text-[#D8C7D3]/70 font-light mb-2 max-w-[180px] line-clamp-1">
                      {photo.caption}
                    </p>

                    <div className="relative z-10 inline-flex items-center px-2 py-1 rounded bg-[#08020A]/80 border border-[#F472B6]/30 text-[10px] text-[#FBCFE8] font-mono">
                      <span>public{photo.src}</span>
                    </div>
                  </div>
                )}

                {/* Hover Maximize Overlay */}
                <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-[#0F0712]/75 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                  <Maximize2 className="w-3 h-3 text-[#FFF7FB]" />
                </div>
              </div>

              {/* Bottom Note Area */}
              <div className="pt-3 px-1 flex items-end justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#F5D08A] bg-[#7A1F4B]/30 px-1.5 py-0.5 rounded border border-[#F472B6]/20">
                    {photo.date}
                  </span>

                  <h3 className="font-serif text-base sm:text-lg text-[#FFF7FB] font-medium leading-tight truncate mt-1">
                    {photo.title}
                  </h3>

                  <p className="text-[11px] text-[#D8C7D3] font-light mt-0.5 line-clamp-1 leading-snug">
                    {photo.caption}
                  </p>
                </div>

                {/* Heart Reaction Button */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={(e) => toggleLike(e, photo.id)}
                    aria-label={isLiked ? "Unlike photo" : "Like photo"}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-sm ${
                      isLiked
                        ? "bg-gradient-to-br from-[#7A1F4B] to-[#E11D48] border-[#F472B6] text-[#FFF7FB] shadow-[0_0_15px_rgba(244,114,182,0.6)] scale-105"
                        : "bg-[#16081A] border-white/10 text-[#D8C7D3] hover:text-[#F472B6] hover:border-[#F472B6]/50"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isLiked ? "fill-[#FFF7FB] scale-110" : ""
                      }`}
                    />
                  </button>

                  {/* Micro Heart Burst Animation */}
                  {heartBursts
                    .filter((h) => h.id === photo.id)
                    .map((h) => (
                      <motion.div
                        key={h.key}
                        initial={{ opacity: 1, y: 0, scale: 0.8 }}
                        animate={{ opacity: 0, y: -30, scale: 1.3 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="absolute -top-2 left-1.5 pointer-events-none text-[#F472B6] text-xs"
                      >
                        ❤️
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox View"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#08030B]/95 backdrop-blur-2xl p-4 sm:p-6"
            onClick={closeLightbox}
          >
            <div
              className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs font-mono tracking-wider text-[#F5D08A] bg-[#1A0C21]/85 px-3 py-1 rounded-full border border-white/10">
                {selectedPhotoIndex + 1} / {photos.length}
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="w-10 h-10 rounded-full bg-[#1A0C21]/85 border border-white/10 flex items-center justify-center text-[#FFF7FB] hover:text-[#F472B6] hover:border-[#F472B6]/40 transition-colors duration-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1A0C21]/85 border border-white/10 flex items-center justify-center text-[#FFF7FB] hover:text-[#F472B6] hover:border-[#F472B6]/40 transition-colors duration-200 z-50 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              aria-label="Next photo"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1A0C21]/85 border border-white/10 flex items-center justify-center text-[#FFF7FB] hover:text-[#F472B6] hover:border-[#F472B6]/40 transition-colors duration-200 z-50 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            >
              <div className="relative w-full max-h-[65vh] aspect-[4/5] sm:aspect-[16/10] rounded-2xl overflow-hidden glass-card flex items-center justify-center p-2 shadow-2xl">
                {!failedImages[photos[selectedPhotoIndex].id] ? (
                  <Image
                    src={photos[selectedPhotoIndex].src}
                    alt={photos[selectedPhotoIndex].title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 750px"
                    className="object-contain"
                  />
                ) : (
                  <div className="p-6 text-center flex flex-col items-center">
                    <Camera className="w-10 h-10 text-[#F472B6] mb-3 animate-pulse" />
                    <p className="font-serif text-2xl text-[#FFF7FB] mb-1">
                      {photos[selectedPhotoIndex].title}
                    </p>
                    <p className="text-xs text-[#D8C7D3] max-w-sm mb-3 font-light">
                      {photos[selectedPhotoIndex].caption}
                    </p>
                    <code className="text-[11px] bg-[#0F0712] px-3 py-1.5 rounded-lg border border-[#F472B6]/30 text-[#F5D08A] font-mono">
                      {photos[selectedPhotoIndex].src}
                    </code>
                  </div>
                )}
              </div>

              <div className="mt-3 text-center">
                <span className="text-[10px] font-mono text-[#F5D08A] uppercase tracking-wider block mb-0.5">
                  {photos[selectedPhotoIndex].date}
                </span>
                <h3 className="font-serif text-xl text-[#FFF7FB] font-normal mb-0.5">
                  {photos[selectedPhotoIndex].title}
                </h3>
                <p className="text-xs text-[#D8C7D3] font-light max-w-md mx-auto">
                  {photos[selectedPhotoIndex].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
