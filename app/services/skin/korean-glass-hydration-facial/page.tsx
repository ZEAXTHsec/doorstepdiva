'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import AddToCartButton from '@/app/components/AddToCartButton'

const BREADCRUMB = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/services/skin', label: 'Skin' },
  { label: 'Korean Glass Hydration Facial' },
]

const PACKAGES = [
  {
    title: 'Deep Double Cleanse',
    desc: 'Oil-based cleanser followed by a water-based foam cleanse to remove impurities, makeup, and excess sebum without stripping the skin barrier.',
    icon: '✦',
  },
  {
    title: 'Gentle Enzyme Exfoliation',
    desc: 'Plant-based enzymatic exfoliator that dissolves dead skin cells and smooths texture — no harsh scrubbing, perfect for sensitive Indian skin.',
    icon: '◈',
  },
  {
    title: 'Hydrating Toner Layer',
    desc: 'Seven-skin method adapted as a triple-layer toner application using hyaluronic acid and birch juice to flood the skin with hydration.',
    icon: '◇',
  },
  {
    title: 'Korean Sheet Mask Therapy',
    desc: 'Medical-grade hydrogel or bio-cellulose sheet mask infused with centella asiatica, niacinamide, and peptide complex for 20-minute deep absorption.',
    icon: '✿',
  },
  {
    title: 'Glass Skin Emulsion Massage',
    desc: 'Upward lymphatic drainage massage using a lightweight moisturising emulsion to boost circulation, sculpt contours, and lock in hydration for the signature glass-skin luminosity.',
    icon: '◎',
  },
  {
    title: 'Serum Infusion & Ampoule',
    desc: 'High-potency ampoule tapped into the skin followed by a niacinamide-rich serum to brighten, even out tone, and strengthen the moisture barrier.',
    icon: '◆',
  },
  {
    title: 'SPF & Glow Seal',
    desc: 'Broad-spectrum SPF 50+ PA++++ sunscreen applied as the final step to protect and seal the glow — because glass skin needs daily defence.',
    icon: '☼',
  },
]

const RATING_BREAKDOWN = [
  { stars: 5, count: 60000, bar: 94 },
  { stars: 4, count: 2000, bar: 3 },
  { stars: 3, count: 1000, bar: 1.5 },
  { stars: 2, count: 492, bar: 0.8 },
  { stars: 1, count: 721, bar: 1.1 },
]

