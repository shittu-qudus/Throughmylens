"use client";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking 6-12 months in advance, especially for weddings during peak season (May-October). However, we sometimes have availability for last-minute bookings, so don\'t hesitate to reach out!',
  },
  {
    question: 'What\'s your photography style?',
    answer: 'Our style blends documentary and fine art photography. We capture authentic, candid moments while also creating artistic, editorial-style portraits. The result is a beautiful mix of emotion and elegance.',
  },
  {
    question: 'Do you travel for events?',
    answer: 'Absolutely! We\'re based in the San Francisco Bay Area but travel throughout California and beyond. Travel fees may apply for locations outside the Bay Area.',
  },
  {
    question: 'When will we receive our photos?',
    answer: 'Delivery times vary by package: Essential (2 weeks), Premium (10 days), and Luxury (1 week). You\'ll receive a sneak peek within 48 hours, and the Luxury package includes same-day preview highlights.',
  },
  {
    question: 'Can we request specific shots?',
    answer: 'Of course! We encourage you to share a shot list and any specific must-have photos during our consultation. We\'ll make sure to capture all your important moments while also bringing our creative expertise.',
  },
  {
    question: 'What happens if you\'re sick on our event day?',
    answer: 'We maintain a network of professional backup photographers with similar styles. In the unlikely event of an emergency, we\'ll ensure a qualified photographer covers your event without any additional cost.',
  },
  {
    question: 'Do you provide raw, unedited images?',
    answer: 'We only deliver professionally edited photos that meet our quality standards. Raw files are not included in any package, as we consider the editing process essential to our artistic vision.',
  },
  {
    question: 'What\'s your cancellation policy?',
    answer: 'Your retainer is non-refundable but can be applied to a rescheduled date within 12 months. Full details are provided in your contract upon booking.',
  },
];

export function FAQ() {
  return (
    <section className="py-32 bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about booking with us
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-lg px-6 bg-white hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6 transition-all duration-300">
                    <span className="text-lg pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}