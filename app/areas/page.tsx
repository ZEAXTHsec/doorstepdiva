import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Service Areas — DoorStep Diva | At-Home Beauty in Delhi NCR, Lucknow & Ayodhya',
  description:
    'DoorStep Diva provides certified at-home salon services across Delhi NCR (Noida, Gurgaon, South Delhi, Ghaziabad), Lucknow (Gomti Nagar, Hazratganj, Aliganj, Indira Nagar) and Ayodhya. Zero advance required — pay after service.',
  keywords:
    'at home beauty Lucknow, doorstep salon Delhi NCR, home salon Noida, beauty at home Gurugram, mobile salon Ayodhya, salon at home Gomti Nagar, bridal makeup at home Delhi',
  alternates: {
    canonical: 'https://mydoorstepdiva.com/areas',
  },
  openGraph: {
    title: 'Service Areas — DoorStep Diva',
    description: 'Certified beauty artists serving Delhi NCR, Lucknow, and Ayodhya at your doorstep.',
    url: 'https://mydoorstepdiva.com/areas',
  },
}

interface AreaZone {
  name: string
  localities: string[]
  dispatchWindow: string
}

interface CityData {
  city: string
  accent: string
  note: string
  description: string
  areas: AreaZone[]
}

const CITIES: CityData[] = [
  {
    city: 'Delhi NCR',
    accent: '#EFCCD4',
    note: 'Primary Metro Zone',
    description:
      'Comprehensive coverage across the National Capital Region. Full divisions available: hair treatments, facials, Rica waxing, HD bridal makeup, and sculpted nail art.',
    areas: [
      {
        name: 'South & Central Delhi',
        dispatchWindow: '45–60 min coordination',
        localities: ['Greater Kailash', 'Hauz Khas', 'Defence Colony', 'South Extension', 'Connaught Place', 'Lajpat Nagar'],
      },
      {
        name: 'Noida & Greater Noida',
        dispatchWindow: '30–45 min coordination',
        localities: ['Sector 18', 'Sector 50', 'Sector 62', 'Sector 137', 'Noida Expressway', 'Pari Chowk Greater Noida'],
      },
      {
        name: 'Gurugram (Gurgaon)',
        dispatchWindow: '45–60 min coordination',
        localities: ['DLF Phase 1–5', 'Golf Course Road', 'Sohna Road', 'Cyber City', 'Sector 56', 'Nirvana Country'],
      },
      {
        name: 'Ghaziabad',
        dispatchWindow: '45–60 min coordination',
        localities: ['Indirapuram', 'Vaishali', 'Vasundhara', 'Raj Nagar Extension', 'Crossings Republik'],
      },
      {
        name: 'Faridabad',
        dispatchWindow: '45–60 min coordination',
        localities: ['Sector 14', 'Sector 15', 'Sector 21', 'NIT', 'Greenfield Colony', 'Neharpar'],
      },
    ],
  },
  {
    city: 'Lucknow',
    accent: '#F0D8E8',
    note: 'Heartland Hub',
    description:
      'Serving all premier residential and corporate sectors in Lucknow. Highly requested for bridal shringaar, hair spa, and medi-facials with sealed mono-doses.',
    areas: [
      {
        name: 'East Lucknow (Gomti Nagar)',
        dispatchWindow: '30–40 min coordination',
        localities: ['Gomti Nagar', 'Gomti Nagar Extension', 'Vibhuti Khand', 'Vipul Khand', 'Shaheed Path Corridor'],
      },
      {
        name: 'Central Lucknow',
        dispatchWindow: '30–45 min coordination',
        localities: ['Hazratganj', 'Jockey Club Road', 'Kaiserbagh', 'Chowk', 'Aminabad', 'Raj Bhavan Zone'],
      },
      {
        name: 'North Lucknow',
        dispatchWindow: '35–50 min coordination',
        localities: ['Aliganj', 'Indira Nagar', 'Mahanagar', 'Jankipuram', 'Vikas Nagar', 'Tedhi Pulia'],
      },
      {
        name: 'South Lucknow',
        dispatchWindow: '40–55 min coordination',
        localities: ['Ashiyana', 'Alambagh', 'Rajajipuram', 'Krishna Nagar', 'Transport Nagar', 'VIP Road'],
      },
      {
        name: 'Suburban Enclaves',
        dispatchWindow: '45–60 min coordination',
        localities: ['Chinhat', 'Faizabad Road', 'Raebareli Road', 'Sultanpur Road Townships'],
      },
    ],
  },
  {
    city: 'Ayodhya',
    accent: '#F5E0D0',
    note: 'Heritage Zone',
    description:
      'Doorstep salon availability across Ayodhya and Faizabad townships. Specialized in wedding guest glam, saree draping, and pre-event skincare.',
    areas: [
      {
        name: 'Ayodhya Township',
        dispatchWindow: '35–45 min coordination',
        localities: ['Ram Janmabhoomi Corridor', 'Naya Ghat', 'Tulsi Nagar', 'Dashrath Mahal Area'],
      },
      {
        name: 'Civil Lines & Faizabad',
        dispatchWindow: '30–45 min coordination',
        localities: ['Civil Lines', 'Faizabad Cantt', 'Sahadatganj', 'Rikabganj', 'Devkali Road'],
      },
    ],
  },
]

