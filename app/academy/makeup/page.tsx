import CoursePageTemplate, { type CourseData } from '../CoursePageTemplate'

const course: CourseData = {
  slug: 'makeup',
  title: 'Make Up',
  subtitle: 'From foundation to avant-garde artistry',
  heroImage: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463680/Makeup_course_hetn7w.png',
  accentColor: '#C4768A',
  intro:
    'Give your beauty career a stunning start with Doorstep Diva Academy\'s foundation and advanced makeup courses. You will learn everything from facial anatomy and colour theory to HD and airbrush makeup, while practising with industry-standard tools and products in hands-on makeup classes.',
  whatYouLearn: [
    'Facial anatomy and colour theory fundamentals',
    'HD and airbrush makeup techniques',
    'High-fashion editorial and runway looks',
    'Contemporary hairstyling for complete looks',
    'Client management and personal branding',
    'Freelance business skills and brand building',
    'Industry-standard tools and product knowledge',
    'Personal grooming and client consultation',
  ],
  duration: { foundation: '2-4 months' },
  eligibility: 'Class 10 (any stream)',
  careers: [
    { label: 'Makeup Artist' },
    { label: 'Beauty Advisor' },
    { label: 'Grooming Consultant' },
    { label: 'Makeup Educator' },
    { label: 'Beauty Brand Trainer' },
    { label: 'Celebrity Makeup Artist' },
    { label: 'Cosmetic Consultant & Product Specialist' },
    { label: 'Backstage & Runway Expert Makeup Artist' },
  ],
}

export const metadata = {
  title: 'Make Up Course | Doorstep Diva Academy',
  description:
    'Learn professional makeup artistry at Doorstep Diva Academy. Foundation & advanced courses covering HD makeup, airbrush, editorial looks and freelance business skills. Enrol from Class 10.',
  keywords: ['makeup artist course', 'professional makeup course Delhi', 'HD makeup training', 'airbrush makeup course', 'Doorstep Diva Academy'],
  openGraph: {
    title: 'Make Up Course | Doorstep Diva Academy',
    description: 'Become a professional makeup artist with our 2-4 month foundation and advanced makeup courses.',
    images: ['https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463680/Makeup_course_hetn7w.png'],
  },
}

export default function MakeupCoursePage() {
  return <CoursePageTemplate course={course} />
}