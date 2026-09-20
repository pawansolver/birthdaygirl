"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import CinematicPhoto from "./CinematicPhoto";
import { useLanguage } from "@/context/LanguageContext";

export default function BirthdayFinale() {
  const { story } = useLanguage();
  const { ch12 } = story.chapters;
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequential climax reveals
    const t1 = setTimeout(() => setStep(1), 800); // warm light + final image slow appearance
    const t2 = setTimeout(() => setStep(2), 2600); // "After everything I've written... there is still one thing I can't explain."
    const t3 = setTimeout(() => setStep(3), 4800); // "How did I get so lucky to have you in my story?"
    const t4 = setTimeout(() => {
      setStep(4); // Giant HAPPY BIRTHDAY, MY LOVE.
      triggerChampagneSparkles();
    }, 7200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const triggerChampagneSparkles = () => {
    // Tasteful champagne and soft rose particles
    const count = 75;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#D6B36A", "#E8B4C8", "#FFF7FA"],
      disableForReducedMotion: true,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 45,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 35,
    });
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center overflow-hidden bg-[#050308]">
      {/* Tiny warm light blooming in the dark */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 0.45, scale: 1.5 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0 bg-radial from-[#D6B36A]/35 via-[#160A13]/40 to-transparent blur-3xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center px-2 sm:px-4">
        {/* Her Final Image slowly appearing */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: step >= 1 ? 1 : 0,
            scale: 1,
          }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="w-[88vw] max-w-[360px] h-[36vh] sm:h-[44vh] md:h-[48vh] max-h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D6B36A]/40 shadow-[0_30px_90px_rgba(214,179,106,0.25)] mb-4 sm:mb-6 relative animate-wedding-halo"
        >
          <CinematicPhoto
            src={ch12.image}
            alt="Final Birthday Photo"
            desktopObjectPosition={ch12.desktopObjectPosition}
            mobileObjectPosition={ch12.mobileObjectPosition}
            fitMode="contain"
            className="w-full h-full"
          />
        </motion.div>

        {/* Prelude text: "After everything I've written..." */}
        <AnimatePresence>
          {step === 2 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 1 }}
              className="font-editorial text-lg sm:text-2xl text-white italic mb-2.5 sm:mb-3 font-normal px-2"
            >
              &ldquo;{ch12.prelude}&rdquo;
            </motion.p>
          )}

          {/* Question: "How did I get so lucky to have you in my story?" */}
          {step >= 3 && step < 4 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 1 }}
              className="font-editorial text-lg sm:text-2xl md:text-3xl text-[#FFD7E5] italic mb-3 sm:mb-4 font-normal px-2"
            >
              &ldquo;{ch12.question}&rdquo;
            </motion.p>
          )}

          {/* Climax: HAPPY BIRTHDAY, ANNI. */}
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center px-2"
            >
              <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-[0.05em] sm:tracking-[0.08em] uppercase leading-tight mb-2 sm:mb-3 drop-shadow-[0_10px_35px_rgba(214,179,106,0.35)]">
                {ch12.heading}
              </h1>

              <p className="font-editorial text-base sm:text-xl md:text-2xl text-[#FFD7E5] italic mb-3 sm:mb-4 max-w-lg font-normal px-2">
                &ldquo;{ch12.subheading}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl text-[#FFD7E5] animate-pulse">❤️</span>
              </div>

              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#E6CA7E] font-semibold">
                {ch12.footerNote}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
