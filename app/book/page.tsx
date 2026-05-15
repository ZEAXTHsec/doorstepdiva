'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

// ── Types ──────────────────────────────────────────────────

type BookingSettings = {
  id: 1
  calendar_enabled: boolean
  deposit_amount: number
  updated_at?: string
}

type FormData = {
  customer_name: string
  customer_phone: string
  customer_email: string
  customer_address: string
  city: 'lucknow' | 'ayodhya'
  service_type: string
  addons: string[]
  notes: string
}

const EMPTY_FORM: FormData = {
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  customer_address: '',
  city: 'lucknow',
  service_type: '',
  addons: [],
  notes: '',
}

// ── Service + Add-On Data ──────────────────────────────────

const SERVICE_OPTIONS = [
  // Hair & Skin (Artist A)
  { label: '— Hair & Skin —', group: true },
  { label: 'Hair: Haircut (Short / Medium / Long)' },
  { label: 'Hair: Blow Dry & Styling' },
  { label: 'Hair: Hair Color — Root Touch-Up' },
  { label: 'Hair: Hair Color — Global (Small / Medium / Large)' },
  { label: 'Hair: Hair Highlights / Balayage' },
  { label: 'Hair: Keratin Treatment' },
  { label: 'Hair: Hair Smoothening / Rebonding' },
  { label: 'Hair: Hair Spa' },
  { label: 'Hair: Hair Fall / Dandruff Treatment' },
  { label: 'Skin: Sugar / Chocolate Wax' },
  { label: 'Skin: Rica Wax' },
  { label: 'Skin: Brazilian Wax' },
  { label: 'Skin: Roll-On Wax' },
  { label: 'Skin: Full Body Wax' },
  { label: 'Skin: Facial' },
  { label: 'Skin: Cleanup' },
  { label: 'Skin: De-Tan Treatment' },
  { label: 'Skin: Bleach' },
  { label: 'Skin: Manicure' },
  { label: 'Skin: Pedicure' },
  { label: 'Skin: Manicure + Pedicure Combo' },
  { label: 'Skin: Body Polishing' },
  { label: 'Skin: Body Massage' },
  { label: 'Skin: Chemical Peel' },
  { label: 'Skin: Threading' },
  // Makeup & Nails (Artist B)
  { label: '— Makeup & Nails —', group: true },
  { label: 'Nails: Acrylic Extensions' },
  { label: 'Nails: Gel / Shellac' },
  { label: 'Nails: PolyGel Extensions' },
  { label: 'Nails: Nail Infill / Maintenance' },
  { label: 'Nails: Nail Removal' },
  { label: 'Nails: Nail Art' },
  { label: 'Eyelash: Classic Extensions' },
  { label: 'Eyelash: Hybrid Extensions' },
  { label: 'Eyelash: Volume Extensions' },
  { label: 'Eyelash: Lash Fill' },
  { label: 'Eyelash: Lash Lift & Tint' },
  { label: 'Eyelash: Brow Lamination' },
  { label: 'Semi-Permanent: Microblading' },
  { label: 'Semi-Permanent: Combo Brows' },
  { label: 'Semi-Permanent: Lip Blush' },
  { label: 'Semi-Permanent: Nano Liner' },
]

const SKIN_HAIR_ADDONS = [
  { label: 'Eyebrow Threading (₹30)', value: 'Eyebrow Threading' },
  { label: 'Upper Lip Threading (₹30)', value: 'Upper Lip Threading' },
  { label: 'Full Face Threading (₹139)', value: 'Full Face Threading' },
  { label: 'Head Massage (₹299)', value: 'Head Massage' },
  { label: 'Scalp Ampoule — add-on to Hair Spa (₹120)', value: 'Scalp Ampoule' },
  { label: 'Face Mask (₹199)', value: 'Face Mask' },
]

