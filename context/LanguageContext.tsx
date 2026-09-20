"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { loveStory, LoveStoryConfig } from "@/data/loveStory";
import { loveStoryHindi } from "@/data/loveStoryHindi";

export type Language = "en" | "hi";

const translations: Record<Language, Record<string, string>> = {
  en: {
    forAnni: "FOR ANNI ❤️",
    gateQuote: "“A birthday surprise made with love, just for you...”",
    openSurprise: "OPEN YOUR SURPRISE",
    tapToBegin: "Tap to begin",
    continue: "CONTINUE",
    sixMomentsHeading: "“Six precious moments with you, Anni... each one a piece of my heart.”",
    tapMomentToOpen: "✦ Tap any moment to open ✦",
    tapAnyMoment: "✦ Tap any moment to highlight",
    tapToViewFull: "TAP TO VIEW FULL PHOTO",
    closeMemory: "CLOSE MEMORY",
    tapTheStar: "TAP THE STAR",
    ourStoryContinues: "OUR STORY CONTINUES",
    chapter: "CHAPTER",
    scrollDown: "SCROLL DOWN FOR NEXT CHAPTER",
    makeAWish: "MAKE A WISH ✨",
    wishMade: "WISH SENT TO THE STARS ✨",
    replayExperience: "REPLAY OUR STORY ↻",
    songLabel: "Anni's Song",
    playSong: "Play Song",
    revealSecret: "TAP TO REVEAL SECRET",
    iAmReady: "I AM READY",
    cancel: "CANCEL",
    cherished: "CHERISHED",
    thePreludeToUs: "The prelude to us",
  },
  hi: {
    forAnni: "एनी के लिए ❤️",
    gateQuote: "“खास तुम्हारे लिए प्यार से बनाया गया एक सरप्राइज...”",
    openSurprise: "सरप्राइज खोलें ✨",
    tapToBegin: "शुरू करने के लिए टैप करें",
    continue: "आगे बढ़ें",
    sixMomentsHeading: "“तुम्हारे साथ वो छह अनमोल पल, एनी... हर एक पल मेरे दिल का टुकड़ा है।”",
    tapMomentToOpen: "✦ किसी भी पल को खोलने के लिए टैप करें ✦",
    tapAnyMoment: "✦ किसी भी पल को देखने के लिए टैप करें",
    tapToViewFull: "पूरी फोटो देखने के लिए टैप करें",
    closeMemory: "याद बंद करें",
    tapTheStar: "सितारे को छूएं ✨",
    ourStoryContinues: "हमारी कहानी आगे बढ़ती है",
    chapter: "अध्याय",
    scrollDown: "अगले अध्याय के लिए नीचे स्क्रॉल करें",
    makeAWish: "एक विश मांगें ✨",
    wishMade: "दुआ सितारों तक पहुँच गई ✨",
    replayExperience: "हमारी कहानी फिर से देखें ↻",
    songLabel: "एनी का गाना",
    playSong: "गाना चलाएं",
    revealSecret: "सीक्रेट देखने के लिए टैप करें",
    iAmReady: "मैं तैयार हूँ",
    cancel: "वापस जाएं",
    cherished: "अनमोल",
    thePreludeToUs: "हमारी खूबसूरत शुरुआत",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  story: LoveStoryConfig;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Load persisted language choice on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("birthday_language") as Language | null;
      if (saved === "en" || saved === "hi") {
        setLanguageState(saved);
      }
    } catch {
      // localStorage may be disabled
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("birthday_language", lang);
    } catch {
      // Ignore
    }
  };

  const toggleLanguage = () => {
    const next = language === "en" ? "hi" : "en";
    setLanguage(next);
  };

  const story = language === "hi" ? loveStoryHindi : loveStory;

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        story,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return fallback if used outside provider
    return {
      language: "en" as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
      story: loveStory,
      t: (key: string) => translations.en[key] || key,
    };
  }
  return context;
}
