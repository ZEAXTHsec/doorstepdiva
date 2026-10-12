'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { WhatsAppIcon } from './WhatsAppIcon'

interface StudentProject {
  id: string
  studentName: string
  batch: string
  course: string
  category: 'all' | 'makeup' | 'hair' | 'skin' | 'nails'
  title: string
  outcome: string
  technique: string
  quote: string
  image: string
}

const PROJECTS: StudentProject[] = [
  {
    id: 'pooja-bridal',
    studentName: 'Pooja Srivastava',
    batch: 'Class of 2024 · Makeup Artistry',
    course: 'Professional Makeup Artistry',
    category: 'makeup',
    title: 'Royal Kundan HD Bridal Makeover',
    outcome: 'Now Independent Bridal Stylist (Booked 14 brides this wedding season)',
    technique: 'Airbrush base, warm copper cut-crease, micro-lash layering & jewellery pinning',
    quote: 'Before joining Doorstep Diva Academy, I had never handled professional airbrush gear. Week 3 had us practicing on live models. That confidence transformed my career.',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png',
  },
  {
    id: 'sneha-balayage',
    studentName: 'Sneha Rawat',
    batch: 'Class of 2024 · Hair Architecture',
    course: 'Advanced Hair Styling & Color',
    category: 'hair',
    title: 'Seamless Honey-Caramel Balayage & Blowout',
    outcome: 'Promoted to Senior Colorist at Premium Studio in Lucknow',
    technique: 'Freehand clay lightening, Olaplex bond recovery, root shadowing & curtain blowout',
    quote: 'The colour theory module taught me exact formulation for Indian undertones without brassiness. High-end salons wanted to interview me immediately upon graduation.',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png',
  },
  {
    id: 'komal-glass-skin',
    studentName: 'Komal Mishra',
    batch: 'Class of 2024 · Clinical Skin',
    course: 'Skin & Advanced Aesthetics',
    category: 'skin',
    title: 'Glass Skin Korean Hydra-Infusion Treatment',
    outcome: 'DoorStep Diva Aesthetician Partner (45+ recurring monthly clients)',
    technique: 'Ultrasonic scrubber pore detox, peptide infusion, cold hammer seal & alginate mask',
    quote: 'They didn’t just teach facial steps; they taught clinical dermatological assessments, sterile standards, and how to address acne and pigmentation safely.',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
  },
  {
    id: 'ananya-nail-art',
    studentName: 'Ananya Pandey',
    batch: 'Class of 2024 · Nail Artistry',
    course: 'Professional Nail Extensions & 3D Art',
    category: 'nails',
    title: 'Encapsulated 3D Floral Ombré Extensions',
    outcome: 'Opened Independent Nail Studio in Ayodhya',
    technique: 'Russian dry e-file prep, PolyGel architecture, encapsulated gold leaf & mirror chrome',
    quote: 'Nail architecture requires millimeter precision. Having master mentors inspect my cuticles and apex curves enabled me to start taking paid clients before graduation.',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png',
  },
  {
    id: 'ritika-pmu',
    studentName: 'Ritika Sen',
    batch: 'Class of 2024 · Cosmetology',
    course: 'Cosmetology & PMU',
    category: 'makeup',
    title: 'Hyper-Realistic Microblading & 3D Volume Lashes',
    outcome: 'Certified PMU Artist charging ₹6,000+ per appointment',
    technique: 'Golden ratio brow mapping, sterile nano-blade hair strokes & Russian volume fans',
    quote: 'The strict hygiene protocols and surgical sterilization standards taught here gave my clients complete peace of mind. My brow bookings are full 3 weeks ahead.',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png',
  },
  {
    id: 'priyanka-clinical',
    studentName: 'Priyanka Verma',
    batch: 'Class of 2024 · Cosmetology',
    course: 'Complete Cosmetology',
    category: 'skin',
    title: 'Painless RICA Waxing & Full Body De-Tan Ritual',
    outcome: 'Certified Salon Specialist with 4.98★ client rating',
    technique: 'Liposoluble RICA application with zero skin peel, botanical pre-wax oil prep & post-wax calming',
    quote: 'The salon business and client management modules gave me the business acumen to handle VIP clients and build my own loyal following.',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
  },
]

const TABS = [
  { key: 'all', label: 'All Disciplines' },
  { key: 'makeup', label: 'Bridal & Makeup' },
  { key: 'hair', label: 'Hair & Balayage' },
  { key: 'skin', label: 'Skin & Facials' },
  { key: 'nails', label: 'Nail Extensions' },
] as const

