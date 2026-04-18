"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { useEffect } from "react"

type Props = {
  isOpening: boolean
  onOpen: () => void
  onComplete: () => void
}

const CURTAIN_DURATION = 3.5

export default function Curtain({ isOpening, onOpen, onComplete }: Props) {
  useEffect(() => {
    if (isOpening) {
      const timer = setTimeout(() => {
        onComplete()
      }, CURTAIN_DURATION * 1000 + 400)
      return () => clearTimeout(timer)
    }
  }, [isOpening, onComplete])

  const easeLayout = [0.32, 0.72, 0.15, 1] as const

  return (
    <div
      className="absolute inset-0 z-50 overflow-hidden bg-transparent"
      aria-hidden={!isOpening}
      style={{ perspective: "1500px" }}
    >
      {/* 
        Left Curtain Image Half 
        Background-size: 200% 100% means the image spans the entire logical screen.
        By setting position: left center, this perfectly crops the left 50% of the single image.
        Added a fallback gradient in case the image hasn't been added yet.
      */}
      <motion.div
        initial={{ x: "0%", rotateZ: 0, y: 0 }}
        animate={isOpening ? { 
          x: "-105%", 
          rotateZ: [0, 2.5, -1, 0.5, 0], // Gentle organic shaking
          y: [0, -10, 4, 0] // Gentle tug upwards
        } : { 
          x: "0%", rotateZ: 0, y: 0 
        }}
        transition={{
          x: { duration: CURTAIN_DURATION, ease: easeLayout },
          rotateZ: { duration: CURTAIN_DURATION, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeInOut" },
          y: { duration: CURTAIN_DURATION, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeInOut" }
        }}
        className="absolute inset-y-0 left-0 w-1/2 z-10 origin-top pointer-events-none"
        style={{
          backgroundImage: "url('/curtain.png'), linear-gradient(90deg, #fdfaf6 0%, #ebdcc6 100%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
          willChange: "transform",
          filter: "drop-shadow(15px 0px 30px rgba(0,0,0,0.3))"
        }}
      />

      {/* Right Curtain Image Half */}
      <motion.div
        initial={{ x: "0%", rotateZ: 0, y: 0 }}
        animate={isOpening ? { 
          x: "105%", 
          rotateZ: [0, -2.5, 1, -0.5, 0], // Gentle organic shaking
          y: [0, -10, 4, 0] 
        } : { 
          x: "0%", rotateZ: 0, y: 0 
        }}
        transition={{
          x: { duration: CURTAIN_DURATION, ease: easeLayout },
          rotateZ: { duration: CURTAIN_DURATION, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeInOut" },
          y: { duration: CURTAIN_DURATION, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeInOut" }
        }}
        className="absolute inset-y-0 right-0 w-1/2 z-10 origin-top pointer-events-none"
        style={{
          backgroundImage: "url('/curtain.png'), linear-gradient(270deg, #fdfaf6 0%, #ebdcc6 100%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          willChange: "transform",
          filter: "drop-shadow(-15px 0px 30px rgba(0,0,0,0.3))"
        }}
      />

      {/* Floral Arch Overlay - Static */}
      <div className="absolute inset-x-0 top-0 z-40 pointer-events-none">
        <img 
          src="/curtain-arch.png" 
          alt="" 
          className="w-full object-contain"
        />
      </div>

      <motion.div
        initial={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        animate={isOpening ? { opacity: 0, scale: 0.85, y: -20, filter: "blur(4px)" } : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 text-center"
      >
        <div className="relative pointer-events-auto flex flex-col items-center p-8 rounded-full bg-ivory-card/40 backdrop-blur-md shadow-2xl border border-white/20 mt-20">
            {/* The Names (English) */}
            <h1 className="font-english text-[48px] italic leading-[1.1] text-brown-deep mb-2 drop-shadow-sm flex flex-col items-center">
              <span>Moustafa</span>
              <span className="font-english-body text-[28px] text-taupe block my-1">&amp;</span>
              <span>Nihal</span>
            </h1>
            <p className="font-english-body text-[14px] tracking-[0.2em] text-taupe mb-10">
              May 2nd, 2026
            </p>

            {/* Premium Button */}
            <motion.button
              type="button"
              onClick={onOpen}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="group relative flex items-center justify-center h-16 w-16 rounded-full bg-taupe text-ivory-card shadow-[0_10px_40px_rgba(125,110,94,0.5)] transition-all border-[1.5px] border-taupe-dark overflow-hidden"
              aria-label="Open Invitation"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <div className="absolute inset-1 rounded-full border border-ivory-card/40 scale-100 group-hover:scale-95 transition-transform duration-500" />
              <Mail className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-md" strokeWidth={1.5} />
            </motion.button>
            <p className="font-english-body mt-5 text-[12px] font-bold tracking-[0.25em] text-taupe uppercase drop-shadow-sm">
               Open Invitation
            </p>
        </div>
      </motion.div>
    </div>
  )
}
