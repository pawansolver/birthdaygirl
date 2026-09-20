"use client";

import { motion, AnimatePresence } from "framer-motion";
import CinematicGate from "./CinematicGate";
import HeroPhotoReveal from "./HeroPhotoReveal";
import MemoryUniverse from "./MemoryUniverse";
import Constellation from "./Constellation";

export type HeroStep = 0 | 1 | 2 | 3;

interface HeroExperienceProps {
  currentStep: HeroStep;
  setStep: (step: HeroStep) => void;
  onStoryTransition: () => void;
}

export default function HeroExperience({
  currentStep,
  setStep,
  onStoryTransition,
}: HeroExperienceProps) {


  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050308]">
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <CinematicGate onOpenGate={() => setStep(1)} />
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <HeroPhotoReveal onContinue={() => setStep(2)} />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <MemoryUniverse onContinue={() => setStep(3)} />
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <Constellation onStoryContinue={onStoryTransition} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
