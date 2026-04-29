import CoursePageTemplate, { type CourseData } from '../CoursePageTemplate'

const course: CourseData = {
  slug: 'skin',
  title: 'Skin Care',
  subtitle: 'Science-backed skincare for the modern professional',
  heroImage: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463675/Skin_course_dqtf7c.png',
  accentColor: '#C8974A',
  intro:
    'The Skin Care Course at Doorstep Diva Academy blends theoretical knowledge and hands-on training in skin science, skin analysis, advanced facials, anti-ageing and acne treatments, and top skincare products. It prepares you to work as a professional aesthetician in leading salons, spas, and wellness centres.',
  whatYouLearn: [
    'Skin science, anatomy, and skin type analysis',
    'Advanced facials and deep cleansing treatments',
    'Anti-ageing, acne, and corrective treatments',
    'Chemical peels and microdermabrasion techniques',
    'Skin healing and rejuvenation protocols',
    'Professional skincare product knowledge',
    'Client consultation and treatment planning',
    'Salon hygiene and safety standards',
  ],
  duration: { foundation: '3 months', advanced: '6 months' },
  eligibility: 'Class 10 (any stream)',
  careers: [
    { label: 'Beauty Therapist' },
    { label: 'Assistant Aesthetician' },
    { label: 'Senior Beauty Therapist' },
    { label: 'Senior Skin Consultant' },
    { label: 'Aesthetician' },
    { label: 'Skin Educator' },
    { label: 'Beauty Advisor' },
    { label: 'Product Specialist' },
  ],
}

export const metadata = {
  title: 'Skin Care Course | Doorstep Diva Academy',
  description:
    'Certified skin care course at Doorstep Diva Academy Delhi. Learn advanced facials, chemical peels, anti-ageing treatments and skin science. Foundation 3 months · Advanced 6 months. Enrol from Class 10.',
  keywords: ['skin care course Delhi', 'aesthetician course', 'advanced facial training', 'skincare certification India', 'Doorstep Diva Academy'],
  openGraph: {
    title: 'Skin Care Course | Doorstep Diva Academy',
    description: 'Become a certified skin care professional with our 3–6 month foundation and advanced skincare courses.',
    images: ['https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463675/Skin_course_dqtf7c.png'],
  },
}

export default function SkinCoursePage() {
  return <CoursePageTemplate course={course} />
}