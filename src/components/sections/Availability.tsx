"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, XCircle, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { DayPicker } from 'react-day-picker';
import { Card } from '../ui/card';
import 'react-day-picker/dist/style.css';

interface AvailabilityProps {
  onBookDate: () => void;
}

/**
 * Fetches booked days from the API for the given month range.
 * Returns an array of "YYYY-MM-DD" strings.
 */
async function fetchBookedDays(year: number, month: number): Promise<string[]> {
  // Fetch the full month (+ a small buffer so navigating feels instant)
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month + 1, 0); // last day of next month

  const fmt = (d: Date) => d.toISOString().split('T')[0];
  const res = await fetch(
    `/api/availability?start=${fmt(start)}&end=${fmt(end)}`
  );
  if (!res.ok) throw new Error('Failed to fetch availability');
  const data: { bookedDays: string[] } = await res.json();
  return data.bookedDays;
}

export function Availability({ onBookDate }: AvailabilityProps) {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // Track which month is visible so we can prefetch the right range
  const [visibleMonth, setVisibleMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // Cache of booked day strings already fetched  →  avoids duplicate requests
  const [bookedDayStrings, setBookedDayStrings] = useState<Set<string>>(new Set());
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // ── Fetch availability whenever the visible month changes ─────────────────
  const loadAvailability = useCallback(async (year: number, month: number) => {
    setLoadingAvailability(true);
    setFetchError(null);
    try {
      const days = await fetchBookedDays(year, month);
      setBookedDayStrings(prev => new Set([...prev, ...days]));
    } catch (err) {
      console.error(err);
      setFetchError('Could not load availability. Please try again.');
    } finally {
      setLoadingAvailability(false);
    }
  }, []);

  // Initial load + reload on month navigation
  useEffect(() => {
    loadAvailability(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1);
  }, [visibleMonth, loadAvailability]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const toDateString = (date: Date) => date.toISOString().split('T')[0];

  const isDateBooked = (date: Date) => bookedDayStrings.has(toDateString(date));

  const bookedDateObjects = Array.from(bookedDayStrings).map(s => {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsAvailable(date ? !isDateBooked(date) : null);
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      id="availability"
      className="py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="bg-black text-white rounded-full p-3">
              <CalendarIcon className="w-6 h-6" />
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Check Your Date</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a date to instantly see if we're available for your special day
          </p>
          {/* Live indicator */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-sm text-green-700 font-medium">Live availability from Google Calendar</span>
          </div>
        </motion.div>

        {/* ── Card ──────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            {/* Fetch error banner */}
            {fetchError && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-lg text-amber-800 text-sm flex items-center gap-3">
                <XCircle className="w-4 h-4 flex-shrink-0" />
                {fetchError}
                <button
                  onClick={() =>
                    loadAvailability(
                      visibleMonth.getFullYear(),
                      visibleMonth.getMonth() + 1
                    )
                  }
                  className="ml-auto underline hover:no-underline"
                >
                  Retry
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* ── Calendar column ─────────────────────────────────────────── */}
              <div className="flex flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl mb-1 tracking-tight">Select a Date</h3>
                    <p className="text-gray-600">Click on any date to check availability</p>
                  </div>
                  {loadingAvailability && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading…
                    </div>
                  )}
                </div>

                {/* Legend — live data */}
                <div className="flex flex-wrap gap-3 mb-6 p-4 bg-neutral-50 rounded-lg">
                  {/* Available days this month */}
                  {(() => {
                    const year = visibleMonth.getFullYear();
                    const month = visibleMonth.getMonth();
                    const today = new Date(); today.setHours(0,0,0,0);
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    let available = 0;
                    for (let d = 1; d <= daysInMonth; d++) {
                      const date = new Date(year, month, d);
                      if (date >= today && !bookedDayStrings.has(date.toISOString().split('T')[0])) available++;
                    }
                    const booked = Array.from(bookedDayStrings).filter(s => {
                      const [y, m] = s.split('-').map(Number);
                      return y === year && m === month + 1;
                    }).length;
                    return (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center text-xs font-semibold">
                            {loadingAvailability ? '…' : available}
                          </div>
                          <span className="text-sm text-gray-700">Available this month</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-red-300 flex items-center justify-center text-xs font-semibold text-red-500">
                            {loadingAvailability ? '…' : booked}
                          </div>
                          <span className="text-sm text-gray-700">Booked</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">
                            ✓
                          </div>
                          <span className="text-sm text-gray-700">Selected</span>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* ── Styles (unchanged from original) ────────────────────── */}
                <style>{`
                  .custom-calendar { width: 100%; }
                  .custom-calendar .rdp-month { width: 100%; }
                  .custom-calendar .rdp-table { width: 100%; max-width: none; }
                  .custom-calendar .rdp-caption { margin-bottom: 1.5rem; }
                  .custom-calendar .rdp-caption_label { font-size: 1.25rem; font-weight: 600; }
                  .custom-calendar .rdp-nav_button {
                    width: 2.5rem; height: 2.5rem; border-radius: 9999px;
                    border: 2px solid #e5e7eb; background: white; transition: all 0.2s;
                  }
                  .custom-calendar .rdp-nav_button:hover { background: black; border-color: black; color: white; }
                  .custom-calendar .rdp-head_cell { font-weight: 600; color: #6b7280; font-size: 0.875rem; padding: 0.5rem; }
                  .custom-calendar .rdp-cell { padding: 0.25rem; }
                  .custom-calendar .rdp-day {
                    width: 3rem; height: 3rem; border-radius: 9999px;
                    font-size: 0.95rem; transition: all 0.2s; border: 2px solid transparent;
                  }
                  .custom-calendar .rdp-day:not(.rdp-day_disabled):not(.rdp-day_outside):hover {
                    background: #f3f4f6; transform: scale(1.1);
                  }
                  .custom-calendar .rdp-day_selected {
                    background: black !important; color: white !important;
                    border-color: black !important; font-weight: 600; transform: scale(1.05);
                  }
                  .custom-calendar .rdp-day_disabled { opacity: 0.3; cursor: not-allowed; }
                  .custom-calendar .rdp-day_outside { opacity: 0.3; }
                  .custom-calendar .booked-date {
                    background: #fee2e2; border-color: #fca5a5; color: #ef4444;
                    text-decoration: line-through; opacity: 0.6;
                  }
                  .custom-calendar .booked-date:hover { background: #fecaca !important; transform: scale(1.05); }
                  .custom-calendar .rdp-day_today { font-weight: 700; border: 2px solid #d1d5db; }
                `}</style>

                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={visibleMonth}
                  onMonthChange={setVisibleMonth}  // ← triggers re-fetch
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  modifiers={{ booked: bookedDateObjects }}
                  modifiersClassNames={{ booked: 'booked-date' }}
                  className="custom-calendar"
                  fromDate={new Date()}
                  toDate={new Date(2027, 11, 31)}
                />
              </div>

              {/* ── Result column ───────────────────────────────────────────── */}
              <div className="flex items-center justify-center min-h-[400px]">
                <AnimatePresence mode="wait">
                  {!selectedDate ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <div className="w-32 h-32 bg-neutral-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <CalendarIcon className="w-16 h-16 text-neutral-400" />
                      </div>
                      <h3 className="text-xl text-gray-500 mb-2">No date selected</h3>
                      <p className="text-gray-400">Choose a date to check availability</p>
                    </motion.div>
                  ) : isAvailable ? (
                    <motion.div
                      key="available"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ duration: 0.4, type: 'spring' }}
                      className="w-full"
                    >
                      <div className="bg-black border-2 border-black rounded-2xl p-8 text-center relative overflow-hidden">
                        {/* Subtle animated grain texture */}
                        <motion.div
                          className="absolute inset-0 opacity-[0.03]"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                            backgroundSize: '128px 128px',
                          }}
                        />
                        {/* Pulsing white ring */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl border border-white/10"
                          animate={{ opacity: [0.1, 0.3, 0.1] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        />

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: 'spring' }}
                          className="relative z-10"
                        >
                          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                            <CheckCircle2 className="w-12 h-12 text-black" />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="relative z-10"
                        >
                          <div className="flex items-center justify-center gap-2 mb-3">
                            <h3 className="text-2xl text-white font-light tracking-wide">We're Available</h3>
                            <Sparkles className="w-4 h-4 text-white/60" />
                          </div>
                          <div className="border border-white/20 rounded-lg p-4 mb-6 bg-white/5">
                            <p className="text-white/90 text-lg tracking-tight">
                              {formatDate(selectedDate)}
                            </p>
                          </div>
                          <Button
                            onClick={onBookDate}
                            size="lg"
                            className="bg-white text-black hover:bg-neutral-100 w-full text-lg py-6 font-medium tracking-wide transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                          >
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            Book This Date
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unavailable"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ duration: 0.4, type: 'spring' }}
                      className="w-full"
                    >
                      <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-400 rounded-2xl p-8 text-center relative overflow-hidden">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
                          transition={{ delay: 0.2, scale: { type: 'spring' }, rotate: { duration: 0.5 } }}
                        >
                          <div className="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <XCircle className="w-12 h-12 text-white" />
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <h3 className="text-2xl mb-3">Sorry, We're Fully Booked</h3>
                          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-4">
                            <p className="text-gray-700">{formatDate(selectedDate)}</p>
                          </div>
                          <p className="text-gray-600 mb-6">
                            This date is already reserved. Please try selecting another date from the calendar.
                          </p>
                          <Button
                            onClick={() => { setSelectedDate(undefined); setIsAvailable(null); }}
                            size="lg"
                            variant="outline"
                            className="border-2 border-red-400 text-red-600 hover:bg-red-500 hover:text-white w-full text-lg py-6 transition-all hover:scale-105"
                          >
                            Choose Another Date
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
          <p>Availability synced live from Google Calendar • Updated in real-time</p>
        </motion.div>
      </div>
    </section>
  );
}