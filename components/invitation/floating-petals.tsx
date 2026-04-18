"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

type Petal = {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  drift: number
  rotateFrom: number
  rotateTo: number
  opacity: number
}

function buildPetals(count: number): Petal[] {
  const out: Petal[] = []
  for (let i = 0; i < count; i++) {
    out.push({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 10,
      delay: Math.random() * 10,
      duration: 14 + Math.random() * 10,
      drift: (Math.random() - 0.5) * 80,
      rotateFrom: Math.random() * 180,
      rotateTo: Math.random() * 360 + 180,
      opacity: 0.35 + Math.random() * 0.35,
    })
  }
  return out
}

export default function FloatingPetals() {
  const petals = useMemo(() => buildPetals(14), [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {petals.map((p) => (
        <motion.span
          key={p.id}
          initial={{
            y: "-10%",
            x: 0,
            rotate: p.rotateFrom,
            opacity: 0,
          }}
          animate={{
            y: "110%",
            x: p.drift,
            rotate: p.rotateTo,
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.9, 1],
          }}
          className="absolute"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            <path
              d="M12 3c3 4 6 6 6 10a6 6 0 1 1-12 0c0-4 3-6 6-10z"
              fill="#e9c7c2"
              fillOpacity="0.85"
            />
            <path
              d="M12 6c1.6 2.4 3.2 3.6 3.2 6a3.2 3.2 0 1 1-6.4 0c0-2.4 1.6-3.6 3.2-6z"
              fill="#f4dcd7"
              fillOpacity="0.85"
            />
          </svg>
        </motion.span>
      ))}
    </div>
  )
}
