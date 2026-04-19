"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback } from "react"

/* ── Constants ─────────────────────────────────────────── */
const ENV_W = 280
const ENV_H = 200
const CX = ENV_W / 2
const CY = ENV_H / 2

/* ── Component ─────────────────────────────────────────── */
type Props = { onComplete: () => void }

export default function WaxEnvelope({ onComplete }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "card" | "done">("idle")
  const [flapBehind, setFlapBehind] = useState(false)

  const handleTap = useCallback(() => {
    if (phase !== "idle") return
    setPhase("opening")
    // Delay z-index switch until flap rotates past 90° (~350ms into 700ms animation)
    setTimeout(() => setFlapBehind(true), 350)
    setTimeout(() => setPhase("card"), 700)
    setTimeout(() => {
      setPhase("done")
      setTimeout(onComplete, 100)
    }, 2400)
  }, [phase, onComplete])

  const isOpening = phase === "opening" || phase === "card" || phase === "done"
  const isCardOut = phase === "card" || phase === "done"

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="wax-envelope"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-8 overflow-hidden"
          style={{ backgroundColor: "#f5f0e8" }}
        >
          {/* ── Watercolor floral background ── */}
          <div className="pointer-events-none absolute inset-0">
            <img
              src="/envelope-bg.png"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* ── Label above envelope ── */}
          <motion.p
            className="relative z-10 font-english-body text-[11px] font-light tracking-[0.4em] uppercase select-none text-brown-muted/60"
            initial={{ opacity: 0, y: 22 }}
            animate={
              isOpening
                ? { opacity: 0, y: -10 }
                : { opacity: 1, y: 0 }
            }
            transition={
              isOpening
                ? { duration: 0.3 }
                : { duration: 1, ease: "easeOut", delay: 0.5 }
            }
          >
            You are cordially invited
          </motion.p>

          {/* ── Envelope + Card assembly ── */}
          <div
            className="relative z-10 cursor-pointer"
            style={{ width: ENV_W, height: ENV_H }}
            onClick={handleTap}
          >
            {/*
              Z-layer order (bottom to top):
              z-[1] = Gold inner lining (background rect)
              z-[2] = Card (sits on lining, hidden by folds)
              z-[3] = Left, Right, Bottom fold triangles (cover the card)
              z-[4] = Top flap triangle (covers card, rotates open)
              z-[5] = Wax seal
            */}

            {/* ── z-[1]: INNER LINING (gold background) ── */}
            <svg
              className="absolute top-0 left-0 z-[1]"
              width={ENV_W}
              height={ENV_H}
              viewBox={`0 0 ${ENV_W} ${ENV_H}`}
              style={{
                filter: "drop-shadow(0 15px 40px rgba(44,35,24,0.25))",
              }}
            >
              <rect width={ENV_W} height={ENV_H} rx="4" fill="#f0e7d8" />
              <rect
                width={ENV_W}
                height={ENV_H}
                rx="4"
                fill="none"
                stroke="rgba(125,110,94,0.3)"
                strokeWidth="1"
              />
            </svg>

            {/* ── z-[2]: CARD (inside the envelope, between lining and folds) ── */}
            {/* Clip container: extends 300px above but clips at bottom of envelope */}
            <div
              className="absolute z-[2] overflow-hidden pointer-events-none"
              style={{
                left: 16,
                right: 16,
                top: -300,
                bottom: 8,
              }}
            >
              <motion.div
                className="absolute left-0 right-0 rounded-[2px]"
                style={{
                  bottom: 0,
                  height: 175,
                  background: "linear-gradient(175deg, #fdfaf6 0%, #f5ede0 100%)",
                  boxShadow: "0 -4px 16px rgba(44,35,24,0.12)",
                }}
                initial={{ y: 0 }}
                animate={isCardOut ? { y: -100 } : { y: 0 }}
                transition={{
                  duration: 1.0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Gold inner border */}
                <div
                  className="absolute inset-[4px] rounded-[1px]"
                  style={{ border: "1px solid rgba(196,181,165,0.22)" }}
                />

                {/* Card content */}
                <div className="flex flex-col items-center justify-center h-full px-4 text-center">
                  <div className="w-10 h-px bg-gradient-to-r from-transparent via-taupe-pale/50 to-transparent mb-3" />
                  <p className="font-english-body text-[8px] font-light tracking-[0.45em] uppercase text-taupe/40">
                    The Wedding of
                  </p>
                  <h2 className="font-english text-[28px] italic text-brown-deep/80 mt-1.5 leading-[1.1] drop-shadow-sm">
                    Moustafa
                  </h2>
                  <span className="font-english-body text-[14px] italic text-taupe/35 my-px">
                    &amp;
                  </span>
                  <h2 className="font-english text-[28px] italic text-brown-deep/80 leading-[1.1] drop-shadow-sm">
                    Nihal
                  </h2>
                  <p className="font-english-body text-[9px] tracking-[0.3em] text-taupe/45 mt-2">
                    May 2nd, 2026
                  </p>
                  <div className="w-10 h-px bg-gradient-to-r from-transparent via-taupe-pale/50 to-transparent mt-3" />
                </div>
              </motion.div>
            </div>

            {/* ── z-[3]: FOLD TRIANGLES (left, right, bottom — cover the card) ── */}
            <svg
              className="absolute top-0 left-0 z-[3] pointer-events-none"
              width={ENV_W}
              height={ENV_H}
              viewBox={`0 0 ${ENV_W} ${ENV_H}`}
            >
              {/* Left triangle fold */}
              <polygon points={`0,0 0,${ENV_H} ${CX},${CY}`} fill="#dcc9a8" />
              {/* Right triangle fold */}
              <polygon points={`${ENV_W},0 ${ENV_W},${ENV_H} ${CX},${CY}`} fill="#c8b48e" />
              {/* Bottom triangle fold */}
              <polygon points={`0,${ENV_H} ${ENV_W},${ENV_H} ${CX},${CY}`} fill="#c0a880" />
            </svg>

            {/* ── TOP FLAP (covers card, rotates open) ── */}
            <motion.div
              className={`absolute top-0 left-0 ${flapBehind ? "z-[1]" : "z-[4]"}`}
              style={{
                width: ENV_W,
                height: ENV_H,
                transformOrigin: "top center",
              }}
              initial={{ rotateX: 0 }}
              animate={isOpening ? { rotateX: -175 } : { rotateX: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <svg
                width={ENV_W}
                height={ENV_H}
                viewBox={`0 0 ${ENV_W} ${ENV_H}`}
              >
                <polygon points={`0,0 ${ENV_W},0 ${CX},${CY}`} fill="#e8dcc8" />
                <line
                  x1="0" y1="0" x2={CX} y2={CY}
                  stroke="rgba(125,110,94,0.2)" strokeWidth="0.5"
                />
                <line
                  x1={ENV_W} y1="0" x2={CX} y2={CY}
                  stroke="rgba(125,110,94,0.2)" strokeWidth="0.5"
                />
              </svg>
            </motion.div>

            {/* ── z-[5]: WAX SEAL ── */}
            <motion.div
              className="absolute z-[5]"
              style={{
                top: "50%",
                left: "50%",
                marginTop: -22,
                marginLeft: -26,
                width: 52,
                height: 52,
              }}
              animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
              transition={
                isOpening
                  ? { duration: 0.2, ease: "easeOut" }
                  : {}
              }
            >
              <motion.div
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #c4b5a5, #7d6e5e)",
                  boxShadow:
                    "0 2px 12px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)",
                }}
                whileHover={phase === "idle" ? { scale: 1.08 } : undefined}
              >
                <span
                  className="font-english text-[15px] italic select-none"
                  style={{ color: "#2c2318", fontWeight: 500 }}
                >
                  M&amp;N
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Tap hint ── */}
          <motion.p
            className="relative z-10 font-english text-[16px] italic select-none text-brown-muted/50"
            initial={{ opacity: 0, y: 22 }}
            animate={
              isOpening
                ? { opacity: 0, y: -10 }
                : { opacity: [0, 0.5, 0.8, 0.5], y: 0 }
            }
            transition={
              isOpening
                ? { duration: 0.3 }
                : {
                    opacity: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.4,
                    },
                    y: { duration: 1, ease: "easeOut", delay: 1.4 },
                  }
            }
          >
            tap to open
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
