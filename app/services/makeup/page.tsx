'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ServiceStickyNav } from '../../components/ServiceStickyNav'
import AddToCartButton from '@/app/components/AddToCartButton'

const NAV_SECTIONS = [
  { id: 'party',       label: 'Party',        services: ['Natural Glam', 'Full Glam', 'Cocktail Glam', 'Festive Look'] },
  { id: 'engagement',  label: 'Engagement',    services: ['Engagement Look', 'Engagement Trial'] },
  { id: 'bridal',      label: 'Bridal',        services: ['Bridal Trial', 'Mehendi/Haldi', 'Sangeet', 'Wedding Day', 'Reception', 'Bridesmaid', 'Family'] },
  { id: 'draping',     label: 'Saree Draping', services: ['Basic Draping', 'Bridal Draping', 'Lehenga Styling'] },
  { id: 'packages',    label: 'Packages',      services: ['Bridal + 2', 'Bridal + 4'] },
]

const BREADCRUMB = [{ href: '/', label: 'Home' }, { href: '/#services', label: 'Services' }, { label: 'Makeup' }]

const BRANDS = ['MAC', 'Charlotte Tilbury', 'NARS', 'Huda Beauty', 'Kryolan']

// ── Price Data ──────────────────────────────────────────────

interface PricedItem { name: string; price: number; origPrice: number; time: string; desc?: string }

const PARTY_LOOKS: PricedItem[] = [
  { name: 'Natural Party Glam', price: 1499, origPrice: 2499, time: '45 mins', desc: 'Subtle glow, defined brows, soft lip — fresh and polished for daytime events.' },
  { name: 'Full Party Glam', price: 2499, origPrice: 3999, time: '60 mins', desc: 'Contoured, bold eye, highlight — statement look for evening parties.' },
  { name: 'Cocktail / Club Glam', price: 2999, origPrice: 4499, time: '60 mins', desc: 'Dramatic eye or bold lip, luminous base — night-ready and camera-flawless.' },
  { name: 'Festive / Ethnic Look', price: 2199, origPrice: 3499, time: '60 mins', desc: 'Traditional makeup for cultural occasions, festivals, and family gatherings.' },
]

const ENGAGEMENT: PricedItem[] = [
  { name: 'Engagement Look', price: 4999, origPrice: 7999, time: '90 mins', desc: 'Full engagement ceremony makeup — airbrush/HD base, outfit coordination with lehenga or saree, 8–10 hour wear.' },
  { name: 'Engagement Trial', price: 1999, origPrice: 2999, time: '60 mins', desc: 'Pre-engagement rehearsal to finalize the look, test product longevity, and make adjustments.' },
]

const BRIDAL: PricedItem[] = [
  { name: 'Bridal Trial Makeup', price: 2499, origPrice: 3999, time: '90 mins', desc: 'Full pre-wedding rehearsal to finalize the bridal look, test products, and lock in every detail.' },
  { name: 'Mehendi / Haldi Look', price: 2999, origPrice: 4999, time: '60 mins', desc: 'Light, natural, glow-forward makeup — protects skin before final events. Fresh and breathable.' },
  { name: 'Sangeet Makeup', price: 4999, origPrice: 7499, time: '90 mins', desc: 'Bold, vibrant, dance-ready glam — expressive, energetic, and built to last through the night.' },
  { name: 'Wedding Day Bridal', price: 8999, origPrice: 14999, time: '120 mins', desc: 'Full bridal look — HD/airbrush base, editorial eye, defined bridal finish. Includes hairstyling coordination.' },
  { name: 'Reception Makeup', price: 7499, origPrice: 11999, time: '90 mins', desc: 'Elevated evening look — the bride as the center of the room. Often more glamorous.' },
  { name: 'Bridesmaid Makeup', price: 2499, origPrice: 3999, time: '60 mins', desc: 'Complementary looks for the bridal party that photograph cohesively alongside the bride.' },
  { name: 'Family Makeup', price: 1999, origPrice: 2999, time: '45 mins', desc: 'Light, appropriate makeup for mothers, aunts, and family members attending ceremonies.' },
]

const SAREE_DRAPING: PricedItem[] = [
  { name: 'Basic Saree Draping', price: 499, origPrice: 799, time: '20 mins', desc: 'Clean, classic drape — Nivi, Bengali, or Gujarati style as preferred.' },
  { name: 'Bridal Saree Draping', price: 999, origPrice: 1599, time: '30 mins', desc: 'Elaborate bridal drape with precise pleating, pinning, and veil setup.' },
  { name: 'Lehenga Styling', price: 699, origPrice: 999, time: '25 mins', desc: 'Lehenga setup with dupatta draping — multiple styles available.' },
]