export default function StudentShowcase() {
  const [activeTab, setActiveTab] = useState<'all' | 'makeup' | 'hair' | 'skin' | 'nails'>('all')

  const filtered = activeTab === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeTab)

  return (
    <section id="alumni-showcase" className="py-24 md:py-32 relative overflow-hidden bg-white">
      {/* Decorative gradient backdrops */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196,118,138,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3"
            style={{ background: 'rgba(200,151,74,0.12)', border: '1px solid rgba(200,151,74,0.30)' }}>
            <span className="font-poppins text-xs font-semibold tracking-[0.2em] uppercase text-[#966B26]">
              Real Student Portfolios
            </span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#3D2B2B' }}>
            Live Student Makeovers & Transformations
          </h2>

          <p className="font-poppins text-sm sm:text-base leading-relaxed" style={{ color: '#7A5C5C' }}>
            No stock photos or theoretical exercises. See real artistry crafted by our students on live models during hands-on class assignments.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`font-poppins text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-stone-light hover:text-stone hover:bg-rose/5 border border-stone-light/20'
                }`}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #8B3A52, #C4768A)' : 'transparent',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl overflow-hidden bg-petal/40 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              style={{
                borderColor: 'rgba(196,118,138,0.20)',
              }}
            >
              {/* Image Preview */}
              <div className="relative w-full h-64 overflow-hidden bg-petal-dark/30">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 40%, rgba(61,43,43,0.7) 100%)',
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span
                    className="font-poppins text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white backdrop-blur-md"
                    style={{ background: 'rgba(139,58,82,0.85)' }}
                  >
                    {item.course}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-poppins text-[11px] font-semibold text-gold">Student Project:</p>
                  <h3 className="font-playfair text-lg font-bold leading-tight">{item.title}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Student & Batch info */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose/10">
                    <div>
                      <p className="font-poppins text-xs font-bold" style={{ color: '#3D2B2B' }}>
                        {item.studentName}
                      </p>
                      <p className="font-poppins text-[10px]" style={{ color: '#7A5C5C' }}>
                        {item.batch}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-green-50 text-green-700 border border-green-200">
                      ✓ Certified
                    </span>
                  </div>

                  {/* Career Outcome */}
                  <div className="mb-3 p-2.5 rounded-xl bg-white border border-gold/25">
                    <p className="font-poppins text-[10px] uppercase font-bold text-gold tracking-wider mb-0.5">
                      Career Outcome:
                    </p>
                    <p className="font-poppins text-xs font-semibold" style={{ color: '#3D2B2B' }}>
                      {item.outcome}
                    </p>
                  </div>

                  {/* Technique Tag */}
                  <p className="font-poppins text-[11px] leading-relaxed mb-4" style={{ color: '#7A5C5C' }}>
                    <strong className="text-stone">Key Technique:</strong> {item.technique}
                  </p>

                  {/* Student Quote */}
                  <blockquote
                    className="font-poppins text-xs italic p-3 rounded-xl mb-4 relative"
                    style={{ background: 'rgba(255,255,255,0.7)', color: '#5A3E3E', borderLeft: '3px solid #C4768A' }}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                {/* WhatsApp Action to discuss this specific course */}
                <a
                  href={`https://wa.me/919129577514?text=${encodeURIComponent(
                    `Namaste! I saw the student work by ${item.studentName} (${item.course}) on your website. I want to know more about this syllabus and upcoming batch dates.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 font-poppins text-xs font-semibold py-2.5 px-4 rounded-xl text-white transition-opacity hover:opacity-90"
                  style={{ background: '#8B3A52' }}
                >
                  <WhatsAppIcon size={14} />
                  Ask About This Course on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 1-Day Demo Class Highlight Card inside Showcase */}
        <div
          className="mt-14 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, #FDF0F0 0%, #FFF3EE 100%)',
            border: '1px solid rgba(200,151,74,0.35)',
            boxShadow: '0 8px 30px rgba(200,151,74,0.08)',
          }}
        >
          <div className="max-w-xl">
            <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#966B26]">
              Want To Experience A Practical Session First?
            </span>
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold mt-1 mb-2" style={{ color: '#3D2B2B' }}>
              Sit In On A Live Class This Saturday
            </h3>
            <p className="font-poppins text-xs sm:text-sm text-stone-light leading-relaxed">
              Observe our instructors demonstrate live techniques, inspect our professional student kit, and talk to current batch students before paying a single rupee.
            </p>
          </div>

          <a
            href="https://wa.me/919129577514?text=Namaste%20DoorStep%20Diva%20Academy!%20I%20would%20like%20to%20register%20for%20a%20Free%201-Day%20Trial%20Demo%20Class.%20Please%20share%20the%20next%20available%20batch%20date%20and%20timings."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2.5 font-poppins text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full text-white shadow-md hover:scale-[1.03] transition-all"
            style={{ background: '#25D366' }}
          >
            <WhatsAppIcon size={16} />
            Reserve Free 1-Day Demo Seat
          </a>
        </div>
      </div>
    </section>
  )
}
