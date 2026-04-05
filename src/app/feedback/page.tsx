"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, CheckCircle2, Camera } from 'lucide-react';


const EVENT_TYPES = [
  'Wedding', 'Maternity', 'Portrait', 'Graduation',
  'Lifestyle', 'Eid', 'Family', 'Other',
];




const PROFESSIONALISM_OPTIONS = [
  'Extremely professional', 'Very professional',
  'Professional', 'Could be improved',
];

export default function FeedbackPage() {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    eventType: '',
    dateOfService: '',
    overallExperience: '',
    enjoyedMost: '',
    professionalism: '',
    photoSatisfaction: '',
    wouldRecommend: '',
    improvement: '',
    consent: false,
  });

  const update = (field: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const canProceedStep1 = form.fullName && form.email && form.eventType && form.dateOfService && rating > 0;
  const canProceedStep2 = form.overallExperience && form.enjoyedMost && form.professionalism;
  const canSubmit = form.photoSatisfaction && form.wouldRecommend && form.consent;

  if (submitted) {
    return (
      <main
        className="min-h-screen bg-[#0c0c0b] flex items-center justify-center px-6"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
            className="w-20 h-20 rounded-full border border-amber-400/40 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-10 h-10 text-amber-400" />
          </motion.div>
          <h1 className="text-5xl font-light text-white mb-4">Thank You</h1>
          <p className="text-gray-400 text-lg font-light mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Your feedback means the world to us.
          </p>
          <p className="text-gray-600 text-sm mb-10" style={{ fontFamily: 'system-ui, sans-serif' }}>
            It helps us grow and serve future clients better.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-amber-400 hover:text-amber-300 transition-colors"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#0c0c0b]"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Header */}
      <header className="px-6 py-6 border-b border-white/5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2 text-gray-500">
            <Camera className="w-4 h-4" />
            <span className="text-xs tracking-widest uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Through My Lens
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-amber-400/70 mb-3"
            style={{ fontFamily: 'system-ui, sans-serif' }}>
            Share Your Experience
          </p>
          <h1 className="text-5xl md:text-6xl font-light text-white leading-tight mb-4">
            Your Story<br />
            <em className="text-gray-500">Matters</em>
          </h1>
          <p className="text-gray-500 font-light" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Help us improve and inspire others with your honest feedback.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-12" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 transition-all duration-300 ${
                i === step ? 'text-amber-400' : i < step ? 'text-gray-500' : 'text-gray-700'
              }`}>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-all duration-300 ${
                  i < step ? 'bg-amber-400/20 border-amber-400/40 text-amber-400' :
                  i === step ? 'border-amber-400 text-amber-400' :
                  'border-gray-700 text-gray-700'
                }`}>
                  {i < step ? '✓' : i}
                </div>
                <span className="text-xs tracking-wider uppercase hidden sm:block">
                  {i === 1 ? 'Basic Info' : i === 2 ? 'Experience' : 'Final'}
                </span>
              </div>
              {i < 3 && (
                <div className={`flex-1 h-px w-8 transition-all duration-500 ${
                  i < step ? 'bg-amber-400/40' : 'bg-gray-800'
                }`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── Step 1 ── */}
          {step === 1 && (
            <motion.section
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              aria-label="Basic information"
            >
              <div className="space-y-6">

                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName"
                    className="block text-xs tracking-widest uppercase text-gray-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={e => update('fullName', e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400/50 transition-colors"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email"
                    className="block text-xs tracking-widest uppercase text-gray-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400/50 transition-colors"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                  <label className="block text-xs tracking-widest uppercase text-gray-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Event Type <span className="text-amber-400">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EVENT_TYPES.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => update('eventType', type)}
                        aria-pressed={form.eventType === type}
                        className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                          form.eventType === type
                            ? 'bg-amber-400/10 border-amber-400/50 text-amber-400'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label htmlFor="dateOfService"
                    className="block text-xs tracking-widest uppercase text-gray-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Date of Session <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="dateOfService"
                    type="date"
                    value={form.dateOfService}
                    onChange={e => update('dateOfService', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50 transition-colors"
                    style={{ fontFamily: 'system-ui, sans-serif', colorScheme: 'dark' }}
                  />
                </div>

                {/* Star Rating */}
                <div className="space-y-3">
                  <label className="block text-xs tracking-widest uppercase text-gray-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Overall Rating <span className="text-amber-400">*</span>
                  </label>
                  <div className="flex gap-3" role="group" aria-label="Star rating">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        aria-label={`${star} star${star > 1 ? 's' : ''}`}
                        aria-pressed={rating >= star}
                        className="transition-transform hover:scale-110"
                      >
                        <Star className={`w-9 h-9 transition-all duration-150 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-700'
                        }`} />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-xs text-amber-400/70" style={{ fontFamily: 'system-ui, sans-serif' }}>
                      {['', 'Poor', 'Fair', 'Good', 'Great', 'Exceptional'][rating]}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="w-full h-14 rounded-xl bg-amber-400 text-black text-sm tracking-widest uppercase font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-300 transition-all duration-200"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Continue
                </button>
              </div>
            </motion.section>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <motion.section
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              aria-label="Experience feedback"
            >
              <div className="space-y-7">

                {/* Main testimonial */}
                <div className="space-y-2">
                  <label htmlFor="overallExperience"
                    className="block text-xs tracking-widest uppercase text-gray-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    How was your overall experience? <span className="text-amber-400">*</span>
                  </label>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    This may appear on our website — write as you'd tell a friend.
                  </p>
                  <textarea
                    id="overallExperience"
                    value={form.overallExperience}
                    onChange={e => update('overallExperience', e.target.value)}
                    placeholder="Working with the photographer was..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400/50 transition-colors resize-none"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                </div>

                {/* Enjoyed most */}
                <div className="space-y-2">
                  <label htmlFor="enjoyedMost"
                    className="block text-xs tracking-widest uppercase text-gray-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    What did you enjoy most? <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    id="enjoyedMost"
                    value={form.enjoyedMost}
                    onChange={e => update('enjoyedMost', e.target.value)}
                    placeholder="The thing I loved most was..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400/50 transition-colors resize-none"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                </div>

                {/* Professionalism */}
                <div className="space-y-2">
                  <label className="block text-xs tracking-widest uppercase text-gray-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Professionalism & Communication <span className="text-amber-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PROFESSIONALISM_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update('professionalism', opt)}
                        aria-pressed={form.professionalism === opt}
                        className={`px-4 py-3 rounded-xl text-sm border text-left transition-all duration-200 ${
                          form.professionalism === opt
                            ? 'bg-amber-400/10 border-amber-400/50 text-amber-400'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 h-14 rounded-xl border border-white/10 text-gray-400 text-sm tracking-widest uppercase hover:border-white/20 transition-all"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!canProceedStep2}
                    className="flex-[2] h-14 rounded-xl bg-amber-400 text-black text-sm tracking-widest uppercase font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-300 transition-all"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {/* ── Step 3 ── */}
          {step === 3 && (
            <motion.section
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              aria-label="Final questions"
            >
              <div className="space-y-7">

                {/* Photo satisfaction */}
                <div className="space-y-2">
                  <label className="block text-xs tracking-widest uppercase text-gray-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    How satisfied are you with the final photos? <span className="text-amber-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Absolutely love them', 'Very satisfied', 'Satisfied', 'Could be better'].map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update('photoSatisfaction', opt)}
                        aria-pressed={form.photoSatisfaction === opt}
                        className={`px-4 py-3 rounded-xl text-sm border text-left transition-all duration-200 ${
                          form.photoSatisfaction === opt
                            ? 'bg-amber-400/10 border-amber-400/50 text-amber-400'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div className="space-y-2">
                  <label htmlFor="wouldRecommend"
                    className="block text-xs tracking-widest uppercase text-gray-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Would you recommend us? Why? <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    id="wouldRecommend"
                    value={form.wouldRecommend}
                    onChange={e => update('wouldRecommend', e.target.value)}
                    placeholder="I would / wouldn't recommend because..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400/50 transition-colors resize-none"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                </div>

                {/* Improvement — private */}
                <div className="space-y-2">
                  <label htmlFor="improvement"
                    className="block text-xs tracking-widest uppercase text-gray-500"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Anything we could improve?
                    <span className="ml-2 text-gray-600 normal-case tracking-normal text-xs">
                      (private — not displayed publicly)
                    </span>
                  </label>
                  <textarea
                    id="improvement"
                    value={form.improvement}
                    onChange={e => update('improvement', e.target.value)}
                    placeholder="Optional — your honest thoughts help us grow..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400/50 transition-colors resize-none"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  />
                </div>

                {/* Consent */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={e => update('consent', e.target.checked)}
                      className="sr-only"
                      aria-label="Consent to display feedback publicly"
                    />
                    <div
                      onClick={() => update('consent', !form.consent)}
                      className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${
                        form.consent
                          ? 'bg-amber-400 border-amber-400'
                          : 'bg-white/5 border-white/20 group-hover:border-white/40'
                      }`}
                    >
                      {form.consent && (
                        <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-400 leading-relaxed"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    I give permission for this feedback to be displayed publicly on the website.{' '}
                    <span className="text-amber-400">*</span>
                  </span>
                </label>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 h-14 rounded-xl border border-white/10 text-gray-400 text-sm tracking-widest uppercase hover:border-white/20 transition-all"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit || loading}
                    className="flex-[2] h-14 rounded-xl bg-amber-400 text-black text-sm tracking-widest uppercase font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-300 transition-all flex items-center justify-center gap-2"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : 'Submit Feedback'}
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}