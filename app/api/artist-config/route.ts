// GET /api/artist-config?service=Haircut
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSkillType } from '@/lib/booking-utils'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const service = req.nextUrl.searchParams.get('service')
  if (!service) {
    return NextResponse.json({ error: 'service required' }, { status: 400 })
  }

  const skillType = getSkillType(service)
  const { data: artist } = await supabase
    .from('artists')
    .select('id')
    .eq('skill_type', skillType)
    .eq('active', true)
    .single()

  if (!artist) {
    return NextResponse.json({ working_days: [], blocked_dates: [], bookings_paused: false }, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' },
    })
  }

  const [{ data: config }, { data: blocked }] = await Promise.all([
    supabase.from('availability_config').select('working_days,bookings_paused').eq('artist_id', artist.id).single(),
    supabase.from('blocked_dates').select('date').or(`artist_id.eq.${artist.id},artist_id.is.null`),
  ])

  return NextResponse.json({
    artist_id: artist.id,
    working_days: config?.working_days ?? [],
    bookings_paused: config?.bookings_paused ?? false,
    blocked_dates: (blocked || []).map(b => b.date),
  }, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' },
  })
}
