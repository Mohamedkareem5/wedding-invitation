import type { Metadata, Viewport } from "next"
import { Amiri, Cairo, Scheherazade_New, Playfair_Display, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-amiri",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
})

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-scheherazade",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Moustafa & Nihal — Wedding Invitation",
  description:
    "You are cordially invited to the wedding celebration of Moustafa & Nihal on May 2nd, 2026.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#f2ede6",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${cairo.variable} ${scheherazade.variable} ${playfair.variable} ${cormorant.variable} bg-ivory`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-ivory text-brown-deep" suppressHydrationWarning>
        {/* Audio element in HTML for earliest loading */}
        <audio id="bg-audio" loop playsInline preload="auto" style={{display:'none'}}>
          <source src="/music.mp3" type="audio/mpeg" />
        </audio>
        {/* Inline script runs before React — earliest possible autoplay attempt */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var a = document.getElementById('bg-audio');
  if(!a) return;
  a.volume = 0.45;
  a.currentTime = 12;

  function startMuted(){
    a.muted = true;
    a.play().catch(function(){});
    var events = ['click','touchstart','scroll','keydown','pointerdown'];
    function unmute(){
      a.muted = false;
      a.volume = 0.45;
      if(a.paused) a.play().catch(function(){});
      events.forEach(function(e){ window.removeEventListener(e, unmute, true); });
    }
    events.forEach(function(e){ window.addEventListener(e, unmute, true); });
  }

  function tryPlay(){
    a.muted = false;
    var p = a.play();
    if(p && p.catch){
      p.catch(function(){ startMuted(); });
    }
  }

  // Wait for audio to be ready before playing
  if(a.readyState >= 3){
    tryPlay();
  } else {
    a.addEventListener('canplaythrough', function handler(){
      a.removeEventListener('canplaythrough', handler);
      tryPlay();
    });
    // Fallback: if canplaythrough never fires within 3s, try anyway
    setTimeout(function(){ if(a.paused) tryPlay(); }, 3000);
  }

  a.addEventListener('ended', function(){ a.currentTime = 12; a.play().catch(function(){}); });
})();
`
          }}
        />
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
