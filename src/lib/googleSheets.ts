import { google } from 'googleapis';

export async function getSheetClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

export async function appendBookingRow(data: {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  booking_date: string;
  session_id: string;
  paid_at: string;
}) {
  const sheets = await getSheetClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Bookings!A:H',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        data.name,
        data.email,
        data.phone,
        data.event_type,
        data.booking_date,
        data.session_id,
        data.paid_at,
        'false', // reminder_sent
      ]],
    },
  });
}

export async function getTomorrowsBookings() {
  const sheets = await getSheetClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Bookings!A:H',
  });

  const rows = res.data.values || [];
  if (rows.length <= 1) return []; // only headers

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD

  return rows
    .slice(1) // skip header row
    .map((row, index) => ({
      rowIndex: index + 2, // 1-based, skip header
      name: row[0],
      email: row[1],
      phone: row[2],
      event_type: row[3],
      booking_date: row[4],
      session_id: row[5],
      paid_at: row[6],
      reminder_sent: row[7],
    }))
   .filter(row => row.booking_date === tomorrowStr && row.reminder_sent?.toLowerCase() === 'false');
}

export async function markReminderSent(rowIndex: number) {
  const sheets = await getSheetClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `Bookings!H${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: { values: [['true']] },
  });
}