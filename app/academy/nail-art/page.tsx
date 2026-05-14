import CoursePageTemplate, { type CourseData } from '../CoursePageTemplate'

const course: CourseData = {
  slug: 'nail-art',
  title: 'Nail Art',
  subtitle: 'From basics to 3D art and nail extensions',
  heroImage: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463671/Nail_Art_course_taldxt.png',
  accentColor: '#B56B8A',
  intro:
    'The Nail Art Course at Doorstep Diva Academy offers hands-on training in nail care, nail enhancements, nail extensions, gel polish, 3D nail art, and the latest designing techniques. You will work with professional tools and high-quality products under the guidance of experienced nail artists.',
  whatYouLearn: [
    'Nail anatomy, hygiene, and safety basics',
    'Manicures, pedicures, nail shaping, and polishing',
    'Gel polish application and acrylic extensions',
    'Nail enhancements and strengthening techniques',
    'Hand painting, 3D nail art, and embellishments',
    'Professional salon tools and product usage',
    'Nail health maintenance and client care',
    'Latest nail art trends and design techniques',
  ],
  duration: { foundation: '1 month', advanced: '2 months' },
  eligibility: 'Class 10 (any stream)',
  careers: [
    { label: 'Nail Technician' },
    { label: 'Nail Artist' },
    { label: 'Nail Educator' },
    { label: 'Freelance Nail Technician' },
  ],
}

export const metadata = {
  title: 'Nail Art Course | Doorstep Diva Academy',
  description:
    'Professional nail art course at Doorstep Diva Academy Delhi. Learn gel polish, acrylic extensions, 3D nail art and nail enhancements. Foundation 1 month · Advanced 2 months. Enrol from Class 10.',
  keywords: ['nail art course Delhi', 'nail technician course', 'gel nail course', '3D nail art training', 'Doorstep Diva Academy'],
  openGraph: {
    title: 'Nail Art Course | Doorstep Diva Academy',
    description: 'Become a professional nail artist with our 1–2 month foundation and advanced nail art courses.',
    images: ['https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463671/Nail_Art_course_taldxt.png'],
  },
}

export default function NailArtCoursePage() {
  return <CoursePageTemplate course={course} />
}