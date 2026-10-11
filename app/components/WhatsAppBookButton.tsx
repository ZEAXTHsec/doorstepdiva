'use client'

import React from 'react'
import { WhatsAppIcon } from './WhatsAppIcon'

type WhatsAppBookButtonProps = {
  serviceName: string
  price?: number
  variant?: 'inline' | 'full'
  className?: string
  city?: string
}

export default function WhatsAppBookButton({
  serviceName,
  price,
  variant = 'inline',
  className = '',
  city = 'Lucknow / Delhi NCR',
}: WhatsAppBookButtonProps) {
  const priceText = price ? ` (₹${price.toLocaleString('en-IN')})` : ''
  const message = `Namaste DoorStep Diva! I would like to book the "${serviceName}"${priceText} at-home service for ${city}. Please share available time slots!`
  const href = `https://wa.me/919129577514?text=${encodeURIComponent(message)}`

  if (variant === 'inline') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Book ${serviceName} on WhatsApp`}
        className={`btn-press inline-flex items-center gap-1.5 font-poppins text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
        style={{
          background: 'rgba(37,211,102,0.12)',
          color: '#15803d',
          border: '1px solid rgba(37,211,102,0.35)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <WhatsAppIcon size={13} />
        <span>WhatsApp</span>
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Book ${serviceName} on WhatsApp`}
      className={`btn-press inline-flex items-center justify-center gap-2 font-poppins text-sm font-semibold px-6 py-3.5 rounded-full text-white transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      style={{
        background: '#25D366',
        boxShadow: '0 6px 20px rgba(37,211,102,0.30)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <WhatsAppIcon size={16} />
      <span>Book via WhatsApp</span>
    </a>
  )
}
