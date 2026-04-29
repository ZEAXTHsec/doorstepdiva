'use client'
import React, { useState } from 'react'
import Link from 'next/link'

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

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Book in 60 Seconds',
    desc: 'Message us on WhatsApp or call directly. Tell us the service, your location, and preferred time. No app, no login needed.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    accent: '#EFCCD4',
  },
  {
    step: '02',
    title: 'We Arrive Fully Equipped',
    desc: 'Your certified artist arrives on time with all professional tools, premium products, and everything needed for a full salon experience.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    ),
    accent: '#F0D8E8',
  },
  {
    step: '03',
    title: 'You Glow, Effortlessly',
    desc: 'Sit back and enjoy. Zero travel, zero parking, zero waiting room. Just results — delivered in the comfort of your own home.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
    accent: '#F5E0D0',
  },
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

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="DoorStep Diva — At-home beauty services"
    >
      {/* ── Hero background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175036/Cover_ksobok.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center sm:object-right"
        />
        {/* Dark gradient overlay so text stays readable */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(100deg, rgba(20,6,10,0.88) 0%, rgba(30,10,15,0.75) 35%, rgba(30,10,15,0.40) 60%, rgba(30,10,15,0.05) 100%)',
        }} />
        {/* Subtle pink warmth */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 50% 80% at 15% 55%, rgba(196,118,138,0.15) 0%, transparent 65%)',
        }} />
      </div>
      {/* ── Petal / bloom decorative SVG shapes ── */}
      {/* Large soft petal — top right */}
      <div aria-hidden="true" className="absolute -top-24 -right-24 w-[520px] h-[520px] pointer-events-none"
        style={{ opacity: 0.18 }}>
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

      {/* Medium petal — bottom left */}
      <div aria-hidden="true" className="absolute -bottom-16 -left-16 w-[380px] h-[380px] pointer-events-none"
        style={{ opacity: 0.13 }}>
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

      {/* Floating petal dots — decorative */}
      {[
        { top: '18%', left: '8%',  size: 10, opacity: 0.25, color: '#C4768A' },
        { top: '72%', left: '12%', size:  7, opacity: 0.20, color: '#C8974A' },
        { top: '35%', right: '6%', size: 13, opacity: 0.18, color: '#EFCCD4' },
        { top: '80%', right: '9%', size:  8, opacity: 0.22, color: '#C4768A' },
        { top: '55%', left: '4%',  size:  5, opacity: 0.30, color: '#C8974A' },
      ].map((d, i) => (
        <div key={i} aria-hidden="true" className="absolute rounded-full pointer-events-none"
          style={{ top: d.top, left: (d as any).left, right: (d as any).right,
            width: d.size, height: d.size, background: d.color, opacity: d.opacity,
            animation: `float ${3.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` }} />
      ))}

      {/* Mesh gradient overlay */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 75% 40%, rgba(239,204,212,0.35) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 60% at 10% 70%, rgba(200,151,74,0.08) 0%, transparent 60%)' }} />

      {/* ── Main content grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-16 w-full py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT — copy ── */}
          <div>
            {/* Eyebrow badge */}
            <div
              className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full border"
              style={{
                animation: 'fadeUp .55s ease both',
                background: 'rgba(255,255,255,0.10)',
                borderColor: 'rgba(255,255,255,0.25)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" style={{ animation: 'pulseRing 2s ease-out infinite' }} />
              <span className="font-poppins text-[10.5px] font-semibold tracking-[0.22em] uppercase" style={{ color: "rgba(239,204,212,0.90)" }}>
                Now Serving Delhi NCR · Lucknow · Ayodhya
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-playfair font-bold leading-[1.07] mb-6"
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)',
                animation: 'fadeUp .65s ease .08s both',
                color: '#ffffff',
              }}
            >
              Brows. Skin. Hair.<br />
              <em
                className="not-italic"
                style={{
                  background: 'linear-gradient(120deg, #C4768A 20%, #8B3A52 80%)',
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
              className="font-poppins text-sm sm:text-[0.95rem] leading-[1.85] mb-9 max-w-[480px]"
              style={{ color: "rgba(255,255,255,0.70)", animation: 'fadeUp .65s ease .17s both' }}
            >
              Delhi’s only at-home semi-permanent brow studio — microblading, combo brows &amp; eyebrow lifting by certified artists. Plus hair, skin, makeup, lashes &amp; nails, delivered wherever you are.
            </p>

            {/* CTA row */}
            <div
              className="flex flex-wrap items-center gap-3 mb-10"
              style={{ animation: 'fadeUp .65s ease .26s both' }}
            >
              <a
                href="#contact"
                className="btn-press inline-flex items-center gap-2 font-poppins text-sm font-semibold px-6 py-3 text-white rounded-full transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #C4768A 0%, #8B3A52 100%)',
                  boxShadow: '0 8px 24px rgba(139,58,82,0.28)',
                }}
              >
                Book a Session
                <IconChevronRight />
              </a>
              <a
                href="https://wa.me/917985183449"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 font-poppins text-sm font-semibold px-6 py-3 bg-[#25D366] text-white hover:opacity-90 transition-opacity rounded-full"
                style={{ boxShadow: '0 6px 20px rgba(37,211,102,0.22)' }}
              >
                <IconWhatsApp size={15} />
                WhatsApp
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 font-poppins text-sm font-medium px-5 py-3 rounded-full border transition-colors duration-200" style={{ borderColor: "rgba(255,255,255,0.30)", color: "rgba(255,255,255,0.80)" }}
              >
                Explore Services
              </a>
            </div>

            {/* Trust strip */}
            <div
              className="flex flex-wrap items-center gap-5 pt-6"
              style={{
                animation: 'fadeUp .65s ease .35s both',
                borderTop: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {['Certified Artists', 'Premium Products', 'At-Home Comfort'].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.15)', color: '#EFCCD4' }}
                  >
                    <IconCheck />
                  </div>
                  <span className="font-poppins text-xs font-medium" style={{ color: "rgba(255,255,255,0.70)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — floating brand card cluster ── */}
          <div
            className="hidden lg:flex flex-col items-end gap-4"
            style={{ animation: 'fadeUp .8s ease .4s both' }}
            aria-hidden="true"
          >
            {/* Main brand card */}
            <div
              className="w-72 rounded-3xl p-7 relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #fff 0%, #fdf0f4 100%)',
                border: '1px solid rgba(196,118,138,0.18)',
                boxShadow: '0 20px 60px rgba(139,58,82,0.12), 0 4px 16px rgba(139,58,82,0.07)',
              }}
            >
              {/* Gold accent line */}
              <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, #C8974A, transparent)' }} />

              {/* Logo text replica */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #EFCCD4, #C4768A)' }}>
                  {/* Petal icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C12 2 7 6 7 11C7 13.76 9.24 16 12 16C14.76 16 17 13.76 17 11C17 6 12 2 12 2Z" fill="white" fillOpacity="0.9"/>
                    <path d="M12 16C12 16 7 14 5 11C3.5 14 5 18 8 20C9.5 21 11 21.5 12 22C13 21.5 14.5 21 16 20C19 18 20.5 14 19 11C17 14 12 16 12 16Z" fill="white" fillOpacity="0.7"/>
                  </svg>
                </div>
                <div>
                  <p className="font-playfair text-base font-bold text-stone leading-none">DoorStep Diva</p>
                  <p className="font-poppins text-[9px] tracking-[0.22em] uppercase mt-1" style={{ color: '#C8974A' }}>
                    at-home beauty
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#C8974A">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <span className="font-poppins text-xs font-semibold text-stone">4.9</span>
                <span className="font-poppins text-[10px] text-stone-light">Client Rating</span>
              </div>

              {/* Divider */}
              <div className="h-px mb-5" style={{ background: 'rgba(196,118,138,0.15)' }} />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { n: '06', label: 'Divisions' },
                  { n: '15+', label: 'Brands' },
                  { n: '100%', label: 'Certified' },
                ].map(({ n, label }) => (
                  <div key={label} className="text-center">
                    <p className="font-playfair text-xl font-bold" style={{ color: '#8B3A52' }}>{n}</p>
                    <p className="font-poppins text-[9px] text-stone-light uppercase tracking-wider mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* CTA mini */}
              <div
                className="flex items-center justify-between rounded-xl px-4 py-3 mt-1"
                style={{ background: 'linear-gradient(120deg, #EFCCD4 0%, #f9e0e8 100%)' }}
              >
                <div>
                  <p className="font-poppins text-[9px] uppercase tracking-widest font-semibold" style={{ color: '#8B3A52' }}>Most Booked</p>
                  <p className="font-playfair text-sm font-semibold text-stone mt-0.5">Bridal Package</p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #C4768A, #8B3A52)' }}>
                  <IconChevronRight />
                </div>
              </div>
            </div>

            {/* Second smaller card */}
            <div
              className="w-56 rounded-2xl p-4 flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #3D2B2B 0%, #5a3d3d 100%)',
                boxShadow: '0 12px 32px rgba(61,43,43,0.20)',
                marginRight: '2rem',
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(196,118,138,0.25)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EFCCD4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="font-poppins text-[9px] uppercase tracking-wider text-white/50 font-medium">Serving</p>
                <p className="font-poppins text-xs font-semibold text-white leading-snug mt-0.5">Delhi NCR · Lucknow<br />Ayodhya</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" aria-hidden="true">
        <span className="font-poppins text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.40)' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.30), transparent)' }} />
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
        <h2 id="services-heading" className="font-playfair text-4xl md:text-5xl font-bold text-stone mb-4">Our <em>Six Divisions</em></h2>
        <p className="font-poppins text-stone-light text-sm max-w-lg mx-auto leading-relaxed">
          Every service designed for results. Every artist certified. Everything brought to you.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => (
          <Link key={s.id} href={s.href}
            className="group relative rounded-2xl overflow-hidden block shadow-sm hover:shadow-xl transition-all duration-500"
            style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="relative h-56 overflow-hidden">
              <img src={s.image} alt={`${s.title} services at home — DoorStep Diva`}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute top-3 left-3 font-poppins text-[10px] font-bold tracking-widest uppercase text-white/80 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                {s.id}
              </span>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 group-hover:bg-rose group-hover:border-rose text-white flex items-center justify-center transition-all duration-300">
                <IconChevronRight />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-playfair text-xl font-semibold text-white mb-0.5">{s.title}</h3>
                <p className="font-poppins text-[10px] tracking-widest uppercase text-white/70 font-medium">{s.tagline}</p>
              </div>
            </div>
            <div className="p-5" style={{ background: `${s.accent}55` }}>
              <p className="font-poppins text-xs text-stone-light leading-relaxed mb-3 line-clamp-2">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="bg-white/70 font-poppins text-[10px] text-stone-light px-2.5 py-0.5 rounded-full font-medium">{t}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ─── HYGIENE & SAFETY ─────────────────────────────────────────────────────────

const TRUST_BADGES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Sanitized Tools',
    desc: 'Every tool is sterilized before each visit — no exceptions.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: 'Single-Use Disposables',
    desc: 'Gloves, applicators and sheets are used once and discarded.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M6 20v-2a6 6 0 0112 0v2"/>
        <polyline points="16 11 17.5 13 20 10"/>
      </svg>
    ),
    title: 'Certified Artists',
    desc: '100% trained & certified professionals, background-verified.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Premium Brands Only',
    desc: 'We use top-tier, skin-safe products — nothing cheap or harmful.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    title: 'Fully Insured Service',
    desc: 'Every session is covered — your safety and peace of mind matter.',
  },
]

function HygieneSafety() {
  return (
    <section className="py-20 sm:py-24" style={{ background: '#FDF8F8' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="font-poppins text-[10px] font-semibold tracking-[0.2em] uppercase text-rose-light mb-3">
            Your Safety First
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone mb-4">
            Clean. Safe. <em className="text-rose">Professional.</em>
          </h2>
          <p className="font-poppins text-sm text-stone-light max-w-md mx-auto leading-relaxed">
            Every DoorStep Diva visit follows strict hygiene protocols — so you can relax completely.
          </p>
        </div>

        {/* Badges grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {TRUST_BADGES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-6 rounded-2xl"
              style={{
                background: 'white',
                border: '1px solid rgba(196,118,138,0.12)',
                boxShadow: '0 4px 20px rgba(139,58,82,0.06)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-rose"
                style={{ background: 'rgba(196,118,138,0.1)' }}
              >
                {icon}
              </div>
              <h3 className="font-poppins text-sm font-semibold text-stone mb-2">{title}</h3>
              <p className="font-poppins text-xs text-stone-light leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────

function HowItWorks() {
  return (
    <section className="bg-stone px-5 sm:px-8 md:px-16 py-24 overflow-hidden relative" aria-labelledby="how-heading">
      <div aria-hidden="true" className="absolute -left-32 top-0 w-96 h-96 rounded-full opacity-5" style={{ background: '#EFCCD4' }} />
      <div aria-hidden="true" className="absolute -right-32 bottom-0 w-64 h-64 rounded-full opacity-5" style={{ background: '#F0D8E8' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose-light font-semibold mb-3">Simple Process</p>
          <h2 id="how-heading" className="font-playfair text-4xl font-bold text-white mb-4">
            How It <em className="text-blush">Works</em>
          </h2>
          <p className="font-poppins text-white/50 text-sm max-w-lg mx-auto">
            From booking to glow — the entire experience takes minutes to arrange.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <div aria-hidden="true" className="hidden md:block absolute top-14 left-[calc(16.7%+1rem)] right-[calc(16.7%+1rem)] h-px bg-white/10" />
          {HOW_IT_WORKS.map((step) => (
            <div key={step.step} className="relative flex flex-col items-center text-center group">
              <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-5 text-stone group-hover:scale-110 transition-transform duration-300"
                style={{ background: step.accent }}>
                {step.icon}
              </div>
              <p className="font-poppins text-[10px] tracking-widest uppercase text-white/30 font-semibold mb-2">{step.step}</p>
              <h3 className="font-playfair text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="font-poppins text-xs text-white/50 leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-poppins text-sm font-semibold px-6 py-3 bg-[#25D366] text-white hover:opacity-90 transition-opacity rounded-full shadow-lg shadow-black/20">
            <IconWhatsApp size={15} />
            Book Your First Session
          </a>
        </div>
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
          <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer" className="text-rose hover:underline font-medium">
            Message us on WhatsApp →
          </a>
        </p>
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
          <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
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
      const fd = new FormData()
      fd.append('access_key', '10edd539-4395-49ea-be12-105d1439f716')
      fd.append('subject', `New Booking Request — ${formData.service || 'General Enquiry'}`)
      fd.append('name', formData.name)
      fd.append('phone', formData.phone)
      fd.append('email', formData.email)
      fd.append('service', formData.service)
      fd.append('message', formData.message)
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (data.success) {
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
      <div className="bg-stone rounded-3xl p-7 sm:p-10 md:p-14 grid md:grid-cols-2 gap-10 md:gap-14 items-start relative overflow-hidden">
        <div aria-hidden="true" className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: '#EFCCD4' }} />

        {/* Left */}
        <div className="relative z-10">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose-light font-semibold mb-3">Get in Touch</p>
          <h2 id="contact-heading" className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Book your<br /><em className="text-blush">session.</em>
          </h2>
          <p className="font-poppins text-white/50 text-sm leading-relaxed mb-7">
            Fill in the form and we&apos;ll confirm your booking within a few hours. Or message us directly on WhatsApp for an instant response.
          </p>
          <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
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
              <h3 className="font-playfair text-2xl font-bold text-white mb-2">Request Sent!</h3>
              <p className="font-poppins text-sm text-white/50 leading-relaxed mb-7">
                We&apos;ve received your booking request. Our team will get back to you within a few hours to confirm.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="font-poppins text-xs font-medium px-5 py-2.5 border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors rounded-full"
              >
                Submit another request
              </button>
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
                <option value="" disabled style={{ background: '#3D2B2B', color: '#ffffff' }}>Service You Need *</option>
                <option value="Hair" style={{ background: '#3D2B2B', color: '#ffffff' }}>Hair — Cuts, Color, Treatments</option>
                <option value="Skin" style={{ background: '#3D2B2B', color: '#ffffff' }}>Skin — Waxing, Facials, Body Care</option>
                <option value="Makeup" style={{ background: '#3D2B2B', color: '#ffffff' }}>Makeup — Party, Bridal, Events</option>
                <option value="Eyelash" style={{ background: '#3D2B2B', color: '#ffffff' }}>Eyelash — Classic, Hybrid, Volume</option>
                <option value="Semi-Permanent" style={{ background: '#3D2B2B', color: '#ffffff' }}>Semi-Permanent — Microblading, Microneedling</option>
                <option value="Nails" style={{ background: '#3D2B2B', color: '#ffffff' }}>Nail Extensions — Acrylic, Gel, PolyGel</option>
                <option value="Multiple / Package" style={{ background: '#3D2B2B', color: '#ffffff' }}>Multiple Services / Package</option>
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
      <HygieneSafety />
      <HowItWorks />
      <About />
      <Testimonials />
      <Locations />
      <FAQ />
      <Contact />
    </>
  )
}