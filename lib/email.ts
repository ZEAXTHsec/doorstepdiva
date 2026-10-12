import { Resend } from 'resend'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'divadoorstep@gmail.com'

export interface BookingEmailData {
  customer_name: string
  customer_phone: string
  customer_email: string
  customer_address: string
  service_type: string
  addons?: string[]
  city: string
  appointment_date?: string
  appointment_time?: string
  total_estimate?: number
  notes?: string
  payment_mode?: string
  deposit_paid?: boolean
}

export interface NotificationResult {
  email_sent: boolean
  provider?: string
  id?: string
  error?: string
  webhook_sent?: boolean
}

function formatTime(t: string) {
  if (!t) return '—'
  const [h, m] = t.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`
}

function bookingEmailHtml(data: BookingEmailData): string {
  const hasSlot = !!(data.appointment_date && data.appointment_time)
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;border:1px solid #f0e0e5;border-radius:14px;box-shadow:0 4px 20px rgba(0,0,0,0.05)">
      <div style="background:linear-gradient(135deg, #8B3A52, #C4768A);padding:18px 24px;border-radius:10px;margin-bottom:20px;text-align:center">
        <h1 style="color:#ffffff;margin:0;font-size:22px;letter-spacing:0.5px">✨ New Booking Request</h1>
        <p style="color:#fdeff2;margin:4px 0 0 0;font-size:13px">DoorStep Diva At-Home Luxury Services</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:10px 14px;background:#fdf2f5;font-weight:bold;width:140px;border-bottom:1px solid #fff">Customer</td><td style="padding:10px 14px;border-bottom:1px solid #f6e6ea">${data.customer_name}</td></tr>
        <tr><td style="padding:10px 14px;background:#fdf2f5;font-weight:bold;border-bottom:1px solid #fff">Phone / WhatsApp</td><td style="padding:10px 14px;border-bottom:1px solid #f6e6ea"><a href="tel:${data.customer_phone}" style="color:#8B3A52;font-weight:bold;text-decoration:none">${data.customer_phone}</a> &nbsp; <a href="https://wa.me/91${data.customer_phone.replace(/\D/g, '')}" style="color:#25D366;font-size:12px;text-decoration:none">[WhatsApp]</a></td></tr>
        <tr><td style="padding:10px 14px;background:#fdf2f5;font-weight:bold;border-bottom:1px solid #fff">Email</td><td style="padding:10px 14px;border-bottom:1px solid #f6e6ea">${data.customer_email}</td></tr>
        <tr><td style="padding:10px 14px;background:#fdf2f5;font-weight:bold;border-bottom:1px solid #fff">Address</td><td style="padding:10px 14px;border-bottom:1px solid #f6e6ea">${data.customer_address}</td></tr>
        <tr><td style="padding:10px 14px;background:#fdf2f5;font-weight:bold;border-bottom:1px solid #fff">City / Region</td><td style="padding:10px 14px;border-bottom:1px solid #f6e6ea;font-weight:bold;color:#8B3A52">${data.city === 'lucknow' ? 'Lucknow' : data.city === 'delhi-ncr' ? 'Delhi NCR' : 'Ayodhya'}</td></tr>
        <tr><td style="padding:10px 14px;background:#fdf2f5;font-weight:bold;border-bottom:1px solid #fff">Service Requested</td><td style="padding:10px 14px;border-bottom:1px solid #f6e6ea;font-weight:600">${data.service_type}</td></tr>
        <tr><td style="padding:10px 14px;background:#fdf2f5;font-weight:bold;border-bottom:1px solid #fff">Preferred Timing</td><td style="padding:10px 14px;border-bottom:1px solid #f6e6ea">${hasSlot ? `${data.appointment_date} at ${formatTime(data.appointment_time!)}` : 'Callback requested (Flexible / No slot fixed)'}</td></tr>
        ${data.addons && data.addons.length > 0 ? `<tr><td style="padding:10px 14px;background:#fdf2f5;font-weight:bold;border-bottom:1px solid #fff">Add-ons</td><td style="padding:10px 14px;border-bottom:1px solid #f6e6ea">${data.addons.join(', ')}</td></tr>` : ''}
        ${data.total_estimate ? `<tr><td style="padding:10px 14px;background:#fdf2f5;font-weight:bold;border-bottom:1px solid #fff">Estimated Total</td><td style="padding:10px 14px;border-bottom:1px solid #f6e6ea;font-weight:bold;color:#8B3A52">₹${data.total_estimate.toLocaleString('en-IN')}</td></tr>` : ''}
        ${data.payment_mode ? `<tr><td style="padding:10px 14px;background:#fdf2f5;font-weight:bold;border-bottom:1px solid #fff">Payment Method</td><td style="padding:10px 14px;border-bottom:1px solid #f6e6ea">${data.payment_mode} ${data.deposit_paid ? '(Paid)' : '(Pay After Service)'}</td></tr>` : ''}
        ${data.notes ? `<tr><td style="padding:10px 14px;background:#fdf2f5;font-weight:bold">Notes / Requests</td><td style="padding:10px 14px">${data.notes}</td></tr>` : ''}
      </table>
      <div style="margin-top:24px;text-align:center">
        <a href="https://mydoorstepdiva.com/admin/bookings" style="display:inline-block;padding:12px 28px;background:#8B3A52;color:#ffffff;text-decoration:none;border-radius:24px;font-weight:bold;font-size:14px">Open Admin Panel →</a>
      </div>
    </div>
  `
}

