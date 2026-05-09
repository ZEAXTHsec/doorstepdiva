'use client'
import React from 'react'
import Link from 'next/link'
import AddToCartButton from '@/app/components/AddToCartButton'

const BREADCRUMB = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { label: 'Skin' },
]

const SIGNATURE_FACIALS = [
  {
    slug: '/services/skin/korean-glass-hydration-facial',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
    badge: 'Bestseller',
    title: 'Korean Glass Hydration Facial',
    tagline: '7-Step K-Beauty Ritual',
    rating: '4.83',
    reviews: '64K reviews',
    price: '₹1,749',
    duration: '1 hr 20 mins',
    desc: 'Deep double cleanse, enzyme exfoliation, sheet mask therapy, and lymphatic drainage massage for that translucent glass-skin luminosity.',
    accent: '#F0D8E8',
  },
  {
    slug: '/services/skin/korean-plant-peptide-bright-facial',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
    badge: 'Brightening',
    title: 'Korean Plant Peptide Bright Facial',
    tagline: 'Peptide + Botanical Complex',
    rating: '4.76',
    reviews: '38K reviews',
    price: '₹1,599',
    duration: '1 hr 10 mins',
    desc: 'Plant-derived peptides meet brightening botanicals to fade dark spots, even out skin tone, and restore a naturally radiant brightness.',
    accent: '#F5E0D0',
  },
  {
    slug: '/services/skin/korean-glow-facial',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
    badge: 'Instant Glow',
    title: 'Korean Glow Facial',
    tagline: 'Vitamin C + Hyaluronic Infusion',
    rating: '4.81',
    reviews: '51K reviews',
    price: '₹1,449',
    duration: '1 hr',
    desc: 'High-potency vitamin C serum paired with multi-weight hyaluronic acid for an instant, dewy, red-carpet glow in 60 minutes.',
    accent: '#F0E8D8',
  },
]

const SIGNATURE_CLASSICS = [
  {
    slug: '/services/skin/signature-facials',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
    badge: 'Classic',
    title: 'Signature Facials',
    tagline: 'Aroma Magic · O3 · Sara',
    rating: '4.72',
    reviews: '45K reviews',
    price: 'From ₹899',
    duration: '45–75 mins',
    desc: 'Our curated collection of classic facials — Aroma Magic Instant Glow, O3 Shine & Glow, and Sara Lightening Glow for trusted, proven results.',
    accent: '#EFCCD4',
  },
]

const WAXING_SERVICES = [
  {
    slug: '/services/skin/waxing',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
    badge: 'Essential',
    title: 'Waxing & Threading',
    tagline: 'Spatula · Roll-On · RICA · Threading',
    rating: '4.79',
    reviews: '72K reviews',
    price: 'From ₹199',
    duration: '15–60 mins',
    desc: 'Full-spectrum hair removal — gentle spatula waxing, quick roll-on waxing, RICA Brazilian stripless bikini waxing, and precise threading for face and body.',
    accent: '#F5E0D0',
  },
]

const MANI_PEDI = [
  {
    slug: '/services/skin',
    hash: 'mani-pedi',
    title: 'Mani & Pedi',
    tagline: 'Basic · Spa · Paraffin · Luxury',
    desc: 'Hand and foot care from clean classic manicures to full spa rituals with paraffin treatments and hot stone massage.',
    price: 'From ₹399',
    accent: '#EFCCD4',
    icon: '◈',
  },
]

const BODY_ADVANCED = [
  {
    slug: '/services/skin',
    hash: 'body',
    title: 'Body & Advanced Skin',
    tagline: 'Polishing · Peels · Clinical Treatments',
    desc: 'Full-body exfoliation, chemical peels, acne therapy, pigmentation correction, and LED light treatments for targeted results.',
    price: 'From ₹799',
    accent: '#E8D8F0',
    icon: '✿',
  },
]

