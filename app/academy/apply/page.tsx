'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { WhatsAppIcon } from '@/app/components/WhatsAppIcon'

interface CourseOption {
  id: string
  title: string
  duration: string
  tagline: string
  badge: string
}

const COURSES: CourseOption[] = [
  {
    id: 'makeup',
    title: 'Professional Bridal & HD Makeup Artistry',
    duration: '1–2 Months',
    tagline: 'Bridal HD bases, editorial eye work, airbrush misting & saree draping.',
    badge: 'High Demand',
  },
  {
    id: 'hair',
    title: 'Advanced Hair Architecture & Chemical Treatments',
    duration: '3–6 Months',
    tagline: 'Precision cutting, French balayage, botoplex rebonding & salon styling.',
    badge: 'Industry Essential',
  },
  {
    id: 'skin',
    title: 'Clinical Skin Aesthetics & Medi-Facials',
    duration: '3–6 Months',
    tagline: 'Korean glass glow, hydra-infusion machines, peeling science & skin diagnostics.',
    badge: 'Clinical Mastery',
  },
  {
    id: 'cosmetology',
    title: 'Master Cosmetology & Salon Leadership',
    duration: '3–6 Months',
    tagline: 'Complete 360-degree training covering skin, hair, makeup & studio management.',
    badge: 'All-In-One Diploma',
  },
  {
    id: 'nail-art',
    title: 'Sculpted Nail Art & Extension Architecture',
    duration: '1–2 Months',
    tagline: 'Acrylic extensions, hard gel sculpting, PolyGel overlays & 3D chrome art.',
    badge: 'Fast-Track Career',
  },
]

