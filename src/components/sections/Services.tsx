"use client";
import { motion } from 'framer-motion';
import { Check, Star, Camera, Heart, Users, Sparkles, Calendar } from 'lucide-react';

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

interface ServicesProps {
  onBookNow: (packageName?: string) => void;
}

export function Services({ onBookNow }: ServicesProps) {
  return (
    <section
      id="services"
      className="py-24 bg-[#fafaf8]"
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

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            Packages & Pricing
          </p>
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 leading-tight">
            Investment
          </h2>
          <p className="text-lg text-gray-500 font-light">
            Choose the package that best fits your vision
          </p>
        </motion.div>

        {/* Note about multiple outfits */}
        <div
          className="text-center text-xs text-amber-600 bg-amber-50/50 py-2 px-4 rounded-full w-fit mx-auto mb-8"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          ✨ Multiple outfits on a single shoot attract extra fees
        </div>

        {/* Cards - Using the style from Contact component */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="pricing">
          {EVENT_PACKAGES.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.value}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <div
                  className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 bg-white ${
                    pkg.value === 'maternity-couple'
                      ? 'border-gray-900 shadow-lg'
                      : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  {/* Popular badge for most popular package */}
                  {pkg.value === 'maternity-couple' && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span
                        className="flex items-center gap-1 bg-gray-900 text-white text-[10px] tracking-[0.3em] uppercase px-4 py-1.5 rounded-full"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      >
                        <Star className="w-2.5 h-2.5 fill-white" />
                        Most Popular
                      </span>
                    </div>
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
                  <ul className="space-y-1 mb-5">
                    {pkg.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs text-gray-600"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      >
                        <span className={`w-1 h-1 rounded-full ${pkg.accent.replace('text', 'bg')}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => onBookNow(pkg.label)}
                    className={`w-full h-12 rounded-xl text-sm tracking-widest uppercase transition-all duration-200 ${
                      pkg.value === 'maternity-couple'
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900'
                    }`}
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-gray-400 mt-10 tracking-wide"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          All packages include a booking deposit. Custom packages available on request.
        </motion.p>
      </div>
    </section>
  );
}