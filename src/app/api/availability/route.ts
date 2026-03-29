// app/api/availability/route.ts
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/availability?start=YYYY-MM-DD&end=YYYY-MM-DD
 *
 * Fetches busy time slots from your public Google Calendar
 * using the Calendar FreeBusy API (read-only, API key auth).
 *
 * Required env vars in .env.local:
 *   GOOGLE_API_KEY=your_api_key_here
 *   GOOGLE_CALENDAR_ID=your_calendar_id_here
 */

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;

export async function GET(request: NextRequest) {
  if (!GOOGLE_API_KEY || !GOOGLE_CALENDAR_ID) {
    return NextResponse.json(
      { error: 'Missing GOOGLE_API_KEY or GOOGLE_CALENDAR_ID env vars' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  if (!start || !end) {
    return NextResponse.json(
      { error: 'start and end query params are required (YYYY-MM-DD)' },
      { status: 400 }
    );
  }

  const timeMin = new Date(`${start}T00:00:00`).toISOString();
  const timeMax = new Date(`${end}T23:59:59`).toISOString();

  try {
    // Google Calendar FreeBusy API
    const url = `https://www.googleapis.com/calendar/v3/freeBusy?key=${GOOGLE_API_KEY}`;

    const gcalRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timeMin,
        timeMax,
        items: [{ id: GOOGLE_CALENDAR_ID }],
      }),
      // Revalidate every 5 minutes (Next.js fetch cache)
      next: { revalidate: 300 },
    });

    if (!gcalRes.ok) {
      const err = await gcalRes.json();
      console.error('Google Calendar API error:', err);
      return NextResponse.json(
        { error: 'Google Calendar API error', detail: err },
        { status: gcalRes.status }
      );
    }

    const gcalData = await gcalRes.json();

    // Shape: { calendars: { [calendarId]: { busy: [{start, end}, ...] } } }
    const busySlots: { start: string; end: string }[] =
      gcalData.calendars?.[GOOGLE_CALENDAR_ID]?.busy ?? [];

    // Normalise to flat set of "YYYY-MM-DD" strings
    const bookedDays = new Set<string>();

    for (const slot of busySlots) {
      const cursor = new Date(slot.start);
      cursor.setHours(0, 0, 0, 0);
      const endDay = new Date(slot.end);
      endDay.setHours(0, 0, 0, 0);

      while (cursor <= endDay) {
        bookedDays.add(cursor.toISOString().split('T')[0]);
        cursor.setDate(cursor.getDate() + 1);
      }
    }

    return NextResponse.json({ bookedDays: Array.from(bookedDays) });
  } catch (err) {
    console.error('Availability API error:', err);
    return NextResponse.json(
      { error: 'Internal server error', detail: String(err) },
      { status: 500 }
    );
  }
}