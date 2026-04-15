import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL!;
const ADMIN = process.env.ADMIN_EMAIL!;

function splitPayment(amount: string): { paid: string; remaining: string } {
  const numeric = parseFloat(amount.replace(/[^0-9.]/g, ''));
  const currencySymbol = amount.match(/^[^0-9]*/)?.[0] ?? '';
  if (isNaN(numeric)) return { paid: amount, remaining: '—' };
  return {
    paid: `${currencySymbol}${(numeric * 0.75).toFixed(2)}`,
    remaining: `${currencySymbol}${(numeric * 0.25).toFixed(2)}`,
  };
}

export async function sendCustomerConfirmation(data: {
  name: string;
  email: string;
  event_type: string;
  booking_date: string;
  amount: string;
  session_id: string;
}) {
  const { paid, remaining } = splitPayment(data.amount);

  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: '📸 Booking Confirmed — Your Session is Reserved',
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h1 style="font-weight: 300; font-size: 32px; margin-bottom: 4px;">Booking Confirmed</h1>
        <p style="color: #888; font-size: 14px; margin-top: 0;">Deposit received — your session is secured</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p>Hi ${data.name},</p>
        <p>Thank you for booking your photography session! We're excited to work with you. Here's a summary of your booking:</p>
        <div style="background: #f9f9f7; border-radius: 12px; padding: 20px 24px; margin: 24px 0;">
          <table style="width: 100%; font-size: 14px; font-family: system-ui, sans-serif;">
            <tr><td style="color: #888; padding: 6px 0;">Session</td><td style="text-align:right;">${data.event_type}</td></tr>
            <tr><td style="color: #888; padding: 6px 0;">Date</td><td style="text-align:right;">${data.booking_date || 'To be confirmed'}</td></tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="color: #888; padding: 10px 0 4px;">Deposit Paid (75%)</td>
              <td style="text-align:right; padding-top: 10px; font-weight: 600; color: #1a1a1a;">${paid}</td>
            </tr>
            <tr>
              <td style="color: #e07000; padding: 4px 0 6px; font-family: system-ui, sans-serif; font-size: 13px;">Remaining Balance (25%)</td>
              <td style="text-align:right; color: #e07000; font-size: 13px; padding-bottom: 6px;">${remaining}</td>
            </tr>
            <tr><td style="color: #888; padding: 6px 0;">Reference</td><td style="text-align:right; font-family: monospace; font-size: 11px;">${data.session_id}</td></tr>
          </table>
        </div>
        <div style="background: #fff8ed; border-left: 3px solid #e07000; border-radius: 6px; padding: 14px 18px; margin: 0 0 24px; font-family: system-ui, sans-serif; font-size: 13px; color: #7a4500;">
          <strong>⚠️ Remaining balance:</strong> The outstanding ${remaining} is due <strong>immediately after your shoot</strong>. Please arrange this payment on the day.
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
  const { paid, remaining } = splitPayment(data.amount);

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
            <tr style="border-top: 1px solid #eee;">
              <td style="color: #888; padding: 10px 0 4px;">Full Package Price</td>
              <td style="text-align:right; padding-top: 10px;">${data.amount}</td>
            </tr>
            <tr>
              <td style="color: #888; padding: 4px 0;">Deposit Received (75%)</td>
              <td style="text-align:right; font-weight: 600; color: #1a1a1a;">${paid}</td>
            </tr>
            <tr>
              <td style="color: #e07000; padding: 4px 0 6px;">Remaining Due After Shoot (25%)</td>
              <td style="text-align:right; color: #e07000; padding-bottom: 6px;">${remaining}</td>
            </tr>
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
  remaining_balance?: string;
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
        ${data.remaining_balance ? `
        <div style="background: #fff8ed; border-left: 3px solid #e07000; border-radius: 6px; padding: 14px 18px; margin: 0 0 24px; font-family: system-ui, sans-serif; font-size: 13px; color: #7a4500;">
          <strong>💳 Payment reminder:</strong> Your remaining balance of <strong>${data.remaining_balance}</strong> is due <strong>immediately after your shoot tomorrow</strong>. Please come prepared to settle this on the day.
        </div>
        ` : ''}
        <p>We can't wait to see you! If you need to make any changes, please get in touch as soon as possible.</p>
        <p style="margin-top: 32px;">See you soon,<br/><strong>The Lens Team</strong></p>
      </div>
    `,
  });
}