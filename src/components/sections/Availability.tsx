"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, XCircle, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { DayPicker } from 'react-day-picker';
import { Card } from '../ui/card';
import 'react-day-picker/dist/style.css';

interface AvailabilityProps {
  onBookDate: () => void;
}

async function fetchBookedDays(year: number, month: number): Promise<string[]> {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month + 1, 0);
  const fmt = (d: Date) => d.toISOString().split('T')[0];
  const res = await fetch(`/api/availability?start=${fmt(start)}&end=${fmt(end)}`);
  if (!res.ok) throw new Error('Failed to fetch availability');
  const data: { bookedDays: string[] } = await res.json();
  return data.bookedDays;
}

const toDateString = (date: Date) => date.toISOString().split('T')[0];

const formatDate = (date: Date) =>
  date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export function Availability({ onBookDate }: AvailabilityProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [visibleMonth, setVisibleMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [bookedDayStrings, setBookedDayStrings] = useState<Set<string>>(new Set());
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

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

  useEffect(() => {
    loadAvailability(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1);
  }, [visibleMonth, loadAvailability]);

  // Derive booked Date objects once per bookedDayStrings change
  const bookedDateObjects = useMemo(() =>
    Array.from(bookedDayStrings).map(s => {
      const [y, m, d] = s.split('-').map(Number);
      return new Date(y, m - 1, d);
    }),
    [bookedDayStrings]
  );

  const handleDateSelect = useCallback((date: Date | undefined) => {
    setSelectedDate(date);
    setIsAvailable(date ? !bookedDayStrings.has(toDateString(date)) : null);
  }, [bookedDayStrings]);

  return (
    <section
      id="availability"
      aria-labelledby="availability-heading"
      className="py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 relative overflow-hidden"
    >
      <div aria-hidden="true" className="absolute top-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div aria-hidden="true" className="inline-flex mb-4">
            <div className="bg-black text-white rounded-full p-3">
              <CalendarIcon className="w-6 h-6" />
            </div>
          </div>
          <h2
            id="availability-heading"
            className="text-4xl md:text-5xl mb-4 tracking-tight"
          >
            Check Your Date
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a date to instantly see if we're available for your special day
          </p>
          <div role="status" aria-live="polite" className="flex items-center justify-center gap-2 mt-3">
            <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
       
          </div>
        </motion.header>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">

            {/* Error banner */}
            <AnimatePresence>
              {fetchError && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-lg text-amber-800 text-sm flex items-center gap-3"
                >
                  <XCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{fetchError}</span>
                  <button
                    onClick={() => loadAvailability(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1)}
                    className="ml-auto underline hover:no-underline"
                  >
                    Retry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Calendar column */}
              <div className="flex flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl mb-1 tracking-tight">Select a Date</h3>
                    <p className="text-gray-600">Click on any date to check availability</p>
                  </div>
                  {loadingAvailability && (
                    <div role="status" aria-label="Loading availability" className="flex items-center gap-2 text-sm text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Loading…</span>
                    </div>
                  )}
                </div>

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
                  onMonthChange={setVisibleMonth}
                  disabled={(date) => date < today}
                  modifiers={{ booked: bookedDateObjects }}
                  modifiersClassNames={{ booked: 'booked-date' }}
                  className="custom-calendar"
                  fromDate={today}
                  toDate={new Date(2027, 11, 31)}
                />
              </div>

              {/* Result column */}
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
                      aria-live="polite"
                    >
                      <div aria-hidden="true" className="w-32 h-32 bg-neutral-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <CalendarIcon className="w-16 h-16 text-neutral-400" />
                      </div>
                      <p className="text-xl text-gray-500 mb-2">No date selected</p>
                      <p className="text-gray-400">Choose a date to check availability</p>
                    </motion.div>

                  ) : isAvailable ? (
                    <motion.div
                      key="available"
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ duration: 0.4, type: 'spring' }}
                      className="w-full"
                    >
                      <div className="bg-black border-2 border-black rounded-2xl p-8 text-center relative overflow-hidden">
                        <div aria-hidden="true" className="absolute inset-0 opacity-[0.03]"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                            backgroundSize: '128px 128px',
                          }}
                        />
                        <motion.div
                          aria-hidden="true"
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
                          <div aria-hidden="true" className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
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
                            <p className="text-2xl text-white font-light tracking-wide">We're Available</p>
                            <Sparkles aria-hidden="true" className="w-4 h-4 text-white/60" />
                          </div>
                          <div className="border border-white/20 rounded-lg p-4 mb-6 bg-white/5">
                            <time
                              dateTime={toDateString(selectedDate)}
                              className="text-white/90 text-lg tracking-tight"
                            >
                              {formatDate(selectedDate)}
                            </time>
                          </div>
                          <Button
                            onClick={onBookDate}
                            size="lg"
                            className="bg-white text-black hover:bg-neutral-100 w-full text-lg py-6 font-medium tracking-wide transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                          >
                            <CheckCircle2 aria-hidden="true" className="w-5 h-5 mr-2" />
                            Book This Date
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>

                  ) : (
                    <motion.div
                      key="unavailable"
                      role="status"
                      aria-live="polite"
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
                          <div aria-hidden="true" className="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <XCircle className="w-12 h-12 text-white" />
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-2xl mb-3">Sorry, We're Fully Booked</p>
                          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-4">
                            <time
                              dateTime={toDateString(selectedDate)}
                              className="text-gray-700"
                            >
                              {formatDate(selectedDate)}
                            </time>
                          </div>
                          <p className="text-gray-600 mb-6">
                            This date is already reserved. Please select another date from the calendar.
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
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
         
        </motion.footer>
      </div>
    </section>
  );
}