const MAKEUP_NAILS_ADDONS = [
  { label: 'Nail Paint Application (₹100)', value: 'Nail Paint Application' },
  { label: 'Chrome / Mirror Powder (₹199)', value: 'Chrome Powder' },
  { label: 'French Tip (₹149)', value: 'French Tip' },
  { label: 'Gemstones / 3D (₹99/ nail)', value: 'Gemstones 3D' },
]

// ── Helpers ─────────────────────────────────────────────────

const WA_NUMBER = '917985183449'

function isHairSkinService(s: string) {
  const lower = s.toLowerCase()
  return lower.includes('hair') || lower.includes('skin') || lower.includes('wax') ||
    lower.includes('facial') || lower.includes('cleanup') || lower.includes('de-tan') ||
    lower.includes('bleach') || lower.includes('manicure') || lower.includes('pedicure') ||
    lower.includes('polishing') || lower.includes('massage') || lower.includes('peel') ||
    lower.includes('threading')
}

function isMakeupService(s: string) {
  const makeup = ['makeup', 'bridal', 'engagement', 'sangeet', 'reception', 'mehendi', 'mehndi', 'haldi', 'saree']
  return makeup.some(k => s.toLowerCase().includes(k))
}

// ── Sub-components ─────────────────────────────────────────

function WAIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// ── Main Page ──────────────────────────────────────────────

