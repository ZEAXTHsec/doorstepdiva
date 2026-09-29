'use client'
import { useState, useEffect, useCallback, useTransition } from 'react'
import { useRouter } from 'next/navigation'

type Booking = {
  id: string
  created_at: string
  customer_name: string
  customer_phone: string
  customer_email: string
  customer_address: string
  service_type: string
  addons: string[]
  city: string
  artist_id: string
  appointment_date: string
  appointment_time: string
  payment_mode: string
  deposit_paid: boolean
  razorpay_order_id: string
  razorpay_payment_id: string
  total_estimate: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes: string
}

type Artist = { id: string; name: string; skill_type: string; active: boolean }

export default function AdminBookingsPage() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [artists, setArtists] = useState<Artist[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  // Filters
  const [fFrom, setFFrom] = useState('')
  const [fTo, setFTo] = useState('')
  const [fCity, setFCity] = useState('all')
  const [fStatus, setFStatus] = useState('all')
  const [fSearch, setFSearch] = useState('')
  const [page, setPage] = useState(0)
  const limit = 30

  // Expand & Edit
  const [expanded, setExpanded] = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Booking>>({})
  const [actionLoading, setActionLoading] = useState('')

  // Manual booking form
  const [showManual, setShowManual] = useState(false)
  const [manual, setManual] = useState({
    customer_name: '', customer_phone: '', customer_email: '', customer_address: '',
    city: 'delhi-ncr', service_type: '', appointment_date: '', appointment_time: '',
    artist_id: '', status: 'confirmed', notes: '',
  })

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
    fetchArtists()
  }, [router])

  const fetchBookings = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true)
    const params = new URLSearchParams()
    if (fFrom) params.set('from', fFrom)
    if (fTo) params.set('to', fTo)
    if (fCity && fCity !== 'all') params.set('city', fCity)
    if (fStatus && fStatus !== 'all') params.set('status', fStatus)
    if (fSearch) params.set('search', fSearch)
    params.set('limit', String(limit))
    params.set('offset', String(page * limit))

    try {
      const res = await fetch(`/api/admin/bookings?${params}`, { headers: getHeaders() })
      const json = await res.json()
      if (res.ok) {
        startTransition(() => {
          setBookings(json.bookings || [])
          setCount(json.count || 0)
          setLastUpdated(new Date())
        })
      }
    } catch (e) {
      console.error('Fetch bookings error:', e)
    } finally {
      setLoading(false)
    }
  }, [fFrom, fTo, fCity, fStatus, fSearch, page])

  const fetchArtists = async () => {
    try {
      const res = await fetch('/api/admin/availability', { headers: getHeaders() })
      const json = await res.json()
      if (res.ok) setArtists(json.artists || [])
    } catch (e) {
      console.error('Fetch artists error:', e)
    }
  }

  useEffect(() => {
    if (authed) fetchBookings()
  }, [authed, fetchBookings])

  // Auto-refresh interval (every 30s)
  useEffect(() => {
    if (!authed || !autoRefresh) return
    const interval = setInterval(() => {
      fetchBookings(true)
    }, 30000)
    return () => clearInterval(interval)
  }, [authed, autoRefresh, fetchBookings])

  async function doAction(id: string, updates: Partial<Booking>) {
    setActionLoading(id)
    const res = await fetch('/api/admin/bookings', {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ id, ...updates }),
    })
    if (res.ok) fetchBookings(true)
    setActionLoading('')
  }

  async function saveEdit(id: string) {
    await doAction(id, editForm)
    setEditing(null)
  }

  async function doDelete(id: string) {
    if (!confirm('Permanently delete this booking? This action cannot be undone.')) return
    setActionLoading(id)
    const res = await fetch('/api/admin/bookings', {
      method: 'DELETE',
      headers: getHeaders(),
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      fetchBookings(true)
    } else {
      const json = await res.json().catch(() => ({ error: 'Unknown error' }))
      alert('Delete failed: ' + (json.error || 'Something went wrong'))
    }
    setActionLoading('')
  }

  async function submitManual(e: React.FormEvent) {
    e.preventDefault()
    setActionLoading('__new__')
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...manual, addons: [], payment_mode: 'pay_on_service' }),
    })
    if (res.ok) {
      setShowManual(false)
      setManual({ customer_name: '', customer_phone: '', customer_email: '', customer_address: '', city: 'delhi-ncr', service_type: '', appointment_date: '', appointment_time: '', artist_id: '', status: 'confirmed', notes: '' })
      fetchBookings()
    }
    setActionLoading('')
  }

  function formatTime(t: string) {
    if (!t) return 'Flexible'
    const [h, m] = t.split(':').map(Number)
    const period = h >= 12 ? 'PM' : 'AM'
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
    return `${hour}:${m.toString().padStart(2, '0')} ${period}`
  }

  function getWhatsAppLink(b: Booking) {
    const cleanPhone = b.customer_phone.replace(/\D/g, '')
    const phone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone
    const cityName = b.city?.toLowerCase().includes('delhi') ? 'Delhi NCR' : b.city?.toLowerCase().includes('ayodhya') ? 'Ayodhya' : 'Lucknow'
    const msg = encodeURIComponent(
      `Hi ${b.customer_name}! This is DoorStep Diva Luxury At-Home Beauty Services.\n\nWe received your request for *${b.service_type}* in *${cityName}*. Our coordinator is confirming your artist dispatch and preferred timing window. Are you available for a quick chat?`
    )
    return `https://wa.me/${phone}?text=${msg}`
  }

  function copyForArtist(b: Booking) {
    const cityName = b.city?.toLowerCase().includes('delhi') ? 'Delhi NCR' : b.city?.toLowerCase().includes('ayodhya') ? 'Ayodhya' : 'Lucknow'
    const text = [
      `✨ DOORSTEP DIVA DISPATCH`,
      `👤 Client: ${b.customer_name}`,
      `📞 Phone: ${b.customer_phone}`,
      `📍 City: ${cityName}`,
      `🏠 Address: ${b.customer_address}`,
      `💅 Service: ${b.service_type}`,
      b.addons && b.addons.length > 0 ? `➕ Add-ons: ${b.addons.join(', ')}` : null,
      `📅 Timing: ${b.appointment_date || 'Callback / Flexible'} ${b.appointment_time ? formatTime(b.appointment_time) : ''}`.trim(),
      b.total_estimate ? `💰 Estimate: ₹${b.total_estimate.toLocaleString('en-IN')}` : null,
      `💳 Payment: ${b.payment_mode || 'Pay After Service'} ${b.deposit_paid ? '(Paid)' : '(Pay After Service)'}`,
      b.notes ? `📝 Notes: ${b.notes}` : null,
    ].filter(Boolean).join('\n')

    navigator.clipboard.writeText(text)
    setCopiedId(b.id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  // Metric computations from current dataset
  const pendingCount = bookings.filter(b => b.status === 'pending').length
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length
  const completedCount = bookings.filter(b => b.status === 'completed').length
  const delhiCount = bookings.filter(b => b.city?.toLowerCase().includes('delhi')).length
  const lucknowCount = bookings.filter(b => b.city?.toLowerCase().includes('lucknow')).length

  const totalPages = Math.ceil(count / limit)

  if (!authed) return null

  return (
    <div className="min-h-screen bg-[#FAF5F7] text-stone-900 pb-16">
      
      {/* ── TOP LUXURY BAR ── */}
      <header className="bg-white border-b border-[#EACCD6]/60 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-playfair text-xl sm:text-2xl font-bold tracking-tight text-[#8B3A52]">
              DoorStep Diva
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#8B3A52]/10 text-[#8B3A52]">
              Lead & Dispatch Desk
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Auto-refresh indicator */}
            <div className="hidden md:flex items-center gap-2 text-[11px] text-stone-500 mr-2">
              <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'}`} />
              <span>{autoRefresh ? 'Live Sync Active' : 'Live Sync Paused'}</span>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className="text-[10px] font-semibold text-[#8B3A52] underline ml-1"
              >
                {autoRefresh ? 'Pause' : 'Resume'}
              </button>
            </div>

            {/* Quick manual refresh */}
            <button
              onClick={() => fetchBookings()}
              disabled={loading}
              title="Refresh Bookings Now"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-stone-200 text-stone-700 hover:border-[#8B3A52] hover:text-[#8B3A52] transition-colors text-xs font-semibold flex items-center gap-1.5 bg-white"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={loading ? 'animate-spin' : ''}>
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
              </svg>
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => router.push('/admin/settings')}
              className="px-3 py-1.5 rounded-xl border border-stone-200 text-stone-700 hover:border-[#8B3A52] text-xs font-semibold transition-colors"
            >
              Settings
            </button>
            
            <button
              onClick={() => router.push('/admin/availability')}
              className="px-3 py-1.5 rounded-xl border border-stone-200 text-stone-700 hover:border-[#8B3A52] text-xs font-semibold transition-colors"
            >
              Artists
            </button>

            <button
              onClick={() => { sessionStorage.clear(); router.push('/admin') }}
              className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ── METRICS KPI BAR ── */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 border border-[#EACCD6]/40 shadow-sm">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">Total Leads</span>
            <div className="flex items-baseline gap-2">
              <span className="font-playfair text-2xl sm:text-3xl font-bold text-stone-900">{count}</span>
              <span className="text-[11px] text-stone-400">lifetime</span>
            </div>
          </div>

          <div className={`rounded-2xl p-4 border shadow-sm ${pendingCount > 0 ? 'bg-amber-50/60 border-amber-200 text-amber-900' : 'bg-white border-[#EACCD6]/40'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Pending Call</span>
              {pendingCount > 0 && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-playfair text-2xl sm:text-3xl font-bold text-amber-700">{pendingCount}</span>
              <span className="text-[11px] text-amber-600/80">needs action</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#EACCD6]/40 shadow-sm">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">Confirmed</span>
            <div className="flex items-baseline gap-2">
              <span className="font-playfair text-2xl sm:text-3xl font-bold text-emerald-600">{confirmedCount}</span>
              <span className="text-[11px] text-stone-400">ready to service</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#EACCD6]/40 shadow-sm">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">Delhi NCR Leads</span>
            <div className="flex items-baseline gap-2">
              <span className="font-playfair text-2xl sm:text-3xl font-bold text-[#8B3A52]">{delhiCount}</span>
              <span className="text-[11px] text-stone-400">expansion</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#EACCD6]/40 shadow-sm col-span-2 lg:col-span-1">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">Lucknow Leads</span>
            <div className="flex items-baseline gap-2">
              <span className="font-playfair text-2xl sm:text-3xl font-bold text-stone-900">{lucknowCount}</span>
              <span className="text-[11px] text-stone-400">base</span>
            </div>
          </div>
        </section>

        {/* ── ACTION BAR & FILTERS ── */}
        <div className="bg-white rounded-2xl border border-[#EACCD6]/60 p-4 sm:p-5 mb-6 shadow-sm">
          
          {/* Top row: Status Tabs & Add Manual */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
            {/* Status Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Bookings', count: count },
                { id: 'pending', label: 'Pending', count: pendingCount, highlight: true },
                { id: 'confirmed', label: 'Confirmed', count: confirmedCount },
                { id: 'completed', label: 'Completed', count: completedCount },
                { id: 'cancelled', label: 'Cancelled' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setFStatus(tab.id); setPage(0) }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    fStatus === tab.id
                      ? 'bg-[#8B3A52] text-white shadow-sm'
                      : 'bg-stone-50 text-stone-600 hover:bg-[#FAF3F5] hover:text-[#8B3A52]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      fStatus === tab.id
                        ? 'bg-white/20 text-white'
                        : tab.highlight && tab.count > 0 ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowManual(!showManual)}
              className="px-4 py-2 rounded-full bg-[#8B3A52] text-white text-xs font-bold hover:bg-[#732F42] transition-colors shadow-sm flex items-center gap-1.5 ml-auto"
            >
              <span>{showManual ? 'Close Form' : '+ New Direct Lead'}</span>
            </button>
          </div>

          {/* Bottom row: Search, City, Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            
            {/* Search */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Search Customer</label>
              <div className="relative">
                <input
                  type="text"
                  value={fSearch}
                  onChange={e => { setFSearch(e.target.value); setPage(0) }}
                  placeholder="Name, phone, or address..."
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#8B3A52] bg-stone-50/50"
                />
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-2.5 text-stone-400">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
            </div>

            {/* City Selector */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Target Region</label>
              <select
                value={fCity}
                onChange={e => { setFCity(e.target.value); setPage(0) }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#8B3A52] bg-white"
              >
                <option value="all">All Cities (Delhi NCR, Lucknow, Ayodhya)</option>
                <option value="delhi-ncr">Delhi NCR (Noida, Gurgaon, Delhi)</option>
                <option value="lucknow">Lucknow (Gomti Nagar, etc.)</option>
                <option value="ayodhya">Ayodhya</option>
              </select>
            </div>

            {/* Date range from */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">From Date</label>
              <input
                type="date"
                value={fFrom}
                onChange={e => { setFFrom(e.target.value); setPage(0) }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#8B3A52] bg-white"
              />
            </div>

            {/* Date range to */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">To Date</label>
              <input
                type="date"
                value={fTo}
                onChange={e => { setFTo(e.target.value); setPage(0) }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#8B3A52] bg-white"
              />
            </div>

          </div>

          {lastUpdated && (
            <div className="mt-3 text-right">
              <span className="text-[10px] text-stone-400">
                Last updated at {lastUpdated.toLocaleTimeString('en-IN')}
              </span>
            </div>
          )}

        </div>

        {/* ── MANUAL BOOKING MODAL / DRAWER ── */}
        {showManual && (
          <div className="bg-white rounded-3xl border-2 border-[#8B3A52]/20 p-6 mb-8 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-playfair text-xl font-bold text-[#8B3A52]">Create Direct Booking Lead</h2>
                <p className="text-xs text-stone-500">Record a phone call lead or direct WhatsApp enquiry</p>
              </div>
              <button onClick={() => setShowManual(false)} className="text-stone-400 hover:text-stone-700 text-lg">✕</button>
            </div>

            <form onSubmit={submitManual} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <input type="text" placeholder="Customer Name *" value={manual.customer_name}
                onChange={e => setManual(p => ({ ...p, customer_name: e.target.value }))}
                className="border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8B3A52]" required />
              
              <input type="tel" placeholder="Phone Number *" value={manual.customer_phone}
                onChange={e => setManual(p => ({ ...p, customer_phone: e.target.value }))}
                className="border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8B3A52]" required />

              <input type="email" placeholder="Email Address (optional)" value={manual.customer_email}
                onChange={e => setManual(p => ({ ...p, customer_email: e.target.value }))}
                className="border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900" />

              <input type="text" placeholder="Complete Doorstep Address *" value={manual.customer_address}
                onChange={e => setManual(p => ({ ...p, customer_address: e.target.value }))}
                className="border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 sm:col-span-2" required />

              <select value={manual.city}
                onChange={e => setManual(p => ({ ...p, city: e.target.value }))}
                className="border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 bg-white">
                <option value="delhi-ncr">Delhi NCR</option>
                <option value="lucknow">Lucknow</option>
                <option value="ayodhya">Ayodhya</option>
              </select>

              <input type="text" placeholder="Service Type (e.g. Karwa Chauth Combo 2) *" value={manual.service_type}
                onChange={e => setManual(p => ({ ...p, service_type: e.target.value }))}
                className="border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900" required />

              <input type="date" placeholder="Appointment Date" value={manual.appointment_date}
                onChange={e => setManual(p => ({ ...p, appointment_date: e.target.value }))}
                className="border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900" />

              <input type="time" placeholder="Appointment Time" value={manual.appointment_time}
                onChange={e => setManual(p => ({ ...p, appointment_time: e.target.value }))}
                className="border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900" />

              <select value={manual.artist_id}
                onChange={e => setManual(p => ({ ...p, artist_id: e.target.value }))}
                className="border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 bg-white">
                <option value="">Auto-Assign / Flexible Artist</option>
                {artists.map(a => <option key={a.id} value={a.id}>{a.name} ({a.skill_type})</option>)}
              </select>

              <textarea placeholder="Coordinator Notes or Special Instructions"
                value={manual.notes}
                onChange={e => setManual(p => ({ ...p, notes: e.target.value }))}
                rows={2}
                className="border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 sm:col-span-2 resize-none" />

              <div className="flex items-center">
                <button type="submit" disabled={actionLoading === '__new__'}
                  className="w-full py-3 bg-[#8B3A52] text-white rounded-xl text-xs font-bold hover:bg-[#732F42] transition-colors disabled:opacity-50">
                  {actionLoading === '__new__' ? 'Saving Lead...' : 'Confirm & Save Lead'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── BOOKINGS LIST ── */}
        <div className="bg-white rounded-2xl border border-[#EACCD6]/60 overflow-hidden shadow-sm">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-2 border-[#8B3A52] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-stone-500 font-medium">Loading live bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-playfair text-xl text-stone-800 font-bold mb-1">No bookings found</p>
              <p className="text-xs text-stone-500">Try changing your filters or search keywords.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200/80 bg-stone-50/80 text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                    <th className="px-4 py-3.5">Customer & City</th>
                    <th className="px-4 py-3.5">Service Requested</th>
                    <th className="px-4 py-3.5">Date & Slot</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-center">1-Click Contact</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {bookings.map(b => {
                    const isExp = expanded === b.id
                    const isDelhi = b.city?.toLowerCase().includes('delhi')
                    const cityName = isDelhi ? 'Delhi NCR' : b.city?.toLowerCase().includes('ayodhya') ? 'Ayodhya' : 'Lucknow'
                    const cleanPhone = b.customer_phone.replace(/\D/g, '')

                    return (
                      <tr key={b.id} className="group hover:bg-[#FAF5F7]/50 transition-colors">
                        
                        {/* Col 1: Customer & City */}
                        <td className="px-4 py-3.5 align-top">
                          <div className="flex flex-col">
                            <span className="font-bold text-stone-900 text-sm group-hover:text-[#8B3A52] transition-colors">
                              {b.customer_name}
                            </span>
                            <span className="text-stone-500 text-[11px] font-mono mt-0.5">
                              {b.customer_phone}
                            </span>
                            <div className="flex items-center gap-1.5 mt-1.5">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                                isDelhi ? 'bg-purple-100 text-purple-800' : 'bg-rose-100 text-[#8B3A52]'
                              }`}>
                                {cityName}
                              </span>
                              {b.customer_address && (
                                <span className="text-[10px] text-stone-400 truncate max-w-[140px]" title={b.customer_address}>
                                  {b.customer_address}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Col 2: Service Requested */}
                        <td className="px-4 py-3.5 align-top">
                          <span className="font-semibold text-stone-900 block max-w-[220px]">
                            {b.service_type}
                          </span>
                          {b.total_estimate && (
                            <span className="text-[11px] font-bold text-[#8B3A52] block mt-0.5">
                              ₹{b.total_estimate.toLocaleString('en-IN')}
                            </span>
                          )}
                          {b.notes && (
                            <p className="text-[10px] text-stone-500 italic mt-1 max-w-[200px] line-clamp-1" title={b.notes}>
                              "{b.notes}"
                            </p>
                          )}
                        </td>

                        {/* Col 3: Timing */}
                        <td className="px-4 py-3.5 align-top whitespace-nowrap">
                          <span className="font-medium text-stone-800 block">
                            {b.appointment_date || 'Callback / No Slot'}
                          </span>
                          <span className="text-[11px] text-stone-500 block">
                            {formatTime(b.appointment_time)}
                          </span>
                        </td>

                        {/* Col 4: Status Badge */}
                        <td className="px-4 py-3.5 align-top">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'pending'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : b.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : b.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-stone-100 text-stone-600'
                          }`}>
                            {b.status}
                          </span>
                        </td>

                        {/* Col 5: 1-Click WhatsApp & Call Actions */}
                        <td className="px-4 py-3.5 align-top text-center" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1.5">
                            {/* WhatsApp Button */}
                            <a
                              href={getWhatsAppLink(b)}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Chat with Customer on WhatsApp"
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-[11px] flex items-center gap-1 shadow-sm transition-all hover:scale-105"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                              <span>WhatsApp</span>
                            </a>

                            {/* Call Button */}
                            <a
                              href={`tel:${cleanPhone}`}
                              title="Direct Phone Call"
                              className="p-1.5 rounded-lg border border-stone-200 text-stone-700 hover:border-[#8B3A52] hover:text-[#8B3A52] bg-white transition-colors"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81 19.79 19.79 0 0 1 0 1.14 2 2 0 0 1 2 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 14.9v2.02z"/>
                              </svg>
                            </a>

                            {/* Copy for Artist */}
                            <button
                              onClick={() => copyForArtist(b)}
                              title="Copy details formatted for WhatsApp dispatch to artist"
                              className="px-2 py-1.5 rounded-lg border border-stone-200 text-stone-600 hover:border-[#8B3A52] hover:text-[#8B3A52] bg-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
                            >
                              {copiedId === b.id ? (
                                <span className="text-emerald-600 font-bold">✓ Copied</span>
                              ) : (
                                <>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                  </svg>
                                  <span className="hidden xl:inline">Dispatch</span>
                                </>
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Col 6: Workflow Actions */}
                        <td className="px-4 py-3.5 align-top text-right" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            {b.status === 'pending' && (
                              <button
                                onClick={() => doAction(b.id, { status: 'confirmed' })}
                                disabled={actionLoading === b.id}
                                className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 font-bold text-[10px] transition-colors"
                              >
                                Confirm
                              </button>
                            )}

                            {b.status === 'confirmed' && (
                              <button
                                onClick={() => doAction(b.id, { status: 'completed' })}
                                disabled={actionLoading === b.id}
                                className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 font-bold text-[10px] transition-colors"
                              >
                                Complete
                              </button>
                            )}

                            {(b.status === 'pending' || b.status === 'confirmed') && (
                              <button
                                onClick={() => doAction(b.id, { status: 'cancelled' })}
                                disabled={actionLoading === b.id}
                                className="px-2 py-1 text-stone-500 hover:text-rose-700 font-semibold text-[10px] transition-colors"
                              >
                                Cancel
                              </button>
                            )}

                            {/* Expand row */}
                            <button
                              onClick={() => setExpanded(isExp ? null : b.id)}
                              className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700"
                              title="Details"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isExp ? 'rotate-180' : ''}`}>
                                <polyline points="6 9 12 15 18 9"/>
                              </svg>
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => doDelete(b.id)}
                              disabled={actionLoading === b.id}
                              title="Delete permanently"
                              className="p-1 text-stone-300 hover:text-red-600 transition-colors"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                              </svg>
                            </button>
                          </div>
                        </td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Expand Details Panel */}
          {expanded && (
            <div className="bg-[#FAF3F5] border-t border-[#EACCD6]/80 p-5">
              {(() => {
                const b = bookings.find(item => item.id === expanded)
                if (!b) return null

                return editing === b.id ? (
                  <div className="max-w-3xl bg-white p-5 rounded-2xl border border-stone-200">
                    <h4 className="font-playfair text-base font-bold text-stone-900 mb-3">Edit Booking Details</h4>
                    <div className="grid sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Date</label>
                        <input type="date" value={editForm.appointment_date || b.appointment_date || ''}
                          onChange={e => setEditForm(p => ({ ...p, appointment_date: e.target.value }))}
                          className="w-full border border-stone-200 rounded-lg px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Time</label>
                        <input type="time" value={editForm.appointment_time || b.appointment_time || ''}
                          onChange={e => setEditForm(p => ({ ...p, appointment_time: e.target.value }))}
                          className="w-full border border-stone-200 rounded-lg px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Assign Artist</label>
                        <select value={editForm.artist_id || b.artist_id || ''}
                          onChange={e => setEditForm(p => ({ ...p, artist_id: e.target.value }))}
                          className="w-full border border-stone-200 rounded-lg px-3 py-2 bg-white">
                          <option value="">Auto / Unassigned</option>
                          {artists.map(a => <option key={a.id} value={a.id}>{a.name} ({a.skill_type})</option>)}
                        </select>
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Address</label>
                        <input type="text" value={editForm.customer_address !== undefined ? editForm.customer_address : b.customer_address}
                          onChange={e => setEditForm(p => ({ ...p, customer_address: e.target.value }))}
                          className="w-full border border-stone-200 rounded-lg px-3 py-2" />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">Coordinator Notes</label>
                        <textarea rows={2}
                          value={editForm.notes !== undefined ? editForm.notes : b.notes || ''}
                          onChange={e => setEditForm(p => ({ ...p, notes: e.target.value }))}
                          className="w-full border border-stone-200 rounded-lg px-3 py-2 resize-none" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => saveEdit(b.id)}
                        className="px-4 py-2 bg-[#8B3A52] text-white font-bold text-xs rounded-xl hover:bg-[#732F42]">Save Changes</button>
                      <button onClick={() => setEditing(null)}
                        className="px-4 py-2 border border-stone-200 text-stone-600 font-semibold text-xs rounded-xl">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 text-xs text-stone-700">
                    <div className="space-y-1.5 flex-1">
                      <p><strong className="text-stone-900">Full Address:</strong> {b.customer_address}</p>
                      <p><strong className="text-stone-900">Email:</strong> {b.customer_email || 'None'}</p>
                      {b.addons && b.addons.length > 0 && <p><strong className="text-stone-900">Selected Add-ons:</strong> {b.addons.join(', ')}</p>}
                      {b.notes && <p><strong className="text-stone-900">Internal / Client Notes:</strong> {b.notes}</p>}
                      <p className="text-stone-400 text-[11px] pt-1">
                        Booked online at: {new Date(b.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyForArtist(b)}
                        className="px-3.5 py-2 rounded-xl bg-white border border-[#EACCD6] text-[#8B3A52] font-bold hover:bg-[#8B3A52] hover:text-white transition-colors"
                      >
                        {copiedId === b.id ? '✓ Copied Dispatch Details' : '📋 Copy Full Dispatch Card'}
                      </button>
                      <button
                        onClick={() => { setEditing(b.id); setEditForm({}) }}
                        className="px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 font-semibold hover:border-stone-400 transition-colors"
                      >
                        Edit Details
                      </button>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}

        </div>

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 rounded-full border border-stone-200 text-xs font-semibold hover:border-[#8B3A52] disabled:opacity-30 bg-white"
            >
              Previous
            </button>
            <span className="text-xs font-semibold text-stone-500">
              Page {page + 1} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 rounded-full border border-stone-200 text-xs font-semibold hover:border-[#8B3A52] disabled:opacity-30 bg-white"
            >
              Next
            </button>
          </div>
        )}

      </main>
    </div>
  )
}
