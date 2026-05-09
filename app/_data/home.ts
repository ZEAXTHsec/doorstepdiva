// ─── ALL HOME PAGE DATA ───────────────────────────────────────────────────────
// Single source of truth — edit here, all sections update automatically

export const SERVICES = [
  {
    id: '01',
    title: 'Hair',
    tagline: 'Cuts · Color · Treatments',
    desc: "Precision cuts, transformative color, and clinical treatments using L'Oréal Professionnel, Kérastase, and Olaplex.",
    tags: ['Haircuts', 'Balayage', 'Keratin', 'Olaplex'],
    accent: '#EFCCD4',
    href: '/services/hair',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175128/Hair_service_cover_dxozc1.png',
  },
  {
    id: '02',
    title: 'Skin',
    tagline: 'Waxing · Facials · Body Care',
    desc: 'Full-spectrum skincare — waxing, brightening facials, chemical peels, and body polishing tailored for Indian skin.',
    tags: ['Waxing', 'Facials', 'Chemical Peel', 'Body Polish'],
    accent: '#F5E0D0',
    href: '/services/skin',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Skin_service_nrbzmt.png',
  },
  {
    id: '03',
    title: 'Makeup',
    tagline: 'Party · Bridal · Events',
    desc: 'From festive party looks to full bridal-day experiences using MAC, Charlotte Tilbury, NARS, and Huda Beauty.',
    tags: ['Party Glam', 'Engagement', 'Bridal', 'Sangeet'],
    accent: '#F0D8E8',
    href: '/services/makeup',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png',
  },
  {
    id: '04',
    title: 'Eyelash & Brow',
    tagline: 'Classic · Hybrid · Volume',
    desc: 'Full lash artistry with medical-grade adhesive. Extensions last 3–5 weeks. Cat eye and Foxy styles available.',
    tags: ['Classic', 'Hybrid', 'Volume 2D–6D', 'Cat Eye'],
    accent: '#E8D8F0',
    href: '/services/eyelash',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png',
  },
  {
    id: '05',
    title: 'Semi-Permanent',
    tagline: 'Microblading · Microneedling',
    desc: 'Long-lasting brow, lip, and liner enhancements by certified technicians. Results last 12 months to 3 years.',
    tags: ['Microblading', 'Combo Brows', 'Lip Blush', 'Nano Liner'],
    accent: '#F0E8D8',
    href: '/services/semi-permanent',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Semi_permanent_qm0uif.png',
  },
  {
    id: '06',
    title: 'Nail Extensions',
    tagline: 'Acrylic · Gel · PolyGel',
    desc: 'Every nail system — durable acrylics, natural gels, and next-gen PolyGel — finished with bespoke nail art.',
    tags: ['Acrylic', 'Gel / Shellac', 'PolyGel', 'Nail Art'],
    accent: '#F5D8DC',
    href: '/services/nails',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175098/Nail_Service_akqioe.png',
  },
]

export const MARQUEE = [
  'Hair Styling','✦','Bridal Makeup','✦','Eyelash Extensions','✦',
  'Microblading','✦','Nail Art','✦','Skin Treatments','✦','Body Waxing','✦','At-Home Luxury','✦',
]

export const STATS = [
  { n: '6',    label: 'Service Divisions' },
  { n: '15+',  label: 'Premium Brands'    },
  { n: '100%', label: 'Certified Artists' },
  { n: '∞',    label: 'At Your Doorstep'  },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Book in 60 Seconds',
    desc: 'Message us on WhatsApp or call directly. Tell us the service, your location, and preferred time. No app, no login needed.',
    accent: '#EFCCD4',
  },
  {
    step: '02',
    title: 'We Arrive Fully Equipped',
    desc: 'Your certified artist arrives on time with all professional tools, premium products, and everything needed for a full salon experience.',
    accent: '#F0D8E8',
  },
  {
    step: '03',
    title: 'You Glow, Effortlessly',
    desc: 'Sit back and enjoy. Zero travel, zero parking, zero waiting room. Just results — delivered in the comfort of your own home.',
    accent: '#F5E0D0',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Priya S.',
    location: 'Gomti Nagar, Lucknow',
    service: 'Bridal Makeup',
    review: "I was nervous about getting my bridal makeup done at home but the artist was so professional — better than any salon I've visited. My whole family was impressed.",
    rating: 5,
    accent: '#EFCCD4',
  },
  {
    name: 'Ritu M.',
    location: 'Noida, Delhi NCR',
    service: 'Nail Extensions (PolyGel)',
    review: 'The PolyGel set lasted over 3 weeks with zero lifting. She brought all her own products and even cleaned up after herself. Will absolutely book again.',
    rating: 5,
    accent: '#F5D8DC',
  },
  {
    name: 'Ananya K.',
    location: 'Hazratganj, Lucknow',
    service: 'Eyelash Extensions',
    review: 'Volume lashes done at home — I was skeptical but these look stunning. Still going strong at 4 weeks. The technician was so careful and professional.',
    rating: 5,
    accent: '#E8D8F0',
  },
  {
    name: 'Deepa R.',
    location: 'Gurugram, Delhi NCR',
    service: 'Keratin Treatment',
    review: 'Saved me a 2-hour round trip to my salon. The result was identical — silky smooth hair. Booking for the third time now, never going back to in-salon.',
    rating: 5,
    accent: '#F5E0D0',
  },
  {
    name: 'Shalini T.',
    location: 'Indira Nagar, Lucknow',
    service: 'Microblading',
    review: "Powder brows done so naturally — my friends thought I had finally figured out my eyebrow routine! The technician explained everything beforehand and was incredibly gentle.",
    rating: 5,
    accent: '#F0E8D8',
  },
  {
    name: 'Meera V.',
    location: 'Faridabad, Delhi NCR',
    service: 'Skin & Waxing',
    review: 'Full body sugar wax plus a gold facial — all in one appointment at my home. The products were top quality and my skin felt amazing for days afterwards.',
    rating: 5,
    accent: '#F0D8E8',
  },
]

