// /Users/rarelyseen/photography/mylens/src/app/api/get-session-details/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export async function GET(request: NextRequest) {
  console.log('Get session details API route hit!'); // Debug log
  
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id');
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    const metadata = session.metadata || {};
    const amount_total = session.amount_total || 0;
    const customer_email = session.customer_details?.email || metadata.customer_email;

    return NextResponse.json({
      metadata,
      amount_total,
      customer_email,
      session_id: sessionId,
      payment_status: session.payment_status,
    });
  } catch (err) {
    console.error('Error fetching session:', err);
    return NextResponse.json(
      { error: 'Failed to fetch session details', detail: String(err) },
      { status: 500 }
    );
  }
}