'use client'
import { useState, useEffect, useCallback } from 'react'
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

  // Filters
  const [fFrom, setFFrom] = useState('')
  const [fTo, setFTo] = useState('')
  const [fCity, setFCity] = useState('all')
  const [fStatus, setFStatus] = useState('all')
  const [fSearch, setFSearch] = useState('')
  const [page, setPage] = useState(0)
  const limit = 25

  // Expand
  const [expanded, setExpanded] = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Booking>>({})
  const [actionLoading, setActionLoading] = useState('')

  // Manual booking form
  const [showManual, setShowManual] = useState(false)
  const [manual, setManual] = useState({
    customer_name: '', customer_phone: '', customer_email: '', customer_address: '',
    city: 'lucknow', service_type: '', appointment_date: '', appointment_time: '',
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

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (fFrom) params.set('from', fFrom)
    if (fTo) params.set('to', fTo)
    if (fCity && fCity !== 'all') params.set('city', fCity)
    if (fStatus && fStatus !== 'all') params.set('status', fStatus)
    if (fSearch) params.set('search', fSearch)
    params.set('limit', String(limit))
    params.set('offset', String(page * limit))

    const res = await fetch(`/api/admin/bookings?${params}`, { headers: getHeaders() })
    const json = await res.json()
    if (res.ok) {
      setBookings(json.bookings || [])
      setCount(json.count || 0)
    }
    setLoading(false)
  }, [fFrom, fTo, fCity, fStatus, fSearch, page])

  const fetchArtists = async () => {
    const res = await fetch('/api/admin/availability', { headers: getHeaders() })
    const json = await res.json()
    if (res.ok) setArtists(json.artists || [])
  }

  useEffect(() => {
    if (authed) fetchBookings()
  }, [authed, fetchBookings])

  async function doAction(id: string, updates: Partial<Booking>) {
    setActionLoading(id)
    const res = await fetch('/api/admin/bookings', {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ id, ...updates }),
    })
    if (res.ok) fetchBookings()
    setActionLoading('')
  }

  async function saveEdit(id: string) {
    await doAction(id, editForm)
    setEditing(null)
  }

  async function doDelete(id: string) {
    if (!confirm('Permanently delete this booking? This cannot be undone.')) return
    setActionLoading(id)
    const res = await fetch('/api/admin/bookings', {
      method: 'DELETE',
      headers: getHeaders(),
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      fetchBookings()
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
      setManual({ customer_name: '', customer_phone: '', customer_email: '', customer_address: '', city: 'lucknow', service_type: '', appointment_date: '', appointment_time: '', artist_id: '', status: 'confirmed', notes: '' })
      fetchBookings()
    }
    setActionLoading('')
  }

  function formatTime(t: string) {
    if (!t) return '—'
    const [h, m] = t.split(':').map(Number)
    const period = h >= 12 ? 'PM' : 'AM'
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
    return `${hour}:${m.toString().padStart(2, '0')} ${period}`
  }

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return `font-poppins text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${map[s] || 'bg-stone-100'}`
  }

  const totalPages = Math.ceil(count / limit)

  if (!authed) return null

  return (
    <div className="min-h-screen bg-petal">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Nav */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-stone">Bookings</h1>
            <p className="font-poppins text-xs text-stone-light">{count} total</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/admin/settings')} className="font-poppins text-xs font-semibold px-4 py-2 rounded-full border border-blush/30 text-stone-light hover:border-rose/30 transition-colors">Settings</button>
            <button onClick={() => router.push('/admin/availability')} className="font-poppins text-xs font-semibold px-4 py-2 rounded-full border border-blush/30 text-stone-light hover:border-rose/30 transition-colors">Availability</button>
            <button onClick={() => { sessionStorage.clear(); router.push('/admin') }} className="font-poppins text-xs font-semibold px-4 py-2 rounded-full border border-red/20 text-red-600 hover:bg-red-50 transition-colors">Logout</button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-blush/20 p-4 mb-6 flex flex-wrap items-end gap-3">
          <div>
            <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1">From</label>
            <input type="date" value={fFrom} onChange={e => { setFFrom(e.target.value); setPage(0) }}
              className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone focus:outline-none focus:border-rose/50" />
          </div>
          <div>
            <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1">To</label>
            <input type="date" value={fTo} onChange={e => { setFTo(e.target.value); setPage(0) }}
              className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone focus:outline-none focus:border-rose/50" />
          </div>
          <div>
            <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1">City</label>
            <select value={fCity} onChange={e => { setFCity(e.target.value); setPage(0) }}
              className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone focus:outline-none focus:border-rose/50 bg-white">
              <option value="all">All</option>
              <option value="lucknow">Lucknow</option>
              <option value="ayodhya">Ayodhya</option>
            </select>
          </div>
          <div>
            <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1">Status</label>
            <select value={fStatus} onChange={e => { setFStatus(e.target.value); setPage(0) }}
              className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone focus:outline-none focus:border-rose/50 bg-white">
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1">Search</label>
            <input type="text" value={fSearch} onChange={e => { setFSearch(e.target.value); setPage(0) }}
              placeholder="Name or phone"
              className="w-full border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone placeholder-stone-light/50 focus:outline-none focus:border-rose/50" />
          </div>
          <button onClick={() => fetchBookings()} className="font-poppins text-xs font-semibold px-4 py-2 bg-rose text-white rounded-lg hover:bg-mauve transition-colors">Apply</button>
          <button onClick={() => setShowManual(!showManual)} className="font-poppins text-xs font-semibold px-4 py-2 border border-rose/30 text-rose rounded-lg hover:bg-rose/5 transition-colors">+ Manual Booking</button>
        </div>

        {/* Manual booking form */}
        {showManual && (
          <div className="bg-white rounded-2xl border border-rose/20 p-6 mb-6">
            <h2 className="font-playfair text-lg font-bold text-stone mb-4">Manual Booking</h2>
            <form onSubmit={submitManual} className="grid sm:grid-cols-3 gap-3">
              <input type="text" placeholder="Customer Name *" value={manual.customer_name}
                onChange={e => setManual(p => ({ ...p, customer_name: e.target.value }))}
                className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone focus:outline-none focus:border-rose/50" required />
              <input type="text" placeholder="Phone" value={manual.customer_phone}
                onChange={e => setManual(p => ({ ...p, customer_phone: e.target.value }))}
                className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone" />
              <input type="email" placeholder="Email" value={manual.customer_email}
                onChange={e => setManual(p => ({ ...p, customer_email: e.target.value }))}
                className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone" />
              <input type="text" placeholder="Address" value={manual.customer_address}
                onChange={e => setManual(p => ({ ...p, customer_address: e.target.value }))}
                className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone" />
              <select value={manual.city}
                onChange={e => setManual(p => ({ ...p, city: e.target.value }))}
                className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone bg-white">
                <option value="lucknow">Lucknow</option>
                <option value="ayodhya">Ayodhya</option>
              </select>
              <input type="text" placeholder="Service Type *" value={manual.service_type}
                onChange={e => setManual(p => ({ ...p, service_type: e.target.value }))}
                className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone" required />
              <input type="date" placeholder="Date" value={manual.appointment_date}
                onChange={e => setManual(p => ({ ...p, appointment_date: e.target.value }))}
                className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone" />
              <input type="time" placeholder="Time" value={manual.appointment_time}
                onChange={e => setManual(p => ({ ...p, appointment_time: e.target.value }))}
                className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone" />
              <select value={manual.artist_id}
                onChange={e => setManual(p => ({ ...p, artist_id: e.target.value }))}
                className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone bg-white">
                <option value="">Auto-assign artist</option>
                {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
              <button type="submit" disabled={actionLoading === '__new__'}
                className="font-poppins text-xs font-semibold px-4 py-2 bg-rose text-white rounded-lg hover:bg-mauve transition-colors disabled:opacity-50">
                {actionLoading === '__new__' ? 'Creating...' : 'Create Booking'}
              </button>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl border border-blush/20 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center font-poppins text-sm text-stone-light">Loading...</div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center font-poppins text-sm text-stone-light">No bookings found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blush/10 bg-petal/30">
                    <th className="text-left font-poppins text-[10px] font-semibold text-stone-light uppercase px-4 py-3">Date</th>
                    <th className="text-left font-poppins text-[10px] font-semibold text-stone-light uppercase px-4 py-3">Time</th>
                    <th className="text-left font-poppins text-[10px] font-semibold text-stone-light uppercase px-4 py-3">Customer</th>
                    <th className="text-left font-poppins text-[10px] font-semibold text-stone-light uppercase px-4 py-3">Service</th>
                    <th className="text-left font-poppins text-[10px] font-semibold text-stone-light uppercase px-4 py-3">City</th>
                    <th className="text-left font-poppins text-[10px] font-semibold text-stone-light uppercase px-4 py-3">Status</th>
                    <th className="text-left font-poppins text-[10px] font-semibold text-stone-light uppercase px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <>
                      <tr key={b.id}
                        onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                        className="border-b border-blush/5 hover:bg-petal/30 cursor-pointer transition-colors">
                        <td className="px-4 py-3 font-poppins text-xs text-stone whitespace-nowrap">{b.appointment_date || '—'}</td>
                        <td className="px-4 py-3 font-poppins text-xs text-stone whitespace-nowrap">{formatTime(b.appointment_time)}</td>
                        <td className="px-4 py-3 font-poppins text-xs text-stone font-medium">{b.customer_name}</td>
                        <td className="px-4 py-3 font-poppins text-xs text-stone-light max-w-[200px] truncate">{b.service_type}</td>
                        <td className="px-4 py-3 font-poppins text-[10px] uppercase text-stone-light">{b.city}</td>
                        <td className="px-4 py-3"><span className={statusBadge(b.status)}>{b.status}</span></td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5" onClick={e => e.stopPropagation()}>
                            {b.status === 'pending' && (
                              <button onClick={() => doAction(b.id, { status: 'confirmed' })} disabled={actionLoading === b.id}
                                className="font-poppins text-[10px] font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors">Confirm</button>
                            )}
                            {(b.status === 'pending' || b.status === 'confirmed') && (
                              <button onClick={() => doAction(b.id, { status: 'cancelled' })} disabled={actionLoading === b.id}
                                className="font-poppins text-[10px] font-semibold px-2 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors">Cancel</button>
                            )}
                            {b.status === 'confirmed' && (
                              <button onClick={() => doAction(b.id, { status: 'completed' })} disabled={actionLoading === b.id}
                                className="font-poppins text-[10px] font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">Complete</button>
                            )}
                            <button onClick={() => doDelete(b.id)} disabled={actionLoading === b.id}
                              className="font-poppins text-[10px] font-semibold px-2 py-1 bg-stone-100 text-stone-500 rounded-md hover:bg-red-100 hover:text-red-700 transition-colors">🗑</button>
                          </div>
                        </td>
                      </tr>
                      {expanded === b.id && (
                        <tr key={`${b.id}-exp`}>
                          <td colSpan={7} className="px-4 py-4 bg-petal/20">
                            {editing === b.id ? (
                              <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">
                                <input type="date" value={editForm.appointment_date || b.appointment_date || ''}
                                  onChange={e => setEditForm(p => ({ ...p, appointment_date: e.target.value }))}
                                  className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs" />
                                <input type="time" value={editForm.appointment_time || b.appointment_time || ''}
                                  onChange={e => setEditForm(p => ({ ...p, appointment_time: e.target.value }))}
                                  className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs" />
                                <select value={editForm.artist_id || b.artist_id || ''}
                                  onChange={e => setEditForm(p => ({ ...p, artist_id: e.target.value }))}
                                  className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs bg-white">
                                  {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </select>
                                <textarea placeholder="Notes"
                                  value={editForm.notes !== undefined ? editForm.notes : b.notes || ''}
                                  onChange={e => setEditForm(p => ({ ...p, notes: e.target.value }))}
                                  className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs resize-none col-span-2" rows={2} />
                                <div className="flex gap-2 items-end">
                                  <button onClick={() => saveEdit(b.id)}
                                    className="font-poppins text-[10px] font-semibold px-3 py-2 bg-rose text-white rounded-lg hover:bg-mauve transition-colors">Save</button>
                                  <button onClick={() => setEditing(null)}
                                    className="font-poppins text-[10px] font-semibold px-3 py-2 border border-blush/30 text-stone-light rounded-lg hover:bg-white transition-colors">Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <div className="text-xs font-poppins space-y-1 text-stone-light max-w-2xl">
                                <p><strong>Phone:</strong> {b.customer_phone}</p>
                                <p><strong>Email:</strong> {b.customer_email}</p>
                                <p><strong>Address:</strong> {b.customer_address}</p>
                                {b.addons?.length > 0 && <p><strong>Add-ons:</strong> {b.addons.join(', ')}</p>}
                                {b.payment_mode && <p><strong>Payment:</strong> {b.payment_mode} {b.deposit_paid ? '(Paid)' : ''}</p>}
                                {b.total_estimate && <p><strong>Estimate:</strong> ₹{b.total_estimate}</p>}
                                {b.notes && <p><strong>Notes:</strong> {b.notes}</p>}
                                <p><strong>Created:</strong> {new Date(b.created_at).toLocaleString('en-IN')}</p>
                                <button onClick={() => { setEditing(b.id); setEditForm({}) }}
                                  className="font-poppins text-[10px] font-semibold text-rose underline mt-1">Edit</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
              className="font-poppins text-xs font-semibold px-4 py-2 rounded-full border border-blush/30 text-stone-light hover:border-rose/30 disabled:opacity-30 transition-colors">Previous</button>
            <span className="font-poppins text-xs text-stone-light">Page {page + 1} of {totalPages}</span>
            <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}
              className="font-poppins text-xs font-semibold px-4 py-2 rounded-full border border-blush/30 text-stone-light hover:border-rose/30 disabled:opacity-30 transition-colors">Next</button>
          </div>
        )}
      </div>
    </div>
  )
}
