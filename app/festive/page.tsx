import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Festive Beauty Services At Home — Karwa Chauth, Navratri, Diwali, Teej | DoorStep Diva',
  description:
    'Luxury at-home festive beauty packages delivered across Delhi NCR, Lucknow & Ayodhya. Karwa Chauth Shringaar, Navratri Dandiya glam, Diwali glow facials, and Sawan Teej mehendi with 100% sealed single-use kits. Pay after service.',
  keywords:
    'festive salon at home, Karwa Chauth makeup at home Lucknow, Navratri makeup Delhi NCR, Diwali facial home service Noida, Teej mehendi at home Gurgaon, doorstep festive beauty Ayodhya',
  alternates: {
    canonical: 'https://mydoorstepdiva.com/festive',
  },
  openGraph: {
    title: 'Festive & Occasion Beauty Services At Home — DoorStep Diva',
    description:
      'Verified female estheticians delivering festive shringaar and salon rituals at your doorstep across Delhi NCR, Lucknow & Ayodhya. Zero advance deposit.',
    url: 'https://mydoorstepdiva.com/festive',
    siteName: 'DoorStep Diva',
  },
}

interface FestiveOccasion {
  id: string
  title: string
  season: string
  statusBadge: string
  description: string
  accentColor: string
  image: string
  packages: {
    name: string
    price: number
    inclusions: string[]
    bestFor: string
  }[]
  actionHref: string
  actionLabel: string
}

