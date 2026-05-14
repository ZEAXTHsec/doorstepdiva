import React from 'react'
import { TESTIMONIALS } from '@/app/_data/home'
import { IconStar } from '@/app/components/icons'

export default function Testimonials() {
  return (
    <section
      className="px-5 sm:px-8 md:px-16 py-24"
      aria-labelledby="testimonials-heading"
      style={{ background: 'linear-gradient(160deg, #fff9f9 0%, #fdf0f4 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 reveal-fade">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">
            Real Clients
          </p>
          <h2
            id="testimonials-heading"
            className="font-playfair text-4xl md:text-5xl font-bold text-stone mb-3"
          >
            What They{' '}
            <em
              className="italic"
              style={{
                background: 'linear-gradient(120deg, #C4768A 20%, #8B3A52 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Say
            </em>
          </h2>
          <p className="font-poppins text-stone-light text-sm max-w-lg mx-auto">
            Hundreds of happy clients across Delhi NCR, Lucknow, and Ayodhya.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="reveal-fade bg-white rounded-2xl p-6 flex flex-col hover:shadow-xl hover:shadow-rose/8 transition-all duration-300 hover:-translate-y-1"
              style={{
                border: '1px solid rgba(196,118,138,0.15)',
                '--reveal-delay': `${i * 0.08}s`,
              } as React.CSSProperties}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} style={{ color: '#C8974A' }}>
                    <IconStar filled />
                  </span>
                ))}
              </div>

              {/* Review text */}
              <p className="font-poppins text-xs text-stone-light leading-[1.9] flex-1 mb-5">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Reviewer */}
              <div
                className="pt-4 flex items-center gap-3"
                style={{ borderTop: '1px solid rgba(196,118,138,0.15)' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-playfair text-sm font-bold text-stone flex-shrink-0"
                  style={{ background: t.accent }}
                >
                  {t.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-poppins text-xs font-semibold text-stone truncate">{t.name}</p>
                  <p className="font-poppins text-[10px] text-stone-light truncate">{t.location}</p>
                </div>
                <span
                  className="font-poppins text-[9px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ background: 'rgba(239,204,212,0.45)', color: '#8B3A52' }}
                >
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}