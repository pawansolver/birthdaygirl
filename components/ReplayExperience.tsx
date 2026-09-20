"use client";

import { motion } from "framer-motion";
import { RotateCcw, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ReplayExperienceProps {
  onReplay: () => void;
}

export default function ReplayExperience({ onReplay }: ReplayExperienceProps) {
  const { language } = useLanguage();

  return (
    <footer className="w-full py-16 px-4 bg-[#050308] border-t border-[#E8B4C8]/10 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center"
      >
        <h3 className="font-heading text-xl sm:text-2xl text-[#FFF7FA] font-light tracking-[0.2em] uppercase mb-6">
          {language === "hi" ? "हमारी कहानी जारी रहेगी..." : "OUR STORY CONTINUES..."}
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Replay Our Story */}
          <button
            onClick={onReplay}
            className="px-8 py-3.5 rounded-full border border-[#D6B36A] bg-[#0C0710] text-[#FFF7FA] hover:text-[#D6B36A] text-xs font-sans uppercase tracking-[0.25em] font-medium transition-all shadow-[0_0_25px_rgba(214,179,106,0.15)] hover:shadow-[0_0_35px_rgba(214,179,106,0.3)] flex items-center gap-2.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D6B36A]" />
            <span>{language === "hi" ? "कहानी फिर से देखें ↻" : "REPLAY OUR STORY"}</span>
          </button>

          {/* Start Again */}
          <button
            onClick={onReplay}
            className="px-8 py-3.5 rounded-full border border-[#E8B4C8]/30 bg-[#160A13] text-[#E8B4C8] hover:text-[#FFF7FA] hover:border-[#E8B4C8] text-xs font-sans uppercase tracking-[0.25em] font-medium transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#E8B4C8]" />
            <span>{language === "hi" ? "शुरू से देखें" : "START AGAIN"}</span>
          </button>
        </div>

        <p className="mt-8 text-[11px] font-sans text-[#BBAEB6]/50 tracking-[0.2em] uppercase">
          {language === "hi" ? "सिर्फ तुम्हारे लिए, प्यार से बनाया गया ❤️" : "Made with love, just for you"}
        </p>
      </motion.div>
    </footer>
  );
}