const FESTIVE_OCCASIONS: FestiveOccasion[] = [
  {
    id: 'karwa-chauth',
    title: 'Karwa Chauth Solah Shringar',
    season: 'October Season · High Demand',
    statusBadge: 'Booking Slots Active',
    description:
      'Skip the crowded parlor queues while fasting. Our certified female estheticians deliver comprehensive pre-moonrise beauty rituals directly to your home with hospital-grade single-use kits.',
    accentColor: '#8B3A52',
    image: '/images/karwa_chauth_hero.jpg',
    actionHref: '/karwa-chauth',
    actionLabel: 'View Dedicated Karwa Chauth Page →',
    packages: [
      {
        name: 'Suhagan Shringaar Ritual',
        price: 999,
        bestFor: 'Essential Festive Prep',
        inclusions: [
          'Express facial or deep cleanup',
          'Nourishing hair spa therapy',
          'Arms and underarm waxing',
          'Eyebrow and upper-lip threading',
        ],
      },
      {
        name: 'Chaand Sa Noor Experience',
        price: 1499,
        bestFor: 'Signature Festive Glow',
        inclusions: [
          'O3+ or equivalent selected bridal facial',
          'Nourishing hair spa therapy',
          'Hand & arm polishing',
          'Full arms and underarm waxing',
          'Relaxing scalp therapy',
        ],
      },
      {
        name: 'Noor-E-Chandni Royal Suite',
        price: 2199,
        bestFor: 'Head-to-Toe Luxury',
        inclusions: [
          'Korean Glass Hydration or O3+ Diamond Facial',
          'Full body Rica peel waxing',
          'Deluxe pedicure & manicure massage',
          'Deep conditioning hair spa & blow-dry',
        ],
      },
    ],
  },
  {
    id: 'navratri-durga-puja',
    title: 'Navratri & Durga Puja Radiance',
    season: 'Navratri & Dandiya Nights',
    statusBadge: 'Festive Menu Open',
    description:
      'Sweat-resistant, long-wear makeup and rapid skin rejuvenation engineered for high-energy Garba, Dandiya nights, and traditional puja gatherings.',
    accentColor: '#B85D3B',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png',
    actionHref: '/book',
    actionLabel: 'Reserve Navratri Slot →',
    packages: [
      {
        name: 'Dandiya Nights Long-Wear Glam',
        price: 1999,
        bestFor: 'Sweat-Resistant Evening Glam',
        inclusions: [
          'Waterproof HD party makeup base',
          'Smudge-proof ethnic eye artistry',
          'Festive hair styling (braids / curls / buns)',
          'Dupatta / traditional attire draping',
        ],
      },
      {
        name: 'Maa Durga Festive Skin Revival',
        price: 1299,
        bestFor: 'Pre-Festival Skin Clarifying',
        inclusions: [
          'Herbal de-tan exfoliation pack',
          'Instant radiance fruit enzyme facial',
          'Full arms honey waxing & threading',
          'Foot reflexology pressure massage',
        ],
      },
    ],
  },
  {
    id: 'diwali-bhai-dooj',
    title: 'Diwali & Dhanteras Royal Shringaar',
    season: 'Deepavali Season',
    statusBadge: 'Pre-Booking Recommended',
    description:
      'Complete pre-Diwali skin brightening, full body grooming, and luminous makeup styling so you shine effortlessly during Lakshmi Puja and family festivities.',
    accentColor: '#966F33',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
    actionHref: '/book',
    actionLabel: 'Reserve Diwali Package →',
    packages: [
      {
        name: 'Deepotsav Gold Radiance Ritual',
        price: 1799,
        bestFor: 'Luminous Festive Complexion',
        inclusions: [
          '24K Gold or botanical brightening facial',
          'Full arms & legs Rica sensitive waxing',
          'Nail shape, cut & gel lacquer finish',
          'Herbal hair strengthening masque',
        ],
      },
      {
        name: 'Diwali Eve Family & Duo Glow',
        price: 2999,
        bestFor: '2 Persons or Mother-Daughter',
        inclusions: [
          'Two signature glow facials',
          'Two hair spa nourishing therapies',
          'Complete face threading & upper lip',
          'Deluxe double foot care treatment',
        ],
      },
    ],
  },
  {
    id: 'sawan-teej',
    title: 'Sawan & Hariyali Teej Shringaar',
    season: 'Monsoon Festive Traditions',
    statusBadge: 'Seasonal Ritual',
    description:
      'Traditional green beauty rituals, scalp humidity protection, herbal mehendi assistance, and monsoon-safe waxing formulations.',
    accentColor: '#2D6A4F',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png',
    actionHref: '/book',
    actionLabel: 'Reserve Teej Package →',
    packages: [
      {
        name: 'Hariyali Teej Traditional Suite',
        price: 1199,
        bestFor: 'Authentic Festive Shringaar',
        inclusions: [
          'Monsoon frizz-control hair spa',
          'Herbal glow skin polish & cleanup',
          'Rica arms & underarm waxing',
          'Traditional festive saree draping',
        ],
      },
    ],
  },
  {
    id: 'wedding-guest-sangeet',
    title: 'Wedding Season & Sangeet Guest Artistry',
    season: 'Winter & Spring Wedding Cycles',
    statusBadge: 'Year-Round Availability',
    description:
      'Group and guest artistry delivered to your hotel room or home. Certified makeup artists bringing international cosmetics for Sangeet, Mehendi, and Reception.',
    accentColor: '#8B3A52',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png',
    actionHref: '/book',
    actionLabel: 'Coordinate Group Booking →',
    packages: [
      {
        name: 'Cocktail & Sangeet Guest Glam',
        price: 2499,
        bestFor: 'Sisters, Friends & Wedding Guests',
        inclusions: [
          'HD base with MAC / Huda Beauty formulations',
          'Dramatic or soft romantic eye artistry',
          'Custom hair styling (curls, textured bun)',
          'Saree or lehenga pinning & draping',
        ],
      },
      {
        name: 'Pre-Wedding Bride Tribe Prep (3+ Guests)',
        price: 5499,
        bestFor: 'Group In-Room Dispatch',
        inclusions: [
          'Full hair & makeup for 3 persons',
          'Dedicated artist team dispatch',
          'Coordinated arrival window',
          'Complimentary touch-up kit provided',
        ],
      },
    ],
  },
]

