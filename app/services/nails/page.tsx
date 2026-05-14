'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ServiceStickyNav } from '../../components/ServiceStickyNav'
import AddToCartButton from '@/app/components/AddToCartButton'

const NAV_SECTIONS = [
  { id: 'acrylic',    label: 'Acrylic',      services: ['Full Set', 'Infill', 'Nail Art Set', 'Removal'] },
  { id: 'gel',        label: 'Gel',          services: ['Hard Gel', 'Soft Gel', 'BIAB', 'Nail Art Set', 'Infill', 'Removal'] },
  { id: 'polygel',    label: 'PolyGel',      services: ['Full Set', 'Infill', 'Nail Art Set', 'Removal'] },
  { id: 'natural',    label: 'Natural Nails',services: ['Gel Polish', 'French', 'Nail Art on Natural'] },
  { id: 'shapes',     label: 'Shapes & Art', services: ['Shapes', 'Nail Art Options'] },
]

const BREADCRUMB = [{ href: '/', label: 'Home' }, { href: '/#services', label: 'Services' }, { label: 'Nail Extensions' }]

// ── Price Data ──────────────────────────────────────────────

interface PricedItem { name: string; price: number; origPrice: number; time: string; desc?: string }

const ACRYLIC: PricedItem[] = [
  { name: 'Full Set Acrylic', price: 999, origPrice: 1799, time: '90 mins', desc: 'Complete new set of acrylic extensions — all 10 nails, sculpted with tips or forms to desired length and shape.' },
  { name: 'Acrylic Infill / Fill-In', price: 599, origPrice: 999, time: '60 mins', desc: 'Maintenance service to fill the regrowth gap. Recommended every 2–3 weeks.' },
  { name: 'Acrylic Nail Art Set', price: 1499, origPrice: 2499, time: '105 mins', desc: 'Full acrylic set with custom nail art — hand-painted, 3D elements, gemstones, foils, or chrome.' },
  { name: 'Acrylic Removal', price: 299, origPrice: 499, time: '30 mins', desc: 'Safe, professional removal using acetone soak technique — no filing damage to natural nail plate.' },
]

const GEL: PricedItem[] = [
  { name: 'Hard Gel Extensions (Full Set)', price: 1199, origPrice: 1999, time: '90 mins', desc: 'UV-cured hard gel applied over tips or forms — sculpted, filed, and high-gloss finished. Very strong.' },
  { name: 'Soft Gel / Gel Polish (Shellac)', price: 499, origPrice: 799, time: '35 mins', desc: 'Gel polish overlay on natural nails — chip-free color, high shine. 2–3 week wear. Soak-off removal.' },
  { name: 'Builder Gel (BIAB)', price: 899, origPrice: 1499, time: '60 mins', desc: 'Builder In A Bottle — strengthening gel overlay that adds structure and subtle length to natural nails.' },
  { name: 'Gel Nail Art Set', price: 1599, origPrice: 2599, time: '105 mins', desc: 'Gel base with custom art — marble, ombre, French, floral, or graphic designs.' },
  { name: 'Gel Infill', price: 699, origPrice: 1099, time: '60 mins', desc: 'Regrowth fill for gel extensions — rebalances structure and refreshes color/finish. Every 2–3 weeks.' },
  { name: 'Gel Removal', price: 249, origPrice: 399, time: '25 mins', desc: 'Soak-off removal for soft gels; filing for hard gels — both performed without damage.' },
]

const POLYGEL: PricedItem[] = [
  { name: 'PolyGel Full Set', price: 1399, origPrice: 2299, time: '90 mins', desc: 'Complete new set sculpted with PolyGel — lighter than acrylic, stronger than soft gel, odor-free.' },
  { name: 'PolyGel Infill', price: 799, origPrice: 1299, time: '60 mins', desc: 'Regrowth maintenance — fills the growth gap and refreshes surface and color. Every 2–3 weeks.' },
  { name: 'PolyGel Nail Art Set', price: 1799, origPrice: 2899, time: '105 mins', desc: 'Custom PolyGel extensions with embedded art — 3D designs, encapsulated florals, chrome, hand-painted.' },
  { name: 'PolyGel Removal', price: 349, origPrice: 549, time: '30 mins', desc: 'Safe removal via soak-off or gentle filing — natural nail inspection included.' },
]

