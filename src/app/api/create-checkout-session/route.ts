// src/app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia', // ✅
});
export async function POST(request: NextRequest) {
  console.log('Create checkout session API route hit!');
  try {
    const body = await request.json();
    const { packageLabel, price, metadata } = body;

    if (!packageLabel || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            unit_amount: Math.round(price * 100),
            product_data: {
              name: `${packageLabel} Photography Session`,
              description: metadata.booking_date
                ? `Booked for ${metadata.booking_date}`
                : 'Date to be confirmed',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        customer_name: metadata.customer_name ?? '',
        customer_email: metadata.customer_email ?? '',
        customer_phone: metadata.customer_phone ?? '',
        booking_date: metadata.booking_date ?? '',
        event_type: metadata.event_type ?? packageLabel,
        message: metadata.message ?? '',
      },
      customer_email: metadata.customer_email || undefined,
      success_url: `${baseUrl}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#contact`,
      submit_type: 'pay',
    });

    console.log('Session created:', session.id);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe session error:', err);
    return NextResponse.json(
      { error: 'Failed to create checkout session', detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}