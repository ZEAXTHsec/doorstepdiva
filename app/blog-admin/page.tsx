'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { supabase, type Post } from '@/lib/supabase'

// ─── Constants ────────────────────────────────────────────────────────────────
const SITE = 'https://mydoorstepdiva.com'

const CATEGORIES = [
  'Hair Care', 'Skin Care', 'Makeup Tips', 'Nail Art',
  'Bridal Beauty', 'Eyelash & Brows', 'Semi-Permanent', 'Beauty Tips', 'At-Home Salon',
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function slugify(s: string) {
  return s.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}
function wordCount(s: string) { return s.trim().split(/\s+/).filter(Boolean).length }
function readTime(s: string) { return Math.max(1, Math.round(wordCount(s) / 200)) }
function autoExcerpt(s: string) {
  return s.replace(/<[^>]+>/g, '').split(/[.!?]/)[0]?.trim().slice(0, 160) ?? ''
}

// ─── SEO Score ────────────────────────────────────────────────────────────────
function seoScore(p: {
  title: string; metaTitle: string; metaDesc: string
  content: string; hasFeatImg: boolean; imageAlt: string
  tags: string[]; focusKeyword: string; slug: string
}) {
  let score = 0
  const checks: { ok: boolean; warn?: boolean; msg: string }[] = []

  if (p.title.length > 5) { score += 12; checks.push({ ok: true, msg: 'Post title is set' }) }
  else checks.push({ ok: false, msg: 'Add a post title' })

  const mt = (p.metaTitle || p.title).length
  if (mt >= 40 && mt <= 60) { score += 15; checks.push({ ok: true, msg: `Meta title: ${mt} chars ✓` }) }
  else if (mt > 0) { score += 6; checks.push({ ok: false, warn: true, msg: `Meta title: aim 40–60 chars (${mt})` }) }
  else checks.push({ ok: false, msg: 'Add a meta title' })

  if (p.metaDesc.length >= 120 && p.metaDesc.length <= 160) {
    score += 15; checks.push({ ok: true, msg: `Meta desc: ${p.metaDesc.length} chars ✓` })
  } else if (p.metaDesc.length > 0) {
    score += 6; checks.push({ ok: false, warn: true, msg: `Meta desc: aim 120–160 (${p.metaDesc.length})` })
  } else checks.push({ ok: false, msg: 'Write a meta description' })

  const wc = wordCount(p.content)
  if (wc >= 600) { score += 18; checks.push({ ok: true, msg: `${wc} words — great length` }) }
  else if (wc >= 300) { score += 9; checks.push({ ok: false, warn: true, msg: `${wc} words — aim for 600+` }) }
  else if (wc > 0) { score += 3; checks.push({ ok: false, warn: true, msg: 'Content too short (300+ needed)' }) }
  else checks.push({ ok: false, msg: 'Write your post content' })

  if (p.hasFeatImg) { score += 12; checks.push({ ok: true, msg: 'Featured image set' }) }
  else checks.push({ ok: false, msg: 'Add a featured image' })

  if (p.imageAlt.length > 5) { score += 5; checks.push({ ok: true, msg: 'Image alt text set' }) }
  else if (p.hasFeatImg) checks.push({ ok: false, warn: true, msg: 'Add image alt text' })

  if (p.tags.length >= 2) { score += 5; checks.push({ ok: true, msg: `${p.tags.length} tags added` }) }
  else checks.push({ ok: false, warn: true, msg: 'Add at least 2 tags' })

  if (p.focusKeyword) { score += 8; checks.push({ ok: true, msg: 'Focus keyword set' }) }
  else checks.push({ ok: false, warn: true, msg: 'Set a focus keyword' })

  const cl = p.content.toLowerCase()
  if (cl.includes('lucknow') || cl.includes('delhi') || cl.includes('doorstep') || cl.includes('at-home')) {
    score += 10; checks.push({ ok: true, msg: 'Local keyword in content ✓' })
  } else if (p.content.length > 100) {
    checks.push({ ok: false, warn: true, msg: 'Add local keyword (Lucknow / Delhi)' })
  }

  return { score: Math.min(100, score), checks }
}

// ─── Keyword Score ────────────────────────────────────────────────────────────
function keywordScore(keyword: string, title: string, content: string, slug: string, metaDesc: string) {
  if (!keyword) return { score: 0, checks: [] as { ok: boolean; label: string }[] }
  const kw = keyword.toLowerCase()
  const checks = [
    { label: 'In title', ok: title.toLowerCase().includes(kw) },
    { label: 'In URL/slug', ok: slug.toLowerCase().includes(kw.replace(/\s+/g, '-')) },
    { label: 'In meta description', ok: metaDesc.toLowerCase().includes(kw) },
    { label: 'In first paragraph', ok: (content.toLowerCase().split('\n')[0] ?? '').includes(kw) },
    {
      label: 'Density 1–3%', ok: (() => {
        const wc = wordCount(content)
        const kwc = (content.toLowerCase().match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length
        const d = wc > 0 ? (kwc / wc) * 100 : 0
        return d >= 1 && d <= 3
      })()
    },
  ]
  return { score: Math.round((checks.filter(c => c.ok).length / checks.length) * 100), checks }
}

// ─── AI helper ────────────────────────────────────────────────────────────────
async function aiCall(system: string, user: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  })
  const d = await res.json()
  return d.content?.map((b: any) => b.text || '').join('') || ''
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  card: {
    background: 'white', border: '1px solid rgba(196,118,138,0.15)',
    borderRadius: 12, padding: 20,
  } as React.CSSProperties,
  input: {
    background: '#fdf8f9', border: '1px solid rgba(196,118,138,0.2)',
    borderRadius: 8, padding: '8px 11px', fontSize: 13, color: '#1a1a1a',
    fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box' as const,
  } as React.CSSProperties,
  btn: {
    cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, borderRadius: 8,
    border: '1px solid rgba(196,118,138,0.25)', background: 'transparent',
    color: '#1a1a1a', padding: '7px 13px',
  } as React.CSSProperties,
  btnPrimary: {
    cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, borderRadius: 8,
    border: 'none', background: 'linear-gradient(135deg,#C4768A,#8B3A52)',
    color: 'white', padding: '9px 18px', fontWeight: 600,
  } as React.CSSProperties,
  btnAi: {
    cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, borderRadius: 8,
    border: '1px solid rgba(196,118,138,0.2)', background: 'rgba(196,118,138,0.08)',
    color: '#8B3A52', padding: '6px 12px', fontWeight: 500,
  } as React.CSSProperties,
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, color: '#999',
      textTransform: 'uppercase', letterSpacing: '0.07em',
      marginBottom: 6, display: 'block',
    }}>{children}</span>
  )
}

