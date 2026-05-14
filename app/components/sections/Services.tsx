'use client'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SERVICES } from '@/app/_data/home'
import { IconChevronRight } from '@/app/components/icons'

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.service-card')
    if (!cards) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach((card) => card.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="px-5 sm:px-8 md:px-16 py-24 max-w-7xl mx-auto"
      aria-labelledby="services-heading"
    >
      {/* Section header */}
      <div className="text-center mb-16 reveal-fade">
        <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">
          What We Offer
        </p>
        <h2
          id="services-heading"
          className="font-playfair text-4xl md:text-5xl font-bold text-stone mb-4"
        >
          Our <em className="text-rose italic">Six Divisions</em>
        </h2>
        <p className="font-poppins text-stone-light text-sm max-w-lg mx-auto leading-relaxed">
          Every service designed for results. Every artist certified. Everything brought to you.
        </p>
      </div>

      {/* Service cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {SERVICES.map((s, i) => (
          <Link
            key={s.id}
            href={s.href}
            className="service-card group relative rounded-2xl overflow-hidden block shadow-sm hover:shadow-2xl transition-all duration-500 focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
            style={{
              // Staggered reveal animation
              opacity: 0,
              transform: 'translateY(28px)',
              transition: `opacity 0.55s ease ${i * 0.08}s, transform 0.55s ease ${i * 0.08}s, box-shadow 0.3s ease`,
            }}
            aria-label={`${s.title} services — ${s.tagline}`}
          >
            {/* Image with zoom on hover */}
            <div className="relative h-60 sm:h-64 overflow-hidden">
              <Image
                src={s.image}
                alt={`${s.title} at-home beauty service by DoorStep Diva`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Service number badge */}
              <span className="absolute top-3 left-3 font-poppins text-[10px] font-bold tracking-widest uppercase text-white/85 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                {s.id}
              </span>

              {/* Arrow button */}
              <div
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                }}
              >
                <span
                  className="transition-colors duration-300"
                  style={{ color: 'white' }}
                >
                  <IconChevronRight />
                </span>
              </div>

              {/* Title on image */}
              <div className="absolute bottom-0 left-0 right-0 p-4 pb-5">
                <h3 className="font-playfair text-xl font-semibold text-white mb-0.5 leading-tight">
                  {s.title}
                </h3>
                <p className="font-poppins text-[10px] tracking-widest uppercase text-white/70 font-medium">
                  {s.tagline}
                </p>
              </div>
            </div>

            {/* Card body */}
            <div
              className="p-5"
              style={{ background: `${s.accent}66` }}
            >
              <p className="font-poppins text-xs text-stone-light leading-relaxed mb-3 line-clamp-2">
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/75 font-poppins text-[10px] text-stone-light px-2.5 py-0.5 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .service-card.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  )
}