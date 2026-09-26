import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Karwa Chauth At-Home Salon Packages — Delhi NCR & Lucknow | DoorStep Diva',
  description:
    'Look stunning this Karwa Chauth without the stress of 3-hour parlor queues while fasting. Certified female artists delivering festive glow facials, waxing, mani-pedi & hair styling to your doorstep across Delhi NCR & Lucknow. Pre-book your slot now!',
  keywords:
    'karwa chauth salon at home, karwa chauth beauty packages delhi, home salon lucknow karwa chauth, at home parlour karwa chauth, karwa chauth facial offers, doorstep mehendi hair spa',
  alternates: {
    canonical: 'https://mydoorstepdiva.com/karwa-chauth',
  },
  openGraph: {
    title: 'Karwa Chauth At-Home Salon Packages — Delhi NCR & Lucknow | DoorStep Diva',
    description:
      'Skip the parlor rush while fasting. Certified beauty artists bringing festive glow facials, waxing, manicures & styling to your home in Delhi NCR & Lucknow.',
    url: 'https://mydoorstepdiva.com/karwa-chauth',
    images: [{ url: 'https://mydoorstepdiva.com/images/karwa-chauth.jpg', width: 1024, height: 1024, alt: 'DoorStep Diva Karwa Chauth At-Home Salon Service' }],
    type: 'website',
  },
}

