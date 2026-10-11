'use client'

import { useEffect, useRef } from 'react'

export default function LuxuryCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    if (window.matchMedia('(hover: none) or (pointer: coarse) or (prefers-reduced-motion: reduce)').matches) {
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let isVisible = false
    let isHovering = false
    let animationFrameId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) {
        isVisible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`
    }

    const onMouseLeave = () => {
      isVisible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const onMouseEnter = () => {
      isVisible = true
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const onMouseDown = () => {
      ring.classList.add('cursor-active')
    }

    const onMouseUp = () => {
      ring.classList.remove('cursor-active')
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    const animate = () => {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)

    const interactiveTargets = 'a, button, input, select, textarea, label, [role="button"], summary, .cursor-pointer, [onclick]'
    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(interactiveTargets)) {
        isHovering = true
        ring.classList.add('cursor-hover')
        dot.classList.add('cursor-hover')
      }
    }
    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(interactiveTargets)) {
        isHovering = false
        ring.classList.remove('cursor-hover')
        dot.classList.remove('cursor-hover')
      }
    }

    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] opacity-0 transition-opacity duration-300"
        style={{
          backgroundColor: '#8B3A52',
          boxShadow: '0 0 10px #C4768A, 0 0 20px rgba(139, 58, 82, 0.4)',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[99998] opacity-0 transition-all duration-200"
        style={{
          border: '1.5px solid rgba(196, 118, 138, 0.6)',
          background: 'radial-gradient(circle, rgba(196, 118, 138, 0.15) 0%, rgba(196, 118, 138, 0) 70%)',
        }}
      />
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          .cursor-hover {
            width: 56px !important;
            height: 56px !important;
            border-color: #8B3A52 !important;
            background: radial-gradient(circle, rgba(139, 58, 82, 0.22) 0%, rgba(196, 118, 138, 0) 70%) !important;
            box-shadow: 0 0 25px rgba(139, 58, 82, 0.35) !important;
          }
          .cursor-active {
            width: 26px !important;
            height: 26px !important;
            border-color: #8B3A52 !important;
            background-color: rgba(139, 58, 82, 0.3) !important;
          }
        }
      `}</style>
    </>
  )
}
