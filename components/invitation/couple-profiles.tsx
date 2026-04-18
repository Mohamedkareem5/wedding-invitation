"use client"

import { motion } from "framer-motion"

type Profile = {
  firstName: string
  role: string
}

function ProfileBlock({
  profile,
  direction,
}: {
  profile: Profile
  direction: "left" | "right"
}) {
  const x = direction === "left" ? -30 : 30
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="flex flex-col items-center text-center"
    >
      <p className="font-ui text-[11px] tracking-[0.25em] text-taupe">
        {profile.role}
      </p>

      <motion.h4
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="font-display mt-4 text-[52px] leading-none text-brown-deep"
      >
        {profile.firstName}
      </motion.h4>

      <motion.div
        className="mt-3 flex items-center gap-3"
        aria-hidden="true"
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: "auto" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <span className="h-px w-10 bg-taupe-pale" />
        <motion.span
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="h-1.5 w-1.5 bg-taupe-pale"
        />
        <span className="h-px w-10 bg-taupe-pale" />
      </motion.div>

      </motion.div>
  )
}

export default function CoupleProfiles() {
  const groom: Profile = {
    firstName: "مصطفى",
    role: "العريس",
  }
  const bride: Profile = {
    firstName: "نهال",
    role: "العروس",
  }

  return (
    <section className="relative w-full overflow-hidden bg-ivory px-6 py-16">
      <div className="mx-auto flex max-w-[380px] flex-col items-center gap-10">
        <ProfileBlock profile={groom} direction="right" />

        <motion.span
          className="font-display text-[72px] leading-none text-brown-deep"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          &amp;
        </motion.span>

        <ProfileBlock profile={bride} direction="left" />
      </div>
    </section>
  )
}
