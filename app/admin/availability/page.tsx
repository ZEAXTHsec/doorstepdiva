'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type AvailabilityConfig = {
  id: string
  artist_id: string
  working_days: number[]
  start_time: string
  end_time: string
  gap_between_bookings: number
  last_booking_gap: number
  bookings_paused: boolean
  pause_message: string
}

type Artist = { id: string; name: string; skill_type: string; active: boolean }

type BlockedDate = { id: string; date: string; artist_id: string | null; reason?: string }

export default function AdminAvailabilityPage() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [configs, setConfigs] = useState<AvailabilityConfig[]>([])
  const [artists, setArtists] = useState<Artist[]>([])
  const [blocked, setBlocked] = useState<BlockedDate[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState('')
  const [msg, setMsg] = useState('')

  // New block form
  const [blockDate, setBlockDate] = useState('')
  const [blockArtistId, setBlockArtistId] = useState('')
  const [blockReason, setBlockReason] = useState('')

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
    fetchAll()
  }, [router])

  async function fetchAll() {
    setLoading(true)
    const res = await fetch('/api/admin/availability', { headers: getHeaders() })
    const json = await res.json()
    if (res.ok) {
      setConfigs(json.configs || [])
      setArtists(json.artists || [])
      setBlocked(json.blocked || [])
    }
    setLoading(false)
  }

  async function patch(action: string, body: Record<string, unknown>) {
    setSaving(action)
    setMsg('')
    const res = await fetch('/api/admin/availability', {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ action, ...body }),
    })
    if (res.ok) {
      setMsg('Saved.')
      fetchAll()
    } else {
      const j = await res.json()
      setMsg(j.error || 'Failed.')
    }
    setSaving('')
    setTimeout(() => setMsg(''), 2000)
  }

  function toggleDay(config: AvailabilityConfig, day: number) {
    const days = config.working_days.includes(day)
      ? config.working_days.filter(d => d !== day)
      : [...config.working_days, day].sort()
    patch('update_config', { artist_id: config.artist_id, updates: { working_days: days } })
  }

  function updateTime(config: AvailabilityConfig, field: 'start_time' | 'end_time', value: string) {
    patch('update_config', { artist_id: config.artist_id, updates: { [field]: value } })
  }

  function togglePause(config: AvailabilityConfig) {
    patch('toggle_pause', {
      artist_id: config.artist_id,
      paused: !config.bookings_paused,
      message: config.bookings_paused ? '' : 'Bookings temporarily paused',
    })
  }

  async function addBlockedDate(e: React.FormEvent) {
    e.preventDefault()
    if (!blockDate) return
    patch('block_date', { date: blockDate, artist_id: blockArtistId || null, reason: blockReason || null })
    setBlockDate(''); setBlockArtistId(''); setBlockReason('')
  }

  function artistName(id: string) {
    return artists.find(a => a.id === id)?.name || id
  }

  const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  if (!authed || loading) return (
    <div className="min-h-screen bg-petal flex items-center justify-center">
      <p className="font-poppins text-sm text-stone-light">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-petal">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Nav */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-stone">Availability</h1>
            <p className="font-poppins text-xs text-stone-light">Per-artist hours, working days, blocked dates</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/admin/bookings')} className="font-poppins text-xs font-semibold px-4 py-2 rounded-full border border-blush/30 text-stone-light hover:border-rose/30 transition-colors">Bookings</button>
            <button onClick={() => router.push('/admin/settings')} className="font-poppins text-xs font-semibold px-4 py-2 rounded-full border border-blush/30 text-stone-light hover:border-rose/30 transition-colors">Settings</button>
            <button onClick={() => { sessionStorage.clear(); router.push('/admin') }} className="font-poppins text-xs font-semibold px-4 py-2 rounded-full border border-red/20 text-red-600 hover:bg-red-50 transition-colors">Logout</button>
          </div>
        </div>

        {/* Per-artist configs */}
        {configs.map(config => {
          const artist = artists.find(a => a.id === config.artist_id)
          return (
            <div key={config.id} className="bg-white rounded-2xl border border-blush/20 p-6 mb-4">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-playfair text-lg font-bold text-stone">{artist?.name || config.artist_id}</h2>
                <button
                  onClick={() => togglePause(config)}
                  disabled={saving !== ''}
                  className={`font-poppins text-[10px] font-semibold px-4 py-1.5 rounded-full transition-colors ${
                    config.bookings_paused
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  } disabled:opacity-50`}
                >
                  {saving === 'toggle_pause' ? '...' : config.bookings_paused ? 'PAUSED — Tap to Resume' : 'Active — Tap to Pause'}
                </button>
              </div>

              {config.bookings_paused && config.pause_message && (
                <p className="font-poppins text-xs text-red-600 bg-red-50 rounded-lg px-4 py-2 mb-4">{config.pause_message}</p>
              )}

              {/* Working days */}
              <div className="mb-4">
                <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-2">Working Days</label>
                <div className="flex gap-2">
                  {DAY_LABELS.map((label, i) => (
                    <button key={i}
                      onClick={() => toggleDay(config, i)}
                      disabled={saving !== ''}
                      className={`font-poppins text-xs font-semibold w-10 h-10 rounded-xl border transition-all ${
                        config.working_days.includes(i)
                          ? 'bg-rose text-white border-rose'
                          : 'border-blush/30 text-stone-light hover:border-rose/30'
                      } disabled:opacity-50`}
                    >{label}</button>
                  ))}
                </div>
              </div>

              {/* Time range */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div>
                  <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1">Start Time</label>
                  <input type="time" value={config.start_time}
                    onChange={e => updateTime(config, 'start_time', e.target.value)}
                    disabled={saving !== ''}
                    className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone focus:outline-none focus:border-rose/50" />
                </div>
                <span className="font-poppins text-xs text-stone-light mt-4">to</span>
                <div>
                  <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1">End Time</label>
                  <input type="time" value={config.end_time}
                    onChange={e => updateTime(config, 'end_time', e.target.value)}
                    disabled={saving !== ''}
                    className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone focus:outline-none focus:border-rose/50" />
                </div>
              </div>

              {/* Gap */}
              <div>
                <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1">Gap Between Bookings (minutes)</label>
                <input type="number" value={config.gap_between_bookings}
                  onChange={e => patch('update_config', { artist_id: config.artist_id, updates: { gap_between_bookings: parseInt(e.target.value) || 120 } })}
                  disabled={saving !== ''}
                  className="w-24 border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone focus:outline-none focus:border-rose/50" />
              </div>
            </div>
          )
        })}

        {/* Blocked Dates */}
        <div className="bg-white rounded-2xl border border-blush/20 p-6 mb-4">
          <h2 className="font-playfair text-lg font-bold text-stone mb-4">Blocked Dates</h2>

          {/* Add form */}
          <form onSubmit={addBlockedDate} className="flex flex-wrap items-end gap-3 mb-5 pb-5 border-b border-blush/10">
            <div>
              <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1">Date</label>
              <input type="date" value={blockDate} onChange={e => setBlockDate(e.target.value)} required
                className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone focus:outline-none focus:border-rose/50" />
            </div>
            <div>
              <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1">Artist</label>
              <select value={blockArtistId} onChange={e => setBlockArtistId(e.target.value)}
                className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone focus:outline-none focus:border-rose/50 bg-white">
                <option value="">All Artists</option>
                {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label className="font-poppins text-[10px] font-semibold text-stone-light uppercase block mb-1">Reason</label>
              <input type="text" value={blockReason} onChange={e => setBlockReason(e.target.value)}
                placeholder="Optional"
                className="border border-blush/30 rounded-lg px-3 py-2 font-poppins text-xs text-stone placeholder-stone-light/50 focus:outline-none focus:border-rose/50 w-32" />
            </div>
            <button type="submit" disabled={saving !== ''}
              className="font-poppins text-xs font-semibold px-4 py-2 bg-rose text-white rounded-lg hover:bg-mauve transition-colors disabled:opacity-50">Block Date</button>
          </form>

          {/* Blocked dates list */}
          {blocked.length === 0 ? (
            <p className="font-poppins text-xs text-stone-light/60 text-center py-4">No blocked dates.</p>
          ) : (
            <div className="max-h-80 overflow-y-auto space-y-1">
              {blocked.map(b => (
                <div key={b.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-petal/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-poppins text-xs font-semibold text-stone">{new Date(b.date + 'T12:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    {b.artist_id && <span className="font-poppins text-[10px] text-rose bg-rose/5 px-2 py-0.5 rounded-full">{artistName(b.artist_id)}</span>}
                    {!b.artist_id && <span className="font-poppins text-[10px] text-stone-light bg-stone/5 px-2 py-0.5 rounded-full">All</span>}
                    {b.reason && <span className="font-poppins text-[10px] text-stone-light">— {b.reason}</span>}
                  </div>
                  <button
                    onClick={() => patch('unblock_date', { id: b.id })}
                    disabled={saving !== ''}
                    className="font-poppins text-[10px] font-semibold text-red-500 hover:text-red-700 transition-colors"
                  >Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feedback */}
        {msg && (
          <div className={`text-center font-poppins text-xs font-semibold px-4 py-3 rounded-xl ${msg.includes('Failed') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  )
}
