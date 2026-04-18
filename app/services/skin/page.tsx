import Link from 'next/link'

const BREADCRUMB = [{ href: '/', label: 'Home' }, { href: '/#services', label: 'Services' }, { label: 'Skin' }]

const WAX_TYPES = [
  { type: 'Sugar Wax', feature: 'Natural sugar-based paste, water-soluble, gentle on skin', best: 'Sensitive skin, facial areas, fine hair', color: '#F5E0D0' },
  { type: 'Chocolate Wax', feature: 'Cocoa-infused, antioxidant-rich, moisturizing formula', best: 'Dry skin, arms, legs, body', color: '#E8D0C0' },
  { type: 'Rica Wax', feature: 'Liposoluble, rosin-free, ideal for coarse hair', best: 'Coarse hair, underarms, normal to oily skin', color: '#EFCCD4' },
  { type: 'Brazilian Wax', feature: 'Full intimate area hair removal with precision technique', best: 'Complete bikini line to full Brazilian', color: '#F0D8E8' },
  { type: 'Roll-On Wax', feature: 'Hygienic cartridge application, quick and mess-free', best: 'Large areas — full legs, back, arms', color: '#F5E0D0' },
]

const MANICURE = [
  { name: 'Basic Manicure', included: 'Soak, nail shape, cuticle care, hand massage, nail paint', highlight: 'Everyday maintenance and polish refresh' },
  { name: 'Spa Manicure', included: 'Basic + exfoliation scrub, extended massage, nourishing mask', highlight: 'Deep hydration for dry or dull hands' },
  { name: 'Paraffin Manicure', included: 'Spa steps + warm paraffin wax dip for hands', highlight: 'Intense moisture lock, ideal for very dry or cracked skin' },
]

const PEDICURE = [
  { name: 'Basic Pedicure', included: 'Soak, nail shaping, cuticle care, foot massage, nail paint', highlight: 'Clean, fresh, polished feet in under 45 mins' },
  { name: 'Spa Pedicure', included: 'Basic + scrub, extended massage, heel treatment, mask', highlight: 'Softens rough skin, relieves fatigue' },
  { name: 'Paraffin Pedicure', included: 'Spa steps + paraffin wax boot treatment', highlight: 'Deep conditioning for cracked heels and dry soles' },
  { name: 'Luxury Pedicure', included: 'All spa steps + premium mask, serum, hot stone massage, full foot spa ritual', highlight: 'Ultimate foot restoration and relaxation experience' },
]

const FACIALS = [
  { type: 'Gold Facial', best: 'Dull skin, anti-aging, special occasions — restores radiance', accent: '#C8974A' },
  { type: 'Diamond Facial', best: 'Mature skin, fine lines — microdermabrasion-infused glow', accent: '#B8C0CC' },
  { type: 'Fruit Facial', best: 'Young skin, natural brightening, everyday maintenance', accent: '#C8E0C0' },
  { type: 'O3+ Facial', best: 'Oily / acne-prone skin — deep purifying and pore minimizing', accent: '#D0E8F0' },
  { type: 'Anti-Aging Facial', best: 'Fine lines, sagging — firming and lifting formulations', accent: '#F0D8E8' },
  { type: 'Hydrating Facial', best: 'Dry, dehydrated skin — hyaluronic acid-based deep moisture', accent: '#D0E8F8' },
  { type: 'Brightening Facial', best: 'Pigmentation, uneven tone — vitamin C and kojic formulas', accent: '#F8ECD0' },
]

const PEELS = [
  { peel: 'Glycolic Acid Peel', concern: 'Dull skin, fine lines, texture' },
  { peel: 'Salicylic Acid Peel', concern: 'Acne, blackheads, oily skin' },
  { peel: 'Lactic Acid Peel', concern: 'Sensitive skin, mild brightening' },
  { peel: 'TCA Peel', concern: 'Deep pigmentation, moderate scars' },
  { peel: 'Kojic Acid Peel', concern: 'Melasma, hyperpigmentation' },
]

const ADVANCED = [
  { treatment: 'Acne Treatment', focus: 'Active breakout management and prevention' },
  { treatment: 'Pigmentation Treatment', focus: 'Dark spots, melasma, post-inflammatory marks' },
  { treatment: 'Hydra Facial', focus: 'Multi-step cleanse, extract, hydrate protocol' },
  { treatment: 'LED Light Therapy', focus: 'Collagen stimulation, bacteria control' },
  { treatment: 'Meso Therapy', focus: 'Nutrient infusion for skin rejuvenation' },
]

