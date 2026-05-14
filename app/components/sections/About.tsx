import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { STATS } from '@/app/_data/home'
import { IconCheck, IconArrowRight } from '@/app/components/icons'

const BRAND_POINTS = [
  'Certified & trained beauty professionals only',
  'Professional-grade salon products, every visit',
  'All six divisions under one booking',
  'Zero travel, zero waiting room, zero compromise',
]

export default function About() {
  return (
    <section
      id="about"
      className="px-5 sm:px-8 md:px-16 py-24"
      aria-labelledby="about-heading"
      style={{ background: '#fffaf9' }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* ── LEFT — stats + photo ── */}
        <div className="reveal-fade">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {STATS.map(({ n, label }, i) => (
              <div
                key={label}
                className="rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
                style={
                  i === 0
                    ? {
                        background: 'linear-gradient(135deg, #C4768A 0%, #8B3A52 100%)',
                        boxShadow: '0 12px 32px rgba(139,58,82,0.22)',
                      }
                    : {
                        background: '#fff',
                        border: '1px solid rgba(196,118,138,0.22)',
                        boxShadow: '0 4px 16px rgba(196,118,138,0.08)',
                      }
                }
              >
                <p
                  className="font-playfair text-4xl font-bold mb-1.5 leading-none"
                  style={{ color: i === 0 ? '#fff' : '#8B3A52' }}
                >
                  {n}
                </p>
                <p
                  className="font-poppins text-[10px] uppercase tracking-widest font-medium"
                  style={{ color: i === 0 ? 'rgba(255,255,255,0.70)' : '#9c7070' }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Photo card */}
          <div
            className="relative rounded-2xl overflow-hidden h-52 sm:h-64"
            style={{
              boxShadow: '0 16px 40px rgba(139,58,82,0.14)',
            }}
          >
            <Image
              src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png"
              alt="DoorStep Diva certified artist at work"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
            {/* Caption badge */}
            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-3 backdrop-blur-md flex items-center justify-between"
              style={{ background: 'rgba(255,255,255,0.88)', border: '1px solid rgba(196,118,138,0.20)' }}
            >
              <div>
                <p className="font-playfair text-sm font-semibold text-stone">Luxury at your doorstep</p>
                <p className="font-poppins text-[10px] text-stone-light mt-0.5">Delhi NCR · Lucknow · Ayodhya</p>
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #EFCCD4, #C4768A)', color: '#fff' }}
              >
                {/* Flower icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z" opacity="0.9"/>
                  <path d="M12 14C12 14 8 12 6 9C4.5 12 6 16 9 18C10.2 18.8 11.2 19.2 12 19.5C12.8 19.2 13.8 18.8 15 18C18 16 19.5 12 18 9C16 12 12 14 12 14Z" opacity="0.7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT — copy ── */}
        <div className="reveal-fade" style={{ '--reveal-delay': '0.15s' } as React.CSSProperties}>
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">
            Our Story
          </p>
          <h2
            id="about-heading"
            className="font-playfair text-4xl md:text-5xl font-bold text-stone leading-tight mb-5"
          >
            Beauty on<br />
            <em
              className="italic"
              style={{
                background: 'linear-gradient(120deg, #C4768A 20%, #8B3A52 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              your terms.
            </em>
          </h2>

          <p className="font-poppins text-stone-light text-sm leading-[1.9] mb-4">
            DoorStep Diva was built on one belief — you shouldn&apos;t have to leave home for a
            luxury salon experience. We bring certified artists, professional tools, and premium
            products directly to you.
          </p>
          <p className="font-poppins text-stone-light text-sm leading-[1.9] mb-8">
            Whether it&apos;s your wedding day, a festive occasion, or your regular self-care
            ritual — we&apos;re at your door, fully equipped, entirely on your schedule.
          </p>

          {/* Brand points */}
          <div className="flex flex-col gap-3 mb-9">
            {BRAND_POINTS.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(196,118,138,0.12)', color: '#8B3A52' }}
                >
                  <IconCheck />
                </div>
                <span className="font-poppins text-sm text-stone-light leading-relaxed">{point}</span>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-poppins text-sm font-semibold text-rose hover:gap-3 transition-all duration-200"
          >
            Read our full story
            <IconArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}