const SERVICES_AVAILABLE = [
  { name: 'Hair Services',          href: '/services/hair',           desc: 'Cuts, blowdry, keratin, Botox, luxury hair spa' },
  { name: 'Skin & Facials',         href: '/services/skin',           desc: 'Korean glass facial, deep cleanup, Rica waxing' },
  { name: 'Bridal & Party Makeup',  href: '/services/makeup',         desc: 'HD bridal base, Airbrush, Sangeet & party glam' },
  { name: 'Festive Specials',       href: '/festive',                 desc: 'Karwa Chauth, Navratri, Diwali, Teej packages' },
  { name: 'Eyelash & Brows',        href: '/services/eyelash',        desc: 'Classic extensions, lash lift, brow lamination' },
  { name: 'Nails & Semi-Permanent', href: '/services/nails',          desc: 'Acrylics, PolyGel, microblading & lip blush' },
]

const LOCAL_GEO_FAQS = [
  {
    q: 'How quickly can a beauty artist reach my home in Lucknow or Delhi NCR?',
    a: 'Because we are an appointment-based luxury service, our coordinator calls you to verify your preferred date and timing window. We schedule certified artists based on geographic proximity (typically within 30 to 60 minutes coordination window) to ensure unhurried, punctual service.',
  },
  {
    q: 'Is there an extra travel fee or visiting charge for doorstep salon visits?',
    a: 'No hidden travel charges. The package prices listed on our menus are all-inclusive for our standard service zones across Delhi NCR, Lucknow, and Ayodhya.',
  },
  {
    q: 'What do I need to prepare at home before the artist arrives?',
    a: 'Minimal preparation is needed. Just a comfortable chair, an electrical point for styling or heating equipment, and running water for wash rituals. Our artists arrive fully equipped with sealed disposable gowns, bedsheets, sanitized tools, and single-use kits.',
  },
  {
    q: 'Can I book an at-home salon appointment for multiple people at the same address?',
    a: 'Yes. Family, bridal party, and group appointments are routinely managed. When you submit your booking form or reach out on WhatsApp, mention the number of guests and our dispatch desk will assign the required artist team.',
  },
]

