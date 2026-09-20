"use client";

import { useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Disc } from "lucide-react";
import { loveStory } from "@/data/loveStory";

export default function OurSong() {
  const { ch09 } = loveStory.chapters;
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  // Sync state with global MusicController
  useEffect(() => {
    const handleStatus = (e: Event) => {
      const customEv = e as CustomEvent<{
        isPlaying: boolean;
        progress: number;
        volume: number;
        isMuted: boolean;
      }>;
      if (customEv.detail) {
        setIsPlaying(customEv.detail.isPlaying);
        if (typeof customEv.detail.progress === "number") {
          setProgress(customEv.detail.progress);
        }
        if (typeof customEv.detail.volume === "number") {
          setVolume(customEv.detail.volume);
        }
        if (typeof customEv.detail.isMuted === "boolean") {
          setIsMuted(customEv.detail.isMuted);
        }
      }
    };

    window.addEventListener("birthday-music-status", handleStatus);
    return () => window.removeEventListener("birthday-music-status", handleStatus);
  }, []);

  const togglePlay = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("toggle-birthday-music"));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("seek-birthday-music", { detail: { percent: val } })
      );
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("set-birthday-music-volume", { detail: { volume: val } })
      );
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("set-birthday-music-volume", {
          detail: { volume: nextMuted ? 0 : volume },
        })
      );
    }
  };


  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center">
      {/* Vinyl Record */}
      <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full bg-[#08050A] border-4 border-[#160A13] shadow-[0_0_50px_rgba(214,179,106,0.15)] flex items-center justify-center mb-3 sm:mb-4 overflow-hidden">
        {/* Subtle Vinyl Grooves */}
        <div className="absolute inset-2 rounded-full border border-[#FFF7FA]/5 pointer-events-none" />
        <div className="absolute inset-5 rounded-full border border-[#FFF7FA]/5 pointer-events-none" />
        <div className="absolute inset-8 rounded-full border border-[#FFF7FA]/5 pointer-events-none" />
        <div className="absolute inset-11 rounded-full border border-[#FFF7FA]/5 pointer-events-none" />

        {/* Center Label spinning when playing */}
        <div
          className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#160A13] to-[#0C0710] border-2 border-[#D6B36A] flex flex-col items-center justify-center p-1 sm:p-2 text-center shadow-inner ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "8s" }}
        >
          <Disc className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D6B36A] mb-0.5" />
          <span className="text-[7px] sm:text-[8px] font-sans uppercase tracking-[0.15em] text-[#FFD7E5] truncate max-w-[65px] sm:max-w-[75px] font-medium">
            {ch09.songTitle}
          </span>
        </div>
      </div>

      {/* Track Info */}
      <h3 className="font-heading text-lg sm:text-2xl text-white font-semibold mb-0.5 sm:mb-1">
        {ch09.songTitle}
      </h3>
      <p className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#E6CA7E] mb-1.5 sm:mb-2 font-semibold">
        {ch09.artist}
      </p>
      <p className="font-editorial text-sm sm:text-lg text-[#FFD7E5] italic mb-3 sm:mb-4 max-w-md font-normal px-2">
        &ldquo;{ch09.quote}&rdquo;
      </p>


      {/* Player Controls Container */}
      <div className="w-full bg-[#0C0710] border border-[#D6B36A]/25 rounded-2xl p-3.5 sm:p-5 shadow-[0_15px_45px_rgba(5,3,8,0.85)] flex flex-col gap-3 sm:gap-4">
        {/* Progress Bar */}
        <div className="w-full flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            aria-label="Track progress"
            className="w-full h-1 bg-[#160A13] rounded-lg appearance-none cursor-pointer accent-[#D6B36A]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="text-[#BBAEB6] hover:text-[#FFF7FA] transition-colors cursor-pointer p-1"
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Big Play / Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#160A13] border-2 border-[#D6B36A] flex items-center justify-center text-[#D6B36A] hover:scale-105 hover:shadow-[0_0_25px_rgba(214,179,106,0.3)] transition-all cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Volume Slider */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume level"
              className="w-14 sm:w-20 h-1 bg-[#160A13] rounded-lg appearance-none cursor-pointer accent-[#D6B36A]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
