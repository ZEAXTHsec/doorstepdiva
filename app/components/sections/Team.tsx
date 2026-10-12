'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { WhatsAppIcon } from '@/app/components/WhatsAppIcon'

export interface Artist {
  id: string
  name: string
  role: string
  experience: string
  rating: number
  reviewsCount: number
  certifications: string[]
  specialties: string[]
  signatureStyle: string
  image: string
  bio: string
  accent: string
}

export const ARTISTS: Artist[] = [
  {
    id: 'kavita',
    name: 'Kavita Verma',
    role: 'Lead Bridal Director & Co-Founder',
    experience: '10+ Years Exp',
    rating: 4.98,
    reviewsCount: 680,
    certifications: ['MAC Pro Certified', 'Kryolan Master Educator', 'CIDESCO Makeup'],
    specialties: ['Royal HD Bridal', 'Airbrush Makeup', 'Regal Saree & Dupatta Draping'],
    signatureStyle: 'Timeless Royal Radiance & Seamless Skin Prep',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png',
    bio: 'Former senior artist with top luxury bridal studios across North India. Kavita has styled over 650 brides and leads all bridal masterclasses at the Academy.',
    accent: '#8B3A52',
  },
  {
    id: 'sneha',
    name: 'Sneha Sharma',
    role: 'Senior Hair Architect & Master Colorist',
    experience: '7+ Years Exp',
    rating: 4.95,
    reviewsCount: 520,
    certifications: ["L'Oréal Professionnel Color Specialist", 'Olaplex Certified Pro'],
    specialties: ['French Balayage', 'Precision Butterfly Cuts', 'Nanoplastia & Keratin'],
    signatureStyle: 'Voluminous Gloss, Effortless Movement & Zero Heat Damage',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png',
    bio: 'Passionate hair visionary trained in Mumbai and Delhi. Sneha specializes in tailored color formulation that enhances natural Indian skin tones.',
    accent: '#C8974A',
  },
  {
    id: 'pooja',
    name: 'Pooja Gupta',
    role: 'Clinical Aesthetician & Skin Specialist',
    experience: '8+ Years Exp',
    rating: 4.97,
    reviewsCount: 590,
    certifications: ['Clinical Cosmetology Diploma', 'RICA Italy Painless Wax Specialist', 'Dermapen Pro'],
    specialties: ['Korean Glass Hydration', 'Painless RICA Peel Wax', 'Deep Lymphatic Drainage'],
    signatureStyle: 'Dewy Porcelain Glow & Gentle, Zero-Sting Home Waxing',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
    bio: 'Dedicated to medical-grade skin barrier repair and soothing at-home spa rituals. Pooja conducts strict patch-testing before every clinical facial.',
    accent: '#C4768A',
  },
  {
    id: 'ritika',
    name: 'Ritika Mishra',
    role: 'PMU & Lash Artistry Specialist',
    experience: '6+ Years Exp',
    rating: 4.96,
    reviewsCount: 410,
    certifications: ['PhiBrows Semi-Permanent Master', 'Russian Lash Guild Certified'],
    specialties: ['Microblading & Powder Brows', 'Russian 3D-6D Volume Lashes', 'Semi-Permanent Lip Blush'],
    signatureStyle: 'Hyper-Realistic Feather Strokes & Weightless Lashes',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png',
    bio: 'Precision-obsessed artist using disposable surgical-grade cartridges and EU-certified pigments for 12 to 24-month long-lasting brow perfection.',
    accent: '#7A4A58',
  },
  {
    id: 'divya',
    name: 'Divya Singh',
    role: 'Master Nail Sculptor & Nail Art Educator',
    experience: '5+ Years Exp',
    rating: 4.94,
    reviewsCount: 380,
    certifications: ['Advanced Acrylic & PolyGel Sculptor', '3D Chrome & Encapsulation Pro'],
    specialties: ['Bespoke Bridal Extensions', 'Russian Cuticle Cleanse', 'French Ombré Gel'],
    signatureStyle: 'High-Strength Glass Finish & Sculpted Structural Balance',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png',
    bio: 'Nail artist who treats every manicure like bespoke wearable jewelry. Divya ensures extension longevity up to 4+ weeks with zero nail-bed trauma.',
    accent: '#966B26',
  },
]

