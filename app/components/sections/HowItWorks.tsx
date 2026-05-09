import React from 'react'
import { HOW_IT_WORKS } from '@/app/_data/home'
import { IconWhatsApp, IconMessageCircle, IconTruck, IconSparkle } from '@/app/components/icons'

const STEP_ICONS = [IconMessageCircle, IconTruck, IconSparkle]

export default function HowItWorks() {
  return (
    <section
      className="relative px-5 sm:px-8 md:px-16 py-24 overflow-hidden"
      aria-labelledby="how-heading"
      style={{ background: 'linear-gradient(160deg, #fdf0f4 0%, #fff7f9 50%, #fdf0f4 100%)' }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute -left-40 top-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,204,212,0.45) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,151,74,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">
            Simple Process
          </p>
          <h2
            id="how-heading"
            className="font-playfair text-4xl md:text-5xl font-bold text-stone mb-4"
          >
            How It{' '}
            <em
              className="italic"
              style={{
                background: 'linear-gradient(120deg, #C4768A 20%, #8B3A52 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Works
            </em>
          </h2>
          <p className="font-poppins text-stone-light text-sm max-w-lg mx-auto leading-relaxed">
            From booking to glow — the entire experience takes minutes to arrange.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-14 h-px pointer-events-none"
            style={{
              left: 'calc(16.7% + 1.5rem)',
              right: 'calc(16.7% + 1.5rem)',
              background: 'linear-gradient(90deg, transparent, rgba(196,118,138,0.30), rgba(196,118,138,0.30), transparent)',
            }}
          />

          {HOW_IT_WORKS.map((step, i) => {
            const Icon = STEP_ICONS[i]
            return (
              <div
                key={step.step}
                className="reveal-fade flex flex-col items-center text-center group"
                style={{ '--reveal-delay': `${i * 0.15}s` } as React.CSSProperties}
              >
                {/* Icon circle */}
                <div
                  className="relative z-10 w-[60px] h-[60px] rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                  style={{
                    background: step.accent,
                    boxShadow: `0 8px 24px ${step.accent}80`,
                    color: '#8B3A52',
                  }}
                >
                  <Icon />
                </div>

                {/* Step number */}
                <p className="font-poppins text-[10px] tracking-widest uppercase font-bold mb-2"
                  style={{ color: 'rgba(139,58,82,0.35)' }}>
                  {step.step}
                </p>

                <h3 className="font-playfair text-xl font-bold text-stone mb-3">
                  {step.title}
                </h3>
                <p className="font-poppins text-xs text-stone-light leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="https://wa.me/917985183449"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-poppins text-sm font-semibold px-7 py-3.5 text-white rounded-full transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            style={{
              background: '#25D366',
              boxShadow: '0 8px 24px rgba(37,211,102,0.28)',
            }}
          >
            <IconWhatsApp size={16} />
            Book Your First Session
          </a>
        </div>
      </div>
    </section>
  )
}