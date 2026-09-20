"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50 flex items-center select-none pointer-events-auto">
      <div className="flex items-center gap-1 p-1 rounded-full bg-[#0C0710]/90 border border-[#D6B36A]/40 backdrop-blur-md shadow-[0_4px_25px_rgba(5,3,8,0.9)] hover:border-[#D6B36A]/70 transition-all duration-300">
        <div className="pl-2 pr-1 flex items-center text-[#D6B36A]">
          <Languages className="w-3.5 h-3.5" />
        </div>

        {/* English Button */}
        <button
          onClick={() => setLanguage("en")}
          className={`px-2.5 py-1 rounded-full text-[11px] font-sans tracking-[0.1em] font-medium transition-all duration-300 cursor-pointer touch-manipulation ${
            language === "en"
              ? "bg-gradient-to-r from-[#D6B36A] to-[#E6CA7E] text-[#050308] font-bold shadow-[0_0_12px_rgba(214,179,106,0.5)]"
              : "text-[#BBAEB6] hover:text-[#FFF7FA]"
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>

        {/* Hindi Button */}
        <button
          onClick={() => setLanguage("hi")}
          className={`px-2.5 py-1 rounded-full text-[11px] font-sans tracking-[0.05em] font-medium transition-all duration-300 cursor-pointer touch-manipulation ${
            language === "hi"
              ? "bg-gradient-to-r from-[#D6B36A] to-[#E6CA7E] text-[#050308] font-bold shadow-[0_0_12px_rgba(214,179,106,0.5)]"
              : "text-[#BBAEB6] hover:text-[#FFF7FA]"
          }`}
          aria-label="Switch to Hindi"
        >
          हिं
        </button>
      </div>
    </div>
  );
}
