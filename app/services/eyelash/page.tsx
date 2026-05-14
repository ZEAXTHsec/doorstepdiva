'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ServiceStickyNav } from '../../components/ServiceStickyNav'

const NAV_SECTIONS = [
  { id: 'extensions',  label: 'Extensions',   services: ['Classic', 'Hybrid', 'Volume', 'Cat Eye', 'Foxy'] },
  { id: 'lift-tint',   label: 'Lift & Tint',  services: ['Lash Lift', 'Lash Tint', 'Lift + Tint'] },
  { id: 'brows',       label: 'Brows',        services: ['Brow Shaping', 'Brow Tint', 'Brow Lamination', 'Brow Henna'] },
]

const BREADCRUMB = [{ href: '/', label: 'Home' }, { href: '/#services', label: 'Services' }, { label: 'Eyelash' }]

// ── Price Data ──────────────────────────────────────────────

interface PricedItem { name: string; price: number; origPrice: number; time: string; desc?: string }

const EXTENSIONS: PricedItem[] = [
  { name: 'Classic Extensions — Full Set', price: 1499, origPrice: 2499, time: '90 mins', desc: 'One extension per natural lash. Natural, mascara-like finish — perfect for first-timers.' },
  { name: 'Classic Extensions — Fill (2–3 wks)', price: 799, origPrice: 1199, time: '45 mins', desc: 'Replace shed extensions to maintain density and shape.' },
  { name: 'Hybrid Extensions — Full Set', price: 1999, origPrice: 3199, time: '105 mins', desc: 'Classic + volume blend for textured, wispy fullness. 70/30 mix.' },
  { name: 'Hybrid Extensions — Fill (2–3 wks)', price: 999, origPrice: 1499, time: '50 mins', desc: 'Refresh your hybrid set — refill classic singles and volume fans.' },
  { name: 'Volume Extensions — Full Set', price: 2499, origPrice: 3999, time: '120 mins', desc: '2D–6D hand-crafted fans per natural lash. Soft, fluffy, high-density glam.' },
  { name: 'Volume Extensions — Fill (2–3 wks)', price: 1199, origPrice: 1799, time: '60 mins', desc: 'Maintain volume density with fresh fan placement.' },
  { name: 'Cat Eye Mapping', price: 0, origPrice: 0, time: 'Included', desc: 'Shorter inner corners, progressively longer outer corners — lifts and elongates the eye.' },
  { name: 'Foxy Mapping (Premium)', price: 299, origPrice: 499, time: '+10 mins', desc: 'Spiked, textured, editorial finish with mixed-length fans. Added to any full set.' },
]

const LIFT_TINT: PricedItem[] = [
  { name: 'Lash Lift', price: 899, origPrice: 1499, time: '45 mins', desc: 'Semi-permanent curl that lifts and opens the eyes. Lasts 6–8 weeks. Perfect for straight or downward-pointing lashes.' },
  { name: 'Lash Tint', price: 399, origPrice: 599, time: '15 mins', desc: 'Darkens natural lashes from root to tip. No mascara needed — ideal for fair or light-tipped lashes.' },
  { name: 'Lash Lift + Tint Combo', price: 1099, origPrice: 1799, time: '50 mins', desc: 'The complete natural lash upgrade — curl + darken in one session. Best value for natural lash enhancement.' },
]

const BROW_SERVICES: PricedItem[] = [
  { name: 'Brow Shaping / Wax', price: 99, origPrice: 199, time: '15 mins', desc: 'Clean, precise shaping tailored to your face structure and brow goals.' },
  { name: 'Brow Tint', price: 299, origPrice: 499, time: '15 mins', desc: 'Semi-permanent dye to define and fill in brows. Lasts 2–3 weeks.' },
  { name: 'Brow Lamination', price: 799, origPrice: 1299, time: '30 mins', desc: 'Restructures brow hairs upward for a fuller, brushed-up, feathered look. Lasts 4–6 weeks.' },
  { name: 'Brow Henna', price: 399, origPrice: 699, time: '20 mins', desc: 'Henna-based brow tint that stains skin and hair — creates a filled-in, microblading-like effect. Lasts 1–2 weeks on skin, 4–6 weeks on hair.' },
]

