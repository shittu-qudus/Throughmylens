"use client";
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

interface HeroProps {
  onCheckAvailability: () => void;
  onViewPortfolio: () => void;
}

export function Hero({ onCheckAvailability, onViewPortfolio }: HeroProps) {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1543832923-44667a44c804?q=80&w=1644&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Wedding photography hero"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: '50% 30%' }}
          loading="eager"
          fetchPriority="high"
        />
        {/* Layered gradient: darker at top & bottom, lighter in middle to show the couple */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" />
        {/* Subtle vignette on sides */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.45)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.4rem,8vw,6rem)] font-light mb-4 sm:mb-6 tracking-tight leading-[1.08] max-w-4xl mx-auto"
          >
            Where Love Becomes
            <span className="block mt-1 italic">Timeless Art</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-[clamp(1rem,2.5vw,1.5rem)] mb-2 text-white/95 font-light tracking-wide"
          >
            Luxury Wedding & Portrait Photography
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-[clamp(0.9rem,2vw,1.25rem)] mb-8 sm:mb-12 text-white/75 tracking-widest uppercase text-sm"
          >
            London & Throughout the UK
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
          >
            {/* Primary CTA */}
            <Button
              onClick={onCheckAvailability}
              size="lg"
              className="bg-white text-black hover:bg-white/95 w-full sm:w-auto px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 group"
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Check Availability
            </Button>

            {/* Secondary CTA */}
            <Button
              onClick={onViewPortfolio}
              size="lg"
              variant="outline"
              className="border-2 border-white/80 text-white bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black w-full sm:w-auto px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg transition-all duration-300 hover:scale-105 group"
            >
              View Portfolio
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-8 sm:mt-12 text-white/60 text-[clamp(0.65rem,1.2vw,0.8rem)] tracking-[0.2em] uppercase"
          >
            <p>300+ Couples Trusted Us With Their Most Precious Moments</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-2.5 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}