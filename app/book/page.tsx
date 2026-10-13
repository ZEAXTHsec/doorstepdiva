'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { normalizeIndianPhone } from '@/lib/booking-utils'

// ── Types ──────────────────────────────────────────────────

type CityOption = 'delhi-ncr' | 'lucknow' | 'ayodhya'

type FormData = {
  customer_name: string
  customer_phone: string
  customer_email: string
  customer_address: string
  city: CityOption
  selected_services: string[]
  custom_services: string
  addons: string[]
  preferred_day: string
  preferred_time_window: string
  specific_date: string
  notes: string
}

const EMPTY_FORM: FormData = {
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  customer_address: '',
  city: 'delhi-ncr',
  selected_services: [],
  custom_services: '',
  addons: [],
  preferred_day: 'Flexible / Call Me to Coordinate',
  preferred_time_window: 'Anytime / Flexible',
  specific_date: '',
  notes: '',
}

// ── Luxury Minimal SVG Icons (Delicate 1.5px Line-Art) ───────

function SparkleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
      <path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  )
}

function HairCareIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <line x1="8.2" y1="7.8" x2="20" y2="19.6" />
      <line x1="8.2" y1="16.2" x2="20" y2="4.4" />
      <path d="M14 2h7m-5 0v3m3-3v3m2-3v3" />
    </svg>
  )
}

function FacialSkinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2h4M12 2v3M8 5h8v2l-1.5 2.5v9a3.5 3.5 0 0 1-3.5 3.5 3.5 3.5 0 0 1-3.5-3.5V9.5L6 7V5z" />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" />
      <path d="M18.5 9.5a5 5 0 0 1 0 7" />
    </svg>
  )
}

function WaxingThreadingIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5C7.5 8 5.5 12 5.5 15a6.5 6.5 0 0 0 13 0c0-3-2-7-6.5-12.5z" />
      <path d="M12 9v7m-3-3.5h6" />
    </svg>
  )
}

function NailsLashIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="9" width="10" height="12" rx="2.5" />
      <rect x="10" y="3" width="4" height="6" rx="1" />
      <line x1="7" y1="14" x2="17" y2="14" />
      <path d="M18.5 5a7.5 7.5 0 0 1 3.5 4" />
    </svg>
  )
}

function BridalFestiveIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18h18L19 7.5l-5 3.5-2-6-2 6-5-3.5L3 18z" />
      <circle cx="5" cy="7" r="1" fill="currentColor" />
      <circle cx="12" cy="4" r="1" fill="currentColor" />
      <circle cx="19" cy="7" r="1" fill="currentColor" />
      <circle cx="12" cy="14" r="1.5" />
    </svg>
  )
}

function getCategoryIcon(category: string, className = "w-3.5 h-3.5") {
  switch (category) {
    case 'Hair':
      return <HairCareIcon className={className} />
    case 'Skin & Facials':
      return <FacialSkinIcon className={className} />
    case 'Waxing & Threading':
      return <WaxingThreadingIcon className={className} />
    case 'Nails & Lashes':
      return <NailsLashIcon className={className} />
    case 'Bridal & Festive':
      return <BridalFestiveIcon className={className} />
    case 'All Popular':
    default:
      return <SparkleIcon className={className} />
  }
}

// ── Service Catalog & Categories ───────────────────────────

interface CatalogService {
  id: string
  name: string
  category: 'Hair' | 'Skin & Facials' | 'Waxing & Threading' | 'Nails & Lashes' | 'Bridal & Festive'
  minPrice: number
  image: string
}

