'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

interface TrendingRitual {
  badge: string
  title: string
  subtitle: string
  price: number
  serviceId: string
  category: string
  duration: string
  href: string
  image: string
}

const TRENDING_RITUALS: TrendingRitual[] = [
  {
    badge: 'Most Booked',
    title: 'Royal Bridal Regimen',
    subtitle: 'Pre-Bridal Glow & Full Trousseau',
    price: 14999,
    serviceId: 'bridal-regimen',
    category: 'Makeup & Bridal',
    duration: '210 mins',
    href: '/services/makeup',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png',
  },
  {
    badge: 'Trending Now',
    title: 'Korean Glass Skin Facial',
    subtitle: 'Mono-Dose Sealed Ampoules',
    price: 1899,
    serviceId: 'korean-glass-facial',
    category: 'Clinical Skin',
    duration: '75 mins',
    href: '/services/skin',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
  },
  {
    badge: 'Celebrity Pick',
    title: 'Kérastase Botanical Spa',
    subtitle: 'Deep Fiber Moisture Infusion',
    price: 1499,
    serviceId: 'kerastase-hair-spa',
    category: 'Hair Care',
    duration: '60 mins',
    href: '/services/hair',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png',
  },
  {
    badge: 'Express Glam',
    title: 'Gel Extensions & Chrome Art',
    subtitle: 'High-Gloss Runway Finish',
    price: 1299,
    serviceId: 'gel-nail-art',
    category: 'Nail Artistry',
    duration: '75 mins',
    href: '/services/nails',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png',
  },
]

