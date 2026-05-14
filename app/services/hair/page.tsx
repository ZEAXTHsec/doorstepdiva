'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { ServiceStickyNav } from '../../components/ServiceStickyNav'
import AddToCartButton from '@/app/components/AddToCartButton'

const NAV_SECTIONS = [
  { id: 'cuts',        label: 'Haircuts',     services: ['Short Cut', 'Medium Cut', 'Long Cut', 'Feather Cut', 'Step Cut', 'U/V Shape', 'Bob Cut', 'Layer Cut', 'Split Ends'] },
  { id: 'styling',     label: 'Styling',      services: ['Blow Dry', 'Tong Curl', 'Flat Iron', 'Updo / Event Styling'] },
  { id: 'color',       label: 'Color',        services: ['Global Color', 'Root Touch-Up', 'Highlights', 'Balayage', 'Ombre', 'Fashion Color', 'Glossing', 'Henna'] },
  { id: 'treatments',  label: 'Treatments',   services: ['Hair Spa', 'Keratin', 'Smoothening', 'Rebonding', 'Bond Repair', 'Scalp Treatment'] },
  { id: 'packages',    label: 'Packages',     services: ['Root Touchup & Wax', 'Keratin Spa Package', 'Global Package'] },
]

const BREADCRUMB = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { label: 'Hair' },
]

// ── Price Data ──────────────────────────────────────────────

interface PricedItem { name: string; price: number; origPrice: number; time: string; desc?: string }

const HAIRCUTS: PricedItem[] = [
  { name: 'Feather Haircut', price: 549, origPrice: 899, time: '40 mins', desc: 'Soft, feathered layers for natural movement and volume' },
  { name: 'Step Cut', price: 549, origPrice: 899, time: '40 mins', desc: 'Defined stepped layers for structured body and bounce' },
  { name: 'U Shape Haircut', price: 349, origPrice: 699, time: '25 mins', desc: 'Gentle U-shaped back profile with soft face-framing' },
  { name: 'V Shape Haircut', price: 549, origPrice: 899, time: '35 mins', desc: 'Sharp V-point layering for a tapered, elegant silhouette' },
  { name: 'One Length Haircut', price: 549, origPrice: 899, time: '35 mins', desc: 'Clean, blunt, one-length trim with polished finish' },
  { name: 'Front Layer Haircut', price: 399, origPrice: 599, time: '25 mins', desc: 'Face-framing front layers that enhance your features' },
  { name: 'Split Ends Cut', price: 349, origPrice: 549, time: '25 mins', desc: 'Precision dusting to remove damaged ends, retain length' },
  { name: 'Bob Cut', price: 559, origPrice: 899, time: '30 mins', desc: 'Classic chin-to-shoulder bob tailored to your face shape' },
  { name: 'Cara Bob Cut', price: 599, origPrice: 899, time: '30 mins', desc: 'Modern textured bob with undone, effortless finish' },
  { name: 'Multi-Layer with Graduation', price: 549, origPrice: 899, time: '30 mins', desc: 'Graduated layering for stacked volume at the crown' },
]

const STYLING: PricedItem[] = [
  { name: 'Blow Dry', price: 449, origPrice: 799, time: '30 mins', desc: 'Volumising or sleek finish blowdry with round brush technique' },
  { name: 'Tong Curl', price: 599, origPrice: 999, time: '35 mins', desc: 'Defined curls and waves using ceramic barrel tongs' },
  { name: 'Flat Iron', price: 499, origPrice: 899, time: '30 mins', desc: 'Silky, smooth straight styling with heat protectant' },
  { name: 'Updo / Event Styling', price: 1199, origPrice: 1999, time: '60 mins', desc: 'Occasion updos — braids, buns, pinned sets, bridal trials' },
]

