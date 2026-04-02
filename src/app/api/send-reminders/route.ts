import { NextRequest, NextResponse } from 'next/server';
import { getTomorrowsBookings, markReminderSent } from '@/lib/googleSheets';
import { sendReminderEmail } from '@/lib/emails';

export async function GET(request: NextRequest) {
  // Protect the endpoint so only Vercel cron can call it
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookings = await getTomorrowsBookings();
    console.log(`Found ${bookings.length} bookings for tomorrow`);

    for (const booking of bookings) {
      await sendReminderEmail({
        name: booking.name,
        email: booking.email,
        event_type: booking.event_type,
        booking_date: new Date(booking.booking_date).toLocaleDateString('en-GB', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        }),
      });
      await markReminderSent(booking.rowIndex);
      console.log(`Reminder sent to ${booking.email}`);
    }

    return NextResponse.json({ success: true, sent: bookings.length });
  } catch (err) {
    console.error('Reminder cron error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}