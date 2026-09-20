"use client";

import { useEffect, useState } from "react";

interface FloatingParticlesProps {
  count?: number;
  slowDown?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export default function FloatingParticles({
  count = 35,
  slowDown = false,
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Reduce particle count on mobile devices for smooth 60fps rendering
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const actualCount = isMobile ? Math.min(count, 16) : count;

    // Generate particles once on mount
    const newParticles: Particle[] = Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.5 + 0.15,
      duration: (Math.random() * 10 + 12) * (slowDown ? 1.8 : 1),
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [count, slowDown]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#E8B4C8]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px rgba(232, 180, 200, 0.4)`,
            willChange: "transform",
            animation: `floatParticle ${p.duration}s infinite ease-in-out ${p.delay}s alternate`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translate3d(0px, 0px, 0);
          }
          50% {
            transform: translate3d(12px, -24px, 0);
          }
          100% {
            transform: translate3d(-14px, 18px, 0);
          }
        }
      `}</style>
    </div>
  );
}
