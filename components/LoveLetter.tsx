"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen } from "lucide-react";
import { loveStory } from "@/data/loveStory";

interface LoveLetterProps {
  variant: "envelope" | "full"; // envelope = Chapter 05, full = Chapter 10
}

export default function LoveLetter({ variant }: LoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { ch05, ch10 } = loveStory.chapters;


  if (variant === "envelope") {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center px-1">
        {/* Intro text */}
        <div className="mb-2.5 sm:mb-3">
          {ch05.envelopeText.map((line, idx) => (
            <p
              key={idx}
              className="font-editorial text-base sm:text-xl text-[#FFD7E5] italic mb-0.5 sm:mb-1 font-normal"
            >
              &ldquo;{line}&rdquo;
            </p>
          ))}
        </div>

        {/* Envelope Container */}
        <div className="relative w-full max-w-md my-1">
          <motion.div
            initial={false}
            animate={{ scale: isOpen ? 1.02 : 1 }}
            className="w-full bg-[#0C0710] border border-[#D6B36A]/40 rounded-2xl p-4 sm:p-6 shadow-[0_20px_60px_rgba(5,3,8,0.9)] flex flex-col items-center"
          >
            {/* Envelope Icon / Seal */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#160A13] border border-[#D6B36A]/50 flex items-center justify-center mb-2.5 sm:mb-3 shadow-[0_0_20px_rgba(214,179,106,0.2)]">
              {isOpen ? (
                <MailOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#D6B36A]" />
              ) : (
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#D6B36A]" />
              )}
            </div>

            {!isOpen ? (
              <button
                onClick={() => setIsOpen(true)}
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-[#D6B36A] bg-[#160A13] text-white hover:text-[#D6B36A] text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold transition-all shadow-[0_0_25px_rgba(214,179,106,0.2)] hover:shadow-[0_0_35px_rgba(214,179,106,0.4)] cursor-pointer"
              >
                OPEN THE LETTER
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 1 }}
                className="w-full text-left space-y-2 sm:space-y-2.5 pt-1"
              >
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D6B36A]/40 to-transparent mb-2.5 sm:mb-3" />
                {ch05.letterLines.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.3, duration: 0.8 }}
                    className="font-editorial text-sm sm:text-lg text-white italic leading-relaxed font-normal"
                  >
                    {line}
                  </motion.p>
                ))}
                <div className="pt-2 sm:pt-3 text-right">
                  <span className="font-editorial text-xs sm:text-base text-[#E6CA7E] italic font-semibold">
                    — Always yours ❤️
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // Chapter 10: Full emotional peak letter
  return (
    <div className="w-full max-w-2xl mx-auto px-1 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative bg-[#0C0710]/95 border border-[#D6B36A]/35 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 shadow-[0_30px_90px_rgba(5,3,8,0.95)]"
      >
        {/* Subtle decorative watermark */}
        <div className="absolute top-3 right-4 sm:top-4 sm:right-6 text-[#D6B36A]/10 font-heading text-4xl sm:text-6xl select-none pointer-events-none">
          ♥
        </div>

        <div className="space-y-2 sm:space-y-3">
          {ch10.paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.12, duration: 0.8 }}
              className={`leading-relaxed ${
                idx === 0
                  ? "font-heading text-lg sm:text-2xl text-[#E6CA7E] font-semibold mb-1"
                  : idx === ch10.paragraphs.length - 1
                  ? "font-editorial text-sm sm:text-lg text-[#FFD7E5] italic pt-1 font-medium"
                  : "font-body text-white font-normal text-xs sm:text-base"
              }`}
            >
              {para}
            </motion.p>
          ))}

          {/* Emotional signoff */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="pt-2.5 sm:pt-3 border-t border-[#D6B36A]/30"
          >
            <p className="font-editorial text-sm sm:text-lg text-[#E6CA7E] italic font-semibold">
              {ch10.signoff}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