export default function TeamSection({ id = 'team' }: { id?: string }) {
  const [selectedArtist, setSelectedArtist] = useState<Artist>(ARTISTS[0])

  return (
    <section
      id={id}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FDF0F0 0%, #FFFFFF 50%, #FDF0F0 100%)',
      }}
      aria-labelledby="team-heading"
    >
      {/* Background radial embellishments */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 10%, rgba(196,118,138,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 85% 90%, rgba(200,151,74,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(139,58,82,0.08)', border: '1px solid rgba(139,58,82,0.18)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#8B3A52' }} />
            <span className="font-poppins text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#8B3A52' }}>
              Our Core 5 Master Artists
            </span>
          </div>

          <h2
            id="team-heading"
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ color: '#3D2B2B' }}
          >
            Meet Your Personal <br className="hidden sm:inline" />
            <span style={{ color: '#8B3A52' }}>At-Home Glam Squad</span>
          </h2>

          <p className="font-poppins text-sm sm:text-base leading-relaxed" style={{ color: '#7A5C5C' }}>
            Unlike large gig apps that send random unverified technicians, DoorStep Diva is powered by a boutique,
            closely-knit team of 5 certified masters. Pick your preferred artist or let us assign the perfect match for your appointment.
          </p>
        </div>

        {/* 5-Artist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          {ARTISTS.map((artist, idx) => {
            const isFeatured = idx === 0
            const whatsappText = encodeURIComponent(
              `Namaste DoorStep Diva! I would like to book a salon appointment and specifically request *${artist.name}* (${artist.role}). Please check her upcoming availability!`
            )

            return (
              <div
                key={artist.id}
                className={`group rounded-3xl overflow-hidden bg-white border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2 lg:col-span-1 ring-1 ring-gold/40' : ''
                }`}
                style={{
                  borderColor: 'rgba(196,118,138,0.22)',
                  boxShadow: '0 8px 30px rgba(139,58,82,0.06)',
                }}
              >
                {/* Image & Experience Header */}
                <div className="relative w-full h-72 overflow-hidden bg-petal-dark/20">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, rgba(61,43,43,0.1) 0%, rgba(61,43,43,0.75) 100%)',
                    }}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className="font-poppins text-[11px] font-bold px-3 py-1 rounded-full text-white backdrop-blur-md shadow-sm"
                      style={{ background: 'rgba(139,58,82,0.85)' }}
                    >
                      {artist.experience}
                    </span>
                    <div
                      className="flex items-center gap-1 font-poppins text-xs font-semibold px-2.5 py-1 rounded-full text-white backdrop-blur-md"
                      style={{ background: 'rgba(200,151,74,0.92)' }}
                    >
                      <span>★</span>
                      <span>{artist.rating}</span>
                      <span className="text-[10px] opacity-80">({artist.reviewsCount}+)</span>
                    </div>
                  </div>

                  {/* Bottom Image Overlay Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-playfair text-2xl font-bold leading-tight">{artist.name}</h3>
                    <p className="font-poppins text-xs font-medium text-white/85 mt-0.5">{artist.role}</p>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Certifications row */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {artist.certifications.slice(0, 2).map((cert) => (
                        <span
                          key={cert}
                          className="font-poppins text-[10px] font-medium px-2.5 py-1 rounded-md"
                          style={{
                            background: 'rgba(200,151,74,0.10)',
                            color: '#966B26',
                            border: '1px solid rgba(200,151,74,0.25)',
                          }}
                        >
                          ✓ {cert}
                        </span>
                      ))}
                    </div>

                    {/* Bio Snippet */}
                    <p className="font-poppins text-xs leading-relaxed mb-5" style={{ color: '#7A5C5C' }}>
                      {artist.bio}
                    </p>

                    {/* Signature Specialties */}
                    <div className="mb-5 pb-5 border-b border-rose/10">
                      <p className="font-poppins text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#8B3A52' }}>
                        Signature Expertise:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {artist.specialties.map((spec) => (
                          <span
                            key={spec}
                            className="font-poppins text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                            style={{
                              background: '#FDF0F0',
                              color: '#3D2B2B',
                              border: '1px solid rgba(196,118,138,0.25)',
                            }}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Direct WhatsApp Request or Pick Artist */}
                  <div className="space-y-2.5 pt-2">
                    <a
                      href={`https://wa.me/919129577514?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 font-poppins text-xs font-semibold px-4 py-3 rounded-xl text-white transition-all duration-200 hover:scale-[1.02] shadow-sm"
                      style={{ background: '#25D366' }}
                    >
                      <WhatsAppIcon size={15} />
                      Request {artist.name.split(' ')[0]} on WhatsApp
                    </a>

                    <a
                      href={`#contact`}
                      onClick={() => {
                        const artistSelect = document.getElementById('preferred-artist-select') as HTMLSelectElement | null
                        if (artistSelect) {
                          artistSelect.value = artist.name
                        }
                      }}
                      className="w-full block text-center font-poppins text-[11px] font-medium py-2 rounded-xl transition-colors hover:bg-rose/5"
                      style={{ color: '#8B3A52', border: '1px solid rgba(139,58,82,0.25)' }}
                    >
                      Select in Booking Form ↓
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Boutique Guarantee Bar (Why our 5-person team beats big gig apps) */}
        <div
          className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #3D2B2B 0%, #543640 60%, #8B3A52 100%)',
            boxShadow: '0 16px 40px rgba(61,43,43,0.18)',
          }}
        >
          <div className="grid md:grid-cols-3 gap-8 items-center text-white">
            <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-white/15 pb-6 md:pb-0 md:pr-8">
              <span className="font-poppins text-xs font-semibold tracking-widest uppercase text-gold">
                The Boutique Salon Promise
              </span>
              <h3 className="font-playfair text-2xl font-bold mt-2 mb-3">
                Zero Strangers.<br />Zero Compromises.
              </h3>
              <p className="font-poppins text-xs text-white/70 leading-relaxed">
                Aggregators outsource to freelance gig workers. We are an exclusive 5-master collective with uniform training and relentless quality control.
              </p>
            </div>

            <div className="md:col-span-2 grid sm:grid-cols-3 gap-5">
              {[
                {
                  title: '100% Artist Continuity',
                  desc: 'Love your stylist? Request her again every appointment. You build a lasting rapport with someone who knows your hair & skin.',
                  icon: '✨',
                },
                {
                  title: '100% Sealed Single-Use Kits',
                  desc: 'Mono-dose cosmetics unsealed right before your eyes. Discarded immediately after. Zero cross-contamination.',
                  icon: '🛡️',
                },
                {
                  title: 'Spill-Proof Floor Mats',
                  desc: 'We bring custom floor shields, sanitize all station tools, and pack up completely. Your room stays pristine.',
                  icon: '🌿',
                },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <span className="text-xl mb-2 block">{item.icon}</span>
                  <h4 className="font-playfair text-sm font-bold mb-1.5 text-white">{item.title}</h4>
                  <p className="font-poppins text-[11px] text-white/75 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
