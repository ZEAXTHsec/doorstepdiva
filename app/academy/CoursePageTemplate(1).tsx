import Link from 'next/link'
import Image from 'next/image'

export interface CourseData {
  slug: string
  title: string
  subtitle: string
  heroImage: string
  accentColor: string
  intro: string
  whatYouLearn: string[]
  duration: { foundation: string; advanced?: string }
  eligibility: string
  careers: { label: string }[]
}

export default function CoursePageTemplate({ course }: { course: CourseData }) {
  return (
    <div className="min-h-screen bg-petal">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 pt-6 pb-0">
        <nav className="flex items-center gap-2 font-poppins text-xs text-stone-light" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-rose transition-colors">Home</Link>
          <span>/</span>
          <Link href="/academy" className="hover:text-rose transition-colors">Academy</Link>
          <span>/</span>
          <span style={{ color: course.accentColor }}>{course.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 65% 0%, ${course.accentColor}18 0%, transparent 70%)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

            {/* Left: text */}
            <div className="flex-1 reveal fade-up">
              <p
                className="font-poppins text-xs font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: course.accentColor }}
              >
                Doorstep Diva Academy
              </p>
              <h1
                className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
                style={{ color: '#3D2B2B' }}
              >
                {course.title}
              </h1>
              <p className="font-poppins text-lg font-medium mb-6" style={{ color: course.accentColor }}>
                {course.subtitle}
              </p>
              <p className="font-poppins text-base leading-relaxed mb-8 max-w-xl" style={{ color: '#7A5C5C' }}>
                {course.intro}
              </p>

              {/* Duration + eligibility pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div
                  className="flex items-center gap-2 font-poppins text-sm font-medium px-4 py-2 rounded-full"
                  style={{ background: `${course.accentColor}14`, color: course.accentColor }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {course.duration.foundation}{course.duration.advanced ? ` · ${course.duration.advanced}` : ''}
                </div>
                <div
                  className="flex items-center gap-2 font-poppins text-sm font-medium px-4 py-2 rounded-full"
                  style={{ background: 'rgba(200,151,74,0.10)', color: '#C8974A' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {course.eligibility}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/917985183449?text=Hi%2C+I%27d+like+to+enrol+in+the+${encodeURIComponent(course.title)}+course+at+Doorstep+Diva+Academy`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-poppins font-semibold text-sm px-7 py-3.5 rounded-full text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-lg"
                  style={{ background: `linear-gradient(135deg,${course.accentColor}cc,${course.accentColor})` }}
                >
                  Enrol on WhatsApp
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <Link
                  href="/academy"
                  className="inline-flex items-center gap-2 font-poppins font-semibold text-sm px-7 py-3.5 rounded-full border-2 transition-all duration-200 hover:bg-rose/5"
                  style={{ borderColor: course.accentColor, color: course.accentColor }}
                >
                  ← All Courses
                </Link>
              </div>
            </div>

            {/* Right: brochure image */}
            <div
              className="flex-shrink-0 w-full max-w-sm lg:max-w-md reveal fade-up"
              style={{ animationDelay: '0.12s' }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 20px 60px rgba(139,58,82,0.16)' }}
              >
                <Image
                  src={course.heroImage}
                  alt={`${course.title} course at Doorstep Diva Academy`}
                  width={700}
                  height={467}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section
        className="py-16 md:py-20"
        style={{ background: 'linear-gradient(180deg,#FDF0F0 0%,#F5E0E0 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16">
          <div className="text-center mb-12 reveal fade-up">
            <p
              className="font-poppins text-xs font-semibold tracking-[0.22em] uppercase mb-3"
              style={{ color: course.accentColor }}
            >
              Curriculum
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold" style={{ color: '#3D2B2B' }}>
              What You'll Learn
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {course.whatYouLearn.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 rounded-2xl reveal fade-up"
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  border: '1px solid rgba(196,118,138,0.15)',
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: `${course.accentColor}14` }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={course.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="font-poppins text-sm leading-relaxed" style={{ color: '#3D2B2B' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 py-16 md:py-24">
        <div className="text-center mb-12 reveal fade-up">
          <p
            className="font-poppins text-xs font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ color: course.accentColor }}
          >
            After Graduation
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold" style={{ color: '#3D2B2B' }}>
            Career Opportunities
          </h2>
          <p className="font-poppins text-base mt-4 max-w-md mx-auto" style={{ color: '#7A5C5C' }}>
            What you can become with a Doorstep Diva Academy certification.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto reveal fade-up" style={{ animationDelay: '0.1s' }}>
          {course.careers.map((c, i) => (
            <div
              key={i}
              className="font-poppins text-sm font-medium px-5 py-2.5 rounded-full"
              style={{
                background: i % 3 === 0 ? `${course.accentColor}12` : i % 3 === 1 ? 'rgba(200,151,74,0.10)' : 'rgba(255,255,255,0.8)',
                color: i % 3 === 0 ? course.accentColor : i % 3 === 1 ? '#C8974A' : '#7A5C5C',
                border: `1px solid ${i % 3 === 0 ? course.accentColor + '30' : i % 3 === 1 ? 'rgba(200,151,74,0.25)' : 'rgba(196,118,138,0.2)'}`,
              }}
            >
              {c.label}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 pb-20 md:pb-28">
        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center reveal fade-up"
          style={{ background: `linear-gradient(135deg,#3D2B2B 0%,${course.accentColor} 100%)` }}
        >
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.04)' }} />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.04)' }} />
          <p className="font-poppins text-xs font-semibold tracking-[0.22em] uppercase mb-4 text-white/60">Ready to Start?</p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-5">
            Begin Your {course.title} Journey
          </h2>
          <p className="font-poppins text-base text-white/75 max-w-md mx-auto mb-10">
            Limited seats available. Reach out today for a free counselling session and to reserve your spot.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/917985183449?text=Hi%2C+I%27d+like+to+enrol+in+the+${encodeURIComponent(course.title)}+course+at+Doorstep+Diva+Academy`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-poppins font-semibold text-sm px-8 py-4 rounded-full bg-white transition-all duration-200 hover:scale-[1.04] hover:shadow-xl"
              style={{ color: course.accentColor }}
            >
              Enrol Now on WhatsApp
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
