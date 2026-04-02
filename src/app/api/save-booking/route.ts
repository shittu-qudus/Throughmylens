import { NextRequest, NextResponse } from 'next/server';
import { appendBookingRow } from '@/lib/googleSheets';
import { sendCustomerConfirmation,sendAdminNotification } from '@/lib/emails';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { metadata, amount_total, session_id } = body;

    const booking_date = metadata.booking_date
      ? new Date(metadata.booking_date).toLocaleDateString('en-GB', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        })
      : 'To be confirmed';

    const booking_date_raw = metadata.booking_date || '';
    const amount = `£${(amount_total / 100).toLocaleString()}`;
    const paid_at = new Date().toISOString();

    // Save to Google Sheet
    await appendBookingRow({
      name: metadata.customer_name,
      email: metadata.customer_email,
      phone: metadata.customer_phone || '',
      event_type: metadata.event_type,
      booking_date: booking_date_raw, // store YYYY-MM-DD for cron comparison
      session_id,
      paid_at,
    });

    // Send both emails in parallel
    await Promise.all([
      sendCustomerConfirmation({
        name: metadata.customer_name,
        email: metadata.customer_email,
        event_type: metadata.event_type,
        booking_date,
        amount,
        session_id,
      }),
      sendAdminNotification({
        name: metadata.customer_name,
        email: metadata.customer_email,
        phone: metadata.customer_phone || '',
        event_type: metadata.event_type,
        booking_date,
        amount,
        session_id,
        message: metadata.message || '',
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Save booking error:', err);
    return NextResponse.json(
      { error: 'Failed to save booking', detail: String(err) },
      { status: 500 }
    );
  }
}