const REVIEWS = [
  {
    name: 'Neha',
    date: 'May 4, 2026',
    services: 'Glass skin hydration facial, Threading: Eyebrow, RICA Roll-on Full Arms + Underarms, Full Legs RICA roll-on',
    rating: 5,
    text: 'She is an ace professional, was too good with massages and did hassle free waxing. Shaped my brows beautifully. Polite demeanor. Definitely booking her again for future services.',
  },
  {
    name: 'Nirmala Bhor',
    date: 'May 4, 2026',
    services: 'Glass skin hydration facial, Full arms + underarms (RICA), Half legs (RICA), Hair color application, Threading: Eyebrow, Threading: Upper lip, Waxing: Forehead',
    rating: 5,
    text: 'Bhagyashree was a patient and experienced person who handled the work carefully. Overall a good experience and I will go for it again with her. Thanks for making the day.',
  },
  {
    name: 'Disha',
    date: 'May 3, 2026',
    services: 'Glass skin hydration facial, Threading: Eyebrow, Waxing: Full face, Full arms (including underarms) (roll-on), Full Legs- roll-on, Elysian British Rose manicure, Bikini Wax RICA Peel-off',
    rating: 5,
    text: 'Absolutely loved your service! ✨ The massage was so relaxing and the waxing was completely painless — such a smooth experience. Thank you for making me feel so comfortable. I can give u 10 on 10.',
  },
  {
    name: 'Richa',
    date: 'May 3, 2026',
    services: 'Glass skin hydration facial, Bleach: Face & neck, Threading: Eyebrow, Waxing: Chin, Waxing: Upper lip, Full arms (including underarms) (roll-on), Elysian Candle Spa manicure',
    rating: 5,
    text: 'She is so great with her service and provided extra care and massage to make the entire experience beautiful and satisfying. Services completed - Facial, bleach, waxing and manicure - rating 5/5.',
  },
  {
    name: 'Kritanjali Arora',
    date: 'May 3, 2026',
    services: 'Glass skin hydration facial, Elysian Chocolate & Vanilla pedicure - with heel peel',
    rating: 5,
    text: 'The massage during the facial and pedicure was amazing and relaxing. Really good at her work and knows things. Will definitely prefer for next service.',
  },
  {
    name: 'Sri',
    date: 'May 3, 2026',
    services: 'Glass skin hydration facial, Threading: Forehead, Threading: Sidelocks, FYC Shine & Glow Cleanup',
    rating: 5,
    text: 'I recently booked a facial service and had a good experience. The professional was on time, polite, and maintained proper hygiene throughout. The facial was relaxing and my skin feels fresh and glowing after the session.',
  },
  {
    name: 'Pradip Joshi',
    date: 'May 3, 2026',
    services: 'Glass skin hydration facial, Threading: Eyebrow, Full arms (including underarms) (roll-on)',
    rating: 5,
    text: 'It was great experienced. Archana was too good, she gave each and every information about product, and I am sure next time I will definitely book for archana only. Thank you archana.',
  },
  {
    name: 'D Navya',
    date: 'May 3, 2026',
    services: 'Glass skin hydration facial, Sara Lightening glow facial, Elysian British Rose manicure, Foot massage, Crystal Rose Pedicure (without heel peel), Korean ageless facial',
    rating: 5,
    text: 'I had a wonderful facial experience with Sony. The beautician was very skilled and explained each step clearly. The products used felt high-quality, and my skin felt instantly hydrated and rejuvenated. I noticed a visible glow after the session.',
  },
  {
    name: 'Akshita',
    date: 'May 3, 2026',
    services: 'Glass skin hydration facial, Threading: Eyebrow, Threading: Forehead, Threading: Upper lip, Full Legs- roll-on',
    rating: 5,
    text: 'I had such an amazing experience! She is extremely professional and truly knows her work. The facial was honestly so, so, so good — my skin felt instantly refreshed and glowing. Her waxing technique was super smooth and comfortable, and the threading was absolutely on point.',
  },
  {
    name: 'Dhanashree Tiware',
    date: 'May 2, 2026',
    services: 'Glass skin hydration facial',
    rating: 5,
    text: 'Roshni was extremely polite and professional throughout. She did a wonderful job with the facial — it was very relaxing and well done. The leg massage was truly the cherry on top, making the entire experience even more enjoyable. Highly appreciated her service!',
  },
  {
    name: 'Prathima',
    date: 'May 5, 2026',
    services: 'Glass skin hydration facial, Threading: Full face',
    rating: 5,
    text: 'I am happy with the service. She was very patient and professional. I highly recommended her, you can take her service without second thought.',
  },
  {
    name: 'Bhavya Jain',
    date: 'May 5, 2026',
    services: 'Glass skin hydration facial',
    rating: 5,
    text: 'It was really a great experience… The person gives her services exactly how i want to have… i would like to book her again in future… she was so polite and best in her work even she guided me through out the process.',
  },
  {
    name: 'Dr Vijna',
    date: 'May 2, 2026',
    services: 'Glass skin hydration facial, Full arms + underarms (RICA), Half legs (RICA), O3+ shine & glow facial, Bleach: Face & neck, Threading: Eyebrow, Threading: Forehead',
    rating: 5,
    text: 'The beautician provided excellent service, with proper attention to detail and professional approach throughout the session.',
  },
  {
    name: 'Poonam Mishra',
    date: 'May 5, 2026',
    services: 'Glass skin hydration facial, Bleach: Face & neck, Threading: Eyebrow, Threading: Upper lip, Threading: Chin, Waxing: Upper lip, Under Arms (RICA)',
    rating: 5,
    text: 'Nikki is very professional, punctual and soft spoken. Quite satisfied with her work. Will definitely rebook.',
  },
  {
    name: 'Heena',
    date: 'May 3, 2026',
    services: 'Glass skin hydration facial',
    rating: 5,
    text: 'A truly relaxing and professional experience. The beautician was punctual, well-prepared, and maintained great hygiene. The facial was soothing, and highly recommended for a salon-like experience at home.',
  },
  {
    name: 'Vamshi Krishna',
    date: 'May 3, 2026',
    services: 'Glass skin hydration facial',
    rating: 5,
    text: 'Rani provided an excellent service. She explained each step very clearly, was very polite, and showed great expertise in her profession. The massage was extremely relaxing and done very well.',
  },
  {
    name: 'Souriya Roy Barman',
    date: 'May 3, 2026',
    services: 'Glass skin hydration facial',
    rating: 5,
    text: 'I had an amazing experience with her. The massage was incredibly relaxing and exactly what I needed. She was professional and made sure I was comfortable throughout. Highly recommend her if you\'re looking for a peaceful and rejuvenating facial.',
  },
  {
    name: 'Akanchha Dubey',
    date: 'May 4, 2026',
    services: 'Glass skin hydration facial',
    rating: 5,
    text: 'Very relaxing time throughout my facial… your massaging technique was awesome and beyond… I want to book her again and again. Thank you ma\'am.',
  },
]