const CATALOG_SERVICES: CatalogService[] = [
  // Hair
  { id: 'hair-spa', name: 'Luxury Hair Spa & Scalp Therapy', category: 'Hair', minPrice: 649, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png' },
  { id: 'haircut-blowdry', name: 'Haircut & Styling Blowdry', category: 'Hair', minPrice: 349, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png' },
  { id: 'hair-keratin', name: 'Keratin Protein Treatment', category: 'Hair', minPrice: 2599, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png' },
  { id: 'hair-smoothening', name: 'Smoothening / Rebonding', category: 'Hair', minPrice: 2499, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png' },
  { id: 'hair-color-root', name: 'Hair Color (Root Touch-Up)', category: 'Hair', minPrice: 699, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png' },
  { id: 'hair-color-global', name: 'Hair Color (Global L\'Oréal)', category: 'Hair', minPrice: 1200, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png' },
  { id: 'hair-balayage', name: 'Highlights / Balayage', category: 'Hair', minPrice: 1799, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png' },
  { id: 'hair-fall-therapy', name: 'Anti-Hairfall Therapy Pack', category: 'Hair', minPrice: 899, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png' },

  // Skin & Facials
  { id: 'facial-glow', name: 'Signature Radiance Glow Facial', category: 'Skin & Facials', minPrice: 899, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png' },
  { id: 'facial-korean', name: 'Korean Glass Skin Hydration Facial', category: 'Skin & Facials', minPrice: 1499, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png' },
  { id: 'facial-cleanup', name: 'Deep Pore Fruit / Herbal Cleanup', category: 'Skin & Facials', minPrice: 399, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png' },
  { id: 'skin-detan', name: 'Herbal De-Tan Pack & Brightening', category: 'Skin & Facials', minPrice: 499, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png' },
  { id: 'skin-polishing', name: 'Full Body Polishing & Scrub', category: 'Skin & Facials', minPrice: 799, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png' },
  { id: 'skin-massage', name: 'Full Body Relaxing Therapy', category: 'Skin & Facials', minPrice: 699, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png' },

  // Waxing & Threading
  { id: 'wax-full-body', name: 'Full Body Rica Waxing', category: 'Waxing & Threading', minPrice: 799, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png' },
  { id: 'wax-arms-legs', name: 'Rica Waxing (Full Arms & Legs)', category: 'Waxing & Threading', minPrice: 499, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png' },
  { id: 'wax-bikini', name: 'Brazilian Bikini Wax', category: 'Waxing & Threading', minPrice: 499, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png' },
  { id: 'wax-chocolate', name: 'Sugar / Chocolate Waxing', category: 'Waxing & Threading', minPrice: 199, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png' },
  { id: 'threading-face', name: 'Full Face Threading & Eyebrows', category: 'Waxing & Threading', minPrice: 139, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png' },
  { id: 'threading-eyebrow', name: 'Eyebrow & Upper Lip Threading', category: 'Waxing & Threading', minPrice: 49, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png' },

  // Nails & Lashes
  { id: 'mani-pedi', name: 'Deluxe Manicure + Pedicure Combo', category: 'Nails & Lashes', minPrice: 699, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png' },
  { id: 'nail-acrylic', name: 'Acrylic Nail Extensions', category: 'Nails & Lashes', minPrice: 299, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png' },
  { id: 'nail-gel', name: 'Gel / Shellac Nail Polish', category: 'Nails & Lashes', minPrice: 249, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png' },
  { id: 'nail-polygel', name: 'PolyGel Nail Architecture', category: 'Nails & Lashes', minPrice: 349, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png' },
  { id: 'nail-art', name: 'Nail Art & French Tips', category: 'Nails & Lashes', minPrice: 99, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png' },
  { id: 'lash-extensions', name: 'Classic / Hybrid Lash Extensions', category: 'Nails & Lashes', minPrice: 799, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png' },
  { id: 'lash-lift', name: 'Lash Lift & Keratin Tint', category: 'Nails & Lashes', minPrice: 399, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png' },

  // Bridal & Festive
  { id: 'festive-karwa', name: 'Karwa Chauth Solah Shringar Package', category: 'Bridal & Festive', minPrice: 999, image: '/images/karwa_chauth_hero.jpg' },
  { id: 'bridal-hd', name: 'HD Bridal Makeup & Saree Draping', category: 'Bridal & Festive', minPrice: 4999, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png' },
  { id: 'bridal-airbrush', name: 'Airbrush Luxury Bridal Package', category: 'Bridal & Festive', minPrice: 8999, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png' },
  { id: 'party-makeup', name: 'Party / Engagement / Sangeet Makeup', category: 'Bridal & Festive', minPrice: 1999, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png' },
  { id: 'pre-bridal', name: 'Custom Pre-Bridal Skin & Hair Glow', category: 'Bridal & Festive', minPrice: 3999, image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png' },
]

const SERVICE_CATEGORIES = [
  'All Popular',
  'Hair',
  'Skin & Facials',
  'Waxing & Threading',
  'Nails & Lashes',
  'Bridal & Festive',
] as const

interface CommonAddon {
  label: string
  value: string
  price: number
  image: string
}

const COMMON_ADDONS: CommonAddon[] = [
  {
    label: 'Eyebrow Threading',
    value: 'Eyebrow Threading',
    price: 30,
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png',
  },
  {
    label: 'Upper Lip Threading',
    value: 'Upper Lip Threading',
    price: 30,
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png',
  },
  {
    label: 'Full Face Threading',
    value: 'Full Face Threading',
    price: 139,
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png',
  },
  {
    label: 'Quick De-tan Pack',
    value: 'Quick De-tan',
    price: 199,
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
  },
  {
    label: 'Scalp Massage & Ampoule',
    value: 'Scalp Ampoule',
    price: 299,
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png',
  },
  {
    label: 'Gel French Tip Add-on',
    value: 'French Tip',
    price: 149,
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png',
  },
  {
    label: 'Nail Art / Chrome Glaze',
    value: 'Chrome Glaze',
    price: 99,
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png',
  },
]

const DAY_OPTIONS = [
  'Flexible / Call Me to Coordinate',
  'Preferred Day: Tomorrow',
  'Preferred Day: This Weekend',
  'Specific Upcoming Date',
]

const TIME_WINDOW_OPTIONS = [
  'Anytime / Flexible',
  'Morning (Before 12:00 PM)',
  'Afternoon (12:00 PM – 4:00 PM)',
  'Evening (After 4:00 PM)',
]

const WA_NUMBER = '919129577514'

export default function BookPage() {
  const { items: cartItems, subtotal: cartSubtotal, clearCart } = useCart()
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [activeCategory, setActiveCategory] = useState<string>('All Popular')
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Sync cart items into selected_services if user added items earlier
  useEffect(() => {
    if (cartItems.length > 0) {
      const names = cartItems.map(i => `${i.name} (×${i.quantity})`)
      setForm(prev => {
        const unique = Array.from(new Set([...prev.selected_services, ...names]))
        return { ...prev, selected_services: unique }
      })
    }
  }, [cartItems])

  function updateForm<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  function toggleService(serviceName: string) {
    setForm(prev => {
      const exists = prev.selected_services.includes(serviceName)
      return {
        ...prev,
        selected_services: exists
          ? prev.selected_services.filter(s => s !== serviceName)
          : [...prev.selected_services, serviceName],
      }
    })
  }

  function toggleAddon(val: string) {
    setForm(prev => ({
      ...prev,
      addons: prev.addons.includes(val) ? prev.addons.filter(a => a !== val) : [...prev.addons, val],
    }))
  }

  // Calculate pricing estimates
  const selectedServicesTotal = form.selected_services.reduce((sum, sName) => {
    const found = CATALOG_SERVICES.find(s => s.name === sName)
    return sum + (found?.minPrice || 0)
  }, 0)

  const addonsTotal = form.addons.reduce((sum, addonVal) => {
    const found = COMMON_ADDONS.find(a => a.value === addonVal)
    return sum + (found?.price || 0)
  }, 0)

  const baseEstimate = cartSubtotal > 0 ? (cartSubtotal + selectedServicesTotal) : selectedServicesTotal
  const effectiveEstimate = (baseEstimate > 0 || addonsTotal > 0) ? (baseEstimate + addonsTotal) : null

  // Build combined summary string of selected services
  const combinedServicesString = [
    ...form.selected_services,
    form.custom_services.trim() ? `Custom Request: ${form.custom_services.trim()}` : null,
  ].filter(Boolean).join(', ')

  function validateForm(): string | null {
    if (!form.customer_name.trim()) return 'Please enter your full name.'
    const cleanPhone = normalizeIndianPhone(form.customer_phone)
    if (cleanPhone.length !== 10) return 'Please enter a valid 10-digit mobile number so our coordinator can reach you.'
    if (!form.customer_address.trim()) return 'Please enter your home address & locality so our artist can arrive on time.'
    
    const hasServices = form.selected_services.length > 0 || form.custom_services.trim().length > 0 || cartItems.length > 0
    if (!hasServices) return 'Please select at least one service, choose a package, or describe what you need in the box.'
    
    return null
  }

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

    const cleanPhone = normalizeIndianPhone(form.customer_phone)

    const timingSummary = form.preferred_day === 'Specific Upcoming Date' && form.specific_date
      ? `Date: ${form.specific_date} (${form.preferred_time_window})`
      : `${form.preferred_day} (${form.preferred_time_window})`

    const body = {
      customer_name: form.customer_name.trim(),
      customer_phone: cleanPhone,
      customer_email: form.customer_email.trim() || `${cleanPhone}@doorstepdiva.lead`,
      customer_address: form.customer_address.trim(),
      city: form.city,
      service_type: combinedServicesString || 'Custom Multi-Service Consultation',
      addons: form.addons,
      preferred_timing: timingSummary,
      appointment_date: form.specific_date || null,
      appointment_time: form.preferred_time_window !== 'Anytime / Flexible' ? form.preferred_time_window : null,
      total_estimate: effectiveEstimate,
      notes: form.notes.trim() || (form.custom_services.trim() ? `Custom Requirements: ${form.custom_services.trim()}` : undefined),
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

      setForm(prev => ({ ...prev, customer_phone: cleanPhone }))
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
  const normalizedPhone = normalizeIndianPhone(form.customer_phone)

  const timingDisplay = form.preferred_day === 'Specific Upcoming Date' && form.specific_date
    ? `${form.specific_date} (${form.preferred_time_window})`
    : `${form.preferred_day} • ${form.preferred_time_window}`

  const waSuccessMsg = encodeURIComponent(
    `Hi DoorStep Diva! I just submitted an appointment request for: ${combinedServicesString || 'Salon Services'} in ${cityNameDisplay}. Name: ${form.customer_name}, Phone: ${normalizedPhone || form.customer_phone}. Preferred Time: ${timingDisplay}. Please verify artist availability!`
  )

  const directWaMsg = encodeURIComponent(
    `Namaste DoorStep Diva! I would like to book an at-home salon appointment:\n\n` +
    `Services Needed:\n${combinedServicesString || 'Custom Salon Services'}\n` +
    (form.addons.length > 0 ? `\nAdd-ons:\n${form.addons.map(a => `• ${a}`).join('\n')}\n` : '') +
    `\nCity: ${cityNameDisplay}` +
    `\nPreferred Timing: ${timingDisplay}` +
    (form.customer_name ? `\nName: ${form.customer_name}` : '') +
    (normalizedPhone ? `\nPhone: +91 ${normalizedPhone}` : (form.customer_phone ? `\nPhone: ${form.customer_phone}` : '')) +
    (form.customer_address ? `\nAddress: ${form.customer_address}` : '') +
    `\n\nTotal Estimate: ₹${effectiveEstimate ? effectiveEstimate.toLocaleString('en-IN') : 'To be confirmed by coordinator'} (Pay After Service)` +
    `\n\nPlease confirm artist availability with me!`
  )

  const displayedCatalog = activeCategory === 'All Popular'
    ? CATALOG_SERVICES
    : CATALOG_SERVICES.filter(s => s.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#FAF6F7] text-stone-900 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Top Breadcrumb & Status */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-xs text-stone-500 hover:text-[#8B3A52] flex items-center gap-1 font-medium">
            ← Back to Home
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#8B3A52]/10 text-[#8B3A52]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Booking Desk Online • Verified Artists
          </span>
        </div>

        {step === 'success' ? (
          /* ── SUCCESS SCREEN ── */
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#F0D5DD] text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              ✓
            </div>
            
            <h1 className="font-playfair text-3xl sm:text-4xl text-stone-900 font-bold mb-3">
              Booking Request Received
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
              Thank you, <strong>{form.customer_name}</strong>. Our beauty coordinator has received your request and will call or WhatsApp you on <strong>{normalizedPhone ? `+91 ${normalizedPhone}` : form.customer_phone}</strong> to confirm your certified artist, review your requested services, and align your arrival time.
            </p>

            {/* Quick summary box */}
            <div className="bg-[#FAF3F5] rounded-2xl p-6 text-left mb-8 border border-[#EACCD6]/50">
              <h2 className="text-xs font-bold text-[#8B3A52] uppercase tracking-wider mb-4">
                Booking Summary
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="sm:col-span-2">
                  <span className="text-stone-500 block text-xs">Services Requested:</span>
                  <span className="font-semibold text-stone-900">
                    {combinedServicesString || 'Custom Salon Consultation'}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">City / Region:</span>
                  <span className="font-semibold text-stone-900">{cityNameDisplay}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">Preferred Timing:</span>
                  <span className="font-semibold text-stone-900">{timingDisplay}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">Payment Method:</span>
                  <span className="font-semibold text-emerald-700">Pay after service (UPI / Cash)</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">Estimated Total:</span>
                  <span className="font-semibold text-[#8B3A52]">
                    {effectiveEstimate ? `₹${effectiveEstimate.toLocaleString('en-IN')}` : 'To be confirmed by coordinator'}
                  </span>
                </div>
                {form.addons.length > 0 && (
                  <div className="sm:col-span-2">
                    <span className="text-stone-500 block text-xs">Selected Add-ons:</span>
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
                <span>Direct WhatsApp Confirmation</span>
              </a>
              <a
                href={`tel:+${WA_NUMBER}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-stone-900 text-white font-semibold text-sm hover:bg-stone-800 transition-all"
              >
                <span>Call Coordinator (+91 9129577514)</span>
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
                  <span><strong>Coordinator Call:</strong> We review your custom package, confirm your address, and verify artist assignment.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                  <span><strong>Sanitized Single-Use Kit:</strong> Your certified female artist arrives with a sealed kit opened in your presence.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                  <span><strong>Zero Risk Payment:</strong> Relax, enjoy your salon experience, and pay securely via UPI or cash only after completion.</span>
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
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 mb-1 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-stone-800">100% Sealed Kits</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 mb-1 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <polyline points="16 11 18 13 22 9" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-stone-800">Verified Artists</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 mb-1 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-stone-800">Pay After Service</span>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium flex items-center gap-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-rose-600">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
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
                        onClick={() => updateForm('city', c.value as CityOption)}
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

              {/* 2. SELECT SERVICE(S) MULTI-SELECTION ENGINE */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                    2. Select Your Service(s) or Custom Package *
                  </label>
                  <span className="text-[11px] text-[#8B3A52] font-semibold">
                    Select multiple services or write custom requests below
                  </span>
                </div>

                {/* Selected Services Pill Bar */}
                {form.selected_services.length > 0 && (
                  <div className="mb-4 p-3.5 rounded-2xl bg-[#FDF2F5] border border-[#F3DBE2]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-800">
                        Selected Services ({form.selected_services.length}):
                      </span>
                      <button
                        type="button"
                        onClick={() => updateForm('selected_services', [])}
                        className="text-[11px] text-stone-500 hover:text-rose-600 underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {form.selected_services.map(sName => (
                        <span
                          key={sName}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#8B3A52] text-white shadow-sm"
                        >
                          <span>{sName}</span>
                          <button
                            type="button"
                            onClick={() => toggleService(sName)}
                            className="hover:opacity-75 font-bold ml-1 text-sm leading-none"
                            aria-label={`Remove ${sName}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category Filter Tabs with Luxury SVG Icons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none text-xs">
                  {SERVICE_CATEGORIES.map(cat => {
                    const isActive = activeCategory === cat
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-[#8B3A52] text-white shadow-sm ring-2 ring-[#8B3A52]/20'
                            : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        {getCategoryIcon(cat, `w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-[#8B3A52]'}`)}
                        <span>{cat}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Clickable Multi-Select Service Grid with WYSIWYG Thumbnails */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto p-1.5 border border-stone-200 rounded-2xl bg-stone-50/50">
                  {displayedCatalog.map(item => {
                    const isSelected = form.selected_services.includes(item.name)
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => toggleService(item.name)}
                        className={`text-left p-2.5 rounded-2xl border transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-white border-[#8B3A52] ring-2 ring-[#8B3A52]/20 shadow-sm'
                            : 'bg-white border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0 pr-1">
                          <div className={`text-xs font-semibold leading-snug truncate ${isSelected ? 'text-[#8B3A52]' : 'text-stone-900'}`}>
                            {item.name}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-600 mt-1">
                            <span className="text-[#8B3A52] font-bold">from ₹{item.minPrice.toLocaleString('en-IN')}</span>
                            <span className="text-stone-300">•</span>
                            <span className="inline-flex items-center gap-1 text-[10px] text-stone-500 font-medium">
                              {getCategoryIcon(item.category, "w-3 h-3 text-[#8B3A52]/80")}
                              <span>{item.category}</span>
                            </span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#8B3A52] text-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}>
                          {isSelected ? '✓ Added' : 'Select'}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Custom Requirements / Multiple Services Text Box */}
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Have 10+ services, multiple persons, or custom requirements? Describe them here:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Full waxing for 2 people, Rica arms & legs, O3+ facial, and luxury hair spa"
                    value={form.custom_services}
                    onChange={e => updateForm('custom_services', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A52]/20 focus:border-[#8B3A52]"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Tip: You can also tap services above and type specific add-ons or customization notes here.
                  </p>
                </div>

                {/* Quick Add-ons as Small WYSIWYG Image Cards */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                      Popular Quick Add-ons (Tap to Include)
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      Zero extra travel fee
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {COMMON_ADDONS.map(addon => {
                      const isSelected = form.addons.includes(addon.value)
                      return (
                        <button
                          type="button"
                          key={addon.value}
                          onClick={() => toggleAddon(addon.value)}
                          className={`group text-left p-2.5 rounded-2xl border transition-all flex flex-col justify-between overflow-hidden ${
                            isSelected
                              ? 'bg-[#FDF2F5] border-[#8B3A52] ring-2 ring-[#8B3A52]/20 shadow-md'
                              : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs'
                          }`}
                        >
                          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-100 mb-2">
                            <img
                              src={addon.image}
                              alt={addon.label}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#8B3A52] text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                                ✓
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-stone-900 leading-snug line-clamp-1 mb-1">
                              {addon.label}
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs font-bold text-[#8B3A52]">
                                +₹{addon.price}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                                isSelected
                                  ? 'bg-[#8B3A52] text-white'
                                  : 'bg-stone-100 text-stone-600 group-hover:bg-stone-200'
                              }`}>
                                {isSelected ? 'Added' : 'Add'}
                              </span>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Pricing Summary Card */}
                {(effectiveEstimate !== null || form.selected_services.length > 0 || form.custom_services.trim()) && (
                  <div className="mt-5 p-4 rounded-2xl bg-white border border-[#EACCD6] shadow-sm">
                    <div className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                      <span>Booking Price Summary</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        Pay After Service
                      </span>
                    </div>
                    <div className="space-y-2 text-xs text-stone-700">
                      {form.selected_services.length > 0 && (
                        <div className="flex justify-between items-center">
                          <span>Selected Services ({form.selected_services.length}):</span>
                          <span className="font-semibold text-stone-900">
                            {selectedServicesTotal > 0 ? `from ₹${selectedServicesTotal.toLocaleString('en-IN')}` : 'To be confirmed'}
                          </span>
                        </div>
                      )}

                      {form.addons.map(addonVal => {
                        const addon = COMMON_ADDONS.find(a => a.value === addonVal)
                        return (
                          <div key={addonVal} className="flex justify-between items-center text-stone-600 pl-2 border-l-2 border-[#8B3A52]/20">
                            <span>+ {addonVal}</span>
                            <span className="font-medium text-[#8B3A52]">+₹{addon?.price || 0}</span>
                          </div>
                        )
                      })}

                      <div className="border-t border-stone-200 mt-2.5 pt-2.5 flex justify-between items-center text-sm font-bold text-stone-900">
                        <span>Total Payable Estimate:</span>
                        <span className="text-base text-[#8B3A52]">
                          {effectiveEstimate ? `from ₹${effectiveEstimate.toLocaleString('en-IN')}` : 'Confirmed by coordinator'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. TIMING & COORDINATION PREFERENCE (NO PRESET TIME SLOTS) */}
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                    3. Preferred Day & Timing Window *
                  </label>
                  <span className="text-[11px] font-semibold text-[#8B3A52]">
                    Confirmed Manually
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mb-3">
                  All appointments are verified and confirmed manually with you by our coordinator over phone or WhatsApp. We do not dispatch without speaking to you.
                </p>

                {/* Day Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                  {DAY_OPTIONS.map(dayOption => {
                    const isSelected = form.preferred_day === dayOption
                    return (
                      <button
                        type="button"
                        key={dayOption}
                        onClick={() => updateForm('preferred_day', dayOption)}
                        className={`text-left px-4 py-3 rounded-2xl border text-xs sm:text-sm font-medium transition-all ${
                          isSelected
                            ? 'border-[#8B3A52] bg-[#FDF2F5] text-[#8B3A52] font-semibold ring-1 ring-[#8B3A52]/20'
                            : 'border-stone-200 text-stone-700 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{dayOption}</span>
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#8B3A52] bg-[#8B3A52]' : 'border-stone-300'
                          }`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {form.preferred_day === 'Specific Upcoming Date' && (
                  <div className="mb-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Choose Your Preferred Date:
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={form.specific_date}
                      onChange={e => updateForm('specific_date', e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A52]/20 focus:border-[#8B3A52]"
                      required
                    />
                  </div>
                )}

                {/* Preferred Window of the Day */}
                <div>
                  <span className="block text-[11px] font-semibold text-stone-600 mb-2">
                    Preferred Time of Day (Coordinator will confirm availability):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TIME_WINDOW_OPTIONS.map(timeWindow => {
                      const isSelected = form.preferred_time_window === timeWindow
                      return (
                        <button
                          type="button"
                          key={timeWindow}
                          onClick={() => updateForm('preferred_time_window', timeWindow)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                            isSelected
                              ? 'bg-[#8B3A52] text-white border-[#8B3A52]'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          {timeWindow}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-2xl bg-[#FAF2F5] border border-[#F3DBE2] flex items-start gap-2.5">
                  <span className="text-[#8B3A52] font-bold text-xs mt-0.5">✓</span>
                  <p className="text-[11px] text-stone-700 leading-relaxed">
                    <strong>Coordination Protocol:</strong> Once you submit, our beauty coordinator will reach out to you via WhatsApp or phone call to verify your services, calculate exact package pricing, and confirm artist assignment.
                  </p>
                </div>
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
                    <label className="block text-xs text-stone-600 font-medium mb-1">Mobile Number (Call & WhatsApp) *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210 or +91 98765 43210"
                      value={form.customer_phone}
                      onChange={e => updateForm('customer_phone', e.target.value)}
                      maxLength={16}
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
                <div className="w-5 h-5 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div className="text-xs text-stone-700 leading-relaxed">
                  <strong>Zero Advance Fee:</strong> You do not need to make any payment online right now. Our coordinator will call/WhatsApp you to confirm artist availability and package pricing. You settle securely via UPI or cash only after your service is completed.
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
                    <span>Confirm At-Home Booking Request {effectiveEstimate ? `(from ₹${effectiveEstimate.toLocaleString('en-IN')} · Pay After Service)` : '(Pay After Service)'} →</span>
                  )}
                </button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-stone-200" />
                  <span className="text-[11px] text-stone-400 uppercase font-semibold">Or Book Directly on WhatsApp</span>
                  <div className="flex-1 h-px bg-stone-200" />
                </div>

                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${directWaMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Send Selection via WhatsApp {effectiveEstimate ? `(from ₹${effectiveEstimate.toLocaleString('en-IN')})` : ''} →</span>
                </a>

                <p className="text-center text-xs text-stone-500 mt-3">
                  Need immediate help? Call us directly at{' '}
                  <a href={`tel:+${WA_NUMBER}`} className="font-semibold text-[#8B3A52] underline">
                    +91 9129577514
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
