import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User, Plug, BarChart3, Clock, TrendingUp, Mail, Calendar, DollarSign, ArrowUpRight } from 'lucide-react';

const HandDrawnUnderline = () => {
  return (
    <motion.svg
      viewBox="0 0 350 25"
      preserveAspectRatio="none"
      className="absolute -bottom-3 left-0 w-full h-4 pointer-events-none z-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.path
        d="M 5,14 C 60,12 120,11 155,10 L 165,15 C 220,13 280,12 345,13"
        fill="transparent"
        stroke="#1e3a8a"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 0.8,
            transition: {
              pathLength: { delay: 0.5, duration: 1.2, ease: "easeOut" },
              opacity: { delay: 0.5, duration: 0.3 }
            }
          }
        }}
      />
    </motion.svg>
  );
};

const StarField = ({ isEnhanced }: { isEnhanced: boolean }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isEnhanced ? 'opacity-40' : 'opacity-0'}`}
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(147, 197, 253, 0.4) 1px, transparent 0)',
        backgroundSize: '40px 40px',
        willChange: 'opacity'
      }}
    />
  );
};

const SolarSystemBackground = ({ isEnhanced, scale = 1, opacityRange = [0.15, 0.4], showSun = false }: { isEnhanced: boolean, scale?: number, opacityRange?: [number, number], showSun?: boolean }) => {
  const orbits = useMemo(() => [
    { size: 300 * scale, duration: '20s', color: "rgba(59, 130, 246, 0.1)", planetSize: 6 * scale, planetColor: "#60a5fa" },
    { size: 450 * scale, duration: '35s', color: "rgba(99, 102, 241, 0.08)", planetSize: 10 * scale, planetColor: "#818cf8" },
    { size: 650 * scale, duration: '55s', color: "rgba(59, 130, 246, 0.05)", planetSize: 8 * scale, planetColor: "#3b82f6" },
  ], [scale]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center -z-10 hardware-accelerated">
      <style>{`
        @keyframes orbitRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .orbit-item { 
          animation: orbitRotate var(--duration) infinite linear; 
          will-change: transform;
        }
      `}</style>

      <div
        className="relative w-full h-full flex items-center justify-center transition-opacity duration-1000"
        style={{ opacity: isEnhanced ? opacityRange[1] : opacityRange[0] }}
      >
        <StarField isEnhanced={isEnhanced} />

        {showSun && (
          <div className="absolute w-12 h-12 rounded-full bg-blue-400/80 shadow-[0_0_30px_rgba(96,165,250,0.5)] z-0" />
        )}

        {orbits.map((orbit, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-dashed border-white/5"
            style={{
              width: orbit.size,
              height: orbit.size,
              borderColor: orbit.color,
            }}
          >
            <div
              className="orbit-item absolute top-0 left-1/2"
              style={{
                '--duration': orbit.duration,
                width: 1,
                height: orbit.size,
                transformOrigin: `0 ${orbit.size / 2}px`,
                left: '50%',
                top: 0
              } as any}
            >
              <div
                className="rounded-full shadow-lg"
                style={{
                  width: orbit.planetSize,
                  height: orbit.planetSize,
                  backgroundColor: orbit.planetColor,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: `0 0 10px ${orbit.planetColor}`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardStat = ({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 transition-colors duration-300 hover:bg-white/10 group/stat backdrop-blur-md">
    <div className="flex items-center justify-between">
      <div className={`p-2 rounded-lg bg-blue-600/15 text-blue-600 transition-transform duration-300 group-hover/stat:scale-105`}>
        {icon}
      </div>
      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-300">
        <TrendingUp size={10} />
        {trend}
      </div>
    </div>
    <div className="relative z-10">
      <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold">{label}</p>
      <p className="text-xl font-bold text-white tracking-tight">{value}</p>
    </div>
  </div>
);

const PerformanceDashboard = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="w-full h-full bg-slate-900 rounded-[2.8rem] p-8 flex flex-col gap-6 relative overflow-hidden group border border-white/5 hardware-accelerated">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
          willChange: 'opacity'
        }}
      />

      <div
        className={`absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full transition-opacity duration-700 hardware-accelerated ${isHovered ? 'opacity-100' : 'opacity-40'}`}
        style={{ willChange: 'opacity' }}
      />
      <div
        className={`absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full transition-opacity duration-700 hardware-accelerated ${isHovered ? 'opacity-100' : 'opacity-40'}`}
        style={{ willChange: 'opacity' }}
      />

      <div className="flex items-center justify-between relative z-20">
        <div>
          <h5 className="text-white font-bold text-lg tracking-tight">System Intelligence</h5>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Active Core: Outreach AI</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-xl">
          Real-time
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-20">
        <DashboardStat icon={<Mail size={16} />} label="Emails Sent" value="12,402" trend="+18%" />
        <DashboardStat icon={<ArrowUpRight size={16} />} label="Reply Rate" value="8.4%" trend="+2.1%" />
        <DashboardStat icon={<Calendar size={16} />} label="Meetings" value="42" trend="+12%" />
        <DashboardStat icon={<DollarSign size={16} />} label="Total Revenue" value="$124,500" trend="+15%" />
      </div>

      <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-6 relative z-20 flex flex-col backdrop-blur-md">
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Growth Trajectory</span>
          <div className="w-2 h-2 rounded-full bg-blue-400 opacity-50" />
        </div>

        <div className="mt-auto flex items-end gap-2 h-32 px-2">
          {[40, 60, 45, 80, 55, 90, 75, 100, 85, 110, 95, 120].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-blue-600/40 via-blue-500/60 to-blue-400 rounded-t-lg transition-all duration-700"
              style={{ height: `${height}%`, willChange: 'height' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BenefitCard: React.FC<{ benefit: any; index: number }> = ({ benefit, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-6 rounded-3xl border border-slate-200 bg-white/50 shadow-sm hover:shadow-md hover:bg-white hover:border-blue-200 transition-all duration-300 cursor-default group"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.15 : 1,
          backgroundColor: isHovered ? '#2563eb' : '#ffffff',
          color: isHovered ? '#ffffff' : '#2563eb'
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border border-slate-100 shadow-sm hardware-accelerated"
      >
        {React.cloneElement(benefit.icon, { strokeWidth: 2, size: 24 })}
      </motion.div>
      <h4 className="text-lg font-bold mb-2 text-slate-900 transition-colors group-hover:text-blue-600">{benefit.title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed font-light">{benefit.description}</p>
    </motion.div>
  );
};

const Benefits: React.FC = () => {
  const [isDashboardHovered, setIsDashboardHovered] = useState(false);

  const benefits = useMemo(() => [
    { title: "24/7 Prospecting", description: "The AI continuously finds, researches, and contacts qualified prospects automatically.", icon: <User /> },
    { title: "Seamless Integration", description: "Plugs directly into your existing systems to fill your calendar without any tech headaches", icon: <Plug /> },
    { title: "Time Saver", description: "Systematically produces hyper-personalized messaging for each prospect in hours instead of weeks.", icon: <Clock /> },
    { title: "Real-Time Analytics", description: "Track opens, replies and ROI across all campaigns. Optimize on the fly.", icon: <BarChart3 /> }
  ], []);

  return (
    <section id="benefits" className="py-24 px-6 md:px-12 bg-slate-50/50 relative overflow-hidden">
      <SolarSystemBackground isEnhanced={isDashboardHovered} scale={1.1} opacityRange={[0.08, 0.15]} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-blue-600 mb-6 block">The Advantage</span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
              Why Cybersecurity Firms Choose Our <span className="relative inline-block">
                <span className="relative z-10">AI Email System</span>
                <HandDrawnUnderline />
              </span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 font-light leading-relaxed">
              We've built the ultimate conversion engine for modern cybersecurity service providers. Scale without overhead.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <BenefitCard key={i} benefit={benefit} index={i} />
              ))}
            </div>
          </div>

          <div
            className="relative h-[600px]"
            onMouseEnter={() => setIsDashboardHovered(true)}
            onMouseLeave={() => setIsDashboardHovered(false)}
          >
            <div className="p-1 rounded-[3rem] relative overflow-hidden h-full bg-slate-900 shadow-2xl border border-white/5">
              <PerformanceDashboard isHovered={isDashboardHovered} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;