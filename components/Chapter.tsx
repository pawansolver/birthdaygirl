"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface ChapterProps {
  id?: string;
  chapterNumber?: string;
  number?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  nextChapterId?: string;
  nextLabel?: string;
  showNextIndicator?: boolean;
  onNext?: () => void;
}

export default function Chapter({
  id,
  chapterNumber,
  number,
  title,
  subtitle,
  children,
  className = "",
  nextChapterId,
  nextLabel,
  showNextIndicator = true,
  onNext,
}: ChapterProps) {
  const { language, t } = useLanguage();
  const displayNum = chapterNumber || number || "01";
  const sectionId = id || `chapter-${displayNum}`;

  const currentNum = parseInt(displayNum, 10);
  const autoNextId =
    nextChapterId ||
    (!isNaN(currentNum) && currentNum < 12
      ? `chapter-${currentNum + 1 < 10 ? `0${currentNum + 1}` : currentNum + 1}`
      : undefined);

  const handleScrollNext = () => {
    if (onNext) {
      onNext();
    } else if (autoNextId) {
      const el = document.getElementById(autoNextId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id={sectionId}
      className={`relative w-full min-h-[100dvh] py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center border-b border-[#E8B4C8]/10 ${className}`}
    >
      {/* Chapter Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto mb-4 md:mb-6 shrink-0"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0C0710]/90 border border-[#D6B36A]/40 mb-2 shadow-sm">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#E6CA7E] font-semibold">
            {language === "hi" ? `अध्याय ${displayNum}` : `CHAPTER ${displayNum}`}
          </span>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-[0.08em] uppercase mb-1.5 drop-shadow-sm">
          {title}
        </h2>

        {subtitle && (
          <p className="font-editorial text-base sm:text-lg text-[#FFD7E5] italic font-normal max-w-lg mx-auto">
            &ldquo;{subtitle}&rdquo;
          </p>
        )}
      </motion.div>

      {/* Chapter Content Body */}
      {children && (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center flex-1">
          {children}
        </div>
      )}

      {/* Scroll Down / Next Chapter Indicator */}
      {showNextIndicator && autoNextId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 sm:mt-8 pb-2 flex flex-col items-center pointer-events-auto"
        >
          <button
            onClick={handleScrollNext}
            className="group flex flex-col items-center gap-1.5 text-white/90 hover:text-[#D6B36A] transition-colors duration-300 cursor-pointer touch-manipulation active:scale-95"
            aria-label={`Go to next chapter`}
          >
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#E6CA7E] font-semibold group-hover:text-[#D6B36A] transition-colors">
              {nextLabel || t("scrollDown")}
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D6B36A]/50 bg-[#0C0710]/90 flex items-center justify-center group-hover:border-[#D6B36A] group-hover:shadow-[0_0_15px_rgba(214,179,106,0.4)] transition-all">
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D6B36A] animate-bounce" />
            </div>
          </button>
        </motion.div>
      )}
    </section>
  );
}

