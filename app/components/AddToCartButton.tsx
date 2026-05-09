'use client'

import { useCart } from '@/app/context/CartContext'

type AddToCartButtonProps = {
  id: string
  name: string
  price: number
  duration: string
  image: string
  category: string
  href: string
  /** Full-width style for detail pages, inline for cards */
  variant?: 'full' | 'inline'
  className?: string
}

export default function AddToCartButton({
  id, name, price, duration, image, category, href,
  variant = 'full',
  className = '',
}: AddToCartButtonProps) {
  const { addItem, items, openCart } = useCart()
  const inCart = items.find(i => i.id === id)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({ id, name, price, duration, image, category, href })
  }

  const handleOpenCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openCart()
  }

  if (variant === 'inline') {
    return (
      <button
        onClick={inCart ? handleOpenCart : handleAdd}
        className={`btn-press inline-flex items-center gap-1.5 font-poppins text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 ${className}`}
        style={{
          background: inCart ? 'rgba(37,211,102,0.12)' : 'linear-gradient(135deg,#C4768A,#8B3A52)',
          color: inCart ? '#166534' : 'white',
          border: inCart ? '1px solid rgba(37,211,102,0.3)' : 'none',
        }}
      >
        {inCart ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Added ({inCart.quantity})
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </>
        )}
      </button>
    )
  }

  // Full variant
  return (
    <button
      onClick={inCart ? handleOpenCart : handleAdd}
      className={`btn-press inline-flex items-center justify-center gap-2 font-poppins text-sm font-semibold px-8 py-4 rounded-full transition-all duration-200 ${className}`}
      style={{
        background: inCart ? '#25D366' : 'linear-gradient(135deg,#C4768A,#8B3A52)',
        color: 'white',
        boxShadow: inCart
          ? '0 6px 20px rgba(37,211,102,0.25)'
          : '0 8px 24px rgba(139,58,82,0.25)',
      }}
    >
      {inCart ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Added to Cart — View ({inCart.quantity})
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add to Cart · ₹{price.toLocaleString('en-IN')}
        </>
      )}
    </button>
  )
}
