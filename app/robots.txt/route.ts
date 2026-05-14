const SITE = 'https://mydoorstepdiva.com'

export async function GET() {
  const content = `User-agent: *
Allow: /

# Block admin from indexing
Disallow: /blog-admin

Sitemap: ${SITE}/sitemap.xml`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
