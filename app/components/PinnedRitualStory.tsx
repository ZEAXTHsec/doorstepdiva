'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface RitualStep {
  step: string
  shortLabel: string
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
    shortLabel: 'Reservation',
    badge: 'Step 01 · 60-Second Concierge',
    title: 'Instant Reservation',
    subtitle: 'Zero Advance Required',
    desc: 'Select your preferred beauty services, preferred arrival window, and locality. No complex app download or advance deposit necessary.',
    highlight: 'Express Dispatch across Delhi NCR, Lucknow & Ayodhya',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80',
  },
  {
    step: '02',
    shortLabel: 'Sealed Kit',
    badge: 'Step 02 · Unsealed In Your Presence',
    title: 'Sealed Single-Use Kit',
    subtitle: 'Hospital-Grade Sterilization',
    desc: 'Your verified female artist arrives with a sealed mono-dose kit opened right before your eyes. Autoclaved stainless tools and 100% disposable sheets.',
    highlight: 'Zero Cross-Contamination Protocol',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=900&auto=format&fit=crop&q=80',
  },
  {
    step: '03',
    shortLabel: 'Home Salon',
    badge: 'Step 03 · Living Room Sanctuary',
    title: 'Clinical Salon Artistry',
    subtitle: 'Global Luxury Formulations',
    desc: 'Sink into your favorite armchair while certified artists transform your look using authentic MAC, Kérastase, Charlotte Tilbury, and Olaplex.',
    highlight: 'Certified Artists with 5+ Years Salon Experience',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&auto=format&fit=crop&q=80',
  },
  {
    step: '04',
    shortLabel: 'Pay After',
    badge: 'Step 04 · Complete Peace of Mind',
    title: 'Admire & Settle',
    subtitle: 'Pay After Service',
    desc: 'Inspect your radiant hair, makeup, or glass skin under your home lighting. Settle securely via UPI or cash only when you are completely delighted.',
    highlight: '100% Happiness Guarantee',
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=900&auto=format&fit=crop&q=80',
  },
]

