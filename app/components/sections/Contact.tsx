'use client'
import React, { useState, useRef, useEffect } from 'react'
import { IconWhatsApp, IconMapPin, IconClock, IconCreditCard } from '@/app/components/icons'

const SERVICES_LIST = [
  { value: 'Hair',               label: 'Hair — Cuts, Color, Treatments'           },
  { value: 'Skin',               label: 'Skin — Waxing, Facials, Body Care'         },
  { value: 'Makeup',             label: 'Makeup — Party, Bridal, Events'            },
  { value: 'Eyelash',            label: 'Eyelash — Classic, Hybrid, Volume'         },
  { value: 'Semi-Permanent',     label: 'Semi-Permanent — Microblading, Lip Blush'  },
  { value: 'Nails',              label: 'Nail Extensions — Acrylic, Gel, PolyGel'  },
  { value: 'Multiple / Package', label: 'Multiple Services / Full Package'          },
]

function CustomServiceSelect({
  value,
  onChange,
  fieldStyle,
  fieldClass,
}: {
  value: string
  onChange: (val: string) => void
  fieldStyle: React.CSSProperties
  fieldClass: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = SERVICES_LIST.find((s) => s.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${fieldClass} appearance-none cursor-pointer text-left flex items-center justify-between`}
        style={{ ...fieldStyle, color: selected ? '#fff' : 'rgba(255,255,255,0.35)' }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected ? selected.label : 'Service You Need *'}</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`flex-shrink-0 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: 'rgba(255,255,255,0.40)' }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Hidden input so form validation & submission works */}
      <input type="hidden" name="service" value={value} required />

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-xl overflow-hidden shadow-2xl"
          style={{ background: '#3D2B2B', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          {SERVICES_LIST.map((s) => (
            <li
              key={s.value}
              role="option"
              aria-selected={s.value === value}
              onClick={() => { onChange(s.value); setOpen(false) }}
              className="px-4 py-3 font-poppins text-sm cursor-pointer transition-colors duration-150"
              style={{
                color: s.value === value ? '#EFCCD4' : 'rgba(255,255,255,0.80)',
                background: s.value === value ? 'rgba(196,118,138,0.18)' : 'transparent',
              }}
              onMouseEnter={(e) => { if (s.value !== value) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = s.value === value ? 'rgba(196,118,138,0.18)' : 'transparent' }}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Contact() {
  const [status, setStatus]   = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const fd = new FormData()
      fd.append('access_key', '10edd539-4395-49ea-be12-105d1439f716')
      fd.append('subject', `New Booking Request — ${formData.service || 'General Enquiry'}`)
      fd.append('name', formData.name)
      fd.append('phone', formData.phone)
      fd.append('email', formData.email)
      fd.append('service', formData.service)
      fd.append('message', formData.message)
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFormData({ name: '', phone: '', email: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // Shared field style
  const fieldStyle = {
    background: 'rgba(255,255,255,0.09)',
    border: '1px solid rgba(255,255,255,0.14)',
  }
  const fieldClass = 'w-full rounded-xl px-4 py-3 font-poppins text-sm text-white placeholder:text-white/35 outline-none transition-all duration-200 focus:border-blush/60 focus:bg-white/14'

  return (
    <section id="contact" className="px-5 sm:px-8 md:px-16 py-24 max-w-7xl mx-auto" aria-labelledby="contact-heading">
      <div
        className="rounded-3xl p-7 sm:p-10 md:p-14 grid md:grid-cols-2 gap-10 md:gap-14 items-start relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3D2B2B 0%, #5a3a3a 100%)' }}
      >
        {/* Decorative blobs */}
        <div aria-hidden="true" className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(239,204,212,0.10) 0%, transparent 70%)' }} />
        <div aria-hidden="true" className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,151,74,0.07) 0%, transparent 70%)' }} />
        {/* Gold top line */}
        <div aria-hidden="true" className="absolute top-0 left-[10%] right-[10%] h-[2px] rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,151,74,0.5), transparent)' }} />

        {/* ── Left — info ── */}
        <div className="relative z-10">
          <p className="font-poppins text-[11px] tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: 'rgba(239,204,212,0.80)' }}>
            Get in Touch
          </p>
          <h2 id="contact-heading" className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Book your<br />
            <em style={{ fontStyle: 'italic', background: 'linear-gradient(120deg,#EFCCD4 20%,#C4768A 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              session.
            </em>
          </h2>
          <p className="font-poppins text-white/50 text-sm leading-relaxed mb-7">
            Fill in the form and we&apos;ll confirm your booking within a few hours. Or message us directly on WhatsApp for an instant response.
          </p>
          <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
            className="btn-press inline-flex items-center gap-2.5 font-poppins text-sm font-semibold px-6 py-3 text-white rounded-full hover:opacity-90 transition-opacity"
            style={{ background: '#25D366', boxShadow: '0 6px 20px rgba(37,211,102,0.25)' }}
          >
            <IconWhatsApp size={16} /> Message on WhatsApp
          </a>
          <div className="mt-8 flex flex-col gap-3">
            {[
              { icon: <IconMapPin />,     label: 'Delhi NCR · Lucknow · Ayodhya' },
              { icon: <IconClock />,      label: 'Response within 2–3 hours'     },
              { icon: <IconCreditCard />, label: 'UPI · Cash · Bank Transfer'    },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span style={{ color: 'rgba(196,118,138,0.70)' }}>{icon}</span>
                <span className="font-poppins text-xs text-white/50">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — form ── */}
        <div className="relative z-10">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center text-center py-14 px-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(196,118,138,0.20)', color: '#EFCCD4' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-2">Request Sent!</h3>
              <p className="font-poppins text-sm text-white/50 leading-relaxed mb-7">
                We&apos;ve received your booking request. Our team will confirm within a few hours.
              </p>
              <button onClick={() => setStatus('idle')}
                className="font-poppins text-xs font-medium px-5 py-2.5 rounded-full border text-white/60 hover:text-white hover:border-white/40 transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.20)' }}>
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <input name="name" type="text" placeholder="Your Name *" required
                  value={formData.name} onChange={handleChange}
                  className={`col-span-2 sm:col-span-1 ${fieldClass}`} style={fieldStyle}
                />
                <input name="phone" type="tel" placeholder="Phone / WhatsApp *" required
                  value={formData.phone} onChange={handleChange}
                  className={`col-span-2 sm:col-span-1 ${fieldClass}`} style={fieldStyle}
                />
              </div>

              <input name="email" type="email" placeholder="Email (optional — for confirmation)"
                value={formData.email} onChange={handleChange}
                className={fieldClass} style={fieldStyle}
              />

              {/* ── Custom service selector ── */}
              <CustomServiceSelect
                value={formData.service}
                onChange={(val) => setFormData((prev) => ({ ...prev, service: val }))}
                fieldStyle={fieldStyle}
                fieldClass={fieldClass}
              />

              <textarea name="message" rows={3} placeholder="Anything else? (date, location, special requests...)"
                value={formData.message} onChange={handleChange}
                className={`${fieldClass} resize-none`} style={fieldStyle}
              />

              {status === 'error' && (
                <p className="font-poppins text-xs text-center" style={{ color: '#EFCCD4' }}>
                  Something went wrong. Please try WhatsApp instead.
                </p>
              )}

              <button type="submit" disabled={status === 'sending'}
                className="w-full font-poppins text-sm font-semibold px-6 py-3.5 text-white rounded-xl tracking-wide transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#C4768A 0%,#8B3A52 100%)', boxShadow: '0 8px 24px rgba(139,58,82,0.30)' }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Booking Request'}
              </button>

              <p className="font-poppins text-[10px] text-white/25 text-center">
                No spam. Your details are only used to confirm your booking.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}