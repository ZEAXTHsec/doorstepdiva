'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import BeforeAfterSlider from '@/app/components/BeforeAfterSlider'
import HygieneProtocol from '@/app/components/HygieneProtocol'
import BridalTimeline from '@/app/components/BridalTimeline'
import PinnedRitualStory from '@/app/components/PinnedRitualStory'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: '01', title: 'Hair',
    tagline: 'Cuts · Color · Treatments',
    desc: "Precision cuts, transformative color, and clinical treatments using L'Oréal Professionnel, Kérastase, and Olaplex.",
    tags: ['Haircuts', 'Balayage', 'Keratin', 'Olaplex'],
    accent: '#EFCCD4',
    href: '/services/hair',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png',
  },
  {
    id: '02', title: 'Skin',
    tagline: 'Waxing · Facials · Body Care',
    desc: 'Full-spectrum skincare — waxing, brightening facials, chemical peels, and body polishing tailored for Indian skin.',
    tags: ['Waxing', 'Facials', 'Chemical Peel', 'Body Polish'],
    accent: '#F5E0D0',
    href: '/services/skin',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
  },
  {
    id: '03', title: 'Makeup',
    tagline: 'Party · Bridal · Events',
    desc: 'From festive party looks to full bridal-day experiences using MAC, Charlotte Tilbury, NARS, and Huda Beauty.',
    tags: ['Party Glam', 'Engagement', 'Bridal', 'Sangeet'],
    accent: '#F0D8E8',
    href: '/services/makeup',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png',
  },
  {
    id: '04', title: 'Eyelash',
    tagline: 'Classic · Hybrid · Volume',
    desc: 'Full lash artistry with medical-grade adhesive. Extensions last 3–5 weeks. Cat eye and Foxy styles available.',
    tags: ['Classic', 'Hybrid', 'Volume 2D–6D', 'Cat Eye'],
    accent: '#E8D8F0',
    href: '/services/eyelash',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png',
  },
  {
    id: '05', title: 'Semi-Permanent',
    tagline: 'Microblading · Microneedling',
    desc: 'Long-lasting brow, lip, and liner enhancements by certified technicians. Results last 12 months to 3 years.',
    tags: ['Microblading', 'Combo Brows', 'Lip Blush', 'Nano Liner'],
    accent: '#F0E8D8',
    href: '/services/semi-permanent',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Semi_permanent_qm0uif.png',
  },
  {
    id: '06', title: 'Nail Extensions',
    tagline: 'Acrylic · Gel · PolyGel',
    desc: 'Every nail system — durable acrylics, natural gels, and next-gen PolyGel — finished with bespoke nail art.',
    tags: ['Acrylic', 'Gel / Shellac', 'PolyGel', 'Nail Art'],
    accent: '#F5D8DC',
    href: '/services/nails',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png',
  },
]

const MARQUEE = [
  'Hair Styling','✦','Bridal Makeup','✦','Eyelash Extensions','✦',
  'Microblading','✦','Nail Art','✦','Skin Treatments','✦','Body Waxing','✦','At-Home Luxury','✦',
]

const STATS = [
  { n: '6',    label: 'Service Divisions'  },
  { n: '15+',  label: 'Premium Brands'     },
  { n: '100%', label: 'Certified Artists'  },
  { n: '∞',    label: 'At Your Doorstep'   },
]


const TESTIMONIALS = [
  {
    name: 'Priya S.',
    location: 'Gomti Nagar, Lucknow',
    service: 'Bridal Makeup',
    review: "I was nervous about getting my bridal makeup done at home but the artist was so professional — better than any salon I've visited. My whole family was impressed.",
    rating: 5,
    accent: '#EFCCD4',
  },
  {
    name: 'Ritu M.',
    location: 'Noida, Delhi NCR',
    service: 'Nail Extensions (PolyGel)',
    review: 'The PolyGel set lasted over 3 weeks with zero lifting. She brought all her own products and even cleaned up after herself. Will absolutely book again.',
    rating: 5,
    accent: '#F5D8DC',
  },
  {
    name: 'Ananya K.',
    location: 'Hazratganj, Lucknow',
    service: 'Eyelash Extensions',
    review: 'Volume lashes done at home — I was skeptical but these look stunning. Still going strong at 4 weeks. The technician was so careful and professional.',
    rating: 5,
    accent: '#E8D8F0',
  },
  {
    name: 'Deepa R.',
    location: 'Gurugram, Delhi NCR',
    service: 'Keratin Treatment',
    review: 'Saved me a 2-hour round trip to my salon. The result was identical — silky smooth hair. Booking for the third time now, never going back to in-salon.',
    rating: 5,
    accent: '#F5E0D0',
  },
  {
    name: 'Shalini T.',
    location: 'Indira Nagar, Lucknow',
    service: 'Microblading',
    review: "Powder brows done so naturally — my friends thought I had finally figured out my eyebrow routine! The technician explained everything beforehand and was incredibly gentle.",
    rating: 5,
    accent: '#F0E8D8',
  },
  {
    name: 'Meera V.',
    location: 'Faridabad, Delhi NCR',
    service: 'Skin & Waxing',
    review: 'Full body sugar wax plus a gold facial — all in one appointment at my home. The products were top quality and my skin felt amazing for days afterwards.',
    rating: 5,
    accent: '#F0D8E8',
  },
]

