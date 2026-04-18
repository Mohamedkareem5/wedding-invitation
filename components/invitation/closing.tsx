"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Instagram, MessageCircle } from "lucide-react"

export default function Closing() {
  return (
    <section className="relative w-full overflow-hidden bg-ivory-card">
      <div className="relative aspect-[3/4] w-full">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Image
            src="/closing-arch.jpg"
            alt=""
            fill
            className="floral-blend-soft object-cover"
            sizes="430px"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ivory-card/0 via-ivory-card/30 to-ivory-card/90" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative -mt-28 px-6 pb-10 text-center"
      >
        <p className="font-body mx-auto max-w-[330px] text-[15px] leading-[2] text-brown-deep">
          بقلوب ممتنة وابتسامات حرّى، ندعوكم لمشاركتنا فرحتنا. حضوركم يكمل
          تفاصيل يومنا ويصنع ذكرى لا تُنسى.
        </p>

        <p className="font-ui mt-6 text-[11px] tracking-[0.3em] text-taupe">
          بمحبة
        </p>
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          whileInView={{ opacity: 1, letterSpacing: "0em" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-display mt-3 text-[40px] leading-tight text-brown-deep"
        >
          مصطفى &amp; نهال
        </motion.p>
      </motion.div>

      <footer className="relative border-t border-taupe-pale/50 bg-ivory-card px-6 py-6 text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-[24px] text-brown-deep"
        >
          M &amp; N
        </motion.p>
        <div className="mt-3 flex items-center justify-center gap-4">
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="انستغرام"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-taupe text-ivory-card"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
          </motion.a>
          <motion.a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="واتساب"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-taupe text-ivory-card"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </motion.a>
        </div>
        <p className="font-ui mt-5 text-[10px] tracking-[0.2em] text-taupe">
          بطاقة دعوة رقمية
        </p>
        <p className="font-ui num-ar mt-1 text-[10px] tracking-[0.2em] text-taupe">
          © ٢٠٢٦ جميع الحقوق محفوظة
        </p>
      </footer>
    </section>
  )
}