const NATURAL_NAILS: PricedItem[] = [
  { name: 'Gel Polish on Natural Nails', price: 399, origPrice: 699, time: '30 mins', desc: 'Chip-free gel color applied directly to natural nails. High-gloss, 1–2 week wear. Hundreds of shades available.' },
  { name: 'French Manicure (Gel)', price: 549, origPrice: 899, time: '40 mins', desc: 'Classic French tips with gel polish — clean white tips, nude-pink base. Perfect for clean, elegant hands.' },
  { name: 'Nail Art on Natural Nails', price: 299, origPrice: 499, time: '20 mins', desc: 'Minimalist designs, dots, stripes, or accent nails on natural nails with gel top coat. Per-hand pricing.' },
]

const ADDONS: PricedItem[] = [
  { name: 'Chrome / Mirror Powder', price: 199, origPrice: 349, time: '10 mins', desc: 'High-shine metallic chrome or mirror finish over any color.' },
  { name: 'French Tip Design', price: 149, origPrice: 249, time: '10 mins', desc: 'Classic white or colored French tips — any extension system.' },
  { name: 'Ombre / Gradient', price: 199, origPrice: 349, time: '15 mins', desc: 'Seamless color gradient blend across the nail.' },
  { name: 'Gemstones / 3D Elements', price: 99, origPrice: 199, time: '10 mins', desc: 'Per nail — crystals, pearls, studs, or 3D sculpted accents.' },
]

const POLYGEL_BENEFITS = [
  { label: 'No Strong Odor', icon: '◈' },
  { label: 'No Heat Spike', icon: '◇' },
  { label: 'Lightweight Feel', icon: '✦' },
  { label: 'Non-Yellowing', icon: '○' },
  { label: 'UV/LED Cured', icon: '✿' },
  { label: 'Flexible Strength', icon: '◎' },
]

const SHAPES = ['Square', 'Round', 'Oval', 'Squoval', 'Almond', 'Stiletto', 'Coffin / Ballerina', 'Flare / Duck', 'Lipstick']

const NAIL_ART = [
  'Chrome / Mirror Powder', 'French Tip', 'Ombre / Gradient', 'Marble', 'Foil Designs',
  'Stamping', 'Gemstones', '3D Sculpted Art', 'Encapsulated Florals', 'Glitter Fade',
]

const COMPARE = [
  { feature: 'Strength', acrylic: '★★★★★', gel: '★★★☆☆', polygel: '★★★★☆' },
  { feature: 'Flexibility', acrylic: '★★☆☆☆', gel: '★★★★☆', polygel: '★★★★☆' },
  { feature: 'Weight', acrylic: 'Heavier', gel: 'Light', polygel: 'Lightest' },
  { feature: 'Odor', acrylic: 'Strong', gel: 'Minimal', polygel: 'None' },
  { feature: 'Best For', acrylic: 'Length & durability', gel: 'Natural finish', polygel: 'Balanced performance' },
  { feature: 'Wear Time', acrylic: '3–4 weeks', gel: '2–3 weeks', polygel: '3–4 weeks' },
]

const FAQS = [
  { q: 'How long do nail extensions last?', a: 'Acrylic and PolyGel: 3–4 weeks. Hard Gel: 2–3 weeks. Gel polish on natural nails: 1–2 weeks. Infills recommended every 2–3 weeks to maintain appearance and nail health.' },
  { q: 'Will extensions damage my natural nails?', a: 'Not when applied and removed professionally. We use proper prep, primer, and safe removal techniques. Never pick or peel extensions off — that causes damage. Always get professional removal.' },
  { q: 'Which system is best for me?', a: 'Acrylic = maximum strength and length. Gel = natural look, flexible wear. PolyGel = best of both — lightweight and strong. BIAB = natural nail strengthening. For first-timers, we recommend Gel or PolyGel for comfort.' },
  { q: 'Can I get gel polish without extensions?', a: 'Yes. Gel polish (Shellac) is applied directly to your natural nails for a chip-free, high-gloss finish that lasts 1–2 weeks. No extensions, no length added — just color and shine.' },
  { q: 'How should I prep before my nail appointment?', a: 'Come with clean, product-free nails — no old polish, oils, or lotions. Don\'t cut or push back cuticles the day of. We handle all prep, shaping, and cuticle work professionally.' },
  { q: 'Do you do nail art?', a: 'Yes — our nail artists are trained in hand-painting, 3D sculpting, chrome, foil, marble, ombre, French tips, and more. Nail art can be added to any extension system or natural nail service.' },
]

// ── Reusable Components ────────────────────────────────────

