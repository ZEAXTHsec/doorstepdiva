'use client'
import React from 'react'
import Link from 'next/link'

const BREADCRUMB = [{ href: '/', label: 'Home' }, { href: '/#services', label: 'Services' }, { label: 'Eyelash' }]

const EXTENSION_TYPES = [
  {
    id: '1:1',
    name: 'Classic Extensions',
    label: 'One extension per natural lash',
    accent: '#EFCCD4',
    desc: 'One extension applied to each natural lash. Creates a clean, natural-looking enhancement — like wearing mascara, but better. Perfect for beginners and those who prefer a subtle, defined lash line.',
    features: ['Natural, mascara-like finish', 'Lightweight and comfortable', 'Best for fine to medium natural lashes', 'Available in matte or glossy finish'],
    ideal: 'First-time lash clients, natural look preference',
  },
  {
    id: '70/30',
    name: 'Hybrid Extensions',
    label: 'Classic + Volume blend',
    accent: '#F0D8E8',
    desc: 'A 70/30 or 80/20 blend of classic singles and volume fans strategically placed across the lash line. Creates dimension, texture, and a wispy, fuller look — the perfect middle ground between natural and dramatic.',
    features: ['Textured, wispy appearance', 'More fullness than classic without full volume density', 'Ideal for uneven or sparse natural lashes'],
    ideal: 'Those wanting more than classic without going full glam',
  },
  {
    id: '2D–6D',
    name: 'Volume Extensions',
    label: 'Multiple ultra-fine fans per lash',
    accent: '#E8D8F0',
    desc: 'Multiple ultra-fine extensions hand-crafted into fans and applied to each natural lash. Creates a soft, fluffy, high-density look that still feels lightweight. Available in 2D to 6D volume levels.',
    features: ['Full, fluffy, dramatically glamorous', 'Ultra-fine individual fibers — not heavy', 'Customizable density from soft to bold', 'Suitable for all natural lash types'],
    ideal: 'Dramatic, camera-ready, high-density looks',
  },
]

const STYLES = [
  {
    name: 'Cat Eye Extensions',
    type: 'Eye Lifting Shape',
    desc: 'Shorter extensions at the inner corners and progressively longer extensions toward the outer corners, creating a swept-up, feline elongation effect.',
    features: ['Elongates and lifts the eye shape', 'Flattering for round, almond, and monolid eyes', 'Achievable in classic, hybrid, or volume'],
    accent: '#F5E0D0',
  },
  {
    name: 'Foxy Extensions',
    type: 'Wispy Drama',
    desc: 'Advanced mapping style creating a sharp, pointed outer corner with mixed-length spikes and fans for a bold, editorial, and intensely dramatic lash effect.',
    features: ['Spiked, textured, high-fashion finish', 'Asymmetric or exaggerated outer flicks', 'Perfect for bold personalities and photoshoots'],
    accent: '#F0D8E8',
  },
]

