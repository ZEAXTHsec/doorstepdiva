'use client'
import React from 'react'
import Link from 'next/link'

const BREADCRUMB = [{ href: '/', label: 'Home' }, { href: '/#services', label: 'Services' }, { label: 'Makeup' }]

const BRANDS = ['MAC', 'Charlotte Tilbury', 'NARS', 'Huda Beauty', 'Kryolan']

const PARTY_LOOKS = [
  { style: 'Natural Party Glam', look: 'Subtle glow, defined brows, soft lip — fresh and polished', accent: '#EFCCD4', icon: '✦' },
  { style: 'Full Party Glam', look: 'Contoured, bold eye, highlight — statement look', accent: '#F0D8E8', icon: '◈' },
  { style: 'Cocktail / Club Glam', look: 'Dramatic eye or bold lip, luminous base — night-ready', accent: '#E8D8F0', icon: '◇' },
  { style: 'Festive / Ethnic Look', look: 'Traditional makeup for cultural occasions and festivals', accent: '#F5E0D0', icon: '✿' },
]

const BRIDAL = [
  { service: 'Bridal Trial Makeup', desc: 'Full pre-wedding rehearsal to finalize the bridal look, test product longevity, and make adjustments.' },
  { service: 'Mehendi / Haldi Look', desc: 'Light, natural, glow-forward makeup for pre-wedding ceremonies — protects skin before final events.' },
  { service: 'Sangeet Makeup', desc: 'Bold, vibrant, dance-ready glam for the sangeet night — expressive and energetic.' },
  { service: 'Wedding Day Bridal', desc: 'Full bridal look — HD/airbrush base, editorial eye, defined bridal finish; includes hairstyling coordination.' },
  { service: 'Reception Makeup', desc: 'Elevated evening look — the bride as the center of the room; often more glamorous than the wedding look.' },
  { service: 'Bridesmaid Makeup', desc: 'Complementary looks for the bridal party that photograph cohesively alongside the bride.' },
  { service: 'Family Makeup', desc: 'Light, appropriate makeup for mothers, aunts, and family members attending ceremonies.' },
]

const WHY = [
  { title: 'Pre-Event Consultation', desc: 'Every session begins with look planning — we coordinate with your outfit, jewelry, and the event aesthetic before a single brush is picked up.' },
  { title: 'HD & Airbrush Options', desc: 'Camera-ready, full-coverage base using airbrush or HD foundation techniques suited for photography and video.' },
  { title: 'Long-Wear Formulation', desc: 'All products are selected for extended wear — 8 to 12+ hours without touch-ups. Bridal looks built to last the whole day.' },
  { title: 'Cruelty-Free Products', desc: 'We use professional, long-wear, and cruelty-free products — MAC, Charlotte Tilbury, NARS, Huda Beauty, and Kryolan only.' },
]

