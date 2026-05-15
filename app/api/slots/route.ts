// GET /api/slots?date=2025-06-15&service=Keratin+Treatment
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getAvailableSlots, getSkillType } from '@/lib/booking-utils'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const date    = req.nextUrl.searchParams.get('date')
  const service = req.nextUrl.searchParams.get('service')

  if (!date || !service) {
    return NextResponse.json({ error: 'date and service required' }, { status: 400 })
  }

  // Validate date format to prevent invalid dates
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date format. Use YYYY-MM-DD.' }, { status: 400 })
  }

  // Find the right artist based on service type
  const skillType = getSkillType(service)
  const { data: artist } = await supabase
    .from('artists')
    .select('id')
    .eq('skill_type', skillType)
    .eq('active', true)
    .single()

  if (!artist) return NextResponse.json({ slots: [] }, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' },
  })

  const slots = await getAvailableSlots(date, artist.id)
  return NextResponse.json({ slots, artist_id: artist.id }, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' },
  })
}
