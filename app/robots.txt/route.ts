const SITE = 'https://mydoorstepdiva.com'

export async function GET() {
  const content = `# Global Web Crawlers
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /blog-admin
Disallow: /blog-admin/*
Disallow: /api/

# AI Search Crawlers (ChatGPT, Perplexity, Claude, Gemini)
User-agent: GPTBot
Allow: /
Disallow: /admin
Disallow: /blog-admin
Disallow: /api/

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

# Sitemaps & Knowledge Feeds
Sitemap: ${SITE}/sitemap.xml
# LLM Knowledge Standard: ${SITE}/llms.txt`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
