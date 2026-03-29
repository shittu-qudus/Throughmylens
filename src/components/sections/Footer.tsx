"use client";
import { FaCamera, FaInstagram, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FaCamera className="w-6 h-6" />
              <span className="text-xl tracking-wider">SOPHIE REYNOLDS</span>
            </div>
            <p className="text-white/70 leading-relaxed">
              Creating timeless, elegant imagery for life's most precious moments.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-white/70">
              {[
                { icon: FaPhone, text: '+44 20 7946 0958' },
                { icon: FaEnvelope, text: 'hello@sophiereynolds.co.uk' },
                { icon: FaMapMarkerAlt, text: 'London, United Kingdom' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  className="flex items-center gap-3 hover:text-white transition-colors duration-300"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {[
                { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
                { href: 'https://facebook.com', icon: FaFacebook, label: 'Facebook' },
                { href: 'mailto:hello@sophiereynolds.co.uk', icon: FaEnvelope, label: 'Email' },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-white/20 text-center text-white/60 text-sm"
        >
          <p>&copy; {currentYear} Sophie Reynolds Photography. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}