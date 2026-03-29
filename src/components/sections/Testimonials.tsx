"use client";
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Emily & James',
    event: 'Wedding',
    text: 'Sophie captured our wedding day perfectly. Every emotion, every detail - the photos are absolutely stunning. We couldn\'t be happier with the results!',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Emily+James&background=000&color=fff&size=128',
  },
  {
    id: 2,
    name: 'Charlotte Harrison',
    event: 'Family Portrait',
    text: 'Working with Sophie was an absolute pleasure. She made our family feel comfortable and the photos turned out beautifully. Highly recommend!',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Charlotte+Harrison&background=000&color=fff&size=128',
  },
  {
    id: 3,
    name: 'Oliver & Amelia',
    event: 'Engagement Session',
    text: 'From start to finish, Sophie was professional, creative, and fun to work with. Our engagement photos exceeded all expectations!',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Oliver+Amelia&background=000&color=fff&size=128',
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Client Love</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            What our clients say about their experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-black text-black" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.event}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}