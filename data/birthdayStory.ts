export interface FloatingMemory {
  id: number;
  title: string;
  shortNote: string;
  hiddenMessage: string;
  icon: string;
}

export interface FilmMemory {
  id: number;
  photo: string;
  caption: string;
  secretMessage: string;
  date: string;
}

export interface WhyYouReason {
  id: number;
  number: string;
  title: string;
  description: string;
}

export interface StarMemory {
  id: number;
  name: string;
  cx: number; // percentage 0-100
  cy: number; // percentage 0-100
  title: string;
  memory: string;
}

export interface BirthdayStoryData {
  girlName: string;

  chapter01: {
    number: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    photo: string;
    hiddenMessage: string;
  };

  chapter02: {
    number: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    photo: string;
    promptText: string;
    revealedMessage: string;
  };

  chapter03: {
    number: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    memories: FloatingMemory[];
  };

  chapter04: {
    number: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    photo: string;
    compliment: string;
  };

  chapter05: {
    number: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    filmFrames: FilmMemory[];
  };

  chapter06: {
    number: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };

  chapter07: {
    number: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    reasons: WhyYouReason[];
  };

  chapter08: {
    number: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    stars: StarMemory[];
  };

  chapter09: {
    number: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    photos: string[];
    caption: string;
  };

  chapter10: {
    number: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    sentences: string[];
    finalPromise: string;
  };

  chapter11: {
    number: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    confirmPrompt: string;
    secretContent: string[];
  };

  chapter12: {
    number: string;
    title: string;
    quoteLine1: string;
    quoteLine2: string;
    photo: string;
    question: string;
    mainTitle: string;
    closingWish: string;
  };

  music: {
    src: string;
    title: string;
  };
}