const GROUP_PACKAGES: PricedItem[] = [
  { name: 'Bridal + 2 Bridesmaids', price: 12999, origPrice: 19999, time: '180 mins', desc: 'Full wedding day bridal + complementary makeup for two bridesmaids. Coordinated looks.' },
  { name: 'Bridal + 4 Bridesmaids', price: 16999, origPrice: 26999, time: '240 mins', desc: 'Full bridal + four bridesmaids. Cohesive party aesthetic with individual touches.' },
]

const ADDONS: PricedItem[] = [
  { name: 'False Lashes', price: 299, origPrice: 499, time: '5 mins', desc: 'Premium strip or individual lashes for added drama' },
  { name: 'Airbrush Base Upgrade', price: 999, origPrice: 1499, time: '10 mins', desc: 'Switch from HD foundation to airbrush for an ultra-flawless, lightweight finish' },
  { name: 'Hair Styling Add-on', price: 799, origPrice: 1299, time: '30 mins', desc: 'Add an updo, curls, or sleek style to any makeup service' },
  { name: 'Touch-Up Kit', price: 349, origPrice: 599, time: '—', desc: 'Take-home mini kit: blotting papers, lip color, compact powder for touch-ups' },
]

const WHY = [
  { title: 'Pre-Event Consultation', desc: 'Look planning coordinated with your outfit, jewelry, and event aesthetic before a single brush is picked up.' },
  { title: 'HD & Airbrush Options', desc: 'Camera-ready, full-coverage base using airbrush or HD foundation techniques suited for photography and video.' },
  { title: 'Long-Wear Formulation', desc: 'All products selected for extended wear — 8 to 12+ hours without touch-ups. Bridal looks built to last the whole day.' },
  { title: 'Professional Brands Only', desc: 'We use MAC, Charlotte Tilbury, NARS, Huda Beauty, and Kryolan — professional, long-wear, and cruelty-free.' },
]

