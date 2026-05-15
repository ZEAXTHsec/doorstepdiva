// POST /api/book
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getAvailableSlots, getSkillType, isMakeupService } from '@/lib/booking-utils'
import { sendBookingNotification } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const {
    customer_name, customer_phone, customer_email, customer_address,
    service_type, addons, city,
    appointment_date, appointment_time,
    razorpay_payment_id, razorpay_order_id,
    total_estimate, notes,
  } = body

  // Validate required fields
  if (!customer_name || !customer_phone || !customer_email ||
      !customer_address || !service_type || !city) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Validate city
  if (!['lucknow', 'ayodhya'].includes(city)) {
    return NextResponse.json({ error: 'City must be lucknow or ayodhya' }, { status: 400 })
  }

  // Makeup services are accepted as leads (no slot validation, always pending)
  const isMakeup = isMakeupService(service_type)

  // Get artist
  const skillType = getSkillType(service_type)
  const { data: artist } = await supabase
    .from('artists')
    .select('id')
    .eq('skill_type', skillType)
    .eq('active', true)
    .single()

  // Build the booking payload
  const payload: Record<string, unknown> = {
    customer_name,
    customer_phone,
    customer_email,
    customer_address,
    service_type,
    addons: addons || [],
    city,
    artist_id: artist?.id || null,
    appointment_date: appointment_date || null,
    appointment_time: appointment_time || null,
    payment_mode: isMakeup ? null : (appointment_date ? 'pay_on_service' : 'deposit_online'),
    deposit_paid: !!razorpay_payment_id,
    razorpay_order_id: razorpay_order_id || null,
    razorpay_payment_id: razorpay_payment_id || null,
    total_estimate: total_estimate || null,
    status: isMakeup ? 'pending' : (appointment_date ? 'confirmed' : 'pending'),
    notes: notes || null,
  }

  // Slot validation — skip for makeup leads
  if (!isMakeup && appointment_date && appointment_time) {
    if (!artist) {
      return NextResponse.json({ error: 'No artist available for this service.' }, { status: 400 })
    }
    const available = await getAvailableSlots(appointment_date, artist.id)
    const requested = appointment_time.slice(0, 5)
    if (!available.includes(requested)) {
      return NextResponse.json(
        { error: 'This slot was just taken. Please pick another time.' },
        { status: 409 }
      )
    }
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert(payload)
    .select()
    .single()

  if (error) {
    console.error('Booking insert error:', error)
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 })
  }

  // Fire-and-forget email notification
  sendBookingNotification({
    customer_name,
    customer_phone,
    customer_email,
    customer_address,
    service_type,
    addons: addons || [],
    city,
    appointment_date: appointment_date || undefined,
    appointment_time: appointment_time || undefined,
    total_estimate: total_estimate || undefined,
    notes: notes || undefined,
    payment_mode: payload.payment_mode as string | undefined,
    deposit_paid: !!razorpay_payment_id,
  }).catch(() => {})

  return NextResponse.json({ success: true, booking: data })
}
