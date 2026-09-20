"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface HeartItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

export default function FloatingHearts({ count = 18 }: { count?: number }) {
  const [hearts, setHearts] = useState<HeartItem[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Generate deterministic-looking random hearts once mounted to prevent hydration mismatches
    const generated: HeartItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // 2% to 98% width
      size: Math.random() * 14 + 12, // 12px to 26px
      duration: Math.random() * 10 + 14, // 14s to 24s
      delay: Math.random() * 8, // 0s to 8s
      opacity: Math.random() * 0.18 + 0.08, // 0.08 to 0.26 opacity (very subtle)
      drift: (Math.random() - 0.5) * 60, // gentle horizontal sway
    }));

    setHearts(generated);
  }, [count]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            y: "105vh",
            x: 0,
            opacity: 0,
            scale: 0.6,
          }}
          animate={{
            y: "-10vh",
            x: [0, heart.drift, 0, -heart.drift, 0],
            opacity: [0, heart.opacity, heart.opacity, 0],
            scale: [0.6, 1, 0.9, 1.1],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-full h-full text-[#F472B6] drop-shadow-[0_0_8px_rgba(244,114,182,0.3)]"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
              fillOpacity={0.6}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