const FESTIVE_GEO_FAQS = [
  {
    q: 'How do at-home festive beauty services work across Delhi NCR and Lucknow?',
    a: 'You choose your festive package online or via WhatsApp. Our dispatch coordinator calls to verify your locality, timing preference, and special requirements. On your confirmed date, a background-verified, certified female esthetician arrives at your home with sanitized equipment and sealed mono-dose cosmetic kits. Zero advance payment is required; you settle securely via UPI or cash only after your service is complete.',
  },
  {
    q: 'Are festive appointments confirmed immediately or manually?',
    a: 'Every appointment is verified and scheduled manually by our dispatch coordinator over phone or WhatsApp. Because festival days experience intense local demand, we personally coordinate artist routing to ensure punctuality and avoid scheduling overlaps.',
  },
  {
    q: 'Which localities in Delhi NCR, Lucknow, and Ayodhya are serviced for festivals?',
    a: 'In Delhi NCR: South Delhi, Central Delhi, West Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad, and Faridabad. In Lucknow: Gomti Nagar, Hazratganj, Aliganj, Indira Nagar, Mahanagar, Ashiyana, and surrounding townships. In Ayodhya: Ram Janmabhoomi township, Civil Lines, and Faizabad Road.',
  },
  {
    q: 'How does DoorStep Diva guarantee hygiene during heavy festival rushes?',
    a: 'Unlike traditional parlors where spatulas, wax pots, and creams are shared across dozens of walk-in customers, DoorStep Diva utilizes 100% single-use mono-dose kits unsealed in front of you. Every bedsheet, towel, and spatula is disposable, and all steel tools are hospital-grade autoclaved.',
  },
  {
    q: 'Can I book custom combinations for multiple family members?',
    a: 'Yes. You can select multiple packages or write your custom group requirements directly in our booking form. Our coordinators will combine services, calculate transparent bundled estimates, and assign multiple artists if needed.',
  },
]

