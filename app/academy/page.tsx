import Link from 'next/link'
import Image from 'next/image'

const COURSES = [
  {
    slug: 'makeup',
    title: 'Make Up',
    tagline: 'From foundation to avant-garde artistry',
    duration: '1–2 months',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463680/Makeup_course_hetn7w.png',
    gradient: 'from-rose/10 to-blush/30',
    accent: '#8B3A52',
    careers: ['Makeup Artist', 'Celebrity Artist', 'Grooming Consultant', 'Makeup Educator'],
  },
  {
    slug: 'hair',
    title: 'Hair',
    tagline: 'Cuts, colour & advanced styling techniques',
    duration: '3–6 months',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463678/Hair_course_brxz2u.png',
    gradient: 'from-gold/10 to-blush/20',
    accent: '#C8974A',
    careers: ['Celebrity Hairstylist', 'Hair Colourist', 'Fashion Stylist', 'Hair Educator'],
  },
  {
    slug: 'skin',
    title: 'Skin',
    tagline: 'Science-backed skincare & advanced facials',
    duration: '3–6 months',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463675/Skin_course_dqtf7c.png',
    gradient: 'from-rose-light/10 to-petal-dark/40',
    accent: '#C4768A',
    careers: ['Aesthetician', 'Beauty Therapist', 'Skin Educator', 'Product Specialist'],
  },
  {
    slug: 'cosmetology',
    title: 'Cosmetology',
    tagline: 'Complete hair, skin, makeup & salon management',
    duration: '3–6 months',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463677/Cosmetology_Course_lf7c5p.png',
    gradient: 'from-mauve/10 to-blush/30',
    accent: '#B07080',
    careers: ['Salon Manager', 'Beauty Educator', 'Makeup Artist', 'Nail Artist'],
  },
  {
    slug: 'nail-art',
    title: 'Nail Art',
    tagline: 'Nail care, extensions, gel & 3D design',
    duration: '1–2 months',
    image: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463671/Nail_Art_course_taldxt.png',
    gradient: 'from-rose/10 to-gold/10',
    accent: '#8B3A52',
    careers: ['Nail Technician', 'Nail Artist', 'Nail Educator', 'Freelance Nail Tech'],
  },
]

