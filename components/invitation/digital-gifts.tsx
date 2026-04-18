"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Gift, Copy, Check, MapPin } from "lucide-react"
import { useState } from "react"

type BankEntry = {
  bank: string
  account: string
  holder: string
}

const banks: BankEntry[] = [
  { bank: "البنك الأهلي", account: "1234 5678 9012 3456", holder: "مصطفى" },
  { bank: "بنك مصر", account: "9876 5432 1098 7654", holder: "نهال" },
]

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ""))
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // noop
    }
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="font-ui mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-taupe px-4 py-2.5 text-[12px] font-semibold tracking-[0.05em] text-ivory-card"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden="true" /> تم النسخ
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" aria-hidden="true" /> نسخ رقم الحساب
        </>
      )}
    </button>
  )
}

export default function DigitalGifts() {
  const [open, setOpen] = useState(false)

  return (
    <section className="relative w-full bg-ivory px-6 py-14">
      <div className="mx-auto max-w-[380px] text-center">
        <h3 className="font-display text-[34px] text-brown-deep">هدية</h3>
        <p className="font-body mt-2 text-[14px] leading-[2] text-brown-muted">
          حضوركم هو أجمل هدية يمكن أن نتلقاها. وإن أردتم إرسال هدية رمزية،
          يمكنكم الاطلاع على التفاصيل أدناه.
        </p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="font-ui mt-6 inline-flex items-center gap-2 rounded-full bg-taupe px-6 py-3 text-[13px] font-bold tracking-[0.1em] text-ivory-card"
        >
          <Gift className="h-4 w-4" aria-hidden="true" />
          {open ? "إخفاء التفاصيل" : "إرسال هدية"}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="gifts"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-4 text-right">
                {banks.map((b) => (
                  <div
                    key={b.bank}
                    className="rounded-[16px] bg-ivory-card px-5 py-5"
                  >
                    <p className="font-ui text-[13px] font-bold tracking-[0.05em] text-brown-deep">
                      {b.bank}
                    </p>
                    <p className="font-body mt-2 text-[14px] text-brown-deep">
                      رقم الحساب:{" "}
                      <span className="font-ui tabular-nums tracking-[0.06em]">
                        {b.account}
                      </span>
                    </p>
                    <p className="font-ui mt-1 text-[13px] font-bold text-brown-deep">
                      باسم: {b.holder}
                    </p>
                    <CopyButton value={b.account} />
                  </div>
                ))}

                <div className="rounded-[16px] bg-ivory-card px-5 py-5">
                  <div className="flex items-center gap-2">
                    <MapPin
                      className="h-4 w-4 text-taupe"
                      aria-hidden="true"
                    />
                    <p className="font-ui text-[13px] font-bold tracking-[0.05em] text-brown-deep">
                      عنوان مراسلة الهدايا:
                    </p>
                  </div>
                  <p className="font-body mt-2 text-[13px] leading-[1.9] text-brown-muted">
                    يُرجى التواصل مع أحد أفراد العائلة لتنسيق إرسال الهدية.
                  </p>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="font-ui inline-flex items-center gap-2 rounded-full border-[1.5px] border-brown-deep bg-transparent px-6 py-2 text-[12px] font-semibold tracking-[0.08em] text-brown-deep"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
