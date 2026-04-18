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
              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-stone leading-[1.05] mb-6">
                Semi-Permanent<br /><em className="text-rose">Makeup</em>
              </h1>
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
              <Link href="/#contact" className="inline-block font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                Book SPMU Session →
              </Link>
            </div>

            <div className="hidden md:block" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              <div className="space-y-4">
                {LONGEVITY.map(l => (
                  <div key={l.label} className="flex items-center gap-5 bg-white rounded-2xl p-5 border border-blush/20">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: l.color }}>
                      <span className="font-playfair text-xl font-bold text-stone">{l.label.split(' ')[0]}</span>
                    </div>
                    <div>
                      <p className="font-poppins text-sm font-semibold text-stone">{l.label}</p>
                      <p className="font-poppins text-xs text-stone-light">{l.sub}</p>
                    </div>
                  </div>
                ))}
                <div className="bg-rose rounded-2xl p-5 text-center">
                  <p className="font-poppins text-xs text-white/70 mb-1">Results vary by</p>
                  <p className="font-poppins text-sm font-semibold text-white">Skin type · Aftercare · Sun exposure</p>
                </div>
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
            <Link href="/#contact" className="font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full">Book Now</Link>
            <Link href="/#services" className="font-poppins text-sm font-medium px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 rounded-full">View All Services</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
