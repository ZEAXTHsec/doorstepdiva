import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Doorstep Diva Academy — Professional Beauty Courses',
  description:
    'Learn professional beauty skills at Doorstep Diva Academy. Courses in Makeup, Hair, Skin, Cosmetology & Nail Art. Eligibility from Class 10. Enrol today.',
  keywords:
    'beauty academy Delhi, makeup course, hair styling course, skin care course, cosmetology course, nail art course, beauty school India, professional beauty training',
  openGraph: {
    title: 'Doorstep Diva Academy — Professional Beauty Courses',
    description:
      'Transform your passion into a career. Expert-led beauty courses in Makeup, Hair, Skin, Cosmetology & Nail Art.',
    url: 'https://doorstepdiva.com/academy',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463675/Info_page_oehyyz.png',
        width: 1200,
        height: 630,
        alt: 'Doorstep Diva Academy',
      },
    ],
  },
}

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
