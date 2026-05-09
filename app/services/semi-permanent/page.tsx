'use client'
import React from 'react'
import Link from 'next/link'

const BREADCRUMB = [{ href: '/', label: 'Home' }, { href: '/#services', label: 'Services' }, { label: 'Semi-Permanent' }]

const MICRONEEDLING = [
  { area: 'Eyebrows', technique: 'Nano needle hair strokes or powder/ombre fill', result: 'Defined, naturally full brows; hair-stroke or soft-filled look', accent: '#EFCCD4' },
  { area: 'Lips', technique: 'Full lip blush or liner-only infusion', result: 'Enhanced lip color, improved lip definition and symmetry', accent: '#F0D8E8' },
  { area: 'Eyeliners', technique: 'Upper, lower, or both lash line pigmentation', result: 'Defined lash line without daily liner application', accent: '#E8D8F0' },
  { area: 'Face (Skin)', technique: 'Skin tone correction, scar camouflage, under-eye neutralizing', result: 'Reduced visibility of scars, dark circles, vitiligo patches', accent: '#F5E0D0' },
]

const MICROBLADING_TECHNIQUES = [
  {
    name: 'Natural Microblading',
    desc: 'Fine, realistic hair strokes following natural brow direction for a completely lifelike result.',
    best: 'Sparse to moderately thin brows; natural look seekers',
    accent: '#EFCCD4',
  },
  {
    name: 'Microblading + Shading (Combo)',
    desc: 'Hair strokes at the front with shading/ombre fill toward the tail for depth and definition.',
    best: 'Oily skin types, those wanting more definition and longevity',
    accent: '#F5E0D0',
  },
]

const LONGEVITY = [
  { label: '12 months', sub: 'Minimum results with regular touch-ups', color: '#EFCCD4' },
  { label: '18–24 months', sub: 'Average lifespan with good aftercare', color: '#F0D8E8' },
  { label: '3 years', sub: 'Maximum with optimal skin type and care', color: '#E8D8F0' },
]

const FAQS = [
  { q: 'Does microblading hurt?', a: 'A topical numbing cream is applied before the procedure. Most clients feel mild pressure or scratching — rarely any significant pain.' },
  { q: 'How many sessions does it take?', a: 'Two sessions: the initial procedure and a mandatory touch-up at 4–6 weeks post-procedure. The touch-up perfects the healed result.' },
  { q: 'Who is NOT suitable for microblading?', a: 'Those who are pregnant, breastfeeding, undergoing chemotherapy, have keloid scarring tendencies, or are on blood-thinning medication should avoid SPMU procedures.' },
  { q: 'What is the healing process like?', a: 'Days 1–3: brows appear darker and sharper. Days 4–7: the skin peels and color appears to lighten. After 4–6 weeks: healed color settles to its true shade.' },
  { q: 'Is a patch test required?', a: 'Yes — a patch test and pre-treatment consultation are mandatory for all semi-permanent makeup procedures at DoorStep Diva.' },
  { q: 'How is microneedling different from microblading?', a: 'Microblading uses a manual blade to create hair strokes. Microneedling for cosmetics uses a fine-needle device to implant pigment more deeply for different effects like lip blush, eyeliner, and skin correction.' },
]

const AFTERCARE_STEPS = [
  { day: 'Day 1–3', note: 'Keep brows dry. Apply the provided aftercare balm. Avoid touching or picking.' },
  { day: 'Day 4–7', note: 'Flaking and peeling begins — do NOT pick. Color will appear lighter as the skin heals.' },
  { day: 'Day 7–14', note: 'Itchiness may occur — avoid scratching. Continue applying balm sparingly.' },
  { day: 'Week 4–6', note: 'Return for your mandatory touch-up session to perfect the healed brow color.' },
  { day: 'Ongoing', note: 'Avoid AHA/BHA skincare, retinol, and prolonged sun exposure on treated areas to preserve pigment longevity.' },
]

