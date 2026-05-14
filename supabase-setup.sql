-- DoorStep Diva Booking System — Supabase Setup
-- Run this in your Supabase SQL Editor (https://app.supabase.com)

-- 1. Artists
CREATE TABLE IF NOT EXISTS artists (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  skill_type TEXT NOT NULL CHECK (skill_type IN ('hair_skin', 'makeup_nails')),
  active     BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO artists (name, skill_type) VALUES
  ('Artist A — Hair & Skin', 'hair_skin'),
  ('Artist B — Makeup & Nails', 'makeup_nails')
ON CONFLICT DO NOTHING;

-- 2. Availability Config
CREATE TABLE IF NOT EXISTS availability_config (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id           UUID NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
  working_days        INTEGER[] NOT NULL DEFAULT '{0,1,2,3,4,5,6}',
  start_time          TEXT NOT NULL DEFAULT '10:00',
  end_time            TEXT NOT NULL DEFAULT '19:00',
  gap_between_bookings INTEGER NOT NULL DEFAULT 120,
  last_booking_gap    INTEGER NOT NULL DEFAULT 60,
  bookings_paused     BOOLEAN NOT NULL DEFAULT false,
  pause_message       TEXT NOT NULL DEFAULT '',
  created_at          TIMESTAMPTZ DEFAULT now()
);

-- Insert default configs for both artists
DO $$
DECLARE
  a1 UUID; a2 UUID;
BEGIN
  SELECT id INTO a1 FROM artists WHERE skill_type = 'hair_skin' LIMIT 1;
  SELECT id INTO a2 FROM artists WHERE skill_type = 'makeup_nails' LIMIT 1;
  IF a1 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM availability_config WHERE artist_id = a1) THEN
    INSERT INTO availability_config (artist_id) VALUES (a1);
  END IF;
  IF a2 IS NOT NULL AND NOT EXISTS (SELECT 1 FROM availability_config WHERE artist_id = a2) THEN
    INSERT INTO availability_config (artist_id) VALUES (a2);
  END IF;
END $$;

-- 3. Blocked Dates
CREATE TABLE IF NOT EXISTS blocked_dates (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date      DATE NOT NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  reason    TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at         TIMESTAMPTZ DEFAULT now(),
  customer_name      TEXT NOT NULL,
  customer_phone     TEXT NOT NULL,
  customer_email     TEXT NOT NULL,
  customer_address   TEXT NOT NULL,
  service_type       TEXT NOT NULL,
  addons             TEXT[] NOT NULL DEFAULT '{}',
  city               TEXT NOT NULL CHECK (city IN ('lucknow', 'ayodhya')),
  artist_id          UUID REFERENCES artists(id),
  appointment_date   DATE,
  appointment_time   TEXT,
  payment_mode       TEXT,
  deposit_paid       BOOLEAN NOT NULL DEFAULT false,
  razorpay_order_id  TEXT,
  razorpay_payment_id TEXT,
  total_estimate     INTEGER,
  status             TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes              TEXT
);

-- 5. Booking Settings (singleton)
CREATE TABLE IF NOT EXISTS booking_settings (
  id              INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  calendar_enabled BOOLEAN NOT NULL DEFAULT true,
  deposit_amount  INTEGER NOT NULL DEFAULT 500,
  updated_at      TIMESTAMPTZ DEFAULT now()
);

INSERT INTO booking_settings (id, calendar_enabled, deposit_amount)
VALUES (1, true, 500)
ON CONFLICT (id) DO NOTHING;

-- 6. RLS — Enable on all tables
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_settings ENABLE ROW LEVEL SECURITY;

-- Public can read artists
CREATE POLICY "Public read artists" ON artists FOR SELECT USING (true);

-- Public can read availability config
CREATE POLICY "Public read availability_config" ON availability_config FOR SELECT USING (true);

-- Public can read blocked dates
CREATE POLICY "Public read blocked_dates" ON blocked_dates FOR SELECT USING (true);

-- Public can read booking settings
CREATE POLICY "Public read booking_settings" ON booking_settings FOR SELECT USING (true);

-- Public can insert bookings
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Public can read their own bookings (by phone — optional, for future lookup)
CREATE POLICY "Public read own bookings" ON bookings FOR SELECT USING (true);

-- Admin writes are authorized by password check in API routes, not by RLS
CREATE POLICY "Public update availability_config" ON availability_config FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public insert blocked_dates" ON blocked_dates FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete blocked_dates" ON blocked_dates FOR DELETE USING (true);
CREATE POLICY "Public update bookings" ON bookings FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public update booking_settings" ON booking_settings FOR UPDATE USING (true) WITH CHECK (true);
