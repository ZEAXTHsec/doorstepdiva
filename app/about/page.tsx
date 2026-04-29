import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { IconCheck, IconWhatsApp } from '@/app/components/icons'

export const metadata: Metadata = {
  title: 'Our Story — DoorStep Diva',
  description:
    "DoorStep Diva was built on one belief: you shouldn't have to leave home for a luxury salon experience. Meet the team behind the service.",
}

const TIMELINE = [
  {
    year: '2022',
    title: 'The Idea',
    desc: 'Frustrated by crowded salons and last-minute cancellations, our founder decided there had to be a better way — luxury beauty, at your door, on your schedule.',
  },
  {
    year: '2023',
    title: 'First Artists',
    desc: 'We hand-picked our first cohort of certified beauty professionals across Delhi NCR, setting the standard for quality and reliability that defines us today.',
  },
  {
    year: '2024',
    title: 'Six Divisions',
    desc: 'Growing from hair and makeup to all six divisions — skin, nails, eyelash extensions, and semi-permanent makeup — with 15+ premium brand partnerships.',
  },
  {
    year: '2025',
    title: 'Lucknow & Ayodhya',
    desc: 'We expanded beyond Delhi NCR into Lucknow and Ayodhya, bringing the same luxury doorstep experience to clients across North India.',
  },
]

const VALUES = [
  {
    title: 'Only Certified Artists',
    desc: "Every professional on our roster is certified in their discipline. We never send untrained staff — your safety and results are non-negotiable.",
    accent: '#EFCCD4',
  },
  {
    title: 'Premium Products Only',
    desc: "We partner with L'Oréal Professionnel, Kérastase, Olaplex, MAC, Charlotte Tilbury, and more. You get the same products used in the best salons.",
    accent: '#F5E0D0',
  },
  {
    title: 'Zero Hidden Costs',
    desc: 'What you see is what you pay. Artists bring all equipment and products. UPI, cash, or bank transfer — no booking fee, no advance payment required.',
    accent: '#F0D8E8',
  },
  {
    title: 'Flexible Scheduling',
    desc: 'Your time is yours. Book 24–48 hours ahead for regular services, or reach us on WhatsApp for same-day availability when we can make it happen.',
    accent: '#E8D8F0',
  },
]

