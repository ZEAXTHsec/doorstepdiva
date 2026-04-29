import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Service Areas — DoorStep Diva | At-Home Beauty in Delhi NCR, Lucknow & Ayodhya',
  description: 'DoorStep Diva provides at-home salon services across Delhi, Noida, Gurugram, Faridabad, Ghaziabad, Lucknow (Hazratganj, Gomti Nagar, Indira Nagar) and Ayodhya. Book a certified beauty artist at your door.',
  keywords: 'at home beauty Lucknow, doorstep salon Delhi NCR, home salon Noida, beauty at home Gurugram, mobile salon Ayodhya',
  openGraph: {
    title: 'Service Areas — DoorStep Diva',
    description: 'Certified beauty artists serving Delhi NCR, Lucknow, and Ayodhya at your doorstep.',
    url: 'https://doorstepdiva.com/areas',
  },
}

const CITIES = [
  {
    city: 'Delhi NCR',
    icon: '🏙️',
    accent: '#EFCCD4',
    note: 'Our largest service zone',
    description: 'Full coverage across the National Capital Region. All six service divisions available — hair, skin, makeup, eyelash, semi-permanent, and nails.',
    areas: [
      { name: 'Central Delhi', localities: ['Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'South Delhi', 'Defence Colony'] },
      { name: 'Noida',         localities: ['Sector 18', 'Sector 62', 'Sector 137', 'Expressway', 'Greater Noida'] },
      { name: 'Gurugram',      localities: ['DLF Phase 1–5', 'Sohna Road', 'Golf Course Road', 'Cyber City', 'Sector 56'] },
      { name: 'Faridabad',     localities: ['Sector 14', 'Sector 21', 'NIT', 'Old Faridabad', 'Neharpar'] },
      { name: 'Ghaziabad',     localities: ['Indirapuram', 'Vaishali', 'Raj Nagar', 'Crossing Republik'] },
    ],
  },
  {
    city: 'Lucknow',
    icon: '🌸',
    accent: '#F0D8E8',
    note: 'City of Nawabs',
    description: 'Serving all major localities in Lucknow. Particularly popular for bridal makeup packages, nail extensions, and advanced skin treatments.',
    areas: [
      { name: 'Central Lucknow', localities: ['Hazratganj', 'Kaiserbagh', 'Chowk', 'Aminabad'] },
      { name: 'East Lucknow',    localities: ['Gomti Nagar', 'Gomti Nagar Extension', 'Vibhuti Khand', 'Shaheed Path'] },
      { name: 'North Lucknow',   localities: ['Indira Nagar', 'Aliganj', 'Sector B', 'Sector C', 'Jankipuram'] },
      { name: 'South Lucknow',   localities: ['Alambagh', 'Mahanagar', 'Rajajipuram', 'Krishna Nagar'] },
      { name: 'Suburbs',         localities: ['Chinhat', 'Faizabad Road', 'Raibareli Road', 'Sitapur Road'] },
    ],
  },
  {
    city: 'Ayodhya',
    icon: '✦',
    accent: '#F5E0D0',
    note: 'Now serving',
    description: 'Available across Ayodhya city and surrounding areas. Ideal for wedding season bookings and event makeup.',
    areas: [
      { name: 'City Centre', localities: ['Ram Mandir Area', 'Naya Ghat', 'Dashrath Mahal', 'Tulsi Nagar'] },
      { name: 'Wider Area',  localities: ['Faizabad Road', 'Civil Lines', 'Sahadatganj', 'Surrounding Areas'] },
    ],
  },
]

const SERVICES_AVAILABLE = [
  { name: 'Hair',           href: '/services/hair',           desc: 'Cuts, color, keratin, treatments' },
  { name: 'Skin',           href: '/services/skin',           desc: 'Waxing, facials, chemical peels' },
  { name: 'Makeup',         href: '/services/makeup',         desc: 'Party, bridal, events' },
  { name: 'Eyelash',        href: '/services/eyelash',        desc: 'Classic, hybrid, volume' },
  { name: 'Semi-Permanent', href: '/services/semi-permanent', desc: 'Microblading, lip blush, liner' },
  { name: 'Nail Extensions', href: '/services/nails',         desc: 'Acrylic, gel, PolyGel, nail art' },
]

function WAIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function AreasPage() {
  return (
    <div className="bg-petal min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 overflow-hidden bg-cream">
        <div aria-hidden className="absolute -right-40 top-0 w-[500px] h-[500px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #EFCCD4 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <nav className="flex items-center gap-2 mb-10" aria-label="Breadcrumb">
            {[{ href: '/', label: 'Home' }, { label: 'Service Areas' }].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-rose/30 text-xs">›</span>}
                {item.href
                  ? <Link href={item.href} className="font-poppins text-xs text-stone-light hover:text-rose transition-colors tracking-wider">{item.label}</Link>
                  : <span className="font-poppins text-xs text-rose font-semibold tracking-wider">{item.label}</span>}
              </span>
            ))}
          </nav>

          <div className="max-w-2xl" style={{ animation: 'fadeUp .8s ease both' }}>
            <div className="inline-flex items-center gap-2 bg-blush/50 text-rose px-4 py-2 rounded-full mb-6">
              <span className="font-poppins text-xs font-semibold tracking-widest uppercase">📍 Coverage Map</span>
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-stone leading-[1.05] mb-4">
              We Come <em className="text-rose">To You</em>
            </h1>
            <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 max-w-xl">
              Three cities. 30+ localities. All six beauty divisions at your door — certified artists, premium products, zero travel for you.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['Delhi NCR', 'Lucknow', 'Ayodhya', 'More Coming Soon'].map(c => (
                <span key={c} className="bg-white border border-blush/40 font-poppins text-xs text-stone-light px-4 py-2 rounded-full font-medium">{c}</span>
              ))}
            </div>
            <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
              <WAIcon size={16} />
              Check Your Area on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── CITIES ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24 space-y-24">
        {CITIES.map((city, ci) => (
          <div key={city.city} className="reveal">
            {/* City header */}
            <div className="flex items-start gap-5 mb-10">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm"
                style={{ background: city.accent }}>
                {city.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-playfair text-4xl font-bold text-stone">{city.city}</h2>
                  <span className="font-poppins text-xs text-rose font-semibold bg-blush/40 px-3 py-1 rounded-full">{city.note}</span>
                </div>
                {/* text-base (was text-sm) */}
                <p className="font-poppins text-base text-stone-light max-w-xl leading-relaxed">{city.description}</p>
              </div>
            </div>

            {/* Area grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {city.areas.map((area, ai) => (
                <div key={area.name}
                  className={`reveal reveal-d${Math.min(ai + 1, 6)} card-lift bg-white rounded-2xl p-5 border border-blush/20`}
                  style={{ borderTop: `3px solid ${city.accent}` }}>
                  <p className="font-poppins text-xs font-semibold text-rose tracking-wider uppercase mb-3">{area.name}</p>
                  <div className="flex flex-col gap-2">
                    {area.localities.map(loc => (
                      <div key={loc} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-rose/40 flex-shrink-0" />
                        {/* text-sm (was text-xs) */}
                        <span className="font-poppins text-sm text-stone-light">{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── ALL SERVICES EVERYWHERE ──────────────────────────────────── */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-14 reveal">
            <p className="font-poppins label-caps text-rose mb-3">Available Across All Areas</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-3">
              All Six Divisions, <em className="text-rose">Everywhere We Serve</em>
            </h2>
            {/* text-base (was text-sm) */}
            <p className="font-poppins text-stone-light text-base max-w-lg mx-auto">
              Every service we offer is available in every area we cover. One team, all skills, at your door.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES_AVAILABLE.map((s, i) => (
              <Link key={s.name} href={s.href}
                className={`reveal reveal-d${Math.min(i + 1, 6)} card-lift group flex items-center gap-4 bg-white rounded-2xl p-5 border border-blush/20 hover:border-rose/20`}>
                <div className="w-2 h-10 rounded-full bg-rose/20 group-hover:bg-rose transition-colors flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-poppins text-sm font-semibold text-stone group-hover:text-rose transition-colors">{s.name}</p>
                  {/* text-sm (was text-xs) */}
                  <p className="font-poppins text-sm text-stone-light">{s.desc}</p>
                </div>
                <span className="text-stone-light group-hover:text-rose transition-colors text-sm">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOT IN YOUR AREA CTA ─────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="reveal bg-stone rounded-[2.5rem] p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center relative overflow-hidden">
            <div aria-hidden className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#EFCCD4' }} />

            <div className="relative z-10">
              <p className="font-poppins label-caps text-rose-light mb-4">Don&apos;t See Your Area?</p>
              <h2 className="font-playfair text-4xl font-bold text-white mb-4">
                We&apos;re <em className="text-blush">expanding.</em>
              </h2>
              {/* text-base (was text-sm) */}
              <p className="font-poppins text-white/50 text-base leading-relaxed">
                Our coverage is growing every month. Even if your area isn&apos;t listed, message us — we may still be able to arrange a visit, or add you to our waitlist for when we expand to your locality.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                className="btn-press inline-flex items-center justify-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-[#25D366] text-white hover:opacity-90 transition-opacity rounded-full">
                <WAIcon size={16} />
                Ask if We Cover You
              </a>
              <Link href="/"
                className="inline-flex items-center justify-center font-poppins text-sm font-medium px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors rounded-full">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}