import Image from 'next/image'
import Link from 'next/link'

const QUICK_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/about',   label: 'Our Story' },
  { href: '/areas',   label: 'Areas We Serve' },
  { href: '/#contact',label: 'Book Now' },
]

const SERVICE_LINKS = [
  { href: '/services/hair',           label: 'Hair' },
  { href: '/services/skin',           label: 'Skin & Waxing' },
  { href: '/services/makeup',         label: 'Makeup' },
  { href: '/services/eyelash',        label: 'Eyelash & Brow' },
  { href: '/services/semi-permanent', label: 'Semi-Permanent' },
  { href: '/services/nails',          label: 'Nail Extensions' },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

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
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="#EFCCD4" stroke="none"/>
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
              <a
                href="https://wa.me/917985183449"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
                style={{ background: 'rgba(239,204,212,0.12)', border: '1px solid rgba(239,204,212,0.18)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#EFCCD4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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

          {/* Col 4 — Contact */}
          <div>
            <h4
              className="font-poppins text-[10px] font-semibold tracking-widest uppercase mb-5"
              style={{ color: '#C4768A' }}
            >
              Get In Touch
            </h4>
            <div className="space-y-4">
              <a
                href="https://wa.me/917985183449"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 font-poppins text-sm transition-colors hover:text-white"
                style={{ color: 'rgba(239,204,212,0.7)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.9v2.02z"/>
                </svg>
                +91 79851 83449
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
          <p
            className="font-poppins text-xs"
            style={{ color: 'rgba(239,204,212,0.35)' }}
          >
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  )
}
