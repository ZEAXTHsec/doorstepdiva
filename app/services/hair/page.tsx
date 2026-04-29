'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ServiceStickyNav } from '../../components/ServiceStickyNav'

const NAV_SECTIONS = [
  { id: 'services',    label: 'Services',    services: ['Haircut', 'Blow Dry', 'Tong Curl', 'Flat Iron', 'Short Cut', 'Medium Cut', 'Long Cut'] },
  { id: 'color',       label: 'Color',       services: ['Global Color', 'Highlights', 'Balayage', 'Ombre', 'Root Touch-Up', 'Toning', 'Streaks'] },
  { id: 'treatments',  label: 'Treatments',  services: ['Keratin Treatment', 'Smoothening', 'Rebonding', 'Deep Conditioning', 'Hair Spa', 'Scalp Treatment', 'Protein Treatment'] },
]

const BREADCRUMB = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { label: 'Hair' },
]

const CATEGORIES = [
  {
    id: 'A',
    title: 'Haircuts & Styling',
    icon: '✂',
    desc: 'Precision cutting tailored to your face shape, lifestyle, and hair density. Every cut finishes with an expert blowdry and styling guidance.',
    accent: '#EFCCD4',
    services: [
      { name: 'Short Hair Cut',       detail: 'Tailored shape for pixie, bob, and cropped styles. Includes consultation, wash & blowdry.' },
      { name: 'Medium Cut',           detail: 'Shoulder to collar-length precision cuts. Suited to all hair textures.' },
      { name: 'Long Cut',             detail: 'Shape, trim, and layer work for long hair. Includes split-end treatment.' },
      { name: 'Blow Dry',             detail: 'Professional volumising or sleek finish blowdry using round brush technique.' },
      { name: 'Tong Curl',            detail: 'Defined curls and waves using barrel tongs. Lasts 24–48 hrs with product.' },
      { name: 'Flat Iron',            detail: 'Silky, smooth, high-shine straight styling with heat protectant application.' },
      { name: 'Updo / Event Styling', detail: 'Occasion-ready updos: braids, buns, pinned sets, and bridal trials.' },
    ],
  },
  {
    id: 'B',
    title: 'Hair Color',
    icon: '◈',
    desc: 'From natural root touch-ups to vivid fashion shades. Our color specialists use ammonia-controlled, damage-minimizing formulations for vibrant and lasting results.',
    accent: '#F0D8E8',
    services: [
      { name: 'Global Color',   detail: 'Full all-over color application from root to tip. Rich, even, salon-finish saturation.' },
      { name: 'Root Touch-Up',  detail: 'Precise root blending in under 45 mins. Matches your existing shade perfectly.' },
      { name: 'Highlights',     detail: 'Section-by-section lightening for sun-kissed dimension and contrast.' },
      { name: 'Balayage',       detail: 'Freehand painted lightening for soft, natural-looking, graduated color.' },
      { name: 'Ombré / Sombré', detail: 'Seamless dark-to-light transition. Sombré is the softer, more subtle version.' },
      { name: 'Fashion Color',  detail: 'Vivid, pastel, and statement shades — reds, violets, pinks, and fantasy hues.' },
      { name: 'Glossing',       detail: 'Clear or tinted glossing treatment that seals color and boosts shine intensity.' },
    ],
  },
  {
    id: 'C',
    title: 'Hair Treatments & Therapy',
    icon: '✦',
    desc: 'Targeted repair and nourishment programs addressing damage, frizz, breakage, hair fall, dandruff, and dryness using clinical-grade formulations.',
    accent: '#F5E0D0',
    services: [
      { name: 'Hair Spa',              detail: 'Deep conditioning ritual: steam, mask, scalp massage, and serum finish.' },
      { name: 'Keratin Treatment',     detail: 'Protein-infused smoothing that reduces frizz and cuts styling time by 50%.' },
      { name: 'Smoothening',           detail: 'Semi-permanent frizz control for 3–5 months. Gentler than rebonding.' },
      { name: 'Rebonding',             detail: 'Permanent pin-straight restructuring for all hair textures. Lasts 6–9 months.' },
      { name: 'Bond Repair (Olaplex)', detail: 'Olaplex No.1–3 protocol rebuilds broken disulfide bonds for damaged hair.' },
      { name: 'Dandruff Treatment',    detail: 'Anti-fungal scalp treatment with targeted serum and scalp exfoliation.' },
      { name: 'Hair Fall Treatment',   detail: 'Scalp analysis, stimulating massage, and strengthening serum infusion.' },
    ],
  },
]

