// app/booking-success/page.tsx
"use client";
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { createCalendarEvent } from '../actions/createCalendarEvent';

function SuccessContent() {
  const params    = useSearchParams();
  const sessionId = params.get('session_id');

  const [emailStatus,    setEmailStatus]    = useState<'sending' | 'sent' | 'error'>('sending');
  const [calendarStatus, setCalendarStatus] = useState<'pending' | 'created' | 'error' | 'skipped'>('pending');

  useEffect(() => {
    const saveBooking = async () => {
      if (!sessionId) {
        setEmailStatus('error');
        setCalendarStatus('skipped');
        return;
      }

      try {
        // 1. Fetch session details from Stripe (your existing API route)
        const res = await fetch(`/api/get-session-details?session_id=${sessionId}`);
        if (!res.ok) throw new Error('Failed to fetch session');
        const { metadata, amount_total } = await res.json();

        // 2. Save booking to Google Sheet + send emails via Resend (your existing route)
        const saveRes = await fetch('/api/save-booking', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ metadata, amount_total, session_id: sessionId }),
        });
        if (!saveRes.ok) throw new Error('Failed to save booking');
        setEmailStatus('sent');

        // 3. Create Google Calendar event so the date is marked Busy automatically
        if (metadata?.booking_date) {
          try {
            await createCalendarEvent({
              customerName:  metadata.customer_name   ?? '',
              customerEmail: metadata.customer_email  ?? '',
              customerPhone: metadata.customer_phone  ?? '',
              bookingDate:   metadata.booking_date,       // YYYY-MM-DD
              eventType:     metadata.event_type      ?? '',
              depositPaid:   String((amount_total ?? 0) / 100),
              fullPrice:     metadata.full_package_price  ?? '0',
              remaining:     metadata.remaining_balance   ?? '0',
              message:       metadata.message         ?? '',
              sessionId,
            });
            setCalendarStatus('created');
          } catch (calErr) {
            // Calendar failure is non-fatal — email/sheet already saved
            console.error('Calendar event error:', calErr);
            setCalendarStatus('error');
          }
        } else {
          setCalendarStatus('skipped');
        }

      } catch (error) {
        console.error('Booking save error:', error);
        setEmailStatus('error');
        setCalendarStatus('skipped');
      }
    };

    saveBooking();
  }, [sessionId]);

  return (
    <section
      className="min-h-screen bg-[#fafaf8] flex items-center justify-center px-6"
      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-4xl font-light text-gray-900 mb-3">Booking Confirmed</h1>
        <p className="text-gray-500 font-light mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
          Payment received successfully.
        </p>

        {/* Email status — unchanged from your original */}
        {emailStatus === 'sending' && (
          <div className="mb-4">
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Sending confirmation email...
            </p>
            <div className="flex justify-center mt-2">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
            </div>
          </div>
        )}
        {emailStatus === 'sent' && (
          <p className="text-green-600 text-sm mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
            ✓ Confirmation email sent
          </p>
        )}
        {emailStatus === 'error' && (
          <div className="mb-4">
            <p className="text-amber-600 text-sm mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
              ⚠️ Confirmation email pending
            </p>
            <p className="text-gray-400 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
              We'll send it shortly. If you don't receive it, please contact us.
            </p>
          </div>
        )}

        {/* Calendar status — new, shown below email status */}
        {calendarStatus === 'pending' && (
          <div className="mb-4">
            <p className="text-gray-400 text-xs" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Reserving your date on the calendar...
            </p>
          </div>
        )}
        {calendarStatus === 'created' && (
          <p className="text-green-600 text-sm mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
            ✓ Your date has been reserved
          </p>
        )}
        {calendarStatus === 'error' && (
          <p className="text-amber-600 text-xs mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
            ⚠️ Date reservation pending — we'll confirm it shortly
          </p>
        )}

        <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: 'system-ui, sans-serif' }}>
          We'll be in touch within 24 hours to finalise your session details.
        </p>

        {sessionId && (
          <p className="text-xs text-gray-300 mb-8" style={{ fontFamily: 'monospace' }}>
            Ref: {sessionId}
          </p>
        )}

        <Link
          href="/"
          className="inline-block bg-gray-900 text-white text-sm tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-gray-800 transition-all"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          Back to Home
        </Link>
      </motion.div>
    </section>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}