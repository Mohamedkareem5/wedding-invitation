"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="w-full bg-[#2a241e] px-6 py-14 text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center"
      >
        <h2 className="font-english text-[36px] italic text-[#dda77b] mb-4 flex gap-3 items-center justify-center" dir="ltr">
          <span>Moustafa</span>
          <span className="font-english-body text-[24px] italic opacity-70">&amp;</span>
          <span>Nihal</span>
        </h2>
        
        <p className="font-english-body text-[13px] tracking-[0.2em] text-[#dda77b]/80 mb-8" dir="ltr">
          02 . 05 . 2026
        </p>
        
        <div className="h-px w-12 bg-white/10 mb-8" />
        
        <p className="font-ui text-[11px] tracking-[0.1em] text-white/40">
          بكل الحب — لا تكتمل فرحتنا إلا بحضوركم
        </p>
      </motion.div>
    </footer>
  )
}