export default function HeroLuxuryGlassCard() {
  const { addItem, openCart } = useCart()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [sheen, setSheen] = useState({ x: 50, y: 50, opacity: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  // Cycle trending rituals every 3.8s when not hovered
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % TRENDING_RITUALS.length)
    }, 3800)
    return () => clearInterval(timer)
  }, [isHovered])

  // Mouse 3D Gyro Tilt Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Normalize -1 to 1
    const normX = (x - centerX) / centerX
    const normY = (y - centerY) / centerY

    setTilt({
      x: normX * 8, // max 8 deg tilt
      y: normY * -8,
    })

    setSheen({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
    setSheen(prev => ({ ...prev, opacity: 0 }))
  }

  const currentRitual = TRENDING_RITUALS[currentIndex]

  const handleBookRitual = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: currentRitual.serviceId,
      name: currentRitual.title,
      price: currentRitual.price,
      duration: currentRitual.duration,
      image: currentRitual.image,
      category: currentRitual.category,
      href: currentRitual.href,
    })
    openCart()
  }

  return (
    <div
      className="hidden lg:flex flex-col items-end gap-3.5 select-none"
      style={{
        perspective: '1200px',
        animation: 'fadeUp .8s cubic-bezier(0.16, 1, 0.3, 1) .35s both',
      }}
    >
      {/* ── MAIN LIQUID GLASS CARD ── */}
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-80 rounded-[28px] p-6 relative overflow-hidden transition-transform duration-200 ease-out cursor-pointer"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(12px)`,
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(253, 242, 245, 0.78) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          boxShadow: '0 25px 60px -15px rgba(139, 58, 82, 0.22), 0 0 0 1px rgba(200, 151, 74, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
        }}
      >
        {/* Specular dynamic light sheen tracing cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: sheen.opacity,
            background: `radial-gradient(circle 180px at ${sheen.x}% ${sheen.y}%, rgba(255, 255, 255, 0.7) 0%, transparent 80%)`,
          }}
        />

        {/* Polished gold perimeter rim light */}
        <div
          className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #C8974A, rgba(196,118,138,0.8), transparent)' }}
        />

        {/* Brand Header */}
        <div className="flex items-center justify-between mb-4.5">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #EFCCD4, #C4768A)',
                boxShadow: '0 4px 12px rgba(139, 58, 82, 0.15)',
              }}
            >
              {/* Petal Icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C12 2 7 6 7 11C7 13.76 9.24 16 12 16C14.76 16 17 13.76 17 11C17 6 12 2 12 2Z" fill="white" fillOpacity="0.95"/>
                <path d="M12 16C12 16 7 14 5 11C3.5 14 5 18 8 20C9.5 21 11 21.5 12 22C13 21.5 14.5 21 16 20C19 18 20.5 14 19 11C17 14 12 16 12 16Z" fill="white" fillOpacity="0.75"/>
              </svg>
            </div>
            <div>
              <p className="font-serif text-base font-bold text-stone-900 tracking-tight leading-none">DoorStep Diva</p>
              <p className="font-poppins text-[9px] tracking-[0.24em] uppercase font-semibold mt-1" style={{ color: '#C8974A' }}>
                at-home luxury
              </p>
            </div>
          </div>

          {/* Client Rating Micro-Badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-stone-200/50 shadow-xs"
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill="#C8974A">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <span className="font-poppins text-[11px] font-bold text-stone-900">4.9</span>
          </div>
        </div>

        {/* Divisions & Quality Metric Row */}
        <div className="grid grid-cols-3 gap-2 py-3 mb-4 rounded-xl bg-white/60 border border-stone-100/80 text-center">
          <div>
            <p className="font-serif text-lg font-bold text-[#8B3A52] leading-tight">06</p>
            <p className="font-poppins text-[9px] text-stone-500 uppercase tracking-wider font-medium mt-0.5">Divisions</p>
          </div>
          <div className="border-x border-stone-200/60">
            <p className="font-serif text-lg font-bold text-[#8B3A52] leading-tight">15+</p>
            <p className="font-poppins text-[9px] text-stone-500 uppercase tracking-wider font-medium mt-0.5">Brands</p>
          </div>
          <div>
            <p className="font-serif text-lg font-bold text-[#8B3A52] leading-tight">100%</p>
            <p className="font-poppins text-[9px] text-stone-500 uppercase tracking-wider font-medium mt-0.5">Certified</p>
          </div>
        </div>

        {/* ── DYNAMIC TRENDING RITUAL TICKER ── */}
        <div
          onClick={handleBookRitual}
          className="group relative rounded-2xl p-3.5 transition-all duration-300 hover:shadow-md cursor-pointer border"
          style={{
            background: 'linear-gradient(135deg, rgba(239, 204, 212, 0.45) 0%, rgba(249, 224, 232, 0.7) 100%)',
            borderColor: 'rgba(196, 118, 138, 0.3)',
          }}
          title="Click to add this ritual to cart"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A52] animate-pulse" />
              <span className="font-poppins text-[9px] uppercase tracking-widest font-bold text-[#8B3A52]">
                {currentRitual.badge}
              </span>
            </div>
            <span className="font-poppins text-[10px] font-bold text-[#8B3A52]">
              ₹{currentRitual.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-1">
            <div className="min-w-0">
              <p className="font-serif text-sm font-bold text-stone-900 truncate group-hover:text-[#8B3A52] transition-colors">
                {currentRitual.title}
              </p>
              <p className="font-poppins text-[10px] text-stone-600 truncate mt-0.5">
                {currentRitual.subtitle}
              </p>
            </div>

            {/* Tap to Add Button */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #C4768A, #8B3A52)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>

          {/* Dots Stepper Indicator */}
          <div className="flex items-center justify-center gap-1 mt-2.5 pt-1.5 border-t border-[#8B3A52]/10">
            {TRENDING_RITUALS.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-4 bg-[#8B3A52]' : 'w-1 bg-[#8B3A52]/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── LOWER LIVE DISPATCH PILL ── */}
      <Link
        href="/areas"
        className="group w-72 rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
        style={{
          background: 'linear-gradient(135deg, rgba(28, 8, 18, 0.94) 0%, rgba(48, 12, 27, 0.94) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(200, 151, 74, 0.35)',
          boxShadow: '0 12px 30px rgba(28, 8, 18, 0.35)',
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 relative"
          style={{ background: 'rgba(196, 118, 138, 0.2)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EFCCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#1C0812] animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-poppins text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Live Dispatch Desk</p>
            <span className="font-poppins text-[9px] text-[#C8974A] font-medium group-hover:translate-x-0.5 transition-transform">Coverage →</span>
          </div>
          <p className="font-poppins text-xs font-semibold text-white truncate mt-0.5">
            Delhi NCR · Lucknow · Ayodhya
          </p>
        </div>
      </Link>
    </div>
  )
}
