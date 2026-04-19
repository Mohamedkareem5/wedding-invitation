"use client"

import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { useEffect, useState } from "react"

const START_AT = 12

export default function MusicButton() {
  const [muted, setMuted] = useState(true) // starts muted (autoplay policy)

  useEffect(() => {
    const audio = document.getElementById("bg-audio") as HTMLAudioElement;
    if (!audio) return;

    audio.volume = 0.45;

    // Set start position
    const applyStartTime = () => {
      if (Math.abs(audio.currentTime - START_AT) > 0.5) {
        audio.currentTime = START_AT;
      }
    };

    if (audio.readyState >= 1) applyStartTime();
    else audio.addEventListener("loadedmetadata", applyStartTime, { once: true });

    // Ensure it's playing (it should be via autoPlay attribute)
    if (audio.paused) {
      audio.muted = true;
      audio.play().catch(() => {});
    }

    // Loop from START_AT instead of the beginning
    const handleEnded = () => {
      audio.currentTime = START_AT;
      audio.play().catch(() => {});
    };

    // Sync muted state if changed externally
    const syncMuted = () => setMuted(audio.muted);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("volumechange", syncMuted);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("volumechange", syncMuted);
    };
  }, []);

  const toggle = () => {
    const audio = document.getElementById("bg-audio") as HTMLAudioElement;
    if (!audio) return;

    if (muted) {
      // Unmute
      audio.muted = false;
      if (audio.paused) {
        audio.play().catch(() => {});
      }
      setMuted(false);
    } else {
      // Mute (keep playing, just mute)
      audio.muted = true;
      setMuted(true);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Unmute Music" : "Mute Music"}
      aria-pressed={!muted}
      animate={muted ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={
        muted
          ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0 }
      }
      className="fixed bottom-5 left-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-brown-deep text-ivory-card shadow-lg shadow-brown-deep/30"
      style={{ position: "fixed" }}
    >
      <motion.span
        animate={!muted ? { rotate: 360 } : { rotate: 0 }}
        transition={
          !muted
            ? { duration: 3, repeat: Infinity, ease: "linear" }
            : { duration: 0.3 }
        }
        className="flex h-full w-full items-center justify-center"
      >
        {muted ? (
          <VolumeX className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        )}
      </motion.span>
    </motion.button>
  )
}
