// POST /api/create-order
import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: NextRequest) {
  const { amount } = await req.json()
  if (!amount || typeof amount !== 'number') {
    return NextResponse.json({ error: 'amount required' }, { status: 400 })
  }

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: 'INR',
    receipt: `dsd_${Date.now()}`,
  })

  return NextResponse.json(order)
}
