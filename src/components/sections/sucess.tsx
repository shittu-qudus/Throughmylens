// app/booking-success/page.tsx
"use client";
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
// You'll need to add these to your .env.local file:
// NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
// NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CUSTOMER=your_customer_template_id
// NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN=your_admin_template_id
// NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const [emailStatus, setEmailStatus] = useState<'sending' | 'sent' | 'error'>('sending');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const sendEmails = async () => {
      if (!sessionId) {
        setEmailStatus('error');
        setErrorMessage('No session ID found');
        return;
      }

      try {
        // First, fetch the session details from your API to get the metadata
        const response = await fetch(`/api/get-session-details?session_id=${sessionId}`);
        if (!response.ok) throw new Error('Failed to fetch session details');
        
        const { metadata, amount_total, customer_email } = await response.json();

        // Prepare email data
        const emailData = {
          customer_name: metadata.customer_name,
          customer_email: metadata.customer_email,
          customer_phone: metadata.customer_phone || 'Not provided',
          booking_date: metadata.booking_date ? new Date(metadata.booking_date).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'To be confirmed',
          event_type: metadata.event_type,
          message: metadata.message || 'No additional notes',
          amount: `£${(amount_total / 100).toLocaleString()}`,
          session_id: sessionId,
          payment_date: new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        // Send email to customer
        const customerTemplateParams = {
          to_email: emailData.customer_email,
          to_name: emailData.customer_name,
          ...emailData
        };

        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CUSTOMER!,
          customerTemplateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );

        // Send email to admin (you)
        const adminTemplateParams = {
          to_email: process.env.NEXT_PUBLIC_ADMIN_EMAIL, // Add this to your env
          to_name: 'Admin',
          ...emailData
        };

        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN!,
          adminTemplateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );

        setEmailStatus('sent');
      } catch (error) {
        console.error('Email sending error:', error);
        setEmailStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Failed to send confirmation email');
      }
    };

    sendEmails();
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
        
        {/* Email status messages */}
        {emailStatus === 'sending' && (
          <div className="mb-4">
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Sending confirmation email...
            </p>
            <div className="flex justify-center mt-2">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        
        {emailStatus === 'sent' && (
          <p className="text-green-600 text-sm mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
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
        
        <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: 'system-ui, sans-serif' }}>
          A confirmation email is on its way. We'll be in touch within 24 hours to finalise your session details.
        </p>

        {sessionId && (
          <p className="text-xs text-gray-300 mb-8 font-mono" style={{ fontFamily: 'monospace' }}>
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