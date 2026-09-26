'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

// ── Types ──────────────────────────────────────────────────

type CityOption = 'delhi-ncr' | 'lucknow' | 'ayodhya'

type FormData = {
  customer_name: string
  customer_phone: string
  customer_email: string
  customer_address: string
  city: CityOption
  service_type: string
  addons: string[]
  preferred_timing: string
  specific_date: string
  notes: string
}

const EMPTY_FORM: FormData = {
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  customer_address: '',
  city: 'delhi-ncr',
  service_type: '',
  addons: [],
  preferred_timing: 'Tomorrow — Morning (9:00 AM – 12:00 PM)',
  specific_date: '',
  notes: '',
}

// ── Service + Add-On Data ──────────────────────────────────

interface ServiceOption { label: string; group?: true; minPrice?: number }

const SERVICE_OPTIONS: ServiceOption[] = [
  // Hair & Skin
  { label: '— Hair & Skin Services —', group: true },
  { label: 'Hair: Haircut & Blowdry (Short / Medium / Long)', minPrice: 349 },
  { label: 'Hair: Blow Dry & Styling', minPrice: 449 },
  { label: 'Hair: Hair Color — Root Touch-Up', minPrice: 699 },
  { label: 'Hair: Hair Color — Global', minPrice: 1200 },
  { label: 'Hair: Highlights / Balayage', minPrice: 1799 },
  { label: 'Hair: Keratin Treatment', minPrice: 2599 },
  { label: 'Hair: Smoothening / Rebonding', minPrice: 2499 },
  { label: 'Hair: Luxury Hair Spa', minPrice: 649 },
  { label: 'Hair: Hair Fall / Anti-Dandruff Treatment', minPrice: 899 },
  { label: 'Skin: Sugar / Chocolate Wax', minPrice: 199 },
  { label: 'Skin: Rica Waxing (Gentle / Sensitive Skin)', minPrice: 499 },
  { label: 'Skin: Brazilian Bikini Wax', minPrice: 499 },
  { label: 'Skin: Full Body Rica Wax', minPrice: 799 },
  { label: 'Skin: Signature Glow Facial', minPrice: 899 },
  { label: 'Skin: Korean Glass Skin Hydration Facial', minPrice: 1499 },
  { label: 'Skin: Deep Pore Cleanup', minPrice: 399 },
  { label: 'Skin: Herbal De-Tan Treatment', minPrice: 499 },
  { label: 'Skin: Deluxe Manicure + Pedicure Combo', minPrice: 699 },
  { label: 'Skin: Full Body Polishing', minPrice: 799 },
  { label: 'Skin: Relaxing Body Massage', minPrice: 699 },
  { label: 'Skin: Eyebrow & Face Threading', minPrice: 49 },
  // Makeup & Nails
  { label: '— Makeup, Bridal & Nails —', group: true },
  { label: 'Bridal: HD Bridal Makeup & Saree Draping', minPrice: 4999 },
  { label: 'Bridal: Airbrush Bridal Package', minPrice: 8999 },
  { label: 'Party / Engagement / Sangeet Makeup', minPrice: 1999 },
  { label: 'Nails: Acrylic Nail Extensions', minPrice: 299 },
  { label: 'Nails: Gel / Shellac Polish', minPrice: 249 },
  { label: 'Nails: PolyGel Extensions', minPrice: 349 },
  { label: 'Nails: Nail Art & French Tips', minPrice: 99 },
  { label: 'Eyelash: Classic / Hybrid Lash Extensions', minPrice: 799 },
  { label: 'Eyelash: Lash Lift & Tint', minPrice: 399 },
  { label: 'Brows: Brow Lamination', minPrice: 799 },
  { label: 'Semi-Permanent: Microblading / Ombre Brows', minPrice: 7999 },
  { label: 'Semi-Permanent: Lip Blush', minPrice: 7999 },
]

function getServiceMinPrice(label: string): number {
  const opt = SERVICE_OPTIONS.find(o => o.label === label)
  return opt?.minPrice || 0
}

const COMMON_ADDONS = [
  { label: 'Eyebrow Threading (+₹30)', value: 'Eyebrow Threading' },
  { label: 'Upper Lip Threading (+₹30)', value: 'Upper Lip Threading' },
  { label: 'Full Face Threading (+₹139)', value: 'Full Face Threading' },
  { label: 'Quick De-tan Pack (+₹199)', value: 'Quick De-tan' },
  { label: 'Scalp Massage & Serum Ampoule (+₹299)', value: 'Scalp Ampoule' },
  { label: 'Gel French Tip Add-on (+₹149)', value: 'French Tip' },
  { label: 'Nail Art / Chrome Glaze (+₹99)', value: 'Chrome Glaze' },
]

