"use client";
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CTAProps {
  onBookSession: () => void;
}

export function CTA({ onBookSession }: CTAProps) {
  return (
    <section className="py-32 md:py-40 bg-gradient-to-br from-black via-neutral-900 to-black text-white relative overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Sparkle icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="inline-block mb-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tight leading-tight"
          >
            Ready to Capture
            <br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent">
              Your Moment?
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Let's create timeless memories that you'll treasure forever.
            <br />
            <span className="text-white/70">Your story deserves to be told beautifully.</span>
          </motion.p>

          {/* Primary CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              onClick={onBookSession}
              size="lg"
              className="bg-white text-black hover:bg-white/90 px-16 py-8 text-xl md:text-2xl group shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Book Your Session
              <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-2" />
            </Button>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Available for 2026 bookings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Flexible packages</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
      />
    </section>
  );
}