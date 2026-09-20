"use client";

interface AmbientGlowProps {
  variant?: "hero" | "subtle" | "universe" | "finale";
}

export default function AmbientGlow({ variant = "subtle" }: AmbientGlowProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top subtle wine glow */}
      <div
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[90vw] md:w-[700px] h-[350px] md:h-[500px] rounded-full blur-2xl md:blur-[140px] opacity-40 transform translate-z-0"
        style={{
          background:
            variant === "finale"
              ? "radial-gradient(circle, rgba(214, 179, 106, 0.45) 0%, rgba(22, 10, 19, 0.2) 70%)"
              : "radial-gradient(circle, rgba(22, 10, 19, 0.8) 0%, rgba(5, 3, 8, 0) 70%)",
        }}
      />

      {/* Center soft rose glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[600px] h-[350px] md:h-[600px] rounded-full blur-2xl md:blur-[160px] opacity-25 transform translate-z-0"
        style={{
          background:
            variant === "universe"
              ? "radial-gradient(circle, rgba(232, 180, 200, 0.35) 0%, rgba(12, 7, 16, 0) 70%)"
              : "radial-gradient(circle, rgba(232, 180, 200, 0.25) 0%, rgba(22, 10, 19, 0) 70%)",
        }}
      />

      {/* Bottom champagne warm accent */}
      <div
        className="absolute -bottom-[20%] right-[5%] md:right-[10%] w-[80vw] md:w-[550px] h-[300px] md:h-[450px] rounded-full blur-2xl md:blur-[150px] opacity-20 transform translate-z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(214, 179, 106, 0.3) 0%, rgba(5, 3, 8, 0) 70%)",
        }}
      />
    </div>
  );
}