const TIMING_OPTIONS = [
  'Today — Urgent / ASAP Dispatch',
  'Tomorrow — Morning (9:00 AM – 12:00 PM)',
  'Tomorrow — Afternoon (12:00 PM – 4:00 PM)',
  'Tomorrow — Evening (4:00 PM – 8:00 PM)',
  'Specific Upcoming Date',
]

const WA_NUMBER = '917985183449'

export default function BookPage() {
  const { items: cartItems, subtotal: cartSubtotal, clearCart } = useCart()
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [selectedServicePrice, setSelectedServicePrice] = useState(0)

  // Sync cart items into form if user added any
  useEffect(() => {
    if (cartItems.length > 0) {
      const names = cartItems.map(i => `${i.name} (×${i.quantity})`)
      setForm(prev => ({
        ...prev,
        service_type: names.join(', '),
      }))
    }
  }, [cartItems])

  function updateForm(k: keyof FormData, v: string | string[]) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  function toggleAddon(val: string) {
    setForm(prev => ({
      ...prev,
      addons: prev.addons.includes(val) ? prev.addons.filter(a => a !== val) : [...prev.addons, val],
    }))
  }

  function validateForm(): string | null {
    if (!form.customer_name.trim()) return 'Please enter your full name.'
    const cleanPhone = form.customer_phone.replace(/\D/g, '')
    if (cleanPhone.length !== 10) return 'Please enter a valid 10-digit mobile number so we can call or WhatsApp you.'
    if (!form.customer_address.trim()) return 'Please enter your home address & locality so our artist can arrive on time.'
    if (!form.service_type) return 'Please select at least one beauty service.'
    return null
  }

  const effectiveEstimate = cartSubtotal > 0 ? cartSubtotal : (selectedServicePrice > 0 ? selectedServicePrice : null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const v = validateForm()
    if (v) {
      setError(v)
      window.scrollTo({ top: 300, behavior: 'smooth' })
      return
    }

    setSubmitting(true)
    setError('')

    const timingSummary = form.preferred_timing === 'Specific Upcoming Date' && form.specific_date
      ? `Date: ${form.specific_date}`
      : form.preferred_timing

    const body = {
      customer_name: form.customer_name.trim(),
      customer_phone: form.customer_phone.trim(),
      customer_email: form.customer_email.trim() || `${form.customer_phone.replace(/\D/g, '')}@doorstepdiva.lead`,
      customer_address: form.customer_address.trim(),
      city: form.city,
      service_type: form.service_type,
      addons: form.addons,
      preferred_timing: timingSummary,
      appointment_date: form.specific_date || null,
      total_estimate: effectiveEstimate,
      notes: form.notes.trim() || undefined,
    }

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit booking')
      }

      setStep('success')
      clearCart()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to submit booking. Please reach us directly on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  const cityNameDisplay = form.city === 'delhi-ncr' ? 'Delhi NCR' : form.city === 'lucknow' ? 'Lucknow' : 'Ayodhya'

  const waSuccessMsg = encodeURIComponent(
    `Hi DoorStep Diva! I just requested a booking for ${form.service_type} in ${cityNameDisplay}. Name: ${form.customer_name}, Phone: ${form.customer_phone}. Preferred Time: ${form.preferred_timing === 'Specific Upcoming Date' ? form.specific_date : form.preferred_timing}. Please confirm my artist!`
  )

  return (
    <div className="min-h-screen bg-[#FDF8F9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Breadcrumb / Status Banner */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center text-xs font-semibold text-[#8B3A52] hover:underline">
            ← Back to Home
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#8B3A52]/10 text-[#8B3A52]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Booking Desk Online • Express Dispatch
          </span>
        </div>

        {step === 'success' ? (
          /* ── SUCCESS SCREEN ── */
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#F0D5DD] text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              ✓
            </div>
            
            <h1 className="font-playfair text-3xl sm:text-4xl text-stone-900 font-bold mb-3">
              Booking Request Received!
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto mb-8">
              Thank you, <strong>{form.customer_name}</strong>. Our beauty coordinator has received your request and will call or message you on <strong>{form.customer_phone}</strong> within 15 minutes to confirm your certified artist and exact arrival time.
            </p>

            {/* Quick summary box */}
            <div className="bg-[#FAF3F5] rounded-2xl p-6 text-left mb-8 border border-[#EACCD6]/50">
              <h2 className="text-xs font-bold text-[#8B3A52] uppercase tracking-wider mb-4">
                Booking Summary
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-stone-500 block text-xs">Service Selected:</span>
                  <span className="font-semibold text-stone-900">{form.service_type}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">City / Region:</span>
                  <span className="font-semibold text-stone-900">{cityNameDisplay}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">Preferred Timing:</span>
                  <span className="font-semibold text-stone-900">
                    {form.preferred_timing === 'Specific Upcoming Date' ? form.specific_date : form.preferred_timing}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">Payment Method:</span>
                  <span className="font-semibold text-emerald-700">Pay after service (UPI / Cash)</span>
                </div>
                {form.addons.length > 0 && (
                  <div className="sm:col-span-2">
                    <span className="text-stone-500 block text-xs">Add-ons:</span>
                    <span className="font-medium text-stone-800">{form.addons.join(', ')}</span>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <span className="text-stone-500 block text-xs">Service Address:</span>
                  <span className="text-stone-800">{form.customer_address}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${waSuccessMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-md hover:bg-[#1EBE5D] transition-all hover:scale-[1.02]"
              >
                <span>Instant Confirm on WhatsApp</span>
              </a>
              <a
                href={`tel:+${WA_NUMBER}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-stone-900 text-white font-semibold text-sm hover:bg-stone-800 transition-all"
              >
                <span>Call Coordinator (+91 7985183449)</span>
              </a>
            </div>

            {/* Trust timeline */}
            <div className="border-t border-stone-100 pt-8 max-w-md mx-auto text-left">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4 text-center">
                What Happens Next
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                  <span><strong>Coordinator Call:</strong> We confirm your exact address & artist dispatch timing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                  <span><strong>Sanitized Single-Use Kit:</strong> Your certified female artist arrives with a sealed kit opened in your presence.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                  <span><strong>Zero Risk Payment:</strong> Relax, enjoy your salon experience, and pay only after completion.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link href="/" className="text-xs text-[#8B3A52] font-semibold hover:underline">
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          /* ── BOOKING FORM ── */
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#F0D5DD]">
            
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="font-playfair text-3xl sm:text-4xl text-stone-900 font-bold mb-2">
                Book At-Home Salon Service
              </h1>
              <p className="text-stone-600 text-sm max-w-lg mx-auto">
                Certified artists delivered to your doorstep across <strong>Delhi NCR, Lucknow & Ayodhya</strong>. Zero advance required — pay after your service.
              </p>
            </div>

            {/* Trust Pill Bar */}
            <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-4 bg-[#FDF2F5] p-3 sm:p-4 rounded-2xl border border-[#F3DBE2] text-center">
              <div>
                <span className="block text-base sm:text-lg">🛡️</span>
                <span className="text-[11px] sm:text-xs font-semibold text-stone-800">100% Sealed Kits</span>
              </div>
              <div>
                <span className="block text-base sm:text-lg">👩‍🎨</span>
                <span className="text-[11px] sm:text-xs font-semibold text-stone-800">Verified Artists</span>
              </div>
              <div>
                <span className="block text-base sm:text-lg">💳</span>
                <span className="text-[11px] sm:text-xs font-semibold text-stone-800">Pay After Service</span>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* 1. SELECT CITY */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  1. Choose Your City / Region *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'delhi-ncr', title: 'Delhi NCR', subtitle: 'South Delhi, Noida, Gurgaon, Ghaziabad' },
                    { value: 'lucknow', title: 'Lucknow', subtitle: 'Gomti Nagar, Hazratganj, Aliganj, etc.' },
                    { value: 'ayodhya', title: 'Ayodhya', subtitle: 'Ayodhya & Surrounding Townships' },
                  ].map(c => {
                    const isSelected = form.city === c.value
                    return (
                      <button
                        type="button"
                        key={c.value}
                        onClick={() => updateForm('city', c.value)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          isSelected
                            ? 'border-[#8B3A52] bg-[#FDF2F5] ring-2 ring-[#8B3A52]/20'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold text-sm ${isSelected ? 'text-[#8B3A52]' : 'text-stone-900'}`}>
                            {c.title}
                          </span>
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#8B3A52] bg-[#8B3A52]' : 'border-stone-300'}`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 leading-tight">
                          {c.subtitle}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 2. SELECT SERVICE */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                    2. Select Service(s) *
                  </label>
                  {cartItems.length > 0 && (
                    <span className="text-xs text-[#8B3A52] font-semibold">
                      {cartItems.length} items from cart loaded
                    </span>
                  )}
                </div>

                {cartItems.length > 0 ? (
                  <div className="p-4 rounded-2xl bg-[#FDF2F5] border border-[#F3DBE2]">
                    <div className="text-xs font-semibold text-stone-700 mb-2">Selected Cart Services:</div>
                    <ul className="text-sm font-medium text-stone-900 space-y-1">
                      {cartItems.map(item => (
                        <li key={item.id} className="flex justify-between items-center">
                          <span>• {item.name} <span className="text-stone-500 text-xs">(×{item.quantity})</span></span>
                          <span className="font-semibold text-[#8B3A52]">₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-[#F3DBE2] mt-3 pt-2 flex justify-between items-center text-xs font-bold text-stone-800">
                      <span>Total Cart Estimate:</span>
                      <span className="text-sm text-[#8B3A52]">₹{cartSubtotal}</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <select
                      value={form.service_type}
                      onChange={e => {
                        const val = e.target.value
                        updateForm('service_type', val)
                        setSelectedServicePrice(getServiceMinPrice(val))
                      }}
                      className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A52]/20 focus:border-[#8B3A52]"
                      required
                    >
                      <option value="">-- Choose a beauty service --</option>
                      {SERVICE_OPTIONS.map((opt, i) =>
                        opt.group ? (
                          <option key={i} disabled className="font-bold text-stone-500 bg-stone-100">
                            {opt.label}
                          </option>
                        ) : (
                          <option key={i} value={opt.label}>
                            {opt.label} {opt.minPrice ? `(from ₹${opt.minPrice})` : ''}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}

                {/* Popular Add-ons */}
                <div className="mt-4">
                  <span className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    Optional Quick Add-ons:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_ADDONS.map(addon => {
                      const checked = form.addons.includes(addon.value)
                      return (
                        <button
                          type="button"
                          key={addon.value}
                          onClick={() => toggleAddon(addon.value)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            checked
                              ? 'bg-[#8B3A52] text-white border-[#8B3A52]'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          {checked ? '✓ ' : '+ '} {addon.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* 3. TIMING PREFERENCE */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  3. Preferred Timing / Arrival Window *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TIMING_OPTIONS.map(timeOption => {
                    const isSelected = form.preferred_timing === timeOption
                    return (
                      <button
                        type="button"
                        key={timeOption}
                        onClick={() => updateForm('preferred_timing', timeOption)}
                        className={`text-left px-4 py-3 rounded-2xl border text-xs sm:text-sm font-medium transition-all ${
                          isSelected
                            ? 'border-[#8B3A52] bg-[#FDF2F5] text-[#8B3A52] font-semibold'
                            : 'border-stone-200 text-stone-700 bg-white hover:border-stone-300'
                        }`}
                      >
                        {isSelected ? '● ' : '○ '} {timeOption}
                      </button>
                    )
                  })}
                </div>

                {form.preferred_timing === 'Specific Upcoming Date' && (
                  <div className="mt-3">
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Choose Your Date:
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={form.specific_date}
                      onChange={e => updateForm('specific_date', e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A52]/20 focus:border-[#8B3A52]"
                      required
                    />
                  </div>
                )}
              </div>

              {/* 4. CONTACT & ADDRESS */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                  4. Your Contact & Doorstep Address *
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-stone-600 font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={form.customer_name}
                      onChange={e => updateForm('customer_name', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B3A52]/20 focus:border-[#8B3A52]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-600 font-medium mb-1">10-Digit Mobile Number *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={form.customer_phone}
                      onChange={e => updateForm('customer_phone', e.target.value)}
                      maxLength={10}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B3A52]/20 focus:border-[#8B3A52]"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-stone-600 font-medium mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. priya@gmail.com"
                    value={form.customer_email}
                    onChange={e => updateForm('customer_email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B3A52]/20 focus:border-[#8B3A52]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-stone-600 font-medium mb-1">Complete Address & Landmark *</label>
                  <textarea
                    rows={3}
                    placeholder="House/Flat number, Building name, Street, Landmark, Area name"
                    value={form.customer_address}
                    onChange={e => updateForm('customer_address', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B3A52]/20 focus:border-[#8B3A52]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-600 font-medium mb-1">Special Instructions / Requests (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Sensitive skin, bridal trial needed, prefer afternoon call"
                    value={form.notes}
                    onChange={e => updateForm('notes', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B3A52]/20 focus:border-[#8B3A52]"
                  />
                </div>
              </div>

              {/* Reassurance Banner */}
              <div className="bg-[#FAF3F5] rounded-2xl p-4 border border-[#EACCD6]/50 flex items-start gap-3">
                <span className="text-xl">✨</span>
                <div className="text-xs text-stone-700 leading-relaxed">
                  <strong>Zero Advance Fee:</strong> You do not need to make any payment online right now. Our coordinator will call/WhatsApp you within 15 minutes to confirm artist arrival. You can pay securely via UPI or cash after your service.
                </div>
              </div>

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-8 rounded-full bg-[#8B3A52] text-white font-semibold text-base shadow-lg hover:bg-[#732F42] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <span>Confirm At-Home Booking Request (Pay After Service) →</span>
                  )}
                </button>
                <p className="text-center text-xs text-stone-500 mt-3">
                  Need immediate help? Call us directly at{' '}
                  <a href={`tel:+${WA_NUMBER}`} className="font-semibold text-[#8B3A52] underline">
                    +91 7985183449
                  </a>
                </p>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  )
}
