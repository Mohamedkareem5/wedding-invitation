"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import Hero from "@/components/invitation/hero"
import QuoteCard from "@/components/invitation/quote-card"
import SaveTheDate from "@/components/invitation/save-the-date"
import EventDetails from "@/components/invitation/event-details"
import CouplePhoto from "@/components/invitation/couple-photo"
import OurStory from "@/components/invitation/our-story"
import Gallery from "@/components/invitation/gallery"

import Footer from "@/components/invitation/footer"
import MusicButton from "@/components/invitation/music-button"
import WaxEnvelope from "@/components/invitation/wax-envelope"

export default function Page() {
  const [opened, setOpened] = useState(false)

  const handleEnvelopeComplete = useCallback(() => {
    // Start music on envelope open (user gesture = browser allows autoplay)
    const audio = document.getElementById("bg-audio") as HTMLAudioElement | null
    if (audio) {
      audio.muted = false
      audio.volume = 0.45
      audio.currentTime = 12
      audio.play().catch(() => {})
    }
    setOpened(true)
  }, [])

  return (
    <main className="min-h-screen w-full bg-ivory">
      {/* Phone-shaped container, centered on desktop */}
      <div
        className={[
          "phone-shell relative mx-auto w-full max-w-[430px] bg-ivory-card overflow-hidden",
          "shadow-[0_40px_80px_-30px_rgba(44,35,24,0.35)]",
        ].join(" ")}
        style={{ height: "100dvh", maxHeight: "900px" }}
      >
        {/* Main content — fades in after envelope opens */}
        <motion.div
          className="relative h-full overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: opened ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Hero revealed={opened} />
          <QuoteCard />
          <CouplePhoto />
          <SaveTheDate />
          <EventDetails />
          <OurStory />
          <Gallery />

          <Footer />
        </motion.div>

        {/* Envelope overlay */}
        {!opened && (
          <WaxEnvelope onComplete={handleEnvelopeComplete} />
        )}

        {/* Music toggle button */}
        <MusicButton />
      </div>
    </main>
  )
}
