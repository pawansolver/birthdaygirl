"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeartbeatCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check if device is touch or has reduced motion preference
    if (typeof window === "undefined") return;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileViewport = window.innerWidth < 768;

    if (isTouch || prefersReducedMotion || isMobileViewport) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("[role='button']") ||
        target?.closest(".cursor-pointer") ||
        target?.closest("input")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Trailing Soft Glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: isHovered ? 40 : 24,
          height: isHovered ? 40 : 24,
          backgroundColor: isHovered ? "rgba(232, 180, 200, 0.25)" : "rgba(214, 179, 106, 0.18)",
          filter: "blur(8px)",
        }}
        animate={{
          x: position.x - (isHovered ? 20 : 12),
          y: position.y - (isHovered ? 20 : 12),
        }}
        transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.2 }}
      />

      {/* Main Cursor: Dot or Tiny Heart */}
      <motion.div
        className="absolute flex items-center justify-center"
        animate={{
          x: position.x - (isHovered ? 10 : 4),
          y: position.y - (isHovered ? 10 : 4),
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 450, mass: 0.1 }}
      >
        {isHovered ? (
          <span className="text-xs text-[#E8B4C8] drop-shadow-[0_0_8px_rgba(232,180,200,0.8)] animate-pulse select-none">
            ♥
          </span>
        ) : (
          <div className="w-2 h-2 rounded-full bg-[#D6B36A] shadow-[0_0_8px_rgba(214,179,106,0.9)]" />
        )}
      </motion.div>
    </div>
  );
}