function StarIcon({ filled, size = 11 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function WAIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ServiceCard({
  item,
}: {
  item: {
    slug: string
    hash?: string
    image: string
    badge: string
    title: string
    tagline: string
    rating: string
    reviews: string
    price: string
    duration?: string
    desc: string
    accent: string
  }
}) {
  return (
    <Link
      href={item.hash ? `${item.slug}#${item.hash}` : item.slug}
      className="group relative bg-white rounded-2xl overflow-hidden border border-blush/20 hover:shadow-xl hover:shadow-rose/10 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        <span className="absolute top-3 left-3 font-poppins text-[10px] font-bold tracking-widest uppercase text-white bg-rose/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {item.badge}
        </span>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
          <span className="font-poppins text-[11px] font-bold text-stone">{item.rating}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#C8974A">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-playfair text-lg font-bold text-white mb-0.5">{item.title}</h3>
          <p className="font-poppins text-[10px] tracking-widest uppercase text-white/75 font-medium">{item.tagline}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className="font-playfair text-lg font-bold text-stone">{item.price}</span>
          {item.duration && (
            <>
              <span className="w-1 h-1 rounded-full bg-rose/40 flex-shrink-0" />
              <span className="font-poppins text-xs text-stone-light">{item.duration}</span>
            </>
          )}
          <span className="w-1 h-1 rounded-full bg-rose/40 flex-shrink-0" />
          <span className="font-poppins text-xs text-stone-light">{item.reviews}</span>
        </div>
        <p className="font-poppins text-sm text-stone-light leading-relaxed mb-4 flex-1">{item.desc}</p>
        <div className="flex items-center justify-between">
          <Link href={item.hash ? `${item.slug}#${item.hash}` : item.slug}
            className="flex items-center gap-1.5 font-poppins text-xs font-semibold text-rose group-hover:gap-3 transition-all duration-200"
          >
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <AddToCartButton
            variant="inline"
            id={item.slug}
            name={item.title}
            price={parseInt(item.price.replace(/[^0-9]/g, '')) || 0}
            duration={item.duration || ''}
            image={item.image}
            category="Skin"
            href={item.slug}
          />
        </div>
      </div>
    </Link>
  )
}

function CompactCard({
  item,
}: {
  item: {
    slug: string
    hash?: string
    title: string
    tagline: string
    desc: string
    price: string
    accent: string
    icon: string
  }
}) {
  return (
    <Link
      href={item.hash ? `${item.slug}#${item.hash}` : item.slug}
      className="group bg-white rounded-2xl p-6 border border-blush/20 hover:shadow-lg hover:shadow-rose/10 transition-all duration-300 flex items-start gap-4"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
        style={{ background: item.accent + '80', color: '#8B3A52' }}
      >
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-playfair text-lg font-bold text-stone mb-0.5 group-hover:text-rose transition-colors">
          {item.title}
        </h3>
        <p className="font-poppins text-xs text-rose font-medium mb-1.5">{item.tagline}</p>
        <p className="font-poppins text-sm text-stone-light leading-relaxed mb-3">{item.desc}</p>
        <span className="font-poppins text-xs font-semibold text-rose">{item.price}</span>
      </div>
      <span className="text-rose/30 group-hover:text-rose group-hover:translate-x-1 transition-all duration-200 text-lg flex-shrink-0 mt-2">→</span>
    </Link>
  )
}

export default function SkinPage() {
  return (
    <div className="bg-petal min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-cream">
        <div aria-hidden className="absolute -right-40 top-0 w-[550px] h-[550px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #F5E0D0 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <nav className="flex items-center gap-2 mb-10" aria-label="Breadcrumb">
            {BREADCRUMB.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-rose/30 text-xs">›</span>}
                {item.href
                  ? <Link href={item.href} className="font-poppins text-xs text-stone-light hover:text-rose transition-colors tracking-wider">{item.label}</Link>
                  : <span className="font-poppins text-xs text-rose font-semibold tracking-wider">{item.label}</span>}
              </span>
            ))}
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div style={{ animation: 'fadeUp .8s ease both' }}>
              <div className="inline-flex items-center gap-2 bg-blush/50 text-rose px-4 py-2 rounded-full mb-6">
                <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Women · Division 02</span>
              </div>
              <h1 className="font-playfair text-6xl md:text-7xl font-bold text-stone leading-[1.05] mb-4">
                Skin<br /><em className="text-rose">Services</em>
              </h1>
              <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-4">
                Facial · Waxing · Mani-Pedi · Body Care
              </p>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 max-w-lg">
                Full-spectrum skincare — from K-beauty glass skin facials to precision waxing and clinical body treatments. Every product and tool brought to your door.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Signature Facials', 'Waxing & Threading', 'Mani-Pedi', 'Body Polishing', 'Chemical Peels'].map(t => (
                  <span key={t} className="bg-white border border-blush/40 font-poppins text-xs text-stone-light px-4 py-2 rounded-full font-medium">{t}</span>
                ))}
              </div>
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                <WAIcon size={16} />
                Book Skin Session
              </a>
            </div>

            {/* Right — quick-links card */}
            <div className="hidden md:flex flex-col gap-4" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              <div className="relative rounded-3xl overflow-hidden h-64 shadow-xl shadow-rose/10">
                <img src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png" alt="Skin Services" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="font-poppins text-xs font-semibold text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                    Indian Skin Specialists
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Facials', sub: 'Korean & Signature', color: '#F0D8E8', icon: '✦' },
                  { label: 'Waxing', sub: '4 methods', color: '#F5E0D0', icon: '◇' },
                  { label: 'Mani & Pedi', sub: '7 services', color: '#EFCCD4', icon: '◈' },
                  { label: 'Advanced Skin', sub: '10+ treatments', color: '#E8D8F0', icon: '✿' },
                ].map(c => (
                  <div key={c.label} className="rounded-2xl p-5 border border-blush/20 bg-white"
                    style={{ borderTop: `3px solid ${c.color}` }}>
                    <span className="text-xl text-rose/60 block mb-2">{c.icon}</span>
                    <p className="font-playfair text-lg font-bold text-stone mb-0.5">{c.label}</p>
                    <p className="font-poppins text-xs text-stone-light">{c.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE FACIAL EXPERIENCES ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-24">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Signature Experiences</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-stone mb-4">
            Premium Facial <em className="text-rose">Treatments</em>
          </h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Each facial is a complete ritual designed for specific skin goals. Tap a card to explore the full experience, steps, and reviews.
          </p>
        </div>

        {/* Korean facials row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {SIGNATURE_FACIALS.map((item, i) => (
            <div key={item.slug} className="reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <ServiceCard item={item} />
            </div>
          ))}
        </div>

        {/* Classic signatures row */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-1 gap-4">
          {SIGNATURE_CLASSICS.map((item, i) => (
            <div key={item.slug} className="reveal" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
              <CompactCard
                item={{
                  slug: item.slug,
                  title: item.title,
                  tagline: item.tagline,
                  desc: item.desc,
                  price: item.price,
                  accent: item.accent,
                  icon: '✦',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── WAXING & THREADING ────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: 'linear-gradient(180deg, #FBF7F4 0%, #FDF0F0 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-12 reveal">
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Hair Removal</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-4">
              Waxing & <em className="text-rose">Threading</em>
            </h2>
            <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
              Gentle, effective hair removal with four methods — find the right one for your skin type and area.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {WAXING_SERVICES.map((item, i) => (
              <div key={item.slug} className="reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <ServiceCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANI-PEDI + BODY ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 gap-5">
          {[...MANI_PEDI, ...BODY_ADVANCED].map((item, i) => (
            <div key={item.title} className="reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <CompactCard item={item} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden reveal">
          <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#F5E0D0' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Glow From Within</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">
            Book Your Skin <em className="text-blush">Session Today</em>
          </h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">
            Certified skin therapists arriving at your doorstep — with all products, tools, and expertise included.
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full">
              <WAIcon size={15} />
              Book Now on WhatsApp
            </a>
            <Link href="/#services"
              className="font-poppins text-sm font-medium px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 rounded-full">
              View All Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
