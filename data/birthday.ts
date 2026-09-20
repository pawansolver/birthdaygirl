export interface MemoryItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image?: string;
  tag?: string;
}

export interface PhotoCard {
  id: number;
  src: string;
  caption: string;
  subcaption?: string;
  aspect?: "tall" | "wide" | "square";
}

export interface BirthdayStoryData {
  girlName: string;
  nickname: string;

  intro: {
    phase1: string;
    phase2: string;
    phase3: string;
    phase4: string;
    phase5: string;
    buttonText: string;
  };

  hero: {
    tagline: string;
    overlayText: string;
    storyTitle: string;
    subText: string;
    image: string;
  };

  chapter1: {
    number: string;
    title: string;
    heading: string;
    description: string[];
    photos: PhotoCard[];
  };

  chapter2: {
    number: string;
    title: string;
    heading: string;
    subheading: string;
    memories: MemoryItem[];
  };

  fullscreenMoment: {
    image: string;
    line1: string;
    line2: string;
  };

  chapter3: {
    number: string;
    title: string;
    heading: string;
    teaser: string;
    buttonText: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };

  chapter4: {
    number: string;
    title: string;
    line1: string;
    line2: string;
    buttonText: string;
  };

  finale: {
    headline: string;
    titleName: string;
    messageParagraphs: string[];
    blessingLines: string[];
    finalPhoto: string;
    finalPhotoQuote: string;
    finalClosing: string;
    replayText: string;
  };

  music: {
    enabled: boolean;
    src: string;
    title: string;
  };

  photos: string[];
}

export const birthdayData: BirthdayStoryData = {
  // Replace with her real name
  girlName: "Her Name",
  nickname: "My Love",

  // 1. INTRO
  intro: {
    phase1: "Some stories are written...",
    phase2: "Some are remembered...",
    phase3: "And some are felt.",
    phase4: "This one is for you.",
    phase5: "A little story about\nsomeone very special.",
    buttonText: "Begin The Story",
  },

  // 2. HERO: Her photo slowly revealed → “This is the story of us…”
  hero: {
    tagline: "PROLOGUE · THE BEGINNING",
    overlayText:
      "There is someone\nwho makes ordinary moments\nfeel a little more beautiful.",
    storyTitle: "This is the story of us…",
    subText: "And every beautiful chapter that led to today.",
    image: "/images/girl-photo-1.jpg",
  },

  // 3. CHAPTER 01: Relationship Chapters — The Little Things
  chapter1: {
    number: "CHAPTER 01",
    title: "THE LITTLE THINGS",
    heading: "It's the little things.",
    description: [
      "The smile.",
      "The way you laugh.",
      "The little moments that somehow become the moments we remember the most.",
    ],
    photos: [
      {
        id: 1,
        src: "/images/girl-photo-2.jpg",
        caption: "A moment worth remembering.",
        subcaption: "The quiet warmth of your presence",
        aspect: "tall",
      },
      {
        id: 2,
        src: "/images/girl-photo-3.jpg",
        caption: "That effortless laugh.",
        subcaption: "Lighting up every room without trying",
        aspect: "tall",
      },
      {
        id: 3,
        src: "/images/girl-photo-4.jpg",
        caption: "Pure grace.",
        subcaption: "Unfiltered, genuine, and irreplaceable",
        aspect: "tall",
      },
    ],
  },

  // 4. CHAPTER 02: Relationship Chapters — The Memories
  chapter2: {
    number: "CHAPTER 02",
    title: "OUR JOURNEY",
    heading: "Some moments",
    subheading: "deserve to stay forever.",
    memories: [
      {
        id: 1,
        title: "The Beginning",
        date: "Chapter 01",
        description:
          "The very first conversation that turned an ordinary day into something unforgettable.",
        image: "/images/girl-photo-2.jpg",
        tag: "First Spark ✨",
      },
      {
        id: 2,
        title: "That Smile",
        date: "Chapter 02",
        description:
          "The kind of smile that stays with you long after the moment has passed.",
        image: "/images/girl-photo-3.jpg",
        tag: "Heartbeat 💕",
      },
      {
        id: 3,
        title: "Golden Moments",
        date: "Chapter 03",
        description:
          "When time seemed to slow down, and everything felt peaceful, warm, and just right.",
        image: "/images/girl-photo-4.jpg",
        tag: "Warmth 🌅",
      },
      {
        id: 4,
        title: "Today & Forever",
        date: "Chapter 04",
        description:
          "Another year of your beautiful light, celebrating the wonderful person you are.",
        image: "/images/girl-photo-1.jpg",
        tag: "Celebration 🎂",
      },
    ],
  },

  // 5. FULL-SCREEN MEMORIES
  fullscreenMoment: {
    image: "/images/girl-photo-5.jpg",
    line1: "If I could keep one thing from every moment...",
    line2: "It would be the feeling.",
  },

  // 6. HANDWRITTEN LOVE LETTER
  chapter3: {
    number: "CHAPTER 03",
    title: "A LETTER FOR YOU",
    heading: "A letter,\nwritten from the heart.",
    teaser: "You have a personal letter 💌",
    buttonText: "Read My Letter",
    salutation: "To the most special person in my life,",
    paragraphs: [
      "There are some people who enter our lives and quietly make everything feel different. You are that person for me.",
      "Today is your day, but honestly, every day feels a little more beautiful because you are a part of it.",
      "I hope this year brings you countless reasons to smile, dreams that come true, and peaceful moments that you will always remember.",
      "Keep smiling. Keep shining. And never forget how special you are to me.",
    ],
    closing: "With all my love,",
    signature: "Always & Forever ❤️",
  },

  // 7. SECRET INTERACTIVE REVEAL
  chapter4: {
    number: "CHAPTER 04",
    title: "THE SECRET SURPRISE",
    line1: "There's one more secret left...",
    line2: "I saved the best for the end.",
    buttonText: "Open The Secret 🎁",
  },

  // 8. FINAL BIRTHDAY SCENE → “Happy Birthday, My Love ❤️”
  finale: {
    headline: "Happy Birthday, My Love ❤️",
    titleName: "Her Name",
    messageParagraphs: [
      "Today is your day.",
      "But if I'm being honest...",
      "I'm grateful for every single day that has you in it.",
    ],
    blessingLines: [
      "May this year bring you",
      "more reasons to smile,",
      "more dreams to chase,",
      "and more beautiful moments to remember.",
    ],
    finalPhoto: "/images/girl-photo-6.jpg",
    finalPhotoQuote:
      "This little story ends here...\n\nbut our beautiful moments don't.",
    finalClosing: "❤️",
    replayText: "Experience our story again",
  },

  // 9. YOUR SONG + CINEMATIC MUSIC PLAYER
  music: {
    enabled: true,
    src: "/music/birthday-song.mp3",
    title: "Our Song",
  },

  photos: [
    "/images/girl-photo-1.jpg",
    "/images/girl-photo-2.jpg",
    "/images/girl-photo-3.jpg",
    "/images/girl-photo-4.jpg",
    "/images/girl-photo-5.jpg",
    "/images/girl-photo-6.jpg",
  ],
};
