"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Send, Check } from "lucide-react"

type Wish = { name: string; message: string; attendance: string }

const PROFANITY_LIST = ["badword", "شتم", "لعن", "سيء", "قبيح", "idiot", "stupid", "dumb"]

function containsProfanity(text: string) {
  const lower = text.toLowerCase()
  return PROFANITY_LIST.some((word) => lower.includes(word))
}

export default function Rsvp() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [form, setForm] = useState<Wish>({
    name: "",
    message: "",
    attendance: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!form.name.trim() || !form.message.trim() || !form.attendance) return

    if (containsProfanity(form.name) || containsProfanity(form.message)) {
      setError("الرجاء استخدام كلمات لائقة في رسالتك.")
      return
    }

    setWishes((prev) => [form, ...prev])
    setForm({ name: "", message: "", attendance: "" })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2400)
  }

  return (
    <section className="relative w-full bg-ivory px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative mx-auto max-w-[380px] text-center"
      >
        <h3 className="font-display text-[34px] text-brown-deep">
          تأكيد الحضور
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
        <p className="font-body mt-4 text-[14px] leading-[2] text-brown-muted">
          شاركونا فرحتنا وأرسلوا لنا كلمة تبقى في القلب.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-3 text-right">
          <input
            type="text"
            required
            maxLength={40}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="الاسم الكريم"
            className="font-body w-full rounded-full border border-taupe-pale bg-ivory-card px-5 py-3.5 text-[14px] text-brown-deep placeholder:text-taupe-pale focus:border-taupe focus:outline-none"
          />
          <textarea
            required
            rows={4}
            maxLength={180}
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            placeholder="أمنية أو كلمة جميلة للعروسين"
            className="font-body w-full resize-none rounded-[16px] border border-taupe-pale bg-ivory-card px-5 py-3.5 text-[14px] leading-[1.9] text-brown-deep placeholder:text-taupe-pale focus:border-taupe focus:outline-none"
          />
          {error && <p className="text-[12px] text-red-500 mt-1">{error}</p>}
          <select
            required
            value={form.attendance}
            onChange={(e) =>
              setForm((f) => ({ ...f, attendance: e.target.value }))
            }
            className="font-body w-full appearance-none rounded-full border border-taupe-pale bg-ivory-card px-5 py-3.5 text-[14px] text-brown-deep focus:border-taupe focus:outline-none"
          >
            <option value="" disabled>
              حالة الحضور
            </option>
            <option value="سأحضر">سأحضر بإذن الله</option>
            <option value="لن أحضر">لن أتمكن من الحضور</option>
            <option value="لم أقرر">لم أقرر بعد</option>
          </select>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="font-ui inline-flex w-full items-center justify-center gap-2 rounded-full bg-taupe px-6 py-3.5 text-[13px] font-bold tracking-[0.1em] text-ivory-card"
          >
            {submitted ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" /> شكرًا لك
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" /> إرسال
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-10 space-y-3 text-right">
          <AnimatePresence initial={false}>
            {wishes.map((w, i) => (
              <motion.div
                key={`${w.name}-${i}-${w.message.slice(0, 6)}`}
                layout
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="rounded-[16px] border border-taupe-pale/50 bg-ivory-card px-5 py-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-ui text-[13px] font-bold tracking-[0.05em] text-brown-deep">
                    {w.name}
                  </p>
                  <span className="font-ui text-[10px] tracking-[0.15em] text-taupe">
                    {w.attendance}
                  </span>
                </div>
                <p className="font-body mt-2 text-[14px] leading-[1.9] text-brown-muted">
                  {w.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
