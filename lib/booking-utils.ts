// lib/booking-utils.ts
// All slot-calculation logic lives here. No UI. Pure functions.

import { supabase } from './supabase'

// Converts 'HH:MM' or 'HH:MM:SS' to total minutes from midnight
export function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

// Formats minutes-from-midnight back to 'HH:MM'
export function toTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0')
  const m = (minutes % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

// Returns display label e.g. '10:00 AM', '2:00 PM'
export function toDisplayTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`
}

// Which artist handles which service category
export function getSkillType(serviceType: string): 'hair_skin' | 'makeup_nails' {
  const makeupNails = [
    'makeup', 'nail', 'nails', 'acrylic', 'gel', 'polygel',
    'eyelash', 'lash', 'brow', 'microblading', 'semi-permanent',
    'mehndi', 'bridal makeup', 'party makeup', 'saree',
  ]
  const lower = serviceType.toLowerCase()
  return makeupNails.some(k => lower.includes(k)) ? 'makeup_nails' : 'hair_skin'
}

// Checks if a service is a makeup service (always excluded from calendar/deposit)
export function isMakeupService(serviceType: string): boolean {
  const makeup = [
    'makeup', 'bridal', 'engagement', 'sangeet', 'reception',
    'mehendi', 'mehndi', 'haldi', 'saree draping',
  ]
  const lower = serviceType.toLowerCase()
  return makeup.some(k => lower.includes(k))
}

// Main function: returns available time slots for a given date and artist
export async function getAvailableSlots(
  date: string,
  artistId: string
): Promise<string[]> {

  // 1. Fetch this artist's config
  const { data: config } = await supabase
    .from('availability_config')
    .select('*')
    .eq('artist_id', artistId)
    .single()

  if (!config) return []

  // 2. If paused, return empty
  if (config.bookings_paused) return []

  // 3. Check working day (0=Sun … 6=Sat)
  const dayOfWeek = new Date(date + 'T12:00:00').getDay()
  if (!config.working_days.includes(dayOfWeek)) return []

  // 4. Check blocked dates (artist-specific or global null)
  const { data: blocked } = await supabase
    .from('blocked_dates')
    .select('id')
    .eq('date', date)
    .or(`artist_id.eq.${artistId},artist_id.is.null`)

  if (blocked && blocked.length > 0) return []

  // 5. Fetch existing confirmed bookings for this artist on this date
  const { data: bookings } = await supabase
    .from('bookings')
    .select('appointment_time')
    .eq('artist_id', artistId)
    .eq('appointment_date', date)
    .in('status', ['pending', 'confirmed'])

  const bookedTimes = (bookings || [])
    .map(b => toMinutes(b.appointment_time))
    .sort((a, b) => a - b)

  // 6. Generate candidate slots (hourly from start_time to end_time)
  const startMins = toMinutes(config.start_time)
  const endMins   = toMinutes(config.end_time)
  const gap       = config.gap_between_bookings

  const candidates: string[] = []
  for (let t = startMins; t <= endMins; t += 60) {
    candidates.push(toTimeString(t))
  }

  // 7. Filter: remove slots that conflict with existing bookings
  const available = candidates.filter(slot => {
    const slotMins = toMinutes(slot)

    // Must not be within `gap` minutes of any existing booking
    const conflictsWithExisting = bookedTimes.some(booked =>
      Math.abs(slotMins - booked) < gap
    )
    if (conflictsWithExisting) return false

    // The slot itself cannot exceed end_time
    if (slotMins > endMins) return false

    return true
  })

  return available
}

// Returns the next available slot after a given time
export async function getNextAvailableSlot(
  date: string,
  artistId: string,
  afterTime: string
): Promise<string | null> {
  const slots = await getAvailableSlots(date, artistId)
  const afterMins = toMinutes(afterTime)
  return slots.find(s => toMinutes(s) > afterMins) ?? null
}
