'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IconChevronRight, IconWhatsApp, IconCheck } from '@/app/components/icons'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    const video = videoRef.current
    const loadVideo = () => {
      const conn = (navigator as any).connection
      if (conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g')) return
      video.src = '/videos/hero.mp4'
      video.load()
    }
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadVideo, { timeout: 3000 })
    } else {
      setTimeout(loadVideo, 2000)
    }
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="DoorStep Diva — At-home beauty services in Delhi NCR, Lucknow and Ayodhya"
    >
      {/* ── Background: Cover.png always loads first ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175036/Cover_ksobok.png"
          alt="DoorStep Diva certified beauty artist at work"
          fill
          priority
          className="object-cover object-center sm:object-right"
          sizes="100vw"
        />

        {/* Lazy video fades in on good connections */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-right opacity-0 transition-opacity duration-1000"
          onCanPlay={(e) => { (e.target as HTMLVideoElement).style.opacity = '1' }}
          aria-hidden="true"
        />

        {/* Left-side gradient so text stays SHARP and readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(20,6,10,0.88) 0%, rgba(30,10,15,0.75) 35%, rgba(30,10,15,0.40) 60%, rgba(30,10,15,0.05) 100%)',
          }}
        />
        {/* Subtle pink warmth on left */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 50% 80% at 15% 55%, rgba(196,118,138,0.15) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ── Gold dot grid — top right, desktop only ── */}
      <div aria-hidden="true" className="absolute top-28 right-10 hidden sm:grid grid-cols-3 gap-2.5 pointer-events-none" style={{ opacity: 0.30 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full" style={{ background: '#C8974A' }} />
        ))}
      </div>

      {/* ── Floating petal dots ── */}
      {[
        { top: '20%', left: '6%',   size: 9,  opacity: 0.4,  color: '#EFCCD4', dur: 3.5 },
        { top: '70%', left: '10%',  size: 6,  opacity: 0.28, color: '#C8974A', dur: 4.2 },
        { top: '42%', right: '5%',  size: 11, opacity: 0.22, color: '#EFCCD4', dur: 3.8 },
        { top: '80%', right: '8%',  size: 7,  opacity: 0.30, color: '#C4768A', dur: 4.6 },
      ].map((d, i) => (
        <div key={i} aria-hidden="true" className="absolute rounded-full pointer-events-none"
          style={{ top: d.top, left: (d as any).left, right: (d as any).right, width: d.size, height: d.size, background: d.color, opacity: d.opacity, animation: `float ${d.dur}s ease-in-out ${i * 0.4}s infinite` }}
        />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-16 w-full py-28 md:py-36">
        <div className="max-w-xl">

          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{ animation: 'fadeUp .5s ease both', background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(239,204,212,0.30)' }}
          >
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#EFCCD4', animation: 'pulseRing 2s ease-out infinite' }} />
            <span className="font-poppins text-[10.5px] font-semibold tracking-[0.22em] uppercase text-blush">
              Now Serving Delhi NCR · Lucknow · Ayodhya
            </span>
          </div>

          {/* Headline — white text over dark overlay = always sharp */}
          <h1
            className="font-playfair font-bold leading-[1.05] mb-6 text-white"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              animation: 'fadeUp .6s ease .08s both',
              textShadow: '0 2px 32px rgba(0,0,0,0.30)',
            }}
          >
            Salon-Quality<br />
            <em
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(115deg, #EFCCD4 20%, #C4768A 75%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Beauty,
            </em>
            <br />
            At Your Door.
          </h1>

          {/* Sub */}
          <p
            className="font-poppins text-white/80 text-sm sm:text-[0.96rem] leading-[1.85] mb-9 max-w-[480px]"
            style={{ animation: 'fadeUp .6s ease .17s both' }}
          >
            Six professional beauty divisions — hair, skin, makeup, lashes,
            semi-permanent makeup &amp; nails — by certified artists,
            delivered wherever you are.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10" style={{ animation: 'fadeUp .6s ease .26s both' }}>
            <Link
              href="/#contact"
              className="btn-press inline-flex items-center gap-2 font-poppins text-sm font-semibold px-7 py-3.5 text-white rounded-full"
              style={{ background: 'linear-gradient(135deg,#C4768A 0%,#8B3A52 100%)', boxShadow: '0 8px 28px rgba(139,58,82,0.40)' }}
            >
              Book a Session <IconChevronRight />
            </Link>
            <a
              href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2 font-poppins text-sm font-semibold px-7 py-3.5 text-white rounded-full hover:opacity-90 transition-opacity"
              style={{ background: '#25D366', boxShadow: '0 6px 20px rgba(37,211,102,0.30)' }}
            >
              <IconWhatsApp size={15} /> WhatsApp
            </a>
          </div>

          {/* Trust strip */}
          <div
            className="flex flex-wrap items-center gap-5 pt-6"
            style={{ animation: 'fadeUp .6s ease .35s both', borderTop: '1px solid rgba(239,204,212,0.18)' }}
          >
            {['Certified Artists', 'Premium Products', 'At-Home Comfort'].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(239,204,212,0.18)', color: '#EFCCD4' }}>
                  <IconCheck />
                </div>
                <span className="font-poppins text-xs text-white/70 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" aria-hidden="true">
        <span className="font-poppins text-[10px] tracking-widest uppercase text-white/30">Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)' }} />
      </div>
    </section>
  )
}