const FAQ_ITEMS = [
  {
    q: 'Why should I book an at-home salon service for Karwa Chauth instead of visiting a parlor?',
    a: 'On Karwa Chauth and Mehndi eve, neighborhood salons are notoriously overcrowded with 2-to-3 hour waiting queues. Traveling in heavy traffic and waiting in crowded rooms while observing a strict nirjala (waterless) fast causes extreme fatigue and dehydration. DoorStep Diva brings verified female estheticians directly to your home with 100% sealed single-use kits, so you can relax in air-conditioned comfort and get ready stress-free before the moonrise.',
  },
  {
    q: 'Which areas in Delhi NCR and Lucknow are covered for Karwa Chauth doorstep services?',
    a: 'In Delhi NCR, we service South Delhi, Central Delhi, West Delhi, Noida, Greater Noida, and Gurgaon. In Lucknow, we cover Gomti Nagar, Hazratganj, Aliganj, Indira Nagar, Mahanagar, Ashiyana, and surrounding areas. Due to immense festive demand, slots are strictly capped per locality.',
  },
  {
    q: 'When are the Karwa Chauth package prices being revealed?',
    a: 'Our special festival package rates are being unveiled exclusively to registered early-bird clients first! You can lock in priority artist dispatch and unlock the lowest VIP festive pricing right now with zero advance deposit by submitting the pre-booking form or chatting with our coordinator on WhatsApp.',
  },
  {
    q: 'Should I book my beauty services on Karwa Chauth day or the day prior?',
    a: 'We strongly recommend scheduling your waxing, deep facials, body polishing, and mani-pedi 1 to 2 days prior (on Mehndi eve). This ensures your skin barrier is fully rested, smooth, and radiant for the main day. On Karwa Chauth day itself, quick glow cleanups, blow-dry styling, and saree draping are most popular.',
  },
  {
    q: 'Are the products safe and hygienic?',
    a: 'Yes, 100%. Every single kit—including bedsheets, gowns, towels, and spatulas—is disposable and unsealed right in front of you. All skincare formulations are authentic branded mono-doses (O3+, Rica, L’Oréal, Cheryl’s).',
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
      image: 'https://mydoorstepdiva.com/images/karwa-chauth.jpg',
      telephone: '+919129577514',
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      areaServed: [
        { '@type': 'City', name: 'Delhi' },
        { '@type': 'City', name: 'Noida' },
        { '@type': 'City', name: 'Gurgaon' },
        { '@type': 'City', name: 'Lucknow' },
      ],
      description: 'Exclusive Karwa Chauth at-home salon combos, festive facials, waxing, manicures, and styling delivered to your doorstep in Delhi NCR and Lucknow.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://mydoorstepdiva.com/karwa-chauth#faq',
      mainEntity: FAQ_ITEMS.map(f => ({
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
const WA_ALT = '9129577514'

export default function KarwaChauthPage() {
  const waPrebookText = encodeURIComponent(
    'Hi DoorStep Diva! I want to pre-book my Karwa Chauth salon slot and unlock the festive combo prices. My city is [Delhi NCR / Lucknow]. Please share details!'
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(KARWA_SCHEMA) }}
      />

      <div className="bg-[#FCF7F8] min-h-screen">
        
        {/* Festive Top Urgency Ribbon */}
        <div className="bg-gradient-to-r from-[#701E34] via-[#8B3A52] to-[#701E34] text-white py-2.5 px-4 text-center text-xs sm:text-sm font-medium tracking-wide shadow-sm">
          <span>🌙 Karwa Chauth Special • Limited At-Home Slots in <strong>Delhi NCR & Lucknow</strong> • Pre-Book Now to Lock Early-Bird VIP Access</span>
        </div>

        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Headline & Value Prop */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B3A52]/10 border border-[#8B3A52]/20 text-[#8B3A52] text-xs font-bold uppercase tracking-wider">
                  <span>✨</span> Solah Shringar At Your Doorstep
                </div>

                <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl text-stone-900 font-bold leading-tight">
                  Don’t Stand in <span className="text-[#8B3A52] italic">3-Hour Parlor Queues</span> While Fasting.
                </h1>

                <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Relax in the cool comfort of your home. Our background-verified female artists bring 
                  <strong> 100% sealed single-use kits</strong>, premium festive glow facials, Rica waxing, hair spas, 
                  and festive styling directly to you across <strong>Delhi NCR & Lucknow</strong>.
                </p>

                {/* Trust Badges Bar */}
                <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
                  <div className="p-3 rounded-2xl bg-white border border-[#F0D5DD] text-center shadow-sm">
                    <span className="block text-xl mb-1">🛡️</span>
                    <span className="text-xs font-semibold text-stone-800 block">100% Sealed</span>
                    <span className="text-[10px] text-stone-500">Opened in front of you</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-[#F0D5DD] text-center shadow-sm">
                    <span className="block text-xl mb-1">👩‍🎨</span>
                    <span className="text-xs font-semibold text-stone-800 block">Verified Experts</span>
                    <span className="text-[10px] text-stone-500">Trained female artists</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-[#F0D5DD] text-center shadow-sm">
                    <span className="block text-xl mb-1">💳</span>
                    <span className="text-xs font-semibold text-stone-800 block">Pay After</span>
                    <span className="text-[10px] text-stone-500">Zero advance needed</span>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#prebook"
                    className="px-8 py-4 rounded-full bg-[#8B3A52] text-white font-semibold text-sm sm:text-base shadow-lg hover:bg-[#732F42] transition-all hover:scale-[1.02] text-center"
                  >
                    Pre-Book Your Slot (Lock Early Bird) →
                  </a>
                  <a
                    href={`https://wa.me/${WA_PRIMARY}?text=${waPrebookText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-sm sm:text-base shadow-md hover:bg-[#1EBE5D] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                <p className="text-xs text-stone-500 italic">
                  ⚡ Only 25 slots available per sector/locality to maintain premium luxury standards.
                </p>
              </div>

              {/* Right Column: High Quality Festive Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/images/karwa-chauth.jpg"
                    alt="Doorstep Diva Karwa Chauth Festive Glow Salon at Home"
                    width={600}
                    height={600}
                    priority
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white text-center">
                    <span className="text-xs uppercase tracking-widest text-[#F2C2CF] font-bold block mb-1">
                      Festive Season 2026
                    </span>
                    <p className="font-playfair text-xl sm:text-2xl font-bold">
                      Glow for the Moonrise 🌙
                    </p>
                    <p className="text-xs text-white/80 mt-1">
                      Complete Festive Shringaar at Home • Delhi NCR & Lucknow
                    </p>
                  </div>
                </div>

                {/* Floating Discount Tag */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-gradient-to-br from-[#8B3A52] to-[#611F31] text-white p-4 rounded-2xl shadow-xl border border-white/40 text-center animate-bounce">
                  <span className="text-[10px] uppercase font-bold block tracking-wider text-[#F9D7E1]">VIP Early Bird</span>
                  <span className="text-xl font-extrabold block">Save 40%</span>
                  <span className="text-[9px] text-white/80 block">On Pre-Booking</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── THE 3 SIGNATURE FESTIVE COMBOS (Prices Revealed on WhatsApp / Pre-Book) ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#F3DFE5]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#8B3A52] uppercase tracking-widest block mb-2">
                Curated Karwa Chauth Packages
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
                Choose Your Festive Glow Combo
              </h2>
              <p className="text-stone-600 text-sm">
                Each combo is carried out using fresh, single-use sealed kits and authentic salon-grade products. 
                <strong> Official festival prices are revealing soon</strong> — pre-book your slot now to lock in maximum savings!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* COMBO 1 */}
              <div className="bg-[#FCF8F9] rounded-3xl p-6 sm:p-8 border border-[#EACCD6] flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] text-xs font-bold uppercase tracking-wider mb-4">
                    Combo 1 • Essential Prep
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-stone-900 mb-2">
                    Glow & Shringaar
                  </h3>
                  <p className="text-xs text-stone-600 mb-6">
                    Perfect quick turnaround package for instant brightness & silky-smooth skin.
                  </p>

                  <ul className="space-y-3 text-sm text-stone-700 mb-8">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">🌿</span>
                      <span>Herbal De-Tan & Deep Pore Cleanup</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">🌿</span>
                      <span>Full Arms + Half Legs Waxing</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">🌿</span>
                      <span>Eyebrow + Upper Lip Micro-Threading</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">🌿</span>
                      <span>Instant Glow Vitamin-C Face Mask</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-[#EACCD6] pt-6 text-center">
                  <div className="mb-4">
                    <span className="text-xs text-stone-500 uppercase tracking-wider block">Festive Package Price</span>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-stone-900 text-white font-extrabold text-sm mt-1">
                      🔒 Revealing Soon
                    </span>
                    <span className="text-[11px] text-[#8B3A52] font-semibold block mt-1">
                      Pre-book to lock 40% Festive Discount
                    </span>
                  </div>
                  <a
                    href="#prebook"
                    className="w-full block py-3 px-6 rounded-full bg-[#8B3A52] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#732F42] transition-colors"
                  >
                    Reserve Combo 1 Slot →
                  </a>
                </div>
              </div>

              {/* COMBO 2 (FEATURED / POPULAR) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#8B3A52] shadow-xl flex flex-col justify-between relative group transform md:-translate-y-2">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#8B3A52] text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                  ★ Most Popular For Karwa Chauth
                </div>

                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] text-xs font-bold uppercase tracking-wider mb-4 mt-2">
                    Combo 2 • Festive Radiance
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-stone-900 mb-2">
                    Chandni Radiance Luxe
                  </h3>
                  <p className="text-xs text-stone-600 mb-6">
                    Our signature bestseller for glass skin, relaxed scalp, and salon-smooth hands and feet.
                  </p>

                  <ul className="space-y-3 text-sm text-stone-700 mb-8">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">✨</span>
                      <span><strong>Korean Glass Glow / O3+ Bridal Facial</strong></span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">✨</span>
                      <span>Rica Sensitive Waxing (Full Arms + Legs)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">✨</span>
                      <span>Rose Petal Deluxe Manicure + Pedicure</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">✨</span>
                      <span>L’Oréal Nourishing Hair Spa with Scalp Massage</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">✨</span>
                      <span>Eyebrow + Forehead + Upper Lip Threading</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-stone-100 pt-6 text-center">
                  <div className="mb-4">
                    <span className="text-xs text-stone-500 uppercase tracking-wider block">Festive Package Price</span>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#8B3A52] text-white font-extrabold text-sm mt-1">
                      🔒 Revealing Soon
                    </span>
                    <span className="text-[11px] text-[#8B3A52] font-semibold block mt-1">
                      Pre-book to lock 40% Festive Discount
                    </span>
                  </div>
                  <a
                    href="#prebook"
                    className="w-full block py-3.5 px-6 rounded-full bg-[#8B3A52] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#732F42] transition-colors shadow-md"
                  >
                    Reserve Combo 2 Slot →
                  </a>
                </div>
              </div>

              {/* COMBO 3 */}
              <div className="bg-[#FCF8F9] rounded-3xl p-6 sm:p-8 border border-[#EACCD6] flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] text-xs font-bold uppercase tracking-wider mb-4">
                    Combo 3 • Royal Transformation
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-stone-900 mb-2">
                    Complete Suhagan Diva
                  </h3>
                  <p className="text-xs text-stone-600 mb-6">
                    Head-to-toe royal treatment including hair styling & pre-puja setup.
                  </p>

                  <ul className="space-y-3 text-sm text-stone-700 mb-8">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">👑</span>
                      <span>Gold / Diamond Radiance Luxury Facial</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">👑</span>
                      <span>Full Body Rica Waxing</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">👑</span>
                      <span>Crystal Spa Manicure + Pedicure with Gel Polish</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">👑</span>
                      <span>Hair Spa + Professional Blow Dry Styling</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">👑</span>
                      <span>Face, Neck & Back Herbal De-Tan Bleach</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#8B3A52] text-base">👑</span>
                      <span>Saree Draping & Hair Do Add-on Assistance</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-[#EACCD6] pt-6 text-center">
                  <div className="mb-4">
                    <span className="text-xs text-stone-500 uppercase tracking-wider block">Festive Package Price</span>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-stone-900 text-white font-extrabold text-sm mt-1">
                      🔒 Revealing Soon
                    </span>
                    <span className="text-[11px] text-[#8B3A52] font-semibold block mt-1">
                      Pre-book to lock 40% Festive Discount
                    </span>
                  </div>
                  <a
                    href="#prebook"
                    className="w-full block py-3 px-6 rounded-full bg-[#8B3A52] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#732F42] transition-colors"
                  >
                    Reserve Combo 3 Slot →
                  </a>
                </div>
              </div>

            </div>

            {/* WhatsApp Quick Inquire Strip */}
            <div className="mt-12 p-6 rounded-2xl bg-[#FDF2F5] border border-[#F3DBE2] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="font-semibold text-stone-900 text-sm sm:text-base">
                  Want custom services or a personalized Karwa Chauth family bundle?
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Chat directly with our beauty coordinator for Delhi NCR or Lucknow.
                </p>
              </div>
              <a
                href={`https://wa.me/${WA_PRIMARY}?text=${waPrebookText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] transition-all shrink-0 flex items-center gap-2"
              >
                <span>WhatsApp Coordinator (+91 9129577514)</span>
              </a>
            </div>

          </div>
        </section>

        {/* ── WHY AT-HOME ON KARWA CHAUTH: COMPARISON TABLE ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#8B3A52] uppercase tracking-widest block mb-2">The At-Home Difference</span>
            <h2 className="font-playfair text-3xl font-bold text-stone-900">
              Why Fasting Women Love DoorStep Diva
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
                  <td className="py-4 px-6 text-emerald-700 font-semibold">✓ 100% relaxed in your AC bedroom; zero exertion</td>
                  <td className="py-4 px-6 text-rose-600">✕ Exhausting travel in heat & traffic while fasting</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-stone-900">Waiting Time</td>
                  <td className="py-4 px-6 text-emerald-700 font-semibold">✓ Zero wait. Artist arrives at your booked time</td>
                  <td className="py-4 px-6 text-rose-600">✕ 2 to 3 hour crowded waiting room queues</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-stone-900">Hygiene & Safety</td>
                  <td className="py-4 px-6 text-emerald-700 font-semibold">✓ Fresh sealed single-use kit unsealed before you</td>
                  <td className="py-4 px-6 text-stone-600">⚠ Shared towels, multi-dip wax pots in rush hour</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-stone-900">Payment Peace of Mind</td>
                  <td className="py-4 px-6 text-emerald-700 font-semibold">✓ Pay via UPI/Cash only AFTER service</td>
                  <td className="py-4 px-6 text-stone-600">⚠ Fixed non-refundable advance parlor tokens</td>
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
                Zero advance payment required. Lock your preferred timing window in <strong>Delhi NCR</strong> or <strong>Lucknow</strong> before slots fill up.
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
                  <option value="Karwa Chauth Combo 2: Chandni Radiance Luxe">Combo 2: Chandni Radiance Luxe (Most Popular)</option>
                  <option value="Karwa Chauth Combo 1: Glow & Shringaar">Combo 1: Glow & Shringaar Essentials</option>
                  <option value="Karwa Chauth Combo 3: Complete Suhagan Diva">Combo 3: Complete Suhagan Diva (Royal Transformation)</option>
                  <option value="Custom Karwa Chauth Beauty Services">Custom Package / Multiple Family Members</option>
                </select>
              </div>

              <div className="bg-[#FAF3F5] rounded-2xl p-4 border border-[#EACCD6]/50 text-xs text-stone-700 flex items-start gap-2.5">
                <span className="text-base">✨</span>
                <span>
                  <strong>Early Bird Guarantee:</strong> Submitting takes you directly to the booking confirmation desk. You do not pay anything online today. Our coordinator will call you within 15 minutes to confirm your artist and give you first access to the 40% discount voucher!
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
                href={`https://wa.me/${WA_PRIMARY}?text=${waPrebookText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#8B3A52] underline"
              >
                Click to message on WhatsApp (+91 9129577514 / +91 9129577514)
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
