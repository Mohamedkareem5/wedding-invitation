"use client"

import Hero from "@/components/invitation/hero"
import QuoteCard from "@/components/invitation/quote-card"
import SaveTheDate from "@/components/invitation/save-the-date"
import EventDetails from "@/components/invitation/event-details"
import CouplePhoto from "@/components/invitation/couple-photo"
import OurStory from "@/components/invitation/our-story"
import Gallery from "@/components/invitation/gallery"
import Rsvp from "@/components/invitation/rsvp"
import Footer from "@/components/invitation/footer"
import MusicButton from "@/components/invitation/music-button"

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-ivory">
      {/* Phone-shaped container, centered on desktop */}
      <div
        className={[
          "phone-shell relative mx-auto w-full max-w-[430px] bg-ivory-card",
          "shadow-[0_40px_80px_-30px_rgba(44,35,24,0.35)]",
        ].join(" ")}
      >
        <div className="relative">
          <Hero revealed={true} />
          <QuoteCard />
          <CouplePhoto />
          <SaveTheDate />
          <EventDetails />
          <OurStory />
          <Gallery />
          <Rsvp />
          <Footer />
        </div>

        <MusicButton />
      </div>
    </main>
  )
}