const HAIR_COLOR: PricedItem[] = [
  { name: 'Majirel Root Touch-Up', price: 699, origPrice: 1400, time: '40 mins', desc: 'Precise root blending with L\'Oréal Majirel cream color' },
  { name: 'INOA Root Touch-Up', price: 850, origPrice: 1700, time: '45 mins', desc: 'Ammonia-free root coverage with INOA oil delivery system' },
  { name: 'Majirel Global — Small', price: 1200, origPrice: 2400, time: '45 mins', desc: 'Full color, short/above-shoulder hair with Majirel' },
  { name: 'Majirel Global — Medium', price: 1900, origPrice: 3800, time: '60 mins', desc: 'Full color, shoulder-to-elbow length with Majirel' },
  { name: 'Majirel Global — Large', price: 2400, origPrice: 4800, time: '75 mins', desc: 'Full color, below-elbow length with Majirel' },
  { name: 'INOA Global — Small', price: 1349, origPrice: 2698, time: '45 mins', desc: 'Ammonia-free full color for short hair' },
  { name: 'INOA Global — Medium', price: 2100, origPrice: 4200, time: '60 mins', desc: 'Ammonia-free full color for medium-length hair' },
  { name: 'INOA Global — Large', price: 2599, origPrice: 5198, time: '75 mins', desc: 'Ammonia-free full color for long, thick hair' },
  { name: 'Highlights', price: 1799, origPrice: 2999, time: '90 mins', desc: 'Section-by-section lightening for sun-kissed dimension' },
  { name: 'Balayage', price: 2499, origPrice: 4499, time: '120 mins', desc: 'Freehand painted lightening for soft, natural graduation' },
  { name: 'Ombré / Sombré', price: 2299, origPrice: 3999, time: '110 mins', desc: 'Dark-to-light transition — Sombré is the softer version' },
  { name: 'Fashion Color', price: 1899, origPrice: 3499, time: '90 mins', desc: 'Vivid pastels, reds, violets, and fantasy hues' },
  { name: 'Glossing', price: 899, origPrice: 1499, time: '30 mins', desc: 'Clear or tinted gloss treatment for mirror shine' },
  { name: 'Henna / Colour Application', price: 350, origPrice: 700, time: '20 mins', desc: 'Application service when you provide your own henna or color product' },
]

const HAIR_SPA: PricedItem[] = [
  { name: 'Hair Spa — Small (above shoulder)', price: 649, origPrice: 1398, time: '40 mins', desc: 'L\'Oréal deep conditioning ritual with steam & serum finish' },
  { name: 'Hair Spa — Medium (up to elbow)', price: 849, origPrice: 1698, time: '40 mins', desc: 'Full mask, scalp massage & steam for mid-length hair' },
  { name: 'Hair Spa — Large (up to waist)', price: 1199, origPrice: 2398, time: '50 mins', desc: 'Intensive conditioning for long, thick hair' },
]

const TREATMENTS: PricedItem[] = [
  { name: 'Keratin Treatment — Small', price: 2599, origPrice: 5299, time: '90 mins', desc: 'Protein smoothing for short hair. Frizz reduction, 3–5 month longevity' },
  { name: 'Keratin Treatment — Medium', price: 2999, origPrice: 6299, time: '120 mins', desc: 'Formaldehyde-free keratin for mid-length hair' },
  { name: 'Keratin Treatment — Large', price: 3799, origPrice: 7299, time: '150 mins', desc: 'Full keratin therapy for long, thick hair' },
  { name: 'Schwarzkopf Smoothing — Small', price: 2999, origPrice: 3999, time: '90 mins', desc: 'Semi-permanent frizz control, short hair' },
  { name: 'Schwarzkopf Smoothing — Medium', price: 3599, origPrice: 4599, time: '120 mins', desc: 'Gentler than rebonding, 3–5 months for medium hair' },
  { name: 'Schwarzkopf Smoothing — Large', price: 3999, origPrice: 4999, time: '150 mins', desc: 'Long-hair smoothening with Schwarzkopf Strandsmooth' },
  { name: 'Rebonding — Small', price: 2499, origPrice: 4499, time: '120 mins', desc: 'Permanent pin-straight restructuring, short hair' },
  { name: 'Rebonding — Medium', price: 3199, origPrice: 5999, time: '150 mins', desc: 'Straightening for shoulder-to-elbow hair' },
  { name: 'Rebonding — Large', price: 3999, origPrice: 7499, time: '180 mins', desc: 'Full straightening for long, thick hair. Lasts 6–9 months' },
  { name: 'Bond Repair (Olaplex)', price: 1499, origPrice: 2499, time: '45 mins', desc: 'Olaplex No.1–3 protocol rebuilds broken disulfide bonds' },
  { name: 'Dandruff Treatment', price: 899, origPrice: 1499, time: '40 mins', desc: 'Anti-fungal scalp treatment with exfoliation & serum' },
  { name: 'Hair Fall Treatment', price: 999, origPrice: 1699, time: '45 mins', desc: 'Scalp analysis, stimulating massage & strengthening serum' },
]

