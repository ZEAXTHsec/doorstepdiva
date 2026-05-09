'use client'
import { useState, useEffect, useRef } from 'react'

type Section = {
  id: string
  label: string
  services: string[]
}

export function ServiceStickyNav({ sections }: { sections: Section[] }) {
  const [active, setActive]   = useState(sections[0]?.id ?? '')
  const [query, setQuery]     = useState('')
  const [focused, setFocused] = useState(false)
  const searchRef             = useRef<HTMLDivElement>(null)

  // Highlight active section on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [sections])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setQuery('')
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 90
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const allServices = sections.flatMap(s => s.services)
  const results = query.length > 1
    ? allServices.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : []

  const matchSection = (service: string) =>
    sections.find(s => s.services.includes(service))

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-blush/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 flex items-center gap-3 py-2.5 overflow-x-auto scrollbar-hide">

        {/* Section tabs — animated underline on active */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative font-poppins text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                active === id
                  ? 'bg-rose text-white shadow-sm shadow-rose/30'
                  : 'text-stone-light hover:text-rose hover:bg-blush/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-blush/40 flex-shrink-0" />

        {/* Search with close-on-outside-click */}
        <div ref={searchRef} className="relative flex-shrink-0">
          <div className="relative">
            {/* Search icon */}
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-light/60 pointer-events-none"
              width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="Search services…"
              className="font-poppins text-xs text-stone placeholder:text-stone-light/60 bg-petal border border-blush/30 rounded-full pl-8 pr-4 py-2 outline-none focus:border-rose/50 focus:ring-2 focus:ring-rose/10 w-44 transition-all"
            />
            {/* Clear button when typing */}
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-light/60 hover:text-rose transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          {/* Results dropdown */}
          {results.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-blush/20 overflow-hidden z-50">
              <p className="font-poppins text-[10px] text-stone-light/60 tracking-widest uppercase px-4 pt-3 pb-1">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              {results.slice(0, 6).map(service => {
                const sec = matchSection(service)
                return (
                  <button
                    key={service}
                    onClick={() => { if (sec) scrollTo(sec.id); setQuery(''); setFocused(false) }}
                    className="w-full text-left px-4 py-3 font-poppins text-sm text-stone hover:bg-petal hover:text-rose transition-colors border-b border-blush/10 last:border-0 flex items-center justify-between gap-3"
                  >
                    <span>{service}</span>
                    {sec && (
                      <span className="text-rose/50 text-xs flex-shrink-0">→ {sec.label}</span>
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* No results state */}
          {query.length > 1 && results.length === 0 && focused && (
            <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-blush/20 z-50 px-4 py-4">
              <p className="font-poppins text-sm text-stone-light text-center">No results for &ldquo;{query}&rdquo;</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}