"use client";
import { motion } from "framer-motion";

export function About() {
  
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-2 md:order-1 overflow-hidden rounded-lg"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1595280253553-047d569a94b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicml0aXNoJTIwcGhvdG9ncmFwaGVyJTIwcHJvZmVzc2lvbmFsJTIwY2FtZXJhfGVufDF8fHx8MTc3NDIzMzcwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Unsplash Photography"
              className="w-full h-[600px] object-cover transition-transform duration-700 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 md:order-2"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl mb-6 tracking-tight"
            >
              About throughmylens
            </motion.h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              {[
                'With over 10 years of experience capturing life\'s most precious moments, I specialise in creating timeless, elegant imagery that tells your unique story.',
                'My approach combines documentary-style authenticity with fine art aesthetics, ensuring every photograph reflects genuine emotion and artistic beauty.',
                'Based in London, I\'ve had the honour of photographing over 300 weddings, countless portraits, and events across the UK and beyond.',
                'When I\'m not behind the camera, you\'ll find me exploring London\'s hidden gems, spending time with my family, and constantly seeking inspiration in everyday moments.',
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 pt-8 border-t border-gray-200"
            >
              <div className="grid grid-cols-3 gap-8 text-center">
                {[
                  { value: '10+', label: 'Years Experience' },
                  { value: '300+', label: 'Weddings' },
                  { value: '500+', label: 'Happy Clients' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.1,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-3xl mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}