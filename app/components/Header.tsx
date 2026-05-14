'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SERVICES_DROPDOWN = [
  { href: '/services/hair',           label: 'Hair',            sub: 'Cuts · Color · Treatments'   },
  { href: '/services/skin',           label: 'Skin',            sub: 'Waxing · Facials · Body Care' },
  { href: '/services/makeup',         label: 'Makeup',          sub: 'Party · Bridal · Events'      },
  { href: '/services/eyelash',        label: 'Eyelash',         sub: 'Classic · Hybrid · Volume'    },
  { href: '/services/semi-permanent', label: 'Semi-Permanent',  sub: 'Microblading · Lip Blush'     },
  { href: '/services/nails',          label: 'Nail Extensions', sub: 'Acrylic · Gel · PolyGel'      },
]

export default function Header() {
  const [menuOpen, setMenuOpen]     = useState(false)
  const [dropOpen, setDropOpen]     = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [mobileSvcs, setMobileSvcs] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeAll = () => { setMenuOpen(false); setDropOpen(false); setMobileSvcs(false) }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.90)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(196,118,138,' + (scrolled ? '0.18' : '0.08') + ')',
          boxShadow: scrolled ? '0 4px 28px rgba(139,58,82,0.08)' : 'none',
        }}
      >
        <div
          className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 flex items-center justify-between transition-all duration-300"
          style={{ height: scrolled ? '88px' : '108px' }}
        >
          {/* Logo */}
          <Link href="/" onClick={closeAll} className="flex-shrink-0 block">
            <div
              className="relative transition-all duration-300"
              style={{ width: scrolled ? 240 : 300, height: scrolled ? 72 : 90 }}
            >
              <Image
                src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777178196/40b6fd8e-8572-41d3-b5b4-75fdd1e48dd8_sckgy6.png"
                alt="DoorStep Diva logo"
                fill
                priority
                className="object-contain object-left"
                sizes="220px"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {/* Services dropdown */}
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setDropOpen(o => !o)}
                onMouseEnter={() => setDropOpen(true)}
                aria-expanded={dropOpen}
                className="flex items-center gap-1.5 font-poppins text-[11px] font-semibold tracking-widest uppercase px-3 py-2 rounded-lg text-stone-light hover:text-rose hover:bg-rose/5 transition-all duration-200"
              >
                Services
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: dropOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s ease' }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {/* Dropdown */}
              <div
                onMouseLeave={() => setDropOpen(false)}
                style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
                  transform: dropOpen ? 'translateX(-50%) scaleY(1)' : 'translateX(-50%) scaleY(0.9)',
                  transformOrigin: 'top',
                  opacity: dropOpen ? 1 : 0,
                  pointerEvents: dropOpen ? 'auto' : 'none',
                  transition: 'all .2s ease',
                  width: '300px',
                  background: 'white',
                  borderRadius: '18px',
                  boxShadow: '0 20px 60px rgba(139,58,82,0.14), 0 4px 16px rgba(139,58,82,0.07)',
                  border: '1px solid rgba(196,118,138,0.15)',
                  overflow: 'hidden',
                  zIndex: 100,
                }}
              >
                <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #C8974A 40%, #C4768A, transparent)' }} />
                <div style={{ padding: '10px' }}>
                  {SERVICES_DROPDOWN.map((s) => (
                    <Link key={s.href} href={s.href} onClick={closeAll}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-petal transition-colors duration-150 group/item"
                    >
                      <div>
                        <p className="font-poppins text-[11px] font-semibold text-stone group-hover/item:text-rose transition-colors">{s.label}</p>
                        <p className="font-poppins text-[10px] text-stone-light mt-0.5">{s.sub}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {[
              { href: '/academy',  label: 'Academy'   },
              { href: '/about',    label: 'Our Story' },
              { href: '/#contact', label: 'Contact'   },
            ].map(({ href, label }) => (
              <Link key={href} href={href} onClick={closeAll}
                className="font-poppins text-[11px] font-semibold tracking-widest uppercase px-3 py-2 rounded-lg text-stone-light hover:text-rose hover:bg-rose/5 transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a href="tel:+917985183449"
              className="hidden lg:flex items-center gap-1.5 font-poppins text-[11px] font-medium text-stone-light hover:text-rose transition-colors px-3 py-2 rounded-lg hover:bg-rose/5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.9v2.02z"/>
              </svg>
              +91 79851 83449
            </a>
            <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-1.5 font-poppins text-[11px] font-semibold px-4 py-2 text-white rounded-full hover:opacity-90 transition-opacity"
              style={{ background: '#25D366', boxShadow: '0 4px 14px rgba(37,211,102,0.25)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <Link href="/#contact" onClick={closeAll}
              className="btn-press inline-flex font-poppins text-[11px] font-semibold px-4 py-2 text-white rounded-full transition-all duration-200"
              style={{ background: 'linear-gradient(135deg,#C4768A,#8B3A52)', boxShadow: '0 4px 14px rgba(139,58,82,0.25)' }}
            >
              Book Now
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden w-10 h-10 flex flex-col gap-[5px] items-center justify-center rounded-xl hover:bg-rose/8 transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-[1.5px] bg-stone rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-stone rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-stone rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{ background: 'rgba(61,43,43,0.4)', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
        onClick={closeAll}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        className="fixed top-0 right-0 z-50 md:hidden w-[84vw] max-w-sm flex flex-col"
        style={{
          height: '100dvh',
          background: 'white',
          boxShadow: '-8px 0 48px rgba(139,58,82,0.14)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .3s cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        {/* Drawer top */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-blush/20">
          <div className="relative w-44 h-14">
            <Image src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777178196/40b6fd8e-8572-41d3-b5b4-75fdd1e48dd8_sckgy6.png" alt="DoorStep Diva" fill className="object-contain object-left" sizes="128px" />
          </div>
          <button onClick={closeAll} className="w-8 h-8 rounded-full flex items-center justify-center text-stone-light hover:text-rose hover:bg-rose/8 transition-colors" aria-label="Close">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
          {/* Services accordion */}
          <button
            onClick={() => setMobileSvcs(o => !o)}
            className="w-full flex items-center justify-between px-3 py-3 rounded-xl font-poppins text-sm font-semibold text-stone hover:text-rose hover:bg-rose/5 transition-colors"
          >
            Services
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: mobileSvcs ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s' }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div style={{ display: mobileSvcs ? 'block' : 'none' }}>
            <div className="pl-3 pb-2 pt-1 flex flex-col gap-1">
              {SERVICES_DROPDOWN.map((s) => (
                <Link key={s.href} href={s.href} onClick={closeAll}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-petal transition-colors"
                >
                  <div>
                    <p className="font-poppins text-xs font-semibold text-stone">{s.label}</p>
                    <p className="font-poppins text-[10px] text-stone-light">{s.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {[
            { href: '/academy',  label: 'Academy'   },
            { href: '/about',    label: 'Our Story' },
            { href: '/#contact', label: 'Contact'   },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={closeAll}
              className="flex items-center gap-3 px-3 py-3 rounded-xl font-poppins text-sm font-semibold text-stone hover:text-rose hover:bg-rose/5 transition-colors"
            >
              <span className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(196,118,138,0.12)', color: '#C4768A' }}>
                {href === '/academy'
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  : href === '/about'
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.9v2.02z"/></svg>
                }
              </span>
              {label}
            </Link>
          ))}
          <div className="h-px my-2" style={{ background: 'rgba(196,118,138,0.15)' }} />
          <a href="tel:+917985183449" className="flex items-center gap-2.5 px-3 py-3 rounded-xl font-poppins text-sm text-stone-light hover:text-rose hover:bg-rose/5 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.9v2.02z"/>
            </svg>
            +91 79851 83449
          </a>
        </div>

        {/* Drawer footer */}
        <div className="px-4 pb-7 pt-3 border-t border-blush/15 flex flex-col gap-2.5">
          <a href="https://wa.me/917985183449" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full font-poppins text-sm font-semibold py-3 text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ background: '#25D366', boxShadow: '0 4px 14px rgba(37,211,102,0.22)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Message on WhatsApp
          </a>
          <Link href="/#contact" onClick={closeAll}
            className="flex items-center justify-center w-full font-poppins text-sm font-semibold py-3 text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg,#C4768A,#8B3A52)', boxShadow: '0 4px 14px rgba(139,58,82,0.22)' }}
          >
            Book a Session
          </Link>
        </div>
      </div>
    </>
  )
}