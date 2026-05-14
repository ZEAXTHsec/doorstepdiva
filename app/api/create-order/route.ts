// POST /api/create-order
import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(req: NextRequest) {
  const { amount } = await req.json()
  if (!amount || typeof amount !== 'number') {
    return NextResponse.json({ error: 'amount required' }, { status: 400 })
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: 'Razorpay not configured' }, { status: 500 })
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: 'INR',
    receipt: `dsd_${Date.now()}`,
  })

  return NextResponse.json(order)
}
