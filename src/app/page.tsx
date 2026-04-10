"use client";
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { Services } from '@/components/sections/Services';
import { Availability } from '@/components/sections/Availability';
import { Testimonials } from '@/components/sections/Testimonials';
import { About } from '@/components/sections/About';
import { CTA } from '@/components/sections/CTA';
import { Contact } from '@/components/sections/Contact';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FloatingWhatsApp from '@/components/sections/Floatingwhatsapp';    

export default function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <FloatingWhatsApp phoneNumber="441234567890" />
      <Navbar />
      
      {/* HERO - Full screen, high emphasis */}
      <Hero
        onCheckAvailability={() => scrollToSection('availability')}
        onViewPortfolio={() => scrollToSection('portfolio')}
      />

      {/* Visual connector - guides eye downward */}
      <div className="relative h-24 bg-white">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="bg-black rounded-full p-3 shadow-xl">
            <ChevronDown className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      </div>

      {/* PORTFOLIO - Light background, clean showcase */}
      <Portfolio />

      {/* Subtle divider with gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* SERVICES - Alternating background for rhythm */}
      <Services onBookNow={() => scrollToSection('availability')} />

      {/* Visual separator - emphasizes next section */}
      <div className="relative bg-neutral-50">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neutral-50 to-transparent" />
      </div>

      {/* AVAILABILITY - High emphasis section with distinct background */}
      <Availability onBookDate={() => scrollToSection('Reserve')} />

      {/* Transition element */}
      <div className="h-16 bg-gradient-to-b from-gradient-to-br from-neutral-50 via-white to-neutral-50 to-neutral-50" />

      {/* TESTIMONIALS - Social proof before CTA */}
      <Testimonials />

      {/* ABOUT - Context and credibility */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-50 to-white" />
        <About />
      </div>

      {/* Strong visual break before CTA */}
      <div className="h-1 bg-gradient-to-r from-transparent via-black to-transparent" />

      {/* CTA - High emphasis, impossible to miss */}
      <CTA onBookSession={() => scrollToSection('Reserve')} />

      {/* Transition from dark CTA to light contact */}
      <div className="h-24 bg-gradient-to-b from-black to-neutral-50" />

      {/* CONTACT - Final conversion point */}
      <Contact />

      {/* FAQ - Supporting information */}
      <FAQ />     

      {/* FOOTER - Closure */}
      <Footer />
    </div>
  );
}