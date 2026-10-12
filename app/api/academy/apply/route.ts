import { NextRequest, NextResponse } from 'next/server'
import { syncBookingToGoogleSheets } from '@/lib/google-sheets'
import { sendAcademyAdmissionNotification } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      student_name,
      student_phone,
      student_email,
      courses,
      city,
      batch_preference,
      experience_level,
      career_goal,
      demo_class_requested,
      notes,
    } = body

    // 1. Validation
    if (!student_name || typeof student_name !== 'string' || !student_name.trim()) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 })
    }
    const cleanPhone = (student_phone || '').toString().trim()
    const digitsOnly = cleanPhone.replace(/\D/g, '')
    if (digitsOnly.length < 10) {
      return NextResponse.json({ error: 'Please provide a valid 10-digit WhatsApp / contact phone number.' }, { status: 400 })
    }
    const cleanEmail = (student_email || '').toString().trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: 'Please provide a valid email address (e.g. name@example.com) to receive your confirmation.' }, { status: 400 })
    }
    if (!courses || !Array.isArray(courses) || courses.length === 0) {
      return NextResponse.json({ error: 'Please select at least one course for admission.' }, { status: 400 })
    }

    const cleanName = student_name.trim()
    const targetCity = city ? city.trim() : 'Lucknow'
    const batch = batch_preference || 'Next Upcoming Intake'

    // 2. Generate Official Application Reference ID
    const year = new Date().getFullYear()
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const applicationId = `DDA-ADM-${year}-${randomSuffix}`

    // 3. Assemble Lead Notes for Google Sheets
    const combinedNotes = [
      `[REF: ${applicationId}]`,
      `Batch: ${batch}`,
      experience_level ? `Experience: ${experience_level}` : null,
      career_goal ? `Goal: ${career_goal}` : null,
      demo_class_requested ? `1-Day Trial Demo: YES` : null,
      notes ? `Inquiries: ${notes.trim()}` : null,
    ]
      .filter(Boolean)
      .join(' | ')

    // 4. Concurrently sync to Google Sheets & send automated confirmation emails
    const [sheetsResult, emailResult] = await Promise.allSettled([
      syncBookingToGoogleSheets({
        customer_name: cleanName,
        customer_phone: cleanPhone,
        customer_email: cleanEmail,
        customer_address: `Gomti Nagar Academy Admissions Desk (App ID: ${applicationId})`,
        service_type: `Academy Admission: ${courses.join(', ')}`,
        city: targetCity,
        notes: combinedNotes,
      }),
      sendAcademyAdmissionNotification({
        application_id: applicationId,
        student_name: cleanName,
        student_phone: cleanPhone,
        student_email: cleanEmail,
        courses: courses,
        city: targetCity,
        batch_preference: batch,
        experience_level: experience_level || 'Beginner',
        career_goal: career_goal || 'Professional Salon Career',
        demo_class_requested: Boolean(demo_class_requested),
        notes: notes ? notes.trim() : undefined,
      }),
    ])

    return NextResponse.json({
      success: true,
      applicationId,
      studentName: cleanName,
      courses,
      phone: cleanPhone,
      email: cleanEmail,
      message: 'Admission application received and synced successfully.',
    })
  } catch (err: any) {
    console.error('Academy admission API error:', err)
    return NextResponse.json(
      { error: err?.message || 'Failed to process admission application. Please try WhatsApp directly.' },
      { status: 500 }
    )
  }
}
