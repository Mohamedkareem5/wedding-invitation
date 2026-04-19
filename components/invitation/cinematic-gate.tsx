"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo, useCallback } from "react"

/* ── Types ─────────────────────────────────────────────── */
type Mote = {
  id: number
  x: number
  startY: number
  size: number
  delay: number
  duration: number
  opacity: number
  drift: number
}

function buildMotes(count: number): Mote[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    startY: 90 + Math.random() * 20,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 4,
    duration: 5 + Math.random() * 7,
    opacity: 0.25 + Math.random() * 0.45,
    drift: (Math.random() - 0.5) * 30,
  }))
}

/* ── SVG Ornament (decorative flourish) ────────────────── */
function Flourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M100 12 C85 12, 75 4, 55 6 C40 8, 35 14, 20 12 C12 11, 6 8, 0 12"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M100 12 C115 12, 125 4, 145 6 C160 8, 165 14, 180 12 C188 11, 194 8, 200 12"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      {/* Center diamond */}
      <path
        d="M100 6 L104 12 L100 18 L96 12 Z"
        fill="currentColor"
        opacity="0.4"
      />
      {/* Small dots */}
      <circle cx="55" cy="6" r="1.2" fill="currentColor" opacity="0.3" />
      <circle cx="145" cy="6" r="1.2" fill="currentColor" opacity="0.3" />
      <circle cx="20" cy="12" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="180" cy="12" r="1" fill="currentColor" opacity="0.2" />
    </svg>
  )
}

/* ── Constants ─────────────────────────────────────────── */
const SWING = 2.8          // gate swing duration (seconds)
const EASE_GATE = [0.32, 0.72, 0.15, 1] as const

/* ── Component ─────────────────────────────────────────── */
type Props = { onComplete: () => void }

