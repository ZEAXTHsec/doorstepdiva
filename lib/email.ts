import { Resend } from 'resend'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'doorstepdiva.lucknow@gmail.com'

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