const BRANDS = ["L'Oréal Professionnel", 'Kérastase', 'Wella', 'Olaplex', 'Schwarzkopf']

const PROCESS = [
  { step: '01', title: 'Book Your Session',  desc: 'Choose your services and preferred time via WhatsApp or our contact form.' },
  { step: '02', title: 'Artist Arrives',     desc: 'Your certified stylist arrives fully equipped with professional tools and products.' },
  { step: '03', title: 'Consultation First', desc: 'We assess your hair type, goals, and recommend the best approach before starting.' },
  { step: '04', title: 'Enjoy Your Glow',   desc: 'Sit back, relax in your own space, and leave with stunning salon-quality results.' },
]

const FAQS = [
  { q: 'How long does a color session take?',        a: 'Typically 2–3 hours depending on the technique. Balayage and highlights take longer than a global color.' },
  { q: 'Is keratin treatment safe for Indian hair?', a: 'Yes — we use formaldehyde-free keratin formulas specifically tested for the Indian climate and hair texture.' },
  { q: 'Do you bring your own products?',            a: 'Absolutely. Every session arrives fully equipped with professional salon tools and brand products — no need to arrange anything.' },
  { q: 'Can I book a consultation first?',           a: 'Yes. We offer pre-service consultations, especially for color and treatment services, to assess hair condition and plan the right approach.' },
]

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

