"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Check, ChevronRight, Camera, Heart, Users, Star, Calendar, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';

const EVENT_PACKAGES = [
  {
    value: 'maternity-individual',
    label: 'Maternity (Individual)',
    price: 90,
    icon: Heart,
    color: 'from-rose-50 to-pink-50',
    accent: 'text-rose-500',
    border: 'border-rose-200',
    description: 'Maternity shoot for one',
    features: ['1 hr session', '30+ edited photos', 'Online gallery', 'Print release'],
  },
  {
    value: 'maternity-couple',
    label: 'Maternity (Couple)',
    price: 120,
    icon: Heart,
    color: 'from-rose-50 to-pink-50',
    accent: 'text-rose-500',
    border: 'border-rose-200',
    description: 'Maternity shoot for two',
    features: ['1 hr session', '40+ edited photos', 'Online gallery', 'Print release'],
  },
  {
    value: 'maternity-family3',
    label: 'Maternity (Family of 3)',
    price: 130,
    icon: Users,
    color: 'from-rose-50 to-pink-50',
    accent: 'text-rose-500',
    border: 'border-rose-200',
    description: 'Maternity shoot with family',
    features: ['1 hr session', '50+ edited photos', 'Online gallery', 'Print release'],
  },
  {
    value: 'family3',
    label: 'Family of 3 Shoot',
    price: 130,
    icon: Users,
    color: 'from-emerald-50 to-teal-50',
    accent: 'text-emerald-500',
    border: 'border-emerald-200',
    description: 'One outfit session',
    features: ['1 hr session', '50+ edited photos', 'Online gallery', 'Print release'],
  },
  {
    value: 'lifestyle',
    label: 'Lifestyle Shoot',
    price: 85,
    icon: Camera,
    color: 'from-amber-50 to-yellow-50',
    accent: 'text-amber-500',
    border: 'border-amber-200',
    description: 'Natural, candid moments',
    features: ['1 hr session', '40+ edited photos', 'Online gallery', '2 locations'],
  },
  {
    value: 'portrait',
    label: 'Portrait Shoot',
    price: 85,
    icon: Camera,
    color: 'from-amber-50 to-yellow-50',
    accent: 'text-amber-500',
    border: 'border-amber-200',
    description: 'Professional headshots & portraits',
    features: ['1 hr session', '30+ edited photos', 'Online gallery', '2 looks'],
  },
  {
    value: 'graduation',
    label: 'Graduation Shoot',
    price: 90,
    icon: Star,
    color: 'from-sky-50 to-blue-50',
    accent: 'text-sky-500',
    border: 'border-sky-200',
    description: 'Celebrate your achievement',
    features: ['1 hr session', '40+ edited photos', 'Online gallery', 'Print release'],
  },
  {
    value: 'other',
    label: 'Custom',
    price: 200,
    icon: Calendar,
    color: 'from-slate-50 to-gray-50',
    accent: 'text-slate-500',
    border: 'border-slate-200',
    description: 'Bespoke package',
    features: ['Flexible hours', 'Custom deliverables', 'Tailored pricing', 'Consultation included'],
  },
];

type Step = 'details' | 'package' | 'confirm';