export default function PinnedRitualStory() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section
      className="py-16 sm:py-24 px-4 sm:px-8 md:px-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDF8F9 0%, #FFFFFF 50%, #FAF2F5 100%)' }}
      aria-label="How our at-home beauty service works"
    >
      {/* Ambient background bloom */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(200, 151, 74, 0.15) 0%, rgba(139, 58, 82, 0.1) 60%, transparent 80%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-poppins text-xs tracking-[0.3em] uppercase font-bold text-[#8B3A52] mb-3">
            The At-Home Ritual
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
            How Luxury Comes to <span className="italic font-normal text-[#8B3A52]">Your Door</span>
          </h2>
          <p className="font-poppins text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From instant 60-second reservation to five-star living room transformation. Zero advance deposit required.
          </p>
        </div>

        {/* ── MOBILE VIEW (< md): Interactive Touch Stepper ── */}
        <div className="block md:hidden">
          {/* Step Selector Pills Bar */}
          <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-white/90 border border-[#8B3A52]/15 shadow-sm mb-6">
            {RITUAL_STEPS.map((item, index) => {
              const isActive = index === activeStep
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(index)}
                  className={`py-2 px-1 rounded-xl text-center transition-all ${
                    isActive
                      ? 'bg-[#8B3A52] text-white shadow-md'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                  aria-label={`View step ${item.step}: ${item.title}`}
                >
                  <span className="block font-serif text-xs font-bold leading-none mb-0.5">
                    {item.step}
                  </span>
                  <span className="block font-poppins text-[9px] uppercase tracking-wider font-medium truncate">
                    {item.shortLabel}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active Step Showcase Card */}
          <div
            className="rounded-3xl p-4 bg-white border border-[#8B3A52]/15 shadow-xl transition-all duration-300"
            style={{ boxShadow: '0 20px 45px -10px rgba(139, 58, 82, 0.12)' }}
          >
            {/* Step Media */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-inner">
              <img
                src={RITUAL_STEPS[activeStep].image}
                alt={RITUAL_STEPS[activeStep].title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(28, 8, 18, 0.05) 0%, rgba(28, 8, 18, 0.6) 100%)' }}
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#8B3A52] font-poppins text-[10px] font-bold uppercase tracking-wider shadow">
                {RITUAL_STEPS[activeStep].badge}
              </div>
            </div>

            {/* Step Content */}
            <div className="space-y-2">
              <p className="font-poppins text-[11px] font-semibold text-[#C8974A] uppercase tracking-wider">
                {RITUAL_STEPS[activeStep].subtitle}
              </p>
              <h3 className="font-serif text-2xl font-bold text-stone-900 leading-tight">
                {RITUAL_STEPS[activeStep].title}
              </h3>
              <p className="font-poppins text-xs text-stone-600 leading-relaxed pt-1">
                {RITUAL_STEPS[activeStep].desc}
              </p>

              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-800 bg-[#FAF2F5] px-3 py-1.5 rounded-xl border border-[#F3DBE2]">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{RITUAL_STEPS[activeStep].highlight}</span>
                </div>
              </div>
            </div>

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-stone-100">
              <button
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : RITUAL_STEPS.length - 1))}
                className="px-4 py-2.5 rounded-full border border-stone-200 text-stone-700 font-poppins text-xs font-semibold hover:bg-stone-50 transition-colors"
                aria-label="Previous ritual step"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-1.5">
                {RITUAL_STEPS.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === activeStep ? 'w-5 bg-[#8B3A52]' : 'w-1.5 bg-stone-300'
                    }`}
                  />
                ))}
              </div>

              {activeStep < RITUAL_STEPS.length - 1 ? (
                <button
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  className="px-5 py-2.5 rounded-full bg-[#8B3A52] text-white font-poppins text-xs font-semibold shadow hover:bg-[#732F42] transition-colors"
                  aria-label="Next ritual step"
                >
                  Next Step →
                </button>
              ) : (
                <Link
                  href="/book"
                  className="px-5 py-2.5 rounded-full bg-[#8B3A52] text-white font-poppins text-xs font-semibold shadow hover:bg-[#732F42] transition-colors"
                >
                  Book Now →
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ── DESKTOP & TABLET VIEW (md+): 4-Card Progressive Showcase ── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {RITUAL_STEPS.map((item, index) => {
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                style={{
                  borderColor: index === activeStep ? 'rgba(139, 58, 82, 0.35)' : undefined,
                }}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div>
                  {/* Step Image */}
                  <div className="relative aspect-[16/11] rounded-2xl overflow-hidden mb-4 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(180deg, rgba(28, 8, 18, 0.05) 0%, rgba(28, 8, 18, 0.55) 100%)' }}
                    />
                    {/* Floating Step Number */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md text-[#8B3A52] font-serif font-bold text-sm flex items-center justify-center shadow">
                      {item.step}
                    </div>
                  </div>

                  {/* Badge & Subtitle */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="font-poppins text-[10px] font-bold uppercase tracking-wider text-[#8B3A52] bg-[#FAF2F5] px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
                    {item.title}
                  </h3>

                  <p className="font-poppins text-[11px] font-semibold text-[#C8974A] uppercase tracking-wider mb-2.5">
                    {item.subtitle}
                  </p>

                  <p className="font-poppins text-xs text-stone-600 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-800 bg-[#FAF2F5] px-2.5 py-1.5 rounded-xl border border-[#F3DBE2] w-full">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span className="truncate">{item.highlight}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-12 sm:mt-16 text-center flex flex-wrap items-center justify-center gap-4">
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
            <span>WhatsApp Coordinator (+91 9129577514)</span>
          </a>
        </div>

      </div>
    </section>
  )
}