const TEAM_PHOTOS = [
  { src: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png',     alt: 'DoorStep Diva artist at work' },
  { src: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png', alt: 'DoorStep Diva bridal service' },
  { src: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png', alt: 'DoorStep Diva nail service'   },
  { src: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png', alt: 'DoorStep Diva makeup artist'  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-[55vh] flex items-center overflow-hidden"
        aria-label="About DoorStep Diva"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175036/Cover_ksobok.png"
            alt="DoorStep Diva beauty artist"
            fill
            priority
            className="object-cover object-center sm:object-right"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(100deg, rgba(20,6,10,0.92) 0%, rgba(30,10,15,0.78) 40%, rgba(30,10,15,0.45) 70%, rgba(30,10,15,0.10) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-16 py-20">
          <p
            className="font-poppins text-[11px] tracking-[0.3em] uppercase font-semibold mb-4"
            style={{ color: 'rgba(239,204,212,0.80)' }}
          >
            Our Story
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-xl">
            Beauty on{' '}
            <em
              className="italic"
              style={{
                background: 'linear-gradient(120deg,#EFCCD4 20%,#C4768A 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              your terms.
            </em>
          </h1>
          <p className="font-poppins text-white/60 text-sm leading-relaxed max-w-md mb-8">
            We built DoorStep Diva because luxury beauty should not require a waiting room, a
            commute, or a compromise. Six divisions. Certified artists. At your door.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/917985183449"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-poppins text-sm font-semibold px-6 py-3 text-white rounded-full hover:opacity-90 transition-opacity"
              style={{ background: '#25D366', boxShadow: '0 6px 20px rgba(37,211,102,0.25)' }}
            >
              <IconWhatsApp size={16} />
              Book via WhatsApp
            </a>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 font-poppins text-sm font-semibold px-6 py-3 rounded-full border text-white/80 hover:text-white hover:border-white/50 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.25)' }}
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── STORY TEXT + PHOTO GRID ── */}
      <section className="px-5 sm:px-8 md:px-16 py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">
              Who We Are
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-stone leading-tight mb-6">
              The salon{' '}
              <em
                className="italic"
                style={{
                  background: 'linear-gradient(120deg, #C4768A 20%, #8B3A52 80%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                came to you.
              </em>
            </h2>
            <p className="font-poppins text-stone-light text-sm leading-[1.9] mb-5">
              DoorStep Diva started with a simple frustration — great salons are often too far, too
              busy, or too inconvenient. Our founder, a beauty enthusiast herself, knew that the
              talent existed but the access did not. So she built it.
            </p>
            <p className="font-poppins text-stone-light text-sm leading-[1.9] mb-5">
              Today, we operate across Delhi NCR, Lucknow, and Ayodhya with a growing roster of
              certified hair stylists, makeup artists, skincare therapists, lash technicians,
              microblading specialists, and nail artists — all vetted, trained, and ready to come
              to you.
            </p>
            <p className="font-poppins text-stone-light text-sm leading-[1.9]">
              Whether it is your wedding morning, a festive evening, or your Sunday self-care
              ritual — we arrive fully equipped with professional-grade tools and premium products,
              entirely on your schedule.
            </p>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-3">
            {TEAM_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl"
                style={{
                  height: i % 2 === 0 ? '220px' : '180px',
                  marginTop: i % 2 !== 0 ? '24px' : '0',
                  boxShadow: '0 8px 24px rgba(139,58,82,0.12)',
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section
        className="px-5 sm:px-8 md:px-16 py-24"
        style={{ background: 'linear-gradient(160deg, #fdf0f4 0%, #fff7f9 50%, #fdf0f4 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">
              Our Journey
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-stone">
              How we{' '}
              <em
                className="italic"
                style={{
                  background: 'linear-gradient(120deg, #C4768A 20%, #8B3A52 80%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                grew.
              </em>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className="rounded-2xl p-7"
                style={{
                  background: i === 0
                    ? 'linear-gradient(135deg, #C4768A 0%, #8B3A52 100%)'
                    : '#fff',
                  border: i !== 0 ? '1px solid rgba(196,118,138,0.18)' : 'none',
                  boxShadow: i === 0
                    ? '0 12px 32px rgba(139,58,82,0.22)'
                    : '0 4px 16px rgba(196,118,138,0.08)',
                }}
              >
                <p
                  className="font-playfair text-3xl font-bold mb-3"
                  style={{ color: i === 0 ? 'rgba(255,255,255,0.55)' : '#EFCCD4' }}
                >
                  {item.year}
                </p>
                <h3
                  className="font-playfair text-lg font-bold mb-2"
                  style={{ color: i === 0 ? '#fff' : '#3D2B2B' }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-poppins text-xs leading-relaxed"
                  style={{ color: i === 0 ? 'rgba(255,255,255,0.68)' : '#9c7070' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="px-5 sm:px-8 md:px-16 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">
            What We Stand For
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-stone">
            Our{' '}
            <em
              className="italic"
              style={{
                background: 'linear-gradient(120deg, #C4768A 20%, #8B3A52 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              values.
            </em>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {VALUES.map((val) => (
            <div
              key={val.title}
              className="rounded-2xl p-8 flex gap-5 items-start"
              style={{
                background: `${val.accent}55`,
                border: `1px solid ${val.accent}`,
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(196,118,138,0.15)', color: '#8B3A52' }}
              >
                <IconCheck />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-stone mb-2">{val.title}</h3>
                <p className="font-poppins text-sm text-stone-light leading-relaxed">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-5 sm:px-8 md:px-16 pb-24 max-w-7xl mx-auto">
        <div
          className="rounded-3xl p-12 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #3D2B2B 0%, #5a3a3a 100%)' }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(239,204,212,0.08) 0%, transparent 70%)',
            }}
          />
          <p
            className="font-poppins text-[11px] tracking-[0.3em] uppercase font-semibold mb-3 relative z-10"
            style={{ color: 'rgba(239,204,212,0.70)' }}
          >
            Ready to experience it?
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4 relative z-10">
            Book your first{' '}
            <em
              className="italic"
              style={{
                background: 'linear-gradient(120deg,#EFCCD4 20%,#C4768A 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              session.
            </em>
          </h2>
          <p className="font-poppins text-white/50 text-sm leading-relaxed max-w-md mx-auto mb-8 relative z-10">
            Message us on WhatsApp and we will confirm your booking within a few hours.
          </p>
          <a
            href="https://wa.me/917985183449"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-poppins text-sm font-semibold px-8 py-3.5 text-white rounded-full hover:opacity-90 transition-opacity relative z-10"
            style={{ background: '#25D366', boxShadow: '0 8px 24px rgba(37,211,102,0.28)' }}
          >
            <IconWhatsApp size={16} />
            Book on WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
