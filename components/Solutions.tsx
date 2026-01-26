import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, ShieldCheck, Mail } from 'lucide-react';

// Added React.FC type to handle implicit props like 'key' in JSX maps
const SolutionCard: React.FC<{ sol: any; index: number }> = ({ sol, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      className="group relative p-10 rounded-[3rem] transition-all duration-200 flex flex-col h-full bg-white border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden cursor-default"
    >
      <motion.div
        className="absolute inset-0 bg-blue-600 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      <div className="relative z-20 flex flex-col h-full">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shrink-0 transition-all duration-200 ${isHovered ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
          }`}>
          {React.cloneElement(sol.icon, { strokeWidth: 1.5 })}
        </div>

        <span className={`text-[10px] uppercase font-bold tracking-[0.2em] mb-4 block shrink-0 transition-colors duration-200 ${isHovered ? 'text-blue-100' : 'text-slate-400'
          }`}>
          {sol.tag}
        </span>

        <h3 className={`text-2xl font-bold mb-4 serif shrink-0 transition-colors duration-200 ${isHovered ? 'text-white' : 'text-slate-900'
          }`}>
          {sol.title}
        </h3>

        <p className={`text-base leading-relaxed font-light transition-colors duration-200 ${isHovered ? 'text-blue-50/90' : 'text-slate-600'
          }`}>
          {sol.description}
        </p>

        <motion.div
          className="absolute bottom-4 left-10 w-8 h-[2px] bg-white/40 opacity-0 transition-opacity duration-200"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>
    </motion.div>
  );
};

const Solutions: React.FC = () => {
  const solutions = [
    {
      title: "Qualified Lead Lists",
      description: "Not all leads are created equal. Our system uses data-driven scoring to identify L&D decision-makers with budget, authority, and genuine need. You spend your time talking to corporate HR leaders and executives ready to invest in leadership development, not chasing dead ends.",
      icon: <Target className="w-8 h-8" />,
      tag: "Targeting"
    },
    {
      title: "Done-For-You Deliverability",
      description: "Forget about technical setup. We provide fully done-for-you warm-up management, optimized sending schedules, automatic email rotation, and real-time spam monitoring. Your emails land in the inbox, not the spam folder—guaranteed.",
      icon: <ShieldCheck className="w-8 h-8" />,
      tag: "Infrastructure"
    },
    {
      title: "AI-Powered Personalization",
      description: "Stop sending emails that feel like spam. Our AI analyzes each prospect's training needs—leadership gaps, program requirements, organizational changes—and crafts personalized outreach that starts genuine conversations. No buzzwords, no generic fluff, just relevant messaging that gets replies.",
      icon: <Mail className="w-8 h-8" />,
      tag: "Engagement"
    }
  ];

  return (
    <section id="solutions" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] uppercase font-bold tracking-[0.4em] text-blue-600 mb-4 block"
            >
              Core Engine
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              How We <span className="italic font-medium text-blue-600">Solve</span> <br />
              Your Biggest <br />
              Lead-Gen Challenges
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {solutions.map((sol, i) => (
            <SolutionCard key={i} sol={sol} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;