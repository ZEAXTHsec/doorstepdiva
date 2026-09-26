import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pbxmxddufezjznucjixv.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

let cachedAdmin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (cachedAdmin) return cachedAdmin
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_SERVICE_ROLE_KEY || 'dummy-key-for-build'
  cachedAdmin = createClient(SUPABASE_URL, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  return cachedAdmin
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseAdmin()
    const value = (client as unknown as Record<string, unknown>)[prop as string]
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  },
})
