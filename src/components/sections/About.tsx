"use client";

import { motion, type Variants } from "framer-motion";

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "300+", label: "Weddings Shot" },
  { value: "500+", label: "Happy Clients" },
];

const paragraphs = [
  "With over a half-decade behind the lens, I've built a practice rooted in one belief: every moment deserves to be remembered exactly as it felt not posed, not performed, but real.",
  "My style sits at the intersection of documentary honesty and fine-art elegance. I don't just photograph events; I craft visual narratives that you'll return to for a lifetime.",
  "Based in London, I've had the privilege of working across the UK and Europe  from intimate countryside ceremonies to grand city celebrations  each one as singular as the people at the centre of it.",
  "Away from the camera I'm drawn to quiet mornings, film photography, and the kind of light that only exists for a few minutes each day.",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

const vu = (delay = 0) => ({
  variants: fadeUp,
  initial: "hidden" as const,
  whileInView: "visible" as const,
  custom: delay,
  viewport: { once: true },
});

export function About() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">

      {/* ── Subtle background texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(0,0,0,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">

        {/* ── Section label ── */}
        <motion.p
          {...vu(0)}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-16 text-center"
        >
          The person behind the lens
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Image column ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-2 md:order-1"
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute -bottom-4 -right-4 w-full h-full border border-gray-200 rounded-sm"
              />
              <div className="relative overflow-hidden rounded-sm">
                <motion.img
                  src="ceo.jpg"
                  alt="Through My Lens – photographer portrait"
                  className="w-full h-[580px] object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                <div
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-32"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent)",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* ── Text column ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 md:order-2 flex flex-col justify-center pt-6"
          >
            <motion.h2
              {...vu(0.15)}
              className="text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] tracking-tight text-gray-900 mb-8"
            >
              Capturing moments<br />
              <span className="italic font-light text-gray-400">
                that last forever.
              </span>
            </motion.h2>

            <div className="space-y-5 text-base text-gray-600 leading-relaxed">
              {paragraphs.map((text, i) => (
                <motion.p key={i} {...vu(0.25 + i * 0.1)}>
                  {text}
                </motion.p>
              ))}
            </div>

            {/* ── CTA ── */}
            <motion.div {...vu(0.65)} className="mt-10 flex items-center gap-5">
              <a
                href="#availability"
                 onClick={(e) => {
    e.preventDefault();

    const element = document.getElementById("availability");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.pushState(null, "", "#availability");
    }
  }}
                className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition-colors duration-300"
              >
                Book a session
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="/gallery"
                className="text-sm font-semibold text-gray-500 underline underline-offset-4 hover:text-gray-900 transition-colors duration-200"
              >
                View portfolio
              </a>
            </motion.div>

            {/* ── Stats ── */}
            <motion.div
              {...vu(0.75)}
              className="mt-12 pt-10 border-t border-gray-100"
            >
              <div className="grid grid-cols-3 gap-6 text-center">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.85 + i * 0.1,
                      type: "spring",
                      stiffness: 180,
                    }}
                    whileHover={{ y: -3 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-3xl font-bold tracking-tight text-gray-900">
                      {stat.value}
                    </span>
                    <span className="mt-1 text-xs text-gray-400 tracking-wide uppercase">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* ── Bottom quote ── */}
        <motion.blockquote
          {...vu(0.3)}
          className="mt-28 max-w-2xl mx-auto text-center"
        >
          <p className="text-xl md:text-2xl italic font-light text-gray-400 leading-relaxed">
            &ldquo;Photography is the art of frozen time — the ability to store
            emotion and feelings within a frame.&rdquo;
          </p>
          <cite className="mt-4 block text-xs tracking-[0.18em] uppercase text-gray-300 not-italic">
          Faisat Yetunde Adedeji, throughmylens
          </cite>
        </motion.blockquote>

      </div>
    </section>
  );
}