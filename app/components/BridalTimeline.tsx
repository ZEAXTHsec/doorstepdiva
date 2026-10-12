'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { WhatsAppIcon } from './WhatsAppIcon'

interface Milestone {
  id: string
  phase: string
  timing: string
  title: string
  subtitle: string
  focus: string
  duration: string
  recommendedTreatments: string[]
  editorialNote: string
  image: string
  alt: string
}

const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    phase: 'Phase 01',
    timing: '60 Days Prior',
    title: 'Foundation & Clinical Diagnostics',
    subtitle: 'Cellular skin assessment & scalp barrier reset',
    focus: 'Identify hyperpigmentation, texture irregularities, and scalp dryness early so active formulations have full turnover time.',
    duration: '120 Minutes',
    recommendedTreatments: [
      'Clinical Skin Analysis & Barrier Diagnostic',
      'Gentle Glycolic / Lactic Acid Detan Infusion',
      'Purifying Scalp Detox & Follicle Reset',
      'Preliminary Bridal Makeup Consultation',
    ],
    editorialNote: 'Starting two months early allows cellular turnover cycles to normalize without the risk of sudden pre-wedding purge breakouts.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    alt: 'Bridal skin diagnostic and cellular hydration prep',
  },
  {
    id: 'm2',
    phase: 'Phase 02',
    timing: '30 Days Prior',
    title: 'Deep Restoration & Hair Architecture',
    subtitle: 'Intensive keratin rebonding & lymphatic sculpting',
    focus: 'Rebuild internal hair bonds to withstand heavy bridal styling and heat work, alongside lymphatic drainage for defined facial contours.',
    duration: '180 Minutes',
    recommendedTreatments: [
      'Botoplex / Kérastase Fusio-Dose Hair Rebonding',
      'Korean Hydra-Infusion & Cryo-Sculpting Facial',
      'Bridal Trial Makeup & Hair Updo Rehearsal',
      'Eyebrow Architecture & Symmetry Mapping',
    ],
    editorialNote: 'A full rehearsal session at 30 days locks your preferred look, photography tone, and veil placement with zero wedding-week stress.',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
    alt: 'Bridal hair architecture and silky restorative treatment',
  },
  {
    id: 'm3',
    phase: 'Phase 03',
    timing: '7 Days Prior',
    title: 'The Bridal Polish & Radiance',
    subtitle: 'Full body silk therapy & nail architecture',
    focus: 'Eliminate dead stratum corneum cells, ensure satin-smooth skin for traditional jewelry contact, and sculpt bridal nails.',
    duration: '240 Minutes',
    recommendedTreatments: [
      'Full Body Micro-Exfoliation & Rose Oil Polish',
      'Rica Liposoluble Brazilian & Full Body Waxing',
      'Deluxe Spa Pedicure & Manicure Architecture',
      'Sculpted Acrylic / PolyGel Bridal Nail Extensions',
    ],
    editorialNote: 'Scheduled one week before ceremonies to ensure any initial follicular redness settles completely, leaving porcelain smoothness.',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    alt: 'Bridal skin polishing and nail extension elegance',
  },
  {
    id: 'm4',
    phase: 'Phase 04',
    timing: 'The Wedding Day',
    title: 'Royal HD Bridal Artistry & Draping',
    subtitle: '12-Hour transfer-resistant camera architecture',
    focus: 'Flawless 4K high-definition airbrush base, couture hair sculpture, and heavy dupatta pinning designed for endurance under lighting.',
    duration: '150–180 Minutes (On Venue / At Home)',
    recommendedTreatments: [
      'Ultra-HD Airbrush Base (Charlotte Tilbury & MAC)',
      '12-Hour Waterproof Tear & Humidity Proof Seal',
      'Traditional or Modern Couture Updo with Fresh Flora',
      'Elaborate Bridal Lehenga & Dupatta Draping / Pinning',
    ],
    editorialNote: 'Our senior bridal artists arrive with studio-grade illumination and work backwards from your photography call time for a relaxed experience.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    alt: 'Traditional Indian bride with Royal HD bridal makeup and jewelry',
  },
]

