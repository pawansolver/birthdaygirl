"use client";

import { useEffect, useState } from "react";
import HeroExperience, { HeroStep } from "./HeroExperience";
import StoryExperience from "./StoryExperience";
import FloatingParticles from "./FloatingParticles";
import AmbientGlow from "./AmbientGlow";
import HeartbeatCursor from "./HeartbeatCursor";
import MusicController from "./MusicController";

export type ExperienceStage =
  | "gate"
  | "hero"
  | "memories"
  | "constellation"
  | "story";


export default function ExperienceController() {
  const [stage, setStage] = useState<ExperienceStage>("gate");
  const [heroStep, setHeroStep] = useState<HeroStep>(0);

  // Sync stage with heroStep
  const handleSetHeroStep = (step: HeroStep) => {
    setHeroStep(step);
    if (step === 0) setStage("gate");
    else if (step === 1) setStage("hero");
    else if (step === 2) setStage("memories");
    else if (step === 3) setStage("constellation");
  };

  const handleStoryTransition = () => {
    setStage("story");
  };

  const handleReplay = () => {
    // Reset back to gate without reloading
    setStage("gate");
    setHeroStep(0);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // 20. SCROLL LOCK: Lock scrolling during opening sequence (stages gate, hero, memories, constellation)
  useEffect(() => {
    if (stage !== "story") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [stage]);

  return (
    <main className="relative w-full min-h-screen bg-[#050308] text-[#FFF7FA] overflow-x-hidden selection:bg-[#160A13] selection:text-[#E8B4C8]">
      {/* Ambient Lighting & Dust Particles */}
      <AmbientGlow
        variant={
          stage === "gate" || stage === "hero"
            ? "hero"
            : stage === "memories" || stage === "constellation"
            ? "universe"
            : "subtle"
        }
      />
      <FloatingParticles slowDown={stage === "hero"} />

      {/* Desktop Heartbeat Custom Cursor */}
      <HeartbeatCursor />

      {/* Opening Hero Experience vs Story Experience */}
      {stage !== "story" ? (
        <HeroExperience
          currentStep={heroStep}
          setStep={handleSetHeroStep}
          onStoryTransition={handleStoryTransition}
        />
      ) : (
        <StoryExperience onReplay={handleReplay} />
      )}

      {/* Global Background Romantic Music Controller */}
      <MusicController />
    </main>
  );
}




