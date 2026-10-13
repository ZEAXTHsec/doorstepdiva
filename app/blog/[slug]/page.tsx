import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { marked } from 'marked'
import { CURATED_POSTS } from '@/app/_data/curated-posts'

const SUPABASE_URL = 'https://pbxmxddufezjznucjixv.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieG14ZGR1ZmV6anpudWNqaXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNDkzNjQsImV4cCI6MjA5MjkyNTM2NH0.nLtWrniahM9dUaz0gBZT-WgxfoiMbF7YIuggXhU4KH4'
const SITE = 'https://mydoorstepdiva.com'

export const revalidate = 60

export async function generateStaticParams() {
  return CURATED_POSTS.map(p => ({ slug: p.slug }))
}

async function getPost(slug: string) {
  const normalized = slug.toLowerCase().trim()
  const curated = CURATED_POSTS.find(p => p.slug === normalized || p.slug.startsWith(normalized) || normalized.startsWith(p.slug))
  if (curated) return curated

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()
    return data
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found | DoorStep Diva' }

  return {
    title: `${post.meta_title || post.title} | DoorStep Diva`,
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

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  // Parse GFM markdown with tables, code blocks, lists and links
  const parsedHtml = marked.parse(post.content || '', {
    gfm: true,
    breaks: true,
  }) as string

  // Related articles
  const relatedPosts = CURATED_POSTS.filter(p => p.slug !== post.slug).slice(0, 3)

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
    author: {
      '@type': 'Organization',
      name: 'DoorStep Diva Editorial & Clinical Esthetics Board',
      url: SITE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DoorStep Diva',
      logo: {
        '@type': 'ImageObject',
        url: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777178196/40b6fd8e-8572-41d3-b5b4-75fdd1e48dd8_sckgy6.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE}/blog/${slug}`,
    },
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Beauty Journal', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE}/blog/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <style>{`
        .article-body h1 {
          font-family: var(--font-playfair, serif);
          font-size: clamp(1.85rem, 3.5vw, 2.4rem);
          font-weight: 700;
          color: #1a1a1a;
          margin: 2.5rem 0 1rem;
          line-height: 1.25;
        }
        .article-body h2 {
          font-family: var(--font-playfair, serif);
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 700;
          color: #1a1a1a;
          margin: 3rem 0 1rem;
          line-height: 1.3;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(196,118,138,0.2);
        }
        .article-body h3 {
          font-family: var(--font-playfair, serif);
          font-size: 1.25rem;
          font-weight: 600;
          color: #2b1f23;
          margin: 2rem 0 0.75rem;
        }
        .article-body p {
          margin: 0 0 1.35rem;
          line-height: 1.85;
          color: #3d3336;
          font-size: 1rem;
        }
        .article-body ul, .article-body ol {
          margin: 1.2rem 0 1.6rem;
          padding-left: 1.5rem;
        }
        .article-body ul li {
          list-style-type: disc;
          margin-bottom: 0.55rem;
          line-height: 1.75;
          color: #3d3336;
        }
        .article-body ol li {
          list-style-type: decimal;
          margin-bottom: 0.55rem;
          line-height: 1.75;
          color: #3d3336;
        }
        .article-body strong {
          font-weight: 600;
          color: #1a1a1a;
        }
        .article-body a {
          color: #8B3A52;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.15s ease;
        }
        .article-body a:hover {
          color: #C4768A;
        }
        .article-body blockquote {
          border-left: 3px solid #C4768A;
          background: rgba(196,118,138,0.06);
          padding: 1.1rem 1.4rem;
          margin: 1.75rem 0;
          border-radius: 0 12px 12px 0;
          color: #554449;
          font-style: italic;
        }
        .article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 0.875rem;
          background: white;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(139,58,82,0.06);
          border: 1px solid rgba(196,118,138,0.22);
          display: block;
          overflow-x: auto;
        }
        .article-body thead {
          background: linear-gradient(135deg, rgba(248, 235, 239, 0.95), rgba(243, 222, 228, 0.95));
          border-bottom: 2px solid rgba(196,118,138,0.3);
        }
        .article-body th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 700;
          color: #8B3A52;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }
        .article-body td {
          padding: 12px 16px;
          border-bottom: 1px solid rgba(196,118,138,0.12);
          color: #3d3336;
          vertical-align: top;
        }
        .article-body tr:last-child td {
          border-bottom: none;
        }
        .article-body tr:nth-child(even) td {
          background: rgba(254, 247, 249, 0.45);
        }
        .article-body pre {
          background: #1c0e14;
          color: #fce7ed;
          padding: 1.25rem;
          border-radius: 14px;
          overflow-x: auto;
          margin: 1.75rem 0;
          font-size: 0.825rem;
          line-height: 1.6;
          border: 1px solid rgba(196,118,138,0.25);
        }
        .article-body code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }
        .article-body hr {
          border: none;
          border-top: 1px solid rgba(196,118,138,0.2);
          margin: 2.75rem 0;
        }
      `}</style>

      <main className="min-h-screen bg-[#FCF8F9] pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-5 sm:px-8 font-poppins">
          {/* Breadcrumb Navigation */}
          <nav className="text-xs text-stone-400 mb-8 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="text-[#8B3A52] hover:text-[#C4768A] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="text-[#8B3A52] hover:text-[#C4768A] transition-colors">Beauty Journal</Link>
            <span>/</span>
            <span className="text-stone-500 truncate max-w-[280px]">
              {post.title}
            </span>
          </nav>

          {/* Category Pill */}
          {post.category && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] text-xs font-semibold uppercase tracking-wider mb-5">
              <span>{post.category}</span>
            </div>
          )}

          {/* Main Title */}
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.2] mb-6">
            {post.title}
          </h1>

          {/* Metadata Row (Clean SVGs, Zero Emojis) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-4 border-y border-blush/25 text-xs text-stone-500 mb-8">
            {post.published_at && (
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#8B3A52]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>{new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#8B3A52]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>{readTime(post.content || '')} min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#8B3A52]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <span>{wordCount(post.content || '')} words</span>
            </div>
            {post.focus_keyword && (
              <div className="flex items-center gap-1.5 text-[#8B3A52] font-medium">
                <svg className="w-3.5 h-3.5 text-[#C8974A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                <span>Focus: {post.focus_keyword}</span>
              </div>
            )}
          </div>

          {/* Author Credibility Pill (GEO Requirement) */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-blush/20 shadow-xs mb-9">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#EFCCD4] to-[#C4768A] flex items-center justify-center text-white shrink-0 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-xs text-stone-900 tracking-tight">
                DoorStep Diva Editorial &amp; Clinical Esthetics Board
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Authored and verified by certified cosmetologists serving Delhi NCR, Lucknow &amp; Ayodhya.
              </p>
            </div>
          </div>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="rounded-2xl overflow-hidden border border-blush/25 shadow-md mb-10 bg-white">
              <img
                src={post.featured_image}
                alt={post.image_alt || post.title}
                className="w-full h-auto max-h-[460px] object-cover"
              />
            </div>
          )}

          {/* Rendered Content */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: parsedHtml }}
          />

          {/* Tags */}
          {(post.tags || []).length > 0 && (
            <div className="mt-12 pt-6 border-t border-blush/25">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Topic Categories</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white border border-blush/25 text-[#8B3A52] font-medium shadow-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Conversion CTA Block (Julian Shapiro / Harry Dry Architecture) */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FAF0F3] via-white to-[#FDF4F6] border border-[#C4768A]/30 shadow-lg text-center relative overflow-hidden">
            <div className="max-w-xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] text-[10px] font-bold uppercase tracking-widest mb-3">
                Experience At-Home Luxury
              </span>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                Ready for Clinic-Grade Beauty at Your Doorstep?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Certified female estheticians, 100% sealed single-use kits, and zero advance deposit. Pay only after you are completely delighted with your service.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/book"
                  className="btn-press inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-semibold transition-all"
                  style={{
                    background: 'linear-gradient(135deg,#C4768A,#8B3A52)',
                    boxShadow: '0 6px 20px rgba(139,58,82,0.3)',
                  }}
                >
                  <span>Book Appointment Online</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </Link>
                <a
                  href="https://wa.me/919129577514"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>

          {/* Related Articles Matrix */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-10 border-t border-blush/25">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-playfair text-xl font-bold text-stone-900">Recommended Reading</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Authoritative beauty &amp; clinical guides</p>
                </div>
                <Link href="/blog" className="text-xs font-semibold text-[#8B3A52] hover:text-[#C4768A]">
                  View All Articles →
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {relatedPosts.map(related => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block rounded-2xl bg-white border border-blush/20 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-32 w-full bg-stone-100 overflow-hidden">
                      {related.featured_image ? (
                        <img
                          src={related.featured_image}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#FAF0F3] flex items-center justify-center text-stone-400 text-xs">
                          DoorStep Diva
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-bold text-[#8B3A52] uppercase tracking-wider block mb-1">
                        {related.category}
                      </span>
                      <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-2 group-hover:text-[#8B3A52] transition-colors leading-snug">
                        {related.title}
                      </h4>
                      <p className="text-[11px] text-stone-400 mt-2">
                        {readTime(related.content || '')} min read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  )
}