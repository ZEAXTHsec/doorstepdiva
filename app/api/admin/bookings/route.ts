// GET /api/admin/bookings?from=2025-06-01&to=2025-06-30&city=lucknow&status=confirmed
// PATCH /api/admin/bookings — update status or notes
// DELETE /api/admin/bookings — delete a booking
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get('x-admin-password')
  return auth === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const url      = req.nextUrl
  const from     = url.searchParams.get('from')
  const to       = url.searchParams.get('to')
  const city     = url.searchParams.get('city')
  const status   = url.searchParams.get('status')
  const search   = url.searchParams.get('search')
  const limit    = parseInt(url.searchParams.get('limit') || '100')
  const offset   = parseInt(url.searchParams.get('offset') || '0')

  let query = supabase
    .from('bookings')
    .select('*', { count: 'exact' })
    .order('appointment_date', { ascending: true })

  if (from) query = query.gte('appointment_date', from)
  if (to)   query = query.lte('appointment_date', to)
  if (city && city !== 'all') query = query.eq('city', city)
  if (status && status !== 'all') query = query.eq('status', status)
  if (search) query = query.or(`customer_name.ilike.%${search}%,customer_phone.ilike.%${search}%`)

  const { data, error, count } = await query.range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ bookings: data, count })
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { id, ...updates } = body

  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const allowed = ['status', 'notes', 'appointment_date', 'appointment_time', 'artist_id']
  const filtered: Record<string, unknown> = {}
  for (const k of allowed) {
    if (k in updates) filtered[k] = updates[k]
  }

  const { data, error } = await supabase
    .from('bookings')
    .update(filtered)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ booking: data })
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
