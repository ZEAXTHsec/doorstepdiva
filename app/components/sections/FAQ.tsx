import React from 'react'
import { FAQS } from '@/app/_data/home'
import { IconWhatsApp } from '@/app/components/icons'

export default function FAQ() {
  return (
    <section
      className="px-5 sm:px-8 md:px-16 py-24 max-w-7xl mx-auto"
      aria-labelledby="faq-heading"
    >
      <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">

        {/* Sticky sidebar */}
        <div className="md:col-span-2 md:sticky top-24 reveal-fade">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">
            Common Questions
          </p>
          <h2
            id="faq-heading"
            className="font-playfair text-4xl md:text-5xl font-bold text-stone mb-5"
          >
            FAQ
            <em
              className="italic"
              style={{
                background: 'linear-gradient(120deg, #C4768A 20%, #8B3A52 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              s
            </em>
          </h2>
          <p className="font-poppins text-stone-light text-sm leading-relaxed mb-7">
            Everything you need to know before your first booking. Still have questions? We&apos;re one message away.
          </p>
          <a
            href="https://wa.me/917985183449"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-poppins text-xs font-semibold px-5 py-2.5 text-white hover:opacity-90 transition-opacity rounded-full"
            style={{ background: '#25D366', boxShadow: '0 6px 16px rgba(37,211,102,0.25)' }}
          >
            <IconWhatsApp size={13} />
            Ask on WhatsApp
          </a>
        </div>

        {/* Accordion */}
        <div className="md:col-span-3 flex flex-col gap-2 reveal-fade" style={{ '--reveal-delay': '0.12s' } as React.CSSProperties}>
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(196,118,138,0.18)' }}
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-rose/5 transition-colors duration-150">
                <span className="font-poppins text-sm font-semibold text-stone group-open:text-rose transition-colors duration-150">
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center font-poppins font-bold text-sm text-rose transition-transform duration-200 group-open:rotate-45"
                  style={{ borderColor: 'rgba(196,118,138,0.35)' }}
                >
                  +
                </span>
              </summary>
              <div className="px-5 pb-4 pt-0">
                <div
                  className="pt-3"
                  style={{ borderTop: '1px solid rgba(196,118,138,0.12)' }}
                >
                  <p className="font-poppins text-xs text-stone-light leading-[1.85]">{faq.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}