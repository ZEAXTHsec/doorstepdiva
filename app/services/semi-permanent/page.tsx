'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ServiceStickyNav } from '../../components/ServiceStickyNav'

const NAV_SECTIONS = [
  { id: 'microblading',   label: 'Microblading',   services: ['Natural Brows', 'Combo Brows', 'Touch-Up'] },
  { id: 'microneedling',  label: 'Microneedling',  services: ['Eyebrows', 'Lip Blush', 'Eyeliner', 'Skin Correction'] },
  { id: 'aftercare',      label: 'Aftercare',      services: ['Healing Guide', 'Longevity'] },
]

const BREADCRUMB = [{ href: '/', label: 'Home' }, { href: '/#services', label: 'Services' }, { label: 'Semi-Permanent' }]

// ── Price Data ──────────────────────────────────────────────

interface PricedItem { name: string; price: number; origPrice: number; time: string; desc?: string }

const MICROBLADING: PricedItem[] = [
  { name: 'Natural Microblading — Full', price: 7999, origPrice: 12999, time: '120 mins', desc: 'Fine, realistic hair strokes following natural brow direction. Includes mandatory 4–6 week touch-up session.' },
  { name: 'Microblading + Shading (Combo)', price: 9999, origPrice: 15999, time: '135 mins', desc: 'Hair strokes at the front with ombre/powder fill toward the tail for depth and definition. Includes touch-up.' },
  { name: 'Touch-Up Only (existing clients)', price: 2999, origPrice: 4999, time: '60 mins', desc: 'Annual color boost or refresh for existing SPMU clients. Maintains vibrancy and crispness.' },
]

const MICRONEEDLING: PricedItem[] = [
  { name: 'Eyebrows — Nano / Powder Brows', price: 5999, origPrice: 9999, time: '90 mins', desc: 'Nano-needle hair strokes or soft powder/ombre fill for defined, naturally full brows.' },
  { name: 'Lip Blush', price: 7999, origPrice: 12999, time: '120 mins', desc: 'Full lip blush or liner-only infusion — enhanced color, definition, and symmetry. Includes touch-up.' },
  { name: 'Eyeliner — Upper or Lower', price: 4999, origPrice: 7999, time: '75 mins', desc: 'Subtle lash line pigmentation for defined eyes without daily liner application.' },
  { name: 'Skin Correction / Camouflage', price: 3999, origPrice: 6999, time: '60+ mins', desc: 'Scar camouflage, under-eye neutralizing, vitiligo blending. Price varies by area; starting rate.' },
]

const ADDONS: PricedItem[] = [
  { name: 'Numbing Top-Up', price: 199, origPrice: 299, time: '5 mins', desc: 'Additional numbing application for sensitive clients during longer sessions.' },
  { name: 'Aftercare Kit', price: 349, origPrice: 499, time: '—', desc: 'Complete take-home kit: healing balm, cleansing wipes, aftercare instruction card.' },
]

const LONGEVITY = [
  { label: '12 months', sub: 'Minimum results with regular touch-ups', color: '#EFCCD4' },
  { label: '18–24 months', sub: 'Average lifespan with good aftercare', color: '#F0D8E8' },
  { label: '3 years', sub: 'Maximum with optimal skin type and care', color: '#E8D8F0' },
]

const AFTERCARE_STEPS = [
  { day: 'Day 1–3', note: 'Keep brows dry. Apply the provided aftercare balm. Avoid touching or picking.' },
  { day: 'Day 4–7', note: 'Flaking and peeling begins — do NOT pick. Color will appear lighter as the skin heals.' },
  { day: 'Day 7–14', note: 'Itchiness may occur — avoid scratching. Continue applying balm sparingly.' },
  { day: 'Week 4–6', note: 'Return for your mandatory touch-up session to perfect the healed brow color.' },
  { day: 'Ongoing', note: 'Avoid AHA/BHA skincare, retinol, and prolonged sun exposure on treated areas to preserve pigment longevity.' },
]

