"use client";

interface ChapterNavigationProps {
  currentChapter: number;
  totalChapters?: number;
  onNavigate: (chapterNumber: number) => void;
}

export default function ChapterNavigation({
  currentChapter,
  totalChapters = 12,
  onNavigate,
}: ChapterNavigationProps) {
  return (
    <nav
      aria-label="Story chapter navigation"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 pointer-events-auto select-none"
    >
      {Array.from({ length: totalChapters }, (_, i) => i + 1).map((ch) => {
        const isActive = currentChapter === ch;
        const formatted = ch < 10 ? `0${ch}` : `${ch}`;

        return (
          <button
            key={ch}
            onClick={() => onNavigate(ch)}
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            aria-label={`Go to chapter ${formatted}`}
          >
            <span
              className={`text-[10px] font-sans tracking-[0.2em] transition-all duration-300 ${
                isActive
                  ? "text-[#D6B36A] font-medium scale-110"
                  : "text-[#BBAEB6]/40 group-hover:text-[#FFF7FA]"
              }`}
            >
              {formatted}
            </span>
            <div
              className={`h-[1px] transition-all duration-300 ${
                isActive
                  ? "w-8 bg-[#D6B36A]"
                  : "w-3 bg-[#E8B4C8]/20 group-hover:w-5 group-hover:bg-[#E8B4C8]/60"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
