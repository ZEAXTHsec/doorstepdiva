'use client'
import React from 'react'
import Link from 'next/link'

const BREADCRUMB = [{ href: '/', label: 'Home' }, { href: '/#services', label: 'Services' }, { label: 'Nail Extensions' }]

const ACRYLIC = [
  { service: 'Full Set Acrylic', desc: 'Complete new set of acrylic extensions — all 10 nails, sculpted with tips or forms to desired length and shape.', advantage: 'Maximum length, structure, and durability — lasts 3–4 weeks' },
  { service: 'Acrylic Infill / Fill-In', desc: 'Maintenance service to fill the regrowth gap as natural nails grow — restores structure and surface.', advantage: 'Recommended every 2–3 weeks to maintain look and integrity' },
  { service: 'Acrylic Nail Art Set', desc: 'Full acrylic set with custom nail art — hand-painted designs, 3D elements, gemstones, foils, or chrome.', advantage: 'Fully bespoke artistic finish; no two sets are alike' },
  { service: 'Acrylic Removal', desc: 'Safe, professional removal using acetone soak technique — no filing damage to natural nail plate.', advantage: 'Protects natural nail health during removal process' },
]

const GEL = [
  { service: 'Hard Gel Extensions', desc: 'UV-cured hard gel applied over nail tips or forms — sculpted to shape, filed, and finished. Cannot be soaked off; must be filed.', advantage: 'Very strong, suitable for those with weak or bendy natural nails' },
  { service: 'Soft Gel / Gel Polish (Shellac)', desc: 'Gel polish overlay on natural nails or short tips — not for length extension but for color and chip-free finish.', advantage: '2–3 week wear; soak-off removal; available in hundreds of shades' },
  { service: 'Builder Gel (BIAB)', desc: 'Builder In A Bottle — a strengthening gel overlay that adds structure and length to natural nails without tips.', advantage: 'Ideal for natural nail strengthening with subtle length addition' },
  { service: 'Gel Nail Art Set', desc: 'Gel base with custom gel art — marble, ombre, French, floral, or graphic designs.', advantage: 'Smooth, luminous art finish; highly customizable' },
  { service: 'Gel Infill', desc: 'Regrowth fill for gel extensions — rebalances structure and refreshes color/finish.', advantage: 'Extends wear and maintains aesthetic; done every 2–3 weeks' },
  { service: 'Gel Removal', desc: 'Soak-off removal for soft gels; filing removal for hard gels — both performed without damage.', advantage: 'Gentle and nail-safe when done professionally' },
]

