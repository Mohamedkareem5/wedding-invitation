"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Mail } from "lucide-react"

const NUM_FOLDS = 12

export default function TestCurtain() {
  const [isOpening, setIsOpening] = useState(false)

  // Gorgeous Ivory silk gradient for individual folds
  const foldGradientLeft = "linear-gradient(90deg, #fdfaf6 0%, #f4eadc 40%, #decbc0 80%, #d1bea3 100%)"
  const foldGradientRight = "linear-gradient(270deg, #fdfaf6 0%, #f4eadc 40%, #decbc0 80%, #d1bea3 100%)"

  return (
    <div className="w-full h-screen bg-black flex overflow-hidden relative" style={{ perspective: "1500px" }}>
      
      {/* Background Content Behind Curtain */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-5xl">Content Behind Curtain</h1>
      </div>

      {/* Left Curtain */}
      <div className="absolute inset-y-0 left-0 w-1/2 flex justify-start z-10">
        {Array.from({ length: NUM_FOLDS }).map((_, i) => {
          // Inner fold is evaluated from right to left (index 11 is the center-most for Left curtain)
          const isCenterEdge = i === NUM_FOLDS - 1
          const delayOpening = (NUM_FOLDS - 1 - i) * 0.08
          
          return (
            <motion.div
              key={i}
              initial={false}
              animate={isOpening ? {
                width: "1.5%", // Shrink dramatically
                rotateZ: [0, 3 + Math.random() * 2, -2, 1, 0], // Wobbly swing
                skewX: [0, 5 + Math.random() * 3, -3, 1, 0],
                y: [0, -10 - Math.random() * 10, 0]
              } : {
                width: `${100 / NUM_FOLDS}%`,
                rotateZ: 0,
                skewX: 0,
                y: 0
              }}
              transition={{
                width: { type: "spring", stiffness: 40, damping: 12, mass: 1.5, delay: delayOpening },
                rotateZ: { duration: 3.5, ease: "easeInOut", delay: delayOpening },
                skewX: { duration: 3.5, ease: "easeInOut", delay: delayOpening },
                y: { duration: 3.5, ease: "easeInOut", delay: delayOpening }
              }}
              className="h-[110%] -top-[5%] relative origin-top"
              style={{
                backgroundImage: foldGradientLeft,
                boxShadow: "inset -2px 0 10px rgba(60, 50, 40, 0.4)",
                borderRight: isCenterEdge ? "4px solid #7d6e5e" : "1px solid rgba(0,0,0,0.05)"
              }}
            />
          )
        })}
      </div>

      {/* Right Curtain */}
      <div className="absolute inset-y-0 right-0 w-1/2 flex justify-end z-10">
        {Array.from({ length: NUM_FOLDS }).map((_, i) => {
          // For right curtain, index 0 is the center-most
          const isCenterEdge = i === 0
          const delayOpening = i * 0.08

          return (
            <motion.div
              key={i}
              initial={false}
              animate={isOpening ? {
                width: "1.5%", // Shrink
                rotateZ: [0, -3 - Math.random() * 2, 2, -1, 0], // Wobbly swing opposite direction
                skewX: [0, -5 - Math.random() * 3, 3, -1, 0],
                y: [0, -10 - Math.random() * 10, 0]
              } : {
                width: `${100 / NUM_FOLDS}%`,
                rotateZ: 0,
                skewX: 0,
                y: 0
              }}
              transition={{
                width: { type: "spring", stiffness: 40, damping: 12, mass: 1.5, delay: delayOpening },
                rotateZ: { duration: 3.5, ease: "easeInOut", delay: delayOpening },
                skewX: { duration: 3.5, ease: "easeInOut", delay: delayOpening },
                y: { duration: 3.5, ease: "easeInOut", delay: delayOpening }
              }}
              className="h-[110%] -top-[5%] relative origin-top"
              style={{
                backgroundImage: foldGradientRight,
                boxShadow: "inset 2px 0 10px rgba(60, 50, 40, 0.4)",
                borderLeft: isCenterEdge ? "4px solid #7d6e5e" : "1px solid rgba(0,0,0,0.05)"
              }}
            />
          )
        })}
      </div>

      {/* Button */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
         <motion.button
            animate={isOpening ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
            type="button"
            className="pointer-events-auto h-20 w-40 bg-white rounded-lg shadow-xl text-black font-bold"
            onClick={() => setIsOpening(true)}
         >
           TEST OPEN
         </motion.button>
         <motion.button
            animate={isOpening ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            type="button"
            className="pointer-events-auto mt-4 px-4 py-2 bg-white rounded text-black"
            onClick={() => setIsOpening(false)}
         >
           RESET
         </motion.button>
      </div>
    </div>
  )
}
