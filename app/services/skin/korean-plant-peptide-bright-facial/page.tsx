'use client'
import React from 'react'
import Link from 'next/link'

const BREADCRUMB = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/services/skin', label: 'Skin' },
  { label: 'Korean Plant Peptide Bright Facial' },
]

const STEPS = [
  { title: 'Double Cleanse Prep', desc: 'Oil cleanser followed by a brightening foam wash with papaya enzymes to gently dissolve dead skin cells and prep for active absorption.' },
  { title: 'Plant Peptide Essence Layer', desc: 'Concentrated rice bran peptide essence tapped into skin in 3 thin layers — each layer amplifying hydration and collagen stimulation.' },
  { title: 'Botanical Brightening Mask', desc: 'Sheet mask infused with mulberry extract, licorice root, and alpha-arbutin — targets hyperpigmentation and uneven skin tone at the cellular level.' },
  { title: 'Vitamin C Ampoule Infusion', desc: 'Stabilized L-ascorbic acid (15%) delivered via cool cryo-massage to boost radiance and fade dark spots without irritation.' },
  { title: 'Lymphatic Sculpting Massage', desc: 'Upward sweeping facial massage using peptide cream to drain puffiness, define contours, and push active ingredients deeper.' },
  { title: 'SPF 50+ Glow Lock', desc: 'Broad-spectrum mineral sunscreen seals the treatment — essential because peptides and vitamin C make skin photosensitive.' },
]

const RATING_BREAKDOWN = [
  { stars: 5, count: 36000, bar: 92 },
  { stars: 4, count: 1500, bar: 4 },
  { stars: 3, count: 400, bar: 1 },
  { stars: 2, count: 100, bar: 0.5 },
  { stars: 1, count: 200, bar: 0.5 },
]