const BODY_POLISH = [
  { type: 'Coffee Scrub Polish', benefit: 'Circulation boost, cellulite reduction' },
  { type: 'Rice Bran Polish', benefit: 'Skin brightening, smoothing' },
  { type: 'Chocolate Polish', benefit: 'Antioxidant nourishment, softening' },
  { type: 'Gold Polish', benefit: 'Radiance, anti-aging, special occasions' },
]

export default function SkinPage() {
  return (
    <div className="bg-petal min-h-screen">
      {/* Hero */}
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
              <h1 className="font-playfair text-6xl md:text-7xl font-bold text-stone leading-[1.05] mb-6">
                Skin<br /><em className="text-rose">Services</em>
              </h1>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 max-w-lg">
                Full-spectrum skincare — waxing, brightening facials, chemical peels, nail care, and body treatments. Formulated for Indian skin tones and climate.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Waxing', 'Facials', 'Mani-Pedi', 'Body Polishing', 'Chemical Peels'].map(t => (
                  <span key={t} className="bg-white border border-blush/40 font-poppins text-xs text-stone-light px-4 py-2 rounded-full font-medium">{t}</span>
                ))}
              </div>
              <Link href="/#contact" className="inline-block font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                Book Skin Session →
              </Link>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              {[
                { label: 'Waxing', sub: '5 wax types', color: '#F5E0D0', icon: '◇' },
                { label: 'Facials', sub: '7 facial types', color: '#F0D8E8', icon: '✦' },
                { label: 'Mani & Pedi', sub: '7 services', color: '#EFCCD4', icon: '◈' },
                { label: 'Advanced Skin', sub: '10+ treatments', color: '#E8D8F0', icon: '✿' },
              ].map(c => (
                <div key={c.label} className="rounded-2xl p-6 border border-blush/20 bg-white"
                  style={{ borderTop: `3px solid ${c.color}` }}>
                  <span className="text-2xl text-rose/60 block mb-3">{c.icon}</span>
                  <p className="font-playfair text-xl font-bold text-stone mb-1">{c.label}</p>
                  <p className="font-poppins text-xs text-stone-light">{c.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Waxing */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="mb-14">
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Hair Removal</p>
          <h2 className="font-playfair text-4xl font-bold text-stone">Waxing <em>Services</em></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WAX_TYPES.map((w) => (
            <div key={w.type} className="bg-white rounded-3xl p-7 border border-blush/20 hover:shadow-lg hover:shadow-rose/10 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-2xl mb-5 flex items-center justify-center text-rose font-bold"
                style={{ background: w.color }}>#</div>
              <h3 className="font-poppins text-base font-semibold text-stone mb-2 group-hover:text-rose transition-colors">{w.type}</h3>
              <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4">{w.feature}</p>
              <div className="bg-petal rounded-xl px-4 py-2">
                <p className="font-poppins text-[11px] text-rose font-medium">Best for: {w.best}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mani-Pedi */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Manicure */}
            <div>
              <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Hand & Nail Care</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-8">Manicure</h2>
              <div className="space-y-4">
                {MANICURE.map((m) => (
                  <div key={m.name} className="bg-white rounded-2xl p-6 border border-blush/20">
                    <h3 className="font-poppins text-sm font-semibold text-stone mb-1">{m.name}</h3>
                    <p className="font-poppins text-xs text-stone-light mb-3">{m.included}</p>
                    <span className="bg-blush/30 text-rose font-poppins text-[11px] font-medium px-3 py-1 rounded-full">{m.highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Pedicure */}
            <div>
              <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Foot & Nail Care</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-8">Pedicure</h2>
              <div className="space-y-4">
                {PEDICURE.map((p) => (
                  <div key={p.name} className="bg-white rounded-2xl p-6 border border-blush/20">
                    <h3 className="font-poppins text-sm font-semibold text-stone mb-1">{p.name}</h3>
                    <p className="font-poppins text-xs text-stone-light mb-3">{p.included}</p>
                    <span className="bg-blush/30 text-rose font-poppins text-[11px] font-medium px-3 py-1 rounded-full">{p.highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Face Treatments */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="text-center mb-14">
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Comprehensive Skin Therapy</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-4">Facial <em>Treatments</em></h2>
          <p className="font-poppins text-stone-light text-sm max-w-lg mx-auto">Seven facial types covering every skin concern. All follow a multi-step protocol using targeted product lines.</p>
        </div>

        {/* Quick treatments */}
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {[
            { name: 'Cleanup', sub: 'Skin Brightening', desc: 'Deep-cleansing treatment that removes surface impurities, unclogs pores, and leaves skin visibly refreshed. Every 3–4 weeks.', accent: '#EFCCD4' },
            { name: 'De-Tan Treatment', sub: 'Tan Reversal', desc: 'Reverses sun damage and reduces pigmentation. Kojic acid and vitamin C-based formulations. Face, neck, hands, and full body.', accent: '#F5E0D0' },
            { name: 'Bleach', sub: 'Instant Glow', desc: 'Lightens facial hair and superficial pigmentation. Gold, fruit, and herbal variants. Face and full body options available.', accent: '#F0D8E8' },
          ].map(t => (
            <div key={t.name} className="rounded-3xl p-7 border border-blush/20"
              style={{ background: t.accent + '30' }}>
              <p className="font-poppins text-[10px] tracking-widest uppercase text-rose font-semibold mb-2">{t.sub}</p>
              <h3 className="font-playfair text-2xl font-bold text-stone mb-3">{t.name}</h3>
              <p className="font-poppins text-xs text-stone-light leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Full facials */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {FACIALS.map((f) => (
            <div key={f.type} className="bg-white rounded-2xl p-5 border border-blush/20 hover:shadow-md hover:shadow-rose/10 transition-all duration-300 group">
              <div className="w-8 h-8 rounded-xl mb-4" style={{ background: f.accent + '80' }} />
              <h3 className="font-poppins text-sm font-semibold text-stone mb-2 group-hover:text-rose transition-colors">{f.type}</h3>
              <p className="font-poppins text-xs text-stone-light leading-relaxed">{f.best}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Body & Advanced */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Body Polish */}
            <div>
              <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Full Body</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-3">Body Polishing</h2>
              <p className="font-poppins text-stone-light text-sm leading-relaxed mb-8">Full-body exfoliation and nourishment ritual that buffs away dead skin cells, evens out tone, and leaves skin silky and luminous.</p>
              <div className="space-y-3">
                {BODY_POLISH.map(b => (
                  <div key={b.type} className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-blush/20">
                    <div className="w-2 h-2 rounded-full bg-rose flex-shrink-0" />
                    <div>
                      <p className="font-poppins text-sm font-semibold text-stone">{b.type}</p>
                      <p className="font-poppins text-xs text-stone-light">{b.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chemical Peels + Advanced */}
            <div className="space-y-12">
              <div>
                <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Clinical</p>
                <h2 className="font-playfair text-4xl font-bold text-stone mb-6">Chemical Peels</h2>
                <div className="space-y-3">
                  {PEELS.map(p => (
                    <div key={p.peel} className="flex justify-between items-center bg-white rounded-xl p-4 border border-blush/20">
                      <p className="font-poppins text-sm font-semibold text-stone">{p.peel}</p>
                      <span className="font-poppins text-xs text-stone-light text-right max-w-[45%]">{p.concern}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Advanced</p>
                <h2 className="font-playfair text-4xl font-bold text-stone mb-6">Skin Treatments</h2>
                <div className="space-y-3">
                  {ADVANCED.map(a => (
                    <div key={a.treatment} className="flex justify-between items-center bg-white rounded-xl p-4 border border-blush/20">
                      <p className="font-poppins text-sm font-semibold text-stone">{a.treatment}</p>
                      <span className="font-poppins text-xs text-stone-light text-right max-w-[45%]">{a.focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden">
          <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#F5E0D0' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Glow From Within</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">Book Your Skin <em className="text-blush">Session Today</em></h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">Certified skin therapists arriving at your doorstep — with all products, tools, and expertise included.</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <Link href="/#contact" className="font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full">Book Now</Link>
            <Link href="/#services" className="font-poppins text-sm font-medium px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 rounded-full">View All Services</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
