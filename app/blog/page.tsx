import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import Link from 'next/link'

const SUPABASE_URL = 'https://pbxmxddufezjznucjixv.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieG14ZGR1ZmV6anpudWNqaXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNDkzNjQsImV4cCI6MjA5MjkyNTM2NH0.nLtWrniahM9dUaz0gBZT-WgxfoiMbF7YIuggXhU4KH4'
const SITE = 'https://mydoorstepdiva.com'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Beauty Blog — Tips, Trends & At-Home Salon Guides',
  description:
    'Expert beauty tips, hair care guides, skincare routines, bridal makeup advice and more from DoorStep Diva — your certified at-home salon in Delhi NCR, Lucknow & Ayodhya.',
  alternates: { canonical: `${SITE}/blog` },
  openGraph: {
    title: 'Beauty Blog | DoorStep Diva',
    description: 'Expert beauty tips and at-home salon guides for Delhi NCR, Lucknow & Ayodhya.',
    url: `${SITE}/blog`,
    type: 'website',
  },
}

function wordCount(s: string) { return s?.trim().split(/\s+/).filter(Boolean).length || 0 }
function readTime(s: string) { return Math.max(1, Math.round(wordCount(s) / 200)) }

async function getPosts() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  const { data } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, featured_image, image_alt, category, tags, published_at, content, focus_keyword')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  return data || []
}

export default async function BlogPage() {
  const posts = await getPosts()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px',
        fontFamily: 'var(--font-poppins,sans-serif)',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#8B3A52', padding: '4px 14px',
            borderRadius: 20, background: 'rgba(196,118,138,0.1)', marginBottom: 16,
          }}>Beauty Journal</div>
          <h1 style={{
            fontFamily: 'var(--font-playfair,serif)', fontSize: 'clamp(32px,5vw,48px)',
            fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, margin: '0 0 16px',
          }}>Tips, Trends & At-Home Guides</h1>
          <p style={{ fontSize: 16, color: '#888', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            Expert beauty advice from certified artists — for Delhi NCR, Lucknow & Ayodhya.
          </p>
        </div>

        {/* No posts state */}
        {posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 24px', color: '#aaa' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✍️</div>
            <p style={{ fontSize: 16, color: '#888' }}>No posts published yet. Check back soon!</p>
          </div>
        )}

        {/* Featured post (first) */}
        {posts.length > 0 && (
          <Link href={`/blog/${posts[0].slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 56 }}>
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              border: '1px solid rgba(196,118,138,0.15)',
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              background: 'white', transition: 'box-shadow 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 40px rgba(139,58,82,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              {posts[0].featured_image ? (
                <div style={{ position: 'relative', minHeight: 320 }}>
                  <img
                    src={posts[0].featured_image}
                    alt={posts[0].image_alt || posts[0].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ) : (
                <div style={{
                  minHeight: 320, background: 'linear-gradient(135deg,rgba(196,118,138,0.15),rgba(139,58,82,0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 48 }}>💄</span>
                </div>
              )}
              <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#8B3A52', padding: '3px 10px', borderRadius: 20,
                    background: 'rgba(196,118,138,0.1)',
                  }}>Featured</span>
                  {posts[0].category && (
                    <span style={{
                      fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: '#666', padding: '3px 10px', borderRadius: 20,
                      background: 'rgba(0,0,0,0.05)',
                    }}>{posts[0].category}</span>
                  )}
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-playfair,serif)', fontSize: 28, fontWeight: 700,
                  color: '#1a1a1a', lineHeight: 1.3, margin: '0 0 14px',
                }}>{posts[0].title}</h2>
                {posts[0].excerpt && (
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, margin: '0 0 20px' }}>
                    {posts[0].excerpt}
                  </p>
                )}
                <div style={{ fontSize: 12, color: '#aaa', display: 'flex', gap: 12 }}>
                  {posts[0].published_at && (
                    <span>{new Date(posts[0].published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  )}
                  <span>{readTime(posts[0].content || '')} min read</span>
                </div>
                <div style={{
                  marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 13, fontWeight: 600, color: '#8B3A52',
                }}>
                  Read Article →
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid of remaining posts */}
        {posts.length > 1 && (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 24,
          }}>
            {posts.slice(1).map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{
                  background: 'white', borderRadius: 16, overflow: 'hidden',
                  border: '1px solid rgba(196,118,138,0.12)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  height: '100%', display: 'flex', flexDirection: 'column',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(139,58,82,0.1)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'none'
                  }}
                >
                  {/* Image */}
                  <div style={{ height: 200, overflow: 'hidden', flexShrink: 0 }}>
                    {post.featured_image ? (
                      <img
                        src={post.featured_image}
                        alt={post.image_alt || post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        background: 'linear-gradient(135deg,rgba(196,118,138,0.12),rgba(139,58,82,0.08))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{ fontSize: 36 }}>✨</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {post.category && (
                      <span style={{
                        fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                        textTransform: 'uppercase', color: '#8B3A52',
                        marginBottom: 10, display: 'block',
                      }}>{post.category}</span>
                    )}
                    <h3 style={{
                      fontFamily: 'var(--font-playfair,serif)', fontSize: 18, fontWeight: 700,
                      color: '#1a1a1a', lineHeight: 1.35, margin: '0 0 10px',
                    }}>{post.title}</h3>
                    {post.excerpt && (
                      <p style={{
                        fontSize: 13, color: '#777', lineHeight: 1.65,
                        margin: '0 0 16px', flex: 1,
                        display: '-webkit-box', WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>{post.excerpt}</p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <div style={{ fontSize: 11, color: '#bbb' }}>
                        {post.published_at && new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        {' · '}{readTime(post.content || '')} min
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#C4768A' }}>Read →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

      </div>
    </>
  )
}