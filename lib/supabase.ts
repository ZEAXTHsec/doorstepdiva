import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://pbxmxddufezjznucjixv.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieG14ZGR1ZmV6anpudWNqaXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNDkzNjQsImV4cCI6MjA5MjkyNTM2NH0.nLtWrniahM9dUaz0gBZT-WgxfoiMbF7YIuggXhU4KH4'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

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