export default function BookPage() {
  const { items: cartItems, subtotal: cartSubtotal, clearCart } = useCart()
  const [settings, setSettings] = useState<BookingSettings | null>(null)
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form')
  const [result, setResult] = useState<Record<string, unknown> | null>(null)

  // Calendar state
  const [selDate, setSelDate] = useState('')
  const [selTime, setSelTime] = useState('')
  const [slots, setSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slotError, setSlotError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Calendar month view
  const [calMonth, setCalMonth] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })

  // Artist availability for calendar greying
  const [workingDays, setWorkingDays] = useState<number[]>([])
  const [blockedDates, setBlockedDates] = useState<string[]>([])

  // ── Fetch settings ──────────────────────────────────────
  useEffect(() => {
    const load = () => {
      fetch('/api/admin/settings', { cache: 'no-store' })
        .then(r => r.json())
        .then(d => setSettings(d))
        .catch(() => {})
    }
    load()
    window.addEventListener('focus', load)
    return () => window.removeEventListener('focus', load)
  }, [])

  // ── Fetch artist config when service changes ──────────
  useEffect(() => {
    if (!form.service_type || isMakeupService(form.service_type)) {
      setWorkingDays([])
      setBlockedDates([])
      return
    }
    fetch(`/api/artist-config?service=${encodeURIComponent(form.service_type)}`)
      .then(r => r.json())
      .then(d => {
        setWorkingDays(d.working_days || [])
        setBlockedDates(d.blocked_dates || [])
      })
      .catch(() => {})
  }, [form.service_type])

  // ── Sync cart items into form ─────────────────────────
  useEffect(() => {
    if (cartItems.length > 0) {
      const names = cartItems.map(i => `${i.name} (×${i.quantity})`)
      setForm(prev => ({
        ...prev,
        service_type: names.join(', '),
        addons: [], // addons from cart are part of service_type already
      }))
    }
  }, [cartItems])

  // ── Fetch slots when date changes ───────────────────────
  useEffect(() => {
    if (!selDate || !form.service_type || !settings?.calendar_enabled) return
    if (isMakeupService(form.service_type)) return

    setLoadingSlots(true)
    setSlotError('')

    fetch(`/api/slots?date=${selDate}&service=${encodeURIComponent(form.service_type)}`)
      .then(async r => {
        const j = await r.json()
        if (!r.ok) throw new Error(j.error || 'Failed to load slots')
        setSlots(j.slots || [])
        setSelTime('')
        if (j.slots?.length === 0) setSlotError('No slots available on this date.')
      })
      .catch(e => setSlotError(e.message))
      .finally(() => setLoadingSlots(false))
  }, [selDate, form.service_type, settings?.calendar_enabled])

  // ── Form helpers ────────────────────────────────────────
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
    if (!/^\d{10}$/.test(form.customer_phone.replace(/\D/g, ''))) return 'Please enter a valid 10-digit phone number.'
    if (!form.customer_email.includes('@')) return 'Please enter a valid email address.'
    if (!form.customer_address.trim()) return 'Please enter your full address so the artist knows where to come.'
    if (!form.service_type) return 'Please select a service.'
    if (!['lucknow', 'ayodhya'].includes(form.city)) return 'Please select a city.'
    return null
  }

  // ── Submit booking ──────────────────────────────────────
  async function handleSubmit() {
    const v = validateForm()
    if (v) { setError(v); return }

    setSubmitting(true)
    setError('')

    const body: Record<string, unknown> = {
      ...form,
      appointment_date: selDate || undefined,
      appointment_time: selTime || undefined,
      total_estimate: cartSubtotal > 0 ? cartSubtotal : undefined,
    }

    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const json = await res.json()

    if (!res.ok) {
      if (res.status === 409) {
        setError('This slot was just taken. Please pick another time.')
        // Refresh slots
        if (selDate) {
          setLoadingSlots(true)
          const sr = await fetch(`/api/slots?date=${selDate}&service=${encodeURIComponent(form.service_type)}`)
          const sj = await sr.json()
          setSlots(sj.slots || [])
          setLoadingSlots(false)
        }
      } else {
        setError(json.error || 'Something went wrong.')
      }
      setSubmitting(false)
      return
    }

    setResult(json.booking)
    setStep('success')
    setSubmitting(false)
    clearCart()
  }

  // ── Razorpay payment (non-makeup) ──────────────────────
  async function initiatePayment() {
    const v = validateForm()
    if (v) { setError(v); return }
    if (!settings) return

    setSubmitting(true)
    setError('')

    try {
      // 1. Create order (use cart subtotal if available, otherwise fall back to deposit)
      const payAmount = cartSubtotal > 0 ? cartSubtotal : settings.deposit_amount
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: payAmount }),
      })
      const order = await orderRes.json()
      if (!orderRes.ok) throw new Error(order.error || 'Order creation failed')

      // 2. Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'DoorStep Diva',
        description: form.service_type,
        order_id: order.id,
        prefill: {
          name: form.customer_name,
          email: form.customer_email,
          contact: form.customer_phone,
        },
        handler: async function (response: { razorpay_order_id: string; razorpay_payment_id: string }) {
          const res = await fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...form,
              appointment_date: selDate || undefined,
              appointment_time: selTime || undefined,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
            }),
          })
          const json = await res.json()
          if (res.ok) {
            setResult(json.booking)
            setStep('success')
            clearCart()
          } else {
            setError(json.error || 'Failed to save booking after payment.')
          }
          setSubmitting(false)
        },
        modal: {
          ondismiss: () => { setSubmitting(false) },
        },
      }
      const rzp = new (window as unknown as { Razorpay: new (o: typeof options) => { open(): void } }).Razorpay(options)
      rzp.open()
    } catch (e: unknown) {
      setError((e as Error).message || 'Payment failed')
      setSubmitting(false)
    }
  }

  // ── Calendar helpers ────────────────────────────────────
  const daysInMonth = new Date(calMonth.year, calMonth.month + 1, 0).getDate()
  const firstDay = new Date(calMonth.year, calMonth.month, 1).getDay()
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  function isPastOrToday(day: number) {
    const d = `${calMonth.year}-${String(calMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return d <= todayStr
  }

  function isDayDisabled(day: number): boolean {
    const dateStr = `${calMonth.year}-${String(calMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    // Past or today
    if (dateStr <= todayStr) return true

    // No artist config loaded yet — allow all future dates
    if (workingDays.length === 0 && blockedDates.length === 0) return false

    // Not a working day
    const dayOfWeek = new Date(dateStr + 'T12:00:00').getDay()
    if (!workingDays.includes(dayOfWeek)) return true

    // Blocked date
    if (blockedDates.includes(dateStr)) return true

    return false
  }

  function prevMonth() {
    setCalMonth(prev => prev.month === 0 ? { year: prev.year - 1, month: 11 } : { year: prev.year, month: prev.month - 1 })
  }

  function nextMonth() {
    setCalMonth(prev => prev.month === 11 ? { year: prev.year + 1, month: 0 } : { year: prev.year, month: prev.month + 1 })
  }

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  // Days abbreviations starting from Sunday
  const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const addonsToShow = form.service_type && isHairSkinService(form.service_type)
    ? SKIN_HAIR_ADDONS
    : form.service_type && !isHairSkinService(form.service_type)
    ? MAKEUP_NAILS_ADDONS
    : []

  // ── Render ──────────────────────────────────────────────

  // SUCCESS SCREEN
  if (step === 'success' && result) {
    const hasSlot = !!(selDate && selTime)
    const waMsg = `Hi, I just booked ${form.service_type}${hasSlot ? ` for ${selDate} at ${selTime}` : ''} in ${form.city === 'lucknow' ? 'Lucknow' : 'Ayodhya'}. My name is ${form.customer_name}.`
    return (
      <div className="min-h-screen bg-petal flex items-center justify-center px-6 py-24">
        <div className="max-w-lg w-full bg-white rounded-3xl p-10 border border-blush/20 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
          <h2 className="font-playfair text-3xl font-bold text-stone mb-2">Booking Received!</h2>
          <div className="font-poppins text-sm text-stone-light leading-relaxed space-y-2 mb-8 text-left bg-petal/50 rounded-2xl p-5">
            <p><strong>Name:</strong> {form.customer_name}</p>
            <p><strong>Service:</strong> {form.service_type}</p>
            <p><strong>City:</strong> {form.city === 'lucknow' ? 'Lucknow' : 'Ayodhya'}</p>
            {hasSlot && <p><strong>Date & Time:</strong> {selDate} at {(() => {
              const [h, m] = selTime.split(':').map(Number)
              const period = h >= 12 ? 'PM' : 'AM'
              const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
              return `${hour}:${m.toString().padStart(2, '0')} ${period}`
            })()}</p>}
            {!hasSlot && settings && (
              <p>A ₹{settings.deposit_amount} deposit has been collected. We&apos;ll call you to confirm your slot.</p>
            )}
            {form.addons.length > 0 && <p><strong>Add-ons:</strong> {form.addons.join(', ')}</p>}
          </div>
          <p className="font-poppins text-xs text-stone-light mb-8">We&apos;ll send a WhatsApp confirmation shortly.</p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press inline-flex items-center gap-2 font-poppins text-sm font-semibold px-8 py-4 bg-[#25D366] text-white hover:bg-[#1da851] transition-colors rounded-full"
          >
            <WAIcon size={16} />
            Message us on WhatsApp →
          </a>
        </div>
      </div>
    )
  }

  // BOOKING FORM
  return (
    <div className="min-h-screen bg-petal">
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-rose bg-rose/5 px-4 py-2 rounded-full mb-4">
            Book Your Session
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-stone mb-3">
            Reserve Your <em className="text-rose">Appointment</em>
          </h1>
          <p className="font-poppins text-sm text-stone-light">
            Fill in your details below. {settings?.calendar_enabled ? 'Pick a date and time from the live calendar.' : 'Pay a deposit to secure your spot — we\'ll call to confirm the time.'}
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 mb-6">
            <p className="font-poppins text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* ── FORM ── */}
        <div className="bg-white rounded-3xl border border-blush/20 p-6 md:p-8 space-y-5">

          {/* Cart summary */}
          {cartItems.length > 0 && (
            <div className="bg-petal/50 rounded-2xl p-5 border border-blush/15">
              <p className="font-poppins text-xs font-semibold text-stone uppercase tracking-wider mb-3">Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</p>
              <div className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="font-poppins text-sm text-stone">
                      {item.name} <span className="text-stone-light">×{item.quantity}</span>
                    </span>
                    <span className="font-poppins text-sm font-semibold text-stone">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="border-t border-blush/20 pt-2 flex justify-between">
                  <span className="font-poppins text-sm font-semibold text-stone">Estimated Total</span>
                  <span className="font-playfair text-lg font-bold text-rose">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="font-poppins text-xs font-semibold text-stone uppercase tracking-wider block mb-1.5">Full Name *</label>
            <input type="text" value={form.customer_name} onChange={e => updateForm('customer_name', e.target.value)}
              className="w-full border border-blush/40 rounded-xl px-4 py-3 font-poppins text-sm text-stone placeholder-stone-light/50 focus:outline-none focus:border-rose/50 transition-colors" placeholder="Your full name" />
          </div>

          {/* Phone + Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-poppins text-xs font-semibold text-stone uppercase tracking-wider block mb-1.5">Phone Number *</label>
              <input type="tel" value={form.customer_phone} onChange={e => updateForm('customer_phone', e.target.value)}
                className="w-full border border-blush/40 rounded-xl px-4 py-3 font-poppins text-sm text-stone placeholder-stone-light/50 focus:outline-none focus:border-rose/50 transition-colors" placeholder="10-digit number" />
            </div>
            <div>
              <label className="font-poppins text-xs font-semibold text-stone uppercase tracking-wider block mb-1.5">Email Address *</label>
              <input type="email" value={form.customer_email} onChange={e => updateForm('customer_email', e.target.value)}
                className="w-full border border-blush/40 rounded-xl px-4 py-3 font-poppins text-sm text-stone placeholder-stone-light/50 focus:outline-none focus:border-rose/50 transition-colors" placeholder="you@example.com" />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="font-poppins text-xs font-semibold text-stone uppercase tracking-wider block mb-1.5">Full Address / Area *</label>
            <textarea value={form.customer_address} onChange={e => updateForm('customer_address', e.target.value)}
              rows={2} className="w-full border border-blush/40 rounded-xl px-4 py-3 font-poppins text-sm text-stone placeholder-stone-light/50 focus:outline-none focus:border-rose/50 transition-colors resize-none" placeholder="Your complete address"/>
          </div>

          {/* City */}
          <div>
            <label className="font-poppins text-xs font-semibold text-stone uppercase tracking-wider block mb-2">City *</label>
            <div className="flex gap-4">
              {[{ value: 'lucknow', label: 'Lucknow' }, { value: 'ayodhya', label: 'Ayodhya' }].map(c => (
                <label key={c.value} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer font-poppins text-sm font-semibold transition-all ${
                  form.city === c.value ? 'border-rose bg-rose/5 text-rose' : 'border-blush/30 text-stone-light hover:border-rose/30'
                }`}>
                  <input type="radio" name="city" value={c.value} checked={form.city === c.value}
                    onChange={e => updateForm('city', e.target.value)} className="sr-only" />
                  {c.label}
                </label>
              ))}
            </div>
          </div>

          {/* Service — dropdown only when cart is empty */}
          {cartItems.length === 0 && (
            <div>
              <label className="font-poppins text-xs font-semibold text-stone uppercase tracking-wider block mb-1.5">Service Type *</label>
              <select value={form.service_type} onChange={e => {
                updateForm('service_type', e.target.value)
                updateForm('addons', [])
                setSelDate('')
                setSelTime('')
                setSlots([])
              }}
                className="w-full border border-blush/40 rounded-xl px-4 py-3 font-poppins text-sm text-stone placeholder-stone-light/50 focus:outline-none focus:border-rose/50 transition-colors bg-white">
                <option value="">Select a service...</option>
                {SERVICE_OPTIONS.map((o, i) =>
                  'group' in o
                    ? <option key={i} disabled className="font-semibold text-rose bg-petal/30">{o.label}</option>
                    : <option key={i} value={o.label}>{o.label}</option>
                )}
              </select>
            </div>
          )}

          {/* Add-ons */}
          {addonsToShow.length > 0 && (
            <div>
              <label className="font-poppins text-xs font-semibold text-stone uppercase tracking-wider block mb-2">Add-Ons (Optional)</label>
              <div className="grid sm:grid-cols-2 gap-2">
                {addonsToShow.map(a => (
                  <label key={a.value} className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all text-xs font-poppins ${
                    form.addons.includes(a.value) ? 'border-rose/50 bg-rose/5 text-rose font-medium' : 'border-blush/20 text-stone-light hover:border-rose/20'
                  }`}>
                    <input type="checkbox" checked={form.addons.includes(a.value)} onChange={() => toggleAddon(a.value)} className="sr-only" />
                    <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${form.addons.includes(a.value) ? 'bg-rose border-rose text-white' : 'border-blush/40'}`}>
                      {form.addons.includes(a.value) && '✓'}
                    </span>
                    {a.label}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* ── MODE BRANCH ── */}

          {/* Makeup lead form */}
          {form.service_type && isMakeupService(form.service_type) && (
            <div className="border-t border-blush/10 pt-5">
              <p className="font-poppins text-xs font-semibold text-stone uppercase tracking-wider mb-3">Submit Lead — We'll Contact You</p>
              <p className="font-poppins text-xs text-stone-light mb-4">Every makeup look is custom-quoted. Fill this form and we'll reach out to confirm your booking.</p>

              <div className="space-y-4">
                <div>
                  <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1.5">Preferred Event Date</label>
                  <input type="date" value={selDate} onChange={e => setSelDate(e.target.value)}
                    min={todayStr}
                    className="w-full border border-blush/40 rounded-xl px-4 py-3 font-poppins text-sm text-stone focus:outline-none focus:border-rose/50 transition-colors" />
                </div>
                <div>
                  <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1.5">Event Type / Notes</label>
                  <textarea value={form.notes}
                    onChange={e => updateForm('notes', e.target.value)}
                    rows={2}
                    placeholder="e.g., Wedding Day, Sangeet, Reception, Party — any preferences or reference images you'd like us to know"
                    className="w-full border border-blush/40 rounded-xl px-4 py-3 font-poppins text-sm text-stone placeholder-stone-light/50 focus:outline-none focus:border-rose/50 transition-colors resize-none" />
                </div>
              </div>

              <button onClick={handleSubmit} disabled={submitting}
                className="btn-press w-full mt-5 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors rounded-full disabled:opacity-50">
                {submitting ? 'Submitting...' : 'Submit Lead'}
              </button>

              <div className="mt-4 text-center">
                <p className="font-poppins text-[11px] text-stone-light/60 mb-2">or, message us directly</p>
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi, I'd like to book makeup for ${form.service_type}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-2 font-poppins text-xs font-semibold px-5 py-2.5 bg-[#25D366] text-white rounded-full hover:bg-[#1da851] transition-colors">
                  <WAIcon size={12} />
                  WhatsApp →
                </a>
              </div>
            </div>
          )}

          {/* Mode A: Calendar (non-makeup, calendar enabled) */}
          {settings?.calendar_enabled && form.service_type && !isMakeupService(form.service_type) && (
            <div className="border-t border-blush/10 pt-5">
              <p className="font-poppins text-xs font-semibold text-stone uppercase tracking-wider mb-3">Select Date & Time</p>

              {/* Calendar */}
              <div className="bg-petal/50 rounded-2xl p-4 border border-blush/15">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-rose/10 flex items-center justify-center text-rose font-bold text-sm">‹</button>
                  <span className="font-poppins text-sm font-semibold text-stone">{MONTHS[calMonth.month]} {calMonth.year}</span>
                  <button onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-rose/10 flex items-center justify-center text-rose font-bold text-sm">›</button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center mb-1">
                  {DAY_HEADERS.map(d => (
                    <span key={d} className="font-poppins text-[10px] font-semibold text-stone-light/70 py-1">{d}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const dateStr = `${calMonth.year}-${String(calMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                    const disabled = isDayDisabled(day)
                    const isSel = dateStr === selDate
                    return (
                      <button
                        key={day}
                        disabled={disabled}
                        onClick={() => { setSelDate(dateStr); setSelTime('') }}
                        className={`font-poppins text-xs h-9 rounded-lg transition-all ${
                          disabled ? 'text-stone-light/25 cursor-not-allowed bg-stone-light/5' :
                          isSel ? 'bg-rose text-white font-bold shadow-sm' :
                          'hover:bg-rose/10 text-stone font-medium'
                        }`}
                      >{day}</button>
                    )
                  })}
                </div>
              </div>

              {/* Slots */}
              {selDate && (
                <div className="mt-4">
                  <p className="font-poppins text-[11px] text-stone-light mb-2">{new Date(selDate + 'T12:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  {loadingSlots && <p className="font-poppins text-xs text-stone-light">Loading slots...</p>}
                  {!loadingSlots && slotError && (
                    <div className="text-center py-4">
                      <p className="font-poppins text-xs text-stone-light mb-2">{slotError}</p>
                      <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="font-poppins text-xs text-rose underline">WhatsApp us</a>
                    </div>
                  )}
                  {!loadingSlots && slots.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {slots.map(t => {
                        const [h, m] = t.split(':').map(Number)
                        const period = h >= 12 ? 'PM' : 'AM'
                        const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
                        const label = `${hour}:${m.toString().padStart(2, '0')} ${period}`
                        return (
                          <button key={t}
                            onClick={() => setSelTime(t)}
                            className={`font-poppins text-xs font-semibold px-4 py-2.5 rounded-xl border transition-all ${
                              selTime === t ? 'bg-rose text-white border-rose' : 'bg-white border-blush/30 text-stone hover:border-rose/40'
                            }`}
                          >{label}</button>
                        )
                      })}
                    </div>
                  )}
                  {selTime && (
                    <button onClick={initiatePayment} disabled={submitting}
                      className="btn-press w-full mt-4 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors rounded-full disabled:opacity-50">
                      {submitting ? 'Processing...' : `Pay ₹${cartSubtotal > 0 ? cartSubtotal : settings?.deposit_amount || 500} to Confirm`}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Mode B: Deposit payment (calendar disabled, non-makeup) */}
          {settings && !settings.calendar_enabled && form.service_type && !isMakeupService(form.service_type) && (
            <div className="border-t border-blush/10 pt-5">
              <div className="bg-stone/5 border border-stone/15 rounded-2xl p-5 text-center">
                <p className="font-poppins text-sm font-semibold text-stone mb-2">Calendar Currently Full</p>
                <p className="font-poppins text-xs text-stone-light mb-5">
                  To secure your appointment, please pay a ₹{settings.deposit_amount} deposit. We&apos;ll call you within a few hours to confirm your date and time.
                </p>
                <button onClick={initiatePayment} disabled={submitting}
                  className="btn-press inline-flex items-center gap-2 font-poppins text-sm font-semibold px-8 py-4 bg-rose text-white hover:bg-mauve transition-colors rounded-full disabled:opacity-50">
                  {submitting ? 'Processing...' : `Pay ₹${cartSubtotal > 0 ? cartSubtotal : settings.deposit_amount} Deposit`}
                </button>
              </div>
            </div>
          )}

          {/* No service selected yet — only when cart empty */}
          {!form.service_type && cartItems.length === 0 && (
            <div className="border-t border-blush/10 pt-5 text-center">
              <p className="font-poppins text-xs text-stone-light/60">Select a service above or add items to your cart first.</p>
            </div>
          )}

        </div>

        {/* Back link */}
        <div className="text-center mt-8">
          <Link href="/" className="font-poppins text-xs text-stone-light hover:text-rose transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
