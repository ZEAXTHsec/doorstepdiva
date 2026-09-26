import Image from 'next/image'
import Link from 'next/link'

const QUICK_LINKS = [
  { href: '/',              label: 'Home' },
  { href: '/about',         label: 'Our Story' },
  { href: '/areas',         label: 'Areas We Serve' },
  { href: '/academy',       label: 'Academy' },
  { href: '/#contact',      label: 'Book Now' },
]

const SERVICE_LINKS = [
  { href: '/services/hair',           label: 'Hair' },
  { href: '/services/skin',           label: 'Skin & Waxing' },
  { href: '/services/makeup',         label: 'Makeup' },
  { href: '/services/eyelash',        label: 'Eyelash & Brow' },
  { href: '/services/semi-permanent', label: 'Semi-Permanent' },
  { href: '/services/nails',          label: 'Nail Extensions' },
]

const ACADEMY_LINKS = [
  { href: '/academy/makeup',      label: 'Makeup Course' },
  { href: '/academy/hair',        label: 'Hair Course' },
  { href: '/academy/skin',        label: 'Skin Course' },
  { href: '/academy/nail-art',    label: 'Nail Art Course' },
  { href: '/academy/Cosmetology', label: 'Cosmetology' },
]

const AREAS = ['Delhi NCR', 'Noida', 'Gurugram', 'Lucknow', 'Ayodhya']

export default function Footer() {
  return (
    <footer
      style={{ background: '#3D2B2B' }}
      className="text-blush"
    >
      {/* Top gradient divider */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #C4768A 40%, #EFCCD4 60%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="relative w-52 h-16 mb-4">
              <Image
                src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777178196/40b6fd8e-8572-41d3-b5b4-75fdd1e48dd8_sckgy6.png"
                alt="DoorStep Diva"
                fill
                className="object-contain object-left"
                sizes="208px"
              />
            </div>
            <p
              className="font-poppins text-sm leading-relaxed mb-5"
              style={{ color: 'rgba(239,204,212,0.65)' }}
            >
              Luxury beauty, at your door. Certified artists across Delhi NCR, Lucknow &amp; Ayodhya.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/doorstepdivaa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
                style={{ background: 'rgba(239,204,212,0.12)', border: '1px solid rgba(239,204,212,0.18)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EFCCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#EFCCD4" stroke="none"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/doorstepdivaa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
                style={{ background: 'rgba(239,204,212,0.12)', border: '1px solid rgba(239,204,212,0.18)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#EFCCD4">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4
              className="font-poppins text-[10px] font-semibold tracking-widest uppercase mb-5"
              style={{ color: '#C4768A' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-poppins text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(239,204,212,0.7)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4
              className="font-poppins text-[10px] font-semibold tracking-widest uppercase mb-5"
              style={{ color: '#C4768A' }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-poppins text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(239,204,212,0.7)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Academy */}
          <div>
            <h4
              className="font-poppins text-[10px] font-semibold tracking-widest uppercase mb-5"
              style={{ color: '#C4768A' }}
            >
              Academy
            </h4>
            <ul className="space-y-3">
              {ACADEMY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-poppins text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(239,204,212,0.7)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Contact */}
          <div>
            <h4
              className="font-poppins text-[10px] font-semibold tracking-widest uppercase mb-5"
              style={{ color: '#C4768A' }}
            >
              Get In Touch
            </h4>
            <div className="space-y-4">
              <Link
                href="/book"
                className="flex items-center gap-2.5 font-poppins text-sm transition-colors hover:text-white"
                style={{ color: 'rgba(239,204,212,0.7)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                Book At-Home Service
              </Link>
              <a
                href="mailto:doorstepdiva.lucknow@gmail.com"
                className="flex items-center gap-2.5 font-poppins text-sm transition-colors hover:text-white"
                style={{ color: 'rgba(239,204,212,0.7)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                doorstepdiva.lucknow@gmail.com
              </a>
              <div>
                <p
                  className="font-poppins text-[10px] font-semibold tracking-widest uppercase mb-2"
                  style={{ color: 'rgba(239,204,212,0.4)' }}
                >
                  Areas Served
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {AREAS.map((area) => (
                    <span
                      key={area}
                      className="font-poppins text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(239,204,212,0.1)', color: 'rgba(239,204,212,0.65)', border: '1px solid rgba(239,204,212,0.15)' }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(239,204,212,0.1)' }}
        >
          <p
            className="font-poppins text-xs"
            style={{ color: 'rgba(239,204,212,0.35)' }}
          >
            © {new Date().getFullYear()} DoorStep Diva. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/returns"
              className="font-poppins text-xs transition-colors hover:text-white"
              style={{ color: 'rgba(239,204,212,0.35)' }}
            >
              Returns & Refunds
            </Link>
            <span style={{ color: 'rgba(239,204,212,0.15)' }}>·</span>
            <Link
              href="/terms"
              className="font-poppins text-xs transition-colors hover:text-white"
              style={{ color: 'rgba(239,204,212,0.35)' }}
            >
              Terms & Conditions
            </Link>
            <span style={{ color: 'rgba(239,204,212,0.15)' }}>·</span>
            <Link
              href="/privacy-policy"
              className="font-poppins text-xs transition-colors hover:text-white"
              style={{ color: 'rgba(239,204,212,0.35)' }}
            >
              Privacy Policy
            </Link>
            <span style={{ color: 'rgba(239,204,212,0.15)' }}>·</span>
            <p
              className="font-poppins text-xs"
              style={{ color: 'rgba(239,204,212,0.35)' }}
            >
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}