
import React from 'react';
import { motion } from 'framer-motion';

const SocialProof: React.FC = () => {
  const proofs = [
    { heading: "Higher Open Rates", text: "46% higher open rates with personalized subject lines", source: "Forbes" },
    { heading: "Reply Rate Boost", text: "Personalized emails in B2B see 2-3x better response rates", source: "Campaign Monitor" },
    { heading: "Better Engagement", text: "Personalized emails get 50% more website clicks", source: "HubSpot" },
    { heading: "Higher Open Rates", text: "46% higher open rates with personalized subject lines", source: "Forbes" },
    { heading: "Reply Rate Boost", text: "Personalized emails in B2B see 2-3x better response rates", source: "Campaign Monitor" },
    { heading: "Better Engagement", text: "Personalized emails get 50% more website clicks", source: "HubSpot" }
  ];

  return (
    <section className="py-8 md:py-12 overflow-hidden border-y border-slate-100 bg-white/50">
      <div className="flex items-center gap-4 mb-10 px-6 max-w-7xl mx-auto">
        <div className="h-[1px] flex-1 bg-slate-200" />
        <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-slate-400 whitespace-nowrap">As seen in industry reports</span>
        <div className="h-[1px] flex-1 bg-slate-200" />
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {proofs.map((proof, i) => (
            <div key={i} className="flex flex-col mx-12 md:mx-20 min-w-[280px]">
              <span className="text-sm font-bold text-blue-600 mb-1 uppercase tracking-widest">{proof.heading}</span>
              <p className="text-xl md:text-2xl text-slate-800 font-medium whitespace-normal mb-2 leading-tight">
                "{proof.text}"
              </p>
              <span className="text-xs font-bold text-slate-400">-{proof.source}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
