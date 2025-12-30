import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, Send } from 'lucide-react';

const SolarSystem = ({ isHovered, color = "blue" }: { isHovered: boolean, color?: "blue" | "red" | "slate" }) => {
  const orbits = [
    { size: 120, duration: '8s', planetSize: 4 },
    { size: 200, duration: '12s', planetSize: 6 },
    { size: 280, duration: '20s', planetSize: 5 },
  ];

  const colors = {
    blue: { orbit: "rgba(37, 99, 235, 0.1)", planet: "rgba(37, 99, 235, 0.4)", center: "rgba(37, 99, 235, 0.15)" },
    red: { orbit: "rgba(220, 38, 38, 0.08)", planet: "rgba(220, 38, 38, 0.3)", center: "rgba(220, 38, 38, 0.12)" },
    slate: { orbit: "rgba(71, 85, 105, 0.1)", planet: "rgba(71, 85, 105, 0.3)", center: "rgba(71, 85, 105, 0.15)" }
  }[color];

  return (
    <div 
      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden transition-opacity duration-500 hardware-accelerated"
      style={{ opacity: isHovered ? 1 : 0 }}
    >
      <style>{`
        @keyframes orbitCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .orbit-rotate { 
          animation: orbitCW var(--duration) infinite linear;
          will-change: transform;
        }
      `}</style>
      
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute w-12 h-12 rounded-full blur-xl opacity-50" style={{ backgroundColor: colors.center }} />

        {orbits.map((orbit, i) => (
          <div 
            key={i} 
            className="absolute rounded-full border" 
            style={{ 
              width: orbit.size, 
              height: orbit.size, 
              borderColor: colors.orbit 
            }}
          >
            <div
              className="orbit-rotate absolute top-0 left-1/2"
              style={{ 
                '--duration': orbit.duration,
                width: 1, 
                height: orbit.size, 
                transformOrigin: `0 ${orbit.size / 2}px`,
                top: 0,
                left: '50%'
              } as any}
            >
              <div 
                className="rounded-full shadow-md"
                style={{
                  width: orbit.planetSize,
                  height: orbit.planetSize,
                  backgroundColor: colors.planet,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Comparison: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<'old' | 'new' | null>(null);

  const oldWay = [
    "Generic Emails That Get Ignored",
    "Weeks of Technical Setup Hell",
    "Messages Land in Spam Folders",
    "Low-Quality Leads Waste Your Time",
    "Managing Multiple Campaigns is Chaos"
  ];

  const newWay = [
    "Authentic Personalization at Scale",
    "Launch in Days, Not Weeks",
    "Built-In Deliverability Protection",
    "Data-Driven Targeting for Qualified Leads",
    "Effortless Multi-Campaign Management"
  ];

  return (
    <section id="the-difference" className="scroll-mt-32 py-24 px-6 md:px-12 bg-white/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-blue-600 mb-6 block">The Difference</span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight text-balance">
            Stop Chasing. Start <span className="italic font-medium text-blue-600">Booking</span>.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            We replaced the outdated manual outreach playbook with high-intelligence automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div
            onMouseEnter={() => setHoveredCard('old')}
            onMouseLeave={() => setHoveredCard(null)}
            className="p-8 md:p-12 rounded-[2.5rem] border border-slate-200 bg-slate-50/50 relative group shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-default"
          >
            <SolarSystem isHovered={hoveredCard === 'old'} color="red" />
            <div className="relative z-10">
              <motion.div 
                animate={{ 
                  scale: hoveredCard === 'old' ? 1.2 : 1,
                  rotate: hoveredCard === 'old' ? -10 : 0 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-8 border border-red-200 shadow-sm"
              >
                <X className="w-6 h-6" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 serif italic">The Broken Playbook</h3>
              <p className="text-slate-500 mb-10 text-sm font-medium">Waste weeks on setup and still see disappointing results.</p>
              <ul className="space-y-6">
                {oldWay.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start transition-opacity">
                    <motion.div 
                      animate={{ scale: hoveredCard === 'old' ? 1.1 : 1 }}
                      transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
                      className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-1 flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </motion.div>
                    <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            onMouseEnter={() => setHoveredCard('new')}
            onMouseLeave={() => setHoveredCard(null)}
            className="p-8 md:p-12 rounded-[2.5rem] bg-slate-900 text-white shadow-xl relative overflow-hidden group transition-all duration-300 cursor-default"
          >
            <SolarSystem isHovered={hoveredCard === 'new'} color="blue" />
            <div className="relative z-10">
              <motion.div 
                animate={{ 
                  scale: hoveredCard === 'new' ? 1.25 : 1,
                  rotate: hoveredCard === 'new' ? 15 : 0,
                  y: hoveredCard === 'new' ? -4 : 0
                }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-500/30"
              >
                <Send className="w-6 h-6" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 serif italic text-blue-50">The AI-Powered Playbook</h3>
              <p className="text-slate-400 mb-10 text-sm font-medium">Seamless automation that fills your calendar automatically.</p>
              <ul className="space-y-6">
                {newWay.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <motion.div 
                      animate={{ scale: hoveredCard === 'new' ? 1.2 : 1 }}
                      transition={{ delay: i * 0.05, type: "spring", stiffness: 400, damping: 10 }}
                      className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mt-1 flex-shrink-0 border border-blue-500/30"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </motion.div>
                    <span className="text-slate-200 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;