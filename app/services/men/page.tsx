import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Men's Luxury Grooming Division — Coming Soon | DoorStep Diva",
  description:
    "DoorStep Diva Homme — Executive at-home grooming, beard architecture, clinical de-tan facials, and wedding groom styling for gentlemen across Delhi NCR & Lucknow. Launching soon.",
  keywords:
    'men salon at home, doorstep grooming men delhi, home salon lucknow men, beard trimming at home, groom makeup lucknow',
  alternates: {
    canonical: 'https://mydoorstepdiva.com/services/men',
  },
}

const UPCOMING_SERVICES = [
  {
    title: 'Beard Architecture & Precision Edging',
    tag: 'Signature Barbering',
    desc: 'Hot-towel steam therapy, organic beard balm nourishment, and clean straight-razor detailing.',
  },
  {
    title: 'Executive De-Tan & Charcoal Pore Detox',
    tag: 'Clinical Skincare',
    desc: 'Deep ultrasonic pore cleansing, herbal botanical scrub, and antioxidant skin barrier rejuvenation.',
  },
  {
    title: 'Scalp Detox Therapy & Hair Architecture',
    tag: 'Hair Therapy',
    desc: "L'Oréal Professionnel scalp purifiers, anti-stress acupressure massage, and precision haircutting.",
  },
  {
    title: 'The Royal Groom & Best Man Suite',
    tag: 'Wedding Day Luxe',
    desc: 'Comprehensive head-to-toe grooming package for grooms and groomsmen on wedding day.',
  },
]

export default function MensGroomingComingSoonPage() {
  const waWaitlistText = encodeURIComponent(
    "Namaste DoorStep Diva! Please add me to the VIP Waitlist for the Men's Grooming Division. My city is [Delhi NCR / Lucknow]."
  )

  return (
    <div className="bg-[#FCF7F8] min-h-screen pt-28 sm:pt-36 pb-20 font-poppins text-stone-900">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-[#8B3A52] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#8B3A52] font-semibold">Men&apos;s Grooming</span>
        </div>

        {/* Central Hero Card */}
        <div
          className="rounded-3xl p-8 sm:p-14 bg-white border border-[#EACCD6] shadow-xl text-center relative overflow-hidden"
          style={{
            boxShadow: '0 25px 60px -15px rgba(139, 58, 82, 0.12)',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FDF7F8 100%)',
          }}
        >
          {/* Subtle Ambient Background Bloom */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #C8974A, #8B3A52, transparent)' }}
          />

          {/* Official Brand Logo */}
          <div className="relative w-64 sm:w-72 h-20 sm:h-24 mx-auto mb-6">
            <Image
              src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777178196/40b6fd8e-8572-41d3-b5b4-75fdd1e48dd8_sckgy6.png"
              alt="DoorStep Diva Official Logo"
              fill
              priority
              className="object-contain"
              sizes="300px"
            />
          </div>

          {/* Division Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B3A52]/10 border border-[#8B3A52]/20 text-[#8B3A52] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#8B3A52] animate-pulse" />
            <span>Exclusively For Gentlemen · DoorStep Diva Homme</span>
          </div>

          {/* Headline */}
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
            Men&apos;s Luxury Grooming <br />
            <span className="italic font-normal text-[#8B3A52]">Coming Soon</span>
          </h1>

          {/* Mission Copy */}
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
            We are curating an uncompromising at-home grooming division tailored exclusively for gentlemen. Verified male grooming specialists, hospital-grade single-use kits, and executive barbering treatments will soon be available across <strong>Delhi NCR &amp; Lucknow</strong>.
          </p>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-10 text-left">
            {[
              { title: '100% Sealed Kits', desc: 'Mono-dose cosmetics, autoclaved tools & fresh disposable sheets.' },
              { title: 'Verified Specialists', desc: 'Trained grooming experts with 5+ years luxury salon experience.' },
              { title: 'Pay After Service', desc: 'Zero advance deposit. Settle via UPI or cash only after delighted.' },
            ].map((pill) => (
              <div key={pill.title} className="p-3.5 rounded-2xl bg-white border border-[#F0D5DD] shadow-sm">
                <span className="text-emerald-600 font-bold text-xs block mb-1">✓ {pill.title}</span>
                <p className="text-[11px] text-stone-500 leading-snug">{pill.desc}</p>
              </div>
            ))}
          </div>

          {/* VIP Notification Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF2F5] border border-[#F3DBE2] max-w-lg mx-auto mb-8">
            <h3 className="font-playfair text-lg font-bold text-stone-900 mb-1">
              Join the VIP Launch Guestlist
            </h3>
            <p className="text-xs text-stone-600 mb-5 leading-relaxed">
              Be the first to unlock priority dispatch windows and exclusive inaugural discounts when bookings open.
            </p>

            <a
              href={`https://wa.me/919129577514?text=${waWaitlistText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-full bg-[#25D366] text-white font-poppins text-xs font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-all shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Get Notified on WhatsApp (+91 9129577514)</span>
            </a>
          </div>

          {/* Preview of Upcoming Treatments */}
          <div className="text-left pt-6 border-t border-stone-200">
            <span className="text-[10px] font-bold text-[#8B3A52] uppercase tracking-widest block mb-1">
              Curated Treatment Preview
            </span>
            <h3 className="font-playfair text-xl font-bold text-stone-900 mb-5">
              Services Arriving in Phase 1
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {UPCOMING_SERVICES.map((s) => (
                <div key={s.title} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-poppins text-[10px] font-bold uppercase tracking-wider text-[#C8974A] block mb-1">
                      {s.tag}
                    </span>
                    <h4 className="font-serif text-base font-bold text-stone-900 mb-1">
                      {s.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#8B3A52] font-semibold">
                    <span>Status: Launching Soon</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Return Actions */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-[#8B3A52] text-white hover:bg-[#732F42] transition-colors"
            >
              Explore Women&apos;s Salon Services →
            </Link>
            <Link
              href="/academy"
              className="px-6 py-3 rounded-full border border-stone-300 text-stone-700 hover:bg-white transition-colors"
            >
              Visit DoorStep Diva Academy
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}
