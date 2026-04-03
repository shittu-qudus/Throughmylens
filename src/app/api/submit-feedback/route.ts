export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName, email, eventType, dateOfService, rating,
      overallExperience, enjoyedMost, professionalism,
      photoSatisfaction, wouldRecommend, improvement, consent,
    } = body;

    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    const formattedDate = dateOfService
      ? new Date(dateOfService).toLocaleDateString('en-GB', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        })
      : 'Not specified';

    // Admin email — full details including private improvement note
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `⭐ New Feedback — ${fullName} (${eventType}, ${stars})`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;background:#fafaf8;padding:32px;border-radius:16px;">
          <h2 style="font-weight:600;margin-bottom:4px;">New Feedback Received</h2>
          <p style="color:#888;font-size:14px;margin-top:0;">From ${fullName} · ${formattedDate}</p>
          <div style="background:white;border-radius:12px;padding:20px 24px;margin:24px 0;border:1px solid #eee;">
            <table style="width:100%;font-size:14px;border-collapse:collapse;">
              <tr><td style="color:#888;padding:6px 0;width:40%;">Client</td><td style="font-weight:500;">${fullName}</td></tr>
              <tr><td style="color:#888;padding:6px 0;">Email</td><td>${email}</td></tr>
              <tr><td style="color:#888;padding:6px 0;">Event Type</td><td>${eventType}</td></tr>
              <tr><td style="color:#888;padding:6px 0;">Session Date</td><td>${formattedDate}</td></tr>
              <tr><td style="color:#888;padding:6px 0;">Rating</td><td style="color:#d97706;font-size:18px;">${stars}</td></tr>
              <tr><td style="color:#888;padding:6px 0;">Professionalism</td><td>${professionalism}</td></tr>
              <tr><td style="color:#888;padding:6px 0;">Photo Satisfaction</td><td>${photoSatisfaction}</td></tr>
              <tr><td style="color:#888;padding:6px 0;">Public Consent</td><td>${consent ? '✅ Yes' : '❌ No'}</td></tr>
            </table>
          </div>
          <div style="margin-bottom:16px;">
            <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:6px;">Overall Experience</p>
            <p style="background:white;border:1px solid #eee;border-radius:8px;padding:14px;font-style:italic;color:#333;">"${overallExperience}"</p>
          </div>
          <div style="margin-bottom:16px;">
            <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:6px;">Enjoyed Most</p>
            <p style="background:white;border:1px solid #eee;border-radius:8px;padding:14px;color:#333;">${enjoyedMost}</p>
          </div>
          <div style="margin-bottom:16px;">
            <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:6px;">Would Recommend</p>
            <p style="background:white;border:1px solid #eee;border-radius:8px;padding:14px;color:#333;">${wouldRecommend}</p>
          </div>
          ${improvement ? `
          <div style="margin-bottom:16px;border:1px dashed #f59e0b;border-radius:8px;padding:14px;background:#fffbeb;">
            <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#92400e;margin-bottom:6px;">🔒 Private — Improvement Suggestion</p>
            <p style="color:#78350f;margin:0;">${improvement}</p>
          </div>
          ` : ''}
        </div>
      `,
    });

    // Client thank you email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      replyTo: process.env.ADMIN_EMAIL!,
      subject: `Thank you for your feedback, ${fullName.split(' ')[0]}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
          <h1 style="font-weight:300;font-size:36px;margin-bottom:4px;">Thank You</h1>
          <p style="color:#888;font-size:14px;font-family:system-ui,sans-serif;margin-top:0;">
            Your feedback has been received
          </p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
          <p>Hi ${fullName.split(' ')[0]},</p>
          <p style="font-family:system-ui,sans-serif;color:#555;line-height:1.7;">
            Thank you for taking the time to share your experience. Your feedback genuinely helps us grow and
            serves as an inspiration for future clients looking to capture their most precious moments.
          </p>
          <p style="font-family:system-ui,sans-serif;color:#555;line-height:1.7;">
            It was a pleasure working with you on your <strong>${eventType}</strong> session.
            We hope the photos bring you joy for years to come.
          </p>
          <p style="margin-top:32px;">With gratitude,<br/><strong>Through My Lens</strong></p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
          <p style="font-size:11px;color:#bbb;font-family:system-ui,sans-serif;">
            This is an automated message. To get in touch, simply reply to this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Feedback submission error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}