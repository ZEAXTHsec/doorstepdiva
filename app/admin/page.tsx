'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authed') === 'true') {
      router.replace('/admin/bookings')
    }
  }, [router])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    if (!pw) return setError('Enter the admin password.')
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/settings', {
      headers: { 'x-admin-password': pw },
    })
    if (res.ok) {
      sessionStorage.setItem('admin_authed', 'true')
      sessionStorage.setItem('admin_password', pw)
      router.replace('/admin/bookings')
    } else {
      setError('Incorrect password.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-petal flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 border border-blush/20 shadow-lg text-center">
        <div className="font-playfair text-3xl font-bold text-stone mb-1">DoorStep Diva</div>
        <p className="font-poppins text-xs text-stone-light mb-8">Admin Panel</p>
        <form onSubmit={login}>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Enter admin password"
            className="w-full border border-blush/40 rounded-xl px-4 py-3 font-poppins text-sm text-stone placeholder-stone-light/50 focus:outline-none focus:border-rose/50 transition-colors mb-3 text-center"
            autoFocus
          />
          {error && <p className="font-poppins text-xs text-red-600 mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-press w-full font-poppins text-sm font-semibold px-6 py-3 bg-rose text-white hover:bg-mauve transition-colors rounded-full disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