export async function sendBookingNotification(data: BookingEmailData): Promise<NotificationResult> {
  const result: NotificationResult = { email_sent: false }

  // 1. Try Resend if configured
  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    try {
      const client = new Resend(apiKey)

      // Attempt 1: Custom domain
      const primary = await client.emails.send({
        from: 'DoorStep Diva <bookings@mydoorstepdiva.com>',
        to: ADMIN_EMAIL,
        subject: `New Booking: ${data.customer_name} (${data.city.toUpperCase()}) — ${data.service_type}`,
        html: bookingEmailHtml(data),
      })

      if (!primary.error && primary.data?.id) {
        result.email_sent = true
        result.provider = 'resend_custom'
        result.id = primary.data.id
      } else {
        const primaryError = primary.error?.message || 'Unknown custom domain error'
        console.warn('Resend primary sender rejected:', primaryError)

        // Attempt 2: Fallback to Resend sandbox
        const fallback = await client.emails.send({
          from: 'DoorStep Diva <onboarding@resend.dev>',
          to: ADMIN_EMAIL,
          subject: `[Booking Alert] ${data.customer_name} (${data.city.toUpperCase()}) — ${data.service_type}`,
          html: bookingEmailHtml(data),
        })

        if (!fallback.error && fallback.data?.id) {
          result.email_sent = true
          result.provider = 'resend_sandbox'
          result.id = fallback.data.id
        } else {
          result.error = fallback.error?.message || primaryError
          console.error('Resend fallback sender rejected:', result.error)
        }
      }
    } catch (err: unknown) {
      result.error = err instanceof Error ? err.message : String(err)
      console.error('Resend error:', result.error)
    }
  } else {
    result.error = 'RESEND_API_KEY not configured in environment variables'
    console.warn(result.error)
  }

  // 2. Dispatch to optional Webhook (Discord / Slack / Zapier / Google Sheets)
  const webhookUrl = process.env.BOOKING_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL
  if (webhookUrl) {
    try {
      const timingText = data.appointment_date
        ? `${data.appointment_date} at ${data.appointment_time || 'flexible'}`
        : 'Callback requested (No slot fixed)'

      const payload = {
        content: `🚨 **NEW DOORSTEP DIVA BOOKING**\n**Customer:** ${data.customer_name}\n**Phone:** ${data.customer_phone}\n**City:** ${data.city.toUpperCase()}\n**Service:** ${data.service_type}\n**Date/Time:** ${timingText}\n**Address:** ${data.customer_address}\n**Notes:** ${data.notes || 'None'}\n🔗 [View in Admin](https://mydoorstepdiva.com/admin/bookings)`,
      }

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      result.webhook_sent = true
    } catch (whErr) {
      console.error('Webhook notification error:', whErr)
    }
  }

  // 3. Dispatch to Telegram Bot if configured
  const tgToken = process.env.TELEGRAM_BOT_TOKEN
  const tgChatId = process.env.TELEGRAM_CHAT_ID
  if (tgToken && tgChatId) {
    try {
      const msg = `🚨 *NEW BOOKING RECEIVED*\n\n👤 *Client:* ${data.customer_name}\n📞 *Phone:* \`${data.customer_phone}\`\n📍 *City:* ${data.city.toUpperCase()}\n💅 *Service:* ${data.service_type}\n🏠 *Address:* ${data.customer_address}\n📝 *Notes:* ${data.notes || 'None'}`
      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: msg,
          parse_mode: 'Markdown',
        }),
      })
      result.webhook_sent = true
    } catch (tgErr) {
      console.error('Telegram notification error:', tgErr)
    }
  }

  return result
}

