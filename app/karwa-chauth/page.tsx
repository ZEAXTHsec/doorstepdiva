import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Karwa Chauth At-Home Salon Packages — Delhi NCR & Lucknow | DoorStep Diva',
  description:
    'Look and feel your best this Karwa Chauth without 3-hour parlor queues. Exclusive at-home beauty rituals from ₹999: Chandni Glow, Silky Shine & Chaand Sa Noor. Certified female artists delivering single-use sealed kits across Delhi NCR & Lucknow.',
  keywords:
    'karwa chauth salon at home, karwa chauth beauty packages delhi, home salon lucknow karwa chauth, at home parlour karwa chauth, karwa chauth facial offers, doorstep mehendi hair spa, chandni glow ritual, chaand sa noor',
  alternates: {
    canonical: 'https://mydoorstepdiva.com/karwa-chauth',
  },
  openGraph: {
    title: 'Karwa Chauth At-Home Salon Packages — Delhi NCR & Lucknow | DoorStep Diva',
    description:
      'Skip parlor queues while fasting. Exclusive festive beauty packages from ₹999 delivered to your doorstep in Delhi NCR and Lucknow.',
    url: 'https://mydoorstepdiva.com/karwa-chauth',
    images: [{ url: 'https://mydoorstepdiva.com/images/og-image.jpg', width: 1200, height: 630, alt: 'DoorStep Diva Karwa Chauth At-Home Salon Service' }],
    type: 'website',
  },
}

interface FestivePackage {
  id: string
  name: string
  badge: string
  price: number
  popular?: boolean
  description: string
  services: string[]
}

const FESTIVE_PACKAGES: FestivePackage[] = [
  {
    id: 'chandni-glow',
    name: 'Chandni Glow Ritual',
    badge: 'Essential Festive Glow',
    price: 999,
    description: 'Fresh radiance and relaxation curated for effortless pre-fasting skincare preparation.',
    services: [
      'Fruit or suitable skin-type facial',
      'Arm waxing',
      'Face mask',
      'Eyebrow & upper-lip threading',
      'Relaxing head massage',
    ],
  },
  {
    id: 'silky-shine',
    name: 'Silky Shine Ritual',
    badge: 'Most Popular Choice',
    price: 1299,
    popular: true,
    description: 'Complete nourishment featuring hair spa therapy, deep cleanup, and comprehensive waxing.',
    services: [
      'Express facial or cleanup',
      'Nourishing hair spa',
      'Arms & underarm waxing',
      'Eyebrow & upper-lip threading',
      'Face mask',
    ],
  },
  {
    id: 'chaand-sa-noor',
    name: 'Chaand Sa Noor Experience',
    badge: 'Signature Royal Transformation',
    price: 1499,
    description: 'Our premier luxury experience featuring O3+ bridal formulations, hair spa, and arm polishing.',
    services: [
      'O3+ or equivalent selected facial',
      'Nourishing hair spa',
      'Arms and underarm waxing',
      'Hand & arm polishing',
      'Relaxing head massage',
    ],
  },
]

const FAQ_ITEMS = [
  {
    q: 'Why should I book an at-home salon service for Karwa Chauth instead of visiting a parlor?',
    a: 'On Karwa Chauth and Mehndi eve, neighborhood salons are notoriously overcrowded with 2-to-3 hour waiting queues. Traveling in heavy traffic and waiting in crowded rooms while observing a strict nirjala (waterless) fast causes extreme fatigue. DoorStep Diva brings verified female estheticians directly to your home with 100% sealed single-use kits, so you can relax in air-conditioned comfort and get ready stress-free before the moonrise.',
  },
  {
    q: 'Which areas in Delhi NCR and Lucknow are covered for Karwa Chauth doorstep services?',
    a: 'In Delhi NCR, we service South Delhi, Central Delhi, West Delhi, Noida, Greater Noida, and Gurgaon. In Lucknow, we cover Gomti Nagar, Hazratganj, Aliganj, Indira Nagar, Mahanagar, Ashiyana, and surrounding areas. Due to immense festive demand, slots are capped per locality.',
  },
  {
    q: 'Are the products safe and hygienic?',
    a: 'Yes, 100%. Every single kit—including bedsheets, gowns, towels, and spatulas—is disposable and unsealed right in front of you. All skincare formulations are authentic branded mono-doses (O3+, Rica, L’Oréal, Cheryl’s).',
  },
  {
    q: 'Should I book my beauty services on Karwa Chauth day or the day prior?',
    a: 'We strongly recommend scheduling your waxing, deep facials, body polishing, and hair spa 1 to 2 days prior (on Mehndi eve). This ensures your skin barrier is fully rested, smooth, and radiant for the main day. On Karwa Chauth day itself, quick glow cleanups, blow-dry styling, and saree draping are most popular.',
  },
  {
    q: 'Do I have to pay an advance deposit to lock my festive slot?',
    a: 'No. You can reserve your preferred time window with zero advance payment. You settle securely via UPI or cash only after the beauty ritual is complete and you are delighted with your glow.',
  },
]

