export interface StoryMemory {
  id: number;
  image: string;
  title: string;
  message: string;
  desktopObjectPosition?: string;
  mobileObjectPosition?: string;
}

export interface InteractiveDetail {
  id: number;
  label: string;
  title: string;
  message: string;
}

export interface WhyYouCard {
  number: string;
  title: string;
  description: string;
}

export interface ChapterData {
  id: number;
  chapterNumber: string;
  title: string;
  subtitle?: string;
  copy: string[];
  image?: string;
  desktopObjectPosition?: string;
  mobileObjectPosition?: string;
}

export interface LoveStoryConfig {
  name: string;
  birthday: string;
  hero: {
    image: string;
    desktopObjectPosition: string;
    mobileObjectPosition: string;
    title: string;
    prelude: string;
    revealFirst: string;
    revealSecond: string;
    tagline: string;
  };
  memories: StoryMemory[];
  constellation: {
    introFirst: string;
    introSecond: string;
    quote: string;
    hiddenPhoto: {
      image: string;
      desktopObjectPosition: string;
      mobileObjectPosition: string;
      quoteFirst: string;
      quoteSecond: string;
    };
  };
  chapters: {
    ch01: {
      number: string;
      title: string;
      copy: string[];
      image: string;
      desktopObjectPosition: string;
      mobileObjectPosition: string;
    };
    ch02: {
      number: string;
      title: string;
      copy: string[];
      details: InteractiveDetail[];
    };
    ch03: {
      number: string;
      title: string;
      copy: string[];
      hiddenCompliment: string;
      image: string;
      desktopObjectPosition: string;
      mobileObjectPosition: string;
    };
    ch04: {
      number: string;
      title: string;
      copy: string[];
      photos: {
        id: number;
        image: string;
        caption: string;
        location?: string;
        desktopObjectPosition?: string;
        mobileObjectPosition?: string;
      }[];
    };
    ch05: {
      number: string;
      title: string;
      envelopeText: string[];
      letterLines: string[];
    };
    ch06: {
      number: string;
      title: string;
      cards: WhyYouCard[];
    };
    ch07: {
      number: string;
      title: string;
      copy: string[];
      floatingQuotes: string[];
    };
    ch08: {
      number: string;
      title: string;
      copy: string[];
      slides: {
        id: number;
        image: string;
        caption: string;
        desktopObjectPosition?: string;
        mobileObjectPosition?: string;
      }[];
    };
    ch09: {
      number: string;
      title: string;
      songTitle: string;
      artist: string;
      audioSrc: string;
      quote: string;
    };
    ch10: {
      number: string;
      title: string;
      paragraphs: string[];
      signoff: string;
    };
    ch11: {
      number: string;
      title: string;
      warningText: string;
      confirmQuestion: string;
      secretMessage: string[];
      secretImage: string;
      desktopObjectPosition: string;
      mobileObjectPosition: string;
    };
    ch12: {
      number: string;
      title: string;
      prelude: string;
      question: string;
      heading: string;
      subheading: string;
      image: string;
      desktopObjectPosition: string;
      mobileObjectPosition: string;
      footerNote: string;
    };
  };
}

