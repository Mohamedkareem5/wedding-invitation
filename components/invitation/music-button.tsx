"use client"

import { motion } from "framer-motion"
import { Music2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const START_AT = 12 // start playback from 0:12

export default function MusicButton() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Removed the useEffect since we now rely on the <audio> tag in the DOM
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.45
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