const FAQS = [
  { q: 'Does microblading hurt?', a: 'A topical numbing cream is applied before and during the procedure. Most clients feel mild pressure or light scratching — rarely any significant pain. We reapply numbing as needed throughout the session.' },
  { q: 'How many sessions does it take?', a: 'Two sessions are standard: the initial procedure and a mandatory touch-up at 4–6 weeks post-procedure. The touch-up perfects the healed result and is included in the full service price.' },
  { q: 'Who is NOT suitable for microblading?', a: 'SPMU is not recommended if you are pregnant, breastfeeding, undergoing chemotherapy, have keloid scarring tendencies, are on blood-thinning medication, or have active skin conditions in the treatment area. A consultation determines eligibility.' },
  { q: 'What is the healing process like?', a: 'Days 1–3: brows appear darker and sharper. Days 4–7: the skin peels and color appears to lighten significantly — this is normal. After 4–6 weeks: healed color settles to its true, softer shade.' },
  { q: 'Is a patch test required?', a: 'Yes. A patch test and pre-treatment consultation are mandatory for all semi-permanent makeup procedures at DoorStep Diva. No exceptions — this ensures safety and confirms pigment compatibility with your skin.' },
  { q: 'How is microneedling different from microblading?', a: 'Microblading uses a manual blade to create hair strokes. Microneedling uses a fine-needle device to implant pigment more deeply — ideal for lip blush, eyeliner, and skin correction where a different technique is needed.' },
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

export default function SemiPermanentPage() {
  return (
    <div className="bg-petal min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-cream">
        <div aria-hidden className="absolute -right-40 -top-20 w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #F0E8D8 0%, transparent 70%)' }} />

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
                <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Division 05</span>
              </div>
              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-stone leading-[1.05] mb-4">
                Semi-Permanent<br /><em className="text-rose">Makeup</em>
              </h1>
              <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-4">Microblading · Microneedling · SPMU</p>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 max-w-lg">
                Long-lasting cosmetic enhancements — defined brows, tinted lips, subtle eyeliners — achieved by implanting fade-resistant pigment into the skin. Results last 12 months to 3 years.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Microblading', 'Combo Brows', 'Lip Blush', 'Nano Liner', 'Skin Correction'].map(t => (
                  <span key={t} className="bg-white border border-blush/40 font-poppins text-xs text-stone-light px-4 py-2 rounded-full font-medium">{t}</span>
                ))}
              </div>
              <div className="bg-rose/10 border border-rose/20 rounded-2xl px-5 py-4 mb-6 flex items-start gap-3">
                <span className="text-rose text-lg flex-shrink-0">⚠</span>
                <div>
                  <p className="font-poppins text-xs font-semibold text-rose">Patch Test & Consultation Required</p>
                  <p className="font-poppins text-xs text-stone-light mt-0.5">A patch test and pre-treatment consultation are <strong>mandatory</strong> for all SPMU procedures — no exceptions. This ensures safety and confirms pigment compatibility.</p>
                </div>
              </div>
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                <WAIcon size={16} />
                Book SPMU Consultation
              </a>
            </div>

            <div className="hidden md:flex flex-col gap-4" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              <div className="relative rounded-3xl overflow-hidden h-64 shadow-xl shadow-rose/10">
                <img src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Semi_permanent_qm0uif.png" alt="Semi-Permanent Makeup" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="font-poppins text-xs font-semibold text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">Results last 1–3 Years</span>
                </div>
              </div>
              <div className="space-y-3">
                {LONGEVITY.map(l => (
                  <div key={l.label} className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-blush/20">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: l.color }}>
                      <span className="font-playfair text-sm font-bold text-stone">{l.label.split(' ')[0]}</span>
                    </div>
                    <div>
                      <p className="font-poppins text-sm font-semibold text-stone">{l.label}</p>
                      <p className="font-poppins text-xs text-stone-light">{l.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceStickyNav sections={NAV_SECTIONS} />

      {/* ── IMPORTANT CALLOUTS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-20">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Patch Test Callout */}
          <div className="reveal bg-rose/8 border-2 border-rose/20 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">⚠️</span>
              <div>
                <h3 className="font-poppins text-sm font-bold text-rose mb-2">Mandatory Patch Test</h3>
                <p className="font-poppins text-xs text-stone-light leading-relaxed">
                  A patch test is required at least <strong>48 hours before</strong> your first SPMU procedure. We test the pigment on a small area behind your ear to check for any allergic reaction. This is non-negotiable — your safety comes first.
                </p>
              </div>
            </div>
          </div>

          {/* Non-Suitable Callout */}
          <div className="reveal reveal-d1 bg-stone/5 border-2 border-stone/15 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">🚫</span>
              <div>
                <h3 className="font-poppins text-sm font-bold text-stone mb-2">Who Should Not Get SPMU</h3>
                <p className="font-poppins text-xs text-stone-light leading-relaxed">
                  SPMU is <strong>not suitable</strong> if you are pregnant, breastfeeding, undergoing chemotherapy, have keloid scarring tendencies, are on blood-thinning medication, or have active skin conditions (eczema, psoriasis) in the treatment area. When in doubt, consult your doctor first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MICROBLADING ── */}
      <section id="microblading" className="max-w-7xl mx-auto px-6 md:px-16 pt-24">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Manual Hair Stroke Technique</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Microblading</h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            A manual hand-tool technique where a fine blade deposits pigment in individual hair-like strokes. Hyper-realistic brows that mimic natural eyebrow hair.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-blush/20 bg-white shadow-sm reveal max-w-5xl mx-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-rose/5">
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Service</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider hidden sm:table-cell">Description</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Time</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {MICROBLADING.map((m, i) => (
                <tr key={m.name} className={`border-t border-blush/10 hover:bg-petal/30 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-cream/30'}`}>
                  <td className="px-6 py-4 font-poppins text-sm font-semibold text-stone">
                    {m.name}
                    {i < 2 && <span className="ml-2 font-poppins text-[10px] font-semibold text-rose bg-rose/5 px-2 py-0.5 rounded-full">Incl. touch-up</span>}
                  </td>
                  <td className="px-6 py-4 font-poppins text-xs text-stone-light hidden sm:table-cell">{m.desc}</td>
                  <td className="px-6 py-4 font-poppins text-xs text-stone-light whitespace-nowrap">{m.time}</td>
                  <td className="px-6 py-4 text-right"><PriceTag price={m.price} origPrice={m.origPrice} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="max-w-3xl mx-auto mt-8 reveal">
          <div className="bg-blush/20 border border-blush/40 rounded-2xl px-6 py-5 text-center">
            <p className="font-poppins text-xs text-stone font-semibold">✦ Mandatory Touch-Up Included</p>
            <p className="font-poppins text-xs text-stone-light mt-1">All microblading full services include a touch-up session at 4–6 weeks post-procedure to perfect healed results.</p>
          </div>
        </div>
      </section>

      {/* ── MICRONEEDLING ── */}
      <section id="microneedling" className="max-w-7xl mx-auto px-6 md:px-16 pt-28">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Pigment Infusion Technique</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Microneedling <em className="text-rose">(Permanent Makeup)</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Fine-needle device that implants pigment precisely into the dermal layer. Soft, realistic enhancements with minimal trauma and natural-looking, gradual fading over time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {MICRONEEDLING.map((m, i) => (
            <div key={m.name} className={`reveal reveal-d${Math.min(i + 1, 4)} card-lift bg-white rounded-2xl p-6 border border-blush/20 flex flex-col`}>
              <div className="flex-1">
                <span className="font-playfair text-2xl font-bold text-rose/15">{i + 1}</span>
                <h3 className="font-poppins text-sm font-semibold text-stone mt-3 mb-2">{m.name}</h3>
                <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4">{m.desc}</p>
                <span className="font-poppins text-[11px] text-stone-light/70">{m.time}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-blush/10">
                <PriceTag price={m.price} origPrice={m.origPrice} />
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
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {ADDONS.map((a, i) => (
            <div key={a.name} className={`reveal reveal-d${Math.min(i + 1, 2)} card-lift bg-white rounded-2xl p-5 border border-blush/20 flex items-center justify-between`}>
              <div>
                <h4 className="font-poppins text-sm font-semibold text-stone mb-1">{a.name}</h4>
                <p className="font-poppins text-xs text-stone-light">{a.desc}</p>
              </div>
              <PriceTag price={a.price} origPrice={a.origPrice} />
            </div>
          ))}
        </div>
      </section>

      {/* Aftercare */}
      <section id="aftercare" className="bg-cream py-24 mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-poppins label-caps text-rose mb-3">Healing Journey</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-8">Aftercare <em className="text-rose">Guide</em></h2>
              <div className="space-y-4">
                {AFTERCARE_STEPS.map((a, i) => (
                  <div key={a.day} className="flex gap-4 bg-white rounded-2xl p-5 border border-blush/20">
                    <div className="w-16 flex-shrink-0">
                      <p className="font-poppins text-xs font-bold text-rose">{a.day}</p>
                    </div>
                    <p className="font-poppins text-xs text-stone-light leading-relaxed">{a.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-poppins label-caps text-rose mb-3">What to Expect</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-8">Longevity <em className="text-rose">Guide</em></h2>
              <div className="space-y-4">
                {LONGEVITY.map((l, i) => (
                  <div key={l.label} className="flex items-center gap-5 bg-white rounded-2xl p-6 border border-blush/20">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: l.color }}>
                      <span className="font-playfair text-lg font-bold text-stone">{l.label.split(' ')[0]}</span>
                    </div>
                    <div>
                      <p className="font-poppins text-sm font-semibold text-stone">{l.label}</p>
                      <p className="font-poppins text-xs text-stone-light">{l.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-rose/8 border border-rose/15 rounded-2xl p-5 mt-6">
                <p className="font-poppins text-xs text-stone-light leading-relaxed">
                  <strong className="text-rose">Pro tip:</strong> Sun exposure is the #1 cause of premature pigment fading. Always apply SPF 50 on treated areas once fully healed. Avoid retinol, AHA/BHA products directly on or near SPMU areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 md:px-16 py-28">
        <div className="text-center mb-14 reveal">
          <h2 className="font-playfair text-4xl font-bold text-stone mb-3">Frequently Asked <em className="text-rose">Questions</em></h2>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => <FaqItem key={f.q} faq={f} index={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden reveal">
          <div aria-hidden className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#F0E8D8' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Wake Up Ready</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">Book Your SPMU <em className="text-blush">Consultation</em></h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">Certified SPMU technicians with sterile single-use needles and fade-resistant pigments — at your door.</p>
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
