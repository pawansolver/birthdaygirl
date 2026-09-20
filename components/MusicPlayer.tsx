"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Music, AlertCircle, Disc3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthday";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicSrc = birthdayConfig.music || "/music/birthday-song.mp3";

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setErrorMessage(null);
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Audio play failed or file missing:", err);
        setIsPlaying(false);
        setErrorMessage("Add song to /public/music/birthday-song.mp3");
        setTimeout(() => setErrorMessage(null), 5000);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 select-none">
      {/* Informative error/hint tooltip if file is missing */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A0C21] border border-[#F472B6]/40 text-xs text-[#FBCFE8] shadow-2xl backdrop-blur-xl max-w-xs"
          >
            <AlertCircle className="w-4 h-4 text-[#F5D08A] shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Floating Sound Capsule */}
      <motion.button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play our song"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-[#1E0E25]/90 via-[#2B102F]/90 to-[#1E0E25]/90 border-2 border-[#F5D08A]/40 hover:border-[#F5D08A] backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] text-[#FFF7FB] transition-all duration-300 cursor-pointer"
      >
        {/* Animated Vinyl Disc / Equalizer */}
        <div className="relative w-7 h-7 rounded-full bg-[#7A1F4B]/60 flex items-center justify-center border border-[#F472B6]/40 shrink-0">
          <Disc3
            className={`w-5 h-5 text-[#F5D08A] ${
              isPlaying ? "animate-spin" : ""
            }`}
          />
        </div>

        {/* Text & Equalizer Bars */}
        <div className="flex flex-col items-start text-left pr-1">
          <span className="text-xs sm:text-sm font-medium tracking-wide flex items-center gap-1.5">
            <span>{isPlaying ? "Our Song Playing" : "Play Our Song"}</span>
            <span className="text-[#F472B6]">🎵</span>
          </span>
          <span className="text-[10px] font-mono text-[#F5D08A] tracking-wider uppercase">
            {birthdayConfig.songTitle || "Birthday Soundtrack"}
          </span>
        </div>

        {/* Play/Pause Button Pill */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7A1F4B] to-[#9E205D] border border-[#F472B6]/50 flex items-center justify-center text-[#FFF7FB] group-hover:scale-105 transition-transform shadow-sm">
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5 text-[#F5D08A]" />}
        </div>
      </motion.button>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={musicSrc}
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />
    </div>
  );
}
