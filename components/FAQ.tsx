import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long does setup actually take?",
      a: "Setting up the domains, email accounts and DNS configurations takes 48 hours or less."
    },
    {
      q: "How long does warm-up take?",
      a: "Properly warming up email accounts takes about 15 business days along with specialized strategies we use. This ensures that all email accounts stay healthy and don't land in spam"
    },
    {
      q: "Will the emails sound robotic or spammy?",
      a: "No. Our AI analyzes each prospect individually and crafts messaging that references their specific business challenges, growth needs, or organizational goals. You approve all messaging before it goes live."
    },

    {
      q: "Can this integrate with our existing CRM?",
      a: "Yes. We integrate with all major CRMs (HubSpot, Salesforce, Pipedrive, and more) plus calendar tools like Calendly. Setup takes minutes, not weeks."
    }
  ];

  return (
    <section id="faq" className="scroll-mt-32 py-24 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-blue-600 mb-6 block">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 serif">Common Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-3xl border transition-all duration-300 ${openIndex === i ? 'border-blue-200 bg-blue-50/30' : 'border-slate-100'
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left"
              >
                <span className="text-lg font-bold text-slate-900">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 text-slate-600 leading-relaxed font-light">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;