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
    
    // Ensure the audio starts at the right time
    const initStartTime = () => {
      if (audio.currentTime < START_AT - 0.1) {
        audio.currentTime = START_AT;
      }
    };

    if (audio.readyState >= 1) {
      initStartTime();
    } else {
      audio.addEventListener('loadedmetadata', initStartTime);
    }

    // Unmute on first interaction
    const handleInteraction = () => {
      if (audio.muted) {
        audio.muted = false;
        // Extra push to play in case it was stalled
        audio.play().catch(() => {});
      }
      
      // Stop listening after first interaction
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("scroll", handleInteraction);
    
    // Synce state with actual audio play state
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleEnded = () => {
      audio.currentTime = START_AT;
      audio.play().catch(() => {});
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    // Initial check
    if (!audio.paused) setPlaying(true);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
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
        audio.muted = false; // Always unmute when manually playing
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
