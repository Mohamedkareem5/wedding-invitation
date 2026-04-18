"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function CouplePhoto() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative w-full bg-ivory"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Image
            src="/couple-hands-2.jpg"
            alt="Couple photo"
            fill
            className="object-cover"
            sizes="430px"
          />
        </motion.div>
        <div 
          className="absolute inset-x-0 bottom-0 h-48 z-10 pointer-events-none" 
          style={{ 
            backdropFilter: 'blur(16px)', 
            WebkitBackdropFilter: 'blur(16px)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
          }} 
        />
        <div className="absolute inset-x-0 bottom-[-2px] h-48 z-10 bg-gradient-to-t from-ivory via-ivory/90 to-transparent" />

        {/* Top Fade - More aggressive to hide the sharp edge */}
        <div 
          className="absolute inset-x-0 top-0 h-64 z-20 pointer-events-none" 
          style={{ 
            backdropFilter: 'blur(20px)', 
            WebkitBackdropFilter: 'blur(20px)',
            maskImage: 'linear-gradient(to top, transparent 0%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 100%)'
          }} 
        />
        <div className="absolute inset-x-0 top-[-2px] h-64 z-20 bg-gradient-to-b from-ivory via-ivory/95 to-transparent" />

        <motion.div
          className="absolute inset-x-0 bottom-6 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="font-english text-[28px] italic text-brown-deep drop-shadow-sm" dir="ltr">
            Together Forever
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
