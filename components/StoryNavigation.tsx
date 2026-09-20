"use client";

import React from "react";
import { birthdayData } from "@/data/birthday";

interface StoryNavigationProps {
  isVisible: boolean;
}

export default function StoryNavigation({ isVisible }: StoryNavigationProps) {
  const { girlName } = birthdayData;

  if (!isVisible) return null;

  return (
    <header
      aria-label="Story Navigation"
      className="fixed top-0 inset-x-0 z-30 px-6 sm:px-10 py-4 flex items-center justify-between pointer-events-none select-none"
    >
      <div className="pointer-events-auto flex items-center gap-2.5">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#FFF4F7]/80">
          The Story Of Us
        </span>
        <span className="text-xs font-serif text-[#E879A8] italic">
          · {girlName}
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-2 pointer-events-auto px-3 py-1 rounded-full bg-[#120914]/70 border border-white/10 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8C982] animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#C9B8C1]">
          Our Love Story
        </span>
      </div>
    </header>
  );
}
