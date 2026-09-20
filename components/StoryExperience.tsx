"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Eye, Heart, Compass } from "lucide-react";
import Chapter from "./Chapter";
import CinematicPhoto from "./CinematicPhoto";
import PhotoLightbox from "./PhotoLightbox";
import LoveLetter from "./LoveLetter";
import OurSong from "./OurSong";
import SecretReveal from "./SecretReveal";
import BirthdayFinale from "./BirthdayFinale";
import ReplayExperience from "./ReplayExperience";
import ProgressIndicator from "./ProgressIndicator";
import ChapterNavigation from "./ChapterNavigation";
import { useLanguage } from "@/context/LanguageContext";

interface StoryExperienceProps {
  onReplay: () => void;
}

export default function StoryExperience({ onReplay }: StoryExperienceProps) {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [activeDetail, setActiveDetail] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    caption?: string;
    location?: string;
    desktopPos?: string;
    mobilePos?: string;
  } | null>(null);

  const { story, t, language } = useLanguage();
  const { ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09, ch10, ch11 } = story.chapters;

  // Track visible chapter using IntersectionObserver (0 layout reflows, buttery smooth 60fps on mobile)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = id.match(/chapter-(\d+)/);
            if (match) {
              setCurrentChapter(parseInt(match[1], 10));
            }
          }
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      }
    );

    const chapterElements = document.querySelectorAll('[id^="chapter-"]');
    chapterElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToChapter = (ch: number) => {
    const el = document.getElementById(`chapter-${ch < 10 ? `0${ch}` : ch}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050308] text-[#FFF7FA]">
      {/* Subtle Chapter Progress & Navigation */}
      <ProgressIndicator
        currentChapter={currentChapter}
        onSelectChapter={scrollToChapter}
      />
      <ChapterNavigation
        currentChapter={currentChapter}
        onNavigate={scrollToChapter}
      />

      {/* ========================================================
          CHAPTER 01: THE BEGINNING
          ======================================================== */}
      <Chapter
        id="chapter-01"
        chapterNumber={ch01.number}
        title={ch01.title}
        subtitle={language === "hi" ? "कुछ कहानियां एक खूबसूरत पल से शुरू होती हैं" : "Some stories begin with a moment"}
      >
        <div className="w-full flex flex-col md:flex-row items-center gap-5 md:gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/2 h-[30vh] sm:h-[38vh] md:h-[46vh] max-h-[420px] rounded-2xl overflow-hidden border border-[#D6B36A]/25 relative shadow-[0_20px_60px_rgba(5,3,8,0.9)]"
          >
            <CinematicPhoto
              src={ch01.image}
              alt="Chapter 01"
              desktopObjectPosition={ch01.desktopObjectPosition}
              mobileObjectPosition={ch01.mobileObjectPosition}
              fitMode="contain"
              className="w-full h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-full md:w-1/2 space-y-3 sm:space-y-4 text-left px-1"
          >
            {ch01.copy.map((paragraph, idx) => (
              <p
                key={idx}
                className="font-editorial text-lg sm:text-xl md:text-2xl text-white italic leading-relaxed font-normal"
              >
                &ldquo;{paragraph}&rdquo;
              </p>
            ))}
            <div className="pt-1 sm:pt-2">
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#E6CA7E] font-semibold">
                {t("thePreludeToUs")}
              </span>
            </div>
          </motion.div>
        </div>
      </Chapter>

      {/* ========================================================
          CHAPTER 02: THE LITTLE THINGS
          ======================================================== */}
      <Chapter
        id="chapter-02"
        chapterNumber={ch02.number}
        title={ch02.title}
        subtitle={language === "hi" ? "सिर्फ बड़ी बातें ही नहीं थीं" : "It was never only the big moments"}
      >
        <div className="w-full space-y-3 sm:space-y-4 max-w-4xl mx-auto">
          <div className="text-center max-w-lg mx-auto mb-2 sm:mb-3">
            {ch02.copy.map((line, idx) => (
              <p
                key={idx}
                className="font-editorial text-sm sm:text-base md:text-lg text-[#FFD7E5] italic mb-1 font-normal"
              >
                &ldquo;{line}&rdquo;
              </p>
            ))}
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-[#E6CA7E] font-semibold">
              {t("tapAnyMoment")}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
            {ch02.details.map((detail) => {
              const isRevealed = activeDetail === detail.id;
              return (
                <motion.div
                  key={detail.id}
                  onClick={() => setActiveDetail(isRevealed ? null : detail.id)}
                  whileHover={{ scale: 1.02 }}
                  className={`p-2.5 sm:p-4 rounded-xl border transition-all duration-500 cursor-pointer ${
                    isRevealed
                      ? "bg-[#160A13] border-[#D6B36A] shadow-[0_0_25px_rgba(214,179,106,0.3)]"
                      : "bg-[#0C0710] border-[#D6B36A]/25 hover:border-[#D6B36A]/60 shadow-[0_10px_25px_rgba(5,3,8,0.7)]"
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#E6CA7E] font-semibold block mb-0.5 sm:mb-1">
                    {detail.label}
                  </span>
                  <h4 className="font-heading text-xs sm:text-sm md:text-base text-white mb-0.5 sm:mb-1 font-semibold">
                    {detail.title}
                  </h4>
                  <p className="font-editorial text-[11px] sm:text-xs md:text-sm text-white italic leading-relaxed font-normal">
                    &ldquo;{detail.message}&rdquo;
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Chapter>

      {/* ========================================================
          CHAPTER 03: YOUR SMILE
          ======================================================== */}
      <Chapter
        id="chapter-03"
        chapterNumber={ch03.number}
        title={ch03.title}
        subtitle={language === "hi" ? "मुस्कुराते तो बहुत लोग हैं, लेकिन तुम्हारी मुस्कान मेरा जहां बन गई।" : "Some people have a beautiful smile. Yours became my favorite place."}
      >
        <div className="w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl h-[34vh] sm:h-[42vh] md:h-[48vh] max-h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D6B36A]/30 relative shadow-[0_30px_90px_rgba(5,3,8,0.95)] mb-3 sm:mb-4"
          >
            <CinematicPhoto
              src={ch03.image}
              alt="Your Smile"
              desktopObjectPosition={ch03.desktopObjectPosition}
              mobileObjectPosition={ch03.mobileObjectPosition}
              fitMode="contain"
              className="w-full h-full"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-editorial text-sm sm:text-base md:text-xl text-white italic text-center max-w-lg font-normal px-2"
          >
            &ldquo;{ch03.hiddenCompliment}&rdquo;
          </motion.p>
        </div>
      </Chapter>

      {/* ========================================================
          CHAPTER 04: OUR MEMORIES
          ======================================================== */}
      <Chapter
        id="chapter-04"
        chapterNumber={ch04.number}
        title={ch04.title}
        subtitle={language === "hi" ? "खामोश लम्हों में कैद हमारी खूबसूरत यादें" : "Moments preserved in quiet light"}
      >
        <div className="w-full max-w-5xl mx-auto space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
            {ch04.photos.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                onClick={() =>
                  setLightboxImage({
                    src: item.image,
                    caption: item.caption,
                    location: item.location,
                    desktopPos: item.desktopObjectPosition,
                    mobilePos: item.mobileObjectPosition,
                  })
                }
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8B4C8]/15 bg-[#0C0710] shadow-[0_15px_35px_rgba(5,3,8,0.8)] cursor-pointer"
              >
                <div className="w-full h-36 sm:h-48 md:h-60 overflow-hidden relative">
                  <CinematicPhoto
                    src={item.image}
                    alt={item.caption}
                    desktopObjectPosition={item.desktopObjectPosition}
                    mobileObjectPosition={item.mobileObjectPosition}
                    fitMode="contain"
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050308]/90 via-[#050308]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-2.5 sm:left-3 sm:right-3 text-left">
                    <p className="font-editorial text-[11px] sm:text-xs md:text-sm text-[#FFF7FA] italic mb-0.5 line-clamp-2">
                      &ldquo;{item.caption}&rdquo;
                    </p>
                    {item.location && (
                      <span className="text-[8px] sm:text-[9px] font-sans uppercase tracking-[0.18em] text-[#D6B36A]">
                        {item.location}
                      </span>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#160A13]/80 border border-[#D6B36A]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D6B36A]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Chapter>

      {/* ========================================================
          CHAPTER 05: THINGS I NEVER SAID
          ======================================================== */}
      <Chapter
        id="chapter-05"
        chapterNumber="05"
        title={ch05.title}
        subtitle={language === "hi" ? "दिल की वो अनकही बातें जिन्हें लफ्ज़ मिल गए" : "Unspoken feelings given words"}
      >
        <LoveLetter variant="envelope" />
      </Chapter>

      {/* ========================================================
          CHAPTER 06: WHY YOU
          ======================================================== */}
      <Chapter
        id="chapter-06"
        chapterNumber={ch06.number}
        title={ch06.title}
        subtitle={language === "hi" ? "अनगिनत वजहों में से सिर्फ छह खास वजहें" : "Six reasons out of countless more"}
      >
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 max-w-4xl mx-auto">
          {ch06.cards.map((card, idx) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              whileHover={{ y: -3 }}
              className="p-2.5 sm:p-4 rounded-xl bg-[#0C0710] border border-[#D6B36A]/30 hover:border-[#D6B36A]/60 shadow-[0_15px_35px_rgba(5,3,8,0.8)] transition-all duration-400 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] sm:tracking-[0.25em] text-[#E6CA7E] uppercase font-bold">
                  {card.number}
                </span>
                <h4 className="font-heading text-xs sm:text-sm md:text-base text-white font-semibold mt-0.5 sm:mt-1 mb-0.5 sm:mb-1">
                  {card.title}
                </h4>
                <p className="font-editorial text-[11px] sm:text-xs md:text-sm text-white italic leading-relaxed font-normal">
                  &ldquo;{card.description}&rdquo;
                </p>
              </div>
              <div className="mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-[#FFF7FA]/10 flex items-center justify-between text-[#E6CA7E] text-xs">
                <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E6CA7E]" />
                <span className="tracking-[0.15em] uppercase text-[8px] sm:text-[9px] font-semibold text-[#E6CA7E]">{t("cherished")}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Chapter>

      {/* ========================================================
          CHAPTER 07: OUR LITTLE UNIVERSE
          ======================================================== */}
      <Chapter
        id="chapter-07"
        chapterNumber={ch07.number}
        title={ch07.title}
        subtitle={language === "hi" ? "दो रूहें जो एक ही कायनात में आ मिलीं" : "Two souls wandering into the same orbit"}
      >
        <div className="w-full max-w-2xl mx-auto text-center space-y-4 sm:space-y-5">
          <div className="relative py-5 sm:py-7 md:py-9 px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-radial from-[#160A13] via-[#0C0710] to-[#050308] border border-[#D6B36A]/20 shadow-[0_0_60px_rgba(214,179,106,0.1)]">
            <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
              {ch07.copy.map((line, idx) => (
                <p
                  key={idx}
                  className="font-editorial text-lg sm:text-xl md:text-2xl text-[#FFF7FA] italic leading-relaxed"
                >
                  &ldquo;{line}&rdquo;
                </p>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {ch07.floatingQuotes.map((quote, idx) => (
                <span
                  key={idx}
                  className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#160A13] border border-[#D6B36A]/40 text-[11px] sm:text-xs md:text-sm font-editorial text-white italic font-medium shadow-sm"
                >
                  ✦ {quote}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Chapter>

      {/* ========================================================
          CHAPTER 08: IF I COULD PAUSE TIME
          ======================================================== */}
      <Chapter
        id="chapter-08"
        chapterNumber={ch08.number}
        title={ch08.title}
        subtitle={language === "hi" ? "मैं अपनी सबसे हसीन यादों में थोड़ा और ठहरना चाहता हूँ" : "I'd stay in our happiest moments a little longer"}
      >
        <div className="w-full space-y-3 sm:space-y-4 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {ch08.slides.map((slide) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                onClick={() =>
                  setLightboxImage({
                    src: slide.image,
                    caption: slide.caption,
                    desktopPos: slide.desktopObjectPosition,
                    mobilePos: slide.mobileObjectPosition,
                  })
                }
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#D6B36A]/20 bg-[#0C0710] shadow-[0_15px_45px_rgba(5,3,8,0.8)] cursor-pointer"
              >
                <div className="w-full h-44 sm:h-56 md:h-68 relative">
                  <CinematicPhoto
                    src={slide.image}
                    alt={slide.caption}
                    desktopObjectPosition={slide.desktopObjectPosition}
                    mobileObjectPosition={slide.mobileObjectPosition}
                    fitMode="contain"
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050308]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3">
                    <p className="font-editorial text-[11px] sm:text-xs md:text-sm text-[#FFF7FA] italic line-clamp-2">
                      &ldquo;{slide.caption}&rdquo;
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Chapter>

      {/* ========================================================
          CHAPTER 09: OUR SONG
          ======================================================== */}
      <Chapter
        id="chapter-09"
        chapterNumber="09"
        title={ch09.title}
        subtitle={language === "hi" ? "एक ऐसी धुन जो सिर्फ हमारी है" : "A melody that belongs only to us"}
      >
        <OurSong />
      </Chapter>

      {/* ========================================================
          CHAPTER 10: MY LETTER TO YOU
          ======================================================== */}
      <Chapter
        id="chapter-10"
        chapterNumber="10"
        title={ch10.title}
        subtitle={language === "hi" ? "दिल की सबसे गहरी गहराइयों से लिखा गया" : "Written from the quietest depths of my heart"}
      >
        <LoveLetter variant="full" />
      </Chapter>

      {/* ========================================================
          CHAPTER 11: THE SECRET
          ======================================================== */}
      <Chapter
        id="chapter-11"
        chapterNumber="11"
        title={ch11.title}
        subtitle={language === "hi" ? "सिर्फ तुम्हारे लिए रखा गया एक खास पैगाम" : "A private message kept just for you"}
      >
        <SecretReveal />
      </Chapter>

      {/* ========================================================
          CHAPTER 12: FINAL BIRTHDAY REVEAL
          ======================================================== */}
      <div id="chapter-12">
        <BirthdayFinale />
      </div>

      {/* Replay & Restart Section */}
      <ReplayExperience onReplay={onReplay} />

      {/* Fullscreen Photo Lightbox */}
      {lightboxImage && (
        <PhotoLightbox
          isOpen={!!lightboxImage}
          onClose={() => setLightboxImage(null)}
          imageSrc={lightboxImage.src}
          caption={lightboxImage.caption}
          location={lightboxImage.location}
          desktopObjectPosition={lightboxImage.desktopPos}
          mobileObjectPosition={lightboxImage.mobilePos}
        />
      )}
    </div>
  );
}