const PACKAGES: PricedItem[] = [
  { name: 'Root Touchup & Wax', price: 1499, origPrice: 2015, time: '75 mins', desc: 'Root color touch-up + full arms & legs honey wax + threading' },
  { name: 'Keratin Hair Spa Package', price: 1349, origPrice: 2200, time: '120 mins', desc: 'Keratin hair spa + manicure + pedicure combo' },
  { name: 'Global Package', price: 3149, origPrice: 5800, time: '180 mins', desc: 'Lotus facial + L\'Oréal global color + full wax + mani + pedi' },
]

const ADDONS: { name: string; price: number; origPrice: number; time: string }[] = [
  { name: 'Dry & Sensitive Scalp Ampoule', price: 120, origPrice: 299, time: '10 mins' },
  { name: 'Anti-Dandruff Ampoule', price: 120, origPrice: 299, time: '10 mins' },
  { name: 'Split-End Serum Seal', price: 149, origPrice: 299, time: '10 mins' },
  { name: 'Extra Blow-Dry (post treatment)', price: 199, origPrice: 399, time: '15 mins' },
]

const BRANDS = ["L'Oréal Professionnel", 'Kérastase', 'Wella', 'Olaplex', 'Schwarzkopf', 'INOA']

const PROCESS = [
  { step: '01', title: 'Book Your Session',  desc: 'Choose your services and preferred time via WhatsApp or our contact form.' },
  { step: '02', title: 'Artist Arrives',     desc: 'Your certified stylist arrives fully equipped with professional tools and products.' },
  { step: '03', title: 'Consultation First', desc: 'We assess your hair type, goals, and recommend the best approach before starting.' },
  { step: '04', title: 'Enjoy Your Glow',    desc: 'Sit back, relax in your own space, and leave with stunning salon-quality results.' },
]

const FAQS = [
  { q: 'How long does a color session take?', a: 'Root touch-ups take ~45 mins; global color ranges from 45–75 mins depending on hair length and thickness. Balayage and highlights take 90–120 mins.' },
  { q: 'Is keratin treatment safe for Indian hair?', a: 'Yes — we use formaldehyde-free keratin formulas specifically tested for the Indian climate and hair texture. Results last 3–5 months with proper aftercare.' },
  { q: 'Do you bring your own products?', a: 'Absolutely. Every session arrives fully equipped with professional salon tools and branded products — no need to arrange anything.' },
  { q: 'Can I book a consultation first?', a: 'Yes. We offer free pre-service consultations, especially for color and chemical treatments, to assess hair condition and plan the right approach.' },
  { q: 'What\'s the difference between smoothening and rebonding?', a: 'Smoothening reduces frizz and adds manageability while keeping natural movement. Rebonding permanently straightens hair for a pin-straight finish. Smoothening is gentler and more natural-looking.' },
  { q: 'How do I know which hair size I am?', a: 'Small = above shoulder. Medium = shoulder to elbow. Large = below elbow to waist. Size affects product quantity, session duration, and pricing for color and treatments.' },
]

// ── Reusable Components ────────────────────────────────────