const FILTER_TABS = ['Most detailed', 'In my area', 'Frequent users']

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

export default function KoreanGlassFacialPage() {
  const [activeFilter, setActiveFilter] = useState('Most detailed')
  const [showAllReviews, setShowAllReviews] = useState(false)

  const displayedReviews = showAllReviews ? REVIEWS : REVIEWS.slice(0, 8)

  return (
    <div className="bg-petal min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-cream">
        <div aria-hidden className="absolute -right-40 -top-20 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #F0D8E8 0%, transparent 70%)' }} />
        <div aria-hidden className="absolute left-1/3 bottom-0 w-48 h-48 rounded-full opacity-15"
          style={{ background: '#C4768A' }} />

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          {/* Breadcrumb */}
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

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left */}
            <div style={{ animation: 'fadeUp .8s ease both' }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blush/50 text-rose px-4 py-2 rounded-full mb-5">
                <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Bestseller</span>
              </div>

              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-stone leading-[1.08] mb-3">
                Korean Glass<br /><em className="text-rose">Hydration Facial</em>
              </h1>
              <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-6">
                Deep Hydration · Glass Skin Glow · 7-Step K-Beauty Ritual
              </p>

              {/* Rating row */}
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 border border-blush/30">
                  <span className="font-poppins text-sm font-bold text-stone">4.83</span>
                  <div className="flex gap-0.5 text-[#C8974A]">
                    {[1, 2, 3, 4, 5].map(s => (
                      <StarIcon key={s} filled={s <= 5} size={11} />
                    ))}
                  </div>
                </div>
                <span className="font-poppins text-xs text-stone-light">64K reviews</span>
              </div>

              {/* Price + Duration */}
              <div className="flex items-center gap-5 mb-8 flex-wrap">
                <div>
                  <span className="font-playfair text-4xl font-bold text-stone">₹1,749</span>
                </div>
                <div className="flex items-center gap-2 text-stone-light">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="font-poppins text-sm">1 hr 20 mins</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <AddToCartButton
                  variant="full"
                  id="korean-glass-hydration-facial"
                  name="Korean Glass Hydration Facial"
                  price={1749}
                  duration="1 hr 20 mins"
                  image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png"
                  category="Skin · Facial"
                  href="/services/skin/korean-glass-hydration-facial"
                />
                <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-6 py-4 bg-[#25D366] text-white hover:opacity-90 transition-opacity rounded-full shadow-md shadow-green-500/20">
                  <WAIcon size={16} />
                  WhatsApp
                </a>
                <Link href="/services/skin"
                  className="font-poppins text-sm font-medium px-6 py-4 border border-blush/40 text-stone-light hover:text-rose hover:border-rose/40 transition-colors duration-300 rounded-full">
                  ← Back to Skin Services
                </Link>
              </div>
            </div>

            {/* Right — Hero image */}
            <div className="hidden md:block" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-rose/15">
                <img
                  src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png"
                  alt="Korean Glass Hydration Facial — DoorStep Diva"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                  <span className="font-poppins text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                    K-Beauty Ritual
                  </span>
                  <span className="font-poppins text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                    7-Step Protocol
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THIS SERVICE ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal">
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">The K-Beauty Experience</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-stone mb-5 leading-tight">
              What is Korean<br /><em className="text-rose">Glass Skin?</em>
            </h2>
            <p className="font-poppins text-sm text-stone-light leading-relaxed mb-4">
              Glass skin is the hallmark of Korean skincare — a complexion so clear, luminous, and intensely hydrated it appears almost translucent, like a pane of glass. It is not about coverage or heavy products, but about achieving skin health from within through layered hydration.
            </p>
            <p className="font-poppins text-sm text-stone-light leading-relaxed mb-6">
              Our Korean Glass Hydration Facial adapts the iconic 10-step K-beauty ritual into a focused 80-minute treatment designed specifically for Indian skin. Your certified artist brings every product and tool to your door — you just lie back and glow.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Hyaluronic Acid', 'Niacinamide', 'Peptides', 'Centella Asiatica', 'SPF 50+ PA++++'].map(ing => (
                <span key={ing} className="bg-white border border-blush/30 font-poppins text-[11px] text-stone-light px-3 py-1.5 rounded-full font-medium">{ing}</span>
              ))}
            </div>
          </div>

          {/* Quick facts card */}
          <div className="reveal" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-3xl p-8 border border-blush/20 shadow-lg shadow-rose/5">
              <h3 className="font-playfair text-xl font-bold text-stone mb-6">Quick Facts</h3>
              <div className="space-y-5">
                {[
                  { icon: '⏱', label: 'Duration', value: '1 hr 20 mins' },
                  { icon: '💰', label: 'Price', value: '₹1,749 (all-inclusive)' },
                  { icon: '🏠', label: 'Location', value: 'At your doorstep' },
                  { icon: '⭐', label: 'Rating', value: '4.83 from 64K reviews' },
                  { icon: '🔄', label: 'Frequency', value: 'Every 3–4 weeks recommended' },
                  { icon: '🧴', label: 'Products', value: 'K-beauty + medical-grade' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <span className="text-xl flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(196,118,138,0.08)' }}>{icon}</span>
                    <div>
                      <p className="font-poppins text-xs text-stone-light">{label}</p>
                      <p className="font-poppins text-sm font-semibold text-stone">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGE / WHAT'S INCLUDED ─────────────────────────────────── */}
      <section className="py-20 md:py-24" style={{ background: 'linear-gradient(180deg, #FDF0F0 0%, #F5E0E0 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-14 reveal">
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Treatment Protocol</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-stone mb-4">
              What&apos;s <em className="text-rose">Included</em>
            </h2>
            <p className="font-poppins text-stone-light text-base max-w-lg mx-auto">
              A carefully sequenced 7-step K-beauty ritual — each step building on the last for maximum hydration and that signature glass-skin finish.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PACKAGES.map((pkg, i) => (
              <div
                key={pkg.title}
                className="reveal reveal-d1 bg-white rounded-2xl p-6 border border-blush/20 hover:shadow-lg hover:shadow-rose/10 transition-all duration-300 group"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-rose text-xl mb-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'rgba(196,118,138,0.10)' }}>
                  {pkg.icon}
                </div>
                <span className="font-poppins text-[10px] tracking-widest uppercase text-rose font-semibold block mb-1.5">
                  Step {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-playfair text-lg font-bold text-stone mb-2 group-hover:text-rose transition-colors">
                  {pkg.title}
                </h3>
                <p className="font-poppins text-sm text-stone-light leading-relaxed">
                  {pkg.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RATING BREAKDOWN ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — overall rating */}
          <div className="reveal text-center md:text-left">
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-4">Customer Feedback</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-8">
              Rated <em className="text-rose">4.83</em> by 64K clients
            </h2>

            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <span className="font-playfair text-5xl font-bold text-stone">4.83</span>
              <div>
                <div className="flex gap-0.5 text-[#C8974A] mb-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <StarIcon key={s} filled={true} size={18} />
                  ))}
                </div>
                <span className="font-poppins text-xs text-stone-light">64K reviews</span>
              </div>
            </div>
          </div>

          {/* Right — breakdown bars */}
          <div className="reveal" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-blush/20">
              {RATING_BREAKDOWN.map((r) => (
                <div key={r.stars} className="flex items-center gap-4 mb-3 last:mb-0">
                  <div className="flex items-center gap-1 w-12 flex-shrink-0">
                    <span className="font-poppins text-xs font-semibold text-stone">{r.stars}</span>
                    <span className="text-[#C8974A]">
                      <StarIcon filled={true} size={10} />
                    </span>
                  </div>
                  <div className="flex-1 h-2.5 bg-petal rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${r.bar}%`,
                        background: r.stars >= 4
                          ? 'linear-gradient(90deg, #C8974A, #E8B84B)'
                          : r.stars === 3
                            ? 'linear-gradient(90deg, #C4768A, #D9A0B0)'
                            : 'linear-gradient(90deg, #D4C5C5, #E0D5D5)',
                      }}
                    />
                  </div>
                  <span className="font-poppins text-xs text-stone-light w-14 text-right flex-shrink-0">
                    {r.count >= 1000 ? `${(r.count / 1000).toFixed(0)}K` : r.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ──────────────────────────────────────────── */}
      <section className="py-20 md:py-24" style={{ background: 'linear-gradient(180deg, #FBF7F4 0%, #FDF0F0 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-12 reveal">
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Real Experiences</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-4">
              Customer <em className="text-rose">Reviews</em>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-3 mb-10 justify-center flex-wrap reveal">
            {FILTER_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`font-poppins text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 border ${
                  activeFilter === tab
                    ? 'bg-rose text-white border-rose shadow-md shadow-rose/20'
                    : 'bg-white text-stone-light border-blush/30 hover:border-rose/40 hover:text-rose'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Review cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {displayedReviews.map((review, i) => (
              <div
                key={`${review.name}-${i}`}
                className="reveal bg-white rounded-2xl p-5 border border-blush/20 hover:shadow-md hover:shadow-rose/8 transition-all duration-300 flex flex-col"
                style={{ animationDelay: `${(i % 8) * 0.05}s` }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3 text-[#C8974A]">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} filled={s < review.rating} size={12} />
                  ))}
                </div>

                <p className="font-poppins text-sm text-stone leading-relaxed flex-1 mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="border-t border-blush/10 pt-4">
                  <p className="font-poppins text-sm font-semibold text-stone">{review.name}</p>
                  <p className="font-poppins text-[10px] text-stone-light mt-0.5">{review.date}</p>
                  <p className="font-poppins text-[10px] text-rose/60 mt-2 leading-relaxed line-clamp-2">
                    {review.services}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Show more button */}
          {!showAllReviews && REVIEWS.length > 8 && (
            <div className="text-center reveal">
              <button
                onClick={() => setShowAllReviews(true)}
                className="font-poppins text-sm font-semibold px-8 py-3.5 bg-white text-rose border-2 border-rose/20 rounded-full hover:bg-rose hover:text-white hover:border-rose transition-all duration-300"
              >
                Show all {REVIEWS.length} reviews
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              ),
              title: 'Certified Artists',
              desc: 'Every artist is trained and certified in K-beauty facial protocols before they touch a client.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              ),
              title: 'K-Beauty Products',
              desc: 'We use authentic Korean skincare — hyaluronic acid serums, cica masks, peptide ampoules, and more.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20v-2a6 6 0 0112 0v2" />
                  <polyline points="16 11 17.5 13 20 10" />
                </svg>
              ),
              title: 'Indian Skin Expertise',
              desc: 'Protocol adjusted for melanin-rich Indian skin — no irritation, no barrier damage, only glow.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              ),
              title: 'Hygienic Protocol',
              desc: 'Single-use disposables, sanitised tools, and sterilised equipment — always, without exception.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.9v2.02z" />
                </svg>
              ),
              title: 'At Your Doorstep',
              desc: 'Zero commute. Zero waiting room. A luxury K-beauty facial in the comfort of your home.',
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ),
              title: '4.83 Rating',
              desc: '64,000+ reviews and counting. Our clients love their glass skin results — and tell us so.',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="reveal card-lift bg-white rounded-2xl p-6 border border-blush/20 flex gap-4 items-start"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-rose flex-shrink-0"
                style={{ background: 'rgba(196,118,138,0.10)' }}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-poppins text-sm font-semibold text-stone mb-1.5">{item.title}</h3>
                <p className="font-poppins text-sm text-stone-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden reveal">
          <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#F0D8E8' }} />
          <div aria-hidden className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full opacity-10" style={{ background: '#C4768A' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Glass Skin Awaits</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">
            Book Your Korean Glass<br /><em className="text-blush">Hydration Facial</em>
          </h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-4 relative z-10">
            Certified K-beauty trained artists · Medical-grade products · At your doorstep
          </p>
          <div className="flex items-center justify-center gap-4 mb-8 text-white/40 text-sm font-poppins relative z-10">
            <span>₹1,749</span>
            <span>·</span>
            <span>1 hr 20 mins</span>
            <span>·</span>
            <span>4.83 ★</span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
              <WAIcon size={16} />
              Book Now on WhatsApp
            </a>
            <Link href="/services/skin"
              className="font-poppins text-sm font-medium px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 rounded-full">
              View All Skin Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
