"use client"

import { motion } from "framer-motion"
import { Music2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const START_AT = 12 // start playback from 0:12

export default function MusicButton() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.45;

    let intervalId: ReturnType<typeof setInterval>;

    const forcePlay = async () => {
      // If manually paused or already playing, stop forcing
      if (a.paused === false) {
        setPlaying(true);
        clearInterval(intervalId);
        return;
      }
      try {
        if (a.readyState >= 1 && a.currentTime < START_AT) {
          a.currentTime = START_AT;
        }
        await a.play();
        setPlaying(true);
        clearInterval(intervalId);
      } catch (e) {
        // Autoplay blocked. Browsers like Chrome/Safari will throw a DOMException.
        // We will keep trying in the interval in case an interaction occurs somewhere else.
      }
    };

    forcePlay();
    intervalId = setInterval(forcePlay, 500);

    return () => clearInterval(intervalId);
  }, []);

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        if (audio.readyState >= 1 && audio.currentTime < START_AT - 0.5) {
          audio.currentTime = START_AT
        }
        await audio.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    }
  }
  
    return (
      <>
        <audio 
          ref={audioRef} 
          src="/music.mp3" 
          autoPlay 
          preload="auto" 
          onLoadedMetadata={(e) => {
            const target = e.target as HTMLAudioElement;
            if (target.currentTime < START_AT) {
              target.currentTime = START_AT;
            }
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={(e) => {
            const target = e.target as HTMLAudioElement;
            target.currentTime = START_AT;
            target.play().catch(() => {});
          }}
          className="hidden" 
        />
        <motion.button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause Music" : "Play Music"}
          aria-pressed={playing}
          animate={playing ? { scale: 1 } : { scale: [1, 1.08, 1] }}
          transition={
            playing
              ? { duration: 0 }
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
          className="fixed bottom-5 left-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-brown-deep text-ivory-card shadow-lg shadow-brown-deep/30"
          style={{ position: "fixed" }}
        >
          <motion.span
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={
              playing
                ? { duration: 3, repeat: Infinity, ease: "linear" }
                : { duration: 0.3 }
            }
            className="flex h-full w-full items-center justify-center"
          >
            <Music2 className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </motion.button>
      </>
    )
  }
