"use client";

import React from "react";
import confetti from "canvas-confetti";

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
}

export const triggerRomanticConfetti = (options?: ConfettiOptions) => {
  const count = options?.particleCount || 80;
  const defaults = {
    origin: options?.origin || { y: 0.7 },
    colors: ["#F472B6", "#7A1F4B", "#F5D08A", "#FFF7FB", "#FBCFE8", "#E11D48"],
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Realistic celebratory multi-stage burst
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
    startVelocity: 45,
  });
};

interface ConfettiButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function ConfettiButton({
  children,
  className = "",
  onClick,
  ariaLabel = "Celebrate with confetti",
}: ConfettiButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    triggerRomanticConfetti({
      particleCount: 90,
      origin: { x, y },
    });

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F472B6]/50 active:scale-95 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