function PriceTag({ price, origPrice, inline }: { price: number; origPrice: number; inline?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${inline ? 'inline-flex' : ''}`}>
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
                <span className="font-poppins text-xs font-semibold tracking-widest uppercase">Division 02</span>
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
                <p className="font-poppins text-xs tracking-widest uppercase text-rose font-semibold mb-4">Quick Menu</p>
                {NAV_SECTIONS.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="flex items-center gap-4 py-3 border-b border-blush/20 last:border-0 hover:bg-petal/30 transition-colors rounded-lg px-2 -mx-2">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-rose text-lg flex-shrink-0 bg-blush/40">{s.label[0]}</div>
                    <div>
                      <p className="font-poppins text-sm font-semibold text-stone">{s.label}</p>
                      <p className="font-poppins text-xs text-stone-light">{s.services.length} services</p>
                    </div>
                    <span className="ml-auto text-rose/30 text-sm">→</span>
                  </a>
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

      {/* ── SIZE GUIDE ── */}
      <section id="cuts" className="max-w-7xl mx-auto px-6 md:px-16 pt-28">
        <div className="text-center mb-5 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Before You Book</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Hair <em className="text-rose">Size Guide</em></h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-20 reveal">
          {[
            { size: 'S', label: 'Small', range: 'Above shoulder', tag: 'Pixie, Bob, Short crops' },
            { size: 'M', label: 'Medium', range: 'Shoulder to elbow', tag: 'Mid-length, Lob, Collar-length' },
            { size: 'L', label: 'Large', range: 'Below elbow to waist', tag: 'Long, Thick, Waist-length' },
          ].map(s => (
            <div key={s.size} className="card-lift bg-white rounded-2xl p-6 border border-blush/20 text-center">
              <span className="font-playfair text-4xl font-bold text-rose/20">{s.size}</span>
              <p className="font-poppins text-sm font-semibold text-stone mt-2">{s.label}</p>
              <p className="font-poppins text-xs text-stone-light mt-1">{s.range}</p>
              <p className="font-poppins text-[10px] text-rose-light/70 mt-2 italic">{s.tag}</p>
            </div>
          ))}
        </div>
        <div className="bg-rose/5 border border-rose/15 rounded-2xl p-5 max-w-3xl mx-auto mb-20 reveal text-center">
          <p className="font-poppins text-xs text-stone-light leading-relaxed">
            <span className="font-semibold text-rose">Why size matters —</span> Color, treatment, and spa pricing scales with hair length and density. Small = above shoulder; Medium = shoulder to elbow; Large = below elbow to waist. Your artist will confirm the right size during consultation.
          </p>
        </div>

        {/* ── HAIRCUTS ── */}
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Precision Cutting</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Haircuts <em className="text-rose">& Styling</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Tailored cuts for every face shape and hair texture. Each cut includes consultation, wash &amp; blowdry finish.
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
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Cart</th>
              </tr>
            </thead>
            <tbody>
              {HAIRCUTS.map((s, i) => (
                <tr key={s.name} className={`border-t border-blush/10 hover:bg-petal/30 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-cream/30'}`}>
                  <td className="px-6 py-4 font-poppins text-sm font-semibold text-stone">{s.name}</td>
                  <td className="px-6 py-4 font-poppins text-xs text-stone-light hidden sm:table-cell">{s.desc}</td>
                  <td className="px-6 py-4 font-poppins text-xs text-stone-light whitespace-nowrap">{s.time}</td>
                  <td className="px-6 py-4 text-right"><PriceTag price={s.price} origPrice={s.origPrice} /></td>
                  <td className="px-6 py-4"><AddToCartButton variant="inline" id={s.name} name={s.name} price={s.price} duration={s.time} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Hair" href="/book" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── STYLING ── */}
      <section id="styling" className="max-w-7xl mx-auto px-6 md:px-16 pt-24">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Finish & Polish</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-4">Blow Dry <em className="text-rose">& Styling</em></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {STYLING.map((s, i) => (
            <div key={s.name} className={`reveal reveal-d${Math.min(i + 1, 4)} card-lift bg-white rounded-2xl p-5 border border-blush/20`}>
              <h4 className="font-poppins text-sm font-semibold text-stone mb-1">{s.name}</h4>
              <p className="font-poppins text-xs text-stone-light mb-3 leading-relaxed">{s.desc}</p>
              <div className="flex items-center justify-between pt-3 border-t border-blush/10">
                <span className="font-poppins text-[11px] text-stone-light/70">{s.time}</span>
                <PriceTag price={s.price} origPrice={s.origPrice} />
              </div>
              <div className="mt-3">
                <AddToCartButton variant="inline" id={s.name} name={s.name} price={s.price} duration={s.time} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Hair" href="/book" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HAIR COLOR ── */}
      <section id="color" className="max-w-7xl mx-auto px-6 md:px-16 pt-28">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Professional Color</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Hair <em className="text-rose">Color</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            From natural root touch-ups to vivid fashion shades. Ammonia-controlled, damage-minimizing formulations for vibrant, lasting results.
          </p>
        </div>

        {/* Majirel + INOA comparison */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12 reveal">
          {[
            { brand: 'Majirel', desc: 'L\'Oréal\'s classic cream color — rich, even coverage with up to 100% grey concealment.', accent: 'rose' },
            { brand: 'INOA', desc: 'Ammonia-free oil delivery system. Zero odor, minimal damage, maximum comfort for sensitive scalps.', accent: 'mauve' },
          ].map(b => (
            <div key={b.brand} className="bg-white rounded-2xl p-6 border border-blush/20">
              <span className="font-playfair text-lg font-bold text-stone">{b.brand}</span>
              <p className="font-poppins text-xs text-stone-light mt-1 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-blush/20 bg-white shadow-sm reveal max-w-6xl mx-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-rose/5">
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Service</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider hidden sm:table-cell">Description</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Time</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider text-right">Price</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Cart</th>
              </tr>
            </thead>
            <tbody>
              {HAIR_COLOR.map((s, i) => (
                <tr key={s.name} className={`border-t border-blush/10 hover:bg-petal/30 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-cream/30'}`}>
                  <td className="px-6 py-4 font-poppins text-sm font-semibold text-stone">{s.name}</td>
                  <td className="px-6 py-4 font-poppins text-xs text-stone-light hidden sm:table-cell">{s.desc}</td>
                  <td className="px-6 py-4 font-poppins text-xs text-stone-light whitespace-nowrap">{s.time}</td>
                  <td className="px-6 py-4 text-right"><PriceTag price={s.price} origPrice={s.origPrice} /></td>
                  <td className="px-6 py-4"><AddToCartButton variant="inline" id={s.name} name={s.name} price={s.price} duration={s.time} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Hair" href="/book" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── HAIR SPA ── */}
      <section id="treatments" className="max-w-7xl mx-auto px-6 md:px-16 pt-28">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Deep Care</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Hair Spa <em className="text-rose">& Treatments</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Targeted repair and nourishment addressing damage, frizz, breakage, hair fall, and dryness — using clinical-grade formulations.
          </p>
        </div>

        {/* Hair Spa */}
        <h3 className="font-playfair text-2xl font-bold text-stone mb-6 text-center reveal">L&apos;Oréal Hair Spa</h3>
        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-16">
          {HAIR_SPA.map((s, i) => (
            <div key={s.name} className={`reveal reveal-d${Math.min(i + 1, 3)} card-lift bg-white rounded-2xl p-6 border border-blush/20 text-center`}>
              <span className="font-playfair text-3xl font-bold text-rose/15">
                {i === 0 ? 'S' : i === 1 ? 'M' : 'L'}
              </span>
              <p className="font-poppins text-sm font-semibold text-stone mt-2">{s.name.split('—')[0].trim()}</p>
              <p className="font-poppins text-xs text-stone-light mt-1">{s.time}</p>
              <div className="mt-3 pt-3 border-t border-blush/10 flex justify-center">
                <PriceTag price={s.price} origPrice={s.origPrice} />
              </div>
              <div className="mt-2">
                <AddToCartButton variant="inline" id={s.name} name={s.name} price={s.price} duration={s.time} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Hair" href="/book" />
              </div>
            </div>
          ))}
        </div>

        {/* Treatment table */}
        <h3 className="font-playfair text-2xl font-bold text-stone mb-6 text-center reveal">Advanced Treatments</h3>
        <div className="overflow-x-auto rounded-2xl border border-blush/20 bg-white shadow-sm reveal max-w-6xl mx-auto mb-20">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-rose/5">
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Service</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider hidden sm:table-cell">Description</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Time</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider text-right">Price</th>
                <th className="font-poppins text-xs font-semibold text-stone px-6 py-4 uppercase tracking-wider">Cart</th>
              </tr>
            </thead>
            <tbody>
              {TREATMENTS.map((s, i) => (
                <tr key={s.name} className={`border-t border-blush/10 hover:bg-petal/30 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-cream/30'}`}>
                  <td className="px-6 py-4 font-poppins text-sm font-semibold text-stone">{s.name}</td>
                  <td className="px-6 py-4 font-poppins text-xs text-stone-light hidden sm:table-cell">{s.desc}</td>
                  <td className="px-6 py-4 font-poppins text-xs text-stone-light whitespace-nowrap">{s.time}</td>
                  <td className="px-6 py-4 text-right"><PriceTag price={s.price} origPrice={s.origPrice} /></td>
                  <td className="px-6 py-4"><AddToCartButton variant="inline" id={s.name} name={s.name} price={s.price} duration={s.time} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Hair" href="/book" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── PACKAGE DEALS ── */}
      <section id="packages" className="max-w-7xl mx-auto px-6 md:px-16 pt-6 pb-8">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-4">Best Value</p>
          <h2 className="font-playfair text-5xl font-bold text-stone mb-4">Package <em className="text-rose">Deals</em></h2>
          <p className="font-poppins text-stone-light text-base max-w-xl mx-auto">
            Bundled combos that save you more. Perfect for a complete head-to-toe refresh.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PACKAGES.map((p, i) => (
            <div key={p.name} className={`reveal reveal-d${Math.min(i + 1, 3)} card-lift bg-white rounded-2xl p-6 border border-blush/20 flex flex-col`}>
              <div className="flex-1">
                <div className="w-10 h-10 rounded-xl bg-rose/8 flex items-center justify-center text-rose text-sm font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="font-poppins text-sm font-semibold text-stone mb-2">{p.name}</h3>
                <p className="font-poppins text-xs text-stone-light leading-relaxed mb-4">{p.desc}</p>
                <span className="font-poppins text-[11px] text-stone-light/70">{p.time}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-blush/10 flex items-center justify-between">
                <PriceTag price={p.price} origPrice={p.origPrice} />
                <span className="font-poppins text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Save ₹{p.origPrice - p.price}
                </span>
              </div>
              <div className="mt-3">
                <AddToCartButton variant="inline" id={p.name} name={p.name} price={p.price} duration={p.time} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Hair" href="/book" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ADD-ONS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-8 pb-8">
        <div className="text-center mb-14 reveal">
          <p className="font-poppins label-caps text-rose mb-3">Enhance Your Session</p>
          <h2 className="font-playfair text-4xl font-bold text-stone mb-3">Add-On <em className="text-rose">Extras</em></h2>
          <p className="font-poppins text-stone-light text-sm max-w-lg mx-auto">Boost any service with these quick add-ons.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {ADDONS.map((a, i) => (
            <div key={a.name} className={`reveal reveal-d${Math.min(i + 1, 4)} card-lift bg-white rounded-2xl p-5 border border-blush/20 text-center`}>
              <span className="font-poppins text-[10px] font-semibold text-rose-light uppercase tracking-wider block mb-2">{a.time}</span>
              <h4 className="font-poppins text-sm font-semibold text-stone mb-3">{a.name}</h4>
              <PriceTag price={a.price} origPrice={a.origPrice} />
              <div className="mt-3">
                <AddToCartButton variant="inline" id={a.name} name={a.name} price={a.price} duration={a.time} image="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png" category="Hair" href="/book" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-cream py-24">
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
      <section className="max-w-4xl mx-auto px-6 md:px-16 py-28">
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