const POLYGEL = [
  { service: 'PolyGel Full Set', desc: 'Complete new set sculpted using PolyGel with forms or dual forms — available in natural, medium, or extended lengths.', advantage: 'Lighter than acrylic, stronger than soft gel, odor-free application' },
  { service: 'PolyGel Infill', desc: 'Regrowth maintenance — fills the growth gap and refreshes surface and color.', advantage: 'Every 2–3 weeks; faster application time than traditional systems' },
  { service: 'PolyGel Nail Art Set', desc: 'Custom PolyGel extensions with embedded nail art — 3D designs, encapsulated florals, chrome powder, or hand-painted art.', advantage: 'Sculptable formula allows for detailed 3D embellishments' },
  { service: 'PolyGel Removal', desc: 'Safe removal via soak-off or gentle filing based on product brand used — natural nail inspection included.', advantage: 'Gentler removal compared to hard gels' },
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
              <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-4">Acrylic · Gel · PolyGel</p>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 max-w-lg">
                Every nail enhancement system — durable acrylics, natural gels, and next-gen PolyGel — finished with bespoke nail art. From clean square nails to dramatic stilettos with custom designs.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Acrylic', 'Gel / Shellac', 'PolyGel', 'BIAB', 'Nail Art'].map(t => (
                  <span key={t} className="bg-white border border-blush/40 font-poppins text-xs text-stone-light px-4 py-2 rounded-full font-medium">{t}</span>
                ))}
              </div>
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Book Nail Session
              </a>
            </div>

            {/* Cover photo + system cards */}
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
          </div>{/* end grid */}
        </div>{/* end max-w container */}
      </section>{/* end Hero */}

      {/* Acrylic */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-2 bg-cream rounded-3xl p-8 sticky top-28">
            <span className="font-poppins text-[10px] tracking-widest uppercase text-rose font-semibold block mb-2">System A</span>
            <h2 className="font-playfair text-3xl font-bold text-stone mb-4">Acrylic Nail Extensions</h2>
            <p className="font-poppins text-sm text-stone-light leading-relaxed mb-6">The most durable nail extension system — formed by mixing liquid monomer with powder polymer to create a hard, sculptable overlay. Ideal for length, structure, and long-lasting wear.</p>
            <div className="flex flex-wrap gap-2">
              {['Most Durable', 'Max Length', '3–4 Week Wear', 'Customizable'].map(t => (
                <span key={t} className="bg-white border border-blush/30 font-poppins text-[11px] text-stone-light px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 grid sm:grid-cols-2 gap-4">
            {ACRYLIC.map(a => (
              <div key={a.service} className="bg-white rounded-2xl p-6 border border-blush/20 hover:shadow-md hover:shadow-rose/10 transition-all duration-300 group">
                <h3 className="font-poppins text-sm font-semibold text-stone mb-2 group-hover:text-rose transition-colors">{a.service}</h3>
                <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4">{a.desc}</p>
                <div className="bg-petal rounded-xl px-3 py-2">
                  <p className="font-poppins text-[11px] text-rose font-medium">{a.advantage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gel */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2 rounded-3xl p-8 sticky top-28" style={{ background: '#F0D8E850' }}>
              <span className="font-poppins text-[10px] tracking-widest uppercase text-rose font-semibold block mb-2">System B</span>
              <h2 className="font-playfair text-3xl font-bold text-stone mb-4">Gel Nail Extensions</h2>
              <p className="font-poppins text-sm text-stone-light leading-relaxed mb-6">Lighter and more flexible than acrylics. Cured under UV/LED lamp for a natural-looking, high-gloss finish with less odor during application.</p>
              <div className="flex flex-wrap gap-2">
                {['UV/LED Cured', 'High-Gloss Finish', 'Natural Feel', 'Low Odor'].map(t => (
                  <span key={t} className="bg-white border border-blush/30 font-poppins text-[11px] text-stone-light px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <div className="md:col-span-3 grid sm:grid-cols-2 gap-4">
              {GEL.map(g => (
                <div key={g.service} className="bg-white rounded-2xl p-6 border border-blush/20 hover:shadow-md hover:shadow-rose/10 transition-all duration-300 group">
                  <h3 className="font-poppins text-sm font-semibold text-stone mb-2 group-hover:text-rose transition-colors">{g.service}</h3>
                  <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4">{g.desc}</p>
                  <div className="bg-petal rounded-xl px-3 py-2">
                    <p className="font-poppins text-[11px] text-rose font-medium">{g.advantage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PolyGel */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-2 bg-stone rounded-3xl p-8 sticky top-28">
            <span className="font-poppins text-[10px] tracking-widest uppercase text-rose-light font-semibold block mb-2">System C — Hybrid Technology</span>
            <h2 className="font-playfair text-3xl font-bold text-white mb-4">PolyGel Extensions</h2>
            <p className="font-poppins text-sm text-white/60 leading-relaxed mb-6">The newest generation nail system — combining the strength of acrylic and flexibility of gel. Odor-free, lightweight, non-yellowing. The preferred system for clients wanting durability and a natural-looking finish.</p>
            <div className="grid grid-cols-2 gap-3">
              {POLYGEL_BENEFITS.map(b => (
                <div key={b.label} className="bg-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
                  <span className="text-rose-light text-xs">{b.icon}</span>
                  <span className="font-poppins text-[11px] text-white/80">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 grid sm:grid-cols-2 gap-4">
            {POLYGEL.map(p => (
              <div key={p.service} className="bg-white rounded-2xl p-6 border border-blush/20 hover:shadow-md hover:shadow-rose/10 transition-all duration-300 group">
                <h3 className="font-poppins text-sm font-semibold text-stone mb-2 group-hover:text-rose transition-colors">{p.service}</h3>
                <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4">{p.desc}</p>
                <div className="bg-petal rounded-xl px-3 py-2">
                  <p className="font-poppins text-[11px] text-rose font-medium">{p.advantage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-cream py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-16">
          <div className="text-center mb-14">
            <h2 className="font-playfair text-4xl font-bold text-stone mb-3">System <em className="text-rose">Comparison</em></h2>
            <p className="font-poppins text-stone-light text-sm">Unsure which system suits you? Compare at a glance.</p>
          </div>
          <div className="bg-white rounded-3xl border border-blush/20 overflow-hidden">
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
        </div>
      </section>

      {/* Shapes + Art */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Customization</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-6">Nail <em>Shapes</em></h2>
            <p className="font-poppins text-stone-light text-sm leading-relaxed mb-6">All extension systems are available in every standard and trending nail shape. Shape affects the overall silhouette and look of the hand.</p>
            <div className="flex flex-wrap gap-3">
              {SHAPES.map(s => (
                <span key={s} className="bg-white border border-blush/30 font-poppins text-xs text-stone-light px-4 py-2 rounded-full hover:bg-rose hover:text-white hover:border-rose transition-all duration-200 cursor-pointer">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Enhancements</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-6">Nail Art <em>Add-Ons</em></h2>
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

      {/* CTA */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden">
          <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#F5D8DC' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Nails That Turn Heads</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">Book Your Nail <em className="text-blush">Session Today</em></h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">Expert nail technicians with professional prep, primer, and seal for maximum bond strength and natural nail safety — at your door.</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer" className="font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full">Book Now on WhatsApp</a>
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
