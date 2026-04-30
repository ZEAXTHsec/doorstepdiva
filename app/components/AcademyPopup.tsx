'use client'
import { useState, useEffect, useCallback } from 'react'
import AcademyEnquiryForm from './AcademyEnquiryForm'

export default function AcademyPopup() {
  const [open, setOpen] = useState(false)

  // Close on Escape key
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
  }, [])

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, handleKey])

  return (
    <>
      {/* ── Floating "Enrol Now" trigger button ── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open academy enrolment enquiry form"
        className="fixed bottom-24 right-4 z-40 flex items-center gap-2 font-poppins font-semibold text-sm px-5 py-3.5 rounded-full text-white shadow-2xl transition-all duration-200 hover:scale-105 hover:shadow-[0_12px_40px_rgba(139,58,82,0.45)] active:scale-95 md:bottom-8 md:right-8"
        style={{
          background: 'linear-gradient(135deg,#C4768A,#8B3A52)',
          boxShadow: '0 8px 32px rgba(139,58,82,0.35)',
        }}
      >
        {/* Pencil / enrol icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
        Enrol Now
      </button>

      {/* ── Modal backdrop + panel ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(61,43,43,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Academy Enrolment Enquiry"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div
            className="relative w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg,#FDF0F0 0%,#fff 100%)',
              boxShadow: '0 32px 80px rgba(139,58,82,0.22)',
              border: '1px solid rgba(196,118,138,0.18)',
            }}
          >
            {/* Header */}
            <div
              className="px-7 pt-7 pb-5"
              style={{ borderBottom: '1px solid rgba(196,118,138,0.12)' }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close enquiry form"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-rose/10"
                style={{ color: '#8B3A52' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
              <p className="font-poppins text-[10px] font-semibold tracking-[0.22em] uppercase mb-1.5" style={{ color: '#C4768A' }}>
                Doorstep Diva Academy
              </p>
              <h2 className="font-playfair text-2xl font-bold" style={{ color: '#3D2B2B' }}>
                Enquire About Enrolment
              </h2>
              <p className="font-poppins text-xs mt-1.5" style={{ color: '#7A5C5C' }}>
                Fill this in and we&apos;ll call you back with course details &amp; fees.
              </p>
            </div>

            {/* Form body */}
            <div className="px-7 py-6">
              <AcademyEnquiryForm onClose={() => setOpen(false)} compact />
            </div>
          </div>
        </div>
      )}
    </>
  )
}