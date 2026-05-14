'use client'
import React from 'react'
import Link from 'next/link'
import AddToCartButton from '@/app/components/AddToCartButton'

const BREADCRUMB = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/services/skin', label: 'Skin' },
  { label: 'Signature Facials' },
]

const FACIALS = [
  {
    slug: '#aroma-magic',
    title: 'Aroma Magic Instant Glow',
    tagline: 'Essential Oil Therapy · 45 mins',
    price: '₹899',
    rating: '4.68',
    reviews: '28K reviews',
    desc: 'Aromatherapy-infused facial using pure lavender, rosemary, and tea tree essential oils. Gentle steam opens pores before a calming herbal mask restores natural radiance. Best for sensitive and stressed skin.',
    accent: '#EFCCD4',
  },
  {
    slug: '#o3-shine-glow',
    title: 'O3 Shine & Glow',
    tagline: 'Professional-Grade Formula · 60 mins',
    price: '₹1,199',
    rating: '4.74',
    reviews: '35K reviews',
    desc: 'O3+ professional facial range targets dullness and uneven texture with vitamin-enriched creams. Includes deep cleansing, toning, and a brightening mask for an instant visible glow.',
    accent: '#F0D8E8',
  },
  {
    slug: '#sara-lightening',
    title: 'Sara Lightening Glow',
    tagline: 'Pigmentation Focus · 75 mins',
    price: '₹1,299',
    rating: '4.71',
    reviews: '22K reviews',
    desc: 'Advanced lightening facial using kojic acid and glutathione to reduce pigmentation and even out skin tone. Multi-step protocol with massage, mask, and protective serum for lasting brightness.',
    accent: '#F5E0D0',
  },
]

function StarIcon({ filled, size = 14 }: { filled: boolean; size?: number }) {
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

export default function SignatureFacialsPage() {
  return (
    <div className="bg-petal min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-cream">
        <div aria-hidden className="absolute -right-40 -top-20 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #EFCCD4 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <nav className="flex items-center gap-2 mb-10 flex-wrap" aria-label="Breadcrumb">
            {BREADCRUMB.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-rose/30 text-xs">›</span>}
                {item.href
                  ? <Link href={item.href} className="font-poppins text-xs text-stone-light hover:text-rose transition-colors tracking-wider">{item.label}</Link>
                  : <span className="font-poppins text-xs text-rose font-semibold tracking-wider">{item.label}</span>}
              </span>
            ))}
          </nav>

          <div style={{ animation: 'fadeUp .8s ease both' }}>
            <div className="inline-flex items-center gap-2 bg-blush/50 text-rose px-4 py-2 rounded-full mb-5">
              <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Classic Collection</span>
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-stone leading-[1.08] mb-4">
              Signature <em className="text-rose">Facials</em>
            </h1>
            <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-6">
              Aroma Magic · O3 Shine & Glow · Sara Lightening Glow
            </p>
            <p className="font-poppins text-stone-light text-base leading-relaxed max-w-xl">
              Our trusted classic facials — each with a proven formula, thousands of reviews, and consistent results. From aromatherapy relaxation to medical-grade brightening.
            </p>
          </div>
        </div>
      </section>

      {/* ── FACIAL CARDS ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-20 space-y-8">
        {FACIALS.map((facial, i) => (
          <div key={facial.slug} id={facial.slug.replace('#', '')} className="reveal scroll-mt-28"
            style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-blush/20 shadow-sm hover:shadow-lg hover:shadow-rose/8 transition-all duration-300">
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2">
                  <p className="font-poppins text-xs tracking-widest uppercase text-rose font-semibold mb-2">
                    {i === 0 ? 'Aromatherapy' : i === 1 ? 'Professional Series' : 'Advanced Brightening'}
                  </p>
                  <h2 className="font-playfair text-3xl font-bold text-stone mb-3">{facial.title}</h2>
                  <p className="font-poppins text-sm text-rose font-medium mb-4">{facial.tagline}</p>
                  <p className="font-poppins text-sm text-stone-light leading-relaxed mb-6">{facial.desc}</p>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-1 bg-petal rounded-full px-3 py-1.5">
                      <span className="font-poppins text-sm font-bold text-stone">{facial.rating}</span>
                      <div className="flex gap-0.5 text-[#C8974A]">
                        {[1, 2, 3, 4, 5].map(s => (<StarIcon key={s} filled={true} size={10} />))}
                      </div>
                    </div>
                    <span className="font-poppins text-xs text-stone-light">{facial.reviews}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                      className="btn-press inline-flex items-center gap-2.5 font-poppins text-sm font-semibold px-6 py-3 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full">
                      <WAIcon size={14} /> Book at {facial.price}
                    </a>
                    <AddToCartButton
                      variant="inline"
                      id={facial.title}
                      name={facial.title}
                      price={parseInt(facial.price.replace(/[₹,]/g, ''))}
                      duration={facial.tagline.match(/\d+\s*mins?/)?.[0] || ''}
                      image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png"
                      category="Skin"
                      href="/book"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full flex items-center justify-center"
                    style={{ background: facial.accent }}>
                    <span className="text-4xl">{i === 0 ? '🌸' : i === 1 ? '✨' : '💫'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden reveal">
          <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#EFCCD4' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Classic & Trusted</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">
            Find Your Signature<br /><em className="text-blush">Facial Today</em>
          </h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">
            Not sure which one? Message us and we&apos;ll recommend the perfect facial for your skin type and goals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
              <WAIcon size={16} /> Book Now on WhatsApp
            </a>
            <Link href="/services/skin" className="font-poppins text-sm font-medium px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 rounded-full">
              ← Back to Skin Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
