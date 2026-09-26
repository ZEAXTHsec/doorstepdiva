// POST /api/book
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSkillType } from '@/lib/booking-utils'
import { sendBookingNotification } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      customer_name, customer_phone, customer_email, customer_address,
      service_type, addons, city,
      appointment_date, appointment_time, preferred_timing,
      total_estimate, notes,
    } = body

    // Validate required fields
    if (!customer_name || !customer_phone || !customer_address || !service_type || !city) {
      return NextResponse.json({ error: 'Please provide your name, phone number, address, city, and service.' }, { status: 400 })
    }

    // Normalize city
    const normalizedCity = city.toLowerCase().trim()
    const isDelhi = normalizedCity.includes('delhi') || normalizedCity.includes('ncr') || normalizedCity.includes('noida') || normalizedCity.includes('gurgaon')
    const cityValue = isDelhi ? 'delhi-ncr' : (normalizedCity.includes('ayodhya') ? 'ayodhya' : 'lucknow')

    // Find assigned artist if available
    let artistId: string | null = null
    try {
      const skillType = getSkillType(service_type)
      const { data: artist } = await supabase
        .from('artists')
        .select('id')
        .eq('skill_type', skillType)
        .eq('active', true)
        .limit(1)
        .maybeSingle()
      if (artist?.id) artistId = artist.id
    } catch {
      // artist table optional for leads
    }

    const timingNote = preferred_timing || (appointment_date ? `${appointment_date} ${appointment_time || ''}`.trim() : 'Callback requested')
    const combinedNotes = [
      notes ? `Client Notes: ${notes}` : null,
      timingNote ? `Preferred Time: ${timingNote}` : null,
      isDelhi ? `[ORIGINAL REGION: Delhi NCR]` : null,
    ].filter(Boolean).join(' | ')

    // Build the primary booking payload
    const emailToSave = customer_email && customer_email.includes('@') 
      ? customer_email 
      : `${customer_phone.replace(/\D/g, '')}@doorstepdiva.lead`

    const payload: Record<string, unknown> = {
      customer_name: customer_name.trim(),
      customer_phone: customer_phone.trim(),
      customer_email: emailToSave,
      customer_address: customer_address.trim(),
      service_type: service_type.trim(),
      addons: Array.isArray(addons) ? addons : [],
      city: cityValue,
      artist_id: artistId,
      appointment_date: appointment_date || null,
      appointment_time: appointment_time || null,
      payment_mode: 'pay_on_service',
      deposit_paid: false,
      total_estimate: total_estimate || null,
      status: 'pending',
      notes: combinedNotes || null,
    }

    // Try saving to database
    let { data, error } = await supabase
      .from('bookings')
      .insert(payload)
      .select()
      .maybeSingle()

    // If city check constraint fails on Supabase (e.g. check constraint only allows lucknow/ayodhya),
    // gracefully fallback to storing with city: 'lucknow' while preserving Delhi details in address & notes
    if (error && error.code === '23514') {
      const fallbackPayload = {
        ...payload,
        city: 'lucknow',
        customer_address: `[${cityValue.toUpperCase()}] ${customer_address.trim()}`,
        notes: `[ACTUAL REGION: ${cityValue.toUpperCase()}] ${combinedNotes}`,
      }
      const retryResult = await supabase
        .from('bookings')
        .insert(fallbackPayload)
        .select()
        .maybeSingle()
      
      if (!retryResult.error) {
        data = retryResult.data
        error = null
      } else {
        error = retryResult.error
      }
    }

    if (error) {
      console.error('Booking insert error:', error)
      return NextResponse.json({ error: 'Failed to record booking. Please reach us directly on WhatsApp!' }, { status: 500 })
    }

    // Fire email notification to admin with true city
    sendBookingNotification({
      customer_name: customer_name.trim(),
      customer_phone: customer_phone.trim(),
      customer_email: emailToSave,
      customer_address: customer_address.trim(),
      service_type: service_type.trim(),
      addons: Array.isArray(addons) ? addons : [],
      city: cityValue,
      appointment_date: appointment_date || undefined,
      appointment_time: appointment_time || undefined,
      total_estimate: total_estimate || undefined,
      notes: combinedNotes || undefined,
      payment_mode: 'pay_on_service',
      deposit_paid: false,
    }).catch(err => console.error('Email alert err:', err))

    return NextResponse.json({
      success: true,
      booking: data || payload,
      message: 'Booking request confirmed. Our coordinator will contact you shortly.',
    })
  } catch (err: unknown) {
    console.error('Booking route error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred. Please call or WhatsApp us.' }, { status: 500 })
  }
}
