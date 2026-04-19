"use client"

import { motion } from "framer-motion"
import { Music2 } from "lucide-react"
import { useEffect, useState } from "react"

const START_AT = 12

export default function MusicButton() {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = document.getElementById("bg-audio") as HTMLAudioElement;
    if (!audio) return;
    
    audio.volume = 0.45;
    
    // Check if the browser actually allowed the autoplay
    if (!audio.paused) {
      setPlaying(true);
    }
    
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleEnded = () => {
      audio.currentTime = START_AT;
      audio.play().catch(() => {});
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const toggle = async () => {
    const audio = document.getElementById("bg-audio") as HTMLAudioElement;
    if (!audio) return;
    
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        if (audio.currentTime < START_AT - 0.5) {
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
  )
}
