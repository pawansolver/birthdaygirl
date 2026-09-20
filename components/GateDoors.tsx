"use client";

import { motion } from "framer-motion";

interface GateDoorsProps {
  isOpen: boolean;
}

export default function GateDoors({ isOpen }: GateDoorsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Warm Golden Backlight behind the doors as they open */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isOpen ? 0.75 : 0,
          scale: isOpen ? 1.2 : 0.8,
        }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-radial from-[#D6B36A]/20 via-[#160A13]/40 to-transparent blur-2xl"
      />

      {/* Left Door */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isOpen ? "-102%" : "0%" }}
        transition={{
          duration: 1.6,
          ease: [0.77, 0, 0.175, 1],
        }}
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#0C0710] border-r border-[#D6B36A]/25 flex items-center justify-end pr-8 md:pr-16 shadow-[20px_0_50px_rgba(5,3,8,0.9)]"
      >
        {/* Subtle architectural vertical pane styling */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#FFF7FA_1px,transparent_1px)] bg-[size:48px_100%]" />
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#D6B36A]/40 to-transparent" />
        <div className="hidden md:flex flex-col items-end opacity-25 pr-6 select-none font-heading tracking-[0.3em] text-[#E8B4C8] text-xs uppercase">
          <span>CHAPTER</span>
          <span className="text-sm font-semibold text-[#D6B36A]">PROLOGUE</span>
        </div>
      </motion.div>

      {/* Right Door */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isOpen ? "102%" : "0%" }}
        transition={{
          duration: 1.6,
          ease: [0.77, 0, 0.175, 1],
        }}
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#0C0710] border-l border-[#D6B36A]/25 flex items-center justify-start pl-8 md:pl-16 shadow-[-20px_0_50px_rgba(5,3,8,0.9)]"
      >
        {/* Subtle architectural vertical pane styling */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#FFF7FA_1px,transparent_1px)] bg-[size:48px_100%]" />
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#D6B36A]/40 to-transparent" />
        <div className="hidden md:flex flex-col items-start opacity-25 pl-6 select-none font-heading tracking-[0.3em] text-[#E8B4C8] text-xs uppercase">
          <span>DESTINY</span>
          <span className="text-sm font-semibold text-[#D6B36A]">ETERNAL</span>
        </div>
      </motion.div>
    </div>
  );
}
