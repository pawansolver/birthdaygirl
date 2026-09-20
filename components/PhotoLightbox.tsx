"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import CinematicPhoto from "./CinematicPhoto";

interface PhotoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  caption?: string;
  location?: string;
  desktopObjectPosition?: string;
  mobileObjectPosition?: string;
}

export default function PhotoLightbox({
  isOpen,
  onClose,
  imageSrc,
  caption,
  location,
  desktopObjectPosition = "center center",
  mobileObjectPosition = "center center",
}: PhotoLightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#050308]/92 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0C0710] border border-[#D6B36A]/30 rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-[0_30px_90px_rgba(5,3,8,0.98)] flex flex-col items-center overflow-hidden"
          >
            {/* Close Button - elevated z-50, touch-friendly, high contrast */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close photo preview"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#160A13]/95 border-2 border-[#D6B36A]/60 flex items-center justify-center text-white hover:text-[#D6B36A] hover:border-[#D6B36A] shadow-[0_0_20px_rgba(5,3,8,0.95)] transition-all cursor-pointer touch-manipulation active:scale-95"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Photo Container */}
            <div className="w-full h-[55vh] sm:h-[65vh] md:h-[70vh] rounded-xl overflow-hidden relative border border-[#E8B4C8]/10 mb-4">
              <CinematicPhoto
                src={imageSrc}
                alt={caption || "Memory photo"}
                desktopObjectPosition={desktopObjectPosition}
                mobileObjectPosition={mobileObjectPosition}
                fitMode="contain"
                className="w-full h-full"
              />
            </div>

            {/* Caption & Location */}
            {(caption || location) && (
              <div className="text-center px-4 max-w-xl">
                {caption && (
                  <p className="font-editorial text-lg sm:text-xl text-[#FFF7FA] italic mb-1">
                    &ldquo;{caption}&rdquo;
                  </p>
                )}
                {location && (
                  <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#D6B36A]">
                    {location}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
