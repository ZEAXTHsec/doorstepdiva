'use client'
import React, { useState, useEffect, useCallback } from 'react'

const COURSES_LIST = [
  { value: 'Makeup',      label: 'Make Up (1–2 months)'      },
  { value: 'Hair',        label: 'Hair (3–6 months)'         },
  { value: 'Skin',        label: 'Skin (3–6 months)'         },
  { value: 'Cosmetology', label: 'Cosmetology (3–6 months)'  },
  { value: 'Nail Art',    label: 'Nail Art (1–2 months)'     },
  { value: 'Unsure',      label: 'Not sure — need guidance'  },
]

type Props = {
  /** When used inside a modal pass a close handler so the success state can offer to close */
  onClose?: () => void
  /** Compact layout for use inside a popup */
  compact?: boolean
}

export default function AcademyEnquiryForm({ onClose, compact = false }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const fd = new FormData()
      fd.append('access_key', '10edd539-4395-49ea-be12-105d1439f716')
      fd.append('subject', `Academy Enquiry — ${form.course || 'General'} — ${form.name}`)
      fd.append('from_name', 'Doorstep Diva Academy Form')
      fd.append('name', form.name)
      fd.append('phone', form.phone)
      fd.append('email', form.email)
      fd.append('course', form.course)
      fd.append('message', form.message)
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) { setStatus('success'); setForm({ name: '', phone: '', email: '', course: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const fieldStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(196,118,138,0.25)',
    color: '#3D2B2B',
  }
  const fieldClass = `w-full rounded-xl px-4 py-3 font-poppins text-sm placeholder:text-[#9A7A7A] outline-none transition-all duration-200 focus:border-[#C4768A] focus:bg-white/90 bg-white/70`

  if (status === 'success') return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4">
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ background: 'rgba(139,58,82,0.10)', color: '#8B3A52' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h3 className="font-playfair text-2xl font-bold mb-2" style={{ color: '#3D2B2B' }}>Enquiry Sent!</h3>
      <p className="font-poppins text-sm leading-relaxed mb-6" style={{ color: '#7A5C5C' }}>
        We&apos;ve received your interest. Our team will reach out within a few hours to guide you.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button onClick={() => setStatus('idle')}
          className="font-poppins text-xs font-medium px-5 py-2.5 rounded-full border transition-colors"
          style={{ borderColor: 'rgba(139,58,82,0.30)', color: '#8B3A52' }}>
          Submit another
        </button>
        {onClose && (
          <button onClick={onClose}
            className="font-poppins text-xs font-semibold px-5 py-2.5 rounded-full text-white transition-all duration-200"
            style={{ background: 'linear-gradient(135deg,#C4768A,#8B3A52)' }}>
            Close
          </button>
        )}
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" aria-label="Academy enrolment enquiry form">
      <div className="grid grid-cols-2 gap-3">
        <input name="name" type="text" placeholder="Your Name *" required
          value={form.name} onChange={handleChange}
          className={`col-span-2 sm:col-span-1 ${fieldClass}`} style={fieldStyle}
          autoComplete="name"
        />
        <input name="phone" type="tel" placeholder="Phone / WhatsApp *" required
          value={form.phone} onChange={handleChange}
          className={`col-span-2 sm:col-span-1 ${fieldClass}`} style={fieldStyle}
          autoComplete="tel"
        />
      </div>

      <input name="email" type="email" placeholder="Email (optional)"
        value={form.email} onChange={handleChange}
        className={fieldClass} style={fieldStyle}
        autoComplete="email"
      />

      <select name="course" required
        value={form.course} onChange={handleChange}
        className={fieldClass}
        style={{ ...fieldStyle, color: form.course ? '#3D2B2B' : '#9A7A7A' }}
        aria-label="Course of interest"
      >
        <option value="" disabled>Course I&apos;m Interested In *</option>
        {COURSES_LIST.map(c => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>

      {!compact && (
        <textarea name="message" rows={3}
          placeholder="Any questions? (batch timing, fees, location…)"
          value={form.message} onChange={handleChange}
          className={`${fieldClass} resize-none`} style={fieldStyle}
        />
      )}

      {status === 'error' && (
        <p className="font-poppins text-xs text-center" style={{ color: '#8B3A52' }}>
          Something went wrong. Please try{' '}
          <a href="https://wa.me/917985183449" className="underline">WhatsApp</a> instead.
        </p>
      )}

      <button type="submit" disabled={status === 'sending'}
        className="w-full font-poppins text-sm font-semibold px-6 py-3.5 text-white rounded-xl tracking-wide transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
        style={{ background: 'linear-gradient(135deg,#C4768A 0%,#8B3A52 100%)', boxShadow: '0 8px 24px rgba(139,58,82,0.25)' }}
      >
        {status === 'sending' ? 'Sending…' : 'Send My Enquiry'}
      </button>

      <p className="font-poppins text-[10px] text-center" style={{ color: '#9A7A7A' }}>
        No spam. Used only to guide your enrolment.
      </p>
    </form>
  )
}