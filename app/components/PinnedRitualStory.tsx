'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface RitualStep {
  step: string
  badge: string
  title: string
  subtitle: string
  desc: string
  highlight: string
  image: string
}

const RITUAL_STEPS: RitualStep[] = [
  {
    step: '01',
    badge: 'Step 01 · 60-Second Concierge',
    title: 'Instant Reservation',
    subtitle: 'Zero Advance Required',
    desc: 'Select your preferred beauty services, preferred arrival window, and locality. No complex app download or advance deposit necessary.',
    highlight: 'Express Dispatch across Delhi NCR, Lucknow & Ayodhya',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80',
  },
  {
    step: '02',
    badge: 'Step 02 · Unsealed In Your Presence',
    title: 'Sealed Single-Use Vanity Kit',
    subtitle: 'Hospital-Grade Sterilization',
    desc: 'Your verified female artist arrives with a sealed mono-dose kit opened right before your eyes. Autoclaved stainless tools and 100% disposable sheets.',
    highlight: 'Zero Cross-Contamination Protocol',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=900&auto=format&fit=crop&q=80',
  },
  {
    step: '03',
    badge: 'Step 03 · Living Room Sanctuary',
    title: 'Clinical Salon Artistry',
    subtitle: 'Global Luxury Formulations',
    desc: 'Sink into your favorite armchair while certified artists transform your look using authentic MAC, Kérastase, Charlotte Tilbury, and Olaplex.',
    highlight: 'Certified Artists with 5+ Years Salon Experience',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&auto=format&fit=crop&q=80',
  },
  {
    step: '04',
    badge: 'Step 04 · Complete Peace of Mind',
    title: 'Admire Your Glow & Settle',
    subtitle: 'Pay After Service',
    desc: 'Inspect your radiant hair, makeup, or glass skin under your home lighting. Settle securely via UPI or cash only when you are completely delighted.',
    highlight: '100% Happiness Guarantee',
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=900&auto=format&fit=crop&q=80',
  },
]

export default function PinnedRitualStory() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      stepRefs.current.forEach((el, index) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        // When step enters the middle third of viewport, mark it active
        if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.25) {
          setActiveStep(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-32 px-5 sm:px-8 md:px-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDF8F9 0%, #FFFFFF 50%, #FAF2F5 100%)' }}
      aria-label="How our at-home beauty service works"
    >
      {/* Ambient background bloom */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(200, 151, 74, 0.15) 0%, rgba(139, 58, 82, 0.1) 60%, transparent 80%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24">
          <p className="font-poppins text-xs tracking-[0.3em] uppercase font-bold text-[#8B3A52] mb-3">
            The At-Home Ritual
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
            How Luxury Comes to <span className="italic font-normal text-[#8B3A52]">Your Door</span>
          </h2>
          <p className="font-poppins text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            From instant 60-second reservation to living-room transformation — an uncompromised five-star salon experience with zero advance fee.
          </p>
        </div>

        {/* ── TWO-COLUMN PINNED SCROLL EXPERIENCE ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: Pinned Visual Showcase (Sticks to screen on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 order-2 lg:order-1">
            <div
              className="rounded-3xl p-3 sm:p-4 relative overflow-hidden transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(253, 242, 245, 0.85))',
                boxShadow: '0 25px 60px -15px rgba(139, 58, 82, 0.18)',
                border: '1px solid rgba(200, 151, 74, 0.25)',
              }}
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-inner">
                {RITUAL_STEPS.map((s, idx) => (
                  <div
                    key={s.step}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === activeStep ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                    }`}
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(180deg, rgba(28, 8, 18, 0.1) 0%, rgba(28, 8, 18, 0.75) 100%)',
                      }}
                    />
                  </div>
                ))}

                {/* Overlaid Status Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/70 shadow-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-poppins text-[10px] font-bold uppercase tracking-wider text-[#8B3A52]">
                      {RITUAL_STEPS[activeStep].badge}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="font-serif text-base font-bold text-stone-900 leading-tight">
                    {RITUAL_STEPS[activeStep].title}
                  </p>
                  <p className="font-poppins text-[11px] text-[#C8974A] font-semibold mt-1">
                    ✓ {RITUAL_STEPS[activeStep].highlight}
                  </p>
                </div>
              </div>

              {/* Progress Indicator Dots */}
              <div className="flex items-center justify-center gap-2 mt-4 py-1">
                {RITUAL_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeStep ? 'w-8 bg-[#8B3A52]' : 'w-2 bg-[#8B3A52]/20 hover:bg-[#8B3A52]/40'
                    }`}
                    aria-label={`Jump to step ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Scrubbed Story Steps */}
          <div className="lg:col-span-7 space-y-12 sm:space-y-20 order-1 lg:order-2">
            {RITUAL_STEPS.map((item, index) => {
              const isActive = index === activeStep

              return (
                <div
                  key={item.step}
                  ref={el => { stepRefs.current[index] = el }}
                  className={`p-6 sm:p-8 rounded-3xl transition-all duration-500 border ${
                    isActive
                      ? 'bg-white border-[#8B3A52]/30 shadow-xl shadow-[#8B3A52]/8 translate-x-0 sm:translate-x-2'
                      : 'bg-white/50 border-stone-200/60 opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Step Numeral Pill */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-serif text-xl font-bold shrink-0 transition-colors duration-300 ${
                        isActive
                          ? 'bg-[#8B3A52] text-white shadow-md shadow-[#8B3A52]/25'
                          : 'bg-[#8B3A52]/10 text-[#8B3A52]'
                      }`}
                    >
                      {item.step}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`font-poppins text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-[#8B3A52]/10 text-[#8B3A52]'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-1">
                        {item.title}
                      </h3>

                      <p className="font-poppins text-xs font-semibold text-[#C8974A] uppercase tracking-wider mb-3">
                        {item.subtitle}
                      </p>

                      <p className="font-poppins text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                        {item.desc}
                      </p>

                      <div className="inline-flex items-center gap-2 text-xs font-medium text-stone-800 bg-[#FAF2F5] px-3.5 py-1.5 rounded-xl border border-[#F3DBE2]">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{item.highlight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Bottom Actions */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#8B3A52] text-white font-poppins text-sm font-semibold shadow-lg shadow-[#8B3A52]/25 hover:bg-[#732F42] transition-all hover:scale-[1.02]"
              >
                <span>Book Your At-Home Service</span>
                <span>→</span>
              </Link>
              <a
                href="https://wa.me/919129577514"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#25D366] text-white font-poppins text-sm font-semibold shadow-md hover:opacity-95 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp Coordinator</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