const FAQS = [
  {
    q: 'Do you bring your own products and equipment?',
    a: "Yes — always. Every artist arrives with a fully stocked kit: professional-grade products, clean tools, disposables, and everything needed for a complete salon experience. You don't need to arrange anything.",
  },
  {
    q: 'How far in advance should I book?',
    a: 'For regular services, 24–48 hours is usually sufficient. For bridal packages or semi-permanent makeup, we recommend booking at least 1–2 weeks in advance to ensure your preferred artist and time slot are available.',
  },
  {
    q: 'Which areas do you currently serve?',
    a: 'We operate across Delhi NCR (Delhi, Noida, Gurugram, Faridabad, Ghaziabad), Lucknow (Hazratganj, Gomti Nagar, Alambagh, Indira Nagar, Aliganj), and Ayodhya. Not sure if we cover your exact area? Just message us on WhatsApp.',
  },
  {
    q: 'How does payment work?',
    a: 'We accept UPI, cash, and bank transfer. Payment is made directly to the artist upon service completion. No advance payment is required for most standard services.',
  },
  {
    q: 'What if I need to reschedule or cancel?',
    a: 'Life happens — we understand. Please let us know at least 3–4 hours before your scheduled appointment via WhatsApp so we can reassign your artist. We do not charge cancellation fees for standard notice.',
  },
  {
    q: 'Are your artists certified?',
    a: "Every artist on our team is certified in their respective discipline — whether that's a hair technician trained in Olaplex applications or a microblading artist with a semi-permanent makeup certification. We never send untrained staff.",
  },
  {
    q: 'Do you offer packages for weddings or events?',
    a: 'Yes. We offer full bridal packages covering multiple days and the full bridal party, as well as group bookings for parties, sangeet nights, and corporate events. Message us on WhatsApp with your date and headcount for a custom quote.',
  },
  {
    q: 'Can I book multiple services in one appointment?',
    a: "Absolutely. You can combine services — for example, waxing + facial + mani-pedi in one visit. Just let us know when booking and we'll schedule the right artist(s) and sufficient time.",
  },
]

// SVG icon components
function IconScissors() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/>
      <line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  )
}

function IconStar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

function IconWhatsApp({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function IconCreditCard() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  )
}

// Toggle for hero background: set to false to instantly rollback to still image
const USE_HERO_VIDEO = true

