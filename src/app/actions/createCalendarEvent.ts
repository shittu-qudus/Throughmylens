// app/actions/createCalendarEvent.ts
'use server';

import { google } from 'googleapis';


export interface BookingDetails {
  customerName:  string;
  customerEmail: string;
  customerPhone: string;
  bookingDate:   string; // YYYY-MM-DD
  eventType:     string;
  depositPaid:   string;
  fullPrice:     string;
  remaining:     string;
  message:       string;
  sessionId:     string;
}

export async function createCalendarEvent(booking: BookingDetails) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key:  process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary: `📷 Booked – ${booking.customerName} (${booking.eventType})`,
    description: [
      `Session: ${booking.eventType}`,
      `Client:  ${booking.customerName}`,
      `Email:   ${booking.customerEmail}`,
      `Phone:   ${booking.customerPhone || 'Not provided'}`,
      ``,
      `Deposit paid:             £${booking.depositPaid}`,
      `Full package price:       £${booking.fullPrice}`,
      `Remaining (due on day):   £${booking.remaining}`,
      ``,
      `Notes: ${booking.message || 'None'}`,
      `Stripe ref: ${booking.sessionId}`,
    ].join('\n'),
    // All-day event — marks the whole day Busy for FreeBusy API
    start: { date: booking.bookingDate },
    end:   { date: booking.bookingDate },
    transparency: 'opaque',  // "Busy" — this is what the availability checker reads
    status: 'confirmed',
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email',  minutes: 24 * 60 }, // 1 day before
        { method: 'popup',  minutes: 60 },       // 1 hour before
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId:  process.env.GOOGLE_CALENDAR_ID!,
    requestBody: event,
  });

  return { success: true, eventId: response.data.id };
}