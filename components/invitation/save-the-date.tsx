"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CalendarPlus } from "lucide-react"
import { useEffect, useState } from "react"

// May 2, 2026 — 8:00 PM local time
const WEDDING_DATE = new Date("2026-05-02T20:00:00")

function useCountdown(target: Date) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    setTime(computeRemaining(target))
    const id = setInterval(() => setTime(computeRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return time
}

function computeRemaining(target: Date) {
  const total = Math.max(0, target.getTime() - Date.now())
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((total / (1000 * 60)) % 60)
  const seconds = Math.floor((total / 1000) % 60)
  return { days, hours, minutes, seconds }
}

function Tile({ value, label }: { value: number; label: string }) {
  const padded = value.toString().padStart(2, "0")
  return (
    <div className="flex min-w-[72px] flex-col items-center justify-center rounded-[12px] bg-taupe px-4 py-4 text-ivory-card">
      <div className="relative h-[32px] w-full overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={padded}
            initial={{ y: -32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-ui absolute inset-0 flex items-center justify-center text-[32px] font-bold leading-none tabular-nums"
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-ui mt-2 text-[10px] tracking-[0.2em]">
        {label}
      </span>
    </div>
  )
}

export default function SaveTheDate() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE)

  const handleAddToCalendar = () => {
    const start = "20260502T170000Z" // 8 PM Cairo (UTC+3) => 5 PM UTC
    const end = "20260502T230000Z"
    const title = encodeURIComponent("Wedding of Moustafa & Nihal")
    const details = encodeURIComponent(
      "We would be honored by your presence at our wedding celebration."
    )
    const location = encodeURIComponent("https://maps.app.goo.gl/321P9soTgKZTy9Q46")
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="relative w-full overflow-hidden bg-ivory px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative mx-auto flex max-w-[360px] flex-col items-center rounded-t-[200px] rounded-b-[20px] border border-taupe-pale/70 bg-ivory-card px-6 pb-10 pt-14"
      >
        <p className="font-ui num-ar text-[12px] tracking-[0.22em] text-taupe">
          السبت، ٢ مايو ٢٠٢٦
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Tile value={days} label="يوم" />
          <Tile value={hours} label="ساعة" />
          <Tile value={minutes} label="دقيقة" />
          <Tile value={seconds} label="ثانية" />
        </div>

        <motion.button
          type="button"
          onClick={handleAddToCalendar}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="font-ui mt-8 inline-flex items-center gap-2 rounded-full border-[1.5px] border-brown-deep bg-transparent px-5 py-2.5 text-[12px] font-semibold tracking-[0.08em] text-brown-deep"
        >
          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
          أضف إلى التقويم
        </motion.button>
      </motion.div>
    </section>
  )
}