const REVIEWS = [
  {
    name: 'Anjali Mehta',
    date: 'May 6, 2026',
    services: 'Korean Plant Peptide Bright Facial, Threading: Eyebrow',
    rating: 5,
    text: 'I have stubborn pigmentation and this facial has made such a difference! After just one session, my skin looked visibly brighter and the dark spots around my mouth are fading.',
  },
  {
    name: 'Sneha Kapoor',
    date: 'May 5, 2026',
    services: 'Korean Plant Peptide Bright Facial, Full arms + underarms (RICA)',
    rating: 5,
    text: 'The peptide essence layering felt incredibly luxe. My skin drank it up and the glow lasted for days. Will book this instead of the gold facial from now on.',
  },
  {
    name: 'Priya Reddy',
    date: 'May 4, 2026',
    services: 'Korean Plant Peptide Bright Facial',
    rating: 5,
    text: 'So gentle and so effective! No redness, no tingling — just pure hydration and a visible brightening effect. The beautician explained every step as she went.',
  },
  {
    name: 'Megha Singh',
    date: 'May 3, 2026',
    services: 'Korean Plant Peptide Bright Facial, Bleach: Face & neck',
    rating: 4,
    text: 'Really enjoyed the facial massage portion. The results are subtle but noticeable — skin feels smoother and looks fresher. Will try a second session.',
  },
  {
    name: 'Kavita Sharma',
    date: 'May 2, 2026',
    services: 'Korean Plant Peptide Bright Facial, Threading: Full face',
    rating: 5,
    text: 'The best facial I have had at home! Professional setup, clean products, and my melasma patches have never looked lighter. Booking monthly now.',
  },
  {
    name: 'Ritu Agarwal',
    date: 'May 1, 2026',
    services: 'Korean Plant Peptide Bright Facial, O3+ shine & glow facial',
    rating: 5,
    text: 'Combined this with O3 for a full skin reset. The plant peptides work beautifully on Indian skin — no breakouts, just brightness. Highly recommended for dull, tired skin.',
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

export default function KoreanPlantPeptideBrightFacialPage() {
  return (
    <div className="bg-petal min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-cream">
        <div aria-hidden className="absolute -right-40 -top-20 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #F5E0D0 0%, transparent 70%)' }} />

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

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div style={{ animation: 'fadeUp .8s ease both' }}>
              <div className="inline-flex items-center gap-2 bg-blush/50 text-rose px-4 py-2 rounded-full mb-5">
                <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Brightening</span>
              </div>
              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-stone leading-[1.08] mb-3">
                Korean Plant<br /><em className="text-rose">Peptide Bright Facial</em>
              </h1>
              <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-6">
                Peptide + Botanical Complex · Pigmentation Care
              </p>

              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 border border-blush/30">
                  <span className="font-poppins text-sm font-bold text-stone">4.76</span>
                  <div className="flex gap-0.5 text-[#C8974A]">
                    {[1, 2, 3, 4, 5].map(s => (<StarIcon key={s} filled={s <= 5} size={11} />))}
                  </div>
                </div>
                <span className="font-poppins text-xs text-stone-light">38K reviews</span>
              </div>

              <div className="flex items-center gap-5 mb-8 flex-wrap">
                <div><span className="font-playfair text-4xl font-bold text-stone">₹1,599</span></div>
                <div className="flex items-center gap-2 text-stone-light">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="font-poppins text-sm">1 hr 10 mins</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                  <WAIcon size={16} /> Book This Service
                </a>
                <Link href="/services/skin"
                  className="font-poppins text-sm font-medium px-6 py-4 border border-blush/40 text-stone-light hover:text-rose hover:border-rose/40 transition-colors duration-300 rounded-full">
                  ← Back to Skin Services
                </Link>
              </div>
            </div>

            <div className="hidden md:block" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-rose/15">
                <img src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png" alt="Korean Plant Peptide Bright Facial" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                  <span className="font-poppins text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">Plant Peptides</span>
                  <span className="font-poppins text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">6-Step Protocol</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal">
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">The Science</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-stone mb-5 leading-tight">
              Peptides meet<br /><em className="text-rose">botanicals.</em>
            </h2>
            <p className="font-poppins text-sm text-stone-light leading-relaxed mb-4">
              Plant peptides are short chains of amino acids derived from rice, soy, and pea proteins. When combined with botanical brighteners like licorice root and mulberry, they signal your skin to produce more collagen while actively fading existing dark spots.
            </p>
            <p className="font-poppins text-sm text-stone-light leading-relaxed mb-6">
              This facial is ideal for Indian skin dealing with post-inflammatory hyperpigmentation, melasma, or dullness from sun exposure. The formula is gentle enough for sensitive skin types and contains zero hydroquinone or harsh bleaching agents.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Plant Peptides', 'Vitamin C 15%', 'Licorice Root', 'Mulberry', 'Alpha-Arbutin'].map(ing => (
                <span key={ing} className="bg-white border border-blush/30 font-poppins text-[11px] text-stone-light px-3 py-1.5 rounded-full font-medium">{ing}</span>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-3xl p-8 border border-blush/20 shadow-lg shadow-rose/5">
              <h3 className="font-playfair text-xl font-bold text-stone mb-6">Quick Facts</h3>
              <div className="space-y-5">
                {[
                  { icon: '⏱', label: 'Duration', value: '1 hr 10 mins' },
                  { icon: '💰', label: 'Price', value: '₹1,599 (all-inclusive)' },
                  { icon: '⭐', label: 'Rating', value: '4.76 from 38K reviews' },
                  { icon: '🎯', label: 'Best For', value: 'Pigmentation & dull skin' },
                  { icon: '🔄', label: 'Frequency', value: 'Every 3–4 weeks for best results' },
                  { icon: '🧴', label: 'Key Actives', value: 'Peptides · Vit C · Arbutin' },
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

      {/* ── TREATMENT STEPS ───────────────────────────────────────────── */}
      <section className="py-20 md:py-24" style={{ background: 'linear-gradient(180deg, #FDF0F0 0%, #F5E0E0 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-14 reveal">
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Treatment Protocol</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-stone mb-4">
              What&apos;s <em className="text-rose">Included</em>
            </h2>
            <p className="font-poppins text-stone-light text-base max-w-lg mx-auto">
              Six focused steps designed to fade pigmentation, stimulate collagen, and restore a bright, even-toned radiance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <div key={step.title} className="reveal bg-white rounded-2xl p-6 border border-blush/20 hover:shadow-lg hover:shadow-rose/10 transition-all duration-300 group"
                style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-rose text-lg mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'rgba(196,118,138,0.10)' }}>0{i + 1}</div>
                <h3 className="font-playfair text-lg font-bold text-stone mb-2 group-hover:text-rose transition-colors">{step.title}</h3>
                <p className="font-poppins text-sm text-stone-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RATING BREAKDOWN ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal text-center md:text-left">
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-4">Customer Feedback</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-8">
              Rated <em className="text-rose">4.76</em> by 38K clients
            </h2>
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <span className="font-playfair text-5xl font-bold text-stone">4.76</span>
              <div>
                <div className="flex gap-0.5 text-[#C8974A] mb-1">
                  {[1, 2, 3, 4, 5].map(s => (<StarIcon key={s} filled={true} size={18} />))}
                </div>
                <span className="font-poppins text-xs text-stone-light">38K reviews</span>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-blush/20">
              {RATING_BREAKDOWN.map((r) => (
                <div key={r.stars} className="flex items-center gap-4 mb-3 last:mb-0">
                  <div className="flex items-center gap-1 w-12 flex-shrink-0">
                    <span className="font-poppins text-xs font-semibold text-stone">{r.stars}</span>
                    <span className="text-[#C8974A]"><StarIcon filled={true} size={10} /></span>
                  </div>
                  <div className="flex-1 h-2.5 bg-petal rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${r.bar}%`, background: r.stars >= 4 ? 'linear-gradient(90deg, #C8974A, #E8B84B)' : 'linear-gradient(90deg, #D4C5C5, #E0D5D5)' }} />
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

      {/* ── REVIEWS ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24" style={{ background: 'linear-gradient(180deg, #FBF7F4 0%, #FDF0F0 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-12 reveal">
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Real Experiences</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-4">Customer <em className="text-rose">Reviews</em></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((review, i) => (
              <div key={`${review.name}-${i}`} className="reveal bg-white rounded-2xl p-5 border border-blush/20 hover:shadow-md hover:shadow-rose/8 transition-all duration-300 flex flex-col"
                style={{ animationDelay: `${(i % 6) * 0.05}s` }}>
                <div className="flex gap-0.5 mb-3 text-[#C8974A]">
                  {Array.from({ length: 5 }).map((_, s) => (<StarIcon key={s} filled={s < review.rating} size={12} />))}
                </div>
                <p className="font-poppins text-sm text-stone leading-relaxed flex-1 mb-4">&ldquo;{review.text}&rdquo;</p>
                <div className="border-t border-blush/10 pt-4">
                  <p className="font-poppins text-sm font-semibold text-stone">{review.name}</p>
                  <p className="font-poppins text-[10px] text-stone-light mt-0.5">{review.date}</p>
                  <p className="font-poppins text-[10px] text-rose/60 mt-2 leading-relaxed line-clamp-2">{review.services}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden reveal">
          <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#F5E0D0' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Bright Skin Awaits</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">
            Book Your Plant Peptide<br /><em className="text-blush">Bright Facial</em>
          </h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-4 relative z-10">Plant peptides · Botanical brighteners · At your doorstep</p>
          <div className="flex items-center justify-center gap-4 mb-8 text-white/40 text-sm font-poppins relative z-10">
            <span>₹1,599</span><span>·</span><span>1 hr 10 mins</span><span>·</span><span>4.76 ★</span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
              <WAIcon size={16} /> Book Now on WhatsApp
            </a>
            <Link href="/services/skin" className="font-poppins text-sm font-medium px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 rounded-full">
              View All Skin Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
