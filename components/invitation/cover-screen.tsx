"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Mail } from "lucide-react"
import Image from "next/image"

type Props = {
  onOpen: () => void
  dismissing: boolean
}

export default function CoverScreen({ onOpen, dismissing }: Props) {
  return (
    <AnimatePresence>
      {!dismissing && (
        <motion.section
          key="cover"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-ivory-card"
          role="dialog"
          aria-label="دعوة الزفاف"
        >
          {/* Floral arch background — blended so the white disappears */}
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/floral-arch.jpg"
              alt=""
              fill
              priority
              className="floral-blend-soft object-cover object-top"
              sizes="430px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ivory-card/0 via-ivory-card/20 to-ivory-card/80" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1] as const,
              delay: 0.25,
            }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            <p className="font-ui text-[11px] font-medium tracking-[0.25em] text-taupe">
              دعوة زفاف
            </p>

            <h1 className="font-display mt-6 text-[56px] leading-none text-brown-deep">
              مصطفى
            </h1>
            <span className="font-display my-1 text-[32px] text-taupe">&amp;</span>
            <h1 className="font-display text-[56px] leading-none text-brown-deep">
              نهال
            </h1>

            <p className="font-ui num-ar mt-8 text-[13px] tracking-[0.22em] text-brown-muted">
              ٢ . ٠٥ . ٢٠٢٦
            </p>

            <div className="mt-10">
              <p className="font-body text-[13px] text-brown-muted">إلى</p>
              <p className="font-body mt-1 text-[16px] text-brown-deep">
                ضيفنا العزيز
              </p>
            </div>

            <motion.button
              type="button"
              onClick={onOpen}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              className="font-ui mt-10 inline-flex items-center gap-2 rounded-full bg-taupe px-8 py-3.5 text-[13px] font-bold tracking-[0.12em] text-ivory-card shadow-lg shadow-brown-deep/20"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              افتح الدعوة
            </motion.button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