export const FAQS = [
  {
    q: 'Do you bring your own products and equipment?',
    a: "Yes — always. Every artist arrives with a fully stocked kit: professional-grade products, clean tools, disposables, and everything needed for a complete salon experience. You don't need to arrange anything.",
  },
  {
    q: 'How far in advance should I book?',
    a: 'For regular services, 24–48 hours is usually sufficient. For bridal packages or semi-permanent makeup, we recommend booking at least 1–2 weeks in advance to ensure your preferred artist and time slot are available.',
  },
  {
    q: 'Which areas do you currently serve?',
    a: 'We operate across Delhi NCR (Delhi, Noida, Gurugram, Faridabad, Ghaziabad), Lucknow (Hazratganj, Gomti Nagar, Alambagh, Indira Nagar, Aliganj), and Ayodhya. Not sure if we cover your exact area? Just message us on WhatsApp.',
  },
  {
    q: 'How does payment work?',
    a: 'We accept UPI, cash, and bank transfer. Payment is made directly to the artist upon service completion. No advance payment is required for most standard services.',
  },
  {
    q: 'What if I need to reschedule or cancel?',
    a: 'Life happens — we understand. Please let us know at least 3–4 hours before your scheduled appointment via WhatsApp so we can reassign your artist. We do not charge cancellation fees for standard notice.',
  },
  {
    q: 'Are your artists certified?',
    a: "Every artist on our team is certified in their respective discipline — whether that's a hair technician trained in Olaplex applications or a microblading artist with a semi-permanent makeup certification. We never send untrained staff.",
  },
  {
    q: 'Do you offer packages for weddings or events?',
    a: 'Yes. We offer full bridal packages covering multiple days and the full bridal party, as well as group bookings for parties, sangeet nights, and corporate events. Message us on WhatsApp with your date and headcount for a custom quote.',
  },
  {
    q: 'Can I book multiple services in one appointment?',
    a: "Absolutely. You can combine services — for example, waxing + facial + mani-pedi in one visit. Just let us know when booking and we'll schedule the right artist(s) and sufficient time.",
  },
]

export const BLOG_POSTS = [
  {
    slug: 'bridal-makeup-at-home-delhi',
    title: 'Why Delhi Brides Are Ditching Salons for At-Home Bridal Makeup',
    excerpt: 'More brides across Delhi NCR are choosing doorstep beauty artists over salon appointments — and the results speak for themselves.',
    date: 'April 12, 2025',
    readTime: '4 min read',
    category: 'Bridal',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175077/makeup_service_poxkc9.png',
  },
  {
    slug: 'microblading-vs-powder-brows',
    title: 'Microblading vs. Powder Brows: Which Is Right for You?',
    excerpt: 'Two semi-permanent brow techniques, one goal — perfect brows with zero daily effort. Here\'s how to choose the right one.',
    date: 'March 28, 2025',
    readTime: '5 min read',
    category: 'Semi-Permanent',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175149/Semi_permanent_qm0uif.png',
  },
  {
    slug: 'eyelash-extension-care-tips',
    title: '7 Ways to Make Your Lash Extensions Last Longer',
    excerpt: 'From the first fill to the final touch — everything you need to keep your extensions fresh and full for weeks.',
    date: 'March 10, 2025',
    readTime: '3 min read',
    category: 'Lashes',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175122/Eyebrowm_service_z2fmuv.png',
  },
]

export const LOCATIONS = [
  {
    city: 'Delhi NCR',
    areas: ['Delhi', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad', 'Greater Noida'],
    accent: '#EFCCD4',
  },
  {
    city: 'Lucknow',
    areas: ['Hazratganj', 'Gomti Nagar', 'Alambagh', 'Indira Nagar', 'Aliganj', 'Mahanagar'],
    accent: '#F0D8E8',
  },
  {
    city: 'Ayodhya',
    areas: ['Naya Ghat', 'Ram Nagar', 'Civil Lines', 'Faizabad Road'],
    accent: '#F5E0D0',
  },
]