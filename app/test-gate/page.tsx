"use client"

import { useState } from "react"
import WaxEnvelope from "@/components/invitation/wax-envelope"
import Hero from "@/components/invitation/hero"

export default function TestGatePage() {
  const [opened, setOpened] = useState(false)

  return (
    <main className="min-h-screen w-full bg-ivory flex items-center justify-center">
      <div
        className={[
          "phone-shell relative mx-auto w-full max-w-[430px] bg-ivory-card overflow-hidden",
          "shadow-[0_40px_80px_-30px_rgba(44,35,24,0.35)]",
        ].join(" ")}
        style={{ height: "100dvh", maxHeight: "900px" }}
      >
        {/* Content behind the envelope */}
        <div className="relative h-full overflow-y-auto">
          <Hero revealed={opened} />
        </div>

        {/* Envelope overlay */}
        {!opened && (
          <WaxEnvelope onComplete={() => setOpened(true)} />
        )}

        {/* Reset button (dev only) */}
        {opened && (
          <button
            type="button"
            onClick={() => setOpened(false)}
            className="absolute bottom-4 right-4 z-50 rounded-full bg-brown-deep/80 px-4 py-2 text-xs text-ivory font-ui tracking-wide"
          >
            Reset
          </button>
        )}
      </div>
    </main>
  )
}
