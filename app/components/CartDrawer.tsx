'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, itemCount, subtotal, isOpen, closeCart, openCart } = useCart()
  const router = useRouter()
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

              {/* WhatsApp Checkout Button */}
              <a
                href={`https://wa.me/919129577514?text=${encodeURIComponent(
                  `Namaste DoorStep Diva! I would like to book these ${itemCount} services/add-ons at my doorstep:\n\n` +
                  items.map((i, idx) => `${idx + 1}. ${i.name} (×${i.quantity}) — ₹${(i.price * i.quantity).toLocaleString('en-IN')}`).join('\n') +
                  `\n\nTotal Estimate: ₹${subtotal.toLocaleString('en-IN')}\nPayment: Pay After Service (Zero Advance)\n\nPlease confirm artist availability!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 font-poppins text-sm font-semibold py-3.5 rounded-xl text-white transition-all duration-200 hover:opacity-95 active:scale-[0.98] bg-[#25D366]"
                style={{ boxShadow: '0 6px 20px rgba(37,211,102,0.28)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book All on WhatsApp · ₹{subtotal.toLocaleString('en-IN')}
              </a>

              {/* Checkout button — goes to booking page */}
              <button
                onClick={() => { closeCart(); router.push('/book') }}
                className="w-full font-poppins text-xs font-semibold py-3 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors"
              >
                Or Complete Online Booking Form →
              </button>

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="w-full font-poppins text-xs text-stone-light/60 hover:text-rose transition-colors py-1"
              >
                Clear cart
              </button>

              <p className="font-poppins text-[10px] text-stone-light/50 text-center">
                Zero Advance Payment • Pay securely via UPI or Cash after service completion.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  )
}