export function Contact() {
  const [step, setStep] = useState<Step>('details');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    message: '',
  });

  const selectedPackage = EVENT_PACKAGES.find(p => p.value === formData.eventType);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Creates a Stripe Checkout session via your Next.js API route,
   * then redirects the browser to Stripe's hosted payment page.
   */
  const handleCheckout = async () => {
    if (!selectedPackage) return;
    setIsRedirecting(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageLabel: selectedPackage.label,
          price: selectedPackage.price,
          metadata: {
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone || '',
            booking_date: formData.date || '',
            event_type: selectedPackage.label,
            message: formData.message || '',
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }
      
      const { url } = await res.json();
      window.location.href = url; // redirect to Stripe Checkout
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong. Please try again.');
      setIsRedirecting(false);
    }
  };

  const stepIndex = ['details', 'package', 'confirm'].indexOf(step);

  return (
    <section
      id="contact"
      className="py-24 min-h-screen bg-[#fafaf8]"
      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
    >
      {/* Background texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            Book a Session
          </p>
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 leading-tight">
            Reserve Your Date
          </h2>
          <p className="text-lg text-gray-500 font-light">
            Secure your booking with a simple, safe payment
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-0 mb-12"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {['Your Details', 'Choose Package', 'Review & Pay'].map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-500 ${
                    i < stepIndex
                      ? 'bg-gray-900 text-white'
                      : i === stepIndex
                      ? 'bg-gray-900 text-white ring-4 ring-gray-200'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {i < stepIndex ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-[10px] mt-1.5 tracking-wider uppercase ${
                    i <= stepIndex ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div
                  className={`w-16 md:w-24 h-px mx-2 mb-4 transition-all duration-500 ${
                    i < stepIndex ? 'bg-gray-900' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* ── Step 1: Details ── */}
        <AnimatePresence mode="wait">
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="p-8 md:p-10 border border-gray-100 shadow-sm bg-white rounded-2xl">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Smith', field: 'name', required: true },
                      { id: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com', field: 'email', required: true },
                      { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+44 7700 000000', field: 'phone', required: false },
                      { id: 'date', label: 'Event Date', type: 'date', placeholder: '', field: 'date', required: false },
                    ].map((input) => (
                      <div key={input.id} className="space-y-1.5">
                        <Label
                          htmlFor={input.id}
                          className="text-xs tracking-widest uppercase text-gray-500 font-normal"
                          style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                          {input.label}
                          {input.required && ' *'}
                        </Label>
                        <Input
                          id={input.id}
                          type={input.type}
                          required={input.required}
                          value={formData[input.field as keyof typeof formData]}
                          onChange={(e) => handleChange(input.field, e.target.value)}
                          placeholder={input.placeholder}
                          className="border-gray-200 rounded-xl h-12 bg-gray-50/50 focus:bg-white transition-all duration-200 text-gray-800"
                          style={{ fontFamily: 'system-ui, sans-serif' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="message"
                      className="text-xs tracking-widest uppercase text-gray-500 font-normal"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      Tell Us About Your Vision
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Share details about your event, style preferences, specific shots you have in mind..."
                      rows={4}
                      className="border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white resize-none transition-all duration-200 text-gray-800"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    />
                  </div>

                  <button
                    onClick={() => setStep('package')}
                    disabled={!formData.name || !formData.email}
                    className="w-full h-14 rounded-xl bg-gray-900 text-white font-light tracking-widest text-sm uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 group"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* ── Step 2: Package Selection ── */}
          {step === 'package' && (
            <motion.div
              key="package"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <p
                className="text-center text-gray-500 mb-6 font-light text-sm"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                Select the package that fits your occasion
              </p>

              {/* Note about multiple outfits */}
              <div
                className="text-center text-xs text-amber-600 bg-amber-50/50 py-2 px-4 rounded-full w-fit mx-auto mb-2"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                ✨ Multiple outfits on a single shoot attract extra fees
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EVENT_PACKAGES.map((pkg) => {
                  const Icon = pkg.icon;
                  const isSelected = formData.eventType === pkg.value;
                  return (
                    <motion.button
                      key={pkg.value}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleChange('eventType', pkg.value)}
                      className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-gray-900 bg-white shadow-lg'
                          : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </span>
                      )}
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-3`}
                      >
                        <Icon className={`w-5 h-5 ${pkg.accent}`} />
                      </div>
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-lg font-medium text-gray-900">{pkg.label}</span>
                        <span className="text-2xl font-light text-gray-900">
                          £{pkg.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        {pkg.description}
                      </p>
                      <ul className="space-y-1">
                        {pkg.features.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs text-gray-600"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                          >
                            <span className={`w-1 h-1 rounded-full ${pkg.accent.replace('text', 'bg')}`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep('details')}
                  className="flex-1 h-14 rounded-xl border border-gray-200 text-gray-600 text-sm tracking-widest uppercase hover:bg-gray-50 transition-all"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('confirm')}
                  disabled={!formData.eventType}
                  className="flex-[2] h-14 rounded-xl bg-gray-900 text-white text-sm tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Review Booking
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Review & Stripe Checkout ── */}
          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Order summary */}
              {selectedPackage && (
                <Card className="p-6 border border-gray-100 bg-white rounded-2xl">
                  <p
                    className="text-xs tracking-widest uppercase text-gray-400 mb-4"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    Booking Summary
                  </p>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xl text-gray-900">{selectedPackage.label} Session</p>
                      <p className="text-sm text-gray-500" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        {selectedPackage.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-xs tracking-widest uppercase text-gray-400"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      >
                        Total
                      </p>
                      <p className="text-3xl font-light text-gray-900">
                        £{selectedPackage.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    {[
                      ['Client', formData.name],
                      ['Email', formData.email],
                      ...(formData.phone ? [['Phone', formData.phone]] : []),
                      ...(formData.date ? [['Date', new Date(formData.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })]] : []),
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between text-sm"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      >
                        <span className="text-gray-400">{k}</span>
                        <span className="text-gray-700">{v}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Stripe redirect info */}
              <div
                className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-xs text-gray-500 leading-relaxed">
                  You'll be redirected to <strong className="text-gray-700">Stripe's secure checkout</strong> to complete payment.
                  Your card details are handled entirely by Stripe — we never see or store them.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('package')}
                  className="flex-1 h-14 rounded-xl border border-gray-200 text-gray-600 text-sm tracking-widest uppercase hover:bg-gray-50 transition-all"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Back
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={isRedirecting}
                  className="flex-[2] h-14 rounded-xl bg-gray-900 text-white text-sm tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redirecting…
                    </>
                  ) : (
                    <>
                      Pay £{selectedPackage?.price.toLocaleString()} with Stripe
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}