function AcademyApplyFormContent() {
  const searchParams = useSearchParams()
  const courseParam = searchParams.get('course')

  const [selectedCourses, setSelectedCourses] = useState<string[]>([COURSES[0].title])
  const [formData, setFormData] = useState({
    student_name: '',
    student_phone: '',
    student_email: '',
    city: 'Lucknow',
    batch_preference: 'Weekday Morning (10:00 AM – 01:00 PM)',
    experience_level: 'Complete Beginner (Starting Fresh)',
    career_goal: 'Freelance Bridal Makeup & Hair Artist',
    demo_class_requested: true,
    notes: '',
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [applicationResult, setApplicationResult] = useState<{
    applicationId: string
    studentName: string
    courses: string[]
    phone: string
  } | null>(null)

  // Sync pre-selected course from query string (?course=hair, ?course=all, etc.)
  useEffect(() => {
    if (courseParam) {
      if (courseParam.toLowerCase() === 'all') {
        setSelectedCourses(COURSES.map(c => c.title))
      } else {
        const matched = COURSES.find(
          c => c.id.toLowerCase() === courseParam.toLowerCase() ||
               c.title.toLowerCase().includes(courseParam.toLowerCase())
        )
        if (matched) {
          setSelectedCourses([matched.title])
        }
      }
    }
  }, [courseParam])

  // Toggle single course
  const toggleCourse = (title: string) => {
    setSelectedCourses(prev => {
      if (prev.includes(title)) {
        if (prev.length === 1) {
          return prev // keep at least 1 selected
        }
        return prev.filter(c => c !== title)
      }
      return [...prev, title]
    })
  }

  // Toggle select all
  const selectAllCourses = () => {
    if (selectedCourses.length === COURSES.length) {
      setSelectedCourses([COURSES[0].title])
    } else {
      setSelectedCourses(COURSES.map(c => c.title))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCourses.length === 0) {
      setErrorMessage('Please select at least one course for your admission application.')
      return
    }

    const phoneDigits = formData.student_phone.replace(/\D/g, '')
    if (phoneDigits.length < 10) {
      setErrorMessage('Please enter a valid 10-digit WhatsApp / contact phone number.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.student_email.trim())) {
      setErrorMessage('Please enter a valid email address (e.g. name@example.com) to receive your confirmation.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/academy/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          courses: selectedCourses,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setApplicationResult({
          applicationId: data.applicationId,
          studentName: data.studentName,
          courses: data.courses,
          phone: data.phone,
        })
        setStatus('success')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please submit again or contact on WhatsApp.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network connection error. Please try WhatsApp directly.')
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#FAF7F5] font-poppins text-stone">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone/60 mb-8">
          <Link href="/" className="hover:text-[#8B3A52] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/academy" className="hover:text-[#8B3A52] transition-colors">Academy</Link>
          <span>/</span>
          <span className="text-[#8B3A52] font-semibold">Admissions &amp; Enrollment</span>
        </div>

        {/* SUCCESS CONFIRMATION STATE */}
        {status === 'success' && applicationResult ? (
          <div
            className="rounded-3xl p-8 sm:p-12 bg-white border shadow-xl text-center"
            style={{
              borderColor: 'rgba(200,151,74,0.35)',
              boxShadow: '0 20px 60px rgba(139,58,82,0.08)',
            }}
          >
            {/* Top Accent Icon */}
            <div
              className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6"
              style={{ background: 'rgba(139,58,82,0.08)' }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8B3A52"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <p className="font-poppins text-xs font-semibold tracking-[0.25em] uppercase text-[#8B3A52] mb-2">
              Application Registered Successfully
            </p>
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-stone mb-4">
              Welcome to DoorStep Diva Academy
            </h1>
            <p className="font-poppins text-sm text-stone/75 max-w-lg mx-auto leading-relaxed mb-8">
              Congratulations, <strong>{applicationResult.studentName}</strong>. Your official admission application has been registered in our student intake system.
            </p>

            {/* Application ID Badge */}
            <div
              className="inline-block p-4 sm:p-6 rounded-2xl mb-8 max-w-md w-full"
              style={{
                background: '#FAF7F5',
                border: '1.5px solid #C8974A',
              }}
            >
              <p className="text-[10px] font-semibold tracking-widest uppercase text-stone/60 mb-1">
                Your Official Application Reference ID:
              </p>
              <p className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-[#8B3A52]">
                {applicationResult.applicationId}
              </p>
              <p className="text-[11px] text-stone/70 mt-2">
                A confirmation copy has been sent to your email address.
              </p>
            </div>

            {/* Next Steps Counselor Handoff Card */}
            <div
              className="p-6 rounded-2xl text-left mb-10 max-w-xl mx-auto border"
              style={{
                background: '#FAF4F5',
                borderColor: 'rgba(139,58,82,0.2)',
              }}
            >
              <h3 className="font-playfair text-base font-semibold text-stone mb-3">
                Next Steps: Admissions Counselor Review
              </h3>
              <div className="space-y-3 text-xs text-stone/80 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#8B3A52] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <strong>Curriculum &amp; Kit Consultation:</strong> Our senior admissions counselor will contact you within <strong>24 hours</strong> via WhatsApp or phone call to walk you through the detailed syllabus and toolkit allocations.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#8B3A52] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <strong>Free 1-Day Trial Demo Class:</strong> We will schedule your visit to our Gomti Nagar studio so you can experience a live practical demonstration before finalizing your seat.
                  </div>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/919129577514?text=${encodeURIComponent(
                  `Hello DoorStep Diva Academy! I have submitted my admission application [${applicationResult.applicationId}] for ${applicationResult.courses.join(', ')}. I would like to consult on my syllabus and demo class.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white shadow-lg hover:brightness-105 transition-all"
                style={{ background: '#25D366' }}
              >
                <WhatsAppIcon size={16} />
                <span>Connect With Counselor on WhatsApp Now</span>
              </a>

              <Link
                href="/academy"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-stone border border-stone/20 hover:bg-stone/5 transition-all"
              >
                Back to Academy Home
              </Link>
            </div>
          </div>
        ) : (
          /* ADMISSION APPLICATION FORM */
          <div
            className="rounded-3xl p-6 sm:p-10 md:p-12 bg-white border shadow-xl"
            style={{
              borderColor: 'rgba(139,58,82,0.12)',
              boxShadow: '0 16px 48px rgba(61,43,43,0.06)',
            }}
          >
            {/* Form Header */}
            <div className="border-b pb-8 mb-8 text-center" style={{ borderColor: 'rgba(139,58,82,0.12)' }}>
              <span
                className="inline-block px-3.5 py-1 rounded-full font-poppins text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8B3A52] mb-3"
                style={{ background: 'rgba(139,58,82,0.08)' }}
              >
                Admissions Intake 2026 · Gomti Nagar Campus
              </span>
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-stone mb-3">
                Academy Enrollment Application
              </h1>
              <p className="font-poppins text-xs sm:text-sm text-stone/70 max-w-xl mx-auto leading-relaxed">
                Enroll in one or multiple courses. Upon application, our admissions counselor will review your goals, share the complete syllabus, and schedule your Free 1-Day Trial Demo Class.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* SECTION 1: COURSE SELECTION */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-stone">
                      1. Select Your Courses (Choose 1 or All)
                    </h3>
                    <p className="text-[11px] text-stone/60">
                      You can select multiple specialized courses or enroll for the full diploma.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={selectAllCourses}
                    className="text-[11px] font-semibold text-[#8B3A52] hover:underline"
                  >
                    {selectedCourses.length === COURSES.length ? 'Reset to Single' : 'Select All 5 Courses (Complete Diploma)'}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {COURSES.map((c) => {
                    const isSelected = selectedCourses.includes(c.title)
                    return (
                      <div
                        key={c.id}
                        onClick={() => toggleCourse(c.title)}
                        className="cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5"
                        style={{
                          background: isSelected ? '#FAF4F5' : '#FFFFFF',
                          borderColor: isSelected ? '#8B3A52' : 'rgba(139,58,82,0.15)',
                          boxShadow: isSelected ? '0 4px 16px rgba(139,58,82,0.06)' : 'none',
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border transition-all"
                          style={{
                            background: isSelected ? '#8B3A52' : '#FFFFFF',
                            borderColor: isSelected ? '#8B3A52' : '#B89696',
                          }}
                        >
                          {isSelected && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                            <span className="font-playfair text-sm sm:text-base font-semibold text-stone">
                              {c.title}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-semibold text-stone/60 uppercase">
                                {c.duration}
                              </span>
                              <span
                                className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded text-[#966B26]"
                                style={{ background: 'rgba(200,151,74,0.15)' }}
                              >
                                {c.badge}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-stone/65 leading-relaxed">
                            {c.tagline}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* SECTION 2: BATCH TIMING */}
              <div>
                <h3 className="font-playfair text-lg font-semibold text-stone mb-1">
                  2. Preferred Batch Timing
                </h3>
                <p className="text-[11px] text-stone/60 mb-3">
                  All batches held in our Gomti Nagar, Lucknow studio with live practical models.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    'Weekday Morning (10:00 AM – 01:00 PM)',
                    'Weekend Intensive (11:00 AM – 04:00 PM)',
                    'Next Upcoming Monthly Intake',
                  ].map((batch) => {
                    const isSelected = formData.batch_preference === batch
                    return (
                      <label
                        key={batch}
                        className="cursor-pointer p-3.5 rounded-xl border text-xs font-medium flex items-center gap-2.5 transition-all"
                        style={{
                          background: isSelected ? '#FAF4F5' : '#FFFFFF',
                          borderColor: isSelected ? '#8B3A52' : 'rgba(139,58,82,0.15)',
                          color: isSelected ? '#8B3A52' : '#3D2B2B',
                        }}
                      >
                        <input
                          type="radio"
                          name="batch_preference"
                          value={batch}
                          checked={isSelected}
                          onChange={handleChange}
                          className="accent-[#8B3A52]"
                        />
                        <span>{batch}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* SECTION 3: APPLICANT DETAILS */}
              <div>
                <h3 className="font-playfair text-lg font-semibold text-stone mb-1">
                  3. Applicant Information
                </h3>
                <p className="text-[11px] text-stone/60 mb-4">
                  Please ensure your WhatsApp number and email are correct to receive your official Application ID.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="student_name"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.student_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[#8B3A52]"
                      style={{ borderColor: 'rgba(139,58,82,0.2)' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone mb-1.5">
                      WhatsApp Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="student_phone"
                      required
                      placeholder="e.g. 98765 43210"
                      value={formData.student_phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[#8B3A52]"
                      style={{ borderColor: 'rgba(139,58,82,0.2)' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone mb-1.5">
                      Email Address (For Confirmation Copy) *
                    </label>
                    <input
                      type="email"
                      name="student_email"
                      required
                      placeholder="e.g. priya@example.com"
                      value={formData.student_email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[#8B3A52]"
                      style={{ borderColor: 'rgba(139,58,82,0.2)' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone mb-1.5">
                      City / Area *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Gomti Nagar, Lucknow (or Outstation)"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[#8B3A52]"
                      style={{ borderColor: 'rgba(139,58,82,0.2)' }}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: BACKGROUND & GOALS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone mb-1.5">
                    Current Experience Level
                  </label>
                  <select
                    name="experience_level"
                    value={formData.experience_level}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[#8B3A52] bg-white"
                    style={{ borderColor: 'rgba(139,58,82,0.2)' }}
                  >
                    <option value="Complete Beginner (Starting Fresh)">Complete Beginner (Starting Fresh)</option>
                    <option value="Basic Self-Taught Knowledge">Basic Self-Taught Knowledge</option>
                    <option value="Practicing Salon Stylist (Upgrading)">Practicing Salon Stylist (Upgrading)</option>
                    <option value="Freelancer Seeking Certification">Freelancer Seeking Certification</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone mb-1.5">
                    Primary Career Goal
                  </label>
                  <select
                    name="career_goal"
                    value={formData.career_goal}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[#8B3A52] bg-white"
                    style={{ borderColor: 'rgba(139,58,82,0.2)' }}
                  >
                    <option value="Freelance Bridal Makeup & Hair Artist">Freelance Bridal Makeup &amp; Hair Artist</option>
                    <option value="Start My Own Beauty Studio / Salon">Start My Own Beauty Studio / Salon</option>
                    <option value="Job Placement in Luxury Salons">Job Placement in Luxury Salons</option>
                    <option value="Skill Enhancement & Certification">Skill Enhancement &amp; Certification</option>
                  </select>
                </div>
              </div>

              {/* SECTION 5: TRIAL DEMO OPT-IN */}
              <div
                className="p-4 rounded-2xl border flex items-start gap-3"
                style={{
                  background: '#FAF7F5',
                  borderColor: 'rgba(200,151,74,0.3)',
                }}
              >
                <input
                  type="checkbox"
                  id="demo_opt_in"
                  name="demo_class_requested"
                  checked={formData.demo_class_requested}
                  onChange={handleChange}
                  className="mt-1 accent-[#8B3A52] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="demo_opt_in" className="cursor-pointer">
                  <span className="font-semibold text-xs text-stone block">
                    Schedule my Complimentary 1-Day Trial Demo Class
                  </span>
                  <span className="text-[11px] text-stone/70 leading-normal block mt-0.5">
                    Visit our studio in Gomti Nagar, meet the senior instructors, inspect our professional tools, and experience 1 live demo class before paying tuition.
                  </span>
                </label>
              </div>

              {/* SECTION 6: NOTES */}
              <div>
                <label className="block text-xs font-semibold text-stone mb-1.5">
                  Questions or Special Inquiries (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Ask any questions regarding hostel accommodation, kit contents, installment schedules..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[#8B3A52] resize-none"
                  style={{ borderColor: 'rgba(139,58,82,0.2)' }}
                />
              </div>

              {/* ERROR ALERT */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl font-poppins text-xs font-semibold tracking-wider uppercase text-white shadow-lg transition-all duration-300 hover:brightness-105 disabled:opacity-60"
                  style={{
                    background: '#8B3A52',
                    boxShadow: '0 8px 24px rgba(139,58,82,0.25)',
                  }}
                >
                  {status === 'submitting' ? 'Registering Application…' : 'Submit Admission Application & Get ID'}
                </button>
                <p className="text-[10px] text-center text-stone/50 mt-2">
                  No advance payment required. An admissions counselor will contact you to confirm eligibility.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AcademyApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 pb-24 bg-[#FAF7F5] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-3 border-[#8B3A52] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-poppins text-xs font-semibold text-stone/60 uppercase tracking-widest">
              Loading Admissions Portal…
            </p>
          </div>
        </div>
      }
    >
      <AcademyApplyFormContent />
    </Suspense>
  )
}
