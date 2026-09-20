"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import CinematicPhoto from "./CinematicPhoto";
import { useLanguage } from "@/context/LanguageContext";

interface ConstellationProps {
  onStoryContinue: () => void;
}

export default function Constellation({ onStoryContinue }: ConstellationProps) {
  const [phase, setPhase] = useState<"intro" | "stars" | "revealed">("intro");
  const [introStep, setIntroStep] = useState(1);
  const [isBlooming, setIsBlooming] = useState(false);
  const { story, t } = useLanguage();
  const { constellation } = story;

  useEffect(() => {
    // Intro text sequence
    const t1 = setTimeout(() => setIntroStep(2), 2200);
    const t2 = setTimeout(() => {
      setPhase("stars");
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Heart constellation star coordinates (normalized percentages)
  // Heart curve points forming an elegant constellation:
  // Top center dip: (50, 32)
  // Left lobe top: (35, 20), (22, 28), (18, 42)
  // Left curve bottom: (26, 62), (38, 78)
  // Bottom tip: (50, 88)
  // Right curve bottom: (62, 78), (74, 62)
  // Right lobe top: (82, 42), (78, 28), (65, 20)
  // Center star: (50, 50)
  const stars = [
    { id: 1, x: 50, y: 32 },
    { id: 2, x: 35, y: 20 },
    { id: 3, x: 22, y: 28 },
    { id: 4, x: 18, y: 44 },
    { id: 5, x: 28, y: 64 },
    { id: 6, x: 38, y: 78 },
    { id: 7, x: 50, y: 90 }, // Bottom point
    { id: 8, x: 62, y: 78 },
    { id: 9, x: 72, y: 64 },
    { id: 10, x: 82, y: 44 },
    { id: 11, x: 78, y: 28 },
    { id: 12, x: 65, y: 20 },
  ];

  // SVG heart outline path connecting the stars in sequence: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 1
  const heartPathD = `
    M 50 32
    L 35 20
    L 22 28
    L 18 44
    L 28 64
    L 38 78
    L 50 90
    L 62 78
    L 72 64
    L 82 44
    L 78 28
    L 65 20
    Z
  `;

  const handleStarClick = () => {
    if (phase === "revealed" || isBlooming) return;
    setIsBlooming(true);

    setTimeout(() => {
      setPhase("revealed");
      setIsBlooming(false);
    }, 900);
  };

  return (
    <div className="relative w-full h-[100dvh] min-h-[540px] flex flex-col items-center justify-center overflow-hidden bg-[#050308] select-none">
      {/* Light Bloom effect when center star is clicked */}
      <AnimatePresence>
        {isBlooming && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-radial from-[#FFF7FA] via-[#D6B36A] to-transparent"
          />
        )}
      </AnimatePresence>

      {/* PHASE 1: Sequential Intro Text */}
      {phase === "intro" && (
        <div className="max-w-xl text-center px-4 sm:px-6 z-20">
          <AnimatePresence mode="wait">
            {introStep === 1 && (
              <motion.p
                key="intro-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 1 }}
                className="font-editorial text-xl sm:text-3xl md:text-4xl text-white italic font-normal drop-shadow-md"
              >
                &ldquo;{constellation.introFirst}&rdquo;
              </motion.p>
            )}

            {introStep === 2 && (
              <motion.p
                key="intro-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 1 }}
                className="font-editorial text-xl sm:text-3xl md:text-4xl text-[#FFD7E5] italic font-normal drop-shadow-md"
              >
                &ldquo;{constellation.introSecond}&rdquo;
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* PHASE 2: Interactive Constellation & Hidden Star */}
      {phase === "stars" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative w-full h-full flex flex-col items-center justify-center px-3"
        >
          {/* Constellation Canvas / SVG Area */}
          <div className="relative w-[270px] h-[270px] sm:w-[380px] sm:h-[380px] md:w-[520px] md:h-[520px]">
            {/* SVG Connecting Lines Drawing Themselves */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Heart Outline */}
              <motion.path
                d={heartPathD}
                stroke="rgba(214, 179, 106, 0.45)"
                strokeWidth="0.6"
                strokeDasharray="4 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3.2, ease: "easeInOut" }}
              />

              {/* Connecting lines from center star (50, 50) to cardinal nodes */}
              <motion.line
                x1="50"
                y1="50"
                x2="50"
                y2="32"
                stroke="rgba(232, 180, 200, 0.3)"
                strokeWidth="0.4"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
              <motion.line
                x1="50"
                y1="50"
                x2="50"
                y2="90"
                stroke="rgba(232, 180, 200, 0.3)"
                strokeWidth="0.4"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
            </svg>

            {/* Constellation Star Nodes */}
            {stars.map((star, idx) => (
              <motion.div
                key={star.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
              >
                <div className="w-2 h-2 rounded-full bg-[#D6B36A] shadow-[0_0_12px_rgba(214,179,106,0.9)]" />
              </motion.div>
            ))}

            {/* Center Hidden 7th Star (Interactive) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
              <motion.button
                onClick={handleStarClick}
                animate={{
                  scale: [1, 1.25, 1],
                  boxShadow: [
                    "0 0 20px rgba(214,179,106,0.4)",
                    "0 0 45px rgba(214,179,106,0.8)",
                    "0 0 20px rgba(214,179,106,0.4)",
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#160A13] border-2 border-[#D6B36A] flex items-center justify-center cursor-pointer group"
                aria-label="Tap the star to reveal the hidden photo"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D6B36A] group-hover:scale-125 transition-transform" />
              </motion.button>

              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="mt-2.5 sm:mt-3 text-[9px] sm:text-xs font-sans uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#D6B36A] font-semibold animate-pulse whitespace-nowrap"
              >
                {t("tapTheStar")}
              </motion.span>
            </div>
          </div>

          {/* Subtitle at bottom */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="font-editorial text-sm sm:text-lg md:text-xl text-[#E8B4C8] italic mt-3 sm:mt-4 text-center px-4"
          >
            &ldquo;{constellation.quote}&rdquo;
          </motion.p>
        </motion.div>
      )}

      {/* PHASE 3: Hidden 7th Photo Reveal */}
      {phase === "revealed" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative w-full h-full flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-8 max-w-4xl mx-auto"
        >
          {/* Photo Frame */}
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-[88vw] max-w-[460px] h-[44vh] sm:h-[54vh] md:h-[58vh] max-h-[580px] rounded-2xl overflow-hidden border border-[#D6B36A]/40 shadow-[0_20px_70px_rgba(214,179,106,0.2)] mb-4 sm:mb-6 relative"
          >
            <CinematicPhoto
              src={constellation.hiddenPhoto.image}
              alt="Hidden 7th Memory"
              desktopObjectPosition={constellation.hiddenPhoto.desktopObjectPosition}
              mobileObjectPosition={constellation.hiddenPhoto.mobileObjectPosition}
              fitMode="contain"
              className="w-full h-full"
            />
          </motion.div>

          {/* Emotional Quotes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-center max-w-lg mb-4 sm:mb-8 px-3"
          >
            <p className="font-editorial text-base sm:text-xl md:text-2xl text-white italic mb-1.5 sm:mb-2 font-normal drop-shadow-sm">
              &ldquo;{constellation.hiddenPhoto.quoteFirst}&rdquo;
            </p>
            <p className="font-editorial text-base sm:text-xl md:text-2xl text-[#FFD7E5] italic font-normal drop-shadow-sm">
              &ldquo;{constellation.hiddenPhoto.quoteSecond}&rdquo;
            </p>
          </motion.div>

          {/* Continue to Story Button */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            onClick={onStoryContinue}
            className="group px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-[#D6B36A] bg-[#0C0710]/95 text-white hover:text-[#D6B36A] hover:border-[#D6B36A] transition-all duration-300 shadow-[0_0_25px_rgba(214,179,106,0.2)] hover:shadow-[0_0_40px_rgba(214,179,106,0.4)] flex items-center gap-2.5 sm:gap-3 cursor-pointer font-semibold text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em]"
          >
            <span>{t("ourStoryContinues")}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D6B36A] group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
