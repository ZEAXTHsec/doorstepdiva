import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://pbxmxddufezjznucjixv.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieG14ZGR1ZmV6anpudWNqaXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNDkzNjQsImV4cCI6MjA5MjkyNTM2NH0.nLtWrniahM9dUaz0gBZT-WgxfoiMbF7YIuggXhU4KH4'
const SITE = 'https://mydoorstepdiva.com'

export const revalidate = 3600 // regenerate every hour

const STATIC_PAGES = [
  { url: '/',                        priority: '1.0', changefreq: 'weekly'  },
  { url: '/about',                   priority: '0.8', changefreq: 'monthly' },
  { url: '/areas',                   priority: '0.8', changefreq: 'monthly' },
  { url: '/blog',                    priority: '0.9', changefreq: 'daily'   },
  { url: '/services/hair',           priority: '0.9', changefreq: 'monthly' },
  { url: '/services/skin',           priority: '0.9', changefreq: 'monthly' },
  { url: '/services/makeup',         priority: '0.9', changefreq: 'monthly' },
  { url: '/services/nails',          priority: '0.9', changefreq: 'monthly' },
  { url: '/services/eyelash',        priority: '0.9', changefreq: 'monthly' },
  { url: '/services/semi-permanent', priority: '0.9', changefreq: 'monthly' },
]

export async function GET() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const today = new Date().toISOString().split('T')[0]

  const staticUrls = STATIC_PAGES.map(p => `
  <url>
    <loc>${SITE}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('')

  const blogUrls = (posts || []).map(p => `
  <url>
    <loc>${SITE}/blog/${p.slug}</loc>
    <lastmod>${new Date(p.updated_at || p.published_at || Date.now()).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${blogUrls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