export default function BridalTimeline() {
  const [activeId, setActiveId] = useState<string>('m1')
  const currentMilestone = MILESTONES.find((m) => m.id === activeId) || MILESTONES[0]

  return (
    <section id="bridal-regimen" className="py-24 sm:py-28 relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      {/* Delicate divider lines */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,58,82,0.12), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <p
            className="font-poppins text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: '#8B3A52' }}
          >
            Pre-Wedding Architecture
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-stone tracking-tight mb-4">
            The Curated <em className="italic" style={{ color: '#8B3A52' }}>Bridal Regimen</em>
          </h2>
          <div className="w-12 h-0.5 mx-auto mb-5" style={{ background: '#C8974A' }} />
          <p className="font-poppins text-xs sm:text-sm text-stone/70 leading-relaxed max-w-2xl mx-auto">
            Timeless bridal beauty cannot be rushed into a single morning. Our structured multi-week countdown
            systematically prepares skin health, hair resilience, and finish precision leading up to your ceremony.
          </p>
        </div>

        {/* Timeline Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {MILESTONES.map((m) => {
            const isActive = m.id === activeId
            return (
              <button
                key={m.id}
                onClick={() => setActiveId(m.id)}
                className="text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 relative"
                style={{
                  background: isActive ? '#FAF4F5' : '#FAF7F5',
                  border: isActive ? '1.5px solid #8B3A52' : '1px solid rgba(139,58,82,0.1)',
                  boxShadow: isActive ? '0 8px 24px rgba(139,58,82,0.08)' : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="font-poppins text-[10px] font-semibold tracking-widest uppercase"
                    style={{ color: isActive ? '#8B3A52' : '#8B3A52/70' }}
                  >
                    {m.phase}
                  </span>
                  <span
                    className="font-poppins text-[10px] font-medium px-2 py-0.5 rounded"
                    style={{
                      background: isActive ? '#8B3A52' : 'rgba(61,43,43,0.08)',
                      color: isActive ? '#FFFFFF' : '#3D2B2B',
                    }}
                  >
                    {m.timing}
                  </span>
                </div>
                <p className="font-playfair text-sm sm:text-base font-semibold text-stone mt-2 line-clamp-1">
                  {m.title}
                </p>
                <p className="font-poppins text-[11px] text-stone/60 mt-0.5 line-clamp-1">
                  {m.subtitle}
                </p>
              </button>
            )
          })}
        </div>

        {/* Active Milestone Editorial Showcase */}
        <div
          className="rounded-3xl p-6 sm:p-10 md:p-12 transition-all duration-500"
          style={{
            background: '#FAF7F5',
            border: '1px solid rgba(200,151,74,0.25)',
            boxShadow: '0 16px 48px rgba(61,43,43,0.06)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div
                className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 12px 32px rgba(61,43,43,0.12)',
                  border: '1px solid rgba(139,58,82,0.15)',
                }}
              >
                <Image
                  src={currentMilestone.image}
                  alt={currentMilestone.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(61,43,43,0.05) 0%, rgba(61,43,43,0.35) 100%)',
                  }}
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-md font-poppins text-[11px] font-semibold text-white tracking-wider"
                  style={{ background: 'rgba(61,43,43,0.75)', backdropFilter: 'blur(8px)' }}
                >
                  {currentMilestone.timing}
                </div>
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="font-poppins text-[10px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: '#8B3A52' }}
                  >
                    {currentMilestone.phase}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-stone/30" />
                  <span className="font-poppins text-xs font-medium text-stone/60">
                    Duration: {currentMilestone.duration}
                  </span>
                </div>

                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-stone mb-2">
                  {currentMilestone.title}
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-stone/70 mb-6 leading-relaxed">
                  {currentMilestone.focus}
                </p>

                {/* Treatment Grid */}
                <div className="mb-6">
                  <h4 className="font-poppins text-xs font-semibold tracking-wider uppercase text-stone mb-3">
                    Curated Protocol Checklist:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentMilestone.recommendedTreatments.map((treatment, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white border"
                        style={{ borderColor: 'rgba(139,58,82,0.08)' }}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#C8974A"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="flex-shrink-0 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="font-poppins text-xs text-stone/85 leading-snug">
                          {treatment}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editorial Note Box */}
                <div
                  className="p-4 rounded-xl mb-8"
                  style={{
                    background: 'rgba(200,151,74,0.08)',
                    borderLeft: '3px solid #C8974A',
                  }}
                >
                  <p className="font-poppins text-xs text-stone/80 leading-relaxed italic">
                    Note: {currentMilestone.editorialNote}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={`https://wa.me/919129577514?text=Hello%20DoorStep%20Diva%2C%20I%20would%20like%20to%20consult%20regarding%20the%20Bridal%20Regimen%20(${encodeURIComponent(
                    currentMilestone.title
                  )}%20-%20${encodeURIComponent(currentMilestone.timing)}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-poppins text-xs font-semibold tracking-wider uppercase transition-all duration-300 text-white hover:brightness-105"
                  style={{
                    background: '#8B3A52',
                    boxShadow: '0 6px 20px rgba(139,58,82,0.22)',
                  }}
                >
                  <WhatsAppIcon size={16} />
                  <span>Consult This Milestone</span>
                </a>

                <a
                  href="/services/makeup#bridal"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-poppins text-xs font-semibold tracking-wider uppercase transition-all duration-300 bg-white text-stone border hover:border-stone/40"
                  style={{ borderColor: 'rgba(61,43,43,0.15)' }}
                >
                  <span>View All Bridal Packages</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
