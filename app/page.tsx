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
  },
  {
    id: '02', title: 'Skin',
    tagline: 'Waxing · Facials · Body Care',
    desc: 'Full-spectrum skincare — waxing, brightening facials, chemical peels, and body polishing tailored for Indian skin.',
    tags: ['Waxing', 'Facials', 'Chemical Peel', 'Body Polish'],
    accent: '#F5E0D0',
    href: '/services/skin',
  },
  {
    id: '03', title: 'Makeup',
    tagline: 'Party · Bridal · Events',
    desc: 'From festive party looks to full bridal-day experiences using MAC, Charlotte Tilbury, NARS, and Huda Beauty.',
    tags: ['Party Glam', 'Engagement', 'Bridal', 'Sangeet'],
    accent: '#F0D8E8',
    href: '/services/makeup',
  },
  {
    id: '04', title: 'Eyelash',
    tagline: 'Classic · Hybrid · Volume',
    desc: 'Full lash artistry with medical-grade adhesive. Extensions last 3–5 weeks. Cat eye and Foxy styles available.',
    tags: ['Classic', 'Hybrid', 'Volume 2D–6D', 'Cat Eye'],
    accent: '#E8D8F0',
    href: '/services/eyelash',
  },
  {
    id: '05', title: 'Semi-Permanent',
    tagline: 'Microblading · Microneedling',
    desc: 'Long-lasting brow, lip, and liner enhancements by certified technicians. Results last 12 months to 3 years.',
    tags: ['Microblading', 'Combo Brows', 'Lip Blush', 'Nano Liner'],
    accent: '#F0E8D8',
    href: '/services/semi-permanent',
  },
  {
    id: '06', title: 'Nail Extensions',
    tagline: 'Acrylic · Gel · PolyGel',
    desc: 'Every nail system — durable acrylics, natural gels, and next-gen PolyGel — finished with bespoke nail art.',
    tags: ['Acrylic', 'Gel / Shellac', 'PolyGel', 'Nail Art'],
    accent: '#F5D8DC',
    href: '/services/nails',
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

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream pt-20">
      {/* Large decorative circle */}
      <div
        aria-hidden
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle at 40% 40%, #EFCCD4 0%, #FDF0F0 60%, transparent 80%)' }}
      />
      {/* Small floating orb */}
      <div
        aria-hidden
        className="absolute right-64 top-32 w-24 h-24 rounded-full opacity-40"
        style={{ background: '#F0D8E8', animation: 'float 6s ease-in-out infinite' }}
      />
      <div
        aria-hidden
        className="absolute right-96 bottom-40 w-14 h-14 rounded-full opacity-30"
        style={{ background: '#EFCCD4', animation: 'float 8s ease-in-out infinite 2s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full grid md:grid-cols-2 gap-16 items-center py-20">
        {/* Left: Text */}
        <div style={{ animation: 'fadeUp .9s ease both' }}>
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-blush/60 text-rose px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" />
            <span className="font-poppins text-xs font-medium tracking-wider">Now Available At Your Door</span>
          </div>

          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-stone leading-[1.1] mb-6">
            Salon-Quality
            <br />
            <em className="text-rose font-semibold">Beauty</em>
            <br />
            Delivered.
          </h1>

          <p className="font-poppins text-stone-light text-base leading-relaxed mb-10 max-w-md">
            Six professional beauty divisions — hair, skin, makeup, lashes, semi-permanent makeup, and nails —
            all delivered to your doorstep by certified artists.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#services"
              className="font-poppins text-sm font-medium px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="font-poppins text-sm font-medium px-8 py-4 border-2 border-rose/30 text-rose hover:bg-blush/40 transition-colors duration-300 rounded-full"
            >
              Book a Session →
            </a>
          </div>

          {/* Trust row */}
          <div className="flex items-center gap-6 mt-12 pt-8 border-t border-rose/10">
            {['Certified Artists', 'Premium Products', 'At-Home Comfort'].map((t, i) => (
              <div key={t} className="flex items-center gap-2">
                <span className="text-rose text-lg">✓</span>
                <span className="font-poppins text-xs text-stone-light font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Feature card stack */}
        <div className="hidden md:flex flex-col gap-4" style={{ animation: 'fadeUp 1s ease .2s both' }}>
          {/* Big feature card */}
          <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-rose/10 border border-blush/30">
            <div className="absolute top-6 right-6 bg-rose/10 text-rose font-poppins text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </div>
            <p className="font-poppins text-xs tracking-widest uppercase text-mauve font-medium mb-3">Featured Service</p>
            <h3 className="font-playfair text-3xl font-semibold text-stone mb-2">Bridal Packages</h3>
            <p className="font-poppins text-sm text-stone-light leading-relaxed mb-6">
              Complete multi-day bridal experience — from Mehendi glow to Reception glam. Covers the full bridal party.
            </p>
            <div className="flex gap-2 flex-wrap">
              {['Trial Makeup','Mehendi Look','Wedding Day','Reception','Bridesmaid'].map(t => (
                <span key={t} className="bg-petal font-poppins text-[11px] text-rose px-3 py-1 rounded-full font-medium">{t}</span>
              ))}
            </div>
          </div>

          {/* Two small stat cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-rose rounded-2xl p-6 text-white">
              <p className="font-playfair text-4xl font-bold mb-1">06</p>
              <p className="font-poppins text-xs font-medium opacity-80 uppercase tracking-wider">Divisions</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-blush/30 shadow-sm">
              <p className="font-playfair text-4xl font-bold text-rose mb-1">15+</p>
              <p className="font-poppins text-xs font-medium text-stone-light uppercase tracking-wider">Pro Brands</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────

function Marquee() {
  const doubled = [...MARQUEE, ...MARQUEE]
  return (
    <div className="overflow-hidden bg-rose py-4">
      <div className="flex whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`font-poppins text-xs tracking-widest uppercase px-5 font-medium ${
              item === '✦' ? 'text-white/40' : 'text-white/90'
            }`}
          >
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
    <section id="services" className="px-6 md:px-16 py-28 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-20">
        <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-4">What We Offer</p>
        <h2 className="font-playfair text-5xl md:text-6xl font-bold text-stone mb-4">
          Our <em>Six Divisions</em>
        </h2>
        <p className="font-poppins text-stone-light text-base max-w-xl mx-auto leading-relaxed">
          Every service designed for results. Every artist certified. Everything brought to you.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => (
          <Link
            key={s.id}
            href={s.href}
            className="group relative rounded-3xl p-8 border border-transparent hover:border-blush/50 transition-all duration-500 cursor-pointer overflow-hidden block"
            style={{ background: `${s.accent}40`, animationDelay: `${i * 0.1}s` }}
          >
            {/* Hover fill */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
              style={{ background: `${s.accent}80` }}
            />

            <div className="relative z-10">
              {/* Number + arrow row */}
              <div className="flex justify-between items-start mb-6">
                <span className="font-poppins text-xs font-bold tracking-widest uppercase text-rose/50 bg-white/60 px-3 py-1 rounded-full">
                  {s.id}
                </span>
                <span className="w-8 h-8 rounded-full bg-white/60 group-hover:bg-rose group-hover:text-white text-stone/40 flex items-center justify-center text-sm transition-all duration-300">
                  →
                </span>
              </div>

              <h3 className="font-playfair text-2xl font-semibold text-stone mb-1">{s.title}</h3>
              <p className="font-poppins text-xs tracking-wider uppercase text-rose font-medium mb-4">{s.tagline}</p>
              <p className="font-poppins text-sm text-stone-light leading-relaxed mb-6 line-clamp-3">{s.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="bg-white/70 font-poppins text-[11px] text-stone-light px-3 py-1 rounded-full font-medium">
                    {t}
                  </span>
                ))}
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
    <section id="about" className="bg-cream px-6 md:px-16 py-28">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* Left: Stats grid */}
        <div className="grid grid-cols-2 gap-5">
          {STATS.map(({ n, label }, i) => (
            <div
              key={label}
              className={`rounded-3xl p-8 ${i === 0 ? 'bg-rose text-white' : 'bg-white border border-blush/40'}`}
            >
              <p className={`font-playfair text-5xl font-bold mb-2 ${i === 0 ? 'text-white' : 'text-rose'}`}>{n}</p>
              <p className={`font-poppins text-xs uppercase tracking-widest font-medium ${i === 0 ? 'text-white/70' : 'text-stone-light'}`}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Story */}
        <div>
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-4">Our Story</p>
          <h2 className="font-playfair text-5xl font-bold text-stone leading-tight mb-6">
            Beauty on
            <br /><em className="text-rose">your terms.</em>
          </h2>
          <p className="font-poppins text-stone-light text-base leading-relaxed mb-5">
            DoorStep Diva was built on one belief — you shouldn&apos;t have to leave home for a luxury salon experience.
            We bring certified artists, professional tools, and premium products directly to you.
          </p>
          <p className="font-poppins text-stone-light text-base leading-relaxed mb-10">
            Whether it&apos;s your wedding day, a festive event, or a regular self-care ritual — we&apos;re at your door,
            fully equipped, on your schedule.
          </p>
          <div className="flex flex-col gap-4">
            {[
              'Certified & trained beauty professionals',
              'Professional-grade salon products only',
              'All six divisions under one booking',
            ].map((point) => (
              <div key={point} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-rose text-xs">✓</span>
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

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="px-6 md:px-16 py-28 max-w-7xl mx-auto">
      <div className="bg-stone rounded-[2.5rem] p-10 md:p-16 grid md:grid-cols-2 gap-16 items-start relative overflow-hidden">
        {/* Decorative blob */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: '#EFCCD4' }}
        />

        {/* Left: Heading */}
        <div className="relative z-10">
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4">Get in Touch</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Book your
            <br /><em className="text-blush">session.</em>
          </h2>
          <p className="font-poppins text-white/50 text-base leading-relaxed mb-10">
            Tell us what you need. We&apos;ll get back to you within a few hours to confirm your booking.
          </p>
          {/* WhatsApp CTA — replace number */}
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-poppins text-sm font-medium px-7 py-4 bg-[#25D366] text-white hover:opacity-90 transition-opacity rounded-full"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Message on WhatsApp
          </a>
        </div>

        {/* Right: Form */}
        <form className="relative z-10 space-y-5">
          {[
            { id: 'name',    label: 'Your Name',             type: 'text' },
            { id: 'phone',   label: 'Phone / WhatsApp',      type: 'tel'  },
            { id: 'service', label: 'Service You Need',      type: 'text' },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <input
                id={id}
                type={type}
                placeholder={label}
                className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 font-poppins text-sm text-white placeholder:text-white/30 outline-none focus:border-blush/50 focus:bg-white/15 transition-all"
              />
            </div>
          ))}
          <textarea
            rows={3}
            placeholder="Your message..."
            className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 font-poppins text-sm text-white placeholder:text-white/30 outline-none focus:border-blush/50 focus:bg-white/15 transition-all resize-none"
          />
          <button
            type="submit"
            className="w-full font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-2xl tracking-wide"
          >
            Send Message
          </button>
        </form>
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
      <About />
      <Contact />
    </>
  )
}
