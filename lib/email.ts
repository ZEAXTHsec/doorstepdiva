import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = 'doorstepdiva.lucknow@gmail.com'

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
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#fff;border:1px solid #f0e0e5;border-radius:12px">
      <h2 style="color:#8B3A52;font-size:20px;margin-bottom:16px">New Booking — DoorStep Diva</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold;width:140px">Customer</td><td style="padding:8px 12px">${data.customer_name}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Phone</td><td style="padding:8px 12px">${data.customer_phone}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Email</td><td style="padding:8px 12px">${data.customer_email}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Address</td><td style="padding:8px 12px">${data.customer_address}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">City</td><td style="padding:8px 12px">${data.city === 'lucknow' ? 'Lucknow' : 'Ayodhya'}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Service</td><td style="padding:8px 12px">${data.service_type}</td></tr>
        <tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Date & Time</td><td style="padding:8px 12px">${hasSlot ? `${data.appointment_date} at ${formatTime(data.appointment_time!)}` : 'Slot to be confirmed'}</td></tr>
        ${data.addons && data.addons.length > 0 ? `<tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Add-ons</td><td style="padding:8px 12px">${data.addons.join(', ')}</td></tr>` : ''}
        ${data.total_estimate ? `<tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Estimate</td><td style="padding:8px 12px">₹${data.total_estimate.toLocaleString('en-IN')}</td></tr>` : ''}
        ${data.payment_mode ? `<tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Payment</td><td style="padding:8px 12px">${data.payment_mode} ${data.deposit_paid ? '(Paid)' : ''}</td></tr>` : ''}
        ${data.notes ? `<tr><td style="padding:8px 12px;background:#fdf2f5;font-weight:bold">Notes</td><td style="padding:8px 12px">${data.notes}</td></tr>` : ''}
      </table>
      <p style="margin-top:20px;font-size:13px;color:#888">This booking was submitted via the DoorStep Diva website. Log in to the <a href="https://mydoorstepdiva.com/admin" style="color:#8B3A52">admin panel</a> to manage.</p>
    </div>
  `
}

export async function sendBookingNotification(data: BookingEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured — skipping email')
    return
  }

  try {
    await resend.emails.send({
      from: 'DoorStep Diva <bookings@mydoorstepdiva.com>',
      to: ADMIN_EMAIL,
      subject: `New Booking: ${data.customer_name} — ${data.service_type}`,
      html: bookingEmailHtml(data),
    })
  } catch (err) {
    console.error('Failed to send booking email:', err)
  }
}
