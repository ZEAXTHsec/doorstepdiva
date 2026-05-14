// GET/PATCH /api/admin/availability — config + blocked dates
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get('x-admin-password')
  return auth === process.env.ADMIN_PASSWORD
}

// GET: returns all configs and blocked dates
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [{ data: configs }, { data: artists }, { data: blocked }] = await Promise.all([
    supabase.from('availability_config').select('*'),
    supabase.from('artists').select('*').eq('active', true),
    supabase.from('blocked_dates').select('*').order('date', { ascending: true }),
  ])

  return NextResponse.json({ configs, artists, blocked })
}

// PATCH: update config or blocked dates
// Body: { action: 'update_config', artist_id: '...', updates: {...} }
//       { action: 'block_date', date: '...', artist_id: '...'|null, reason: '...' }
//       { action: 'unblock_date', id: '...' }
//       { action: 'toggle_pause', artist_id: '...', paused: true|false, message: '...' }
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { action } = body

  if (action === 'update_config') {
    const { artist_id, updates } = body
    const { data, error } = await supabase
      .from('availability_config')
      .update(updates)
      .eq('artist_id', artist_id)
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ config: data })
  }

  if (action === 'block_date') {
    const { date, artist_id, reason } = body
    const { data, error } = await supabase
      .from('blocked_dates')
      .insert({ date, artist_id: artist_id || null, reason: reason || null })
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ blocked: data })
  }

  if (action === 'unblock_date') {
    const { id } = body
    const { error } = await supabase
      .from('blocked_dates')
      .delete()
      .eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  }

  if (action === 'toggle_pause') {
    const { artist_id, paused, message } = body
    const { data, error } = await supabase
      .from('availability_config')
      .update({ bookings_paused: paused, pause_message: message || '' })
      .eq('artist_id', artist_id)
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ config: data })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
