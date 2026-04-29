import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG_POSTS } from '@/app/_data/home'
import { IconArrowRight, IconClock } from '@/app/components/icons'

export default function Blog() {
  return (
    <section
      className="px-5 sm:px-8 md:px-16 py-24"
      aria-labelledby="blog-heading"
      style={{ background: '#fffaf9' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 reveal-fade">
          <div>
            <p className="font-poppins text-[11px] tracking-[0.3em] uppercase text-rose font-semibold mb-3">
              Beauty Tips &amp; Guides
            </p>
            <h2
              id="blog-heading"
              className="font-playfair text-4xl md:text-5xl font-bold text-stone"
            >
              From the{' '}
              <em
                className="italic"
                style={{
                  background: 'linear-gradient(120deg, #C4768A 20%, #8B3A52 80%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Blog
              </em>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-poppins text-sm font-semibold text-rose hover:gap-3 transition-all duration-200 flex-shrink-0"
          >
            View all posts <IconArrowRight />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {BLOG_POSTS.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="reveal-fade group rounded-2xl overflow-hidden bg-white hover:shadow-xl hover:shadow-rose/8 transition-all duration-400 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2 block"
              style={{
                border: '1px solid rgba(196,118,138,0.15)',
                '--reveal-delay': `${i * 0.1}s`,
              } as React.CSSProperties}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Category badge */}
                <span
                  className="absolute top-3 left-3 font-poppins text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.88)', color: '#8B3A52' }}
                >
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-poppins text-[10px] text-stone-light">{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-stone-light/40" />
                  <span className="inline-flex items-center gap-1 font-poppins text-[10px] text-stone-light">
                    <IconClock />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-playfair text-lg font-semibold text-stone leading-snug mb-2 group-hover:text-rose transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                <p className="font-poppins text-xs text-stone-light leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                <span
                  className="inline-flex items-center gap-1.5 font-poppins text-xs font-semibold text-rose group-hover:gap-2.5 transition-all duration-200"
                >
                  Read more <IconArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}