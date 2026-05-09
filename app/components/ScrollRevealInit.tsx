'use client'

import { useEffect } from 'react'

/**
 * ScrollRevealInit
 * ─────────────────
 * Mounts an IntersectionObserver that watches every .reveal element
 * and adds .visible when it enters the viewport.
 *
 * Usage in any component:
 *   <div className="reveal">...</div>                    ← fade up
 *   <div className="reveal reveal-scale">...</div>       ← scale in
 *   <div className="reveal reveal-d2">...</div>          ← 160ms delay
 *
 * This component renders nothing — it's purely a side-effect hook
 * mounted once at the layout level.
 */
export default function ScrollRevealInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Unobserve after reveal so it only fires once
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,      // trigger when 12% of element is visible
        rootMargin: '0px 0px -40px 0px',  // slight bottom offset
      }
    )

    // Observe all current .reveal elements
    const observe = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el)
      })
    }

    observe()

    // Also re-run on route changes (for Next.js soft navigation)
    // Small delay lets new page content mount first
    const mutationObserver = new MutationObserver(() => {
      setTimeout(observe, 50)
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}