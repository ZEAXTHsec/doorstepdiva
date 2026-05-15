import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get('x-admin-password')
  return auth === process.env.ADMIN_PASSWORD
}

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest) {
  const { data } = await supabase.from('booking_settings').select('*').single()
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  })
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { data, error } = await supabase
    .from('booking_settings')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', 1)
    .select()
    .single()
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}
