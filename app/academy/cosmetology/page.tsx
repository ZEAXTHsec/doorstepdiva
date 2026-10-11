import CoursePageTemplate, { type CourseData } from '../CoursePageTemplate'

const course: CourseData = {
  slug: 'cosmetology',
  title: 'Cosmetology',
  subtitle: 'Complete beauty training across every discipline',
  heroImage: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463677/Cosmetology_Course_lf7c5p.png',
  accentColor: '#8B3A52',
  intro:
    'The Cosmetology Course at Doorstep Diva Academy is the most comprehensive programme we offer — covering haircare, skincare, makeup, nail care, and salon management with complete hands-on training using industry-grade tools and products.',
  whatYouLearn: [
    'Complete haircare — cuts, colour, and treatments',
    'Advanced skincare and facial techniques',
    'Professional makeup artistry fundamentals',
    'Nail care, extensions, and nail art',
    'Salon management and service delivery',
    'Client consultation with care and professionalism',
    'Salon hygiene and safety protocols',
    'Product knowledge across all beauty disciplines',
  ],
  duration: { foundation: '3 months', advanced: '6 months' },
  eligibility: 'Class 10 (any stream)',
  careers: [
    { label: 'Assistant Beauty Therapist' },
    { label: 'Manicurist & Pedicurist' },
    { label: 'Makeup Artist' },
    { label: 'Nail Artist' },
    { label: 'Salon Manager' },
    { label: 'Beauty Educator' },
  ],
}

export const metadata = {
  title: 'Cosmetology Course | Doorstep Diva Academy',
  description:
    'All-in-one cosmetology course at Doorstep Diva Academy Delhi. Master hair, skin, makeup, nails and salon management. Foundation 3 months · Advanced 6 months. Enrol from Class 10.',
  keywords: ['cosmetology course Delhi', 'beauty therapy course', 'salon training course', 'professional beauty course India', 'Doorstep Diva Academy'],
  openGraph: {
    title: 'Cosmetology Course | Doorstep Diva Academy',
    description: 'Complete cosmetology training covering hair, skin, makeup, nails and salon management.',
    images: ['https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463677/Cosmetology_Course_lf7c5p.png'],
  },
}

export default function CosmetologyCoursePage() {
  return <CoursePageTemplate course={course} />
}