export default function CinematicGate({ onComplete }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle")
  const motes = useMemo(() => buildMotes(24), [])

  const handleOpen = useCallback(() => {
    setPhase("opening")
    // After gates finish + light wash, signal done
    setTimeout(() => {
      setPhase("done")
      setTimeout(() => onComplete(), 700)
    }, SWING * 1000 + 600)
  }, [onComplete])

  const isOpening = phase === "opening"

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="cinematic-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 z-50 overflow-hidden"
          style={{ perspective: "1200px" }}
        >
          {/* ── 1. Dark atmospheric background ── */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 120% 100% at 50% 60%, #2a2015 0%, #151008 50%, #0c0a06 100%)",
            }}
          />

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 120px 40px rgba(0,0,0,0.6)",
            }}
          />

          {/* ── 2. Golden light behind the gates (center crack) ── */}
          <motion.div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-[1]"
            initial={{ width: "3px", opacity: 0.5 }}
            animate={
              isOpening
                ? { width: "110%", opacity: [0.5, 0.9, 1] }
                : { width: "3px", opacity: 0.5 }
            }
            transition={{
              duration: SWING + 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(242,237,230,0.95) 0%, rgba(212,185,140,0.5) 35%, transparent 70%)",
            }}
          />

          {/* ── 2b. Vertical light line (always visible in crack) ── */}
          {!isOpening && (
            <motion.div
              className="absolute inset-y-[10%] left-1/2 -translate-x-1/2 w-[1px] z-[5]"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(212,185,140,0.6) 30%, rgba(212,185,140,0.8) 50%, rgba(212,185,140,0.6) 70%, transparent 100%)",
              }}
            />
          )}

          {/* ── 3. Floating golden motes ── */}
          <div className="absolute inset-0 z-[2] pointer-events-none">
            {motes.map((m) => (
              <motion.div
                key={m.id}
                className="absolute rounded-full"
                style={{
                  left: `${m.x}%`,
                  width: m.size,
                  height: m.size,
                  background: `radial-gradient(circle, rgba(212,185,140,${m.opacity}) 0%, transparent 70%)`,
                }}
                initial={{ y: `${m.startY}vh`, opacity: 0 }}
                animate={{
                  y: [`${m.startY}vh`, `${m.startY - 110}vh`],
                  x: [0, m.drift, 0],
                  opacity: [0, m.opacity, m.opacity, 0],
                }}
                transition={{
                  duration: m.duration,
                  delay: m.delay,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.15, 0.85, 1],
                }}
              />
            ))}
          </div>

          {/* ── 4. LEFT GATE ── */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 z-[10]"
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
            }}
            initial={{ rotateY: 0 }}
            animate={isOpening ? { rotateY: -88 } : { rotateY: 0 }}
            transition={{ duration: SWING, ease: EASE_GATE }}
          >
            {/* Gate panel */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/gate-panel.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#231c12",
              }}
            />
            {/* Embossed depth overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(212,185,140,0.06) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)",
              }}
            />
            {/* Inner edge gold highlight */}
            <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-[#d4b98c]/40 to-transparent" />
            {/* Drop shadow on the inner edge */}
            <div
              className="absolute inset-y-0 right-0 w-8"
              style={{
                background:
                  "linear-gradient(270deg, rgba(0,0,0,0.4) 0%, transparent 100%)",
              }}
            />
          </motion.div>

          {/* ── 5. RIGHT GATE (mirrored) ── */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 z-[10]"
            style={{
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
            }}
            initial={{ rotateY: 0 }}
            animate={isOpening ? { rotateY: 88 } : { rotateY: 0 }}
            transition={{ duration: SWING, ease: EASE_GATE }}
          >
            {/* Gate panel (mirrored) */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/gate-panel.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#231c12",
                transform: "scaleX(-1)",
              }}
            />
            {/* Embossed depth overlay (mirrored direction) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(270deg, rgba(212,185,140,0.06) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)",
              }}
            />
            {/* Inner edge gold highlight */}
            <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[#d4b98c]/40 to-transparent" />
            {/* Drop shadow on the inner edge */}
            <div
              className="absolute inset-y-0 left-0 w-8"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 100%)",
              }}
            />
          </motion.div>

          {/* ── 6. Content overlay (on top of gates) ── */}
          <motion.div
            className="absolute inset-0 z-[20] flex flex-col items-center justify-center pointer-events-none px-8 text-center"
            initial={{ opacity: 0, y: 14 }}
            animate={
              isOpening
                ? { opacity: 0, scale: 0.92, filter: "blur(6px)" }
                : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            }
            transition={
              isOpening
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }
            }
          >
            {/* Top flourish */}
            <Flourish className="w-40 text-[#d4b98c]/50 mb-6" />

            <p className="font-english-body text-[11px] font-light tracking-[0.5em] uppercase text-[#d4b98c]/60">
              The Wedding of
            </p>

            <h1 className="font-english text-[50px] italic leading-[1.05] text-[#ece0cc] mt-5 drop-shadow-[0_2px_12px_rgba(212,185,140,0.3)]">
              Moustafa
            </h1>

            <div className="flex items-center gap-4 my-2">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4b98c]/40" />
              <span className="font-english-body text-[22px] italic text-[#d4b98c]/50">
                &amp;
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4b98c]/40" />
            </div>

            <h1 className="font-english text-[50px] italic leading-[1.05] text-[#ece0cc] drop-shadow-[0_2px_12px_rgba(212,185,140,0.3)]">
              Nihal
            </h1>

            <p className="font-english-body text-[13px] tracking-[0.35em] text-[#d4b98c]/55 mt-6">
              May 2nd, 2026
            </p>

            {/* Bottom flourish */}
            <Flourish className="w-40 text-[#d4b98c]/50 mt-6 rotate-180 mb-8" />

            {/* Open button */}
            <motion.button
              type="button"
              onClick={handleOpen}
              className="pointer-events-auto group relative flex items-center justify-center w-[68px] h-[68px] rounded-full border border-[#d4b98c]/30 bg-[#d4b98c]/[0.08] backdrop-blur-sm"
              whileTap={{ scale: 0.93 }}
              whileHover={{ scale: 1.06 }}
              aria-label="Open the gates"
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[#d4b98c]/25"
                animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              {/* Second offset pulse */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[#d4b98c]/15"
                animate={{ scale: [1, 1.6, 1.6], opacity: [0.3, 0, 0] }}
                transition={{
                  duration: 2.8,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              {/* Envelope icon */}
              <svg
                className="w-5 h-5 text-[#d4b98c] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(212,185,140,0.4)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </motion.button>

            <p className="font-english-body text-[10px] tracking-[0.35em] uppercase text-[#d4b98c]/40 mt-4">
              Open Invitation
            </p>
          </motion.div>

          {/* ── 7. Top & bottom fade (cinematic bars) ── */}
          <div
            className="absolute inset-x-0 top-0 h-24 z-[15] pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(12,10,6,0.7) 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24 z-[15] pointer-events-none"
            style={{
              background:
                "linear-gradient(0deg, rgba(12,10,6,0.7) 0%, transparent 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
