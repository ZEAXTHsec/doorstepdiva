'use client'

import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { WhatsAppIcon } from './WhatsAppIcon'

interface TransformationCase {
  id: string
  tabLabel: string
  badge: string
  title: string
  subtitle: string
  beforeImg: string
  afterImg: string
  beforeLabel: string
  afterLabel: string
  problem: string
  solution: string
  duration: string
  longevity: string
  products: string
  whatsappMsg: string
}

const TRANSFORMATIONS: TransformationCase[] = [
  {
    id: 'hair',
    tabLabel: 'Hair: Frizz to Balayage',
    badge: 'Hair Architecture & Color',
    title: 'Frizzy, Dry Ends → Silky Glossy Balayage',
    subtitle: 'From heat-damaged flyaways to bouncy, luminous caramel movement.',
    beforeImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    afterImg: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=85',
    beforeLabel: 'BEFORE: Frizzy & Brassy Ends',
    afterLabel: 'AFTER: Botoplex & Honey Balayage',
    problem: 'Humidity frizz, uneven brassy undertones, split ends & heat exhaustion',
    solution: "L'Oréal Professionnel French Freehand Balayage + Olaplex No. 1 & 2 Bond Rebuilder + Gloss Glaze",
    duration: '120–150 Mins (In your home)',
    longevity: '4–6 Months with proper sulphate-free homecare',
    products: "L'Oréal Studio Blond, Olaplex, Kérastase Elixir Ultime",
    whatsappMsg: 'Namaste DoorStep Diva! I saw the Frizzy Hair to Silky Balayage transformation on your website. I want to book a hair consultation / balayage service at my home.',
  },
  {
    id: 'skin',
    tabLabel: 'Skin: Dull to Glass Glow',
    badge: 'Clinical Medi-Facial',
    title: 'Sun-Tanned Complexion → Korean Glass Hydration',
    subtitle: 'From congested pores and sun fatigue to a dewy, porcelain bounce.',
    beforeImg: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85',
    afterImg: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85',
    beforeLabel: 'BEFORE: Tanned & Congested',
    afterLabel: 'AFTER: Korean Glass Glow',
    problem: 'North Indian UV tanning, clogged comedones, dehydrated skin barrier & dull tone',
    solution: 'Ultrasonic scrubber pore detox + Plant Peptide cold hammer infusion + Alginate algae mask',
    duration: '75 Mins (In your home)',
    longevity: '3–4 Weeks of healthy, illuminated hydration',
    products: 'Centella Asiatica ampoules, Hyaluronic peptide cocktail, Cryo-globe cooling',
    whatsappMsg: 'Namaste DoorStep Diva! I saw the Korean Glass Skin transformation on your website. Please check slot availability for a doorstep facial appointment.',
  },
  {
    id: 'bridal',
    tabLabel: 'Bridal: Natural to HD Glam',
    badge: 'Royal HD Bridal Artistry',
    title: 'Pre-Wedding Fatigue → Royal HD Airbrush Finish',
    subtitle: 'From uneven skin tone to an 18-hour sweatproof, regal bridal glow.',
    beforeImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    afterImg: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png',
    beforeLabel: 'BEFORE: Natural Bare Skin',
    afterLabel: 'AFTER: Royal HD Airbrush',
    problem: 'Uneven undertone, stress breakout shadows, high-humidity wedding heat',
    solution: 'Silicone-based micro-airbrush formulation + waterproof lock + customized lash flare',
    duration: '90 Mins (At your bridal suite)',
    longevity: '18+ Hours transfer-proof (Tear & sweat resistant)',
    products: 'MAC Studio Fix, Kryolan Pro Airbrush, Charlotte Tilbury Setting Mist',
    whatsappMsg: 'Namaste DoorStep Diva! I saw the Royal HD Bridal Makeover transformation on your website. I want to enquire about bridal booking dates & packages.',
  },
]

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState<string>('hair')
  const [sliderPos, setSliderPos] = useState<number>(50)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeItem = TRANSFORMATIONS.find(t => t.id === activeTab) || TRANSFORMATIONS[0]

  // Precise coordinate calculation
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true)
    containerRef.current?.setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    updatePosition(e.clientX)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false)
    try {
      containerRef.current?.releasePointerCapture(e.pointerId)
    } catch {
      // Ignored if pointer was released outside
    }
  }

  return (
    <section id="transformations" className="py-24 md:py-32 relative overflow-hidden bg-petal/30">
      {/* Decorative ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 30% 0%, rgba(196,118,138,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 90%, rgba(200,151,74,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3"
            style={{ background: 'rgba(139,58,82,0.08)', border: '1px solid rgba(139,58,82,0.20)' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#8B3A52' }} />
            <span className="font-poppins text-xs font-semibold tracking-[0.2em] uppercase text-[#8B3A52]">
              Real Treatment Results
            </span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#3D2B2B' }}>
            Interactive Before & After <br className="hidden sm:inline" />
            <span style={{ color: '#8B3A52' }}>Transformation Showcase</span>
          </h2>

          <p className="font-poppins text-sm sm:text-base leading-relaxed" style={{ color: '#7A5C5C' }}>
            Drag the slider horizontally to inspect the genuine transformation. No exaggerated filters — just certified salon mastery delivered directly to your home.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {TRANSFORMATIONS.map((t) => {
            const isActive = t.id === activeTab
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id)
                  setSliderPos(50) // Reset to middle for clean comparison
                }}
                className={`font-poppins text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-md scale-[1.02]'
                    : 'text-stone-light hover:text-stone hover:bg-rose/5 border border-stone-light/20 bg-white/70'
                }`}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #8B3A52, #C4768A)' : undefined,
                }}
              >
                {t.tabLabel}
              </button>
            )
          })}
        </div>

        {/* Main Split Grid: Slider on Left/Top, Clinical Blueprint on Right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Interactive Drag Box */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-full h-[360px] sm:h-[460px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-white/60 touch-none"
              style={{
                boxShadow: '0 20px 60px rgba(139,58,82,0.14)',
              }}
              role="slider"
              aria-label="Before and after transformation comparison slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPos)}
            >
              {/* 1. Underlying AFTER Image (Right side) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={activeItem.afterImg}
                  alt={activeItem.afterLabel}
                  fill
                  priority
                  className="object-cover object-center pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>

              {/* 2. Overlaid BEFORE Image clipped with clip-path (Left side) */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                }}
              >
                <Image
                  src={activeItem.beforeImg}
                  alt={activeItem.beforeLabel}
                  fill
                  priority
                  className="object-cover object-center pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>

              {/* Top Pill Labels */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span
                  className="font-poppins text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full text-white backdrop-blur-md shadow-sm border border-white/20"
                  style={{ background: 'rgba(61,43,43,0.78)' }}
                >
                  {activeItem.beforeLabel}
                </span>
              </div>

              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <span
                  className="font-poppins text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full text-white backdrop-blur-md shadow-sm border border-white/20"
                  style={{ background: 'rgba(139,58,82,0.85)' }}
                >
                  {activeItem.afterLabel}
                </span>
              </div>

              {/* Drag Handle Divider Line */}
              <div
                className="absolute top-0 bottom-0 z-30 pointer-events-none"
                style={{
                  left: `${sliderPos}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Thin vertical glow bar */}
                <div className="w-[3px] h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]" />

                {/* Central circular drag badge */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#8B3A52] shadow-2xl flex items-center justify-center font-bold text-sm border-2 border-[#8B3A52] transition-transform duration-150"
                  style={{
                    transform: `translate(-50%, -50%) scale(${isDragging ? 1.15 : 1})`,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                    <polyline points="9 18 3 12 9 6" />
                  </svg>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                    <polyline points="15 18 9 12 15 6" />
                    <polyline points="9 18 3 12 9 6" />
                  </svg>
                </div>
              </div>

              {/* Bottom Drag Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <span className="font-poppins text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full text-white/90 bg-black/40 backdrop-blur-md">
                  ‹ Drag left / right to compare ›
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Precise Treatment Blueprint */}
          <div className="lg:col-span-5">
            <div
              className="rounded-3xl p-7 sm:p-8 bg-white border shadow-lg"
              style={{
                borderColor: 'rgba(196,118,138,0.25)',
                boxShadow: '0 12px 40px rgba(139,58,82,0.08)',
              }}
            >
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 text-[#966B26] bg-[#C8974A]/10 border border-[#C8974A]/25">
                {activeItem.badge}
              </div>

              <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-2 text-[#3D2B2B]">
                {activeItem.title}
              </h3>

              <p className="font-poppins text-xs sm:text-sm text-[#7A5C5C] leading-relaxed mb-6">
                {activeItem.subtitle}
              </p>

              {/* Clinical Specs Table */}
              <div className="space-y-3.5 mb-7 text-xs font-poppins">
                <div className="p-3 rounded-xl bg-petal/60 border border-rose/10">
                  <p className="font-bold text-[#8B3A52] uppercase text-[10px] tracking-wider mb-0.5">Primary Concern:</p>
                  <p className="text-[#3D2B2B]">{activeItem.problem}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <p className="font-bold text-[#966B26] uppercase text-[10px] tracking-wider mb-0.5">Technique & Products:</p>
                  <p className="text-[#3D2B2B]">{activeItem.solution}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-petal/40 border border-rose/10">
                    <p className="font-bold text-stone-500 uppercase text-[10px] tracking-wider mb-0.5">Session Time:</p>
                    <p className="font-semibold text-[#3D2B2B]">{activeItem.duration}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-petal/40 border border-rose/10">
                    <p className="font-bold text-stone-500 uppercase text-[10px] tracking-wider mb-0.5">Expected Longevity:</p>
                    <p className="font-semibold text-[#3D2B2B]">{activeItem.longevity}</p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp CTA for this specific transformation */}
              <a
                href={`https://wa.me/919129577514?text=${encodeURIComponent(activeItem.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 font-poppins text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full text-white transition-all duration-200 hover:scale-[1.02] shadow-md"
                style={{ background: '#25D366' }}
              >
                <WhatsAppIcon size={16} />
                Book This Treatment on WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
