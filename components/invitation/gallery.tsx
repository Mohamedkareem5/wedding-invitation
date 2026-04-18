"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const left = [
  {
    src: "/couple-hands-1.jpg",
    alt: "Ring exchange moment",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/couple-rings.jpg",
    alt: "Wedding rings",
    aspect: "aspect-square",
  },
]
const right = [
  {
    src: "/couple-hands-2.jpg",
    alt: "Couple holding hands",
    aspect: "aspect-[3/5]",
  },
]

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function Gallery() {
  const col = (delay: number) => ({
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: delay } },
  })

  return (
    <section className="relative w-full bg-ivory px-6 py-14">
      <motion.h3
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="font-display text-center text-[34px] text-brown-deep"
      >
        لحظات نحبّها
      </motion.h3>
      <motion.div
        className="mx-auto mt-2 flex items-center justify-center gap-3"
        aria-hidden="true"
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: "auto" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="h-px w-8 bg-taupe-pale" />
        <span
          className="h-1.5 w-1.5 bg-taupe"
          style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}
        />
        <span className="h-px w-8 bg-taupe-pale" />
      </motion.div>
      {/* Removed redundant subtitle */}

      <div className="relative mx-auto mt-8 grid max-w-[380px] grid-cols-2 gap-3 overflow-hidden">
        {/* Top Fade for Gallery */}
        <div 
          className="absolute inset-x-0 top-0 h-24 z-10 pointer-events-none" 
          style={{ 
            backdropFilter: 'blur(8px)', 
            WebkitBackdropFilter: 'blur(8px)',
            maskImage: 'linear-gradient(to top, transparent 0%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 100%)'
          }} 
        />
        <div className="absolute inset-x-0 top-0 h-24 z-10 bg-gradient-to-b from-ivory to-transparent" />

        {/* Bottom Fade for Gallery */}
        <div 
          className="absolute inset-x-0 bottom-0 h-24 z-10 pointer-events-none" 
          style={{ 
            backdropFilter: 'blur(8px)', 
            WebkitBackdropFilter: 'blur(8px)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
          }} 
        />
        <div className="absolute inset-x-0 bottom-0 h-24 z-10 bg-gradient-to-t from-ivory to-transparent" />

        <motion.div
          variants={col(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-3"
        >
          {left.map((img) => (
            <motion.div
              key={img.src}
              variants={item}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`relative ${img.aspect} w-full overflow-hidden rounded-[6px]`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-[1200ms] hover:scale-105"
                sizes="180px"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={col(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-3"
        >
          {right.map((img) => (
            <motion.div
              key={img.src}
              variants={item}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`relative ${img.aspect} w-full overflow-hidden rounded-[6px]`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-[1200ms] hover:scale-105"
                sizes="180px"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