function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      aria-label="DoorStep Diva — At-home beauty services"
    >
      {/* ── Hero background (video with poster fallback or still image) ── */}
      <div className="absolute inset-0 z-0">
        {USE_HERO_VIDEO ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero_video_poster.jpg"
            className="w-full h-full object-cover object-center sm:object-right"
            aria-hidden="true"
          >
            <source src="/videos/hero_makeup.webm" type="video/webm" />
            <source src="/videos/hero_makeup.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175036/Cover_ksobok.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center sm:object-right"
          />
        )}
        {/* Responsive dark scrim: uniform contrast for mobile portrait, directional split for desktop */}
        <div
          className="absolute inset-0 block md:hidden pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(16,4,8,0.85) 0%, rgba(22,6,12,0.76) 50%, rgba(16,4,8,0.90) 100%)',
          }}
        />
        <div
          className="absolute inset-0 hidden md:block pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(14,4,8,0.92) 0%, rgba(20,6,12,0.82) 44%, rgba(20,6,12,0.32) 72%, transparent 100%)',
          }}
        />
        {/* Subtle pink warmth */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 50% 80% at 15% 55%, rgba(196,118,138,0.15) 0%, transparent 65%)',
        }} />
      </div>

      {/* ── Petal / bloom decorative SVG shapes ── */}
      <div aria-hidden="true" className="absolute -top-24 -right-24 w-[520px] h-[520px] pointer-events-none"
        style={{ opacity: 0.16 }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 10 C140 10 180 50 180 100 C180 150 140 190 100 190 C60 190 20 150 20 100 C20 50 60 10 100 10Z"
            fill="url(#petalGrad1)" />
          <defs>
            <radialGradient id="petalGrad1" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#f9a8c9" />
              <stop offset="100%" stopColor="#c4768a" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div aria-hidden="true" className="absolute -bottom-16 -left-16 w-[380px] h-[380px] pointer-events-none"
        style={{ opacity: 0.12 }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="100" rx="80" ry="100" fill="url(#petalGrad2)" transform="rotate(-30 100 100)" />
          <defs>
            <radialGradient id="petalGrad2" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#efccd4" />
              <stop offset="100%" stopColor="#8b3a52" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Mesh gradient overlay */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 75% 40%, rgba(239,204,212,0.25) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 60% at 10% 70%, rgba(200,151,74,0.06) 0%, transparent 60%)' }} />

      {/* ── Main content area ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-16 w-full pt-32 pb-16 md:pt-40 md:pb-20 flex-1 flex items-center">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow badge */}
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border"
            style={{
              animation: 'fadeUp .55s ease both',
              background: 'rgba(255,255,255,0.10)',
              borderColor: 'rgba(255,255,255,0.22)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" style={{ animation: 'pulseRing 2s ease-out infinite' }} />
            <span className="font-poppins text-[10.5px] font-semibold tracking-[0.22em] uppercase text-[#F5D8DC]">
              At-Home Luxury Beauty &amp; Bridal Artistry
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-playfair font-bold leading-[1.06] mb-6 text-white"
            style={{
              fontSize: 'clamp(2.75rem, 5.8vw, 5rem)',
              animation: 'fadeUp .65s ease .08s both',
              textShadow: '0 4px 32px rgba(0,0,0,0.5)',
            }}
          >
            Brows. Skin. Hair.<br />
            <em
              className="not-italic"
              style={{
                background: 'linear-gradient(120deg, #FFFFFF 10%, #F5D8DC 45%, #E5A8B8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontStyle: 'italic',
              }}
            >
              Professionally.
            </em>
            <br />
            At Your Door.
          </h1>

          {/* Sub-copy */}
          <p
            className="font-poppins text-sm sm:text-[1.02rem] leading-[1.85] mb-8 max-w-xl"
            style={{ color: "rgba(255,255,255,0.80)", animation: 'fadeUp .65s ease .17s both' }}
          >
            Delhi NCR &amp; Lucknow’s premier at-home beauty sanctuary. Certified female estheticians deliver medical-grade facials, bridal trousseau glam, salon hair rituals, lash artistry &amp; semi-permanent brows directly to you — with 100% sealed single-use kits.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-wrap items-center gap-3.5 mb-9"
            style={{ animation: 'fadeUp .65s ease .26s both' }}
          >
            <Link
              href="/book"
              className="btn-press inline-flex items-center gap-2.5 font-poppins text-sm font-semibold px-7 py-3.5 text-white rounded-full transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #C4768A 0%, #8B3A52 100%)',
                boxShadow: '0 8px 24px rgba(139,58,82,0.35)',
              }}
            >
              <span>Book an Appointment</span>
              <IconChevronRight />
            </Link>
            <a
              href="https://wa.me/919129577514"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2.5 font-poppins text-sm font-semibold px-6 py-3.5 bg-[#25D366] text-white hover:opacity-90 transition-opacity rounded-full"
              style={{ boxShadow: '0 6px 20px rgba(37,211,102,0.25)' }}
            >
              <IconWhatsApp size={16} />
              <span>WhatsApp Consultation</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-1.5 font-poppins text-sm font-medium px-5 py-3.5 rounded-full border border-white/25 hover:border-white/40 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <span>Explore Services</span>
            </a>
          </div>

          {/* Trust strip */}
          <div
            className="flex flex-wrap items-center gap-5 pt-6"
            style={{
              animation: 'fadeUp .65s ease .35s both',
              borderTop: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            {[
              '100% Sealed Single-Use Kits',
              'Pay After Service (Zero Advance)',
              'Certified Female Estheticians',
            ].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.18)', color: '#EFCCD4' }}
                >
                  <IconCheck />
                </div>
                <span className="font-poppins text-xs font-medium text-white/85">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Luxury Frosted Trust Bar ── */}
      <div className="relative z-10 w-full border-t border-white/12 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-poppins text-white/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white/95 tracking-wide">
              Live At-Home Dispatch Available
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-[11px] font-medium tracking-wide">
            <span className="flex items-center gap-1.5 text-white/85">
              <svg className="w-3.5 h-3.5 text-[#C8974A]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <strong className="text-white">4.9 / 5</strong> (2,400+ Verified Appointments)
            </span>
            <span className="text-white/30">·</span>
            <span className="text-white/80">Autoclaved &amp; Disinfected Instruments</span>
            <span className="text-white/30">·</span>
            <span className="text-white/80">Zero Advance Deposit Required</span>
          </div>
          <Link href="/areas" className="text-[11px] font-semibold text-[#EFCCD4] hover:text-white transition-colors flex items-center gap-1">
            Coverage Areas →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────

function Marquee() {
  const doubled = [...MARQUEE, ...MARQUEE]
  return (
    <div className="overflow-hidden bg-rose py-3" aria-hidden="true">
      <div className="flex whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
        {doubled.map((item, i) => (
          <span key={i} className={`font-poppins text-[11px] tracking-widest uppercase px-4 font-medium ${item === '✦' ? 'text-white/40' : 'text-white/90'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="px-5 sm:px-8 md:px-16 py-24 max-w-7xl mx-auto" aria-labelledby="services-heading">
      <div className="text-center mb-16">
        <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">What We Offer</p>
        <h2 id="services-heading" className="font-playfair text-4xl md:text-5xl font-bold text-stone mb-4">Our <em className="text-rose font-serif italic">Six Divisions</em></h2>
        <p className="font-poppins text-stone-light text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Every service designed for results. Every artist certified. Everything brought to your doorstep.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => (
          <Link key={s.id} href={s.href}
            className="group relative rounded-3xl overflow-hidden block bg-white border border-rose/15 shadow-sm hover:shadow-2xl hover:shadow-rose/15 transition-all duration-500 hover:-translate-y-1.5"
            style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="relative h-60 overflow-hidden">
              <img src={s.image} alt={`${s.title} services at home — DoorStep Diva`}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <span className="absolute top-4 left-4 font-poppins text-[10px] font-bold tracking-widest uppercase text-white bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                {s.id}
              </span>
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 group-hover:bg-rose group-hover:border-rose text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <IconChevronRight />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-playfair text-2xl font-bold text-white mb-1">{s.title}</h3>
                <p className="font-poppins text-[10px] tracking-widest uppercase text-gold font-semibold">{s.tagline}</p>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-b from-white to-petal/30">
              <p className="font-poppins text-xs sm:text-sm text-stone-light leading-relaxed mb-4 line-clamp-2">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.tags.map((t) => (
                  <span key={t} className="bg-white border border-rose/10 font-poppins text-[10px] text-stone-light px-3 py-1 rounded-full font-medium shadow-2xs">{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-1 font-poppins text-xs font-semibold text-rose group-hover:gap-2 transition-all duration-200">
                <span>View Treatments</span>
                <span className="text-sm">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}



// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="bg-cream px-5 sm:px-8 md:px-16 py-24" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="grid grid-cols-2 gap-4">
          {STATS.map(({ n, label }, i) => (
            <div key={label} className={`rounded-2xl p-6 ${i === 0 ? 'bg-rose text-white' : 'bg-white border border-blush/40'}`}>
              <p className={`font-playfair text-4xl font-bold mb-1.5 ${i === 0 ? 'text-white' : 'text-rose'}`}>{n}</p>
              <p className={`font-poppins text-[10px] uppercase tracking-widest font-medium ${i === 0 ? 'text-white/70' : 'text-stone-light'}`}>{label}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">Our Story</p>
          <h2 id="about-heading" className="font-playfair text-4xl font-bold text-stone leading-tight mb-5">
            Beauty on<br /><em className="text-rose">your terms.</em>
          </h2>
          <p className="font-poppins text-stone-light text-sm leading-relaxed mb-4">
            DoorStep Diva was built on one belief — you shouldn&apos;t have to leave home for a luxury salon experience.
            We bring certified artists, professional tools, and premium products directly to you.
          </p>
          <p className="font-poppins text-stone-light text-sm leading-relaxed mb-8">
            Whether it&apos;s your wedding day, a festive event, or a regular self-care ritual — we&apos;re at your door,
            fully equipped, on your schedule.
          </p>
          <div className="flex flex-col gap-3">
            {[
              'Certified & trained beauty professionals',
              'Professional-grade salon products only',
              'All six divisions under one booking',
            ].map((point) => (
              <div key={point} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-rose/10 flex items-center justify-center text-rose flex-shrink-0">
                  <IconCheck />
                </div>
                <span className="font-poppins text-sm text-stone-light">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="px-5 sm:px-8 md:px-16 py-24 bg-petal" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">Real Clients</p>
          <h2 id="testimonials-heading" className="font-playfair text-4xl font-bold text-stone mb-3">
            What They <em className="text-rose">Say</em>
          </h2>
          <p className="font-poppins text-stone-light text-sm max-w-lg mx-auto">
            Hundreds of happy clients across Delhi NCR, Lucknow, and Ayodhya.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 border border-blush/20 hover:shadow-lg hover:shadow-rose/10 transition-all duration-300 flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    <IconStar />
                  </span>
                ))}
              </div>
              <p className="font-poppins text-xs text-stone-light leading-relaxed flex-1 mb-5">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="border-t border-blush/20 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-playfair text-sm font-bold text-stone flex-shrink-0"
                    style={{ background: t.accent }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-poppins text-xs font-semibold text-stone">{t.name}</p>
                    <p className="font-poppins text-[10px] text-stone-light">{t.location}</p>
                  </div>
                  <span className="ml-auto font-poppins text-[9px] text-rose font-semibold bg-petal px-2.5 py-1 rounded-full text-right">{t.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── LOCATIONS ────────────────────────────────────────────────────────────────

function Locations() {
  return (
    <section className="bg-cream px-5 sm:px-8 md:px-16 py-20" aria-labelledby="locations-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">Where We Operate</p>
          <h2 id="locations-heading" className="font-playfair text-4xl font-bold text-stone mb-3">
            We Come <em className="text-rose">To You</em>
          </h2>
          <p className="font-poppins text-stone-light text-sm max-w-xl mx-auto">
            Currently serving three cities — with more coming soon.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { city: 'Delhi NCR', areas: ['Delhi', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad'], accent: '#EFCCD4', note: 'Our largest service zone' },
            { city: 'Lucknow', areas: ['Hazratganj', 'Gomti Nagar', 'Alambagh', 'Indira Nagar', 'Aliganj'], accent: '#F0D8E8', note: 'City of Nawabs' },
            { city: 'Ayodhya', areas: ['City Centre', 'Ram Mandir Area', 'Faizabad Road', 'Surrounding Areas'], accent: '#F5E0D0', note: 'Now available' },
          ].map(({ city, areas, accent, note }) => (
            <div key={city} className="bg-white rounded-2xl p-7 border border-blush/20 hover:shadow-lg hover:shadow-rose/10 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-stone group-hover:scale-110 transition-transform duration-300"
                style={{ background: accent }}>
                <IconMapPin />
              </div>
              <h3 className="font-playfair text-xl font-bold text-stone mb-1">{city}</h3>
              <p className="font-poppins text-[10px] text-rose font-semibold tracking-wider uppercase mb-4">{note}</p>
              <div className="flex flex-col gap-1.5">
                {areas.map(a => (
                  <div key={a} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-rose/40 flex-shrink-0" />
                    <span className="font-poppins text-xs text-stone-light">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center font-poppins text-xs text-stone-light mt-7">
          Not sure if we cover your area?{' '}
          <a href="https://wa.me/919129577514" target="_blank" rel="noopener noreferrer" className="text-rose hover:underline font-medium">
            Message us on WhatsApp →
          </a>
        </p>
      </div>
    </section>
  )
}

// ─── ACADEMY TEASER ───────────────────────────────────────────────────────────

const ACADEMY_COURSES = [
  {
    slug: 'makeup',
    title: 'Makeup',
    duration: '1–2 months',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463680/Makeup_course_hetn7w.png',
    careers: ['Makeup Artist', 'Bridal Stylist'],
    accent: '#8B3A52',
  },
  {
    slug: 'hair',
    title: 'Hair',
    duration: '3–6 months',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463678/Hair_course_brxz2u.png',
    careers: ['Hair Colourist', 'Fashion Stylist'],
    accent: '#C8974A',
  },
  {
    slug: 'skin',
    title: 'Skin',
    duration: '3–6 months',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463675/Skin_course_dqtf7c.png',
    careers: ['Aesthetician', 'Beauty Therapist'],
    accent: '#C4768A',
  },
  {
    slug: 'nail-art',
    title: 'Nail Art',
    duration: '1–2 months',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463671/Nail_Art_course_taldxt.png',
    careers: ['Nail Technician', 'Nail Artist'],
    accent: '#8B3A52',
  },
  {
    slug: 'Cosmetology',
    title: 'Cosmetology',
    duration: '3–6 months',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463677/Cosmetology_Course_lf7c5p.png',
    careers: ['Salon Manager', 'Beauty Educator'],
    accent: '#B07080',
  },
]

const ACADEMY_STATS = [
  { n: '5+',    label: 'Professional Courses' },
  { n: '100%',  label: 'Hands-On Training'    },
  { n: '1:1',   label: 'Mentorship Focus'     },
  { n: '∞',     label: 'Career Possibilities' },
]

function AcademyTeaser() {
  return (
    <section
      id="academy"
      aria-labelledby="academy-heading"
      style={{ background: 'linear-gradient(135deg, #1C0812 0%, #2E0D1B 50%, #1A0710 100%)' }}
      className="relative overflow-hidden py-24 px-5 sm:px-8 md:px-16"
    >
      {/* Subtle background glow blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full opacity-[0.16]"
        style={{ background: '#C4768A', filter: 'blur(90px)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full opacity-[0.16]"
        style={{ background: '#C8974A', filter: 'blur(90px)' }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Top: label + headline + sub + CTAs ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full border"
              style={{ borderColor: 'rgba(196,118,138,0.30)', background: 'rgba(196,118,138,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#C4768A' }} />
              <span className="font-poppins text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: '#C4768A' }}>
                DoorStep Diva Academy
              </span>
            </div>

            {/* Headline */}
            <h2
              id="academy-heading"
              className="font-playfair font-bold leading-[1.1] mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#ffffff' }}
            >
              Turn Your Passion<br />
              <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(120deg, #C4768A 20%, #C8974A 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Into a Profession.
              </em>
            </h2>

            {/* Sub */}
            <p className="font-poppins text-sm leading-relaxed mb-7"
              style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '420px' }}>
              5 professional courses. Hands-on training by working artists. Industry certification on completion.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Class 10 Eligible', 'No Experience Needed', 'Certified on Completion', 'Taught by Pros'].map((pill) => (
                <span key={pill}
                  className="font-poppins text-[10px] font-medium px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(239,204,212,0.10)', color: 'rgba(239,204,212,0.80)', border: '1px solid rgba(239,204,212,0.15)' }}>
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end flex-shrink-0">
            <Link
              href="/academy"
              className="inline-flex items-center gap-2 font-poppins text-sm font-semibold px-6 py-3 rounded-full text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg,#C4768A,#8B3A52)', boxShadow: '0 8px 24px rgba(139,58,82,0.35)' }}
            >
              Explore All Courses
              <IconChevronRight />
            </Link>
            <Link
              href="/academy#enquire"
              className="inline-flex items-center gap-2 font-poppins text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.80)' }}
            >
              Enquire Now
            </Link>
          </div>
        </div>

        {/* ── Course cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
          {ACADEMY_COURSES.map((course) => (
            <Link
              key={course.slug}
              href={`/academy/${course.slug}`}
              className="group relative rounded-2xl overflow-hidden block"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
            >
              {/* Image */}
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <img
                  src={course.image}
                  alt={`${course.title} course at DoorStep Diva Academy`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                  style={{ transition: 'transform 0.7s ease' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Duration badge */}
                <span
                  className="absolute top-3 left-3 font-poppins text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(0,0,0,0.50)', color: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  {course.duration}
                </span>

                {/* Arrow */}
                <div
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: course.accent }}
                >
                  <IconChevronRight />
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <h3 className="font-playfair text-base font-bold text-white mb-1.5">{course.title}</h3>
                  <div className="flex flex-col gap-0.5">
                    {course.careers.map((c) => (
                      <span key={c} className="font-poppins text-[9px] text-white/60">{c}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover glow border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1.5px ${course.accent}70` }}
              />
            </Link>
          ))}
        </div>

        {/* ── Stats strip ── */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl p-6 sm:p-8"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {ACADEMY_STATS.map(({ n, label }) => (
            <div key={label} className="text-center">
              <p
                className="font-playfair text-3xl font-bold mb-1"
                style={{
                  background: 'linear-gradient(120deg, #C4768A, #C8974A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {n}
              </p>
              <p className="font-poppins text-[10px] uppercase tracking-widest font-medium"
                style={{ color: 'rgba(255,255,255,0.40)' }}>
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  return (
    <section className="px-5 sm:px-8 md:px-16 py-24 max-w-7xl mx-auto" aria-labelledby="faq-heading">
      <div className="grid md:grid-cols-5 gap-14 items-start">
        <div className="md:col-span-2 md:sticky top-24">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">Common Questions</p>
          <h2 id="faq-heading" className="font-playfair text-4xl font-bold text-stone mb-5">
            FAQ<em className="text-rose">s</em>
          </h2>
          <p className="font-poppins text-stone-light text-sm leading-relaxed mb-7">
            Everything you need to know before your first booking. Still have questions? We&apos;re one message away.
          </p>
          <a href="https://wa.me/919129577514" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-poppins text-xs font-semibold px-5 py-2.5 bg-[#25D366] text-white hover:opacity-90 transition-opacity rounded-full">
            <IconWhatsApp size={13} />
            Ask on WhatsApp
          </a>
        </div>
        <div className="md:col-span-3 flex flex-col gap-2">
          {FAQS.map((faq, i) => (
            <details key={i} className="group bg-white rounded-xl border border-blush/20 overflow-hidden">
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-petal/50 transition-colors">
                <span className="font-poppins text-sm font-semibold text-stone group-open:text-rose transition-colors">
                  {faq.q}
                </span>
                <span className="flex-shrink-0 w-5 h-5 rounded-full border border-blush/40 flex items-center justify-center text-rose font-bold text-xs transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 pb-4 pt-1">
                <p className="font-poppins text-xs text-stone-light leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name.trim(),
          customer_phone: formData.phone.trim(),
          customer_email: formData.email.trim(),
          customer_address: 'Direct Homepage Booking Form',
          service_type: formData.service || 'General Service Enquiry',
          city: 'lucknow',
          notes: formData.message.trim() || undefined,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setFormData({ name: '', phone: '', email: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="px-5 sm:px-8 md:px-16 py-24 max-w-7xl mx-auto" aria-labelledby="contact-heading">
      <div
        className="rounded-3xl p-7 sm:p-10 md:p-14 grid md:grid-cols-2 gap-10 md:gap-14 items-start relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1C0812 0%, #300C1B 50%, #1A0710 100%)',
          border: '1px solid rgba(200, 151, 74, 0.28)',
          boxShadow: '0 24px 60px rgba(28, 8, 18, 0.35)',
        }}
      >
        <div aria-hidden="true" className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C8974A 0%, transparent 70%)' }} />

        {/* Left */}
        <div className="relative z-10">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose-light font-semibold mb-3">Get in Touch</p>
          <h2 id="contact-heading" className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Book your<br /><em className="text-blush">session.</em>
          </h2>
          <p className="font-poppins text-white/50 text-sm leading-relaxed mb-7">
            Fill in the form and we&apos;ll confirm your booking within a few hours. Or message us directly on WhatsApp for an instant response.
          </p>
          <a href="https://wa.me/919129577514" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-poppins text-sm font-medium px-6 py-3 bg-[#25D366] text-white hover:opacity-90 transition-opacity rounded-full">
            <IconWhatsApp size={16} />
            Message on WhatsApp
          </a>
          <div className="mt-8 space-y-3">
            {[
              { icon: <IconMapPin />, label: 'Delhi NCR · Lucknow · Ayodhya' },
              { icon: <IconClock />, label: 'Response within 2–3 hours' },
              { icon: <IconCreditCard />, label: 'UPI · Cash · Bank Transfer' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-rose/60">{icon}</span>
                <span className="font-poppins text-xs text-white/50">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="relative z-10">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center text-center py-14 px-6">
              <div className="w-14 h-14 rounded-full bg-rose/20 flex items-center justify-center text-rose mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-2">Booking Request Sent!</h3>
              <p className="font-poppins text-sm text-white/70 leading-relaxed mb-6">
                We&apos;ve recorded your booking in our system. Our coordinator will call you shortly to confirm your certified artist.
              </p>
              <a
                href={`https://wa.me/919129577514?text=${encodeURIComponent('Hi DoorStep Diva! I just submitted a booking request on your website. Please confirm my artist arrival!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 font-poppins text-xs font-semibold px-5 py-3 bg-[#25D366] text-white rounded-full hover:opacity-90 transition-opacity mb-5"
              >
                <IconWhatsApp size={16} />
                Message Coordinator on WhatsApp for Instant Confirmation
              </a>
              <div>
                <button
                  onClick={() => setStatus('idle')}
                  className="font-poppins text-xs font-medium px-5 py-2.5 border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors rounded-full"
                >
                  Submit another request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <input name="name" type="text" placeholder="Your Name *" required value={formData.name} onChange={handleChange}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 font-poppins text-sm text-white placeholder:text-white/30 outline-none focus:border-blush/50 focus:bg-white/15 transition-all" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <input name="phone" type="tel" placeholder="Phone / WhatsApp *" required value={formData.phone} onChange={handleChange}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 font-poppins text-sm text-white placeholder:text-white/30 outline-none focus:border-blush/50 focus:bg-white/15 transition-all" />
                </div>
              </div>
              <input name="email" type="email" placeholder="Email (optional — for confirmation)" value={formData.email} onChange={handleChange}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 font-poppins text-sm text-white placeholder:text-white/30 outline-none focus:border-blush/50 focus:bg-white/15 transition-all" />
              <select name="service" required value={formData.service} onChange={handleChange}
                className="w-full border border-white/10 rounded-xl px-4 py-3 font-poppins text-sm outline-none focus:border-blush/50 transition-all appearance-none"
                style={{ background: 'rgba(255,255,255,0.12)', color: formData.service ? '#ffffff' : 'rgba(255,255,255,0.45)' }}>
                <option value="" disabled style={{ background: '#240A17', color: '#ffffff' }}>Service You Need *</option>
                <option value="Hair" style={{ background: '#240A17', color: '#ffffff' }}>Hair — Cuts, Color, Treatments</option>
                <option value="Skin" style={{ background: '#240A17', color: '#ffffff' }}>Skin — Waxing, Facials, Body Care</option>
                <option value="Makeup" style={{ background: '#240A17', color: '#ffffff' }}>Makeup — Party, Bridal, Events</option>
                <option value="Eyelash" style={{ background: '#240A17', color: '#ffffff' }}>Eyelash — Classic, Hybrid, Volume</option>
                <option value="Semi-Permanent" style={{ background: '#240A17', color: '#ffffff' }}>Semi-Permanent — Microblading, Microneedling</option>
                <option value="Nails" style={{ background: '#240A17', color: '#ffffff' }}>Nail Extensions — Acrylic, Gel, PolyGel</option>
                <option value="Multiple / Package" style={{ background: '#240A17', color: '#ffffff' }}>Multiple Services / Package</option>
              </select>
              <textarea name="message" rows={3} placeholder="Anything else? (date, location, special requests...)" value={formData.message} onChange={handleChange}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 font-poppins text-sm text-white placeholder:text-white/30 outline-none focus:border-blush/50 focus:bg-white/15 transition-all resize-none" />
              {status === 'error' && (
                <p className="font-poppins text-xs text-rose-light text-center">
                  Something went wrong. Please try WhatsApp instead.
                </p>
              )}
              <button type="submit" disabled={status === 'sending'}
                className="w-full font-poppins text-sm font-semibold px-6 py-3.5 bg-rose text-white hover:bg-mauve disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300 rounded-xl tracking-wide">
                {status === 'sending' ? 'Sending…' : 'Send Booking Request'}
              </button>
              <p className="font-poppins text-[10px] text-white/25 text-center">
                No spam. Your details are only used to confirm your booking.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <BeforeAfterSlider />
      <HygieneProtocol />
      <BridalTimeline />
      <PinnedRitualStory />
      <About />
      <Testimonials />
      <Locations />
      <AcademyTeaser />
      <FAQ />
      <Contact />
    </>
  )
}