export default function FestivePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'DoorStep Diva Festive Beauty Services',
    description:
      'Premier at-home festive beauty packages for Karwa Chauth, Navratri, Diwali, Teej, and Wedding Season across Delhi NCR, Lucknow, and Ayodhya.',
    url: 'https://mydoorstepdiva.com/festive',
    telephone: '+919129577514',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI',
    areaServed: [
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'Noida' },
      { '@type': 'City', name: 'Gurgaon' },
      { '@type': 'City', name: 'Lucknow' },
      { '@type': 'City', name: 'Ayodhya' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Festive & Occasion Beauty Packages',
      itemListElement: FESTIVE_OCCASIONS.map(occ => ({
        '@type': 'OfferCatalog',
        name: occ.title,
        description: occ.description,
      })),
    },
  }

  return (
    <div className="bg-[#FAF6F7] min-h-screen text-stone-900 pt-28 pb-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link href="/" className="hover:text-[#8B3A52]">Home</Link>
          <span>›</span>
          <span className="text-[#8B3A52] font-semibold">Festive &amp; Occasions</span>
        </nav>

        {/* Hero Section */}
        <header className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B3A52]/10 border border-[#8B3A52]/20 text-[#8B3A52] text-xs font-bold uppercase tracking-wider">
            <span>Special Occasion &amp; Festival Calendar</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
            Festive Beauty Rituals, <span className="text-[#8B3A52] italic">Delivered To Your Living Room</span>
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            From Karwa Chauth Solah Shringar and Navratri Dandiya glam to Diwali radiance and Sawan rituals. Certified female estheticians arrive with sealed monodose kits across <strong>Delhi NCR, Lucknow &amp; Ayodhya</strong>. Zero advance required.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 justify-center text-xs text-stone-700 font-semibold">
            <span className="px-3 py-1 rounded-full bg-white border border-[#EACCD6] shadow-xs">100% Sealed Single-Use Kits</span>
            <span className="px-3 py-1 rounded-full bg-white border border-[#EACCD6] shadow-xs">No Parlor Waiting Queues</span>
            <span className="px-3 py-1 rounded-full bg-white border border-[#EACCD6] shadow-xs">Pay After Service</span>
          </div>
        </header>

        {/* Festive Occasions Grid */}
        <div className="space-y-16">
          {FESTIVE_OCCASIONS.map((occ, idx) => (
            <article
              key={occ.id}
              id={occ.id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EACCD6] shadow-sm hover:shadow-md transition-shadow scroll-mt-32"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual Thumbnail */}
                <div className="lg:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                  <Image
                    src={occ.image}
                    alt={occ.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#8B3A52] shadow-xs">
                    {occ.statusBadge}
                  </div>
                </div>

                {/* Content & Packages */}
                <div className="lg:col-span-8 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#8B3A52] block mb-1">
                      {occ.season}
                    </span>
                    <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                      {occ.title}
                    </h2>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                      {occ.description}
                    </p>

                    {/* Packages Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {occ.packages.map(pkg => (
                        <div
                          key={pkg.name}
                          className="p-4 rounded-2xl bg-[#FCF8F9] border border-[#F0D5DD] flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-baseline justify-between mb-1">
                              <h3 className="font-semibold text-xs text-stone-900 leading-snug">
                                {pkg.name}
                              </h3>
                              <span className="font-playfair text-base font-bold text-[#8B3A52]">
                                ₹{pkg.price.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <span className="text-[10px] font-medium text-stone-500 uppercase tracking-wider block mb-2">
                              {pkg.bestFor}
                            </span>
                            <ul className="space-y-1.5 text-[11px] text-stone-700">
                              {pkg.inclusions.map(inc => (
                                <li key={inc} className="flex items-start gap-1.5">
                                  <span className="text-[#8B3A52] font-bold">✓</span>
                                  <span>{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center">
                    <Link
                      href={occ.actionHref}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#8B3A52] text-white font-semibold text-xs shadow-md hover:bg-[#732F42] transition-all text-center"
                    >
                      {occ.actionLabel}
                    </Link>
                    <a
                      href={`https://wa.me/919129577514?text=${encodeURIComponent(`Hi DoorStep Diva, I would like to inquire about the ${occ.title} packages.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold text-xs shadow-sm hover:bg-emerald-700 transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Inquire via WhatsApp Desk</span>
                    </a>
                  </div>

                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Localized FAQ Section (GEO Search Engine Optimized) */}
        <section className="mt-20 pt-12 border-t border-stone-200">
          <div className="max-w-3xl mx-auto">
            <header className="text-center mb-10">
              <span className="text-xs font-bold text-[#8B3A52] uppercase tracking-wider block mb-1">
                Frequently Asked Questions
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-stone-900">
                At-Home Festive Booking &amp; Hygiene Standards
              </h2>
            </header>

            <div className="space-y-4">
              {FESTIVE_GEO_FAQS.map(faq => (
                <div key={faq.q} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
                  <h3 className="font-semibold text-sm text-stone-900 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Support Banner */}
            <div className="mt-12 p-6 rounded-3xl bg-[#FAF2F5] border border-[#F3DBE2] text-center">
              <h3 className="font-playfair text-lg font-bold text-stone-900 mb-1">
                Need a Custom Package for an Upcoming Family Celebration?
              </h3>
              <p className="text-stone-600 text-xs mb-4">
                Our beauty dispatch desk coordinates group bookings, timing windows, and specific artist assignments across Delhi NCR, Lucknow, and Ayodhya.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/book"
                  className="px-6 py-2.5 rounded-full bg-[#8B3A52] text-white text-xs font-semibold shadow-sm hover:bg-[#732F42] transition-colors"
                >
                  Custom Booking Form →
                </Link>
                <a
                  href="tel:+919129577514"
                  className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Call +91 9129577514
                </a>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  )
}
