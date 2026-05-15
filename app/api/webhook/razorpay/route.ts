import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

function verifySignature(body: string, signature: string, secret: string): boolean {
  const expected = createHmac('sha256', secret).update(body).digest('hex')
  return expected === signature
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get('x-razorpay-signature')
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET

  if (!signature || !secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.text()

  if (!verifySignature(body, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: { event: string; payload: Record<string, unknown> }
  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  console.log('[razorpay webhook]', event.event)

  try {
    switch (event.event) {
      case 'payment.captured': {
        const payment = (event.payload as { payment?: { entity?: { order_id?: string; id?: string; status?: string } } })?.payment?.entity
        if (!payment?.order_id) break

        const { error } = await supabase
          .from('bookings')
          .update({
            deposit_paid: true,
            razorpay_payment_id: payment.id,
            status: 'confirmed',
          })
          .eq('razorpay_order_id', payment.order_id)

        if (error) console.error('[webhook] Failed to update booking for payment.captured:', error)
        else console.log('[webhook] Booking confirmed for order:', payment.order_id)
        break
      }

      case 'payment.failed': {
        const payment = (event.payload as { payment?: { entity?: { order_id?: string } } })?.payment?.entity
        if (!payment?.order_id) break

        const { error } = await supabase
          .from('bookings')
          .update({ status: 'cancelled', notes: 'Payment failed' })
          .eq('razorpay_order_id', payment.order_id)

        if (error) console.error('[webhook] Failed to update booking for payment.failed:', error)
        break
      }

      case 'order.paid': {
        const order = (event.payload as { order?: { entity?: { id?: string } } })?.order?.entity
        if (!order?.id) break

        const { error } = await supabase
          .from('bookings')
          .update({ deposit_paid: true, status: 'confirmed' })
          .eq('razorpay_order_id', order.id)

        if (error) console.error('[webhook] Failed to update booking for order.paid:', error)
        else console.log('[webhook] Booking confirmed for order:', order.id)
        break
      }

      case 'refund.processed': {
        const refund = (event.payload as { refund?: { entity?: { payment_id?: string } } })?.refund?.entity
        if (!refund?.payment_id) break

        const { error } = await supabase
          .from('bookings')
          .update({ status: 'cancelled', deposit_paid: false, notes: 'Refund processed' })
          .eq('razorpay_payment_id', refund.payment_id)

        if (error) console.error('[webhook] Failed to update booking for refund.processed:', error)
        break
      }

      default:
        console.log('[webhook] Unhandled event:', event.event)
    }
  } catch (err) {
    console.error('[webhook] Error processing event:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
