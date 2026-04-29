'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ServiceStickyNav } from '../../components/ServiceStickyNav'

const NAV_SECTIONS = [
  { id: 'waxing',    label: 'Waxing',    services: ['Sugar Wax', 'Chocolate Wax', 'Rica Wax', 'Brazilian Wax', 'Roll-On Wax', 'Full Body Wax', 'Face Wax'] },
  { id: 'mani-pedi', label: 'Mani & Pedi', services: ['Basic Manicure', 'Spa Manicure', 'Paraffin Manicure', 'Basic Pedicure', 'Spa Pedicure', 'Paraffin Pedicure'] },
  { id: 'facials',   label: 'Facials',   services: ['Gold Facial', 'Diamond Facial', 'Fruit Facial', 'Anti-Aging Facial', 'Hydrating Facial', 'Brightening Facial', 'Cleanup', 'De-Tan', 'Bleach'] },
  { id: 'body',      label: 'Body',      services: ['Coffee Scrub', 'Rice Bran Polish', 'Chocolate Polish', 'Gold Polish', 'Chemical Peel', 'Glycolic Peel', 'Salicylic Peel'] },
]

const BREADCRUMB = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { label: 'Skin' },
]

const WAX_TYPES = [
  { type: 'Sugar Wax',       feature: 'Natural sugar-based paste, water-soluble, gentle on skin',        best: 'Sensitive skin, facial areas, fine hair', color: '#F5E0D0' },
  { type: 'Chocolate Wax',   feature: 'Cocoa-infused, antioxidant-rich, moisturizing formula',            best: 'Dry skin, arms, legs, body',              color: '#E8D0C0' },
  { type: 'Rica Wax',        feature: 'Liposoluble, rosin-free, ideal for coarse hair',                   best: 'Coarse hair, underarms, normal to oily',  color: '#EFCCD4' },
  { type: 'Brazilian Wax',   feature: 'Full intimate area hair removal with precision technique',          best: 'Complete bikini line to full Brazilian',   color: '#F0D8E8' },
  { type: 'Roll-On Wax',     feature: 'Hygienic cartridge application, quick and mess-free',              best: 'Large areas — full legs, back, arms',     color: '#F5E0D0' },
]

const MANICURE = [
  { name: 'Basic Manicure',    included: 'Soak, nail shape, cuticle care, hand massage, nail paint',                        highlight: 'Everyday maintenance and polish refresh' },
  { name: 'Spa Manicure',      included: 'Basic + exfoliation scrub, extended massage, nourishing mask',                    highlight: 'Deep hydration for dry or dull hands' },
  { name: 'Paraffin Manicure', included: 'Spa steps + warm paraffin wax dip for hands',                                     highlight: 'Intense moisture lock, ideal for very dry or cracked skin' },
]

const PEDICURE = [
  { name: 'Basic Pedicure',    included: 'Soak, nail shaping, cuticle care, foot massage, nail paint',                      highlight: 'Clean, fresh, polished feet in under 45 mins' },
  { name: 'Spa Pedicure',      included: 'Basic + scrub, extended massage, heel treatment, mask',                           highlight: 'Softens rough skin, relieves fatigue' },
  { name: 'Paraffin Pedicure', included: 'Spa steps + paraffin wax boot treatment',                                         highlight: 'Deep conditioning for cracked heels and dry soles' },
  { name: 'Luxury Pedicure',   included: 'All spa steps + premium mask, serum, hot stone massage, full foot spa ritual',    highlight: 'Ultimate foot restoration and relaxation experience' },
]