const STATS = [
  { value: '5+', label: 'Professional Courses' },
  { value: '100%', label: 'Hands-On Training' },
  { value: 'Class 10', label: 'Minimum Eligibility' },
  { value: 'Delhi NCR', label: 'Location' },
]

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-petal">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Decorative background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 60% 0%, rgba(196,118,138,0.13) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 10% 100%, rgba(200,151,74,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Text */}
            <div className="flex-1 reveal fade-up">
              <p
                className="font-poppins text-xs font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: '#C4768A' }}
              >
                Doorstep Diva Academy
              </p>
              <h1
                className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
                style={{ color: '#3D2B2B' }}
              >
                Turn Your Passion
                <br />
                <span style={{ color: '#8B3A52' }}>Into a Career</span>
              </h1>
              <p className="font-poppins text-base md:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: '#7A5C5C' }}>
                Professional beauty courses taught by industry experts. From makeup artistry to complete cosmetology — gain real-world skills and the confidence to succeed.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#courses"
                  className="inline-flex items-center gap-2 font-poppins font-semibold text-sm px-7 py-3.5 rounded-full text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg,#C4768A,#8B3A52)' }}
                >
                  Explore Courses
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a
                  href="https://wa.me/917985183449?text=Hi%2C+I%27m+interested+in+enrolling+at+Doorstep+Diva+Academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-poppins font-semibold text-sm px-7 py-3.5 rounded-full border-2 transition-all duration-200 hover:bg-rose/5"
                  style={{ borderColor: '#8B3A52', color: '#8B3A52' }}
                >
                  Enquire on WhatsApp
                </a>
              </div>
            </div>

            {/* Brochure cover image */}
            <div className="flex-shrink-0 w-full max-w-xs md:max-w-sm reveal fade-up" style={{ animationDelay: '0.15s' }}>
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ boxShadow: '0 24px 64px rgba(139,58,82,0.18)' }}
              >
                <Image
                  src="https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777463675/Info_page_oehyyz.png"
                  alt="Doorstep Diva Academy — Professional Beauty Courses"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 reveal fade-up" style={{ animationDelay: '0.25s' }}>
            {STATS.map((s) => (
              <div
                key={s.label}
                className="text-center p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(196,118,138,0.15)' }}
              >
                <p className="font-playfair text-2xl font-bold mb-1" style={{ color: '#8B3A52' }}>{s.value}</p>
                <p className="font-poppins text-xs text-stone-light">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Eligibility bar ── */}
      <div
        style={{
          background: 'linear-gradient(135deg,#8B3A52,#C4768A)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <div className="flex items-center gap-2 text-white font-poppins text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Eligible from Class 10 (any stream)
          </div>
          <div className="flex items-center gap-2 text-white font-poppins text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            No prior experience required
          </div>
          <div className="flex items-center gap-2 text-white font-poppins text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Industry-certified on completion
          </div>
          <div className="flex items-center gap-2 text-white font-poppins text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Taught by salon professionals
          </div>
        </div>
      </div>

      {/* ── Courses grid ── */}
      <section id="courses" className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 py-20 md:py-28">
        <div className="text-center mb-14 reveal fade-up">
          <p
            className="font-poppins text-xs font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ color: '#C4768A' }}
          >
            Our Programmes
          </p>
          <h2
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ color: '#3D2B2B' }}
          >
            Choose Your Course
          </h2>
          <p className="font-poppins text-base mt-4 max-w-xl mx-auto" style={{ color: '#7A5C5C' }}>
            Each programme is designed by industry experts to give you the skills, confidence, and certification to launch your beauty career.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course, i) => (
            <Link
              key={course.slug}
              href={`/academy/${course.slug}`}
              className={`group relative rounded-2xl overflow-hidden bg-gradient-to-br ${course.gradient} border border-white/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 reveal fade-up`}
              style={{
                animationDelay: `${i * 0.08}s`,
                boxShadow: '0 4px 24px rgba(139,58,82,0.07)',
              }}
            >
              {/* Course brochure image */}
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <Image
                  src={course.image}
                  alt={`${course.title} course at Doorstep Diva Academy`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3
                  className="font-playfair text-2xl font-bold mb-1"
                  style={{ color: course.accent }}
                >
                  {course.title}
                </h3>
                <p className="font-poppins text-sm mb-4" style={{ color: '#7A5C5C' }}>
                  {course.tagline}
                </p>

                {/* Duration badge */}
                <div className="flex items-center gap-2 mb-5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={course.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span className="font-poppins text-xs font-medium" style={{ color: course.accent }}>
                    Duration: {course.duration}
                  </span>
                </div>

                {/* Top careers */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {course.careers.slice(0, 3).map((c) => (
                    <span
                      key={c}
                      className="font-poppins text-[10px] font-medium px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.7)', color: '#7A5C5C', border: '1px solid rgba(196,118,138,0.2)' }}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <div
                  className="flex items-center gap-1.5 font-poppins text-sm font-semibold transition-gap duration-200 group-hover:gap-3"
                  style={{ color: course.accent }}
                >
                  View Course
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </Link>
          ))}

          {/* CTA card */}
          <div
            className="rounded-2xl p-8 flex flex-col items-center justify-center text-center reveal fade-up"
            style={{
              background: 'linear-gradient(135deg,#8B3A52,#C4768A)',
              animationDelay: `${COURSES.length * 0.08}s`,
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-3">Not Sure Which Course?</h3>
            <p className="font-poppins text-sm text-white/80 mb-6 leading-relaxed">
              Talk to our counsellors and find the perfect programme for your goals and schedule.
            </p>
            <a
              href="https://wa.me/917985183449?text=Hi%2C+I%27d+like+guidance+on+which+Doorstep+Diva+Academy+course+is+right+for+me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-poppins font-semibold text-sm px-6 py-3 rounded-full bg-white transition-all duration-200 hover:scale-[1.04]"
              style={{ color: '#8B3A52' }}
            >
              Chat on WhatsApp
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Why Academy section ── */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(180deg,#FDF0F0 0%,#F5E0E0 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16">
          <div className="text-center mb-14 reveal fade-up">
            <p
              className="font-poppins text-xs font-semibold tracking-[0.22em] uppercase mb-3"
              style={{ color: '#C4768A' }}
            >
              Why Train With Us
            </p>
            <h2
              className="font-playfair text-3xl sm:text-4xl font-bold"
              style={{ color: '#3D2B2B' }}
            >
              The Doorstep Diva Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                title: 'Certified Professionals',
                desc: 'Learn from working salon professionals and industry veterans who bring real-world experience into every session.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                ),
                title: 'Industry Certification',
                desc: 'Graduate with a recognised certification that opens doors in salons, spas, and wellness centres across India and abroad.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                ),
                title: 'Small Batch Training',
                desc: 'Personalised attention in small batches ensures every student gets hands-on practice with guidance tailored to them.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                  </svg>
                ),
                title: 'Professional-Grade Products',
                desc: 'Train with the same premium tools and products used in top salons, so you\'re job-ready from your first day after graduation.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                  </svg>
                ),
                title: 'Career Placement Support',
                desc: 'We guide you beyond the classroom — with industry connections and support to launch your career or freelance practice.',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                ),
                title: 'Flexible Batches',
                desc: 'Morning, afternoon, and weekend batches available to fit your existing schedule. Study at your own pace without disrupting your life.',
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="p-7 rounded-2xl reveal fade-up"
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  border: '1px solid rgba(196,118,138,0.15)',
                  animationDelay: `${i * 0.07}s`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(139,58,82,0.08)', color: '#8B3A52' }}
                >
                  {item.icon}
                </div>
                <h3 className="font-playfair text-lg font-bold mb-2" style={{ color: '#3D2B2B' }}>{item.title}</h3>
                <p className="font-poppins text-sm leading-relaxed" style={{ color: '#7A5C5C' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 py-20 md:py-28">
        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center reveal fade-up"
          style={{
            background: 'linear-gradient(135deg,#3D2B2B 0%,#8B3A52 60%,#C4768A 100%)',
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          />

          <p
            className="font-poppins text-xs font-semibold tracking-[0.22em] uppercase mb-4 text-white/60"
          >
            Enrolments Open
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
            Begin Your Beauty Journey
          </h2>
          <p className="font-poppins text-base text-white/75 max-w-lg mx-auto mb-10">
            Seats are limited. Reach out today to reserve your spot and get a free course consultation with our team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/917985183449?text=Hi%2C+I%27d+like+to+enrol+at+Doorstep+Diva+Academy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-poppins font-semibold text-sm px-8 py-4 rounded-full bg-white transition-all duration-200 hover:scale-[1.04] hover:shadow-xl"
              style={{ color: '#8B3A52' }}
            >
              Enrol Now on WhatsApp
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a
              href="tel:+917985183449"
              className="inline-flex items-center gap-2 font-poppins font-semibold text-sm px-8 py-4 rounded-full border-2 border-white/40 text-white transition-all duration-200 hover:bg-white/10"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