export default function SemiPermanentPage() {
  // eslint-disable-next-line
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
              <div className="bg-white/60 border border-blush/30 rounded-2xl px-5 py-4 mb-8 flex items-start gap-3">
                <span className="text-rose text-xl">⚠</span>
                <div>
                  <p className="font-poppins text-xs font-semibold text-stone">Patch test & consultation required</p>
                  <p className="font-poppins text-xs text-stone-light">Mandatory for all SPMU procedures before booking.</p>
                </div>
              </div>
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Book SPMU Session
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

      {/* Microneedling */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="mb-14">
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Pigment Infusion Technique</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-4">Microneedling <em>(Permanent Makeup)</em></h2>
          <p className="font-poppins text-stone-light text-sm max-w-2xl leading-relaxed">Fine-needle device that implants pigment precisely into the dermal layer. Offers soft, realistic enhancements with minimal trauma and natural-looking, gradual fading over time.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MICRONEEDLING.map((m) => (
            <div key={m.area} className="rounded-3xl p-7 border border-blush/20 hover:shadow-lg hover:shadow-rose/10 transition-all duration-300 group"
              style={{ background: m.accent + '30' }}>
              <p className="font-poppins text-[10px] tracking-widest uppercase text-rose font-semibold mb-3">Area</p>
              <h3 className="font-playfair text-2xl font-bold text-stone mb-3 group-hover:text-rose transition-colors">{m.area}</h3>
              <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4">{m.technique}</p>
              <div className="bg-white/60 rounded-xl p-3">
                <p className="font-poppins text-[11px] text-stone font-medium">Result: {m.result}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Microblading */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Manual Hair Stroke Technique</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-6">Microblading</h2>
              <p className="font-poppins text-stone-light text-sm leading-relaxed mb-8">
                A manual, hand-tool technique where a fine blade deposits pigment in individual hair-like strokes directly into the skin. The result is hyper-realistic brows that mimic the appearance of natural eyebrow hair — ideal for people with sparse, uneven, or over-plucked brows.
              </p>
              <div className="space-y-5">
                {MICROBLADING_TECHNIQUES.map((t) => (
                  <div key={t.name} className="bg-white rounded-3xl p-7 border border-blush/20">
                    <h3 className="font-poppins text-base font-semibold text-stone mb-2">{t.name}</h3>
                    <p className="font-poppins text-sm text-stone-light leading-relaxed mb-4">{t.desc}</p>
                    <div className="bg-petal rounded-xl px-4 py-2">
                      <p className="font-poppins text-xs text-rose font-medium">Best for: {t.best}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-blush/20 border border-blush/40 rounded-2xl px-5 py-4">
                <p className="font-poppins text-xs text-stone font-semibold">✦ Mandatory Touch-Up Included</p>
                <p className="font-poppins text-xs text-stone-light mt-1">All microblading services include a touch-up session at 4–6 weeks post-procedure to perfect healed results.</p>
              </div>
            </div>

            {/* Aftercare */}
            <div>
              <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Healing Journey</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-8">Aftercare <em>Guide</em></h2>
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
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-6 md:px-16 py-24">
        <div className="text-center mb-14">
          <h2 className="font-playfair text-4xl font-bold text-stone mb-3">Frequently Asked <em className="text-rose">Questions</em></h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {FAQS.map((f) => (
            <div key={f.q} className="bg-white rounded-2xl p-6 border border-blush/20">
              <p className="font-poppins text-sm font-semibold text-stone mb-2">✦ {f.q}</p>
              <p className="font-poppins text-xs text-stone-light leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden">
          <div aria-hidden className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#F0E8D8' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Wake Up Ready</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">Book Your SPMU <em className="text-blush">Consultation</em></h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">Certified SPMU technicians with sterile single-use needles and fade-resistant pigments — at your door.</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer" className="font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full">Book Now on WhatsApp</a>
            <Link href="/#services" className="font-poppins text-sm font-medium px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 rounded-full">View All Services</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
