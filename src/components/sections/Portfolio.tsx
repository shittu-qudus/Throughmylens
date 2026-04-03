"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Camera } from 'lucide-react';
import Link from 'next/link';

const portfolioImages = [
  { id: 1, url: 'images/graduation/graduation1.jpg', category: 'Graduation', size: 'large' },
  { id: 2, url: 'images/lifestyle/lifestyle4.jpg', category: 'Lifestyle', size: 'medium' },
  { id: 3, url: 'images/maternity/mat1.jpg', category: 'Maternity', size: 'medium' },
  { id: 4, url: 'images/maternity/mat4.jpg', category: 'Maternity', size: 'tall' },
  { id: 5, url: 'images/nights/night2.jpg', category: 'Nights', size: 'wide' },
  { id: 6, url: 'images/eid/eid1.jpg', category: 'Eid', size: 'medium' },
  { id: 7, url: 'images/graduation/graduation2.jpg', category: 'Graduation', size: 'medium' },
  { id: 8, url: 'images/lifestyle/lifestyle5.jpg', category: 'Lifestyle', size: 'medium' },
  { id: 9, url: 'images/lifestyle/lifestyle2.jpg', category: 'Lifestyle', size: 'medium' },
];

export function Portfolio() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const getGridClass = (size: string) => {
    switch (size) {
      case 'large': return 'md:col-span-2 md:row-span-2';
      case 'wide': return 'md:col-span-2';
      case 'tall': return 'md:row-span-2';
      default: return '';
    }
  };

  return (
    <section id="portfolio" className="py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="bg-black text-white rounded-full p-3">
              <Camera className="w-6 h-6" />
            </div>
          </motion.div>
          <h2 className="text-4xl text-black md:text-5xl mb-4 tracking-tight">Our Work</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A curated collection showcasing moments of elegance, emotion, and artistry
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[280px] gap-4 mb-16"
          role="list"
          aria-label="Portfolio preview"
        >
          {portfolioImages.map((image, index) => (
            <motion.article
              key={image.id}
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`relative overflow-hidden bg-gray-200 group cursor-pointer ${getGridClass(image.size)}`}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.img
                src={image.url}
                alt={`${image.category} photography`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                animate={{ scale: hoveredId === image.id ? 1.1 : 1 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === image.id ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                aria-hidden="true"
              />

              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: hoveredId === image.id ? 0 : 20,
                  opacity: hoveredId === image.id ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm uppercase tracking-wider mb-1">Photography</p>
                    <h3 className="text-white text-2xl tracking-tight">{image.category}</h3>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2" aria-hidden="true">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0 border-2 border-white/20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === image.id ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 p-12 bg-white rounded-2xl shadow-lg">
            <div>
              <h3 className="text-2xl mb-2 tracking-tight">Want to see more?</h3>
              <p className="text-gray-600">Explore our complete portfolio of captured moments</p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-black text-white hover:bg-black/80 px-12 py-4 text-lg rounded-xl transition-all hover:scale-105 shadow-xl"
            >
              <Camera className="w-5 h-5" />
              View Full Gallery
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}