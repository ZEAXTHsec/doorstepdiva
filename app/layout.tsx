import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'DoorStep Diva — Beauty at Your Door',
  description: 'Professional salon services delivered to your doorstep.',
}

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#about',    label: 'About'    },
  { href: '#contact',  label: 'Book Now' },
]

function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="flex items-center justify-between px-6 md:px-16 h-20 max-w-7xl mx-auto">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-playfair text-2xl font-semibold text-rose">DoorStep</span>
          <span className="font-poppins text-[9px] tracking-[0.4em] uppercase text-mauve font-medium">Diva</span>
        </Link>
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.slice(0, 2).map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="font-poppins text-xs tracking-widest uppercase text-stone-light hover:text-rose transition-colors font-medium">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="#contact"
          className="font-poppins text-xs tracking-widest uppercase px-7 py-3 bg-rose text-white hover:bg-mauve transition-colors duration-300 font-medium rounded-full"
        >
          Book Now
        </Link>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-stone px-6 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-12 border-b border-white/10">
          <div className="max-w-xs">
            <p className="font-playfair text-3xl font-semibold text-blush mb-1">DoorStep Diva</p>
            <p className="font-poppins text-[10px] tracking-[0.35em] uppercase text-mauve font-medium mb-5">Beauty at Your Door</p>
            <p className="font-poppins text-sm text-white/50 leading-relaxed">
              Six service divisions. One certified team. Glow on your terms.
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="font-poppins text-[10px] tracking-widest uppercase text-rose-light font-semibold mb-5">Navigate</p>
              <div className="flex flex-col gap-3">
                {navLinks.map(({ href, label }) => (
                  <Link key={href} href={href} className="font-poppins text-sm text-white/50 hover:text-blush transition-colors">{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="font-poppins text-[10px] tracking-widest uppercase text-rose-light font-semibold mb-5">Services</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Hair', href: '/services/hair' },
                  { label: 'Skin', href: '/services/skin' },
                  { label: 'Makeup', href: '/services/makeup' },
                  { label: 'Eyelash', href: '/services/eyelash' },
                  { label: 'Semi-Permanent', href: '/services/semi-permanent' },
                  { label: 'Nails', href: '/services/nails' },
                ].map(s => (
                  <Link key={s.href} href={s.href} className="font-poppins text-sm text-white/50 hover:text-blush transition-colors">{s.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="font-poppins text-xs text-white/20 mt-8">
          © {new Date().getFullYear()} DoorStep Diva. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="bg-petal text-stone antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