const FACIALS = [
  { type: 'Gold Facial',        best: 'Dull skin, anti-aging, special occasions — restores radiance',            accent: '#C8974A' },
  { type: 'Diamond Facial',     best: 'Mature skin, fine lines — microdermabrasion-infused glow',                accent: '#B8C0CC' },
  { type: 'Fruit Facial',       best: 'Young skin, natural brightening, everyday maintenance',                   accent: '#C8E0C0' },
  { type: 'O3+ Facial',         best: 'Oily / acne-prone skin — deep purifying and pore minimizing',             accent: '#D0E8F0' },
  { type: 'Anti-Aging Facial',  best: 'Fine lines, sagging — firming and lifting formulations',                  accent: '#F0D8E8' },
  { type: 'Hydrating Facial',   best: 'Dry, dehydrated skin — hyaluronic acid-based deep moisture',              accent: '#D0E8F8' },
  { type: 'Brightening Facial', best: 'Pigmentation, uneven tone — vitamin C and kojic formulas',                accent: '#F8ECD0' },
]

const PEELS = [
  { peel: 'Glycolic Acid Peel',  concern: 'Dull skin, fine lines, texture' },
  { peel: 'Salicylic Acid Peel', concern: 'Acne, blackheads, oily skin' },
  { peel: 'Lactic Acid Peel',    concern: 'Sensitive skin, mild brightening' },
  { peel: 'TCA Peel',            concern: 'Deep pigmentation, moderate scars' },
  { peel: 'Kojic Acid Peel',     concern: 'Melasma, hyperpigmentation' },
]

const ADVANCED = [
  { treatment: 'Acne Treatment',        focus: 'Active breakout management and prevention' },
  { treatment: 'Pigmentation Treatment', focus: 'Dark spots, melasma, post-inflammatory marks' },
  { treatment: 'Hydra Facial',          focus: 'Multi-step cleanse, extract, hydrate protocol' },
  { treatment: 'LED Light Therapy',     focus: 'Collagen stimulation, bacteria control' },
  { treatment: 'Meso Therapy',          focus: 'Nutrient infusion for skin rejuvenation' },
]

const BODY_POLISH = [
  { type: 'Coffee Scrub Polish', benefit: 'Circulation boost, cellulite reduction' },
  { type: 'Rice Bran Polish',    benefit: 'Skin brightening, smoothing' },
  { type: 'Chocolate Polish',    benefit: 'Antioxidant nourishment, softening' },
  { type: 'Gold Polish',         benefit: 'Radiance, anti-aging, special occasions' },
]

function WAIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function SkinPage() {
  return (
    <div className="bg-petal min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-cream">
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

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div style={{ animation: 'fadeUp .8s ease both' }}>
              <div className="inline-flex items-center gap-2 bg-blush/50 text-rose px-4 py-2 rounded-full mb-6">
                <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Division 02</span>
              </div>
              <h1 className="font-playfair text-6xl md:text-7xl font-bold text-stone leading-[1.05] mb-4">
                Skin<br /><em className="text-rose">Services</em>
              </h1>
              <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-4">
                Waxing · Facials · Body Care
              </p>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 max-w-lg">
                Full-spectrum skincare — waxing, brightening facials, chemical peels, nail care, and body treatments. Formulated for Indian skin tones and climate.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Waxing', 'Facials', 'Mani-Pedi', 'Body Polishing', 'Chemical Peels'].map(t => (
                  <span key={t} className="bg-white border border-blush/40 font-poppins text-xs text-stone-light px-4 py-2 rounded-full font-medium">{t}</span>
                ))}
              </div>
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                <WAIcon size={16} />
                Book Skin Session
              </a>
            </div>

            <div className="hidden md:flex flex-col gap-4" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              <div className="relative rounded-3xl overflow-hidden h-72 shadow-xl shadow-rose/10">
                <img src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png" alt="Skin Services at home — DoorStep Diva" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="font-poppins text-xs font-semibold text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                    Indian Skin Specialists
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Waxing',        sub: '5 wax types',      color: '#F5E0D0', icon: '◇' },
                  { label: 'Facials',       sub: '7 facial types',   color: '#F0D8E8', icon: '✦' },
                  { label: 'Mani & Pedi',   sub: '7 services',       color: '#EFCCD4', icon: '◈' },
                  { label: 'Advanced Skin', sub: '10+ treatments',   color: '#E8D8F0', icon: '✿' },
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

      <ServiceStickyNav sections={NAV_SECTIONS} />

      {/* ── WAXING ───────────────────────────────────────────────────── */}
      <section id="waxing" className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-3">Hair Removal</p>
          <h2 className="font-playfair text-4xl font-bold text-stone">Waxing <em className="text-rose">Services</em></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WAX_TYPES.map((w, i) => (
            <div key={w.type}
              className={`reveal reveal-d${Math.min(i + 1, 6)} card-lift bg-white rounded-3xl p-7 border border-blush/20 group`}>
              <div className="w-10 h-10 rounded-2xl mb-5 flex items-center justify-center text-stone font-bold text-lg"
                style={{ background: w.color }}>◇</div>
              <h3 className="font-poppins text-base font-semibold text-stone mb-2 group-hover:text-rose transition-colors">{w.type}</h3>
              {/* text-sm (was text-xs) */}
              <p className="font-poppins text-sm text-stone-light leading-relaxed mb-4">{w.feature}</p>
              <div className="bg-petal rounded-xl px-4 py-2">
                <p className="font-poppins text-xs text-rose font-medium">Best for: {w.best}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MANI-PEDI ────────────────────────────────────────────────── */}
      <section id="mani-pedi" className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Manicure */}
            <div>
              <p className="font-poppins label-caps text-rose mb-3 reveal">Hand &amp; Nail Care</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-8 reveal">Manicure</h2>
              <div className="flex flex-col gap-4">
                {MANICURE.map((m, i) => (
                  <div key={m.name}
                    className={`reveal reveal-d${i + 1} card-lift bg-white rounded-2xl p-6 border border-blush/20`}>
                    <h3 className="font-poppins text-sm font-semibold text-stone mb-2">{m.name}</h3>
                    {/* text-sm (was text-xs) */}
                    <p className="font-poppins text-sm text-stone-light mb-3 leading-relaxed">{m.included}</p>
                    <span className="bg-blush/30 text-rose font-poppins text-xs font-medium px-3 py-1 rounded-full">{m.highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pedicure */}
            <div>
              <p className="font-poppins label-caps text-rose mb-3 reveal">Foot &amp; Nail Care</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-8 reveal">Pedicure</h2>
              <div className="flex flex-col gap-4">
                {PEDICURE.map((p, i) => (
                  <div key={p.name}
                    className={`reveal reveal-d${i + 1} card-lift bg-white rounded-2xl p-6 border border-blush/20`}>
                    <h3 className="font-poppins text-sm font-semibold text-stone mb-2">{p.name}</h3>
                    {/* text-sm (was text-xs) */}
                    <p className="font-poppins text-sm text-stone-light mb-3 leading-relaxed">{p.included}</p>
                    <span className="bg-blush/30 text-rose font-poppins text-xs font-medium px-3 py-1 rounded-full">{p.highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACIALS ──────────────────────────────────────────────────── */}
      <section id="facials" className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-3">Comprehensive Skin Therapy</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-4">
            Facial <em className="text-rose">Treatments</em>
          </h2>
          <p className="font-poppins text-stone-light text-base max-w-lg mx-auto">
            Seven facial types covering every skin concern. All follow a multi-step protocol using targeted product lines.
          </p>
        </div>

        {/* Quick treatments */}
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {[
            { name: 'Cleanup',         sub: 'Skin Brightening', desc: 'Deep-cleansing treatment that removes surface impurities, unclogs pores, and leaves skin visibly refreshed. Every 3–4 weeks.', accent: '#EFCCD4' },
            { name: 'De-Tan Treatment', sub: 'Tan Reversal',     desc: 'Reverses sun damage and reduces pigmentation. Kojic acid and vitamin C-based formulations. Face, neck, hands, and full body.', accent: '#F5E0D0' },
            { name: 'Bleach',          sub: 'Instant Glow',     desc: 'Lightens facial hair and superficial pigmentation. Gold, fruit, and herbal variants. Face and full body options available.', accent: '#F0D8E8' },
          ].map((t, i) => (
            <div key={t.name}
              className={`reveal reveal-d${i + 1} card-lift rounded-3xl p-7 border border-blush/20`}
              style={{ background: t.accent + '30' }}>
              <p className="font-poppins label-caps text-rose mb-2">{t.sub}</p>
              <h3 className="font-playfair text-2xl font-bold text-stone mb-3">{t.name}</h3>
              {/* text-sm (was text-xs) */}
              <p className="font-poppins text-sm text-stone-light leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Full facial cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {FACIALS.map((f, i) => (
            <div key={f.type}
              className={`reveal reveal-d${Math.min(i + 1, 6)} card-lift bg-white rounded-2xl p-5 border border-blush/20 group`}>
              <div className="w-8 h-8 rounded-xl mb-4" style={{ background: f.accent + '80' }} />
              <h3 className="font-poppins text-sm font-semibold text-stone mb-2 group-hover:text-rose transition-colors">{f.type}</h3>
              {/* text-sm (was text-xs) */}
              <p className="font-poppins text-sm text-stone-light leading-relaxed">{f.best}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BODY & ADVANCED ──────────────────────────────────────────── */}
      <section id="body" className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-16">

            {/* Body Polish */}
            <div>
              <p className="font-poppins label-caps text-rose mb-3 reveal">Full Body</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-3 reveal">Body Polishing</h2>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 reveal">
                Full-body exfoliation and nourishment ritual that buffs away dead skin cells, evens out tone, and leaves skin silky and luminous.
              </p>
              <div className="flex flex-col gap-3">
                {BODY_POLISH.map((b, i) => (
                  <div key={b.type}
                    className={`reveal reveal-d${i + 1} card-lift flex items-center gap-4 bg-white rounded-2xl p-5 border border-blush/20`}>
                    <div className="w-2 h-2 rounded-full bg-rose flex-shrink-0" />
                    <div>
                      <p className="font-poppins text-sm font-semibold text-stone">{b.type}</p>
                      <p className="font-poppins text-sm text-stone-light">{b.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chemical Peels + Advanced */}
            <div className="space-y-12">
              <div>
                <p className="font-poppins label-caps text-rose mb-3 reveal">Clinical</p>
                <h2 className="font-playfair text-4xl font-bold text-stone mb-6 reveal">Chemical Peels</h2>
                <div className="flex flex-col gap-3">
                  {PEELS.map((p, i) => (
                    <div key={p.peel}
                      className={`reveal reveal-d${i + 1} card-lift flex justify-between items-center bg-white rounded-xl p-4 border border-blush/20`}>
                      <p className="font-poppins text-sm font-semibold text-stone">{p.peel}</p>
                      <span className="font-poppins text-sm text-stone-light text-right max-w-[45%]">{p.concern}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-poppins label-caps text-rose mb-3 reveal">Advanced</p>
                <h2 className="font-playfair text-4xl font-bold text-stone mb-6 reveal">Skin Treatments</h2>
                <div className="flex flex-col gap-3">
                  {ADVANCED.map((a, i) => (
                    <div key={a.treatment}
                      className={`reveal reveal-d${i + 1} card-lift flex justify-between items-center bg-white rounded-xl p-4 border border-blush/20`}>
                      <p className="font-poppins text-sm font-semibold text-stone">{a.treatment}</p>
                      <span className="font-poppins text-sm text-stone-light text-right max-w-[45%]">{a.focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden reveal">
          <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#F5E0D0' }} />
          <p className="font-poppins label-caps text-rose-light mb-4 relative z-10">Glow From Within</p>
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