const KARWA_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BeautySalon',
      '@id': 'https://mydoorstepdiva.com/karwa-chauth#service',
      name: 'DoorStep Diva — Karwa Chauth At-Home Salon & Shringaar',
      url: 'https://mydoorstepdiva.com/karwa-chauth',
      image: 'https://mydoorstepdiva.com/images/og-image.jpg',
      telephone: '+919129577514',
      priceRange: '₹999 - ₹1499',
      currenciesAccepted: 'INR',
      areaServed: [
        { '@type': 'City', name: 'Delhi' },
        { '@type': 'City', name: 'Noida' },
        { '@type': 'City', name: 'Gurgaon' },
        { '@type': 'City', name: 'Lucknow' },
      ],
      description: 'Exclusive Karwa Chauth at-home salon packages from ₹999 delivered to your doorstep in Delhi NCR and Lucknow.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://mydoorstepdiva.com/karwa-chauth#faq',
      mainEntity: FAQ_ITEMS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    },
  ],
}

const WA_PRIMARY = '919129577514'

function SparkleSvg({ className = 'w-3.5 h-3.5 text-[#8B3A52]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
    </svg>
  )
}

function MoonSvg({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function CheckSvg() {
  return (
    <svg className="w-4 h-4 text-[#8B3A52] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function KarwaChauthPage() {
  const waGeneralText = encodeURIComponent(
    'Hi DoorStep Diva! I would like to reserve a Karwa Chauth at-home beauty package in [Delhi NCR / Lucknow]. Please share available timings.'
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(KARWA_SCHEMA) }}
      />

      <div className="bg-[#FCF7F8] min-h-screen">
        
        {/* Festive Top Urgency Ribbon */}
        <div className="bg-gradient-to-r from-[#701E34] via-[#8B3A52] to-[#701E34] text-white py-2.5 px-4 text-center text-xs sm:text-sm font-medium tracking-wide shadow-sm flex items-center justify-center gap-2">
          <MoonSvg className="w-4 h-4 text-[#F3DBE2]" />
          <span>Karwa Chauth Festival • Limited At-Home Slots in <strong>Delhi NCR & Lucknow</strong> • Pre-Book with Zero Advance</span>
        </div>

        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden py-14 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Headline & Value Prop */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B3A52]/10 border border-[#8B3A52]/20 text-[#8B3A52] text-xs font-bold uppercase tracking-wider">
                  <SparkleSvg />
                  <span>Exclusive Beauty Services For Your Festive Glow</span>
                </div>

                <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl text-stone-900 font-bold leading-tight">
                  This Karwa Chauth, <span className="text-[#8B3A52] italic">Look &amp; Feel Your Best</span>
                </h1>

                <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Skip the exhausting 3-hour parlor waiting rooms while fasting. DoorStep Diva brings verified female estheticians directly to your living room with 
                  <strong> sealed mono-dose kits</strong>, hospital-grade hygiene, and luxury formulations.
                </p>

                {/* 5 Trust Points */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 max-w-xl mx-auto lg:mx-0">
                  {[
                    'Professional Experts',
                    'At-Home Service',
                    'Premium Products',
                    'Safe & Hygienic',
                    'Pay After Service',
                  ].map((badge) => (
                    <div
                      key={badge}
                      className="p-3 rounded-xl bg-white border border-[#F0D5DD] text-center shadow-sm flex items-center justify-center gap-2"
                    >
                      <span className="text-emerald-600 font-bold text-xs">✓</span>
                      <span className="text-xs font-semibold text-stone-800">{badge}</span>
                    </div>
                  ))}
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#packages"
                    className="px-8 py-4 rounded-full bg-[#8B3A52] text-white font-semibold text-sm sm:text-base shadow-lg hover:bg-[#732F42] transition-all hover:scale-[1.02] text-center"
                  >
                    View Official Packages (From ₹999) →
                  </a>
                  <a
                    href={`https://wa.me/${WA_PRIMARY}?text=${waGeneralText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-sm sm:text-base shadow-md hover:bg-[#1EBE5D] transition-all flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon size={18} />
                    <span>WhatsApp Booking Desk</span>
                  </a>
                </div>

                <p className="text-xs text-stone-500">
                  Direct Coordinator: <strong>+91 9129577514</strong> • Express dispatch across Delhi NCR & Lucknow
                </p>
              </div>

              {/* Right Column: Luxury Festive Highlights & Rate Card */}
              <div className="lg:col-span-5 relative">
                <div
                  className="rounded-3xl p-6 sm:p-8 bg-white border border-[#8B3A52]/20 shadow-2xl relative overflow-hidden"
                  style={{
                    boxShadow: '0 25px 60px -15px rgba(139, 58, 82, 0.18)',
                    background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF7F8 100%)',
                  }}
                >
                  {/* Subtle decorative glow */}
                  <div
                    className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-30 pointer-events-none blur-2xl"
                    style={{ background: 'radial-gradient(circle, #C8974A, transparent)' }}
                  />

                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-stone-100">
                    <div>
                      <span className="font-poppins text-[10px] font-bold uppercase tracking-widest text-[#8B3A52] block">
                        Festive Rate Card
                      </span>
                      <h2 className="font-playfair text-xl font-bold text-stone-900 mt-0.5">
                        Curated Shringaar Combos
                      </h2>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] font-poppins text-[10px] font-bold uppercase">
                      From ₹999
                    </span>
                  </div>

                  {/* 3 Quick Package Rows */}
                  <div className="space-y-3.5 my-6">
                    {FESTIVE_PACKAGES.map((pkg) => (
                      <Link
                        key={pkg.id}
                        href={`#${pkg.id}`}
                        className={`block p-3.5 rounded-2xl border transition-all ${
                          pkg.popular
                            ? 'bg-[#FAF2F5] border-[#8B3A52]/40 shadow-sm'
                            : 'bg-white border-stone-200/80 hover:border-[#8B3A52]/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif text-sm font-bold text-stone-900">
                            {pkg.name}
                          </span>
                          <span className="font-playfair text-base font-extrabold text-[#8B3A52]">
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 line-clamp-1">
                          {pkg.services.slice(0, 3).join(' • ')}
                        </p>
                      </Link>
                    ))}
                  </div>

                  {/* Trust Footnote & Quick Reserve CTA */}
                  <div className="pt-2 text-center space-y-3">
                    <p className="font-poppins text-[11px] text-stone-500">
                      Zero advance deposit • 100% sealed mono-dose kits
                    </p>
                    <a
                      href="#packages"
                      className="block w-full py-3.5 px-6 rounded-full bg-[#8B3A52] text-white font-poppins text-xs font-bold uppercase tracking-wider hover:bg-[#732F42] transition-colors shadow-md text-center"
                    >
                      Explore Package Details & Book →
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── THE 3 OFFICIAL FESTIVE COMBOS ── */}
        <section id="packages" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#F3DFE5]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#8B3A52] uppercase tracking-widest block mb-2">
                Official Festive Combos
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
                Choose Your Karwa Chauth Package
              </h2>
              <p className="text-stone-600 text-sm">
                Single-use sealed vanity kits opened in your presence. Authentic premium formulations with zero advance fee.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {FESTIVE_PACKAGES.map((pkg) => {
                const waText = encodeURIComponent(
                  `Namaste DoorStep Diva! I would like to book the *${pkg.name}* (₹${pkg.price.toLocaleString('en-IN')}) for Karwa Chauth. My city is [Delhi NCR / Lucknow]. Please confirm available arrival windows.`
                )

                return (
                  <div
                    key={pkg.id}
                    id={pkg.id}
                    className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                      pkg.popular
                        ? 'bg-white border-2 border-[#8B3A52] shadow-2xl md:-translate-y-2'
                        : 'bg-[#FCF8F9] border border-[#EACCD6] hover:shadow-xl'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#8B3A52] text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap">
                        <SparkleSvg className="w-3 h-3 text-white" />
                        <span>Most Popular For Karwa Chauth</span>
                      </div>
                    )}

                    <div>
                      {/* Package Badge */}
                      <div className="inline-block px-3 py-1 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] text-xs font-bold uppercase tracking-wider mb-4 mt-1">
                        {pkg.badge}
                      </div>

                      <h3 className="font-playfair text-2xl font-bold text-stone-900 mb-1">
                        {pkg.name}
                      </h3>

                      <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                        {pkg.description}
                      </p>

                      {/* Price Banner */}
                      <div className="py-3 px-4 rounded-2xl bg-[#FAF2F5] border border-[#F3DBE2] mb-6 flex items-baseline justify-between">
                        <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                          Package Price
                        </span>
                        <div className="text-right">
                          <span className="font-playfair text-3xl font-extrabold text-[#8B3A52]">
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </span>
                          <span className="block text-[10px] text-stone-500">All inclusive · Zero advance</span>
                        </div>
                      </div>

                      {/* Service Inclusions */}
                      <ul className="space-y-3 text-sm text-stone-700 mb-8">
                        {pkg.services.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <CheckSvg />
                            <span className="font-medium text-stone-800 text-xs sm:text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-stone-200/80 pt-6 space-y-3">
                      {/* 1-Tap WhatsApp Booking */}
                      <a
                        href={`https://wa.me/${WA_PRIMARY}?text=${waText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-5 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <WhatsAppIcon size={16} />
                        <span>Book on WhatsApp (₹{pkg.price})</span>
                      </a>

                      {/* Online Reservation */}
                      <Link
                        href={`/book?service=${encodeURIComponent(`Karwa Chauth: ${pkg.name} (₹${pkg.price})`)}`}
                        className="w-full block py-3 px-5 rounded-full bg-[#8B3A52] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#732F42] transition-colors text-center"
                      >
                        Reserve Online (Pay After) →
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Direct Coordinator Assistance */}
            <div className="mt-12 p-6 rounded-2xl bg-[#FDF2F5] border border-[#F3DBE2] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="font-semibold text-stone-900 text-sm sm:text-base">
                  Need a customized package or booking for multiple family members?
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Our festive concierge coordinator will build a custom package for your group.
                </p>
              </div>
              <a
                href={`https://wa.me/${WA_PRIMARY}?text=${waGeneralText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] transition-all shrink-0 flex items-center gap-2"
              >
                <WhatsAppIcon size={16} />
                <span>Chat with Coordinator (+91 9129577514)</span>
              </a>
            </div>

          </div>
        </section>

        {/* ── FASTING CONVENIENCE COMPARISON TABLE ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#8B3A52] uppercase tracking-widest block mb-2">The At-Home Difference</span>
            <h2 className="font-playfair text-3xl font-bold text-stone-900">
              Why Fasting Women Choose DoorStep Diva
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm bg-white rounded-3xl shadow-sm border border-[#F0D5DD] overflow-hidden">
              <thead className="bg-[#FAF0F3] text-stone-800 text-xs uppercase tracking-wider border-b border-[#F0D5DD]">
                <tr>
                  <th className="py-4 px-6">Experience Feature</th>
                  <th className="py-4 px-6 text-rose-800 font-bold">DoorStep Diva At-Home</th>
                  <th className="py-4 px-6 text-stone-500">Overcrowded Local Parlor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs sm:text-sm">
                <tr>
                  <td className="py-4 px-6 font-medium text-stone-900">Fasting Comfort</td>
                  <td className="py-4 px-6 text-emerald-700 font-semibold">100% relaxed in your AC bedroom; zero exertion</td>
                  <td className="py-4 px-6 text-rose-600">Exhausting travel in heat &amp; traffic while fasting</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-stone-900">Waiting Time</td>
                  <td className="py-4 px-6 text-emerald-700 font-semibold">Zero wait. Artist arrives at your booked time</td>
                  <td className="py-4 px-6 text-rose-600">2 to 3 hour crowded waiting room queues</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-stone-900">Hygiene &amp; Safety</td>
                  <td className="py-4 px-6 text-emerald-700 font-semibold">Fresh mono-dose kit unsealed in your presence</td>
                  <td className="py-4 px-6 text-stone-600">Shared towels, multi-dip wax pots in rush hour</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-stone-900">Payment Peace of Mind</td>
                  <td className="py-4 px-6 text-emerald-700 font-semibold">Pay via UPI/Cash only after service is complete</td>
                  <td className="py-4 px-6 text-stone-600">Advance deposits &amp; non-refundable token systems</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── PRE-BOOKING FORM ── */}
        <section id="prebook" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FDF4F6]">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#F0D5DD]">
            
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-[#8B3A52] uppercase tracking-widest block mb-1">
                Priority Festive Pass
              </span>
              <h3 className="font-playfair text-3xl font-bold text-stone-900 mb-2">
                Lock Your Karwa Chauth Slot
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Zero advance payment required. Lock your preferred arrival window in <strong>Delhi NCR</strong> or <strong>Lucknow</strong> before festival slots fill up.
              </p>
            </div>

            <form
              action="/book"
              method="GET"
              className="space-y-6"
            >
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Select Your City *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-stone-200 cursor-pointer hover:border-[#8B3A52] transition-colors">
                    <input type="radio" name="city" value="delhi-ncr" defaultChecked className="accent-[#8B3A52]" />
                    <div>
                      <span className="font-semibold text-xs sm:text-sm text-stone-900 block">Delhi NCR</span>
                      <span className="text-[10px] text-stone-500">Noida, Gurgaon, South Delhi</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-stone-200 cursor-pointer hover:border-[#8B3A52] transition-colors">
                    <input type="radio" name="city" value="lucknow" className="accent-[#8B3A52]" />
                    <div>
                      <span className="font-semibold text-xs sm:text-sm text-stone-900 block">Lucknow</span>
                      <span className="text-[10px] text-stone-500">Gomti Nagar, Hazratganj, etc.</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Select Preferred Karwa Chauth Package *
                </label>
                <select
                  name="service"
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm text-stone-900 bg-white focus:outline-none focus:border-[#8B3A52]"
                  required
                >
                  <option value="Karwa Chauth: Silky Shine Ritual (₹1,299)">
                    Silky Shine Ritual — ₹1,299 (Hair Spa, Cleanup & Waxing) [Most Popular]
                  </option>
                  <option value="Karwa Chauth: Chandni Glow Ritual (₹999)">
                    Chandni Glow Ritual — ₹999 (Facial, Waxing, Threading & Massage)
                  </option>
                  <option value="Karwa Chauth: Chaand Sa Noor Experience (₹1,499)">
                    Chaand Sa Noor Experience — ₹1,499 (O3+ Facial, Hair Spa & Arm Polish)
                  </option>
                  <option value="Custom Karwa Chauth Beauty Services">
                    Custom Package / Multiple Family Members
                  </option>
                </select>
              </div>

              <div className="bg-[#FAF3F5] rounded-2xl p-4 border border-[#EACCD6]/50 text-xs text-stone-700 flex items-start gap-2.5">
                <SparkleSvg className="w-4 h-4 text-[#8B3A52] shrink-0 mt-0.5" />
                <span>
                  <strong>At-Home Guarantee:</strong> Submitting connects you directly to our dispatch coordinator. You do not pay anything online today. Our team will verify your address and confirm your artist arrival time.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-8 rounded-full bg-[#8B3A52] text-white font-bold text-sm sm:text-base shadow-lg hover:bg-[#732F42] transition-all hover:scale-[1.01]"
              >
                Proceed to Secure Your Slot (Pay After Service) →
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-xs text-stone-500">Prefer direct WhatsApp? </span>
              <a
                href={`https://wa.me/${WA_PRIMARY}?text=${waGeneralText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#8B3A52] underline"
              >
                Click to message on WhatsApp (+91 9129577514)
              </a>
            </div>

          </div>
        </section>

        {/* ── FAQ SECTION (SEO & AI SEARCH OPTIMIZATION) ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#8B3A52] uppercase tracking-widest block mb-2">Help & Clarity</span>
            <h3 className="font-playfair text-3xl font-bold text-stone-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-2xl border border-[#F0D5DD] p-6 text-left transition-all open:shadow-md"
              >
                <summary className="font-semibold text-stone-900 text-sm sm:text-base cursor-pointer flex justify-between items-center list-none">
                  <span>{item.q}</span>
                  <span className="text-[#8B3A52] text-lg font-bold group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-4 pt-4 border-t border-stone-100">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/" className="text-xs font-semibold text-[#8B3A52] hover:underline">
              ← Return to DoorStep Diva Homepage
            </Link>
          </div>
        </section>

      </div>
    </>
  )
}
