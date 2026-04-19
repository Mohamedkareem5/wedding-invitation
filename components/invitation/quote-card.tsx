"use client"

import { motion } from "framer-motion"

export default function QuoteCard() {
  return (
    <section className="relative w-full bg-ivory px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative mx-auto max-w-[380px] rounded-[20px] bg-ivory-card px-6 py-10 shadow-[0_20px_50px_-25px_rgba(44,35,24,0.35)]"
      >
        {/* Decorative frame lines */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 rounded-[14px] border border-taupe-pale/60"
        />

        {/* Bismillah */}
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-[22px] leading-[2] text-brown-deep"
          style={{ fontFamily: "var(--font-amiri), 'Amiri', serif" }}
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-2 mt-3"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="h-px w-8 bg-taupe-pale" />
          <span
            className="h-1.5 w-1.5 bg-taupe"
            style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}
          />
          <span className="h-px w-8 bg-taupe-pale" />
        </motion.div>

        {/* Quran verse with full tashkeel */}
        <p
          className="mt-5 text-center text-[20px] leading-[2.4] text-brown-deep"
          style={{ fontFamily: "var(--font-amiri), 'Amiri', serif" }}
        >
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
        </p>

        <p className="font-ui mt-5 text-center text-[12px] tracking-[0.12em] text-taupe">
          سورة الروم — آية ٢١
        </p>
      </motion.div>
    </section>
  )
}