const AFTERCARE = [
  'Avoid oil-based products near the lash line — oil breaks down the adhesive bond.',
  'No steam or sauna for 24–48 hours post-application to allow adhesive to fully cure.',
  'Do not sleep face-down — pressure can bend or misalign extensions.',
  'Brush your lashes gently daily with a clean spoolie to maintain shape.',
  'Book fills every 2–3 weeks to maintain fullness and density.',
  'Never pull or pick at extensions — this causes natural lash damage.',
]

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
            {/* Left col */}
            <div style={{ animation: 'fadeUp .8s ease both' }}>
              <div className="inline-flex items-center gap-2 bg-blush/50 text-rose px-4 py-2 rounded-full mb-6">
                <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Division 04</span>
              </div>
              <h1 className="font-playfair text-6xl md:text-7xl font-bold text-stone leading-[1.05] mb-4">
                Eyelash<br /><em className="text-rose">Extensions</em>
              </h1>
              <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-4">Classic · Hybrid · Volume</p>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 max-w-lg">
                Full lash artistry from single-lash classic application to dramatic volume fans. Applied using medical-grade adhesive by certified lash technicians.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Classic', 'Hybrid', 'Volume 2D–6D', 'Cat Eye', 'Foxy'].map(t => (
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
                className="inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Book Lash Session
              </a>
            </div>{/* end left col */}

            {/* Right col */}
            <div className="hidden md:flex flex-col gap-4" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              <div className="relative rounded-3xl overflow-hidden h-64 shadow-xl shadow-rose/10">
                <img src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png" alt="Eyelash Extensions" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="font-poppins text-xs font-semibold text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">Medical-Grade Adhesive</span>
                </div>
              </div>
              <div className="space-y-3">
                {EXTENSION_TYPES.map(e => (
                  <div key={e.name} className="bg-white rounded-2xl p-4 border border-blush/20 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center text-xs font-poppins font-bold text-rose"
                      style={{ background: e.accent + '80' }}>{e.id}</div>
                    <div>
                      <p className="font-poppins text-sm font-semibold text-stone">{e.name}</p>
                      <p className="font-poppins text-xs text-stone-light">{e.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>{/* end right col */}

          </div>{/* end grid */}
        </div>{/* end max-w-7xl */}
      </section>{/* end Hero */}

      {/* Extension types */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="text-center mb-16">
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Extension Techniques</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-4">Choose Your <em>Style</em></h2>
          <p className="font-poppins text-stone-light text-sm max-w-xl mx-auto">Three application techniques — each creating a distinctly different look, all applied with the same certified precision.</p>
        </div>
        <div className="space-y-8">
          {EXTENSION_TYPES.map((ext, i) => (
            <div key={ext.name} className={`grid md:grid-cols-5 gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:col-span-2 rounded-3xl p-8" style={{ background: ext.accent + '40' }}>
                <span className="font-poppins text-xs tracking-widest uppercase text-rose font-semibold block mb-2">{ext.label}</span>
                <h3 className="font-playfair text-3xl font-bold text-stone mb-4">{ext.name}</h3>
                <p className="font-poppins text-sm text-stone-light leading-relaxed mb-4">{ext.desc}</p>
                <p className="font-poppins text-xs text-rose font-medium">Ideal for: {ext.ideal}</p>
              </div>
              <div className="md:col-span-3 grid sm:grid-cols-2 gap-4">
                {ext.features.map(f => (
                  <div key={f} className="bg-white rounded-2xl p-5 border border-blush/20 flex items-start gap-3">
                    <span className="text-rose text-sm flex-shrink-0 mt-0.5">✓</span>
                    <p className="font-poppins text-sm text-stone-light leading-relaxed">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>{/* end Extension types */}

      {/* Styles / Mappings */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="mb-14">
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Advanced Mapping</p>
            <h2 className="font-playfair text-4xl font-bold text-stone">Lash <em>Styles</em></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {STYLES.map((s) => (
              <div key={s.name} className="bg-white rounded-3xl p-8 border border-blush/20">
                <span className="font-poppins text-[10px] tracking-widest uppercase text-rose font-semibold block mb-3">{s.type}</span>
                <h3 className="font-playfair text-2xl font-bold text-stone mb-4">{s.name}</h3>
                <p className="font-poppins text-sm text-stone-light leading-relaxed mb-6">{s.desc}</p>
                <div className="space-y-2">
                  {s.features.map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <span className="text-rose text-xs">✦</span>
                      <p className="font-poppins text-xs text-stone-light">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>{/* end Styles */}

      {/* Aftercare */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Important</p>
            <h2 className="font-playfair text-4xl font-bold text-stone mb-6">Lash <em>Aftercare</em></h2>
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
      </section>{/* end Aftercare */}

      {/* CTA */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden">
          <div aria-hidden className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full opacity-10" style={{ background: '#E8D8F0' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Wake Up Glamorous</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">Book Your Lash <em className="text-blush">Session Today</em></h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">Certified lash technicians, medical-grade adhesive, and the perfect lash map — all at your door.</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer" className="font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full">Book Now on WhatsApp</a>
            <Link href="/#services" className="font-poppins text-sm font-medium px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 rounded-full">View All Services</Link>
          </div>
        </div>
      </section>{/* end CTA */}

    </div>
  )
}

export default function EyelashPage() {
  return <EyelashContent />
}
