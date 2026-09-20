"use client";

import { motion } from "framer-motion";
import CinematicPhoto from "./CinematicPhoto";
import { StoryMemory } from "@/data/loveStory";
import { useLanguage } from "@/context/LanguageContext";

interface MemoryBubbleProps {
  memory: StoryMemory;
  index: number;
  onClick: () => void;
  positionClass: string;
}

const memoryLabelsEn: Record<number, string> = {
  1: "First Smile",
  2: "Your Laughter",
  3: "Quiet Moments",
  4: "Holding Hands",
  5: "Beautiful Soul",
  6: "Forever Us",
};

const memoryLabelsHi: Record<number, string> = {
  1: "पहली मुस्कान",
  2: "तुम्हारी हंसी",
  3: "सुकून भरे पल",
  4: "हाथों में हाथ",
  5: "मासूम दिल",
  6: "हमेशा साथ",
};

export default function MemoryBubble({
  memory,
  index,
  onClick,
  positionClass,
}: MemoryBubbleProps) {
  const { language } = useLanguage();
  const labels = language === "hi" ? memoryLabelsHi : memoryLabelsEn;
  const label = labels[memory.id] || memory.title;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3 + index * 0.15,
      }}
      className={`absolute ${positionClass} z-20`}
    >
      <button
        onClick={onClick}
        className="group relative flex flex-col items-center focus:outline-none cursor-pointer"
      >
        {/* Glowing circular container */}
        <div
          style={{ animationDelay: `${index * 0.7}s` }}
          className="relative w-14 h-14 sm:w-22 sm:h-22 md:w-28 md:h-28 rounded-full p-[2px] bg-gradient-to-tr from-[#D6B36A]/50 via-[#E8B4C8]/60 to-[#D6B36A]/50 shadow-[0_0_20px_rgba(232,180,200,0.3)] group-hover:shadow-[0_0_40px_rgba(214,179,106,0.5)] group-hover:scale-108 transition-all duration-500 ease-out overflow-hidden animate-bubble-float"
        >
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <CinematicPhoto
              src={memory.image}
              alt={memory.title}
              desktopObjectPosition={memory.desktopObjectPosition}
              mobileObjectPosition={memory.mobileObjectPosition}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Floating Title Label */}
        <div className="mt-1 sm:mt-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#0C0710]/95 border border-[#D6B36A]/40 backdrop-blur-md shadow-md group-hover:border-[#D6B36A] transition-all duration-300 max-w-[88px] sm:max-w-none">
          <span className="text-[9px] sm:text-xs font-sans tracking-[0.05em] sm:tracking-[0.15em] text-white font-semibold whitespace-nowrap truncate block">
            {`0${memory.id} • ${label}`}
          </span>
        </div>
      </button>
    </motion.div>
  );
}

