"use client"

import { motion } from "framer-motion"
import { Music2, VolumeX } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function MusicButton() {
  const [muted, setMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = document.getElementById("bg-audio") as HTMLAudioElement | null;
    if (!audio) return;
    audioRef.current = audio;

    // Sync state
    setMuted(audio.muted || audio.paused);

    const onPlay = () => { if (!audio.muted) setMuted(false); };
    const onPause = () => setMuted(true);
    const onVolumeChange = () => setMuted(audio.muted);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("volumechange", onVolumeChange);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current || document.getElementById("bg-audio") as HTMLAudioElement | null;
    if (!audio) return;

    if (audio.muted || audio.paused) {
      audio.muted = false;
      audio.volume = 0.45;
      if (audio.paused) {
        audio.currentTime = audio.currentTime === 0 ? 12 : audio.currentTime;
        audio.play().catch(() => {});
      }
      setMuted(false);
    } else {
      audio.muted = true;
      setMuted(true);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Unmute Music" : "Mute Music"}
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
          <Music2 className="h-4 w-4" aria-hidden="true" />
        )}
      </motion.span>
    </motion.button>
  )
}