function MakeupContent() {
  return (
    <div className="bg-petal min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-cream">
        <div aria-hidden className="absolute -right-40 -top-20 w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #F0D8E8 0%, transparent 70%)' }} />

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
                <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Division 03</span>
              </div>
              <h1 className="font-playfair text-6xl md:text-7xl font-bold text-stone leading-[1.05] mb-4">
                Makeup<br /><em className="text-rose">Services</em>
              </h1>
              <p className="font-poppins text-rose text-sm font-medium tracking-wider uppercase mb-4">Party · Bridal · Events</p>
              <p className="font-poppins text-stone-light text-base leading-relaxed mb-8 max-w-lg">
                Led by trained makeup artists blending technical precision with an artistic eye. From a polished party look to a full bridal day experience — every application is customized for you.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Party Glam', 'Special Events', 'Engagement', 'Bridal', 'Sangeet', 'Reception'].map(t => (
                  <span key={t} className="bg-white border border-blush/40 font-poppins text-xs text-stone-light px-4 py-2 rounded-full font-medium">{t}</span>
                ))}
              </div>
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Book Makeup Artist
              </a>
            </div>{/* end left col */}

            {/* Right col */}
            <div className="hidden md:flex flex-col gap-4" style={{ animation: 'fadeUp .9s ease .15s both' }}>
              <div className="relative rounded-3xl overflow-hidden h-72 shadow-xl shadow-rose/10">
                <img src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png" alt="Makeup Services" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="font-poppins text-xs font-semibold text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">Bridal Specialists</span>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-md border border-blush/20">
                <p className="font-poppins text-xs tracking-widest uppercase text-rose font-semibold mb-3">Products Used</p>
                <div className="flex flex-wrap gap-2">
                  {BRANDS.map(b => (
                    <span key={b} className="bg-petal border border-blush/30 font-poppins text-xs text-stone-light px-3 py-2 rounded-xl font-medium">{b}</span>
                  ))}
                </div>
              </div>
            </div>{/* end right col */}

          </div>{/* end grid */}
        </div>{/* end max-w-7xl */}
      </section>{/* end Hero */}

      {/* Party Makeup */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="mb-14">
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Casual & Social</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-4">Party <em>Makeup</em></h2>
          <p className="font-poppins text-stone-light text-sm max-w-xl">Glam-ready makeup for social events, nights out, birthdays, and celebrations — from natural dewy looks to bold full-glam finishes.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PARTY_LOOKS.map((p) => (
            <div key={p.style} className="rounded-3xl p-7 border border-blush/20 hover:shadow-lg hover:shadow-rose/10 transition-all duration-300 group"
              style={{ background: p.accent + '30' }}>
              <span className="text-3xl text-rose/40 block mb-5">{p.icon}</span>
              <h3 className="font-playfair text-xl font-bold text-stone mb-3 group-hover:text-rose transition-colors">{p.style}</h3>
              <p className="font-poppins text-xs text-stone-light leading-relaxed">{p.look}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Special Events */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Formal Occasions</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-6">Special Event <em>Makeup</em></h2>
              <p className="font-poppins text-stone-light text-sm leading-relaxed mb-6">Professionally crafted makeup for corporate events, award nights, photoshoots, graduation ceremonies, and other high-profile functions requiring a polished, camera-ready look.</p>
              <div className="space-y-4">
                {[
                  { title: 'Pre-event consultation', sub: 'Look planning aligned with outfit, theme, and event type' },
                  { title: 'HD Photography Base', sub: 'Studio-quality base that performs flawlessly under all lighting' },
                  { title: 'Long-Wear Formula', sub: 'Built for extended event duration — no touch-ups required' },
                  { title: 'Outfit Coordination', sub: 'Makeup designed to complement your outfit and accessories' },
                ].map(f => (
                  <div key={f.title} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-blush/20">
                    <div className="w-5 h-5 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-rose text-xs">✓</span>
                    </div>
                    <div>
                      <p className="font-poppins text-sm font-semibold text-stone">{f.title}</p>
                      <p className="font-poppins text-xs text-stone-light">{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">Milestone Ceremony</p>
              <h2 className="font-playfair text-4xl font-bold text-stone mb-6">Engagement <em>Makeup</em></h2>
              <p className="font-poppins text-stone-light text-sm leading-relaxed mb-6">Designed for the engagement ceremony — a look that photographs beautifully, transitions from indoor mandap to outdoor light, and holds through a full day of photos and celebration.</p>
              <div className="bg-white rounded-3xl p-7 border border-blush/20">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Trial Session', icon: '◈', detail: 'Pre-engagement rehearsal available' },
                    { label: 'Airbrush / HD', icon: '✦', detail: 'Foundation options for your skin type' },
                    { label: 'Outfit Sync', icon: '◇', detail: 'Coordinated with lehenga or saree' },
                    { label: '8–10 hr Wear', icon: '✿', detail: 'Built to last the full ceremony day' },
                  ].map(f => (
                    <div key={f.label} className="bg-petal rounded-2xl p-4">
                      <span className="text-rose text-xl block mb-2">{f.icon}</span>
                      <p className="font-poppins text-xs font-semibold text-stone mb-1">{f.label}</p>
                      <p className="font-poppins text-[11px] text-stone-light">{f.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridal */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
        <div className="text-center mb-16">
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose font-semibold mb-3">The Ultimate Experience</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Bridal & <em>Reception</em></h2>
          <p className="font-poppins text-stone-light text-sm max-w-xl mx-auto">Our bridal package covers the full wedding journey — from the intimate haldi ceremony to the grand reception night. For the bride, the bridal party, and the family.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {BRIDAL.map((b, i) => (
            <div key={b.service} className={`rounded-3xl p-7 border border-blush/20 ${i === 3 ? 'bg-rose text-white lg:col-span-1' : 'bg-white'} hover:shadow-lg hover:shadow-rose/10 transition-all duration-300`}>
              <span className={`font-poppins text-[10px] tracking-widest uppercase font-semibold mb-3 block ${i === 3 ? 'text-white/60' : 'text-rose'}`}>
                0{i + 1}
              </span>
              <h3 className={`font-playfair text-xl font-bold mb-3 ${i === 3 ? 'text-white' : 'text-stone'}`}>{b.service}</h3>
              <p className={`font-poppins text-xs leading-relaxed ${i === 3 ? 'text-white/70' : 'text-stone-light'}`}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-14">
            <h2 className="font-playfair text-4xl font-bold text-stone mb-3">Why Our <em className="text-rose">Artists</em></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w) => (
              <div key={w.title} className="bg-white rounded-3xl p-7 border border-blush/20">
                <div className="w-10 h-10 rounded-2xl bg-rose/10 flex items-center justify-center text-rose text-lg mb-5">✦</div>
                <h3 className="font-poppins text-sm font-semibold text-stone mb-3">{w.title}</h3>
                <p className="font-poppins text-xs text-stone-light leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden">
          <div aria-hidden className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#F0D8E8' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Your Day, Your Look</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">Book Your Makeup <em className="text-blush">Artist Today</em></h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">From a quick party glam to a full bridal experience — our certified artists come to you, fully equipped.</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer" className="font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full">Book Now on WhatsApp</a>
            <Link href="/#services" className="font-poppins text-sm font-medium px-8 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 rounded-full">View All Services</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function MakeupPage() {
  return <MakeupContent />
}