export const birthdayStoryData: BirthdayStoryData = {
  girlName: "Anni",

  // 01 — THE BEGINNING
  chapter01: {
    number: "01",
    title: "THE BEGINNING",
    quoteLine1: "Some stories begin with a moment.",
    quoteLine2: "Ours began before we even knew it.",
    photo: "/images/girl-photo-1.jpg",
    hiddenMessage: "I didn't know that day would become my favorite chapter.",
  },

  // 02 — THE FIRST FEELING
  chapter02: {
    number: "02",
    title: "THE FIRST FEELING",
    quoteLine1: "I don't remember the exact moment...",
    quoteLine2: "but I remember how everything started feeling different.",
    photo: "/images/girl-photo-2.jpg",
    promptText: "Tap photo to reveal a secret memory",
    revealedMessage: "This was the moment I started noticing you.",
  },

  // 03 — THE LITTLE THINGS
  chapter03: {
    number: "03",
    title: "THE LITTLE THINGS",
    quoteLine1: "It was never the big things.",
    quoteLine2: "It was always the little things you did.",
    memories: [
      {
        id: 1,
        title: "The Little Laugh",
        shortNote: "When you chuckle under your breath",
        hiddenMessage: "It instantly erases whatever bad day I was having.",
        icon: "Smile",
      },
      {
        id: 2,
        title: "The Way You Listen",
        shortNote: "With those attentive, gentle eyes",
        hiddenMessage: "You make me feel understood without saying a single word.",
        icon: "Heart",
      },
      {
        id: 3,
        title: "Your Random Texts",
        shortNote: "Unexpected little hellos",
        hiddenMessage: "A single notification from you turns ordinary afternoons into gold.",
        icon: "MessageCircle",
      },
      {
        id: 4,
        title: "The Shy Glances",
        shortNote: "When our eyes meet by surprise",
        hiddenMessage: "My heart still skips that very same beat every single time.",
        icon: "Sparkles",
      },
      {
        id: 5,
        title: "Your Soft Kindness",
        shortNote: "How caring you are to everyone",
        hiddenMessage: "Your heart is genuinely the purest thing in this entire world.",
        icon: "Flower2",
      },
    ],
  },

  // 04 — YOUR SMILE
  chapter04: {
    number: "04",
    title: "YOUR SMILE",
    quoteLine1: "Some people have a beautiful smile.",
    quoteLine2: "Yours became my favorite place.",
    photo: "/images/girl-photo-3.jpg",
    compliment: "The kind of smile that makes everything else disappear.",
  },

  // 05 — OUR MEMORIES
  chapter05: {
    number: "05",
    title: "OUR MEMORIES",
    quoteLine1: "If I could keep only one thing from our story,",
    quoteLine2: "I'd keep these moments.",
    filmFrames: [
      {
        id: 1,
        photo: "/images/girl-photo-1.jpg",
        caption: "Frame 01 · First Spark",
        secretMessage: "I knew right here that you were going to be someone unforgettable.",
        date: "The Prologue",
      },
      {
        id: 2,
        photo: "/images/girl-photo-2.jpg",
        caption: "Frame 02 · Unfiltered Joy",
        secretMessage: "Just you being completely yourself. My absolute favorite view.",
        date: "Golden Days",
      },
      {
        id: 3,
        photo: "/images/girl-photo-3.jpg",
        caption: "Frame 03 · Timeless Glow",
        secretMessage: "I stopped looking at the time because every second with you felt sacred.",
        date: "Special Times",
      },
      {
        id: 4,
        photo: "/images/girl-photo-4.jpg",
        caption: "Frame 04 · Always Together",
        secretMessage: "No matter how fast the world moves, this is where I belong.",
        date: "Forever Chapter",
      },
    ],
  },

  // 06 — THINGS I NEVER SAID
  chapter06: {
    number: "06",
    title: "THINGS I NEVER SAID",
    quoteLine1: "There are things I've felt a thousand times",
    quoteLine2: "but never found the right words to say.",
    salutation: "To the girl who holds my heart,",
    paragraphs: [
      "Sometimes I look at you and wonder how someone so full of warmth, gentleness, and magic ended up in my life.",
      "You make quiet moments feel peaceful, and heavy days feel light. You give without asking, and your presence alone brings comfort I didn't know I needed.",
      "I might not say it every single day, but every heartbeat quietly reminds me how grateful I am that it's you.",
    ],
    closing: "Forever yours,",
    signature: "Always & Without Doubt ❤️",
  },

  // 07 — WHY YOU
  chapter07: {
    number: "07",
    title: "WHY YOU",
    quoteLine1: "Out of all the people in this world,",
    quoteLine2: "somehow... I found you.",
    reasons: [
      {
        id: 1,
        number: "01",
        title: "Because of your kindness",
        description: "You have a gentle way of caring that makes this world feel a little softer.",
      },
      {
        id: 2,
        number: "02",
        title: "Because of your laughter",
        description: "It's the most genuine, uplifting melody I could ever listen to.",
      },
      {
        id: 3,
        number: "03",
        title: "Because you make me feel safe",
        description: "With you, I can be completely myself without fear of judgment.",
      },
      {
        id: 4,
        number: "04",
        title: "Because you believe in me",
        description: "Even when I doubt myself, your encouragement is my greatest strength.",
      },
      {
        id: 5,
        number: "05",
        title: "Simply because you are you",
        description: "There is no one else like you, and I wouldn't trade you for the world.",
      },
    ],
  },

  // 08 — OUR LITTLE UNIVERSE
  chapter08: {
    number: "08",
    title: "OUR LITTLE UNIVERSE",
    quoteLine1: "Maybe the world is huge...",
    quoteLine2: "but somehow my favorite place became us.",
    stars: [
      {
        id: 1,
        name: "First Glance",
        cx: 20,
        cy: 35,
        title: "The First Glance",
        memory: "The moment our eyes locked and the rest of the noise in the room faded out.",
      },
      {
        id: 2,
        name: "Late Conversations",
        cx: 45,
        cy: 22,
        title: "Late Night Talks",
        memory: "Talking about everything and nothing until hours felt like minutes.",
      },
      {
        id: 3,
        name: "Unspoken Trust",
        cx: 75,
        cy: 40,
        title: "The Unspoken Trust",
        memory: "Knowing without speaking that we have each other's backs, no matter what.",
      },
      {
        id: 4,
        name: "Warm Hugs",
        cx: 35,
        cy: 68,
        title: "That Long Hug",
        memory: "When holding you felt like finally coming home after a long journey.",
      },
      {
        id: 5,
        name: "Today's Star",
        cx: 65,
        cy: 75,
        title: "Celebrating Your Life",
        memory: "The brightest star in my sky — the day you were brought into this world.",
      },
    ],
  },

  // 09 — IF I COULD PAUSE TIME
  chapter09: {
    number: "09",
    title: "IF I COULD PAUSE TIME",
    quoteLine1: "I would go back to our happiest moments",
    quoteLine2: "and stay there a little longer.",
    photos: [
      "/images/girl-photo-4.jpg",
      "/images/girl-photo-5.jpg",
      "/images/girl-photo-2.jpg",
    ],
    caption: "Frozen in time · When every second felt infinite",
  },

  // 10 — MY PROMISE
  chapter10: {
    number: "10",
    title: "MY PROMISE",
    quoteLine1: "I can't promise that every day will be perfect.",
    quoteLine2: "But I can promise that I'll always value what we have.",
    sentences: [
      "I promise to listen to you, even when you only speak in sighs.",
      "I promise to celebrate your wins, and hold your hand through the storms.",
      "I promise to always remind you how special and cherished you are.",
    ],
    finalPromise: "I promise to choose you, today, tomorrow, and every chapter to come.",
  },

  // 11 — THE SECRET
  chapter11: {
    number: "11",
    title: "THE SECRET",
    quoteLine1: "You've reached the part",
    quoteLine2: "I almost didn't put here...",
    confirmPrompt: "Are you sure you want to open this?",
    secretContent: [
      "I was terrified the first time I realized how deeply I care about you.",
      "Because when you find someone who becomes your entire world, you realize how much that world matters.",
      "You aren't just a part of my story. You are the reason my story is worth telling.",
    ],
  },

  // 12 — HAPPY BIRTHDAY, MY LOVE ❤️
  chapter12: {
    number: "12",
    title: "HAPPY BIRTHDAY, MY LOVE ❤️",
    quoteLine1: "After everything I've written...",
    quoteLine2: "there is still one thing I can't explain.",
    photo: "/images/girl-photo-6.jpg",
    question: "How did I get so lucky to have you in my story?",
    mainTitle: "Happy Birthday, My Love.",
    closingWish: "Whatever chapters come next, I hope we write them together.",
  },

  music: {
    src: "/music/birthday-song.mp3",
    title: "Our Soundtrack",
  },
};