function PriceTag({ price, origPrice }: { price: number; origPrice: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-poppins text-sm font-bold text-rose">₹{price}</span>
      <span className="font-poppins text-xs text-stone-light/50 line-through">₹{origPrice}</span>
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

function SystemTable({ title, label, desc, tags, accent, data }: {
  title: string; label: string; desc: string; tags: string[]; accent: string; data: PricedItem[]
}) {
  return (
    <div className="grid md:grid-cols-5 gap-10 items-start">
      <div className="md:col-span-2 rounded-3xl p-8 sticky top-28" style={{ background: accent + '30' }}>
        <span className="font-poppins text-[10px] tracking-widest uppercase text-rose font-semibold block mb-2">{label}</span>
        <h2 className="font-playfair text-3xl font-bold text-stone mb-4">{title}</h2>
        <p className="font-poppins text-sm text-stone-light leading-relaxed mb-6">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="bg-white border border-blush/30 font-poppins text-[11px] text-stone-light px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>
      <div className="md:col-span-3 space-y-3">
        {data.map((s, i) => (
          <div key={s.name} className={`reveal reveal-d${Math.min(i + 1, 6)} bg-white rounded-2xl p-5 border border-blush/20 hover:shadow-md hover:shadow-rose/10 transition-all duration-300`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-poppins text-sm font-semibold text-stone mb-1">{s.name}</h3>
                <p className="font-poppins text-xs text-stone-light leading-relaxed mb-2">{s.desc}</p>
                <span className="font-poppins text-[11px] text-stone-light/70">{s.time}</span>
              </div>
              <PriceTag price={s.price} origPrice={s.origPrice} />
              <AddToCartButton variant="inline" id={s.name} name={s.name} price={s.price} duration={s.time} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Nails" href="/book" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NailsContent() {
  return (
    <div className="bg-petal min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-cream">
        <div aria-hidden className="absolute -right-40 -top-20 w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #F5D8DC 0%, transparent 70%)' }} />

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
                <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Division 06</span>
              </div>
              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-stone leading-[1.05] mb-4">
                Nail<br /><em className="text-rose">Extensions</em>
              </h1>
              <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-4">Acrylic · Gel · PolyGel · Natural</p>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 max-w-lg">
                Every nail enhancement system — durable acrylics, natural gels, next-gen PolyGel, and gel polish for natural nails — finished with bespoke nail art. From clean square nails to dramatic stilettos.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Acrylic', 'Gel / Shellac', 'PolyGel', 'BIAB', 'Nail Art'].map(t => (
                  <span key={t} className="bg-white border border-blush/40 font-poppins text-xs text-stone-light px-4 py-2 rounded-full font-medium">{t}</span>
                ))}
              </div>
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                <WAIcon size={16} />
                Book Nail Session
              </a>
            </div>

            <div className="hidden md:flex flex-col gap-4" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              <div className="relative rounded-3xl overflow-hidden h-64 shadow-xl shadow-rose/10">
                <img src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png" alt="Nail Extensions" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="font-poppins text-xs font-semibold text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">Bespoke Nail Art</span>
                </div>
              </div>
              {[
                { name: 'System A — Acrylic', sub: 'Maximum strength and length', accent: '#EFCCD4', services: 4 },
                { name: 'System B — Gel', sub: 'Natural look, flexible wear', accent: '#F0D8E8', services: 6 },
                { name: 'System C — PolyGel', sub: 'Next-gen hybrid technology', accent: '#F5D8DC', services: 4 },
              ].map(s => (
                <div key={s.name} className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-blush/20">
                  <div className="w-10 h-10 rounded-2xl flex-shrink-0" style={{ background: s.accent }} />
                  <div className="flex-1">
                    <p className="font-poppins text-sm font-semibold text-stone">{s.name}</p>
                    <p className="font-poppins text-xs text-stone-light">{s.sub}</p>
                  </div>
                  <span className="font-poppins text-xs text-rose font-semibold bg-petal px-3 py-1 rounded-full">{s.services} services</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceStickyNav sections={NAV_SECTIONS} />

      {/* ── DURATION GUIDE ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-20">
        <div className="text-center mb-5 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Before You Choose</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Wear-Time <em className="text-rose">Guide</em></h2>
        </div>
        <div className="grid sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-6 reveal">
          {[
            { system: 'Acrylic', wear: '3–4 weeks', tag: 'Strongest, longest wear' },
            { system: 'Hard Gel', wear: '2–3 weeks', tag: 'Natural feel, glossy' },
            { system: 'PolyGel', wear: '3–4 weeks', tag: 'Lightweight, balanced' },
            { system: 'Gel Polish', wear: '1–2 weeks', tag: 'Natural nails only' },
          ].map(d => (
            <div key={d.system} className="card-lift bg-white rounded-2xl p-5 border border-blush/20 text-center">
              <p className="font-poppins text-xs font-semibold text-stone mb-1">{d.system}</p>
              <p className="font-playfair text-2xl font-bold text-rose mb-1">{d.wear}</p>
              <p className="font-poppins text-[10px] text-stone-light">{d.tag}</p>
            </div>
          ))}
        </div>
        <div className="bg-rose/5 border border-rose/15 rounded-2xl p-5 max-w-3xl mx-auto mb-4 reveal text-center">
          <p className="font-poppins text-xs text-stone-light leading-relaxed">
            <span className="font-semibold text-rose">Infill schedule —</span> For extensions (Acrylic, Gel, PolyGel), book infills every 2–3 weeks to fill the regrowth gap and maintain structure. Gel polish on natural nails can be refreshed every 1–2 weeks.
          </p>
        </div>
      </section>

      {/* ── ACRYLIC ── */}
      <section id="acrylic" className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-16">
        <SystemTable
          title="Acrylic Nail Extensions"
          label="System A"
          desc="The most durable nail extension system — formed by mixing liquid monomer with powder polymer to create a hard, sculptable overlay. Ideal for length, structure, and long-lasting wear."
          tags={['Most Durable', 'Max Length', '3–4 Week Wear', 'Customizable']}
          accent="#EFCCD4"
          data={ACRYLIC}
        />
      </section>

      {/* ── GEL ── */}
      <section id="gel" className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <SystemTable
            title="Gel Nail Extensions"
            label="System B"
            desc="Lighter and more flexible than acrylics. Cured under UV/LED lamp for a natural-looking, high-gloss finish with less odor during application."
            tags={['UV/LED Cured', 'High-Gloss Finish', 'Natural Feel', 'Low Odor']}
            accent="#F0D8E8"
            data={GEL}
          />
        </div>
      </section>

      {/* ── POLYGEL ── */}
      <section id="polygel" className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-2 bg-stone rounded-3xl p-8 sticky top-28">
            <span className="font-poppins text-[10px] tracking-widest uppercase text-rose-light font-semibold block mb-2">System C — Hybrid Technology</span>
            <h2 className="font-playfair text-3xl font-bold text-white mb-4">PolyGel Extensions</h2>
            <p className="font-poppins text-sm text-white/60 leading-relaxed mb-6">The newest generation — combining acrylic strength and gel flexibility. Odor-free, lightweight, non-yellowing. Preferred for durability with a natural-looking finish.</p>
            <div className="grid grid-cols-2 gap-3">
              {POLYGEL_BENEFITS.map(b => (
                <div key={b.label} className="bg-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
                  <span className="text-rose-light text-xs">{b.icon}</span>
                  <span className="font-poppins text-[11px] text-white/80">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 space-y-3">
            {POLYGEL.map((s, i) => (
              <div key={s.name} className={`reveal reveal-d${Math.min(i + 1, 6)} bg-white rounded-2xl p-5 border border-blush/20 hover:shadow-md hover:shadow-rose/10 transition-all duration-300`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-poppins text-sm font-semibold text-stone mb-1">{s.name}</h3>
                    <p className="font-poppins text-xs text-stone-light leading-relaxed mb-2">{s.desc}</p>
                    <span className="font-poppins text-[11px] text-stone-light/70">{s.time}</span>
                  </div>
                  <PriceTag price={s.price} origPrice={s.origPrice} />
                  <AddToCartButton variant="inline" id={s.name} name={s.name} price={s.price} duration={s.time} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Nails" href="/book" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NATURAL NAILS ── */}
      <section id="natural" className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-14 reveal">
            <p className="font-poppins label-caps text-rose mb-4">No Extensions Needed</p>
            <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Natural Nail <em className="text-rose">Services</em></h2>
            <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
              Beautiful nails without extensions — gel polish, French manicures, and minimalist nail art applied directly to your natural nails.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {NATURAL_NAILS.map((n, i) => (
              <div key={n.name} className={`reveal reveal-d${Math.min(i + 1, 3)} card-lift bg-white rounded-2xl p-6 border border-blush/20 flex flex-col text-center`}>
                <div className="flex-1">
                  <span className="font-playfair text-3xl text-rose/15 font-bold">{i + 1}</span>
                  <h3 className="font-poppins text-sm font-semibold text-stone mt-3 mb-2">{n.name}</h3>
                  <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4">{n.desc}</p>
                  <span className="font-poppins text-[11px] text-stone-light/70">{n.time}</span>
                </div>
                <div className="pt-4 mt-4 border-t border-blush/10">
                  <PriceTag price={n.price} origPrice={n.origPrice} />
                  <AddToCartButton variant="inline" id={n.name} name={n.name} price={n.price} duration={n.time} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Nails" href="/book" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-16 py-20">
        <div className="text-center mb-14 reveal">
          <h2 className="font-playfair text-4xl font-bold text-stone mb-3">System <em className="text-rose">Comparison</em></h2>
          <p className="font-poppins text-stone-light text-sm">Unsure which system suits you? Compare at a glance.</p>
        </div>
        <div className="bg-white rounded-3xl border border-blush/20 overflow-hidden reveal">
          <div className="grid grid-cols-4 bg-stone p-5">
            <p className="font-poppins text-[10px] tracking-widest uppercase text-white/40 font-semibold">Feature</p>
            {['Acrylic', 'Gel', 'PolyGel'].map(h => (
              <p key={h} className="font-poppins text-sm font-semibold text-white text-center">{h}</p>
            ))}
          </div>
          {COMPARE.map((row, i) => (
            <div key={row.feature} className={`grid grid-cols-4 p-5 border-b border-blush/10 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-petal/50'}`}>
              <p className="font-poppins text-xs font-semibold text-stone">{row.feature}</p>
              <p className="font-poppins text-xs text-stone-light text-center">{row.acrylic}</p>
              <p className="font-poppins text-xs text-stone-light text-center">{row.gel}</p>
              <p className="font-poppins text-xs text-rose font-medium text-center">{row.polygel}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ADD-ONS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-8">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-3">Customize Your Set</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-3">Nail Art <em className="text-rose">Add-Ons</em></h2>
          <p className="font-poppins text-stone-light text-sm max-w-lg mx-auto">Add to any extension system or natural nail service.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {ADDONS.map((a, i) => (
            <div key={a.name} className={`reveal reveal-d${Math.min(i + 1, 4)} card-lift bg-white rounded-2xl p-5 border border-blush/20 text-center`}>
              <span className="font-poppins text-[10px] font-semibold text-rose-light uppercase tracking-wider block mb-2">{a.time}</span>
              <h4 className="font-poppins text-sm font-semibold text-stone mb-2">{a.name}</h4>
              <p className="font-poppins text-[11px] text-stone-light mb-3">{a.desc}</p>
              <PriceTag price={a.price} origPrice={a.origPrice} />
              <AddToCartButton variant="inline" id={a.name} name={a.name} price={a.price} duration={a.time} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Nails" href="/book" />
            </div>
          ))}
        </div>
      </section>

      {/* Shapes + Art */}
      <section id="shapes" className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="reveal">
            <p className="font-poppins label-caps text-rose mb-3">Customization</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-6">Nail <em className="text-rose">Shapes</em></h2>
            <p className="font-poppins text-stone-light text-sm leading-relaxed mb-6">All extension systems are available in every standard and trending nail shape. Shape affects the overall silhouette and look of the hand.</p>
            <div className="flex flex-wrap gap-3">
              {SHAPES.map(s => (
                <span key={s} className="bg-white border border-blush/30 font-poppins text-xs text-stone-light px-4 py-2 rounded-full">{s}</span>
              ))}
            </div>
          </div>
          <div className="reveal reveal-d1">
            <p className="font-poppins label-caps text-rose mb-3">Enhancements</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-6">Nail Art <em className="text-rose">Options</em></h2>
            <p className="font-poppins text-stone-light text-sm leading-relaxed mb-6">Available across all nail extension systems. Our nail artists are trained in multiple nail art disciplines.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {NAIL_ART.map(a => (
                <div key={a} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-blush/20">
                  <span className="text-rose text-xs flex-shrink-0">✦</span>
                  <span className="font-poppins text-xs text-stone-light">{a}</span>
                </div>
              ))}
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
          <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#F5D8DC' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Nails That Turn Heads</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">Book Your Nail <em className="text-blush">Session Today</em></h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">Expert nail technicians with professional prep, primer, and seal for maximum bond strength and natural nail safety — at your door.</p>
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

export default function NailsPage() {
  return <NailsContent />
}
