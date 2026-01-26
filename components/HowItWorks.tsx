import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      stepLabel: "Step 1",
      title: "Quick Onboarding",
      description: "We handle the technical setup—domains, inboxes, warmup, integrations. You fill out a simple questionnaire about your ideal L&D prospects and messaging. That's it."
    },
    {
      num: "02",
      stepLabel: "Step 2",
      title: "AI Launches Campaigns",
      description: "Once a strategy has been agreed on, our AI researches your training prospects, crafts personalized emails, and begins outreach automatically."
    },
    {
      num: "03",
      stepLabel: "Step 3",
      title: "Calls Start Flowing",
      description: "Watch your calendar fill with discovery calls. Our system tracks replies, handles follow-ups, and books meetings directly into your calendar."
    }
  ];

  return (
    <section id="how-it-works" className="scroll-mt-32 py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-blue-600 mb-6 block">How It Works</span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 serif">From Setup to Booked Calls in 3 Simple Steps</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.2,
                y: { type: "spring", stiffness: 300, damping: 20 }
              }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="relative group p-8 rounded-[2.5rem] transition-shadow duration-300 hover:shadow-2xl hover:shadow-blue-500/5 hover:bg-white/40 cursor-default"
            >
              <div className="relative z-10">
                <div className="flex items-baseline gap-4 mb-6">
                  {/* Step Number with Reveal Animation */}
                  <span className="text-6xl font-bold text-blue-600/10 serif tracking-tighter transition-all duration-500 group-hover:text-blue-600 group-hover:opacity-100">
                    {step.num}
                  </span>
                  <div className="h-px w-8 bg-blue-200 mb-2 transition-colors duration-300 group-hover:bg-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 mb-2">
                    {step.stepLabel}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 transition-colors duration-300 group-hover:text-blue-700">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;