'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type BookingSettings = {
  id: 1
  calendar_enabled: boolean
  deposit_amount: number
}

export default function AdminSettingsPage() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [settings, setSettings] = useState<BookingSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const getHeaders = () => {
    const pw = typeof window !== 'undefined' ? sessionStorage.getItem('admin_password') : ''
    return { 'x-admin-password': pw || '', 'Content-Type': 'application/json' }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_authed') !== 'true') {
      router.replace('/admin')
      return
    }
    setAuthed(true)
    fetchSettings()
  }, [router])

  async function fetchSettings() {
    const res = await fetch('/api/admin/settings', { headers: getHeaders() })
    const json = await res.json()
    if (res.ok && json) setSettings(json)
    setLoading(false)
  }

  async function save(updates: Partial<BookingSettings>) {
    setSaving(true)
    setMsg('')
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    })
    if (res.ok) {
      const json = await res.json()
      setSettings(json)
      setMsg('Saved.')
    } else {
      setMsg('Failed to save.')
    }
    setSaving(false)
    setTimeout(() => setMsg(''), 2000)
  }

  async function quickAction(action: string) {
    setSaving(true)
    setMsg('')
    const h = getHeaders()

    if (action === 'block-today') {
      const today = new Date().toISOString().split('T')[0]
      const res = await fetch('/api/admin/availability', {
        method: 'PATCH',
        headers: h,
        body: JSON.stringify({ action: 'block_date', date: today, reason: 'Quick block' }),
      })
      setMsg(res.ok ? 'Today blocked.' : 'Failed.')
    }
    if (action === 'block-tomorrow') {
      const d = new Date(); d.setDate(d.getDate() + 1)
      const date = d.toISOString().split('T')[0]
      const res = await fetch('/api/admin/availability', {
        method: 'PATCH',
        headers: h,
        body: JSON.stringify({ action: 'block_date', date, reason: 'Quick block' }),
      })
      setMsg(res.ok ? 'Tomorrow blocked.' : 'Failed.')
    }
    setSaving(false)
    setTimeout(() => setMsg(''), 2000)
  }

  if (!authed || loading) return null

  return (
    <div className="min-h-screen bg-petal">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Nav */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-stone">Settings</h1>
            <p className="font-poppins text-xs text-stone-light">Global booking settings</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/admin/bookings')} className="font-poppins text-xs font-semibold px-4 py-2 rounded-full border border-blush/30 text-stone-light hover:border-rose/30 transition-colors">Bookings</button>
            <button onClick={() => router.push('/admin/availability')} className="font-poppins text-xs font-semibold px-4 py-2 rounded-full border border-blush/30 text-stone-light hover:border-rose/30 transition-colors">Availability</button>
            <button onClick={() => { sessionStorage.clear(); router.push('/admin') }} className="font-poppins text-xs font-semibold px-4 py-2 rounded-full border border-red/20 text-red-600 hover:bg-red-50 transition-colors">Logout</button>
          </div>
        </div>

        {/* Calendar Toggle */}
        <div className="bg-white rounded-2xl border border-blush/20 p-6 mb-4">
          <h2 className="font-playfair text-lg font-bold text-stone mb-1">Calendar Mode</h2>
          <p className="font-poppins text-xs text-stone-light mb-5">When ON, customers see a live calendar and pick their own slots. When OFF, customers pay a deposit and you confirm later.</p>
          <button
            onClick={() => save({ calendar_enabled: !settings?.calendar_enabled })}
            disabled={saving}
            className={`relative w-28 h-14 rounded-full transition-all duration-300 flex items-center ${
              settings?.calendar_enabled ? 'bg-green-500' : 'bg-stone-300'
            }`}
          >
            <span className={`absolute left-1.5 w-11 h-11 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
              settings?.calendar_enabled ? 'translate-x-[52px]' : 'translate-x-0'
            }`}>
              <span className={`text-lg ${settings?.calendar_enabled ? 'text-green-500' : 'text-stone-400'}`}>
                {settings?.calendar_enabled ? '✓' : '✕'}
              </span>
            </span>
          </button>
          <span className="ml-4 font-poppins text-sm font-semibold align-middle">
            {settings?.calendar_enabled ? (
              <span className="text-green-600">Calendar is LIVE — customers can book slots</span>
            ) : (
              <span className="text-stone-light">Calendar is OFF — deposit-only mode</span>
            )}
          </span>
        </div>

        {/* Deposit Amount */}
        <div className="bg-white rounded-2xl border border-blush/20 p-6 mb-4">
          <h2 className="font-playfair text-lg font-bold text-stone mb-1">Deposit Amount (₹)</h2>
          <p className="font-poppins text-xs text-stone-light mb-4">Charged when calendar mode is OFF. Customers pay this to secure a spot.</p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={settings?.deposit_amount || 0}
              onChange={e => {
                const v = parseInt(e.target.value) || 0
                setSettings(prev => prev ? { ...prev, deposit_amount: v } : null)
              }}
              className="w-28 border border-blush/30 rounded-xl px-4 py-2.5 font-poppins text-sm text-stone focus:outline-none focus:border-rose/50"
            />
            <button
              onClick={() => save({ deposit_amount: settings?.deposit_amount || 0 })}
              disabled={saving}
              className="btn-press font-poppins text-xs font-semibold px-6 py-2.5 bg-rose text-white hover:bg-mauve transition-colors rounded-full disabled:opacity-50"
            >Save</button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-blush/20 p-6 mb-4">
          <h2 className="font-playfair text-lg font-bold text-stone mb-1">Quick Actions</h2>
          <p className="font-poppins text-xs text-stone-light mb-4">Commonly used actions for managing availability quickly.</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => quickAction('block-today')} disabled={saving}
              className="font-poppins text-xs font-semibold px-5 py-2.5 bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors disabled:opacity-50">
              Block Today
            </button>
            <button onClick={() => quickAction('block-tomorrow')} disabled={saving}
              className="font-poppins text-xs font-semibold px-5 py-2.5 bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors disabled:opacity-50">
              Block Tomorrow
            </button>
            <button onClick={() => router.push('/admin/availability')}
              className="font-poppins text-xs font-semibold px-5 py-2.5 border border-rose/30 text-rose rounded-full hover:bg-rose/5 transition-colors">
              Manage Availability →
            </button>
          </div>
        </div>

        {/* Save feedback */}
        {msg && (
          <div className={`text-center font-poppins text-xs font-semibold px-4 py-3 rounded-xl ${msg.includes('Failed') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  )
}
