"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface CinematicPhotoProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  desktopObjectPosition?: string;
  mobileObjectPosition?: string;
  aspectRatio?: string;
  showOverlay?: boolean;
  fitMode?: "contain" | "cover";
  onImageClick?: () => void;
}

export default function CinematicPhoto({
  src,
  alt,
  priority = false,
  className = "",
  desktopObjectPosition = "center center",
  mobileObjectPosition = "center center",
  showOverlay = true,
  fitMode = "contain",
  onImageClick,
}: CinematicPhotoProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div
      onClick={onImageClick}
      className={`relative overflow-hidden group select-none ${
        onImageClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {!hasError ? (
        <>
          {/* Ambient blurred backdrop when fitMode is contain to fill letterbox seamlessly */}
          {fitMode === "contain" && (
            <div
              className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${
                isLoaded ? "opacity-35" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="50vw"
                className="object-cover blur-2xl scale-110 pointer-events-none"
                style={{ objectPosition: desktopObjectPosition }}
                aria-hidden="true"
              />
            </div>
          )}

          <div
            className={`w-full h-full relative transition-all duration-1000 ease-out ${
              isLoaded ? "opacity-100 blur-0 scale-100 animate-wedding-zoom" : "opacity-0 blur-lg scale-105"
            }`}
          >
            {/* Desktop Image with desktopObjectPosition */}
            <div className="hidden md:block w-full h-full relative">
              <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 65vw"
                className={`${
                  fitMode === "contain" ? "object-contain" : "object-cover"
                } transition-transform duration-1000 group-hover:scale-[1.03]`}
                style={{ objectPosition: desktopObjectPosition }}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
              />
            </div>

            {/* Mobile Image with mobileObjectPosition */}
            <div className="block md:hidden w-full h-full relative">
              <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes="(max-width: 768px) 90vw, 50vw"
                className={`${
                  fitMode === "contain" ? "object-contain" : "object-cover"
                } transition-transform duration-1000 group-hover:scale-[1.03]`}
                style={{ objectPosition: mobileObjectPosition }}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
              />
            </div>
          </div>

          {/* Wedding Film Anamorphic Golden Light Sweep */}
          {isLoaded && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              <div className="w-[200%] h-full absolute -top-1/2 -left-full bg-gradient-to-r from-transparent via-[#D6B36A]/20 to-transparent rotate-12 animate-wedding-sweep" />
            </div>
          )}

          {/* Wedding Film Corner Sparkles */}
          {isLoaded && (
            <>
              <div className="absolute top-3 right-3 pointer-events-none z-10 animate-sparkle-twinkle opacity-70">
                <Sparkles className="w-3.5 h-3.5 text-[#D6B36A] drop-shadow-[0_0_8px_rgba(214,179,106,0.8)]" />
              </div>
              <div className="absolute bottom-3 left-3 pointer-events-none z-10 animate-sparkle-twinkle opacity-50 [animation-delay:1.5s]">
                <Sparkles className="w-3 h-3 text-[#E8B4C8] drop-shadow-[0_0_6px_rgba(232,180,200,0.8)]" />
              </div>
            </>
          )}

          {/* Loading Skeleton */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#0C0710] flex flex-col items-center justify-center p-6 text-center animate-pulse">
              <div className="w-10 h-10 rounded-full border border-[#D6B36A]/30 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-[#D6B36A] animate-spin" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#BBAEB6]">
                MEMORY LOADING...
              </p>
            </div>
          )}

          {/* Subtle cinematic gradient overlay (only applied if showOverlay and not overriding contain view) */}
          {showOverlay && fitMode === "cover" && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#050308]/70 via-transparent to-transparent pointer-events-none" />
          )}
        </>
      ) : (
        /* Graceful Missing Image / Placeholder */
        <div className="w-full h-full min-h-[260px] bg-[#0C0710] border border-[#E8B4C8]/10 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#160A13] border border-[#D6B36A]/30 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(214,179,106,0.15)]">
            <Sparkles className="w-5 h-5 text-[#D6B36A]" />
          </div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#E8B4C8] font-medium mb-1">
            MEMORY LOADING...
          </p>
          <p className="text-[11px] text-[#BBAEB6]/70 italic font-editorial">
            &ldquo;A precious moment preserved in time&rdquo;
          </p>
          {isDev && (
            <span className="mt-3 text-[10px] text-[#D6B36A]/80 font-mono bg-[#160A13] px-2 py-1 rounded border border-[#D6B36A]/20">
              Missing asset: {src}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
