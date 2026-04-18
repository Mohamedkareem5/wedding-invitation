"use client"

import { motion } from "framer-motion"
import QuoteCard from "./quote-card"

type Chapter = {
  title: string
  body: string
}

const chapters: Chapter[] = [
  {
    title: "كيف التقينا",
    body: "التقت دروبنا في لحظة لم نكن نتوقعها، فتحوّلت الصدفة إلى حديث طويل، ومن حديث إلى مودة، ومن مودة إلى حبٍّ هادئ رافقنا في أيامنا كلها. تعلمنا معًا أن الحب الحقيقي يبدأ بنظرة ويُكمل في القلب.",
  },
  {
    title: "يوم الخطوبة",
    body: 'وبين أهلنا وأحبائنا، قلنا "نعم" لبداية حياةٍ جديدة. وعدٌ صادق، وقلبان عزما على السير معًا، وبركة من الله تضيء الطريق أمامنا.',
  },
  {
    title: "اليوم الكبير",
    body: "واليوم، يسعدنا أن نشارككم فرحة الزفاف، لأن حضوركم هو البركة التي نتمناها، وذكرى تبقى في قلوبنا طوال العمر.",
  },
]

export default function OurStory() {
  return (
    <section className="relative w-full bg-ivory px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="mx-auto max-w-[380px] rounded-[20px] bg-ivory-card px-6 py-10 shadow-[0_20px_50px_-25px_rgba(44,35,24,0.25)]"
      >
        <h3 className="font-display text-center text-[34px] text-brown-deep">
          قصتنا
        </h3>

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

        {chapters.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.1 * i,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="mt-8"
          >
            <p className="font-ui text-[12px] font-bold tracking-[0.22em] text-taupe">
              {c.title}
            </p>
            <p className="font-body mt-3 text-justify text-[15px] leading-[2] text-brown-deep">
              {c.body}
            </p>
          </motion.div>
        ))}
      </motion.div>


    </section>
  )
}
