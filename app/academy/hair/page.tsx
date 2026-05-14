import CoursePageTemplate, { type CourseData } from '../CoursePageTemplate'

const course: CourseData = {
  slug: 'hair',
  title: 'Hair Styling',
  subtitle: 'Master cuts, colour, and advanced treatments',
  heroImage: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463678/Hair_course_brxz2u.png',
  accentColor: '#A8395A',
  intro:
    'The Hair Styling Course at Doorstep Diva Academy gives you in-depth knowledge of haircuts, hair colouring, styling techniques, and advanced hair treatments. Taught by industry experts and celebrity stylists, this course keeps you updated on the latest global hair trends.',
  whatYouLearn: [
    'Haircut techniques for all hair types and lengths',
    'Hair colouring, highlights, and balayage',
    'Scalp care and long-term hair health treatments',
    'Blowouts, curls, braids, and high-fashion styling',
    'Bridal and editorial hairstyling techniques',
    'Professional tools and salon-grade product usage',
    'Client consultation and personalised styling',
    'Latest global hair trends and styling methods',
  ],
  duration: { foundation: '3 months', advanced: '6 months' },
  eligibility: 'Class 10 (any stream)',
  careers: [
    { label: 'Celebrity Hairstylist' },
    { label: 'Hair Colourist' },
    { label: 'Hair Educator' },
    { label: 'Consultant & Product Specialist' },
    { label: 'Fashion and Editorial Stylist' },
    { label: "Men's Grooming Specialist" },
  ],
}

export const metadata = {
  title: 'Hair Styling Course | Doorstep Diva Academy',
  description:
    'Professional hair styling course at Doorstep Diva Academy Delhi. Learn cuts, colouring, balayage, bridal styling and advanced treatments. Foundation 3 months · Advanced 6 months. Enrol from Class 10.',
  keywords: ['hair styling course Delhi', 'hair colouring course', 'professional hair course', 'Doorstep Diva Academy'],
  openGraph: {
    title: 'Hair Styling Course | Doorstep Diva Academy',
    description: 'Become a professional hair stylist with our 3–6 month foundation and advanced courses.',
    images: ['https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463678/Hair_course_brxz2u.png'],
  },
}

export default function HairCoursePage() {
  return <CoursePageTemplate course={course} />
}