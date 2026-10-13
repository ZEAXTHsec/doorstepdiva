import type { Metadata } from 'next'
import { DM_Serif_Display, Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollRevealInit from './components/ScrollRevealInit'
import { CartProvider } from './context/CartContext'
import CartDrawer from './components/CartDrawer'
import LuxuryCursor from './components/LuxuryCursor'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import MobileQuickActionDock from './components/MobileQuickActionDock'
import SmoothScroll from './components/SmoothScroll'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mydoorstepdiva.com'),
  title: 'DoorStep Diva — Salon-Quality Beauty At Your Door',
  description:
    'Six professional beauty divisions — hair, skin, makeup, lashes, semi-permanent makeup & nails — by certified artists, delivered wherever you are across Delhi NCR, Lucknow & Ayodhya.',
  keywords:
    'at home salon Delhi, doorstep beauty service, home beauty artist, mobile salon NCR, bridal makeup at home, salon at home Lucknow',
  alternates: {
    canonical: 'https://mydoorstepdiva.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  openGraph: {
    title: 'DoorStep Diva — Salon-Quality Beauty At Your Door',
    description:
      'Certified beauty artists bringing salon services to your home across Delhi NCR, Lucknow & Ayodhya.',
    url: 'https://mydoorstepdiva.com',
    siteName: 'DoorStep Diva',
    type: 'website',
  },
  verification: {
    google: 'ZJvSH7pK4rvvfbDP8k7ajo2veNpjefOuWFwq8HMYc6M',
  },
}

const SCHEMA_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BeautySalon',
      '@id': 'https://mydoorstepdiva.com/#organization',
      name: 'DoorStep Diva',
      url: 'https://mydoorstepdiva.com',
      logo: 'https://mydoorstepdiva.com/favicon.png',
      description: 'Premium certified at-home salon and bridal beauty services delivered across Delhi NCR, Lucknow, and Ayodhya. Specialized in hair, skin, bridal makeup, nail extensions, and semi-permanent makeup.',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Digixfly',
        url: 'https://digixfly.com',
      },
      telephone: '+919129577514',
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Net Banking',
      areaServed: [
        { '@type': 'City', name: 'Delhi' },
        { '@type': 'City', name: 'New Delhi' },
        { '@type': 'City', name: 'Noida' },
        { '@type': 'City', name: 'Gurgaon' },
        { '@type': 'City', name: 'Ghaziabad' },
        { '@type': 'City', name: 'Faridabad' },
        { '@type': 'City', name: 'Lucknow' },
        { '@type': 'City', name: 'Ayodhya' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'At-Home Beauty Services',
        itemListElement: [
          { '@type': 'OfferCatalog', name: 'Hair Services & Keratin Treatments' },
          { '@type': 'OfferCatalog', name: 'Facials, Waxing & Skin Care' },
          { '@type': 'OfferCatalog', name: 'HD & Airbrush Bridal Makeup' },
          { '@type': 'OfferCatalog', name: 'Nail Extensions & Art' },
          { '@type': 'OfferCatalog', name: 'Lash Extensions & Microblading' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://mydoorstepdiva.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I book at-home salon services with DoorStep Diva in Delhi NCR or Lucknow?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can select your desired beauty service on mydoorstepdiva.com/book and choose your city (Delhi NCR, Lucknow, or Ayodhya). No advance deposit is needed. A beauty coordinator will call or WhatsApp you within 15 minutes to confirm your certified female artist and preferred arrival time.',
          },
        },
        {
          '@type': 'Question',
          name: 'What hygiene and safety measures do DoorStep Diva artists follow?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every DoorStep Diva artist carries a 100% sealed, single-use disposable kit (disposable towels, gowns, bedsheets, spatulas) unsealed right in front of the customer. Metallic tools are hospital-grade sterilized, and all cosmetics are premium branded mono-doses.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which areas in Delhi NCR and Lucknow are covered?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In Delhi NCR, we cover South Delhi, Central Delhi, West Delhi, Noida, Greater Noida, and Gurgaon. In Lucknow, we cover Gomti Nagar, Hazratganj, Aliganj, Indira Nagar, Mahanagar, Ashiyana, and surrounding localities.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I pay after the service is completed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, zero advance payment is required for standard salon services. You inspect your service and pay securely via UPI (Google Pay, PhonePe, Paytm) or cash only once you are completely satisfied.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${poppins.variable}`}>
      <head>
        <meta name="google-site-verification" content="ZJvSH7pK4rvvfbDP8k7ajo2veNpjefOuWFwq8HMYc6M" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_JSON_LD) }}
        />
      </head>
      <body className="bg-petal text-stone font-poppins antialiased">
        <CartProvider>
          <SmoothScroll>
            <LuxuryCursor />
            {/* Scroll reveal observer — runs once, watches all .reveal elements */}
            <ScrollRevealInit />

            {/* Site header — fixed, always visible */}
            <Header />

            {/* Page content — padded below fixed header, padded above mobile sticky bar */}
            <main className="pt-28 pb-16 md:pb-0">{children}</main>

            {/* Site footer */}
            <Footer />

            {/* Cart drawer */}
            <CartDrawer />

            {/* WhatsApp floating button (cart-aware with badge and bundle prefill) */}
            <FloatingWhatsApp />

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1368419805120181');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1368419805120181&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Razorpay checkout */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

        {/* Modern Context-Aware Mobile Quick Booking Dock */}
        <MobileQuickActionDock />
        </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  )
}