const FAQS = [
  { q: 'Do I need a trial before my wedding?', a: 'Strongly recommended. A trial lets us test products on your skin, finalize the look, and coordinate with your outfit and jewelry — so there are zero surprises on the wedding day.' },
  { q: 'How long does bridal makeup take?', a: 'Wedding day bridal takes about 2 hours. Mehendi/Haldi and Sangeet looks take 60–90 mins. We factor in buffer time so nothing feels rushed.' },
  { q: 'Do you travel outside Delhi NCR?', a: 'We primarily serve Delhi NCR, Lucknow, and Ayodhya. For destination weddings, please WhatsApp us at least 2 weeks in advance to confirm availability and travel arrangements.' },
  { q: 'Can you do makeup for the whole bridal party?', a: 'Yes. We can bring additional artists for larger parties. Our group packages cover bridal + bridesmaids, and we can scale up for family members too. WhatsApp us with your headcount for a custom quote.' },
  { q: 'What products do you use?', a: 'MAC, Charlotte Tilbury, NARS, Huda Beauty, and Kryolan. All are professional-grade, long-wear, and cruelty-free. We choose specific formulations based on your skin type and the event lighting.' },
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
                {['Party Glam', 'Engagement', 'Bridal', 'Saree Draping'].map(t => (
                  <span key={t} className="bg-white border border-blush/40 font-poppins text-xs text-stone-light px-4 py-2 rounded-full font-medium">{t}</span>
                ))}
              </div>
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-3 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors duration-300 rounded-full shadow-lg shadow-rose/20">
                <WAIcon size={16} />
                Book Makeup Artist
              </a>
            </div>

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
            </div>
          </div>
        </div>
      </section>

      <ServiceStickyNav sections={NAV_SECTIONS} />

      {/* ── PARTY MAKEUP ── */}
      <section id="party" className="max-w-7xl mx-auto px-6 md:px-16 pt-28">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Casual & Social</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Party <em className="text-rose">Makeup</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Glam-ready makeup for social events, nights out, birthdays, and celebrations — from natural dewy looks to bold full-glam finishes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {PARTY_LOOKS.map((p, i) => (
            <div key={p.name} className={`reveal reveal-d${Math.min(i + 1, 4)} card-lift bg-white rounded-2xl p-6 border border-blush/20 flex flex-col`}>
              <div className="flex-1">
                <span className="font-playfair text-3xl text-rose/15 font-bold">{i + 1}</span>
                <h3 className="font-poppins text-sm font-semibold text-stone mt-3 mb-2">{p.name}</h3>
                <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4">{p.desc}</p>
                <span className="font-poppins text-[11px] text-stone-light/70">{p.time}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-blush/10">
                <PriceTag price={p.price} origPrice={p.origPrice} />
                <AddToCartButton variant="inline" id={p.name} name={p.name} price={p.price} duration={p.time || ''} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Makeup" href="/book" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ENGAGEMENT MAKEUP ── */}
      <section id="engagement" className="max-w-7xl mx-auto px-6 md:px-16 pt-24">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Milestone Ceremony</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Engagement <em className="text-rose">Makeup</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Designed for the engagement ceremony — a look that photographs beautifully, transitions from indoor mandap to outdoor light, and holds through a full day of celebration.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ENGAGEMENT.map((e, i) => (
            <div key={e.name} className={`reveal reveal-d${Math.min(i + 1, 2)} card-lift bg-white rounded-2xl p-8 border border-blush/20 ${i === 0 ? 'ring-1 ring-rose/20' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  {i === 0 && <span className="font-poppins text-[10px] font-semibold text-rose uppercase tracking-widest bg-rose/5 px-3 py-1 rounded-full mb-3 inline-block">Most Booked</span>}
                  <h3 className="font-playfair text-xl font-bold text-stone mt-2">{e.name}</h3>
                </div>
                <span className="font-poppins text-xs text-stone-light/70 whitespace-nowrap">{e.time}</span>
              </div>
              <p className="font-poppins text-sm text-stone-light leading-relaxed mb-6">{e.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-blush/10">
                <PriceTag price={e.price} origPrice={e.origPrice} />
                <AddToCartButton variant="inline" id={e.name} name={e.name} price={e.price} duration={e.time || ''} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Makeup" href="/book" />
                <span className="font-poppins text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Save ₹{e.origPrice - e.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp-only note */}
        <div className="max-w-2xl mx-auto mt-10 reveal">
          <div className="bg-rose/5 border border-rose/15 rounded-2xl p-5 text-center">
            <p className="font-poppins text-xs text-stone-light leading-relaxed">
              <span className="font-semibold text-rose">Bridal & engagement bookings are WhatsApp-only —</span> we require a brief consultation call to understand your outfit, event timeline, skin type, and preferences before confirming. This ensures we bring the right products and arrive fully prepared.{' '}
              <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer" className="text-rose underline font-semibold">Message us now →</a>
            </p>
          </div>
        </div>
      </section>

      {/* ── BRIDAL ── */}
      <section id="bridal" className="max-w-7xl mx-auto px-6 md:px-16 pt-28">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">The Ultimate Experience</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Bridal <em className="text-rose">& Reception</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Our bridal package covers the full wedding journey — from the intimate haldi ceremony to the grand reception night.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-blush/20 bg-white shadow-sm reveal max-w-6xl mx-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-rose/5">
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Service</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider hidden sm:table-cell">Description</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Time</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {BRIDAL.map((b, i) => (
                <tr key={b.name} className={`border-t border-blush/10 hover:bg-petal/30 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-cream/30'}`}>
                  <td className="px-6 py-4 font-poppins text-sm font-semibold text-stone">
                    {b.name}
                    {i === 3 && <span className="ml-2 font-poppins text-[10px] font-semibold text-rose bg-rose/5 px-2 py-0.5 rounded-full">Featured</span>}
                  </td>
                  <td className="px-6 py-4 font-poppins text-xs text-stone-light hidden sm:table-cell">{b.desc}</td>
                  <td className="px-6 py-4 font-poppins text-xs text-stone-light whitespace-nowrap">{b.time}</td>
                  <td className="px-6 py-4 text-right"><PriceTag price={b.price} origPrice={b.origPrice} /><AddToCartButton variant="inline" id={b.name} name={b.name} price={b.price} duration={b.time || ''} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Makeup" href="/book" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── SAREE DRAPING ── */}
      <section id="draping" className="max-w-7xl mx-auto px-6 md:px-16 pt-24">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Finishing Touch</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Saree Draping <em className="text-rose">& Styling</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Expert draping for any occasion — from a clean everyday drape to elaborate bridal styling with precise pleating and pinning.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {SAREE_DRAPING.map((s, i) => (
            <div key={s.name} className={`reveal reveal-d${Math.min(i + 1, 3)} card-lift bg-white rounded-2xl p-6 border border-blush/20 text-center`}>
              <span className="font-playfair text-3xl font-bold text-rose/15">
                {i === 0 ? '✦' : i === 1 ? '◈' : '✿'}
              </span>
              <h3 className="font-poppins text-sm font-semibold text-stone mt-3 mb-2">{s.name}</h3>
              <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4">{s.desc}</p>
              <div className="pt-4 border-t border-blush/10">
                <div className="flex items-center justify-between">
                  <span className="font-poppins text-[11px] text-stone-light/70">{s.time}</span>
                  <PriceTag price={s.price} origPrice={s.origPrice} />
                  <AddToCartButton variant="inline" id={s.name} name={s.name} price={s.price} duration={s.time || ''} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Makeup" href="/book" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GROUP PACKAGES ── */}
      <section id="packages" className="max-w-7xl mx-auto px-6 md:px-16 pt-24">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Best Value</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Group <em className="text-rose">Packages</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Complete bridal party coverage — coordinated looks for the bride and her crew. Custom headcounts available on request.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {GROUP_PACKAGES.map((g, i) => (
            <div key={g.name} className={`reveal reveal-d${Math.min(i + 1, 2)} card-lift bg-white rounded-2xl p-8 border border-blush/20`}>
              <div className="w-12 h-12 rounded-2xl bg-rose/8 flex items-center justify-center text-rose text-lg font-bold mb-5">
                {i + 1}
              </div>
              <h3 className="font-playfair text-lg font-bold text-stone mb-3">{g.name}</h3>
              <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4">{g.desc}</p>
              <span className="font-poppins text-[11px] text-stone-light/70 block mb-4">{g.time}</span>
              <div className="pt-4 border-t border-blush/10 flex items-center justify-between">
                <PriceTag price={g.price} origPrice={g.origPrice} />
                <AddToCartButton variant="inline" id={g.name} name={g.name} price={g.price} duration={g.time || ''} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Makeup" href="/book" />
                <span className="font-poppins text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Save ₹{g.origPrice - g.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-8 reveal">
          <div className="bg-cream rounded-2xl p-5 border border-blush/15 text-center">
            <p className="font-poppins text-xs text-stone-light leading-relaxed">
              <span className="font-semibold text-stone">Larger bridal party?</span> WhatsApp us with your headcount, event date, and venue for a custom group quote. We can bring additional artists as needed.
            </p>
          </div>
        </div>
      </section>

      {/* ── ADD-ONS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-24">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-3">Enhance Your Look</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-3">Add-On <em className="text-rose">Extras</em></h2>
          <p className="font-poppins text-stone-light text-sm max-w-lg mx-auto">Level up any makeup service with these add-ons.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {ADDONS.map((a, i) => (
            <div key={a.name} className={`reveal reveal-d${Math.min(i + 1, 4)} card-lift bg-white rounded-2xl p-5 border border-blush/20 text-center`}>
              <span className="font-poppins text-[10px] font-semibold text-rose-light uppercase tracking-wider block mb-2">{a.time}</span>
              <h4 className="font-poppins text-sm font-semibold text-stone mb-2">{a.name}</h4>
              <p className="font-poppins text-[11px] text-stone-light mb-3">{a.desc}</p>
              <PriceTag price={a.price} origPrice={a.origPrice} />
              <AddToCartButton variant="inline" id={a.name} name={a.name} price={a.price} duration={a.time || ''} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Makeup" href="/book" />
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-cream py-24 mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-14 reveal">
            <h2 className="font-playfair text-4xl font-bold text-stone mb-3">Why Our <em className="text-rose">Artists</em></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w, i) => (
              <div key={w.title} className={`reveal reveal-d${Math.min(i + 1, 4)} bg-white rounded-3xl p-7 border border-blush/20`}>
                <div className="w-10 h-10 rounded-2xl bg-rose/10 flex items-center justify-center text-rose text-lg mb-5">✦</div>
                <h3 className="font-poppins text-sm font-semibold text-stone mb-3">{w.title}</h3>
                <p className="font-poppins text-xs text-stone-light leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 md:px-16 py-28">
        <div className="text-center mb-14 reveal">
          <h2 className="font-playfair text-4xl font-bold text-stone mb-3">Common <em className="text-rose">Questions</em></h2>
          <p className="font-poppins text-stone-light text-base">Everything you need to know before your makeup session.</p>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => <FaqItem key={f.q} faq={f} index={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto bg-stone rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden reveal">
          <div aria-hidden className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ background: '#F0D8E8' }} />
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-rose-light font-semibold mb-4 relative z-10">Your Day, Your Look</p>
          <h2 className="font-playfair text-5xl font-bold text-white mb-6 relative z-10">Book Your Makeup <em className="text-blush">Artist Today</em></h2>
          <p className="font-poppins text-white/50 text-base max-w-lg mx-auto mb-10 relative z-10">From a quick party glam to a full bridal experience — our certified artists come to you, fully equipped.</p>
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

export default function MakeupPage() {
  return <MakeupContent />
}