export const loveStory: LoveStoryConfig = {
  name: "Anni",
  birthday: "Today",

  hero: {
    image: "/images/hero.jpg",
    desktopObjectPosition: "center 30%",
    mobileObjectPosition: "center 25%",
    title: "HAPPY BIRTHDAY, ANNI",
    prelude: "A little birthday surprise made just for you...",
    revealFirst: "In a world of billions of souls...",
    revealSecond: "...my heart chose you, Anni.",
    tagline: "TO MY FAVORITE PERSON IN THE UNIVERSE",
  },

  memories: [
    {
      id: 1,
      image: "/images/memory-01.jpg",
      title: "The Day You Smiled at Me",
      message: "I still remember the first time your eyes met mine, Anni. The whole world suddenly made sense.",
      desktopObjectPosition: "center center",
      mobileObjectPosition: "center center",
    },
    {
      id: 2,
      image: "/images/memory-02.jpg",
      title: "Your Unstoppable Laughter",
      message: "Your laughter is my favorite melody, Anni. On your birthday, I wish you a lifetime of endless giggles and smiles.",
      desktopObjectPosition: "center 20%",
      mobileObjectPosition: "center 20%",
    },
    {
      id: 3,
      image: "/images/memory-03.jpg",
      title: "Quiet Moments With You",
      message: "Sitting beside you doing nothing at all feels like the greatest adventure, my love.",
      desktopObjectPosition: "center center",
      mobileObjectPosition: "center center",
    },
    {
      id: 4,
      image: "/images/memory-04.jpg",
      title: "Holding Your Hand",
      message: "Whenever I hold your hand, Anni, I know that no matter where life leads, I am right where I belong.",
      desktopObjectPosition: "center center",
      mobileObjectPosition: "center center",
    },
    {
      id: 5,
      image: "/images/memory-05.jpg",
      title: "Your Beautiful Soul",
      message: "You are not just the prettiest girl in every room; you have the purest, kindest heart I've ever known.",
      desktopObjectPosition: "center 35%",
      mobileObjectPosition: "center 35%",
    },
    {
      id: 6,
      image: "/images/memory-06.jpg",
      title: "My Favorite Tomorrow",
      message: "Every tomorrow is brighter because I get to wake up and love you all over again. Happy Birthday, Anni.",
      desktopObjectPosition: "center center",
      mobileObjectPosition: "center center",
    },
  ],

  constellation: {
    introFirst: "Six memories are only a glimpse...",
    introSecond: "...of how much you truly mean to me, Anni.",
    quote: "So I created a little universe dedicated to you.",
    hiddenPhoto: {
      image: "/images/hidden-07.jpg",
      desktopObjectPosition: "center 28%",
      mobileObjectPosition: "center 25%",
      quoteFirst: "Out of all the stars in the night sky...",
      quoteSecond: "You will always be my brightest, Anni.",
    },
  },

  chapters: {
    ch01: {
      number: "01",
      title: "THE DAY YOU CAME INTO MY LIFE",
      copy: [
        "Some stories begin quietly, without warning.",
        "The day you walked into my life, Anni, you turned every ordinary moment into something extraordinary.",
      ],
      image: "/images/chapter-01.jpg",
      desktopObjectPosition: "center 30%",
      mobileObjectPosition: "center 25%",
    },

    ch02: {
      number: "02",
      title: "THE LITTLE THINGS I LOVE ABOUT YOU",
      copy: [
        "It was never just the big dates or grand gestures.",
        "It was the countless little things about you, Anni, that made me fall deeper in love every single day.",
      ],
      details: [
        {
          id: 1,
          label: "01 — The Way You Laugh",
          title: "Your Sweet Laugh",
          message: "The way your eyes crinkle when you laugh uncontrollably at my silly jokes.",
        },
        {
          id: 2,
          label: "02 — How You Care",
          title: "Your Gentle Heart",
          message: "The way you check up on me and care so deeply about the smallest things in my day.",
        },
        {
          id: 3,
          label: "03 — Your Cute Habits",
          title: "The Little Habits",
          message: "The cute way you pout when you're teasing me, and that radiant smile right after.",
        },
        {
          id: 4,
          label: "04 — Your Warm Presence",
          title: "Feeling at Home",
          message: "Just being next to you, Anni, makes every worry and stress completely disappear.",
        },
        {
          id: 5,
          label: "05 — Your Beautiful Mind",
          title: "Everything You Are",
          message: "Your dreams, your kindness, and the inspiring way you bring sunshine into my world.",
        },
        {
          id: 6,
          label: "06 — How You Look At Me",
          title: "Your Loving Eyes",
          message: "The soft, loving way you look at me when you think I'm not looking. It melts my heart every single time, Anni.",
        },
      ],
    },

    ch03: {
      number: "03",
      title: "YOUR SMILE, ANNI",
      copy: [
        "Some people have a pretty smile.",
        "Yours, Anni, became my entire world.",
      ],
      hiddenCompliment: "Whenever you smile, Anni, everything feels right in the world. May your birthday be filled with that very same magic.",
      image: "/images/chapter-03.jpg",
      desktopObjectPosition: "center 25%",
      mobileObjectPosition: "center 20%",
    },

    ch04: {
      number: "04",
      title: "OUR PRECIOUS MEMORIES",
      copy: [
        "Every moment spent with you is a memory I hold close to my heart.",
        "Here are just a few glimpses of our beautiful journey together, my love.",
      ],
      photos: [
        {
          id: 1,
          image: "/images/chapter-04.jpg",
          caption: "The sweet moments where time stopped and it was just you and me, Anni.",
          location: "Our special place",
          desktopObjectPosition: "center center",
          mobileObjectPosition: "center center",
        },
        {
          id: 2,
          image: "/images/chapter-02.jpg",
          caption: "Walking hand in hand, knowing you are the best thing that ever happened to me.",
          location: "Everywhere with you",
          desktopObjectPosition: "center 30%",
          mobileObjectPosition: "center 30%",
        },
        {
          id: 3,
          image: "/images/chapter-05.jpg",
          caption: "Looking at you and realizing I have the prettiest girlfriend in the whole world.",
          location: "Cherished moment",
          desktopObjectPosition: "center 25%",
          mobileObjectPosition: "center 25%",
        },
        {
          id: 4,
          image: "/images/chapter-06.jpg",
          caption: "Endless talks, shared smiles, and falling in love with you all over again.",
          location: "Our favorite corner",
          desktopObjectPosition: "center center",
          mobileObjectPosition: "center center",
        },
      ],
    },

    ch05: {
      number: "05",
      title: "THINGS I NEVER SAID",
      envelopeText: [
        "There are feelings I carry every single day...",
        "that words can never quite capture, Anni.",
      ],
      letterLines: [
        "Sometimes when you are just talking or smiling, I pause and wonder how I got so lucky.",
        "You make loving you feel so effortless, so natural, and so beautiful.",
        "You are my girlfriend, my best friend, and my favorite part of every day.",
        "On your birthday, I want you to know how deeply, completely, and endlessly loved you are.",
        "Happy Birthday, my sweet Anni. I am forever yours.",
      ],
    },

    ch06: {
      number: "06",
      title: "WHY YOU, ANNI",
      cards: [
        {
          number: "01",
          title: "Your Pure Heart",
          description: "The kindness and empathy you give to everyone around you inspires me every single day.",
        },
        {
          number: "02",
          title: "Your Beautiful Smile",
          description: "No matter how tough the day is, one glance at your smile heals everything.",
        },
        {
          number: "03",
          title: "Your Unconditional Love",
          description: "The way you believe in me, support me, and love me for who I truly am.",
        },
        {
          number: "04",
          title: "The Joy You Bring",
          description: "You turn the simplest moments into memories I want to keep for the rest of my life.",
        },
        {
          number: "05",
          title: "You Are My Home",
          description: "In a chaotic world, your arms and your presence are my safest, most peaceful sanctuary.",
        },
        {
          number: "06",
          title: "You Are My Future",
          description: "When I look ahead at all the years to come, every single dream and tomorrow has you in it, Anni.",
        },
      ],
    },

    ch07: {
      number: "07",
      title: "OUR LITTLE UNIVERSE",
      copy: [
        "Out of 8 billion people in this world,",
        "there is only one Anni — and she has my entire heart.",
      ],
      floatingQuotes: [
        "Anni, my favorite reason to smile",
        "Happy Birthday to my dream girl",
        "Two hearts, one beautiful story",
        "Loving you is my favorite thing to do",
      ],
    },

    ch08: {
      number: "08",
      title: "IF I COULD PAUSE TIME",
      copy: [
        "If I could freeze time on your birthday, Anni...",
        "I'd stay in this exact moment with you forever.",
      ],
      slides: [
        {
          id: 1,
          image: "/images/chapter-07.jpg",
          caption: "Cherishing every quiet glance and whispered secret with you, Anni.",
          desktopObjectPosition: "center 30%",
          mobileObjectPosition: "center 30%",
        },
        {
          id: 2,
          image: "/images/chapter-08.jpg",
          caption: "Your warmth, your touch, and the peace I feel only when you are with me.",
          desktopObjectPosition: "center center",
          mobileObjectPosition: "center center",
        },
        {
          id: 3,
          image: "/images/chapter-09.jpg",
          caption: "Looking forward to celebrating a hundred more birthdays by your side.",
          desktopObjectPosition: "center 25%",
          mobileObjectPosition: "center 25%",
        },
      ],
    },

    ch09: {
      number: "09",
      title: "OUR SONG",
      songTitle: "Dil (Shreya's Version)",
      artist: "Shreya Ghoshal • Ek Villain Returns",
      audioSrc: "/music/our-song.mp3",
      quote: "Whenever this song plays, Anni, I am reminded of how deeply and endlessly I love you.",
    },


    ch10: {
      number: "10",
      title: "MY BIRTHDAY LETTER TO YOU",
      paragraphs: [
        "My Dearest Anni,",
        "Today is the day the world was blessed with the most beautiful soul I have ever known.",
        "From the moment you entered my life, you brought a warmth that melted away every doubt, a laughter that brightened every morning, and a love that redefined everything for me.",
        "You are my girlfriend, my confidante, my biggest blessing, and the girl I want to love for all the days of my life.",
        "I promise to always stand by you, to celebrate your victories, to hold your hand through the storms, and to make sure you always know how truly precious you are.",
        "May this birthday bring you as much happiness, peace, and love as you give to me every single day.",
      ],
      signoff: "Happy Birthday, my love. Forever & always, your boyfriend.",
    },

    ch11: {
      number: "11",
      title: "A PRIVATE PROMISE",
      warningText: "A secret birthday promise kept just for you...",
      confirmQuestion: "Are you ready to see my secret promise, Anni?",
      secretMessage: [
        "Anni, you are my once-in-a-lifetime person.",
        "No matter where life takes us or what tomorrow brings,",
        "I will choose you, protect your smile, and cherish you. Every single day.",
        "Happy Birthday, my beautiful girl.",
      ],
      secretImage: "/images/chapter-11.jpg",
      desktopObjectPosition: "center 30%",
      mobileObjectPosition: "center 25%",
    },

    ch12: {
      number: "12",
      title: "HAPPY BIRTHDAY, ANNI",
      prelude: "After all the memories, words, and quiet moments...",
      question: "How did I get so lucky to call you mine?",
      heading: "HAPPY BIRTHDAY, ANNI ❤️",
      subheading: "Whatever chapters come next, I want to spend every single one with you.",
      image: "/images/final.jpg",
      desktopObjectPosition: "center 25%",
      mobileObjectPosition: "center 20%",
      footerNote: "To my girlfriend, my heart, my everything — Forever & Always ❤️",
    },
  },
};