function Toast({ msg }: { msg: string }) {
  if (!msg) return null
  return (
    <div style={{
      position: 'fixed', top: 20, right: 20, zIndex: 999,
      background: '#1a1a1a', color: 'white', padding: '10px 18px',
      borderRadius: 10, fontSize: 13, boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    }}>{msg}</div>
  )
}

const emptyPost = (): Partial<Post> => ({
  title: '', slug: '', content: '', excerpt: '', featured_image: '',
  image_alt: '', category: '', tags: [], meta_title: '', meta_desc: '',
  focus_keyword: '', canonical_url: '', noindex: false,
  schema_type: 'Article', status: 'draft',
})

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BlogAdmin() {
  const [post, setPost] = useState<Partial<Post>>(emptyPost())
  const [posts, setPosts] = useState<Post[]>([])
  const [view, setView] = useState<'list' | 'editor'>('list')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [aiLoading, setAiLoading] = useState<string | null>(null)
  const [aiTipsText, setAiTipsText] = useState('')
  const [activeTab, setActiveTab] = useState<'seo' | 'schema' | 'social'>('seo')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [listFilter, setListFilter] = useState<'all' | 'draft' | 'published'>('all')
  const fileRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  const set = useCallback(<K extends keyof Post>(k: K, v: Post[K]) => {
    setPost(p => ({ ...p, [k]: v }))
  }, [])

  // Auto-slug from title (only for new posts)
  useEffect(() => {
    if (post.title && !post.id) {
      const s = slugify(post.title)
      setPost(p => ({ ...p, slug: s, canonical_url: p.canonical_url || `${SITE}/blog/${s}` }))
    }
  }, [post.title, post.id])

  useEffect(() => { fetchPosts() }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts').select('*').order('created_at', { ascending: false })
    if (data) setPosts(data as Post[])
    if (error) showToast('Could not load posts — check Supabase table setup')
  }

  function showToast(msg: string) {
    setToast(msg); setTimeout(() => setToast(''), 3500)
  }

  async function savePost(status?: 'draft' | 'published') {
    if (!post.title?.trim()) { showToast('Add a post title first'); return }
    if (!post.slug?.trim()) { showToast('Slug is required'); return }
    setSaving(true)

    const finalStatus = status || post.status || 'draft'
    const payload: Partial<Post> = {
      ...post,
      status: finalStatus,
      excerpt: post.excerpt || autoExcerpt(post.content || ''),
      canonical_url: post.canonical_url || `${SITE}/blog/${post.slug}`,
      published_at:
        finalStatus === 'published' && !post.published_at
          ? new Date().toISOString()
          : post.published_at,
    }

    if (post.id) {
      const { error } = await supabase.from('posts').update(payload).eq('id', post.id)
      if (error) { showToast('Save error: ' + error.message); setSaving(false); return }
    } else {
      const { data, error } = await supabase.from('posts').insert(payload).select().single()
      if (error) { showToast('Save error: ' + error.message); setSaving(false); return }
      if (data) setPost(data as Post)
    }

    showToast(finalStatus === 'published' ? '✓ Post published!' : '✓ Draft saved!')
    fetchPosts(); setSaving(false)
  }

  async function deletePost(id: string) {
    if (!confirm('Delete this post permanently?')) return
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) { showToast('Delete error: ' + error.message); return }
    fetchPosts(); showToast('Post deleted')
  }

  function editPost(p: Post) {
    setPost(p); setAiTipsText(''); setView('editor')
    setTimeout(() => titleRef.current?.focus(), 100)
  }

  function newPost() {
    setPost(emptyPost()); setAiTipsText(''); setView('editor')
    setTimeout(() => titleRef.current?.focus(), 100)
  }

  function addTag() {
    const v = tagInput.trim()
    if (v && !(post.tags || []).includes(v) && (post.tags || []).length < 10) {
      set('tags', [...(post.tags || []), v]); setTagInput('')
    }
  }

  // ── AI Actions ────────────────────────────────────────────────────────────
  async function aiMeta() {
    if (!post.title) { showToast('Add a title first'); return }
    setAiLoading('meta')
    const r = await aiCall(
      'You are an SEO expert for DoorStep Diva, an Indian at-home beauty salon serving Delhi NCR, Lucknow & Ayodhya. Write ONLY a meta description — 140–155 characters, no quotes, no label.',
      `Title: "${post.title}"\nCategory: ${post.category}\nFocus keyword: ${post.focus_keyword}\nContent snippet: ${(post.content || '').slice(0, 400)}`
    )
    set('meta_desc', r.trim().slice(0, 160)); setAiLoading(null)
  }

  async function aiTags() {
    if (!post.title) { showToast('Add a title first'); return }
    setAiLoading('tags')
    const r = await aiCall(
      'You are an SEO expert for an Indian at-home beauty salon. Return ONLY a JSON array of 5 tag strings. No explanation, no markdown backticks.',
      `Blog post title: "${post.title}"\nCategory: ${post.category}\nKeyword: ${post.focus_keyword}`
    )
    try {
      const arr: string[] = JSON.parse(r.replace(/```json|```/g, '').trim())
      const merged = [...new Set([...(post.tags || []), ...arr])].slice(0, 10)
      set('tags', merged); showToast(`✓ Added ${arr.length} AI tags`)
    } catch { showToast('Could not parse AI tags — try again') }
    setAiLoading(null)
  }

  async function aiSeoTips() {
    if (!post.title && !post.content) { showToast('Write some content first'); return }
    setAiLoading('tips'); setAiTipsText('Analysing your post…')
    const r = await aiCall(
      'You are an SEO expert for DoorStep Diva (Indian at-home beauty salon, mydoorstepdiva.com). Give exactly 3 short, actionable, numbered SEO tips for this blog post. Be specific.',
      `Title: "${post.title}"\nMeta desc: ${post.meta_desc}\nWord count: ${wordCount(post.content || '')}\nFocus keyword: ${post.focus_keyword}\nTags: ${(post.tags || []).join(', ')}\nContent: ${(post.content || '').slice(0, 500)}`
    )
    setAiTipsText(r); setAiLoading(null)
  }

  async function aiExcerpt() {
    if (!post.content) { showToast('Write content first'); return }
    setAiLoading('excerpt')
    const r = await aiCall(
      'You are a content writer for DoorStep Diva, an Indian at-home beauty salon. Write ONLY a 1-2 sentence excerpt, max 150 characters. No quotes, no label.',
      `Title: "${post.title}"\nContent: ${(post.content || '').slice(0, 600)}`
    )
    set('excerpt', r.trim().slice(0, 160)); setAiLoading(null); showToast('✓ Excerpt generated')
  }

  // ── Computed values ───────────────────────────────────────────────────────
  const slug = post.slug || ''
  const { score, checks } = seoScore({
    title: post.title || '', metaTitle: post.meta_title || '',
    metaDesc: post.meta_desc || '', content: post.content || '',
    hasFeatImg: !!(post.featured_image), imageAlt: post.image_alt || '',
    tags: post.tags || [], focusKeyword: post.focus_keyword || '', slug,
  })
  const kwResult = keywordScore(
    post.focus_keyword || '', post.title || '',
    post.content || '', slug, post.meta_desc || ''
  )
  const scoreColor = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444'
  const circ = 138.2
  const dash = circ - (score / 100) * circ
  const mtLen = (post.meta_title || post.title || '').length
  const mdLen = (post.meta_desc || '').length

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': post.schema_type || 'Article',
    headline: post.title,
    description: post.meta_desc || post.excerpt,
    image: post.featured_image,
    datePublished: post.published_at || new Date().toISOString().split('T')[0],
    dateModified: post.updated_at || new Date().toISOString().split('T')[0],
    url: post.canonical_url || `${SITE}/blog/${slug}`,
    author: { '@type': 'Organization', name: 'DoorStep Diva', url: SITE },
    publisher: {
      '@type': 'Organization', name: 'DoorStep Diva',
      logo: { '@type': 'ImageObject', url: 'https://res.cloudinary.com/dzh0mxzbg/image/upload/v1777175012/photo_2026-04-23_18-21-35_yvnhdd.jpg' },
    },
  }, null, 2)

  const ogPreview = [
    `og:title       → ${post.title || '(add title)'}`,
    `og:description → ${(post.meta_desc || '(add meta desc)').slice(0, 100)}`,
    `og:url         → ${post.canonical_url || SITE + '/blog/' + slug}`,
    `og:image       → ${post.featured_image || '(add featured image)'}`,
    `og:type        → article`,
    `twitter:card   → summary_large_image`,
  ].join('\n')

  const filteredPosts = posts.filter(p =>
    listFilter === 'all' ? true : p.status === listFilter
  )

  // ─── LIST VIEW ─────────────────────────────────────────────────────────────
  if (view === 'list') return (
    <div style={{ fontFamily: 'var(--font-poppins,sans-serif)', background: '#fff9f7', minHeight: '100vh', color: '#1a1a1a' }}>
      <Toast msg={toast} />
      <div style={{
        background: 'white', borderBottom: '1px solid rgba(196,118,138,0.15)',
        padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9, flexShrink: 0,
            background: 'linear-gradient(135deg,#C4768A,#8B3A52)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 12, fontWeight: 700,
          }}>DD</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Blog Admin</div>
            <div style={{ fontSize: 11, color: '#aaa' }}>DoorStep Diva · SEO Manager</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a href={`${SITE}/sitemap.xml`} target="_blank" rel="noreferrer" style={{
            fontSize: 12, color: '#8B3A52', textDecoration: 'none',
            padding: '7px 12px', borderRadius: 8, border: '1px solid rgba(196,118,138,0.25)',
          }}>Sitemap ↗</a>
          <button style={S.btnPrimary} onClick={newPost}>+ New Post</button>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: '32px auto', padding: '0 24px' }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Total Posts', val: posts.length, color: '#8B3A52' },
            { label: 'Published', val: posts.filter(p => p.status === 'published').length, color: '#22c55e' },
            { label: 'Drafts', val: posts.filter(p => p.status === 'draft').length, color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} style={{ ...S.card, flex: 1, padding: '14px 18px' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 11, color: '#aaa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          {(['all', 'published', 'draft'] as const).map(f => (
            <button key={f} onClick={() => setListFilter(f)} style={{
              ...S.btn, fontSize: 12, textTransform: 'capitalize',
              background: listFilter === f ? 'rgba(139,58,82,0.08)' : 'transparent',
              borderColor: listFilter === f ? 'rgba(139,58,82,0.4)' : 'rgba(196,118,138,0.2)',
              color: listFilter === f ? '#8B3A52' : '#888',
              fontWeight: listFilter === f ? 600 : 400,
            }}>{f}</button>
          ))}
        </div>

        {/* Posts list */}
        {filteredPosts.length === 0 ? (
          <div style={{ ...S.card, textAlign: 'center', padding: 56 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✍️</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#555' }}>
              {listFilter === 'all' ? 'No posts yet' : `No ${listFilter} posts`}
            </div>
            <div style={{ fontSize: 13, color: '#aaa', marginTop: 6, marginBottom: 20 }}>
              {listFilter === 'all' ? 'Write your first blog post to start ranking on Google' : `Switch to "all" to see other posts`}
            </div>
            {listFilter === 'all' && <button style={S.btnPrimary} onClick={newPost}>Write First Post</button>}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredPosts.map(p => (
              <div key={p.id} style={{ ...S.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title || 'Untitled'}</span>
                    <span style={{
                      flexShrink: 0, fontSize: 10, padding: '2px 8px', borderRadius: 12, fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      background: p.status === 'published' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                      color: p.status === 'published' ? '#166534' : '#92400e',
                      border: `1px solid ${p.status === 'published' ? 'rgba(34,197,94,0.25)' : 'rgba(245,158,11,0.25)'}`,
                    }}>{p.status}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#bbb' }}>
                    /blog/{p.slug}
                    {p.category && ` · ${p.category}`}
                    {` · ${wordCount(p.content || '')} words`}
                    {p.focus_keyword && <span style={{ color: '#C4768A' }}> · kw: {p.focus_keyword}</span>}
                    {p.published_at && ` · ${new Date(p.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {p.status === 'published' && (
                    <a href={`${SITE}/blog/${p.slug}`} target="_blank" rel="noreferrer"
                      style={{ ...S.btn, textDecoration: 'none', fontSize: 12 }}>View ↗</a>
                  )}
                  <button style={S.btn} onClick={() => editPost(p)}>Edit</button>
                  <button style={{ ...S.btn, color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }} onClick={() => deletePost(p.id!)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  // ─── EDITOR VIEW ───────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: 'var(--font-poppins,sans-serif)', background: '#fff9f7', minHeight: '100vh', color: '#1a1a1a' }}>
      <Toast msg={toast} />

      {/* Sticky top bar */}
      <div style={{
        background: 'white', borderBottom: '1px solid rgba(196,118,138,0.15)',
        padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{ ...S.btn, fontSize: 12 }} onClick={() => setView('list')}>← Posts</button>
          <span style={{
            fontSize: 10, padding: '3px 9px', borderRadius: 12, textTransform: 'uppercase',
            letterSpacing: '0.05em', fontWeight: 600,
            background: post.status === 'published' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
            color: post.status === 'published' ? '#166534' : '#92400e',
            border: `1px solid ${post.status === 'published' ? 'rgba(34,197,94,0.25)' : 'rgba(245,158,11,0.25)'}`,
          }}>{post.status || 'draft'}</span>
          {post.id && <span style={{ fontSize: 11, color: '#ddd', fontFamily: 'monospace' }}>#{post.id.slice(0, 8)}</span>}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={S.btn} onClick={() => savePost('draft')} disabled={saving}>Save Draft</button>
          <button style={S.btnPrimary} onClick={() => savePost('published')} disabled={saving}>
            {saving ? 'Saving…' : post.status === 'published' ? 'Update' : 'Publish →'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 330px', maxWidth: 1300, margin: '0 auto' }}>

        {/* ── Left column ──────────────────────────────────────────────────── */}
        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Title + Slug */}
          <div style={S.card}>
            <Label>Post Title</Label>
            <input
              ref={titleRef}
              style={{ ...S.input, fontSize: 18, fontWeight: 600, marginBottom: 10 }}
              placeholder="Write a compelling title…"
              value={post.title || ''}
              onChange={e => set('title', e.target.value)}
            />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#bbb', flexShrink: 0, fontFamily: 'monospace' }}>/blog/</span>
              <input
                style={{ ...S.input, fontSize: 12, color: '#8B3A52', fontFamily: 'monospace' }}
                value={post.slug || ''}
                onChange={e => { set('slug', e.target.value); set('canonical_url', `${SITE}/blog/${e.target.value}`) }}
              />
            </div>
            <div style={{ fontSize: 11, color: '#ddd', marginTop: 4 }}>
              {SITE}/blog/<span style={{ color: '#C4768A' }}>{slug || 'your-post-slug'}</span>
            </div>
          </div>

          {/* Content */}
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Label>Content</Label>
              <span style={{ fontSize: 12, color: '#bbb' }}>
                {wordCount(post.content || '')} words · {readTime(post.content || '')} min read
              </span>
            </div>
            <div style={{
              display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8,
              padding: '6px 8px', background: 'rgba(196,118,138,0.04)', borderRadius: 8,
            }}>
              {['## H2', '### H3', '**Bold**', '- List', '> Quote'].map(h => (
                <span key={h} style={{
                  fontSize: 11, color: '#aaa', padding: '2px 7px', borderRadius: 4,
                  background: 'white', fontFamily: 'monospace',
                  border: '1px solid rgba(196,118,138,0.1)',
                }}>{h}</span>
              ))}
            </div>
            <textarea
              style={{ ...S.input, minHeight: 340, resize: 'vertical', lineHeight: 1.85 }}
              placeholder={`Write your blog post here (aim for 600+ words).\n\nFormatting tips:\n## Section heading\n### Sub-heading\n**bold text**\n- bullet point\n> blockquote\n\nSEO tips:\n• Answer the main question in the first paragraph\n• Mention Lucknow / Delhi NCR naturally\n• End with a call-to-action`}
              value={post.content || ''}
              onChange={e => set('content', e.target.value)}
            />
            {post.content && !post.content.toLowerCase().includes('lucknow') && !post.content.toLowerCase().includes('delhi') && (
              <div style={{
                marginTop: 8, fontSize: 12, color: '#92400e',
                padding: '7px 10px', background: 'rgba(245,158,11,0.08)',
                borderRadius: 8, border: '1px solid rgba(245,158,11,0.2)',
              }}>
                💡 Tip: Mention "Lucknow", "Delhi NCR" or "at-home" for local SEO bonus
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Label>Excerpt</Label>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={S.btnAi} onClick={() => set('excerpt', autoExcerpt(post.content || ''))}>Auto</button>
                <button style={S.btnAi} onClick={aiExcerpt} disabled={aiLoading === 'excerpt'}>
                  {aiLoading === 'excerpt' ? '…' : '✦ AI'}
                </button>
              </div>
            </div>
            <textarea
              style={{ ...S.input, resize: 'vertical' }} rows={2}
              placeholder="Short summary shown in blog listing and social shares…"
              value={post.excerpt || ''}
              onChange={e => set('excerpt', e.target.value)}
            />
            <div style={{ fontSize: 11, color: '#ddd', marginTop: 3 }}>
              {(post.excerpt || '').length}/160 — auto-filled on save if empty
            </div>
          </div>

          {/* Featured Image */}
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <Label>Featured Image</Label>
              <button style={S.btn} onClick={() => fileRef.current?.click()}>Upload File</button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
              const file = e.target.files?.[0]; if (!file) return
              const reader = new FileReader()
              reader.onload = ev => set('featured_image', ev.target?.result as string)
              reader.readAsDataURL(file)
            }} />
            {post.featured_image ? (
              <div style={{ position: 'relative', height: 180, borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}>
                <img src={post.featured_image} alt="featured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button onClick={() => set('featured_image', '')} style={{
                  position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.55)',
                  color: 'white', border: 'none', borderRadius: 6, padding: '3px 9px', fontSize: 12, cursor: 'pointer',
                }}>Remove</button>
              </div>
            ) : (
              <div onClick={() => fileRef.current?.click()} style={{
                height: 110, border: '2px dashed rgba(196,118,138,0.35)', borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 6, cursor: 'pointer', color: '#ccc', fontSize: 13, marginBottom: 10,
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C4768A" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" />
                </svg>
                Click to upload · or paste URL below
              </div>
            )}
            <Label>Cloudinary / Image URL</Label>
            <input
              style={{ ...S.input, marginBottom: 8 }}
              placeholder="https://res.cloudinary.com/…"
              value={post.featured_image?.startsWith('data:') ? '' : post.featured_image || ''}
              onChange={e => set('featured_image', e.target.value)}
            />
            <Label>Alt Text (SEO + Accessibility)</Label>
            <input
              style={S.input}
              placeholder="e.g. Bridal makeup at home in Lucknow by DoorStep Diva"
              value={post.image_alt || ''}
              onChange={e => set('image_alt', e.target.value)}
            />
          </div>

          {/* Category + Focus Keyword + Tags */}
          <div style={S.card}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <Label>Category</Label>
                <select style={S.input} value={post.category || ''} onChange={e => set('category', e.target.value)}>
                  <option value="">Select…</option>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <Label>Focus Keyword</Label>
                <input
                  style={S.input}
                  placeholder="e.g. bridal makeup Lucknow"
                  value={post.focus_keyword || ''}
                  onChange={e => set('focus_keyword', e.target.value)}
                />
              </div>
            </div>
            <Label>Tags</Label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input
                style={{ ...S.input, flex: 1 }}
                placeholder="Add a tag and press Enter…"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { addTag(); e.preventDefault() } }}
              />
              <button style={S.btn} onClick={addTag}>Add</button>
              <button style={S.btnAi} onClick={aiTags} disabled={aiLoading === 'tags'}>
                {aiLoading === 'tags' ? '…' : '✦ AI Tags'}
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {(post.tags || []).map(t => (
                <span key={t} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px',
                  borderRadius: 20, fontSize: 12, background: 'rgba(196,118,138,0.1)',
                  border: '1px solid rgba(196,118,138,0.2)', color: '#8B3A52',
                }}>
                  {t}
                  <button onClick={() => set('tags', (post.tags || []).filter(x => x !== t))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#C4768A', padding: 0 }}>×</button>
                </span>
              ))}
              {(post.tags || []).length === 0 && (
                <span style={{ fontSize: 12, color: '#ddd', fontStyle: 'italic' }}>No tags yet</span>
              )}
            </div>
          </div>

        </div>

        {/* ── Right sidebar ─────────────────────────────────────────────────── */}
        <div style={{
          borderLeft: '1px solid rgba(196,118,138,0.1)', background: 'white',
          padding: 18, display: 'flex', flexDirection: 'column', gap: 18,
          position: 'sticky', top: 57, height: 'calc(100vh - 57px)', overflowY: 'auto',
        }}>

          {/* SEO Score ring */}
          <div style={{ padding: 14, background: '#fdf8f9', borderRadius: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <svg width="62" height="62" viewBox="0 0 56 56" style={{ flexShrink: 0 }}>
                <circle cx="28" cy="28" r="22" fill="none" stroke="#f0e0e5" strokeWidth="5" />
                <circle cx="28" cy="28" r="22" fill="none" stroke={scoreColor} strokeWidth="5"
                  strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dash}
                  transform="rotate(-90 28 28)" style={{ transition: 'all 0.4s ease' }} />
                <text x="28" y="33" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1a1a1a">{score}</text>
              </svg>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: scoreColor }}>
                  {score >= 70 ? 'Good SEO ✓' : score >= 40 ? 'Needs Work' : 'Poor SEO'}
                </div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2, lineHeight: 1.4 }}>
                  {score >= 70 ? 'Ready to publish' : score >= 40 ? 'Fix red items first' : 'Fill in all fields'}
                </div>
              </div>
            </div>
          </div>

          {/* SEO Checklist */}
          <div>
            <Label>SEO Checklist</Label>
            {checks.map((c, i) => (
              <div key={i} style={{
                display: 'flex', gap: 8, padding: '5px 0',
                borderBottom: '1px solid rgba(0,0,0,0.04)', fontSize: 12, lineHeight: 1.4,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 4,
                  background: c.ok ? '#22c55e' : c.warn ? '#f59e0b' : '#ef4444',
                }} />
                <span style={{ color: c.ok ? '#555' : c.warn ? '#92400e' : '#ef4444' }}>{c.msg}</span>
              </div>
            ))}
          </div>

          {/* Keyword analysis */}
          {post.focus_keyword && (
            <div>
              <Label>Keyword: "{post.focus_keyword}"</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ flex: 1, height: 5, background: '#f0e0e5', borderRadius: 4 }}>
                  <div style={{
                    width: `${kwResult.score}%`, height: '100%',
                    background: kwResult.score >= 70 ? '#22c55e' : '#f59e0b',
                    borderRadius: 4, transition: 'width 0.4s ease',
                  }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#8B3A52', flexShrink: 0 }}>{kwResult.score}%</span>
              </div>
              {kwResult.checks.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, fontSize: 12, padding: '2px 0' }}>
                  <span style={{ color: c.ok ? '#22c55e' : '#ef4444' }}>{c.ok ? '✓' : '✗'}</span>
                  <span style={{ color: '#666' }}>{c.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div>
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.08)', marginBottom: 12 }}>
              {(['seo', 'schema', 'social'] as const).map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{
                  padding: '5px 10px', fontSize: 12, border: 'none', background: 'none',
                  cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize',
                  borderBottom: `2px solid ${activeTab === t ? '#8B3A52' : 'transparent'}`,
                  color: activeTab === t ? '#8B3A52' : '#888',
                  fontWeight: activeTab === t ? 600 : 400,
                }}>{t}</button>
              ))}
            </div>

            {activeTab === 'seo' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Label>Meta Title</Label>
                    <span style={{ fontSize: 11, color: mtLen <= 60 ? '#22c55e' : '#ef4444' }}>{mtLen}/60</span>
                  </div>
                  <input style={S.input} placeholder="Defaults to post title"
                    value={post.meta_title || ''} onChange={e => set('meta_title', e.target.value)} />
                  {/* SERP Preview */}
                  <div style={{ marginTop: 8, padding: '10px 12px', background: '#f8f9fa', borderRadius: 8, border: '1px solid #e8eaed' }}>
                    <div style={{ fontSize: 10, color: '#888', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>SERP Preview</div>
                    <div style={{ fontSize: 13, color: '#1a0dab', fontWeight: 500 }}>
                      {(post.meta_title || post.title || 'Post Title')} | DoorStep Diva
                    </div>
                    <div style={{ fontSize: 11, color: '#006621', marginTop: 1 }}>
                      {SITE}/blog/{slug || 'your-slug'}
                    </div>
                    <div style={{ fontSize: 12, color: '#545454', marginTop: 2, lineHeight: 1.4 }}>
                      {post.meta_desc || 'Your meta description will appear here…'}
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Label>Meta Description</Label>
                    <span style={{ fontSize: 11, color: mdLen >= 120 && mdLen <= 160 ? '#22c55e' : mdLen > 160 ? '#ef4444' : '#f59e0b' }}>{mdLen}/160</span>
                  </div>
                  <textarea
                    style={{ ...S.input, resize: 'vertical' }} rows={3}
                    placeholder="Compelling description for Google search results…"
                    value={post.meta_desc || ''}
                    onChange={e => set('meta_desc', e.target.value)}
                  />
                  <button style={{ ...S.btnAi, width: '100%', marginTop: 6 }} onClick={aiMeta} disabled={aiLoading === 'meta'}>
                    {aiLoading === 'meta' ? 'Writing…' : '✦ AI Write Meta Description'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'schema' && (
              <div>
                <Label>Schema Type</Label>
                <select style={{ ...S.input, marginBottom: 10 }} value={post.schema_type || 'Article'}
                  onChange={e => set('schema_type', e.target.value)}>
                  <option value="Article">Article (blog posts)</option>
                  <option value="HowTo">HowTo (step-by-step guides)</option>
                  <option value="FAQPage">FAQPage (Q&amp;A posts)</option>
                </select>
                <Label>Generated JSON-LD Preview</Label>
                <pre style={{
                  fontSize: 10, fontFamily: 'monospace', background: '#fdf8f9', borderRadius: 8,
                  padding: 10, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                  maxHeight: 200, overflowY: 'auto', color: '#555', lineHeight: 1.5,
                  border: '1px solid rgba(196,118,138,0.1)',
                }}>{schemaJson}</pre>
                <div style={{ fontSize: 11, color: '#aaa', marginTop: 6 }}>
                  Auto-injected into &lt;head&gt; on the post page
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div>
                <Label>OG / Twitter Preview</Label>
                {post.featured_image && (
                  <div style={{ position: 'relative', height: 110, borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
                    <img src={post.featured_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'flex-end', padding: 8 }}>
                      <div style={{ color: 'white', fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>
                        {(post.title || '').slice(0, 60)}
                      </div>
                    </div>
                  </div>
                )}
                <pre style={{
                  fontSize: 10, fontFamily: 'monospace', background: '#fdf8f9', borderRadius: 8,
                  padding: 10, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                  color: '#555', lineHeight: 1.6, border: '1px solid rgba(196,118,138,0.1)',
                }}>{ogPreview}</pre>
              </div>
            )}
          </div>

          {/* AI SEO Tips */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Label>AI SEO Tips</Label>
              <button style={S.btnAi} onClick={aiSeoTips} disabled={!!aiLoading}>
                {aiLoading === 'tips' ? '…' : '✦ Analyse'}
              </button>
            </div>
            <div style={{
              fontSize: 12, lineHeight: 1.7, color: '#555', padding: '10px 12px',
              background: 'rgba(196,118,138,0.04)', borderRadius: 8,
              border: '1px solid rgba(196,118,138,0.12)', minHeight: 56, whiteSpace: 'pre-wrap',
            }}>
              {aiLoading === 'tips' ? 'Analysing your post…' : aiTipsText || 'Click "Analyse" for personalised SEO tips.'}
            </div>
          </div>

          {/* Advanced SEO */}
          <div>
            <button
              style={{ ...S.btn, width: '100%', fontSize: 12, color: '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? '▲' : '▼'} Advanced SEO
            </button>
            {showAdvanced && (
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <Label>Canonical URL</Label>
                  <input style={S.input} value={post.canonical_url || ''} onChange={e => set('canonical_url', e.target.value)} />
                  <div style={{ fontSize: 11, color: '#ddd', marginTop: 3 }}>Only change for duplicate content pages</div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px',
                  background: 'rgba(239,68,68,0.04)', borderRadius: 8, border: '1px solid rgba(239,68,68,0.15)',
                }}>
                  <input type="checkbox" id="noindex" checked={!!post.noindex} onChange={e => set('noindex', e.target.checked)} style={{ marginTop: 2 }} />
                  <div>
                    <label htmlFor="noindex" style={{ fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#ef4444' }}>noindex this page</label>
                    <div style={{ fontSize: 11, color: '#aaa' }}>Hides from Google. Use with extreme caution.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sitemap badge */}
          <div style={{
            padding: '10px 12px', background: 'rgba(196,118,138,0.04)', borderRadius: 8,
            border: '1px solid rgba(196,118,138,0.12)', fontSize: 12, color: '#888',
          }}>
            <div style={{ fontWeight: 600, color: '#8B3A52', marginBottom: 3 }}>🗺 Auto Sitemap</div>
            Auto-added to{' '}
            <a href={`${SITE}/sitemap.xml`} target="_blank" rel="noreferrer" style={{ color: '#C4768A' }}>sitemap.xml</a>
            {' '}when published.
          </div>

        </div>
      </div>
    </div>
  )
}