const ADDONS: PricedItem[] = [
  { name: 'Lash Bath (Cleaning)', price: 199, origPrice: 299, time: '10 mins', desc: 'Deep clean of extensions to remove buildup, oil, and debris.' },
  { name: 'Under-Eye Hydrogel Patches', price: 99, origPrice: 149, time: '5 mins', desc: 'Soothing collagen patches applied during your session for depuffing.' },
  { name: 'Lash Sealant Coat', price: 149, origPrice: 249, time: '5 mins', desc: 'Protective top coat that extends retention and adds gloss.' },
]

const CURL_GUIDE = [
  { curl: 'C Curl', desc: 'Natural, subtle lift — mimics the curve of healthy natural lashes. Best for classic and everyday looks.', ideal: 'First-timers, natural look preference' },
  { curl: 'CC Curl', desc: 'Noticeable, more dramatic curve — opens the eye with a doll-like effect. Works well with hybrid and volume sets.', ideal: 'Balanced drama, almond & round eyes' },
  { curl: 'D Curl', desc: 'Maximum lift and drama — the most upward curl. Creates a striking, wide-awake look. Best for volume and foxy styles.', ideal: 'Bold glam, editorial looks, hooded eyes' },
]

const AFTERCARE = [
  'Avoid oil-based products near the lash line — oil breaks down the adhesive bond.',
  'No steam or sauna for 24–48 hours post-application to allow adhesive to fully cure.',
  'Do not sleep face-down — pressure can bend or misalign extensions.',
  'Brush your lashes gently daily with a clean spoolie to maintain shape.',
  'Book fills every 2–3 weeks to maintain fullness and density.',
  'Never pull or pick at extensions — this causes natural lash damage.',
]

const FAQS = [
  { q: 'How long do eyelash extensions last?', a: 'A full set lasts 3–5 weeks with proper aftercare. Natural lash shedding cycles mean you\'ll lose extensions gradually — fills every 2–3 weeks maintain fullness.' },
  { q: 'Will extensions damage my natural lashes?', a: 'No — when applied correctly by a certified technician using isolation technique. Each extension is bonded to a single natural lash and sheds naturally with your lash cycle. Never pick or pull them off.' },
  { q: 'What\'s the difference between Classic, Hybrid, and Volume?', a: 'Classic = 1 extension per natural lash (natural finish). Hybrid = a mix of singles and fans (textured, wispy). Volume = 2–6 ultra-fine extensions fanned per lash (fluffy, glam). The right choice depends on your natural lash density and desired look.' },
  { q: 'Can I wear mascara with extensions?', a: 'We don\'t recommend it — mascara can clump extensions and make removal difficult. If you must, use only water-based, extension-safe formulas and avoid waterproof types.' },
  { q: 'What\'s a Lash Lift vs. extensions?', a: 'A lash lift curls your own natural lashes — no added fibers. It lasts 6–8 weeks and is maintenance-free. Extensions add length and volume. Lift + tint is great if you want enhancement without the upkeep of fills.' },
  { q: 'How long does a Lash Lift last?', a: '6–8 weeks. The lift gradually relaxes as your natural lashes go through their growth cycle. Avoid water and steam for 24 hours post-treatment for best results.' },
]

// ── Reusable Components ────────────────────────────────────

function PriceTag({ price, origPrice }: { price: number; origPrice: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-poppins text-sm font-bold text-rose">₹{price}</span>
      {origPrice > 0 && <span className="font-poppins text-xs text-stone-light/50 line-through">₹{origPrice}</span>}
    </div>
  )
}

function WAIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function FaqItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  return (
    <div className={`reveal reveal-d${Math.min(index + 1, 6)} bg-white rounded-2xl border overflow-hidden transition-colors duration-200 ${open ? 'border-rose/30' : 'border-blush/20'}`}>
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-petal/50 transition-colors"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className={`font-poppins text-sm font-semibold transition-colors ${open ? 'text-rose' : 'text-stone'}`}>{faq.q}</span>
        <span className={`faq-icon flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-rose font-bold text-xs ${open ? 'open border-rose/40' : 'border-blush/40'}`}>+</span>
      </button>
      <div
        className="faq-body"
        ref={bodyRef}
        style={{ maxHeight: open ? `${bodyRef.current?.scrollHeight ?? 200}px` : '0px' }}
      >
        <p className="font-poppins text-sm text-stone-light leading-relaxed pb-5 px-6">{faq.a}</p>
      </div>
    </div>
  )
}

function EyelashContent() {
  return (
    <div className="bg-petal min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-cream">
        <div aria-hidden className="absolute -right-40 -top-20 w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #E8D8F0 0%, transparent 70%)' }} />

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

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div style={{ animation: 'fadeUp .8s ease both' }}>
              <div className="inline-flex items-center gap-2 bg-blush/50 text-rose px-4 py-2 rounded-full mb-6">
                <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Division 04</span>
              </div>
              <h1 className="font-playfair text-6xl md:text-7xl font-bold text-stone leading-[1.05] mb-4">
                Eyelash<br /><em className="text-rose">Extensions</em>
              </h1>
              <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-4">Classic · Hybrid · Volume · Lift</p>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 max-w-lg">
                Full lash artistry from single-lash classic application to dramatic volume fans — plus lash lifts, tints, and brow services. Applied using medical-grade adhesive by certified lash technicians.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Classic', 'Hybrid', 'Volume 2D–6D', 'Lash Lift', 'Brow Lamination'].map(t => (
                  <span key={t} className="bg-white border border-blush/40 font-poppins text-xs text-stone-light px-4 py-2 rounded-full font-medium">{t}</span>
                ))}
              </div>
              <div className="bg-white/60 border border-blush/30 rounded-2xl px-5 py-4 mb-8 flex items-center gap-3">
                <span className="text-rose text-xl">⏱</span>
                <div>
                  <p className="font-poppins text-xs font-semibold text-stone">Extensions last 3–5 weeks</p>
                  <p className="font-poppins text-xs text-stone-light">Fills recommended every 2–3 weeks</p>
                </div>
              </div>
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                <WAIcon size={16} />
                Book Lash Session
              </a>
            </div>

            <div className="hidden md:flex flex-col gap-4" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              <div className="relative rounded-3xl overflow-hidden h-64 shadow-xl shadow-rose/10">
                <img src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png" alt="Eyelash Extensions" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="font-poppins text-xs font-semibold text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">Medical-Grade Adhesive</span>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { id: '1:1', name: 'Classic — Natural', desc: 'One extension per lash' },
                  { id: '70/30', name: 'Hybrid — Wispy', desc: 'Singles + volume fans blend' },
                  { id: '2D–6D', name: 'Volume — Glam', desc: 'Multiple fans per lash' },
                ].map(e => (
                  <div key={e.name} className="bg-white rounded-2xl p-4 border border-blush/20 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center text-xs font-poppins font-bold text-rose bg-rose/8">{e.id}</div>
                    <div>
                      <p className="font-poppins text-sm font-semibold text-stone">{e.name}</p>
                      <p className="font-poppins text-xs text-stone-light">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceStickyNav sections={NAV_SECTIONS} />

      {/* ── CURL GUIDE ── */}
      <section id="extensions" className="max-w-7xl mx-auto px-6 md:px-16 pt-28">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Before You Choose</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Curl <em className="text-rose">Guide</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            The right curl determines how your extensions look and feel. Choose based on the drama level you want.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-20">
          {CURL_GUIDE.map((c, i) => (
            <div key={c.curl} className={`reveal reveal-d${Math.min(i + 1, 3)} card-lift bg-white rounded-2xl p-6 border border-blush/20 text-center`}>
              <span className="font-playfair text-4xl font-bold text-rose/15">{c.curl[0]}</span>
              <h3 className="font-poppins text-sm font-semibold text-stone mt-2">{c.curl}</h3>
              <p className="font-poppins text-xs text-stone-light mt-2 leading-relaxed">{c.desc}</p>
              <p className="font-poppins text-[10px] text-rose-light/70 mt-3 italic">{c.ideal}</p>
            </div>
          ))}
        </div>

        {/* ── EXTENSIONS PRICING ── */}
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Extension Techniques</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Extension <em className="text-rose">Pricing</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            All full sets include consultation, lash mapping, and aftercare guide. Fills recommended every 2–3 weeks.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-blush/20 bg-white shadow-sm reveal max-w-6xl mx-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-rose/5">
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Service</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider hidden sm:table-cell">Description</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Time</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {EXTENSIONS.map((e, i) => (
                <tr key={e.name} className={`border-t border-blush/10 hover:bg-petal/30 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-cream/30'}`}>
                  <td className="px-6 py-4 font-poppins text-sm font-semibold text-stone">
                    {e.name}
                    {e.price === 0 && <span className="ml-2 font-poppins text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Included</span>}
                  </td>
                  <td className="px-6 py-4 font-poppins text-xs text-stone-light hidden sm:table-cell">{e.desc}</td>
                  <td className="px-6 py-4 font-poppins text-xs text-stone-light whitespace-nowrap">{e.time}</td>
                  <td className="px-6 py-4 text-right">
                    {e.price > 0 ? <PriceTag price={e.price} origPrice={e.origPrice} /> : <span className="font-poppins text-xs text-green-600 font-semibold">Free</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── LASH LIFT & TINT ── */}
      <section id="lift-tint" className="max-w-7xl mx-auto px-6 md:px-16 pt-28">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Natural Enhancement</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Lash Lift <em className="text-rose">& Tint</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Elevate your natural lashes — no extensions needed. A lash lift curls your own lashes from the root, while a tint darkens them for a mascara-like effect that lasts 6–8 weeks.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {LIFT_TINT.map((s, i) => (
            <div key={s.name} className={`reveal reveal-d${Math.min(i + 1, 3)} card-lift bg-white rounded-2xl p-6 border border-blush/20 flex flex-col ${i === 2 ? 'ring-1 ring-rose/20' : ''}`}>
              <div className="flex-1">
                {i === 2 && <span className="font-poppins text-[10px] font-semibold text-rose bg-rose/5 px-3 py-1 rounded-full inline-block mb-3">Best Value</span>}
                <h3 className="font-poppins text-sm font-semibold text-stone mb-2">{s.name}</h3>
                <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4">{s.desc}</p>
                <span className="font-poppins text-[11px] text-stone-light/70">{s.time}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-blush/10 flex items-center justify-between">
                <PriceTag price={s.price} origPrice={s.origPrice} />
                {i === 2 && <span className="font-poppins text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">Save ₹{s.origPrice - s.price}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BROW SERVICES ── */}
      <section id="brows" className="max-w-7xl mx-auto px-6 md:px-16 pt-24">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Frame Your Face</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Brow <em className="text-rose">Services</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Perfectly shaped, defined brows to frame your features — from a quick clean-up to full brow lamination.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {BROW_SERVICES.map((b, i) => (
            <div key={b.name} className={`reveal reveal-d${Math.min(i + 1, 4)} card-lift bg-white rounded-2xl p-5 border border-blush/20 flex flex-col text-center`}>
              <span className="font-poppins text-[10px] font-semibold text-rose-light uppercase tracking-wider block mb-2">{b.time}</span>
              <h4 className="font-poppins text-sm font-semibold text-stone mb-2">{b.name}</h4>
              <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4 flex-1">{b.desc}</p>
              <div className="pt-3 border-t border-blush/10 flex justify-center">
                <PriceTag price={b.price} origPrice={b.origPrice} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ADD-ONS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-24">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-3">Enhance Your Session</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-3">Add-On <em className="text-rose">Extras</em></h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {ADDONS.map((a, i) => (
            <div key={a.name} className={`reveal reveal-d${Math.min(i + 1, 3)} card-lift bg-white rounded-2xl p-5 border border-blush/20 text-center`}>
              <span className="font-poppins text-[10px] font-semibold text-rose-light uppercase tracking-wider block mb-2">{a.time}</span>
              <h4 className="font-poppins text-sm font-semibold text-stone mb-2">{a.name}</h4>
              <p className="font-poppins text-[11px] text-stone-light mb-3">{a.desc}</p>
              <PriceTag price={a.price} origPrice={a.origPrice} />
            </div>
          ))}
        </div>
      </section>

      {/* Aftercare */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-poppins label-caps text-rose mb-3">Important</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-6">Lash <em className="text-rose">Aftercare</em></h2>
            <p className="font-poppins text-stone-light text-sm leading-relaxed mb-8">All extension clients receive a full lash aftercare guide. Following these instructions significantly extends wear time and protects your natural lash health.</p>
            <div className="space-y-3">
              {AFTERCARE.map((a, i) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-blush/20">
                  <span className="w-6 h-6 rounded-full bg-rose text-white flex items-center justify-center font-poppins text-xs font-bold flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-poppins text-xs text-stone-light leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-rose rounded-3xl p-8 text-white">
              <p className="font-poppins text-[10px] tracking-widest uppercase text-white/60 font-semibold mb-4">Maintenance Schedule</p>
              <div className="space-y-5">
                {[
                  { time: '24–48 hrs', note: 'Avoid water, steam, and oil near lashes while adhesive cures fully' },
                  { time: '2–3 weeks', note: 'Book your first fill to replace shed extensions and maintain density' },
                  { time: '3–5 weeks', note: 'Full set lifespan with proper aftercare before a complete reapplication' },
                ].map(m => (
                  <div key={m.time} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                    <p className="font-playfair text-2xl font-bold text-blush mb-1">{m.time}</p>
                    <p className="font-poppins text-xs text-white/70 leading-relaxed">{m.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-blush/20">
              <p className="font-poppins text-xs tracking-widest uppercase text-rose font-semibold mb-4">What We Use</p>
              <div className="space-y-3">
                {[
                  { label: 'Medical-Grade Adhesive', sub: 'Hypoallergenic, dermatologist-tested bonding agent' },
                  { label: 'Isolation Technique', sub: 'Each extension applied to a single natural lash only' },
                  { label: 'Lash Mapping', sub: 'Custom design planned before application begins' },
                ].map(w => (
                  <div key={w.label} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose text-xs">✓</span>
                    </div>
                    <div>
                      <p className="font-poppins text-sm font-semibold text-stone">{w.label}</p>
                      <p className="font-poppins text-xs text-stone-light">{w.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 md:px-16 pb-20">
        <div className="text-center mb-14 reveal">
          <h2 className="font-playfair text-4xl font-bold text-stone mb-3">Common <em className="text-rose">Questions</em></h2>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => <FaqItem key={f.q} faq={f} index={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden reveal">
          <div aria-hidden className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full opacity-10" style={{ background: '#E8D8F0' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Wake Up Glamorous</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">Book Your Lash <em className="text-blush">Session Today</em></h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">Certified lash technicians, medical-grade adhesive, and the perfect lash map — all at your door.</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
              className="btn-press font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full">
              <span className="inline-flex items-center gap-2"><WAIcon size={15} />Book Now on WhatsApp</span>
            </a>
            <Link href="/#services" className="font-poppins text-sm font-medium px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 rounded-full">View All Services</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function EyelashPage() {
  return <EyelashContent />
}
