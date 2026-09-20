"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, Music, Sparkles } from "lucide-react";

interface MusicControllerProps {
  audioSrc?: string;
  isLowerVolume?: boolean;
}

export default function MusicController({
  audioSrc = "/music/our-song.mp3",
  isLowerVolume = false,
}: MusicControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [useFallbackSynth, setUseFallbackSynth] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Broadcast status to components like Chapter 09 (OurSong)
  const broadcastStatus = useCallback(
    (playing: boolean, curTime = 0, dur = 0, vol = volume, muted = isMuted) => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("birthday-music-status", {
            detail: {
              isPlaying: playing,
              currentTime: curTime,
              duration: dur,
              progress: dur > 0 ? (curTime / dur) * 100 : 0,
              volume: vol,
              isMuted: muted,
            },
          })
        );
      }
    },
    [volume, isMuted]
  );

  // Gentle romantic music-box synth fallback when no MP3 is uploaded yet
  const playRomanticChordProgression = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Soft romantic music-box chord notes (frequencies in Hz)
      // Cmaj7 -> Am9 -> Fmaj7 -> Gsus4
      const chords = [
        [261.63, 329.63, 392.0, 493.88], // C E G B
        [220.0, 261.63, 329.63, 392.0, 493.88], // A C E G B
        [174.61, 261.63, 329.63, 349.23], // F C E F
        [196.0, 293.66, 392.0, 440.0], // G D G A
      ];

      let chordIdx = 0;

      const playNextChord = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === "closed") return;
        const currentChord = chords[chordIdx % chords.length];
        chordIdx++;

        currentChord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.2);

          const baseVol = isMuted ? 0 : volume * 0.12;
          gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.2);
          gain.gain.exponentialRampToValueAtTime(baseVol, ctx.currentTime + i * 0.2 + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.2 + 2.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + i * 0.2);
          osc.stop(ctx.currentTime + i * 0.2 + 3.0);
        });
      };

      playNextChord();
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = window.setInterval(playNextChord, 3200);
    } catch {
      // AudioContext unavailable
    }
  }, [isMuted, volume]);

  const stopFallbackSynth = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.suspend().catch(() => {});
    }
  }, []);

  // Initialize audio element with preload="none" so it doesn't block mobile initial load
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.src = audioSrc;
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      broadcastStatus(
        !audio.paused,
        audio.currentTime,
        audio.duration || 0,
        audio.volume,
        audio.muted
      );
    };

    const handleError = () => {
      // If audio file doesn't exist yet, mark fallback available
      setUseFallbackSynth(true);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
      stopFallbackSynth();
    };
  }, [audioSrc, broadcastStatus, stopFallbackSynth]);

  // Adjust volume when muted or lowerVolume changes
  useEffect(() => {
    const targetVol = isMuted ? 0 : isLowerVolume ? 0.25 : volume;
    if (audioRef.current) {
      audioRef.current.volume = targetVol;
    }
  }, [isLowerVolume, isMuted, volume]);

  // Auto-lower volume on Chapter 10 (Love letter) & Chapter 11 (Secret)
  useEffect(() => {
    const handleScroll = () => {
      if (!audioRef.current || isMuted) return;
      const letterEl = document.getElementById("chapter-10");
      const secretEl = document.getElementById("chapter-11");
      const inView = (el: HTMLElement | null) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.2;
      };

      const shouldLower = inView(letterEl) || inView(secretEl);
      const targetVol = shouldLower ? 0.22 : volume;
      if (Math.abs(audioRef.current.volume - targetVol) > 0.05) {
        audioRef.current.volume = targetVol;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMuted, volume]);

  const startPlaying = useCallback(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          broadcastStatus(true, audioRef.current?.currentTime, audioRef.current?.duration);
        })
        .catch(() => {
          // If MP3 file not found or failed, activate romantic ambient synthesizer
          setUseFallbackSynth(true);
          playRomanticChordProgression();
          setIsPlaying(true);
          broadcastStatus(true, 0, 100);
        });
    } else {
      setUseFallbackSynth(true);
      playRomanticChordProgression();
      setIsPlaying(true);
      broadcastStatus(true, 0, 100);
    }
  }, [broadcastStatus, playRomanticChordProgression]);

  const pausePlaying = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopFallbackSynth();
    setIsPlaying(false);
    broadcastStatus(false);
  }, [broadcastStatus, stopFallbackSynth]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pausePlaying();
    } else {
      startPlaying();
    }
  }, [isPlaying, pausePlaying, startPlaying]);

  const toggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
    broadcastStatus(isPlaying, audioRef.current?.currentTime, audioRef.current?.duration, volume, nextMuted);
  }, [isMuted, isPlaying, volume, broadcastStatus]);

  // Listen for global custom events from CinematicGate and OurSong
  useEffect(() => {
    const handleStart = () => startPlaying();
    const handlePause = () => pausePlaying();
    const handleToggle = () => togglePlay();
    const handleVolume = (e: Event) => {
      const customEv = e as CustomEvent<{ volume: number }>;
      if (customEv.detail && typeof customEv.detail.volume === "number") {
        const newVol = customEv.detail.volume;
        setVolume(newVol);
        if (audioRef.current) {
          audioRef.current.volume = isMuted ? 0 : newVol;
        }
      }
    };
    const handleSeek = (e: Event) => {
      const customEv = e as CustomEvent<{ percent: number }>;
      if (customEv.detail && typeof customEv.detail.percent === "number" && audioRef.current?.duration) {
        audioRef.current.currentTime = (customEv.detail.percent / 100) * audioRef.current.duration;
      }
    };

    window.addEventListener("start-birthday-music", handleStart);
    window.addEventListener("pause-birthday-music", handlePause);
    window.addEventListener("toggle-birthday-music", handleToggle);
    window.addEventListener("set-birthday-music-volume", handleVolume);
    window.addEventListener("seek-birthday-music", handleSeek);

    return () => {
      window.removeEventListener("start-birthday-music", handleStart);
      window.removeEventListener("pause-birthday-music", handlePause);
      window.removeEventListener("toggle-birthday-music", handleToggle);
      window.removeEventListener("set-birthday-music-volume", handleVolume);
      window.removeEventListener("seek-birthday-music", handleSeek);
    };
  }, [startPlaying, pausePlaying, togglePlay, isMuted]);

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 flex items-center gap-2 select-none pointer-events-auto">
      {/* Floating Audio Controller */}
      <div className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-[#0C0710]/90 border border-[#D6B36A]/30 backdrop-blur-md shadow-[0_4px_25px_rgba(5,3,8,0.85)] hover:border-[#D6B36A]/60 transition-all duration-300">
        <button
          onClick={togglePlay}
          className="flex items-center gap-1.5 text-[#FFF7FA] hover:text-[#D6B36A] transition-colors cursor-pointer group"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <>
              <Music className="w-3.5 h-3.5 text-[#D6B36A] animate-pulse" />
              <span className="text-[11px] font-sans tracking-[0.18em] uppercase text-[#D6B36A] font-light hidden sm:inline">
                Anni&apos;s Song
              </span>
            </>
          ) : (
            <>
              <span className="text-xs font-serif text-[#D6B36A]">♫</span>
              <span className="text-[11px] font-sans tracking-[0.18em] uppercase text-[#BBAEB6] font-light hidden sm:inline">
                Play Song
              </span>
            </>
          )}
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#BBAEB6] hover:text-[#FFF7FA] transition-colors cursor-pointer ml-1"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#D6B36A]" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

