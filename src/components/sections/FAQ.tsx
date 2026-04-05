"use client";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking 9–12 months ahead, particularly for weddings during peak season (May–September). London venues fill quickly, so early booking secures your date. We require a minimum of 2 weeks notice for all bookings — that said, we do occasionally have last-minute availability, so don\'t hesitate to reach out.',
  },
  {
    question: 'What is your photography style?',
    answer: 'We work at the intersection of documentary and fine art. Our approach is unobtrusive — we blend into your day and capture genuine emotion as it unfolds, while also crafting considered, editorial-style portraits. The result is an honest, beautiful record of your story.',
  },
  {
    question: 'Do you travel outside London?',
    answer: 'Yes. While we are based in London, we regularly photograph weddings and portraits across the UK — from the Scottish Highlands to the Cotswolds and coastal Cornwall. We also travel internationally. Travel and accommodation costs are discussed transparently at enquiry.',
  },
  {
    question: 'When will we receive our photographs?',
    answer: 'All clients receive a curated sneak peek within 48 hours. Full gallery delivery timelines depend on your package: Essential (3 weeks), Premium (2 weeks), and Luxury (1 week with same-day preview highlights). Every image is hand-edited to our signature standard.',
  },
  {
    question: 'Can we share a list of must-have shots?',
    answer: 'Absolutely. We encourage it. During your pre-shoot consultation we will go through your priorities in detail — family groupings, key moments, sentimental details. We then work creatively around that foundation so nothing important is missed.',
  },
  {
    question: 'What if something happens on the day?',
    answer: 'Your day is protected. We have a trusted network of London-based photographers who share our aesthetic and work ethic. In any emergency, a qualified replacement will be in place at no additional cost to you. This commitment is written into every contract.',
  },
  {
    question: 'Do you supply raw or unedited files?',
    answer: 'We deliver professionally edited images only. Post-processing is integral to our artistic practice — raw files do not represent our work and are not included in any package. What you receive is fully finished, print-ready photography.',
  },
  {
    question: 'What are your payment and cancellation terms?',
    answer: 'A 25% retainer is required to secure your date. This retainer is non-refundable but transferable to a rescheduled date within 18 months. Remaining balances are due 4 weeks before the event. Full terms are provided in your contract at the point of booking.',
  },
];

export function FAQ() {
  return (
    <section
      className="py-24 md:py-32 bg-stone-50"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-4 font-medium">
            Your Questions, Answered
          </p>
          <h2
            id="faq-heading"
            className="text-[clamp(2rem,5vw,3.25rem)] font-light tracking-tight text-stone-900 leading-[1.1] mb-5"
          >
            Frequently Asked
            <span className="block italic text-stone-500">Questions</span>
          </h2>
          <p className="text-base md:text-lg text-stone-500 font-light max-w-xl mx-auto leading-relaxed">
            Everything you need to know before booking your London photography experience.
          </p>
        </motion.header>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Accordion
            type="single"
            collapsible
            className="divide-y divide-stone-200 border-y border-stone-200"
            aria-label="Frequently asked questions"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-none group"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6 md:py-7 gap-4 group-hover:text-stone-600 transition-colors duration-200 [&>svg]:text-stone-400 [&>svg]:flex-shrink-0">
                    <span className="text-[clamp(0.95rem,2vw,1.1rem)] font-normal text-stone-800 leading-snug pr-2">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 md:pb-7">
                    <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light">
                      {faq.answer}
                    </p>
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