export default function AreasPage() {
  const geoSchema = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'DoorStep Diva Service Coverage Hub',
    description: 'At-home salon and bridal beauty services across Delhi NCR, Lucknow, and Ayodhya.',
    url: 'https://mydoorstepdiva.com/areas',
    telephone: '+919129577514',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI',
    areaServed: [
      { '@type': 'City', name: 'Delhi', containedInPlace: { '@type': 'State', name: 'Delhi' } },
      { '@type': 'City', name: 'Noida', containedInPlace: { '@type': 'State', name: 'Uttar Pradesh' } },
      { '@type': 'City', name: 'Gurgaon', containedInPlace: { '@type': 'State', name: 'Haryana' } },
      { '@type': 'City', name: 'Lucknow', containedInPlace: { '@type': 'State', name: 'Uttar Pradesh' } },
      { '@type': 'City', name: 'Ayodhya', containedInPlace: { '@type': 'State', name: 'Uttar Pradesh' } },
    ],
  }

  return (
    <div className="bg-[#FAF6F7] min-h-screen text-stone-900 pt-28 pb-20">
      {/* Schema.org GEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(geoSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link href="/" className="hover:text-[#8B3A52]">Home</Link>
          <span>›</span>
          <span className="text-[#8B3A52] font-semibold">Service Areas</span>
        </nav>

        {/* Hero Header */}
        <header className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 bg-[#8B3A52]/10 border border-[#8B3A52]/20 text-[#8B3A52] px-3.5 py-1.5 rounded-full mb-4">
            <svg className="w-3.5 h-3.5 text-[#8B3A52]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider">Local Coverage Architecture</span>
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-4">
            Certified Beauty Delivered <span className="text-[#8B3A52] italic">To Your Doorstep</span>
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
            Serving <strong>Delhi NCR, Lucknow, and Ayodhya</strong> across 40+ premier localities. Certified female artists, sealed mono-dose cosmetic formulations, and transparent pricing with zero advance fee.
          </p>

          <div className="flex flex-wrap gap-2.5 mb-8">
            {['Delhi NCR', 'Lucknow', 'Ayodhya', 'Gurugram', 'Noida', 'Gomti Nagar'].map(c => (
              <span key={c} className="bg-white border border-[#EACCD6] text-xs font-semibold text-stone-700 px-3.5 py-1 rounded-full shadow-xs">
                {c}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/book"
              className="px-7 py-3.5 rounded-full bg-[#8B3A52] text-white font-semibold text-xs shadow-md hover:bg-[#732F42] transition-colors text-center"
            >
              Book At-Home Service Online →
            </Link>
            <a
              href="https://wa.me/919129577514?text=Namaste%20DoorStep%20Diva!%20I%20would%20like%20to%20check%20if%20you%20cover%20my%20exact%20locality."
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-xs shadow-sm hover:bg-[#1EBE5D] transition-colors text-center flex items-center justify-center gap-2"
            >
              <span>Verify Locality on WhatsApp</span>
            </a>
          </div>
        </header>

        {/* City Coverage Sections */}
        <div className="space-y-16">
          {CITIES.map(city => (
            <section key={city.city} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EACCD6] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-6 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="font-playfair text-3xl font-bold text-stone-900">{city.city}</h2>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B3A52] bg-[#FAF2F5] px-3 py-1 rounded-full border border-[#F3DBE2]">
                      {city.note}
                    </span>
                  </div>
                  <p className="text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                    {city.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
                    Verified Artists Active
                  </span>
                </div>
              </div>

              {/* Area Zones Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {city.areas.map(area => (
                  <div
                    key={area.name}
                    className="p-5 rounded-2xl bg-[#FCF8F9] border border-[#F0D5DD] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-baseline justify-between mb-2">
                        <h3 className="font-bold text-xs uppercase tracking-wider text-[#8B3A52]">
                          {area.name}
                        </h3>
                        <span className="text-[10px] font-medium text-stone-500">
                          {area.dispatchWindow}
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-stone-700">
                        {area.localities.map(loc => (
                          <li key={loc} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A52]/50 shrink-0" />
                            <span>{loc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* All Divisions Available Everywhere */}
        <section className="mt-20 pt-12 border-t border-stone-200">
          <header className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B3A52] block mb-1">
              Complete Division Scope
            </span>
            <h2 className="font-playfair text-3xl font-bold text-stone-900 mb-2">
              All Divisions Delivered Across All Covered Zones
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              We never restrict services by locality. Any beauty treatment on our menu can be dispatched to your location.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES_AVAILABLE.map(s => (
              <Link
                key={s.name}
                href={s.href}
                className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-[#8B3A52] shadow-xs hover:shadow-sm transition-all group flex items-start justify-between"
              >
                <div>
                  <h3 className="font-semibold text-sm text-stone-900 group-hover:text-[#8B3A52] transition-colors mb-1">
                    {s.name}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <span className="text-[#8B3A52] text-sm font-bold group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Localized FAQ Section */}
        <section className="mt-20 max-w-3xl mx-auto">
          <header className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B3A52] block mb-1">
              Local Dispatch Clarity
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-stone-900">
              Frequently Asked Questions on Service Areas
            </h2>
          </header>

          <div className="space-y-4">
            {LOCAL_GEO_FAQS.map(faq => (
              <div key={faq.q} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
                <h3 className="font-semibold text-sm text-stone-900 mb-1.5">
                  {faq.q}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Area Inquiry Card */}
          <div className="mt-12 p-8 rounded-3xl bg-[#FAF2F5] border border-[#F3DBE2] text-center">
            <h3 className="font-playfair text-xl font-bold text-stone-900 mb-2">
              Don&apos;t See Your Exact Sector Listed?
            </h3>
            <p className="text-stone-600 text-xs max-w-lg mx-auto mb-6 leading-relaxed">
              Our service perimeter expands continuously across Delhi NCR and Uttar Pradesh. Reach our dispatch coordinator on WhatsApp with your pin code to confirm immediate coverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/919129577514?text=Hi%20DoorStep%20Diva!%20My%20locality%20is%20[Area/Pincode].%20Do%20you%20cover%20my%20address?"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold shadow-sm hover:bg-[#1EBE5D] transition-colors"
              >
                Inquire on WhatsApp Desk
              </a>
              <Link
                href="/book"
                className="px-6 py-3 rounded-full bg-[#8B3A52] text-white text-xs font-semibold shadow-sm hover:bg-[#732F42] transition-colors"
              >
                Direct Booking Form →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}