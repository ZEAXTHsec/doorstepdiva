import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://pbxmxddufezjznucjixv.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieG14ZGR1ZmV6anpudWNqaXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNDkzNjQsImV4cCI6MjA5MjkyNTM2NH0.nLtWrniahM9dUaz0gBZT-WgxfoiMbF7YIuggXhU4KH4'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type Artist = {
  id: string
  name: string
  skill_type: 'hair_skin' | 'makeup_nails'
  active: boolean
}

export type Booking = {
  id?: string
  created_at?: string
  customer_name: string
  customer_phone: string
  customer_email: string
  customer_address: string
  service_type: string
  addons: string[]
  city: 'lucknow' | 'ayodhya'
  artist_id?: string
  appointment_date?: string
  appointment_time?: string
  payment_mode?: 'deposit_online' | 'pay_on_service'
  deposit_paid?: boolean
  razorpay_order_id?: string
  razorpay_payment_id?: string
  total_estimate?: number
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
}

export type AvailabilityConfig = {
  id: string
  artist_id: string
  working_days: number[]
  start_time: string
  end_time: string
  gap_between_bookings: number
  last_booking_gap: number
  bookings_paused: boolean
  pause_message: string
}

export type BlockedDate = {
  id?: string
  date: string
  artist_id: string | null
  reason?: string
}

export type BookingSettings = {
  id: 1
  calendar_enabled: boolean
  deposit_amount: number
  updated_at?: string
}

export type Post = {
  id?: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  image_alt: string
  category: string
  tags: string[]
  meta_title: string
  meta_desc: string
  focus_keyword: string
  canonical_url: string
  noindex: boolean
  schema_type: string
  status: 'draft' | 'published'
  created_at?: string
  updated_at?: string
  published_at?: string
}