// ─── ACADEMY ADMISSIONS EMAIL PIPELINE ────────────────────────────────────────

export interface AcademyAdmissionEmailData {
  application_id: string
  student_name: string
  student_phone: string
  student_email: string
  courses: string[]
  city: string
  batch_preference: string
  experience_level?: string
  career_goal?: string
  demo_class_requested?: boolean
  notes?: string
}

function studentConfirmationEmailHtml(data: AcademyAdmissionEmailData): string {
  const cleanPhone = data.student_phone.replace(/\D/g, '')
  const waLink = `https://wa.me/918353982888?text=${encodeURIComponent(
    `Hello DoorStep Diva Academy! I have submitted my admission application [${data.application_id}] for ${data.courses.join(', ')}. I would like to consult on my admission.`
  )}`

  return `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:24px;background:#ffffff;border:1px solid #e8d0d8;border-radius:14px;box-shadow:0 4px 20px rgba(0,0,0,0.05)">
      <div style="background:linear-gradient(135deg, #8B3A52, #732D42);padding:22px 24px;border-radius:10px;margin-bottom:20px;text-align:center">
        <h1 style="color:#ffffff;margin:0;font-size:22px;letter-spacing:0.8px;font-family:Georgia,serif">DOORSTEP DIVA ACADEMY</h1>
        <p style="color:#fdeff2;margin:6px 0 0 0;font-size:12px;letter-spacing:1px;text-transform:uppercase">Admission Application Confirmed · Gomti Nagar Campus</p>
      </div>

      <p style="font-size:15px;color:#3D2B2B;line-height:1.5;margin-bottom:16px">
        Dear <strong>${data.student_name}</strong>,
      </p>

      <p style="font-size:13.5px;color:#5A3E3E;line-height:1.6;margin-bottom:20px">
        Thank you for choosing DoorStep Diva Academy. Your formal admission application has been registered successfully.
      </p>

      <div style="background:#FAF7F5;border:1.5px solid #C8974A;border-radius:10px;padding:16px 20px;margin-bottom:24px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid rgba(200,151,74,0.3);padding-bottom:10px">
          <span style="font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#8B3A52">Application Reference ID:</span>
          <span style="font-family:monospace;font-size:14px;font-weight:bold;color:#3D2B2B;background:#fff;padding:4px 10px;border-radius:6px;border:1px solid #8B3A52">${data.application_id}</span>
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:13px;color:#3D2B2B">
          <tr><td style="padding:6px 0;color:#7A5C5C;width:140px;font-weight:bold">Enrolled Courses:</td><td style="padding:6px 0;font-weight:bold;color:#8B3A52">${data.courses.join(' · ')}</td></tr>
          <tr><td style="padding:6px 0;color:#7A5C5C;font-weight:bold">Batch Timing:</td><td style="padding:6px 0">${data.batch_preference}</td></tr>
          <tr><td style="padding:6px 0;color:#7A5C5C;font-weight:bold">Campus / Location:</td><td style="padding:6px 0">${data.city.toUpperCase()} (Gomti Nagar Studio)</td></tr>
          <tr><td style="padding:6px 0;color:#7A5C5C;font-weight:bold">1-Day Trial Demo:</td><td style="padding:6px 0;font-weight:bold;color:#2E7D32">${data.demo_class_requested ? 'Requested (Free 1-Day Trial)' : 'Standard Enrollment'}</td></tr>
        </table>
      </div>

      <div style="background:#FAF4F5;border-left:4px solid #8B3A52;padding:14px 18px;border-radius:4px;margin-bottom:24px">
        <h3 style="margin:0 0 6px 0;font-size:13px;color:#8B3A52;text-transform:uppercase;letter-spacing:0.5px">Next Step: Counselor Consultation</h3>
        <p style="margin:0;font-size:12.5px;color:#5A3E3E;line-height:1.5">
          Our Senior Admissions Counselor will contact you within <strong>24 hours</strong> via WhatsApp or phone call to walk you through the curriculum syllabus, verify toolkit allocations, and schedule your Free 1-Day Studio Trial Class.
        </p>
      </div>

      <div style="text-align:center;margin-bottom:20px">
        <a href="${waLink}" style="display:inline-block;padding:12px 28px;background:#25D366;color:#ffffff;text-decoration:none;border-radius:24px;font-weight:bold;font-size:13.5px;letter-spacing:0.5px">
          Chat Directly with Admissions Counselor on WhatsApp →
        </a>
      </div>

      <p style="font-size:11.5px;color:#8A6E6E;text-align:center;line-height:1.4;margin:0">
        DoorStep Diva Academy · Gomti Nagar, Lucknow, UP · Call/WhatsApp: +91 83539 82888<br>
        A professional training division by Digixfly.
      </p>
    </div>
  `
}

