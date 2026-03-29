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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1543832923-44667a44c804?q=80&w=1644&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero background"
          className="w-full h-full object-cover scale-105"
        />
        {/* Enhanced gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Elegant badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="text-sm tracking-[0.3em] uppercase text-white/90 border border-white/30 px-6 py-2 rounded-full backdrop-blur-sm">
              Award-Winning Photography
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Where Love Becomes
            <span className="block mt-2 italic">Timeless Art</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl mb-3 text-white/95 font-light tracking-wide"
          >
            Luxury Wedding & Portrait Photography
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg md:text-xl mb-12 text-white/80 tracking-wide"
          >
            London & Throughout the UK
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            {/* Primary CTA - High emphasis */}
            <Button
              onClick={onCheckAvailability}
              size="lg"
              className="bg-white text-black hover:bg-white/95 px-10 py-7 text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 group min-w-[240px]"
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Check Availability
            </Button>
            
            {/* Secondary CTA - Lower emphasis */}
            <Button
              onClick={onViewPortfolio}
              size="lg"
              variant="outline"
              className="border-2 border-white/80 text-white bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black px-10 py-7 text-lg transition-all duration-300 hover:scale-105 group min-w-[240px]"
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
            className="mt-12 text-white/70 text-sm tracking-wider"
          >
            <p>300+ COUPLES TRUSTED US WITH THEIR MOST PRECIOUS MOMENTS</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
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