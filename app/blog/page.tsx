import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CURATED_POSTS } from '@/app/_data/curated-posts'

const SUPABASE_URL = 'https://pbxmxddufezjznucjixv.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieG14ZGR1ZmV6anpudWNqaXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNDkzNjQsImV4cCI6MjA5MjkyNTM2NH0.nLtWrniahM9dUaz0gBZT-WgxfoiMbF7YIuggXhU4KH4'
const SITE = 'https://mydoorstepdiva.com'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Beauty Journal — Clinical Guides, Festive Protocols & Trends | DoorStep Diva',
  description:
    'Authoritative beauty and esthetics journal covering Karwa Chauth Solah Shringar, Korean glass skin facials, bridal HD vs airbrush makeup, and nail science in Delhi NCR, Lucknow & Ayodhya.',
  keywords:
    'beauty blog Delhi NCR, at home salon tips Lucknow, Karwa Chauth makeup guide, Korean glass skin facial, bridal makeup tips Ayodhya, nail extension aftercare',
  alternates: { canonical: `${SITE}/blog` },
  openGraph: {
    title: 'Beauty Journal — At-Home Luxury & Clinical Esthetics | DoorStep Diva',
    description: 'Authoritative beauty guides and clinical protocols for Delhi NCR, Lucknow & Ayodhya.',
    url: `${SITE}/blog`,
    type: 'website',
  },
}

function wordCount(s: string) { return s?.trim().split(/\s+/).filter(Boolean).length || 0 }
function readTime(s: string) { return Math.max(1, Math.round(wordCount(s) / 200)) }

async function getPosts() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    const { data } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, featured_image, image_alt, category, tags, published_at, content, focus_keyword')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    const dbPosts = data || []
    const existingSlugs = new Set(dbPosts.map(p => p.slug))
    const nonDuplicateCurated = CURATED_POSTS.filter(p => !existingSlugs.has(p.slug))
    return [...dbPosts, ...nonDuplicateCurated]
  } catch {
    return CURATED_POSTS
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Beauty Journal', item: `${SITE}/blog` },
    ],
  }

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'DoorStep Diva Beauty Journal',
    description: 'Clinical guides, festive rituals and bridal beauty blueprints.',
    url: `${SITE}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'DoorStep Diva',
      logo: {
        '@type': 'ImageObject',
        url: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777178196/40b6fd8e-8572-41d3-b5b4-75fdd1e48dd8_sckgy6.png',
      },
    },
  }

  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <main className="min-h-screen bg-[#FCF8F9] pt-28 pb-24 font-poppins">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] text-xs font-semibold uppercase tracking-wider mb-4">
              <span>Beauty Journal &amp; Clinical Guides</span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-4">
              Tips, Trends &amp; At-Home Protocols
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Researched and verified by certified cosmetologists — providing honest esthetics and seasonal guides for Delhi NCR, Lucknow &amp; Ayodhya.
            </p>
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-20 px-6 rounded-3xl bg-white border border-blush/20 max-w-md mx-auto">
              <svg className="w-12 h-12 text-[#8B3A52] mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <p className="text-stone-500 text-sm">No articles published yet. Check back soon.</p>
            </div>
          )}

          {/* Featured Post Card (High Visual Hierarchy) */}
          {featuredPost && (
            <section className="mb-16">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block rounded-3xl bg-white border border-blush/25 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 items-center">
                  <div className="relative min-h-[300px] md:min-h-[420px] w-full bg-stone-100 overflow-hidden">
                    {featuredPost.featured_image ? (
                      <img
                        src={featuredPost.featured_image}
                        alt={featuredPost.image_alt || featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#FAF0F3] to-[#F5D8DC] flex items-center justify-center text-stone-400">
                        DoorStep Diva
                      </div>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#8B3A52] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      Featured Guide
                    </span>
                  </div>

                  <div className="p-8 sm:p-10 flex flex-col justify-center">
                    {featuredPost.category && (
                      <span className="text-xs font-bold text-[#8B3A52] uppercase tracking-wider mb-3 block">
                        {featuredPost.category}
                      </span>
                    )}
                    <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-stone-900 group-hover:text-[#8B3A52] transition-colors leading-snug mb-4">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-stone-400 mb-6">
                      {featuredPost.published_at && (
                        <span>
                          {new Date(featuredPost.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                      <span>·</span>
                      <span>{readTime(featuredPost.content || '')} min read</span>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B3A52] group-hover:text-[#C4768A] transition-colors">
                      <span>Read Full Blueprint</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Grid of Other Articles */}
          {otherPosts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-blush/20">
                <h2 className="font-playfair text-2xl font-bold text-stone-900">
                  All Beauty &amp; Clinical Guides
                </h2>
                <span className="text-xs text-stone-400">
                  {otherPosts.length} Guides Available
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {otherPosts.map((post) => (
                  <Link
                    key={post.id || post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-2xl bg-white border border-blush/20 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt={post.image_alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#FAF0F3] flex items-center justify-center text-stone-400 text-xs">
                          DoorStep Diva
                        </div>
                      )}
                      {post.category && (
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#8B3A52] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                          {post.category}
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-playfair text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#8B3A52] transition-colors leading-snug mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-stone-500 text-xs leading-relaxed line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-blush/15 text-xs">
                        <div className="text-stone-400 text-[11px]">
                          {post.published_at && (
                            <span>{new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                          )}
                          {' · '}{readTime(post.content || '')} min
                        </div>
                        <span className="font-semibold text-[#8B3A52] group-hover:text-[#C4768A] transition-colors">
                          Read →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Conversion Banner */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#FAF0F3] via-white to-[#FDF4F6] border border-[#C4768A]/30 text-center">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#8B3A52]/10 text-[#8B3A52] text-xs font-bold uppercase tracking-wider mb-3">
              Certified Doorstep Artistry
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
              Book Certified Artists at Your Home
            </h2>
            <p className="text-stone-600 text-sm max-w-md mx-auto mb-7 leading-relaxed">
              Enjoy salon treatments without traveling. Delivered across South Delhi, Noida, Gurugram, Lucknow &amp; Ayodhya. Zero advance deposit required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/book"
                className="btn-press inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg,#C4768A,#8B3A52)',
                  boxShadow: '0 6px 20px rgba(139,58,82,0.3)',
                }}
              >
                <span>Book Slot Online</span>
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
                <span>WhatsApp Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}