function adminAdmissionAlertHtml(data: AcademyAdmissionEmailData): string {
  const cleanPhone = data.student_phone.replace(/\D/g, '')
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;border:1px solid #f0e0e5;border-radius:14px">
      <div style="background:linear-gradient(135deg, #8B3A52, #C4768A);padding:18px 24px;border-radius:10px;margin-bottom:20px;text-align:center">
        <h1 style="color:#ffffff;margin:0;font-size:20px">New Student Admission Application</h1>
        <p style="color:#fdeff2;margin:4px 0 0 0;font-size:13px">Ref ID: ${data.application_id}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13.5px">
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold;width:150px">Student Name</td><td style="padding:8px 12px">${data.student_name}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Phone / WhatsApp</td><td style="padding:8px 12px"><a href="tel:${data.student_phone}">${data.student_phone}</a> &nbsp; <a href="https://wa.me/91${cleanPhone}" style="color:#25D366;font-weight:bold">[WhatsApp Chat]</a></td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Email</td><td style="padding:8px 12px">${data.student_email}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Courses Selected</td><td style="padding:8px 12px;font-weight:bold;color:#8B3A52">${data.courses.join(', ')}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">City / Location</td><td style="padding:8px 12px">${data.city}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Batch Preference</td><td style="padding:8px 12px">${data.batch_preference}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Experience Level</td><td style="padding:8px 12px">${data.experience_level || 'Beginner'}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Career Objective</td><td style="padding:8px 12px">${data.career_goal || 'Not specified'}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Trial Demo Class</td><td style="padding:8px 12px">${data.demo_class_requested ? 'YES (Free 1-Day Trial Demo)' : 'No'}</td></tr>
        ${data.notes ? `<tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Notes / Inquiries</td><td style="padding:8px 12px">${data.notes}</td></tr>` : ''}
      </table>
    </div>
  `
}

export async function sendAcademyAdmissionNotification(data: AcademyAdmissionEmailData): Promise<NotificationResult> {
  const result: NotificationResult = { email_sent: false }
  const apiKey = process.env.RESEND_API_KEY

  if (apiKey) {
    try {
      const client = new Resend(apiKey)

      // 1. Send confirmation email to student
      if (data.student_email && data.student_email.includes('@')) {
        await client.emails.send({
          from: 'DoorStep Diva Academy <admissions@mydoorstepdiva.com>',
          to: data.student_email,
          subject: `Admission Application Confirmed: DoorStep Diva Academy [App ID: ${data.application_id}]`,
          html: studentConfirmationEmailHtml(data),
        }).catch(err => {
          console.warn('Student admission email warning:', err)
        })
      }

      // 2. Send alert email to Admin
      await client.emails.send({
        from: 'DoorStep Diva Academy <admissions@mydoorstepdiva.com>',
        to: ADMIN_EMAIL,
        subject: `New Student Application: ${data.student_name} (${data.courses.join(', ')}) [${data.application_id}]`,
        html: adminAdmissionAlertHtml(data),
      })

      result.email_sent = true
      result.provider = 'resend'
    } catch (err: any) {
      console.error('Academy admission email error:', err)
      result.error = err?.message
    }
  }

  return result
}