export default function HairPage() {
  return (
    <div className="bg-petal min-h-screen">

      {/* HERO */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-cream">
        <div aria-hidden className="absolute -right-40 -top-20 w-[600px] h-[600px] rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, #EFCCD4 0%, transparent 70%)' }} />
        <div aria-hidden className="absolute left-1/3 bottom-0 w-48 h-48 rounded-full opacity-20"
          style={{ background: '#F0D8E8' }} />

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
                <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Division 01</span>
              </div>
              <h1 className="font-playfair text-6xl md:text-7xl font-bold text-stone leading-[1.05] mb-4">
                Hair<br /><em className="text-rose">Services</em>
              </h1>
              <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-4">
                Cuts · Color · Treatments
              </p>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 max-w-lg">
                A complete hair experience — from everyday cuts to transformative color and in-depth treatment therapies. Every service starts with a personalized consultation.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Cuts & Styling', 'Hair Color', 'Treatments'].map(t => (
                  <span key={t} className="bg-white border border-blush/40 font-poppins text-xs text-stone-light px-4 py-2 rounded-full font-medium">{t}</span>
                ))}
              </div>
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                <WAIcon size={16} />
                Book Hair Session
              </a>
            </div>

            <div className="hidden md:flex flex-col gap-4" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              <div className="relative rounded-3xl overflow-hidden h-72 shadow-xl shadow-rose/10">
                <img src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" alt="Hair Services at home — DoorStep Diva" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="font-poppins text-xs font-semibold text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                    Certified Hair Artists
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-md border border-blush/20">
                <p className="font-poppins text-xs tracking-widest uppercase text-rose font-semibold mb-4">Our Hair Categories</p>
                {CATEGORIES.map((c) => (
                  <div key={c.id} className="flex items-center gap-4 py-3 border-b border-blush/20 last:border-0">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-rose text-lg flex-shrink-0"
                      style={{ background: c.accent + '60' }}>{c.icon}</div>
                    <div>
                      <p className="font-poppins text-sm font-semibold text-stone">{c.title}</p>
                      <p className="font-poppins text-xs text-stone-light">{c.services.length} services available</p>
                    </div>
                    <span className="ml-auto text-rose/30 text-sm">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceStickyNav sections={NAV_SECTIONS} />

      {/* BRANDS BAR */}
      <div className="bg-rose py-5 overflow-hidden">
        <div className="flex gap-10 items-center justify-center flex-wrap px-6">
          <span className="font-poppins text-[10px] tracking-[0.3em] uppercase text-white/50 font-semibold">Products We Use</span>
          {BRANDS.map(b => (
            <span key={b} className="font-playfair text-sm text-white/80 italic">{b}</span>
          ))}
        </div>
      </div>

      {/* SERVICE CATEGORIES */}
      <section id="services" className="max-w-7xl mx-auto px-6 md:px-16 py-28">
        <div className="text-center mb-20 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Full Menu</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">What We <em className="text-rose">Offer</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Three comprehensive categories covering every hair need — from your daily style to a complete transformation.
          </p>
        </div>

        <div className="space-y-20">
          {CATEGORIES.map((cat, ci) => (
            <div key={cat.id} className="grid md:grid-cols-5 gap-8 items-start reveal">
              <div className="md:col-span-2 rounded-3xl p-8 h-full" style={{ background: cat.accent + '30' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5 text-rose"
                  style={{ background: cat.accent + '80' }}>{cat.icon}</div>
                <p className="font-poppins label-caps text-rose mb-2">Category {cat.id}</p>
                <h3 className="font-playfair text-3xl font-bold text-stone mb-4">{cat.title}</h3>
                <p className="font-poppins text-sm text-stone-light leading-relaxed">{cat.desc}</p>
              </div>
              <div className="md:col-span-3 grid sm:grid-cols-2 gap-4">
                {cat.services.map((s, si) => (
                  <div key={s.name}
                    className={`reveal reveal-d${Math.min(si + 1, 6)} card-lift bg-white rounded-2xl p-5 border border-blush/20 group`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-poppins text-sm font-semibold text-stone group-hover:text-rose transition-colors">{s.name}</h4>
                      <span className="text-rose/30 group-hover:text-rose text-xs transition-colors">✦</span>
                    </div>
                    {/* text-sm (was text-xs) — key readability fix */}
                    <p className="font-poppins text-sm text-stone-light leading-relaxed">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="color" className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16 reveal">
            <h2 className="font-playfair text-4xl font-bold text-stone mb-3">How It <em className="text-rose">Works</em></h2>
            <p className="font-poppins text-stone-light text-base">Four simple steps to salon-quality hair at home.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <div key={p.step}
                className={`reveal reveal-d${i + 1} card-lift bg-white rounded-3xl p-7 border border-blush/20 relative`}>
                <span className="font-playfair text-5xl font-bold text-rose/10 absolute top-5 right-6">{p.step}</span>
                <p className="font-playfair text-4xl font-bold text-rose mb-4">{p.step}</p>
                <h3 className="font-poppins text-sm font-semibold text-stone mb-2">{p.title}</h3>
                <p className="font-poppins text-sm text-stone-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — animated accordion */}
      <section id="treatments" className="max-w-4xl mx-auto px-6 md:px-16 py-28">
        <div className="text-center mb-14 reveal">
          <h2 className="font-playfair text-4xl font-bold text-stone mb-3">Common <em className="text-rose">Questions</em></h2>
          <p className="font-poppins text-stone-light text-base">Everything you need to know before your hair session.</p>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => <FaqItem key={f.q} faq={f} index={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden reveal">
          <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#EFCCD4' }} />
          <div aria-hidden className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-10" style={{ background: '#C4768A' }} />
          <p className="font-poppins label-caps text-rose-light mb-4 relative z-10">Ready to Glow?</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">
            Book Your Hair <em className="text-blush">Session Today</em>
          </h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">
            Our certified hair artists are ready to come to you — fully equipped, on your schedule.
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