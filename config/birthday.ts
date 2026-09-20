export interface MemoryItem {
  id: number;
  title: string;
  description: string;
  date: string;
  tag?: string;
  icon?: string;
}

export interface PhotoItem {
  id: number;
  src: string;
  title: string;
  caption: string;
  date?: string;
  aspect?: "tall" | "wide" | "square";
}

export interface BirthdayConfig {
  // Personal Info
  girlName: string;
  nickname?: string;
  birthdayDate?: string;

  // Intro Screen
  intro: {
    line1: string;
    line2: string;
    buttonText: string;
  };

  // Hero Section
  birthdayMessage: string;
  heroSubtitle: string;
  heroWishButton: string;

  // Music Player
  music: string;
  songTitle?: string;
  songArtist?: string;

  // Photos Collection
  photosSectionTitle: string;
  photosSectionSubtitle: string;
  photos: PhotoItem[];

  // Love Letter
  letterSectionTitle: string;
  letter: {
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };

  // Memories Timeline
  memoriesSectionTitle: string;
  memoriesSectionSubtitle: string;
  memories: MemoryItem[];

  // Interactive Surprise
  surprise: {
    previewText: string;
    openButtonText: string;
    openedTitle: string;
    openedMessage: string[];
    specialWish: string;
  };

  // Final Section & Footer
  finalMessage: {
    headline: string;
    subline: string;
    replayButton: string;
  };
}

export const birthdayConfig: BirthdayConfig = {
  // 1. HER NAME & TITLES
  girlName: "Anni",
  nickname: "My Love",
  birthdayDate: "Today",

  // 2. OPENING CURTAIN
  intro: {
    line1: "I made something special for you...",
    line2: "A little birthday surprise is waiting for you, Anni ❤️",
    buttonText: "Open Your Surprise ✨",
  },

  // 3. HERO SECTION
  birthdayMessage: "Happy Birthday, Anni ❤️",
  heroSubtitle:
    "Today is not just your birthday... it's a celebration of the most wonderful girlfriend in the world.",
  heroWishButton: "Make a Wish ✨",

  // 4. MUSIC SETTINGS
  music: "/music/our-song.mp3",
  songTitle: "Dil (Shreya's Version)",
  songArtist: "Shreya Ghoshal",


  // 5. HER PHOTOS COLLECTION
  // Drop your photos into /public/images/girl-photo-1.jpg etc.
  photosSectionTitle: "A Little Collection of You",
  photosSectionSubtitle: "Every picture holds a smile, a memory, and a piece of your magic.",
  photos: [
    {
      id: 1,
      src: "/images/girl-photo-1.jpg",
      title: "Pure Radiance",
      caption: "That smile that lights up any room you walk into.",
      date: "A favorite memory",
      aspect: "tall",
    },
    {
      id: 2,
      src: "/images/girl-photo-2.jpg",
      title: "Gentle Moments",
      caption: "Unfiltered, natural, and effortlessly stunning.",
      date: "Always cherished",
      aspect: "square",
    },
    {
      id: 3,
      src: "/images/girl-photo-3.jpg",
      title: "Sweet Laughter",
      caption: "The kind of laugh that makes everyone around you happier.",
      date: "Golden hours",
      aspect: "tall",
    },
    {
      id: 4,
      src: "/images/girl-photo-4.jpg",
      title: "Dreamer Eyes",
      caption: "A heart full of warmth and eyes full of wonder.",
      date: "Unforgettable",
      aspect: "square",
    },
    {
      id: 5,
      src: "/images/girl-photo-5.jpg",
      title: "Timeless Grace",
      caption: "Every single day feels brighter with you in it.",
      date: "Special day",
      aspect: "wide",
    },
    {
      id: 6,
      src: "/images/girl-photo-6.jpg",
      title: "Just You",
      caption: "The one and only, irreplaceable you.",
      date: "Forever special",
      aspect: "tall",
    },
  ],

  // 6. LOVE LETTER
  letterSectionTitle: "A Letter For You 💌",
  letter: {
    salutation: "To the most special person in my life,",
    paragraphs: [
      "Today is your day, but honestly, every day feels a little more beautiful because you are a part of it.",
      "I hope this year brings you countless reasons to smile, dreams that come true, and moments that you will always remember.",
      "Keep smiling.\nKeep shining.\nAnd never forget how special you are.",
    ],
    closing: "With all my love,",
    signature: "Happy Birthday ❤️",
  },

  // 7. MEMORIES TIMELINE
  memoriesSectionTitle: "Our Little Memories",
  memoriesSectionSubtitle: "A glimpse through the moments that mean the most.",
  memories: [
    {
      id: 1,
      title: "The Beginning",
      description: "A beautiful moment that started something truly special.",
      date: "The First Chapter",
      tag: "Spark",
      icon: "Sparkles",
    },
    {
      id: 2,
      title: "That Smile",
      description: "One smile that became impossible to forget, catching my heart by surprise.",
      date: "A Magical Day",
      tag: "Heartbeat",
      icon: "Smile",
    },
    {
      id: 3,
      title: "Beautiful Moments",
      description: "Some moments are simple, yet they quietly become the most unforgettable memories.",
      date: "Cherished Times",
      tag: "Warmth",
      icon: "Heart",
    },
    {
      id: 4,
      title: "Today & Forever",
      description: "And here we are, celebrating you and the wonderful light you bring into this world.",
      date: "Your Special Day",
      tag: "Celebration",
      icon: "Gift",
    },
  ],

  // 8. BIRTHDAY SURPRISE
  surprise: {
    previewText: "There's one more surprise...",
    openButtonText: "Open My Surprise 🎁",
    openedTitle: "Happy Birthday ❤️",
    openedMessage: [
      "May your smile always stay this beautiful,",
      "your heart always stay this kind,",
      "and your life always be filled with happiness.",
    ],
    specialWish: "You deserve all the beautiful things life has to offer.",
  },

  // 9. FINAL SECTION
  finalMessage: {
    headline: "Happy Birthday, Beautiful ❤️",
    subline: "With lots of love,\nFrom someone who is lucky to have you.",
    replayButton: "Replay Surprise ↻",
  },
};
