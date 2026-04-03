"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react';

const allImages = [
  // Graduation
  { id: 1,  url: 'images/graduation/graduation1.jpg', category: 'Graduation' },
  { id: 2,  url: 'images/graduation/graduation2.jpg', category: 'Graduation' },
  { id: 3,  url: 'images/graduation/graduation3.jpg', category: 'Graduation' },
  // Lifestyle
  { id: 4,  url: 'images/lifestyle/lifestyle.JPG',    category: 'Lifestyle' },
  { id: 5,  url: 'images/lifestyle/lifestyle2.jpg',   category: 'Lifestyle' },
  { id: 6,  url: 'images/lifestyle/lifestyle3.jpg',   category: 'Lifestyle' },
  { id: 7,  url: 'images/lifestyle/lifestyle4.jpg',   category: 'Lifestyle' },
  { id: 8,  url: 'images/lifestyle/lifestyle5.jpg',   category: 'Lifestyle' },
  // Maternity
  { id: 9,  url: 'images/maternity/mat1.jpg',         category: 'Maternity' },
  { id: 10, url: 'images/maternity/mat2.jpg',         category: 'Maternity' },
  { id: 11, url: 'images/maternity/mat3.jpg',         category: 'Maternity' },
  { id: 12, url: 'images/maternity/mat4.jpg',         category: 'Maternity' },
  // Nights
  { id: 13, url: 'images/nights/night1.jpg',          category: 'Nights' },
  { id: 14, url: 'images/nights/night2.jpg',          category: 'Nights' },
  { id: 15, url: 'images/nights/night3.jpg',          category: 'Nights' },
  // Eid
  { id: 16, url: 'images/eid/eid1.jpg',               category: 'Eid' },
  { id: 17, url: 'images/eid/eid2.jpg',               category: 'Eid' },
];

const categories = ['All', 'Graduation', 'Lifestyle', 'Maternity', 'Nights', 'Eid'];

export default function GalleryPage() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<typeof allImages[0] | null>(null);

  const filtered = active === 'All' ? allImages : allImages.filter(i => i.category === active);

  return (
    <>
      <main className="min-h-screen bg-[#fafaf8]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#fafaf8]/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <h1 className="text-2xl font-light text-gray-900">Full Gallery</h1>
            <p className="text-sm text-gray-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {filtered.length} photos
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Filter tabs */}
          <nav aria-label="Gallery categories" className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-200 ${
                  active === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                }`}
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Masonry grid */}
          <motion.div
            layout
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence>
              {filtered.map((image, index) => (
                <motion.figure
                  key={image.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="break-inside-avoid mb-4 overflow-hidden rounded-xl bg-gray-100 cursor-pointer group relative"
                  onClick={() => setLightbox(image)}
                >
                  <img
                    src={image.url}
                    alt={`${image.category} photography`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="text-white text-sm tracking-widest uppercase"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      {image.category}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${lightbox.category} photo`}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            <motion.img
              key={lightbox.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              src={lightbox.url}
              alt={`${lightbox.category} photography`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            />

            <p
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {lightbox.category}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}