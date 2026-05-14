'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCart } from '@/app/context/CartContext'

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, itemCount, subtotal, isOpen, closeCart, openCart } = useCart()
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    if (isOpen) {
      document.addEventListener('keydown', handler)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  // Close on overlay click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target === overlayRef.current) closeCart()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [closeCart])

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[70] transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(61,43,43,0.45)', backdropFilter: 'blur(2px)' }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[80] h-full w-full sm:w-[420px] flex flex-col transition-transform duration-350 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'white', boxShadow: '-8px 0 48px rgba(139,58,82,0.12)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(196,118,138,0.15)' }}
        >
          <div className="flex items-center gap-2.5">
            <h2 className="font-playfair text-lg font-bold text-stone">Your Cart</h2>
            {itemCount > 0 && (
              <span
                className="font-poppins text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(196,118,138,0.12)', color: '#8B3A52' }}
              >
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-light hover:text-rose hover:bg-rose/8 transition-colors"
            aria-label="Close cart"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{ background: 'rgba(196,118,138,0.08)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4768A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
            </div>
            <p className="font-playfair text-lg font-bold text-stone mb-2">Your cart is empty</p>
            <p className="font-poppins text-sm text-stone-light mb-6">
              Tap &ldquo;Add to Cart&rdquo; on any service to get started.
            </p>
            <button
              onClick={closeCart}
              className="font-poppins text-sm font-semibold px-6 py-2.5 rounded-full text-white transition-colors duration-200"
              style={{ background: 'linear-gradient(135deg,#C4768A,#8B3A52)' }}
            >
              Explore Services
            </button>
          </div>
        )}

        {/* Items list */}
        {items.length > 0 && (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-xl border transition-colors duration-150"
                  style={{ borderColor: 'rgba(196,118,138,0.12)', background: '#FDF8F9' }}
                >
                  {/* Image thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={item.href}
                      onClick={closeCart}
                      className="font-poppins text-sm font-semibold text-stone hover:text-rose transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="font-poppins text-[10px] text-stone-light mt-0.5">{item.category} · {item.duration}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-playfair text-sm font-bold text-stone">₹{item.price.toLocaleString('en-IN')}</span>

                      {/* Qty controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-stone-light hover:text-rose hover:bg-rose/8 transition-colors text-sm font-bold"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="font-poppins text-xs font-semibold text-stone w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-stone-light hover:text-rose hover:bg-rose/8 transition-colors text-sm font-bold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-stone-light/50 hover:text-red-400 hover:bg-red-50 transition-colors ml-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="px-5 py-4 flex-shrink-0 space-y-3"
              style={{ borderTop: '1px solid rgba(196,118,138,0.15)', background: 'white' }}
            >
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="font-poppins text-sm text-stone-light">Subtotal</span>
                <span className="font-playfair text-lg font-bold text-stone">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {/* Checkout button — Razorpay integration point */}
              <button
                className="w-full font-poppins text-sm font-semibold py-3.5 rounded-xl text-white transition-all duration-200 hover:opacity-95 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg,#C4768A,#8B3A52)', boxShadow: '0 6px 20px rgba(139,58,82,0.22)' }}
              >
                Proceed to Pay · ₹{subtotal.toLocaleString('en-IN')}
              </button>

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="w-full font-poppins text-xs text-stone-light/60 hover:text-rose transition-colors py-1"
              >
                Clear cart
              </button>

              <p className="font-poppins text-[10px] text-stone-light/50 text-center">
                Secure checkout via Razorpay. You can review before paying.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  )
}
