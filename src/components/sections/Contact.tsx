"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Check, ChevronRight, Camera, Heart, Users, Star, Calendar, Loader2, AlertCircle, Clock, MapPin, Image, Zap, DollarSign, MessageCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

const WHATSAPP_NUMBER = '447XXXXXXXXX';
const EMAIL_ADDRESS = 'hello@throughmylens.co.uk';

// ── Validation helpers ────────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  const trimmed = email.trim().toLowerCase();
  const basicPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!basicPattern.test(trimmed)) return false;
  const [, domain] = trimmed.split('@');
  const realTld =
    /\.(com|co\.uk|co|uk|net|org|io|me|info|biz|edu|gov|ac\.uk|gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com|live\.com|msn\.com|proton\.me|protonmail\.com|btinternet\.com|sky\.com|virginmedia\.com|talk21\.com|aol\.com)$/;
  return realTld.test(domain);
}

function isValidUKPhone(phone: string): boolean {
  if (!phone) return true;
  const s = phone.replace(/[\s\-().]/g, '');
  return (
    /^07\d{9}$/.test(s) ||
    /^\+447\d{9}$/.test(s) ||
    /^447\d{9}$/.test(s)
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const EVENT_PACKAGES = [
  {
    value: 'maternity-individual',
    label: 'Maternity (Individual)',
    price: 90,
    icon: Heart,
    color: 'from-rose-50 to-pink-50',
    accent: 'text-rose-500',
    description: 'Maternity shoot for one',
    features: ['1 hr session', '6 pictures', 'All raw'],
    disabled: false,
  },
  {
    value: 'maternity-couple',
    label: 'Maternity (Couple)',
    price: 120,
    icon: Heart,
    color: 'from-rose-50 to-pink-50',
    accent: 'text-rose-500',
    description: 'Maternity shoot for two',
    features: ['1 hr session', '1 look', '1 video', 'Plus raw'],
    disabled: false,
  },
  {
    value: 'maternity-family3',
    label: 'Maternity (Family of 3)',
    price: 150,
    icon: Users,
    color: 'from-rose-50 to-pink-50',
    accent: 'text-rose-500',
    description: 'Maternity shoot with family',
    features: ['1 hr session', '6 pictures', '1 look', 'Plus raw'],
    disabled: false,
  },
  {
    value: 'family3',
    label: 'Family of 3 Shoot',
    price: 150,
    icon: Users,
    color: 'from-emerald-50 to-teal-50',
    accent: 'text-emerald-500',
    description: 'One outfit session',
    features: ['1 hr session', '6 pictures', 'All raw pictures', '1 look', '1 video'],
    disabled: false,
  },
  {
    value: 'lifestyle',
    label: 'Lifestyle Shoot',
    price: 85,
    icon: Camera,
    color: 'from-amber-50 to-yellow-50',
    accent: 'text-amber-500',
    description: 'Natural, candid moments',
    features: ['1 hr session', '6 pictures', 'All raw', '1 look'],
    disabled: false,
  },
  {
    value: 'portrait',
    label: 'Portrait Shoot',
    price: 85,
    icon: Camera,
    color: 'from-amber-50 to-yellow-50',
    accent: 'text-amber-500',
    description: 'Professional headshots & portraits',
    features: ['1 hr session', '6 pictures', 'All raw pictures', '1 look'],
    disabled: false,
  },
  {
    value: 'graduation',
    label: 'Graduation Shoot',
    price: 90,
    icon: Star,
    color: 'from-sky-50 to-blue-50',
    accent: 'text-sky-500',
    description: 'Celebrate your achievement',
    features: ['1 hr session', '40+ edited photos', 'Online gallery', 'Print release'],
    disabled: false,
  },
  {
    value: 'other',
    label: 'Custom Package',
    price: 0,
    icon: Calendar,
    color: 'from-slate-50 to-gray-50',
    accent: 'text-slate-400',
    description: 'Reach out to discuss a bespoke package tailored to you',
    features: ['Flexible hours', 'Custom deliverables', 'Tailored pricing', 'Consultation included'],
    disabled: true,
  },
];

const DEPOSIT_PERCENT = 0.75;

function calcDepositAmount(price: number) {
  const deposit = parseFloat((price * DEPOSIT_PERCENT).toFixed(2));
  const remaining = parseFloat((price - deposit).toFixed(2));
  return { deposit, remaining };
}

function calcStripeFee(price: number) {
  const fee = parseFloat((price * 0.015 + 0.20).toFixed(2));
  const total = parseFloat((price + fee).toFixed(2));
  return { fee, total };
}

const POLICIES = [
  {
    icon: DollarSign,
    title: 'Payment & Booking',
    accent: 'text-emerald-600',
    bg: 'bg-emerald-50',
    items: [
      'Payment validates your booking. A non-refundable deposit secures your slot.',
      'The remaining balance must be paid immediately after your shoot.',
    ],
  },
  {
    icon: AlertCircle,
    title: 'Cancellation & Rescheduling',
    accent: 'text-rose-600',
    bg: 'bg-rose-50',
    items: [
      'Rescheduling is not permitted on the day of your shoot. A £15 additional fee applies in this case.',
      'Rescheduling must be requested at least 48 hours before your shoot.',
    ],
  },
  {
    icon: Clock,
    title: 'Punctuality & Lateness',
    accent: 'text-amber-600',
    bg: 'bg-amber-50',
    items: [
      'Sessions run for 1 hour. Failure to arrive at the agreed time will result in the delayed time being deducted from your session.',
      'There is a 10-minute grace period for all clients.',
      'After the grace period: £25 for up to 30 mins late · £50 for up to 1 hr late, charged on arrival.',
    ],
  },
  {
    icon: Zap,
    title: 'Extra Time & Add-ons',
    accent: 'text-sky-600',
    bg: 'bg-sky-50',
    items: [
      'Extra time charges: £25 per 30 mins · £50 per additional hour.',
      'Multiple outfits in a single session attract extra fees.',
    ],
  },
  {
    icon: Image,
    title: 'Editing & Delivery',
    accent: 'text-violet-600',
    bg: 'bg-violet-50',
    items: [
      'Editing takes up to 72 hours. Express delivery (same/next day) attracts an extra £20 charge.',
      'Extra photo copies: £7 per copy.',
    ],
  },
  {
    icon: MapPin,
    title: 'Location & Travel',
    accent: 'text-orange-600',
    bg: 'bg-orange-50',
    items: [
      "If booking a restaurant shoot, please verify their photography and ring-light policies beforehand — some venues do not permit flash or lighting equipment.",
      'Travel is covered for journeys up to 40 minutes. Any additional travel time attracts an extra charge.',
      "Free location recommendations are available if you're unsure where to shoot.",
    ],
  },
];

type Step = 'details' | 'package' | 'policies' | 'confirm';

interface FieldErrors {
  email?: string;
  phone?: string;
}

export function Contact() {
  const [step, setStep] = useState<Step>('details');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [policiesAgreed, setPoliciesAgreed] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    message: '',
  });

  // Ref placed at the very top of the section so we can scroll there on every step change
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goToStep = (next: Step) => {
    setStep(next);
    // Use a tiny timeout so the new step has started rendering before we scroll
    setTimeout(scrollToTop, 50);
  };

  const selectedPackage = EVENT_PACKAGES.find(p => p.value === formData.eventType);
  const { deposit, remaining } = selectedPackage
    ? calcDepositAmount(selectedPackage.price)
    : { deposit: 0, remaining: 0 };
  const { fee: stripeFee, total: grandTotal } = selectedPackage
    ? calcStripeFee(deposit)
    : { fee: 0, total: 0 };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'email' || field === 'phone') {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateDetailsStep = (): boolean => {
    const newErrors: FieldErrors = {};
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@gmail.com)';
    }
    if (formData.phone && !isValidUKPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid UK number (e.g. 07911 123456 or +447911 123456)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueFromDetails = () => {
    if (validateDetailsStep()) goToStep('package');
  };

  const handleCheckout = async () => {
    if (!selectedPackage) return;
    setIsRedirecting(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageLabel: selectedPackage.label,
          price: deposit,
          metadata: {
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone || '',
            booking_date: formData.date,
            event_type: selectedPackage.label,
            message: formData.message || '',
            full_package_price: selectedPackage.price,
            deposit_amount: deposit,
            remaining_balance: remaining,
            policies_agreed: 'true',
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong. Please try again.');
      setIsRedirecting(false);
    }
  };

  const STEPS: Step[] = ['details', 'package', 'policies', 'confirm'];
  const STEP_LABELS = ['Your Details', 'Choose Package', 'Our Policies', 'Review & Pay'];
  const stepIndex = STEPS.indexOf(step);

  // Step 1 continue is disabled unless name, email AND date are all filled
  const detailsComplete = !!(formData.name && formData.email && formData.date);

  return (
    <section
      id="Reserve"
      className="py-24 min-h-screen bg-[#fafaf8]"
      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
    >
      {/* Scroll anchor — sits above the header */}
      <div ref={topRef} />

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
          {STEP_LABELS.map((label, i) => (
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
                  className={`text-[10px] mt-1.5 tracking-wider uppercase text-center max-w-[60px] leading-tight ${
                    i <= stepIndex ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < 3 && (
                <div
                  className={`w-12 md:w-16 h-px mx-2 mb-4 transition-all duration-500 ${
                    i < stepIndex ? 'bg-gray-900' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── Step 1: Details ── */}
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

                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs tracking-widest uppercase text-gray-500 font-normal" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Jane Smith"
                        className="border-gray-200 rounded-xl h-12 bg-gray-50/50 focus:bg-white transition-all duration-200 text-gray-800"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs tracking-widest uppercase text-gray-500 font-normal" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="jane@gmail.com"
                        className={`border-gray-200 rounded-xl h-12 bg-gray-50/50 focus:bg-white transition-all duration-200 text-gray-800 ${errors.email ? 'border-rose-400 focus-visible:ring-rose-300' : ''}`}
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 flex items-center gap-1.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs tracking-widest uppercase text-gray-500 font-normal" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="07911 123456"
                        className={`border-gray-200 rounded-xl h-12 bg-gray-50/50 focus:bg-white transition-all duration-200 text-gray-800 ${errors.phone ? 'border-rose-400 focus-visible:ring-rose-300' : ''}`}
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      />
                      {errors.phone ? (
                        <p className="text-xs text-rose-500 flex items-center gap-1.5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.phone}
                        </p>
                      ) : (
                        <p className="text-[11px] text-gray-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          UK format only — e.g. 07911 123456 or +447911 123456
                        </p>
                      )}
                    </div>

                    {/* Date — now required */}
                    <div className="space-y-1.5">
                      <Label htmlFor="date" className="text-xs tracking-widest uppercase text-gray-500 font-normal" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Event Date *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        className={`border-gray-200 rounded-xl h-12 bg-gray-50/50 focus:bg-white transition-all duration-200 text-gray-800 ${!formData.date && detailsComplete === false ? '' : ''}`}
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      />
                      <p className="text-[11px] text-gray-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Required — we need a date to confirm your slot
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs tracking-widest uppercase text-gray-500 font-normal" style={{ fontFamily: 'system-ui, sans-serif' }}>
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
                    onClick={handleContinueFromDetails}
                    disabled={!detailsComplete}
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
              <p className="text-center text-gray-500 mb-6 font-light text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Select the package that fits your occasion
              </p>

              <div className="text-center text-xs text-amber-600 bg-amber-50/50 py-2 px-4 rounded-full w-fit mx-auto mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
                ✨ Multiple outfits on a single shoot attract extra fees
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EVENT_PACKAGES.map((pkg) => {
                  const Icon = pkg.icon;
                  const isSelected = formData.eventType === pkg.value;

                  if (pkg.disabled) {
                    return (
                      <div key={pkg.value} className="relative">
                        <div className="w-full relative p-5 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/60 text-left">
                          <span className="absolute top-3 right-3 text-[10px] tracking-widest uppercase bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Enquire only
                          </span>
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-3`}>
                            <Icon className={`w-5 h-5 ${pkg.accent}`} />
                          </div>
                          <p className="text-lg font-medium text-gray-400 mb-1">{pkg.label}</p>
                          <p className="text-xs text-gray-400 mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>{pkg.description}</p>
                          <div className="flex gap-2">
                            <Link
                              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'm interested in a custom photography package. Could we discuss what you offer?")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white transition-all duration-200 text-xs tracking-wide"
                              style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                              <FaWhatsapp className="w-4 h-4" />
                              WhatsApp us
                            </Link>
                            <Link
                              href={`mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent('Enquiry: Custom Package')}&body=${encodeURIComponent("Hi,\n\nI'm interested in a bespoke/custom photography package.\n\nLooking forward to hearing from you!")}`}
                              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200 transition-all duration-200 text-xs tracking-wide"
                              style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                              <FaEnvelope className="w-4 h-4" />
                              Email us
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const whatsappMsg = encodeURIComponent(`Hi! I'm interested in the ${pkg.label} package (£${pkg.price}). Could we chat before I book?`);
                  const emailSubject = encodeURIComponent(`Enquiry: ${pkg.label} Package`);
                  const emailBody = encodeURIComponent(`Hi,\n\nI'm interested in the ${pkg.label} package (£${pkg.price}) and would love to find out more before booking.\n\nLooking forward to hearing from you!`);

                  return (
                    <div key={pkg.value} className="relative">
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleChange('eventType', pkg.value)}
                        className={`w-full relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                          isSelected ? 'border-gray-900 bg-white shadow-lg' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                        )}
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-3`}>
                          <Icon className={`w-5 h-5 ${pkg.accent}`} />
                        </div>
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="text-lg font-medium text-gray-900">{pkg.label}</span>
                          <span className="text-2xl font-light text-gray-900">£{pkg.price.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>{pkg.description}</p>
                        <ul className="space-y-1 mb-4">
                          {pkg.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-gray-600" style={{ fontFamily: 'system-ui, sans-serif' }}>
                              <span className={`w-1 h-1 rounded-full ${pkg.accent.replace('text', 'bg')}`} />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <p className="text-[11px] text-gray-400 mb-3 italic" style={{ fontFamily: 'system-ui, sans-serif' }}>
                          Have questions? Reach out before booking:
                        </p>
                        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                          <Link
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white transition-all duration-200 text-xs tracking-wide"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                          >
                            <FaWhatsapp className="w-4 h-4" />
                            WhatsApp
                          </Link>
                          <Link
                            href={`mailto:${EMAIL_ADDRESS}?subject=${emailSubject}&body=${emailBody}`}
                            className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 text-xs tracking-wide"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                          >
                            <FaEnvelope className="w-4 h-4" />
                            Email
                          </Link>
                        </div>
                      </motion.button>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => goToStep('details')}
                  className="flex-1 h-14 rounded-xl border border-gray-200 text-gray-600 text-sm tracking-widest uppercase hover:bg-gray-50 transition-all"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Back
                </button>
                <button
                  onClick={() => goToStep('policies')}
                  disabled={!formData.eventType}
                  className="flex-[2] h-14 rounded-xl bg-gray-900 text-white text-sm tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  View Policies
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Booking Policies ── */}
          {step === 'policies' && (
            <motion.div
              key="policies"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <Card className="p-6 border border-gray-100 bg-white rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-900 font-medium mb-1">Booking Policies</h3>
                    <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      Please read the following policies carefully before completing your booking. These ensure the best experience for all clients.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="space-y-3">
                {POLICIES.map((policy, idx) => {
                  const Icon = policy.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Card className="p-5 border border-gray-100 bg-white rounded-2xl">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg ${policy.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                            <Icon className={`w-4 h-4 ${policy.accent}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${policy.accent}`} style={{ fontFamily: 'system-ui, sans-serif' }}>
                              {policy.title}
                            </p>
                            <ul className="space-y-1.5">
                              {policy.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${policy.accent.replace('text', 'bg')} shrink-0 mt-2`} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <Card className="p-5 border border-gray-100 bg-gray-50 rounded-2xl">
                <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  <strong className="text-gray-700">Before booking:</strong> We typically require you to reach out to us first to discuss your shoot. This allows us to understand your vision and plan the session properly. If you haven't contacted us yet, please do so before proceeding.
                </p>
              </Card>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="space-y-3"
              >
                <label
                  htmlFor="policies-agree"
                  className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    policiesAgreed ? 'border-gray-900 bg-gray-900/[0.02]' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      id="policies-agree"
                      checked={policiesAgreed}
                      onChange={(e) => setPoliciesAgreed(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                        policiesAgreed ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-300'
                      }`}
                    >
                      {policiesAgreed && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      I agree to the booking policies
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      I have read and understood all of the booking policies above, including the cancellation, lateness, and payment terms.
                    </p>
                  </div>
                </label>

                {/* Contact nudge */}
                <div className="flex flex-wrap items-center gap-3 px-1 py-1" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span className="text-xs">Haven't reached out to us yet?</span>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <Link
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to discuss a photography booking with you.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white transition-all duration-200 text-xs font-medium"
                    >
                      <FaWhatsapp className="w-3.5 h-3.5" />
                      WhatsApp
                    </Link>
                    <Link
                      href={`mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent('Photography Booking Enquiry')}&body=${encodeURIComponent("Hi,\n\nI'd like to discuss a photography booking with you.\n\nLooking forward to hearing from you!")}`}
                      className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 text-xs font-medium"
                    >
                      <FaEnvelope className="w-3.5 h-3.5" />
                      Email
                    </Link>
                  </div>
                </div>
              </motion.div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => goToStep('package')}
                  className="flex-1 h-14 rounded-xl border border-gray-200 text-gray-600 text-sm tracking-widest uppercase hover:bg-gray-50 transition-all"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Back
                </button>
                <button
                  onClick={() => goToStep('confirm')}
                  disabled={!policiesAgreed}
                  className="flex-[2] h-14 rounded-xl bg-gray-900 text-white text-sm tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Review Booking
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 4: Review & Pay ── */}
          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {selectedPackage && (
                <Card className="p-6 border border-gray-100 bg-white rounded-2xl">
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-5" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Booking Summary
                  </p>
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-xl text-gray-900">{selectedPackage.label} Session</p>
                      <p className="text-sm text-gray-500" style={{ fontFamily: 'system-ui, sans-serif' }}>{selectedPackage.description}</p>
                    </div>
                    <p className="text-xl font-light text-gray-900">£{selectedPackage.price.toFixed(2)}</p>
                  </div>

                  <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 mb-5">
                    {[
                      ['Client', formData.name],
                      ['Email', formData.email],
                      ...(formData.phone ? [['Phone', formData.phone]] : []),
                      ['Date', new Date(formData.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        <span className="text-gray-400">{k}</span>
                        <span className="text-gray-700">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Full package price</span>
                      <span className="text-gray-700">£{selectedPackage.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-gray-700 flex items-center gap-2">
                        Deposit due now
                        <span className="text-[10px] bg-gray-900 text-white px-1.5 py-0.5 rounded-full tracking-wide">75%</span>
                      </span>
                      <span className="text-gray-900 font-medium">£{deposit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-gray-400 flex items-center gap-2">
                        Remaining balance
                        <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full tracking-wide">due after shoot</span>
                      </span>
                      <span className="text-gray-500">£{remaining.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-1.5">
                        Stripe processing fee
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full tracking-wide">1.5% + 20p</span>
                      </span>
                      <span className="text-gray-500">£{stripeFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-900">Total charged today</span>
                      <span className="text-2xl font-light text-gray-900">£{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </Card>
              )}

              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100" style={{ fontFamily: 'system-ui, sans-serif' }}>
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 leading-relaxed">
                  A remaining balance of <strong>£{remaining.toFixed(2)}</strong> is due immediately after your shoot. This is separate from today's deposit payment.
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100" style={{ fontFamily: 'system-ui, sans-serif' }}>
                <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-xs text-gray-500 leading-relaxed">
                  You'll be redirected to <strong className="text-gray-700">Stripe's secure checkout</strong> to complete payment. Your card details are handled entirely by Stripe — we never see or store them.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => goToStep('policies')}
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
                      Pay £{grandTotal.toFixed(2)} deposit
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