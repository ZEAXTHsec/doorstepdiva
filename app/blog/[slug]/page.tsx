import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const SUPABASE_URL = 'https://pbxmxddufezjznucjixv.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieG14ZGR1ZmV6anpudWNqaXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNDkzNjQsImV4cCI6MjA5MjkyNTM2NH0.nLtWrniahM9dUaz0gBZT-WgxfoiMbF7YIuggXhU4KH4'
const SITE = 'https://mydoorstepdiva.com'

export const revalidate = 60

async function getPost(slug: string) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.meta_title || post.title,
    description: post.meta_desc || post.excerpt,
    alternates: { canonical: post.canonical_url || `${SITE}/blog/${slug}` },
    robots: post.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_desc || post.excerpt,
      url: post.canonical_url || `${SITE}/blog/${slug}`,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      images: post.featured_image
        ? [{ url: post.featured_image, alt: post.image_alt || post.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_desc || post.excerpt,
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

function wordCount(s: string) { return s?.trim().split(/\s+/).filter(Boolean).length || 0 }
function readTime(s: string) { return Math.max(1, Math.round(wordCount(s) / 200)) }

// Minimal markdown-like renderer
function renderContent(raw: string): string {
  return raw
    .replace(/^## (.+)$/gm, '<h2 style="font-family:var(--font-playfair,serif);font-size:24px;font-weight:700;color:#1a1a1a;margin:40px 0 14px;line-height:1.3">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-family:var(--font-playfair,serif);font-size:19px;font-weight:600;color:#1a1a1a;margin:28px 0 10px">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li style="margin-bottom:6px">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, m => `<ul style="padding-left:22px;margin:14px 0">${m}</ul>`)
    .replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #C4768A;padding:10px 18px;margin:20px 0;color:#666;font-style:italic;background:rgba(196,118,138,0.04);border-radius:0 8px 8px 0">$1</blockquote>')
    .replace(/\n\n/g, '</p><p style="margin:0 0 20px">')
    .replace(/^/, '<p style="margin:0 0 20px">')
    .concat('</p>')
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': post.schema_type || 'Article',
    headline: post.title,
    description: post.meta_desc || post.excerpt,
    image: post.featured_image
      ? [post.featured_image]
      : ['https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175012/photo_2026-04-23_18-21-35_yvnhdd.jpg'],
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    url: post.canonical_url || `${SITE}/blog/${slug}`,
    author: { '@type': 'Organization', name: 'DoorStep Diva', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'DoorStep Diva',
      logo: {
        '@type': 'ImageObject',
        url: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175012/photo_2026-04-23_18-21-35_yvnhdd.jpg',
      },
    },
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE}/blog/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article style={{
        maxWidth: 780, margin: '0 auto', padding: '40px 24px 80px',
        fontFamily: 'var(--font-poppins,sans-serif)',
      }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: 12, color: '#bbb', marginBottom: 28, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="/" style={{ color: '#C4768A', textDecoration: 'none' }}>Home</a>
          <span>›</span>
          <a href="/blog" style={{ color: '#C4768A', textDecoration: 'none' }}>Blog</a>
          <span>›</span>
          <span style={{ color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 260 }}>
            {post.title}
          </span>
        </nav>

        {/* Category badge */}
        {post.category && (
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#8B3A52', padding: '3px 12px', borderRadius: 20,
            background: 'rgba(196,118,138,0.1)', marginBottom: 16,
          }}>{post.category}</div>
        )}

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-playfair,serif)', fontSize: 'clamp(28px,5vw,40px)',
          fontWeight: 700, color: '#1a1a1a', lineHeight: 1.25, margin: '0 0 16px',
        }}>{post.title}</h1>

        {/* Meta row */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 32, fontSize: 13, color: '#aaa' }}>
          {post.published_at && (
            <span>📅 {new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          )}
          <span>⏱ {readTime(post.content || '')} min read</span>
          <span>📝 {wordCount(post.content || '')} words</span>
          {post.focus_keyword && <span style={{ color: '#C4768A' }}>🔑 {post.focus_keyword}</span>}
        </div>

        {/* Featured image */}
        {post.featured_image && (
          <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 40 }}>
            <img
              src={post.featured_image}
              alt={post.image_alt || post.title}
              style={{ width: '100%', height: 'auto', maxHeight: 460, objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Content */}
        <div
          style={{ fontSize: 15, lineHeight: 1.85, color: '#333' }}
          dangerouslySetInnerHTML={{ __html: renderContent(post.content || '') }}
        />

        {/* Tags */}
        {(post.tags || []).length > 0 && (
          <div style={{ marginTop: 44, paddingTop: 24, borderTop: '1px solid rgba(196,118,138,0.15)' }}>
            <div style={{ fontSize: 11, color: '#aaa', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Tags</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(post.tags || []).map((tag: string) => (
                <span key={tag} style={{
                  fontSize: 12, padding: '4px 12px', borderRadius: 20,
                  background: 'rgba(196,118,138,0.08)', border: '1px solid rgba(196,118,138,0.2)', color: '#8B3A52',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{
          marginTop: 52, padding: '32px 36px', borderRadius: 18,
          background: 'linear-gradient(135deg, rgba(196,118,138,0.08), rgba(139,58,82,0.06))',
          border: '1px solid rgba(196,118,138,0.2)', textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--font-playfair,serif)', fontSize: 24, fontWeight: 700, marginBottom: 10, color: '#1a1a1a' }}>
            Book At-Home Beauty Services
          </div>
          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, marginBottom: 22, maxWidth: 400, margin: '0 auto 22px' }}>
            Delhi NCR · Lucknow · Ayodhya — Certified beauty artists at your doorstep.
          </p>
          <a
            href="https://wa.me/917985183449"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-block', padding: '13px 30px', borderRadius: 10,
              background: 'linear-gradient(135deg,#C4768A,#8B3A52)', color: 'white',
              textDecoration: 'none', fontWeight: 600, fontSize: 14,
            }}
          >Book via WhatsApp →</a>
        </div>

      </article>
    </>
  )
}