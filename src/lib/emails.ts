import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL!;
const ADMIN = process.env.ADMIN_EMAIL!;

export async function sendCustomerConfirmation(data: {
  name: string;
  email: string;
  event_type: string;
  booking_date: string;
  amount: string;
  session_id: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: '📸 Booking Confirmed — Your Session is Reserved',
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h1 style="font-weight: 300; font-size: 32px; margin-bottom: 4px;">Booking Confirmed</h1>
        <p style="color: #888; font-size: 14px; margin-top: 0;">Payment received successfully</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p>Hi ${data.name},</p>
        <p>Thank you for booking your photography session! We're excited to work with you. Here's a summary of your booking:</p>
        <div style="background: #f9f9f7; border-radius: 12px; padding: 20px 24px; margin: 24px 0;">
          <table style="width: 100%; font-size: 14px; font-family: system-ui, sans-serif;">
            <tr><td style="color: #888; padding: 6px 0;">Session</td><td style="text-align:right;">${data.event_type}</td></tr>
            <tr><td style="color: #888; padding: 6px 0;">Date</td><td style="text-align:right;">${data.booking_date || 'To be confirmed'}</td></tr>
            <tr><td style="color: #888; padding: 6px 0;">Amount Paid</td><td style="text-align:right;">${data.amount}</td></tr>
            <tr><td style="color: #888; padding: 6px 0;">Reference</td><td style="text-align:right; font-family: monospace; font-size: 11px;">${data.session_id}</td></tr>
          </table>
        </div>
        <p>We'll be in touch within 24 hours to finalise your session details. If you have any questions in the meantime, just reply to this email.</p>
        <p style="margin-top: 32px;">Looking forward to capturing your moments,<br/><strong>The Lens Team</strong></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 11px; color: #bbb; font-family: system-ui, sans-serif;">This is an automated confirmation. Please keep this email for your records.</p>
      </div>
    `,
  });
}

export async function sendAdminNotification(data: {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  booking_date: string;
  amount: string;
  session_id: string;
  message: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `🎉 New Booking — ${data.name} (${data.event_type})`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="font-weight: 600;">New Booking Received</h2>
        <div style="background: #f9f9f7; border-radius: 12px; padding: 20px 24px; margin: 24px 0;">
          <table style="width: 100%; font-size: 14px;">
            <tr><td style="color: #888; padding: 6px 0;">Client</td><td style="text-align:right;">${data.name}</td></tr>
            <tr><td style="color: #888; padding: 6px 0;">Email</td><td style="text-align:right;">${data.email}</td></tr>
            <tr><td style="color: #888; padding: 6px 0;">Phone</td><td style="text-align:right;">${data.phone || 'Not provided'}</td></tr>
            <tr><td style="color: #888; padding: 6px 0;">Session</td><td style="text-align:right;">${data.event_type}</td></tr>
            <tr><td style="color: #888; padding: 6px 0;">Date</td><td style="text-align:right;">${data.booking_date || 'Not specified'}</td></tr>
            <tr><td style="color: #888; padding: 6px 0;">Amount</td><td style="text-align:right;">${data.amount}</td></tr>
          </table>
        </div>
        ${data.message ? `<p><strong>Client notes:</strong><br/>${data.message}</p>` : ''}
        <p style="font-size: 12px; color: #bbb;">Session ID: ${data.session_id}</p>
      </div>
    `,
  });
}

export async function sendReminderEmail(data: {
  name: string;
  email: string;
  event_type: string;
  booking_date: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: '📅 Reminder — Your Photography Session is Tomorrow',
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h1 style="font-weight: 300; font-size: 32px; margin-bottom: 4px;">See You Tomorrow!</h1>
        <p style="color: #888; font-size: 14px; margin-top: 0;">Your session is coming up</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p>Hi ${data.name},</p>
        <p>Just a friendly reminder that your <strong>${data.event_type}</strong> session is scheduled for <strong>tomorrow, ${data.booking_date}</strong>.</p>
        <div style="background: #f9f9f7; border-radius: 12px; padding: 20px 24px; margin: 24px 0;">
          <p style="margin: 0; font-family: system-ui, sans-serif; font-size: 14px; color: #555;">
            💡 <strong>Tips for tomorrow:</strong><br/><br/>
            • Get a good night's sleep<br/>
            • Prepare your outfits the night before<br/>
            • Arrive 5–10 minutes early<br/>
            • Bring any props or ideas you'd like to incorporate
          </p>
        </div>
        <p>We can't wait to see you! If you need to make any changes, please get in touch as soon as possible.</p>
        <p style="margin-top: 32px;">See you soon,<br/><strong>The Lens Team</strong></p>
      </div>
    `,
  });
}