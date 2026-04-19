"use client"

import { motion } from "framer-motion"
import { Music2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const START_AT = 12 // start playback from 0:12

export default function MusicButton() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio("/music.mp3")
    audio.preload = "auto"
    audio.loop = false
    audio.volume = 0.45
    audioRef.current = audio

    const tryPlay = async () => {
      const a = audioRef.current
      if (!a) return false
      try {
        if (a.readyState >= 1 && a.currentTime < START_AT) {
          a.currentTime = START_AT
        }
        await a.play()
        setPlaying(true)
        return true
      } catch (error) {
        // Autoplay blocked, will retry on user interaction
        return false
      }
    }

    const onInteract = async () => {
      if (document.hidden) return // don't play if tab is backgrounded
      if (playing) return

      const success = await tryPlay()
      if (success) {
        document.removeEventListener("click", onInteract)
        document.removeEventListener("touchstart", onInteract)
        document.removeEventListener("scroll", onInteract)
        document.removeEventListener("pointerdown", onInteract)
      }
    }

    document.addEventListener("click", onInteract)
    document.addEventListener("touchstart", onInteract)
    document.addEventListener("scroll", onInteract)
    document.addEventListener("pointerdown", onInteract)

    audio.addEventListener("loadeddata", tryPlay)
    tryPlay() // try immediately


    audio.addEventListener("ended", () => {
      try {
        audio.currentTime = START_AT
        void audio.play()
      } catch {
        /* ignore */
      }
    })

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
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
