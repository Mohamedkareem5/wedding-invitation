"use client"

import { motion } from "framer-motion"
import Image from "next/image"

type Props = {
  revealed: boolean
}

export default function Hero({ revealed }: Props) {
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.14, delayChildren: 0.2 },
    },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <section className="relative flex min-h-[760px] w-full flex-col items-center overflow-hidden bg-ivory-card">
      {/* Floral arch background, blended to remove white backdrop */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={revealed ? { 
          opacity: 1,
          scale: [1, 1.08, 1],
        } : { opacity: 0 }}
        transition={{ 
          opacity: { duration: 2.2, ease: [0.22, 1, 0.36, 1] },
          scale: { 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
          }
        }}
      >
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="430px"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory-card/0 via-ivory-card/5 to-ivory-card/40" />
      </motion.div>

      {/* Top blur fade to hide torn paper edge and gray bg of the card photo */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40" 
        style={{ 
          backdropFilter: 'blur(20px)', 
          WebkitBackdropFilter: 'blur(20px)',
          maskImage: 'linear-gradient(to top, transparent 0%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 100%)'
        }} 
      />
      <div className="pointer-events-none absolute inset-x-0 top-[-2px] z-20 h-40 bg-gradient-to-b from-ivory-card via-ivory-card/95 to-transparent" />

      {/* Bottom blur fade to blend into next section */}
      <div 
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48" 
        style={{ 
          backdropFilter: 'blur(16px)', 
          WebkitBackdropFilter: 'blur(16px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
        }} 
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-2px] z-20 h-48 bg-gradient-to-t from-ivory via-ivory/90 to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        animate={revealed ? "show" : "hidden"}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-[15%] text-center"
        dir="ltr"
      >
        <motion.p
          variants={item}
          className="font-english-body text-[14px] font-light tracking-[0.45em] uppercase text-brown-muted/70"
        >
          The Wedding of
        </motion.p>

        <div className="mt-6 flex flex-col items-center">
          <motion.h2
            variants={item}
            className="font-english text-[58px] font-medium italic leading-[1.1] text-brown-deep/90 drop-shadow-sm"
          >
            Moustafa
          </motion.h2>

          <motion.div
            variants={item}
            className="my-2 flex items-center gap-5"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-taupe-pale/50" />
            <span className="font-english-body text-[28px] italic text-taupe/50">&amp;</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-taupe-pale/50" />
          </motion.div>

          <motion.h2
            variants={item}
            className="font-english text-[58px] font-medium italic leading-[1.1] text-brown-deep/90 drop-shadow-sm"
          >
            Nihal
          </motion.h2>
        </div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-taupe-pale to-transparent opacity-40" />
          
          <p className="font-english-body text-[16px] font-light tracking-[0.3em] text-taupe/80">
            May 2nd, 2026
          </p>

          <div className="h-px w-20 bg-gradient-to-r from-transparent via-taupe-pale to-transparent opacity-40" />
        </motion.div>

        {/* Decorative rotating diamond */}
        <motion.div
          variants={item}
          className="mt-10"
          aria-hidden="true"
        >
          <motion.span
            animate={{ rotate: [0, 180, 360] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="block h-2 w-2 bg-taupe/30"
            style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
