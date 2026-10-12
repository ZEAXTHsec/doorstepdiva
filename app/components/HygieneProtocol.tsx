'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { WhatsAppIcon } from './WhatsAppIcon'

interface ProtocolCard {
  id: string
  number: string
  title: string
  tagline: string
  desc: string
  image: string
  alt: string
  specifications: string[]
}

const PROTOCOLS: ProtocolCard[] = [
  {
    id: 'formulations',
    number: '01',
    title: 'Mono-Dose Sealed Formulations',
    tagline: 'Single-Use Guarantee',
    desc: 'Every wax cartridge, facial ampoule, and treatment vial is sealed by the manufacturer and unsealed strictly in your presence. We operate a zero-decanting policy—no refilled jars or shared product tubs.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    alt: 'Mono-dose sealed beauty formulations and skincare ampoules',
    specifications: [
      'Sealed manufacturer packaging',
      'Opened exclusively in front of the client',
      'No refilled or decanted jars',
    ],
  },
  {
    id: 'sterilization',
    number: '02',
    title: 'Three-Stage Tool Sterilization',
    tagline: 'Clinical Disinfection',
    desc: 'All non-disposable instruments including cuticle nippers, shears, and comedone extractors undergo ultrasonic cleansing followed by hospital-grade isopropyl sterilization cycles prior to every home visit.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    alt: 'Sterilized medical grade salon instruments and tools',
    specifications: [
      'Ultrasonic particulate cleanse',
      'Hospital-grade alcohol disinfection',
      'Vacuum-sealed tool pouches opened on-site',
    ],
  },
  {
    id: 'disposables',
    number: '03',
    title: 'One-Time Disposable Linens',
    tagline: '100% Single-Use Contact',
    desc: 'Pristine non-woven bedsheets, treatment towels, protective draping, client headbands, and nitrile gloves are unwrapped fresh for your session and disposed of immediately upon completion.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    alt: 'Pristine clean single-use spa linens and towels',
    specifications: [
      'Individually wrapped non-woven sheets',
      'Single-use biodegradable towels',
      'Fresh sterile nitrile gloves for every client',
    ],
  },
  {
    id: 'cleanup',
    number: '04',
    title: 'Zero-Trace Post-Service Sanitation',
    tagline: 'Spotless Home Guarantee',
    desc: 'The luxury of an at-home salon should never come with cleanup duty. Your visiting artist collects all discarded materials in a sealed disposal pouch, sanitizes the work surface, and leaves your space immaculate.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    alt: 'Spotless clinical salon setup and clean aesthetician station',
    specifications: [
      'Self-contained disposal pack out',
      'Surface sanitization post-treatment',
      'Zero maintenance left for the homeowner',
    ],
  },
]

export default function HygieneProtocol() {
  return (
    <section id="hygiene" className="py-24 sm:py-28 relative overflow-hidden" style={{ background: '#FAF7F5' }}>
      {/* Decorative hairline accents */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,58,82,0.15), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,151,74,0.2), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <p
            className="font-poppins text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: '#8B3A52' }}
          >
            Clinical Standards · In-Home Luxury
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-stone tracking-tight mb-4">
            The Diva <em className="italic" style={{ color: '#8B3A52' }}>Hygiene Protocol</em>
          </h2>
          <div className="w-12 h-0.5 mx-auto mb-5" style={{ background: '#C8974A' }} />
          <p className="font-poppins text-xs sm:text-sm text-stone/70 leading-relaxed">
            We hold at-home beauty services to the highest hospital-grade sanitation benchmarks.
            Every tool is sterilized, every formulation is sealed, and your personal sanctuary remains completely pristine.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {PROTOCOLS.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(139,58,82,0.1)',
                boxShadow: '0 8px 24px rgba(61,43,43,0.04)',
              }}
            >
              {/* Image Frame */}
              <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-stone/5">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(61,43,43,0.1) 0%, rgba(61,43,43,0.4) 100%)',
                  }}
                />
                {/* Number Pill */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-md font-poppins text-[10px] font-semibold tracking-wider text-white"
                  style={{ background: 'rgba(61,43,43,0.7)', backdropFilter: 'blur(8px)' }}
                >
                  {card.number}
                </div>
                {/* Tagline */}
                <div
                  className="absolute bottom-3 left-3 right-3 font-poppins text-[10px] font-medium tracking-wider uppercase text-white/95"
                >
                  {card.tagline}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-playfair text-lg font-semibold text-stone mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-poppins text-xs text-stone/70 leading-relaxed mb-5">
                    {card.desc}
                  </p>
                </div>

                {/* Specs Checklist */}
                <div className="pt-4 border-t" style={{ borderColor: 'rgba(196,118,138,0.12)' }}>
                  <ul className="space-y-2">
                    {card.specifications.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg
                          width="14"
                          height="14"
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
                        <span className="font-poppins text-[11px] text-stone/80 leading-tight">
                          {spec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Summary Banner */}
        <div
          className="rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(200,151,74,0.3)',
            boxShadow: '0 12px 32px rgba(139,58,82,0.05)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(139,58,82,0.08)' }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8B3A52"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div>
              <h4 className="font-playfair text-base sm:text-lg font-semibold text-stone">
                Questions Regarding Our Sterilization Process?
              </h4>
              <p className="font-poppins text-xs text-stone/70 mt-1 max-w-xl">
                We invite clients to inspect sealed product codes and sanitized pouch indicators prior to every session.
                Speak directly with our team for clinical inquiries or specialized sensitivities.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/918353982888?text=Hello%20DoorStep%20Diva%2C%20I%20have%20an%20inquiry%20regarding%20your%20hygiene%20and%20sterilization%20protocols%20for%20home%20appointments."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-poppins text-xs font-semibold tracking-wider uppercase transition-all duration-300 text-white hover:brightness-105"
            style={{
              background: '#8B3A52',
              boxShadow: '0 4px 16px rgba(139,58,82,0.25)',
            }}
          >
            <WhatsAppIcon size={15} />
            <span>Inquire Via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}
