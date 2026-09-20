"use client";

interface ProgressIndicatorProps {
  currentChapter: number;
  totalChapters?: number;
  onSelectChapter?: (chapter: number) => void;
}

export default function ProgressIndicator({
  currentChapter,
  totalChapters = 12,
  onSelectChapter,
}: ProgressIndicatorProps) {
  const formattedCurrent = currentChapter < 10 ? `0${currentChapter}` : `${currentChapter}`;
  const formattedTotal = totalChapters < 10 ? `0${totalChapters}` : `${totalChapters}`;

  return (
    <div className="fixed top-6 right-6 md:top-8 md:right-8 z-40 flex items-center gap-3 select-none pointer-events-auto">
      {/* Chapter Counter 01 / 12 */}
      <div className="px-3 py-1.5 rounded-full bg-[#0C0710]/80 border border-[#D6B36A]/25 backdrop-blur-md shadow-[0_4px_20px_rgba(5,3,8,0.7)] flex items-center gap-1.5 text-xs font-sans tracking-[0.2em]">
        <span className="text-[#D6B36A] font-medium">{formattedCurrent}</span>
        <span className="text-[#BBAEB6]/40">/</span>
        <span className="text-[#BBAEB6]/70">{formattedTotal}</span>
      </div>

      {/* Tiny subtle vertical dot track on larger screens */}
      <div className="hidden lg:flex flex-col gap-1.5 py-2 px-1">
        {Array.from({ length: totalChapters }, (_, i) => i + 1).map((ch) => (
          <button
            key={ch}
            onClick={() => onSelectChapter?.(ch)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentChapter === ch
                ? "bg-[#D6B36A] scale-150 shadow-[0_0_8px_rgba(214,179,106,0.9)]"
                : "bg-[#E8B4C8]/25 hover:bg-[#E8B4C8]/60"
            }`}
            aria-label={`Jump to chapter ${ch}`}
          />
        ))}
      </div>
    </div>
  );
}
