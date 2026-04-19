"use client"

import { motion } from "framer-motion"
import { Heart, MapPin, Shirt, Sparkles } from "lucide-react"

const MAPS_URL = "https://maps.app.goo.gl/321P9soTgKZTy9Q46?g_st=iw"

import Image from "next/image"

function EventCard() {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-t-[180px] rounded-b-[24px] border border-taupe-pale bg-ivory-card pb-8 shadow-sm"
    >
      <a href={MAPS_URL} target="_blank" rel="noreferrer noopener" className="group block relative h-[240px] w-full overflow-hidden">
        <Image src="/venue-map.png" alt="Venue location" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="360px" />
        <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/5" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-card/90 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <MapPin className="h-5 w-5 text-taupe" />
          </div>
        </div>
      </a>
      
      <div className="px-6 pt-8 text-center">
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          <Heart className="mx-auto h-4 w-4 text-taupe" aria-hidden="true" />
        </motion.span>
        <h3 className="font-display mt-3 text-[26px] text-brown-deep">
          Fairy Garden Lake Venue
        </h3>

        <motion.div
          className="mx-auto mt-3 flex items-center justify-center gap-3"
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

        <p className="font-ui num-ar mt-4 text-[14px] font-bold tracking-[0.08em] text-brown-deep">
          السبت، ٢ مايو ٢٠٢٦
        </p>
        <p className="font-ui num-ar mt-1 text-[13px] text-brown-muted">
          الساعة ٥:٠٠ مساءً
        </p>
      </div>
    </motion.article>
  )
}

function DressCodeCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.1,
      }}
      className="mx-auto w-full max-w-[360px] rounded-[24px] border border-taupe-pale bg-ivory-card px-6 py-8 text-center"
    >
      <motion.span
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block"
      >
        <Sparkles className="mx-auto h-4 w-4 text-taupe" aria-hidden="true" />
      </motion.span>
      <h3 className="font-display mt-3 text-[28px] text-brown-deep">
        Dress Code
      </h3>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="rounded-[16px] border border-taupe-pale/60 bg-ivory px-4 py-5"
        >
          <Shirt
            className="mx-auto h-5 w-5 text-taupe"
            aria-hidden="true"
          />
          <p className="font-ui mt-3 text-[11px] tracking-[0.18em] text-taupe uppercase">
            Gentlemen
          </p>
          <p className="font-body mt-2 text-[14px] leading-[1.8] text-brown-deep">
            Formal Suit
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="rounded-[16px] border border-taupe-pale/60 bg-ivory px-4 py-5"
        >
          <Sparkles
            className="mx-auto h-5 w-5 text-taupe"
            aria-hidden="true"
          />
          <p className="font-ui mt-3 text-[11px] tracking-[0.18em] text-taupe uppercase">
            Ladies
          </p>
          <p className="font-body mt-2 text-[14px] leading-[1.8] text-brown-deep">
            Evening Gown
          </p>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default function EventDetails() {
  return (
    <section className="relative w-full bg-ivory px-6 py-10">
      <div className="flex flex-col gap-8">
        <EventCard />
        <DressCodeCard />
      </div>
    </section>
  )
}
